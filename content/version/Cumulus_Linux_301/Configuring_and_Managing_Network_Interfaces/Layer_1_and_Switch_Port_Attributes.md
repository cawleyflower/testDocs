---
title: Layer 1 and Switch Port Attributes
author: Cumulus Networks
weight: 81
aliases:
 - /display/CL30/Layer+1_and_Switch_Port_Attributes
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301//Configuring_and_Managing_Network_Interfaces
pageID: 5118373
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
This chapter discusses the various network interfaces on a switch
running Cumulus Linux.

## Commands

  - ethtool

  - ip

## Man Pages

  - man ethtool

  - man interfaces

  - man ip

  - man ip addr

  - man ip link

## Configuration Files

  - /etc/cumulus/ports.conf

  - /etc/network/interfaces

## Interface Types

Cumulus Linux exposes network interfaces for several types of physical
and logical devices:

  - lo, network loopback device

  - ethN, switch management port(s), for out of band management only

  - swpN, switch front panel ports

  - (optional) brN, bridges (IEEE 802.1Q VLANs)

  - (optional) bondN, bonds (IEEE 802.3ad link aggregation trunks, or
    port channels)

## Configuring Breakout Ports

Cumulus Linux has the ability to:

  - Break out 100G switch ports into the following with breakout cables:
    
      - 2x50G, 2x40G, 4x25G, 4x10G

  - Break out 40G switch ports into four separate 10G ports for use with
    breakout cables.

  - Combine (also called *aggregating* or *ganging*) four 10G switch
    ports into one 40G port for use with a breakout cable ([not to be
    confused with a bond](/Bonding_-_Link_Aggregation.html)).

