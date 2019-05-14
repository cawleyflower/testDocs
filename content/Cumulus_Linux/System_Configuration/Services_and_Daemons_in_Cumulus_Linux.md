---
title: Services and Daemons in Cumulus Linux
author: Unknown
weight: 71
pageID: 8362578
aliases:
 - /old/Services_and_Daemons_in_Cumulus_Linux.html
---
# Services and Daemons in Cumulus Linux

*Services* (also known as *daemons*) and *processes* are at the heart of
how a Linux system functions. Most of the time a service takes care of
itself; you just enable and start it, then let it run. However, because
a Cumulus Linux switch is a Linux system, you have the ability to dig
deeper if you like. Services may start multiple processes as they run.
Services tend to be the most important things to monitor on a Cumulus
Linux switch.

You manage services in Cumulus Linux in the following ways:

  - Identify currently active or stopped services

  - Identify boot time state of a specific service

  - Disable or enable a specific service

  - Identify active listener ports

## systemd and the systemctl Command

In general, you manage services using `systemd` via the `systemctl`
command. You use it with any service on the switch to start, stop,
restart, reload, enable, disable, reenable, or get the status of the
service.

``` 
                   
cumulus@switch:~$ sudo systemctl start | stop | restart | status | reload | enable | disable | reenable SERVICENAME.service
   
    
```

For example to restart networking, run the command:

``` 
                   
cumulus@switch:~$ sudo systemctl restart networking.service
   
    
```

{{%notice note%}}

Unlike the `service` command in Debian Wheezy, the service name is
written **after** the `systemctl` subcommand, not before it.

{{%/notice%}}

To see all the currently running services, run:

``` 
                   
cumulus@switch:~$ sudo systemctl status
● switch
    State: running
     Jobs: 0 queued
   Failed: 0 units
    Since: Thu 2019-01-10 00:19:34 UTC; 23h ago
   CGroup: /
           ├─1 /sbin/init
           └─system.slice
             ├─dbus.service
             │ └─403 /usr/bin/dbus-daemon --system --address=systemd: --nofork --nopidfile --systemd-activation
             ├─uuidd.service
             │ └─669 /usr/sbin/uuidd --socket-activation
             ├─cron.service
             │ └─381 /usr/sbin/cron -f -L 38
             ├─smond.service
             │ └─606 /usr/bin/python /usr/sbin/smond
             ├─switchd.service
             │ └─587 /usr/sbin/switchd -vx
             ├─ledmgrd.service
             │ └─613 /usr/bin/python /usr/sbin/ledmgrd
             ├─wd_keepalive.service
             │ └─433 /usr/sbin/wd_keepalive 
             ├─netq-agent.service
             │ └─915 /usr/bin/python /usr/sbin/netq-agent
             ├─ptmd.service
             │ └─914 /usr/sbin/ptmd -l INFO
             ├─networking.service
             │ ├─729 /sbin/dhclient -pf /run/dhclient.vagrant.pid -lf /var/lib/dhcp/dhclient.vagrant.leases vagrant
             │ └─828 /sbin/dhclient -pf /run/dhclient.eth0.pid -lf /var/lib/dhcp/dhclient.eth0.leases eth0
             ├─nginx.service
             │ ├─449 nginx: master process /usr/sbin/nginx -g daemon on; master_process on
             │ ├─450 nginx: worker process                           
             │ ├─451 nginx: worker process                           
             │ ├─452 nginx: worker process                           
             │ └─453 nginx: worker process                           
             ├─sysmonitor.service
             │ ├─ 847 /bin/bash /usr/lib/cumulus/sysmonitor
             │ └─7717 sleep 60
             ├─system-serial\x2dgetty.slice
             │ └─serial-getty@ttyS0.service
             │   └─920 /sbin/agetty --keep-baud 115200 38400 9600 ttyS0 vt102
             ├─neighmgrd.service
             │ └─844 /usr/bin/python /usr/bin/neighmgrd
             ├─systemd-journald.service
             │ └─252 /lib/systemd/systemd-journald
             ├─netqd.service
             │ └─846 /usr/bin/python /usr/sbin/netqd --daemon
             ├─auditd.service
             │ └─337 /sbin/auditd -n
             ├─pwmd.service
             │ └─614 /usr/bin/python /usr/sbin/pwmd
             ├─netd.service
             │ └─845 /usr/bin/python -O /usr/sbin/netd -d
             ├─ssh.service
             │ ├─ 937 /usr/sbin/sshd -D
             │ ├─6893 sshd: cumulus [priv]
             │ ├─6911 sshd: cumulus@pts/0 
             │ ├─6912 -bash
             │ ├─7747 sudo systemctl status
             │ ├─7752 systemctl status
             │ └─7753 pager
             ├─systemd-logind.service
             │ └─405 /lib/systemd/systemd-logind
             ├─system-getty.slice
             │ └─getty@tty1.service
             │   └─435 /sbin/agetty --noclear tty1 linux
             ├─systemd-udevd.service
             │ └─254 /lib/systemd/systemd-udevd
             ├─mcelog.service
             │ └─438 /usr/sbin/mcelog --ignorenodev --daemon --foreground
             ├─portwd.service
             │ └─603 /usr/bin/python /usr/sbin/portwd
             ├─lldpd.service
             │ ├─911 lldpd: monitor.        
             │ └─936 lldpd: connected to oob-mgmt-switch
             ├─rsyslog.service
             │ └─392 /usr/sbin/rsyslogd -n
             ├─ntp.service
             │ └─912 /usr/sbin/ntpd -n -u ntp:ntp -g
             ├─acpid.service
             │ └─390 /usr/sbin/acpid
             └─mstpd.service
               └─436 /sbin/mstpd -d -v2
   
    
```

