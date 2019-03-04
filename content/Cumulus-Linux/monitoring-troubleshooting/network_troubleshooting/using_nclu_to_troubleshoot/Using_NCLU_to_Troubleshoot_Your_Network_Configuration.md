# Using NCLU to Troubleshoot Your Network Configuration

The [network command line utility](Network_Command_Line_Utility_-_NCLU)
(NCLU) can quickly return a lot of information about your network
configuration. 

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [net show
    Commands](#UsingNCLUtoTroubleshootYourNetworkConfiguration-netshowCommands)
-   [Show
    Interfaces](#UsingNCLUtoTroubleshootYourNetworkConfiguration-ShowInterfaces)
-   [Troubleshooting Example:
    OpenStack](#UsingNCLUtoTroubleshootYourNetworkConfiguration-TroubleshootingExample:OpenStack)
-   [Other Useful
    Features](#UsingNCLUtoTroubleshootYourNetworkConfiguration-OtherUsefulFeatures)
-   [Install netshow on a Linux
    Server](#UsingNCLUtoTroubleshootYourNetworkConfiguration-InstallnetshowonaLinuxServer)

## net show Commands

Running `net show` and pressing TAB displays all available command line
arguments usable by `net`. The output looks like this:

``` text
cumulus@switch:~$ net show <TAB> 
    bgp            :  Border Gateway Protocol
    bridge         :  A layer2 bridge
    clag           :  Multi-Chassis Link Aggregation
    commit         :  apply the commit buffer to the system
    configuration  :  Settings, configuration state, etc
    counters       :  show netstat counters
    hostname       :  System hostname
    igmp           :  Internet Group Management Protocol
    interface      :  An interface such as swp1, swp2, etc
    ip             :  Internet Protocol version 4
    ipv6           :  Internet Protocol version 6
    lldp           :  Link Layer Discovery Protocol
    lnv            :  Lightweight Network Virtualization
    mroute         :  Configure static unicast route into MRIB for multicast RPF lookup
    msdp           :  Multicast Source Discovery Protocol
    ospf           :  Open Shortest Path First (OSPFv2)
    ospf6          :  Open Shortest Path First (OSPFv3)
    pim            :  Protocol Independent Multicast
    rollback       :  revert to a previous configuration state
    route          :  Static routes
    route-map      :  Route-map
    system         :  System information
    version        :  Version number
```

## Show Interfaces

To show all available interfaces that are physically UP,
run `net show interface`:

``` text
cumulus@switch:~$ net show interface

    Name    Speed    MTU    Mode           Summary
--  ------  -------  -----  -------------  --------------------------------------
UP  lo      N/A      65536  Loopback       IP: 10.0.0.11/32, 127.0.0.1/8, ::1/128
UP  eth0    1G       1500   Mgmt           IP: 192.168.0.11/24(DHCP)
UP  swp1    1G       1500   Access/L2      Untagged: br0
UP  swp2    1G       1500   NotConfigured
UP  swp51   1G       1500   NotConfigured
UP  swp52   1G       1500   NotConfigured
UP  blue    N/A      65536  NotConfigured
UP  br0     N/A      1500   Bridge/L3      IP: 172.16.1.1/24
                                           Untagged Members: swp1
                                           802.1q Tag: Untagged
                                           STP: RootSwitch(32768)
UP  red     N/A      65536  NotConfigured
```

Whereas `net show interface all` displays every interface regardless of
state:

``` text
cumulus@switch:~$ net show interface all 
       Name     Speed    MTU    Mode           Summary
-----  -------  -------  -----  -------------  --------------------------------------
UP     lo       N/A      65536  Loopback       IP: 10.0.0.11/32, 127.0.0.1/8, ::1/128
UP     eth0     1G       1500   Mgmt           IP: 192.168.0.11/24(DHCP)
UP     swp1     1G       1500   Access/L2      Untagged: br0
UP     swp2     1G       1500   NotConfigured
ADMDN  swp45    0M       1500   NotConfigured
ADMDN  swp46    0M       1500   NotConfigured
ADMDN  swp47    0M       1500   NotConfigured
ADMDN  swp48    0M       1500   NotConfigured
ADMDN  swp49    0M       1500   NotConfigured
ADMDN  swp50    0M       1500   NotConfigured
UP     swp51    1G       1500   NotConfigured
UP     swp52    1G       1500   NotConfigured
UP     blue     N/A      65536  NotConfigured
UP     br0      N/A      1500   Bridge/L3      IP: 172.16.1.1/24
                                               Untagged Members: swp1
                                               802.1q Tag: Untagged
                                               STP: RootSwitch(32768)
UP     red      N/A      65536  NotConfigured
ADMDN  vagrant  0M       1500   NotConfigured
```

You can get information about the switch itself by running
`net show system`:

``` text
cumulus@switch:~$ net show system

Penguin Arctica 4806XP

Cumulus Version 3.4.0

Build: Cumulus Linux 3.4.0

Chipset: Broadcom Trident2 BCM56854

Port Config: 48 x 10G-SFP+ & 6 x 40G-QSFP+

CPU: (x86_64) Intel Atom C2558 2.40GHz
Uptime: 8 days, 0:45:29
```

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>VISIBLE ONLY TO EDITORS</p>
<h2 id="UsingNCLUtoTroubleshootYourNetworkConfiguration-TroubleshootingExample:OpenStack">Troubleshooting Example: OpenStack</h2>
<p>Looking at an OpenStack Environment, here is the physical diagram:</p>
<p><img src="attachments/8362599/8362598.png" height="400" /></p>
<p>For server2, <code>netshow</code> can help us see the OpenStack network configuration. The <code>netshow</code> output below shows an summary of a Kilo-based OpenStack server running 3 tenants.</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="text" data-syntaxhighlighter-params="brush: text; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: text; gutter: false; theme: Confluence"><code>[root@host ~]# netshow int
--------------------------------------------------------------------
To view the legend,  rerun &quot;netshow&quot; cmd with the  &quot;--legend&quot; option
--------------------------------------------------------------------
    Name            Speed    MTU    Mode            Summary
--  --------------  -------  -----  --------------  ---------------------------------------------------------------------
UP  brq0b6f10c7-42  N/A      1500   Bridge/L2       802.1q Tag: 141
                                                    STP: Disabled
                                                    Untagged Members: tap079cf993-c7
                                                    Tagged Members: eth1.141
UP  brq8cdc0589-9b  N/A      1500   Bridge/L2       802.1q Tag: 155
                                                    STP: Disabled
                                                    Untagged Members: tap5353b20a-68
                                                    Tagged Members: eth1.155
UP  brq8ff99102-29  N/A      1500   Bridge/L2       802.1q Tag: 168
                                                    STP: Disabled
                                                    Untagged Members: tapfc2203e4-5b
                                                    Tagged Members: eth1.168
UP  eth0            N/A      1500   Interface/L3    IP: 192.168.0.105/24
UP  eth1            N/A      1500   IntTypeUnknown
UP  eth1            N/A      1500   Trunk/L2        Bridge Membership:
                                                    Tagged: brq0b6f10c7-42(141), brq8cdc0589-9b(155), brq8ff99102-29(168)
UP  lo              N/A      65536  Loopback        IP: 127.0.0.1/8, ::1/128
UP  tap079cf993-c7  10M      1500   Access/L2       Untagged: brq0b6f10c7-42
UP  tap5353b20a-68  10M      1500   Access/L2       Untagged: brq8cdc0589-9b
UP  tapfc2203e4-5b  10M      1500   Access/L2       Untagged: brq8ff99102-29</code></pre>
</div>
</div>
<p>OpenStack interface numbering is not the easiest read, but here <code>netshow</code> can quickly show you:</p>
<ul>
<li>A list of all the interfaces in admin UP state and carrier UP state</li>
<li>3 bridges</li>
<li>That STP is disabled for all the bridges</li>
<li>An uplink trunk interface with 3 VLANs configured on it</li>
<li>Many tap interfaces, most likely the virtual machines</li>
</ul>
<p>This output took about 5 seconds to get and another 1 minute to analyze. To get this same level of understanding using traditional tools such as:</p>
<ul>
<li>ip link show</li>
<li>brctl show</li>
<li>ip addr show</li>
</ul>
<p>... could take about 10 minutes. This is a significant improvement in productivity!</p>
<p><code>netshow</code> uses a plugin architecture and can be easily expanded. An OpenStack interface discovery module is currently in development. If <code>netshow</code> is run on a hypervisor with OpenStack Keystone login environment variables like <code>OS_TENANT_NAME</code>, <code>netshow</code> should show the above output with a better interface discovery state, where <code>netshow</code> collects from OpenStack information from <code>libvirt</code>, <code>nova</code> and <code>neutron</code> to overlay the virtual machine and tenant subnet information over the interface kernel state information.</p>
<p>Interface discovery is one of the most powerful features of <code>netshow</code>. The ability to expand its interface discovery capabilities further simplifies understanding basic network troubleshooting, making the Linux administrator more productive and improving time to resolution while investigating network problems.</p></td>
</tr>
</tbody>
</table>

## Other Useful Features

NCLU uses the [python
network-docopt](https://pypi.python.org/pypi/network-docopt) package.
This is inspired by [docopt](https://github.com/docopt/docopt) and
provides the ability to specify partial commands, without tab completion
and running the complete option. For example:

`net show int` runs `netshow interface`  
`net show sys` runs `netshow system`

## Install netshow on a Linux Server

`netshow` is a tool developed by Cumulus Networks for troubleshooting
networks. In Cumulus Linux, it's been replaced by NCLU. However, NCLU is
not available on Linux hosts at this time, so Cumulus Networks
recommends you use `netshow` to help troubleshoot servers. To
install `netshow` on a Linux server, run:

``` text
root@host:~# pip install netshow-linux-lib
```

Debian and Red Hat packages will be available in the near future.

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[openstack-diagram.png](attachments/8362599/8362598.png) (image/png)  
