# Monitor Switch Hardware and Software

With NetQ, a network administrator can monitor both the switch hardware
and software components for misconfigurations. NetQ helps answer
questions such as:

-   What switches do I have in the network?

-   Are all switches licensed correctly?

-   Do all switches have NetQ agents running?

NetQ uses
[LLDP](https://docs.cumulusnetworks.com/display/DOCS/Link+Layer+Discovery+Protocol) (Link
Layer Discovery Protocol) to collect port information. NetQ can also
identify peer ports connected to DACs (Direct Attached Cables) and AOCs
(Active Optical Cables) without using LLDP, even if the link is not UP. 

The NetQ CLI provides the `netq show inventory` and `netq show events`
commands to monitor switches. 

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Monitor Switch and Host Hardware
    Information](#MonitorSwitchHardwareandSoftware-MonitorSwitchandHostHardwareInformation)
    -   [View a Summary of Your
        Network Inventory](#MonitorSwitchHardwareandSoftware-ViewaSummaryofYourNetworkInventory)
    -   [View Information about the ASIC on all
        Switches](#MonitorSwitchHardwareandSoftware-ViewInformationabouttheASIConallSwitches)
    -   [View Information about the Motherboard in a
        Switch](#MonitorSwitchHardwareandSoftware-ViewInformationabouttheMotherboardinaSwitch)
    -   [View Information about the CPU on a
        Switch](#MonitorSwitchHardwareandSoftware-ViewInformationabouttheCPUonaSwitch)
    -   [View Information about the Disk on a
        Switch](#MonitorSwitchHardwareandSoftware-ViewInformationabouttheDiskonaSwitch)
    -   [View Memory Information for a
        Switch](#MonitorSwitchHardwareandSoftware-ViewMemoryInformationforaSwitch)
    -   [View a Summary of All Hardware Information for a
        Switch](#MonitorSwitchHardwareandSoftware-ViewaSummaryofAllHardwareInformationforaSwitch)
-   [Monitor Switch Software
    Information](#MonitorSwitchHardwareandSoftware-MonitorSwitchSoftwareInformation)
    -   [View OS Information for a
        Switch](#MonitorSwitchHardwareandSoftware-ViewOSInformationforaSwitch)
    -   [View License Information for a
        Switch](#MonitorSwitchHardwareandSoftware-ViewLicenseInformationforaSwitch)
    -   [View Summary of Operating System on a
        Switch](#MonitorSwitchHardwareandSoftware-ViewSummaryofOperatingSystemonaSwitch)
    -   [Validate NetQ Agents are
        Running](#MonitorSwitchHardwareandSoftware-ValidateNetQAgentsareRunning)
-   [Monitor Software
    Services](#MonitorSwitchHardwareandSoftware-MonitorSoftwareServices)
    -   [View All Services on All
        Devices](#MonitorSwitchHardwareandSoftware-ViewAllServicesonAllDevices)
    -   [View Information about a Given Service on All
        Devices](#MonitorSwitchHardwareandSoftware-ViewInformationaboutaGivenServiceonAllDevices)
    -   [View Events Related to a Given
        Service](#MonitorSwitchHardwareandSoftware-ViewEventsRelatedtoaGivenService)

## Monitor Switch and Host Hardware Information

You can view summary information about all switches and hosts along with
their key components, including the motherboard, ASIC, microprocessor,
disk and memory information. 

To view the switch and host information with the CLI, use the netq show
inventory command. The syntax for this command is:

``` text
netq show inventory brief [json]
netq show inventory asic [vendor <asic-vendor>| model <asic-model>| model-id <asic-model-id>] [json]
netq show inventory board [vendor <board-vendor>|model <board-model>] [json]
netq show inventory cpu [arch <cpu-arch>] [json]
netq show inventory disk [name <disk-name>|transport <disk-transport>| vendor <disk-vendor>] [json]
netq show inventory memory [type <memory-type>|vendor <memory-vendor>] [json]
```

The keyword values for the `model`, `disk`, `arch`, `name`, `transport`,
and `type` keywords are specific to your deployment. For example, if you
have devices with CPU architectures of only one type, say Intel x86,
then that is the only option available for the `cpu-arch` keyword value.
If you have multiple CPU architectures, say you also have ARMv7, then
that would also be an option for you.

To view the switch and host information with the GUI, use the Devices
Inventory card workflow  which contains a small card with a count of
each device type in your network, a medium card displaying the operating
systems running on each set of devices, large cards with component
information statistics, and full-screen cards displaying tables with
attributes of all switches and all hosts in your network.

### View a Summary of Your Network Inventory

It can be useful to track your network inventory a simple overview of
the inventory is better. This example shows the basic hardware
information for all devices.

``` text
cumulus@switch:~$ netq show inventory brief

Matching inventory records:
Hostname          Switch               OS              CPU      ASIC            Ports
----------------- -------------------- --------------- -------- --------------- -----------------------------------
leaf01            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf02            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf03            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf04            VX                   Cumulus Linux   x86_64   N/A             N/A
oob-mgmt-server   VX                   Cumulus Linux   x86_64   N/A             N/A
server01          N/A                  Ubuntu          x86_64   N/A             N/A
server02          N/A                  Ubuntu          x86_64   N/A             N/A
server03          N/A                  Ubuntu          x86_64   N/A             N/A
server04          N/A                  Ubuntu          x86_64   N/A             N/A
spine01           VX                   Cumulus Linux   x86_64   N/A             N/A
spine02           VX                   Cumulus Linux   x86_64   N/A             N/A
```

### View Information about the ASIC on all Switches

You can view the vendor, model, model identifier, core bandwidth
capability, and ports of the ASIC installed on your switch motherboard.
This example shows all of these for all devices.

``` text
cumulus@switch:~$ netq show inventory asic
Matching inventory records:
Hostname          Vendor               Model                          Model ID                  Core BW        Ports
----------------- -------------------- ------------------------------ ------------------------- -------------- -----------------------------------
dell-z9100-05     Broadcom             Tomahawk                       BCM56960                  2.0T           32 x 100G-QSFP28
mlx-2100-05       Mellanox             Spectrum                       MT52132                   N/A            16 x 100G-QSFP28
mlx-2410a1-05     Mellanox             Spectrum                       MT52132                   N/A            48 x 25G-SFP28 & 8 x 100G-QSFP28
mlx-2700-11       Mellanox             Spectrum                       MT52132                   N/A            32 x 100G-QSFP28
qct-ix1-08        Broadcom             Tomahawk                       BCM56960                  2.0T           32 x 100G-QSFP28
qct-ix7-04        Broadcom             Trident3                       BCM56870                  N/A            32 x 100G-QSFP28
qct-ix7-04        N/A                  N/A                            N/A                       N/A            N/A
st1-l1            Broadcom             Trident2                       BCM56854                  720G           48 x 10G-SFP+ & 6 x 40G-QSFP+
st1-l2            Broadcom             Trident2                       BCM56854                  720G           48 x 10G-SFP+ & 6 x 40G-QSFP+
st1-l3            Broadcom             Trident2                       BCM56854                  720G           48 x 10G-SFP+ & 6 x 40G-QSFP+
st1-s1            Broadcom             Trident2                       BCM56850                  960G           32 x 40G-QSFP+
st1-s2            Broadcom             Trident2                       BCM56850                  960G           32 x 40G-QSFP+
```

You can filter the results of the command to view devices with a
particular characteristic. This example shows all devices that use a
Broadcom ASIC.

``` text
cumulus@switch:~$ netq show inventory asic vendor Broadcom
Matching inventory records:
Hostname          Vendor               Model                          Model ID                  Core BW        Ports
----------------- -------------------- ------------------------------ ------------------------- -------------- -----------------------------------
dell-z9100-05     Broadcom             Tomahawk                       BCM56960                  2.0T           32 x 100G-QSFP28
qct-ix1-08        Broadcom             Tomahawk                       BCM56960                  2.0T           32 x 100G-QSFP28
qct-ix7-04        Broadcom             Trident3                       BCM56870                  N/A            32 x 100G-QSFP28
st1-l1            Broadcom             Trident2                       BCM56854                  720G           48 x 10G-SFP+ & 6 x 40G-QSFP+
st1-l2            Broadcom             Trident2                       BCM56854                  720G           48 x 10G-SFP+ & 6 x 40G-QSFP+
st1-l3            Broadcom             Trident2                       BCM56854                  720G           48 x 10G-SFP+ & 6 x 40G-QSFP+
st1-s1            Broadcom             Trident2                       BCM56850                  960G           32 x 40G-QSFP+
st1-s2            Broadcom             Trident2                       BCM56850                  960G           32 x 40G-QSFP+
```

You can filter the results of the command view the ASIC information for
a particular switch. This example shows the ASIC information for
*st1-11* switch. 

``` text
cumulus@switch:~$ netq leaf02 show inventory asic
Matching inventory records:
Hostname          Vendor               Model                          Model ID                  Core BW        Ports
----------------- -------------------- ------------------------------ ------------------------- -------------- -----------------------------------
st1-l1            Broadcom             Trident2                       BCM56854                  720G           48 x 10G-SFP+ & 6 x 40G-QSFP+
```

### View Information about the Motherboard in a Switch

You can view the vendor, model, base MAC address, serial number, part
number, revision, and manufacturing date for a switch motherboard on a
single device or on all devices. This example shows all of the
motherboard data for all devices. 

``` text
cumulus@switch:~$ netq show inventory board
Matching inventory records:
Hostname          Vendor               Model                          Base MAC           Serial No                 Part No          Rev    Mfg Date
----------------- -------------------- ------------------------------ ------------------ ------------------------- ---------------- ------ ----------
dell-z9100-05     DELL                 Z9100-ON                       4C:76:25:E7:42:C0  CN03GT5N779315C20001      03GT5N           A00    12/04/2015
mlx-2100-05       Penguin              Arctica 1600cs                 7C:FE:90:F5:61:C0  MT1623X10078              MSN2100-CB2FO    N/A    06/09/2016
mlx-2410a1-05     Mellanox             SN2410                         EC:0D:9A:4E:55:C0  MT1734X00067              MSN2410-CB2F_QP3 N/A    08/24/2017
mlx-2700-11       Penguin              Arctica 3200cs                 44:38:39:00:AB:80  MT1604X21036              MSN2700-CS2FO    N/A    01/31/2016
qct-ix1-08        QCT                  QuantaMesh BMS T7032-IX1       54:AB:3A:78:69:51  QTFCO7623002C             1IX1UZZ0ST6      H3B    05/30/2016
qct-ix7-04        QCT                  IX7                            D8:C4:97:62:37:65  QTFCUW821000A             1IX7UZZ0ST5      B3D    05/07/2018
qct-ix7-04        QCT                  T7032-IX7                      D8:C4:97:62:37:65  QTFCUW821000A             1IX7UZZ0ST5      B3D    05/07/2018
st1-l1            CELESTICA            Arctica 4806xp                 00:E0:EC:27:71:37  D2060B2F044919GD000011    R0854-F1004-01   Redsto 09/20/2014
                                                                                                                                    ne-XP
st1-l2            CELESTICA            Arctica 4806xp                 00:E0:EC:27:6B:3A  D2060B2F044919GD000060    R0854-F1004-01   Redsto 09/20/2014
                                                                                                                                    ne-XP
st1-l3            Penguin              Arctica 4806xp                 44:38:39:00:70:49  N/A                       N/A              N/A    N/A
st1-s1            Dell                 S6000-ON                       44:38:39:00:80:00  N/A                       N/A              N/A    N/A
st1-s2            Dell                 S6000-ON                       44:38:39:00:80:81  N/A                       N/A              N/A    N/A
```

You can filter the results of the command to capture only those devices
with a particular motherboard vendor. This example shows only the
devices with *Celestica* motherboards.

``` text
cumulus@switch:~$ netq show inventory board vendor celestica
Matching inventory records:
Hostname          Vendor               Model                          Base MAC           Serial No                 Part No          Rev    Mfg Date
----------------- -------------------- ------------------------------ ------------------ ------------------------- ---------------- ------ ----------
st1-l1            CELESTICA            Arctica 4806xp                 00:E0:EC:27:71:37  D2060B2F044919GD000011    R0854-F1004-01   Redsto 09/20/2014
                                                                                                                                    ne-XP
st1-l2            CELESTICA            Arctica 4806xp                 00:E0:EC:27:6B:3A  D2060B2F044919GD000060    R0854-F1004-01   Redsto 09/20/2014
                                                                                                                                    ne-XP
```

You can filter the results of the command to view the model for a
particular switch. This example shows the motherboard vendor for
the *st1-s1* switch.

``` text
cumulus@switch:~$ netq st1-s1 show inventory board
Matching inventory records:
Hostname          Vendor               Model                          Base MAC           Serial No                 Part No          Rev    Mfg Date
----------------- -------------------- ------------------------------ ------------------ ------------------------- ---------------- ------ ----------
st1-s1            Dell                 S6000-ON                       44:38:39:00:80:00  N/A                       N/A              N/A    N/A
```

### View Information about the CPU on a Switch

You can view the architecture, model, operating frequency, and the
number of cores for the CPU on a single device or for all devices. This
example shows these CPU characteristics for all devices.

``` text
cumulus@nswitch:~$ netq show inventory cpu
Matching inventory records:
Hostname          Arch     Model                          Freq       Cores
----------------- -------- ------------------------------ ---------- -----
dell-z9100-05     x86_64   Intel(R) Atom(TM) C2538        2.40GHz    4
mlx-2100-05       x86_64   Intel(R) Atom(TM) C2558        2.40GHz    4
mlx-2410a1-05     x86_64   Intel(R) Celeron(R)  1047UE    1.40GHz    2
mlx-2700-11       x86_64   Intel(R) Celeron(R)  1047UE    1.40GHz    2
qct-ix1-08        x86_64   Intel(R) Atom(TM) C2558        2.40GHz    4
qct-ix7-04        x86_64   Intel(R) Atom(TM) C2558        2.40GHz    4
st1-l1            x86_64   Intel(R) Atom(TM) C2538        2.41GHz    4
st1-l2            x86_64   Intel(R) Atom(TM) C2538        2.41GHz    4
st1-l3            x86_64   Intel(R) Atom(TM) C2538        2.40GHz    4
st1-s1            x86_64   Intel(R) Atom(TM)  S1220       1.60GHz    4
st1-s2            x86_64   Intel(R) Atom(TM)  S1220       1.60GHz    4
```

You can filter the results of the command to view which switches employ
a particular CPU architecture using the *arch* keyword. This example
shows how to determine which architectures are deployed in your network,
and then shows all devices with an *x86\_64* architecture. 

``` text
cumulus@switch:~$ netq show inventory cpu arch 
    x86_64  :  CPU Architecture

cumulus@switch:~$ netq show inventory cpu arch x86_64
Matching inventory records:
Hostname          Arch     Model                          Freq       Cores
----------------- -------- ------------------------------ ---------- -----
leaf01            x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
leaf02            x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
leaf03            x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
leaf04            x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
oob-mgmt-server   x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
server01          x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
server02          x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
server03          x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
server04          x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
spine01           x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
spine02           x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
```

You can filter the results to view CPU information for a single switch,
as shown here for *server02*.

``` text
cumulus@switch:~$ netq server02 show inventory cpu

Matching inventory records:
Hostname          Arch     Model                          Freq       Cores
----------------- -------- ------------------------------ ---------- -----
server02          x86_64   Intel Core i7 9xx (Nehalem Cla N/A        1
                           ss Core i7)
```

### View Information about the Disk on a Switch

You can view the name or operating system, type, transport, size,
vendor, and model of the disk on a single device or all devices. This
example shows all of these disk characteristics for all devices.

``` text
cumulus@switch:~$ netq show inventory disk
Matching inventory records:
Hostname          Name            Type             Transport          Size       Vendor               Model
----------------- --------------- ---------------- ------------------ ---------- -------------------- ------------------------------
leaf01            vda             disk             N/A                6G         0x1af4               N/A
leaf02            vda             disk             N/A                6G         0x1af4               N/A
leaf03            vda             disk             N/A                6G         0x1af4               N/A
leaf04            vda             disk             N/A                6G         0x1af4               N/A
oob-mgmt-server   vda             disk             N/A                256G       0x1af4               N/A
server01          vda             disk             N/A                301G       0x1af4               N/A
server02          vda             disk             N/A                301G       0x1af4               N/A
server03          vda             disk             N/A                301G       0x1af4               N/A
server04          vda             disk             N/A                301G       0x1af4               N/A
spine01           vda             disk             N/A                6G         0x1af4               N/A
spine02           vda             disk             N/A                6G         0x1af4               N/A
```

You can filter the results of the command to view the disk information
for a particular device. This example shows disk information for leaf03
switch.

``` text
cumulus@switch:~$ netq leaf03 show inventory disk
Matching inventory records:
Hostname          Name            Type             Transport          Size       Vendor               Model
----------------- --------------- ---------------- ------------------ ---------- -------------------- ------------------------------
leaf03            vda             disk             N/A                6G         0x1af4               N/A
```

### View Memory Information for a Switch

You can view the name, type, size, speed, vendor, and serial number for
the memory installed in a single device or all devices. This example
shows all of these characteristics for all devices.

``` text
cumulus@switch:~$ netq show inventory memory
Matching inventory records:
Hostname          Name            Type             Size       Speed      Vendor               Serial No
----------------- --------------- ---------------- ---------- ---------- -------------------- -------------------------
dell-z9100-05     DIMM0 BANK 0    DDR3             8192 MB    1600 MHz   Hynix                14391421
mlx-2100-05       DIMM0 BANK 0    DDR3             8192 MB    1600 MHz   InnoDisk Corporation 00000000
mlx-2410a1-05     ChannelA-DIMM0  DDR3             8192 MB    1600 MHz   017A                 87416232
                  BANK 0
mlx-2700-11       ChannelA-DIMM0  DDR3             8192 MB    1600 MHz   017A                 73215444
                  BANK 0
mlx-2700-11       ChannelB-DIMM0  DDR3             8192 MB    1600 MHz   017A                 73215444
                  BANK 2
qct-ix1-08        N/A             N/A              7907.45MB  N/A        N/A                  N/A
qct-ix7-04        DIMM0 BANK 0    DDR3             8192 MB    1600 MHz   Transcend            00211415
st1-l1            DIMM0 BANK 0    DDR3             4096 MB    1333 MHz   N/A                  N/A
st1-l2            DIMM0 BANK 0    DDR3             4096 MB    1333 MHz   N/A                  N/A
st1-l3            DIMM0 BANK 0    DDR3             4096 MB    1600 MHz   N/A                  N/A
st1-s1            A1_DIMM0 A1_BAN DDR3             8192 MB    1333 MHz   A1_Manufacturer0     A1_SerNum0
                  K0
st1-s2            A1_DIMM0 A1_BAN DDR3             8192 MB    1333 MHz   A1_Manufacturer0     A1_SerNum0
                  K0
```

You can filter the results of the command to view devices with a
particular memory type or vendor. This example shows all of the devices
with memory from QEMU.

``` text
cumulus@switch:~$ netq show inventory memory vendor QEMU
Matching inventory records:
Hostname          Name            Type             Size       Speed      Vendor               Serial No
----------------- --------------- ---------------- ---------- ---------- -------------------- -------------------------
leaf01            DIMM 0          RAM              1024 MB    Unknown    QEMU                 Not Specified
leaf02            DIMM 0          RAM              1024 MB    Unknown    QEMU                 Not Specified
leaf03            DIMM 0          RAM              1024 MB    Unknown    QEMU                 Not Specified
leaf04            DIMM 0          RAM              1024 MB    Unknown    QEMU                 Not Specified
oob-mgmt-server   DIMM 0          RAM              4096 MB    Unknown    QEMU                 Not Specified
server01          DIMM 0          RAM              512 MB     Unknown    QEMU                 Not Specified
server02          DIMM 0          RAM              512 MB     Unknown    QEMU                 Not Specified
server03          DIMM 0          RAM              512 MB     Unknown    QEMU                 Not Specified
server04          DIMM 0          RAM              512 MB     Unknown    QEMU                 Not Specified
spine01           DIMM 0          RAM              1024 MB    Unknown    QEMU                 Not Specified
spine02           DIMM 0          RAM              1024 MB    Unknown    QEMU                 Not Specified
```

You can filter the results to view memory information for a single
switch, as shown here for leaf01.

``` text
cumulus@switch:~$ netq leaf01 show inventory memory

Matching inventory records:
Hostname          Name            Type             Size       Speed      Vendor               Serial No
----------------- --------------- ---------------- ---------- ---------- -------------------- -------------------------
leaf01            DIMM 0          RAM              1024 MB    Unknown    QEMU                 Not Specified
```

### View a Summary of All Hardware Information for a Switch

While the detail can be very helpful, sometimes a simple overview of the
hardware inventory is better. This example shows the basic hardware
information for all devices.

``` text
cumulus@switch:~$ netq show inventory brief

Matching inventory records:
Hostname          Switch               OS              CPU      ASIC            Ports
----------------- -------------------- --------------- -------- --------------- -----------------------------------
leaf01            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf02            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf03            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf04            VX                   Cumulus Linux   x86_64   N/A             N/A
oob-mgmt-server   VX                   Cumulus Linux   x86_64   N/A             N/A
server01          N/A                  Ubuntu          x86_64   N/A             N/A
server02          N/A                  Ubuntu          x86_64   N/A             N/A
server03          N/A                  Ubuntu          x86_64   N/A             N/A
server04          N/A                  Ubuntu          x86_64   N/A             N/A
spine01           VX                   Cumulus Linux   x86_64   N/A             N/A
spine02           VX                   Cumulus Linux   x86_64   N/A             N/A
```

## Monitor Switch Software Information

The syntax for this command is:

``` text
netq [<hostname>] show inventory brief [json]
netq [<hostname>] show inventory license [cumulus] [around <text-time>] [json]
netq [<hostname>] show inventory license [cumulus] changes [between <text-time> and <text-endtime>] [json]
netq [<hostname>] show inventory os [version <os-version>|name <os-name>] [json]netq [<hostname>] show events [level info | level warning | level error | level debug] type os [version <os-version>|name <os-name>] [vrf <vrf>] changes [between <text-time> and <text-endtime>]

netq [<hostname>] show events [level info | level warning | level error | level debug] type license [<???>] [vrf <vrf>] changes [between <text-time> and <text-endtime>]
```

The keyword values for the `name` keyword is specific to your
deployment. For example, if you have devices with only one type of OS,
say Cumulus Linux, then that is the only option available for the
`os-name` keyword value. If you have multiple OSs running, say you also
have Ubuntu, then that would also be an option for you.

When entering a time value, you must include a numeric value *and* the
unit of measure:

-   w: week(s)
-   d: day(s)
-   h: hour(s)
-   m: minute(s)
-   s: second(s)
-   now

For time ranges, the `<text-time>` is the most recent time and the
`<text-endtime>` is the oldest time. The values do not have to have the
same unit of measure.

### View OS Information for a Switch

You can view the name and version of the OS on a switch, and when it was
last modified. This example shows the OS information for all devices.

``` text
cumulus@switch:~$ netq show inventory os

Matching inventory records:
Hostname          Name            Version                              Last Changed
----------------- --------------- ------------------------------------ -------------------------
leaf01            Cumulus Linux   3.7.2.1~1533263732.39254ac           Tue Feb 12 18:30:53 2019
leaf02            Cumulus Linux   3.7.2.1~1533263732.39254ac           Tue Feb 12 18:30:57 2019
leaf03            Cumulus Linux   3.7.2.1~1533263732.39254ac           Tue Feb 12 18:30:58 2019
leaf04            Cumulus Linux   3.7.1.0~1748339104.32814bc           Thu Jan 10 15:34:23 2019
oob-mgmt-server   Cumulus Linux   3.7.2~1533263174.bce9472             Mon Feb 11 16:17:51 2019
server04          Ubuntu          16.04                                Thu Feb 12 18:29:53 2019
server04          Ubuntu          16.04                                Thu Feb 12 18:27:41 2019
server04          Ubuntu          16.04                                Thu Feb 12 18:27:45 2019
server04          Ubuntu          16.04                                Thu Feb 12 18:30:07 2019
spine01           Cumulus Linux   3.7.2.1~1533263732.39254ac           Tue Feb 12 18:30:42 2019
spine02           Cumulus Linux   3.7.2.1~1533263732.39254ac           Tue Feb 12 18:30:48 2019
```

You can filter the results of the command to view only devices with a
particular operating system or version. This can be especially helpful
when you suspect that a particular device has not been upgraded as
expected. This example shows all devices with the Cumulus Linux version
3.7.1 installed.

``` text
cumulus@switch:~$ netq show inventory os version 3.7.1

Matching inventory records:
Hostname          Name            Version                              Last Changed
----------------- --------------- ------------------------------------ -------------------------
leaf04            Cumulus Linux   3.7.1.0~1748339104.32814bc           Thu Jan 10 15:34:23 2019
```

This example shows changes that have been made to the OS on all devices
between 16 and 21 days ago. Remember to use measurement units on the
time values. 

``` text
cumulus@switch:~$ netq show events type os between 16d and 21d
Matching inventory records:
Hostname          Name            Version                              DB State   Last Changed
----------------- --------------- ------------------------------------ ---------- -------------------------
mlx-2410a1-05     Cumulus Linux   3.7.3                                Add        Tue Feb 12 18:30:53 2019
mlx-2700-11       Cumulus Linux   3.7.3                                Add        Tue Feb 12 18:30:45 2019
mlx-2100-05       Cumulus Linux   3.7.3                                Add        Tue Feb 12 18:30:26 2019
mlx-2100-05       Cumulus Linux   3.7.3~1533263174.bce9472             Add        Wed Feb 13 11:10:47 2019
mlx-2700-11       Cumulus Linux   3.7.3~1533263174.bce9472             Add        Wed Feb 13 11:10:38 2019
mlx-2100-05       Cumulus Linux   3.7.3~1533263174.bce9472             Add        Wed Feb 13 11:10:42 2019
mlx-2700-11       Cumulus Linux   3.7.3~1533263174.bce9472             Add        Wed Feb 13 11:10:51 2019
```

### View License Information for a Switch

You can view the name and current state of the license (whether it valid
or not), and when it was last updated for one or more devices. If a
license is no longer valid on a switch, it does not operate correctly.
This example shows the license information for all devices.

``` text
cumulus@switch:~$ netq show inventory license

Matching inventory records:
Hostname          Name            State      Last Changed
----------------- --------------- ---------- -------------------------
leaf01            Cumulus Linux   ok         Tue Feb 12 18:30:53 2019
leaf02            Cumulus Linux   ok         Tue Feb 12 18:30:48 2019
leaf03            Cumulus Linux   ok         Tue Feb 12 18:30:41 2019
leaf04            Cumulus Linux   ok         Tue Feb 12 18:30:36 2019
oob-mgmt-server   Cumulus Linux   ok         Tue Feb 12 18:30:53 2019
server01          Cumulus Linux   N/A        Thu Feb 14 14:08:24 2019
server02          Cumulus Linux   N/A        Thu Feb 14 14:08:32 2019
server03          Cumulus Linux   N/A        Thu Feb 14 14:08:39 2019
server04          Cumulus Linux   N/A        Thu Feb 14 14:08:46 2019
spine01           Cumulus Linux   ok         Thu Feb 14 14:18:24 2019
spine02           Cumulus Linux   ok         Thu Feb 14 14:18:34 2019
```

You can view the historical state of licenses using the around keyword.
This example shows the license state for all devices about 7 days ago.
Remember to use measurement units on the time values.

``` text
cumulus@switch:~$ netq show inventory license around 7d

Matching inventory records:
Hostname          Name            State      Last Changed
----------------- --------------- ---------- -------------------------
leaf01            Cumulus Linux   ok         Tue Feb 15 18:30:53 2019
leaf02            Cumulus Linux   ok         Tue Feb 15 18:30:48 2019
leaf03            Cumulus Linux   ok         Tue Feb 15 18:30:41 2019
leaf04            Cumulus Linux   ok         Tue Feb 15 18:30:36 2019
oob-mgmt-server   Cumulus Linux   ok         Tue Feb 15 18:30:53 2019
server01          Cumulus Linux   N/A        Thu Feb 17 14:08:24 2019
server02          Cumulus Linux   N/A        Thu Feb 17 14:08:32 2019
server03          Cumulus Linux   N/A        Thu Feb 17 14:08:39 2019
server04          Cumulus Linux   N/A        Thu Feb 17 14:08:46 2019
spine01           Cumulus Linux   ok         Thu Feb 17 14:18:24 2019
spine02           Cumulus Linux   ok         Thu Feb 17 14:18:34 2019
```

You can filter the results to show license changes during a particular
timeframe for a particular device. This example shows that there have
been no changes to the license state on spine01 between now and two
weeks ago.

``` text
cumulus@switch:~$ netq spine01 show events type license between now and 14d
No matching events records found
```

### View Summary of Operating System on a Switch

As with the hardware information, you can view a summary of the software
information using the *brief* keyword. Specify a hostname to view the
summary for a specific device.

``` text
cumulus@switch:~$ netq show inventory brief

Matching inventory records:
Hostname          Switch               OS              CPU      ASIC            Ports
----------------- -------------------- --------------- -------- --------------- -----------------------------------
leaf01            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf02            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf03            VX                   Cumulus Linux   x86_64   N/A             N/A
leaf04            VX                   Cumulus Linux   x86_64   N/A             N/A
oob-mgmt-server   VX                   Cumulus Linux   x86_64   N/A             N/A
server01          N/A                  Ubuntu          x86_64   N/A             N/A
server02          N/A                  Ubuntu          x86_64   N/A             N/A
server03          N/A                  Ubuntu          x86_64   N/A             N/A
server04          N/A                  Ubuntu          x86_64   N/A             N/A
spine01           VX                   Cumulus Linux   x86_64   N/A             N/A
spine02           VX                   Cumulus Linux   x86_64   N/A             N/A
```

### Validate NetQ Agents are Running

You can confirm that NetQ Agents are running on switches and hosts (if
installed) using the `netq show agents` command. Viewing the **Status**
column of the output indicates whether the agent is up and current,
labelled *Fresh*, or down and stale, labelled *Rotten*. Additional
information is provided about the agent status, including whether it is
time synchronized, how long it has been up, and the last time its state
changed.

This example shows NetQ Agent state on all devices. You can view the
state for a single device using the *hostname* keyword.

``` text
cumulus@switch:~$ netq show agents
Matching agents records:
Hostname          Status           NTP Sync Version                              Sys Uptime                Agent Uptime              Reinitialize Time          Last Changed
----------------- ---------------- -------- ------------------------------------ ------------------------- ------------------------- -------------------------- -------------------------
exit01            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:31s             1d:6h:29m:15s             1d:6h:29m:15s              Sat Feb 16 17:27:29 2019
exit02            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:31s             1d:6h:29m:11s             1d:6h:29m:11s              Sat Feb 16 17:26:17 2019
firewall01        Fresh            yes      2.0.0-ub16.04u11~1550199614.7187931  1d:6h:35m:31s             1d:6h:29m:4s              1d:6h:29m:4s               Sat Feb 16 17:28:34 2019
firewall02        Fresh            yes      2.0.0-rh7u11~1550199734.7187931      1d:6h:34m:52s             1d:6h:28m:57s             1d:6h:28m:57s              Sat Feb 16 17:28:46 2019
hostd-11          Fresh            yes      2.0.0-ub16.04u11~1550199614.7187931  1d:6h:35m:25s             1d:6h:28m:45s             1d:6h:28m:45s              Sat Feb 16 17:29:15 2019
hostd-12          Fresh            yes      2.0.0-rh7u11~1550199734.7187931      1d:6h:34m:57s             1d:6h:28m:41s             1d:6h:28m:41s              Sat Feb 16 17:29:14 2019
hostd-21          Fresh            yes      2.0.0-ub16.04u11~1550199614.7187931  1d:6h:35m:24s             1d:6h:28m:36s             1d:6h:28m:36s              Sat Feb 16 17:29:20 2019
hostd-22          Fresh            yes      2.0.0-rh7u11~1550199734.7187931      1d:6h:34m:56s             1d:6h:28m:32s             1d:6h:28m:32s              Sat Feb 16 17:29:17 2019
hosts-11          Fresh            yes      2.0.0-ub16.04u11~1550199614.7187931  1d:6h:35m:24s             1d:6h:28m:27s             1d:6h:28m:27s              Sat Feb 16 17:29:22 2019
hosts-12          Fresh            yes      2.0.0-rh7u11~1550199734.7187931      1d:6h:34m:55s             1d:6h:28m:23s             1d:6h:28m:23s              Sat Feb 16 17:29:27 2019
hosts-13          Fresh            yes      2.0.0-ub16.04u11~1550199614.7187931  1d:6h:35m:24s             1d:6h:28m:18s             1d:6h:28m:18s              Sat Feb 16 17:29:33 2019
hosts-21          Fresh            yes      2.0.0-ub16.04u11~1550199614.7187931  1d:6h:35m:24s             1d:6h:28m:13s             1d:6h:28m:13s              Sat Feb 16 17:29:45 2019
hosts-22          Fresh            yes      2.0.0-rh7u11~1550199734.7187931      1d:6h:34m:54s             1d:6h:28m:8s              1d:6h:28m:8s               Sat Feb 16 17:29:39 2019
hosts-23          Fresh            yes      2.0.0-ub16.04u11~1550199614.7187931  1d:6h:35m:23s             1d:6h:28m:4s              1d:6h:28m:4s               Sat Feb 16 17:29:50 2019
noc-pr            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:28s             1d:6h:30m:15s             1d:6h:30m:15s              Sat Feb 16 17:27:24 2019
noc-se            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:27s             1d:6h:30m:10s             1d:6h:30m:10s              Sat Feb 16 17:27:29 2019
spine01           Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:30s             1d:6h:30m:5s              1d:6h:30m:5s               Sat Feb 16 17:27:26 2019
spine02           Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:31s             1d:6h:30m:1s              1d:6h:30m:1s               Sat Feb 16 17:27:36 2019
spine03           Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:31s             1d:6h:29m:56s             1d:6h:29m:56s              Sat Feb 16 17:27:06 2019
leaf01            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:29s             1d:6h:29m:26s             1d:6h:29m:26s              Sat Feb 16 17:27:20 2019
leaf02            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:29s             1d:6h:29m:21s             1d:6h:29m:21s              Sat Feb 16 17:27:07 2019
leaf11            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:35s             1d:6h:29m:50s             1d:6h:25m:52s              Sat Feb 16 17:27:43 2019
leaf12            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:34s             1d:6h:29m:44s             1d:6h:25m:40s              Sat Feb 16 17:27:59 2019
leaf21            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:35s             1d:6h:29m:39s             1d:6h:25m:35s              Sat Feb 16 17:28:03 2019
leaf22            Fresh            yes      2.0.0-cl3u11~1550199613.7187931      1d:6h:35m:33s             1d:6h:29m:31s             1d:6h:29m:31s              Sat Feb 16 17:26:28 2019
```

You can view the state of NetQ Agents at an earlier time using the
*around* keyword.

## Monitor Software Services

Cumulus Linux and NetQ run a number of services to deliver the various
features of these products. You can monitor their status using the
`netq show services` command. The services related to system-level
operation are described here. Monitoring of other services, such as
those related to routing, are described with those topics. NetQ
automatically monitors the following services:

-   bgpd: BGP (Border Gateway Protocol) daemon
-   clagd:  MLAG (Multi-chassis Link Aggregation) daemon
-   docker: Docker service
-   ledmgrd:  Switch LED manager daemon
-   lldpd:  LLDP (Link Layer Discovery Protocol) daemon
-   mstpd:  MSTP (Multiple Spanning Tree Protocol) daemon
-   neighmgrd:  Neighbor Manager daemon for BGP and OSPF
-   netq-agent:  NetQ Agent service
-   netqd: NetQ application daemon
-   ntp: NTP service
-   ntpd: NTP daemon
-   ptmd: PTM (Prescriptive Topology Manager) daemon
-   pwmd : PWM (Password Manager) daemon
-   rsyslog: Rocket-fast system event logging processing service
-   smond: System monitor daemon
-   ssh: Secure Shell service for switches and servers
-   status: License validation service
-   syslog: System event logging service
-   vrf: VRF (Virtual Route Forwarding) service
-   zebra: GNU Zebra routing daemon

The CLI syntax for viewing the status of services is:

``` text
netq [<hostname>] show services [<service-name>] [vrf <vrf>] [active|monitored] [around <text-time>] [json]
netq [<hostname>] show services [<service-name>] [vrf <vrf>] status (ok|warning|error|fail) [around <text-time>] [json]
netq [<hostname>] show events [level info | level error | level warning | level critical | level debug] type services [between <text-time> and <text-endtime>] [json]
```

### View All Services on All Devices

This example shows all of the available services on each device and
whether each is enabled, active, and monitored, along with how long the
service has been running and the last time it was changed.

``` text
cumulus@switch:~$ netq show services
Hostname          Service              PID   VRF             Enabled Active Monitored Status           Uptime                    Last Changed
----------------- -------------------- ----- --------------- ------- ------ --------- ---------------- ------------------------- -------------------------
leaf01            bgpd                 2872  default         yes     yes    yes       ok               1d:6h:43m:59s             Fri Feb 15 17:28:24 2019
leaf01            clagd                n/a   default         yes     no     yes       n/a              1d:6h:43m:35s             Fri Feb 15 17:28:48 2019
leaf01            ledmgrd              1850  default         yes     yes    no        ok               1d:6h:43m:59s             Fri Feb 15 17:28:24 2019
leaf01            lldpd                2651  default         yes     yes    yes       ok               1d:6h:43m:27s             Fri Feb 15 17:28:56 2019
leaf01            mstpd                1746  default         yes     yes    yes       ok               1d:6h:43m:35s             Fri Feb 15 17:28:48 2019
leaf01            neighmgrd            1986  default         yes     yes    no        ok               1d:6h:43m:59s             Fri Feb 15 17:28:24 2019
leaf01            netq-agent           8654  mgmt            yes     yes    yes       ok               1d:6h:43m:29s             Fri Feb 15 17:28:54 2019
leaf01            netqd                8848  mgmt            yes     yes    yes       ok               1d:6h:43m:29s             Fri Feb 15 17:28:54 2019
leaf01            ntp                  8478  mgmt            yes     yes    yes       ok               1d:6h:43m:29s             Fri Feb 15 17:28:54 2019
leaf01            ptmd                 2743  default         yes     yes    no        ok               1d:6h:43m:59s             Fri Feb 15 17:28:24 2019
leaf01            pwmd                 1852  default         yes     yes    no        ok               1d:6h:43m:59s             Fri Feb 15 17:28:24 2019
leaf01            smond                1826  default         yes     yes    yes       ok               1d:6h:43m:27s             Fri Feb 15 17:28:56 2019
leaf01            ssh                  2106  default         yes     yes    no        ok               1d:6h:43m:59s             Fri Feb 15 17:28:24 2019
leaf01            syslog               8254  default         yes     yes    no        ok               1d:6h:43m:59s             Fri Feb 15 17:28:24 2019
leaf01            zebra                2856  default         yes     yes    yes       ok               1d:6h:43m:59s             Fri Feb 15 17:28:24 2019
leaf02            bgpd                 2867  default         yes     yes    yes       ok               1d:6h:43m:55s             Fri Feb 15 17:28:28 2019
leaf02            clagd                n/a   default         yes     no     yes       n/a              1d:6h:43m:31s             Fri Feb 15 17:28:53 2019
leaf02            ledmgrd              1856  default         yes     yes    no        ok               1d:6h:43m:55s             Fri Feb 15 17:28:28 2019
leaf02            lldpd                2646  default         yes     yes    yes       ok               1d:6h:43m:30s             Fri Feb 15 17:28:53 2019
...
```

  
You can also view services information in JSON format:

``` text
cumulus@switch:~$ netq show services json
{
    "services":[
        {
            "status":"ok",
            "uptime":1550251734.0,
            "monitored":"yes",
            "service":"ntp",
            "lastChanged":1550251734.4790000916,
            "pid":"8478",
            "hostname":"leaf01",
            "enabled":"yes",
            "vrf":"mgmt",
            "active":"yes"
        },
        {
            "status":"ok",
            "uptime":1550251704.0,
            "monitored":"no",
            "service":"ssh",
            "lastChanged":1550251704.0929999352,
            "pid":"2106",
            "hostname":"leaf01",
            "enabled":"yes",
            "vrf":"default",
            "active":"yes"
        },
        {
            "status":"ok",
            "uptime":1550251736.0,
            "monitored":"yes",
            "service":"lldpd",
            "lastChanged":1550251736.5160000324,
            "pid":"2651",
            "hostname":"leaf01",
            "enabled":"yes",
            "vrf":"default",
            "active":"yes"
        },
        {
            "status":"ok",
            "uptime":1550251704.0,
            "monitored":"yes",
            "service":"bgpd",
            "lastChanged":1550251704.1040000916,
            "pid":"2872",
            "hostname":"leaf01",
            "enabled":"yes",
            "vrf":"default",
            "active":"yes"
        },
        {
            "status":"ok",
            "uptime":1550251704.0,
            "monitored":"no",
            "service":"neighmgrd",
            "lastChanged":1550251704.0969998837,
            "pid":"1986",
            "hostname":"leaf01",
            "enabled":"yes",
            "vrf":"default",
            "active":"yes"
        },
...
```

If you want to view the service information for a given device, simply
use the *hostname* variable to the command.

### View Information about a Given Service on All Devices

You can view the status of a given service at the current time, at a
prior point in time, or view the changes that have occurred for the
service during a specified timeframe.

This example shows how to view the status of the NTP service across the
network. In this case, VRF is configured so the NTP service runs on both
the default and management interface. You can perform the same command
with the other services, such as `bgpd`, `lldpd`, and `clagd`.

``` text
cumulus@switch:~$ netq show services ntp
Matching services records:
Hostname          Service              PID   VRF             Enabled Active Monitored Status           Uptime                    Last Changed
----------------- -------------------- ----- --------------- ------- ------ --------- ---------------- ------------------------- -------------------------
exit01            ntp                  8478  mgmt            yes     yes    yes       ok               1d:6h:52m:41s             Fri Feb 15 17:28:54 2019
exit02            ntp                  8497  mgmt            yes     yes    yes       ok               1d:6h:52m:36s             Fri Feb 15 17:28:59 2019
firewall01        ntp                  n/a   default         yes     yes    yes       ok               1d:6h:53m:4s              Fri Feb 15 17:28:31 2019
hostd-11          ntp                  n/a   default         yes     yes    yes       ok               1d:6h:52m:46s             Fri Feb 15 17:28:49 2019
hostd-21          ntp                  n/a   default         yes     yes    yes       ok               1d:6h:52m:37s             Fri Feb 15 17:28:58 2019
hosts-11          ntp                  n/a   default         yes     yes    yes       ok               1d:6h:52m:28s             Fri Feb 15 17:29:07 2019
hosts-13          ntp                  n/a   default         yes     yes    yes       ok               1d:6h:52m:19s             Fri Feb 15 17:29:16 2019
hosts-21          ntp                  n/a   default         yes     yes    yes       ok               1d:6h:52m:14s             Fri Feb 15 17:29:21 2019
hosts-23          ntp                  n/a   default         yes     yes    yes       ok               1d:6h:52m:4s              Fri Feb 15 17:29:31 2019
noc-pr            ntp                  2148  default         yes     yes    yes       ok               1d:6h:53m:43s             Fri Feb 15 17:27:52 2019
noc-se            ntp                  2148  default         yes     yes    yes       ok               1d:6h:53m:38s             Fri Feb 15 17:27:57 2019
spine01           ntp                  8414  mgmt            yes     yes    yes       ok               1d:6h:53m:30s             Fri Feb 15 17:28:05 2019
spine02           ntp                  8419  mgmt            yes     yes    yes       ok               1d:6h:53m:27s             Fri Feb 15 17:28:08 2019
spine03           ntp                  8443  mgmt            yes     yes    yes       ok               1d:6h:53m:22s             Fri Feb 15 17:28:13 2019
leaf01             ntp                  8765  mgmt            yes     yes    yes       ok               1d:6h:52m:52s             Fri Feb 15 17:28:43 2019
leaf02             ntp                  8737  mgmt            yes     yes    yes       ok               1d:6h:52m:46s             Fri Feb 15 17:28:49 2019
leaf11            ntp                  9305  mgmt            yes     yes    yes       ok               1d:6h:49m:22s             Fri Feb 15 17:32:13 2019
leaf12            ntp                  9339  mgmt            yes     yes    yes       ok               1d:6h:49m:9s              Fri Feb 15 17:32:26 2019
leaf21            ntp                  9367  mgmt            yes     yes    yes       ok               1d:6h:49m:5s              Fri Feb 15 17:32:30 2019
leaf22            ntp                  9403  mgmt            yes     yes    yes       ok               1d:6h:52m:57s             Fri Feb 15 17:28:38 2019
```

This example shows the status of the BGP daemon.

``` text
cumulus@switch:~$ netq show services bgpd
Matching services records:
Hostname          Service              PID   VRF             Enabled Active Monitored Status           Uptime                    Last Changed
----------------- -------------------- ----- --------------- ------- ------ --------- ---------------- ------------------------- -------------------------
exit01            bgpd                 2872  default         yes     yes    yes       ok               1d:6h:54m:37s             Fri Feb 15 17:28:24 2019
exit02            bgpd                 2867  default         yes     yes    yes       ok               1d:6h:54m:33s             Fri Feb 15 17:28:28 2019
firewall01        bgpd                 21766 default         yes     yes    yes       ok               1d:6h:54m:54s             Fri Feb 15 17:28:07 2019
spine01           bgpd                 2953  default         yes     yes    yes       ok               1d:6h:55m:27s             Fri Feb 15 17:27:34 2019
spine02           bgpd                 2948  default         yes     yes    yes       ok               1d:6h:55m:23s             Fri Feb 15 17:27:38 2019
spine03           bgpd                 2953  default         yes     yes    yes       ok               1d:6h:55m:18s             Fri Feb 15 17:27:43 2019
leaf01            bgpd                 3221  default         yes     yes    yes       ok               1d:6h:54m:48s             Fri Feb 15 17:28:13 2019
leaf02            bgpd                 3177  default         yes     yes    yes       ok               1d:6h:54m:42s             Fri Feb 15 17:28:19 2019
leaf11            bgpd                 3521  default         yes     yes    yes       ok               1d:6h:51m:18s             Fri Feb 15 17:31:43 2019
leaf12            bgpd                 3527  default         yes     yes    yes       ok               1d:6h:51m:6s              Fri Feb 15 17:31:55 2019
leaf21            bgpd                 3512  default         yes     yes    yes       ok               1d:6h:51m:1s              Fri Feb 15 17:32:00 2019
leaf22            bgpd                 3536  default         yes     yes    yes       ok               1d:6h:54m:54s             Fri Feb 15 17:28:07 2019
```

### View Events Related to a Given Service

To view changes over a given time period, use the `netq` `show events`
command. For more detailed information about events, refer to [Monitor
Alarm Events](Monitor_Alarm_Events) and [Monitor Informational
Events](Monitor_Informational_Events).

In this example, we want to view changes to the bgpd service in the last
48 hours.

``` text
cumulus@switch:/$ netq show events type bgp between now and 48h
Matching events records:
Hostname          Message Type Severity Message                             Timestamp
----------------- ------------ -------- ----------------------------------- -------------------------
leaf01            bgp          info     BGP session with peer spine-1 swp3. 1d:6h:55m:37s
                                        3 vrf DataVrf1081 state changed fro
                                        m failed to Established
leaf01            bgp          info     BGP session with peer spine-2 swp4. 1d:6h:55m:37s
                                        3 vrf DataVrf1081 state changed fro
                                        m failed to Established
leaf01            bgp          info     BGP session with peer spine-3 swp5. 1d:6h:55m:37s
                                        3 vrf DataVrf1081 state changed fro
                                        m failed to Established
leaf01            bgp          info     BGP session with peer spine-1 swp3. 1d:6h:55m:37s
                                        2 vrf DataVrf1080 state changed fro
                                        m failed to Established
leaf01            bgp          info     BGP session with peer spine-3 swp5. 1d:6h:55m:37s
                                        2 vrf DataVrf1080 state changed fro
                                        m failed to Established
leaf01            bgp          info     BGP session with peer spine-2 swp4. 1d:6h:55m:37s
                                        2 vrf DataVrf1080 state changed fro
                                        m failed to Established
leaf01            bgp          info     BGP session with peer spine-3 swp5. 1d:6h:55m:37s
                                        4 vrf DataVrf1082 state changed fro
                                        m failed to Established
```

  
  

 
