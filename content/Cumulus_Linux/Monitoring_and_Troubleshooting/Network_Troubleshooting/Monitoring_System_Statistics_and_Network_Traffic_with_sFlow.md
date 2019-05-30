---
title: Monitoring System Statistics and Network Traffic with sFlow
author: Unknown
weight: 473
pageID: 8362597
aliases:
 - /old/Cumulus_Linux/Monitoring_System_Statistics_and_Network_Traffic_with_sFlow.html
imgData: Cumulus_Linux
siteSlug: Cumulus_Linux
---
[sFlow](http://www.sflow.org/index.php) is a monitoring protocol that
samples network packets, application operations, and system counters.
sFlow collects both interface counters and sampled 5-tuple packet
information, enabling you to monitor your network traffic as well as
your switch state and performance metrics. An outside server, known as
an *sFlow collector*, is required to collect and analyze this data.

`hsflowd` is the daemon that samples and sends sFlow data to configured
collectors. By default, `hsflowd` is disabled and does *not* start
automatically when the switch boots up.

## Configure sFlow

To configure `hsflowd` to send to the designated collectors, either:

  - Use DNS service discovery (DNS-SD)

  - Manually configure the `/etc/hsflowd.conf` file

### Configure sFlow via DNS-SD

You can configure your DNS zone to advertise the collectors and polling
information to all interested clients.

Add the following content to the zone file on your DNS server:

``` 
                   
_sflow._udp SRV 0 0 6343 collector1
_sflow._udp SRV 0 0 6344 collector2
_sflow._udp TXT (
"txtvers=1"
"sampling.1G=2048"
"sampling.10G=4096"
"sampling.40G=8192"
"polling=20"
)
   
    
```

The above snippet instructs `hsflowd` to send sFlow data to collector1
on port 6343 and to collector2 on port 6344. `hsflowd` will poll
counters every 20 seconds and sample 1 out of every 2048 packets.

{{%notice note%}}

The maximum samples per second delivered from the hardware is limited to
16K. You can configure the number of samples per second in the
`/etc/cumulus/datapath/traffic.conf` file, as shown below:

``` 
                   
# Set sflow/sample ingress cpu packet rate and burst in packets/sec
# Values: {0..16384}
#sflow.rate = 16384
#sflow.burst = 16384
   
    
```

{{%/notice%}}

Start the sFlow daemon:

``` 
                   
cumulus@switch:~$ sudo systemctl start hsflowd.service
   
    
```

No additional configuration is required in `/etc/hsflowd.conf`.

### Manually Configure /etc/hsflowd.conf

You can configure the `/etc/hsflowd.conf` file to set up the collectors
and variables on each switch.

Edit `/etc/hsflowd.conf` and change *DNSSD = on* to *DNSSD = off*:

``` 
                   
DNSSD = off
   
    
```

Set up your collectors and sampling rates in the `/etc/hsflowd.conf`
file:

``` 
                   
# Manual Configuration (requires DNSSD=off above)
  #################################################
 
  # Typical configuration is to send every 30 seconds
  polling = 20
 
  sampling.1G=2048
  sampling.10G=4096
  sampling.40G=8192
 
  collector {
    ip = 192.0.2.100
    udpport = 6343
  }
 
  collector {
    ip = 192.0.2.200
    udpport = 6344
  }
   
    
```

This configuration polls the counters every 20 seconds, samples 1 of
every 2048 packets, and sends this information to a collector at
192.0.2.100 on port 6343 and to another collector at 192.0.2.200 on port
6344.

{{%notice note%}}

Some collectors require each source to transmit on a different port,
others listen on only one port. Refer to the documentation for your
collector for more information.

{{%/notice%}}

## Configure sFlow Visualization Tools

For information on configuring various sFlow visualization tools, read
this [Help Center
article](https://support.cumulusnetworks.com/hc/en-us/articles/201787866--WIP-Configuring-and-using-sFlow-visualization-tools).

## Related Information

  - [sFlow Collectors](http://www.sflow.org/products/collectors.php)

  - [sFlow Wikipedia page](http://en.wikipedia.org/wiki/SFlow)