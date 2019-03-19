\--- title: author: keywords: ---

# Monitor Overall Network Health

NetQ provides the information you need to monitor the health of your
network fabric, devices, and interfaces. You are able to easily validate
the operation and view the configuration across the entire network from
switches to hosts to containers. For example, you can monitor the
operation of routing protocols and virtual network configurations, the
status of NetQ Agents and hardware components, and the operation and
efficiency of interfaces. When issues are present, NetQ makes it easy to
identify and resolve them. You can also see when changes have occurred
to the network, devices, and interfaces by viewing their operation,
configuration, and status at an earlier point in
time.

<div id="src-8365477_MonitorOverallNetworkHealth-ValidateNetworkHealth" class="section section-1">

## Validate Network Health

NetQ `check` commands validate the various elements of your network
fabric, looking for inconsistencies in configuration across your fabric,
connectivity faults, missing configuration, and so forth, and then and
display the results for your assessment. They can be run from any node
in the network. Most check commands can be run for a specific device or
for the entire network
fabric.

<div id="src-8365477_MonitorOverallNetworkHealth-ValidatetheNetworkFabric" class="section section-2">

### Validate the Network Fabric

You can validate the following network fabric elements:

  - BGP and OSPF routing protocols

  - VLAN, VXLAN, CLAG, and EVPN virtual constructs

  - MTU setting

  - NetQ Agents

For example, to determine the status of BGP running on your network:

``` 
                
cumulus@switch:~$ netq check bgp
Total Nodes: 15, Failed Nodes: 0, Total Sessions: 16, Failed Sessions: 0

    
```

You can see from this output that NetQ has validated the connectivity
and configuration of BGP across all of the nodes in the network and
found them all to be operating properly. If there were issues with any
of the nodes, NetQ would provide information about each node to aid in
resolving the issues.

There is a check command for each of the supported routing protocols,
virtual constructs, MTU setting and NetQ Agents. They all behave in a
similar manner, checking for connectivity, configuration, and other
problems, indicating the number of nodes that they have checked and
indicating the number that have failed.

Some additional examples—

Validate that EVPN is running correctly on all nodes:

``` 
                
cumulus@switch:~$ netq check evpn
Total Nodes: 15, Failed Nodes: 0, Total Sessions: 0, Failed Sessions: 0, Total VNIs: 0

    
```

Confirm all monitored nodes are running the NetQ Agent:

``` 
                
cumulus@switch:~$ netq check agents
Checked nodes: 25, Rotten nodes: 1
Hostname          Status           Last Changed
----------------- ---------------- -------------------------
leaf01            Rotten           8d:13h:34m:51s

    
```

Validate that all corresponding interface links have matching MTUs:

``` 
                
cumulus@switch:~$ netq check mtu
Checked Nodes: 15, Checked Links: 138, Failed Nodes: 0, Failed Links: 0
No MTU Mismatch found

    
```

Validate that VXLANs are configured and operating properly:

``` 
                
cumulus@switch:~$ netq check vxlan 
Checked Nodes: 6, Warning Nodes: 0, Failed Nodes: 6
Nodes with error
Hostname         Reason
---------------- ----------------------------------------------------------------
exit01           inconsistent replication list for vni 104001                    
exit02           inconsistent replication list for vni 104001                    
leaf01           inconsistent replication list for vni 104001                    
leaf02           inconsistent replication list for vni 104001                    
leaf03           inconsistent replication list for vni 104001                    
leaf04           inconsistent replication list for vni 104001                    

    
```

<div class="confbox admonition admonition-tip">

<div class="admonition-body">

{{% notice tip %}} Both asymmetric and symmetric VXLAN configurations
are validated with this command. {{% /notice %}}

</div>

</div>

You can be more granular in your validation as well, using the
additional options available for each of the check commands. For
example, validate BGP operation for nodes with VRF:

