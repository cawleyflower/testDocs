---
title: Data Center Host to ToR Architecture
author: Unknown
weight: 245
pageID: 8362457
product: Cumulus Linux
version: '3.6'
aliases:
 - /display/undefined/Data+Center_Host_to_ToR_Architecture
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
This chapter discusses the various architectures and strategies
available from the top of rack (ToR) switches all the way down to the
server hosts.

## Layer 3 Architecture

### Single-attached Hosts

{{\< imgOld 2 \>}}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Summary</p></th>
<th><p>More Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>The server (physical host) has only has one link to one ToR switch.</p>
<p><strong>Configurations</strong></p>
<p><strong>leaf01 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<pre><code>                   
auto swp1
iface swp1
  address 172.16.1.1/30
   
    </code></pre>
<p><code>/etc/frr/frr.conf</code></p>
<pre><code>                   
router ospf
  router-id 10.0.0.11
interface swp1
  ip ospf area 0
   
    </code></pre>
<p><strong>leaf02 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<pre><code>                   
auto swp1
iface swp1
  address 172.16.2.1/30
   
    </code></pre>
<p><code>/etc/frr/frr.conf</code></p>
<pre><code>                   
router ospf
  router-id 10.0.0.12
interface swp1
  ip ospf area 0
   
    </code></pre>
<p><strong>host1 Example Config (Ubuntu)</strong></p>
<pre><code>                   
auto eth1
iface eth1 inet static
  address 172.16.1.2/30
  up ip route add 0.0.0.0/0 nexthop via 172.16.1.1
   
    </code></pre>
<p><strong>host2 Example Config (Ubuntu)</strong></p>
<pre><code>                   
auto eth1
iface eth1 inet static
  address 172.16.2.2/30
  up ip route add 0.0.0.0/0 nexthop via 172.16.2.1
   
    </code></pre></td>
<td><p><strong><strong>Benefits</strong></strong></p>
<ul>
<li><p>Relatively simple network configuration</p></li>
<li><p>No STP</p></li>
<li><p>No MLAG</p></li>
<li><p>No L2 loops</p></li>
<li><p>No crosslink between leafs</p></li>
<li><p>Greater route scaling and flexibility</p></li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li><p>No redundancy for ToR, upgrades would cause downtime</p></li>
<li><p>Many customers do not have software to support application layer redundancy</p></li>
</ul>
<p><strong>Additional Comments</strong></p>
<ul>
<li><p>For additional bandwidth links between host and leaf may be bonded</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>FHR (First Hop Redundancy)</strong></p></td>
<td><p><strong>More Information</strong></p></td>
</tr>
<tr class="odd">
<td><ul>
<li><p>No redundancy, uses single ToR as gateway.</p></li>
</ul></td>
<td><ul>
<li><p><a href="https://cumulusnetworks.com/media/cumulus/pdf/technical/validated-design-guides/Big-Data-Cumulus-Linux-Validated-Design-Guide.pdf" class="external-link">Big Data validated design guide</a> uses single attached ToR</p></li>
</ul></td>
</tr>
</tbody>
</table>

### Redistribute Neighbor

{{\< imgOld 3 \>}}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Summary</p></th>
<th><p>More Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><a href="https://support.cumulusnetworks.com/hc/en-us/articles/204339077" class="external-link">Redistribute neighbor</a> daemon grabs ARP entries dynamically, utilizes redistribute table for FRRouting to grab these dynamic entries and redistribute them into the fabric.</p></td>
<td><p><strong>Benefits</strong></p>
<ul>
<li><p>Configuration in FRRouting is simple (route-map + redist table)</p></li>
<li><p>Supported by Cumulus Networks</p></li>
</ul>
<p><strong>Caveats</strong></p>
<ul>
<li><p>Silent hosts don't receive traffic (depending on ARP).</p></li>
<li><p>IPv4 only.</p></li>
<li><p>If two VMs are on same L2 domain, they could learn about each other directly rather than utilizing gateway, which causes problems (VM migration for example, or getting their network routed). Put hosts on /32 (no other L2 adjacency).</p></li>
<li><p>VM move does not trigger route withdrawal from original leaf (4 hour timeout).</p></li>
<li><p>Clearing ARP impacts routing. May not be obvious.</p></li>
<li><p>No L2 adjacency between servers without VXLAN.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>FHR (First Hop Redundancy)</strong></p></td>
<td><p><strong>More Information</strong></p></td>
</tr>
<tr class="odd">
<td><ul>
<li><p>Equal cost route installed on server/host/hypervisor to both ToRs to load balance evenly.</p></li>
<li><p>For host/VM/container mobility, use the same default route on all hosts (such as x.x.x.1) but don't distribute or advertise the .1 on the ToR into the fabric. This allows the VM to use the same gateway no matter which pair of leafs it is cabled to.</p></li>
</ul></td>
<td><ul>
<li><p><a href="https://cumulusnetworks.com/blog/introducing-rdnbr/" class="external-link">Cumulus Networks blog post introducing redistribute neighbor</a></p></li>
</ul></td>
</tr>
</tbody>
</table>

