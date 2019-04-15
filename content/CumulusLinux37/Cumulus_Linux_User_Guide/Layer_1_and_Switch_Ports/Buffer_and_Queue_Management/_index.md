---
title: Buffer and Queue Management
author: Unknown
weight: 95
pageID: 8363032
---
# Buffer and Queue Management

<span id="src-8363032_indexterm-2D583928E5DAF48A6770F72F1C6406D1">Hardware
</span><span id="src-8363032_indexterm-4B5C2F6D4E2914FF2CFB24549D6C4B6A">datapath
configuration manages
</span><span id="src-8363032_indexterm-D2F8EE5315B1D539A23B20078FA5300B">packet
buffering,
</span><span id="src-8363032_indexterm-767B31A3202D1E41D99029A46A8995C3">queueing
and </span>scheduling in hardware. There are two configuration input
files:

  - `/etc/cumulus/datapath/traffic.conf`, which describes priority
    groups and assigns the scheduling algorithm and
    weights

  - `/usr/lib/python2.7/dist-packages/cumulus/__chip_config/[bcm|mlx]/datapath.conf`<span id="src-8363032_indexterm-4823FFFC68BB2272EE28CC8530D33B76">,
    </span>which assigns buffer space and egress queues
    
    {{%notice note%}}
    
    While it's possible to change the buffer limits in the datapath.conf
    file, Cumulus Networks strongly recommends you [work with a Cumulus
    support
    engineer](https://support.cumulusnetworks.com/hc/en-us/requests/new)
    to do so.
    
    {{%/notice%}}

<span id="src-8363032_indexterm-CC0E58FE49C795179299C8294FA84362">Each
packet is assigned to an ASIC
</span><span id="src-8363032_indexterm-CE871240F2E5B6503C936873E2660898">Class
of Service (CoS) value based on the packet's priority value stored in
the
</span><span id="src-8363032_indexterm-54926F49A653D38EF589C7E704571CD9">802.1p
(Class of Service) or
</span><span id="src-8363032_indexterm-5B8794BE7577F37AED5293C0C8B36577">DSCP
(</span>Differentiated Services Code Point) header field. The choice to
schedule packets based on COS or DSCP is a configurable option in the
`/etc/cumulus/datapath/traffic.conf`<span id="src-8363032_indexterm-D2DD2BCB72B722E17F8806B44D3D2B5A">
</span>file.

Priority groups include:

  - *Control*: Highest priority traffic

  - *Service*: Second-highest priority traffic

  - *Bulk*: All remaining traffic

The scheduler is configured to use a hybrid scheduling algorithm. It
applies strict priority to control traffic queues and a weighted round
robin selection from the remaining queues. Unicast packets and multicast
packets with the same priority value are assigned to separate queues,
which are assigned equal scheduling weights.

Datapath configuration takes effect when you initialize `switchd`.
Changes to the `traffic.conf` file require you to [restart the
`switchd`](Configuring_switchd.html#src-8362561_Configuringswitchd-restartswitchd)
service.

{{%notice note%}}

Quality of Service (QoS) for switches on the following platforms only:

  - Broadcom Helix4, Tomahawk, Trident II, Trident II+ and Trident3

  - Mellanox Spectrum

{{%/notice%}}

## Commands

If you modify the configuration in the
`/etc/cumulus/datapath/traffic.conf` file, you must [restart
`switchd`](Configuring_switchd.html#src-8362561_Configuringswitchd-restartswitchd)
for the changes to take effect:

``` 
                   
cumulus@switch:~$ sudo systemctl restart switchd.service
   
    
```

## Configure Traffic Marking through ACL Rules

<span id="src-8363032_indexterm-DDDAAA68CA92DB233C379BDCB1B0F9D5">You
can </span>mark traffic for egress packets through `iptables` or
`ip6tables`<span id="src-8363032_indexterm-47A8CABB2966B8B9A2B85BF7F1233761">
rule classifications. To enable these </span>rules, you do one of the
following:

  - Mark DSCP values in egress packets.

  - Mark 802.1p CoS values in egress packets.

<span id="src-8363032_indexterm-8C8644BE794BE02CBD86B27BEC080061">To
enable traffic marking, use </span>`cl-acltool`. Add the `-p` option to
specify the location of the policy file. By default, if you don't
include the `-p` option, `cl-acltool` looks for the policy file in
`/etc/cumulus/acl/policy.d/`.

The `iptables`-/`ip6tables`-based marking is supported via the following
action extension:

``` 
                   
-j SETQOS --set-dscp 10 --set-cos 5
   
    
```

For `ebtables`, the setqos keyword must be in lowercase, as in:

``` 
                   
[ebtables]
-A FORWARD -o swp5 -j setqos --set-cos 5
   
    
```

You can specify one of the following targets for
SETQOS/setqos:

<div class="tablewrap">

| Option                  | Description                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \--set-cos INT          | Sets the datapath resource/queuing class value. Values are defined in [IEEE\_P802.1p](http://en.wikipedia.org/wiki/IEEE_P802.1p).                           |
| \--set-dscp value       | Sets the DSCP field in packet header to a value, which can be either a decimal or hex value.                                                                |
| \--set-dscp-class class | Sets the DSCP field in the packet header to the value represented by the DiffServ class value. This class can be EF, BE or any of the CSxx or AFxx classes. |

</div>

{{%notice note%}}

You can specify either `--set-dscp` or `--set-dscp-class`, but not both.

{{%/notice%}}

Here are two example rules:

``` 
                   
[iptables]
-t mangle -A FORWARD --in-interface swp+ -p tcp --dport bgp -j SETQOS --set-dscp 10 --set-cos 5
 
[ip6tables]
-t mangle -A FORWARD --in-interface swp+ -j SETQOS --set-dscp 10
   
    
```

<span id="src-8363032_indexterm-6A855B4116A0507CBD67B52A4A58AEE2">You
can put the rule in either the </span>*mangle* table or the default
*filter* table; the mangle table and filter table are put into separate
TCAM slices in the hardware.

To put the rule in the mangle table, include `-t mangle`; to put the
rule in the filter table, omit `-t
mangle`.

## Configure Priority Flow Control

*<span id="src-8363032_indexterm-CF4D39A3530E71DFBB6AB2D2506BCEBE">Priority
</span><span id="src-8363032_indexterm-2DCBC6A2EBB483600B91C286001242F0">flow
</span>control*, as defined in the [IEEE 802.1Qbb
standard](http://www.ieee802.org/1/pages/802.1bb.html), provides a
link-level flow control mechanism that can be controlled independently
for each Class of Service (CoS) with the intention to ensure no data
frames are lost when congestion occurs in a bridged network.

{{%notice note%}}

PFC is not supported on switches with the Helix4 ASIC.

{{%/notice%}}

PFC is a layer 2 mechanism that prevents congestion by throttling packet
transmission. When PFC is enabled for received packets on a set of
switch ports, the switch detects congestion in the ingress buffer of the
receiving port and signals the upstream switch to stop sending traffic.
If the upstream switch has PFC enabled for packet transmission on the
designated priorities, it responds to the downstream switch and stops
sending those packets for a period of time.

PFC operates between two adjacent neighbor switches; it does not provide
end-to-end flow control. However, when an upstream neighbor throttles
packet transmission, it could build up packet congestion and propagate
PFC frames further upstream: eventually the sending server could receive
PFC frames and stop sending traffic for a time.

The PFC mechanism can be enabled for individual switch priorities on
specific switch ports for RX and/or TX traffic. The switch port’s
ingress buffer occupancy is used to measure congestion. If congestion is
present, the switch transmits flow control frames to the upstream
switch. Packets with priority values that do not have PFC configured are
not counted during congestion detection; neither do they get throttled
by the upstream switch when it receives flow control frames.

PFC congestion detection is implemented on the switch using xoff and xon
threshold values for the specific ingress buffer which is used by the
targeted switch priorities. When a packet enters the buffer and the
buffer occupancy is above the xoff threshold, the switch transmits an
Ethernet PFC frame to the upstream switch to signal packet transmission
should stop. When the buffer occupancy drops below the xon threshold,
the switch sends another PFC frame upstream to signal that packet
transmission can resume. (PFC frames contain a quanta value to indicate
a timeout value for the upstream switch: packet transmission can resume
after the timer has expired, or when a PFC frame with quanta == 0 is
received from the downstream switch.)

After the downstream switch has sent a PFC frame upstream, it continues
to receive packets until the upstream switch receives and responds to
the PFC frame. The downstream ingress buffer must be large enough to
store those additional packets after the xoff threshold has been
reached.

{{%notice note%}}

Before Cumulus Linux 3.1.1, PFC was designated as a *lossless* priority
group. The lossless priority group has been removed from Cumulus Linux.

{{%/notice%}}

Priority flow control is fully supported on both
[Broadcom](https://cumulusnetworks.com/support/linux-hardware-compatibility-list/?CPUType=x86_64&Brand=broadcomtrident&Brand=broadcomtridentplus&SwitchSilicon=broadcomtrident2&Brand=broadcomtrident2plus&Brand=broadcomtriumph2)
and [Mellanox
switches](https://cumulusnetworks.com/support/linux-hardware-compatibility-list/?Brand=mellanox).

PFC is disabled by default in Cumulus Linux. Enabling priority flow
control (PFC) requires configuring the following settings in
`/etc/cumulus/datapath/traffic.conf` on the switch:

  - Specifying the name of the port group in `pfc.port_group_list` in
    brackets; for example, *pfc.port\_group\_list =
    \[pfc\_port\_group\]*.

  - Assigning a CoS value to the port group in
    `pfc.pfc_port_group.cos_list` setting. Note that *pfc\_port\_group*
    is the name of a port group you specified above and is used
    throughout the following settings.

  - Populating the port group with its member ports in
    `pfc.pfc_port_group.port_set`.

  - Setting a PFC buffer size in `pfc.pfc_port_group.port_buffer_bytes`.
    This is the maximum number of bytes allocated for storing bursts of
    packets, guaranteed at the ingress port. The default is *25000*
    bytes.

  - Setting the xoff byte limit in `pfc.pfc_port_group.xoff_size`. This
    is a threshold for the PFC buffer; when this limit is reached, an
    xoff transition is initiated, signaling the upstream port to stop
    sending traffic, during which time packets continue to arrive due to
    the latency of the communication. The default is *10000* bytes.

  - Setting the xon delta limit in `pfc.pfc_port_group.xon_delta`. This
    is the number of bytes to subtract from the xoff limit, which
    results in a second threshold at which the egress port resumes
    sending traffic. After the xoff limit is reached and the upstream
    port stops sending traffic, the buffer begins to drain. When the
    buffer reaches 8000 bytes (assuming default xoff and xon settings),
    the egress port signals that it can start receiving traffic again.
    The default is *2000* bytes.

  - Enabling the egress port to signal the upstream port to stop sending
    traffic (`pfc.pfc_port_group.tx_enable`). The default is *true*.

  - Enabling the egress port to receive notifications and act on them
    (`pfc.pfc_port_group.rx_enable`). The default is *true*.

  - The switch priority value(s) are mapped to the specific ingress
    buffer for each targeted switch port. Cumulus Linux looks at either
    the 802.1p bits or the IP layer DSCP bits depending on which is
    configured in the `traffic.conf` file to map packets to internal
    switch priority values.

The following configuration example shows PFC configured for ports swp1
through swp4 and swp6:

``` 
                   
# to configure priority flow control on a group of ports:
# -- assign cos value(s) to the cos list
# -- add or replace a port group names in the port group list
# -- for each port group in the list
#    -- populate the port set, e.g.
#       swp1-swp4,swp8,swp50s0-swp50s3
#    -- set a PFC buffer size in bytes for each port in the group
#    -- set the xoff byte limit (buffer limit that triggers PFC frame transmit to start)
#    -- set the xon byte delta (buffer limit that triggers PFC frame transmit to stop)
#    -- enable PFC frame transmit and/or PFC frame receive
# priority flow control
pfc.port_group_list = [pfc_port_group]
pfc.pfc_port_group.cos_list = []
pfc.pfc_port_group.port_set = swp1-swp4,swp6
pfc.pfc_port_group.port_buffer_bytes = 25000
pfc.pfc_port_group.xoff_size = 10000
pfc.pfc_port_group.xon_delta = 2000
pfc.pfc_port_group.tx_enable = true
pfc.pfc_port_group.rx_enable = true       
   
    
```

## Port Groups

A *port group* refers to one or more sequences of contiguous ports.
Multiple port groups can be defined by:

  - Adding a comma-separated list of port group names to the
    port\_group\_list.

  - Adding the port\_set, rx\_enable, and tx\_enable configuration lines
    for each port group.

You can specify the set of ports in a port group in comma-separated
sequences of contiguous ports; you can see which ports are contiguous in
`/var/lib/cumulus/porttab`. The syntax supports:

  - A single port (swp1s0 or swp5)

  - A sequence of regular swp ports (swp2-swp5)

  - A sequence within a breakout swp port (swp6s0-swp6s3)

  - A sequence of regular and breakout ports, provided they are all in a
    contiguous range. For example:
    
    ``` 
                       
    ...
    swp2
    swp3
    swp4
    swp5
    swp6s0
    swp6s1
    swp6s2
    swp6s3
    swp7
    ...
       
        
    ```

[Restart
`switchd`](Configuring_switchd.html#src-8362561_Configuringswitchd-restartswitchd)
to allow the PFC configuration changes to take effect:

``` 
                   
cumulus@switch:~$ sudo systemctl restart switchd.service
   
    
```

## Configure Link Pause

<span id="src-8363032_indexterm-1B6EA48A5AB8F8C2EA0C3233A1746840">The
</span><span id="src-8363032_indexterm-60CCC9525D0784E5AF43B48010320A57">PAUSE
</span>frame is a flow control mechanism that halts the transmission of
the transmitter for a specified period of time. A server or other
network node within the data center may be receiving traffic faster than
it can handle it, thus the PAUSE frame. In Cumulus Linux, individual
ports can be configured to execute link pause by:

  - Transmitting pause frames when its ingress buffers become congested
    (TX pause enable) and/or

  - Responding to received pause frames (RX pause enable).

Link pause is disabled by default. Enabling link pause requires
configuring settings in `/etc/cumulus/datapath/traffic.conf`, similar to
how you configure [priority flow control](#). The settings are explained
in that section as well.

{{%notice tip%}}

What's the difference between link pause and priority flow control?

Priority flow control is applied to an individual priority group for a
specific ingress port.

Link pause (also known as port pause or global pause) is applied to all
the traffic for a specific ingress port.

{{%/notice%}}

Here is an example configuration that enables both types of link pause
for swp1 through swp4 and swp6:

``` 
                   
# to configure pause on a group of ports: 
# -- add or replace port group names in the port group list
# -- for each port group in the list
#    -- populate the port set, e.g.
#       swp1-swp4,swp8,swp50s0-swp50s3
#    -- set a pause buffer size in bytes for each port in the group
#    -- set the xoff byte limit (buffer limit that triggers pause frames transmit to start)
#    -- set the xon byte delta (buffer limit that triggers pause frames transmit to stop)
 
# link pause 
link_pause.port_group_list = [pause_port_group]
link_pause.pause_port_group.port_set = swp1-swp4,swp6
link_pause.pause_port_group.port_buffer_bytes = 25000
link_pause.pause_port_group.xoff_size = 10000
link_pause.pause_port_group.xon_delta = 2000
link_pause.pause_port_group.rx_enable = true
link_pause.pause_port_group.tx_enable = true                   
   
    
```

[Restart
`switchd`](Configuring_switchd.html#src-8362561_Configuringswitchd-restartswitchd)
to allow link pause configuration changes to take effect:

``` 
                   
cumulus@switch:~$ sudo systemctl restart switchd.service
   
    
```

## Configure Cut-through Mode and Store and Forward Switching

Cut-through mode is disabled in Cumulus Linux by default on switches
with Broadcom ASICs. With cut-though mode enabled and link pause is
asserted, Cumulus Linux generates a TOVR and TUFL ERROR; certain error
counters increment on a given physical port.

``` 
                   
cumulus@switch:~$ sudo ethtool -S swp49 | grep Error
HwIfInDot3LengthErrors: 0
HwIfInErrors: 0
HwIfInDot3FrameErrors: 0
SoftInErrors: 0
SoftInFrameErrors: 0
HwIfOutErrors: 35495749
SoftOutErrors: 0
 
cumulus@switch:~$ sudo ethtool -S swp50 | grep Error
HwIfInDot3LengthErrors: 3038098
HwIfInErrors: 297595762
HwIfInDot3FrameErrors: 293710518
   
    
```

To work around this issue, disable link pause or disable cut-through
mode in `/etc/cumulus/datapath/traffic.conf`.

To disable link pause, comment out the `link_pause*` section in
`/etc/cumulus/datapath/traffic.conf`:

``` 
                   
cumulus@switch:~$ sudo nano /etc/cumulus/datapath/traffic.conf 
#link_pause.port_group_list = [port_group_0]
#link_pause.port_group_0.port_set = swp45-swp54
#link_pause.port_group_0.rx_enable = true
#link_pause.port_group_0.tx_enable = true
   
    
```

To enable store and forward switching, set `cut_through_enable` to
*false* in `/etc/cumulus/datapath/traffic.conf`:

``` 
                   
cumulus@switch:~$ sudo nano /etc/cumulus/datapath/traffic.conf 
cut_through_enable = false
   
    
```

## Check Interface Buffer Status

On Mellanox switches, you can collect a fine-grained history of queue
lengths using histograms maintained by the ASIC; see the [ASIC
monitoring chapter](ASIC_Monitoring.html) for details.

On Broadcom switches, the buffer status is not visible currently.

## Related Information

  - [iptables-extensions man
    page](http://ipset.netfilter.org/iptables-extensions.man.html)