You configure breakout ports in the `/etc/cumulus/ports.conf` file.
After you modify the configuration, [restart
`switchd`](/Configuring_switchd.html#src-5118217_Configuringswitchd-restartswitchd)
to push the new configuration; [this interrupts network
services](/Configuring_switchd.html#src-5118217_Configuringswitchd-restartswitchd).

{{%notice info%}}

`/etc/cumulus/ports.conf` varies across different hardware platforms.
Check the current list of supported platforms on [the hardware
compatibility list](http://www.cumulusnetworks.com/hcl).

{{%/notice%}}

### Breaking Out a 100G Port

A snippet from the `/etc/cumulus/ports.conf` looks on a Tomahawk switch
like this:

``` 
                   
# The Dell Z9100 has:
#
#     32 QSFP28 ports numbered 1-32
#     These ports are configurable as 100G, 50G, 40G, 2x50G, 4x25G, 4x10G
#     or disabled.
#
#     Two SFP+ ports. These ports are configurable as 10G or disabled.
#
#     The system can only handle 128 logical ports.
#
#     This means that if all 32 QSFP28 ports are broken out into
#     4x25G or 4x10G mode, the two 10G ports (33 and 34) must be
#     set to "disabled".
# If you make changes to this file, you must restart switchd for the
# changes to take effect.
# QSFP28 ports
#
#  = [4x10G|4x25G|2x50G|40G|50G|100G|disabled]
1=4x10G
2=100G
3=100G
4=100G
...
# SFP+ ports
#
#  = [10G|disabled]
33=disabled
34=disabled
   
    
```

Notice that you can break out any of the 100G ports into a variety of
options: four 10G ports, four 25G ports or two 50G ports. Keep in mind
that you cannot have more than 128 total logical ports on the switch.

To change a 100G port to a number of logical ports, edit the
`/etc/cumulus/ports.conf` file with a text editor (nano, vi, zile).
Change *100G* to *4x10G*, *4x25G* or *2x50G.*

In the following example, port 3 is broken out into two logical 50G
ports:

``` 
                   
# QSFP28 ports
#
#  = [4x10G|4x25G|2x50G|40G|50G|100G|disabled]
1=4x10G
2=100G
3=2x50G
4=100G
   
    
```

Similarly, the `ports.conf` file for a Mellanox Spectrum 100G switch
looks like this:

``` 
                   
#
# mlnx,x86_MSN2700 has:
#     32 QSFP28 ports numbered 1-32
#         These ports are configurable as 40G, 50G, 2x50G, or 100G; or a subset
#         of them can be split into 4x25G or 4x10G.
#
#         Note that a port may become disabled, i.e., unusable and unconfigurable
#         in /etc/network/interfaces, when an adjacent port is split into 4
#         interfaces. It is REQUIRED that the disabled port be configured as
#         "disabled" in this file when an adjacent port is split into 4
#         interfaces.
#
# NOTE: When ports are split into 4 interfaces it is REQUIRED that the adjacent
# disabled port be configured as "disabled" in this file. When splitting a port
# into two interfaces, like 2x50G, it is NOT required that the adjacent port be
# disabled. Adjacent ports only need to be disabled when a port is split into
# 4 interfaces. For example, when splitting port 11 into 4 25G interfaces, port
# 12 must be configued as "disabled" like this:
#
#   11=4x25G
#   12=disabled
#
#  The list of ports which can be split into 4 interfaces and the adjacent ports
#  which must be configured as "disabled" are:
#
#  1:  4x10G or 4x25G (would disable port 2)
#  3:  4x10G or 4x25G (would disable port 4)
#  5:  4x10G or 4x25G (would disable port 6)
#  7:  4x10G or 4x25G (would disable port 8)
#  9:  4x10G or 4x25G (would disable port 10)
#  11: 4x10G or 4x25G (would disable port 12)
#  13: 4x10G or 4x25G (would disable port 14)
#  15: 4x10G or 4x25G (would disable port 16)
#  17: 4x10G or 4x25G (would disable port 18)
#  19: 4x10G or 4x25G (would disable port 20)
#  21: 4x10G or 4x25G (would disable port 22)
#  23: 4x10G or 4x25G (would disable port 24)
#  25: 4x10G or 4x25G (would disable port 26)
#  27: 4x10G or 4x25G (would disable port 28)
#  29: 4x10G or 4x25G (would disable port 30)
#  31: 4x10G or 4x25G (would disable port 32)
#
# QSFP28 ports
#
#     = [40G|50G|100G]
#   or when split = [2x50G|4x10G|4x25G|disabled]
1=100G
2=100G
3=100G
4=100G
5=100G
...
30=100G
31=100G
32=100G
   
    
```

To change a 100G port to a number of logical ports, edit the
`/etc/cumulus/ports.conf` file with a text editor (nano, vi, zile).
Change *100G* to *4x10G*, *4x25G* or *2x50G.*

However, for both 100G and 40G switches using Mellanox Spectrum
chipsets, there is a limit of 64 logical ports in total. You must
configure the logical ports as follows:

  - You can only break out odd-numbered ports into logical ports.

  - You must disable the next even-numbered port.

For example, if you have a 100G Mellanox SN-2700 switch and configure
port 11 as 4x25G logical ports, you must configure port 12 as disabled.
In `/etc/cumulus/ports.conf`:

    ...
    11=4x25G
    12=disabled
    ...

In any case, when you finish editing `ports.conf`, make sure to [restart
`switchd`](/Configuring_switchd.html#src-5118217_Configuringswitchd-restartswitchd)
to reload your changes.

### Breaking Out a 40G Port

A snippet from the `/etc/cumulus/ports.conf` looks on a 40G switch like
this:

``` 
                   
# QSFP+ ports
#
#  = [4x10G|40G]
49=40G
50=40G
51=40G
52=40G
   
    
```

To change a 40G port to 4x10G ports, edit the `/etc/cumulus/ports.conf`
file with a text editor (nano, vi, zile). Change *40G* to *4x10G*.

In the following example, switch port 49 is changed to a breakout port
with four 10G logical ports:

``` 
                   
# QSFP+ ports
#
#  = [4x10G|40G]
49=4x10G
50=40G
51=40G
52=40G
   
    
```

To load the change [restart
`switchd`](/Configuring_switchd.html#src-5118217_Configuringswitchd-restartswitchd).

Many services depend on `switchd`. It is highly recommended to restart
Cumulus Linux if possible in this situation.

{{%notice note%}}

For both 100G and 40G switches using Mellanox Spectrum chipsets, there
is a limit of 64 logical ports in total. However, the logical ports must
be configured as follows:

  - You can only break out odd-numbered ports into 4 logical ports.

  - You must disable the next even-numbered port.

For example, if you have a 100G Mellanox SN-2700 switch and configure
port 11 as 4x25G logical ports, you must configure port 12 as disabled.
In `/etc/cumulus/ports.conf`:

    ...
    11=4x25G
    12=disabled
    ...

{{%/notice%}}

### Combining Four 10G Ports into One 40G Port

To gang (aggregate) four 10G ports into one 40G port for use with a
breakout cable, you must edit `/etc/cumulus/ports.conf`.

{{%notice info%}}

`/etc/cumulus/ports.conf` varies across different hardware platforms.
Check the current list of supported platforms on [the hardware
compatibility list](http://www.cumulusnetworks.com/hcl).

{{%/notice%}}

A snippet from the `/etc/cumulus/ports.conf` looks like this:

``` 
                   
# SFP+ ports#
#  = [10G|40G/4]
1=10G
2=10G
3=10G
4=10G
5=10G
   
    
```

To change four 10G ports into one 40G port, edit the
`/etc/cumulus/ports.conf` file with a text editor (nano, vi, zile).
Change *10G* to *40G/4* for every port being ganged.

In the following example, switch ports swp1-4 are changed to a ganged
port:

``` 
                   
# SFP+ ports#
#  = [10G|40G/4]
1=40G/4
2=40G/4
3=40G/4
4=40G/4
5=10G
   
    
```

To load the change, [restart
`switchd`](/Configuring_switchd.html#src-5118217_Configuringswitchd-restartswitchd)
to load your changes.

Many services depend on `switchd`. It is highly recommended to restart
Cumulus Linux if possible in this situation.

{{%notice warning%}}

  - You must gang four 10G ports in sequential order. For example, you
    cannot gang swp1, swp10, swp20 and swp40 together.

  - The ports must be in increments of four, with the starting port
    being swp1 (or swp5, swp9, or so forth); so you cannot gang swp2,
    swp3, swp4 and swp5 together.

{{%/notice%}}

## Logical Switch Port Limitations

100G and 40G switches with Spectrum, Tomahawk, Trident II and Trident
II+ chipsets (check the
[HCL](http://cumulusnetworks.com/support/linux-hardware-compatibility-list/))
can support a certain number of logical ports, depending upon the
manufacturer.

Before you configure any logical/unganged ports on a switch, check the
limitations listed in `/etc/cumulus/ports.conf`; this file is specific
to each manufacturer.

For example, the Dell S6000 `ports.conf` file indicates the logical port
limitation like this:

``` 
                   
# ports.conf --
#
# This file controls port aggregation and subdivision.  For example, QSFP+
# ports are typically configurable as either one 40G interface or four
# 10G/1000/100 interfaces.  This file sets the number of interfaces per port
# while /etc/network/interfaces and ethtool configure the link speed for each
# interface.
#
# You must restart switchd for changes to take effect.
#
# The DELL S6000 has:
#     32 QSFP ports numbered 1-32
#     These ports are configurable as 40G, split into 4x10G ports or
#     disabled.
#
#     The X pipeline covers QSFP ports 1 through 16 and the Y pipeline
#     covers QSFP ports 17 through 32.
#
#     The Trident2 chip can only handle 52 logical ports per pipeline.
#
#     This means 13 is the maximum number of 40G ports you can ungang
#     per pipeline, with the remaining three 40G ports set to
#     "disabled". The 13 40G ports become 52 unganged 10G ports, which
#     totals 52 logical ports for that pipeline.
# 
   
    
```

The means the maximum number of ports for this Dell S6000 is 104.

For switches using Mellanox Spectrum chipsets, there is a limit of 64
logical ports in total. However, the logical ports must be configured in
a specific way. See [the
note](/#src-5118373_Layer1andSwitchPortAttributes-breakout) above.

## Verification and Troubleshooting Commands

### Statistics

High-level interface statistics are available with the `ip -s link`
command:

``` 
                   
cumulus@switch:~$ ip -s link show dev swp1
3: swp1:  mtu 1500 qdisc pfifo_fast state UP mode DEFAULT qlen 500
    link/ether 44:38:39:00:03:c1 brd ff:ff:ff:ff:ff:ff
    RX: bytes  packets  errors  dropped overrun mcast
    21780      242      0       0       0       242
    TX: bytes  packets  errors  dropped carrier collsns
    1145554    11325    0       0       0       0
   
    
```

Low-level interface statistics are available with `ethtool`:

``` 
                   
cumulus@switch:~$ sudo ethtool -S swp1
NIC statistics:
     HwIfInOctets: 21870
     HwIfInUcastPkts: 0
     HwIfInBcastPkts: 0
     HwIfInMcastPkts: 243
     HwIfOutOctets: 1148217
     HwIfOutUcastPkts: 0
     HwIfOutMcastPkts: 11353
     HwIfOutBcastPkts: 0
     HwIfInDiscards: 0
     HwIfInL3Drops: 0
     HwIfInBufferDrops: 0
     HwIfInAclDrops: 0
     HwIfInBlackholeDrops: 0
     HwIfInDot3LengthErrors: 0
     HwIfInErrors: 0
     SoftInErrors: 0
     SoftInDrops: 0
     SoftInFrameErrors: 0
     HwIfOutDiscards: 0
     HwIfOutErrors: 0
     HwIfOutQDrops: 0
     HwIfOutNonQDrops: 0
     SoftOutErrors: 0
     SoftOutDrops: 0
     SoftOutTxFifoFull: 0
     HwIfOutQLen: 0
   
    
```

### Querying SFP Port Information

You can verify SFP settings using `ethtool -m`. The following example
shows the output for 1G and 10G modules:

``` 
                   
cumulus@switch:~# sudo ethtool -m | egrep '(swp|RXPower :|TXPower :|EthernetComplianceCode)'
 
swp1: SFP detected
              EthernetComplianceCodes : 1000BASE-LX
              RXPower : -10.4479dBm
              TXPower : 18.0409dBm
swp3: SFP detected
              10GEthernetComplianceCode : 10G Base-LR
              RXPower : -3.2532dBm
              TXPower : -2.0817dBm
   
    
```

## Useful Links

  - <http://wiki.debian.org/NetworkConfiguration>

  - <http://www.linuxfoundation.org/collaborate/workgroups/networking/vlan>

  - <http://www.linuxfoundation.org/collaborate/workgroups/networking/bridge>

  - <http://www.linuxfoundation.org/collaborate/workgroups/networking/bonding>