``` 
                
cumulus@switch:~$ netq check bgp vrf DataVrf1081
Total Nodes: 25, Failed Nodes: 1, Total Sessions: 52 , Failed Sessions: 1
Hostname          VRF             Peer Name         Peer Hostname     Reason                                        Last Changed
----------------- --------------- ----------------- ----------------- --------------------------------------------- -------------------------
exit-1            DataVrf1081     swp7.3            firewall-2        BGP session with peer firewall-2 (swp7.3 vrf  1d:5h:47m:31s
                                                                      DataVrf1081) failed,                         
                                                                      reason: Peer not configured      

    
```

Each of the check commands provides a starting point for troubleshooting
configuration and connectivity issues within your network in real time.
They provide an additional option of viewing the network state at an
earlier time, using the `around` option.

For example, if you were notified of an issue on your VLANs that appears
to have occurred about 10 minutes ago, you could run:

``` 
                
cumulus@switch:~$ netq check vlan around 10m
Checked Nodes: 15, Checked Links: 138, Failed Nodes: 0, Failed Links: 0
No VLAN or PVID Mismatch found

    
```

</div>

<div id="src-8365477_MonitorOverallNetworkHealth-ValidateDeviceStatusandConfiguration" class="section section-2">

### Validate Device Status and Configuration

You can validate the following device elements:

  - NTP

  - Sensors

  - License

It is always important to have your devices in time synchronization to
ensure configuration and management events can be tracked and
correlations can be made between events. To validate time
synchronization, run:

``` 
                
cumulus@switch:~$ netq check ntp
Total Nodes: 15, Checked Nodes: 15, Rotten Nodes: 0, Unknown Nodes: 0, failed NTP Nodes: 8
Hostname          NTP Sync Connect Time
----------------- -------- -------------------------
exit01            no       2018-09-12 16:30:39      
exit02            no       2018-09-12 16:30:45      
leaf01            no       2018-09-12 16:30:43      
leaf02            no       2018-09-12 16:30:36      
leaf03            no       2018-09-12 16:30:36      
leaf04            no       2018-09-12 16:30:34      
spine01           no       2018-09-12 16:30:44      
spine02           no       2018-09-12 16:30:40      

    
```

This example shows eight nodes that are not in time synchronization. You
can now continue to investigate these nodes, validating that the NetQ
Agents are active, whether an NTP server has become unreachable, and so
forth.

Hardware platforms have a number sensors to provide environmental data
about the switches. Knowing these are all within range is a good check
point for maintenance. For example, if you had a temporary HVAC failure
and you are concerned that some of your nodes are beginning to overheat,
you can run:

``` 
                
cumulus@switch:~$ netq check sensors 
Total Nodes: 25, Failed Nodes: 0, Checked Sensors: 221, Failed Sensors: 0

    
```

You can also check for any nodes that have invalid licenses without
going to each node. Because switches do not operate correctly without a
valid license you might want to verify that your Cumulus Linux licenses
on a regular basis:

``` 
                
cumulus@switch:~$ netq check license
Total Nodes: 15, Failed Nodes: 0, Checked Licenses: 10, Failed Licenses: 0

    
```

<div class="confbox admonition admonition-tip">

<div class="admonition-body">

{{% notice tip %}} This command checks every node, meaning every switch
and host in the network. Hosts do not require a Cumulus Linux license,
so the number of licenses checked is likely to be smaller than the total
number of nodes checked. {{% /notice
%}}

</div>

</div>

</div>

<div id="src-8365477_MonitorOverallNetworkHealth-ValidateInterfaceStatusandConfiguration" class="section section-2">

### Validate Interface Status and Configuration

As with other `netq check` commands, you can validate the proper
operation of your interfaces across the network:

``` 
                
cumulus@switch:~$ netq check interfaces 
Checked Nodes: 15, Failed Nodes: 8
Checked Ports: 118, Failed Ports: 8, Unverified Ports: 94
Hostname          Interface                 Peer Hostname     Peer Interface            Message
----------------- ------------------------- ----------------- ------------------------- -----------------------------------
leaf01            swp7                      firewall02        swp3                      Speed mismatch (10G, n/a),         
                                                                                        Autoneg mismatch (off, n/a)          
leaf02            swp2                      server02          eth2                      Autoneg mismatch (off, on)         
leaf03            swp1                      server03          eth1                      Autoneg mismatch (off, on)         
leaf04            swp2                      server04          eth2                      Autoneg mismatch (off, on)         
server01          eth1                      leaf01            swp1                      Autoneg mismatch (on, off)         
server02          eth2                      leaf02            swp2                      Autoneg mismatch (on, off)         
server03          eth1                      leaf03            swp1                      Autoneg mismatch (on, off)         
server04          eth2                      leaf04            swp2                      Autoneg mismatch (on, off)         

    
```

