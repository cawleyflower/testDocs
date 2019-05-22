---
title: LNV VXLAN Active-Active Mode
author: Unknown
weight: 395
pageID: 8362217
aliases:
 - /old/Cumulus_Linux_36/LNV_VXLAN_Active-Active_Mode.html
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
*LNV active-active mode* allows a pair of
[MLAG](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Multi-Chassis+Link+Aggregation+-+MLAG)
switches to act as a single VTEP, providing active-active VXLAN
termination for bare metal as well as virtualized workloads.

## Terminology and Definitions

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Term</p></th>
<th><p>Definition</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>vxrd</p></td>
<td><p>The VXLAN registration daemon. The daemon runs on the switch that is mapping VLANs to VXLANs. You must configure the <code>vxrd</code> daemon to register to a service node. This turns the switch into a VTEP.</p></td>
</tr>
<tr class="even">
<td><p>VTEP</p></td>
<td><p>The virtual tunnel endpoint. This is an encapsulation and decapsulation point for VXLANs.</p></td>
</tr>
<tr class="odd">
<td><p>active-active VTEP</p></td>
<td><p>A pair of switches acting as a single VTEP.</p></td>
</tr>
<tr class="even">
<td><p>ToR</p></td>
<td><p>The top of rack switch; also referred to as a leaf or access switch.</p></td>
</tr>
<tr class="odd">
<td><p>Spine</p></td>
<td><p>The aggregation switch for multiple leafs. Specifically used when a data center is using a <a href="https://en.wikipedia.org/wiki/Clos_network" class="external-link">Clos network architecture.</a> Read more about spine-leaf architecture in this <a href="http://go.cumulusnetworks.com/scalable-dcnetworks?utm_source=homepageslider&amp;utm_medium=search&amp;utm_campaign=Whitepaper-Building+Scalable+Datacenter+Networks" class="external-link">white paper</a>.</p></td>
</tr>
<tr class="even">
<td><p>vxsnd</p></td>
<td><p>The VXLAN service node daemon that you can run to register multiple VTEPs.</p></td>
</tr>
<tr class="odd">
<td><p>exit leaf</p></td>
<td><p>A switch dedicated to peering the Clos network to an outside network; also referred to as a border leaf, service leaf, or edge leaf.</p></td>
</tr>
<tr class="even">
<td><p>anycast</p></td>
<td><p>When an IP address is advertised from multiple locations. Allows multiple devices to share the same IP and effectively load balance traffic across them. With LNV, anycast is used in two places:</p>
<ol>
<li><p>To share a VTEP IP address between a pair of MLAG switches.</p></li>
<li><p>To load balance traffic for service nodes (for example, service nodes share an IP address).</p></li>
</ol></td>
</tr>
<tr class="odd">
<td><p>ASIC</p></td>
<td><p>Application-specific integrated circuit; also referred to as hardware or hardware accelerated. Encapsulation and decapsulation are required for the best performance VXLAN-supported ASIC.</p></td>
</tr>
<tr class="even">
<td><p>RIOT</p></td>
<td><p>A Broadcom feature for routing in and out of tunnels. Allows a VXLAN bridge to have a switch VLAN interface associated with it, and traffic to exit a VXLAN into the layer 3 fabric. Also called VXLAN Routing.</p></td>
</tr>
<tr class="odd">
<td><p>VXLAN Routing</p></td>
<td><p>The industry standard term for the ability to route in and out of a VXLAN. Equivalent to the Broadcom RIOT feature.</p></td>
</tr>
</tbody>
</table>

## Configuring LNV Active-active Mode

LNV requires the following underlying technologies to work correctly.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Technology</p></th>
<th><p>More Information</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>MLAG</p></td>
<td><p>Refer to the <a href="/old/Cumulus_Linux_36/#src-8362217_LNVVXLANActive-ActiveMode-configuring">MLAG chapter</a> for more detailed configuration information. Configurations for the demonstration are provided below.</p></td>
</tr>
<tr class="even">
<td><p>OSPF or BGP</p></td>
<td><p>Refer to the <a href="/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Open+Shortest+Path+First+-+OSPF+-+Protocol">OSPF chapter</a> or the <a href="/old/Cumulus_Linux_36/Border_Gateway_Protocol_-_BGP.html">BGP chapter</a> for more detailed configuration information. Configurations for the demonstration are provided below.</p></td>
</tr>
<tr class="odd">
<td><p>LNV</p></td>
<td><p>Refer to the <a href="/old/Cumulus_Linux_36/Lightweight_Network_Virtualization_Overview.html">LNV chapter</a> for more detailed configuration information. Configurations for the demonstration are provided below.</p></td>
</tr>
<tr class="even">
<td><p>STP</p></td>
<td><p>You must enable <a href="/old/Cumulus_Linux_36/#src-8362217_LNVVXLANActive-ActiveMode-bpdu">BPDU filter and BPDU guard</a> in the VXLAN interfaces if <a href="/old/Cumulus_Linux_36/#">STP</a> is enabled in the bridge that is connected to the VXLAN.<br />
Configurations for the demonstration are provided below.</p></td>
</tr>
</tbody>
</table>

