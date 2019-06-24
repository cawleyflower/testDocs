---
title: Quagga Overview
author: Cumulus Networks
weight: 133
aliases:
 - /display/CL30/Quagga+Overview
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301//Layer_3_Features
pageID: 5118385
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
Cumulus Linux uses `quagga`, an open source routing software suite, to
provide the routing protocols for dynamic routing. Cumulus Linux
supports the l atest Quagga version, <span style="color: #2c2d30;">
0.99.23.1+cl3.0 </span> . Quagga is a fork of the [GNU
Zebra](http://www.gnu.org/software/zebra/) project.

Quagga provides many routing protocols, of which Cumulus Linux supports
the following:

  - Open Shortest Path First
    ([v2](/Open_Shortest_Path_First_-_OSPF_-_Protocol.html) and
    [v3](/Open_Shortest_Path_First_v3_-_OSPFv3_-_Protocol.html))

  - [Border Gateway Protocol](/Border_Gateway_Protocol_-_BGP.html)

## Architecture

{{\< imgOld 0 \>}}

As shown in the figure above, the Quagga routing suite consists of
various protocol-specific daemons and a protocol-independent daemon
called ` zebra  `. Each of the protocol-specific daemons are responsible
for running the relevant protocol and building the routing table based
on the information exchanged.

It is not uncommon to have more than one protocol daemon running at the
same time. For example, at the edge of an enterprise, protocols internal
to an enterprise (called IGP for Interior Gateway Protocol) such as
[OSPF](/Open_Shortest_Path_First_-_OSPF_-_Protocol.html) or RIP run
alongside the protocols that connect an enterprise to the rest of the
world (called EGP or Exterior Gateway Protocol) such as
[BGP](/Border_Gateway_Protocol_-_BGP.html).

`zebra` is the daemon that resolves the routes provided by multiple
protocols (including static routes specified by the user) and programs
these routes in the Linux kernel via `netlink` (in Linux). `zebra` does
more than this, of course.

## Zebra

The [Quagga
documentation](http://www.nongnu.org/quagga/docs/docs-info.html#Zebra)
defines `zebra` as the IP routing manager for `quagga` that "provides
kernel routing table updates, interface lookups, and redistribution of
routes between different routing protocols."

## Configuration Files

  - /etc/quagga/bgpd.conf

  - /etc/quagga/debian.conf

  - /etc/quagga/ospf6d.conf

  - /etc/quagga/ospfd.conf

  - /etc/quagga/vtysh.conf

  - /etc/quagga/zebra.conf

## Useful Links

  - <http://www.quagga.net/>

  - <http://packages.debian.org/quagga>
