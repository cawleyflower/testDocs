---
title: Network Virtualization
author: Unknown
weight: 21
pageID: 8362196
aliases:
 - /old/Cumulus_Linux_36/Network_Virtualization.html
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
Cumulus Linux supports these forms of [network
virtualization](http://en.wikipedia.org/wiki/Network_virtualization):

  - [Static VXLAN
    Configurations](/old/Cumulus_Linux_36/Static_VXLAN_Configurations.html)
    
      - [Static VXLAN
        Tunnels](/old/Cumulus_Linux_36/Static_VXLAN_Tunnels.html)
    
      - [Static MAC Bindings with
        VXLAN](/old/Cumulus_Linux_36/Static_MAC_Bindings_with_VXLAN.html)

  - [Lightweight Network Virtualization
    Overview](/old/Cumulus_Linux_36/Lightweight_Network_Virtualization_Overview.html)
    
      - [LNV VXLAN Active-Active
        Mode](/old/Cumulus_Linux_36/LNV_VXLAN_Active-Active_Mode.html)
    
      - [LNV Full Example](/old/Cumulus_Linux_36/LNV_Full_Example.html)

  - [Ethernet Virtual Private Network -
    EVPN](/old/Cumulus_Linux_36/Ethernet_Virtual_Private_Network_-_EVPN.html)

  - [VXLAN Routing](/old/Cumulus_Linux_36/VXLAN_Routing.html)

  - [Virtualization
    Integrations](/old/Cumulus_Linux_36/Virtualization_Integrations.html)
    
      - [Integrating Hardware VTEPs with Midokura MidoNet and
        OpenStack](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html)
    
      - [Integrating Hardware VTEPs with VMware
        NSX-V](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_VMware_NSX-V.html)
    
      - [Integrating Hardware VTEPs with VMware
        NSX](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_VMware_NSX.html)

  - [VXLAN Scale](/old/Cumulus_Linux_36/VXLAN_Scale.html)

  - [Hybrid Cloud Connectivity with QinQ and
    VXLANs](/old/Cumulus_Linux_36/Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs.html)

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
NSX](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_VMware_NSX.html)
and [Midokura
MidoNet](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html).

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
mode](/old/Cumulus_Linux_36/Buffer_and_Queue_Management.html#src-8362498_BufferandQueueManagement-cut_through_mode)
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
Attributes](/old/Cumulus_Linux_36/Switch_Port_Attributes.html#src-8362492_SwitchPortAttributes-mtu_vxlan).

## Useful Links

  - [VXLAN - RFC 7348](https://tools.ietf.org/html/rfc7348)

  - [ovsdb-server](http://openvswitch.org/support/dist-docs/ovsdb-server.1.html)
