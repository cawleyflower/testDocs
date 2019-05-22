---
title: Spanning Tree and Rapid Spanning Tree
author: Unknown
weight: 115
pageID: 8362689
aliases:
 - /old/Cumulus_Linux/Spanning_Tree_and_Rapid_Spanning_Tree.html
imgData: Cumulus_Linux
siteSlug: Cumulus_Linux
---
Spanning tree protocol (STP) is always recommended in layer 2 topologies
as it prevents bridge loops and broadcast radiation on a bridged
network. STP also provides redundant links for automatic failover when
an active link fails. STP is enabled by default in Cumulus Linux.

## Supported Modes

The STP modes Cumulus Linux supports vary depending upon whether the
traditional or VLAN-aware bridge driver mode is in use.

  - Bridges configured in
    *[VLAN-aware](/old/Cumulus_Linux/VLAN-aware_Bridge_Mode.html)* mode
    operate **only** in RSTP mode.

  - Bridges configured in [*traditional*
    mode](/old/Cumulus_Linux/Traditional_Bridge_Mode.html) operate in
    both PVST and PVRST mode. The default is set to PVRST. Each
    traditional bridge has its own separate STP instance.

### STP for a VLAN-aware Bridge

VLAN-aware ** bridges only operate in RSTP mode. STP bridge protocol
data units (BPDUs) are transmitted on the native VLAN.

If a bridge running RSTP (802.1w) receives a common STP (802.1D) BPDU,
it falls back to 802.1D operation automatically. RSTP interoperates with
MST seamlessly, creating a single instance of spanning tree, which
transmits BPDUs on the native VLAN. RSTP treats the MST domain as one
giant switch.

{{%notice note%}}

When connecting a VLAN-aware bridge to a proprietary PVST+ switch using
STP, VLAN 1 must be allowed on all 802.1Q trunks that interconnect them,
regardless of the configured *native* VLAN . This is because only VLAN 1
enables the switches to address the BPDU frames to the IEEE multicast
MAC address. The proprietary switch might be configured like this:

``` 
                   
switchport trunk allowed vlan 1-100
   
    
```

  

{{%/notice%}}

### STP within a Traditional Mode Bridge

Per VLAN Spanning Tree (PVST) creates a spanning tree instance for a
bridge. Rapid PVST (PVRST) supports RSTP enhancements for each spanning
tree instance. To use PVRST with a traditional bridge, you must create a
bridge corresponding to the untagged native VLAN and all the physical
switch ports must be part of the same VLAN.

{{%notice note%}}

When connected to a switch that has a native VLAN configuration, the
native VLAN **must** be configured to be VLAN 1 only for maximum
interoperability.

{{%/notice%}}

## Customize Spanning Tree Protocol

There are a number of ways you can customize STP in Cumulus Linux.
Exercise extreme caution with many of the settings below to prevent
malfunctions in STP loop avoidance.

### Spanning Tree Priority

If you have a multiple spanning tree instance (MSTI 0, also known as a
common spanning tree, or CST), you can set the *tree priority* for a
bridge. The bridge with the lowest priority is elected the *root
bridge*. The priority must be a number between *0* and *61440* and must
be a multiple of 4096; the default is *32768*.

To set the tree priority, run:

``` 
                   
cumulus@switch:~$ net add bridge stp treeprio 8192
cumulus@switch:~$ net pending
cumulus@switch:~$ net commit
   
    
```

{{%notice note%}}

Cumulus Linux supports MSTI 0 only. It does not support MSTI 1 through
15.

{{%/notice%}}

### PortAdminEdge (PortFast Mode)

*PortAdminEdge* is equivalent to the PortFast feature offered by other
vendors. It enables or disables the *initial edge state* of a port in a
bridge.

All ports configured with PortAdminEdge bypass the listening and
learning states to move immediately to forwarding.

{{%notice warning%}}

