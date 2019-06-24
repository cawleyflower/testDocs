---
title: Integrating Hardware VTEPs with Midokura MidoNet and OpenStack
author: Unknown
weight: 409
pageID: 8362304
product: Cumulus Linux
version: '3.6'
aliases:
 - /display/undefined/Integrating+Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
Cumulus Linux seamlessly integrates with the MidoNet OpenStack
infrastructure, where the switches provide the VTEP gateway for
terminating VXLAN tunnels from within MidoNet. MidoNet connects to the
OVSDB server running on the Cumulus Linux switch, and exchanges
information about the VTEPs and MAC addresses associated with the
OpenStack Neutron networks. This provides seamless Ethernet connectivity
between virtual and physical server infrastructures.

{{\< imgOld 0 \>}}
