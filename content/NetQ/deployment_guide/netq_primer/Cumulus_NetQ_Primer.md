# Cumulus NetQ Primer

Cumulus® NetQ is a network operations tool set that provides actionable
insight into and operational intelligence about the health of the
entire Linux-based data center — from the container, virtual machine, or
host, all the way to the switch and port. Working hand-in-hand with
Cumulus Linux, NetQ enables organizations to validate network state,
both during regular operations and for post-mortem diagnostic analysis.
Running on Cumulus Linux switches and other certified systems — such as
Ubuntu®, Red Hat®, and CentOS hosts — NetQ captures network data and
other state information in real time, providing cloud architects and
network operations teams the ability to operate with visibility into the
entire network. It is integrated with container orchestrators and the
Netlink interface to make this happen. With NetQ, network operations
changes from a manual, reactive, box-by-box approach to an automated,
informed and agile one.

 The system uses a three-pronged approach to validating networks:

-   **Preventative Validation**: NetQ easily validates potential network
    configuration changes in a virtualized environment or lab using
    check, show and trace algorithms. NetQ eliminates the need to check
    switches or servers one by one and can reduce manual errors before
    they are rolled into production (one of the main causes of network
    downtime).
-   **Proactive Alerting**: NetQ detects faulty network states that can
    result in packet loss or connectivity issues, and alerts the user
    with precise fault location data for faster remediation, greatly
    improving network agility and reducing downtime costs.
-   **Diagnostic Troubleshooting**: NetQ provides the ability to trace
    network paths, replay the network state at a time in the past,
    review fabric-wide event change logs, and diagnose the root cause of
    state deviations.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes...

