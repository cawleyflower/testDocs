---
title: Installing a New Cumulus Linux Image
author: Unknown
weight: 43
pageID: 8362138
product: Cumulus Linux
version: '3.6'
aliases:
 - /display/undefined/Installing+a_New_Cumulus_Linux_Image
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
Before you install Cumulus Linux, the switch can be in two different
states:

  - No image is installed on the switch (the switch is only running
    [ONIE](http://www.onie.org/)) or you need to perform a clean
    installation. In this case, you can install Cumulus Linux in one of
    the following ways, using:
    
      - [DHCP/a web server with DHCP
        options](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Installation_Management/Installing_a_New_Cumulus_Linux_Image/)
    
      - [DHCP/a web server without DHCP
        options](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Installation_Management/Installing_a_New_Cumulus_Linux_Image/)
    
      - [A web server with no
        DHCP](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Installation_Management/Installing_a_New_Cumulus_Linux_Image/)
    
      - [FTP or TFTP without a web
        server](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Installation_Management/Installing_a_New_Cumulus_Linux_Image/)
    
      - [Local file
        installation](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Installation_Management/Installing_a_New_Cumulus_Linux_Image/)
    
      - [USB](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Installation_Management/Installing_a_New_Cumulus_Linux_Image/)

  - Cumulus Linux is already installed on the switch; you only need to
    perform an
    [upgrade](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Installation_Management/Installing_a_New_Cumulus_Linux_Image/).

{{%notice tip%}}

[ONIE](http://www.onie.org/) is an open source project (equivalent to
PXE on servers) that enables the installation of network operating
systems (NOS) on bare metal switches.

{{%/notice%}}

## Understanding Examples in This Chapter

The sections in this chapter are ordered from the most repeatable to the
least repeatable methods. For example, DHCP can scale to hundreds of
switch installs with zero manual input, compared to USB installs.
Installing with a USB is fine for a single switch here and there but is
not scalable.

  - You can name your Cumulus Linux installer binary using any of the
    [ONIE naming schemes mentioned
    here](http://opencomputeproject.github.io/onie/design-spec/discovery.html#default-file-name-search-order).

  - In the examples below, \[PLATFORM\] can be any supported Cumulus
    Linux platform, such as *x86\_64*, or *arm*.

## Installing through a DHCP/Web Server with DHCP Options

Installing Cumulus Linux in this way is as simple as setting up a
DHCP/web server on your laptop and connecting the eth0 management port
of the switch to your laptop.

After you connect the cable, the installation proceeds as follows:

1.  The bare metal switch boots up and requests an IP address (DHCP
    request).

2.  The DHCP server acknowledges and responds with DHCP option 114 and
    the location of the installation image.

3.  ONIE downloads the Cumulus Linux binary, installs, and reboots.

4.  Success\! You are now running Cumulus Linux.
    
    {{\< imgOld 0 \>}}

{{%notice note%}}

The most common method is to send DHCP option 114 with the entire URL to
the web server (this can be the same system). However, there are many
other ways to use DHCP even if you do not have full control over DHCP.
[See the ONIE user
guide](https://opencomputeproject.github.io/onie/design-spec/discovery.html#partial-installer-urls)
for help.

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

## Installing Through a DHCP/Web Server Without DHCP Options

If you have a laptop on the same network and the switch can pull DHCP
from the corporate network, but you cannot modify DHCP options (maybe it
is controlled by another team), do the following:

1.  Place the Cumulus Linux binary in a directory on the web server.

2.  Run the installer manually, (because DHCP options cannot be
    modified), either from ONIE or the Cumulus Linux command prompt.
    
      - From ONIE, run the `onie-nos-install` command:
        
        ``` 
                           
        ONIE:/ #onie-nos-install http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin
           
            
        ```
    
      - From Cumulus Linux, run the `onie-install` command:
        
        ``` 
                           
        cumulus@switch:~$ sudo onie-install -a -i http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin && sudo reboot
           
            
        ```

## Installing Through a Web Server with no DHCP

If your laptop is on the same network as the switch eth0 interface but
no DHCP server is available, you can still install directly from Cumulus
Linux or using ONIE.

### Installing from Cumulus Linux

From Cumulus Linux, run the `onie-install` command:

``` 
                   
cumulus@switch:~$ sudo onie-install -a -i http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin && sudo reboot
   
    
```

### Installing from ONIE

Follow these steps to run the install using ONIE. Note that ONIE is in
[*discovery
mode*](http://opencomputeproject.github.io/onie/design-spec/discovery.html#installer-discovery-methods):

1.  To disable discovery mode, run:
    
    ``` 
                       
    onie# onie-discovery-stop
       
        
    ```
    
    or, on older ONIE versions if that command is not supported:
    
    ``` 
                       
    onie# /etc/init.d/discover.sh stop
       
        
    ```

2.  Assign a static address to eth0 using ONIE (using `ip addr add`):
    
    ``` 
                       
    ONIE:/ #ip addr add 10.0.1.252/24 dev eth0
       
        
    ```

3.  Place the Cumulus Linux installer image in a directory on your web
    server.

4.  Run the installer manually (because there are no DHCP options):
    
    ``` 
                       
    ONIE:/ #onie-nos-install http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin
       
        
    ```

## Installing Through FTP Without a Web Server

If your laptop is on the same network as the switch eth0 interface but
no DHCP server is available, you can install directly from Cumulus Linux
or using ONIE.

### Installing from Cumulus Linux

If you are not using DHCP options, run one of the following commands
(`ftp` for FTP) from the Cumulus Linux command prompt:

``` 
                   
cumulus@switch:~$ sudo onie-install -a -i ftp://local-ftp-server/cumulus-install-[PLATFORM].bin && sudo reboot
   
    
```

### Installing from ONIE

To install without DHCP options using ONIE, do the following:

1.  Set up DHCP or static addressing for eth0, as in the examples above.

2.  If you are using static addressing, disable ONIE discovery mode.

3.  Place the Cumulus Linux installer image into a TFTP or FTP
    directory.

4.  If you are not using DHCP options, run one of the following commands
    (`tftp` for TFTP or `ftp` for FTP):
    
    ``` 
                       
    ONIE# onie-nos-install ftp://local-ftp-server/cumulus-install-[PLATFORM].bin
     
    ONIE# onie-nos-install tftp://local-tftp-server/cumulus-install-[PLATFORM].bin
       
        
    ```

## Installing through a Local File

You can install referencing a local file, directly from Cumulus Linux,
or using ONIE.

### Installing from Cumulus Linux

From Cumulus Linux, run the `onie-install` command:

``` 
                   
cumulus@switch:~$ sudo onie-install -a -i /path/to/local/file/cumulus-install-[PLATFORM].bin && sudo reboot
   
    
```

### Installing from ONIE

1.  Set up DHCP or static addressing for eth0, as in the examples above.

2.  If you are using static addressing, disable ONIE discovery mode.

3.  Use [scp](http://en.wikipedia.org/wiki/Secure_copy) to copy the
    Cumulus Linux binary to the switch.
    
    {{%notice tip%}}
    
    Windows users can use [WinScp](http://winscp.net/eng/index.php).
    
    {{%/notice%}}

4.  Run the installer manually from ONIE:
    
    ``` 
                       
    ONIE:/ #onie-nos-install /path/to/local/file/cumulus-install-[PLATFORM].bin
       
        
    ```

## Installing a New Image When Cumulus Linux Is Already Installed

At times, it is necessary to put the switch into ONIE to do an install.
This might be required when moving between major releases or
re-installing from an early version of 3.y.z. For more information, see
[Upgrading Cumulus
Linux](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Installation_Management/Installing_a_New_Cumulus_Linux_Image/).

### Entering ONIE Mode from Cumulus Linux

If Cumulus Linux is already installed on the switch, you can enter ONIE
mode in one of two ways:

  - Use ONIE Recovery Mode to install an image from the ONIE prompt
    manually:
    
    ``` 
                       
    cumulus@switch:~$ sudo onie-select -r
    cumulus@switch:~$ sudo reboot
       
        
    ```

  - Use ONIE Install Mode to discover the image from a DHCP server
    automatically:
    
    ``` 
                       
    cumulus@switch:~$ sudo onie-select -i
    cumulus@switch:~$ sudo reboot
       
        
    ```
