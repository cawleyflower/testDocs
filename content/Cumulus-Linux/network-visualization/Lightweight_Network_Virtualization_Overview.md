# Lightweight Network Virtualization Overview

Lightweight Network Virtualization (LNV) is a technique for
deploying [VXLANs](Network_Virtualization) without a central controller
on bare metal switches. This solution requires no external controller or
software suite; it runs the VXLAN service and registration daemons on
Cumulus Linux itself. The data path between bridge entities is
established on top of a layer 3 fabric by means of a simple service node
coupled with traditional MAC address learning.

To see an example of a full solution before reading the following
background information, [read this chapter](LNV_Full_Example).

LNV is a lightweight controller option. [Contact Cumulus
Networks](https://support.cumulusnetworks.com/hc/en-us/requests/new)
with your scale requirements so we can make sure this is the right fit
for you. There are also other controller options that can work on
Cumulus Linux.

You cannot use LNV and EVPN at the same time.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [LNV
    Concepts](#LightweightNetworkVirtualizationOverview-LNVConcepts)
    -   [Acquire the Forwarding Database at the Service
        Node](#LightweightNetworkVirtualizationOverview-AcquiretheForwardingDatabaseattheServiceNode)
    -   [MAC Learning and
        Flooding](#LightweightNetworkVirtualizationOverview-MACLearningandFlooding)
    -   [BUM
        Traffic](#LightweightNetworkVirtualizationOverview-BUMTraffic)
-   [Requirements](#LightweightNetworkVirtualizationOverview-Requirements)
    -   [Hardware
        Requirements](#LightweightNetworkVirtualizationOverview-HardwareRequirements)
    -   [Configuration
        Requirements](#LightweightNetworkVirtualizationOverview-ConfigurationRequirements)
    -   [Install the LNV
        Packages](#LightweightNetworkVirtualizationOverview-InstalltheLNVPackages)
-   [Sample LNV
    Configuration](#LightweightNetworkVirtualizationOverview-SampleLNVConfiguration)
    -   [Network Connectivity](#LightweightNetworkVirtualizationOverview-NetworkConnectivity)
    -   [Layer 3 IP
        Addressing](#LightweightNetworkVirtualizationOverview-Layer3IPAddressing)
    -   [Layer 3
        Fabric](#LightweightNetworkVirtualizationOverview-Layer3Fabric)
    -   [Host
        Configuration](#LightweightNetworkVirtualizationOverview-HostConfiguration)
-   [Configure the VLAN to VXLAN
    Mapping](#LightweightNetworkVirtualizationOverview-mappingConfiguretheVLANtoVXLANMapping)
-   [Verify the VLAN to VXLAN
    Mapping](#LightweightNetworkVirtualizationOverview-VerifytheVLANtoVXLANMapping)
-   [Enable and Manage Service Node and Registration
    Daemons](#LightweightNetworkVirtualizationOverview-EnableandManageServiceNodeandRegistrationDaemons)
    -   [Enable the Service Node
        Daemon](#LightweightNetworkVirtualizationOverview-EnabletheServiceNodeDaemon)
    -   [Enable the Registration
        Daemon](#LightweightNetworkVirtualizationOverview-EnabletheRegistrationDaemon)
    -   [Check the Daemon
        Status](#LightweightNetworkVirtualizationOverview-ChecktheDaemonStatus)
-   [Configure the Registration
    Node](#LightweightNetworkVirtualizationOverview-regnodeConfiguretheRegistrationNode)
-   [Configure the Service
    Node](#LightweightNetworkVirtualizationOverview-ConfiguretheServiceNode)
-   [Verifiy and
    Troubleshoot](#LightweightNetworkVirtualizationOverview-VerifiyandTroubleshoot)
    -   [Verify the Registration Node
        Daemon ](#LightweightNetworkVirtualizationOverview-VerifytheRegistrationNodeDaemon)
    -   [Verify the Service Node
        Daemon](#LightweightNetworkVirtualizationOverview-VerifytheServiceNodeDaemon)
    -   [Verify Traffic Flow and Check
        Counters](#LightweightNetworkVirtualizationOverview-VerifyTrafficFlowandCheckCounters)
    -   [Ping to Test
        Connectivity](#LightweightNetworkVirtualizationOverview-PingtoTestConnectivity)
    -   [Troubleshoot with MAC
        Addresses](#LightweightNetworkVirtualizationOverview-TroubleshootwithMACAddresses)
    -   [Check the Service Node
        Configuration](#LightweightNetworkVirtualizationOverview-ChecktheServiceNodeConfiguration)
-   [Advanced LNV
    Usage](#LightweightNetworkVirtualizationOverview-loadbalancingAdvancedLNVUsage)
    -   [Scale LNV by Load Balancing with
        Anycast](#LightweightNetworkVirtualizationOverview-ScaleLNVbyLoadBalancingwithAnycast)
    -   [Restart Network Removes vxsnd Anycast IP Address from Loopback
        Interface](#LightweightNetworkVirtualizationOverview-RestartNetworkRemovesvxsndAnycastIPAddressfromLoopbackInterface)
-   [Related
    Information](#LightweightNetworkVirtualizationOverview-RelatedInformation)

## LNV Concepts

Consider the following example deployment:

![](attachments/8362706/8362708.png){width="300"} 

The two switches running Cumulus Linux, called leaf1 and leaf2, each
have a bridge configured. These two bridges contain the physical switch
port interfaces connecting to the servers as well as the logical VXLAN
interface associated with the bridge. By creating a logical VXLAN
interface on both leaf switches, the switches become *VTEPs* (virtual
tunnel end points). The IP address associated with this VTEP is most
commonly configured as its loopback address; in the image above, the
loopback address is 10.2.1.1 for leaf1 and 10.2.1.2 for leaf2.

### Acquire the Forwarding Database at the Service Node

To connect these two VXLANs together and forward BUM (Broadcast,
Unknown-unicast, Multicast) packets to members of a VXLAN, the service
node needs to acquire the addresses of all the VTEPs for every VXLAN it
serves. The service node daemon does this through a registration daemon
running on each leaf switch that contains a VTEP participating in LNV.
The registration process informs the service node of all the VXLANs to
which the switch belongs.

### MAC Learning and Flooding

With LNV, as with traditional bridging of physical LANs or VLANs, a
bridge automatically learns the location of hosts as a side effect of
receiving packets on a port. 

For example, when server1 sends a layer 2 packet to server3, leaf2
learns that the MAC address for server1 is located on that particular
VXLAN and the VXLAN interface learns that the IP address of the VTEP for
server1 is 10.2.1.1. So when server3 sends a packet to server1, the
bridge on leaf2 forwards the packet out of the port to the VXLAN
interface and the VXLAN interface sends it, encapsulated in a UDP
packet, to the address 10.2.1.1.

But what if server3 sends a packet to some address that has yet to send
it a packet (server2, for example)? In this case, the VXLAN interface
sends the packet to the service node, which sends a copy to every other
VTEP that belongs to the same VXLAN. This is called *service node
replication* and is one of two techniques for handling BUM (Broadcast
Unknown-unicast and Multicast) traffic.

### BUM Traffic

Cumulus Linux has two ways of handling BUM (Broadcast Unknown-unicast
and Multicast) traffic: 

-   Head end replication
-   Service node replication

Head end replication is enabled by default in Cumulus Linux. 

You cannot have both service node and head end replication configured
simultaneously, as this causes the BUM traffic to be duplicated; both
the source VTEP and the service node send their own copy of each packet
to every remote VTEP.

#### Head End Replication

The Broadcom switch with the Tomahawk, Trident II+, and Trident II ASIC
and the Mellanox switch with the Spectrum ASIC are capable of head end
replication (HER), which is the ability to generate all the BUM traffic
in hardware. The most scalable solution available with LNV is to have
each VTEP (top of rack switch) generate all of its own BUM traffic
instead of relying on an external service node. HER is enabled by
default in Cumulus Linux.

Cumulus Linux verified support for up to 128 VTEPs with head end
replication.

To disable head end replication, edit the `/etc/vxrd.conf` file and
set `head_rep` to *False*.

#### Service Node Replication

Cumulus Linux also supports service node replication for VXLAN BUM
packets. This is useful with LNV if you have more than 128 VTEPs.
However, it is not recommended because it forces the spine switches
running the `vxsnd` (service node daemon) to replicate the packets in
software instead of in hardware, unlike head end replication. If you are
not using a controller but have more than 128 VTEPs, contact [Cumulus
Networks](mailto:support@cumulusnetworks.com). 

To enable service node replication:

1.  Disable head end replication; set `head_rep` to *False* in
    the `/etc/vxrd.conf` file.
2.  Configure a service node IP address for every VXLAN interface using
    the `vxlan-svcnodeip` parameter:

    ``` text
    cumulus@switch:~$ net add vxlan VXLAN vxlan svcnodeip IP_ADDRESS
    ```

    You only specify this parameter when head end replication is
    disabled. For the loopback, the parameter is still named
    `vxrd-svcnode-ip`.

3.  Edit the `/etc/vxsnd.conf` file and configure the following:  
    -   Set the same service node IP address that you configured in the
        previous step:

        ``` plain
        svcnode_ip = <>
        ```

    -   To forward VXLAN data traffic, set the following variable to
        *True*:

        ``` plain
        enable_vxlan_listen = true
        ```

## Requirements

### Hardware Requirements

-   Broadcom switches with the Tomahawk, Trident II+, or Trident II ASIC
    or Mellanox switches with the Spectrum ASIC running Cumulus Linux
    2.5.4 or later. Please refer to the Cumulus Networks [hardware
    compatibility
    list](http://cumulusnetworks.com/support/linux-hardware-compatibility-list/)
    for a list of supported switch models.

### Configuration Requirements

-   The VXLAN has an associated **V**XLAN **N**etwork **I**dentifier
    (VNI), also interchangeably called a VXLAN ID.
-   The VNI cannot be 0 or 16777215, as these two numbers are reserved
    values under Cumulus Linux.
-   The VXLAN link and physical interfaces are added to the bridge to
    create the association between the port, VLAN, and VXLAN instance.
-   Each bridge on the switch has only one VXLAN interface. Cumulus
    Linux does not support more than one VXLAN link in a bridge;
    however, a switch can have multiple bridges.
-   An SVI (Switch VLAN Interface) or layer 3 address on the bridge is
    not supported. For example, you cannot ping from the leaf1 SVI to
    the leaf2 SVI through the VXLAN tunnel; you need to use server1 and
    server2 to verify.

### Install the LNV Packages

`vxfld` is installed by default on all new installations of Cumulus
Linux 3.x. If you are upgrading from an earlier version, run
`sudo -E apt-get install python-vxfld` to install the LNV package.

## Sample LNV Configuration

The following images illustrate the configuration that is referenced
throughout this chapter.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>Physical Cabling Diagram</p>
<p><img src="attachments/8362706/8362711.png" class="image-center" width="300" /></p></td>
<td><p>Network Virtualization Diagram</p>
<p><img src="attachments/8362706/8362710.png" height="250" /></p></td>
</tr>
</tbody>
</table>

Want to try out configuring LNV and do not have a Cumulus Linux switch?
Check out [Cumulus VX](https://cumulusnetworks.com/cumulus-vx/).

### Network Connectivity

There must be full network connectivity before you can configure LNV.
The layer 3 IP addressing information as well as the OSPF configuration
(`/etc/frr/frr.conf`) below is provided to make the LNV example easier
to understand.

OSPF is not a requirement for LNV, LNV just requires layer 3
connectivity. With Cumulus Linux this can be achieved with static
routes, OSPF or BGP.

### Layer 3 IP Addressing

Here is the configuration for the IP addressing information used in this
example.

![](images/icons/grey_arrow_down.png){.expand-control-image}Click here
to expand...

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>spine1:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine1:~$ net add interface swp49 ip address 10.1.1.2/30
cumulus@spine1:~$ net add interface swp50 ip address 10.1.1.6/30
cumulus@spine1:~$ net add interface swp51 ip address 10.1.1.50/30
cumulus@spine1:~$ net add interface swp52 ip address 10.1.1.54/30
cumulus@spine1:~$ net add loopback lo ip address 10.2.1.3/32
cumulus@spine1:~$ net pending
cumulus@spine1:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine1:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
  address 10.2.1.3/32
 
auto eth0
iface eth0 inet dhcp

auto swp49
iface swp49
  address 10.1.1.2/30
 
auto swp50
iface swp50
  address 10.1.1.6/30
 
auto swp51
iface swp51
  address 10.1.1.50/30
 
auto swp52
iface swp52
  address 10.1.1.54/30</code></pre>
</div>
</div></td>
<td><p><strong>spine2:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine2:~$ net add interface swp49 ip address 10.1.1.18/30
cumulus@spine2:~$ net add interface swp50 ip address 10.1.1.22/30
cumulus@spine2:~$ net add interface swp51 ip address 10.1.1.34/30
cumulus@spine2:~$ net add interface swp52 ip address 10.1.1.38/30
cumulus@spine2:~$ net add loopback lo ip address 10.2.1.4/32
cumulus@spine2:~$ net pending
cumulus@spine2:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine2:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
  address 10.2.1.4/32
 
auto eth0
iface eth0 inet dhcp

auto swp49
iface swp49 
 address 10.1.1.18/30
 
auto swp50
iface swp50 
 address 10.1.1.22/30
 
auto swp51
iface swp51 
address 10.1.1.34/30
 
auto swp52
iface swp52 
address 10.1.1.38/30</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td><p><strong>leaf1:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ net add interface swp1 breakout 4x 
cumulus@leaf1:~$ net add interface swp1s0 ip address 10.1.1.1/30
cumulus@leaf1:~$ net add interface swp1s1 ip address 10.1.1.5/30
cumulus@leaf1:~$ net add interface swp1s2 ip address 10.1.1.33/30
cumulus@leaf1:~$ net add interface swp1s3 ip address 10.1.1.37/30
cumulus@leaf1:~$ net add loopback lo ip address 10.2.1.1/32
cumulus@leaf1:~$ net pending
cumulus@leaf1:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
  address 10.2.1.1/32
 
auto eth0
iface eth0 inet dhcp
 
auto swp1s0
iface swp1s0
  address 10.1.1.1/30

auto swp1s1
iface swp1s1
  address 10.1.1.5/30

auto swp1s2
iface swp1s2
  address 10.1.1.33/30

auto swp1s3
iface swp1s3
  address 10.1.1.37/30</code></pre>
</div>
</div></td>
<td><p><strong>leaf2:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf2:~$ net add interface swp1 breakout 4x 
cumulus@leaf2:~$ net add interface swp1s0 ip address 10.1.1.17/30
cumulus@leaf2:~$ net add interface swp1s1 ip address 10.1.1.21/30
cumulus@leaf2:~$ net add interface swp1s2 ip address 10.1.1.49/30
cumulus@leaf2:~$ net add interface swp1s3 ip address 10.1.1.53/30
cumulus@leaf2:~$ net add loopback lo ip address 10.2.1.2/32
cumulus@leaf2:~$ net pending
cumulus@leaf2:~$ net commit </code></pre>
</div>
</div>
<p>These commands create the following configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf2:~$ cat /etc/network/interfaces
auto lo
iface lo inet loopback
  address 10.2.1.2/32
 
auto eth0
iface eth0 inet dhcp
 
auto swp1s0
iface swp1s0
 address 10.1.1.17/30
              
auto swp1s1
iface swp1s1
 address 10.1.1.21/30
              
auto swp1s2
iface swp1s2
 address 10.1.1.49/30
              
auto swp1s3
iface swp1s3
 address 10.1.1.53/30</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

### Layer 3 Fabric

The service nodes and registration nodes must all be routable between
each other. The layer 3 fabric on Cumulus Linux can either be
[BGP](Border_Gateway_Protocol_-_BGP) or
[OSPF](Open_Shortest_Path_First_-_OSPF).  In this example, OSPF is used
to demonstrate full reachability. Click to expand the FRRouting
configurations below.

![](images/icons/grey_arrow_down.png){.expand-control-image}Click to
expand the OSPF configuration ...

FRRouting configuration using OSPF:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>spine1:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine1:~$ net add ospf network 10.2.1.3/32 area 0.0.0.0
cumulus@spine1:~$ net add interface swp49 ospf network point-to-point
cumulus@spine1:~$ net add interface swp50 ospf network point-to-point
cumulus@spine1:~$ net add interface swp51 ospf network point-to-point
cumulus@spine1:~$ net add interface swp52 ospf network point-to-point
cumulus@spine1:~$ net add interface swp49 ospf area 0.0.0.0
cumulus@spine1:~$ net add interface swp50 ospf area 0.0.0.0
cumulus@spine1:~$ net add interface swp51 ospf area 0.0.0.0
cumulus@spine1:~$ net add interface swp52 ospf area 0.0.0.0
cumulus@spine1:~$ net add ospf router-id 10.2.1.3
cumulus@spine1:~$ net pending
cumulus@spine1:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>interface swp49
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp50
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp51
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp52
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
router ospf
 ospf router-id 10.2.1.3
 network 10.2.1.3/32 area 0.0.0.0</code></pre>
</div>
</div></td>
<td><p><strong>spine2:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine2:~$ net add ospf network 10.2.1.4/32 area 0.0.0.0
cumulus@spine2:~$ net add interface swp49 ospf network point-to-point
cumulus@spine2:~$ net add interface swp50 ospf network point-to-point
cumulus@spine2:~$ net add interface swp51 ospf network point-to-point
cumulus@spine2:~$ net add interface swp52 ospf network point-to-point
cumulus@spine2:~$ net add interface swp49 ospf area 0.0.0.0
cumulus@spine2:~$ net add interface swp50 ospf area 0.0.0.0
cumulus@spine2:~$ net add interface swp51 ospf area 0.0.0.0
cumulus@spine2:~$ net add interface swp52 ospf area 0.0.0.0
cumulus@spine2:~$ net add ospf router-id 10.2.1.4
cumulus@spine2:~$ net pending
cumulus@spine2:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>interface swp49
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp50
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp51
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp52
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
router ospf
 ospf router-id 10.2.1.4
 network 10.2.1.4/32 area 0.0.0.0</code></pre>
</div>
</div></td>
</tr>
<tr class="even">
<td><p><strong>leaf1:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ net add ospf network 10.2.1.1/32 area 0.0.0.0
cumulus@leaf1:~$ net add interface swp1s0 ospf network point-to-point
cumulus@leaf1:~$ net add interface swp1s1 ospf network point-to-point
cumulus@leaf1:~$ net add interface swp1s2 ospf network point-to-point
cumulus@leaf1:~$ net add interface swp1s3 ospf network point-to-point
cumulus@leaf1:~$ net add interface swp1s0 ospf area 0.0.0.0
cumulus@leaf1:~$ net add interface swp1s1 ospf area 0.0.0.0
cumulus@leaf1:~$ net add interface swp1s2 ospf area 0.0.0.0
cumulus@leaf1:~$ net add interface swp1s3 ospf area 0.0.0.0
cumulus@leaf1:~$ net add ospf router-id 10.2.1.1
cumulus@leaf1:~$ net pending
cumulus@leaf1:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>interface swp1s0
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp1s1
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp1s2
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp1s3
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
router ospf
 ospf router-id 10.2.1.1

 network 10.2.1.1/32 area 0.0.0.0</code></pre>
</div>
</div></td>
<td><p><strong>leaf2:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf2:~$ net add ospf network 10.2.1.2/32 area 0.0.0.0
cumulus@leaf2:~$ net add interface swp1s0 ospf network point-to-point
cumulus@leaf2:~$ net add interface swp1s1 ospf network point-to-point
cumulus@leaf2:~$ net add interface swp1s2 ospf network point-to-point
cumulus@leaf2:~$ net add interface swp1s3 ospf network point-to-point
cumulus@leaf2:~$ net add interface swp1s0 ospf area 0.0.0.0
cumulus@leaf2:~$ net add interface swp1s1 ospf area 0.0.0.0
cumulus@leaf2:~$ net add interface swp1s2 ospf area 0.0.0.0
cumulus@leaf2:~$ net add interface swp1s3 ospf area 0.0.0.0
cumulus@leaf2:~$ net add ospf router-id 10.2.1.2
cumulus@leaf2:~$ net pending
cumulus@leaf2:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>interface swp1s0
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp1s1
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp1s2
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
interface swp1s3
 ip ospf network point-to-point
 ip ospf area 0.0.0.0
!
router ospf
 ospf router-id 10.2.1.2

 network 10.2.1.2/32 area 0.0.0.0</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

### Host Configuration

In this example, the servers are running Ubuntu 14.04. There needs to be
a trunk mapped from server1 and server2 to the respective switch. In
Ubuntu this is done with subinterfaces. You can expand the
configurations below.

![](images/icons/grey_arrow_down.png){.expand-control-image}Click to
expand the host configurations ...

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>server1:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto eth3.10
iface eth3.10 inet static
  address 10.10.10.1/24

auto eth3.20
iface eth3.20 inet static
  address 10.10.20.1/24

auto eth3.30
iface eth3.30 inet static
  address 10.10.30.1/24</code></pre>
</div>
</div></td>
<td><p><strong>server2:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto eth3.10
iface eth3.10 inet static
  address 10.10.10.2/24

auto eth3.20
iface eth3.20 inet static
  address 10.10.20.2/24

auto eth3.30
iface eth3.30 inet static
  address 10.10.30.2/24</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

On Ubuntu, it is more reliable to use `ifup` and `if down` to bring the
interfaces up and down individually, rather than restarting networking
entirely (there is no equivalent to `if reload` like there is in Cumulus
Linux):

``` text
cumulus@server1:~$ sudo ifup eth3.10
Set name-type for VLAN subsystem. Should be visible in /proc/net/vlan/config
Added VLAN with VID == 10 to IF -:eth3:-
cumulus@server1:~$ sudo ifup eth3.20
Set name-type for VLAN subsystem. Should be visible in /proc/net/vlan/config
Added VLAN with VID == 20 to IF -:eth3:-
cumulus@server1:~$ sudo ifup eth3.30
Set name-type for VLAN subsystem. Should be visible in /proc/net/vlan/config
Added VLAN with VID == 30 to IF -:eth3:-
```

## Configure the VLAN to VXLAN Mapping

Configure the VLANs and associated VXLANs. In this example, there are 3
VLANs and 3 VXLAN IDs (VNIs). VLANs 10, 20 and 30 are used and
associated with VNIs 10, 2000 and 30 respectively. The loopback address,
used as the `vxlan-local-tunnelip`, is the only difference between leaf1
and leaf2 for this demonstration.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>leaf1:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ net add loopback lo ip address 10.2.1.1/32
cumulus@leaf1:~$ net add loopback lo vxrd-src-ip 10.2.1.1
cumulus@leaf1:~$ net add loopback lo vxrd-svcnode-ip 10.2.1.3
cumulus@leaf1:~$ net add vxlan vni-10 vxlan id 10
cumulus@leaf1:~$ net add vxlan vni-10 vxlan local-tunnelip 10.2.1.1
cumulus@leaf1:~$ net add vxlan vni-10 bridge access 10
cumulus@leaf1:~$ net add vxlan vni-2000 vxlan id 2000
cumulus@leaf1:~$ net add vxlan vni-2000 vxlan local-tunnelip 10.2.1.1
cumulus@leaf1:~$ net add vxlan vni-2000 bridge access 20
cumulus@leaf1:~$ net add vxlan vni-30 vxlan id 30
cumulus@leaf1:~$ net add vxlan vni-30 vxlan local-tunnelip 10.2.1.1
cumulus@leaf1:~$ net add vxlan vni-30 bridge access 30
cumulus@leaf1:~$ net add bridge bridge ports swp32s0.10
cumulus@leaf1:~$ net pending 
cumulus@leaf1:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto lo
iface lo 
  address 10.2.1.1/32
  vxrd-src-ip 10.2.1.1
 
auto swp32s0.10
iface swp32s0.10
 
auto bridge
iface bridge
  bridge-ports vni-10 vni-2000 vni-30
  bridge-vids 10 20 30
  bridge-vlan-aware yes
 
auto vni-10
iface vni-10
  bridge-access 10
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes 
  vxlan-id 10
  vxlan-local-tunnelip 10.2.1.1

auto vni-2000
iface vni-2000
  bridge-access 20
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
  vxlan-id 2000
  vxlan-local-tunnelip 10.2.1.1

auto vni-30
iface vni-30
  bridge-access 30
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
  vxlan-id 30
  vxlan-local-tunnelip 10.2.1.1</code></pre>
</div>
</div></td>
<td><p><strong>leaf2:</strong></p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf2:~$ net add loopback lo ip address 10.2.1.2/32
cumulus@leaf2:~$ net add loopback lo vxrd-src-ip 10.2.1.2
cumulus@leaf2:~$ net add loopback lo vxrd-svcnode-ip 10.2.1.3
cumulus@leaf2:~$ net add vxlan vni-10 vxlan id 10
cumulus@leaf2:~$ net add vxlan vni-10 vxlan local-tunnelip 10.2.1.2
cumulus@leaf2:~$ net add vxlan vni-10 bridge access 10
cumulus@leaf2:~$ net add vxlan vni-2000 vxlan id 2000
cumulus@leaf2:~$ net add vxlan vni-2000 vxlan local-tunnelip 10.2.1.2
cumulus@leaf2:~$ net add vxlan vni-2000 bridge access 20
cumulus@leaf2:~$ net add vxlan vni-30 vxlan id 30
cumulus@leaf2:~$ net add vxlan vni-30 vxlan local-tunnelip 10.2.1.2
cumulus@leaf2:~$ net add vxlan vni-30 bridge access 30
cumulus@leaf1:~$ net add bridge bridge ports swp32s0.10
cumulus@leaf2:~$ net pending 
cumulus@leaf2:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto lo
iface lo
  address 10.2.1.2/32 
  vxrd-src-ip 10.2.1.2
 
auto swp32s0.10
iface swp32s0.10
 
auto bridge
iface bridge
  bridge-ports vni-10 vni-2000 vni-30
  bridge-vids 10 20 30
  bridge-vlan-aware yes

auto vni-10
iface vni-10
  bridge-access 10
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
  vxlan-id 10
  vxlan-local-tunnelip 10.2.1.2

auto vni-2000
iface vni-2000
  bridge-access 20
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
  vxlan-id 2000
  vxlan-local-tunnelip 10.2.1.2
 
auto vni-30
iface vni-30
  bridge-access 30
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
  vxlan-id 30
  vxlan-local-tunnelip 10.2.1.2</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

Why is vni-2000 not vni-20? For example, why not tie VLAN 20 to VNI 20,
or why was 2000 used? VXLANs and VLANs do not need to be the same
number. However if you are using fewer than 4096 VLANs, there is no
reason not to make it easy and correlate VLANs to VXLANs. It is
completely up to you.

## Verify the VLAN to VXLAN Mapping

Use the `brctl show` command to see the physical and logical interfaces
associated with that bridge:

``` text
cumulus@leaf1:~$ brctl show
bridge name bridge id           STP enabled     interfaces
bridge      8000.443839008404   yes             swp32s0.10
                                                vni-10
                                                vni-2000
                                                vni-30
```

As with any logical interfaces on Linux, the name does not matter (other
than a 15-character limit). To verify the associated VNI for the logical
name, use the `ip -d link show` command:

``` text
cumulus@leaf1:~$ ip -d link show vni-10
43: vni-10: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-10 state UNKNOWN mode DEFAULT
    link/ether 02:ec:ec:bd:7f:c6 brd ff:ff:ff:ff:ff:ff
    vxlan id 10 srcport 32768 61000 dstport 4789 ageing 1800
    bridge_slave
```

The *vxlan id 10 *indicates the VXLAN ID/VNI is indeed 10 as the logical
name suggests.

## Enable and Manage Service Node and Registration Daemons

Every VTEP must run the registration daemon (`vxrd`). Typically, every
leaf switch acts as a VTEP.  A minimum of 1 switch (a switch not already
acting as a VTEP) must run the service node daemon (`vxsnd`). The
instructions for enabling these daemons follows.

### Enable the Service Node Daemon

The service node daemon (`vxsnd)` is included in the Cumulus Linux
repository as `vxfld-vxsnd`. The service node daemon can run on any
switch running Cumulus Linux as long as that switch is not also a VXLAN
VTEP. In this example, enable the service node only on
the spine1 switch, then restart the service.

``` plain
cumulus@spine1:~$ sudo systemctl enable vxsnd.service
cumulus@spine1:~$ sudo systemctl restart vxsnd.service
```

Do not run `vxsnd` on a switch that is already acting as a VTEP.

### Enable the Registration Daemon

The registration daemon (`vxrd`) is included in the Cumulus Linux
package as  `vxfld-vxrd`. The registration daemon must run on each VTEP
participating in LNV, so you must enable it on every TOR (leaf)
switch acting as a VTEP, then restart the `vxrd` daemon. For example, on
leaf1:

``` plain
cumulus@leaf1:~$ sudo systemctl enable vxrd.service
cumulus@leaf1:~$ sudo systemctl restart vxrd.service
```

Then enable and restart the `vxrd` daemon on leaf2:

``` plain
cumulus@leaf2:~$ sudo systemctl enable vxrd.service
cumulus@leaf2:~$ sudo systemctl restart vxrd.service
```

### Check the Daemon Status

To determine if the daemon is running, use the
`systemctl status <daemon name>.service` command.

For the service node daemon:

``` text
cumulus@spine1:~$ sudo systemctl status vxsnd.service
● vxsnd.service - Lightweight Network Virt Discovery Svc and Replicator
   Loaded: loaded (/lib/systemd/system/vxsnd.service; enabled)
   Active: active (running) since Wed 2016-05-11 11:42:55 UTC; 10min ago
 Main PID: 774 (vxsnd)
   CGroup: /system.slice/vxsnd.service
           └─774 /usr/bin/python /usr/bin/vxsnd

May 11 11:42:55 cumulus vxsnd[774]: INFO: Starting (pid 774) ...
```

For the registration daemon:

``` text
cumulus@leaf1:~$ sudo systemctl status vxrd.service 
● vxrd.service - Lightweight Network Virtualization Peer Discovery Daemon
   Loaded: loaded (/lib/systemd/system/vxrd.service; enabled)
   Active: active (running) since Wed 2016-05-11 11:42:55 UTC; 10min ago
 Main PID: 929 (vxrd)
   CGroup: /system.slice/vxrd.service
           └─929 /usr/bin/python /usr/bin/vxrd

May 11 11:42:55 cumulus vxrd[929]: INFO: Starting (pid 929) ...
```

## Configure the Registration Node

The registration node was configured earlier in
`/etc/network/interfaces` in the [VXLAN
mapping](#LightweightNetworkVirtualizationOverview-mapping) section
above; no additional configuration is typically needed. However, if you
need to modify the registration node configuration, edit
`/etc/vxrd.conf`.

![](images/icons/grey_arrow_down.png){.expand-control-image}Configuring
the registration node in /etc/vxrd.conf ...

``` text
cumulus@leaf1:~$ sudo nano /etc/vxrd.conf
```

Then edit the `svcnode_ip` variable:

``` text
svcnode_ip = 10.2.1.3
```

Then perform the same on leaf2:

``` text
cumulus@leaf2:~$ sudo nano /etc/vxrd.conf
```

And again edit the `svcnode_ip` variable:

``` text
svcnode_ip = 10.2.1.3
```

Enable, then restart the registration node daemon for the change to take
effect:

``` text
cumulus@leaf1:~$ sudo systemctl enable vxrd.service
cumulus@leaf1:~$ sudo systemctl restart vxrd.service
```

Restart the daemon on leaf2:

``` text
cumulus@leaf2:~$ sudo systemctl enable vxrd.service
cumulus@leaf2:~$ sudo systemctl restart vxrd.service
```

The complete list of options you can configure is listed below:

![](images/icons/grey_arrow_down.png){.expand-control-image}Registration
node options ...

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>loglevel</td>
<td>The log level: DEBUG, INFO, WARNING, ERROR, CRITICAL.</td>
<td>INFO</td>
</tr>
<tr class="even">
<td>logdest</td>
<td>The destination for log messages. The destination can be a file name, <code>stdout</code>, or <code>syslog</code>.</td>
<td>syslog</td>
</tr>
<tr class="odd">
<td>logfilesize</td>
<td>The log file size in bytes. Used when <code>logdest</code> is a file name.</td>
<td>512000</td>
</tr>
<tr class="even">
<td>logbackupcount</td>
<td>The maximum number of log files stored on the disk. Used when <code>logdest</code> is a file name.</td>
<td>14</td>
</tr>
<tr class="odd">
<td>pidfile</td>
<td>The PIF file location for the <code>vxrd</code> daemon.</td>
<td>/var/run/vxrd.pid</td>
</tr>
<tr class="even">
<td>udsfile</td>
<td>The file name for the Unix domain socket used for management.</td>
<td>/var/run/vxrd.sock</td>
</tr>
<tr class="odd">
<td>vxfld_port</td>
<td>The UDP port used for VXLAN control messages.</td>
<td>10001</td>
</tr>
<tr class="even">
<td>svcnode_ip</td>
<td><p>The address to which registration daemons send control messages for registration and or BUM packets for replication. You can also configure this option in the <code>/etc/network/interfaces</code> file with the <code>vxrd-svcnode-ip</code> keyword.</p></td>
<td> </td>
</tr>
<tr class="odd">
<td>holdtime</td>
<td><p>The hold time (in seconds) for soft state, which is how long the service node waits before ageing out an IP address for a VNI. The <code>vxrd</code> includes this in the register messages it sends to a <code>vxsnd</code>.</p></td>
<td>90 seconds</td>
</tr>
<tr class="even">
<td>src_ip</td>
<td>The local IP address to bind to for receiving control traffic from the service node daemon.</td>
<td> </td>
</tr>
<tr class="odd">
<td>refresh_rate</td>
<td><p>The number of times to refresh within the hold time. The higher this number, the more lost UDP refresh messages can be tolerated.</p></td>
<td>3 seconds</td>
</tr>
<tr class="even">
<td>config_check_rate</td>
<td>The number of seconds to poll the system for current VXLAN membership.</td>
<td>5 seconds</td>
</tr>
<tr class="odd">
<td>head_rep</td>
<td>Enables self replication. Instead of using the service node to replicate BUM packets, it is done in hardware on the VTEP switch.</td>
<td>true</td>
</tr>
</tbody>
</table>

Use *1*, *yes*, *true*, or *on* for True for each relevant option. Use
*0*, *no*, *false*, or *off* for False.

## Configure the Service Node

To configure the service node daemon, edit the `/etc/vxsnd.conf`
configuration file.

For the example configuration, default values are used, except for the
`svcnode_ip` field.

``` text
cumulus@spine1:~$ sudo nano /etc/vxsnd.conf
```

The address field is set to the loopback address of the switch running
the `vxsnd` daemon.

``` text
svcnode_ip = 10.2.1.3
```

Enable, then restart the service node daemon for the change to take
effect:

``` text
cumulus@spine1:~$ sudo systemctl enable vxsnd.service
cumulus@spine1:~$ sudo systemctl restart vxsnd.service
```

The complete list of options you can configure is listed below:

![](images/icons/grey_arrow_down.png){.expand-control-image}Click here
to expand...

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<thead>
<tr class="header">
<th>Name</th>
<th>Description</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>loglevel</td>
<td>The log level: DEBUG, INFO, WARNING, ERROR, CRITICAL.</td>
<td>INFO</td>
</tr>
<tr class="even">
<td>logdest</td>
<td>The destination for log messages. The destination can be a file name, <code>stdout</code>, or <code>syslog</code>.</td>
<td>syslog</td>
</tr>
<tr class="odd">
<td>logfilesize</td>
<td>The log file size in bytes. Used when <code>logdest</code> is a file name.</td>
<td>512000</td>
</tr>
<tr class="even">
<td>logbackupcount</td>
<td>The maximum number of log files stored on disk. Used when <code>logdest</code> is a file name.</td>
<td>14</td>
</tr>
<tr class="odd">
<td>pidfile</td>
<td>The PID file location for the <code>vxrd</code> daemon.</td>
<td>/var/run/vxrd.pid</td>
</tr>
<tr class="even">
<td>udsfile</td>
<td>The file name for the Unix domain socket used for management.</td>
<td>/var/run/vxrd.sock</td>
</tr>
<tr class="odd">
<td>vxfld_port</td>
<td>The UDP port used for VXLAN control messages.</td>
<td>10001</td>
</tr>
<tr class="even">
<td>svcnode_ip</td>
<td><p>The address to which registration daemons send control messages for registration and or BUM packets for replication.</p></td>
<td>0.0.0.0</td>
</tr>
<tr class="odd">
<td>holdtime</td>
<td><p>The holdtime (in seconds) for soft state. This option is used when sending a register message to peers in response to learning a &lt;vni, addr&gt; from a VXLAN data packet.</p></td>
<td>90</td>
</tr>
<tr class="even">
<td>src_ip</td>
<td><p>The local IP address to bind to for receiving inter-vxsnd control traffic.</p></td>
<td>0.0.0.0</td>
</tr>
<tr class="odd">
<td>svcnode_peers</td>
<td><p>A space-separated list of IP addresses with which the <code>vxsnd</code> shares its state.</p></td>
<td> </td>
</tr>
<tr class="even">
<td>enable_vxlan_listen</td>
<td><p>When set to true, the service node listens for VXLAN data traffic.</p></td>
<td>true</td>
</tr>
<tr class="odd">
<td>install_svcnode_ip</td>
<td><p>When set to true, the <code>snd_peer_address</code> gets installed on the loopback interface. It gets withdrawn when the <code>vxsnd</code> is not in service. If set to true, you must define the <code>snd_peer_address</code> configuration variable.</p></td>
<td>false</td>
</tr>
<tr class="even">
<td>age_check</td>
<td>Number of seconds to wait before checking the database to age out stale entries.</td>
<td>90 seconds</td>
</tr>
</tbody>
</table>

Use *1*, *yes*, *true,* or *on* for True for each relevant option. Use
*0*, *no*, *false,* or *off* for False.

## Verifiy and Troubleshoot

### Verify the Registration Node Daemon 

Use the `vxrdctl vxlans` ** **command to see the configured VNIs, the
local address being used to source the VXLAN tunnel, and the service
node being used.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ vxrdctl vxlans
VNI     Local Addr       Svc Node
===     ==========       ========
 10      10.2.1.1        10.2.1.3
 30      10.2.1.1        10.2.1.3
2000      10.2.1.1        10.2.1.3</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf2:~$ vxrdctl vxlans
VNI     Local Addr       Svc Node
===     ==========       ========
 10      10.2.1.2        10.2.1.3
 30      10.2.1.2        10.2.1.3
2000      10.2.1.2        10.2.1.3</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

Use the `vxrdctl peers` command to see configured VNIs and all VTEPs
(leaf switches) within the network that have them configured.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ vxrdctl peers
VNI         Peer Addrs
===         ==========
10          10.2.1.1, 10.2.1.2
30          10.2.1.1, 10.2.1.2
2000        10.2.1.1, 10.2.1.2</code></pre>
</div>
</div></td>
<td><div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@leaf2:~$ vxrdctl peers
VNI         Peer Addrs
===         ==========
10          10.2.1.1, 10.2.1.2
30          10.2.1.1, 10.2.1.2
2000        10.2.1.1, 10.2.1.2</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

When head end replication mode is disabled, the command does not work.

Use the `vxrdctl peers `command to see the other VTEPs (leaf switches)
and the VNIs with which they are associated. This does not show anything
unless you enabled head end replication mode by setting the `head_rep`
option to *True*. Otherwise, replication is done by the service node.

``` plain
cumulus@leaf2:~$ vxrdctl peers
Head-end replication is turned off on this device.
This command will not provide any output
```

### Verify the Service Node Daemon

Use the `vxsndctl fdb` command to verify which VNIs belong to which VTEP
(leaf switches).

``` text
cumulus@spine1:~$ vxsndctl fdb
VNI    Address     Ageout
===    =======     ======
 10    10.2.1.1        82
 10    10.2.1.2        77
 30    10.2.1.1        82
 30    10.2.1.2        77
2000    10.2.1.1        82
2000    10.2.1.2        77
```

### Verify Traffic Flow and Check Counters

VXLAN transit traffic information is stored in a flat file located
in `/cumulus/switchd/run/stats/vxlan/all`.

``` text
cumulus@leaf1:~$ cat /cumulus/switchd/run/stats/vxlan/all
VNI                             : 10
Network In Octets               : 1090
Network In Packets              : 8
Network Out Octets              : 1798
Network Out Packets             : 13
Total In Octets                 : 2818
Total In Packets                : 27
Total Out Octets                : 3144
Total Out Packets               : 39
VN Interface                    : vni: 10, swp32s0.10
Total In Octets                 : 1728
Total In Packets                : 19
Total Out Octets                : 552
Total Out Packets               : 18
VNI                             : 30
Network In Octets               : 828
Network In Packets              : 6
Network Out Octets              : 1224
Network Out Packets             : 9
Total In Octets                 : 2374
Total In Packets                : 23
Total Out Octets                : 2300
Total Out Packets               : 32
VN Interface                    : vni: 30, swp32s0.30
Total In Octets                 : 1546
Total In Packets                : 17
Total Out Octets                : 552
Total Out Packets               : 17
VNI                             : 2000
Network In Octets               : 676
Network In Packets              : 5
Network Out Octets              : 1072
Network Out Packets             : 8
Total In Octets                 : 2030
Total In Packets                : 20
Total Out Octets                : 2042
Total Out Packets               : 30
VN Interface                    : vni: 2000, swp32s0.20
Total In Octets                 : 1354
Total In Packets                : 15
Total Out Octets                : 446
```

### Ping to Test Connectivity

To test the connectivity across the VXLAN tunnel with an ICMP echo
request (ping), make sure to ping from the server rather than the switch
itself.

SVIs (switch VLAN interfaces) are not supported when using VXLAN. There
cannot be an IP address on the bridge that also contains a VXLAN.

Following is the IP address information used in this example
configuration.

| VNI  | server1    | server2    |
|------|------------|------------|
| 10   | 10.10.10.1 | 10.10.10.2 |
| 2000 | 10.10.20.1 | 10.10.20.2 |
| 30   | 10.10.30.1 | 10.10.30.2 |

Test connectivity between VNI 10 connected servers by pinging from
server1:

``` text
cumulus@server1:~$ ping 10.10.10.2
PING 10.10.10.2 (10.10.10.2) 56(84) bytes of data.
64 bytes from 10.10.10.2: icmp_seq=1 ttl=64 time=3.90 ms
64 bytes from 10.10.10.2: icmp_seq=2 ttl=64 time=0.202 ms
64 bytes from 10.10.10.2: icmp_seq=3 ttl=64 time=0.195 ms
^C
--- 10.10.10.2 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 0.195/1.432/3.900/1.745 ms
cumulus@server1:~$
```

The other VNIs were also tested and can be viewed in the expanded output
below.

![](images/icons/grey_arrow_down.png){.expand-control-image}Click here
to expand...

Test connectivity between VNI-2000 connected servers by pinging from
server1:

``` text
cumulus@server1:~$ ping 10.10.20.2
PING 10.10.20.2 (10.10.20.2) 56(84) bytes of data.
64 bytes from 10.10.20.2: icmp_seq=1 ttl=64 time=1.81 ms
64 bytes from 10.10.20.2: icmp_seq=2 ttl=64 time=0.194 ms
64 bytes from 10.10.20.2: icmp_seq=3 ttl=64 time=0.206 ms
^C
--- 10.10.20.2 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2000ms
rtt min/avg/max/mdev = 0.194/0.739/1.819/0.763 ms
```

Test connectivity between VNI-30 connected servers by pinging from
server1:

``` text
cumulus@server1:~$ ping 10.10.30.2
PING 10.10.30.2 (10.10.30.2) 56(84) bytes of data.
64 bytes from 10.10.30.2: icmp_seq=1 ttl=64 time=1.85 ms
64 bytes from 10.10.30.2: icmp_seq=2 ttl=64 time=0.239 ms
64 bytes from 10.10.30.2: icmp_seq=3 ttl=64 time=0.185 ms
64 bytes from 10.10.30.2: icmp_seq=4 ttl=64 time=0.212 ms
^C
--- 10.10.30.2 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3000ms
rtt min/avg/max/mdev = 0.185/0.622/1.853/0.711 ms
```

### Troubleshoot with MAC Addresses

Because there is no SVI, there is no way to ping from the server to the
directly attached leaf (top of rack) switch without cabling the switch
to itself. The easiest way to see if the server can reach the leaf
switch is to check the MAC address table of the leaf switch.

First, obtain the MAC address of the server:

``` text
cumulus@server1:~$ ip addr show eth3.10 | grep ether
    link/ether 90:e2:ba:55:f0:85 brd ff:ff:ff:ff:ff:ff
```

Next, check the MAC address table of the leaf switch:

``` text
cumulus@leaf1:~$ brctl showmacs br-10
port name mac addr      vlan    is local?   ageing timer
vni-10    46:c6:57:fc:1f:54 0   yes        0.00
swp32s0.10 90:e2:ba:55:f0:85    0   no        75.87
vni-10    90:e2:ba:7e:a9:c1 0   no        75.87
swp32s0.10 ec:f4:bb:fc:67:a1    0   yes        0.00
```

*90:e2:ba:55:f0:85* appears in the MAC address table, which indicates
that connectivity is occurring between leaf1 and server1.

### Check the Service Node Configuration

Use the `ip -d link show` command to verify the service node, VNI, and
administrative state of a particular logical VNI interface:

``` text
cumulus@leaf1:~$ ip -d link show vni-10
35: vni-10: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-10 state UNKNOWN mode DEFAULT
    link/ether 46:c6:57:fc:1f:54 brd ff:ff:ff:ff:ff:ff
    vxlan id 10 remote 10.2.1.3 local 10.2.1.1 srcport 32768 61000 dstport 4789 ageing 1800 svcnode 10.2.1.3
    bridge_slave
```

## Advanced LNV Usage

### Scale LNV by Load Balancing with Anycast

The above configuration assumes a single service node, which can quickly
be overwhelmed by BUM traffic. To load balance BUM traffic across
multiple service nodes,
use [Anycast](http://en.wikipedia.org/wiki/Anycast). Anycast enables BUM
traffic to reach the topologically nearest service node instead of
overwhelming a single service node.

#### Enable the Service Node Daemon on Additional Spine Switches

In this example, spine1 already has the service node daemon enabled.
Enable it on the spine2 switch, then restart the `vxsnd` daemon:

``` text
cumulus@spine2:~$ sudo systemctl enable vxsnd.service
cumulus@spine2:~$ sudo systemctl restart vxsnd.service
```

#### Configure the Anycast Address on All Participating Service Nodes

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>spine1:</strong></p>
<p>Add the 10.10.10.10/32 address to the loopback address:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine1:~$ net add loopback lo ip address 10.10.10.10/32
cumulus@spine1:~$ net pending
cumulus@spine1:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto lo
iface lo inet loopback
  address 10.2.1.3/32
  address 10.10.10.10/32</code></pre>
</div>
</div>
<p>Verify the IP address is configured:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine1:~$ ip addr show lo
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 16436 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet 10.2.1.3/32 scope global lo
    inet 10.10.10.10/32 scope global lo
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever</code></pre>
</div>
</div></td>
<td><p><strong>spine2:</strong></p>
<p>Add the 10.10.10.10/32 address to the loopback address:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine2:~$ net add loopback lo ip address 10.10.10.10/32
cumulus@spine2:~$ net pending
cumulus@spine2:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto lo
iface lo inet loopback
  address 10.2.1.4/32
  address 10.10.10.10/32</code></pre>
</div>
</div>
<p>Verify the IP address is configured:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine2:~$ ip addr show lo
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 16436 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
    inet 10.2.1.4/32 scope global lo
    inet 10.10.10.10/32 scope global lo
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

#### Configure the Service Node vxsnd.conf File

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>spine1:</strong></p>
<p>Use a text editor to edit the network configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine1:~$ sudo nano /etc/vxsnd.conf</code></pre>
</div>
</div>
<p>Change the following values:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>svcnode_ip = 10.10.10.10
 
svcnode_peers = 10.2.1.4
 
src_ip = 10.2.1.3</code></pre>
</div>
</div>
<p>This sets the address on which the service node listens to VXLAN messages to the configured Anycast address and sets it to sync with spine2.</p>
<p>Enable, then restart the <code>vxsnd</code> daemon:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine1:~$ sudo systemctl enable vxsnd.service
cumulus@spine1:~$ sudo systemctl restart vxsnd.service</code></pre>
</div>
</div></td>
<td><p><strong>spine2:</strong></p>
<p>Use a text editor to edit the network configuration:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine2:~$ sudo nano /etc/vxsnd.conf</code></pre>
</div>
</div>
<p>Change the following values:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>svcnode_ip = 10.10.10.10

svcnode_peers = 10.2.1.3

src_ip = 10.2.1.4</code></pre>
</div>
</div>
<p>This sets the address on which the service node listens to VXLAN messages to the configured Anycast address and sets it to sync with spine1.</p>
<p>Enable, then restart the <code>vxsnd</code> daemon:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@spine1:~$ sudo systemctl enable vxsnd.service
cumulus@spine1:~$ sudo systemctl restart vxsnd.service</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

#### Reconfigure the VTEPs (Leafs) to Use the Anycast Address

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>leaf1:</strong></p>
<p>Change the <code>vxrd-svcnode-ip</code> field to the anycast address:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ net add loopback lo vxrd-svcnode-ip 10.10.10.10
cumulus@leaf1:~$ net pending
cumulus@leaf1:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto lo
iface lo inet loopback
  address 10.2.1.1
  vxrd-svcnode-ip 10.10.10.10</code></pre>
</div>
</div>
<p>Verify the new service node is configured:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ ip -d link show vni-10
35: vni-10: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue master br-10 state UNKNOWN mode DEFAULT
    link/ether 46:c6:57:fc:1f:54 brd ff:ff:ff:ff:ff:ff
    vxlan id 10 remote 10.10.10.10 local 10.2.1.1 srcport 32768 61000 dstport 4789 ageing 1800 svcnode 10.10.10.10
    bridge_slave

cumulus@leaf1:~$ ip -d link show vni-2000
39: vni-2000: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue master br-20 state UNKNOWN mode DEFAULT
    link/ether 4a:fd:88:c3:fa:df brd ff:ff:ff:ff:ff:ff
    vxlan id 2000 remote 10.10.10.10 local 10.2.1.1 srcport 32768 61000 dstport 4789 ageing 1800 svcnode 10.10.10.10
    bridge_slave

cumulus@leaf1:~$ ip -d link show vni-30
37: vni-30: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue master br-30 state UNKNOWN mode DEFAULT
    link/ether 3e:b3:dc:f3:bd:2b brd ff:ff:ff:ff:ff:ff
    vxlan id 30 remote 10.10.10.10 local 10.2.1.1 srcport 32768 61000 dstport 4789 ageing 1800 svcnode 10.10.10.10
    bridge_slave</code></pre>
</div>
</div>
<div>
<div>
<p>The <code>svcnode</code> 10.10.10.10 means the interface has the correct service node configured.</p>
</div>
</div>
<p>Use the <code>vxrdctl vxlans</code> command to check the service node:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ vxrdctl vxlans
VNI     Local Addr       Svc Node
===     ==========       ========
 10      10.2.1.1        10.2.1.3
 30      10.2.1.1        10.2.1.3
2000      10.2.1.1        10.2.1.3</code></pre>
</div>
</div></td>
<td><p><strong>leaf2:</strong></p>
<p>Change the <code>vxrd-svcnode-ip</code> field to the anycast address:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf1:~$ net add loopback lo vxrd-svcnode-ip 10.10.10.10
cumulus@leaf1:~$ net pending
cumulus@leaf1:~$ net commit</code></pre>
</div>
</div>
<p>These commands create the following configuration in the <code>/etc/network/interfaces</code> file:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>auto lo
iface lo inet loopback
  address 10.2.1.2
  vxrd-svcnode-ip 10.10.10.10</code></pre>
</div>
</div>
<p>Verify the new service node is configured:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf2:~$ ip -d link show vni-10
35: vni-10: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue master br-10 state UNKNOWN mode DEFAULT
    link/ether 4e:03:a7:47:a7:9d brd ff:ff:ff:ff:ff:ff
    vxlan id 10 remote 10.10.10.10 local 10.2.1.2 srcport 32768 61000 dstport 4789 ageing 1800 svcnode 10.10.10.10
    bridge_slave

cumulus@leaf2:~$ ip -d link show vni-2000
39: vni-2000: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue master br-20 state UNKNOWN mode DEFAULT
    link/ether 72:3a:bd:06:00:b7 brd ff:ff:ff:ff:ff:ff
    vxlan id 2000 remote 10.10.10.10 local 10.2.1.2 srcport 32768 61000 dstport 4789 ageing 1800 svcnode 10.10.10.10
    bridge_slave

cumulus@leaf2:~$ ip -d link show vni-30
37: vni-30: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue master br-30 state UNKNOWN mode DEFAULT
    link/ether 22:65:3f:63:08:bd brd ff:ff:ff:ff:ff:ff
    vxlan id 30 remote 10.10.10.10 local 10.2.1.2 srcport 32768 61000 dstport 4789 ageing 1800 svcnode 10.10.10.10
    bridge_slave</code></pre>
</div>
</div>
<div>
<div>
<p>The <code>svcnode</code> 10.10.10.10 means the interface has the correct service node configured.</p>
</div>
</div>
<p>Use the <code>vxrdctl vxlans</code> command to check the service node:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>cumulus@leaf2:~$ vxrdctl vxlans
VNI     Local Addr       Svc Node
===     ==========       ========
 10      10.2.1.2        10.2.1.3
 30      10.2.1.2        10.2.1.3
2000      10.2.1.2        10.2.1.3</code></pre>
</div>
</div></td>
</tr>
</tbody>
</table>

#### Test Connectivity

Repeat the ping tests from the previous section. Here is the table again
for reference:

| VNI  | server1    | server2    |
|------|------------|------------|
| 10   | 10.10.10.1 | 10.10.10.2 |
| 2000 | 10.10.20.1 | 10.10.20.2 |
| 30   | 10.10.30.1 | 10.10.30.2 |

``` text
cumulus@server1:~$ ping 10.10.10.2
PING 10.10.10.2 (10.10.10.2) 56(84) bytes of data.
64 bytes from 10.10.10.2: icmp_seq=1 ttl=64 time=5.32 ms
64 bytes from 10.10.10.2: icmp_seq=2 ttl=64 time=0.206 ms
^C
--- 10.10.10.2 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 0.206/2.767/5.329/2.562 ms
 
PING 10.10.20.2 (10.10.20.2) 56(84) bytes of data.
64 bytes from 10.10.20.2: icmp_seq=1 ttl=64 time=1.64 ms
64 bytes from 10.10.20.2: icmp_seq=2 ttl=64 time=0.187 ms
^C
--- 10.10.20.2 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 0.187/0.914/1.642/0.728 ms
 
cumulus@server1:~$ ping 10.10.30.2
PING 10.10.30.2 (10.10.30.2) 56(84) bytes of data.
64 bytes from 10.10.30.2: icmp_seq=1 ttl=64 time=1.63 ms
64 bytes from 10.10.30.2: icmp_seq=2 ttl=64 time=0.191 ms
^C
--- 10.10.30.2 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 0.191/0.913/1.635/0.722 ms
```

### Restart Network Removes vxsnd Anycast IP Address from Loopback Interface

If you have not configured a loopback anycast IP address in
the `/etc/network/interfaces` file, but you have enabled the `vxsnd`
(service node daemon) log to automatically add anycast IP addresses,
when you restart networking (with `systemctl restart networking`), the
anycast IP address gets removed from the loopback interface.

To prevent this issue from occurring, specify an anycast IP address for
the loopback interface in both the `/etc/network/interfaces` file and
the `vxsnd.conf` file. This way, in case `vxsnd` fails, you can withdraw
the IP address.

## Related Information

-   [tools.ietf.org/html/rfc7348](https://tools.ietf.org/html/rfc7348)
-   [en.wikipedia.org/wiki/Anycast](http://en.wikipedia.org/wiki/Anycast)
-   [Network virtualization chapter, Cumulus Linux user
    guide](Network_Virtualization)

    -   [Static VXLAN Configurations](Static_VXLAN_Configurations)
        -   [Static VXLAN Tunnels](Static_VXLAN_Tunnels)
        -   [Static MAC Bindings with
            VXLAN](Static_MAC_Bindings_with_VXLAN)
    -   [Lightweight Network Virtualization
        Overview](Lightweight_Network_Virtualization_Overview)
        -   [LNV VXLAN Active-Active Mode](LNV_VXLAN_Active-Active_Mode)
        -   [LNV Full Example](LNV_Full_Example)
    -   [Ethernet Virtual Private Network -
        EVPN](Ethernet_Virtual_Private_Network_-_EVPN)
    -   [VXLAN Routing](VXLAN_Routing)
    -   [Virtualization Integrations](Virtualization_Integrations)
        -   [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack)
        -   [Integrating Hardware VTEPs with VMware
            NSX-V](Integrating_Hardware_VTEPs_with_VMware_NSX-V)
        -   [Integrating Hardware VTEPs with VMware
            NSX-MH](Integrating_Hardware_VTEPs_with_VMware_NSX-MH)
        -   [OVSDB Server High
            Availability](OVSDB_Server_High_Availability)
    -   [VXLAN Scale](VXLAN_Scale)
    -   [VXLAN Tunnel DSCP Operations
        — DRAFT](VXLAN_Tunnel_DSCP_Operations_—_DRAFT)
    -   [Hybrid Cloud Connectivity with QinQ and
        VXLANs](Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs)
    -   [Eng Update of VXLAN Hyperloop](Eng_Update_of_VXLAN_Hyperloop)

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-04-20 at 10.02.37 AM.png](attachments/8362706/8362710.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-04-20 at 10.02.57 AM.png](attachments/8362706/8362711.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-04-17 at 2.59.30 PM.png](attachments/8362706/8362712.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-04-17 at 2.28.44 PM.png](attachments/8362706/8362713.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-04-23 at 5.00.38 PM.png](attachments/8362706/8362708.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-04-22 at 1.58.50 PM.png](attachments/8362706/8362709.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[UD-783bad.png](attachments/8362706/8362707.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[UD-783good.png](attachments/8362706/8362705.png) (image/png)  
