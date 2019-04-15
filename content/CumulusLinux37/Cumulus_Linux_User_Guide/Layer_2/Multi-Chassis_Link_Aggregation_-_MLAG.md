---
title: Multi-Chassis Link Aggregation - MLAG
author: Unknown
weight: 125
pageID: 8362677
---
# Multi-Chassis Link Aggregation - MLAG

<span id="src-8362677_indexterm-FC551CBAEA9A7A146F4EB298D0167BFA">Multi-Chassis
</span><span id="src-8362677_indexterm-2191B3CD6619C89A358DFC84A9792C1C">Link
Aggregation</span><span id="src-8362677_indexterm-347571892CB9E6A567FA1D3D7255720B">
(MLAG), enables a server or switch with a two-port bond, such as a link
aggregation group/LAG, EtherChannel, port group or trunk, to connect
those ports to different switches and operate as if they are connected
to a single, </span>logical switch. This provides greater redundancy and
greater system throughput.

{{%notice info%}}

The Cumulus Linux implementation of MLAG is referred to by other vendors
as CLAG, MC-LAG or VPC. You will even see references to CLAG in Cumulus
Linux, including the management daemon, named `clagd`, and other options
in the code, such as `clag-id`, which exist for historical purposes. The
Cumulus Linux implementation is truly a multi-chassis link aggregation
protocol, so we call it
MLAG.

{{%/notice%}}

<span id="src-8362677_indexterm-1AF6AFB2306591FC94CFB13872AE1510">Dual-connected
devices can create </span>LACP bonds that contain links to each physical
switch. Therefore, active-active links from the dual-connected devices
are supported even though they are connected to two different physical
switches.

A basic setup looks like
this:

![/images/download/thumbnails/8362677/host\_ha1.png](/images/download/thumbnails/8362677/host_ha1.png)

{{%notice tip%}}

You can see an example of how to set up this configuration by running:

``` 
                   
cumulus@switch:~$ net example clag basic-clag
   
    
```

{{%/notice%}}

The two switches, S1 and S2, known as *peer switches*, cooperate so that
they appear as a single device to host H1's bond. H1 distributes traffic
between the two links to S1 and S2 in any way that you configure on the
host. Similarly, traffic inbound to H1 can traverse S1 or S2 and arrive
at H1.

## MLAG Requirements

