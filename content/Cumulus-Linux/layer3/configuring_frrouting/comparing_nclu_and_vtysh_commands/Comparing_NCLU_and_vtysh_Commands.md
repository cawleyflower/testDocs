# Comparing NCLU and vtysh Commands

Using [NCLU](Network_Command_Line_Utility_-_NCLU) is the primary way to
[configure routing](Configuring_FRRouting) in Cumulus Linux. However, an
alternative exists in the the `vtysh` modal CLI. The available commands
are as follows:

The following table compares the various FRRouting commands with their
Cumulus Linux NCLU counterparts.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Action</th>
<th>NCLU Commands</th>
<th>FRRouting Commands</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Display the routing table</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net show route</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch# show ip route</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td>Create a new neighbor</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net add bgp autonomous-system 65002
cumulus@switch:~$ net add bgp neighbor 14.0.0.22</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# router bgp 65002
switch(config-router)# neighbor 14.0.0.22</code></pre>
</div>
</div></td>
</tr>
<tr class="odd">
<td><p>Redistribute routing information from static route entries into RIP tables</p></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net add bgp redistribute static</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# router bgp 65002
switch(config-router)# redistribute static</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td>Define a <a href="Routing">static route</a>
<p> </p>
<p> </p></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net add routing route 155.1.2.20/24 bridge 45
 </code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# ip route 155.1.2.20/24 bridge 45</code></pre>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Configure an IPv6 address </td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net add interface swp3 ipv6 address 3002:2123:1234:1abc::21/64</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# int swp3
switch(config-if)# ipv6 address 3002:2123:1234:1abc::21/64</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td>Enable topology checking (<a href="Prescriptive_Topology_Manager_-_PTM">PTM</a>)</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net add routing ptm-enable</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# ptm-enable</code></pre>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Configure <a href="Switch-Port-Attributes_8363026.html#SwitchPortAttributes-mtu">MTU</a> in IPv6 network discovery for an interface</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ sudo cl-ra interface swp3 set mtu 9000</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# int swp3
switch(config-if)# ipv6 nd mtu 9000</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td>Set the OSPF interface priority </td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net add interface swp3 ospf6 priority 120</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# int swp3
switch(config-if)# ip ospf6 priority  120</code></pre>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Configure timing for OSPF SPF calculations </td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net add ospf6 timers throttle spf 40 50 60</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# router ospf6
switch(config-ospf6)# timer throttle spf 40 50 60</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td>Configure the OSPF Hello packet interval in number of seconds for an interface</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net add interface swp4 ospf6 hello-interval 60</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch(config)# int swp4
switch(config-if)# ipv6 ospf6 hello-interval  60 </code></pre>
</div>
</div></td>
</tr>
<tr class="odd">
<td>Display <a href="Border_Gateway_Protocol_-_BGP">BGP</a> information</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net show bgp summary</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch# show ip bgp summary</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td>Display OSPF debugging status</td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ net show debugs</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>switch# show debugging ospf</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

 

 

 
