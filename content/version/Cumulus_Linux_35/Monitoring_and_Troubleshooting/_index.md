---
title: Monitoring and Troubleshooting
author: Unknown
weight: 25
pageID: 8357374
aliases:
 - /old/Cumulus_Linux_35/Monitoring_and_Troubleshooting.html
imgData: Cumulus_Linux_35
---
# Monitoring and Troubleshooting

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
File](/old/Cumulus_Linux_35/Understanding_the_cl-support_Output_File.html).

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
    Recovery](/old/Cumulus_Linux_35/Single_User_Mode_-_Boot_Recovery.html)

  - [Resource Diagnostics Using
    cl-resource-query](/old/Cumulus_Linux_35/Resource_Diagnostics_Using_cl-resource-query.html)

  - [Monitoring System
    Hardware](/old/Cumulus_Linux_35/Monitoring_System_Hardware.html)
    
      - [Network Switch Port LED and Status LED
        Guidelines](/old/Cumulus_Linux_35/Network_Switch_Port_LED_and_Status_LED_Guidelines.html)

  - [Monitoring Virtual Device
    Counters](/old/Cumulus_Linux_35/Monitoring_Virtual_Device_Counters.html)

  - [Buffer Monitoring](/old/Cumulus_Linux_35/Buffer_Monitoring.html)

  - [Understanding the cl-support Output
    File](/old/Cumulus_Linux_35/Understanding_the_cl-support_Output_File.html)
    
      - [Troubleshooting Log
        Files](/old/Cumulus_Linux_35/Troubleshooting_Log_Files.html)
    
      - [Troubleshooting the etc
        Directory](/old/Cumulus_Linux_35/Troubleshooting_the_etc_Directory.html)

  - [Troubleshooting Network
    Interfaces](/old/Cumulus_Linux_35/Troubleshooting_Network_Interfaces.html)
    
      - [Monitoring Interfaces and Transceivers Using
        ethtool](/old/Cumulus_Linux_35/Monitoring_Interfaces_and_Transceivers_Using_ethtool.html)

  - [Network
    Troubleshooting](/old/Cumulus_Linux_35/Network_Troubleshooting.html)
    
      - [Using NCLU to Troubleshoot Your Network
        Configuration](/old/Cumulus_Linux_35/Using_NCLU_to_Troubleshoot_Your_Network_Configuration.html)
    
      - [Monitoring System Statistics and Network Traffic with
        sFlow](/old/Cumulus_Linux_35/Monitoring_System_Statistics_and_Network_Traffic_with_sFlow.html)

  - [SNMP Monitoring](/old/Cumulus_Linux_35/SNMP_Monitoring.html)
    
      - [Using Nutanix Prism as a Monitoring
        Tool](/old/Cumulus_Linux_35/Using_Nutanix_Prism_as_a_Monitoring_Tool.html)

  - [Monitoring Best
    Practices](/old/Cumulus_Linux_35/Monitoring_Best_Practices.html)