### systemctl Subcommands

`systemctl` has a number of subcommands that perform a specific
operation on a given service.

  - **status**: Returns the status of the specified service.

  - **start**: Starts the service.

  - **stop**: Stops the service.

  - **restart**: Stops, then starts the service, all the while
    maintaining state. So if there are dependent services or services
    that mark the restarted service as *Required*, the other services
    also get restarted. For example, running `systemctl restart
    frr.service` restarts any of the routing protocol services that are
    enabled and running, such as `bgpd` or `ospfd`.

  - **reload**: Reloads a service's configuration.

  - **enable**: Enables the service to start when the system boots, but
    does not start it unless you use the `systemctl start
    SERVICENAME.service` command or reboot the switch.

  - **disable**: Disables the service, but does not stop it unless you
    use the `systemctl stop SERVICENAME.service` command or reboot the
    switch. A disabled service can still be started or stopped.

  - **reenable**: Disables, then enables a service. You might need to do
    this so that any new *Wants* or *WantedBy* lines create the symlinks
    necessary for ordering. This has no side effects on other services.

There is often little reason to interact with the services directly
using these commands. If a critical service should happen to crash or
hit an error it will be automatically respawned by systemd. Systemd is
effectively the caretaker of services in modern Linux systems and is
responsible for starting all the necessary services at boot time.

### Ensure a Service Starts after Multiple Restarts

By default, `systemd` is configured to try to restart a particular
service only a certain number of times within a given interval before
the service fails to start at all. The settings for this are stored in
the service script. The settings are *StartLimitInterval* (which
defaults to 10 seconds) and *StartBurstLimit* (which defaults to 5
attempts), but many services override these defaults, sometimes with
much longer times. `switchd.service`, for example, sets
*StartLimitInterval=10m* and *StartBurstLimit=3*, which means if you
restart switchd more than 3 times in 10 minutes, it does not start.

When the restart fails for this reason, a message similar to the
following appears:

``` 
                   
Job for switchd.service failed. See 'systemctl status switchd.service' and 'journalctl -xn' for details.
   
    
```

And `systemctl status switchd.service` shows output similar to:

``` 
                   
Active: failed (Result: start-limit) since Thu 2016-04-07 21:55:14 UTC; 15s ago
   
    
```

To clear this error, run `systemctl reset-failed switchd.service`. If
you know you are going to restart frequently (multiple times within the
StartLimitInterval), you can run the same command before you issue the
restart request. This also applies to stop followed by start.

### Keep systemd Services from Hanging after Starting

If you start, restart, or reload any `systemd` service that can be
started from another `systemd` service, you must use the `--no-block`
option with `systemctl`. Otherwise, that service or even the switch
itself might hang after starting or restarting.

## Identify Active Listener Ports for IPv4 and IPv6

You can identify the active listener ports under both IPv4 and IPv6
using the `netstat` command:

``` 
                   
cumulus@switch:~$ netstat -nlp --inet --inet6
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name
tcp        0      0 0.0.0.0:53              0.0.0.0:*               LISTEN      444/dnsmasq     
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      874/sshd        
tcp6       0      0 :::53                   :::*                    LISTEN      444/dnsmasq     
tcp6       0      0 :::22                   :::*                    LISTEN      874/sshd        
udp        0      0 0.0.0.0:28450           0.0.0.0:*                           839/dhclient    
udp        0      0 0.0.0.0:53              0.0.0.0:*                           444/dnsmasq     
udp        0      0 0.0.0.0:68              0.0.0.0:*                           839/dhclient    
udp        0      0 192.168.0.42:123        0.0.0.0:*                           907/ntpd        
udp        0      0 127.0.0.1:123           0.0.0.0:*                           907/ntpd        
udp        0      0 0.0.0.0:123             0.0.0.0:*                           907/ntpd        
udp        0      0 0.0.0.0:4784            0.0.0.0:*                           909/ptmd        
udp        0      0 0.0.0.0:3784            0.0.0.0:*                           909/ptmd        
udp        0      0 0.0.0.0:3785            0.0.0.0:*                           909/ptmd        
udp6       0      0 :::58352                :::*                                839/dhclient    
udp6       0      0 :::53                   :::*                                444/dnsmasq     
udp6       0      0 fe80::a200:ff:fe00::123 :::*                                907/ntpd        
udp6       0      0 ::1:123                 :::*                                907/ntpd        
udp6       0      0 :::123                  :::*                                907/ntpd        
udp6       0      0 :::4784                 :::*                                909/ptmd        
udp6       0      0 :::3784                 :::*                                909/ptmd
   
    
```

