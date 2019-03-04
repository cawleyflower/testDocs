# Configuring switchd

`switchd` is the daemon at the heart of Cumulus Linux. It communicates
between the switch and Cumulus Linux, and all the applications running
on Cumulus Linux.
<a name = "Configuring_switchd"> </a>

The `switchd` configuration is stored in `/etc/cumulus/switchd.conf`.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [The switchd File System](#Configuringswitchd-TheswitchdFileSystem)
-   [Configure switchd
    Parameters](#Configuringswitchd-ConfigureswitchdParameters)
-   [Restart switchd](#Configuringswitchd-restartswitchdRestartswitchd)

## The switchd File System 

`switchd` also exports a file system, mounted on `/cumulus/switchd`,
that presents all the `switchd` configuration options as a series of
files arranged in a tree structure. You can see the contents by parsing
the `switchd` tree; run `tree /cumulus/switchd`. The output below is for
a switch with one switch port configured:

``` plain
cumulus@switch:~$ sudo tree /cumulus/switchd/
/cumulus/switchd/
|-- config
|   |-- acl
|   |   |-- non_atomic_update_mode
|   |   `-- optimize_hw
|   |-- arp
|   |   `-- next_hops
|   |-- buf_util
|   |   |-- measure_interval
|   |   `-- poll_interval
|   |-- coalesce
|   |   |-- reducer
|   |   `-- timeout
|   |-- disable_internal_restart
|   |-- ignore_non_swps
|   |-- interface
|   |   |-- swp1
|   |   |   `-- storm_control
|   |   |       |-- broadcast
|   |   |       |-- multicast
|   |   |       `-- unknown_unicast
|   |-- logging
|   |-- route
|   |   |-- host_max_percent
|   |   `-- table
|   `-- stats
|       `-- poll_interval
|-- ctrl
|   |-- acl
|   |-- hal
|   |   `-- resync
|   |-- logger
|   |-- netlink
|   |   `-- resync
|   |-- resync
|   `-- sample
|       `-- ulog_channel
|-- run
|   `-- route_info
|       |-- ecmp_nh
|       |   |-- count
|       |   |-- max
|       |   `-- max_per_route
|       |-- host
|       |   |-- count
|       |   |-- count_v4
|       |   |-- count_v6
|       |   `-- max
|       |-- mac
|       |   |-- count
|       |   `-- max
|       `-- route
|           |-- count_0
|           |-- count_1
|           |-- count_total
|           |-- count_v4
|           |-- count_v6
|           |-- mask_limit
|           |-- max_0
|           |-- max_1
|           `-- max_total
`-- version
```

## Configure switchd Parameters

You can use `cl-cfg` to configure many `switchd` parameters at runtime
(like ACLs, interfaces, and route table utilization), which minimizes
disruption to your running switch. However, some options are read only
and cannot be configured at runtime.

For example, to see data related to routes, run:

``` text
cumulus@switch:~$ sudo cl-cfg -a switchd | grep route
route.table = 254
route.host_max_percent = 50
cumulus@cumulus:~$
```

To modify the configuration, run `cl-cfg -w`. For example, to set the
buffer utilization measurement interval to 1 minute, run:

``` text
cumulus@switch:~$ sudo cl-cfg -w switchd buf_util.measure_interval=1
```

To verify that the value changed, use `grep`:

``` text
cumulus@switch:~$ cl-cfg -a switchd | grep buf
buf_util.poll_interval = 0
buf_util.measure_interval = 1
```

You can get some of this information by running `cl-resource-query`;
though you cannot update the `switchd` configuration with it.

## Restart switchd

Whenever you modify any `switchd` hardware configuration file (typically
changing any `*.conf` file that requires making a change to the
switching hardware, like `/etc/cumulus/datapath/traffic.conf`), you must
restart `switchd` for the change to take effect:

``` text
cumulus@switch:~$ sudo systemctl restart switchd.service
```

You do not have to restart the `switchd` service when you update a
network interface configuration (that is, edit
`/etc/network/interfaces`).

Restarting `switchd` causes all network ports to reset in addition to
resetting the switch hardware configuration.