When failures are seen, additional information is provided to start your
investigation. In this example, some reconfiguration is required for
auto-negotiation with peer
interfaces.

</div>

</div>

<div id="src-8365477_MonitorOverallNetworkHealth-ViewNetworkDetails" class="section section-1">

## View Network Details

The `netq show` commands display a wide variety of content about the
network and its various elements. You can show content for the
following:

``` 
                
cumulus@switch:~$ netq show 
    agents        :  Netq agent
    bgp           :  BGP info
    clag          :  Cumulus Multi-chassis LAG
    docker        :  Docker Info
    events        :  Display changes over time
    evpn          :  EVPN
    interfaces    :  network interface port
    inventory     :  Inventory information
    ip            :  IPv4 related info
    ipv6          :  IPv6 related info
    kubernetes    :  Kubernetes Information
    lldp          :  LLDP based neighbor info
    lnv           :  Lightweight Network Virtualization info
    macs          :  Mac table or MAC address info
    notification  :  Send notifications to Slack or PagerDuty
    ntp           :  NTP
    ospf          :  OSPF info
    sensors       :  Temperature/Fan/PSU sensors
    services      :  System services
    vlan          :  VLAN
    vxlan         :  VXLAN data path

    
```

For example, to validate the the status of the NetQ agents running in
the fabric, run `netq show agents`. A *Fresh* status indicates the Agent
is running as expected. The Agent sends a heartbeat every 30 seconds,
and if three consecutive heartbeats are missed, its status changes to
*Rotten*.

``` 
                
cumulus@switch:~$ netq show agents 
 
Matching agents records:
Hostname          Status           NTP Sync Version                              Sys Uptime                Agent Uptime              Reinitialize Time          Last Changed
----------------- ---------------- -------- ------------------------------------ ------------------------- ------------------------- -------------------------- -------------------------
exit01            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:15s                1h:6m:6s                  1h:4m:31s                  Wed Feb  6 23:00:17 2019
exit02            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:14s                1h:5m:58s                 1h:3m:40s                  Wed Feb  6 23:01:08 2019
firewall01        Fresh            yes      2.0.0-ub16.04u11~1549483812.4e93c0f  1h:15m:11s                1h:5m:49s                 1h:5m:49s                  Wed Feb  6 22:59:04 2019
firewall02        Fresh            yes      2.0.0-rh7u11~1549483934.4e93c0f      1h:13m:58s                1h:5m:40s                 1h:5m:40s                  Wed Feb  6 23:00:53 2019
server-11         Fresh            yes      2.0.0-ub16.04u11~1549483812.4e93c0f  1h:15m:4s                 1h:5m:26s                 1h:5m:26s                  Wed Feb  6 23:00:07 2019
server-12         Fresh            yes      2.0.0-rh7u11~1549483934.4e93c0f      1h:14m:21s                1h:5m:20s                 1h:3m:54s                  Wed Feb  6 23:03:06 2019
server-21         Fresh            yes      2.0.0-ub16.04u11~1549483812.4e93c0f  1h:15m:4s                 1h:5m:14s                 1h:5m:14s                  Wed Feb  6 23:00:39 2019
server-22         Fresh            yes      2.0.0-rh7u11~1549483934.4e93c0f      1h:14m:11s                1h:5m:8s                  1h:5m:8s                   Wed Feb  6 23:00:05 2019
leaf01            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:11s                1h:7m:30s                 1h:5m:54s                  Wed Feb  6 23:02:14 2019
leaf02            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:11s                1h:7m:24s                 1h:7m:24s                  Wed Feb  6 22:57:49 2019
spine01           Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:14s                1h:7m:17s                 1h:5m:40s                  Wed Feb  6 22:59:08 2019
spine02           Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:15s                1h:7m:9s                  1h:5m:44s                  Wed Feb  6 22:59:04 2019
spine03           Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:15s                1h:7m:2s                  1h:5m:22s                  Wed Feb  6 22:59:26 2019
leaf01            Fresh            yes      2.0.0-cl3u11                         1h:15m:12s                11m:23.138s               10m:45.138s                Wed Feb  6 23:54:03 2019
leaf02            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:11s                1h:6m:13s                 1h:4m:39s                  Wed Feb  6 23:00:09 2019
leaf11            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:21s                1h:6m:53s                 1h:4m:55s                  Wed Feb  6 22:59:54 2019
leaf12            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:20s                1h:6m:46s                 1h:4m:31s                  Wed Feb  6 23:00:18 2019
leaf21            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:20s                1h:6m:37s                 1h:6m:37s                  Wed Feb  6 22:59:04 2019
leaf22            Fresh            yes      2.0.0-cl3u11~1549483811.4e93c0f      1h:15m:19s                1h:6m:29s                 1h:5m:31s                  Wed Feb  6 22:59:17 2019

    
```

