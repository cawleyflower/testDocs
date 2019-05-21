---
title: Installing a New Cumulus Linux Image
author: Unknown
weight: 43
pageID: 8357423
aliases:
 - /old/Cumulus_Linux_35/Installing_a_New_Cumulus_Linux_Image.html
imgData: Cumulus_Linux_35
---
# Installing a New Cumulus Linux Image

Before you install Cumulus Linux, the switch can be in two different
states:

  - The switch has no image on it (so the switch is only running
    [ONIE](http://www.onie.org/)) or you desire or require a clean
    installation. In this case, you can install Cumulus Linux in one of
    the following ways, using:
    
      - [DHCP/a web server with DHCP
        options](/old/Cumulus_Linux_35/#src-8357423_InstallingaNewCumulusLinuxImage-dhcp_options)
    
      - [DHCP/a web server without DHCP
        options](/old/Cumulus_Linux_35/#src-8357423_InstallingaNewCumulusLinuxImage-dhcp_noopts)
    
      - [A web server with no
        DHCP](/old/Cumulus_Linux_35/#src-8357423_InstallingaNewCumulusLinuxImage-web_nodhcp)
    
      - [FTP or TFTP without a web
        server](/old/Cumulus_Linux_35/#src-8357423_InstallingaNewCumulusLinuxImage-ftp)
    
      - [Local file
        installation](/old/Cumulus_Linux_35/#src-8357423_InstallingaNewCumulusLinuxImage-local)
    
      - [USB](/old/Cumulus_Linux_35/#src-8357423_InstallingaNewCumulusLinuxImage-usb)

  - The switch already has Cumulus Linux installed on it, so you only
    need to [upgrade
    it](/old/Cumulus_Linux_35/Upgrading_Cumulus_Linux.html).

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
    here](http://opencomputeproject.github.io/onie/docs/design-spec/discovery.html#default-file-name-search-order).

  - In the examples below, \[PLATFORM\] can be any supported Cumulus
    Linux platform, such as *x86\_64*, or *arm*.

## Installing via a DHCP/Web Server Method with DHCP Options

Installing Cumulus Linux in this manner is as simple as setting up a
DHCP/web server on your laptop and connecting the eth0 management port
of the switch to your laptop.

Once you connect the cable, the installation proceeds as follows:

1.  The bare metal switch boots up and asks for an address (DHCP
    request).

2.  The DHCP server acknowledges and responds with DHCP option 114 and
    the location of the installation image.

3.  ONIE downloads the Cumulus Linux binary, installs and reboots.

4.  Success\! You are now running Cumulus Linux.
    
    {{%imgOld 0 %}}

{{%notice note%}}

The most common method is for you to send DHCP option 114 with the
entire URL to the web server (this could be the same system). However,
there are many other ways to use DHCP even if you don't have full
control over DHCP. [See the ONIE user
guide](https://github.com/opencomputeproject/onie/wiki/Design-Spec-SW-Image-Discovery#partial-installer-urls)
for help.

{{%/notice%}}

Here's an example DHCP configuration with an [ISC DHCP
server](http://www.isc.org/downloads/dhcp/):

``` 
                   
subnet 172.0.24.0 netmask 255.255.255.0 {
  range 172.0.24.20 172.0.24.200;
  option default-url = "http://172.0.24.14/onie-installer-[PLATFORM]";
}
   
    
```

Here's an example DHCP configuration with
[dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) (static address
assignment):

``` 
                   
dhcp-host=sw4,192.168.100.14,6c:64:1a:00:03:ba,set:sw4
dhcp-option=tag:sw4,114,"http://roz.rtplab.test/onie-installer-[PLATFORM]"
   
    
```

If you don't have a web server, you can use [this free Apache
example](https://www.apachefriends.org/index.html).

## Installing via a DHCP/Web Server Method without DHCP Options

If you have a laptop on the same network and the switch can pull DHCP
from the corporate network, but you cannot modify DHCP options (maybe
it's controlled by another team), do the following:

1.  Place the Cumulus Linux binary in a directory on the web server.

2.  Run the installer manually, since DHCP options can't be modified,
    either from ONIE or the Cumulus Linux command prompt.
    
      - From ONIE, run the `onie-nos-install` command:
        
        ``` 
                           
        ONIE:/ #onie-nos-install http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin
           
            
        ```
    
      - From Cumulus Linux, run the `onie-install` command:
        
        ``` 
                           
        cumulus@switch:~$ sudo onie-install -a -i http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin && sudo reboot
           
            
        ```

## Installing via a Web Server with no DHCP

If your laptop is on the same network as the switch eth0 interface but
no DHCP server is available, you can still install directly from Cumulus
Linux or using ONIE.

### Installing from Cumulus Linux

From Cumulus Linux, run the `onie-install` command:

``` 
                   
cumulus@switch:~$ sudo onie-install -a -i http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin && sudo reboot
   
    
```

### Installing from ONIE

Do the following steps to run the install using ONIE. Note that ONIE is
in [*discovery
mode*](http://opencomputeproject.github.io/onie/design-spec/discovery.html#installer-discovery-methods):

1.  To disable discovery mode, run:
    
    ``` 
                       
    onie# onie-discovery-stop
       
        
    ```
    
    or, on older ONIE versions if that command isn't supported:
    
    ``` 
                       
    onie# /etc/init.d/discover.sh stop
       
        
    ```

2.  Assign a static address to eth0 via ONIE (using `ip addr add`):
    
    ``` 
                       
    ONIE:/ #ip addr add 10.0.1.252/24 dev eth0
       
        
    ```

3.  Place the Cumulus Linux installer image in a directory on your web
    server.

4.  Run the installer manually, since there are no DHCP options:
    
    ``` 
                       
    ONIE:/ #onie-nos-install http://10.0.1.251/path/to/cumulus-install-[PLATFORM].bin
       
        
    ```

## Installing via FTP or TFTP without a Web Server

If your laptop is on the same network as the switch eth0 interface but
no DHCP server is available, you can still install directly from Cumulus
Linux or using ONIE.

### Installing from Cumulus Linux

If you are not utilizing DHCP options, run one of the following commands
(`tftp` for TFTP or `ftp` for FTP), from the Cumulus Linux command
prompt:

``` 
                   
cumulus@switch:~$ sudo onie-install -a -i ftp://local-ftp-server/cumulus-install-[PLATFORM].bin && sudo reboot
 
cumulus@switch:~$ sudo onie-install -a -i tftp://local-tftp-server/cumulus-install-[PLATFORM].bin && sudo reboot
   
    
```

### Installing from ONIE

To install without DHCP options using ONIE, do the following:

1.  Set up DHCP or static addressing for eth0, as in the examples above.

2.  If you are utilizing static addressing, disable ONIE discovery mode.

3.  Place the Cumulus Linux installer image into a TFTP or FTP
    directory.

4.  If you are not utilizing DHCP options, run one of the following
    commands (`tftp` for TFTP or `ftp` for FTP):
    
    ``` 
                       
    ONIE# onie-nos-install ftp://local-ftp-server/cumulus-install-[PLATFORM].bin
     
    ONIE# onie-nos-install tftp://local-tftp-server/cumulus-install-[PLATFORM].bin
       
        
    ```

## Installing via a Local File

You can still install referencing a local file, directly from Cumulus
Linux or using ONIE.

### Installing from Cumulus Linux

From Cumulus Linux, run the `onie-install` command:

``` 
                   
cumulus@switch:~$ sudo onie-install -a -i /path/to/local/file/cumulus-install-[PLATFORM].bin && sudo reboot
   
    
```

### Installing from ONIE

1.  Set up DHCP or static addressing for eth0, as in the examples above.

2.  If you are utilizing static addressing, disable ONIE discovery mode.

3.  Use [scp](http://en.wikipedia.org/wiki/Secure_copy) to copy the
    Cumulus Linux binary to the switch.  
    **Note:** Windows users can use
    [WinScp](http://winscp.net/eng/index.php).

4.  Run the installer manually from ONIE:
    
    ``` 
                       
    ONIE:/ #onie-nos-install /path/to/local/file/cumulus-install-[PLATFORM].bin
       
        
    ```

## Installing a New Image when Cumulus Linux Is already Installed

At times it may be necessary to put the switch into ONIE in order to do
an install. This may be required when moving between major releases or
re-installing from an early version of 3.y.z. For more information, see
[Upgrading Cumulus
Linux](/old/Cumulus_Linux_35/Upgrading_Cumulus_Linux.html#src-8357427_UpgradingCumulusLinux-binary_upgrade).

### Entering ONIE Mode from Cumulus Linux

If Cumulus Linux is already installed on the switch, you can enter ONIE
mode in one of two ways, using:

  - ONIE Recovery Mode to manually install an image from the ONIE
    prompt:
    
    ``` 
                       
    cumulus@switch:~$ sudo onie-select -r
    cumulus@switch:~$ sudo reboot
       
        
    ```

  - ONIE Install Mode to attempt to automatically discover the image
    from a DHCP server:
    
    ``` 
                       
    cumulus@switch:~$ sudo onie-select -i
    cumulus@switch:~$ sudo reboot
       
        
    ```