### Active-active VTEP Anycast IP Behavior

You must provision each individual switch within an MLAG pair with a
virtual IP address in the form of an anycast IP address for VXLAN
data-path termination. The VXLAN termination address is an anycast IP
address that you configure as a `clagd` parameter
(`clagd-vxlan-anycast-ip`) under the loopback interface. `clagd`
dynamically adds and removes this address as the loopback interface
address as follows:

|   |                                                                                                                                                                                                                                                          |
| - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | When the switches boot up,`  ifupdown2  `places all VXLAN interfaces in a [PROTO\_DOWN state](/old/Cumulus_Linux_36/#src-8362217_LNVVXLANActive-ActiveMode-proto_down). The configured anycast addresses are not configured yet.                         |
| 2 | MLAG peering takes place and a successful VXLAN interface consistency check between the switches occurs.                                                                                                                                                 |
| 3 | `clagd` (the daemon responsible for MLAG) adds the anycast address to the loopback interface. It then changes the local IP address of the VXLAN interface from a unique address to the anycast virtual IP address and puts the interface in an UP state. |

### Failure Scenario Behaviors

| Scenario                                                                            | Behavior                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The peer link goes down.                                                            | The primary MLAG switch continues to keep all VXLAN interfaces up with the anycast IP address while the secondary switch brings down all VXLAN interfaces and places them in a PROTO\_DOWN state. The secondary MLAG switch removes the anycast IP address from the loopback interface and changes the local IP address of the VXLAN interface to the configured unique IP address. |
| One of the switches goes down.                                                      | The other operational switch continues to use the anycast IP address.                                                                                                                                                                                                                                                                                                               |
| `clagd` is stopped.                                                                 | All VXLAN interfaces are put in a PROTO\_DOWN state. The anycast IP address is removed from the loopback interface and the local IP addresses of the VXLAN interfaces are changed from the anycast IP address to unique non-virtual IP addresses.                                                                                                                                   |
| MLAG peering could not be established between the switches.                         | `clagd` brings up all the VXLAN interfaces after the reload timer expires with the configured anycast IP address. This allows the VXLAN interface to be up and running on both switches even though peering is not established.                                                                                                                                                     |
| When the peer link goes down but the peer switch is up (the backup link is active). | All VXLAN interfaces are put into a PROTO\_DOWN state on the secondary switch.                                                                                                                                                                                                                                                                                                      |
| A configuration mismatch between the MLAG switches                                  | The VXLAN interface is placed into a PROTO\_DOWN state on the secondary switch.                                                                                                                                                                                                                                                                                                     |

### Checking VXLAN Interface Configuration Consistency

The LNV active-active configuration for a given VXLAN interface must be
consistent between the MLAG switches for correct traffic behavior. MLAG
ensures that the configuration consistency is met before bringing up the
VXLAN interfaces.

The consistency checks include:

  - The anycast virtual IP address for VXLAN termination must be the
    same on each pair of switches.

  - A VXLAN interface with the same VXLAN ID must be configured and
    administratively up on both switches.

You can use the `clagctl` command to check if any VXLAN switches are in
a PROTO\_DOWN state.

### Configuring the Anycast IP Address

With MLAG peering, both switches use an anycast IP address for VXLAN
encapsulation and decapsulation. This allows remote VTEPs to learn the
host MAC addresses attached to the MLAG switches against one logical
VTEP, even though the switches independently encapsulate and decapsulate
layer 2 traffic originating from the host. You can configure the anycast
address under the loopback interface, as shown below.

{{%imgOld 0 %}}

**leaf01:** `/etc/network/interfaces snippet`

``` 
                   
auto lo
iface lo inet loopback
  address 10.0.0.11/32
  vxrd-src-ip 10.0.0.11
  vxrd-svcnode-ip 10.10.10.10
  clagd-vxlan-anycast-ip 10.10.10.20
   
    
```

**leaf02:** `/etc/network/interfaces snippet`

``` 
                   
auto lo
iface lo inet loopback
  address 10.0.0.12/32
  vxrd-src-ip 10.0.0.12
  vxrd-svcnode-ip 10.10.10.10
  clagd-vxlan-anycast-ip 10.10.10.20
   
    
```

#### Explanation of Variables

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Variable</p></th>
<th><p>Explanation</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><pre><code>vxrd-src-ip</code></pre></td>
<td><p>The unique IP address to which the <code>vxrd</code> binds.</p></td>
</tr>
<tr class="even">
<td><pre><code>vxrd-svcnode-ip</code></pre></td>
<td><p>The service node anycast IP address in the topology. In this demonstration, this is an anycast IP address shared by both spine switches.</p></td>
</tr>
<tr class="odd">
<td><pre><code>clagd-vxlan-anycast-ip</code></pre></td>
<td><p>The anycast address for the MLAG pair to share and bind to when MLAG is up and running.</p></td>
</tr>
</tbody>
</table>

## Considerations for Virtual Topologies Using Cumulus VX

### Node ID

`vxrd` requires a unique `node_id` for each individual switch. This
`node_id` is based off the first interface's MAC address; when using
certain virtual topologies like Vagrant, both leaf switches within an
MLAG pair can generate the same exact unique `node_id`. You must
configure one of the `node_id`s manually (or make sure the first
interface always has a unique MAC address), as they are not unique.

To verify the `node_id` that gets configured by your switch, use the
`vxrdctl get config` command:

``` 
                   
cumulus@leaf01$ vxrdctl get config
{
    "concurrency": 1000,
    "config_check_rate": 60,
    "debug": false,
    "eventlet_backdoor_port": 9000,
    "head_rep": true,
    "holdtime": 90,
    "logbackupcount": 14,
    "logdest": "syslog",
    "logfilesize": 512000,
    "loglevel": "INFO",
    "max_packet_size": 1500,
    "node_id": 13,
    "pidfile": "/var/run/vxrd.pid",
    "refresh_rate": 3,
    "src_ip": "10.2.1.50",
    "svcnode_ip": "10.10.10.10",
    "udsfile": "/var/run/vxrd.sock",
    "vxfld_port": 10001
}
   
    
```

To set the `node_id` manually:

1.  Open `/etc/vxrd.conf` in a text editor.

2.  Set the `node_id` value within the `common` section, then save the
    file:
    
    ``` 
                       
    [common]
    node_id = 13
       
        
    ```

{{%notice note%}}

Ensure that each leaf has a separate `node_id` so that LNV can function
correctly.

{{%/notice%}}

### Bonds with Vagrant

Bonds (or LACP Etherchannels) fail to work in a Vagrant setup unless the
link is set to *promiscuous* mode. This is a limitation on virtual
topologies only, and is not needed on real hardware.

``` 
                   
auto swp49
iface swp49
  #for vagrant so bonds work correctly
  post-up ip link set $IFACE promisc on
 
auto swp50
iface swp50
  #for vagrant so bonds work correctly
  post-up ip link set $IFACE promisc on
   
    
```

For more information on using Cumulus VX and Vagrant, refer to the
[Cumulus VX
documentation](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/VX).

## Troubleshooting with LNV Active-active

In addition to [troubleshooting for single-attached
LNV](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Lightweight+Network+Virtualization+-+LNV#LightweightNetworkVirtualization-LNV-VerificationandTroubleshooting),
there is now the MLAG daemon (clagd) to consider. The `clagctl` command
gives the output of MLAG behavior and any inconsistencies that might
arise between a MLAG pair.

``` 
                   
cumulus@leaf01$ clagctl
The peer is alive
     Our Priority, ID, and Role: 32768 44:38:39:00:00:35 primary
    Peer Priority, ID, and Role: 32768 44:38:39:00:00:36 secondary
          Peer Interface and IP: peerlink.4094 169.254.1.2
               VxLAN Anycast IP: 10.10.10.30
                      Backup IP: 10.0.0.14 (inactive)
                     System MAC: 44:38:39:ff:40:95
CLAG Interfaces
Our Interface      Peer Interface     CLAG Id   Conflicts              Proto-Down Reason
----------------   ----------------   -------   --------------------   -----------------
           bond0   bond0              1         -                      -
         vxlan20   vxlan20            -         -                      -
          vxlan1   vxlan1             -         -                      -
         vxlan10   vxlan10            -         -                      -
   
    
```

The additions to normal MLAG behavior are the following:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Output</p></th>
<th><p>Explanation</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>VXLAN Anycast IP: 10.10.10.30</p></td>
<td><p>The anycast IP address being shared by the MLAG pair for VTEP termination is in use and is 10.10.10.30.</p></td>
</tr>
<tr class="even">
<td><pre><code>Conflicts: -</code></pre></td>
<td><p>There are no conflicts for this MLAG Interface.</p></td>
</tr>
<tr class="odd">
<td><pre><code>Proto-Down Reason: -</code></pre></td>
<td><p>The VXLAN is up and running (there is no Proto-Down).</p></td>
</tr>
</tbody>
</table>

In the next example the `vxlan-id` on VXLAN10 is switched to the wrong
`vxlan-id`. When the `clagctl` command is run, you see that VXLAN10 goes
down because this switch is the secondary switch and the peer switch
takes control of VXLAN. The reason code is `vxlan-single` indicating
that there is a `vxlan-id` mis-match on VXLAN10

``` 
                   
cumulus@leaf02$ clagctl
The peer is alive
    Peer Priority, ID, and Role: 32768 44:38:39:00:00:11 primary
     Our Priority, ID, and Role: 32768 44:38:39:00:00:12 secondary
          Peer Interface and IP: peerlink.4094 169.254.1.1
               VxLAN Anycast IP: 10.10.10.20
                      Backup IP: 10.0.0.11 (inactive)
                     System MAC: 44:38:39:ff:40:94
CLAG Interfaces
Our Interface      Peer Interface     CLAG Id   Conflicts              Proto-Down Reason
----------------   ----------------   -------   --------------------   -----------------
           bond0   bond0              1         -                      -
         vxlan20   vxlan20            -         -                      -
          vxlan1   vxlan1             -         -                      -
         vxlan10   -                  -         -                      vxlan-single
   
    
```

## Caveats and Errata

  - Do not reuse the VLAN used for the peer link layer 3 subinterface
    for any other interface in the system. A high VLAN ID value is
    recommended. For more information on VLAN ID ranges, refer to [the
    section
    above](/old/Cumulus_Linux_36/#src-8362217_LNVVXLANActive-ActiveMode-range).

  - Active-active mode only works with LNV in this release. Integration
    with controller-based VXLANs, such as VMware NSX and Midokura
    MidoNet will be supported in the future.

## Related Information

  - [Network virtualization chapter, Cumulus Linux user
    guide](/old/Cumulus_Linux_36/Network_Virtualization.html)
    
      - [Static VXLAN
        Configurations](/old/Cumulus_Linux_36/Static_VXLAN_Configurations.html)
        
          - [Static VXLAN
            Tunnels](/old/Cumulus_Linux_36/Static_VXLAN_Tunnels.html)
        
          - [Static MAC Bindings with
            VXLAN](/old/Cumulus_Linux_36/Static_MAC_Bindings_with_VXLAN.html)
    
      - [Lightweight Network Virtualization
        Overview](/old/Cumulus_Linux_36/Lightweight_Network_Virtualization_Overview.html)
        
          - [LNV VXLAN Active-Active Mode](/old/Cumulus_Linux_36/#)
        
          - [LNV Full
            Example](/old/Cumulus_Linux_36/LNV_Full_Example.html)
    
      - [Ethernet Virtual Private Network -
        EVPN](/old/Cumulus_Linux_36/Ethernet_Virtual_Private_Network_-_EVPN.html)
    
      - [VXLAN Routing](/old/Cumulus_Linux_36/VXLAN_Routing.html)
    
      - [Virtualization
        Integrations](/old/Cumulus_Linux_36/Virtualization_Integrations.html)
        
          - [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html)
        
          - [Integrating Hardware VTEPs with VMware
            NSX-V](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_VMware_NSX-V.html)
        
          - [Integrating Hardware VTEPs with VMware
            NSX](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_VMware_NSX.html)
    
      - [VXLAN Scale](/old/Cumulus_Linux_36/VXLAN_Scale.html)
    
      - [Hybrid Cloud Connectivity with QinQ and
        VXLANs](/old/Cumulus_Linux_36/Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs.html)
