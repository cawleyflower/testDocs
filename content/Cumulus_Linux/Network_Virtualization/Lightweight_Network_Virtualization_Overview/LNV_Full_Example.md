---
title: LNV Full Example
author: Unknown
weight: 377
pageID: 8362715
aliases:
 - /old/Cumulus_Linux/LNV_Full_Example.html
imgData: Cumulus_Linux
siteSlug: Cumulus_Linux
---
{{%notice warning%}}

As of Cumulus Linux 3.7.4, the lightweight network virtualization
feature (LNV) has been deprecated. The feature will be removed in
Cumulus Linux 4.0. Cumulus Networks recommends you use [Ethernet virtual
private network
(EVPN)](/old/Cumulus_Linux/Ethernet_Virtual_Private_Network_-_EVPN.html)
for network virtualization.

{{%/notice%}}

Lightweight Network Virtualization (LNV) is a technique for deploying
[VXLANs](/old/Cumulus_Linux/Network_Virtualization.html) without a
central controller on bare metal switches. This a full example complete
with diagram. Refer to the [Lightweight Network Virtualization
chapter](/old/Cumulus_Linux/Lightweight_Network_Virtualization_Overview.html)
for more detailed information. This full example uses the **recommended
way** of deploying LNV, which is to use anycast to load balance the
service nodes.

{{%notice note%}}

