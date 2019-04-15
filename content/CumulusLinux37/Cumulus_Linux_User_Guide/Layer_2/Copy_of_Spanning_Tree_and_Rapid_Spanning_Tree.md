---
title: Copy of Spanning Tree and Rapid Spanning Tree
author: Unknown
weight: 135
pageID: 8362703
---
# Copy of Spanning Tree and Rapid Spanning Tree

<span id="src-8362703_indexterm-91682A43CC90813093F9F0C1B1FC9FA6">Spanning
</span><span id="src-8362703_indexterm-2D7C78485F93B942F2528974C2CEF2D5">tree
protocol (</span>STP) is always recommended in layer 2 topologies, as it
prevents bridge loops and broadcast radiation on a bridged network.
`mstpd` is a daemon that implements IEEE802.1D 2004 and IEEE802.1Q 2011.

STP is enabled by default in Cumulus Linux.

{{%notice warning%}}

The STP modes Cumulus Linux supports vary depending upon which [bridge
driver mode](Ethernet_Bridging_-_VLANs.html) is in use. For a bridge
configured in *traditional* mode, STP, RSTP, PVST and PVRST are
supported; with the default set to PVRST.
[VLAN-aware](VLAN-aware_Bridge_Mode.html) bridges only operate in RSTP
mode.

If a bridge running RSTP (802.1w) receives a common STP (802.1D) BPDU,
it will automatically fall back to 802.1D operation.

You can configure `mstpd` to be in common STP mode only, by setting
`setforcevers` to
*STP*.

{{%/notice%}}

## Commands

  - brctl

  - mstpctl

`mstpctl`<span id="src-8362703_indexterm-F5225BBF296FC78E29F888E382BA2528">
</span>is a utility to configure STP. `mstpd` is started by default on
bootup. `mstpd` logs and errors are located in `/var/log/syslog`.

## PVST/PVRST

<span id="src-8362703_indexterm-73B59F2CBC53FEA728160F5799F9C2AC">Per
</span><span id="src-8362703_indexterm-0ACCAE1CB72F4B65CA757BF64B5DDC05">VLAN
</span><span id="src-8362703_indexterm-6BD1AE970C69FAE38A86CB5C23C55DBA">Spanning
Tree (PVST) creates a spanning tree instance for a bridge. Rapid
</span><span id="src-8362703_indexterm-6C153F275D5E3DAF1A64FB729BEF2658">PVST
(</span><span id="src-8362703_indexterm-6CE4CCF059D1DBD8B59492EE9A0374E1">PVRST)
supports </span>RSTP enhancements for each spanning tree instance. You
must create a bridge corresponding to the untagged native/access VLAN,
and all the physical switch ports must be part of the same VLAN. When
connected to a switch that has a native VLAN configuration, the native
VLAN **must** be configured to be VLAN 1 only.

Cumulus Linux supports the RSTP/PVRST/PVST modes of STP natively when
the bridge is configured in [traditional
mode](Ethernet_Bridging_-_VLANs.html).

## Configure Spanning Tree Parameters

The persistent configuration for a bridge is set in
`/etc/network/interfaces`. The configuration below shows every possible
option configured. There is no requirement to configure any of these
options:

``` 
                   
auto br2
iface br2 inet static
  bridge-ports swp1 swp2 swp3 swp4
  bridge-stp on
  mstpctl-maxage 20
  mstpctl-ageing 300
  mstpctl-fdelay 15
  mstpctl-maxhops 20
  mstpctl-txholdcount 6
  mstpctl-forcevers rstp
  mstpctl-treeprio 32768
  mstpctl-treeportprio swp3=128
  mstpctl-hello 2
  mstpctl-portpathcost swp1=0 swp2=0
  mstpctl-portadminedge swp1=no swp2=no
  mstpctl-portautoedge swp1=yes swp2=yes
  mstpctl-portp2p swp1=no swp2=no
  mstpctl-portrestrrole swp1=no swp2=no
  mstpctl-portrestrtcn swp1=no swp2=no
  mstpctl-portnetwork swp1=no
  mstpctl-bpduguard swp1=no swp2=no
  mstpctl-bpdufilter swp4=yes
   
    
```

### Spanning Tree Parameters

