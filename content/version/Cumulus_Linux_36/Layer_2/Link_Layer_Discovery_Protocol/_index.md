---
title: Link Layer Discovery Protocol
author: Unknown
weight: 117
pageID: 8362145
aliases:
 - /old/Cumulus_Linux_36/Link_Layer_Discovery_Protocol.html
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
The `lldpd` daemon implements the IEEE802.1AB (Link Layer Discovery
Protocol, or LLDP) standard. LLDP allows you to know which ports are
neighbors of a given port. By default, `lldpd` runs as a daemon and is
started at system boot. `lldpd` command line arguments are placed in
`/etc/default/lldpd`. `lldpd` configuration options are placed in
`/etc/lldpd.conf` or under `/etc/lldpd.d/`.

For more details on the command line arguments and config options,
please see `man lldpd(8)`.

`lldpd` supports CDP (Cisco Discovery Protocol, v1 and v2). `lldpd` logs
by default into `/var/log/daemon.log` with an `lldpd` prefix.

`lldpcli` is the CLI tool to query the `lldpd` daemon for neighbors,
statistics and other running configuration information. See `man
lldpcli(8)` for details.

## Enabling the SNMP Subagent in LLDP

LLDP does not enable the SNMP subagent by default. You need to edit
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
