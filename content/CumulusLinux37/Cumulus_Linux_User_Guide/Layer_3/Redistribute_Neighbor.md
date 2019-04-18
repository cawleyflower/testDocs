---
title: Redistribute Neighbor
author: Unknown
weight: 205
pageID: 8362959
aliases:
 - /old/Redistribute_Neighbor.html
imagePaths: []
---
# Redistribute Neighbor

*Redistribute neighbor* provides a mechanism for IP subnets to span
racks without forcing the end hosts to run a routing protocol.

The fundamental premise behind redistribute neighbor is to announce
individual host /32 routes in the routed fabric. Other hosts on the
fabric can then use this new path to access the hosts in the fabric. If
multiple equal-cost paths (ECMP) are available, traffic can load balance
across the available paths natively.

The challenge is to accurately compile and update this list of reachable
hosts or neighbors. Luckily, existing commonly-deployed protocols are
available to solve this problem. Hosts use
[ARP](http://en.wikipedia.org/wiki/Address_Resolution_Protocol) to
resolve MAC addresses when sending to an IPv4 address. A host then
builds an ARP cache table of known MAC addresses: IPv4 tuples as they
receive or respond to ARP requests.

In the case of a leaf switch, where the default gateway is deployed for
hosts within the rack, the ARP cache table contains a list of all hosts
that have ARP'd for their default gateway. In many scenarios, this table
contains all the layer 3 information that's needed. This is where
redistribute neighbor comes in, as it is a mechanism of formatting and
syncing this table into the routing protocol.

## Availability

Redistribute neighbor is distributed as `python-rdnbrd`.

## Target Use Cases and Best Practices

Redistribute neighbor was created with these use cases in mind:

  - Virtualized clusters

  - Hosts with service IP addresses that migrate between racks

  - Hosts that are dual connected to two leaf nodes without using
    proprietary protocols such as
    [MLAG](/old/Multi-Chassis_Link_Aggregation_-_MLAG.html)

  - Anycast services needing dynamic advertisement from multiple hosts

Cumulus Networks recommends following these guidelines with redistribute
neighbor:

  - Use a single logical connection from each host to each leaf.

  - A host can connect to one or more leafs. Each leaf advertises the
    /32 it sees in its neighbor table.

  - A host-bound bridge/VLAN should be local to each switch only.

  - Leaf switches with redistribute neighbor enabled should be directly
    connected to the hosts.

  - IP addressing must be non-overlapping, as the host IPs are directly
    advertised into the routed fabric.

  - Run redistribute neighbor on Linux-based hosts primarily; other host
    operating systems may work, but Cumulus Networks has not actively
    tested any at this stage.

## How It Works

Redistribute neighbor works as follows:

1.  The leaf/ToR switches learn about connected hosts when the host
    sends an ARP request or ARP reply.

2.  An entry for the host is added to the kernel neighbor table of each
    leaf switch.

3.  The redistribute neighbor daemon, `rdnbrd`, monitors the kernel
    neighbor table and creates a /32 route for each neighbor entry. This
    /32 route is created in kernel table 10.

4.  FRRouting is configured to import routes from kernel table 10.

5.  A route-map is used to control which routes from table 10 are
    imported.

6.  In FRRouting these routes are imported as *table* routes.

7.  BGP, OSPF and so forth are then configured to redistribute the table
    10 routes.

## Known Limitations

### TCAM Route Scale

This feature adds each ARP entry as a /32 host route into the routing
table of all switches within a summarization domain. Take care to keep
the number of hosts minus fabric routes under the TCAM size of the
switch. Review the [Cumulus Networks
datasheets](http://cumulusnetworks.com/hcl/) for up to date scalability
limits of your chosen hardware platforms. If in doubt, contact Cumulus
Networks support or your Cumulus Networks CSE; they will be happy to
help.

### Possible Uneven Traffic Distribution

Linux uses *source* L3 addresses only to do load balancing on most older
distributions.

### Silent Hosts Never Receive Traffic

Freshly provisioned hosts that have never sent traffic may not ARP for
their default gateways. The post-up ARPing in `/etc/network/interfaces`
on the host should take care of this. If the host does not ARP, then
`rdnbrd` on the leaf cannot learn about the host.

### Support for IPv4 Only

This release of redistribute neighbor supports IPv4 only.

### VRFs Are not Supported

This release of redistribute neighbor does not support
[VRFs](/old/Virtual_Routing_and_Forwarding_-_VRF.html).

### Only 1024 Interfaces Supported

Redistribute neighbor does not work with more than 1024 interfaces.
Doing so can cause the `rdnbrd` service to
crash.

## Troubleshooting

### How do I determine if rdnbrd (the redistribute neighbor daemon) is running?

Use `systemd` to check:

``` 
                   
cumulus@leaf01$ systemctl status rdnbrd.service 
* rdnbrd.service - Cumulus Linux Redistribute Neighbor Service
 Loaded: loaded (/lib/systemd/system/rdnbrd.service; enabled)
 Active: active (running) since Wed 2016-05-04 18:29:03 UTC; 1h 13min ago
 Main PID: 1501 (python)
 CGroup: /system.slice/rdnbrd.service
 `-1501 /usr/bin/python /usr/sbin/rdnbrd -d
   
    
```

### How do I change rdnbrd's default configuration?

Editing the `/etc/rdnbrd.conf` file, then run `systemctl restart
rdnbrd.service`:

``` 
                   
cumulus@leaf01$ cat /etc/rdnbrd.conf 
# syslog logging level CRITICAL, ERROR, WARNING, INFO, or DEBUG
loglevel = INFO
 
# TX an ARP request to known hosts every keepalive seconds
keepalive = 1
 
# If a host does not send an ARP reply for holdtime consider the host down
holdtime = 3
 
# Install /32 routes for each host into this table
route_table = 10
 
# Uncomment to enable ARP debugs on specific interfaces.
# Note that ARP debugs can be very chatty.
# debug_arp = swp1 swp2 swp3 br1
# If we already know the MAC for a host, unicast the ARP request. This is
# unusual for ARP (why ARP if you know the destination MAC) but we will be
# using ARP as a keepalive mechanism and do not want to broadcast so many ARPs
# if we do not have to. If a host cannot handle a unicasted ARP request, set
# the following option to False.
#
# Unicasting ARP requests is common practice (in some scenarios) for other
# networking operating systems so it is unlikely that you will need to set
# this to False.
unicast_arp_requests = True
cumulus@leaf01:~$ sudo systemctl restart rdnbrd.service
   
    
```

### What is table 10? Why was table 10 chosen?

The Linux kernel supports multiple routing tables and can utilize 0
through 255 as table IDs. However, tables 0, 253, 254 and 255 are
reserved, and 1 is usually the first one utilized. Therefore, `rdnbrd`
only allows you to specify 2-252. The number 10 was chosen for no
particular reason. Feel free to set it to any value between 2-252. You
can see all the tables specified here:

``` 
                   
cumulus@switch$ cat /etc/iproute2/rt_tables
#
# reserved values
#
255 local
254 main
253 default
0 unspec
#
# local
#
#1  inr.ruhep
   
    
```

Read more information on [Linux route
tables](http://linux-ip.net/html/routing-tables.html), or you can read
the [Ubuntu man pages for ip
route](http://manpages.ubuntu.com/manpages/quantal/man8/ip-route.8.html).

### How do I determine that the /32 redistribute neighbor routes are being advertised to my neighbor?

For BGP, check the advertised routes to the neighbor.

``` 
                   
cumulus@leaf01:~$ sudo vtysh
Hello, this is Quagga (version 0.99.23.1+cl3u2).
Copyright 1996-2005 Kunihiro Ishiguro, et al.
leaf01# show ip bgp neighbor swp51 advertised-routes 
BGP table version is 5, local router ID is 10.0.0.11
Status codes: s suppressed, d damped, h history, * valid, > best, = multipath,
              i internal, r RIB-failure, S Stale, R Removed
Origin codes: i - IGP, e - EGP, ? - incomplete
 
   Network          Next Hop            Metric LocPrf Weight Path
*> 10.0.0.11/32     0.0.0.0                  0         32768 i
*> 10.0.0.12/32     ::                                     0 65020 65012 i
*> 10.0.0.21/32     ::                                     0 65020 i
*> 10.0.0.22/32     ::                                     0 65020 i
 
Total number of prefixes 4
   
    
```

### How do I verify that the kernel routing table is being correctly populated?

Use the following workflow to verify that the kernel routing table is
being populated correctly and that routes are being correctly
imported/advertised:

1.  Verify that ARP neighbor entries are being populated into the Kernel
    routing table 10.
    
    ``` 
                       
    cumulus@switch:~$ ip route show table 10
    10.0.1.101 dev swp1 scope link
       
        
    ```
    
    If these routes are not being generated, verify the following:
    
      - That the `rdnbrd` daemon is running
    
      - Check `/etc/rdnbrd.conf` to verify the correct table number is
        used

2.  Verify that routes are being imported into FRRouting from the kernel
    routing table 10.
    
    ``` 
                       
    cumulus@switch:~$ sudo vtysh
    Hello, this is Quagga (version 0.99.23.1+cl3u2).
    Copyright 1996-2005 Kunihiro Ishiguro, et al.
     
    switch# show ip route table
    Codes: K - kernel route, C - connected, S - static, R - RIP,
           O - OSPF, I - IS-IS, B - BGP, A - Babel, T - Table,
           > - selected route, * - FIB route
     T[10]>* 10.0.1.101/32 [19/0] is directly connected, swp1, 01:25:29
       
        
    ```
    
    Both the \> and \* should be present so that table 10 routes are
    installed as preferred into the routing table. If the routes are not
    being installed, verify the following:
    
      - The imported distance of the locally imported kernel routes
        using the `ip import 10 distance X` command, where X is **not**
        less than the adminstrative distance of the routing protocol. If
        the distance is too low, routes learned from the protocol may
        overwrite the locally imported routes.
    
      - The routes are in the kernel routing table.

3.  Confirm that routes are in the BGP/OSPF database and are being
    advertised.
    
    ``` 
                       
    switch# show ip bgp
       
        
    ```
