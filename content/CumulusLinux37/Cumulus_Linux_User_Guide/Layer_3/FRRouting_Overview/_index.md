---
title: FRRouting Overview
author: Unknown
weight: 187
pageID: 8362917
---
# FRRouting Overview

<span id="src-8362917_indexterm-F3D59B90777F47380142953551D11233">Cumulus
Linux uses </span>FRRouting to provide the routing protocols for dynamic
routing. FRRouting provides many routing protocols, of which Cumulus
Linux supports the following:

  - Open Shortest Path First ([v2](Open_Shortest_Path_First_-_OSPF.html)
    and [v3](Open_Shortest_Path_First_v3_-_OSPFv3.html))

  - [Border Gateway
Protocol](Border_Gateway_Protocol_-_BGP.html)

## Architecture

![images/download/attachments/8362917/daemons.png](images/download/attachments/8362917/daemons.png)

<span id="src-8362917_indexterm-2B982F7259FAB50D978630B526A44DF2">As
shown in the figure above, the FRRouting suite consists of various
protocol-specific daemons and a protocol-independent daemon called
</span>`zebra`. Each of the protocol-specific daemons are responsible
for running the relevant protocol and building the routing table based
on the information exchanged.

<span id="src-8362917_indexterm-4AA4309FFBCF1B08101AC106D9ADBBA3">It is
not uncommon to have more than one protocol daemon running at the same
time. For example, at the edge of an enterprise, protocols internal to
an enterprise (called IGP for </span>Interior Gateway Protocol) such as
[OSPF](Open_Shortest_Path_First_-_OSPF.html)<span id="src-8362917_indexterm-7E4BEA768586C86D382BA717E9639795">
or RIP run alongside the protocols that connect an enterprise to the
rest of the world (called EGP or </span>Exterior Gateway Protocol) such
as [BGP](Border_Gateway_Protocol_-_BGP.html).

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
