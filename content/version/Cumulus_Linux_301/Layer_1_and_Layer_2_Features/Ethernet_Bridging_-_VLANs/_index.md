---
title: Ethernet Bridging - VLANs
author: Cumulus Networks
weight: 105
aliases:
 - /display/CL30/Ethernet+Bridging_-_VLANs
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301//Layer_1_and_Layer_2_Features/Ethernet_Bridging_-_VLANs
pageID: 5118277
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
Ethernet bridges provide a means for hosts to communicate at layer 2.
Bridge members can be individual physical interfaces, bonds or logical
interfaces that traverse an 802.1Q VLAN trunk. Cumulus Linux does not
put all ports into a bridge by default.

Cumulus Linux 2.5.0 introduced a new method for configuring bridges that
are
*[VLAN-aware](/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments.html)*
. The bridge driver in Cumulus Linux is capable of VLAN filtering, which
allows for configurations that are similar to incumbent network devices.
While Cumulus Linux supports Ethernet bridges in traditional mode
Cumulus Networks **** recommends using
[VLAN-aware](/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments.html)
mode unless you are using VXLANs in your network.

For a comparison of traditional and VLAN-aware modes, read [this
knowledge base
article](https://support.cumulusnetworks.com/hc/en-us/articles/204909397).

{{%notice tip%}}

You can configure both VLAN-aware and traditional mode bridges on the
same network in Cumulus Linux; however you should not have more than one
VLAN-aware bridge on a given switch. If you are implementing
[VXLANs](/Static_MAC_Bindings_with_VXLAN.html), you **must** use
traditional bridge mode.

{{%/notice%}}

## Configuration Files

  - /etc/network/interfaces

## Commands

  - brctl

  - bridge

  - ip addr

  - ip link

## Examining MAC Addresses

A bridge forwards frames by looking up the destination MAC address. A
bridge learns the source MAC address of a frame when the frame enters
the bridge on an interface. After the MAC address is learned, the bridge
maintains an age for the MAC entry in the bridge table. The age is
refreshed when a frame is seen again with the same source MAC address.
When a MAC is not seen for greater than the MAC ageing time, the MAC
address is deleted from the bridge table.

The following shows the MAC address table of the example bridge. Notice
that the `is local?` column indicates if the MAC address is the
interface's own MAC address (`is local` is *yes*), or if it is learned
on the interface from a packet's source MAC (where `is local` is *no*):

    cumulus@switch:~$ sudo brctl showmacs my_bridge
     port name mac addr              is local?       ageing timer
     swp4      06:90:70:22:a6:2e     no                19.47
     swp1      12:12:36:43:6f:9d     no                40.50
     bond0     2a:95:22:94:d1:f0     no                 1.98
     swp1      44:38:39:00:12:9b     yes                0.00
     swp2      44:38:39:00:12:9c     yes                0.00
     swp3      44:38:39:00:12:9d     yes                0.00
     swp4      44:38:39:00:12:9e     yes                0.00
     bond0     44:38:39:00:12:9f     yes                0.00
     swp2      90:e2:ba:2c:b1:94     no                12.84
     swp2      a2:84:fe:fc:bf:cd     no                 9.43

You can use the `bridge fdb` command to display the MAC address table as
well:

    cumulus@switch:~$ bridge fdb show
    44:38:39:00:12:9c dev swp2 VLAN 0 master bridge-A permanent
    44:38:39:00:12:9b dev swp1 VLAN 0 master bridge-A permanent
    44:38:39:00:12:9e dev swp4 VLAN 0 master bridge-B permanent
    44:38:39:00:12:9d dev swp3 VLAN 0 master bridge-B permanent

{{%notice note%}}

You can clear a MAC address from the table using the `bridge fdb`
command:

    cumulus@switch:~$ sudo bridge fdb del 44:38:39:00:12:9c dev swp2

{{%/notice%}}

## Configuration Files

  - /etc/network/interfaces

  - /etc/network/interfaces.d/

  - /etc/network/if-down.d/

  - /etc/network/if-post-down.d/

  - /etc/network/if-pre-up.d/

  - /etc/network/if-up.d/

## Useful Links

  - [www.linuxfoundation.org/collaborate/workgroups/networking/bridge](http://www.linuxfoundation.org/collaborate/workgroups/networking/bridge)

  - [www.linuxfoundation.org/collaborate/workgroups/networking/vlan](http://www.linuxfoundation.org/collaborate/workgroups/networking/vlan)

  - [www.linuxjournal.com/article/8172](http://www.linuxjournal.com/article/8172)

## Caveats and Errata

  - The same bridge cannot contain multiple subinterfaces of the
    **same** port as members. Attempting to apply such a configuration
    will result in an error.
