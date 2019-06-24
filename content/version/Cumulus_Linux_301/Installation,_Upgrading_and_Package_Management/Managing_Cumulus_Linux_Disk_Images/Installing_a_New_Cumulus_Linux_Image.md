---
title: Installing a New Cumulus Linux Image
author: Cumulus Networks
weight: 203
aliases:
 - /display/CL30/Installing+a_New_Cumulus_Linux_Image
 - /pages/viewpage.action?pageId=0
slug: >-
 /Cumulus_Linux_301//Installation,_Upgrading_and_Package_Management/Managing_Cumulus_Linux_Disk_Images
pageID: 5118265
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
Before you install Cumulus Linux, the switch can be in two different
states:

  - The switch has no image on it (so the switch is only running
    [ONIE](http://www.onie.org/)) or you desire or require a clean
    installation. In this case, you can install Cumulus Linux in one of
    the following ways, using:
    
      - [DHCP/a Web server with DHCP
        options](/#src-5118265_InstallingaNewCumulusLinuxImage-dhcp_options)
    
      - [DHCP/a Web server without DHCP
        options](/#src-5118265_InstallingaNewCumulusLinuxImage-dhcp_noopts)
    
      - [A Web server with no
        DHCP](/#src-5118265_InstallingaNewCumulusLinuxImage-web_nodhcp)
    
      - [FTP or TFTP without a Web
        server](/#src-5118265_InstallingaNewCumulusLinuxImage-ftp)
    
      - [Local file
        installation](/#src-5118265_InstallingaNewCumulusLinuxImage-local)
    
      - [USB](/#src-5118265_InstallingaNewCumulusLinuxImage-usb)

  - The switch already has Cumulus Linux installed on it, so you only
    need to [upgrade it](/Upgrading_Cumulus_Linux.html)

{{%notice tip%}}

[ONIE](http://www.onie.org/) is an open source project, equivalent to
PXE on servers, that enables the installation of network operating
systems (NOS) on bare metal switches.

{{%/notice%}}

## Understanding these Examples

The sections in this chapter are ordered from the most repeatable to the
least repeatable methods. For instance, DHCP can scale to hundreds of
switch installs with zero manual input, compared to something like USB
installs. Installing via USB is fine for a single switch here and there
but is not scalable.

  - You can name your Cumulus Linux installer binary using any of the
    [ONIE naming schemes mentioned
    here](http://opencomputeproject.github.io/onie/design-spec/discovery.html#default-file-name-search-order).

  - In the examples below, \[PLATFORM\] can be any supported Cumulus
    Linux platform, such as *x86\_64*, or *arm*.

## Installing via a DHCP/Web Server Method with DHCP Options

Installing Cumulus Linux in this manner is as simple as setting up a
DHCP/Web server on your laptop and connecting the eth0 management port
of the switch to your laptop.

Once you connect the cable, the installation proceeds as follows:

1.  The bare metal switch boots up and asks for an address (DHCP
    request).

2.  The DHCP server acknowledges and responds with DHCP option 114 and
    the location of the installation image.

3.  ONIE downloads the Cumulus Linux binary, installs and reboots.

4.  Success\! You are now running Cumulus Linux.
    
    {{\< imgOld 0 \>}}

{{%notice note%}}

The most common method is for you to send DHCP option 114 with the
entire URL to the Web server (this could be the same system). However,
there are many other ways to use DHCP even if you don't have full
control over DHCP. [See the ONIE user
guide](https://opencomputeproject.github.io/onie/design-spec/discovery.html#partial-installer-urls)
for help.

{{%/notice%}}

Here's an example DHCP configuration with an [ISC DHCP
server](http://www.isc.org/downloads/dhcp/):

    subnet 172.0.24.0 netmask 255.255.255.0 {
      range 172.0.24.20 172.0.24.200;
      option www-server = "http://172.0.24.14/onie-installer-[PLATFORM]";
    }

Here's an example DHCP configuration with
[dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) (static address
assignment):

    dhcp-host=sw4,192.168.100.14,6c:64:1a:00:03:ba,set:sw4
    dhcp-option=tag:sw4,114,"http://roz.rtplab.test/onie-installer-[PLATFORM]"

Don't have a Web server? There is a [free Apache
example](https://www.apachefriends.org/index.html) you can utilize.

## Installing via a DHCP/Web Server Method without DHCP Options

If you have a laptop on same network and the switch can pull DHCP from
the corporate network, but you cannot modify DHCP options (maybe it's
controlled by another team), do the following:

1.  Place the Cumulus Linux binary in a directory on the Web server.

2.  Run the `onie-nos-install` command manually, since DHCP options
    can't be modified:
    
        ONIE:/ #onie-nos-install http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin

## Installing via a Web Server with no DHCP

Use the following method if your laptop is on the same network as the
switch eth0 interface but no DHCP server is available.

One thing to note is ONIE is in [*discovery
mode*](http://opencomputeproject.github.io/onie/design-spec/discovery.html#installer-discovery-methods),
so if you are setting a static IPv4 address for the eth0 management
port, you need to disable discovery mode or else ONIE may get confused.

1.  To disable discovery mode, run:
    
        onie# onie-discovery-stop 
    
    or, on older ONIE versions if that command isn't supported:
    
        onie# /etc/init.d/discover.sh stop 

2.  Assign a static address to eth0 via ONIE (using `ip addr add`):
    
        ONIE:/ #ip addr add 10.0.1.252/24 dev eth0

3.  Place the Cumulus Linux installer image in a directory on your Web
    server.

4.  Run the `onie-nos-install` command manually since there are no DHCP
    options:
    
        ONIE:/ #onie-nos-install http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin

## Installing via FTP or TFTP without a Web Server

1.  Set up DHCP or static addressing for eth0, as in the examples above.

2.  If you are utilizing static addressing, disable ONIE discovery mode.

3.  Place the Cumulus Linux installer image into a TFTP or FTP
    directory.

4.  If you are not utilizing DHCP options, run one of the following
    commands (`tftp` for TFTP or `ftp` for FTP):
    
        ONIE# onie-nos-install ftp://local-ftp-server/cumulus-install-[PLATFORM].bin
        
        ONIE# onie-nos-install tftp://local-tftp-server/cumulus-install-[PLATFORM].bin

## Installing via a Local File

1.  Set up DHCP or static addressing for eth0, as in the examples above.

2.  If you are utilizing static addressing, disable ONIE discovery mode.

3.  Use [scp](http://en.wikipedia.org/wiki/Secure_copy) to copy the
    Cumulus Linux binary to the switch.
    
    {{%notice tip%}}
    
    Windows users can use [WinScp](http://winscp.net/eng/index.php).
    
    {{%/notice%}}

4.  Run the following command:
    
        ONIE# onie-nos-install /path/to/local/file/cumulus-install-[PLATFORM].bin

## Installing a New Image when Cumulus Linux Is already Installed

Follow these upgrade steps for both major and minor releases, where:

  - A major release upgrade is 2.X.X to 3.X.X (e.g. 1.5.1 to 2.5.0)

  - A minor release upgrade is X.2.X to X.3.X (e.g. 2.2.0 to 2.5.5)

For more information, see [Upgrading Cumulus
Linux](/Upgrading_Cumulus_Linux.html#src-5118269_UpgradingCumulusLinux-binary_upgrade).