## Identify Essential Services

If you need to know which services are required to run when the switch
boots, run:

``` 
                   
cumulus@switch:~$ systemctl list-dependencies --before basic.target
   
    
```

To see which services are needed for networking, run:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><pre><code>cumulus@switch:~$ systemctl list-dependencies --after network.target
network.target</code></pre>
<p><strong>●</strong> <code>├─switchd.service</code><br />
<strong>●</strong> <code>├─wd_keepalive.service</code><br />
<strong>●</strong> <code>└─network-pre.target</code></p></td>
</tr>
</tbody>
</table>

To identify the services needed for a multi-user environment, run:

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<tbody>
<tr class="odd">
<td><pre><code>cumulus@switch:~$ systemctl list-dependencies --before multi-user.target
multi-user.target</code></pre>
<p><code>● ├─bootlog.service</code><br />
<strong>●</strong> <code>├─systemd-readahead-done.service</code><br />
<strong>●</strong> <code>├─systemd-readahead-done.timer</code><br />
<strong>●</strong> <code>├─systemd-update-utmp-runlevel.service</code><br />
<strong>●</strong> <code>└─graphical.target</code><br />
<strong>●</strong> <code>└─systemd-update-utmp-runlevel.service</code></p></td>
</tr>
</tbody>
</table>

### Important Services

The following table lists the most important services in Cumulus
Linux.

| Service Name | Description                                                                                                                                                                                                                                        | Affects Forwarding?                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| switchd      | Hardware abstraction daemon, synchronizes the kernel with the ASIC.                                                                                                                                                                                | YES                                          |
| sx\_sdk      | Only on Mellanox switches, interfaces with the Spectrum ASIC.                                                                                                                                                                                      | YES                                          |
| portwd       | Reads pluggable information over the I2C bus. Identifies and classifies the optics that are inserted into the system. Sets interface speeds and capabilities to match the optics.                                                                  | YES, eventually, if optics are added/removed |
| frr          | [FRRouting](/old/FRRouting_Overview.html), handles routing protocols. There are separate processes for each routing protocol, like bgpd and ospfd.                                                                                                 | YES if routing                               |
| clag         | Cumulus link aggregation daemon, handles [MLAG](/old/Multi-Chassis_Link_Aggregation_-_MLAG.html).                                                                                                                                                  | YES if using MLAG                            |
| neighmgrd    | Synchronizes MAC address information when MLAG is in use.                                                                                                                                                                                          | YES if using MLAG                            |
| mstpd        | [Spanning tree protocol](/old/Spanning_Tree_and_Rapid_Spanning_Tree.html) daemon.                                                                                                                                                                  | YES if using layer 2                         |
| ptmd         | [Prescriptive Topology Manager](/old/Prescriptive_Topology_Manager_-_PTM.html), verifies cabling based on [LLDP](/old/Link_Layer_Discovery_Protocol.html) output, also sets up [BFD](/old/Bidirectional_Forwarding_Detection_-_BFD.html) sessions. | YES if using BFD                             |
| netd         | [NCLU](/old/Network_Command_Line_Utility_-_NCLU.html) back end.                                                                                                                                                                                    | NO                                           |
| rsyslog      | Handles logging of syslog messages.                                                                                                                                                                                                                | NO                                           |
| ntp          | [Network time protocol](/old/Setting_Date_and_Time.html).                                                                                                                                                                                          | NO                                           |
| ledmgrd      | [LED manager](/old/Network_Switch_Port_LED_and_Status_LED_Guidelines.html), reads the state of system LEDs.                                                                                                                                        | NO                                           |
| sysmonitor   | Watches and logs critical system load (free memory, disk, CPU).                                                                                                                                                                                    | NO                                           |
| lldpd        | Handles Tx/Rx of [LLDP](/old/Link_Layer_Discovery_Protocol.html) information.                                                                                                                                                                      | NO                                           |
| smond        | Reads [platform sensors and fan information](/old/Monitoring_System_Hardware.html) from pwmd.                                                                                                                                                      | NO                                           |
| pwmd         | Reads and sets fan speeds.                                                                                                                                                                                                                         | NO                                           |
