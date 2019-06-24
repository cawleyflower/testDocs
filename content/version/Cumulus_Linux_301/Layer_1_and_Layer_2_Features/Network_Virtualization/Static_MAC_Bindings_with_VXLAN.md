---
title: Static MAC Bindings with VXLAN
author: Cumulus Networks
weight: 255
aliases:
 - /display/CL30/Static+MAC_Bindings_with_VXLAN
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301//Layer_1_and_Layer_2_Features/Network_Virtualization
pageID: 5118341
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
Cumulus Linux includes native Linux VXLAN kernel support.

## Requirements

A VXLAN configuration requires a switch with a Tomahawk, Trident II+ or
Trident II chipset running Cumulus Linux 2.0 or later.

For a basic VXLAN configuration, you should ensure that:

  - The VXLAN has a network identifier (VNI); do not use 0 or 16777215
    as the VNI ID, as they are reserved values under Cumulus Linux.

  - The VXLAN link and local interfaces are added to bridge to create
    the association between port, VLAN and VXLAN instance.

  - Each bridge on the switch has only one VXLAN interface. Cumulus
    Linux does not support more than one VXLAN link in a bridge; however
    a switch can have multiple bridges.

{{%notice note%}}

VXLANs are not supported on switches with [Spectrum
ASICs](https://cumulusnetworks.com/hcl).

{{%/notice%}}

## Example VXLAN Configuration

Consider the following example:

{{\< imgOld 0 \>}}

{{%notice warning%}}

Preconfiguring remote MAC addresses does not scale. A better solution is
to use the Cumulus Networks [Lightweight Network
Virtualization](https://docs.cumulusnetworks.com/pages/viewpage.action?pageId=2722663)
feature, or a controller-based option like [Midokura MidoNet and
OpenStack](https://docs.cumulusnetworks.com/pages/viewpage.action?pageId=2722662)
or [VMware
NSX](https://docs.cumulusnetworks.com/pages/viewpage.action?pageId=2722660).

{{%/notice%}}

## Troubleshooting VXLANs in Cumulus Linux

Use the following commands to troubleshoot issues on the switch:

  - `brctl show`: Verifies the VXLAN configuration in a bridge:
    
    ``` 
                       
    cumulus@switch:~$ brctl show
    bridge name     bridge id              STP enabled       interfaces
    br-vxln100      8000.44383900480d         no             swp2s0.100
                                                             swp2s1.100
                                                             vxln100
       
        
    ```

  - `bridge fdb show`: Displays the list of MAC addresses in an FDB:
    
    ``` 
                       
    cumulus@switch1:~$ bridge fdb show
    52:54:00:ae:2a:e0 dev vxln100 dst 172.16.21.150 self permanent
    d2:ca:78:bb:7c:9b dev vxln100 permanent
    90:e2:ba:3f:ce:34 dev swp2s1.100
    90:e2:ba:3f:ce:35 dev swp2s0.100
    44:38:39:00:48:0e dev swp2s1.100 permanent
    44:38:39:00:48:0d dev swp2s0.100 permanent
       
        
    ```

  - `ip -d link show`: Displays information about the VXLAN link:
    
    ``` 
                       
    cumulus@switch1:~$ ip –d link show vxln100
    71: vxln100:  mtu 1500 qdisc noqueue master br-vxln100 state UP 
        mode DEFAULT group default 
        link/ether d2:ca:78:bb:7c:9b brd ff:ff:ff:ff:ff:ff promiscuity 1 
        vxlan id 100 local 36.0.0.11 srcport 0 0 dstport 4789 ageing 300 
        bridge_slave state forwarding priority 32 cost 100 hairpin off guard off root_block off 
        fastleave off learning on flood on port_id 0x8001 port_no 0x1 designated_port 32769 
        designated_cost 0 designated_bridge 8000.c4:54:44:bd:1:71 designated_root 8000.c4:54:44:bd:1:71 
        hold_timer    0.00 message_age_timer    0.00 forward_delay_timer    0.00 
        topology_change_ack 0 config_pending 0 proxy_arp off proxy_arp_wifi off mcast_router 1 
        mcast_fast_leave off addrgenmode eui64 
       
        
    ```
