---
title: Network Virtualization
author: Unknown
weight: 21
pageID: 8362196
product: Cumulus Linux
version: '3.6'
aliases:
 - /display/undefined/Network+Virtualization
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
Cumulus Linux supports these forms of [network
virtualization](http://en.wikipedia.org/wiki/Network_virtualization):

  - [Static VXLAN
    Configurations](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
    
      - [Static VXLAN
        Tunnels](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
    
      - [Static MAC Bindings with
        VXLAN](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)

  - [Lightweight Network Virtualization
    Overview](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
    
      - [LNV VXLAN Active-Active
        Mode](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
    
      - [LNV Full
        Example](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)

  - [Ethernet Virtual Private Network -
    EVPN](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)

  - [VXLAN
    Routing](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)

  - [Virtualization
    Integrations](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
    
      - [Integrating Hardware VTEPs with Midokura MidoNet and
        OpenStack](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
    
      - [Integrating Hardware VTEPs with VMware
        NSX-V](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
    
      - [Integrating Hardware VTEPs with VMware
        NSX](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)

  - [VXLAN
    Scale](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)

  - [Hybrid Cloud Connectivity with QinQ and
    VXLANs](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)

*VXLAN* (Virtual Extensible LAN) is a standard overlay protocol that
abstracts logical virtual networks from the physical network underneath.
You can deploy simple and scalable layer 3 Clos architectures while
extending layer 2 segments over that layer 3 network.

VXLAN uses a VLAN-like encapsulation technique to encapsulate MAC-based
layer 2 Ethernet frames within layer 3 UDP packets. Each virtual network
is a VXLAN logical layer 2 segment. VXLAN scales to 16 million segments
– a 24-bit VXLAN network identifier (VNI ID) in the VXLAN header – for
multi-tenancy.

Hosts on a given virtual network are joined together through an overlay
protocol that initiates and terminates tunnels at the edge of the
multi-tenant network, typically the hypervisor vSwitch or top of rack.
These edge points are the VXLAN tunnel end points (VTEP).

Cumulus Linux can initiate and terminate VTEPs in hardware and supports
wire-rate VXLAN. VXLAN provides an efficient hashing scheme across the
IP fabric during the encapsulation process; the source UDP port is
unique, with the hash based on layer 2 through layer 4 information from
the original frame. The UDP destination port is the standard port 4789.

Cumulus Linux includes the native Linux VXLAN kernel support and
integrates with controller-based overlay solutions like [VMware
NSX](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
and [Midokura
MidoNet](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/).

VXLAN is supported only on switches in the [Cumulus Linux
HCL](http://cumulusnetworks.com/support/hcl/) using the Broadcom
Tomahawk, Trident II+ and Trident II chipsets, as well as the Mellanox
Spectrum chipset.

{{%notice note%}}

VXLAN encapsulation over layer 3 subinterfaces (for example, swp3.111)
is not supported. Only configure VXLAN uplinks as layer 3 interfaces
without any subinterfaces (for example, swp3).

The VXLAN tunnel endpoints cannot share a common subnet; there must be
at least one layer 3 hop between the VXLAN source and destination.

{{%/notice%}}

## Caveats and Errata

### Cut-through Mode and Store and Forward Switching

[Cut-through
mode](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/)
is **not** supported for VXLANs in Cumulus Linux on switches using
Broadcom Tomahawk, Trident II+ and Trident II ASICs. Store and forward
switching **is** supported on these ASICs.

Cut-through mode **is** supported for VXLANs in Cumulus Linux on
switches using Mellanox Spectrum ASICs. However, store and forward
switching is **not** supported on Spectrum.

### MTU Size for Virtual Network Interfaces

The maximum transmission unit (MTU) size for a virtual network interface
should be 50 bytes smaller than the MTU for the physical interfaces on
the switch. For more information on setting MTU, read [Layer 1 and
Switch Port
Attributes](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Virtualization/Network_Virtualization/).

## Useful Links

  - [VXLAN - RFC 7348](https://tools.ietf.org/html/rfc7348)

  - [ovsdb-server](http://openvswitch.org/support/dist-docs/ovsdb-server.1.html)