-   [Cumulus NetQ Components](#CumulusNetQPrimer-CumulusNetQComponents)
-   [NetQ Agents](#CumulusNetQPrimer-NetQAgents)
    -   [Switch Agents](#CumulusNetQPrimer-SwitchAgents)
    -   [Host Agents](#CumulusNetQPrimer-HostAgents)
-   [NetQ Platform](#CumulusNetQPrimer-NetQPlatform)
    -   [Data Aggregation
        Layer](#CumulusNetQPrimer-DataAggregationLayer)
    -   [Data Stores](#CumulusNetQPrimer-DataStores)
    -   [Real-time Streaming
        Layer](#CumulusNetQPrimer-Real-timeStreamingLayer)
    -   [Network Service Layer](#CumulusNetQPrimer-NetworkServiceLayer)
    -   [User Interfaces](#CumulusNetQPrimer-UserInterfaces)
-   [Data Center Network
    Deployments](#CumulusNetQPrimer-DataCenterNetworkDeployments)
    -   [Out-of-Band Management
        Deployment](#CumulusNetQPrimer-Out-of-BandManagementDeployment)
    -   [In-band Management
        Deployment](#CumulusNetQPrimer-In-bandManagementDeployment)
-   [NetQ Operation](#CumulusNetQPrimer-NetQOperation)
    -   [The NetQ Agent](#CumulusNetQPrimer-TheNetQAgent)
    -   [The NetQ Platform](#CumulusNetQPrimer-TheNetQPlatform)
    -   [Timestamps in NetQ](#CumulusNetQPrimer-TimestampsinNetQ)
    -   [Exporting NetQ Data](#CumulusNetQPrimer-ExportingNetQData)
    -   [Key File Locations](#CumulusNetQPrimer-KeyFileLocations)

## Cumulus NetQ Components

NetQ contains the following applications and key components:

-   Telemetry data collection and aggregation
    -   NetQ Switch Agents
    -   NetQ Host Agents
    -   Telemetry Aggregator 
    -   Database
-   Data streaming layer
-   Network service layer
-   User Interfaces

NetQ interfaces with event notification applications, third-party
analytics tools, and Cumulus Routing on the Host products.

Each of the NetQ components used to gather, store and process data about
the network state are described here.

## **NetQ Agents**

NetQ Agents are software installed and running on every
monitored *node* in the network — including Cumulus® Linux® switches,
Linux bare-metal hosts, and virtual machines. The NetQ Agents push
network data regularly  and event information immediately to the NetQ
Platform. 

### Switch Agents

The NetQ Agents running on Cumulus Linux switches gather the following
network data via [Netlink](https://tools.ietf.org/html/rfc3549):

-   Interfaces
-   IP addresses (v4 and v6)
-   IP routes (v4 and v6)
-   Links
-   Bridge FDB (forwarding database)
-   Neighbors (IPv4 and IPv6)

for the following protocols:

-   Bridging protocols: LLDP, STP, MLAG
-   Routing protocols: BGP, OSPF
-   Network virtualization: LNV, VXLAN, EVPN

The NetQ Agent is supported on Cumulus Linux 3.7.0 and later.

### Host Agents

The NetQ Agents running on hosts gather the same information as that for
switches, plus the following network data:

-   Network IP and MAC addresses
-   Container IP and MAC addresses

The NetQ Agent obtains container information by listening to the Docker
or Kubernetes orchestration tools.

The NetQ Agent is supported on hosts running Ubuntu 16.04, Red Hat®
Enterprise Linux 7, and CentOS 7 Operating Systems.

## **NetQ Platform**

The NetQ Platform performs the data collection, storage, and processing
for delivery to various user interfaces.

### Data Aggregation Layer

The data aggregation layer collects data coming from all of the NetQ
Agents. It then filters, compresses, and forwards the data to the
streaming layer. The server monitors for missing messages and also
monitors the NetQ Agents themselves, providing alarms when appropriate.
In addition to the telemetry data collected from the NetQ Agents, the
aggregation server collects information from the switches and hosts,
such as vendor, model, version, and basic operational state.

### Data Stores

Two types of data stores are used in the NetQ product. The first stores
the raw data, data aggregations, and discrete events needed for quick
response to data requests. The second stores data based on correlations,
transformations and processing of the raw data. 

### Real-time Streaming Layer

The streaming layer processes the incoming raw data from the aggregation
server in real time. It reads the metrics and stores them as a time
series, and triggers alarms based on anomaly detection, thresholds, and
events.

### Network Service Layer

The network service layer monitors services network-wide and stores
status details.

### User Interfaces

NetQ data is available through several user interfaces:

-   NetQ CLI (command line interface)
-   NetQ UI (graphical user interface)
-   NetQ RESTful API (representational state transfer application
    programming interface)
-   Logs

The CLI and UI query the RESTful API for the data to present. Standard
integrations can be configured to access syslog and to integrate with
third-party notification tools. 

## Data Center Network Deployments

There are two deployment types that are commonly deployed for network
management in the data center:

-   Out-of-Band Management
-   In-band Management

A summary of each type is provided here.

### Out-of-Band Management Deployment

Cumulus Networks recommends deploying NetQ on an out-of-band (OOB)
management network to separate network management traffic from standard
network data traffic, but it is not required. This figure shows a sample
CLOS-based network fabric design for a data center using an OOB
management network overlaid on top, where NetQ is deployed.

The physical *network* hardware includes:

-   Spine switches: where data is aggregated and distributed; also known
    as an aggregation switch, end-of-row (EOR) switch or distribution
    switch
-   Leaf switches: where servers connect to the network; also known as a
    Top of Rack (TOR) or access switch
-   Server hosts: where applications are hosted and data served to the
    user through the network
-   Exit switch: where connections to outside the data center occur;
    also known as Border Leaf or Service Leaf 
-   Edge server (optional): where the firewall is the demarcation point,
    peering may occur through the exit switch layer to Internet (PE)
    devices
-   Internet device (PE): where provider edge (PE) equipment
    communicates at layer 3 with the network fabric

The diagram shows physical connections (in the form of grey lines)
between Spine 01 and four Leaf devices and two Exit devices, and Spine
02 and the same four Leaf devices and two Exit devices. Leaf 01 and Leaf
02 are connected to each other over a peerlink and act as an MLAG pair
for Server 01 and Server 02. Leaf 03 and Leaf 04 are connected to each
other over a peerlink and act as an MLAG pair for Server 03 and Server
04. The Edge is connected to both Exit devices, and the Internet node is
connected to Exit 01.

![Data Center Network
Example](attachments/8365283/8365338.png "Data Center Network Example"){height="250"}

The physical *management* hardware includes:

-   OOB Mgmt Switch: aggregation switch that connects to all of the
    network devices through communications with the NetQ Agent on each
    node
-   NetQ Platform: hosts the telemetry software, database and user
    interfaces (refer to description above).

These switches are connected to each of the physical network devices
through a virtual network overlay, shown with purple lines.

![](attachments/8365283/9012712.png){width="820"}

### In-band Management Deployment

While not the preferred deployment method, you might choose to implement
NetQ within your data network. In this scenario, there is no overlay and
all traffic to and from the NetQ Agents and the NetQ Platform traverses
the data paths along with your regular network traffic. The roles of the
switches in the CLOS network are the same, except that the NetQ
Platform performs the aggregation function that the OOB management
switch performed. If your network goes down, you might not have access
to the NetQ Platform for troubleshooting.

![](attachments/8365283/9012713.png){width="820"}

## NetQ Operation

In any of the above deployments, NetQ offers preventative management and
proactive monitoring capabilities in the form of integration with
automation scripts and notification applications. It also provides
multiple user interfaces for diagnosing the network performance and
configuration. 

![](attachments/8365283/9013766.png){width="700"}

### The NetQ Agent

From a software perspective, a network switch has software associated
with the hardware platform, the operating system, and communications.
For data centers, the software on a Linux network switch would be
similar to the diagram shown here.

![](attachments/8365283/8365328.png){width="425"}

The NetQ Agent interacts with the various components and software on
switches and hosts and provides the gathered information to the NetQ
Platform. You can view the data using the NetQ CLI or UI.

The NetQ Agent polls the user space for information about the
performance of the various routing protocols and services that are
running on the switch. Cumulus Networks supports BGP and OSPF Free Range
Routing (FRR) protocols as well as static addressing. Cumulus Linux also
supports LLDP and MSTP among other protocols, and a variety of services
such as systemd and sensors. For hosts, the NetQ Agent also polls for
performance of containers managed with Docker or Kubernetes
orchestrators. All of this information is used to provide the current
health of the network and verify it is configured and operating
correctly.

For example, if the NetQ Agent learns that an interface has gone down, a
new BGP neighbor has been configured, or a container has moved, it
provides that information to the NetQ Platform. That information can
then be used to notify users of the operational state change through
various channels. By default, data is logged in the database, but you
can use the CLI (`netq show events`) or configure the Event Service in
NetQ to send the information to a third-party notification application
as well. NetQ supports PagerDuty and Slack integrations.

The NetQ Agent interacts with the Netlink communications between the
Linux kernel and the user space, listening for changes to the network
state, configurations, routes and MAC addresses. NetQ uses this
information to enable notifications about these changes so that network
operators and administrators can respond quickly when changes are not
expected or favorable.

For example, if a new route is added or a MAC address removed, NetQ
Agent records these changes and sends that information to the NetQ
Platform. Based on the configuration of the Event Service, these changes
can be sent to a variety of locations for end user response. 

The NetQ Agent also interacts with the hardware platform to obtain
performance information about various physical components, such as fans
and power supplies, on the switch. Operational states and temperatures
are measured and reported, along with cabling information to enable
management of the hardware and cabling, and proactive maintenance.

For example, as thermal sensors in the switch indicate that it is
becoming very warm, various levels of alarms are generated. These are
then communicated through notifications according to the Event Service
configuration.

Chassis are also supported with four or eight line cards (a switch on a
circuit board), where each line card has its own NetQ Agent to provide
the same level of information as if it were a standalone switch.

### The NetQ Platform

Once the collected data is sent to and stored in the NetQ database, you
can:

-   Validate configurations, identifying misconfigurations in your
    current network, in the past, or prior to deployment,
-   Monitor communication paths throughout the network,
-   Notify users of issues and management information,
-   Anticipate impact of connectivity changes,
-   and so forth.

**Validate Configurations**

The NetQ CLI enables validation of your network health through two sets
of commands: `netq` c`heck` and `netq show`. They extract the
information from the Network Service Layer and Event service.
The Network Service Layer is continually validating the connectivity and
configuration of the devices and protocols running on the network. Using
the `netq` c`heck` and `netq show` commands displays the status of the
various components and services on a network-wide and complete software
stack basis. For example, you can perform a network-wide check on all
sessions of BGP with a single `netq check bgp` command. The command
lists any devices that have misconfigurations or other operational
errors in seconds. When errors or misconfigurations are present, using
the `netq show bgp` command displays the BGP configuration on each
device so that you can compare and contrast each device, looking for
potential causes. `netq` c`heck` and `netq show` commands are available
for numerous components and services as shown in the following table.

| Component or Service |                                          Check                                         |                                          Show                                          | Component or Service |                                          Check                                         |                                          Show                                          |
|----------------------|:--------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------:|----------------------|:--------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------:|
| Agents               | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | LLDP                 |                                                                                        | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| BGP                  | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | LNV                  | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| CLAG (MLAG)          | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | MACs                 |                                                                                        | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| Docker               |                                                                                        | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | MTU                  | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |                                                                                        |
| Events               |                                                                                        | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | NTP                  | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| EVPN                 | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | OSPF                 | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| Interfaces           | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | Sensors              | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| Inventory            |                                                                                        | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | Services             |                                                                                        | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| IPv4/v6              |                                                                                        | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | VLAN                 | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| Kubernetes           |                                                                                        | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | VXLAN                | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |
| License              | ![(green star)](images/icons/emoticons/star_green.png){.emoticon .emoticon-green-star} |                                                                                        |                      |                                                                                        |                                                                                        |

**Monitor Communication Paths**

The trace engine is used to validate the available communication paths
between two network devices. The corresponding `netq trace` command
enables you to view all of the paths between the two devices and if
there are any breaks in the paths. This example shows two successful
paths between server12 and leaf11, all with an MTU of 9152. The first
command shows the output in path by path tabular mode. The second
command show the same output as a tree.

``` text
cumulus@switch:~$ netq trace 10.0.0.13 from 10.0.0.21
Number of Paths: 2
Number of Paths with Errors: 0
Number of Paths with Warnings: 0
Path MTU: 9152
Id  Hop Hostname    InPort          InTun, RtrIf    OutRtrIf, Tun   OutPort
--- --- ----------- --------------- --------------- --------------- ---------------
1   1   server12                                                    bond1.1002
    2   leaf12      swp8                            vlan1002        peerlink-1
    3   leaf11      swp6            vlan1002                        vlan1002
--- --- ----------- --------------- --------------- --------------- ---------------
2   1   server12                                                    bond1.1002
    2   leaf11      swp8                                            vlan1002
--- --- ----------- --------------- --------------- --------------- ---------------


cumulus@switch:~$ netq trace 10.0.0.13 from 10.0.0.21 pretty
Number of Paths: 2
Number of Paths with Errors: 0
Number of Paths with Warnings: 0
Path MTU: 9152
 hostd-12 bond1.1002 -- swp8 leaf12 <vlan1002> peerlink-1 -- swp6 <vlan1002> leaf11 vlan1002 
          bond1.1002 -- swp8 leaf11 vlan1002 
```

This output is read as:

-   Path 1 traverses the network from server12 out bond1.1002 into
    leaf12 interface swp8 out VLAN1002 peerlink-1 into VLAN1002
    interface swp6 on leaf11 
-   Path 2 traverses the network from server12 out bond1.1002
    into VLAN1002 interface swp8 on leaf11.

If the MTU does not match across the network, or any of the paths or
parts of the paths have issues, that data is called out in the summary
at the top of the output and shown in red along the paths, giving you a
starting point for troubleshooting.

**View Historical State and Configuration**

All of the check, show and trace commands can be run for the current
status and for a prior point in time. For example, this is useful when
you receive messages from the night before, but are not seeing any
problems now. You can use the `netq check` command to look for
configuration or operational issues around the time that the messages
are timestamped. Then use the `netq show` commands to see information
about how the devices in question were configured at that time or if
there were any changes in a given timeframe. Optionally, you can use the
`netq trace` command to see what the connectivity looked like between
any problematic nodes at that time. This example shows problems occurred
on spine01, leaf04, and server03 last night. The network administrator
received notifications and wants to investigate. The diagram is followed
by the commands to run to determine the cause of a BGP error on spine01.
Note that the commands use the `around` option to see the results for
last night and that they can be run from any switch in the network.

 ![](attachments/8365283/9013101.png){width="800"}

 

``` text
cumulus@switch:~$ netq check bgp around 30m
Total Nodes: 25, Failed Nodes: 3, Total Sessions: 220 , Failed Sessions: 24, 
Hostname          VRF             Peer Name         Peer Hostname     Reason                                        Last Changed
----------------- --------------- ----------------- ----------------- --------------------------------------------- -------------------------
exit-1            DataVrf1080     swp6.2            firewall-1        BGP session with peer firewall-1 swp6.2: AFI/ 1d:2h:6m:21s
                                                                      SAFI evpn not activated on peer              
exit-1            DataVrf1080     swp7.2            firewall-2        BGP session with peer firewall-2 (swp7.2 vrf  1d:1h:59m:43s
                                                                      DataVrf1080) failed,                         
                                                                      reason: Peer not configured                  
exit-1            DataVrf1081     swp6.3            firewall-1        BGP session with peer firewall-1 swp6.3: AFI/ 1d:2h:6m:21s
                                                                      SAFI evpn not activated on peer              
exit-1            DataVrf1081     swp7.3            firewall-2        BGP session with peer firewall-2 (swp7.3 vrf  1d:1h:59m:43s
                                                                      DataVrf1081) failed,                         
                                                                      reason: Peer not configured                  
exit-1            DataVrf1082     swp6.4            firewall-1        BGP session with peer firewall-1 swp6.4: AFI/ 1d:2h:6m:21s
                                                                      SAFI evpn not activated on peer              
exit-1            DataVrf1082     swp7.4            firewall-2        BGP session with peer firewall-2 (swp7.4 vrf  1d:1h:59m:43s
                                                                      DataVrf1082) failed,                         
                                                                      reason: Peer not configured                  
exit-1            default         swp6              firewall-1        BGP session with peer firewall-1 swp6: AFI/SA 1d:2h:6m:21s
                                                                      FI evpn not activated on peer                
exit-1            default         swp7              firewall-2        BGP session with peer firewall-2 (swp7 vrf de 1d:1h:59m:43s
...

cumulus@switch:~$ netq exit-1 show bgp
Matching bgp records:
Hostname          Neighbor                     VRF             ASN        Peer ASN   PfxRx        Last Changed
----------------- ---------------------------- --------------- ---------- ---------- ------------ -------------------------
exit-1            swp3(spine-1)                default         655537     655435     27/24/412    Fri Feb 15 17:20:00 2019
exit-1            swp3.2(spine-1)              DataVrf1080     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp3.3(spine-1)              DataVrf1081     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp3.4(spine-1)              DataVrf1082     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp4(spine-2)                default         655537     655435     27/24/412    Fri Feb 15 17:20:00 2019
exit-1            swp4.2(spine-2)              DataVrf1080     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp4.3(spine-2)              DataVrf1081     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp4.4(spine-2)              DataVrf1082     655537     655435     13/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp5(spine-3)                default         655537     655435     28/24/412    Fri Feb 15 17:20:00 2019
exit-1            swp5.2(spine-3)              DataVrf1080     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp5.3(spine-3)              DataVrf1081     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp5.4(spine-3)              DataVrf1082     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp6(firewall-1)             default         655537     655539     73/69/-      Fri Feb 15 17:22:10 2019
exit-1            swp6.2(firewall-1)           DataVrf1080     655537     655539     73/69/-      Fri Feb 15 17:22:10 2019
exit-1            swp6.3(firewall-1)           DataVrf1081     655537     655539     73/69/-      Fri Feb 15 17:22:10 2019
exit-1            swp6.4(firewall-1)           DataVrf1082     655537     655539     73/69/-      Fri Feb 15 17:22:10 2019
exit-1            swp7                         default         655537     -          NotEstd      Fri Feb 15 17:28:48 2019
exit-1            swp7.2                       DataVrf1080     655537     -          NotEstd      Fri Feb 15 17:28:48 2019
exit-1            swp7.3                       DataVrf1081     655537     -          NotEstd      Fri Feb 15 17:28:48 2019
exit-1            swp7.4                       DataVrf1082     655537     -          NotEstd      Fri Feb 15 17:28:48 2019
```

**Manage Network Events**

The NetQ notifier manages the events that occur for the devices and
components, protocols and services that it receives from the NetQ
Agents. The notifier enables you to capture and filter events that occur
to manage the behavior of your network. This is especially useful when
an interface or routing protocol goes down and you want to get them back
up and running as quickly as possible, preferably before anyone notices
or complains. You can improve resolution time significantly by creating
filters that focus on topics appropriate for a particular group of
users.  You can easily create filters around events related to BGP, LNV,
and MLAG session states, interfaces, links, NTP and other services,
fans, power supplies, and physical sensor measurements.

For example, for operators responsible for routing, you can create an
integration with a notification application that notifies them of
routing issues as they occur. This is an example of a Slack message
received on a *netq-notifier* channel indicating that the BGP session on
switch *leaf04* interface *swp2* has gone down.

![](attachments/8365283/8365316.png){width="500"}

### Timestamps in NetQ

Every event or entry in the NetQ database is stored with a timestamp of
when the event was captured by the NetQ Agent on the switch or server.
This timestamp is based on the switch or server time where the NetQ
Agent is running, and is pushed in UTC format. It is important to ensure
that all devices are NTP synchronized to prevent events from being
displayed out of order or not displayed at all when looking for events
that occurred at a particular time or within a time window.

Interface state, IP addresses, routes, ARP/ND table (IP neighbor)
entries and MAC table entries carry a timestamp that represents the time
the event happened (such as when a route is deleted or an interface
comes up) — *except* the first time the NetQ agent is run. If the
network has been running and stable when a NetQ agent is brought up for
the first time, then this time reflects when the agent was started.
Subsequent changes to these objects are captured with an accurate time
of when the event happened.

Data that is captured and saved based on polling, and just about all
other data in the NetQ database, including control plane state (such as
BGP or MLAG), has a timestamp of when the information
was *captured* rather than when the event *actually happened*, though
NetQ compensates for this if the data extracted provides additional
information to compute a more precise time of the event. For example,
BGP uptime can be used to determine when the event actually happened in
conjunction with the timestamp.

When retrieving the timestamp, command outputs display the time in three
ways:

-   For non-JSON output when the timestamp represents the Last Changed
    time, time is displayed in actual date and time when the time change
    occurred
-   For non-JSON output when the timestamp represents an Uptime, time is
    displayed as days, hours, minutes, and seconds from the current
    time.
-   For JSON output, time is displayed in microseconds that have passed
    since the Epoch time (January 1, 1970 at 00:00:00 GMT).

This example shows the difference between the timestamp displays.

``` text
cumulus@switch:~$ netq show bgp
Matching bgp records:
Hostname          Neighbor                     VRF             ASN        Peer ASN   PfxRx        Last Changed
----------------- ---------------------------- --------------- ---------- ---------- ------------ -------------------------
exit-1            swp3(spine-1)                default         655537     655435     27/24/412    Fri Feb 15 17:20:00 2019
exit-1            swp3.2(spine-1)              DataVrf1080     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp3.3(spine-1)              DataVrf1081     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp3.4(spine-1)              DataVrf1082     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp4(spine-2)                default         655537     655435     27/24/412    Fri Feb 15 17:20:00 2019
exit-1            swp4.2(spine-2)              DataVrf1080     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp4.3(spine-2)              DataVrf1081     655537     655435     14/12/0      Fri Feb 15 17:20:00 2019
exit-1            swp4.4(spine-2)              DataVrf1082     655537     655435     13/12/0      Fri Feb 15 17:20:00 2019
...
 
cumulus@switch:~$ netq show agents
Matching agents records:
Hostname          Status           NTP Sync Version                              Sys Uptime                Agent Uptime              Reinitialize Time          Last Changed
----------------- ---------------- -------- ------------------------------------ ------------------------- ------------------------- -------------------------- -------------------------
leaf01            Fresh            yes      2.0.0-cl3u11~1549993210.e902a94      2h:32m:33s                2h:26m:19s                2h:26m:19s                 Tue Feb 12 18:13:28 2019
leaf02            Fresh            yes      2.0.0-cl3u11~1549993210.e902a94      2h:32m:33s                2h:26m:14s                2h:26m:14s                 Tue Feb 12 18:13:33 2019
leaf11            Fresh            yes      2.0.0-ub16.04u11~1549993314.e902a94  2h:32m:28s                2h:25m:49s                2h:25m:49s                 Tue Feb 12 18:17:32 2019
leaf12            Fresh            yes      2.0.0-rh7u11~1549992132.c42c08f      2h:32m:0s                 2h:25m:44s                2h:25m:44s                 Tue Feb 12 18:17:36 2019
leaf21            Fresh            yes      2.0.0-ub16.04u11~1549993314.e902a94  2h:32m:28s                2h:25m:39s                2h:25m:39s                 Tue Feb 12 18:17:42 2019
leaf22            Fresh            yes      2.0.0-rh7u11~1549992132.c42c08f      2h:32m:0s                 2h:25m:35s                2h:25m:35s                 Tue Feb 12 18:17:46 2019
spine01           Fresh            yes      2.0.0-cl3u11~1549993210.e902a94      2h:32m:33s                2h:27m:11s                2h:27m:11s                 Tue Feb 12 18:13:06 2019
spine02           Fresh            yes      2.0.0-cl3u11~1549993210.e902a94      2h:32m:33s                2h:27m:6s                 2h:27m:6s                  Tue Feb 12 18:13:11 2019
...
 
cumulus@switch:~$ netq show agents json
{
    "agents":[
        {
            "status":"Fresh",
            "lastChanged":1549995208.3039999008,
            "reinitializeTime":1549995146.0,
            "hostname":"leaf01",
            "version":"2.0.0-cl3u11~1549993210.e902a94",
            "sysUptime":1549994772.0,
            "ntpSync":"yes",
            "agentUptime":1549995146.0
        },
        {
            "status":"Fresh",
            "lastChanged":1549995213.3399999142,
            "reinitializeTime":1549995151.0,
            "hostname":"leaf02",
            "version":"2.0.0-cl3u11~1549993210.e902a94",
            "sysUptime":1549994772.0,
            "ntpSync":"yes",
            "agentUptime":1549995151.0
        },
        {
            "status":"Fresh",
            "lastChanged":1549995434.3559999466,
            "reinitializeTime":1549995157.0,
            "hostname":"leaf11",
            "version":"2.0.0-ub16.04u11~1549993314.e902a94",
            "sysUptime":1549994772.0,
            "ntpSync":"yes",
            "agentUptime":1549995157.0
        },
        {
            "status":"Fresh",
            "lastChanged":1549995439.3770000935,
            "reinitializeTime":1549995164.0,
            "hostname":"leaf12",
            "version":"2.0.0-rh7u11~1549992132.c42c08f",
            "sysUptime":1549994809.0,
            "ntpSync":"yes",
            "agentUptime":1549995164.0
        },
        {
            "status":"Fresh",
            "lastChanged":1549995452.6830000877,
            "reinitializeTime":1549995176.0,
            "hostname":"leaf21",
            "version":"2.0.0-ub16.04u11~1549993314.e902a94",
            "sysUptime":1549994777.0,
            "ntpSync":"yes",
            "agentUptime":1549995176.0
        },
        {
            "status":"Fresh",
            "lastChanged":1549995456.4500000477,
            "reinitializeTime":1549995181.0,
            "hostname":"leaf22",
            "version":"2.0.0-rh7u11~1549992132.c42c08f",
            "sysUptime":1549994805.0,
            "ntpSync":"yes",
            "agentUptime":1549995181.0
        },
        {
            "status":"Fresh",
            "lastChanged":1549995186.3090000153,
            "reinitializeTime":1549995094.0,
            "hostname":"spine01",
            "version":"2.0.0-cl3u11~1549993210.e902a94",
            "sysUptime":1549994772.0,
            "ntpSync":"yes",
            "agentUptime":1549995094.0
        },
        {
            "status":"Fresh",
            "lastChanged":1549995191.4530000687,
            "reinitializeTime":1549995099.0,
            "hostname":"spine02",
            "version":"2.0.0-cl3u11~1549993210.e902a94",
            "sysUptime":1549994772.0,
            "ntpSync":"yes",
            "agentUptime":1549995099.0
        },
...
```

If a NetQ Agent is restarted on a device, the timestamps for existing
objects are not updated to reflect this new restart time. Their
timestamps are preserved relative to the original start time of the
Agent. A rare exception is if the device is rebooted between the time it
takes the Agent being stopped and restarted; in this case, the time is
once again relative to the start time of the Agent.

### Exporting NetQ Data

Data from the NetQ Platform can be exported in a couple of ways:

-   use the `json` option to output command results to JSON format for
    parsing in other applications
-   use the UI to export data from the full screen cards

**Example Using the CLI**

You can check the state of BGP on your network with `netq check bgp`:

``` text
cumulus@leaf01:~$ netq check bgp 
Total Nodes: 25, Failed Nodes: 3, Total Sessions: 220 , Failed Sessions: 24, 
Hostname          VRF             Peer Name         Peer Hostname     Reason                                        Last Changed
----------------- --------------- ----------------- ----------------- --------------------------------------------- -------------------------
exit01            DataVrf1080     swp6.2            firewall01        BGP session with peer firewall01 swp6.2: AFI/ Tue Feb 12 18:11:16 2019
                                                                      SAFI evpn not activated on peer              
exit01            DataVrf1080     swp7.2            firewall02        BGP session with peer firewall02 (swp7.2 vrf  Tue Feb 12 18:11:27 2019
                                                                      DataVrf1080) failed,                         
                                                                      reason: Peer not configured                  
exit01            DataVrf1081     swp6.3            firewall01        BGP session with peer firewall01 swp6.3: AFI/ Tue Feb 12 18:11:16 2019
                                                                      SAFI evpn not activated on peer              
exit01            DataVrf1081     swp7.3            firewall02        BGP session with peer firewall02 (swp7.3 vrf  Tue Feb 12 18:11:27 2019
                                                                      DataVrf1081) failed,                         
                                                                      reason: Peer not configured                  
...
```

When you show the output in JSON format, this same command looks like
this: 

``` text
cumulus@leaf01:~$ netq check bgp json 
{
    "failedNodes":[
        {
            "peerHostname":"firewall01",
            "lastChanged":1549995080.0,
            "hostname":"exit01",
            "peerName":"swp6.2",
            "reason":"BGP session with peer firewall01 swp6.2: AFI/SAFI evpn not activated on peer",
            "vrf":"DataVrf1080"
        },
        {
            "peerHostname":"firewall02",
            "lastChanged":1549995449.7279999256,
            "hostname":"exit01",
            "peerName":"swp7.2",
            "reason":"BGP session with peer firewall02 (swp7.2 vrf DataVrf1080) failed, reason: Peer not configured",
            "vrf":"DataVrf1080"
        },
        {
            "peerHostname":"firewall01",
            "lastChanged":1549995080.0,
            "hostname":"exit01",
            "peerName":"swp6.3",
            "reason":"BGP session with peer firewall01 swp6.3: AFI/SAFI evpn not activated on peer",
            "vrf":"DataVrf1081"
        },
        {
            "peerHostname":"firewall02",
            "lastChanged":1549995449.7349998951,
            "hostname":"exit01",
            "peerName":"swp7.3",
            "reason":"BGP session with peer firewall02 (swp7.3 vrf DataVrf1081) failed, reason: Peer not configured",
            "vrf":"DataVrf1081"
        },
...

    ], 
    "summary": {
        "checkedNodeCount": 25, 
        "failedSessionCount": 24, 
        "failedNodeCount": 3, 
        "totalSessionCount": 220
    }
}
```

**Example Using the UI**

Open the full screen Switch Inventory card, select the data to export,
and click **Export**.

![](attachments/8365283/9013111.png){height="250"}

### Key File Locations

The primary configuration file for all Cumulus NetQ tools, `netq.yml`,
resides in `/etc/netq` by default. 

Log files are stored in /var/logs/ by default. 

Refer to Investigate NetQ Issues for a complete listing of configuration
files and logs for use in issue resolution.

 

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[netq.png](attachments/8365283/8365353.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [netq
deployment.png](attachments/8365283/8365352.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Cumulus NetQ
1.2.1 User Guide.pdf](attachments/8365283/8365351.pdf)
(application/pdf)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Cumulus NetQ
1.3.0 User Guide.pdf](attachments/8365283/8365350.pdf)
(application/pdf)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-6-27
17:55:17.png](attachments/8365283/8365349.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-13
15:6:21.png](attachments/8365283/8365348.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-20
15:6:7.png](attachments/8365283/8365347.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[Server-Default.svg](attachments/8365283/8365346.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
10:10:29.png](attachments/8365283/8365345.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
12:11:38.png](attachments/8365283/8365344.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
12:12:43.png](attachments/8365283/8365343.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
12:16:44.png](attachments/8365283/8365342.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
12:18:1.png](attachments/8365283/8365341.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
12:23:0.png](attachments/8365283/8365340.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
12:26:47.png](attachments/8365283/8365339.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
15:10:22.png](attachments/8365283/8365338.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
15:12:56.png](attachments/8365283/8365337.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
15:48:51.png](attachments/8365283/8365336.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
16:10:1.png](attachments/8365283/8365335.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
17:16:28.png](attachments/8365283/8365334.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-16
17:30:5.png](attachments/8365283/8365333.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-13
9:21:28.png](attachments/8365283/8365332.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-13
9:23:49.png](attachments/8365283/8365331.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-13
9:34:12.png](attachments/8365283/8365330.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-17
12:51:36.png](attachments/8365283/8365329.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-17
17:1:1.png](attachments/8365283/8365328.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-17
17:25:59.png](attachments/8365283/8365327.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
13:14:4.png](attachments/8365283/8365326.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
13:31:43.png](attachments/8365283/8365325.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
13:59:16.png](attachments/8365283/8365324.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
14:2:43.png](attachments/8365283/8365323.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
16:0:4.png](attachments/8365283/8365322.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
16:4:11.png](attachments/8365283/8365321.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
16:4:48.png](attachments/8365283/8365320.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
17:35:18.png](attachments/8365283/8365319.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
18:11:1.png](attachments/8365283/8365318.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
18:12:5.png](attachments/8365283/8365317.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-19
18:12:48.png](attachments/8365283/8365316.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-24
11:3:17.png](attachments/8365283/8365315.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-24
14:1:55.png](attachments/8365283/8365314.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-24
14:4:56.png](attachments/8365283/8365313.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-24
14:10:42.png](attachments/8365283/8365312.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-24
14:50:34.png](attachments/8365283/8365311.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-24
18:14:19.png](attachments/8365283/8365310.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
9:50:46.png](attachments/8365283/8365309.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
10:50:13.png](attachments/8365283/8365308.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
11:43:22.png](attachments/8365283/8365307.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
11:44:34.png](attachments/8365283/8365306.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
12:2:17.png](attachments/8365283/8365305.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
12:10:25.png](attachments/8365283/8365304.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
12:11:18.png](attachments/8365283/8365303.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
12:12:58.png](attachments/8365283/8365302.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
12:15:21.png](attachments/8365283/8365301.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-9-25
15:41:55.png](attachments/8365283/8365300.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Cumulus NetQ
140 Primer.pdf](attachments/8365283/8365299.pdf) (application/pdf)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-30
10:25:49.png](attachments/8365283/9012584.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-30
13:49:26.png](attachments/8365283/9012596.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
17:45:8.png](attachments/8365283/9012709.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
17:52:11.png](attachments/8365283/9012711.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
17:54:17.png](attachments/8365283/9012712.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
17:55:37.png](attachments/8365283/9012713.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
17:57:59.png](attachments/8365283/9012714.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-5
11:41:58.png](attachments/8365283/9012732.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-12
15:21:17.png](attachments/8365283/9013101.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-12
16:6:0.png](attachments/8365283/9013111.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-12
16:11:47.png](attachments/8365283/9013112.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-14
14:15:11.png](attachments/8365283/9013346.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
19:58:52.png](attachments/8365283/9013766.png) (image/png)  
