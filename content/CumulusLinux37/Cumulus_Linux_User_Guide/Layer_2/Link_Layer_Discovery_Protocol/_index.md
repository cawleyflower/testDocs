---
title: Link Layer Discovery Protocol
author: Unknown
weight: 119
pageID: 8362650
---
# Link Layer Discovery Protocol

<span id="src-8362650_indexterm-66B04A14C76A452C142BE8B5F60D6C1F">The
</span>`lldpd`<span id="src-8362650_indexterm-C706EDBC6C37CDB3537221998F2785AE">
daemon implements the IEEE802.1AB
(</span><span id="src-8362650_indexterm-20A50142E364822419513BBD631DF4AB">Link
Layer Discovery Protocol, or </span>LLDP) standard. LLDP enables you to
know which ports are neighbors of a given port. By default, `lldpd` runs
as a daemon and is started at system boot. `lldpd` command line
arguments are placed in `/etc/default/lldpd`. `lldpd` configuration
options are placed in `/etc/lldpd.conf` or under `/etc/lldpd.d/`.

For more details on the command line arguments and config options, see
`man lldpd(8)`.

`lldpd` supports CDP (Cisco Discovery Protocol, v1 and v2). `lldpd` logs
by default into `/var/log/daemon.log` with an `lldpd` prefix.

`lldpcli` is the CLI tool to query the `lldpd` daemon for neighbors,
statistics, and other running configuration information. See `man
lldpcli(8)` for details.

## Configure LLDP

You configure `lldpd` settings in `/etc/lldpd.conf` or `/etc/lldpd.d/`.

Here is an example persistent configuration:

``` 
                   
cumulus@switch:~$ sudo cat /etc/lldpd.conf
configure lldp tx-interval 40
configure lldp tx-hold 3
configure system interface pattern *,!eth0,swp*
   
    
```

The last line in the example above shows that LLDP is disabled on eth0.
You can disable LLDP on a single port by editing the
`/etc/default/lldpd` file. This file specifies the default options to
present to the `lldpd` service when it starts. The following example
uses the `-I` option to disable LLDP on swp43:

``` 
                   
cumulus@switch:~$ sudo nano /etc/default/lldpd
 
# Add "-x" to DAEMON_ARGS to start SNMP subagent
# Enable CDP by default
DAEMON_ARGS="-c -I *, !swp43"
   
    
```

`lldpd` logs to `/var/log/daemon.log` with the *lldpd* prefix:

``` 
                   
cumulus@switch:~$ sudo tail -f /var/log/daemon.log  | grep lldp
Aug  7 17:26:17 switch lldpd[1712]: unable to get system name
Aug  7 17:26:17 switch lldpd[1712]: unable to get system name
Aug  7 17:26:17 switch lldpcli[1711]: lldpd should resume operations
Aug  7 17:26:32 switch lldpd[1805]: NET-SNMP version 5.4.3 AgentX subagent connected
   
    
```

## Enable the SNMP Subagent in LLDP

<span id="src-8362650_indexterm-A620F234AFE30ACE69E1059EAB22ABC6">LLDP</span>
does not enable the SNMP subagent by default. You need to edit
`/etc/default/lldpd` and enable the `-x` option.

``` 
                   
cumulus@switch:~$ sudo nano /etc/default/lldpd
 
# Add "-x" to DAEMON_ARGS to start SNMP subagent
 
# Enable CDP by default
DAEMON_ARGS="-c"
   
    
```

## Caveats and Errata

  - Annex E (and hence Annex D) of IEEE802.1AB (lldp) is not supported.

## Related Information

  - [GitHub - lldpd project](http://vincentbernat.github.io/lldpd/)

  - [Wikipedia - Link Layer Discovery
    Protocol](http://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol)