Some additional examples follow.

View the status of BGP:

``` 
                
cumulus@switch:~$ netq show bgp
 
Matching bgp records:
Hostname          Neighbor                     VRF             ASN        Peer ASN   PfxRx        Last Changed
----------------- ---------------------------- --------------- ---------- ---------- ------------ -------------------------
exit01            swp3(spine01)                default         655537     655435     26/24/432    Wed Feb  6 22:49:00 2019
exit01            swp3.2(spine01)              DataVrf1080     655537     655435     14/13/0      Wed Feb  6 22:49:00 2019
exit01            swp3.3(spine01)              DataVrf1081     655537     655435     14/13/0      Wed Feb  6 22:49:00 2019
exit01            swp3.4(spine01)              DataVrf1082     655537     655435     15/13/0      Wed Feb  6 22:49:00 2019
exit01            swp4(spine02)                default         655537     655435     27/24/432    Wed Feb  6 22:49:00 2019
exit01            swp4.2(spine02)              DataVrf1080     655537     655435     14/13/0      Wed Feb  6 22:49:00 2019
exit01            swp4.3(spine02)              DataVrf1081     655537     655435     15/13/0      Wed Feb  6 22:49:00 2019
exit01            swp4.4(spine02)              DataVrf1082     655537     655435     15/13/0      Wed Feb  6 22:49:00 2019
exit01            swp5(spine03)                default         655537     655435     26/24/432    Wed Feb  6 22:49:00 2019
exit01            swp5.2(spine03)              DataVrf1080     655537     655435     14/13/0      Wed Feb  6 22:49:00 2019
exit01            swp5.3(spine03)              DataVrf1081     655537     655435     15/13/0      Wed Feb  6 22:49:00 2019
exit01            swp5.4(spine03)              DataVrf1082     655537     655435     15/13/0      Wed Feb  6 22:49:00 2019
exit01            swp6(firewall01)             default         655537     655539     46/44/-      Wed Feb  6 22:57:40 2019
exit01            swp6.2(firewall01)           DataVrf1080     655537     655539     46/44/-      Wed Feb  6 22:57:40 2019
exit01            swp6.3(firewall01)           DataVrf1081     655537     655539     46/44/-      Wed Feb  6 22:57:40 2019
exit01            swp6.4(firewall01)           DataVrf1082     655537     655539     46/44/-      Wed Feb  6 22:57:40 2019
exit01            swp7                         default         655537     -          NotEstd      Wed Feb  6 23:02:35 2019
exit01            swp7.2                       DataVrf1080     655537     -          NotEstd      Wed Feb  6 23:02:35 2019
exit01            swp7.3                       DataVrf1081     655537     -          NotEstd      Wed Feb  6 23:02:35 2019
exit01            swp7.4                       DataVrf1082     655537     -          NotEstd      Wed Feb  6 23:02:35 2019
exit02            swp3(spine01)                default         655538     655435     31/25/432    Wed Feb  6 22:49:00 2019
exit02            swp3.2(spine01)              DataVrf1080     655538     655435     15/12/0      Wed Feb  6 22:49:00 2019
exit02            swp3.3(spine01)              DataVrf1081     655538     655435     15/12/0      Wed Feb  6 22:49:00 2019
exit02            swp3.4(spine01)              DataVrf1082     655538     655435     15/12/0      Wed Feb  6 22:49:00 2019
exit02            swp4(spine02)                default         655538     655435     31/25/432    Wed Feb  6 22:49:00 2019
exit02            swp4.2(spine02)              DataVrf1080     655538     655435     15/12/0      Wed Feb  6 22:49:00 2019
exit02            swp4.3(spine02)              DataVrf1081     655538     655435     14/12/0      Wed Feb  6 22:49:00 2019
exit02            swp4.4(spine02)              DataVrf1082     655538     655435     15/12/0      Wed Feb  6 22:49:00 2019
exit02            swp5(spine03)                default         655538     655435     31/25/432    Wed Feb  6 22:49:00 2019
exit02            swp5.2(spine03)              DataVrf1080     655538     655435     15/12/0      Wed Feb  6 22:49:00 2019
exit02            swp5.3(spine03)              DataVrf1081     655538     655435     14/12/0      Wed Feb  6 22:49:00 2019
exit02            swp5.4(spine03)              DataVrf1082     655538     655435     15/12/0      Wed Feb  6 22:49:00 2019
exit02            swp6(firewall01)             default         655538     655539     34/30/-      Wed Feb  6 22:57:40 2019
exit02            swp6.2(firewall01)           DataVrf1080     655538     655539     34/30/-      Wed Feb  6 22:57:40 2019
exit02            swp6.3(firewall01)           DataVrf1081     655538     655539     34/30/-      Wed Feb  6 22:57:40 2019
exit02            swp6.4(firewall01)           DataVrf1082     655538     655539     34/30/-      Wed Feb  6 22:57:40 2019
exit02            swp7                         default         655538     -          NotEstd      Wed Feb  6 23:03:26 2019
exit02            swp7.2                       DataVrf1080     655538     -          NotEstd      Wed Feb  6 23:03:26 2019
exit02            swp7.3                       DataVrf1081     655538     -          NotEstd      Wed Feb  6 23:03:26 2019
exit02            swp7.4                       DataVrf1082     655538     -          NotEstd      Wed Feb  6 23:03:26 2019
firewall01        swp3(exit01)                 default         655539     655537     29/27/-      Wed Feb  6 22:57:40 2019
firewall01        swp3.2(exit01)               default         655539     655537     15/15/-      Wed Feb  6 22:57:40 2019
firewall01        swp3.3(exit01)               default         655539     655537     15/15/-      Wed Feb  6 22:57:40 2019
firewall01        swp3.4(exit01)               default         655539     655537     15/15/-      Wed Feb  6 22:57:40 2019
firewall01        swp4(exit02)                 default         655539     655538     29/27/-      Wed Feb  6 22:57:40 2019
firewall01        swp4.2(exit02)               default         655539     655538     15/15/-      Wed Feb  6 22:57:40 2019
firewall01        swp4.3(exit02)               default         655539     655538     15/15/-      Wed Feb  6 22:57:40 2019
firewall01        swp4.4(exit02)               default         655539     655538     15/15/-      Wed Feb  6 22:57:40 2019
spine01           swp10(exit02)                default         655435     655538     10/5/0       Wed Feb  6 22:49:00 2019
spine01           swp10.2(exit02)              DataVrf1080     655435     655538     13/5/0       Wed Feb  6 22:49:00 2019
spine01           swp10.3(exit02)              DataVrf1081     655435     655538     13/5/0       Wed Feb  6 22:49:00 2019
spine01           swp10.4(exit02)              DataVrf1082     655435     655538     13/5/0       Wed Feb  6 22:49:00 2019
spine01           swp3(leaf11)                 default         655435     655559     19/6/104     Wed Feb  6 22:49:00 2019
spine01           swp3.2(leaf11)               DataVrf1080     655435     655559     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp3.3(leaf11)               DataVrf1081     655435     655559     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp3.4(leaf11)               DataVrf1082     655435     655559     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp4(leaf12)                 default         655435     655560     19/6/92      Wed Feb  6 22:49:00 2019
spine01           swp4.2(leaf12)               DataVrf1080     655435     655560     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp4.3(leaf12)               DataVrf1081     655435     655560     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp4.4(leaf12)               DataVrf1082     655435     655560     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp5(leaf21)                 default         655435     655561     19/6/60      Wed Feb  6 22:49:00 2019
spine01           swp5.2(leaf21)               DataVrf1080     655435     655561     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp5.3(leaf21)               DataVrf1081     655435     655561     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp5.4(leaf21)               DataVrf1082     655435     655561     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp6(leaf22)                 default         655435     655562     19/6/60      Wed Feb  6 22:49:00 2019
spine01           swp6.2(leaf22)               DataVrf1080     655435     655562     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp6.3(leaf22)               DataVrf1081     655435     655562     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp6.4(leaf22)               DataVrf1082     655435     655562     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp7(leaf01)                 default         655435     655557     17/5/54      Wed Feb  6 22:49:00 2019
spine01           swp7.2(leaf01)               DataVrf1080     655435     655557     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp7.3(leaf01)               DataVrf1081     655435     655557     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp7.4(leaf01)               DataVrf1082     655435     655557     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp8(leaf02)                 default         655435     655558     17/5/62      Wed Feb  6 22:49:00 2019
spine01           swp8.2(leaf02)               DataVrf1080     655435     655558     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp8.3(leaf02)               DataVrf1081     655435     655558     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp8.4(leaf02)               DataVrf1082     655435     655558     14/2/0       Wed Feb  6 22:49:00 2019
spine01           swp9(exit01)                 default         655435     655537     19/5/0       Wed Feb  6 22:49:00 2019
spine01           swp9.2(exit01)               DataVrf1080     655435     655537     16/5/0       Wed Feb  6 22:49:00 2019
spine01           swp9.3(exit01)               DataVrf1081     655435     655537     16/5/0       Wed Feb  6 22:49:00 2019
spine01           swp9.4(exit01)               DataVrf1082     655435     655537     16/5/0       Wed Feb  6 22:49:00 2019
spine02           swp10(exit02)                default         655435     655538     10/5/0       Wed Feb  6 22:49:00 2019
spine02           swp10.3(exit02)              DataVrf1081     655435     655538     13/5/0       Wed Feb  6 22:49:00 2019
spine02           swp10.4(exit02)              DataVrf1082     655435     655538     13/5/0       Wed Feb  6 22:49:00 2019
spine02           swp3.2(leaf11)               DataVrf1080     655435     655559     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp4(leaf12)                 default         655435     655560     19/6/92      Wed Feb  6 22:49:00 2019
spine02           swp4.4(leaf12)               DataVrf1082     655435     655560     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp5(leaf21)                 default         655435     655561     19/6/60      Wed Feb  6 22:49:00 2019
spine02           swp5.2(leaf21)               DataVrf1080     655435     655561     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp5.3(leaf21)               DataVrf1081     655435     655561     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp6.3(leaf22)               DataVrf1081     655435     655562     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp7(leaf01)                 default         655435     655557     17/5/54      Wed Feb  6 22:49:00 2019
spine02           swp7.2(leaf01)               DataVrf1080     655435     655557     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp7.3(leaf01)               DataVrf1081     655435     655557     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp7.4(leaf01)               DataVrf1082     655435     655557     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp8(leaf02)                 default         655435     655558     17/5/62      Wed Feb  6 22:49:00 2019
spine02           swp8.2(leaf02)               DataVrf1080     655435     655558     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp8.3(leaf02)               DataVrf1081     655435     655558     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp8.4(leaf02)               DataVrf1082     655435     655558     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp9(exit01)                 default         655435     655537     19/5/0       Wed Feb  6 22:49:00 2019
spine02           swp9.2(exit01)               DataVrf1080     655435     655537     16/5/0       Wed Feb  6 22:49:00 2019
spine02           swp9.4(exit01)               DataVrf1082     655435     655537     16/5/0       Wed Feb  6 22:49:00 2019
spine02           swp10.2(exit02)              DataVrf1080     655435     655538     13/5/0       Wed Feb  6 22:49:00 2019
spine02           swp3(leaf11)                 default         655435     655559     19/6/104     Wed Feb  6 22:49:00 2019
spine02           swp3.3(leaf11)               DataVrf1081     655435     655559     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp3.4(leaf11)               DataVrf1082     655435     655559     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp4.2(leaf12)               DataVrf1080     655435     655560     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp4.3(leaf12)               DataVrf1081     655435     655560     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp5.4(leaf21)               DataVrf1082     655435     655561     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp6(leaf22)                 default         655435     655562     19/6/60      Wed Feb  6 22:49:00 2019
spine02           swp6.2(leaf22)               DataVrf1080     655435     655562     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp6.4(leaf22)               DataVrf1082     655435     655562     14/2/0       Wed Feb  6 22:49:00 2019
spine02           swp9.3(exit01)               DataVrf1081     655435     655537     16/5/0       Wed Feb  6 22:49:00 2019
leaf01            swp3(spine01)                default         655557     655435     42/27/330    Wed Feb  6 22:49:00 2019
leaf01            swp3.2(spine01)              DataVrf1080     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf01            swp3.3(spine01)              DataVrf1081     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf01            swp3.4(spine01)              DataVrf1082     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf01            swp4(spine02)                default         655557     655435     42/27/330    Wed Feb  6 22:49:00 2019
leaf01            swp4.2(spine02)              DataVrf1080     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf01            swp4.3(spine02)              DataVrf1081     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf01            swp4.4(spine02)              DataVrf1082     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf01            swp5(spine03)                default         655557     655435     42/27/330    Wed Feb  6 22:49:00 2019
leaf01            swp5.2(spine03)              DataVrf1080     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf01            swp5.3(spine03)              DataVrf1081     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf01            swp5.4(spine03)              DataVrf1082     655557     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf02            swp3(spine01)                default         655558     655435     42/27/370    Wed Feb  6 22:49:00 2019
leaf02            swp3.2(spine01)              DataVrf1080     655558     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf02            swp3.3(spine01)              DataVrf1081     655558     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf02            swp3.4(spine01)              DataVrf1082     655558     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf02            swp4(spine02)                default         655558     655435     42/27/370    Wed Feb  6 22:49:00 2019
leaf02            swp4.2(spine02)              DataVrf1080     655558     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf02            swp4.3(spine02)              DataVrf1081     655558     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf02            swp4.4(spine02)              DataVrf1082     655558     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf02            swp5(spine03)                default         655558     655435     42/27/370    Wed Feb  6 22:49:00 2019
leaf02            swp5.2(spine03)              DataVrf1080     655558     655435     31/18/0      Wed Feb  6 22:49:00 2019
leaf02            swp5.3(spine03)              DataVrf1081     655558     655435     31/18/0      Wed Feb  6 22:49:00 2019

    
```

