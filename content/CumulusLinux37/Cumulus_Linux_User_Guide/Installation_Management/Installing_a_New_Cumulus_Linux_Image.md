---
title: Installing a New Cumulus Linux Image
author: Unknown
weight: 43
pageID: 8362643
aliases:
 - /old/Installing_a_New_Cumulus_Linux_Image.html
---
# Installing a New Cumulus Linux Image

This topic discusses how to install a new Cumulus Linux disk image using
[ONIE](http://www.onie.org/), an open source project (equivalent to PXE
on servers) that enables the installation of network operating systems
(NOS) on bare metal switches.

Before you install Cumulus Linux, the switch can be in two different
states:

  - No image is installed on the switch (the switch is only running
    ONIE).

  - Cumulus Linux is already installed on the switch but you want to use
    ONIE to reinstall Cumulus Linux or upgrade to a newer version.

The sections below describe some of the different ways you can install
the Cumulus Linux disk image, such as using a DHCP/web server, FTP, a
local file, or a USB drive. Steps are provided for both installing
directly from ONIE (if no image is installed on the switch) and from
Cumulus Linux (if the image is already installed on the switch), where
applicable. For additional methods to find and install the Cumulus Linux
image, see the [ONIE Design
Specification](http://opencomputeproject.github.io/onie/design-spec/discovery.html).

You can download a Cumulus Linux image from the [Cumulus Networks
Downloads page](http://cumulusnetworks.com/downloads/).

{{%notice note%}}

Installing the Cumulus Linux disk image is destructive; configuration
files on the switch are not saved; copy them to a different server
before installing.

{{%/notice%}}

## Install Using a DHCP/Web Server with DHCP Options

To install Cumulus Linux using a DHCP/web server *with* DHCP options,
set up a DHCP/web server on your laptop and connect the eth0 management
port of the switch to your laptop. After you connect the cable, the
installation proceeds as follows:

1.  The bare metal switch boots up and requests an IP address (DHCP
    request).

2.  The DHCP server acknowledges and responds with DHCP option 114 and
    the location of the installation image.

3.  ONIE downloads the Cumulus Linux disk image, installs, and reboots.

4.  Success\! You are now running Cumulus
    Linux.
    
    ![/images/download/attachments/8362643/onie\_install\_dhcp.png](/images/download/attachments/8362643/onie_install_dhcp.png)

{{%notice note%}}

The most common method is to send DHCP option 114 with the entire URL to
the web server (this can be the same system). However, there are many
other ways to use DHCP even if you do not have full control over DHCP.
See the ONIE user guide for help with [partial installer
URLs](https://opencomputeproject.github.io/onie/design-spec/discovery.html#partial-installer-urls)
and [advanced DHCP
options](https://opencomputeproject.github.io/onie/user-guide/index.html#advanced-dhcp-2-vivso);
both articles list more supported DHCP options.

{{%/notice%}}

Here is an example DHCP configuration with an [ISC DHCP
server](http://www.isc.org/downloads/dhcp/):

``` 
                   
subnet 172.0.24.0 netmask 255.255.255.0 {
  range 172.0.24.20 172.0.24.200;
  option default-url = "http://172.0.24.14/onie-installer-[PLATFORM]";
}
   
    
```

Here is an example DHCP configuration with
[dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) (static address
assignment):

``` 
                   
dhcp-host=sw4,192.168.100.14,6c:64:1a:00:03:ba,set:sw4
dhcp-option=tag:sw4,114,"http://roz.rtplab.test/onie-installer-[PLATFORM]"
   
    
```

If you do not have a web server, you can use [this free Apache
example](https://www.apachefriends.org/index.html).

## Related Information

  - [ONIE Design
    Specification](http://opencomputeproject.github.io/onie/design-spec/)

  - [Cumulus Networks Downloads
    page](http://cumulusnetworks.com/downloads/)

  - [Cumulus on a
    Stick](https://cumulusnetworks.com/cumulus-on-a-stick/)

  - [Managing Cumulus Linux Disk
    Images](/old/Managing_Cumulus_Linux_Disk_Images.html)
