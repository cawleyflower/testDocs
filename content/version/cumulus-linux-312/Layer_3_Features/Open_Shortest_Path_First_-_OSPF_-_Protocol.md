---
title: Open Shortest Path First - OSPF - Protocol
author: Cumulus Networks
weight: 139
aliases:
 - /display/CL31/Open+Shortest+Path+First+-+OSPF+-+Protocol
 - /pages/viewpage.action?pageId=5122126
pageID: 5122126
product: Cumulus Linux
version: 3.1.2
imgData: cumulus-linux-312
siteSlug: cumulus-linux-312
---
OSPFv2 is a [link-state routing
protocol](http://en.wikipedia.org/wiki/Link-state_routing_protocol) for
IPv4. OSPF maintains the view of the network topology conceptually as a
directed graph. Each router represents a vertex in the graph. Each link
between neighboring routers represents a unidirectional edge. Each link
has an associated weight (called cost) that is either automatically
derived from its bandwidth or administratively assigned. Using the
weighted topology graph, each router computes a shortest path tree (SPT)
with itself as the root, and applies the results to build its forwarding
table. The computation is generally referred to as *SPF computation* and
the resultant tree as the *SPF tree*.

An LSA ( *link-state advertisement*) is the fundamental quantum of
information that OSPF routers exchange with each other. It seeds the
graph building process on the node and triggers SPF computation. LSAs
originated by a node are distributed to all the other nodes in the
network through a mechanism called *flooding*. Flooding is done
hop-by-hop. OSPF ensures reliability by using link state acknowledgement
packets. The set of LSAs in a router’s memory is termed *link-state
database* (LSDB), a representation of the network graph. Thus, OSPF
ensures a consistent view of LSDB on each node in the network in a
distributed fashion (eventual consistency model); this is key to the
protocol’s correctness.

## <span>Scalability and Areas</span>

An increase in the number of nodes affects OSPF scalability in the
following ways:

  - Memory footprint to hold the entire network topology,

  - Flooding performance,

  - SPF computation efficiency.

The OSPF protocol advocates hierarchy as a *divide and conquer* approach
to achieve high scale. The topology may be divided into areas, resulting
in a two-level hierarchy. Area 0 (or 0.0.0.0), called the backbone area,
is the top level of the hierarchy. Packets traveling from one non-zero
area to another must go via the backbone area. As an example, the
leaf-spine topology we have been referring to in the routing section can
be divided into areas as follows:

{{% imgOld 0 %}}

Here are some points to note about areas and OSPF behavior:

  - Routers that have links to multiple areas are called *area border
    routers* (ABR). For example, routers R3, R4, R5, R6 are ABRs in the
    diagram. An ABR performs a set of specialized tasks, such as SPF
    computation per area and summarization of routes across areas.

  - Most of the LSAs have an area-level flooding scope. These include
    router LSA, network LSA, and summary LSA.

{{%notice note%}}

In the diagram, we reused the same non-zero area address. This is fine
since the area address is only a scoping parameter provided to all
routers within that area. It has no meaning outside the area. Thus, in
the cases where ABRs do not connect to multiple non-zero areas, the same
area address can be used, thus reducing the operational headache of
coming up with area addresses.

{{%/notice%}}

## <span>Configuring OSPFv2</span>

Configuring OSPF involves the following tasks:

  - Enabling the OSPF daemon

  - Enabling OSPF

  - Defining (Custom) OSPF parameters on the interfaces

### <span>Enabling the OSPF and Zebra Daemons</span>

To enable OSPF, enable the `zebra` and `ospf` daemons, as described in
[Configuring
Quagga](/version/cumulus-linux-312/Layer_3_Features/Configuring_Quagga/),
then start the Quagga service:

    cumulus@switch:~$ sudo systemctl enable quagga.service
    cumulus@switch:~$ sudo systemctl start quagga.service

### <span>Configuring OSPF</span>

As we discussed in [Introduction to Routing
Protocols](/version/cumulus-linux-312/Layer_3_Features/Introduction_to_Routing_Protocols),
there are three steps to the configuration:

1.  Identifying the router with the router ID.

2.  With whom should the router communicate?

3.  What information (most notably the prefix reachability) to
    advertise?

There are two ways to achieve (2) and (3) in the Quagga OSPF:

1.  The `network` statement under `router ospf` does both. The statement
    is specified with an IP subnet prefix and an area address. All the
    interfaces on the router whose IP address matches the `network`
    subnet are put into the specified area. OSPF process starts bringing
    up peering adjacency on those interfaces. It also advertises the
    interface IP addresses formatted into LSAs (of various types) to the
    neighbors for proper reachability.
    
    From the `vtysh` shell:
    
        cumulus@switch:~$ sudo vtysh
         
        Hello, this is Quagga (version 0.99.23.1+cl3.0).
        Copyright 1996-2005 Kunihiro Ishiguro, et al.
         
        R3# configure terminal
        R3(config)# router ospf
        R3(config-router)# router-id 0.0.0.1
        R3(config-router)# network 10.0.0.0/16 area 0.0.0.0
        R3(config-router)# network 192.0.2.0/16 area 0.0.0.1
        R3(config-router)#
    
    Or through `cl-ospf`, from the Cumulus Linux shell:
    
        cumulus@switch:~$ sudo cl-ospf router set id 0.0.0.1
        cumulus@switch:~$ sudo cl-ospf router set network 10.0.0.0/16 area 0.0.0.0
        cumulus@switch:~$ sudo cl-ospf router set network 192.0.2.0/16 area 0.0.0.1
    
    The subnets in the `network` subnet can be as coarse as possible to
    cover the most number of interfaces on the router that should run
    OSPF.
    
    There may be interfaces where it’s undesirable to bring up OSPF
    adjacency. For example, in a data center topology, the host-facing
    interfaces need not run OSPF; however the corresponding IP addresses
    should still be advertised to neighbors. This can be achieved using
    the `passive-interface` construct.
    
    From the vytsh/quagga CLI:
    
        R3# configure terminal
        R3(config)# router ospf
        R3(config-router)# passive-interface swp10
        R3(config-router)# passive-interface swp11
    
    Or use the `passive-interface default` command to put all interfaces
    as passive and selectively remove certain interfaces to bring up
    protocol adjacency:
    
        R3# configure terminal
        R3(config)# router ospf
        R3(config-router)# passive-interface default
        R3(config-router)# no passive-interface swp1

2.  Explicitly enable OSPF for each interface by configuring it under
    the interface configuration mode:
    
        R3# configure terminal
        R3(config)# interface swp1
        R3(config-if)# ip ospf area 0.0.0.0
    
    If OSPF adjacency bringup is not desired, you should configure the
    corresponding interfaces as passive as explained above.
    
    This model of configuration is required for unnumbered interfaces as
    discussed later in this guide.
    
    For achieving step (3) alone, the `quagga` configuration provides
    another method: *redistribution*. For example:
    
        R3# configure terminal
        R3(config)# router ospf
        R3(config-router)# redistribute connected
    
    Redistribution, however, unnecessarily loads the database with
    type-5 LSAs and should be limited to generating real external
    prefixes (for example, prefixes learned from BGP). In general, it is
    a good practice to generate local prefixes using `network` and/or
    `passive-interface` statements.

{{%notice note%}}

The OSPF setting `log-adjacency-changes` is enabled by default. It logs
a single message when a peer transitions to/from FULL state.

{{%/notice%}}

### <span>Defining (Custom) OSPF Parameters on the Interfaces</span>

1.  Network type, such as point-to-point, broadcast.

2.  Timer tuning, like hello interval.

3.  For unnumbered interfaces (see below), enable OSPF.

Using Quagga's `vtysh`:

    R3(config)# interface swp1
    R3(config-if)# ospf network point-to-point
    R3(config-if)# ospf hello-interval 5

Or through `cl-ospf`, from the Cumulus Linux shell:

    cumulus@switch:~$ sudo cl-ospf interface swp1 set network point-to-point
    cumulus@switch:~$ sudo cl-ospf interface swp1 set hello-interval 5

The OSPF configuration is saved in `/etc/quagga/ospfd.conf`.

### <span>OSP SPF Timer Defaults</span>

OSPF uses the following three timers as an exponential backoff, to
prevent consecutive SPFs from hammering the CPU:

  - 0 ms from initial event until SPF runs

  - 50 ms between consecutive SPF runs (the number doubles with each
    SPF, until it reaches the value of C)

  - 5000 ms maximum between SPFs

### <span>Configure MD5 Authentication for OSPF Neighbors</span>

Simple text passwords have largely been deprecated in Quagga, in favor
of MD5 hash authentication; the following section covers the setup
configuration for MD5 authentication on Cumulus Linux switches:

1.  Enter the Quagga CLI on the switch:
    
        cumulus@switch:~$ sudo vtysh

2.  Change into the CLI's configuration mode:
    
        switch# configure terminal

3.  Run the `authentication` command to specify MD5 authentication is
    used:
    
        switch(config)# ip ospf authentication message-digest

4.  Use the `message-digest-key` command to create a key and key ID for
    md5:
    
    {{%notice note%}}
    
    In the example input below, `KEYID` represents the key used to
    create the message digest. This must be consistent across all
    routers on a link.
    
    `KEY` represents the actual message digest key, and is associated to
    the given `KEYID`. This value has an upper range of 16 characters.
    Longer strings will be truncated.
    
    {{%/notice%}}
    
        switch(config)# ip ospf message-digest-key KEYID md5 KEY

{{%notice info%}}

Existing MD5 authentication hashes can be removed with the `no ip ospf
message-digest-key` command.

{{%/notice%}}

## <span>Scaling Tips</span>

Here are some tips for how to scale out OSPF.

### <span>Summarization</span>

By default, an ABR creates a summary (type-3) LSA for each route in an
area and advertises it in adjacent areas. Prefix range configuration
optimizes this behavior by creating and advertising one summary LSA for
multiple routes.

To configure a range:

    R3(config)# router ospf
    R3(config-router)# area 0.0.0.1 range 30.0.0.0/8

{{%notice tip%}}

Summarize in the direction to the backbone. The backbone receives
summarized routes and injects them to other areas already summarized.

{{%/notice%}}

{{%notice note%}}

Summarization can cause non-optimal forwarding of packets during
failures. Here is an example scenario:

{{%/notice%}}

{{% imgOld 1 %}}

As shown in the diagram, the ABRs in the right non-zero area summarize
the host prefixes as 10.1.0.0/16. When the link between R5 and R10
fails, R5 will send a worse metric for the summary route (metric for the
summary route is the maximum of the metrics of intra-area routes that
are covered by the summary route. Upon failure of the R5-R10 link, the
metric for 10.1.2.0/24 goes higher at R5 as the path is R5-R9-R6-R10).
As a result, other backbone routers shift traffic destined to
10.1.0.0/16 towards R6. This breaks ECMP and is an under-utilization of
network capacity for traffic destined to 10.1.1.0/24.

### <span>Stub Areas</span>

Nodes in an area receive and store intra-area routing information and
summarized information about other areas from the ABRs. In particular, a
good summarization practice about inter-area routes through prefix range
configuration helps scale the routers and keeps the network stable.

Then there are external routes. External routes are the routes
redistributed into OSPF from another protocol. They have an AS-wide
flooding scope. In many cases, external link states make up a large
percentage of the LSDB.

*Stub **areas* alleviate this scaling problem. A stub area is an area
that does not receive external route advertisements.

To configure a stub area:

    R3(config)# router ospf
    R3(config-router)# area 0.0.0.1 stub

Stub areas still receive information about networks that belong to other
areas of the same OSPF domain. Especially, if summarization is not
configured (or is not comprehensive), the information can be
overwhelming for the nodes. *Totally stubby areas* address this issue.
Routers in totally stubby areas keep in their LSDB information about
routing within their area, plus the default route.

To configure a totally stubby area:

    R3(config)# router ospf
    R3(config-router)# area 0.0.0.1 stub no-summary

Here is a brief tabular summary of the area type differences:

| Type                  | Behavior                                                                            |
| --------------------- | ----------------------------------------------------------------------------------- |
| Normal non- zero area | LSA types 1, 2, 3, 4 area-scoped, type 5 externals, inter-area routes summarized    |
| Stub area             | LSA types 1, 2, 3, 4 area-scoped, No type 5 externals, inter-area routes summarized |
| Totally stubby area   | LSA types 1, 2 area-scoped, default summary, No type 3, 4, 5 LSA types allowed      |

### <span id="src-5122126_OpenShortestPathFirst-OSPF-Protocol-multi-instance" class="confluence-anchor-link"></span><span>Running Multiple ospfd Instances</span>

The `ospfd` daemon is VRF-aware and a single instance of it can have
multiple independent processes, each tied to its own VRF. The best way
to configure multi-process (multi-VRF) OSPF is discussed in the [VRF
chapter](/version/cumulus-linux-312/Layer_3_Features/Virtual_Routing_and_Forwarding_-_VRF).

However, you can configure multi-process OSPF using multiple `ospfd`
instances, but this is a legacy method and is not recommended in most
cases because:

  - Multiple `ospfd` processes are only supported in the default routing
    table/VRF.

  - You can run multiple `ospfd` instances with OSPFv2 only, not with
    OSPFv3.

  - FRRouting supports up to 5 instances currently, and the instance ID
    must be within the range of 1 through 65535.

To configure multi-process OSPF with multiple `ospfd` instances, do the
following:

1.  Edit `/etc/quagga/daemons` and add *ospfd\_instances="instance1
    instance2 ..."* to the `ospfd` line, specifying an instance ID for
    each separate instance. For example, the following configuration has
    OSPF enabled with 2 `ospfd` instances, 11 and 22:
    
        cumulus@switch:~$ cat /etc/quagga/daemons
        zebra=yes
        bgpd=no
        ospfd=yes ospfd_instances="11 22"
        ospf6d=no
        ripd=no
        ripngd=no
        isisd=no

2.  After you modify the `daemons` file, restart Quagga:
    
        cumulus@switch:~$ sudo systemctl restart quagga

3.  Use `vtysh` to configure each instance:
    
        cumulus@switch:~$ sudo vtysh
        switch# conf t
        switch(config)# int swp1
        switch(config-if)#  ip ospf 11 area 0.0.0.0
        switch(config-if)# router ospf 11
        switch(config-router)# ospf router-id 1.1.1.1
         
        ...
         
        switch(config)# int swp2
        switch(config-if)#  ip ospf 22 area 0.0.0.0
        switch(config-if)# router ospf 11
        switch(config-router)# ospf router-id 1.1.1.1

4.  Confirm the configuration with the `show running` command:
    
        switch# sh run
        Building configuration...
        Current configuration:
        !
        hostname zebra
        log file /var/log/quagga/zebra.log
        username cumulus nopassword
        !
        service integrated-vtysh-config
        !
        interface eth0
         ipv6 nd suppress-ra
         link-detect
        !
        interface lo
         link-detect
        !
        interface swp1
         ip ospf 11 area 0.0.0.0
         link-detect
        !
        interface swp2
         ip ospf 22 area 0.0.0.0
         link-detect
        !
        interface swp45
         link-detect
        !
        interface swp46
         link-detect
        !
        interface swp47
         link-detect
        !
        interface swp48
         link-detect
        !
        interface swp49
         link-detect
        !
        interface swp50
         link-detect
        !
        interface swp51
         link-detect
        !
        interface swp52
         link-detect
        !
        interface vagrant
         link-detect
        !
        router ospf 11
         ospf router-id 1.1.1.1
        !
        router ospf 22
         ospf router-id 1.1.1.1
        !
        ip forwarding
        ipv6 forwarding
        !
        line vty
        !
        end

5.  After you exit `vtysh`, you can confirm that all the OSPF instances
    are running:
    
        cumulus@switch:~$ ps -ax | grep ospf
        21135 ?        S<s    0:00 /usr/lib/quagga/ospfd --daemon -A 127.0.0.1 -n 11
        21139 ?        S<s    0:00 /usr/lib/quagga/ospfd --daemon -A 127.0.0.1 -n 22
        21160 ?        S<s    0:01 /usr/lib/quagga/watchquagga -adz -r /usr/sbin/servicebBquaggabBrestartbB%s -s /usr/sbin/servicebBquaggabBstartbB%s -k /usr/sbin/servicebBquaggabBstopbB%s -b bB -t 30 zebra ospfd-11 ospfd-22 pimd
        22021 pts/3    S+     0:00 grep ospf

#### <span>Caveats</span>

You can use the `redistribute ospf` option in your Quagga.conf file
works with this so you can route between the instances. Specify the
instance ID for the other OSPF instance. For example:

    cumulus@switch:~$ cat /etc/quagga/Quagga.conf
    hostname zebra
    log file /var/log/quagga/zebra.log
    username cumulus nopassword
    !
    service integrated-vtysh-config
    !
     
    ...
     
    !
    router ospf 11
     ospf router-id 1.1.1.1
    !
    router ospf 22
     ospf router-id 1.1.1.1
     redistribute ospf 11
    !
     
     
    ...

{{%notice note%}}

Don't specify a process ID unless you are using multi-instance OSPF.

{{%/notice%}}

{{%notice note%}}

If you disabled the
[integrated](Configuring_Quagga.html#src-5122123_ConfiguringQuagga-integrated_cfg)
Quagga configuration, you must create a separate `ospfd` configuration
file for each instance. The `ospfd.conf` file must include the instance
ID in the file name. Continuing with our example, you would create
`/etc/quagga/ospfd-11.conf` and `/etc/quagga/ospfd-22.conf`.

    cumulus@switch:~$ cat /etc/quagga/ospfd-11.conf 
    !
    hostname zebra
    log file /var/log/quagga/zebra.log
    username cumulus nopassword
    !
    service integrated-vtysh-config
    !
    interface eth0
     ipv6 nd suppress-ra
     link-detect
    !
    interface lo
     link-detect
    !
    interface swp1
     ip ospf 11 area 0.0.0.0
     link-detect
    !
    interface swp2
     ip ospf 22 area 0.0.0.0
     link-detect
    !
    interface swp45
     link-detect
    !
    interface swp46
     link-detect
    !
    interface swp47
     link-detect
    !
    interface swp48
     link-detect
    !
    interface swp49
     link-detect
    !
    interface swp50
     link-detect
    !
    interface swp51
     link-detect
    !
    interface swp52
     link-detect
    !
    interface vagrant
     link-detect
    !
    router ospf 11
     ospf router-id 1.1.1.1
    !
    router ospf 22
     ospf router-id 1.1.1.1
    !
    ip forwarding
    ipv6 forwarding
    !
    line vty
    !

{{%/notice%}}

## <span id="src-5122126_OpenShortestPathFirst-OSPF-Protocol-ospf_unnum" class="confluence-anchor-link"></span><span>Unnumbered Interfaces</span>

Unnumbered interfaces are interfaces without unique IP addresses. In
OSPFv2, configuring unnumbered interfaces reduces the links between
routers into pure topological elements, which dramatically simplifies
network configuration and reconfiguration. In addition, the routing
database contains only the real networks, so the memory footprint is
reduced and SPF is faster.

{{%notice note%}}

Unnumbered is usable for point-to-point interfaces only.

{{%/notice%}}

{{%notice warning%}}

If there is a `network <network number>/<mask> area <area ID>` command
present in the Quagga configuration, the `ip ospf area <area ID>`
command is rejected with the error “Please remove network command
first.” This prevents you from configuring other areas on some of the
unnumbered interfaces. You can use either the `network area` command or
the `ospf area` command in the configuration, but not both.

{{%/notice%}}

{{%notice tip%}}

Unless the Ethernet media is intended to be used as a LAN with multiple
connected routers, we recommend configuring the interface as
point-to-point. It has the additional advantage of a simplified
adjacency state machine; there is no need for DR/BDR election and *LSA
reflection*. See [RFC5309](http://tools.ietf.org/rfc/rfc5309) for a more
detailed discussion.

{{%/notice%}}

To configure an unnumbered interface, take the IP address of another
interface (called the *anchor*) and use that as the IP address of the
unnumbered interface:

    auto lo
    iface lo inet loopback
      address 192.0.2.1/32
     
    auto swp1
    iface swp1
      address 192.0.2.1/32
     
    auto swp2
    iface swp2
      address 192.0.2.1/32

To enable OSPF on an unnumbered interface from within Quagga's `vtysh`:

    R3(config)# interface swp1
    R3(config-if)# ip ospf area 0.0.0.1

## <span>ECMP</span>

During SPF computation for an area, if OSPF finds multiple paths with
equal cost (metric), all those paths are used for forwarding. For
example, in the reference topology diagram, R8 uses both R3 and R4 as
next hops to reach a destination attached to R9.

## <span>Topology Changes and OSPF Reconvergence</span>

Topology changes usually occur due to one of four events:

1.  Maintenance of a router node

2.  Maintenance of a link

3.  Failure of a router node

4.  Failure of a link

For the maintenance events, operators typically raise the OSPF
administrative weight of the link(s) to ensure that all traffic is
diverted from the link or the node (referred to as *costing out*). The
speed of reconvergence does not matter. Indeed, changing the OSPF cost
causes LSAs to be reissued, but the links remain in service during the
SPF computation process of all routers in the network.

For the failure events, traffic may be lost during reconvergence; that
is, until SPF on all nodes computes an alternative path around the
failed link or node to each of the destinations. The reconvergence
depends on layer 1 failure detection capabilities and at the worst case
*DeadInterval* OSPF timer.

### <span>Example Configurations</span>

Example configuration for event 1, using `vtysh`:

    R3(config)# router ospf
    R3(config-router)# max-metric router-lsa administrative

Or, with the non-modal shell command approach:

    cumulus@switch:~$ sudo cl-ospf router set max-metric router-lsa administrative

Example configuration for event 2, using `vtysh`:

    R3(config)# interface swp1
    R3(config-if)# ospf cost 65535

Or, with the non-modal shell command approach:

    cumulus@switch:~$ sudo cl-ospf interface swp1 set cost 65535

## <span id="src-5122126_OpenShortestPathFirst-OSPF-Protocol-ospf_debug" class="confluence-anchor-link"></span><span>Debugging OSPF</span>

[OperState](http://www.nongnu.org/quagga/docs/docs-info.html#Showing-OSPF-information)
lists all the commands to view the operational state of OSPF.

The three most important states while troubleshooting the protocol are:

1.  Neighbors, with `show ip ospf neighbor`. This is the starting point
    to debug neighbor states (also see `tcpdump` below).

2.  Database, with `show ip ospf database`. This is the starting point
    to verify that the LSDB is, in fact, synchronized across all routers
    in the network. For example, sweeping through the output of `show ip
    ospf database router` taken from all routers in an area will ensure
    if the topology graph building process is complete; that is, every
    node has seen all the other nodes in the area.

3.  Routes, with `show ip ospf route`. This is the outcome of SPF
    computation that gets downloaded to the forwarding table, and is the
    starting point to debug, for example, why an OSPF route is not being
    forwarded correctly.
    
    {{%notice tip%}}
    
    Compare the route output with kernel by using `show ip route | grep
    zebra` and with the hardware entries using `cl-route-check -V`.
    
    {{%/notice%}}

Using `cl-ospf`:

    cumulus@switch:~$ sudo cl-ospf neighbor show [all | detail]
     
    cumulus@switch:~$ sudo cl-ospf database show [asbr-summary | network | opaque-area |
                                          opaque-link | summary | external |
                                          nssa-external | opaque-as | router]
     
    cumulus@switch:~$ sudo cl-ospf route show

[Debugging-OSPF](http://www.nongnu.org/quagga/docs/docs-info.html#Debugging-OSPF)
lists all of the OSPF debug options.

Using `cl-ospf`:

    Usage: cl-ospf debug { COMMAND | help }
     
    COMMANDs
          { set | clear } (all | event | ism | ism [OBJECT] | lsa | lsa [OBJECT] |
                       nsm | nsm [OBJECT] | nssa | packet | packet [OBJECT] | 
                       zebra [OBJECT] | zebra all)

Using `zebra` under `vtysh`:

    cumulus@switch:~$ sudo vtysh
    R3# show [zebra]
     
    IOBJECT := { events | status | timers }
    OOBJECT := { interface | redistribute }
    POBJECT := { all | dd | hello | ls-ack | ls-request | ls-update }
    ZOBJECT := { all | events | kernel | packet | rib |

Using `tcpdump` to capture OSPF packets:

    cumulus@switch:~$ sudo tcpdump -v -i swp1 ip proto ospf

## <span>Configuration Files</span>

  - /etc/quagga/ospfd.conf

## <span>Supported RFCs</span>

  - 
    
    <div id="src-5122126_indexterm-47E45FA7C7A2BA341B2C557496E8D11F">
    
    [RFC2328](http://tools.ietf.org/rfc/rfc2328)
    
    </div>

  - [RFC3137](http://tools.ietf.org/rfc/rfc3137)

  - [RFC5309](http://tools.ietf.org/rfc/rfc5309)

## <span>Useful Links</span>

  - [Bidirectional forwarding
    detection](/version/cumulus-linux-312/Layer_3_Features/Bidirectional_Forwarding_Detection_-_BFD)
    (BFD) and OSPF

  - [en.wikipedia.org/wiki/Open\_Shortest\_Path\_First](http://en.wikipedia.org/wiki/Open_Shortest_Path_First)

  - [www.nongnu.org/quagga/docs/docs-info.html\#OSPFv2](http://www.nongnu.org/quagga/docs/docs-info.html#OSPFv2)

  - Perlman, Radia (1999). Interconnections: Bridges, Routers, Switches,
    and Internetworking Protocols (2 ed.). Addison-Wesley.

  - Moy, John T. OSPF: Anatomy of an Internet Routing Protocol.
    Addison-Wesley.

<article id="html-search-results" class="ht-content" style="display: none;">

</article>

<footer id="ht-footer">

</footer>