View the status of your VLANs:

``` 
                
cumulus@switch:~$ netq show vlan
 
Matching vlan records:
Hostname          VLANs                     SVIs                      Last Changed
----------------- ------------------------- ------------------------- -------------------------
server11          1                                                   Thu Feb  7 00:17:48 2019
server21          1                                                   Thu Feb  7 00:17:48 2019
server11          1                                                   Thu Feb  7 00:17:48 2019
server13          1                                                   Thu Feb  7 00:17:48 2019
server21          1                                                   Thu Feb  7 00:17:48 2019
server23          1                                                   Thu Feb  7 00:17:48 2019
leaf01            100-106,1000-1009         100-106 1000-1009         Thu Feb  7 00:17:49 2019
leaf02            100-106,1000-1009         100-106 1000-1009         Thu Feb  7 00:17:49 2019
leaf11            100-106,1000-1009         100-106 1000-1009         Thu Feb  7 00:17:49 2019
leaf12            100-106,1000-1009         100-106 1000-1009         Thu Feb  7 00:17:50 2019
leaf21            100-106,1000-1009         100-106 1000-1009         Thu Feb  7 00:17:50 2019
leaf22            100-106,1000-1009         100-106 1000-1009         Thu Feb  7 00:17:50 2019

    
```

View the status of the hardware sensors:

