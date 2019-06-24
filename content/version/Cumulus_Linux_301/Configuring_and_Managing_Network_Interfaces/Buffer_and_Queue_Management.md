---
title: Buffer and Queue Management
author: Cumulus Networks
weight: 83
aliases:
 - /display/CL30/Buffer+and_Queue_Management
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301//Configuring_and_Managing_Network_Interfaces
pageID: 5118374
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
Hardware datapath configuration manages packet buffering, queueing, and
scheduling in hardware. There are two configuration input files:

  - `/etc/cumulus/datapath/traffic.conf`, which describes priority
    groups and assigns the scheduling algorithm and weights

  - `/etc/bcm.d/datapath/datapath.conf`, which assigns buffer space and
    egress queues

{{%notice warning%}}

Versions of these files prior to Cumulus Linux 2.1 are incompatible with
Cumulus Linux 2.1 and later; using older files will cause `switchd` to
fail to start and return an error that it cannot find the
`/var/lib/cumulus/rc.datapath` file.

{{%/notice%}}

Each packet is assigned to an ASIC Class of Service (CoS) value based on
the packet’s priority value stored in the 802.1p (Class of Service) or
DSCP (Differentiated Services Code Point) header field. The packet is
assigned to a priority group based on the CoS value.

Priority groups include:

  - *Control*: Highest priority traffic

  - *Service*: Second-highest priority traffic

  - *Lossless*: Traffic protected by priority flow control

  - *Bulk*: All remaining traffic

A lossless traffic group is protected from packet drops by configuring
the datapath to use priority pause. A lossless priority group requires a
port group configuration, which specifies the ports configured for
priority flow control and the additional buffer space assigned to each
port for packets in the lossless priority group.

The scheduler is configured to use a hybrid scheduling algorithm. It
applies strict priority to control traffic queues and a weighted round
robin selection from the remaining queues. Unicast packets and multicast
packets with the same priority value are assigned to separate queues,
which are assigned equal scheduling weights.

Datapath configuration takes effect when you initialize `switchd`.
Changes to the `traffic.conf` file require you to [restart
`switchd`](/Configuring_switchd.html#src-5118217_Configuringswitchd-restartswitchd)
.

## Commands

If you modify the configuration in the
`/etc/cumulus/datapath/traffic.conf` file, you must [restart
`switchd`](/Configuring_switchd.html#src-5118217_Configuringswitchd-restartswitchd)
for the changes to take effect:

    cumulus@switch:~$ sudo systemctl restart switchd.service

## Configuring Traffic Marking through ACL Rules

You can mark traffic for egress packets through `iptables` or
`ip6tables` rule classifications. To enable these rules, you do one of
the following:

  - Mark DSCP values in egress packets.

  - Mark 802.1p CoS values in egress packets.

To enable traffic marking, use `cl-acltool`. Add the `-p` option to
specify the location of the policy file. By default, if you don't
include the `-p` option, `cl-acltool` looks for the policy file in
`/etc/cumulus/acl/policy.d/`.

The iptables-/ip6tables-based marking is supported via the following
action extension:

    -j SETQOS --set-dscp 10 --set-cos 5

You can specify one of the following targets for SETQOS:

| Option                | Description                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| –set-cos INT          | Sets the datapath resource/queuing class value. Values are defined in [IEEE\_P802.1p](http://en.wikipedia.org/wiki/IEEE_P802.1p).                           |
| –set-dscp value       | Sets the DSCP field in packet header to a value, which can be either a decimal or hex value.                                                                |
| –set-dscp-class class | Sets the DSCP field in the packet header to the value represented by the DiffServ class value. This class can be EF, BE or any of the CSxx or AFxx classes. |

{{%notice note%}}

You can specify either `--set-dscp` or `--set-dscp-class`, but not both.

{{%/notice%}}

Here are two example rules:

    [iptables]
    -t mangle -A FORWARD --in-interface swp+ -p tcp --dport bgp -j SETQOS --set-dscp 10 --set-cos 5
    
    [ip6tables]
    -t mangle -A FORWARD --in-interface swp+ -j SETQOS --set-dscp 10

You can put the rule in either the *mangle* table or the default
*filter* table; the mangle table and filter table are put into separate
TCAM slices in the hardware.

To put the rule in the mangle table, include `-t mangle`; to put the
rule in the filter table, omit `-t mangle`.

## Configuring Link Pause

The PAUSE frame is a flow control mechanism that halts the transmission
of the transmitter for a specified period of time. A server or other
network node within the data center may be receiving traffic faster than
it can handle it, thus the PAUSE frame. In Cumulus Linux, individual
ports can be configured to execute link pause by:

  - Transmitting pause frames when its ingress buffers become congested
    (TX pause enable) and/or

  - Responding to received pause frames (RX pause enable).

Just like configuring buffer and queue management link pause is
configured by editing `/etc/cumulus/datapath/traffic.conf`.

Here is an example configuration which turns of both types of link pause
for swp2 and swp3:

``` 
# to configure pause on a group of ports:
# uncomment the link pause port group list
# add or replace a port group name to the list
# populate the port set, e.g.
# swp1-swp4,swp8,swp50s0-swp50s3
# enable pause frame transmit and/or pause frame receive 
# link pause
link_pause.port_group_list = [port_group_0] 
link_pause.port_group_0.port_set = swp2-swp3 
link_pause.port_group_0.rx_enable = true 
link_pause.port_group_0.tx_enable = true           
```

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

[Restart
`switchd`](/Configuring_switchd.html#src-5118217_Configuringswitchd-restartswitchd)
to allow link pause configuration changes to take effect:

    cumulus@switch:~$ sudo systemctl restart switchd.service

## Useful Links

  - [iptables-extensions man
    page](http://ipset.netfilter.org/iptables-extensions.man.html)

## Caveats and Errata

  - You can configure Quality of Service (QoS) for 10G, 40G, and 100G
    switches only; that is, any switch on the Tomahawk, Trident II+ or
    Trident II platform.
