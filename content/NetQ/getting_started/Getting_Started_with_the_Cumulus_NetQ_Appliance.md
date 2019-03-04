# Getting Started with the Cumulus NetQ Appliance

The Cumulus NetQ appliance provides a complete monitoring solution for
your network; the server comes preloaded with a Cumulus Linux image that
includes Cumulus NetQ services, a Cumulus Linux license and certified
cables and optics.

This guide helps you get your Cumulus NetQ appliance up and running in a
few minutes.

## Contents

-   [What's in the
    Box?](#GettingStartedwiththeCumulusNetQAppliance-What'sintheBox?)
-   [Installing and Configuring the
    Appliance](#GettingStartedwiththeCumulusNetQAppliance-InstallingandConfiguringtheAppliance)
    -   [Configuring the Password, Hostname and IP
        Address](#GettingStartedwiththeCumulusNetQAppliance-ConfiguringthePassword,HostnameandIPAddress)
    -   [Reviewing and Committing Your
        Changes](#GettingStartedwiththeCumulusNetQAppliance-ReviewingandCommittingYourChanges)
    -   [Backing Up Your
        Appliance](#GettingStartedwiththeCumulusNetQAppliance-BackingUpYourAppliance)
    -   [Default
        Configuration](#GettingStartedwiththeCumulusNetQAppliance-DefaultConfiguration)
-   [Learning
    More](#GettingStartedwiththeCumulusNetQAppliance-LearningMore)
-   [Getting
    Support](#GettingStartedwiththeCumulusNetQAppliance-GettingSupport)

## What's in the Box?

Inside the box that was shipped to you, you'll find:

-   Your Cumulus NetQ appliance (a Supermicro 6019P-WTR server) with the
    Cumulus Linux OS, Cumulus NetQ services and license already
    installed
-   Hardware accessories, such as power cables and rack mounting gear
    (note that network cables and optics ship separately)
-   Information regarding your order

If you're looking for hardware specifications (including LED layouts and
FRUs like the power supply or fans and accessories like included cables)
or safety and environmental information, check out the [user
manual](https://www.supermicro.com/manuals/superserver/1U/MNL-1943.pdf) and [quick
reference
guide](https://www.supermicro.com/QuickRefs/superserver/1U/QRG-1943.pdf). 

## Installing and Configuring the Appliance

 After you unbox the appliance, mount it in the rack and connect it to
power, following the procedures described in your appliance's [user
manual](https://www.supermicro.com/manuals/superserver/1U/MNL-1943.pdf).
Connect the Ethernet cable to the 1G management port, then power on the
appliance.

![](https://d3loy27ma76s9q.cloudfront.net/images/CN-NetQ-ServerPorts-label.width-800.png){.richtext-image
.full-width width="800" height="130"}

If your network runs DHCP, you can configure Cumulus NetQ and Cumulus
Linux over the network. If DHCP isn't enabled, then you configure the
appliance using the console cable provided.

When you power on the appliance, you must log in using the default login
credentials:

-   Username: *cumulus*
-   Password: *CumulusLinux!*

### Configuring the Password, Hostname and IP Address

You should change your password for the cumulus account soon after you
log in using the `passwd` command.

``` text
cumulus@netq-appliance:~$ passwd
```

The appliance's default hostname is *cumulus*. You can quickly change it
using the Cumulus Linux Network Command Line Utility (NCLU):

``` text
cumulus@netq-appliance:~$ net add hostname NEW_HOSTNAME
```

The appliance contains at least one dedicated Ethernet management port,
named eth0, for out-of-band management. By default, eth0 uses DHCPv4 to
get its IP address. However, you can set a static IP address using NCLU:

``` text
cumulus@netq-appliance:~$ net add interface eth0 address 192.0.2.42/24
```

This is the IP address you use when configuring the [NetQ
Agent](https://docs.cumulusnetworks.com/display/NETQ/Install+NetQ#InstallNetQ-SetUptheNetQAgents) on
the nodes in your network
with `netq config add agent server <IP address>`.

### Reviewing and Committing Your Changes

After you finish these configuration steps, review your changes before
they go live:

``` text
cumulus@netq-appliance:~$ net pending
```

If you're satisfied with the changes, commit them in Cumulus Linux:

``` text
cumulus@netq-appliance:~$ net commit
```

### Backing Up Your Appliance

When you commit any configuration changes using NCLU, Cumulus Linux
takes two snapshots of the current state of the operating system: one
right before the commit, and one right after.

This provides you with the ability to roll back to the earlier
configuration in case you need to revert your changes.

However, you can also take snapshots as needed using
the `snapper` utility:

``` text
cumulus@netq-appliance:~$ sudo snapper create -d SNAPSHOT_NAME 
```

More information about snapshots is available in the [Cumulus Linux user
guide](https://docs.cumulusnetworks.com/display/DOCS/Using+Snapshots).

### Default Configuration

The Cumulus NetQ appliance ships with the following default
configuration in the `/etc/network/interfaces` file:

``` text
cumulus@netq-appliance:~$ cat /etc/network/interfaces

# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*.intf

# Management VRF
auto mgmt
iface mgmt
    address 127.0.0.1/8
    vrf-table auto

# The loopback network interface
auto lo
iface lo inet loopback
    address 127.0.0.1/32

# The primary network interface
auto eth0
iface eth0 inet dhcp
    vrf mgmt
```

## Learning More

These steps should help you get started with your appliance. For more
information about NetQ, read the NetQ user guide.

In addition, Cumulus Linux has a wealth of features designed to help you
bring web-scale networking to your data center. For more information,
read the [Cumulus Linux user
guide](https://docs.cumulusnetworks.com/display/DOCS).

## Getting Support

If you run into an issue with the appliance or with Cumulus Linux, try
looking for a solution in our [knowledge
base](https://support.cumulusnetworks.com/hc/en-us). If you don't find
the answer you're looking for, please [submit a support
request](https://support.cumulusnetworks.com/hc/en-us/requests/new).
Your account ID is on your [profile
page](https://cumulusnetworks.com/profile/). Your order information is
on file, and, if needed, your license key is available in the email
address sent when your order was processed.