``` 
                
cumulus@switch:~$ netq show sensors all
 
Matching sensors records:
Hostname          Name            Description                         State      Message                             Last Changed
----------------- --------------- ----------------------------------- ---------- ----------------------------------- -------------------------
exit01            fan1            fan tray 1, fan 1                   ok                                             Wed Feb  6 23:02:35 2019
exit01            fan2            fan tray 1, fan 2                   ok                                             Wed Feb  6 23:02:35 2019
exit01            fan3            fan tray 2, fan 1                   ok                                             Wed Feb  6 23:02:35 2019
exit01            fan4            fan tray 2, fan 2                   ok                                             Wed Feb  6 23:02:35 2019
exit01            fan5            fan tray 3, fan 1                   ok                                             Wed Feb  6 23:02:35 2019
exit01            fan6            fan tray 3, fan 2                   ok                                             Wed Feb  6 23:02:35 2019
exit01            psu1fan1        psu1 fan                            ok                                             Wed Feb  6 23:02:35 2019
exit01            psu2fan1        psu2 fan                            ok                                             Wed Feb  6 23:02:35 2019
exit02            fan1            fan tray 1, fan 1                   ok                                             Wed Feb  6 23:03:35 2019
exit02            fan2            fan tray 1, fan 2                   ok                                             Wed Feb  6 23:03:35 2019
exit02            fan3            fan tray 2, fan 1                   ok                                             Wed Feb  6 23:03:35 2019
exit02            fan4            fan tray 2, fan 2                   ok                                             Wed Feb  6 23:03:35 2019
exit02            fan5            fan tray 3, fan 1                   ok                                             Wed Feb  6 23:03:35 2019
exit02            fan6            fan tray 3, fan 2                   ok                                             Wed Feb  6 23:03:35 2019
exit02            psu1fan1        psu1 fan                            ok                                             Wed Feb  6 23:03:35 2019
exit02            psu2fan1        psu2 fan                            ok                                             Wed Feb  6 23:03:35 2019
leaf01            fan1            fan tray 1, fan 1                   ok                                             Wed Feb  6 23:01:12 2019
leaf01            fan2            fan tray 1, fan 2                   ok                                             Wed Feb  6 23:01:12 2019
leaf01            fan3            fan tray 2, fan 1                   ok                                             Wed Feb  6 23:01:12 2019
leaf01            fan4            fan tray 2, fan 2                   ok                                             Wed Feb  6 23:01:12 2019
leaf01            fan5            fan tray 3, fan 1                   ok                                             Wed Feb  6 23:01:12 2019
leaf01            fan6            fan tray 3, fan 2                   ok                                             Wed Feb  6 23:01:12 2019
leaf01            psu1fan1        psu1 fan                            ok                                             Wed Feb  6 23:01:12 2019
leaf01            psu2fan1        psu2 fan                            ok                                             Wed Feb  6 23:01:12 2019
leaf02            fan1            fan tray 1, fan 1                   ok                                             Wed Feb  6 22:59:54 2019
leaf02            fan2            fan tray 1, fan 2                   ok                                             Wed Feb  6 22:59:54 2019
leaf02            fan3            fan tray 2, fan 1                   ok                                             Wed Feb  6 22:59:54 2019
leaf02            fan4            fan tray 2, fan 2                   ok                                             Wed Feb  6 22:59:54 2019
leaf02            fan5            fan tray 3, fan 1                   ok                                             Wed Feb  6 22:59:54 2019
...

    
```

</div>
