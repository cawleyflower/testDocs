---
title: Traditional Mode Bridges
author: Cumulus Networks
weight: 301
aliases:
 - /display/CL321/Traditional+Mode+Bridges
 - /pages/viewpage.action?pageId=5126851
pageID: 5126851
product: Cumulus Linux
version: 3.2.1
imgData: cumulus-linux-321
siteSlug: cumulus-linux-321
---
Cumulus Networks recommends you use a [VLAN-aware
bridge](/version/cumulus-linux-321/Layer_One_and_Two/Ethernet_Bridging_-_VLANs/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments)
on your switch. You use traditional mode bridges only if you need to run
more than one bridge on the switch or if you need to use PVSTP+.

## <span>Creating a Traditional Mode Bridge</span>

You configure traditional mode bridges in `/etc/network/interfaces`
file. To create a traditional mode bridge:

1.  Open the `/etc/network/interfaces` file in a text editor.

2.  Add a new stanza to create the bridge, and save the file. The
    example below creates a bridge with STP enabled and the MAC address
    ageing timer configured to a lower value than the default:
    
        auto my_bridge
        iface my_bridge
            bridge-ports bond0 swp5 swp6
            bridge-ageing 150
            bridge-stp on
    
    <table>
    <colgroup>
    <col style="width: 33%" />
    <col style="width: 33%" />
    <col style="width: 33%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th><p>Configuration Option</p></th>
    <th><p>Description</p></th>
    <th><p>Default Value</p></th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>bridge-ports</p></td>
    <td><p>List of logical and physical ports belonging to the logical bridge.</p></td>
    <td><p>N/A</p></td>
    </tr>
    <tr class="even">
    <td><p>bridge-ageing</p></td>
    <td><p>Maximum amount of time before a MAC addresses learned on the bridge expires from the bridge MAC cache.</p></td>
    <td><p>300 seconds</p></td>
    </tr>
    <tr class="odd">
    <td><p>bridge-stp</p></td>
    <td><p>Enables spanning tree protocol on this bridge. The default spanning tree mode is Per VLAN Rapid Spanning Tree Protocol (PVRST).</p>
    <p>For more information on spanning-tree configurations see the configuration section: <a href="/version/cumulus-linux-321/Layer_One_and_Two/Spanning_Tree_and_Rapid_Spanning_Tree">Spanning Tree and Rapid Spanning Tree</a>.</p></td>
    <td><p>off</p></td>
    </tr>
    </tbody>
    </table>
    
    {{%notice note%}}
    
    The name of the bridge must be:
    
      - Compliant with Linux interface naming conventions.
    
      - Unique within the switch.
    
    {{%/notice%}}
    
    {{%notice warning%}}
    
    Do not try to bridge the management port, eth0, with any switch
    ports (like swp0, swp1, and so forth). For example, if you created a
    bridge with eth0 and swp1, it will **not** work.
    
    {{%/notice%}}

3.  Reload the network configuration using the `ifreload` command:
    
        cumulus@switch:~$ sudo ifreload -a

{{%notice info%}}

You can configure multiple bridges, in order to logically divide a
switch into multiple layer 2 domains. This allows for hosts to
communicate with other hosts in the same domain, while separating them
fro hosts in other domains.

<div class="confbox admonition admonition-note">

<span class="admonition-icon confluence-information-macro-icon"></span>

<div class="admonition-body">

{{%notice info%}}

You can create only one VLAN-aware bridge on a switch.

{{%/notice%}}

</div>

</div>

The diagram below shows a multiple bridge configuration, where host-1
and host-2 are connected to bridge-A, while host-3 and host-4 are
connected to bridge-B. This means that:

  - host-1 and host-2 can communicate with each other.

  - host-3 and host-4 can communicate with each other.

  - host-1 and host-2 cannot communicate with host-3 and host-4.

{{% imgOld 0 %}}

This example configuration looks like this in the
`/etc/network/interfaces` file:

    auto bridge-A
    iface bridge-A
        bridge-ports swp1 swp2
        bridge-stp on
     
    auto bridge-B
    iface bridge-B
        bridge-ports swp3 swp4
        bridge-stp on

{{%/notice%}}

## <span id="src-5126851_TraditionalModeBridges-VLAN_tagging" class="confluence-anchor-link"></span><span>Using Trunks in Traditional Bridge Mode</span>

The [IEEE standard](http://www.ieee802.org/1/pages/802.1Q.html) for
trunking is 802.1Q. The 802.1Q specification adds a 4 byte header within
the Ethernet frame that identifies the VLAN of which the frame is a
member.

802.1Q also identifies an *untagged* frame as belonging to the *native*
VLAN (most network devices default their native VLAN to 1). The concept
of native, non-native, tagged or untagged has generated confusion due to
mixed terminology and vendor-specific implementations. Some
clarification is in order:

  - A *trunk port* is a switch port configured to send and receive
    802.1Q tagged frames.

  - A switch sending an untagged (bare Ethernet) frame on a trunk port
    is sending from the native VLAN defined on the trunk port.

  - A switch sending a tagged frame on a trunk port is sending to the
    VLAN identified by the 802.1Q tag.

  - A switch receiving an untagged (bare Ethernet) frame on a trunk port
    places that frame in the native VLAN defined on the trunk port.

  - A switch receiving a tagged frame on a trunk port places that frame
    in the VLAN identified by the 802.1Q tag.

A bridge in traditional mode has no concept of trunks, just tagged or
untagged frames. With a trunk of 200 VLANs, there would need to be 199
bridges, each containing a tagged physical interface, and one bridge
containing the native untagged VLAN. See the examples below for more
information.

{{%notice note%}}

The interaction of tagged and un-tagged frames on the same trunk often
leads to undesired and unexpected behavior. A switch that uses VLAN 1
for the native VLAN may send frames to a switch that uses VLAN 2 for the
native VLAN, thus merging those two VLANs and their spanning tree state.

{{%/notice%}}

### <span>Trunk Example</span>

{{% imgOld 1 %}}

To create the above example, add the following configuration to the
`/etc/network/interfaces` file:

    auto br-VLAN100
    iface br-VLAN100
     bridge-ports swp1.100 swp2.100
     bridge-stp on
     
     
    auto br-VLAN200
    iface br-VLAN200
     bridge-ports swp1.200 swp2.200
     bridge-stp on

### <span>VLAN Tagging Examples</span>

You can find more examples of VLAN tagging in [this
chapter](/version/cumulus-linux-321/Layer_One_and_Two/Ethernet_Bridging_-_VLANs/VLAN_Tagging).

<article id="html-search-results" class="ht-content" style="display: none;">

</article>

<footer id="ht-footer">

</footer>