<span id="src-8362703_indexterm-59E3635A37C5ABC209BC05BBABF103E0">The
spanning tree </span>parameters are defined in the IEEE
[802.1D](http://standards.ieee.org/getieee802/download/802.1D-2004.pdf),
[802.1Q](http://standards.ieee.org/getieee802/download/802.1Q-2005.pdf)
specifications and in the table below.

While configuring spanning tree in a persistent configuration, as
described above, is the preferred method, you can also use `mstpctl` to
configure spanning tree protocol parameters at runtime.

{{%notice warning%}}

A runtime configuration is non-persistent, which means the configuration
you create here does not persist after you reboot the switch.

{{%/notice%}}

The `mstp` daemon is an open source project that some network engineers
may be unfamiliar with. For example, many incumbent vendors use the
keyword `portfast` to describe a port that is automatically set to
forwarding when the port is brought up. The `mstpd` equivalent is
`mstpctl-portadminedge`. For more comparison [please read this knowledge
base
article](https://support.cumulusnetworks.com/hc/en-us/articles/206908397).

Examples are included below:

<div class="tablewrap">

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><strong>maxage</strong></p></td>
<td><p>Sets the bridge's <em>maximum age</em> to <code>&lt;max_age&gt;</code> seconds. The default is <em>20</em>.</p>
<p>The maximum age must meet the condition 2 * (Bridge Forward Delay - 1 second) &gt;= Bridge Max Age.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-maxage 24
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setmaxage &lt;bridge&gt; &lt;max_age&gt;</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setmaxage br2 24
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>ageing</strong></p></td>
<td><p>Sets the Ethernet (MAC) address <em>ageing time</em> in <code>&lt;time&gt;</code> seconds for the bridge when the running version is STP, but not RSTP/MSTP. The default is <em>300</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-ageing 240
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setageing &lt;bridge&gt; &lt;time&gt;</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setageing br2 240
   
    </code></pre></td>
</tr>
<tr class="odd">
<td><p><strong>fdelay</strong></p></td>
<td><p>Sets the bridge's <em>bridge forward delay</em> to <code>&lt;time&gt;</code> seconds. The default is <em>15</em>.</p>
<p>The bridge forward delay must meet the condition 2 * (Bridge Forward Delay - 1 second) &gt;= Bridge Max Age.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-fdelay 15
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setfdelay &lt;bridge&gt; &lt;time&gt;</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setfdelay br2 15
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>maxhops</strong></p></td>
<td><p>Sets the bridge's <em>maximum hops</em> to <code>&lt;max_hops&gt;</code>. The default is <em>20</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-maxhops 24
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setmaxhops &lt;bridge&gt; &lt;max_hops&gt;</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setmaxhops br2 24
   
    </code></pre></td>
</tr>
<tr class="odd">
<td><p><strong>txholdcount</strong></p></td>
<td><p>Sets the bridge's <em>bridge transmit hold count</em> to <code>&lt;tx_hold_count&gt;</code>. The default is <em>6</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-txholdcount 6
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl settxholdcount &lt;bridge&gt; &lt;tx_hold_count&gt;</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl settxholdcount br2 5
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>forcevers</strong></p></td>
<td><p>Sets the bridge's <em>force STP version</em> to either RSTP/STP. MSTP is not supported currently. The default is <em>RSTP</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-forcevers rstp
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setforcevers &lt;bridge&gt; {mstp|rstp|stp}</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setforcevers br2 rstp
   
    </code></pre></td>
</tr>
<tr class="odd">
<td><p><strong>treeprio</strong></p></td>
<td><p>Sets the bridge's <em>tree priority</em> to <code>&lt;priority&gt;</code> for an MSTI instance. The priority value is a number between 0 and 65535 and must be a multiple of 4096. The bridge with the lowest priority is elected the <em>root bridge</em>. The default is <em>32768</em>.</p>
<p>{{%notice warning%}}</p>
<p>For <code>msti</code>, only 0 is supported currently.</p>
<p>{{%/notice%}}</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-treeprio 8192
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl settreeprio &lt;bridge&gt; &lt;mstid&gt; &lt;priority&gt;</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl settreeprio br2 0 8192
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>treeportprio</strong></p></td>
<td><p>Sets the <em>priority</em> of port <code>&lt;port&gt;</code> to <code>&lt;priority&gt;</code> for the MSTI instance. The priority value is a number between 0 and 240 and must be a multiple of 16. The default is <em>128</em>.</p>
<p>{{%notice warning%}}</p>
<p>For <code>msti</code>, only <em>0</em> is supported currently.</p>
<p>{{%/notice%}}</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-treeportprio swp4.101 64
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl settreeportprio &lt;bridge&gt; &lt;port&gt; &lt;mstid&gt; &lt;priority&gt;</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl settreeportprio br2 swp4.101 0 64
   
    </code></pre></td>
</tr>
<tr class="odd">
<td><p><strong>hello</strong></p></td>
<td><p>Sets the bridge's <em>bridge hello time</em> to <code>&lt;time&gt;</code> seconds. The default is <em>2</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-hello 20
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl sethello &lt;bridge&gt; &lt;time&gt;</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl sethello br2 20
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>portpathcost</strong></p></td>
<td><p>Sets the <em>port cost</em> of the port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code> to <code>&lt;cost&gt;</code>. The default is <em>0</em>.</p>
<p><code>mstpd</code> supports only long mode; that is, 32 bits for the path cost.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-portpathcost swp1.101=10
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setportpathcost &lt;bridge&gt; &lt;port&gt; &lt;cost&gt;</code>:</p>
<pre><code>        </code></pre>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setportpathcost br2 swp1.101 10
   
    </code></pre></td>
</tr>
<tr class="odd">
<td><p><strong>portadminedge</strong></p></td>
<td><p>Enables/disables the <em>initial edge state</em> of the port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code>. The default is <em>no</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-portadminedge swp1.101=yes
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setportadminedge &lt;bridge&gt; &lt;port&gt; {yes|no}</code>:</p>
<pre><code>        </code></pre>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setportadminedge br2 swp1.101 yes
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>portautoedge</strong></p></td>
<td><p>Enables/disables the <em>auto transition</em> to/from the edge state of the port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code>. The default is <em>yes</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-portautoedge swp1.101=no
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setportautoedge &lt;bridge&gt; &lt;port&gt; {yes|no}</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setportautoedge br2 swp1.101 no
   
    </code></pre></td>
</tr>
<tr class="odd">
<td><p><strong>portp2p</strong></p></td>
<td><p>Enables/disables the <em>point-to-point detection mode</em> of the port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code>. The default is <em>auto</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-portp2p swp1.101=no
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setportp2p &lt;bridge&gt; &lt;port&gt; {yes|no|auto}</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setportp2p br2 swp1.101 no
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>portrestrrole</strong></p></td>
<td><p>Enables/disables the ability of the port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code> to take the <em>root role</em>. The default is <em>no</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-portrestrrole swp1.101=no
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setportrestrrole &lt;bridge&gt; &lt;port&gt; {yes|no}</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setportrestrrole br2 swp1.101 yes
   
    </code></pre></td>
</tr>
<tr class="odd">
<td><p><strong>portrestrtcn</strong></p></td>
<td><p>Enables/disables the ability of the port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code> to propagate <em>received topology change notifications</em>. The default is <em>no</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-portrestrtcn swp1.101=yes
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setportrestrtcn &lt;bridge&gt; &lt;port&gt; {yes|no}</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setportrestrtcn br2 swp1.101 yes
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>portnetwork</strong></p></td>
<td><p>Enables/disables the <em>bridge assurance capability</em> for a network port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code>. The default is <em>no</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-portnetwork swp4.101=yes
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setportnetwork &lt;bridge&gt; &lt;port&gt; {yes|no}</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setportnetwork br2 swp4.101 yes
   
    </code></pre></td>
</tr>
<tr class="odd">
<td><p><strong>bpduguard</strong></p></td>
<td><p>Enables/disables the <em>BPDU guard configuration</em> of the port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code>. The default is <em>no</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-bpduguard swp1=no
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setbpduguard &lt;bridge&gt; &lt;port&gt; {yes|no}</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setbpduguard br2 swp1.101 yes
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>portbpdufilter</strong></p></td>
<td><p>Enables/disables the <em>BPDU filter</em> functionality for a port <code>&lt;port&gt;</code> in bridge <code>&lt;bridge&gt;</code>. The default is <em>no</em>.</p>
<p>To set this parameter persistently, configure it under the bridge stanza:</p>
<pre><code>                   
mstpctl-bpdufilter swp4.101=yes
   
    </code></pre>
<p>To set this parameter at runtime, use <code>mstpctl setportbpdufilter &lt;bridge&gt; &lt;port&gt; {yes|no}</code>:</p>
<pre><code>                   
cumulus@switch:~$ sudo mstpctl setportbpdufilter br2 swp4.101 yes
   
    </code></pre></td>
</tr>
</tbody>
</table>

</div>

## Bridge Assurance

<span id="src-8362703_indexterm-1186ED546E7C4D090C8463E6B42C6AF6">On</span><span id="src-8362703_indexterm-9D221B7DCAF8DA5265FD3B3192223733">
a point-to-point</span> link where RSTP is running, if you want to
detect unidirectional links and put the port in a discarding state (in
error), you can enable bridge assurance on the port by enabling port
type network. The port would be in a bridge assurance inconsistent state
until a BPDU is received from the peer. You need to configure the port
type network on both the ends of the link:

``` 
                   
cumulus@switch:~$ sudo mstpctl setportnetwork br1007 swp1.1007 yes
 
cumulus@switch:~$ sudo mstpctl showportdetail br1007 swp1.1007 | grep network
  network port       yes                     BA inconsistent      yes
 
cumulus@switch:~$ sudo grep -in assurance /var/log/syslog | grep mstp
 1365:Jun 25 18:03:17 mstpd: br1007:swp1.1007 Bridge assurance inconsistent
   
    
```

## Storm Control

*<span id="src-8362703_indexterm-93E5E8B9F411435A2E7A5D227EFC32F4">Storm
</span>control* provides protection against excessive inbound BUM
(broadcast, unknown unicast, multicast) traffic on layer 2 switch port
interfaces, which can cause poor network performance.

You configure storm control in `/etc/cumulus/switchd.conf`. The
configuration persists across reboots and restarting `switchd`. If you
change the storm control configuration in this file after rebooting the
switch, you must [restart
`switchd`](Configuring_switchd.html#src-8362561_Configuringswitchd-restartswitchd)
to activate the new configuration.

You configure storm control for each physical port. For example, to
enable broadcast and multicast storm control at 400 packets per second
(pps) and 3000 pps, respectively, for swp1, edit
`/etc/cumulus/switchd.conf` and configure it as follows:

``` 
                   
# Storm Control setting on a port, in pps, 0 means disable
interface.swp1.storm_control.broadcast = 400
interface.swp1.storm_control.multicast = 3000
   
    
```

If you have the need to dynamically change the pps settings on
interfaces it may also be helpful to set the value directly which takes
effect in real time. For example to set the pps on swp1 to 2000 pps for
broadcast traffic:

``` 
                   
echo 2000 > /cumulus/switchd/config/interface/swp1/storm_control/broadcast
   
    
```

Additionally you could configure the settings in the
`/etc/network/interfaces` file as follows:

``` 
                   
auto swp1
iface swp1
  post-up echo 2000 > /cumulus/switchd/config/interface/$IFACE/storm_control/broadcast
  post-down echo 0 > /cumulus/switchd/config/interface/$IFACE/storm_control/broadcast
   
    
```

## Configuration Files

  - /etc/network/interfaces

  - /etc/cumulus/switchd.conf

## Man Pages

  - brctl(8)

  - bridge-utils-interfaces(5)

  - ifupdown-addons-interfaces(5)

  - mstpctl(8)

  - mstpctl-utils-interfaces(5)

## Useful Links

The source code for `mstpd`/`mstpctl` was written by [Vitalii
Demianets](mailto:vitas%40nppfactor.kiev.ua) and is hosted at the
sourceforge URL
    below.

  - [sourceforge.net/projects/mstpd/](https://sourceforge.net/projects/mstpd/)

  - [en.wikipedia.org/wiki/Spanning\_Tree\_Protocol](http://en.wikipedia.org/wiki/Spanning_Tree_Protocol)

## Caveats and Errata

  - MSTP is not supported currently. However, interoperability with MSTP
    networks can be accomplished using PVRSTP or PVSTP.
