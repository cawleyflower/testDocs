# Eng Update of VXLAN Hyperloop

This chapter describes how to configure VXLAN gateways using a loopback
cable (called a *hyperloop*) on non-RIOT (VXLAN routing) capable ASICs
running Cumulus Linux.  

The Broadcom Trident II and Tomahawk ASICs have a limitation where a
layer 2 bridge that contains a VXLAN interface cannot also have an IP
address assigned to it. This is an expected limitation with this ASIC
because of the ordering of the decapsulation. A packet that is
decapsulated will already have passed the portion of the ASIC capable of
reading the IP address lookup (for example, VXLAN lookup occurs before
IP address lookup). Contact your [sales
team ](mailto:sales@cumulusnetworks.com)if there is any confusion. Refer
to the [Cumulus Networks Hardware Compatibility
List ](https://wiki.cumulusnetworks.com/cumulusnetworks.com/hcl)to
determine which ASIC is running on the switch.

**This limitation does not exist in some ASICs.** For example, the
Trident II+ provides the [RIOT (Routing In/Out of
Tunnels)](https://www.broadcom.com/press/release.php?id=s907324) feature;
see [VXLAN Routing](VXLAN_Routing) for more information. 

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [Requirements](#EngUpdateofVXLANHyperloop-reqsRequirements)
-   [Hyperloop Use Cases](#EngUpdateofVXLANHyperloop-HyperloopUseCases)
    -   [Exit a VXLAN with a
        Hyperloop](#EngUpdateofVXLANHyperloop-hyperloopExitaVXLANwithaHyperloop)
    -   -   [Packet Flow
        Diagram](#EngUpdateofVXLANHyperloop-PacketFlowDiagram)
    -   [Trident II and Tomahawk switchd
        Flag](#EngUpdateofVXLANHyperloop-TridentIIandTomahawkswitchdFlag)

-   [VXLAN Hyperloop Troubleshooting
    Matrix](#EngUpdateofVXLANHyperloop-VXLANHyperloopTroubleshootingMatrix)
    -   [Are HER (Head End Replication) entries being programmed into
        the bridge fdb
        table?](#EngUpdateofVXLANHyperloop-AreHER(HeadEndReplication)entriesbeingprogrammedintothebridgefdbtable?)
    -   [If you are using an MLAG VTEP (dual attached), is it set up
        correctly?](#EngUpdateofVXLANHyperloop-IfyouareusinganMLAGVTEP(dualattached),isitsetupcorrectly?)
    -   [Can you ping from host to host on the same
        VXLAN?](#EngUpdateofVXLANHyperloop-CanyoupingfromhosttohostonthesameVXLAN?)
    -   [Is the SVI on a physical interface or on a traditional
        bridge? ](#EngUpdateofVXLANHyperloop-IstheSVIonaphysicalinterfaceoronatraditionalbridge?)
    -   [Is the port plugged in
        correctly?](#EngUpdateofVXLANHyperloop-Istheportpluggedincorrectly?)
    -   [Is the VRR MAC address unique per
        subnet?](#EngUpdateofVXLANHyperloop-IstheVRRMACaddressuniquepersubnet?)

## Requirements

-   VXLAN hyperloop only works on an ASIC capable of encapsulating and
    decapsulating VXLAN traffic, which includes:
    -   Broadcom Tomahawk
    -   Broadcom Trident II
    -   Broadcom Trident II+
    -   Mellanox Spectrum
-   VXLAN hyperloop is supported on Cumulus Linux 3.2.1 and later. Make
    sure to [upgrade to the latest version](Upgrading_Cumulus_Linux) of
    Cumulus Linux. 
-   If you are using [EVPN](Ethernet_Virtual_Private_Network_-_EVPN),
    you must be running FRRouting version eau8. Use
    the `dpkg -l` command to check the FRRouting version:

    ``` text
    cumulus@leaf01:mgmt-vrf:~$ dpkg -l frr
    Desired=Unknown/Install/Remove/Purge/Hold
    | Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
    |/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
    ||/ Name                     Version           Architecture      Description
    +++-========================-=================-=================-=====================================================
    ii  frr                      1.0.0+cl3eau8     amd64             BGP/OSPF/RIP routing daemon
    ```

    If you are not running the correct version of FRRouting for
    EVPN, [follow these
    directions](Ethernet_Virtual_Private_Network_-_EVPN) to upgrade.

## Hyperloop Use Cases

Without native VXLAN routing support, external gateways, firewalls, or
routers are attached to a VTEP do the routing, as in the diagram below.

It is very common in network virtualization environments for firewalls
to sit on internal VXLAN-tied VLANs as well as external VLANs that are
routed out to the internet. Consider the following illustration. No
special configuration is needed on the switch because the firewall acts
as the gateway between the internal VLAN (VLAN20/VNI-20) and the
routable external VLAN 10. VLAN 10 could have an SVI (switch virtual
interface) configured to route out of the VLAN. This also has the
benefit in cases where a VXLAN represents a tenant (or a purposely
separated application) — you want to keep the firewall between VXLANs so
that traffic can be filtered and sanitized to the network operator's
specification. 

![](attachments/8362882/8362886.png){height="250"}

With integrated VXLAN routing and bridging using a hyperloop:

-   You can avoid having to use external gateways or routers. A
    hyperloop provides the ability to do integrated VXLAN routing on a
    non-RIOT (VXLAN routing) ASIC.  
-   If applications are hosted on the switch and require layer 3
    connectivity, you can use a hyperloop to provide reachability for
    this application as well.

Do **not** use a hyperloop under these circumstances:

-   If the external firewall is used for routing and security (as shown
    above), then there is no need for an external loopback as the
    firewall provides routing across subnets.
-   If bandwidth for the traffic to be routed is so large that you
    cannot provision such high bandwidth using a hyperloop, use
    dedicated gateways connected to exit leafs instead. 
-   If north-south routing involves edge router functionality, then that
    functionality cannot be provided by leaf switches; it requires
    dedicated edge gateways to achieve the same result, like NAT.

### Exit a VXLAN with a Hyperloop

This limitation means a physical cable must be attached from one port on
leaf1 to another port on leaf1. One port is a layer 3 port while the
other is a member of the bridge. The native VLAN (VLAN ID 1) must be
tagged for all traffic going to the hyperloop ports.

For example, following the configuration above, for a layer 3 address to
be used as the gateway for vni-10, configure the following on exit01:

``` text
cumulus@exit01:~$ sudo nano /etc/network/interfaces
 
auto lo
iface lo inet loopback
   address 10.0.0.11/32
 
## some output removed for brevity (such as peerlink and host-facing bonds) ##
 
auto bridge
iface bridge
    bridge-vlan-aware yes
    bridge-ports inside server01 server02 vni-10 vni-20 peerlink
    bridge-vids 100 200
    bridge-pvid 1             # sets native VLAN to 1, an unused VLAN
    mstpctl-treeprio 8192
 
auto outside
iface outside
    bond-slaves swp45 swp47
    alias hyperloop outside 
    mstpctl-bpduguard yes
    mstpctl-portbpdufilter yes
 
auto inside
iface inside
    bond-slaves swp46 swp48
    alias hyperloop inside 
    mstpctl-bpduguard yes
    mstpctl-portbpdufilter yes
 
auto VLAN100GW
iface VLAN100GW
    bridge_ports outside.100
    address 172.16.100.2/24
    alias VXLAN GW 100 Linux Bridge
    address-virtual 44:38:39:FF:01:90 172.16.100.1/24

auto VLAN200GW
iface VLAN200GW
   bridge_ports outside.200
   address 172.16.200.2/24
   alias VXLAN GW 200 Linux Bridge
   address-virtual 44:38:39:FF:02:90 172.16.200.1/24 
 
auto vni-10
iface vni-10
    vxlan-id 10
    vxlan-local-tunnelip 10.0.0.11
    bridge-access 100
 
auto vni-20
iface vni-20
    vxlan-id 20
    vxlan-local-tunnelip 10.0.0.11
    bridge-access 200
```

### Packet Flow Diagram

![](attachments/8362882/8362887.png){height="400"}

### Trident II and Tomahawk switchd Flag

For the Broadcom Trident II and Tomahawk ASICs to be able to have a
hyperloop work correctly, you must configure the following `switchd`
flag. This change is not needed on any other hardware ASIC.

``` text
cumulus@exit01:mgmt-vrf:/root$ sudo nano /etc/cumulus/switchd.conf
hal.bcm.per_vlan_router_mac_lookup = TRUE
```

Restart `switchd` for the change to take place:

``` text
cumulus@exit01:mgmt-vrf:/root$ sudo systemctl restart switchd.service
```

Restarting `switchd` is a disruptive change and affects data plane
network traffic.

Setting `hal.bcm.per_vlan_router_mac_lookup = TRUE` limits the Trident
II switch to a configurable 512 local IP addresses (SVIs and so forth).
Use this only as a last resort. This is only a limitation on this
specific ASIC type.

## VXLAN Hyperloop Troubleshooting Matrix

Before you follow these troubleshooting steps, make sure your switch
meets the [requirements specified
above](#EngUpdateofVXLANHyperloop-reqs).

### Are HER (Head End Replication) entries being programmed into the bridge fdb table?

Check for 00:00:00:00:00:00 entries for each VXLAN using
the `bridge fdb show` command:

``` text
cumulus@leaf03:mgmt-vrf:~$ bridge fdb show | grep 00:00:00:00:00:00
00:00:00:00:00:00 dev vni-40 dst 10.10.10.30 self permanent
00:00:00:00:00:00 dev vni-40 dst 10.10.10.40 self permanent
00:00:00:00:00:00 dev vni-1 dst 10.10.10.30 self permanent
00:00:00:00:00:00 dev vni-1 dst 10.10.10.40 self permanent
00:00:00:00:00:00 dev vni-30 dst 10.10.10.30 self permanent
00:00:00:00:00:00 dev vni-30 dst 10.10.10.40 self permanent
00:00:00:00:00:00 dev vni-20 dst 10.10.10.30 self permanent
00:00:00:00:00:00 dev vni-20 dst 10.10.10.40 self permanent
00:00:00:00:00:00 dev vni-50 dst 10.10.10.30 self permanent
00:00:00:00:00:00 dev vni-50 dst 10.10.10.40 self permanent
00:00:00:00:00:00 dev vni-10 dst 10.10.10.30 self permanent
00:00:00:00:00:00 dev vni-10 dst 10.10.10.40 self permanent
```

or use [NCLU](Comparing_NCLU_and_vtysh_Commands):

``` text
cumulus@leaf03:mgmt-vrf:~$ net show bridge macs
VLAN      Master    Interface    MAC                TunnelDest    State      Flags    LastSeen
--------  --------  -----------  -----------------  ------------  ---------  -------  ----------------
1         bridge    server03     90:e2:ba:7e:96:d9                                    00:01:07
untagged            vni-1        00:00:00:00:00:00  10.10.10.30   permanent  self     4 days, 22:25:42
untagged            vni-1        00:00:00:00:00:00  10.10.10.40   permanent  self     4 days, 22:25:42
untagged            vni-10       00:00:00:00:00:00  10.10.10.30   permanent  self     4 days, 22:25:42
untagged            vni-10       00:00:00:00:00:00  10.10.10.40   permanent  self     4 days, 22:25:42
untagged            vni-20       00:00:00:00:00:00  10.10.10.30   permanent  self     4 days, 22:25:42
untagged            vni-20       00:00:00:00:00:00  10.10.10.40   permanent  self     4 days, 22:25:42
untagged            vni-30       00:00:00:00:00:00  10.10.10.30   permanent  self     4 days, 22:25:42
untagged            vni-30       00:00:00:00:00:00  10.10.10.40   permanent  self     4 days, 22:25:42
untagged            vni-40       00:00:00:00:00:00  10.10.10.30   permanent  self     4 days, 22:25:42
untagged            vni-40       00:00:00:00:00:00  10.10.10.40   permanent  self     4 days, 22:25:42
untagged            vni-50       00:00:00:00:00:00  10.10.10.30   permanent  self     4 days, 22:25:42
untagged            vni-50       00:00:00:00:00:00  10.10.10.40   permanent  self     4 days, 22:25:42
untagged  bridge    peerlink     2c:60:0c:72:eb:a0                permanent           5 days, 00:53:13
untagged  bridge    server03     2c:60:0c:72:eb:70                permanent           5 days, 00:53:13
untagged  bridge    vni-1        86:c9:5c:cc:88:54                permanent           4 days, 22:28:23
untagged  bridge    vni-10       32:d5:3a:99:36:f7                permanent           4 days, 22:28:23
untagged  bridge    vni-20       9a:91:5a:7e:0f:e8                permanent           4 days, 22:28:23
untagged  bridge    vni-30       6a:33:ff:fd:ca:34                permanent           4 days, 22:28:23
untagged  bridge    vni-40       e2:1f:a4:7c:75:2b                permanent           4 days, 22:28:23
untagged  bridge    vni-50       d6:df:b4:85:4d:55                permanent           4 days, 22:28:23
```

If you are not seeing HER entries, make sure that:

-   You are using
    either [LNV](Lightweight_Network_Virtualization_Overview) **OR**
    EVPN. You cannot use both at the same time.
-   You are not using any VNI/VXLAN values over 65535. For example,
    VXLAN 70000 is not supported in Cumulus Linux.
-   You are not using the reserved VLAN range; the default is 3000-3999.
    This range is stored in the `resv_vlan_range` variable in
    the `/etc/cumulus/switchd.conf` file.

### If you are using an MLAG VTEP (dual attached), is it set up correctly?

Check the outputs. Often, when VXLAN is considered to be non-working, it
is actually due to an incorrect setup on the server OS, whether it is
Ubuntu, Microsoft Windows, or RHEL.  
  
![](attachments/8362882/8362885.png){height="400"}

### Can you ping from host to host on the same VXLAN?

In the following network diagram, can server01 ping to server03 on any
of the VLANs (VLAN1, VLAN100, VLAN200)?  
![](attachments/8362882/8362883.png){height="400"}  
If you cannot even ping from server to server, this is not a VXLAN
gateway problem but a problem with the network itself. You must resolve
the network problem before you make a VXLAN gateway, with or without a
hyperloop. 

Only proceed past this point if you can get server to server
connectivity on the same VXLAN.

### Is the SVI on a physical interface or on a traditional bridge? 

The SVI (switch virtual interface) IP address for a hyperloop MUST be on
a traditional bridge. Follow the configuration guidelines above.

### Is the port plugged in correctly?

Use the `lldpctl` or `net show lldp` commands to see which ports are
hooked up:

``` text
cumulus@leaf03:mgmt-vrf:~$ net show lldp
Local Port    Speed    Mode                 Remote Port        Remote  Host     Summary
------------  -------  -------------  ----  -----------------  ---------------  -------------------------
eth0          1G       Mgmt           ====  swp42              oob-mgmt-switch  IP: 10.50.100.53/24(DHCP)
swp1          10G      BondMember     ====  90:e2:ba:7e:96:d8  server03         Master: server03(UP)
swp49         40G      BondMember     ====  swp49              leaf04           Master: peerlink(UP)
swp50         40G      BondMember     ====  swp50              leaf04           Master: peerlink(UP)
swp51         40G      NotConfigured  ====  swp3               spine01
swp52         40G      NotConfigured  ====  swp3               spine02
swp53         40G      NotConfigured  ====  swp54              leaf03
swp54         40G      NotConfigured  ====  swp53              leaf03
```

Notice above that swp53 and swp54 are a loopback cable (hyperloop) where
it is connected to itself.

### Is the VRR MAC address unique per subnet?

Make sure that [VRR is configured
correctly](Virtual_Router_Redundancy_-_VRR) and that each MAC address is
unique per VLAN.

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-3-3
9:44:48.png](attachments/8362882/8362881.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [2017 Brand Ref
EVPN Demo (1).png](attachments/8362882/8362883.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [2017 Brand Ref
EVPN Demo.png](attachments/8362882/8362884.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2017-03-29 at 10.41.39 AM.png](attachments/8362882/8362885.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-3-9
14:52:21.png](attachments/8362882/8362886.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2017-03-09 at 1.32.01 PM.png](attachments/8362882/8362887.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2017-03-09 at 12.39.53 PM.png](attachments/8362882/8362888.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-3-3
13:16:54.png](attachments/8362882/8362889.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-3-3
13:12:25.png](attachments/8362882/8362890.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-3-3
13:7:1.png](attachments/8362882/8362891.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[multipleleafs.png](attachments/8362882/8362892.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[multipleleafs2.png](attachments/8362882/8362893.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[spinepair.png](attachments/8362882/8362894.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-3-3
10:57:45.png](attachments/8362882/8362895.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-3-3
9:45:42.png](attachments/8362882/8362896.png) (image/png)  
