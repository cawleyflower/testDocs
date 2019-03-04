# Network Virtualization

Cumulus Linux supports these forms of [network
virtualization](http://en.wikipedia.org/wiki/Network_virtualization):

-   [Static VXLAN Configurations](Static_VXLAN_Configurations)
    -   [Static VXLAN Tunnels](Static_VXLAN_Tunnels)
    -   [Static MAC Bindings with VXLAN](Static_MAC_Bindings_with_VXLAN)
-   [Lightweight Network Virtualization
    Overview](Lightweight_Network_Virtualization_Overview)
    -   [LNV VXLAN Active-Active Mode](LNV_VXLAN_Active-Active_Mode)
    -   [LNV Full Example](LNV_Full_Example)
-   [Ethernet Virtual Private Network -
    EVPN](Ethernet_Virtual_Private_Network_-_EVPN)
-   [VXLAN Routing](VXLAN_Routing)
-   [Virtualization Integrations](Virtualization_Integrations)
    -   [Integrating Hardware VTEPs with Midokura MidoNet and
        OpenStack](Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack)
    -   [Integrating Hardware VTEPs with VMware
        NSX-V](Integrating_Hardware_VTEPs_with_VMware_NSX-V)
    -   [Integrating Hardware VTEPs with VMware
        NSX-MH](Integrating_Hardware_VTEPs_with_VMware_NSX-MH)
    -   [OVSDB Server High Availability](OVSDB_Server_High_Availability)
-   [VXLAN Scale](VXLAN_Scale)
-   [VXLAN Tunnel DSCP Operations
    — DRAFT](VXLAN_Tunnel_DSCP_Operations_—_DRAFT)
-   [Hybrid Cloud Connectivity with QinQ and
    VXLANs](Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs)
-   [Eng Update of VXLAN Hyperloop](Eng_Update_of_VXLAN_Hyperloop)

*VXLAN* (Virtual Extensible LAN) is a standard overlay protocol that
abstracts logical virtual networks from the physical network underneath.
You can deploy simple and scalable layer 3 Clos architectures while
extending layer 2 segments over that layer 3 network.

VXLAN uses a VLAN-like encapsulation technique to encapsulate MAC-based
layer 2 Ethernet frames within layer 3 UDP packets. Each virtual network
is a VXLAN logical layer 2 segment. VXLAN scales to 16 million segments
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
NSX](Integrating_Hardware_VTEPs_with_VMware_NSX-MH) and [Midokura
MidoNet](Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack).

VXLAN is supported only on switches in the [Cumulus Linux
HCL](http://cumulusnetworks.com/support/hcl/) using the Broadcom
Tomahawk, Trident II, Trident II+ and Trident3 chipsets, as well as
the Mellanox Spectrum chipset.

VXLAN encapsulation over layer 3 subinterfaces (for example, swp3.111)
is not supported. Only configure VXLAN uplinks as layer 3 interfaces
without any subinterfaces (for example, swp3).

The VXLAN tunnel endpoints cannot share a common subnet; there must be
at least one layer 3 hop between the VXLAN source and destination.

## Caveats and Errata

### Cut-through Mode and Store and Forward Switching

[Cut-through
mode](Buffer-and-Queue-Management_8363032.html#BufferandQueueManagement-cut_through_mode)
is **not** supported for VXLANs in Cumulus Linux on switches using
Broadcom Tomahawk, Trident II, Trident II+, and Trident3 ASICs. Store
and forward switching **is** supported on these ASICs. 

Cut-through mode **is** supported for VXLANs in Cumulus Linux on
switches using Mellanox Spectrum ASICs. However, store and forward
switching is **not** supported on Spectrum.

### MTU Size for Virtual Network Interfaces

The maximum transmission unit (MTU) size for a virtual network interface
should be 50 bytes smaller than the MTU for the physical interfaces on
the switch. For more information on setting MTU, read [Layer 1 and
Switch Port
Attributes](Switch-Port-Attributes_8363026.html#SwitchPortAttributes-mtu_vxlan). 

## Useful Links

-   [VXLAN - RFC 7348](https://tools.ietf.org/html/rfc7348)
-   [ovsdb-server](http://openvswitch.org/support/dist-docs/ovsdb-server.1.html)
