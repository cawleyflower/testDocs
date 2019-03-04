# Monitor Data Link Layer Devices and Protocols

With NetQ, a network administrator can monitor OSI Layer 2 devices and
protocols, including switches, bridges, link control, and physical media
access. Keeping track of the various data link layer devices in your
network ensures consistent and error-free communications between
devices. NetQ provides the ability to: 

-   Monitor and validate device and protocol configurations
-   View available communication paths between devices

It helps answer questions such as:

-   Is a VLAN misconfigured? 

-   Is there an MTU mismatch in my network?

-   Is MLAG configured correctly?

-   Is there an STP loop?

-   Can device A reach device B using MAC addresses?

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Monitor LLDP
    Operation](#MonitorDataLinkLayerDevicesandProtocols-MonitorLLDPOperation)
    -   [View LLDP Information for All
        Devices](#MonitorDataLinkLayerDevicesandProtocols-ViewLLDPInformationforAllDevices)
-   [Check for MTU
    Inconsistencies](#MonitorDataLinkLayerDevicesandProtocols-CheckforMTUInconsistencies)
-   [Monitor VLAN
    Configurations](#MonitorDataLinkLayerDevicesandProtocols-MonitorVLANConfigurations)
    -   [View VLAN Information for All
        Devices](#MonitorDataLinkLayerDevicesandProtocols-ViewVLANInformationforAllDevices)
    -   [View VLAN Interface
        Information](#MonitorDataLinkLayerDevicesandProtocols-ViewVLANInterfaceInformation)
    -   [View MAC Addresses Associated with a
        VLAN](#MonitorDataLinkLayerDevicesandProtocols-ViewMACAddressesAssociatedwithaVLAN)
    -   [View MAC Addresses Associated with an Egress
        Port](#MonitorDataLinkLayerDevicesandProtocols-ViewMACAddressesAssociatedwithanEgressPort)
    -   [View the MAC Addresses Associated with VRR
        Configurations](#MonitorDataLinkLayerDevicesandProtocols-ViewtheMACAddressesAssociatedwithVRRConfigurations)
-   [Monitor MLAG
    Configurations](#MonitorDataLinkLayerDevicesandProtocols-MonitorMLAGConfigurations)
    -   [View MLAG Configuration and Status for all
        Devices](#MonitorDataLinkLayerDevicesandProtocols-ViewMLAGConfigurationandStatusforallDevices)
    -   [View MLAG Configuration and Status for Given
        Devices](#MonitorDataLinkLayerDevicesandProtocols-ViewMLAGConfigurationandStatusforGivenDevices)
-   [Monitor Time Synchronization Status for
    Devices](#MonitorDataLinkLayerDevicesandProtocols-MonitorTimeSynchronizationStatusforDevices)
-   [Validate Paths between
    Devices](#MonitorDataLinkLayerDevicesandProtocols-ValidatePathsbetweenDevices)
    -   [View Paths between Two Switches with Pretty
        Output](#MonitorDataLinkLayerDevicesandProtocols-ViewPathsbetweenTwoSwitcheswithPrettyOutput)
    -   [View Paths between Two Switches with Detailed
        Output](#MonitorDataLinkLayerDevicesandProtocols-ViewPathsbetweenTwoSwitcheswithDetailedOutput)

## Monitor LLDP Operation

LLDP is used by network devices for advertising their identity,
capabilities, and neighbors on a LAN. You can view this information for
one or more devices. You can also view the information at an earlier
point in time or view changes that have occurred to the information
during a specified timeframe. NetQ enables you to view LLDP information
for your devices using the netq show lldp command. The syntax for this
command is:

``` text
netq [<hostname>] show lldp [<remote-physical-interface>] [around <text-time>] [json]
netq [<hostname>] show events [level info|level error|level warning|level critical|level debug] type lldp [between <text-time> and <text-endtime>] [json]
```

### **View LLDP Information for All Devices**

This example shows the interface and peer information that is advertised
for each device. 

``` text
cumulus@switch:~$ netq show lldp 

Matching lldp records:
Hostname          Interface                 Peer Hostname     Peer Interface            Last Changed
----------------- ------------------------- ----------------- ------------------------- -------------------------
exit01            swp1                      edge01            swp5                      Thu Feb  7 18:31:53 2019
exit01            swp2                      edge02            swp5                      Thu Feb  7 18:31:53 2019
exit01            swp3                      spine01           swp9                      Thu Feb  7 18:31:53 2019
exit01            swp4                      spine02           swp9                      Thu Feb  7 18:31:53 2019
exit01            swp5                      spine03           swp9                      Thu Feb  7 18:31:53 2019
exit01            swp6                      firewall01        mac:00:02:00:00:00:11     Thu Feb  7 18:31:53 2019
exit01            swp7                      firewall02        swp3                      Thu Feb  7 18:31:53 2019
exit02            swp1                      edge01            swp6                      Thu Feb  7 18:31:49 2019
exit02            swp2                      edge02            swp6                      Thu Feb  7 18:31:49 2019
exit02            swp3                      spine01           swp10                     Thu Feb  7 18:31:49 2019
exit02            swp4                      spine02           swp10                     Thu Feb  7 18:31:49 2019
exit02            swp5                      spine03           swp10                     Thu Feb  7 18:31:49 2019
exit02            swp6                      firewall01        mac:00:02:00:00:00:12     Thu Feb  7 18:31:49 2019
exit02            swp7                      firewall02        swp4                      Thu Feb  7 18:31:49 2019
firewall01        swp1                      edge01            swp14                     Thu Feb  7 18:31:26 2019
firewall01        swp2                      edge02            swp14                     Thu Feb  7 18:31:26 2019
firewall01        swp3                      exit01            swp6                      Thu Feb  7 18:31:26 2019
firewall01        swp4                      exit02            swp6                      Thu Feb  7 18:31:26 2019
firewall02        swp1                      edge01            swp15                     Thu Feb  7 18:31:31 2019
firewall02        swp2                      edge02            swp15                     Thu Feb  7 18:31:31 2019
firewall02        swp3                      exit01            swp7                      Thu Feb  7 18:31:31 2019
firewall02        swp4                      exit02            swp7                      Thu Feb  7 18:31:31 2019
server11          swp1                      leaf01            swp7                      Thu Feb  7 18:31:43 2019
server11          swp2                      leaf02            swp7                      Thu Feb  7 18:31:43 2019
server11          swp3                      edge01            swp16                     Thu Feb  7 18:31:43 2019
server11          swp4                      edge02            swp16                     Thu Feb  7 18:31:43 2019
server12          swp1                      leaf01            swp8                      Thu Feb  7 18:31:47 2019
server12          swp2                      leaf02            swp8                      Thu Feb  7 18:31:47 2019
```

## Check for MTU Inconsistencies

The maximum transmission unit (MTU) determines the largest size packet
or frame that can be transmitted across a given communication link. When
the MTU is not configured to the same value on both ends of the link,
communication problems can occur. With NetQ, you can verify that the MTU
is correctly specified for each link using the netq check mtu command.

This example shows that four switches have inconsistently specified link
MTUs. Now the network administrator or operator can reconfigure the
switches and eliminate the communication issues associated with this
misconfiguration.

``` text
cumulus@switch:~$ netq check mtu
Checked Nodes: 15, Checked Links: 215, Failed Nodes: 4, Failed Links: 7
MTU mismatch found on following links
Hostname          Interface                 MTU    Peer              Peer Interface            Peer MTU Error
----------------- ------------------------- ------ ----------------- ------------------------- -------- ---------------
spine01           swp30                     9216   exit01            swp51                     1500     MTU Mismatch
exit01            swp51                     1500   spine01           swp30                     9216     MTU Mismatch
spine01           swp29                     9216   exit02            swp51                     1500     MTU Mismatch
exit02            -                         -      -                 -                         -        Rotten Agent
exit01            swp52                     1500   spine02           swp30                     9216     MTU Mismatch
spine02           swp30                     9216   exit01            swp52                     1500     MTU Mismatch
spine02           swp29                     9216   exit02            swp52                     1500     MTU Mismatch
```

## Monitor VLAN Configurations

 A VLAN (Virtual Local Area Network) enables devices on one or more LANs
to communicate as if they were on the same network, without being
physically connected. The VLAN enables network administrators to
partition a network for functional or security requirements without
changing physical infrastructure. With NetQ, you can view the operation
of VLANs for one or all devices. You can also view the information at an
earlier point in time or view changes that have occurred to the
information during a specified timeframe. NetQ enables you to view basic
VLAN information for your devices using the netq show vlan command.
Additional show commands enable you to view VLAN information associated
with interfaces and MAC addresses. The syntax for these commands is:

``` text
netq show interfaces type (bond|bridge|eth|loopback|macvlan|swp|vlan|vrf|vxlan) [state <remote-interface-state>] [around <text-time>] [json]
netq <hostname> show interfaces type (bond|bridge|eth|loopback|macvlan|swp|vlan|vrf|vxlan) [state <remote-interface-state>] [around <text-time>] [count] [json]
netq [<hostname>] show events [level info | level error | level warning | level critical | level debug] type vlan [between <text-time> and <text-endtime>] [json]
netq show macs [<mac>] [vlan <1-4096>] [origin] [around <text-time>] [json]
netq <hostname> show macs [<mac>] [vlan <1-4096>] [origin | count] [around <text-time>] [json]
netq <hostname> show macs egress-port <egress-port> [<mac>] [vlan <1-4096>] [origin] [around <text-time>] [json]
netq [<hostname>] show vlan [<1-4096>] [around <text-time>] [json]
```

When entering a time value, you must include a numeric value *and* the
unit of measure:

-   d: day(s)
-   h: hour(s)
-   m: minute(s)
-   s: second(s)
-   now

For time ranges, the `<text-time>` is the most recent time and the
`<text-endtime>` is the oldest time. The values do not have to have the
same unit of measure.

### **View VLAN Information for All Devices**

This example shows the VLANs configured across your network. 

``` text
cumulus@switch:~$ netq show vlan
Matching vlan records:
Hostname          VLANs                     SVIs                      Last Changed
----------------- ------------------------- ------------------------- -------------------------
exit01            4001                      4001                      Thu Feb  7 18:31:38 2019
exit02            4001                      4001                      Thu Feb  7 18:31:38 2019
leaf01            1,13,24,4001              13 24 4001                Thu Feb  7 18:31:38 2019
leaf02            1,13,24,4001              13 24 4001                Thu Feb  7 18:31:38 2019
leaf03            1,13,24,4001              13 24 4001                Thu Feb  7 18:31:38 2019
leaf04            1,13,24,4001              13 24 4001                Thu Feb  7 18:31:38 2019
```

### View VLAN Interface Information

You can view the current or past state of the interfaces associated with
VLANs using the `netq show interfaces` command. This provides the status
of the interface, its specified MTU, whether it is running over a VRF,
and the last time it was changed. 

``` text
cumulus@switch:~$ netq show interfaces type vlan 
Matching link records:
Hostname          Interface                 Type             State      VRF             Details                             Last Changed
----------------- ------------------------- ---------------- ---------- --------------- ----------------------------------- -------------------------
exit01            vlan4001                  vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
exit02            vlan4001                  vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf01            peerlink.4094             vlan             up         default         MTU:9000                            Fri Feb  8 00:24:28 2019
leaf01            vlan13                    vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf01            vlan24                    vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf01            vlan4001                  vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf02            peerlink.4094             vlan             up         default         MTU:9000                            Fri Feb  8 00:24:28 2019
leaf02            vlan13                    vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf02            vlan24                    vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf02            vlan4001                  vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf03            peerlink.4094             vlan             up         default         MTU:9000                            Fri Feb  8 00:24:28 2019
leaf03            vlan13                    vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf03            vlan24                    vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf03            vlan4001                  vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf04            peerlink.4094             vlan             up         default         MTU:9000                            Fri Feb  8 00:24:28 2019
leaf04            vlan13                    vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf04            vlan24                    vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
leaf04            vlan4001                  vlan             up         vrf1            MTU:1500                            Fri Feb  8 00:24:28 2019
```

### View MAC Addresses Associated with a VLAN

You can determine the MAC addresses associated with a given VLAN using
the `netq show macs vlan` command. The command also provides the
hostname of the devices, the egress port for the interface, whether the
MAC address originated from the given device, whether it learns the MAC
address from the peer (remote=yes), and the last time the
configuration was changed.

This example shows the MAC addresses associated with *VLAN13*.

``` text
cumulus@switch:~$ netq show macs vlan 13 
Matching mac records:
Origin MAC Address        VLAN   Hostname          Egress Port          Remote Last Changed
------ ------------------ ------ ----------------- -------------------- ------ -------------------------
no     00:03:00:11:11:01  13     leaf01            bond01:server01      no     Fri Feb  8 00:24:28 2019
no     00:03:00:11:11:01  13     leaf02            bond01:server01      no     Fri Feb  8 00:24:28 2019
no     00:03:00:11:11:01  13     leaf03            vni13:leaf01         yes    Fri Feb  8 00:24:28 2019
no     00:03:00:11:11:01  13     leaf04            vni13:leaf01         yes    Fri Feb  8 00:24:28 2019
no     00:03:00:33:33:01  13     leaf01            vni13:10.0.0.134     yes    Fri Feb  8 00:24:28 2019
no     00:03:00:33:33:01  13     leaf02            vni13:10.0.0.134     yes    Fri Feb  8 00:24:28 2019
no     00:03:00:33:33:01  13     leaf03            bond03:server03      no     Fri Feb  8 00:24:28 2019
no     00:03:00:33:33:01  13     leaf04            bond03:server03      no     Fri Feb  8 00:24:28 2019
no     02:03:00:11:11:01  13     leaf01            bond01:server01      no     Fri Feb  8 00:24:28 2019
no     02:03:00:11:11:01  13     leaf02            bond01:server01      no     Fri Feb  8 00:24:28 2019
no     02:03:00:11:11:01  13     leaf03            vni13:leaf01         yes    Fri Feb  8 00:24:28 2019
no     02:03:00:11:11:01  13     leaf04            vni13:leaf01         yes    Fri Feb  8 00:24:28 2019
no     02:03:00:11:11:02  13     leaf01            bond01:server01      no     Fri Feb  8 00:24:28 2019
no     02:03:00:11:11:02  13     leaf02            bond01:server01      no     Fri Feb  8 00:24:28 2019
no     02:03:00:11:11:02  13     leaf03            vni13:leaf01         yes    Fri Feb  8 00:24:28 2019
no     02:03:00:11:11:02  13     leaf04            vni13:leaf01         yes    Fri Feb  8 00:24:28 2019
no     02:03:00:33:33:01  13     leaf01            vni13:10.0.0.134     yes    Fri Feb  8 00:24:28 2019
no     02:03:00:33:33:01  13     leaf02            vni13:10.0.0.134     yes    Fri Feb  8 00:24:28 2019
no     02:03:00:33:33:01  13     leaf03            bond03:server03      no     Fri Feb  8 00:24:28 2019
no     02:03:00:33:33:01  13     leaf04            bond03:server03      no     Fri Feb  8 00:24:28 2019
no     02:03:00:33:33:02  13     leaf01            vni13:10.0.0.134     yes    Fri Feb  8 00:24:28 2019
no     02:03:00:33:33:02  13     leaf02            vni13:10.0.0.134     yes    Fri Feb  8 00:24:28 2019
no     02:03:00:33:33:02  13     leaf03            bond03:server03      no     Fri Feb  8 00:24:28 2019
no     02:03:00:33:33:02  13     leaf04            bond03:server03      no     Fri Feb  8 00:24:28 2019
yes    44:38:39:00:00:03  13     leaf01            bridge               no     Fri Feb  8 00:24:28 2019
yes    44:38:39:00:00:15  13     leaf02            bridge               no     Fri Feb  8 00:24:28 2019
yes    44:38:39:00:00:23  13     leaf03            bridge               no     Fri Feb  8 00:24:28 2019
yes    44:38:39:00:00:5c  13     leaf04            bridge               no     Fri Feb  8 00:24:28 2019
yes    44:39:39:ff:00:13  13     leaf01            bridge               no     Fri Feb  8 00:24:28 2019
yes    44:39:39:ff:00:13  13     leaf02            bridge               no     Fri Feb  8 00:24:28 2019
yes    44:39:39:ff:00:13  13     leaf03            bridge               no     Fri Feb  8 00:24:28 2019
yes    44:39:39:ff:00:13  13     leaf04            bridge               no     Fri Feb  8 00:24:28 2019
```

### View MAC Addresses Associated with an Egress Port

You can filter that information down to just the MAC addresses that are
associated with a given VLAN that use a particular egress port. This
example shows MAC addresses associated with the *leaf03* switch and
*VLAN 13* that use the *bridge* port.

``` text
cumulus@switch:~$ netq leaf03 show macs egress-port bridge vlan 13
Matching mac records:
Origin MAC Address        VLAN   Hostname          Egress Port          Remote Last Changed
------ ------------------ ------ ----------------- -------------------- ------ -------------------------
yes    44:38:39:00:00:23  13     leaf03            bridge               no     Fri Feb  8 00:24:28 2019
yes    44:39:39:ff:00:13  13     leaf03            bridge               no     Fri Feb  8 00:24:28 2019
```

### View the MAC Addresses Associated with VRR Configurations

You can view all of the MAC addresses associated with your VRR (virtual
router reflector) interface configuration using the
`netq show interfaces type macvlan` command. This is useful for
determining if the specified MAC address inside a VLAN is the same or
different across your VRR configuration. 

``` text
cumulus@switch:~$ netq show interfaces type macvlan
Matching link records:
Hostname          Interface                 Type             State      VRF             Details                             Last Changed
----------------- ------------------------- ---------------- ---------- --------------- ----------------------------------- -------------------------
leaf01            vlan13-v0                 macvlan          up         vrf1            MAC: 44:39:39:ff:00:13,             Fri Feb  8 00:28:09 2019
                                                                                        Mode: Private
leaf01            vlan24-v0                 macvlan          up         vrf1            MAC: 44:39:39:ff:00:24,             Fri Feb  8 00:28:09 2019
                                                                                        Mode: Private
leaf02            vlan13-v0                 macvlan          up         vrf1            MAC: 44:39:39:ff:00:13,             Fri Feb  8 00:28:09 2019
                                                                                        Mode: Private
leaf02            vlan24-v0                 macvlan          up         vrf1            MAC: 44:39:39:ff:00:24,             Fri Feb  8 00:28:09 2019
                                                                                        Mode: Private
leaf03            vlan13-v0                 macvlan          up         vrf1            MAC: 44:39:39:ff:00:13,             Fri Feb  8 00:28:09 2019
                                                                                        Mode: Private
leaf03            vlan24-v0                 macvlan          up         vrf1            MAC: 44:39:39:ff:00:24,             Fri Feb  8 00:28:09 2019
                                                                                        Mode: Private
leaf04            vlan13-v0                 macvlan          up         vrf1            MAC: 44:39:39:ff:00:13,             Fri Feb  8 00:28:09 2019
                                                                                        Mode: Private
leaf04            vlan24-v0                 macvlan          up         vrf1            MAC: 44:39:39:ff:00:24,             Fri Feb  8 00:28:09 2019
                                                                                        Mode: Private
```

## Monitor MLAG Configurations

Multi-Chassis Link Aggregation (MLAG) is used to enable a server or
switch with a two-port bond (such as a link aggregation group/LAG,
EtherChannel, port group or trunk) to connect those ports to different
switches and operate as if they are connected to a single, logical
switch. This provides greater redundancy and greater system
throughput. Dual-connected devices can create LACP bonds that contain
links to each physical switch. Therefore, active-active links from the
dual-connected devices are supported even though they are connected to
two different physical switches.

MLAG or CLAG?

The Cumulus Linux implementation of MLAG is referred to by other vendors
as CLAG, MC-LAG or VPC. You will even see references to CLAG in Cumulus
Linux, including the management daemon, named `clagd`, and other options
in the code, such as `clag-id`, which exist for historical purposes. The
Cumulus Linux implementation is truly a multi-chassis link aggregation
protocol, so we call it MLAG.

For instructions on configuring MLAG, refer to
the [MLAG](https://docs.cumulusnetworks.com/display/DOCS/Multi-Chassis+Link+Aggregation+-+MLAG) topic
in the Cumulus Linux User Guide.

With NetQ, you can view the configuration and operation of devices using
MLAG using the `netq show clag` command. You can view the current
configuration and the configuration at a prior point in time, as well as
view any changes that have been made within a timeframe. The syntax for
the show command is:

``` text
netq [<hostname>] show clag [around <text-time>] [json]
netq [<hostname>] show events [level info|level error|level warning|level critical|level debug] type clag [between <text-time> and <text-endtime>] [json]
```

### View MLAG Configuration and Status for all Devices

This example shows the configuration and status of MLAG for all devices.
In this case, three MLAG pairs are seen between leaf11 and leaf12 (which
happens to be down), edge01(P) and edge02, and leaf21(P) and leaf22.

``` text
cumulus@switch:~$ netq show clag
Matching clag records:
Hostname          Peer              SysMac             State      Backup #Bond #Dual Last Changed
                                                                          s
----------------- ----------------- ------------------ ---------- ------ ----- ----- -------------------------
leaf11                              44:38:39:ff:ff:01  down       n/a    0     0     Thu Feb  7 18:30:49 2019
leaf12                              44:38:39:ff:ff:01  down       down   8     0     Thu Feb  7 18:30:53 2019
edge01(P)         edge02            00:01:01:10:00:01  up         up     25    25    Thu Feb  7 18:31:02 2019
edge02            edge01(P)         00:01:01:10:00:01  up         up     25    25    Thu Feb  7 18:31:15 2019
leaf21(P)         leaf22            44:38:39:ff:ff:02  up         up     8     8     Thu Feb  7 18:31:20 2019
leaf22            leaf21(P)         44:38:39:ff:ff:02  up         up     8     8     Thu Feb  7 18:31:30 2019
```

You can go back in time to see when this first MLAG pair went down.
These results indicate that the pair became disconnected some time in
the last five minutes.

``` text
cumulus@switch:~$ netq show clag around 5m
Matching clag records:
Hostname          Peer              SysMac             State      Backup #Bond #Dual Last Changed
                                                                         s
----------------- ----------------- ------------------ ---------- ------ ----- ----- -------------------------
edge01(P)         edge02            00:01:01:10:00:01  up         up     25    25    Thu Feb  7 18:31:30 2019
edge02            edge01(P)         00:01:01:10:00:01  up         up     25    25    Thu Feb  7 18:31:30 2019
leaf11(P)         leaf12            44:38:39:ff:ff:01  up         up     8     8     Thu Feb  7 18:31:30 2019
leaf12            leaf11(P)         44:38:39:ff:ff:01  up         up     8     8     Thu Feb  7 18:31:30 2019
leaf21(P)         leaf22            44:38:39:ff:ff:02  up         up     8     8     Thu Feb  7 18:31:30 2019
leaf22            leaf21(P)         44:38:39:ff:ff:02  up         up     8     8     Thu Feb  7 18:31:30 2019
```

### View MLAG Configuration and Status for Given Devices

This example shows that xxx device is up and MLAG properly configured
with a peer connection to yyy and 8 bonds, all of which are dual bonded.

``` text
cumulus@switch:~$ netq leaf22 show clag
Matching CLAG session records are:
Hostname          Peer              SysMac             State      Backup #Bond #Dual Last Changed
                                                                          s
----------------- ----------------- ------------------ ---------- ------ ----- ----- -------------------------
leaf22            leaf21(P)         44:38:39:ff:ff:02  up         up     8     8     Thu Feb  7 18:31:30 2019
```

When you're directly on the switch, you can run `clagctl` to get the
state: (VERIFY)

``` text
cumulus@switch:~$ sudo clagctl

The peer is alive
Peer Priority, ID, and Role: 4096 00:02:00:00:00:4e primary
Our Priority, ID, and Role: 8192 44:38:39:00:a5:38 secondary
Peer Interface and IP: peerlink-3.4094 169.254.0.9 
VxLAN Anycast IP: 36.0.0.20
Backup IP: 27.0.0.20 (active)
System MAC: 44:38:39:ff:ff:01

CLAG Interfaces
Our Interface    Peer Interface   CLAG Id Conflicts            Proto-Down Reason
---------------- ---------------- ------- -------------------- -----------------
vx-38            vx-38            -       -                    - 
vx-33            vx-33            -       -                    - 
hostbond4        hostbond4        1       -                    - 
hostbond5        hostbond5        2       -                    - 
vx-37            vx-37            -       -                    - 
vx-36            vx-36            -       -                    - 
vx-35            vx-35            -       -                    - 
vx-34            vx-34            -       -                    -
```

## Monitor Time Synchronization Status for Devices

It is important that the switches and hosts remain in time
synchronization with the NetQ Platform to ensure collected data is
properly captured and processed. You can use the netq show ntp command
to view the time synchronization status for all devices or filter for
devices that are either in synchronization or out of synchronization,
currently or at a time in the past. The syntax for the show command is:

``` text
netq [<hostname>] show ntp [out-of-sync|in-sync] [around <text-time>] [json]
netq [<hostname>] show events [level info|level error|level warning|level critical|level debug] type ntp [between <text-time> and <text-endtime>] [json]
```

This example shows the time synchronization status for all devices in
the network.

``` text
cumulus@switch:~$ netq show ntp

Matching ntp records:
Hostname          NTP Sync Current Server    Stratum NTP App
----------------- -------- ----------------- ------- ---------------------
edge01            yes      services01.it.c   3       ntpq
exit01            yes      time.tritn.com    2       ntpq
exit02            yes      time.tritn.com    2       ntpq
internet          no       -                 16      ntpq
leaf01            yes      services01.it.c   2       ntpq
leaf02            yes      services01.it.c   2       ntpq
leaf03            yes      107.181.191.189   2       ntpq
leaf04            yes      grom.polpo.org    2       ntpq
oob-mgmt-server   yes      linode227395.st   2       ntpq
server01          yes      192.168.0.254     3       ntpq
server02          yes      192.168.0.254     3       ntpq
server03          yes      192.168.0.254     3       ntpq
server04          yes      192.168.0.254     3       ntpq
spine01           yes      107.181.191.189   2       ntpq
spine02           yes      t2.time.bf1.yah   2       ntpq
```

This example shows all devices in the network that are out of time
synchronization, and consequently might need to be investigated.

``` text
cumulus@switch:~$ netq show ntp out-of-sync

Matching ntp records:
Hostname          NTP Sync Current Server    Stratum NTP App
----------------- -------- ----------------- ------- ---------------------
internet          no       -                 16      ntpq
```

This example shows the time synchronization status for leaf01.

``` text
cumulus@switch:~$ netq leaf01 show ntp

Matching ntp records:
Hostname          NTP Sync Current Server    Stratum NTP App
----------------- -------- ----------------- ------- ---------------------
leaf01            yes      kilimanjaro       2       ntpq
```

## Validate Paths between Devices

If you have VLANs configured, you can view the available paths between
two devices on the VLAN currently and at a time in the past using their
MAC addresses. You can view the output in one of three formats (*json,
pretty, *and* detail*). JSON output provides the output in a JSON file
format for ease of importing to other applications or software. Pretty
output lines up the paths in a pseudo-graphical manner to help visualize
multiple paths. Detail output is useful for traces with higher hop
counts where the pretty output wraps lines, making it harder to
interpret the results. The detail output displays a table with a row for
each path. 

To view the paths:

1.  Identify the MAC address and VLAN ID for the destination device
2.  Identify the IP address or hostname for the source device 
3.  Use the netq trace command to see the available paths between those
    devices. 

The trace command syntax is:

``` text
netq trace <mac> [vlan <1-4096>] from (<src-hostname>|<ip-src>) [vrf <vrf>] [around <text-time>] [json|detail|pretty] [debug]
```

The syntax requires the destination device address first, *&lt;mac&gt;*,
and then the source device address or hostname. Additionally, the *vlan*
keyword-value pair is required for layer 2 traces even though the syntax
indicates it is optional.

The tracing function only knows about addresses that have already been
learned. If you find that a path is invalid or incomplete, you may need
to ping the identified device so that its address becomes known.

### View Paths between Two Switches with Pretty Output

This example shows the available paths between a top of rack switch,
*tor-1*, and a server, *server11*. The request is to go through VLAN
*1001* from the VRF *vrf1*. The results include a summary of the trace,
including the total number of paths available, those with errors and
warnings, and the MTU of the paths. In this case, the results are
displayed in pseudo-graphical output. 

``` text
cumulus@switch:~$ netq trace 00:02:00:00:00:02 vlan 1001 from leaf01 vrf vrf1  pretty
Number of Paths: 4
Number of Paths with Errors: 0
Number of Paths with Warnings: 0
Path MTU: 9152
 leaf01 vni: 34 uplink-2 -- downlink-5 spine02 downlink-2 -- uplink-2 vni: 34 leaf12 hostbond4 -- swp2 server11  
               uplink-2 -- downlink-5 spine02 downlink-1 -- uplink-2 vni: 34 leaf11 hostbond4 -- swp1 server11  
 leaf01 vni: 34 uplink-1 -- downlink-5 spine01 downlink-2 -- uplink-1 vni: 34 leaf12 hostbond4 -- swp2 server11  
               uplink-1 -- downlink-5 spine01 downlink-1 -- uplink-1 vni: 34 leaf11 hostbond4 -- swp1 server11    
```

Alternately, you can use the IP address of the source device, as shown
in this example.

``` text
cumulus@redis-1:~$  netq trace 00:02:00:00:00:02 vlan 1001 from 10.0.0.8 vrf vrf1  pretty 
Number of Paths: 4
Number of Paths with Errors: 0
Number of Paths with Warnings: 0
Path MTU: 9152
 server11 swp1 -- swp5 <vlan1000> tor-1 <vlan1001> vni: 34 uplink-2 -- downlink-5 spine02 downlink-2 -- uplink-2 vni: 34 <vlan1001> leaf12 hostbond4 -- swp2 server11  
                                                           uplink-2 -- downlink-5 spine02 downlink-1 -- uplink-2 vni: 34 <vlan1001> leaf11 hostbond4 -- swp1 server11  
          swp1 -- swp5 <vlan1000> tor-1 <vlan1001> vni: 34 uplink-1 -- downlink-5 spine01 downlink-2 -- uplink-1 vni: 34 <vlan1001> leaf12 hostbond4 -- swp2 server11  
                                                           uplink-1 -- downlink-5 spine01 downlink-1 -- uplink-1 vni: 34 <vlan1001> leaf11 hostbond4 -- swp1 server11
```

### **View Paths between Two Switches with Detailed Output**

This example provides the same path information as the pretty output,
but displays the information in a tabular output.

``` text
cumulus@switch:~$ netq trace 00:02:00:00:00:02 vlan 1001 from 10.0.0.8 vrf vrf1 detail
Number of Paths: 4
Number of Paths with Errors: 0
Number of Paths with Warnings: 0
Path MTU: 9152
Id  Hop Hostname        InPort          InVlan InTunnel              InRtrIf         InVRF           OutRtrIf        OutVRF          OutTunnel             OutPort         OutVlan
--- --- --------------- --------------- ------ --------------------- --------------- --------------- --------------- --------------- --------------------- --------------- -------
1   1   server11                                                                                                                                           swp1            1000
    2   leaf01          swp5            1000                         vlan1000        vrf1            vlan1001        vrf1            vni: 34               uplink-2
    3   spine02         downlink-5                                   downlink-5      default         downlink-2      default                               downlink-2
    4   leaf12          uplink-2               vni: 34               vlan1001        vrf1                                                                  hostbond4       1001
    5   server11        swp2
--- --- --------------- --------------- ------ --------------------- --------------- --------------- --------------- --------------- --------------------- --------------- -------
2   1   server11                                                                                                                                           swp1            1000
    2   leaf01          swp5            1000                         vlan1000        vrf1            vlan1001        vrf1            vni: 34               uplink-2
    3   spine02         downlink-5                                   downlink-5      default         downlink-1      default                               downlink-1
    4   leaf11          uplink-2               vni: 34               vlan1001        vrf1                                                                  hostbond4       1001
    5   server11        swp1
--- --- --------------- --------------- ------ --------------------- --------------- --------------- --------------- --------------- --------------------- --------------- -------
3   1   server11                                                                                                                                           swp1            1000
    2   leaf01          swp5            1000                         vlan1000        vrf1            vlan1001        vrf1            vni: 34               uplink-1
    3   spine01         downlink-5                                   downlink-5      default         downlink-2      default                               downlink-2
    4   leaf12          uplink-1               vni: 34               vlan1001        vrf1                                                                  hostbond4       1001
    5   server11        swp2
--- --- --------------- --------------- ------ --------------------- --------------- --------------- --------------- --------------- --------------------- --------------- -------
4   1   server11                                                                                                                                           swp1            1000
    2   leaf01          swp5            1000                         vlan1000        vrf1            vlan1001        vrf1            vni: 34               uplink-1
    3   spine01         downlink-5                                   downlink-5      default         downlink-1      default                               downlink-1
    4   leaf11          uplink-1               vni: 34               vlan1001        vrf1                                                                  hostbond4       1001
    5   server11        swp1
--- --- --------------- --------------- ------ --------------------- --------------- --------------- --------------- --------------- --------------------- --------------- -------
```
