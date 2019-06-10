---
title: Facebook Voyager Optical Interfaces
author: Unknown
weight: 99
pageID: 8363049
aliases:
 - /old/Cumulus_Linux/Facebook_Voyager_Optical_Interfaces.html
imgData: Cumulus_Linux
siteSlug: Cumulus_Linux
---
Facebook Voyager is a Broadcom Tomahawk-based switch with added Dense
Wave Division Multiplexing (DWDM) ports that can connect to another
switch thousands of kilometers away by adding transponders. DWDM allows
many separate connections on one fiber pair by sending them over
different wavelengths. Although the wavelengths are sent on the same
physical fiber, they do not interact with each other, similar to VLANs
on a trunk. Each wavelength can transport very high speeds over very
long distances.

## The Voyager Platform

The Voyager platform has 16 ports on the front of the switch:

  - Twelve **QSFP28 ethernet ports** labeled 1 thru 12. These are
    standard 100G ports that you configure like ports on other platforms
    with a Tomahawk ASIC. The `ports.conf` file defines the breakout
    configuration and the `/etc/network/interfaces` file defines the
    other port parameters. When not broken out they are named swp1 thru
    swp12.

  - Four **duplex LC ports** labeled L1 thru L4. L1 and L2 connect to
    AC400 module 2. L3 and L4 connect to AC400 module 1. Each AC400
    module connects to four Tomahawk ASIC ports.

{{%imgOld 0 %}}

The `fc` designations on the Tomahawk stand for Falcon Core. Each AC400
module has four 100G interfaces connected to the Tomahawk and two
interfaces connected to the front of the box.

### Inside the AC400

The way in which the client ports are mapped to the network ports in an
AC400 depends on the modulation format and coupling mode. Cumulus Linux
supports five different modulation and coupling mode options on each
AC400 module.

| Network 0 Modulation | Network 1 Modulation | Independent/Coupled |
| -------------------- | -------------------- | ------------------- |
| QPSK                 | QPSK                 | Independent         |
| 16-QAM               | 16-QAM               | Independent         |
| QPSK                 | 16-QAM               | Independent         |
| 16-QAM               | QPSK                 | Independent         |
| 8-QAM                | 8-QAM                | Coupled             |

QPSK—[Quadrature phase shift
keying](https://www.allaboutcircuits.com/technical-articles/quadrature-phase-shift-keying-qpsk-modulation/).
When a network interface is using QPSK modulation, it carries 100Gbps
and is therefore connected to only one client interface.

16-QAM—[Quadrature amplitude
modulation](https://en.wikipedia.org/wiki/Quadrature_amplitude_modulation)
with 4 bits per symbol. When a network interface is using 16-QAM
modulation, it carries 200Gbps and is therefore connected to two client
interfaces. Each of the two client interfaces carried on a network
interface is called a tributary. The AC400 adds extra information so
that these tributaries can be sorted out at the far end and delivered to
the appropriate client interface.

8-QAM—[Quadrature amplitude
modulation](https://en.wikipedia.org/wiki/Quadrature_amplitude_modulation)
with 3 bits per symbol. When a network interface is using 8-QAM
modulation, it carries 150Gbps. In this case, the two network interfaces
in an AC400 module must be coupled, so that the total bandwidth carried
by the two interfaces is 300Gbps. Three client interfaces are used with
this modulation format. However, unlike other modulation formats that
use independent mode, the coupled mode means that data from each client
interface is carried on both of the network interfaces.

### Client to Network Connection

For each of the five supported modulation configurations, the client
interface to network interface connections are as follows:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p>{{%imgOld 1 %}}</p></td>
<td><p>In this configuration, two client interfaces, 0 and 2, are mapped to the two network interfaces. Client interfaces 1 and 3 are not used.</p></td>
</tr>
<tr class="even">
<td><p>{{%imgOld 2 %}}</p></td>
<td><p>In this configuration, two client interfaces are mapped to each network interface. Each network interface, therefore, has two tributaries.</p></td>
</tr>
<tr class="odd">
<td><p>{{%imgOld 3 %}}</p>
<p>{{%imgOld 4 %}}</p></td>
<td><p>These configurations are combinations of the previous two.</p>
<p>The network interface configured for QPSK connects to one client interface and the network interface configured for 16-QAM connects to two client interfaces.</p></td>
</tr>
<tr class="even">
<td><p>{{%imgOld 5 %}}</p></td>
<td><p>This configuration uses three client interfaces, for a total of 300Gbps; 150Gbps on each network interface. Because the network interfaces are coupled, they cannot be connected to different far-end systems. Each network interface carries three tributaries.</p></td>
</tr>
</tbody>
</table>

## Configure the Voyager Ports

To configure the five modulation and coupling configurations described
above, edit the `/etc/cumulus/ports.conf` file. The ports do not exist
until you configure them.

The file has lines for the 12 QSPF28 ports. The four DWDM Line ports are
labeled labeled **L1** thru **L4**. To program the AC400 modulation and
coupling into the five configurations, configure these ports as follows:

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th><p>ports.conf</p></th>
<th><p>L1 Modulation</p></th>
<th><p>L2 Modulation</p></th>
<th><p>Independent/Coupled</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>L1=1x<br />
L2=1x</p></td>
<td><p>QPSK</p></td>
<td><p>QPSK</p></td>
<td><p>Independent</p></td>
</tr>
<tr class="even">
<td><p>L1=1x<br />
L2=2x</p></td>
<td><p>QPSK</p></td>
<td><p>16-QAM</p></td>
<td><p>Independent</p></td>
</tr>
<tr class="odd">
<td><p>L1=2x<br />
L2=1x</p></td>
<td><p>16-QAM</p></td>
<td><p>QPSK</p></td>
<td><p>Independent</p></td>
</tr>
<tr class="even">
<td><p>L1=2x<br />
L2=2x</p></td>
<td><p>16-QAM</p></td>
<td><p>16-QAM</p></td>
<td><p>Independent</p></td>
</tr>
<tr class="odd">
<td><p>L1=3/2<br />
L2=3/2</p></td>
<td><p>8-QAM</p></td>
<td><p>8-QAM</p></td>
<td><p>Coupled</p></td>
</tr>
</tbody>
</table>

The following example `/etc/cumulus/ports.conf` file shows configuration
for all of the modes.

``` 
                   
1=1x    # Creates swp1
2=2x    # Creates swp2s0 and swp2s1
3=4x    # Creates four 25G ports: swp3s0, swp3s1, swp3s2, and swp3s3
4=1x40G # Creates swp4
5=4x10G # Creates four 10G ports: swp5s0, swp5s1, swp5s2, and swp5s3
6=1x
7=1x
8=1x
9=1x
10=1x
11=1x
12=1x
L1=2x   # Creates swpL1s0 and swpL1s1
L2=1x   # Creates swpL2
L3=3/2  # Creates swpL3s0, swpL3s1, and swpL3s2
L4=3/2  # Creates no "swpL4" ports since L4 is ganged with L3
   
    
```