MLAG has these requirements:

  - There must be a direct connection between the two peer switches
    implementing MLAG (S1 and S2). This is typically a bond for
    increased reliability and bandwidth.

  - There must be only two peer switches in one MLAG configuration, but
    you can have multiple configurations in a network for
    *switch-to-switch MLAG* (see below).

  - The peer switches implementing MLAG must be running Cumulus Linux
    version 2.5 or later.

  - You must specify a unique `clag-id` for every dual-connected bond on
    each peer switch; the value must be between 1 and 65535 and must be
    the same on both peer switches in order for the bond to be
    considered *dual-connected*.

  - The dual-connected devices (servers or switches) can use LACP (IEEE
    802.3ad/802.1ax) to form the
    [bond](Bonding_-_Link_Aggregation.html). In this case, the peer
    switches must also use LACP.
    
    {{%notice tip%}}
    
    If for some reason you cannot use LACP, you can also use
    [balance-xor
    mode](Bonding_-_Link_Aggregation.html#src-8362653_Bonding-LinkAggregation-balance_xor)
    to dual-connect host-facing bonds in an MLAG environment. If you do,
    you must still configure the same `clag_id` parameter on the MLAG
    bonds, and it must be the same on both MLAG switches. Otherwise, the
    MLAG switch pair treats the bonds as if they are single-connected.
    
    {{%/notice%}}

More elaborate configurations are also possible. The number of links
between the host and the switches can be greater than two, and does not
have to be
symmetrical:

![/images/download/thumbnails/8362677/host\_ha2.png](/images/download/thumbnails/8362677/host_ha2.png)

Additionally, because S1 and S2 appear as a single switch to other
bonding devices, you can also connect pairs of MLAG switches to each
other in a switch-to-switch MLAG
setup:

![/images/download/attachments/8362677/2pair\_mlag.png](/images/download/attachments/8362677/2pair_mlag.png)

In this case, L1 and L2 are also MLAG peer switches, and present a
two-port bond from a single logical system to S1 and S2. S1 and S2 do
the same as far as L1 and L2 are concerned. For a switch-to-switch MLAG
configuration, each switch pair must have a unique system MAC address.
In the above example, switches L1 and L2 each have the same system MAC
address configured. Switch pair S1 and S2 each have the same system MAC
address configured; however, it is a different system MAC address than
the one used by the switch pair L1 and L2.

## LACP and Dual-Connectedness

<span id="src-8362677_indexterm-1379CDCA9217EBB4CBF87AEAF239CD74">For
MLAG to operate correctly, the peer switches must know which links are
</span>*dual-connected* or are connected to the same host or switch. To
do this, specify a `clag-id` for every dual-connected bond on each peer
switch; the `clag-id` must be the same for the corresponding bonds on
both peer switches. Typically, [Link Aggregation Control Protocol
(LACP)](http://en.wikipedia.org/wiki/Link_Aggregation_Control_Protocol#Link_Aggregation_Control_Protocol),
the IEEE standard protocol for managing bonds, is used for verifying
dual-connectedness. LACP runs on the dual-connected device and on each
of the peer switches. On the dual-connected device, the only
configuration requirement is to create a bond that is managed by LACP.

However, if for some reason you cannot use LACP in your environment, you
can configure the bonds in [balance-xor
mode](Bonding_-_Link_Aggregation.html#src-8362653_Bonding-LinkAggregation-balance_xor).
When using balance-xor mode to dual-connect host-facing bonds in an MLAG
environment, you must configure the `clag_id` parameter on the MLAG
bonds, which must be the same on both MLAG switches. Otherwise, the
bonds are treated by the MLAG switch pair as if they are
single-connected. In short, dual-connectedness is solely determined by
matching `clag_id` and any misconnection will **not** be detected.

On each of the peer switches, you must place the links that are
connected to the dual-connected host or switch in the bond. This is true
even if the links are a single port on each peer switch, where each port
is placed into a bond, as shown
below:

![/images/download/thumbnails/8362677/2l\_3h.png](/images/download/thumbnails/8362677/2l_3h.png)

All of the dual-connected bonds on the peer switches have their system
ID set to the MLAG system ID. Therefore, from the point of view of the
hosts, each of the links in its bond is connected to the same system,
and so the host uses both links.

Each peer switch periodically makes a list of the LACP partner MAC
addresses for all of their bonds and sends that list to its peer (using
the `clagd` service; see below). The LACP partner MAC address is the MAC
address of the system at the other end of a bond (hosts H1, H2, and H3
in the figure above). When a switch receives this list from its peer, it
compares the list to the LACP partner MAC addresses on its switch. If
any matches are found and the `clag-id` for those bonds match, then that
bond is a dual-connected bond. You can also find the LACP partner MAC
address by the running `net show bridge macs` command or by examining
the `/sys/class/net/<bondname>/bonding/ad_partner_mac sysfs` file for
each bond.

## Example MLAG Configuration

The example configuration below configures two bonds for MLAG, each with
a single port, a peer link that is a bond with two member ports, and
three VLANs on each port.

{{%notice tip%}}

You can see a more traditional layer 2 example configuration in NCLU;
run `net example clag l2-with-server-vlan-trunks`. For a very basic
configuration with just one pair of switches and a single host, run `net
example clag
l2-with-server-vlan-trunks`.

{{%/notice%}}

![/images/raw.githubusercontent.com/CumulusNetworks/cldemo-config-mlag/master/bgp-unnumbered.png](/images/raw.githubusercontent.com/CumulusNetworks/cldemo-config-mlag/master/bgp-unnumbered.png)

You configure these interfaces using
[NCLU](Network_Command_Line_Utility_-_NCLU.html), so the bridges are in
[VLAN-aware mode](VLAN-aware_Bridge_Mode.html). The bridges use these
Cumulus Linux-specific keywords:

  - `bridge-vids`, which defines the allowed list of tagged 802.1q VLAN
    IDs for all bridge member interfaces. You can specify non-contiguous
    ranges with a space-separated list, like  
    `bridge-vids 100-200 300 400-500`.

  - `bridge-pvid`, which defines the untagged VLAN ID for each port.
    This is commonly referred to as the *native VLAN*.

The bridge configurations below indicate that each bond carries tagged
frames on VLANs 10, 20, 30, 40, 50, and 100 to 200 (as specified by
`bridge-vids`), but untagged frames on VLAN 1 (as specified by
`bridge-pvid`). Also, take note on how you configure the VLAN
subinterfaces used for `clagd` communication (*peerlink.4094* in the
sample configuration below). Finally, the host configurations for
server01 through server04 are not shown here. The configurations for
each corresponding node are almost identical, except for the IP
addresses used for managing the `clagd` service.

{{%notice note%}}

At minimum, this VLAN subinterface should not be in your layer 2 domain,
and you should give it a very high VLAN ID (up to 4094). Read more about
the [range of VLAN IDs you can
use](VLAN-aware_Bridge_Mode.html#src-8362673_VLAN-awareBridgeMode-vlan_range).

{{%/notice%}}

The commands to create the configurations for both spines look like the
following. Note that the `clag-id` and `clagd-sys-mac` must be the same
for the corresponding bonds on spine01 and spine02:

<div class="tablewrap">

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>spine01</strong></p>
<pre><code>                   
cumulus@spine01:~$ net show configuration commands 
net add interface swp1-4 
net add loopback lo ip address 10.0.0.21/32
net add interface eth0 ip address dhcp
   
    </code></pre>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<pre><code>                   
cumulus@spine01:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
    address 10.0.0.21/32
 
auto eth0
iface eth0 inet dhcp
 
# downlinks
auto swp1
iface swp1
 
auto swp2
iface swp2
 
auto swp3
iface swp3
 
auto swp4
iface swp4
   
    </code></pre></td>
<td><p><strong>spine02</strong></p>
<pre><code>                   
cumulus@spine02:~$ net show configuration commands 
net add interface swp1-4 
net add loopback lo ip address 10.0.0.22/32
net add interface eth0 ip address dhcp
   
    </code></pre>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<pre><code>                   
cumulus@spine02:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
    address 10.0.0.22/32
 
auto eth0
iface eth0 inet dhcp
 
# downlinks
auto swp1
iface swp1
 
auto swp2
iface swp2
 
auto swp3
iface swp3
 
auto swp4
iface swp4
   
    </code></pre></td>
</tr>
</tbody>
</table>

</div>

Here is an example configuration for the switches leaf01 through leaf04.
Note that the `clag-id` and `clagd-sys-mac` must be the same for the
corresponding bonds on leaf01 and leaf02 as well as leaf03 and leaf04:

<div class="tablewrap">

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>leaf01</strong></p>
<pre><code>                   
cumulus@leaf01:~$ net show configuration commands 
net add loopback lo ip address 10.0.0.11/32
net add bgp autonomous-system 65011
net add bgp router-id 10.0.0.11
net add bgp ipv4 unicast network 10.0.0.11/32
net add routing prefix-list ipv4 dc-leaf-in seq 10 permit 0.0.0.0/0
net add routing prefix-list ipv4 dc-leaf-in seq 20 permit 10.0.0.0/24 le 32
net add routing prefix-list ipv4 dc-leaf-in seq 30 permit 172.16.2.0/24
net add routing prefix-list ipv4 dc-leaf-out seq 10 permit 172.16.1.0/24
net add bgp neighbor fabric peer-group
net add bgp neighbor fabric remote-as external
net add bgp ipv4 unicast neighbor fabric prefix-list dc-leaf-in in
net add bgp ipv4 unicast neighbor fabric prefix-list dc-leaf-out out
net add bgp neighbor swp51-52 interface peer-group fabric
net add vlan 100 ip address 172.16.1.1/24
net add bgp ipv4 unicast network 172.16.1.1/24
net add clag peer sys-mac 44:38:39:FF:00:01 interface swp49-50 primary backup-ip 192.168.1.12
net add clag port bond server1 interface swp1 clag-id 1
net add clag port bond server2 interface swp2 clag-id 2
net add bond server1-2 bridge access 100
net add bond server1-2 stp portadminedge
net add bond server1-2 stp bpduguard
   
    </code></pre>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<pre><code>                   
cumulus@leaf01:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
    address 10.0.0.11/32
 
auto eth0
iface eth0 inet dhcp
 
auto swp1
iface swp1
 
auto swp2
iface swp2
 
# peerlink
auto swp49
iface swp49
    post-up ip link set $IFACE promisc on     # Only required on VX
 
auto swp50
iface swp50
    post-up ip link set $IFACE promisc on     # Only required on VX
 
# uplinks
auto swp51
iface swp51
 
auto swp52
iface swp52
 
# bridge to hosts
auto bridge
iface bridge
    bridge-ports peerlink server1 server2
    bridge-vids 100
    bridge-vlan-aware yes
 
auto peerlink
iface peerlink
    bond-slaves swp49 swp50
 
auto peerlink.4094
iface peerlink.4094
    clagd-backup-ip 192.168.1.12
    clagd-peer-ip 169.254.1.2
    clagd-priority 1000
    clagd-sys-mac 44:38:39:FF:00:01
 
auto server1
iface server1
    bond-slaves swp1
    bridge-access 100
    clag-id 1
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
 
auto server2
iface server2
    bond-slaves swp2
    bridge-access 100
    clag-id 2
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
 
auto vlan100
iface vlan100
    address 172.16.1.1/24
    vlan-id 100
    vlan-raw-device bridge
   
    </code></pre></td>
<td><p><strong>leaf02</strong></p>
<pre><code>                   
cumulus@leaf02:~$ net show conf commands 
net add loopback lo ip address 10.0.0.12/32
net add bgp autonomous-system 65012
net add bgp router-id 10.0.0.12
net add bgp ipv4 unicast network 10.0.0.12/32
net add routing prefix-list ipv4 dc-leaf-in seq 10 permit 0.0.0.0/0
net add routing prefix-list ipv4 dc-leaf-in seq 20 permit 10.0.0.0/24 le 32
net add routing prefix-list ipv4 dc-leaf-in seq 30 permit 172.16.2.0/24
net add routing prefix-list ipv4 dc-leaf-out seq 10 permit 172.16.1.0/24
net add bgp neighbor fabric peer-group
net add bgp neighbor fabric remote-as external
net add bgp ipv4 unicast neighbor fabric prefix-list dc-leaf-in in
net add bgp ipv4 unicast neighbor fabric prefix-list dc-leaf-out out
net add bgp neighbor swp51-52 interface peer-group fabric
net add vlan 100 ip address 172.16.1.2/24
net add bgp ipv4 unicast network 172.16.1.2/24
net add clag peer sys-mac 44:38:39:FF:00:01 interface swp49-50 secondary backup-ip 192.168.1.11
net add clag port bond server1 interface swp1 clag-id 1
net add clag port bond server2 interface swp2 clag-id 2
net add bond server1-2 bridge access 100
net add bond server1-2 stp portadminedge
net add bond server1-2 stp bpduguard
 
   
    </code></pre>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<pre><code>                   
cumulus@leaf02:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
    address 10.0.0.12/32
 
auto eth0
iface eth0 inet dhcp
 
auto swp1
iface swp1
 
auto swp2
iface swp2
 
# peerlink
auto swp49
iface swp49
    post-up ip link set $IFACE promisc on     # Only required on VX
 
auto swp50
iface swp50
    post-up ip link set $IFACE promisc on     # Only required on VX
 
# uplinks
auto swp51
iface swp51
 
auto swp52
iface swp52
 
# bridge to hosts
auto bridge
iface bridge
    bridge-ports peerlink server1 server2
    bridge-vids 100
    bridge-vlan-aware yes
 
auto peerlink
iface peerlink
    bond-slaves swp49 swp50
 
auto peerlink.4094
iface peerlink.4094
    clagd-backup-ip 192.168.1.11
    clagd-peer-ip 169.254.1.1
    clagd-sys-mac 44:38:39:FF:00:01
 
auto server1
iface server1
    bond-slaves swp1
    bridge-access 100
    clag-id 1
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
 
auto server2
iface server2
    bond-slaves swp2
    bridge-access 100
    clag-id 2
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
 
auto vlan100
iface vlan100
    address 172.16.1.2/24
    vlan-id 100
    vlan-raw-device bridge
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>leaf03</strong></p>
<pre><code>                   
cumulus@leaf03:~$ net show conf commands 
net add loopback lo ip address 10.0.0.13/32
net add bgp autonomous-system 65013
net add bgp router-id 10.0.0.13
net add bgp ipv4 unicast network 10.0.0.13/32
net add routing prefix-list ipv4 dc-leaf-in seq 10 permit 0.0.0.0/0
net add routing prefix-list ipv4 dc-leaf-in seq 20 permit 10.0.0.0/24 le 32
net add routing prefix-list ipv4 dc-leaf-in seq 30 permit 172.16.2.0/24
net add routing prefix-list ipv4 dc-leaf-out seq 10 permit 172.16.1.0/24
net add bgp neighbor fabric peer-group
net add bgp neighbor fabric remote-as external
net add bgp ipv4 unicast neighbor fabric prefix-list dc-leaf-in in
net add bgp ipv4 unicast neighbor fabric prefix-list dc-leaf-out out
net add bgp neighbor swp51-52 interface peer-group fabric
net add vlan 100 ip address 172.16.1.3/24
net add bgp ipv4 unicast network 172.16.1.3/24
net add clag peer sys-mac 44:38:39:FF:00:02 interface swp49-50 primary backup-ip 192.168.1.14
net add clag port bond server3 interface swp1 clag-id 3
net add clag port bond server4 interface swp2 clag-id 4
net add bond server3-4 bridge access 100
net add bond server3-4 stp portadminedge
net add bond server3-4 stp bpduguard
   
    </code></pre>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<pre><code>                   
cumulus@leaf03:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
    address 10.0.0.13/32
 
 
auto eth0
iface eth0 inet dhcp
 
 
auto swp1
iface swp1
 
 
auto swp2
iface swp2
 
 
# peerlink
auto swp49
iface swp49
    post-up ip link set $IFACE promisc on     # Only required on VX
 
 
auto swp50
iface swp50
    post-up ip link set $IFACE promisc on     # Only required on VX
 
 
# uplinks
auto swp51
iface swp51
 
 
auto swp52
iface swp52
 
 
# bridge to hosts
auto bridge
iface bridge
    bridge-ports peerlink server3 server4
    bridge-vids 100
    bridge-vlan-aware yes
 
 
auto peerlink
iface peerlink
    bond-slaves swp49 swp50
 
 
auto peerlink.4094
iface peerlink.4094
    clagd-backup-ip 192.168.1.14
    clagd-peer-ip 169.254.1.2
    clagd-priority 1000
    clagd-sys-mac 44:38:39:FF:00:02
 
 
auto server3
iface server3
    bond-slaves swp1
    bridge-access 100
    clag-id 3
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
 
 
auto server4
iface server4
    bond-slaves swp2
    bridge-access 100
    clag-id 4
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
 
auto vlan100
iface vlan100
    address 172.16.1.3/24
    vlan-id 100
    vlan-raw-device bridge
   
    </code></pre></td>
<td><p><strong>leaf04</strong></p>
<pre><code>                   
cumulus@leaf04:~$ net show configuration commands 
net add loopback lo ip address 10.0.0.14/32
net add bgp autonomous-system 65014
net add bgp router-id 10.0.0.14
net add bgp ipv4 unicast network 10.0.0.14/32
net add routing prefix-list ipv4 dc-leaf-in seq 10 permit 0.0.0.0/0
net add routing prefix-list ipv4 dc-leaf-in seq 20 permit 10.0.0.0/24 le 32
net add routing prefix-list ipv4 dc-leaf-in seq 30 permit 172.16.2.0/24
net add routing prefix-list ipv4 dc-leaf-out seq 10 permit 172.16.1.0/24
net add bgp neighbor fabric peer-group
net add bgp neighbor fabric remote-as external
net add bgp ipv4 unicast neighbor fabric prefix-list dc-leaf-in in
net add bgp ipv4 unicast neighbor fabric prefix-list dc-leaf-out out
net add bgp neighbor swp51-52 interface peer-group fabric
net add vlan 100 ip address 172.16.1.4/24
net add bgp ipv4 unicast network 172.16.1.4/24
net add clag peer sys-mac 44:38:39:FF:00:02 interface swp49-50 secondary backup-ip 192.168.1.13
net add clag port bond server3 interface swp1 clag-id 3
net add clag port bond server4 interface swp2 clag-id 4
net add bond server3-4 bridge access 100
net add bond server3-4 stp portadminedge
net add bond server3-4 stp bpduguard
   
    </code></pre>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<pre><code>                   
cumulus@leaf04:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
    address 10.0.0.14/32
 
 
auto eth0
iface eth0 inet dhcp
 
 
auto swp1
iface swp1
 
 
auto swp2
iface swp2
 
 
# peerlink
auto swp49
iface swp49
    post-up ip link set $IFACE promisc on     # Only required on VX
 
 
auto swp50
iface swp50
    post-up ip link set $IFACE promisc on     # Only required on VX
 
 
# uplinks
auto swp51
iface swp51
 
 
auto swp52
iface swp52
 
 
# bridge to hosts
auto bridge
iface bridge
    bridge-ports peerlink server3 server4
    bridge-vids 100
    bridge-vlan-aware yes
 
 
auto peerlink
iface peerlink
    bond-slaves swp49 swp50
 
 
auto peerlink.4094
iface peerlink.4094
    clagd-backup-ip 192.168.1.13
    clagd-peer-ip 169.254.1.1
    clagd-sys-mac 44:38:39:FF:00:02
 
 
auto server3
iface server3
    bond-slaves swp1
    bridge-access 100
    clag-id 3
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
 
 
auto server4
iface server4
    bond-slaves swp2
    bridge-access 100
    clag-id 4
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
 
auto vlan100
iface vlan100
    address 172.16.1.4/24
    vlan-id 100
    vlan-raw-device bridge
   
    </code></pre></td>
</tr>
</tbody>
</table>

</div>

## Disable clagd on an Interface

In the configurations above, the `clagd-peer-ip` and `clagd-sys-mac`
parameters are mandatory, while the rest are optional. When mandatory
`clagd` commands are present under a peer link subinterface, by default
`clagd-enable` is set to *yes* and does not need to be specified; to
disable `clagd` on the subinterface, set `clagd-enable` to *no*:

``` 
                   
cumulus@spine01:~$ net add interface peerlink.4094 clag enable no 
cumulus@spine01:~$ net pending
cumulus@spine01:~$ net commit
   
    
```

Use `clagd-priority` to set the role of the MLAG peer switch to primary
or secondary. Each peer switch in an MLAG pair must have the same
`clagd-sys-mac` setting. Each `clagd-sys-mac` setting must be unique to
each MLAG pair in the network. For more details, refer to `man clagd`.

## Configure MLAG with a Traditional Mode Bridge

You can configure MLAG with a bridge in [traditional
mode](Traditional_Bridge_Mode.html) instead of [VLAN-aware
mode](VLAN-aware_Bridge_Mode.html).

To configure MLAG with a traditional mode bridge, the peer link and all
dual-connected links must be configured as
[untagged/native](Traditional_Bridge_Mode.html) ports on a bridge (note
the absence of any VLANs in the `bridge-ports` line and the lack of the
`bridge-vlan-aware` parameter below):

``` 
                   
auto br0
iface br0
  bridge-ports peerlink spine1-2 host1 host2
   
    
```

The following example shows you how to allow VLAN 100 across the peer
link:

``` 
                   
auto br0.100
iface br0.100
  bridge-ports peerlink.100 bond1.100
   
    
```

For a deeper comparison of traditional versus VLAN-aware bridge modes,
read this [knowledge base
article](https://support.cumulusnetworks.com/hc/en-us/articles/204909397).

## Peer Link Interfaces and the protodown State

<span id="src-8362677_indexterm-1E036006E16D93852EF12DCE8E911CB4">In
</span><span id="src-8362677_indexterm-57DFE8F100D03E605160543C9C16D896">addition
</span><span id="src-8362677_indexterm-307C1977AD5B75F7D7F6DD574CE3C0F3">to
</span>the standard UP and DOWN administrative states, an interface that
is a member of an MLAG bond can also be in a `protodown` state. When
MLAG detects a problem that might result in connectivity issues such as
traffic black-holing or a network meltdown if the link carrier was left
in an UP state, it can put that interface into `protodown` state. Such
connectivity issues include:

  - When the peer link goes down but the peer switch is up (that is, the
    backup link is active).

  - When the bond is configured with an MLAG ID, but the `clagd` service
    is not running (whether it was deliberately stopped or simply died).

  - When an MLAG-enabled node is booted or rebooted, the MLAG bonds are
    placed in a `protodown` state until the node establishes a
    connection to its peer switch, or five minutes have elapsed.

When an interface goes into a `protodown` state, it results in a local
OPER DOWN (carrier down) on the interface. As of Cumulus Linux 2.5.5,
the `protodown` state can be manipulated with the `ip link set` command.
Given its use in preventing network meltdowns, manually manipulating
`protodown` is not recommended outside the scope of interaction with the
Cumulus Networks support team.

The following `ip link show` command output shows an interface in
`protodown` state. Notice that the link carrier is down (NO-CARRIER):

``` 
                   
cumulus@switch:~$ net show bridge link swp1
3: swp1 state DOWN:  mtu 9216 master pfifo_fast master host-bond1 state DOWN mode DEFAULT qlen 500 protodown on
   link/ether 44:38:39:00:69:84 brd ff:ff:ff:ff:ff:ff
   
    
```

### Specify a Backup Link

<span id="src-8362677_indexterm-2A19747B33DC0E128BB57CD72951EE6D">You
can specify a </span>backup link for your peer links in case the peer
link goes down. When this happens, the `clagd` service uses the backup
link to check the health of the peer switch. To configure a backup link,
add ` clagd-backup-ip <ADDRESS>  `to the peer link configuration:

{{%notice tip%}}

``` 
                   
cumulus@spine01:~$ net add interface peerlink.4094 clag backup-ip 192.0.2.50
cumulus@spine01:~$ net pending
cumulus@spine01:~$ net commit
   
    
```

<div class="confbox admonition admonition-note">

<div class="admonition-body">

The backup IP address must be different than the peer link IP address
(`clagd-peer-ip`). It must be reachable by a route that does not use the
peer link and it must be in the same network namespace as the peer link
IP address.

Cumulus Networks recommends you use the management IP address of the
switch for this purpose.

</div>

</div>

You can also specify the backup UDP port. The port defaults to 5342, but
you can configure it as an argument in `clagd-args` using `--backupPort
<PORT>`.

``` 
                   
cumulus@spine01:~$ net add interface peerlink.4094 clag args --backupPort 5400
cumulus@spine01:~$ net pending
cumulus@spine01:~$ net commit
   
    
```

To see the backup IP address, run the `net show clag` command:

``` 
                   
cumulus@spine01:~$ net show clag 
The peer is alive
     Our Priority, ID, and Role: 32768 44:38:39:00:00:41 primary
    Peer Priority, ID, and Role: 32768 44:38:39:00:00:42 secondary
          Peer Interface and IP: peerlink.4094 linklocal
                      Backup IP: 192.168.0.22 (active)
                     System MAC: 44:38:39:FF:40:90
 
CLAG Interfaces
Our Interface      Peer Interface     CLAG Id   Conflicts              Proto-Down Reason
----------------   ----------------   -------   --------------------   -----------------
       leaf03-04   leaf03-04          1034      -                      -              
       exit01-02   -                  2930      -                      -              
       leaf01-02   leaf01-02          1012      -                      -
   
    
```

{{%/notice%}}

### Specify a Backup Link to a VRF

You can configure the backup link to a
[VRF](Virtual_Routing_and_Forwarding_-_VRF.html) or [management
VRF](Management_VRF.html). Include the name of the VRF or management VRF
with the ` clagd-backup-ip  `command. Here is a sample configuration:

{{%notice tip%}}

``` 
                   
cumulus@spine01:~$ net add interface peerlink.4094 clag backup-ip 192.168.0.22 vrf mgmt
cumulus@spine01:~$ net pending
cumulus@spine01:~$ net commit
   
    
```

<div class="confbox admonition admonition-note">

<div class="admonition-body">

You cannot use the VRF on a peer link subinterface.

</div>

</div>

Verify the backup link by running the `net show clag backup-ip` command:

``` 
                   
cumulus@leaf01:~$ net show clag backup-ip 
Backup info:
IP: 192.168.0.12; State: active; Role: primary
Peer priority and id: 32768 44:38:39:00:00:12; Peer role: secondary          
   
    
```

{{%/notice%}}

{{%notice tip%}}

The configuration for both a VRF and management VRF is exactly the same.
The following example shows a configuration where the backup interface
is in a VRF:

``` 
                   
cumulus@leaf01:~$ net show configuration
 
...
 
auto swp52s0
iface swp52s0
    address 192.0.2.1/24
    vrf green
 
auto green
iface green
    vrf-table auto
 
auto peer5.4000
iface peer5.4000
        clagd-peer-ip 192.0.2.16
        clagd-backup-ip 192.0.2.2 vrf green
        clagd-sys-mac 44:38:39:01:01:01    
...
   
    
```

You can verify the configuration with the `net show clag status verbose`
command:

``` 
                   
cumulus@leaf01:~$ net show clag status verbose
The peer is alive
    Peer Priority, ID, and Role: 32768 00:02:00:00:00:13 primary
     Our Priority, ID, and Role: 32768 c4:54:44:f6:44:5a secondary
          Peer Interface and IP: peer5.4000 linklocal
                      Backup IP: 192.0.2.2 vrf green (active)
                     System MAC: 44:38:39:01:01:01
 
CLAG Interfaces
Our Interface      Peer Interface     CLAG Id   Conflicts              Proto-Down Reason
----------------   ----------------   -------   --------------------   -----------------
           bond4   bond4              4         -                      -              
           bond1   bond1              1         -                      -              
           bond2   bond2              2         -                      -              
           bond3   bond3              3         -                      -     
 
...
   
    
```

{{%/notice%}}

## Monitor Dual-Connected Peers

Upon receipt of a valid message from its peer, the switch knows that
`clagd` is alive and executing on that peer. This causes `clagd` to
change the system ID of each bond that is assigned a `clag-id` from the
default value (the MAC address of the bond) to the system ID assigned to
both peer switches. This makes the hosts connected to each switch act as
if they are connected to the same system so that they use all ports
within their bond. Additionally, `clagd` determines which bonds are
dual-connected and modifies the forwarding and learning behavior to
accommodate these dual-connected bonds.

If the peer does not receive any messages for three update intervals,
then that peer switch is assumed to no longer be acting as an MLAG peer.
In this case, the switch reverts all configuration changes so that it
operates as a standard non-MLAG switch. This includes removing all
statically assigned MAC addresses, clearing the egress forwarding mask,
and allowing addresses to move from any port to the peer port. After a
message is again received from the peer, MLAG operation starts again as
described earlier. You can configure a custom timeout setting by adding
`--peerTimeout <VALUE>` to `clagd-args`, like this:

``` 
                   
cumulus@spine01:~$ net add interface peerlink.4094 clag args --peerTimeout 900
cumulus@spine01:~$ net pending
cumulus@spine01:~$ net commit
   
    
```

After bonds are identified as dual-connected, `clagd` sends more
information to the peer switch for those bonds. The MAC addresses (and
VLANs) that are dynamically learned on those ports are sent along with
the LACP partner MAC address for each bond. When a switch receives MAC
address information from its peer, it adds MAC address entries on the
corresponding ports. As the switch learns and ages out MAC addresses, it
informs the peer switch of these changes to its MAC address table so
that the peer can keep its table synchronized. Periodically, at 45% of
the bridge ageing time, a switch sends its entire MAC address table to
the peer, so that peer switch can verify that its MAC address table is
properly synchronized.

The switch sends an update frequency value in the messages to its peer,
which tells `clagd` how often the peer will send these messages. You can
configure a different frequency by adding `--lacpPoll <SECONDS>` to
`clagd-args`:

``` 
                   
cumulus@spine01:~$ net add interface peerlink.4094 clag args --lacpPoll 900
cumulus@spine01:~$ net pending
cumulus@spine01:~$ net commit
   
    
```

## Configure Layer 3 Routed Uplinks

In this scenario, the spine switches connect at layer 3, as shown in the
image below. Alternatively, the spine switches can be singly connected
to each core switch at layer 3 (not shown
below).

![/images/download/attachments/8362677/mlag\_cfg\_l3.png](/images/download/attachments/8362677/mlag_cfg_l3.png)

In this design, the spine switches route traffic between the server
hosts in the layer 2 domains and the core. The servers (host1 thru
host4) each have a layer 2 connection up to the spine layer where the
default gateway for the host subnets resides. However, since the spine
switches as gateway devices communicate at layer 3, you need to
configure a protocol such as
[VRR](Virtual_Router_Redundancy_-_VRR_and_VRRP.html) (virtual router
redundancy) between the spine switch pair to support active/active
forwarding.

Then, to connect the spine switches to the core switches, you need to
determine whether the routing is static or dynamic. If it is dynamic,
you must choose which protocol —
[OSPF](Open_Shortest_Path_First_-_OSPF.html) or
[BGP](Border_Gateway_Protocol_-_BGP.html) — to use. When enabling a
routing protocol in an MLAG environment, it is also necessary to manage
the uplinks, because by default MLAG is not aware of layer 3 uplink
interfaces. In the event of a peer link failure, MLAG does not remove
static routes or bring down a BGP or OSPF adjacency unless a separate
link state daemon such as ` ifplugd  `is used.

{{%notice tip%}}

When using MLAG with VRR, Cumulus Networks recommends you set up a
routed adjacency across the peerlink.4094 interface. If a routed
connection is not built across the peer link, then during uplink failure
on one of the switches in the MLAG pair, egress traffic can be
blackholed if it hashes to the leaf whose uplinks are down.

To set up the adjacency, configure a
[BGP](Border_Gateway_Protocol_-_BGP.html#src-8362926_BorderGatewayProtocol-BGP-unnumbered)
or
[OSPF](Open_Shortest_Path_First_-_OSPF.html#src-8362922_OpenShortestPathFirst-OSPF-ospf_unnum)
unnumbered peering, as appropriate for your network.

For example, if you are using BGP, use a configuration like this:

``` 
                   
cumulus@switch:~$ net add bgp neighbor peerlink.4094 interface remote-as internal
cumulus@switch:~$ net commit
   
    
```

If you are using OSPF, use a configuration like this:

``` 
                   
cumulus@switch:~$ net add interface peerlink.4094 ospf area 0.0.0.1
cumulus@switch:~$ net commit
   
    
```

If you are using [EVPN](Ethernet_Virtual_Private_Network_-_EVPN.html)
and MLAG, you need to enable the EVPN address family across the
peerlink.4094 interface as well:

``` 
                   
cumulus@switch:~$ net add bgp neighbor peerlink.4094 interface remote-as internal
cumulus@switch:~$ net add bgp l2vpn evpn neighbor peerlink.4094 activate
cumulus@switch:~$ net commit
   
    
```

<div class="confbox admonition admonition-note">

<div class="admonition-body">

Be aware of an existing issue when you use NCLU to create an iBGP
peering, it creates an eBGP peering instead. For more information, see
[release
note 1222](https://support.cumulusnetworks.com/hc/en-us/articles/360007793174-Cumulus-Linux-3-7-Release-Notes#RN1222).

</div>

</div>

{{%/notice%}}

## IGMP Snooping with MLAG

[IGMP
snooping](IGMP_and_MLD_Snooping.html)<span id="src-8362677_indexterm-136AE87A5AE09FB2E74A8606D2EE8653">
</span><span id="src-8362677_indexterm-A29F9F46EF86AFE44CD4B573F2C9469E">processes</span>
IGMP reports received on a bridge port in a bridge to identify hosts
that are configured to receive multicast traffic destined to that group.
An IGMP query message received on a port is used to identify the port
that is connected to a router and configured to receive multicast
traffic.

IGMP snooping is enabled by default on the bridge. IGMP snooping
multicast database entries and router port entries are synced to the
peer MLAG switch. If there is no multicast router in the VLAN, you can
configure the IGMP querier on the switch to generate IGMP query
messages. For more information, read the [IGMP and MLD
Snooping](IGMP_and_MLD_Snooping.html) chapter.

## Monitor the Status of the clagd Service

Due to the critical nature of the
`clagd`<span id="src-8362677_indexterm-6326A558EA27C19A00ED660AE034507D">
service, </span>`systemd` continuously monitors the status of `clagd`.
`systemd` monitors the `clagd` service through the use of notify
messages every 30 seconds. If the `clagd` service dies or becomes
unresponsive for any reason and `systemd` receives no messages after 60
seconds, `systemd` restarts `clagd`. `systemd` logs these failures in
`/var/log/syslog`, and, on the first failure, generates a ` cl-support
 `file as well.

This monitoring is automatically configured and enabled as long as
`clagd` is enabled (that is, `clagd-peer-ip` and `clagd-sys-mac` are
configured for an interface) and the `clagd` service is running. When
`clagd` is explicitly stopped, for example with the `systemctl stop
clagd.service` command, monitoring of `clagd` is also stopped.

{{%notice tip%}}

You can check the status of `clagd` monitoring by using the
`cl-service-summary` command:

``` 
                   
cumulus@switch:~$ sudo cl-service-summary summary
The systemctl daemon 5.4 uptime: 15m
 
...
 
Service clagd        enabled    active 
 
...
   
    
```

Or the `systemctl status` command:

``` 
                   
cumulus@switch:~$ sudo systemctl status clagd.service 
● clagd.service - Cumulus Linux Multi-Chassis LACP Bonding Daemon
   Loaded: loaded (/lib/systemd/system/clagd.service; enabled)
   Active: active (running) since Mon 2016-10-03 20:31:50 UTC; 4 days ago
     Docs: man:clagd(8)
 Main PID: 1235 (clagd)
   CGroup: /system.slice/clagd.service
           ├─1235 /usr/bin/python /usr/sbin/clagd --daemon 169.254.255.2 peerlink.4094 44:38:39:FF:40:90 --prior...
           └─1307 /sbin/bridge monitor fdb
 
 
Feb 01 23:19:30 leaf01 clagd[1717]: Cleanup is executing.
Feb 01 23:19:31 leaf01 clagd[1717]: Cleanup is finished
Feb 01 23:19:31 leaf01 clagd[1717]: Beginning execution of clagd version 1.3.0
Feb 01 23:19:31 leaf01 clagd[1717]: Invoked with: /usr/sbin/clagd --daemon 169.254.255.2 peerlink.4094 44:38:39:FF:40:94 --pri...168.0.12
Feb 01 23:19:31 leaf01 clagd[1717]: Role is now secondary
Feb 01 23:19:31 leaf01 clagd[1717]: Initial config loaded
Feb 01 23:19:31 leaf01 systemd[1]: Started Cumulus Linux Multi-Chassis LACP Bonding Daemon.
Feb 01 23:24:31 leaf01 clagd[1717]: HealthCheck: reload timeout.
Feb 01 23:24:31 leaf01 clagd[1717]: Role is now primary; Reload timeout
Hint: Some lines were ellipsized, use -l to show in full.
   
    
```

{{%/notice%}}

## STP Interoperability with MLAG

<span id="src-8362677_indexterm-D8DCFD6681838FF55EBD1300A9BC2BF5">Cumulus
</span><span id="src-8362677_indexterm-9C7D8427FEB926FA021C1D35027B0899">Networks
</span>recommends that you always enable STP in your layer 2 network.

With MLAG, Cumulus Networks recommends you enable BPDU guard on the
host-facing bond interfaces. For more information about BPDU guard, see
[BPDU Guard and Bridge
Assurance](Spanning_Tree_and_Rapid_Spanning_Tree.html#src-8362689_SpanningTreeandRapidSpanningTree-bpdu).

{{%notice tip%}}

Running `net show <interface> spanning-tree` displays MLAG information
that can be useful when debugging:

``` 
                   
cumulus@switch:~$ net show bridge spanning-tree
bridge:peerlink CIST info
  enabled            yes                     role                 Designated
  port id            8.002                   state                forwarding
  ..............
  bpdufilter port    no                     
  clag ISL           yes                     clag ISL Oper UP     yes
  clag role          primary                 clag dual conn mac   00:00:00:00:00:00
  clag remote portID F.FFF                   clag system mac      44:38:39:FF:40:90
   
    
```

{{%/notice%}}

Best Practices for STP with MLAG:

  - The STP global configuration must be the same on both the switches.

  - The STP configuration for dual-connected ports should be the same on
    both peer switches.

  - The STP priority must be the same on both peer switches. You set the
    priority with this command:
    
    ``` 
                       
    cumulus@switch:~$ net add bridge stp treeprio PRIORITY_VALUE
    cumulus@switch:~$ net commit
       
        
    ```

  - Use [NCLU](Network_Command_Line_Utility_-_NCLU.html) (`net`)
    commands for all spanning tree configurations, including bridge
    priority, path cost and so forth. Do not use `brctl` commands for
    spanning tree, except for `brctl stp on/off`, as changes are not
    reflected to `mstpd` and can create conflicts.

## Troubleshooting

### Viewing the MLAG Log File

By default, when `clagd` is running, it logs its status to the
`/var/log/clagd.log` file and `syslog`. Example log file output is
below:

``` 
                   
cumulus@spine01:~$ sudo tail /var/log/clagd.log 
2016-10-03T20:31:50.471400+00:00 spine01 clagd[1235]: Initial config loaded
2016-10-03T20:31:52.479769+00:00 spine01 clagd[1235]: The peer switch is active.
2016-10-03T20:31:52.496490+00:00 spine01 clagd[1235]: Initial data sync to peer done.
2016-10-03T20:31:52.540186+00:00 spine01 clagd[1235]: Role is now primary; elected
2016-10-03T20:31:54.250572+00:00 spine01 clagd[1235]: HealthCheck: role via backup is primary
2016-10-03T20:31:54.252642+00:00 spine01 clagd[1235]: HealthCheck: backup active
2016-10-03T20:31:54.537967+00:00 spine01 clagd[1235]: Initial data sync from peer done.
2016-10-03T20:31:54.538435+00:00 spine01 clagd[1235]: Initial handshake done.
2016-10-03T20:31:58.527464+00:00 spine01 clagd[1235]: leaf03-04 is now dual connected.
2016-10-03T22:47:35.255317+00:00 spine01 clagd[1235]: leaf01-02 is now dual connected.
   
    
```

### Large Packet Drops on the Peer Link Interface

A large volume of packet drops across one of the peer link interfaces
can be expected. These drops serve to prevent looping of BUM (broadcast,
unknown unicast, multicast) packets. When a packet is received across
the peer link, if the destination lookup results in an egress interface
that is a dual-connected bond, the switch does not forward the packet to
prevent loops. This results in a drop being recorded on the peer link.

You can detect this issue by running the `net show counters` or `ethtool
-S <interface>` command.

Using [NCLU](Network_Command_Line_Utility_-_NCLU.html), the number of
dropped packets is displayed in the RX\_DRP column when you run `net
show counters`:

``` 
                   
cumulus@switch:~$ net show counters 
 
Kernel Interface table
Iface              MTU    Met    RX_OK    RX_ERR    RX_DRP    RX_OVR    TX_OK    TX_ERR    TX_DRP    TX_OVR  Flg
---------------  -----  -----    -------  --------  --------  --------  -------  --------  --------  ------  -----
peerlink        1500       0      19226721     0      2952460  0       55115330     0       364      0       BMmRU
peerlink.4094   1500       0      0            0      0        0       5379243      0       0        0       BMRU
swp51           1500       0      6587220      0      2129676  0       38957769     0       202      0       BMsRU
swp52           1500       0      12639501     0      822784   0       16157561     0       162      0       BMsRU
   
    
```

When you run `ethtool -S` on a peer link interface, the drops are
indicated by the `HwIfInDiscards` counter:

``` 
                   
cumulus@switch:~$ sudo ethtool -S swp51
NIC statistics:
HwIfInOctets: 669507330
HwIfInUcastPkts: 658871
HwIfInBcastPkts: 2231559
HwIfInMcastPkts: 3696790
HwIfOutOctets: 2752224343
HwIfOutUcastPkts: 1001632
HwIfOutMcastPkts: 3743199
HwIfOutBcastPkts: 34212938
HwIfInDiscards: 2129675
   
    
```

### Duplicate LACP Partner MAC Warning

When you run `clagctl`, you may see output like this:

``` 
                   
bond01 bond01 52 duplicate lacp - partner mac
   
    
```

This occurs when you have multiple LACP bonds between the same two LACP
endpoints — for example, an MLAG switch pair is one endpoint and an ESXi
host is another. These bonds have duplicate LACP identifiers, which are
MAC addresses. This same warning could be triggered when you have a
cabling or configuration error.

## Caveats and Errata

  - If both the backup and peer connectivity are lost within a 30-second
    window, the switch in the secondary role misinterprets the event
    sequence, believing the peer switch is down, so it takes over as the
    primary.

  - MLAG is disabled on the chassis, including the [Facebook
    Backpack](https://cumulusnetworks.com/products/cumulus-express/getting-started/backpack/)
    and EdgeCore OMP-800.