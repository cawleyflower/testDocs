# Data Center Host to ToR Architecture

This chapter discusses the various architectures and strategies
available from the top of rack (ToR) switches all the way down to the
server hosts.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [Layer 2 -
    Architecture](#DataCenterHosttoToRArchitecture-Layer2-Architecture)
    -   [Traditional Spanning Tree - Single
        Attached](#DataCenterHosttoToRArchitecture-TraditionalSpanningTree-SingleAttached)
    -   [MLAG](#DataCenterHosttoToRArchitecture-mlagMLAG)
-   [Layer 3
    Architecture](#DataCenterHosttoToRArchitecture-Layer3Architecture)
    -   [Single-attached
        Hosts](#DataCenterHosttoToRArchitecture-Single-attachedHosts)
    -   [Redistribute
        Neighbor](#DataCenterHosttoToRArchitecture-RedistributeNeighbor)
    -   [Routing on the
        Host](#DataCenterHosttoToRArchitecture-RoutingontheHost)
    -   [Routing on the
        VM](#DataCenterHosttoToRArchitecture-RoutingontheVM)
    -   [Virtual Router](#DataCenterHosttoToRArchitecture-VirtualRouter)
    -   [Anycast with Manual
        Redistribution](#DataCenterHosttoToRArchitecture-AnycastwithManualRedistribution)
-   [Network
    Virtualization](#DataCenterHosttoToRArchitecture-NetworkVirtualization)

## Layer 2 - Architecture

###  Traditional Spanning Tree - Single Attached

**![](attachments/8362991/8362994.png){height="250"}**

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><a href="Bonding_-_Link_Aggregation">Bond</a>/Etherchannel is not configured on host to multiple switches (bonds can still occur but only to one switch at a time), so leaf01 and leaf02 see two different MAC addresses.</p>
<p><strong>Configurations</strong></p>
<div id="expander-644593864" class="expand-container">
<div id="expander-control-644593864" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" />Click here to expand...
</div>
<div id="expander-content-644593864" class="expand-content">
<p><strong>leaf01 Config</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto bridge
iface bridge
  bridge-vlan-aware yes
  bridge-ports swp1 peerlink
  bridge-vids 1-2000
  bridge-stp on

auto bridge.10
iface bridge.10
  address 10.1.10.2/24

auto peerlink
iface peerlink
    bond-slaves glob swp49-50

auto swp1
iface swp1
  mstpctl-portadminedge yes
  mstpctl-bpduguard yes</code></pre>
</div>
</div>
<p><strong>Example Host Config (Ubuntu)</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto eth1
iface eth1 inet manual

auto eth1.10
iface eth1.10 inet manual

auto eth2
iface eth1 inet manual

auto eth2.20
iface eth2.20 inet manual

auto br-10
iface br-10 inet manual
  bridge-ports eth1.10 vnet0

auto br-20
iface br-20 inet manual
  bridge-ports eth2.20 vnet1</code></pre>
</div>
</div>
</div>
</div></td>
<td><p><strong>Benefits</strong></p>
<ul>
<li>Established technology
<ul>
<li>Interoperability with other vendors</li>
<li>Easy configuration for customer</li>
<li>Immense documentation from multiple vendors and industry</li>
</ul></li>
<li>Ability to use <a href="Spanning_Tree_and_Rapid_Spanning_Tree">spanning tree</a> commands
<ul>
<li>mstpctl-portadminedge</li>
<li><a href="Spanning-Tree-and-Rapid-Spanning-Tree_8362689.html#SpanningTreeandRapidSpanningTree-bpdu">BPDU guard</a></li>
</ul></li>
<li>Layer 2 reachability to all VMs</li>
</ul>
<p><strong>Caveats</strong></p>
<ul>
<li>The load balancing mechanism on the host can cause problems. If there is only host pinning to each NIC, there are no problems, but if you are doing a bond, you need to look at an MLAG solution.</li>
<li>No active-active host links. Some operating systems allow HA (NIC failover), but this still does not utilize all the bandwidth. VMs are using one NIC, not two.</li>
</ul></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Active-Active Mode</strong></th>
<th><strong>Active-Passive Mode</strong></th>
<th><p><strong>L2 to L3 Demarcation</strong></p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><ul>
<li>None (not possible with traditional spanning tree)</li>
</ul>
<p> </p></td>
<td><ul>
<li><a href="Virtual_Router_Redundancy_-_VRR">VRR</a></li>
</ul>
<p><strong><br />
</strong></p></td>
<td><ul>
<li>ToR layer (recommended)</li>
<li>Spine layer</li>
<li>Core/edge/exit</li>
</ul>
<div id="expander-1489816171" class="expand-container">
<div id="expander-control-1489816171" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" />More Info...
</div>
<div id="expander-content-1489816171" class="expand-content">
<p>VRR can be configured on a pair of switches at any level in the network. However, the higher up the network you configure it, the larger the L2 domain becomes. The benefit here is L2 reachability. The drawback is the L2 domain is more difficult to troubleshoot, does not scale as well, and the pair of switches running VRR needs to carry the entire MAC address table of everything below it in the network. Minimizing the L2 domain as much as possible is recommended by Cumulus Professional Services. <a href="https://docs.google.com/presentation/d/1l1d_6iUF7RTUHTSAmGuLwm3WCUXTNdFjndCLLxzBSOU/edit?usp=sharing">See this presentation for more information</a>.</p>
</div>
</div></td>
</tr>
</tbody>
</table>

### MLAG

**![](attachments/8362991/8363001.png){height="150"}**

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><a href="Multi-Chassis_Link_Aggregation_-_MLAG">MLAG</a> (multi-chassis link aggregation) is when both uplinks are utilized at the same time. VRR gives the ability for both spines to act as gateways simultaneously for HA (high availability) and <a href="LNV_VXLAN_Active-Active_Mode">active-active mode</a> (both are being used at the same time).</p>
<p><strong>Configurations</strong></p>
<div id="expander-1718241577" class="expand-container">
<div id="expander-control-1718241577" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" />Click here to expand...
</div>
<div id="expander-content-1718241577" class="expand-content">
<p><strong>leaf01 Config</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto bridge
iface bridge
  bridge-vlan-aware yes
  bridge-ports host-01 peerlink
  bridge-vids 1-2000
  bridge-stp on

auto bridge.10
iface bridge.10
  address 172.16.1.2/24
  address-virtual 44:38:39:00:00:10 172.16.1.1/24

auto peerlink
iface peerlink
    bond-slaves glob swp49-50

auto peerlink.4094
iface peerlink.4094
    address 169.254.1.2
    clagd-enable yes
    clagd-peer-ip 169.254.1.2
    clagd-system-mac 44:38:39:FF:40:94

auto host-01
iface host-01
  bond-slaves swp1
  clag-id 1
  {bond-defaults removed for brevity}</code></pre>
</div>
</div>
<p><strong>Example Host Config (Ubuntu)</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto bond0
iface bond0 inet manual
  bond-slaves eth0 eth1
  {bond-defaults removed for brevity}

auto bond0.10
iface bond0.10 inet manual

auto vm-br10
iface vm-br10 inet manual
  bridge-ports bond0.10 vnet0</code></pre>
</div>
</div>
</div>
</div></td>
<td><p><strong>Benefits</strong></p>
<ul>
<li>100% of links utilized</li>
</ul>
<p><strong>Caveats</strong></p>
<ul>
<li>More complicated (more moving parts)</li>
<li>More configuration</li>
<li>No interoperability between vendors</li>
<li>ISL (inter-switch link) required</li>
</ul>
<p><strong>Additional Comments</strong></p>
<ul>
<li>Can be done with either the <a href="Ethernet_Bridging_-_VLANs">traditional</a> or <a href="VLAN-aware_Bridge_Mode">VLAN-aware</a> bridge driver depending on overall STP needs</li>
<li>There are a few different solutions including Cisco VPC and Arista MLAG, but none of them interoperate and are very vendor specific</li>
<li><a href="https://cumulusnetworks.com/media/resources/validated-design-guides/Cumulus-Linux-Layer-2-HA-Validated-Design-Guide_v1.0.0.pdf">Cumulus Networks Layer 2 HA validated design guide</a></li>
</ul></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Active-Active Mode</strong></th>
<th><strong>Active-Passive Mode</strong></th>
<th><strong>L2-&gt;L3 Demarcation</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><ul>
<li><a href="Virtual_Router_Redundancy_-_VRR">VRR</a></li>
</ul></td>
<td><p>None</p></td>
<td><ul>
<li>ToR layer (recommended)</li>
<li>Spine layer</li>
<li>Core/edge/exit</li>
</ul></td>
</tr>
</tbody>
</table>

## Layer 3 Architecture

### Single-attached Hosts

![](attachments/8362991/8362995.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>The server (physical host) has only has one link to one ToR switch.</p>
<p><strong>Configurations</strong></p>
<div id="expander-1118744947" class="expand-container">
<div id="expander-control-1118744947" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" />Click here to expand...
</div>
<div id="expander-content-1118744947" class="expand-content">
<p><strong>leaf01 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto swp1
iface swp1
  address 172.16.1.1/30</code></pre>
</div>
</div>
<p><code>/etc/frr/frr.conf</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>router ospf
  router-id 10.0.0.11
interface swp1
  ip ospf area 0</code></pre>
</div>
</div>
<p><strong>leaf02 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto swp1
iface swp1
  address 172.16.2.1/30</code></pre>
</div>
</div>
<p><code>/etc/frr/frr.conf</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>router ospf
  router-id 10.0.0.12
interface swp1
  ip ospf area 0</code></pre>
</div>
</div>
<p><strong>host1 Example Config (Ubuntu)</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto eth1
iface eth1 inet static
  address 172.16.1.2/30
  up ip route add 0.0.0.0/0 nexthop via 172.16.1.1</code></pre>
</div>
</div>
<p><strong>host2 Example Config (Ubuntu)</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto eth1
iface eth1 inet static
  address 172.16.2.2/30
  up ip route add 0.0.0.0/0 nexthop via 172.16.2.1</code></pre>
</div>
</div>
</div>
</div></td>
<td><p><strong><strong>Benefits</strong></strong></p>
<ul>
<li>Relatively simple network configuration</li>
<li>No STP</li>
<li>No MLAG</li>
<li>No L2 loops</li>
<li>No crosslink between leafs</li>
<li>Greater route scaling and flexibility</li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li>No redundancy for ToR, upgrades would cause downtime</li>
<li>Many customers do not have software to support application layer redundancy</li>
</ul>
<p><strong>Additional Comments</strong></p>
<ul>
<li>For additional bandwidth links between host and leaf may be bonded</li>
</ul></td>
</tr>
<tr class="even">
<td><strong>FHR (First Hop Redundancy)</strong></td>
<td><strong>More Information</strong></td>
</tr>
<tr class="odd">
<td><ul>
<li>No redundancy, uses single ToR as gateway.</li>
</ul></td>
<td><ul>
<li><a href="https://cumulusnetworks.com/media/cumulus/pdf/technical/validated-design-guides/Big-Data-Cumulus-Linux-Validated-Design-Guide.pdf">Big Data validated design guide</a> uses single attached ToR</li>
</ul></td>
</tr>
</tbody>
</table>

### Redistribute Neighbor

![](attachments/8362991/8363000.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><a href="https://support.cumulusnetworks.com/hc/en-us/articles/204339077">Redistribute neighbor</a> daemon grabs ARP entries dynamically, utilizes redistribute table for FRRouting to grab these dynamic entries and redistribute them into the fabric.</p>
<p> </p></td>
<td><p><strong>Benefits</strong></p>
<ul>
<li>Configuration in FRRouting is simple (route-map + redist table)</li>
<li>Supported by Cumulus Networks</li>
</ul>
<p><strong>Caveats</strong></p>
<ul>
<li>Silent hosts don't receive traffic (depending on ARP).</li>
<li>IPv4 only.</li>
<li>If two VMs are on same L2 domain, they could learn about each other directly rather than utilizing gateway, which causes problems (VM migration for example, or getting their network routed). Put hosts on /32 (no other L2 adjacency).</li>
<li>VM move does not trigger route withdrawal from original leaf (4 hour timeout).</li>
<li>Clearing ARP impacts routing. May not be obvious.</li>
<li>No L2 adjacency between servers without VXLAN.</li>
</ul></td>
</tr>
<tr class="even">
<td><strong>FHR (First Hop Redundancy)</strong></td>
<td><strong>More Information</strong></td>
</tr>
<tr class="odd">
<td><ul>
<li>Equal cost route installed on server/host/hypervisor to both ToRs to load balance evenly.</li>
<li>For host/VM/container mobility, use the same default route on all hosts (such as x.x.x.1) but don't distribute or advertise the .1 on the ToR into the fabric. This allows the VM to use the same gateway no matter which pair of leafs it is cabled to.</li>
</ul></td>
<td><ul>
<li><a href="https://cumulusnetworks.com/blog/introducing-rdnbr/">Cumulus Networks blog post introducing redistribute neighbor</a></li>
</ul></td>
</tr>
</tbody>
</table>

### Routing on the Host

**![](attachments/8362991/8362992.png){height="250"}**

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Routing on the host means there is a routing application (such as <a href="FRRouting_Overview">FRRouting</a>) either on the bare metal host (no VMs/containers) or the hypervisor (for example, Ubuntu with KVM). This is highly recommended by the Cumulus Networks Professional Services team.</p></td>
<td><p><strong>Benefits</strong></p>
<ul>
<li>No requirement for MLAG</li>
<li>No spanning-tree or layer 2 domain</li>
<li>No loops</li>
<li>3 or more ToRs can be used instead of usual 2</li>
<li>Host and VM mobility</li>
<li>Traffic engineering can be used to migrate traffic from one ToR to another for upgrading both hardware and software</li>
</ul>
<p><strong>Caveats</strong></p>
<ul>
<li>Certain hypervisors or host OSes might not support a routing application like FRRouting and will require a virtual router on the hypervisor</li>
<li>No L2 adjacnecy between servers without VXLAN</li>
</ul>
<p> </p></td>
</tr>
<tr class="even">
<td><strong>FHR (First Hop Redundancy)</strong></td>
<td><strong>More Information</strong></td>
</tr>
<tr class="odd">
<td><ul>
<li>The first hop is still the ToR, just like redistribute neighbor</li>
<li><p>A default route can be advertised by all leaf/ToRs for dynamic ECMP paths</p></li>
</ul></td>
<td><ul>
<li><a href="https://support.cumulusnetworks.com/hc/en-us/articles/213177027-Installing-the-Cumulus-Linux-Quagga-Package-on-an-Ubuntu-Server">Installing the Cumulus Linux FRRouting Package on an Ubuntu Server</a></li>
<li><a href="Configuring_FRRouting">Configuring FRRouting</a></li>
</ul></td>
</tr>
</tbody>
</table>

### Routing on the VM

![](attachments/8362991/8362993.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Instead of routing on the hypervisor, each virtual machine utilizes its own routing stack.</p>
<p> </p></td>
<td><p><strong>Benefits</strong></p>
<ul>
<li>In addition to routing on host:
<ul>
<li>Hypervisor/base OS does not need to be able to do routing</li>
<li>VMs can be authenticated into routing fabric</li>
</ul></li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li>All VMs must be capable of routing</li>
<li>Scale considerations might need to be taken into an account —<br />
instead of one routing process, there are as many as there are VMs</li>
<li>No L2 adjacency between servers without VXLAN</li>
</ul></td>
</tr>
<tr class="even">
<td><strong>FHR (First Hop Redundancy)</strong></td>
<td><strong>More Information</strong></td>
</tr>
<tr class="odd">
<td><ul>
<li>The first hop is still the ToR, just like redistribute neighbor </li>
<li>Multiple ToRs (2+) can be used</li>
</ul></td>
<td><ul>
<li><a href="https://support.cumulusnetworks.com/hc/en-us/articles/213177027-Installing-the-Cumulus-Linux-Quagga-Package-on-an-Ubuntu-Server">Installing the Cumulus Linux FRRouting Package on an Ubuntu Server</a></li>
<li><a href="Configuring_FRRouting">Configuring FRRouting</a></li>
</ul></td>
</tr>
</tbody>
</table>

### Virtual Router

![](attachments/8362991/8362990.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Virtual router (vRouter) runs as a VM on the hypervisor/host, sends routes to the ToR using BGP or <a href="Open_Shortest_Path_First_-_OSPF">OSPF</a>.</p>
<p> </p></td>
<td><p><strong><strong>Benefits</strong></strong></p>
<p>In addition to routing on a host:</p>
<ul>
<li>Multi-tenancy can work (multiple customers sharing same racks)</li>
<li>Base OS does not need to be routing capable</li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li><a href="Equal_Cost_Multipath_Load_Sharing_-_Hardware_ECMP">ECMP</a> might not work correctly (load balancing to multiple ToRs); Linux kernel in older versions is not capable of ECMP per flow (does it per packet)</li>
<li>No L2 adjacency between servers without VXLAN</li>
</ul>
<p> </p></td>
</tr>
<tr class="even">
<td><strong>FHR (First Hop Redundancy)</strong></td>
<td><strong>More Information</strong></td>
</tr>
<tr class="odd">
<td><ul>
<li>The gateway would be the vRouter, which has two routes out (two ToRs)</li>
<li>Multiple vRouters could be used</li>
</ul></td>
<td><ul>
<li><a href="https://support.cumulusnetworks.com/hc/en-us/articles/213177027-Installing-the-Cumulus-Linux-Quagga-Package-on-an-Ubuntu-Server">Installing the Cumulus Linux FRRouting Package on an Ubuntu Server</a></li>
<li><a href="Configuring_FRRouting">Configuring FRRouting</a></li>
</ul></td>
</tr>
</tbody>
</table>

### Anycast with Manual Redistribution

![](attachments/8362991/8362997.png){height="150"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>In contrast to routing on the host (preferred), this method allows a user to route <strong>to</strong> the host. The ToRs are the gateway, as with redistribute neighbor, except because there is no daemon running, the networks must be manually configured under the routing process. There is a potential to black hole unless a script is run to remove the routes when the host no longer responds.</p>
<p><strong>Configurations</strong></p>
<div id="expander-1245332030" class="expand-container">
<div id="expander-control-1245332030" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" />Click here to expand...
</div>
<div id="expander-content-1245332030" class="expand-content">
<p><strong>leaf01 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto swp1
iface swp1
  address 172.16.1.1/30</code></pre>
</div>
</div>
<p><code>/etc/frr/frr.conf</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>router ospf
  router-id 10.0.0.11
interface swp1
  ip ospf area 0</code></pre>
</div>
</div>
<p><strong>leaf02 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto swp2
iface swp2
  address 172.16.1.1/30</code></pre>
</div>
</div>
<p><code>/etc/frr/frr.conf</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>router ospf
  router-id 10.0.0.12
interface swp1
  ip ospf area 0</code></pre>
</div>
</div>
<p><strong>Example Host Config (Ubuntu)</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto lo
iface lo inet loopback

auto lo:1
iface lo:1 inet static
  address 172.16.1.2/32
  up ip route add 0.0.0.0/0 nexthop via 172.16.1.1 dev eth0 onlink nexthop via 172.16.1.1 dev eth1 onlink

auto eth1
iface eth2 inet static
  address 172.16.1.2/32

auto eth2
iface eth2 inet static
  address 172.16.1.2/32</code></pre>
</div>
</div>
</div>
</div>
<p> </p>
<p> </p></td>
<td><p><strong><strong>Benefits</strong></strong></p>
<ul>
<li>Most benefits of routing <strong>on</strong> the host </li>
<li>No requirement for host to run routing</li>
<li>No requirement for redistribute neighbor</li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li>Removing a subnet from one ToR and re-adding it to another (hence, network statements from your router process) is a manual process</li>
<li>Network team and server team would have to be in sync, or server team controls the ToR, or automation is being used whenever VM migration happens</li>
<li>When using VMs/containers it is very easy to black hole traffic, as the leafs continue to advertise prefixes even when VM is down</li>
<li>No L2 adjacency between servers without VXLAN</li>
</ul>
<p> </p></td>
</tr>
<tr class="even">
<td><strong>FHR (First Hop Redundancy)</strong></td>
<td><strong>More Information</strong></td>
</tr>
<tr class="odd">
<td><ul>
<li>The gateways would be the ToRs, exactly like redistribute neighbor with an equal cost route installed</li>
</ul></td>
<td> </td>
</tr>
</tbody>
</table>

## Network Virtualization

**LNV with MLAG**

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th> </th>
<th>Summary</th>
<th>More Information</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td> </td>
<td><p>The host runs LACP (Etherchannel/bond) to the pair of ToRs. <a href="Lightweight_Network_Virtualization_Overview">LNV</a> (Lightweight Network Virtualization) then transports the L2 bridges across an L3 fabric.</p>
<p><strong>Configurations</strong></p>
<div id="expander-1408316602" class="expand-container">
<div id="expander-control-1408316602" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" />Click here to expand...
</div>
<div id="expander-content-1408316602" class="expand-content">
<p><strong>leaf01 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto lo
iface lo inet loopback 
  address 10.0.0.11/32
  vxrd-src-ip 10.0.0.11
  vxrd-svcnode-ip 10.10.10.10
  clagd-vxlan-anycast-ip 36.0.0.11

auto vni-10
iface vni-10 
  vxlan-id 10 
  vxlan-local-tunnelip 10.0.0.11

auto br-10 
iface br-10
  bridge-ports swp1 vni-10</code></pre>
</div>
</div>
<p><strong>leaf02 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>auto lo
iface lo inet loopback 
  address 10.0.0.12/32
  Vxrd-src-ip 10.0.0.12
  vxrd-svcnode-ip 10.10.10.10
  clagd-vxlan-anycast-ip 36.0.0.11

auto vni-10
iface vni-10 
  vxlan-id 10 
  vxlan-local-tunnelip 10.0.0.12

auto br-10 
iface br-10
  bridge-ports swp1 vni-10</code></pre>
</div>
</div>
</div>
</div></td>
<td><p><strong><strong>Benefits</strong></strong></p>
<ul>
<li>Layer 2 domain is reduced to the pair of ToRs</li>
<li>Aggregation layer is all L3 (VLANs do not have to exist on spine switches)</li>
<li>Greater route scaling and flexibility</li>
<li>High availability</li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li>Needs MLAG (with the same caveats from the <a href="#DataCenterHosttoToRArchitecture-mlag">MLAG section</a> above) and <a href="Spanning_Tree_and_Rapid_Spanning_Tree">spanning tree</a></li>
</ul>
<p> </p></td>
</tr>
</tbody>
</table>

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><strong>Active-Active Mode</strong></th>
<th><strong>Active-Passive Mode</strong></th>
<th><strong>Demarcation</strong></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><ul>
<li><a href="Virtual_Router_Redundancy_-_VRR">VRR</a></li>
</ul></td>
<td><p>None</p></td>
<td><ul>
<li>ToR layer or exit leafs</li>
</ul></td>
</tr>
<tr class="even">
<td> </td>
<td> </td>
<td><strong>More Information</strong></td>
</tr>
<tr class="odd">
<td> </td>
<td> </td>
<td><ul>
<li><a href="Lightweight_Network_Virtualization_Overview">Cumulus Linux Lightweight Network Virtualization (LNV) documentation</a></li>
</ul></td>
</tr>
</tbody>
</table>

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [image2015-12-17
15:47:2.png](attachments/8362991/8363008.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2015-12-17
16:24:1.png](attachments/8362991/8363007.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[mac-pinning.png](attachments/8362991/8363006.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[redist-neigh.png](attachments/8362991/8363005.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[routingonvm.png](attachments/8362991/8363004.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[mlaglnv.png](attachments/8362991/8363003.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[singlenic.png](attachments/8362991/8363002.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[mlag.png](attachments/8362991/8363001.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[redisneigh.png](attachments/8362991/8363000.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[routehost.png](attachments/8362991/8362999.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[routevm.png](attachments/8362991/8362998.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[anycast.png](attachments/8362991/8362997.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[lnvmlag.png](attachments/8362991/8362996.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2016-04-04 at 4.00.28 PM.png](attachments/8362991/8362995.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[singleattach.png](attachments/8362991/8362994.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[routingvm.png](attachments/8362991/8362993.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[routingonhost.png](attachments/8362991/8362992.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vrouter.png](attachments/8362991/8362990.png) (image/png)  
