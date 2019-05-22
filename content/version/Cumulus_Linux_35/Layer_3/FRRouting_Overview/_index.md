---
title: FRRouting Overview
author: Unknown
weight: 169
pageID: 8357713
aliases:
 - /old/Cumulus_Linux_35/FRRouting_Overview.html
imgData: Cumulus_Linux_35
siteSlug: Cumulus_Linux_35
---
Cumulus Linux uses FRRouting to provide the routing protocols for
dynamic routing. FRRouting provides many routing protocols, of which
Cumulus Linux supports the following:

  - Open Shortest Path First
    ([v2](/old/Cumulus_Linux_35/Open_Shortest_Path_First_-_OSPF_-_Protocol.html)
    and
    [v3](/old/Cumulus_Linux_35/Open_Shortest_Path_First_v3_-_OSPFv3_-_Protocol.html))

  - [Border Gateway
    Protocol](/old/Cumulus_Linux_35/Border_Gateway_Protocol_-_BGP.html)

## Architecture

{{%imgOld 0 %}}

As shown in the figure above, the FRRouting suite consists of various
protocol-specific daemons and a protocol-independent daemon called
`zebra`. Each of the protocol-specific daemons are responsible for
running the relevant protocol and building the routing table based on
the information exchanged.

It is not uncommon to have more than one protocol daemon running at the
same time. For example, at the edge of an enterprise, protocols internal
to an enterprise (called IGP for Interior Gateway Protocol) such as
[OSPF](/old/Cumulus_Linux_35/Open_Shortest_Path_First_-_OSPF_-_Protocol.html)
or RIP run alongside the protocols that connect an enterprise to the
rest of the world (called EGP or Exterior Gateway Protocol) such as
[BGP](/old/Cumulus_Linux_35/Border_Gateway_Protocol_-_BGP.html).

## About zebra

`zebra` is the daemon that resolves the routes provided by multiple
protocols (including static routes specified by the user) and programs
these routes in the Linux kernel via `netlink` (in Linux). `zebra` does
more than this, of course. The [FRRouting
documentation](https://frrouting.org/user-guide/zebra.html) defines
`zebra` as the IP routing manager for FRRouting that "provides kernel
routing table updates, interface lookups, and redistribution of routes
between different routing protocols."

## Related Information

  - [frrouting.org](https://frrouting.org)

  - [GitHub](https://github.com/FRRouting/frr)
