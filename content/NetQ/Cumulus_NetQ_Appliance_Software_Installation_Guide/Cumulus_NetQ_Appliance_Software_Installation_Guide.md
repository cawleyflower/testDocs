\--- title: author: keywords:
---

# Cumulus NetQ Appliance Software Installation Guide

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-Introduction" class="section section-1">

## Introduction

This guide illustrates how to install ONIE and Cumulus Linux onto the
Cumulus NetQ appliance. You need two USB drives with at least 1GB of
storage
each.

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-InstallONIE" class="section section-1">

## Install ONIE

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-ObtaintheONIEInstallationImage" class="section section-2">

### Obtain the ONIE Installation Image

Obtain an ONIE installation .ISO image from Cumulus Networks. The file
should be named something like this:

``` 
                
onie-recovery-x86_64-cumulus_x86_64-r0.iso

    
```

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-CopytheONIE.ISOImagetoaUSBDrive" class="section section-2">

### Copy the ONIE .ISO Image to a USB Drive

Use the Win32 Disk Imager program to copy the .ISO file to the USB
drive. This program is available for
[download](https://sourceforge.net/projects/win32diskimager/) if you
don't have it already.

1.  In the Win32 Disk Imager dialog, in the **Image File** field, select
    the .ISO file.

2.  In the **Device** field, select the USB drive.

3.  Click
    **Write**.
    
    ![/images/download/attachments/9012798/win32-disk-imager.png](/images/download/attachments/9012798/win32-disk-imager.png)

4.  When the copy is complete, safely eject the USB drive from the
    computer.

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-EnabletheBMCWebGUI" class="section section-2">

### Enable the BMC Web GUI

You use the BMC web GUI to command the appliance. To use the BMC web
GUI, first configure a DHCP server to provide IP addresses for the BMC
NIC.

Connect to the web GUI by pointing a web browser at the IP address of
the BMC NIC.

  - The BMC username is *ADMIN*.

  - The BMC password is
*ADMIN*.

</div>

<div id="src-9012798_safe-id-Q3VtdWx1c05ldFFBcHBsaWFuY2VTb2Z0d2FyZUluc3RhbGxhdGlvbkd1aWRlLVVzZXRoZUJNQ1NlcmlhbE92ZXJMQU4oU09MKUludGVyZmFjZQ" class="section section-2">

### Use the BMC Serial Over LAN (SOL) Interface

Use the *Serial Over LAN (SOL)* interface for interacting with the
appliance. Do not use the *Console Redirection* or *iKVM/HTML5* options,
as these do not work with ONIE or Cumulus
Linux.

![/images/download/attachments/9012798/sol.png](/images/download/attachments/9012798/sol.png)

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-EntertheApplianceBIOS" class="section section-2">

### Enter the Appliance BIOS

1.  Insert the USB drive into an available USB slot in the back of the
    appliance.

2.  Reset the appliance using the **Power Control** from the web GUI.

3.  As the appliance boots, when the “Press DEL to run Setup” message
    appears, press the **DEL** key to enter the
BIOS.

</div>

<div id="src-9012798_safe-id-Q3VtdWx1c05ldFFBcHBsaWFuY2VTb2Z0d2FyZUluc3RhbGxhdGlvbkd1aWRlLUNvbmZpZ3VyZVNlcmlhbE92ZXJMQU4oU09MKQ" class="section section-2">

### Configure Serial Over LAN (SOL)

The initial SOL redirection terminal typeface setting is difficult to
read, making it difficult to work with the BIOS menus. Cumulus Networks
recommends you change the terminal type to *VT100+*, making the BIOS
menus much more visible and easy to use.

1.  Select the **Advanced** menu, then select **Serial Port Console
    Redirection**.
    
    ![/images/download/attachments/9012798/SOL\_1.png](/images/download/attachments/9012798/SOL_1.png)

2.  Select **Console Redirection
    Settings**.
    
    ![/images/download/attachments/9012798/SOL\_2\_console\_redirect.png](/images/download/attachments/9012798/SOL_2_console_redirect.png)

3.  Select **Terminal Type**, then in the Terminal Type popup, select
    **VT100+**.
    
    ![/images/download/attachments/9012798/SOL\_3\_terminal\_type.png](/images/download/attachments/9012798/SOL_3_terminal_type.png)

4.  Configure UEFI mode. Select the **Boot** menu. Select **Boot mode
    select**, then in the Boot mode select popup, select
    **UEFI**.
    
    ![/images/download/attachments/9012798/SOL\_4\_UEFI.png](/images/download/attachments/9012798/SOL_4_UEFI.png)

5.  Configure boot from USB. Select the **Boot** menu. Select **Boot
    Option \#1**, then select **UEFI USB Key:
    ...**.
    
    ![/images/download/attachments/9012798/SOL\_5\_boot\_from\_USB.png](/images/download/attachments/9012798/SOL_5_boot_from_USB.png)

6.  Select the **Save & Exit** menu, then select **Save Changes and
    Reset**.
    
    ![/images/download/attachments/9012798/SOL\_6\_save.png](/images/download/attachments/9012798/SOL_6_save.png)

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-BoottheONIEInstaller" class="section section-2">

### Boot the ONIE Installer

The ONIE installer now boots up. In the GRUB menu select **ONIE: Embed
ONIE**.

![/images/download/attachments/9012798/ONIE\_GRUB.png](/images/download/attachments/9012798/ONIE_GRUB.png)

The installer continues for a minute or so before
rebooting.

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-ConfiguretheApplianceBIOStoBootONIE" class="section section-2">

### Configure the Appliance BIOS to Boot ONIE

1.  When the appliance starts to boot again, enter the BIOS by pressing
    the **DEL** key.

2.  Remove the ONIE USB drive from the back of the appliance.

3.  Select the **Boot** menu, then select **Boot Option \#1**. Select
    *UEFI Hard Disk:ONIE: Open Network Install Environment* to boot
    ONIE.
    
    ![/images/download/attachments/9012798/ONIE\_boot.png](/images/download/attachments/9012798/ONIE_boot.png)

4.  Select the **Save & Exit** menu, then select **Save Changes**.

Do not reset the system at this time. Leave the system in the BIOS for
now.

</div>

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-InstallCumulusLinux" class="section section-1">

## Install Cumulus Linux

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-ObtaintheCumulusLinuxInstallationImage" class="section section-2">

### Obtain the Cumulus Linux Installation Image

Obtain the Cumulus Linux installation image from Cumulus Networks. The
file should look something like this (the numbers at the end might be
different):

``` 
                
cumulus-linux-3.7.3-ts-amd64-1522084036.324eba2zf269f3ec.bin

    
```

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-CopytheCumulusLinuxImagetoaUSBDrive" class="section section-2">

### Copy the Cumulus Linux Image to a USB Drive

1.  Using the second USB drive, copy the Cumulus Linux image to the root
    directory of the USB drive.

2.  Rename the image file to
    *onie-installer.bin*.
    
    ![/images/download/attachments/9012798/ONIE\_rename.png](/images/download/attachments/9012798/ONIE_rename.png)

3.  Safely eject the USB drive from the
computer.

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-InstallCumulusLinuxfromtheUSBDrive" class="section section-2">

### Install Cumulus Linux from the USB Drive

1.  Insert the USB drive with the Cumulus Linux image into the back of
    the appliance.

2.  In the BMC web GUI, reset the appliance.

3.  The rest of the installation is hands off as ONIE boots and detects
    the Cumulus Linux image on the USB drive.

4.  The ONIE GRUB menu appears, with **ONIE: Install OS**
    selected.
    
    ![/images/download/attachments/9012798/ONIE\_GRUB\_install.png](/images/download/attachments/9012798/ONIE_GRUB_install.png)

5.  ONIE boots and detects the image on the USB
    drive.
    
    ![/images/download/attachments/9012798/ONIE\_detects\_USB\_image.png](/images/download/attachments/9012798/ONIE_detects_USB_image.png)

6.  The Cumulus Linux installer reboots and boots into GRUB again, with
    **CUMULUS-INSTALL**
    selected.
    
    ![/images/download/attachments/9012798/ONIE\_Cumulus-install.png](/images/download/attachments/9012798/ONIE_Cumulus-install.png)

7.  GRUB executes the Cumulus Linux installation, which takes about 5
    minutes to compete. When the installation finishes, the system
    reboots.
    
    ![/images/download/attachments/9012798/ONIE\_Cumulus\_install\_copying.png](/images/download/attachments/9012798/ONIE_Cumulus_install_copying.png)

</div>

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-ConfiguretheApplianceBIOStoBootintoCumulusLinux" class="section section-1">

## Configure the Appliance BIOS to Boot into Cumulus Linux

With Cumulus Linux now installed, you no longer need to boot into ONIE.
Follow these steps to boot the appliance into Cumulus Linux instead.

1.  The next time the system boots, press the **DEL** key to enter the
    BIOS. Select the **Boot** menu and select **UEFI Hard Disk Drive BBS
    Priorities**.
    
    ![/images/download/attachments/9012798/GRUB\_boot\_menu.png](/images/download/attachments/9012798/GRUB_boot_menu.png)

2.  In the Boot Option \#1 popup, select
    **cumulus**.
    
    ![/images/download/attachments/9012798/GRUB\_boot\_options.png](/images/download/attachments/9012798/GRUB_boot_options.png)

3.  Select the **Save & Exit** menu, then select **Save Changes and
    Reset**. The system reboots into Cumulus
Linux.

</div>

<div id="src-9012798_CumulusNetQApplianceSoftwareInstallationGuide-LogintoCumulusLinux" class="section section-1">

## Log in to Cumulus Linux

When you are presented with the login prompt, use the following
credentials:

  - The default username is *cumulus*

  - The default password is *CumulusLinux\!*

<!-- end list -->

``` 
                
netq-appliance login: cumulus
cumulus@netq-appliance's password: *************

    
```

Cumulus Networks recommends you change the password using the `passwd`
command.

``` 
                
cumulus@netq-appliance:~$ passwd
Changing password for cumulus.
(current) UNIX password: 

    
```

You can now use the Cumulus NetQ appliance to monitor your network. For
more information about Cumulus NetQ, read the [Cumulus NetQ user
guide](https://docs.cumulusnetworks.com/display/NETQ).

For more information about Cumulus Linux, read the [Cumulus Linux user
guide](https://docs.cumulusnetworks.com/display/DOCS).

</div>
