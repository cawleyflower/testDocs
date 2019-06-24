---
title: LACP Bypass
author: Cumulus Networks
weight: 109
aliases:
 - /display/CL30/LACP+Bypass
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301//Layer_1_and_Layer_2_Features
pageID: 5118359
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
On Cumulus Linux, *LACP Bypass* is a feature that allows a
[bond](/Bonding_-_Link_Aggregation.html) configured in 802.3ad mode to
become active and forward traffic even when there is no LACP partner. A
typical use case for this feature is to enable a host, without the
capability to run LACP, to PXE boot while connected to a switch on a
bond configured in 802.3ad mode. Once the pre-boot process finishes and
the host is capable of running LACP, the normal 802.3ad link aggregation
operation takes over.

## Understanding the LACP Bypass All-active Mode

When a bond has multiple slave interfaces, each bond slave interface
operates as an active link while the bond is in bypass mode. This is
known as *all-active mode*. This is useful during PXE boot of a server
with multiple NICs, when the user cannot determine beforehand which port
needs to be active.

Keep in the mind the following caveats with all-active mode:

  - All-active mode is not supported on bonds that are not specified as
    bridge ports on the switch.

  - Spanning tree protocol (STP) does not run on the individual bond
    slave interfaces when the LACP bond is in all-active mode.
    Therefore, only use all-active mode on host-facing LACP bonds.
    Cumulus Networks highly recommends you configure [STP BPDU
    guard](/Spanning_Tree_and_Rapid_Spanning_Tree.html#src-5118355_SpanningTreeandRapidSpanningTree-bpdu)
    along with all-active mode.

{{%notice note%}}

As of Cumulus Linux 3.0.0, priority mode, bond-lacp-bypass-period,
bond-lap-bypass-priority and bond-lap-bypass-all-active are no longer
supported.

{{%/notice%}}

### LACP Bypass and MLAG Deployments

In an [MLAG deployment](/Multi-Chassis_Link_Aggregation_-_MLAG.html)
where bond slaves of a host are connected to two switches and the bond
is in all-active mode, all the slaves of bond are active on both the
primary and secondary MLAG nodes.

## Configuring LACP Bypass

You configure LACP bypass in the `/etc/network/interfaces` file.

To enable LACP bypass on the host-facing bond, under the bond interface
stanza, set `bond-lacp-bypass-allow` to *1*.

### VLAN-aware Bridge Mode Configuration

The following configuration shows LACP bypass enabled for a bridge in
[VLAN-aware
mode](/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments.html):

    auto bond1
    iface bond1
        bond-slaves swp51s2 swp51s3
        clag-id 1
        bond-lacp-bypass-allow 1
    
    ...
    
    auto br0
    iface br0
        bridge-vlan-aware yes
        mstpctl-bpduguard bond1=yes
        bridge_ports bond1 bond2 bond3 bond4 peer5
        bridge-stp on
        bridge-vids 100-105

You can check the status of the configuration by running `ip link show`
on the bond and its slave interfaces:

    cumulus@switch:~$ ip link show bond1
    164: bond1: <BROADCAST,MULTICAST,MASTER,UP,LOWER_UP> mtu 1500 qdisc noqueue master br0 state UP mode DORMANT group default 
        link/ether c4:54:44:f6:44:5a brd ff:ff:ff:ff:ff:ff
    cumulus@switch:~$ ip link show swp51s2
    55: swp51s2: <BROADCAST,MULTICAST,SLAVE,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master bond1 state UP mode DEFAULT group default qlen 1000
        link/ether c4:54:44:f6:44:5a brd ff:ff:ff:ff:ff:ff
    cumulus@switch:~$ ip link show swp52s3
    56: swp51s3: <BROADCAST,MULTICAST,SLAVE,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master bond1 state UP mode DEFAULT group default qlen 1000
        link/ether c4:54:44:f6:44:5a brd ff:ff:ff:ff:ff:ff

Use the `cat` command to verify that LACP bypass is enabled on a bond
and its slave interfaces:

    cumulus@switch:~$ cat /sys/class/net/bond1/bonding/lacp_bypass 
    on 1
    cumulus@switch:~$ cat /sys/class/net/bond1/bonding/slaves
    swp51s2 swp51s3
    cumulus@switch:~$ cat /sys/class/net/swp51s2/bonding_slave/ad_rx_bypass 
    1
    cumulus@switch:~$ cat /sys/class/net/swp51s3/bonding_slave/ad_rx_bypass 
    1

### Traditional Bridge Mode Configuration

The following configuration shows LACP bypass enabled for multiple
active interfaces (all-active mode) with a bridge in [traditional bridge
mode](/Ethernet_Bridging_-_VLANs.html):

    auto bond1
    iface bond1 
        bond-slaves swp3 swp4
        bond-lacp-bypass-allow 1
    
    auto br0
    iface br0
        bridge-ports bond1 bond2 bond3 bond4 peer5
        bridge-stp on
        mstpctl-bpduguard bond1=yes