### Routing on the Host

****

**{{\< imgOld 4 \>}}**

****

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Summary</p></th>
<th><p>More Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Routing on the host means there is a routing application (such as <a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">FRRouting</a>) either on the bare metal host (no VMs/containers) or the hypervisor (for example, Ubuntu with KVM). This is highly recommended by the Cumulus Networks Professional Services team.</p></td>
<td><p><strong>Benefits</strong></p>
<ul>
<li><p>No requirement for MLAG</p></li>
<li><p>No spanning-tree or layer 2 domain</p></li>
<li><p>No loops</p></li>
<li><p>3 or more ToRs can be used instead of usual 2</p></li>
<li><p>Host and VM mobility</p></li>
<li><p>Traffic engineering can be used to migrate traffic from one ToR to another for upgrading both hardware and software</p></li>
</ul>
<p><strong>Caveats</strong></p>
<ul>
<li><p>Certain hypervisors or host OSes might not support a routing application like FRRouting and will require a virtual router on the hypervisor</p></li>
<li><p>No L2 adjacnecy between servers without VXLAN</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>FHR (First Hop Redundancy)</strong></p></td>
<td><p><strong>More Information</strong></p></td>
</tr>
<tr class="odd">
<td><ul>
<li><p>The first hop is still the ToR, just like redistribute neighbor</p></li>
<li><p>A default route can be advertised by all leaf/ToRs for dynamic ECMP paths</p></li>
</ul></td>
<td><ul>
<li><p><a href="https://support.cumulusnetworks.com/hc/en-us/articles/216805858-Routing-on-the-Host-An-Introduction" class="external-link">Routing on the Host: An Introduction</a></p></li>
<li><p><a href="https://support.cumulusnetworks.com/hc/en-us/articles/213177027-Installing-the-Cumulus-Linux-Quagga-Package-on-an-Ubuntu-Server" class="external-link">Installing the Cumulus Linux FRRouting Package on an Ubuntu Server</a></p></li>
<li><p><a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">Configuring FRRouting</a></p></li>
</ul></td>
</tr>
</tbody>
</table>

### Routing on the VM

{{\< imgOld 5 \>}}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Summary</p></th>
<th><p>More Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Instead of routing on the hypervisor, each virtual machine utilizes its own routing stack.</p></td>
<td><p><strong>Benefits</strong></p>
<ul>
<li><p>In addition to routing on host:</p>
<ul>
<li><p>Hypervisor/base OS does not need to be able to do routing</p></li>
<li><p>VMs can be authenticated into routing fabric</p></li>
</ul></li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li><p>All VMs must be capable of routing</p></li>
<li><p>Scale considerations might need to be taken into an account —<br />
instead of one routing process, there are as many as there are VMs</p></li>
<li><p>No L2 adjacency between servers without VXLAN</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>FHR (First Hop Redundancy)</strong></p></td>
<td><p><strong>More Information</strong></p></td>
</tr>
<tr class="odd">
<td><ul>
<li><p>The first hop is still the ToR, just like redistribute neighbor</p></li>
<li><p>Multiple ToRs (2+) can be used</p></li>
</ul></td>
<td><ul>
<li><p><a href="https://support.cumulusnetworks.com/hc/en-us/articles/216805858-Routing-on-the-Host-An-Introduction" class="external-link">Routing on the host: An Introduction</a></p></li>
<li><p><a href="https://support.cumulusnetworks.com/hc/en-us/articles/213177027-Installing-the-Cumulus-Linux-Quagga-Package-on-an-Ubuntu-Server" class="external-link">Installing the Cumulus Linux FRRouting Package on an Ubuntu Server</a></p></li>
<li><p><a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">Configuring FRRouting</a></p></li>
</ul></td>
</tr>
</tbody>
</table>

### Virtual Router

{{\< imgOld 6 \>}}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Summary</p></th>
<th><p>More Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Virtual router (vRouter) runs as a VM on the hypervisor/host, sends routes to the ToR using <a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/" class="unresolved">BGP</a> or <a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">OSPF</a>.</p></td>
<td><p><strong><strong>Benefits</strong></strong></p>
<p>In addition to routing on a host:</p>
<ul>
<li><p>Multi-tenancy can work (multiple customers sharing same racks)</p></li>
<li><p>Base OS does not need to be routing capable</p></li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li><p><a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">ECMP</a> might not work correctly (load balancing to multiple ToRs); Linux kernel in older versions is not capable of ECMP per flow (does it per packet)</p></li>
<li><p>No L2 adjacency between servers without VXLAN</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>FHR (First Hop Redundancy)</strong></p></td>
<td><p><strong>More Information</strong></p></td>
</tr>
<tr class="odd">
<td><ul>
<li><p>The gateway would be the vRouter, which has two routes out (two ToRs)</p></li>
<li><p>Multiple vRouters could be used</p></li>
</ul></td>
<td><ul>
<li><p><a href="https://support.cumulusnetworks.com/hc/en-us/articles/216805858-Routing-on-the-Host-An-Introduction" class="external-link">Routing on the Host: An Introduction</a></p></li>
<li><p><a href="https://support.cumulusnetworks.com/hc/en-us/articles/213177027-Installing-the-Cumulus-Linux-Quagga-Package-on-an-Ubuntu-Server" class="external-link">Installing the Cumulus Linux FRRouting Package on an Ubuntu Server</a></p></li>
<li><p><a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">Configuring FRRouting</a></p></li>
</ul></td>
</tr>
</tbody>
</table>

### Anycast with Manual Redistribution

{{\< imgOld 7 \>}}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Summary</p></th>
<th><p>More Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>In contrast to routing on the host (preferred), this method allows a user to route <strong>to</strong> the host. The ToRs are the gateway, as with redistribute neighbor, except because there is no daemon running, the networks must be manually configured under the routing process. There is a potential to black hole unless a script is run to remove the routes when the host no longer responds.</p>
<p><strong>Configurations</strong></p>
<p><strong>leaf01 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<pre><code>                   
auto swp1
iface swp1
  address 172.16.1.1/30
   
    </code></pre>
<p><code>/etc/frr/frr.conf</code></p>
<pre><code>                   
router ospf
  router-id 10.0.0.11
interface swp1
  ip ospf area 0
   
    </code></pre>
<p><strong>leaf02 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<pre><code>                   
auto swp2
iface swp2
  address 172.16.1.1/30
   
    </code></pre>
<p><code>/etc/frr/frr.conf</code></p>
<pre><code>                   
router ospf
  router-id 10.0.0.12
interface swp1
  ip ospf area 0
   
    </code></pre>
<p><strong>Example Host Config (Ubuntu)</strong></p>
<pre><code>                   
auto lo
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
  address 172.16.1.2/32
   
    </code></pre></td>
<td><p><strong><strong>Benefits</strong></strong></p>
<ul>
<li><p>Most benefits of routing <strong>on</strong> the host</p></li>
<li><p>No requirement for host to run routing</p></li>
<li><p>No requirement for redistribute neighbor</p></li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li><p>Removing a subnet from one ToR and re-adding it to another (hence, network statements from your router process) is a manual process</p></li>
<li><p>Network team and server team would have to be in sync, or server team controls the ToR, or automation is being used whenever VM migration happens</p></li>
<li><p>When using VMs/containers it is very easy to black hole traffic, as the leafs continue to advertise prefixes even when VM is down</p></li>
<li><p>No L2 adjacency between servers without VXLAN</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p><strong>FHR (First Hop Redundancy)</strong></p></td>
<td><p><strong>More Information</strong></p></td>
</tr>
<tr class="odd">
<td><ul>
<li><p>The gateways would be the ToRs, exactly like redistribute neighbor with an equal cost route installed</p></li>
</ul></td>
<td><p> </p></td>
</tr>
</tbody>
</table>

## Network Virtualization

### LNV with MLAG

{{\< imgOld 8 \>}}

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th><p> </p></th>
<th><p>Summary</p></th>
<th><p>More Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p> </p></td>
<td><p>The host runs LACP (Etherchannel/bond) to the pair of ToRs. <a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">LNV</a> (Lightweight Network Virtualization) then transports the L2 bridges across an L3 fabric.</p>
<p><strong>Configurations</strong></p>
<p><strong>leaf01 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<pre><code>                   
auto lo
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
  bridge-ports swp1 vni-10
   
    </code></pre>
<p><strong>leaf02 Config</strong></p>
<p><code>/etc/network/interfaces</code></p>
<pre><code>                   
auto lo
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
  bridge-ports swp1 vni-10
   
    </code></pre></td>
<td><p><strong><strong>Benefits</strong></strong></p>
<ul>
<li><p>Layer 2 domain is reduced to the pair of ToRs</p></li>
<li><p>Aggregation layer is all L3 (VLANs do not have to exist on spine switches)</p></li>
<li><p>Greater route scaling and flexibility</p></li>
<li><p>High availability</p></li>
</ul>
<p><strong><strong>Caveats</strong></strong></p>
<ul>
<li><p>Needs MLAG (with the same caveats from the <a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">MLAG section</a> above) and <a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">spanning tree</a></p></li>
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
<th><p><strong>Active-Active Mode</strong></p></th>
<th><p><strong>Active-Passive Mode</strong></p></th>
<th><p><strong>Demarcation</strong></p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><ul>
<li><p><a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">VRR</a></p></li>
</ul></td>
<td><p>None</p></td>
<td><ul>
<li><p>ToR layer or exit leafs</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p> </p></td>
<td><p> </p></td>
<td><p><strong>More Information</strong></p></td>
</tr>
<tr class="odd">
<td><p> </p></td>
<td><p> </p></td>
<td><ul>
<li><p><a href="/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Network_Solutions/Data_Center_Host_to_ToR_Architecture/">Cumulus Linux Lightweight Network Virtualization (LNV) documentation</a></p></li>
</ul></td>
</tr>
</tbody>
</table>
