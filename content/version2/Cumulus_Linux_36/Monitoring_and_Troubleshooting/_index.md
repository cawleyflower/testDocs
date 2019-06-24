---
title: Monitoring and Troubleshooting
author: Unknown
weight: 25
pageID: 8362087
product: Cumulus Linux
version: '3.6'
aliases:
 - /display/undefined/Monitoring+and_Troubleshooting
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
This chapter introduces monitoring and troubleshooting Cumulus Linux.

## Using the Serial Console

The serial console can be a useful tool for debugging issues, especially
when you find yourself rebooting the switch often or if you don’t have a
reliable network connection.

The default serial console baud rate is 115200, which is the baud rate
[ONIE](http://opencomputeproject.github.io/onie/) uses.

### Configuring the Serial Console on ARM Switches

On ARM switches, the U-Boot environment variable `baudrate` identifies
the baud rate of the serial console. To change the `baudrate` variable,
use the `fw_setenv` command:

``` 
                   
cumulus@switch:~$ sudo fw_setenv baudrate 9600
Updating environment variable: `baudrate'
Proceed with update [N/y]? y
   
    
```

You must reboot the switch for the `baudrate` change to take effect.

The valid values for `baudrate` are:

  - 300

  - 600

  - 1200

  - 2400

  - 4800

  - 9600

  - 19200

  - 38400

  - 115200

### Configuring the Serial Console on x86 Switches

On x86 switches, you configure serial console baud rate by editing
`grub`.

{{%notice warning%}}

Incorrect configuration settings in `grub` can cause the switch to be
inaccessible via the console. Grub changes should be carefully reviewed
before implementation.

{{%/notice%}}

The valid values for the baud rate are:

  - 300

  - 600

  - 1200

  - 2400

  - 4800

  - 9600

  - 19200

  - 38400

  - 115200

To change the serial console baud rate:

1.  Edit `/etc/default/grub`. The two relevant lines in
    `/etc/default/grub` are as follows; replace the *115200* value with
    a valid value specified above in the `--speed` variable in the first
    line and in the `console` variable in the second line:
    
    ``` 
                       
    GRUB_SERIAL_COMMAND="serial --port=0x2f8 --speed=115200 --word=8 --parity=no --stop=1"              
    GRUB_CMDLINE_LINUX="console=ttyS1,115200n8 cl_platform=accton_as5712_54x"
       
        
    ```

2.  After you save your changes to the grub configuration, type the
    following at the command prompt:
    
    ``` 
                       
    cumulus@switch:~$ update-grub
       
        
    ```

3.  If you plan on accessing your switch's BIOS over the serial console,
    you need to update the baud rate in the switch BIOS. For more
    information, see [this knowledge base
    article](https://support.cumulusnetworks.com/hc/en-us/articles/203884473).

4.  Reboot the switch.

## Getting General System Information

Two commands are helpful for getting general information about the
switch and the version of Cumulus Linux you are running. These are
helpful with system diagnostics and if you need to submit a support
request to Cumulus Networks.

For information about the version of Cumulus Linux running on the
switch, run `net show version`, which displays the contents of
`/etc/lsb-release`:

``` 
                   
cumulus@switch:~$ net show version
NCLU_VERSION=1.0
DISTRIB_ID="Cumulus Linux"
DISTRIB_RELEASE=3.4.0
DISTRIB_DESCRIPTION="Cumulus Linux 3.4.0"
   
    
```

For general information about the switch, run `net show system`, which
gathers information about the switch from a number of files in the
system:

``` 
                   
cumulus@switch:~$ net show system
 
Penguin Arctica 4806XP
Cumulus Version 3.4.0
Build: Cumulus Linux 3.4.0
 
Chipset: Broadcom Trident2 BCM56854
 
Port Config: 48 x 10G-SFP+ & 6 x 40G-QSFP+
 
CPU: (x86_64) Intel Atom C2558 2.40GHz
 
Uptime: 4 days, 20:53:49
   
    
```

## Diagnostics Using cl-support

You can use `cl-support` to generate a single export file that contains
various details and the configuration from a switch. This is useful for
remote debugging and troubleshooting. For more information about
`cl-support`, read [Understanding the cl-support Output
File](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/).

You should run `cl-support` before you submit a support request to
Cumulus Networks as this file helps in the investigation of issues.

``` 
                   
cumulus@switch:~$ sudo cl-support -h
Usage: cl-support [-h] [-s] [-t] [-v] [reason]...
 
Args:
[reason]: Optional reason to give for invoking cl-support.
         Saved into tarball's cmdline.args file.
Options:
-h: Print this usage statement
-s: Security sensitive collection
-t: User filename tag
-v: Verbose
-e MODULES: Enable modules. Comma separated module list (run with -e help for module names)
-d MODULES: Disable modules. Comma separated module list (run with -d help for module names)
   
    
```

## Next Steps

The links below discuss more specific monitoring topics.

  - [Single User Mode - Boot
    Recovery](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [Resource Diagnostics Using
    cl-resource-query](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [Monitoring System
    Hardware](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)
    
      - [Network Switch Port LED and Status LED
        Guidelines](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [Monitoring Virtual Device
    Counters](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [ASIC
    Monitoring](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [Understanding the cl-support Output
    File](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)
    
      - [Troubleshooting Log
        Files](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)
    
      - [Troubleshooting the etc
        Directory](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [Troubleshooting Network
    Interfaces](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)
    
      - [Monitoring Interfaces and Transceivers Using
        ethtool](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [Network
    Troubleshooting](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)
    
      - [Using NCLU to Troubleshoot Your Network
        Configuration](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)
    
      - [Monitoring System Statistics and Network Traffic with
        sFlow](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [Simple Network Management Protocol (SNMP)
    Monitoring](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)
    
      - [Using Nutanix Prism as a Monitoring
        Tool](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [Monitoring Best
    Practices](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [switchd Log Message
    Reference](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)

  - [FRRouting Log Message
    Reference](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Monitoring_and_Troubleshooting/Monitoring_and_Troubleshooting/)