LNV is a lightweight controller option. [Contact Cumulus
Networks](http://cumulusnetworks.com/cumulus-linux/overview/#cl-howtoBuy)
with your scale requirements so we can make sure this is the right fit
for you. There are also other controller options that can work on
Cumulus Linux.

{{%/notice%}}

## Example LNV Configuration

The following images illustrate the configuration:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>Physical Cabling Diagram</p>
<p>{{%imgOld 0 %}}</p></td>
<td><p>Network Virtualization Diagram</p>
<p>{{%imgOld 1 %}}</p></td>
</tr>
</tbody>
</table>

{{%notice tip%}}

Want to try out configuring LNV and do not have a Cumulus Linux switch?
Check out [Cumulus VX](https://cumulusnetworks.com/cumulus-vx/) .

{{%/notice%}}

{{%notice tip%}}

{{%imgOld 2 %}}

Feeling Overwhelmed? Come join a [Cumulus Boot
Camp](http://cumulusnetworks.com/education/instructor-led-training/) and
get instructor-led training\!

{{%/notice%}}

### Layer 3 IP Addressing

Here is the configuration for the IP addressing information used in this
example:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>spine1:</strong> <code>/etc/network/interfaces</code></p>
<pre><code>                   
auto lo
iface lo inet loopback
  address 10.2.1.3/32
  address 10.10.10.10/32
 
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
  address 10.1.1.54/30
   
    </code></pre></td>
<td><p><strong>spine2:</strong> <code>/etc/network/interfaces</code></p>
<pre><code>                   
auto lo
iface lo inet loopback
  address 10.2.1.4/32
  address 10.10.10.10/32
 
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
address 10.1.1.38/30
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>leaf1:</strong> <code>/etc/network/interfaces</code></p>
<pre><code>                   
auto lo
iface lo inet loopback
  address 10.2.1.1/32
  vxrd-src-ip 10.2.1.1
  vxrd-svcnode-ip 10.10.10.10
 
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
  address 10.1.1.37/30
 
auto vni-10
iface vni-10
  vxlan-id 10
  vxlan-local-tunnelip 10.2.1.1
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
 
auto vni-2000
iface vni-2000
  vxlan-id 2000
  vxlan-local-tunnelip 10.2.1.1
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
 
auto vni-30
iface vni-30
  vxlan-id 30
  vxlan-local-tunnelip 10.2.1.1
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
 
auto br-10
iface br-10
  bridge-ports swp32s0.10 vni-10
 
auto br-20
iface br-20
  bridge-ports swp32s0.20 vni-2000
 
auto br-30
iface br-30
  bridge-ports swp32s0.30 vni-30
   
    </code></pre></td>
<td><p><strong>leaf2:</strong> <code>/etc/network/interfaces</code></p>
<pre><code>                   
auto lo
iface lo inet loopback
  address 10.2.1.2/32
  vxrd-src-ip 10.2.1.2
  vxrd-svcnode-ip 10.10.10.10
 
auto eth0
iface eth0 inet dhcp
 
auto swp1s0
iface swp1s0 inet static
 address 10.1.1.17/30
 
auto swp1s1
iface swp1s1 inet static
 address 10.1.1.21/30
 
auto swp1s2
iface swp1s2 inet static
 address 10.1.1.49/30
 
auto swp1s3
iface swp1s3 inet static
 address 10.1.1.53/30
 
auto vni-10
iface vni-10
  vxlan-id 10
  vxlan-local-tunnelip 10.2.1.2
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
 
auto vni-2000
iface vni-2000
  vxlan-id 2000
  vxlan-local-tunnelip 10.2.1.2
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
 
auto vni-30
iface vni-30
  vxlan-id 30
  vxlan-local-tunnelip 10.2.1.2
  mstpctl-bpduguard yes
  mstpctl-portbpdufilter yes
 
auto br-10
iface br-10
  bridge-ports swp32s0.10 vni-10
 
auto br-20
iface br-20
  bridge-ports swp32s0.20 vni-2000
 
auto br-30
iface br-30
  bridge-ports swp32s0.30 vni-30
   
    </code></pre></td>
</tr>
</tbody>
</table>

### FRRouting Configuration

The service nodes and registration nodes must all be routable between
each other. The layer 3 fabric on Cumulus Linux can either be
[BGP](/old/Cumulus_Linux/Border_Gateway_Protocol_-_BGP.html) or
[OSPF](/old/Cumulus_Linux/Open_Shortest_Path_First_-_OSPF.html). In this
example, OSPF is used to demonstrate full reachability.

Here is the FRRouting configuration using OSPF:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>spine1:</strong>/etc/frr/frr.conf</p>
<pre><code>                   
interface lo
 ip ospf area 0.0.0.0
interface swp49
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
!
!
!
!
router-id 10.2.1.3
router ospf
 ospf router-id 10.2.1.3
   
    </code></pre></td>
<td><p><strong>spine2:</strong> /etc/frr/frr.conf</p>
<pre><code>                   
interface lo
 ip ospf area 0.0.0.0
interface swp49
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
!
!
!
!
router-id 10.2.1.4
router ospf
 ospf router-id 10.2.1.4
   
    </code></pre></td>
</tr>
<tr class="even">
<td><p><strong>leaf1:</strong> /etc/frr/frr.conf</p>
<pre><code>                   
interface lo
 ip ospf area 0.0.0.0
interface swp1s0
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
!
!
!
!
router-id 10.2.1.1
router ospf
 ospf router-id 10.2.1.1
   
    </code></pre></td>
<td><p><strong>leaf2:</strong> /etc/frr/frr.conf</p>
<pre><code>                   
interface lo
 ip ospf area 0.0.0.0
interface swp1s0
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
!
!
!
!
router-id 10.2.1.2
router ospf
 ospf router-id 10.2.1.2
   
    </code></pre></td>
</tr>
</tbody>
</table>

### Host Configuration

In this example, the servers are running Ubuntu 14.04. You must map a
trunk from server1 and server2 to the respective switch. In Ubuntu, this
is done with subinterfaces.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>server1</strong></p>
<pre><code>                   
auto eth3.10
iface eth3.10 inet static
  address 10.10.10.1/24
 
auto eth3.20
iface eth3.20 inet static
  address 10.10.20.1/24
 
auto eth3.30
iface eth3.30 inet static
  address 10.10.30.1/24
   
    </code></pre></td>
<td><p><strong>server2</strong></p>
<pre><code>                   
auto eth3.10
iface eth3.10 inet static
  address 10.10.10.2/24
 
auto eth3.20
iface eth3.20 inet static
  address 10.10.20.2/24
 
auto eth3.30
iface eth3.30 inet static
  address 10.10.30.2/24
   
    </code></pre></td>
</tr>
</tbody>
</table>

### Service Node Configuration

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>spine1</strong>:/etc/vxsnd.conf</p>
<pre><code>                   
[common]
# Log level is one of DEBUG, INFO, WARNING, ERROR, CRITICAL
#loglevel = INFO
# Destination for log message.  Can be a file name, &#39;stdout&#39;, or &#39;syslog&#39;
#logdest = syslog
# log file size in bytes. Used when logdest is a file
#logfilesize = 512000
# maximum number of log files stored on disk. Used when logdest is a file
#logbackupcount = 14
# The file to write the pid. If using monit, this must match the one
# in the vxsnd.rc
#pidfile = /var/run/vxsnd.pid
# The file name for the unix domain socket used for mgmt.
#udsfile = /var/run/vxsnd.sock
# UDP port for vxfld control messages
#vxfld_port = 10001
# This is the address to which registration daemons send control messages for
# registration and/or BUM packets for replication
svcnode_ip = 10.10.10.10
# Holdtime (in seconds) for soft state. It is used when sending a
# register msg to peers in response to learning a  from a
# VXLAN data pkt
#holdtime = 90
# Local IP address to bind to for receiving inter-vxsnd control traffic
src_ip = 10.2.1.3
[vxsnd]
# Space separated list of IP addresses of vxsnd to share state with
svcnode_peers = 10.2.1.4
# When set to true, the service node will listen for vxlan data traffic
# Note: Use 1, yes, true, or on, for True and 0, no, false, or off,
# for False
#enable_vxlan_listen = true
# When set to true, the svcnode_ip will be installed on the loopback
# interface, and it will be withdrawn when the vxsnd is no longer in
# service.  If set to true, the svcnode_ip configuration
# variable must be defined.
# Note: Use 1, yes, true, or on, for True and 0, no, false, or off,
# for False
#install_svcnode_ip = false
# Seconds to wait before checking the database to age out stale entries
#age_check = 90
   
    </code></pre></td>
<td><p><strong>spine2</strong>:/etc/vxsnd.conf</p>
<pre><code>                   
[common]
# Log level is one of DEBUG, INFO, WARNING, ERROR, CRITICAL
#loglevel = INFO
# Destination for log message.  Can be a file name, &#39;stdout&#39;, or &#39;syslog&#39;
#logdest = syslog
# log file size in bytes. Used when logdest is a file
#logfilesize = 512000
# maximum number of log files stored on disk. Used when logdest is a file
#logbackupcount = 14
# The file to write the pid. If using monit, this must match the one
# in the vxsnd.rc
#pidfile = /var/run/vxsnd.pid
# The file name for the unix domain socket used for mgmt.
#udsfile = /var/run/vxsnd.sock
# UDP port for vxfld control messages
#vxfld_port = 10001
# This is the address to which registration daemons send control messages for
# registration and/or BUM packets for replication
svcnode_ip = 10.10.10.10
# Holdtime (in seconds) for soft state. It is used when sending a
# register msg to peers in response to learning a  from a
# VXLAN data pkt
#holdtime = 90
# Local IP address to bind to for receiving inter-vxsnd control traffic
src_ip = 10.2.1.4
[vxsnd]
# Space separated list of IP addresses of vxsnd to share state with
svcnode_peers = 10.2.1.3
# When set to true, the service node will listen for vxlan data traffic
# Note: Use 1, yes, true, or on, for True and 0, no, false, or off,
# for False
#enable_vxlan_listen = true
# When set to true, the svcnode_ip will be installed on the loopback
# interface, and it will be withdrawn when the vxsnd is no longer in
# service.  If set to true, the svcnode_ip configuration
# variable must be defined.
# Note: Use 1, yes, true, or on, for True and 0, no, false, or off,
# for False
#install_svcnode_ip = false
# Seconds to wait before checking the database to age out stale entries
#age_check = 90
   
    </code></pre></td>
</tr>
</tbody>
</table>

## Related Information

  - [tools.ietf.org/html/rfc7348](https://tools.ietf.org/html/rfc7348)

  - [en.wikipedia.org/wiki/Anycast](http://en.wikipedia.org/wiki/Anycast)

  - [Detailed LNV Configuration
    Guide](/old/Cumulus_Linux/Lightweight_Network_Virtualization_Overview.html)

  - [Cumulus Networks
    Training](http://cumulusnetworks.com/education/instructor-led-training/)

  - [Network virtualization chapter, Cumulus Linux user
    guide](/old/Cumulus_Linux/Network_Virtualization.html)
    
      - [Static VXLAN
        Configurations](/old/Cumulus_Linux/Static_VXLAN_Configurations.html)
        
          - [Static VXLAN
            Tunnels](/old/Cumulus_Linux/Static_VXLAN_Tunnels.html)
        
          - [Static MAC Bindings with
            VXLAN](/old/Cumulus_Linux/Static_MAC_Bindings_with_VXLAN.html)
    
      - [Ethernet Virtual Private Network -
        EVPN](/old/Cumulus_Linux/Ethernet_Virtual_Private_Network_-_EVPN.html)
    
      - [Lightweight Network Virtualization
        Overview](/old/Cumulus_Linux/Lightweight_Network_Virtualization_Overview.html)
        
          - [LNV Full Example](/old/Cumulus_Linux/#)
    
      - [VXLAN Active-Active
        Mode](/old/Cumulus_Linux/VXLAN_Active-Active_Mode.html)
    
      - [VXLAN Routing](/old/Cumulus_Linux/VXLAN_Routing.html)
    
      - [VXLAN Scale](/old/Cumulus_Linux/VXLAN_Scale.html)
    
      - [Hybrid Cloud Connectivity with QinQ and
        VXLANs](/old/Cumulus_Linux/Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs.html)
    
      - [Troubleshooting
        VXLANs](/old/Cumulus_Linux/Troubleshooting_VXLANs.html)
    
      - [Virtualization
        Integrations](/old/Cumulus_Linux/Virtualization_Integrations.html)
        
          - [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](/old/Cumulus_Linux/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html)
        
          - [Integrating Hardware VTEPs with VMware
            NSX-V](/old/Cumulus_Linux/Integrating_Hardware_VTEPs_with_VMware_NSX-V.html)
        
          - [Integrating Hardware VTEPs with VMware
            NSX-MH](/old/Cumulus_Linux/Integrating_Hardware_VTEPs_with_VMware_NSX-MH.html)
        
          - [OVSDB Server High
            Availability](/old/Cumulus_Linux/OVSDB_Server_High_Availability.html)