# Managing Cumulus Linux Disk Images

The Cumulus Linux operating system resides on a switch as a *disk
image*. This section discusses how to manage the disk image.

For information on installing a new Cumulus Linux disk image, refer
to [Installing a New Cumulus Linux
Image](Installing_a_New_Cumulus_Linux_Image). For information on
upgrading Cumulus Linux, refer to [Upgrading Cumulus
Linux](Upgrading_Cumulus_Linux).

Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [Determine the Switch
    Platform](#ManagingCumulusLinuxDiskImages-DeterminetheSwitchPlatform)
-   [Reprovision the System (Restart the
    Installer)](#ManagingCumulusLinuxDiskImages-ReprovisiontheSystem(RestarttheInstaller))
-   [Uninstall All Images and Remove the
    Configuration](#ManagingCumulusLinuxDiskImages-UninstallAllImagesandRemovetheConfiguration)
-   [Boot into Rescue
    Mode](#ManagingCumulusLinuxDiskImages-BootintoRescueMode)
-   [Inspect Image File
    Contents](#ManagingCumulusLinuxDiskImages-InspectImageFileContents)
-   [Related
    Information](#ManagingCumulusLinuxDiskImages-RelatedInformation)

## Determine the Switch Platform

To determine if your switch is on an x86 or ARM platform, run
the `uname -m` command.

For example, on an x86 platform, `uname -m` outputs *x86\_64*:

``` text
cumulus@x86switch$ uname -m
 x86_64
```

On an ARM platform, `uname -m` outputs *armv7l*:

``` text
cumulus@ARMswitch$ uname -m
 armv7l
```

You can also visit the HCL ([hardware compatibility
list](http://cumulusnetworks.com/support/linux-hardware-compatibility-list/))
to look at your hardware and determine the processor type.

## Reprovision the System (Restart the Installer)

Reprovisioning the system deletes all system data from the switch.

To initiate the provisioning and installation process, run
the `onie-select -i` command:

``` text
cumulus@switch:~$ sudo onie-select -i
WARNING:
WARNING: Operating System install requested.
WARNING: This will wipe out all system data.
WARNING:
Are you sure (y/N)? y
Enabling install at next reboot...done.
Reboot required to take effect.
```

A reboot is required for the reinstall to begin.

To cancel a pending reinstall operation, run the `onie-select -c`
command:

    cumulus@switch:~$ sudo onie-select -c
    Cancelling pending install at next reboot...done.

## Uninstall All Images and Remove the Configuration

To remove all installed images and configurations and return the switch
to its factory defaults, run the `onie-select -k` command:

``` text
cumulus@switch:~$ sudo onie-select -k
WARNING:
WARNING: Operating System uninstall requested.
WARNING: This will wipe out all system data.
WARNING:
Are you sure (y/N)? y
Enabling uninstall at next reboot...done.
Reboot required to take effect.
```

A reboot is required for the uninstall to begin.

To cancel a pending uninstall operation, run the `onie-select -c`
command:

``` text
cumulus@switch:~$ sudo onie-select -c
Cancelling pending uninstall at next reboot...done.
```

## Boot into Rescue Mode

If your system becomes broken is some way, you can correct certain
issues by booting into ONIE rescue mode. In rescue mode, the file
systems are unmounted and you can use various Cumulus Linux utilities to
try and resolve a problem.

To reboot the system into ONIE rescue mode, run
the `onie-select -r` command:

``` text
cumulus@switch:~$ sudo onie-select -r
WARNING:
WARNING: Rescue boot requested.
WARNING:
Are you sure (y/N)? y
Enabling rescue at next reboot...done.
Reboot required to take effect.
```

A reboot is required to boot into rescue mode.

To cancel a pending rescue boot operation, run the `onie-select -c`
command:

``` text
cumulus@switch:~$ sudo onie-select -c
Cancelling pending rescue at next reboot...done.
```

## Inspect Image File Contents

The Cumulus Linux installation disk image file is executable. From a
running switch, you can display the contents of the Cumulus Linux image
file by passing the `info` option to the image file. For example, if the
image file is called `onie-installer` and is located in
`/var/lib/cumulus/installer`, you can obtain information about the disk
image with the following command:

``` text
cumulus@switch:~$ sudo /var/lib/cumulus/installer/onie-installer info
Verifying image checksum ... OK.
Preparing image archive ... OK.
Control File Contents
=====================
Description: Cumulus Linux
OS-Release: 2.1.0-0556262-201406101128-NB
Architecture: amd64
Date: Tue, 10 Jun 2014 11:44:28 -0700
Installer-Version: 1.2
Platforms: im_n29xx_t40n mlx_sx1400_i73612 dell_s6000_s1220
Homepage: http://www.cumulusnetworks.com/

Data Archive Contents
=====================
       128 2014-06-10 18:44:26 file.list
        44 2014-06-10 18:44:27 file.list.sha1
 104276331 2014-06-10 18:44:27 sysroot-internal.tar.gz
        44 2014-06-10 18:44:27 sysroot-internal.tar.gz.sha1
   5391348 2014-06-10 18:44:26 vmlinuz-initrd.tar.xz
        44 2014-06-10 18:44:27 vmlinuz-initrd.tar.xz.sha1
cumulus@switch:~$
```

You can also extract the contents of the image file by passing the
`extract` option to the image file:

``` text
cumulus@switch:~$ sudo /var/lib/cumulus/installer/onie-installer extract PATH
Verifying image checksum ... OK.
Preparing image archive ... OK.
file.list
file.list.sha1
sysroot-internal.tar.gz
sysroot-internal.tar.gz.sha1
vmlinuz-initrd.tar.xz
vmlinuz-initrd.tar.xz.sha1
Success: Image files extracted OK.
cumulus@switch:~$ sudo ls -l
total 107120
-rw-r--r-- 1 1063 3000       128 Jun 10 18:44 file.list
-rw-r--r-- 1 1063 3000        44 Jun 10 18:44 file.list.sha1
-rw-r--r-- 1 1063 3000 104276331 Jun 10 18:44 sysroot-internal.tar.gz
-rw-r--r-- 1 1063 3000        44 Jun 10 18:44 sysroot-internal.tar.gz.sha1
-rw-r--r-- 1 1063 3000   5391348 Jun 10 18:44 vmlinuz-initrd.tar.xz
-rw-r--r-- 1 1063 3000        44 Jun 10 18:44 vmlinuz-initrd.tar.xz.sha1 
```

Finally, you can verify the contents of the image file by passing the
`verify` option to the image file:

``` text
cumulus@switch:~$ sudo /var/lib/cumulus/installer/onie-installer verify
Verifying image checksum ... OK.
Preparing image archive ... OK.
file.list
file.list.sha1
sysroot-internal.tar.gz
sysroot-internal.tar.gz.sha1
vmlinuz-initrd.tar.xz
vmlinuz-initrd.tar.xz.sha1
Success: Image files extracted OK.
cumulus@switch:~$ sudo ls -l
total 107120
-rw-r--r-- 1 1063 3000       128 Jun 10 18:44 file.list
-rw-r--r-- 1 1063 3000        44 Jun 10 18:44 file.list.sha1
-rw-r--r-- 1 1063 3000 104276331 Jun 10 18:44 sysroot-internal.tar.gz
-rw-r--r-- 1 1063 3000        44 Jun 10 18:44 sysroot-internal.tar.gz.sha1
-rw-r--r-- 1 1063 3000   5391348 Jun 10 18:44 vmlinuz-initrd.tar.xz
-rw-r--r-- 1 1063 3000        44 Jun 10 18:44 vmlinuz-initrd.tar.xz.sha1 
```

## Related Information

[Open Network Install Environment (ONIE) Home
Page](http://opencomputeproject.github.io/onie/)

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[png\_base64fcca65644256ad41.png](attachments/8362634/8362633.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[png\_base64c818ed9707a3041b.png](attachments/8362634/8362635.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[image-slots.png](attachments/8362634/8362636.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-09-14 at 3.47.19 PM.png](attachments/8362634/8362637.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-09-14 at 2.54.12 PM.png](attachments/8362634/8362638.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-09-14 at 2.31.16 PM.png](attachments/8362634/8362639.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-09-14 at 2.30.53 PM.png](attachments/8362634/8362640.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [Screen Shot
2015-09-14 at 12.49.30 PM.png](attachments/8362634/8362641.png)
(image/png)  
