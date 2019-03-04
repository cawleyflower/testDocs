# Cumulus Networks Services Demos

The Cumulus Networks Services team demos provide a virtual environment
built using either VirtualBox or `libvirt` using Vagrant to manage the
VMs. This environment utilizes the reference topology shown
below. Vagrant and Cumulus VX can be used together to build virtual
simulations of production networks to validate configurations, develop
automation code and simulate failure scenarios.

# Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [Reference
    Topology](#CumulusNetworksServicesDemos-ReferenceTopology)
    -   [IP and MAC
        Addressing](#CumulusNetworksServicesDemos-IPandMACAddressing)
    -   [Build the
        Topology](#CumulusNetworksServicesDemos-BuildtheTopology)
        -   [Virtual
            Appliance](#CumulusNetworksServicesDemos-VirtualAppliance)
        -   [Hardware](#CumulusNetworksServicesDemos-Hardware)
    -   [Demos](#CumulusNetworksServicesDemos-Demos)

# Reference Topology

The Cumulus Networks *reference topology* includes cabling (in DOT
format for dual use with [PTM](Prescriptive_Topology_Manager_-_PTM)),
MAC addressing, IP addressing, switches and servers. This topology is
blessed by the Professional Services Team at Cumulus Networks to fit a
majority of designs seen in the field. 

![](attachments/8362987/8362986.png){height="250"}

## IP and MAC Addressing

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Hostname</p></th>
<th>eth0 IP</th>
<th>eth0 MAC</th>
<th>Interface Count</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>oob-mgmt-server</p></td>
<td>192.168.0.254</td>
<td>any</td>
<td> </td>
</tr>
<tr class="even">
<td>oob-mgmt-switch</td>
<td>192.168.0.1</td>
<td>any</td>
<td><a href="https://cumulusnetworks.com/cumulus-rmp/overview/">Cumulus RMP</a></td>
</tr>
<tr class="odd">
<td>leaf01</td>
<td>192.168.0.11</td>
<td>A0:00:00:00:00:11</td>
<td>48x10g w/ 6x40g uplink</td>
</tr>
<tr class="even">
<td>leaf02</td>
<td>192.168.0.12</td>
<td>A0:00:00:00:00:12</td>
<td>48x10g w/ 6x40g uplink</td>
</tr>
<tr class="odd">
<td>leaf03</td>
<td>192.168.0.13</td>
<td>A0:00:00:00:00:13</td>
<td>48x10g w/ 6x40g uplink</td>
</tr>
<tr class="even">
<td>leaf04</td>
<td>192.168.0.14</td>
<td>A0:00:00:00:00:14</td>
<td>48x10g w/ 6x40g uplink</td>
</tr>
<tr class="odd">
<td>spine01</td>
<td>192.168.0.21</td>
<td>A0:00:00:00:00:21</td>
<td>32x40g</td>
</tr>
<tr class="even">
<td>spine02</td>
<td>192.168.0.22</td>
<td>A0:00:00:00:00:22</td>
<td>32x40g</td>
</tr>
<tr class="odd">
<td>server01</td>
<td>192.168.0.31</td>
<td>A0:00:00:00:00:31</td>
<td>10g NICs</td>
</tr>
<tr class="even">
<td>server02</td>
<td>192.168.0.32</td>
<td>A0:00:00:00:00:32</td>
<td>10g NICs</td>
</tr>
<tr class="odd">
<td>server03</td>
<td>192.168.0.33</td>
<td>A0:00:00:00:00:33</td>
<td>10g NICs</td>
</tr>
<tr class="even">
<td>server04</td>
<td>192.168.0.34</td>
<td>A0:00:00:00:00:34</td>
<td>10g NICs</td>
</tr>
<tr class="odd">
<td>exit01</td>
<td>192.168.0.41</td>
<td>A0:00:00:00:00:41</td>
<td>48x10g w/ 6x40g uplink (exit leaf)</td>
</tr>
<tr class="even">
<td>exit02</td>
<td>192.168.0.42</td>
<td>A0:00:00:00:00:42</td>
<td>48x10g w/ 6x40g uplink (exit leaf)</td>
</tr>
<tr class="odd">
<td>edge01</td>
<td>192.168.0.51</td>
<td>A0:00:00:00:00:51</td>
<td>10g NICs (customer edge device, firewall, load balancer, etc.)</td>
</tr>
<tr class="even">
<td>internet</td>
<td>192.168.0.253</td>
<td>any</td>
<td>(represents internet provider edge device)</td>
</tr>
</tbody>
</table>

## Build the Topology

### Virtual Appliance

You can build out the reference topology in hardware or using Cumulus VX
(the free Cumulus Networks virtual appliance). The [Cumulus Reference
Topology using
Vagrant](https://github.com/CumulusNetworks/cldemo-vagrant) is
essentially the reference topology built out inside Vagrant with
VirtualBox or KVM. The installation and setup instructions for bringing
up the entire reference topology on a laptop or server are on the
[cldemo-vagrant GitHub
repo](https://github.com/CumulusNetworks/cldemo-vagrant).

### Hardware

Any switch from the [hardware compatibility
list](https://cumulusnetworks.com/support/linux-hardware-compatibility-list/)
is compatible with the topology as long as you follow the interface
count from the table above. Of course, in your own production
environment, you don't have to use exactly the same devices and cabling
as outlined above. 

## Demos

You can find an up to date list of all the demos in the [cldemo-vagrant
GitHub
repository](https://github.com/CumulusNetworks/cldemo-vagrant#available-demos),
which is available to anyone free of charge.

 

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[reference\_topology.png](attachments/8362987/8362986.png) (image/png)  