Using PortAdminEdge mode has the potential to cause loops if it is not
accompanied by the [BPDU
guard](/old/Cumulus_Linux/#src-8362689_SpanningTreeandRapidSpanningTree-bpdu)
feature.

{{%/notice%}}

While it is common for edge ports to be configured as access ports for a
simple end host, this is not mandatory. In the data center, edge ports
typically connect to servers, which might pass both tagged and untagged
traffic.

{{%notice info has%}}

To configure PortAdminEdge mode, use the `bpduguard` and `portadminedge`
NCLU configuration commands:

``` 
                   
cumulus@switch:~$ net add interface swp5 stp bpduguard
cumulus@switch:~$ net add interface swp5 stp portadminedge
cumulus@switch:~$ net pending
cumulus@switch:~$ net commit
   
    
```

The NCLU commands above create the following code snippet:

``` 
                   
auto swp5
iface swp5
    mstpctl-bpduguard yes
    mstpctl-portadminedge yes
   
    
```

{{%/notice%}}

{{%notice info has%}}

For a bridge in [traditional
mode](/old/Cumulus_Linux/Ethernet_Bridging_-_VLANs.html), configure
`PortAdminEdge` under the bridge stanza in `/etc/network/interfaces`:

``` 
                   
auto br2
iface br2 inet static
  bridge-ports swp1 swp2 swp3 swp4
  mstpctl-bpduguard swp1=yes swp2=yes swp3=yes swp4=yes
  mstpctl-portadminedge swp1=yes swp2=yes swp3=yes swp4=yes
   
    
```

To load the new configuration, run `ifreload -a`:

``` 
                   
cumulus@switch:~$ sudo ifreload -a
   
    
```

{{%/notice%}}

### PortAutoEdge

*PortAutoEdge* is an enhancement to the standard PortAdminEdge
(PortFast) mode, which allows for the automatic detection of edge ports.
PortAutoEdge enables and disables the *auto transition* to/from the edge
state of a port in a bridge.

{{%notice note%}}

Edge ports and access ports are not the same thing. Edge ports
transition directly to the forwarding state and skip the listening and
learning stages. Upstream topology change notifications are not
generated when an edge port's link changes state. Access ports only
forward untagged traffic; however, there is no such restriction on edge
ports, which can forward both tagged and untagged traffic.

{{%/notice%}}

When a BPDU is received on a port configured with portautoedge, the port
ceases to be in the edge port state and transitions into a normal STP
port. When BPDUs are no longer received on the interface, the port
becomes an edge port, and transitions through the discarding and
learning states before resuming forwarding.

PortAutoEdge is enabled by default in Cumulus Linux.

To disable PortAutoEdge for an interface, run the `net add interface
<port> stp portautoedge no` command. The following example disables
PortAutoEdge on swp1:

``` 
                   
cumulus@switch:~$ net add interface swp1 stp portautoedge no
cumulus@switch:~$ net pending
cumulus@switch:~$ net commit
   
    
```

To re-enable PortAutoEdge for an interface, run the the `net del
interface <port> stp portautoedge no` command. The following example
re-enables PortAutoEdge on swp1:

``` 
                   
cumulus@switch:~$ net del interface swp1 stp portautoedge no
cumulus@switch:~$ net pending
cumulus@switch:~$ net commit
   
    
```

### BPDU Guard

To protect the spanning tree topology from unauthorized switches
affecting the forwarding path, you can configure *BPDU guard* (Bridge
Protocol Data Unit). One very common example is when someone hooks up a
new switch to an access port off of a leaf switch. If this new switch is
configured with a low priority, it could become the new root switch and
affect the forwarding path for the entire layer 2 topology.

{{%notice info has%}}

To configure BPDU guard, set the `bpduguard` value for the interface:

``` 
                   
cumulus@switch:~$ net add interface swp5 stp bpduguard
cumulus@switch:~$ net pending
cumulus@switch:~$ net commit
   
    
```

This creates the following stanza in the `/etc/network/interfaces` file:

``` 
                   
auto swp5
iface swp5
    mstpctl-bpduguard yes
   
    
```

{{%/notice%}}

#### Recover a Port Disabled by BPDU Guard

If a BPDU is received on the port, STP will bring down the port and log
an error in `/var/log/syslog`. The following is a sample error:

``` 
                   
mstpd: error, MSTP_IN_rx_bpdu: bridge:bond0 Recvd BPDU on BPDU Guard Port - Port Down
   
    
```

To determine whether BPDU guard is configured, or if a BPDU has been
received, run:

``` 
                   
cumulus@switch:~$ net show bridge spanning-tree | grep bpdu
 bpdu guard port    yes                     bpdu guard error     yes
   
    
```

The only way to recover a port that has been placed in the disabled
state is to manually un-shut or bring up the port with ` sudo ifup
 ``[port]`, as shown in the example below.

{{%notice note%}}

Bringing up the disabled port does not fix the problem if the
configuration on the connected end-station has not been rectified.

{{%/notice%}}

``` 
                   
cumulus@leaf2$ mstpctl showportdetail bridge bond0
bridge:bond0 CIST info
  enabled            no                      role                 Disabled
  port id            8.001                   state                discarding
  external port cost 305                     admin external cost  0
  internal port cost 305                     admin internal cost  0
  designated root    8.000.6C:64:1A:00:4F:9C dsgn external cost   0
  dsgn regional root 8.000.6C:64:1A:00:4F:9C dsgn internal cost   0
  designated bridge  8.000.6C:64:1A:00:4F:9C designated port      8.001
  admin edge port    no                      auto edge port       yes
  oper edge port     no                      topology change ack  no
  point-to-point     yes                     admin point-to-point auto
  restricted role    no                      restricted TCN       no
  port hello time    10                      disputed             no
  bpdu guard port    yes                      bpdu guard error     yes
  network port       no                      BA inconsistent      no
  Num TX BPDU        3                       Num TX TCN           2
  Num RX BPDU        488                     Num RX TCN           2
  Num Transition FWD 1                       Num Transition BLK   2
  bpdufilter port    no                     
  clag ISL           no                      clag ISL Oper UP     no
  clag role          unknown                 clag dual conn mac   0:0:0:0:0:0
  clag remote portID F.FFF                   clag system mac      0:0:0:0:0:0
 
 
cumulus@leaf2$ sudo ifup bond0
 
 
cumulus@leaf2$ mstpctl showportdetail bridge bond0
bridge:bond0 CIST info
  enabled            yes                     role                 Root
  port id            8.001                   state                forwarding
  external port cost 305                     admin external cost  0
  internal port cost 305                     admin internal cost  0
  designated root    8.000.6C:64:1A:00:4F:9C dsgn external cost   0
  dsgn regional root 8.000.6C:64:1A:00:4F:9C dsgn internal cost   0
  designated bridge  8.000.6C:64:1A:00:4F:9C designated port      8.001
  admin edge port    no                      auto edge port       yes
  oper edge port     no                      topology change ack  no
  point-to-point     yes                     admin point-to-point auto
  restricted role    no                      restricted TCN       no
  port hello time    2                       disputed             no
  bpdu guard port    no                      bpdu guard error     no
  network port       no                      BA inconsistent      no
  Num TX BPDU        3                       Num TX TCN           2
  Num RX BPDU        43                      Num RX TCN           1
  Num Transition FWD 1                       Num Transition BLK   0
  bpdufilter port    no                     
  clag ISL           no                      clag ISL Oper UP     no
  clag role          unknown                 clag dual conn mac   0:0:0:0:0:0
  clag remote portID F.FFF                   clag system mac      0:0:0:0:0:0
   
    
```

### Bridge Assurance

On a point-to-point link where RSTP is running, if you want to detect
unidirectional links and put the port in a discarding state (in error),
you can enable bridge assurance on the port by enabling a port type
network. The port would be in a bridge assurance inconsistent state
until a BPDU is received from the peer. You need to configure the port
type network on both the ends of the link in order for bridge assurance
to operate properly.

The default setting for bridge assurance is off. This means that there
is no difference between disabling bridge assurance on an interface and
not configuring bridge assurance on an interface.

{{%notice info has%}}

To enable bridge assurance on an interface, add the `portnetwork` option
to the interface:

``` 
                   
cumulus@switch:~$ net add interface swp1 stp portnetwork
cumulus@switch:~$ net pending
cumulus@switch:~$ net commit
   
    
```

This creates the following interface stanza:

``` 
                   
auto swp1
iface swp1
    mstpctl-portnetwork yes
   
    
```

{{%/notice%}}

You can monitor logs for bridge assurance messages by doing the
following:

``` 
                   
cumulus@switch:~$ sudo grep -in assurance /var/log/syslog | grep mstp
 1365:Jun 25 18:03:17 mstpd: br1007:swp1.1007 Bridge assurance inconsistent
   
    
```

### BPDU Filter

You can enable `bpdufilter` on a switch port, which filters BPDUs in
both directions. This effectively disables STP on the port as no BPDUs
are transiting.

{{%notice warning%}}

Using BDPU filter inappropriately can cause layer 2 loops. Use this
feature deliberately and with extreme caution.

{{%/notice%}}

{{%notice info has%}}

To configure the BPDU filter, add the `portbpdufilter` option to the
interface:

``` 
                   
cumulus@switch:~$ net add interface swp6 stp portbpdufilter
cumulus@switch:~$ net pending
cumulus@switch:~$ net commit
   
    
```

These commands create the following stanza in the
`/etc/network/interfaces` file:

``` 
                   
auto swp6
iface swp6
    mstpctl-portbpdufilter yes
   
    
```

{{%/notice%}}

### Storm Control

*Storm control* provides protection against excessive inbound BUM
(broadcast, unknown unicast, multicast) traffic on layer 2 switch port
interfaces, which can cause poor network performance.

You configure storm control for each physical port by [configuring
`switchd`](/old/Cumulus_Linux/Configuring_switchd.html). For example, to
enable unicast and multicast storm control at 400 packets per second
(pps) and 3000 pps, respectively, for swp1, run the following:

``` 
                   
cumulus@switch:~$ sudo sh -c 'echo 400 > /cumulus/switchd/config/interface/swp1/storm_control/unknown_unicast'
cumulus@switch:~$ sudo sh -c 'echo 3000 > /cumulus/switchd/config/interface/swp1/storm_control/multicast'
 
   
    
```

### Spanning Tree Parameter List

Spanning tree parameters are defined in the IEEE
[802.1D](http://standards.ieee.org/findstds/standard/802.1D-2004.html),
[802.1Q](http://standards.ieee.org/findstds/standard/802.1Q-2018.html)
specifications.

The table below describes the STP configuration parameters available in
Cumulus Linux. For a comparison of STP parameter configuration between
`mstpctl` and other vendors, [read this knowledge base
article](https://support.cumulusnetworks.com/hc/en-us/articles/206908397).

{{%notice note%}}

Most of these parameters are blacklisted in the `ifupdown_blacklist`
section of the`  /etc/ ``netd.conf` file. Before you configure these
parameters, you must [edit the
file](/old/Cumulus_Linux/Network_Command_Line_Utility_-_NCLU.html#src-8362580_NetworkCommandLineUtility-NCLU-conf)
to remove them from the blacklist.

{{%/notice%}}

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>NCLU Command</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code>mstpctl-maxage</code></p></td>
<td><pre><code>                   
net add bridge stp maxage 
   
    </code></pre></td>
<td><p>Sets the <em>maximum age</em> of the bridge in seconds. The default is <em>20</em>. The maximum age must meet the condition 2 * (Bridge Forward Delay - 1 second) &gt;= Bridge Max Age.</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-ageing</code></p></td>
<td><pre><code>                   
net add bridge stp ageing 
   
    </code></pre></td>
<td><p>Sets the Ethernet (MAC) address <em>ageing time</em> for the bridge in seconds when the running version is STP, but not RSTP/MSTP. The default is <em>1800</em>.</p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-fdelay</code></p></td>
<td><pre><code>                   
net add bridge stp fdelay 
   
    </code></pre></td>
<td><p>Sets the <em>bridge forward delay</em> time in seconds. The default value is <em>15</em>. The bridge forward delay must meet the condition 2 * (Bridge Forward Delay - 1 second) &gt;= Bridge Max Age.</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-maxhops</code></p></td>
<td><pre><code>                   
net add bridge stp maxhops 
   
    </code></pre></td>
<td><p>Sets the <em>maximum hops</em> for the bridge. The default is <em>20.</em></p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-txholdcount</code></p></td>
<td><pre><code>                   
net add bridge stp txholdcount 
   
    </code></pre></td>
<td><p>Sets the <em>bridge transmit hold count</em>. The default value is <em>6</em>.</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-forcevers</code></p></td>
<td><pre><code>                   
net add bridge stp forcevers RSTP|STP
   
    </code></pre></td>
<td><p>Sets the <em>force STP version</em> of the bridge to either RSTP/STP. MSTP is not supported currently. The default is <em>RSTP</em>.</p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-treeprio</code></p></td>
<td><pre><code>                   
net add bridge stp treeprio 
   
    </code></pre></td>
<td><p>Sets the <em>tree priority</em> of the bridge for an MSTI (multiple spanning tree instance). The priority value is a number between 0 and 61440 and must be a multiple of 4096. The bridge with the lowest priority is elected the <em>root bridge</em>. The default is <em>32768</em>.</p>
<p>{{%notice note%}}</p>
<p>Cumulus Linux supports MSTI 0 only. It does not support MSTI 1 through 15.</p>
<p>{{%/notice%}}</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-hello</code></p></td>
<td><pre><code>                   
net add bridge stp hello 
   
    </code></pre></td>
<td><p>Sets the <em>bridge hello time</em> in seconds. The default is <em>2</em>.</p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-portpathcost</code></p></td>
<td><pre><code>                   
net add interface  stp portpathcost 
   
    </code></pre></td>
<td><p>Sets the <em>port cost</em> of the interface. The default is <em>0</em>.</p>
<p><code>mstpd</code> supports only long mode; 32 bits for the path cost.</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-treeportprio</code></p></td>
<td><pre><code>                   
net add interface  stp treeportprio 
   
    </code></pre></td>
<td><p>Sets the <em>priority</em> of the interface for the MSTI. The priority value is a number between 0 and 240 and must be a multiple of 16. The default is <em>128</em>.</p>
<p>{{%notice note%}}</p>
<p>Cumulus Linux supports MSTI 0 only. It does not support MSTI 1 through 15.</p>
<p>{{%/notice%}}</p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-portadminedge</code></p></td>
<td><pre><code>                   
net add interface  stp portadminedge
   
    </code></pre></td>
<td><p>Enables or disables the <em>initial edge state</em> of the interface in the bridge. The default is <em>no</em>.</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-portautoedge</code></p></td>
<td><pre><code>                   
net add interface  stp portautoedge no
   
    </code></pre></td>
<td><p>Enables or disables the <em>auto transition</em> to and from the edge state of the interface in the bridge. The default is <em>yes</em>.</p>
<p><em>portautoedge</em> is an enhancement to the standard PortAdminEdge (PortFast) mode, which allows for the automatic detection of edge ports.</p>
<p>{{%notice note%}}</p>
<p>Edge ports and access ports are not the same thing. Edge ports transition directly to the forwarding state and skip the listening and learning stages. Upstream topology change notifications are not generated when an edge port's link changes state. Access ports only forward untagged traffic; however, there is no such restriction on edge ports, which can forward both tagged and untagged traffic.</p>
<p>{{%/notice%}}</p>
<p>When a BPDU is received on a port configured with PortAutoEdge, the port ceases to be in the edge port state and transitions into a normal STP port.</p>
<p>When BPDUs are no longer received on the interface, the port becomes an edge port, and transitions through the discarding and learning states before resuming forwarding.</p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-portp2p</code></p></td>
<td><pre><code>                   
net add interface  stp portp2p yes|no
   
    </code></pre></td>
<td><p>Enables or disables the <em>point-to-point detection mode</em> of the interface in the bridge. The default is <em>auto</em>.</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-portrestrrole</code></p></td>
<td><pre><code>                   
net add interface  stp portrestrrole
   
    </code></pre></td>
<td><p>Enables or disables the ability of the interface in the bridge to take the <em>root role</em>. The default is <em>no</em>.</p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-portrestrtcn</code></p></td>
<td><pre><code>                   
net add interface  stp portrestrtcn
   
    </code></pre></td>
<td><p>Enables or disables the ability of the interface in the bridge to propagate <em>received topology change notifications</em>. The default is <em>no</em>.</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-portnetwork</code></p></td>
<td><pre><code>                   
net add interface  stp portnetwork
   
    </code></pre></td>
<td><p>Enables or disables the <em>bridge assurance capability</em> for a network interface. The default is <em>no</em>.</p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-bpduguard</code></p></td>
<td><pre><code>                   
net add interface  stp bpduguard
   
    </code></pre></td>
<td><p>Enables or disables the <em>BPDU guard configuration</em> of the interface in the bridge. The default is <em>no</em>.</p>
<p>See above.</p></td>
</tr>
<tr class="even">
<td><p><code>mstpctl-portbpdufilter</code></p></td>
<td><pre><code>                   
net add interface  stp portbpdufilter
   
    </code></pre></td>
<td><p>Enables or disables the <em>BPDU filter</em> functionality for an interface in the bridge. The default is no.</p></td>
</tr>
<tr class="odd">
<td><p><code>mstpctl-treeportcost</code></p></td>
<td><pre><code>                   
net add interface  stp treeportcost 
   
    </code></pre></td>
<td><p>Sets the spanning tree <em>port cost</em> to a value from 0 to 255. The default is <em>0</em>.</p></td>
</tr>
</tbody>
</table>

### Caveats and Errata

MSTP is not supported currently because Cumulus Linux only supports MSTI
0 (not MSTI 1 through 15). However, interoperability with MSTP networks
can be accomplished using PVRSTP or PVSTP.

## Related Information

The source code for `mstpd`/`mstpctl` was written by [Vitalii
Demianets](mailto:vitas%40nppfactor.kiev.ua) and is hosted at the URL
below.

  - [Sourceforge - mstpd project](https://github.com/mstpd/mstpd)

  - [Wikipedia - Spanning Tree
    Protocol](http://en.wikipedia.org/wiki/Spanning_Tree_Protocol)

  - brctl(8)

  - bridge-utils-interfaces(5)

  - ifupdown-addons-interfaces(5)

  - mstpctl(8)

  - mstpctl-utils-interfaces(5)
