# Cumulus NetQ Appliance Software Installation Guide

## Introduction

This guide illustrates how to install ONIE and Cumulus Linux onto the
Cumulus NetQ appliance. You need two USB drives with at least 1GB of
storage each. 

## Install ONIE

### Obtain the ONIE Installation Image

Obtain an ONIE installation .ISO image from Cumulus Networks. The file
should be named something like this:

``` text
onie-recovery-x86_64-cumulus_x86_64-r0.iso
```

### Copy the ONIE .ISO Image to a USB Drive

Use the Win32 Disk Imager program to copy the .ISO file to the USB
drive. This program is available for
[download](https://sourceforge.net/projects/win32diskimager/) if you
don't have it already.

1.  In the Win32 Disk Imager dialog, in the **Image File** field, select
    the .ISO file.
2.  In the **Device** field, select the USB drive.
3.  Click **Write**.  
    ![](attachments/9012798/9012790.png){height="250"}
4.  When the copy is complete, safely eject the USB drive from the
    computer.

### Enable the BMC Web GUI

You use the BMC web GUI to command the appliance. To use the BMC web
GUI, first configure a DHCP server to provide IP addresses for the BMC
NIC.

Connect to the web GUI by pointing a web browser at the IP address of
the BMC NIC.

-   The BMC username is *ADMIN*.
-   The BMC password is *ADMIN*.

### Use the BMC Serial Over LAN (SOL) Interface

Use the *Serial Over LAN (SOL)* interface for interacting with the
appliance. Do not use the *Console Redirection* or *iKVM/HTML5* options,
as these do not work with ONIE or Cumulus Linux. 

![](attachments/9012798/9012791.png)

### Enter the Appliance BIOS

1.  Insert the USB drive into an available USB slot in the back of the
    appliance.
2.  Reset the appliance using the **Power Control** from the web GUI.
3.  As the appliance boots, when the “Press DEL to run Setup” message
    appears, press the **DEL** key to enter the BIOS.

### Configure Serial Over LAN (SOL)

The initial SOL redirection terminal typeface setting is difficult to
read, making it difficult to work with the BIOS menus. Cumulus Networks
recommends you change the terminal type to *VT100+*, making the BIOS
menus much more visible and easy to use.

1.  Select the **Advanced** menu, then select **Serial Port Console
    Redirection**.  
    ![](attachments/9012798/9012792.png)
2.  Select **Console Redirection Settings**.  
    ![](attachments/9012798/9012793.png)
3.  Select **Terminal Type**, then in the Terminal Type popup, select
    **VT100+**.    
    ![](attachments/9012798/9012794.png)
4.  Configure UEFI mode. Select the **Boot** menu. Select **Boot mode
    select**, then in the Boot mode select popup, select **UEFI**.  
    ![](attachments/9012798/9012795.png) 
5.  Configure boot from USB. Select the **Boot** menu. Select **Boot
    Option \#1**, then select **UEFI USB Key: ...**.  
    ![](attachments/9012798/9012796.png) 
6.  Select the **Save & Exit** menu, then select **Save Changes and
    Reset**.  
    ![](attachments/9012798/9012797.png)

### Boot the ONIE Installer

The ONIE installer now boots up. In the GRUB menu select **ONIE: Embed
ONIE**. 

![](attachments/9012798/9012800.png)

The installer continues for a minute or so before rebooting.

### Configure the Appliance BIOS to Boot ONIE

1.  When the appliance starts to boot again, enter the BIOS by pressing
    the **DEL** key.
2.  Remove the ONIE USB drive from the back of the appliance.
3.  Select the **Boot** menu, then select **Boot Option \#1**. Select
    *UEFI Hard Disk:ONIE: Open Network Install Environment* to boot
    ONIE.  
    ![](attachments/9012798/9012801.png) 
4.  Select the **Save & Exit** menu, then select **Save Changes**.

Do not reset the system at this time. Leave the system in the BIOS for
now.

## Install Cumulus Linux

### Obtain the Cumulus Linux Installation Image

Obtain the Cumulus Linux installation image from Cumulus Networks. The
file should look something like this (the numbers at the end might be
different):

``` text
cumulus-linux-3.7.3-ts-amd64-1522084036.324eba2zf269f3ec.bin
```

### Copy the Cumulus Linux Image to a USB Drive

1.  Using the second USB drive, copy the Cumulus Linux image to the root
    directory of the USB drive.
2.  Rename the image file to *onie-installer.bin*.  
    ![](attachments/9012798/9012802.png){height="250"} 
3.  Safely eject the USB drive from the computer.

### Install Cumulus Linux from the USB Drive

1.  Insert the USB drive with the Cumulus Linux image into the back of
    the appliance.
2.  In the BMC web GUI, reset the appliance.
3.  The rest of the installation is hands off as ONIE boots and detects
    the Cumulus Linux image on the USB drive.
4.  The ONIE GRUB menu appears, with **ONIE: Install OS** selected.  
    ![](attachments/9012798/9012838.png)
5.  ONIE boots and detects the image on the USB drive.  
    ![](attachments/9012798/9012840.png)
6.  The Cumulus Linux installer reboots and boots into GRUB again,
    with **CUMULUS-INSTALL** selected.  
    ![](attachments/9012798/9012842.png)
7.  GRUB executes the Cumulus Linux installation, which takes about 5
    minutes to compete. When the installation finishes, the system
    reboots.  
    ![](attachments/9012798/9012843.png)

## Configure the Appliance BIOS to Boot into Cumulus Linux

With Cumulus Linux now installed, you no longer need to boot into ONIE.
Follow these steps to boot the appliance into Cumulus Linux instead.

1.  The next time the system boots, press the **DEL** key to enter the
    BIOS. Select the **Boot** menu and select **UEFI Hard Disk Drive BBS
    Priorities**.  
    ![](attachments/9012798/9012846.png)
2.  In the Boot Option \#1 popup, select **cumulus**.  
    ![](attachments/9012798/9012848.png)
3.  Select the **Save & Exit** menu, then select **Save Changes and
    Reset**. The system reboots into Cumulus Linux.

## Log in to Cumulus Linux

When you are presented with the login prompt, use the following
credentials:

-   The default username is *cumulus*
-   The default password is *CumulusLinux!*

``` text
netq-appliance login: cumulus
cumulus@netq-appliance's password: *************
```

Cumulus Networks recommends you change the password using the `passwd`
command.

``` text
cumulus@netq-appliance:~$ passwd
Changing password for cumulus.
(current) UNIX password: 
```

You can now use the Cumulus NetQ appliance to monitor your network. For
more information about Cumulus NetQ, read the [Cumulus NetQ user
guide](https://docs.cumulusnetworks.com/display/NETQ). 

For more information about Cumulus Linux, read the [Cumulus Linux user
guide](https://docs.cumulusnetworks.com/display/DOCS).

 

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[win32-disk-imager.png](attachments/9012798/9012790.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[sol.png](attachments/9012798/9012791.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [SOL
1.png](attachments/9012798/9012792.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [SOL 2 console
redirect.png](attachments/9012798/9012793.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [SOL 3 terminal
type.png](attachments/9012798/9012794.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [SOL 4
UEFI.png](attachments/9012798/9012795.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [SOL 5 boot from
USB.png](attachments/9012798/9012796.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [SOL 6
save.png](attachments/9012798/9012797.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [ONIE
GRUB.png](attachments/9012798/9012800.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [ONIE
boot.png](attachments/9012798/9012801.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [ONIE
rename.png](attachments/9012798/9012802.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [ONIE GRUB
install.png](attachments/9012798/9012838.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [ONIE detects
USB image.png](attachments/9012798/9012840.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [ONIE
Cumulus-install.png](attachments/9012798/9012842.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [ONIE Cumulus
install copying.png](attachments/9012798/9012843.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [GRUB boot
menu.png](attachments/9012798/9012846.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [GRUB boot
options.png](attachments/9012798/9012848.png) (image/png)  
