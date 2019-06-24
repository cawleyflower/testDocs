---
title: Spanning Tree and Rapid Spanning Tree
author: Cumulus Networks
weight: 97
aliases:
 - /display/CL30/Spanning+Tree_and_Rapid_Spanning_Tree
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301//Layer_1_and_Layer_2_Features
pageID: 5118355
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
Spanning tree protocol (STP) is always recommended in layer 2
topologies, as it prevents bridge loops and broadcast radiation on a
bridged network.

The `mstpd` daemon is an open source project used by Cumulus Linux to
implement IEEE802.1D 2004 and IEEE802.1Q 2011. `mstpctl` is the utility
provided by the `mstpd` service to configure STP. STP is disabled by
default on bridges in Cumulus Linux.

## Commands

  - brctl

  - mstpctl

## Supported Modes

The STP modes Cumulus Linux supports vary depending upon whether the
[traditional or VLAN-aware bridge driver
mode](/Ethernet_Bridging_-_VLANs.html) is in use.

For a bridge configured in *traditional* mode, PVST and PVRST are
supported, with the default set to PVRST. Each traditional bridge has
its own separate STP instance.

Bridges configured in
*[VLAN-aware](/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments.html)*
mode operate **only** in RSTP mode.

## Configuring STP within a VLAN-aware Bridge

*[VLAN-aware](/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments.html)*
bridges only operate in RSTP mode. STP BPDUs are transmitted on the
native VLAN.

If a bridge running RSTP (802.1w) receives a common STP (802.1D) BPDU,
it will automatically fall back to 802.1D operation.

### Creating a VLAN-aware Bridge and Configuring RSTP

To create a VLAN-aware mode bridge, configure the bridge stanza under
`/etc/network/interfaces`.

``` 
                   
auto br2
iface br2
  bridge-vlan-aware yes
  bridge-vids 100
  bridge-pvid  1
  bridge-ports swp1 swp4 swp5
  bridge-stp on
   
    
```

To enable the bridge and load the new configuration from
`/etc/network/interfaces`, run `ifreload -a`:

``` 
                   
cumulus@switch:~$ sudo ifreload -a
   
    
```

### RSTP Interoperation with MST (802.1s)

RSTP interoperates with MST seamlessly, creating a single instance of
spanning tree which transmitts BPDUs on the native VLAN. RSTP treats the
MST domain as if it were one giant switch.

## Viewing Bridge and STP Status/Logs

`mstpd` is started by default when the switch boots. `mstpd` logs and
errors are located in `/var/log/syslog`.

{{%notice warning%}}

`mstpd` is the preferred utility for interacting with STP on Cumulus
Linux. `brctl` also provides certain methods for configuring STP;
however, they are not as complete as the tools offered in `mstpd` and
[output from brctl can be
misleading](https://support.cumulusnetworks.com/hc/en-us/articles/212153658-brctl-showstp-Shows-Carrier-Down-Ports-as-Blocking)
in some cases.

{{%/notice%}}

To get the bridge state, use:

``` 
                   
cumulus@switch:~$ sudo brctl show
 bridge name     bridge id               STP enabled     interfaces
 br2             8000.001401010100       yes             swp1
                                                         swp4
                                                         swp5
   
    
```

To get the `mstpd` bridge state, use:

``` 
                   
cumulus@switch:~$ sudo mstpctl showbridge br2
 br2 CIST info
  enabled         yes
  bridge id       F.000.00:14:01:01:01:00
  designated root F.000.00:14:01:01:01:00
  regional root   F.000.00:14:01:01:01:00
  root port       none
  path cost     0          internal path cost   0
  max age       20         bridge max age       20
  forward delay 15         bridge forward delay 15
  tx hold count 6          max hops             20
  hello time    2          ageing time          200
  force protocol version     rstp
  time since topology change 90843s
  topology change count      4
  topology change            no
  topology change port       swp4
  last topology change port  swp5
   
    
```

To get the `mstpd` bridge port state, use:

``` 
                   
cumulus@switch:~$ sudo mstpctl showport br2
 E swp1 8.001 forw F.000.00:14:01:01:01:00 F.000.00:14:01:01:01:00 8.001 Desg
   swp4 8.002 forw F.000.00:14:01:01:01:00 F.000.00:14:01:01:01:00 8.002 Desg
 E swp5 8.003 forw F.000.00:14:01:01:01:00 F.000.00:14:01:01:01:00 8.003 Desg
 
cumulus@switch:~$ sudo mstpctl showportdetail br2 swp1
 br2:swp1 CIST info
  enabled            yes                     role                 Designated
  port id            8.001                   state                forwarding
  external port cost 2000                    admin external cost  0
  internal port cost 2000                    admin internal cost  0
  designated root    F.000.00:14:01:01:01:00 dsgn external cost   0
  dsgn regional root F.000.00:14:01:01:01:00 dsgn internal cost   0
  designated bridge  F.000.00:14:01:01:01:00 designated port      8.001
  admin edge port    no                      auto edge port       yes
  oper edge port     yes                     topology change ack  no
  point-to-point     yes                     admin point-to-point auto
  restricted role    no                      restricted TCN       no
  port hello time    2                       disputed             no
  bpdu guard port    no                      bpdu guard error     no
  network port       no                      BA inconsistent      no
  Num TX BPDU        45772                   Num TX TCN           4
  Num RX BPDU        0                       Num RX TCN           0
  Num Transition FWD 2                       Num Transition BLK   2
   
    
```

## Configuration Files

  - /etc/network/interfaces

  - /etc/cumulus/switchd.conf

## Man Pages

  - brctl(8)

  - bridge-utils-interfaces(5)

  - ifupdown-addons-interfaces(5)

  - mstpctl(8)

  - mstpctl-utils-interfaces(5)

## Useful Links

The source code for `mstpd`/`mstpctl` was written by [Vitalii
Demianets](mailto:vitas%40nppfactor.kiev.ua) and is hosted at the
sourceforge URL below.

  - <https://sourceforge.net/projects/mstpd/>

  - <http://en.wikipedia.org/wiki/Spanning_Tree_Protocol>

## Caveats and Errata

  - MSTP is not supported currently. However, interoperability with MSTP
    networks can be accomplished using PVRSTP or PVSTP.
