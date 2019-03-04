# NetQ Command Line Overview

The NetQ CLI provides access to all of the network state and event
information collected by the NetQ Agents. It behaves the same way most
CLIs behave, with groups of commands used to display related
information, the ability to use TAB completion when entering commands,
and to get help for given commands and options. The commands are grouped
into four categories: check and show, agent and notifier, trace, and
resolve.

The NetQ command line interface only runs on switches and server hosts
implemented with Intel x86 or ARM-based architectures. If you are unsure
what architecture your switch or server employs, check the Cumulus
Hardware Compatibility List and verify the value in the Platforms tab
&gt; CPU column.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes...

-   [CLI Access](#NetQCommandLineOverview-CLIAccess)
    -   [Command Line
        Structure](#NetQCommandLineOverview-ComStructCommandLineStructure)
    -   [Command
        Syntax](#NetQCommandLineOverview-ComSyntaxCommandSyntax)
    -   [Command Output](#NetQCommandLineOverview-ComOutCommandOutput)
    -   [Command
        Prompts](#NetQCommandLineOverview-ComPromptCommandPrompts)
    -   [Command
        Completion](#NetQCommandLineOverview-ComCompCommandCompletion)
    -   [Command Help](#NetQCommandLineOverview-ComHelpCommandHelp)
    -   [Command
        History](#NetQCommandLineOverview-ComHistCommandHistory)
-   [Command Categories](#NetQCommandLineOverview-CommandCategories)
    -   [Check and Show
        Commands](#NetQCommandLineOverview-ChkShCmdsCheckandShowCommands)
    -   [Agent and Event Notification
        Commands](#NetQCommandLineOverview-AgentNotifCmdsAgentandEventNotificationCommands)
    -   [Trace Command](#NetQCommandLineOverview-TraceCmdTraceCommand)
    -   [Resolve
        Command](#NetQCommandLineOverview-ResolveCmdResolveCommand)
-   [Command Changes](#NetQCommandLineOverview-CommandChanges)
    -   [New Commands](#NetQCommandLineOverview-NewCommands)
    -   [Modified Commands](#NetQCommandLineOverview-ModifiedCommands)
    -   [Deprecated
        Commands](#NetQCommandLineOverview-DeprecatedCommands)

## CLI Access

When NetQ is installed, the CLI is also installed and enabled (refer to
the [Install NetQ](Install_NetQ) topic). Simply log in to any network
node to access the command line. 

To access the CLI from a switch or server:

1.  Log in to the device. This example uses the default username of
    cumulus and a hostname of switch.

    ``` text
    <computer>:~<username>$ ssh cumulus@switch
    ```

2.  Enter your password to reach the command prompt. The default
    password is CumulusLinux! For example:

    ``` text
    Enter passphrase for key '/Users/<username>/.ssh/id_rsa': <enter CumulusLinux! here>
    Welcome to Ubuntu 16.04.3 LTS (GNU/Linux 4.4.0-112-generic x86_64)
     * Documentation:  https://help.ubuntu.com
     * Management:     https://landscape.canonical.com
     * Support:        https://ubuntu.com/advantage
    Last login: Tue Feb 11 09:28:12 2019 from 10.0.0.14
    cumulus@switch:~$ 
    ```

3.  Run commands. For example:

    ``` text
    <username>@<hostname>:~$ netq show agents
    <username>@<hostname>:~$ netq check bgp
    ```

Command Line Basics

This section describes the core structure and behavior of the NetQ CLI.
It includes the following:

-   Command Line Structure
-   Command Syntax
-   [Command Output](#NetQCommandLineOverview-ComOut)
-   [Command Prompts](#NetQCommandLineOverview-ComPrompt) 
-   Command Completion
-   Command Help 
-   [Command History](#NetQCommandLineOverview-ComHist)

### Command Line Structure

The Cumulus NetQ command line has a flat structure as opposed to a modal
structure. This means that all commands can be run from the primary
prompt instead of only in a specific mode. For example, some command
lines require the administrator to switch between a configuration mode
and an operation mode. Configuration commands can only be run in the
configuration mode and operational commands can only be run in operation
mode. This structure requires the administrator to switch between modes
to run commands which can be tedious and time consuming. Cumulus NetQ
command line enables the administrator to run all of its commands at the
same level.

### Command Syntax

NetQ CLI commands all begin with netq. Their basic syntax is as follows:

``` text
netq [<hostname>] (check|show) <object> <options>
netq trace <options>
netq resolve
netq config <action> [<options>] [vrf <vrf>]
```

| Symbols                  | Meaning                                                                                           |
|--------------------------|---------------------------------------------------------------------------------------------------|
| Parentheses ( )          | Enter one of the objects or keywords                                                              |
| Square brackets \[ \]    | Optional parameter; enter keyword or keyword-value pair as needed                                 |
| Angle brackets &lt; &gt; | Variable value for a keyword or option; required, enter according to your deployment nomenclature |
| Pipe \|                  | Separates keyword options, also separates value options; enter one keyword and zero or one value  |

For example, in the `netq check` command:

-   \[\] is an optional parameter with a variable value named hostname
-   &lt;object&gt; represents a number of possible key words, such as
    *agents, bgp, evpn,* and so forth
-   &lt;options&gt; represents a number of possible conditions for the
    given object, such as *around, vrf,* or *json*

Thus some valid commands are:

-   `netq check agents json`
-   `netq show bgp`
-   `netq config restart agent`

### Command Output

The command output presents results in color for many commands. Results
with errors are shown in red, and warnings are shown in yellow. Results
without errors or warnings are shown in either black or green. VTEPs are
shown in blue. A node in the *pretty* output is shown in **bold**, and a
router interface is wrapped in angle brackets (&lt; &gt;). To view the
output with only black text, run the `netq config del color` command.
You can view output with colors again by running
`netq config add color`.

All check and show commands are run with a default timeframe of now to
one hour ago, unless you specify an approximate time using the
`around` keyword. For example, running netq check bgp shows the status
of BGP over the last hour. Running netq show bgp around 3h shows the
status of BGP three hours ago.

### Command Prompts

NetQ code examples use the following prompts:

-   `cumulus@switch:~$   `Indicates the user *cumulus* is logged in to a
    switch to run the example command
-   `cumulus@host:~$     `Indicates the user *cumulus* is logged in to a
    host to run the example command

The switches must be running the Cumulus Linux operating system (OS),
NetQ Platform software, and the NetQ Agent. The hosts must be running
CentOS, RHEL, or Ubuntu OS and NetQ Agent. Refer to the [Install
NetQ](Install_NetQ) topic for details.

### **Command Completion**

As you enter commands, you can get help with the valid keywords or
options using the Tab key. For example, using Tab completion with netq
check displays the possible objects for the command, and returns you to
the command prompt to complete the command.

``` text
cumulus@switch:~$ netq check <<press Tab>>
    agents      :  Netq agent
    bgp         :  BGP info
    clag        :  Cumulus Multi-chassis LAG
    evpn        :  EVPN
    interfaces  :  network interface port
    license     :  License information
    lnv         :  Lightweight Network Virtualization info
    mtu         :  Link MTU
    ntp         :  NTP
    ospf        :  OSPF info
    sensors     :  Temperature/Fan/PSU sensors
    vlan        :  VLAN
    vxlan       :  VXLAN data path
cumulus@switch:~$ netq check 
```

### Command Help

As you enter commands, you can get help with command syntax by
entering help at various points within a command entry. For example, to
find out what options are available for a BGP check, enter help after
entering a portion of the netq check command. In this example, you can
see that there are two possible commands related to BGP checks and the
display shows the options available for each.

``` text
cumulus@switch:~$ netq check bgp help
Commands:
   netq check bgp [vrf <vrf>] [around <text-time>] [json]
cumulus@switch:~$
```

To see an exhaustive list of commands, run:

``` text
cumulus@switch:~$ netq help list verbose
```

### Command History

The CLI stores commands issued within a session, which enables you to
review and rerun commands that have already been run.  At the command
prompt, press the **Up Arrow** and **Down Arrow** keys to move back and
forth through the list of commands previously entered. When you have
found a given command, you can run the command by pressing **Enter**,
just as you would if you had entered it manually. Optionally you can
modify the command before you run it.

## Command Categories

While the CLI has a flat structure, the commands can be conceptually
grouped into four functional categories: 

-   Check and Show Commands
-   Agent and Notifier Commands
-   Trace Command
-   Resolve Command

### Check and Show Commands

The check and show commands enable the network administrator to view the
current and historical state of the network by manually monitoring for
errors and misconfigurations in the network. Check commands run
validation checks against various components and configured protocols
and services to determine the network is operating as expected. Show
commands present details about the current or historical configuration
and status of the various component, protocol or service.

Validation checks can be performed for the following:

-   agents: NetQ Agents operation on all switches and hosts
-   bgp:  BGP (Border Gateway Protocol) operation across the network
    fabric
-   clag:  Cumulus Multi-chassis LAG (link aggregation) operation
-   evpn:  EVPN (Ethernet Virtual Private Network) operation
-   interfaces:  network interface port operation
-   license:  License status
-   lnv:  Lightweight Network Virtualization operation
-   mtu:  Link MTU (maximun transmission unit) consistency across fabric
-   ntp:  NTP (Network Time Protocol) operation
-   ospf:  OSPF (Open Shortest Path First) operation
-   sensors:  Temperature/Fan/PSU sensor operation
-   vlan:  VLAN (Virtual Local Area Network) operation
-   vxlan:  VXLAN (Virtual Extensible LAN) data path operation

The configuration and status can be shown for the following:

-   agents: NetQ Agents status on switches and hosts
-   bgp:  BGP status across the network fabric
-   clag:  CLAG status
-   docker: Docker Swarm, container and network status
-   events: Display changes over time
-   evpn:  EVPN status
-   interfaces:  network interface port status
-   inventory: hardware component information
-   ip: IPv4 status
-   ipv6: IPv6 status
-   kubernetes: Kubernetes cluster, daemon, pod, node, service and
    replication status
-   lldp: LLDP status
-   lnv:  Lightweight Network Virtualization status
-   macs: MAC table or address information
-   notification: Slack or PagerDuty notification configurations 
-   ntp:  NTP status
-   ospf:  OSPF status
-   sensors:  Temperature/Fan/PSU sensor status
-   services: System services status
-   vlan:  VLAN status
-   vxlan:  VXLAN data path status

The commands take the form of
`netq [<hostname>] (check|show) <object> <options>`, where the object is
one of the components, protocols, or services listed here and the
options vary according to the object. The commands can be restricted
from showing the information for *all* devices to showing information
for a selected device using the *hostname* keyword.

This example shows the standard and restricted output for the
`netq show agents` command. 

``` text
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
  
cumulus@switch:~$ netq leaf01 show agents
Matching agents records:
Hostname          Status           NTP Sync Version                              Sys Uptime                Agent Uptime              Reinitialize Time          Last Changed
----------------- ---------------- -------- ------------------------------------ ------------------------- ------------------------- -------------------------- -------------------------
leaf01            Fresh            yes      2.0.0-cl3u11~1549993210.e902a94      4h:27m:42s                4h:21m:28s                4h:21m:28s                 Tue Feb 12 18:13:28 2019
```

### Agent and Event Notification Commands

The agent and notification commands enable the network administrator to
configure individual NetQ Agents and the notification application
integrations. Refer to the Cumulus NetQ Primer and Configuring Optional
NetQ Capabilities topics for details about these NetQ components.

The agent configuration commands enable you to add and remove agents
from switches and hosts, start and stop agent operations, add and remove
Docker and Kubernetes container monitoring, add or remove sensors, debug
the agent, and add or remove FRR (FRRouting). Commands apply to one
agent at a time, and are run from the switch or host where the NetQ
Agent resides.

The agent configuration commands include: 

``` text
netq config add agent docker-monitor [poll-period <text-duration-period>]
netq config add agent frr-monitor [<text-frr-docker-name>]
netq config add agent kubernetes-monitor [poll-period <text-duration-period>]
netq config add agent loglevel [debug|error|info|warning]
netq config add agent sensors
netq config add agent server <text-opta-ip> [port <text-opta-port>] [vrf <text-vrf-name>]
 
netq config del agent docker-monitor
netq config del agent frr-monitor
netq config del agent kubernetes-monitor
netq config del agent loglevel
netq config del agent sensors
netq config del agent server
 
netq config (start|stop|status|restart) agent
netq config show agent [kubernetes-monitor|docker-monitor|loglevel|stats|sensors|frr-monitor] [json]
```

The notification configuration commands enable you to add, remove and
show notification application integrations. The commands include:

``` text
netq add notification channel slack <text-channel-name> webhook <text-webhook-url> [severity info|severity warning|severity error|severity debug|severity info] [tag <text-slack-tag>]

netq add notification channel pagerduty <text-channel-name> api-access-key <text-api-access-key> api-channel-key <text-api-channel-key> [severity info|severity warning|severity error|severity debug|severity info]
netq add notification channel pagerduty <text-channel-name> api-channel-key <text-api-channel-key> api-access-key <text-api-access-key> [severity info|severity warning|severity error|severity debug|severity info]

netq add notification filter <text-filter-name> [severity info|severity warning|severity error|severity debug|severity info] [rule <text-rule-name-anchor>] [channel <text-channel-name-anchor>]

netq add notification rule <text-rule-name> key <text-rule-key> value <text-rule-value>
netq del notification channel <text-channel-name-anchor>
netq del notification filter <text-filter-name-anchor>
netq del notification rule <text-rule-name-anchor>
netq show notification [channel|filter|rule] [json]
```

Notice that the `netq add notification channel pagerduty` command is
presented twice here because the `api-access-key` and
the `api-channel-key` are not order dependent. Either can be entered
first. The rest of the syntax is the same.

### Trace Command

The trace command enables the network administrator to view the
available paths between two nodes on the network currently and at a time
in the past. You can base the trace on MAC or IP addresses, perform the
trace in only one direction or both, and view the output in one of three
formats (json, pretty, and detail). JSON output provides the output in a
JSON file format for ease of importing to other applications or
software. Pretty output lines up the paths in a pseudo-graphical manner
to help visualize multiple paths. Detail output is useful for traces
with higher hop counts where the pretty output wraps lines, making it
harder to interpret the results. The detail output displays a table with
a row for each path. The trace command also has a detailed usage example
for reference. 

The trace command syntax is:

``` text
netq trace <mac> [vlan <1-4096>] from (<src-hostname>|<ip-src>) [vrf <vrf>] [around <text-time>] [json|detail|pretty] [debug]
netq trace <ip> from (<src-hostname>|<ip-src>) [vrf <vrf>] [around <text-time>] [json|detail|pretty] [debug] 
```

Example: Running a trace based on the destination IP address,
in pretty output with a small number of resulting paths:

``` text
cumulus@switch:~$ netq trace 192.168.0.11 from Leaf04 pretty
Number of Paths: 2
Number of Paths with Errors: 0
Number of Paths with Warnings: 0
Path MTU: 9202

 Leaf04 uplink-2 -- downlink-5 Spine02 downlink-1 -- uplink-2 Leaf01 <uplink-2>
        uplink-1 -- downlink-5 Spine01 downlink-1 -- uplink-1 Leaf01 <uplink-2>
```

Example: Running a trace based on the destination MAC address, in pretty
output with a larger number of resulting paths:

``` text
cumulus@switch:~$ netq trace A0:00:00:00:00:11 vlan 1001 from Server03 detail
Number of Paths: 6
Number of Paths with Errors: 0
Number of Paths with Warnings: 0
Path MTU: 9152

 Server03 bond1.1001 -- swp7 <vlan1001> Leaf02 vni: 34 swp5 -- swp4 Spine03 swp7 -- swp5 vni: 34 Leaf04 swp6 -- swp1.1001 Server03 <swp1.1001>
                                                       swp4 -- swp4 Spine02 swp7 -- swp4 vni: 34 Leaf04 swp6 -- swp1.1001 Server03 <swp1.1001>
                                                       swp3 -- swp4 Spine01 swp7 -- swp3 vni: 34 Leaf04 swp6 -- swp1.1001 Server03 <swp1.1001>
          bond1.1001 -- swp7 <vlan1001> Leaf01 vni: 34 swp5 -- swp3 Spine03 swp7 -- swp5 vni: 34 Leaf04 swp6 -- swp1.1001 Server03 <swp1.1001>
                                                       swp4 -- swp3 Spine02 swp7 -- swp4 vni: 34 Leaf04 swp6 -- swp1.1001 Server03 <swp1.1001>
                                                       swp3 -- swp3 Spine01 swp7 -- swp3 vni: 34 Leaf04 swp6 -- swp1.1001 Server03 <swp1.1001>
```

**Example**: Running a trace based on the destination IP address,
in detail output with a small number of resulting paths:

``` plain
cumulus@switch:~$ netq trace 10.0.0.130 from 10.0.0.197 detail
Number of Paths: 2
Number of Paths with Errors: 0
Number of Paths with Warnings: 0
Path MTU: 9152
Id  Hop Hostname        InPort          InVlan InTunnel              InRtrIf         InVRF           OutRtrIf        OutVRF          OutTunnel             OutPort         OutVlan
--- --- --------------- --------------- ------ --------------------- --------------- --------------- --------------- --------------- --------------------- --------------- -------
1   1   hostd-12                                                                                                                                           torbond1.1002   1002
    2   torc-12         swp8            1002                                                         vlan1002        vrf1                                  peerlink-1      1002
    3   torc-11         swp6            1002                         vlan1002        vrf1                                                                  vlan1002        1002
--- --- --------------- --------------- ------ --------------------- --------------- --------------- --------------- --------------- --------------------- --------------- -------
2   1   hostd-12                                                                                                                                           torbond1.1002   1002
    2   torc-11         swp8            1002                                                                                                               vlan1002        1002
--- --- --------------- --------------- ------ --------------------- --------------- --------------- --------------- --------------- --------------------- --------------- -------
```

### Resolve Command

The resolve command enables the network administrator to view Cumulus
Linux command results with more contextual information and colored
highlights. By piping the commands through netq resolve, the output
shows hostnames and interfaces in green, for example.

To show routes installed by the kernel, you would run
the `ip route show proto kernel` command:

``` text
cumulus@leaf01:~$ ip route show proto kernel
3.0.2.128/26 dev VlanA-1.103  scope link  src 3.0.2.131 
3.0.2.128/26 dev VlanA-1-103-v0  scope link  src 3.0.2.129 
3.0.2.192/26 dev VlanA-1.104  scope link  src 3.0.2.195 
3.0.2.192/26 dev VlanA-1-104-v0  scope link  src 3.0.2.193 
3.0.3.0/26 dev VlanA-1.105  scope link  src 3.0.3.3 
3.0.3.0/26 dev VlanA-1-105-v0  scope link  src 3.0.3.1 
3.0.3.64/26 dev VlanA-1.106  scope link  src 3.0.3.67 
3.0.3.64/26 dev VlanA-1-106-v0  scope link  src 3.0.3.65 
169.254.0.8/30 dev peerlink-1.4094  scope link  src 169.254.0.10 
192.168.0.0/24 dev eth0  scope link  src 192.168.0.15
```

You can enhance the output to display the node names and interfaces by
piping the output through `netq resolve` so the output looks like this:

    cumulus@leaf01:~$ ip route show proto kernel | netq resolve
    10.0.0.0/22 (multiple:) dev eth0  scope link  src 10.0.0.165 (cel-smallxp-13:eth0) 
    3.0.2.128/26 ( server02 : torbond1.103 ) dev VlanA-1.103  scope link  src 3.0.2.131 ( leaf02 : VlanA-1.103 )  
    3.0.2.128/26 ( server02 : torbond1.103 ) dev VlanA-1-103-v0  scope link  src 3.0.2.129 ( leaf02 : VlanA-1-103-v0 )  
    3.0.2.192/26 ( leaf02 : VlanA-1-104-v0 ) dev VlanA-1.104  scope link  src 3.0.2.195 ( leaf02 : VlanA-1.104 )  
    3.0.2.192/26 ( leaf02 : VlanA-1-104-v0 ) dev VlanA-1-104-v0  scope link  src 3.0.2.193 ( leaf02 : VlanA-1-104-v0 )  
    3.0.3.0/26 ( server01 : torbond1.105 ) dev VlanA-1.105  scope link  src 3.0.3.3 ( leaf02 : VlanA-1.105 )  
    3.0.3.0/26 ( server01 : torbond1.105 ) dev VlanA-1-105-v0  scope link  src 3.0.3.1 ( leaf02 : VlanA-1-105-v0 )  
    3.0.3.64/26 ( server02 : torbond1.106 ) dev VlanA-1.106  scope link  src 3.0.3.67 ( leaf02 : VlanA-1.106 )  
    3.0.3.64/26 ( server02 : torbond1.106 ) dev VlanA-1-106-v0  scope link  src 3.0.3.65 ( leaf01 : VlanA-1-106-v0 )  
    169.254.0.8/30 ( leaf02 : peerlink-1.4094 ) dev peerlink-1.4094  scope link  src 169.254.0.10 ( leaf02 : peerlink-1.4094 )  
    192.168.0.0/24 ( server02 : eth0 ) dev eth0  scope link  src 192.168.0.15 ( leaf01 : eth0 )

## Command Changes

A number of commands have changed in this release to accommodate the
addition of new keywords and options or to simplify their syntax.
Additionally, new commands have been added and others have been removed.
A summary of those changes is provided here.

### New Commands

The following table summarizes the new commands available with this
release.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Summary</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code>netq config (add|del) agent server </code></p></td>
<td><p>Adds or removes the NetQ Agent daemon to the network device where this command is run.</p></td>
</tr>
<tr class="even">
<td><p><code>netq config (add|del) cli server</code></p></td>
<td>Adds or removes the CLI daemon to the network device where this command is run.</td>
</tr>
<tr class="odd">
<td><code>netq config show (agent|all|cli) [json]</code></td>
<td>Displays configuration settings for the NetQ Agent, CLI, or both.</td>
</tr>
<tr class="even">
<td><p><code>netq (add|del|show) notification</code></p></td>
<td><p>Configuring integrations to third-party event notification tools, such as Pager Duty and Slack. This configuration was previously accomplished using the <code>netq config ts (add|del|show) notifier</code> commands.</p></td>
</tr>
<tr class="odd">
<td><code>netq show events</code></td>
<td>Displays events that have occurred network-wide during a given time range for a specific device, severity level, and/or network protocol or service. Previously these events were obtained through the <code>netq show changes</code> command.</td>
</tr>
</tbody>
</table>

### Modified Commands

The following table summarizes the commands that have been changed with
this release.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>What Changed</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code>netq &lt;hostname&gt; show * changes [between &lt;text-time&gt; and &lt;text-endtime&gt;] [around &lt;text-time&gt;] [json]</code></p></td>
<td>The changes and between options have been removed. Use <code>netq show events</code> to obtain this data.</td>
</tr>
<tr class="even">
<td><p><code>netq trace &lt;ip&gt; from (&lt;src-hostname&gt;|&lt;ip-src&gt;) [vrf &lt;vrf&gt;] [around &lt;text-time&gt;] [bidir] [json|detail|pretty] [debug]</code><br />
<code>netq trace &lt;mac&gt; [vlan &lt;1-4096&gt;] from (&lt;src-hostname&gt;|&lt;ip-src&gt;) [vrf &lt;vrf&gt;] [around &lt;text-time&gt;] [bidir] [json|detail|pretty] [debug]</code></p></td>
<td>The bidirectional option (bidir) has been deprecated. Run the command in each direction when path validation is desired for both directions.</td>
</tr>
</tbody>
</table>

### Deprecated Commands

The following table summarizes the commands that have been removed and a
recommended alternative, if appropriate.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Alternative Command</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code>netq config ts (add|del|show) (notifier|server)</code></p></td>
<td><p><code>netq (add|del|show) notification</code> and <code>netq config (add|del|show) (agent server|cli server)</code></p></td>
</tr>
<tr class="even">
<td><code>netq config ts (start|stop|status|restart) notifier</code></td>
<td><code>netq config (start|stop|status|restart) agent</code></td>
</tr>
<tr class="odd">
<td><code>netq config ts decommission</code></td>
<td><code>netq config del agent server</code></td>
</tr>
<tr class="even">
<td><code>netq example</code></td>
<td><code>netq help</code></td>
</tr>
<tr class="odd">
<td><code>netq-shell</code></td>
<td>The netq-shell has been removed since all NetQ commands can be run from any node where a NetQ Agent is installed.</td>
</tr>
</tbody>
</table>

  
  
