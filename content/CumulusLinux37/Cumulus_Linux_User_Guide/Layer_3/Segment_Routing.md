---
title: Segment Routing
author: Unknown
weight: 215
pageID: 8362962
---
# Segment Routing

{{%notice warning%}}

Segment routing is an [early access
feature](https://support.cumulusnetworks.com/hc/en-us/articles/202933878)
in Cumulus Linux and is supported only on [Mellanox
switches](https://cumulusnetworks.com/products/hardware-compatibility-list/?Brand=mellanox).

{{%/notice%}}

Cumulus Linux supports *segment routing,* also known as source routing,
which provides the ability for a source node to specify the path a
packet should take (traffic engineering). In some more advanced cases,
you can use segment routing to have offline multiprotocol label
switching (MPLS) controllers program labels into the network for traffic
engineering.

Cumulus Linux provides full label-based forwarding, relying on
[BGP](Border_Gateway_Protocol_-_BGP.html) for label exchange. However,
Cumulus Linux does not provide LDP interoperability for MPLS and it does
not support [VRFs](Virtual_Routing_and_Forwarding_-_VRF.html) for tenant
isolation.

## Features

Segment routing is MPLS for the data plane **only**. In this EA release,
Cumulus Linux does not impose the labels, the host does. The MTUs should
be large enough to accommodate the MPLS shim header and label stack.
Segment routing supports the following features:

  - MPLS label edge router (LER) functionality for IPv4 and IPv6 routing
    with [ECMP](Equal_Cost_Multipath_Load_Sharing_-_Hardware_ECMP.html).
    An ingress LER first adds an MPLS label to an IP packet. An egress
    LER removes the outermost MPLS label (also called *popping* the
    label).

  - MPLS label switch router (LSR) functionality with ECMP. The LSR
    receives a packet with a label and forwards it based on that label.

  - [FRRouting](FRRouting_Overview.html) support for MPLS transit label
    switched paths (LSPs) and labeled routes (LER), both static routes
    and routes using BGP labeled-unicast (LU).

  - FRR support for BGP/MPLS segment routing based on
    [draft-ietf-idr-bgp-prefix-sid-06](https://datatracker.ietf.org/doc/draft-ietf-idr-bgp-prefix-sid/).

## Configure Segment Routing

To configure the segment routing example above, use the `label-index`
option in [NCLU](Network_Command_Line_Utility_-_NCLU.html). Configure
the following on each node:

``` 
                   
cumulus@switch:~$ net add bgp network 10.1.1.1/32 label-index 1
cumulus@switch:~$ net add bgp network 10.1.1.2/32 label-index 2
cumulus@switch:~$ net add bgp network 10.1.1.3/32 label-index 3
cumulus@switch:~$ net add bgp network 10.1.1.4/32 label-index 4
cumulus@switch:~$ net add bgp network 10.1.1.5/32 label-index 5
cumulus@switch:~$ net pending
cumulus@switch:~$ net commit
   
    
```

Then, for each switch in the topology, define the *global-block* of
labels to use for segment routing in [FRR](Configuring_FRRouting.html).
The default global-block is 16000-23999. The example configuration uses
global-block `100 200`. The *local label* is the MPLS label global-block
plus the label-index.

``` 
                   
cumulus@switch:~$ cat /etc/frr/frr.conf
router bgp 400
 bgp router-id 10.1.1.4
 no bgp default ipv4-unicast
 neighbor EBGP peer-group
 neighbor EBGP remote-as external
 neighbor swp1 interface peer-group EBGP
 neighbor swp2 interface peer-group EBGP
 !
 address-family ipv4 unicast
  network 10.1.1.4/32 label-index 4
 exit-address-family
 !
 address-family ipv4 labeled-unicast
  neighbor EBGP activate
 exit-address-family
!
mpls label global-block 100 200
   
    
```

## View the Configuration

You can see the label-index when you show the BGP configuration on a
router.

``` 
                   
cumulus@r4:~$ net show configuration bgp
 
...
router bgp 400
 bgp router-id 10.1.1.4
 
 address-family ipv4 unicast
  network 10.1.1.4/32 label-index 4
   
    
```

Or from another node in the network:

``` 
                   
cumulus@r1:~$ net show bgp 10.1.1.4/32
BGP routing table entry for 10.1.1.4/32
Local label: 104
Paths: (1 available, best #1, table Default-IP-Routing-Table)
  Advertised to non peer-group peers:
  h1(swp1) r2(swp2) r4(swp3)
  400
    fe80::202:ff:fe00:c from r4(swp3) (10.1.1.4)
    (fe80::202:ff:fe00:c) (used)
      Origin IGP, metric 0, localpref 100, valid, external, bestpath-from-AS 400, best
      Remote label: 3
      Label Index: 4
      AddPath ID: RX 0, TX 14
      Last update: Tue Aug 15 13:57:45 2017
cumulus@r1:~$ 
   
    
```

You can see the FRR MPLS table in the output below, where r1 receives a
packet with label 104. Its outbound label is 3, which appears as
*implicit-null* below, so it pops then the payload is forwarded out of
swp3, the interface to r4:

``` 
                   
cumulus@r1:~$ net show mpls table
 
 Inbound                                Outbound
   Label     Type              Nexthop     Label
--------  -------  -------------------  --------
     102      BGP  fe80::202:ff:fe00:6         3
     103      BGP  fe80::202:ff:fe00:6       103
     104      BGP  fe80::202:ff:fe00:c         3
     105      BGP  fe80::202:ff:fe00:c       105
     106      BGP  fe80::202:ff:fe00:1         3
     107      BGP  fe80::202:ff:fe00:6       107
 
cumulus@r1:~$ 
cumulus@r1:~$ 
cumulus@r1:~$ net show mpls table 104
Local label: 104 (installed)
 type: BGP remote label: implicit-null distance: 150
  via fe80::202:ff:fe00:c dev swp3 (installed)
cumulus@r1:~$ 
   
    
```

You can see the MPLS routing table that is installed in the kernel as
well:

``` 
                   
cumulus@r1:~$ ip -f mpls route show
102 via inet6 fe80::202:ff:fe00:6 dev swp2  proto zebra 
103 as to 103 via inet6 fe80::202:ff:fe00:6 dev swp2  proto zebra 
104 via inet6 fe80::202:ff:fe00:c dev swp3  proto zebra 
105  proto zebra 
    nexthop as to 105  via inet6 fe80::202:ff:fe00:6  dev swp2
    nexthop as to 105  via inet6 fe80::202:ff:fe00:c  dev swp3
106 via inet6 fe80::202:ff:fe00:1 dev swp1  proto zebra 
107 as to 107 via inet6 fe80::202:ff:fe00:6 dev swp2  proto zebra  
cumulus@r1:~$ 
cumulus@r1:~$ ip -f mpls route show 104
104 via inet6 fe80::202:ff:fe00:c dev swp3  proto zebra 
cumulus@r1:~$ 
   
    
```