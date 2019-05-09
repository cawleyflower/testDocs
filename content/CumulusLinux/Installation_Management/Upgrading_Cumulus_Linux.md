---
title: Upgrading Cumulus Linux
author: Unknown
weight: 45
pageID: 8362647
aliases:
 - /old/Upgrading_Cumulus_Linux.html
---
# Upgrading Cumulus Linux

This topic describes how to upgrade Cumulus Linux on your switches to a
more recent release.

Cumulus Networks recommends that you deploy, provision, configure, and
upgrade switches using automation, even with small networks or test
labs. During the upgrade process, you can quickly upgrade dozens of
devices in a repeatable manner. Using tools like Ansible, Chef, or
Puppet for configuration management greatly increases the speed and
accuracy of the next major upgrade; these tools also enable the quick
swap of failed switch hardware.

## Upgrade Cumulus Linux

You can upgrade Cumulus Linux in one of two ways:

  - Install a disk image of the new release, using ONIE.

  - Upgrade only the changed packages using the`  sudo -E apt-get
    update ` and `sudo` `-E apt-get upgrade` command.

{{%notice note%}}

Upgrading an MLAG pair requires additional steps. If you are using MLAG
to dual connect two Cumulus Linux switches in your environment, follow
the steps in [Upgrade Switches in an MLAG
Pair](/old/#src-8362647_UpgradingCumulusLinux-mlag) below to ensure a
smooth upgrade.

{{%/notice%}}

### Should I Install a Disk Image or Upgrade Packages?

The decision to upgrade Cumulus Linux by either installing a disk image
or upgrading packages depends on your environment and your preferences.
Here are some recommendations for each upgrade method.

**Installing a disk image** is recommended if you are performing a
rolling upgrade in a production environment and if are using up-to-date
and comprehensive automation scripts. This upgrade method enables you to
choose the exact release to which you want to upgrade and is the *only*
method available to upgrade your switch to a new release train (for
example, from 2.5.6 to 3.7.0) or from a release earlier than 3.6.2.

Be aware of the following when installing the disk image:

  - Installing a disk image is destructive; any configuration files on
    the switch are not saved; copy them to a different server before you
    start the disk image install.

  - You must move configuration data to the new OS using ZTP or
    automation while the OS is first booted, or soon afterwards using
    out-of-band management.

  - Moving a configuration file might cause issues;
    
      - Identifying all the locations of configuration data is not
        always an easy task. See [Before You Upgrade Cumulus
        Linux](/old/#src-8362647_UpgradingCumulusLinux-before-upgrade)
        above.
    
      - Merge conflicts with configuration file changes in the new
        release might go undetected.

  - If configuration files are not restored correctly, you might be
    unable to ssh to the switch from in-band management. Out-of-band
    connectivity (eth0 or console) is recommended.

  - You *must* reinstall and reconfigure third-party applications after
    upgrade.

**Package upgrade** is recommended if you are upgrading from Cumulus
Linux 3.6.2 or later, or if you use third-party applications (package
upgrade does not replace or remove third-party applications, unlike disk
image install).

Be aware of the following when upgrading packages:

  - You cannot upgrade the switch to a new release train. For example,
    you **cannot** upgrade the switch from **2**.5.6 to **3**.y.z.

  - If you are upgrading Cumulus Linux from a release earlier than
    3.6.2, you might encounter certain issues due to package changes and
    service restarts.

  - You cannot choose the exact release that you want to run. When you
    upgrade, you upgrade all packages to the latest available release in
    the Cumulus Networks repository.

  - If you are upgrading from a release earlier than 3.6.2, certain
    upgrade operations terminate SSH sessions and/or routing on the
    in-band (front panel) ports, leaving you unable to monitor the
    upgrade process. (As a workaround, you can use the
    [<span style="color: #000000;"> dtach tool
    </span>](https://support.cumulusnetworks.com/hc/en-us/articles/215453578)
    .)
    
      - The ` sudo  ``-E``  apt-get upgrade ` command might result in
        services being restarted or stopped as part of the upgrade
        process.
    
      - The ` sudo  ``-E``   ``apt-get install` command might disrupt
        core services by changing core service dependency packages.

  - After you upgrade, account UIDs and GIDs created by packages might
    be different on different switches, depending on the configuration
    and package installation history.

### Disk Image Install (ONIE)

ONIE is an open source project (equivalent to PXE on servers) that
enables the installation of network operating systems (NOS) on a bare
metal switch.

To upgrade the switch with a new disk image using ONIE:

1.  Back up the configurations off the switch.

2.  Download the Cumulus Linux image you want to install.

3.  Install the disk image with the `onie-install -a -i` ` 
    <image-location> ` command, which boots the switch into ONIE.  
    The following example command installs the image from a web server,
    then reboots the switch. There are additional ways to install the
    disk image, such as using FTP, a local file, or a USB drive. For
    more information, see [Installing a New Cumulus Linux
    Image](/old/Installing_a_New_Cumulus_Linux_Image.html).
    
    ``` 
                       
    cumulus@switch:~$ sudo onie-install -a -i http://10.0.1.251/cumulus-linux-3.7.1-mlx-amd64.bin && sudo reboot
       
        
    ```

4.  Restore the configuration files to the new release — ideally with
    automation.

5.  Verify correct operation with the old configurations on the new
    release.

6.  Reinstall third party applications and associated configurations.

### Package Upgrade

Cumulus Linux completely embraces the Linux and Debian upgrade workflow,
where you use an installer to install a base image, then perform any
upgrades within that release train with `-E apt-get update and -E
apt-get upgrade` commands. Any packages that have been changed since the
base install get upgraded in place from the repository. All switch
configuration files remain untouched, or in rare cases merged (using the
Debian merge function) during the package upgrade.

When you use package upgrade to upgrade your switch, configuration data
stays in place while the packages are upgraded. If the new release
updates a configuration file that you changed previously, you are
prompted for the version you want to use or if you want to evaluate the
differences.

To upgrade the switch using package upgrade:

1.  Back up the configurations from the switch.

2.  Fetch the latest update metadata from the repository.
    
    ``` 
                       
    cumulus@switch:~$ sudo -E apt-get update
       
        
    ```

3.  Review potential upgrade issues (in some cases, upgrading new
    packages might also upgrade additional existing packages due to
    dependencies). Run the following command to see the additional
    packages that will be installed or upgraded.
    
    ``` 
                       
    cumulus@switch:~$ sudo -E apt-get install --dry-run
       
        
    ```

<!-- end list -->

  - Upgrade all the packages to the latest distribution.
    
    ``` 
                       
    cumulus@switch:~$ sudo -E apt-get upgrade
       
        
    ```
    
    If no reboot is required after the upgrade completes, the upgrade
    ends, restarts all upgraded services, and logs messages in the
    `/var/log/syslog` file similar to the ones shown below. In the
    examples below, only the `frr` package was upgraded.
    
    ``` 
                       
    Policy: Service frr.service action stop postponed
    Policy: Service frr.service action start postponed
    Policy: Restarting services: frr.service
    Policy: Finished restarting services
    Policy: Removed /usr/sbin/policy-rc.d
    Policy: Upgrade is finished
       
        
    ```
    
    If the upgrade process encounters changed configuration files that
    have new versions in the release to which you are upgrading, you see
    a message similar to this:
    
    ``` 
                       
    Configuration file '/etc/frr/daemons'
    ==> Modified (by you or by a script) since installation.
    ==> Package distributor has shipped an updated version.
    What would you like to do about it ? Your options are:
    Y or I : install the package maintainer's version
    N or O : keep your currently-installed version
    D : show the differences between the versions
    Z : start a shell to examine the situation
    The default action is to keep your current version.
    *** daemons (Y/I/N/O/D/Z) [default=N] ?
       
        
    ```
    
    \- To see the differences between the currently installed version
    and the new version, type `D`.
    
    \- To keep the currently installed version, type `N`. The new
    package version is installed with the suffix `_.dpkg-dist` (for
    example, `/etc/frr/daemons.dpkg-dist`). When upgrade is complete and
    **before** you reboot, merge your changes with the changes from the
    newly installed file.
    
    \- To install the new version, type `I`. Your currently installed
    version is saved with the suffix `.dpkg-old`.
    
    When the upgrade is complete, you can search for the files with the
    `sudo find / -mount -type f -name '*.dpkg-*'` command.
    
    {{%notice note%}}
    
    If you see errors for expired GPG keys that prevent you from
    upgrading packages, follow the steps in [Upgrading Expired GPG
    Keys](https://support.cumulusnetworks.com/hc/en-us/articles/360002663013-Updating-Expired-GPG-Keys).
    
    {{%/notice%}}

<!-- end list -->

1.  Reboot the switch if the upgrade messages indicate that a system
    restart is required.
    
    ``` 
                       
    cumulus@switch:~$ sudo -E apt-get upgrade
          ... upgrade messages here ...
     
    *** Caution: Service restart prior to reboot could cause unpredictable behavior
    *** System reboot required ***
    cumulus@switch:~$ sudo reboot
       
        
    ```

2.  Verify correct operation with the old configurations on the new
    version.

### Upgrade Notes

*Package upgrade* always updates to the latest available release in the
Cumulus Linux repository. For example, if you are currently running
Cumulus Linux 3.0.1 and run the `sudo -E apt-get upgrade` command on
that switch, the packages are upgraded to the latest releases contained
in the latest 3.y.z release.

Because Cumulus Linux is a collection of different Debian Linux
packages, be aware of the following:

  - The `/etc/os-release` and `/etc/lsb-release` files are updated to
    the currently installed Cumulus Linux release when you upgrade the
    switch using either *package upgrade* or *disk image install*. For
    example, if you run `sudo -E apt-get upgrade` and the latest Cumulus
    Linux release on the repository is 3.7.1, these two files display
    the release as 3.7.1 after the upgrade.

  - The `/etc/image-release` file is updated **only** when you run a
    disk image install. Therefore, if you run a disk image install of
    Cumulus Linux 3.5.0, followed by a package upgrade to 3.7.1 using
    `sudo -E apt-get upgrade`, the `/etc/image-release` file continues
    to display Cumulus Linux 3.5.0, which is the originally installed
    base image.

## Upgrade Switches in an MLAG Pair

If you are using [MLAG](/old/Multi-Chassis_Link_Aggregation_-_MLAG.html)
to dual connect two switches in your environment, follow the steps below
according to the version of Cumulus Linux from which you are upgrading.

### Upgrade from Cumulus Linux 3.y.z to a Later 3.y.z Release

When you upgrade Cumulus Linux from 3.y.z to a later 3.y.z release, you
can either install a disk image using ONIE or use package upgrade. Both
methods are included below.

To upgrade the switches:

1.  Verify the switch is in the secondary role:
    
    ``` 
                       
    cumulus@switch:~$ clagctl status
       
        
    ```

2.  If you want to install a disk image, go to the next step. If you
    want to use package upgrade, update the Cumulus Linux repositories:
    
    ``` 
                       
    cumulus@switch:~$ sudo -E apt-get update
       
        
    ```

3.  Shut down the core uplink layer 3 interfaces:
    
    ``` 
                       
    cumulus@switch:~$ sudo ip link set swpX down
       
        
    ```

4.  Shut down the peerlink:
    
    ``` 
                       
    cumulus@switch:~$ sudo ip link set peerlink down
       
        
    ```

5.  Perform the upgrade either by installing a disk image or upgrading
    packages.  
    To *install a disk image*, run the `onie-install -a -i` ` 
    <image-location> ` command to boot the switch into ONIE. The
    following example command installs the image from a web server.
    There are additional ways to install the disk image, such as using
    FTP, a local file, or a USB drive. For more information, see
    [Installing a New Cumulus Linux
    Image](/old/Installing_a_New_Cumulus_Linux_Image.html).
    
    ``` 
                       
    cumulus@switch:~$ sudo onie-install -a -i http://10.0.1.251/downloads/cumulus-linux-3.7.1-mlx-amd64.bin
       
        
    ```
    
    To use *package upgrade*, run the `-E apt-get upgrade` command:
    
    ``` 
                       
    cumulus@switch:~$ sudo -E apt-get upgrade
       
        
    ```

6.  Reboot the switch:
    
    ``` 
                       
    cumulus@switch:~$ sudo reboot
       
        
    ```

7.  If you were originally running Cumulus Linux 3.0.0 through 3.3.2,
    follow the steps for [upgrading from Quagga to
    FRRouting](/old/Upgrading_from_Quagga_to_FRRouting.html).

8.  Verify STP convergence across both switches:
    
    ``` 
                       
    cumulus@switch:~$ mstpctl showall
       
        
    ```

9.  Verify core uplinks and peerlinks are UP:
    
    ``` 
                       
    cumulus@switch:~$ net show interface
       
        
    ```

10. Verify MLAG convergence:
    
    ``` 
                       
    cumulus@switch:~$ clagctl status
       
        
    ```

11. Make this secondary switch the primary:
    
    ``` 
                       
    cumulus@switch:~$ clagctl priority 2048
       
        
    ```

12. Verify the other switch is now in the secondary role.

13. Repeat steps 2-10 on the new secondary switch.

14. Remove the priority 2048 and restore the priority back to 32768 on
    the current primary switch:
    
    ``` 
                       
    cumulus@switch:~$ clagctl priority 32768
       
        
    ```

### Upgrade from Cumulus Linux 2.y.z to 3.y.z

If you are using [MLAG](/old/Multi-Chassis_Link_Aggregation_-_MLAG.html)
to dual connect two switches in your environment and those switches are
still running Cumulus Linux 2.5 ESR or any other release earlier than
3.0.0, the switches are not dual-connected after you upgrade the first
switch.

To upgrade the switches, you **must** install a new disk image using
ONIE; you cannot use package upgrade:

1.  Disable `clagd` in the `/etc/network/interfaces` file (set
    `clagd-enable` to *no*), then restart `switchd`, networking, and FRR
    services.
    
    ``` 
                       
    cumulus@switch:~$ sudo systemctl restart switchd.service
    cumulus@switch:~$ sudo systemctl restart networking.service
    cumulus@switch:~$ sudo systemctl restart frr.service
       
        
    ```

2.  If you are using BGP, notify the BGP neighbors that the switch is
    going down:
    
    ``` 
                       
    cumulus@switch:~$ sudo vtysh -c "config t" -c "router bgp" -c "neighbor X.X.X.X shutdown"
       
        
    ```

3.  Stop the Quagga service:
    
    ``` 
                       
    cumulus@switch:~$ sudo systemctl stop [quagga|frr].service 
       
        
    ```

4.  Bring down all the front panel ports:
    
    ``` 
                       
    cumulus@switch:~$ sudo ip link set swp<#> down
       
        
    ```

5.  Run `cl-img-select -fr` to boot the switch in the secondary role
    into ONIE, then reboot the switch.

6.  Install Cumulus Linux onto the secondary switch using ONIE. At this
    time, all traffic goes to the switch in the primary role.

7.  After the install, copy the license file and all the configuration
    files you backed up, then restart the `switchd`, networking, and
    Quagga services. All traffic is still going to the primary switch.
    
    ``` 
                       
    cumulus@switch:~$ sudo systemctl restart switchd.service
    cumulus@switch:~$ sudo systemctl restart networking.service
    cumulus@switch:~$ sudo systemctl restart quagga.service
       
        
    ```

8.  Run `cl-img-select -fr` to boot the switch in the primary role into
    ONIE, then reboot the switch. Now, all traffic is going to the
    switch in the *secondary role* that you just upgraded.

9.  Install Cumulus Linux onto the *primary switch* using ONIE.

10. After the install, copy the license file and all the configuration
    files you backed up.

11. Follow the steps for [upgrading from Quagga to
    FRRouting](/old/Upgrading_from_Quagga_to_FRRouting.html).

12. Enable `clagd` again in the `/etc/network/interfaces` file (set
    `clagd-enable` to *yes*), then run `ifreload -a`.
    
    ``` 
                       
    cumulus@switch:~$ sudo ifreload -a
       
        
    ```

13. Bring up all the front panel ports:
    
    ``` 
                       
    cumulus@switch:~$ sudo ip link set swp<#> up 
       
        
    ```
    
    The two switches are dual-connected again and traffic flows to both
    switches.

## Roll Back a Cumulus Linux Installation

Even the most well planned and tested upgrades can result in unforeseen
problems; sometimes the best solution is to roll back to the previous
state.There are three main strategies; all require detailed planning and
execution:

  - Back out individual packages: If you identify the problematic
    package, you can downgrade the affected package directly. In rare
    cases, you might need to restore the configuration files from backup
    or edit to back out any changes made automatically by the upgrade
    package.

  - Flatten and rebuild: If the OS becomes unusable, you can use
    orchestration tools to reinstall the previous OS release from
    scratch and then rebuild the configuration automatically.

  - Backup and restore: Another common strategy is to restore to a
    previous state using a backup captured before the upgrade.

The method you employ is specific to your deployment strategy, so
providing detailed steps for each scenario is outside the scope of this
document.

## Third Party Packages

Third party packages in the *Linux host* world often use the same
package system as the distribution into which it is to be installed (for
example, Debian uses `apt-get`). Or, the package might be compiled and
installed by the system administrator. Configuration and executable
files generally follow the same filesystem hierarchy standards as other
applications.

If you install any third party applications on a Cumulus Linux switch,
configuration data is typically installed into the `/etc` directory, but
it is not guaranteed. It is your responsibility to understand the
behavior and configuration file information of any third party packages
installed on the switch.

After you upgrade using a full disk image install, you need to reinstall
any third party packages or any Cumulus Linux add-on packages, such as
`vxsnd` or `vxrd`.

## Related Information

  - [Upgrades: Network Device Worldview and Linux Host Worldview
    Comparison](https://support.cumulusnetworks.com/hc/en-us/articles/360010451353)

  - [Automation
    Solutions](https://cumulusnetworks.com/solutions/automation/)

  - [ONIE Design
    Specification](http://opencomputeproject.github.io/onie/design-spec/)

  - [Multi-Chassis Link Aggregation -
    MLAG](/old/Multi-Chassis_Link_Aggregation_-_MLAG.html)

  - [Configuration File Migration
    Script](https://support.cumulusnetworks.com/hc/en-us/articles/360011472734-Configuration-File-Migration-Script)

  - [Zero Touch Provisioning -
    ZTP](/old/Zero_Touch_Provisioning_-_ZTP.html)
