# Using Snapshots

Cumulus Linux supports the ability to take snapshots of the complete
file system as well as the ability to roll back to a previous snapshot.
Snapshots are performed automatically right before and after you upgrade
Cumulus Linux using [package
install](Upgrading-Cumulus-Linux_8362647.html#UpgradingCumulusLinux-apt_upgrade),
and right before and after you commit a switch configuration using
[NCLU](Network_Command_Line_Utility_-_NCLU). In addition, you can take a
snapshot at any time. You can roll back the entire file system to a
specific snapshot or just retrieve specific files.  

The primary snapshot components include:

-   [btrfs](https://btrfs.wiki.kernel.org/index.php/Main_Page) — an
    underlying file system in Cumulus Linux, which supports snapshots.
-   [snapper](http://snapper.io/documentation.html) — a userspace
    utility to create and manage snapshots on demand as well as taking
    snapshots automatically before and after
    running `apt-get upgrade|install|remove|dist-upgrade`. You can use
    `snapper` to roll back to earlier snapshots, view existing
    snapshots, or delete one or more snapshots.
-   [NCLU](Network_Command_Line_Utility_-_NCLU) — takes snapshots
    automatically before and after committing network configurations.
    You can use NCLU to roll back to earlier snapshots, view existing
    snapshots, or delete one or more snapshots.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [Install the Snapshot
    Package](#UsingSnapshots-InstalltheSnapshotPackage)
-   [Take and Manage Snapshots](#UsingSnapshots-TakeandManageSnapshots)
    -   [View Available
        Snapshots](#UsingSnapshots-ViewAvailableSnapshots)
    -   [View Differences between
        Snapshots](#UsingSnapshots-ViewDifferencesbetweenSnapshots)
    -   [Delete Snapshots](#UsingSnapshots-DeleteSnapshots)
-   [Roll Back to Earlier
    Snapshots](#UsingSnapshots-rollbackRollBacktoEarlierSnapshots)
    -   [Roll Back with snapper](#UsingSnapshots-RollBackwithsnapper)
-   [Configure Automatic Time-based
    Snapshots](#UsingSnapshots-ConfigureAutomaticTime-basedSnapshots)
-   [Caveats and Errata](#UsingSnapshots-CaveatsandErrata)

## Install the Snapshot Package

If you are upgrading from a version of Cumulus Linux earlier than
version 3.2, you need to install the `cumulus-snapshot` package before
you can use snapshots.

``` text
cumulus@switch:~$ sudo -E apt-get update
cumulus@switch:~$ sudo -E apt-get install cumulus-snapshot
cumulus@switch:~$ sudo -E apt-get upgrade
```

## Take and Manage Snapshots

Snapshots are taken automatically:

-   Before and after you update your switch configuration by running the
    NCLU `net commit` command.
-   Before and after you update Cumulus Linux
    by running `apt-get upgrade|install|remove|dist-upgrade`, via
    `snapper`.

You can also take snapshots as needed using the `snapper` utility. Run:

``` text
cumulus@switch:~$ sudo snapper create -d SNAPSHOT_NAME
```

For more information about using `snapper`, run `snapper --help` or
`man snapper(8)`.

### View Available Snapshots

You can use both NCLU and `snapper` to view available snapshots on the
switch. 

``` text
cumulus@switch:~$ net show commit history 
  #  Date                             Description
---  -------------------------------  --------------------------------------
 20  Thu 01 Dec 2016 01:43:29 AM UTC  nclu pre  'net commit' (user cumulus)
 21  Thu 01 Dec 2016 01:43:31 AM UTC  nclu post 'net commit' (user cumulus)
 22  Thu 01 Dec 2016 01:44:18 AM UTC  nclu pre  '20 rollback' (user cumulus)
 23  Thu 01 Dec 2016 01:44:18 AM UTC  nclu post '20 rollback' (user cumulus)
 24  Thu 01 Dec 2016 01:44:22 AM UTC  nclu pre  '22 rollback' (user cumulus)
 31  Fri 02 Dec 2016 12:18:08 AM UTC  nclu pre  'ACL' (user cumulus)
 32  Fri 02 Dec 2016 12:18:10 AM UTC  nclu post 'ACL' (user cumulus)
```

However, `net show commit history` only displays snapshots taken when
you update your switch configuration. It does not list any snapshots
taken directly with `snapper`. To see all the snapshots on the switch,
run the `sudo snapper list` command:

``` text
cumulus@switch:~$ sudo snapper list
Type   | #  | Pre # | Date                            | User | Cleanup | Description                            | Userdata     
-------+----+-------+---------------------------------+------+---------+----------------------------------------+--------------
single | 0  |       |                                 | root |         | current                                |              
single | 1  |       | Sat 24 Sep 2016 01:45:36 AM UTC | root |         | first root filesystem                  |              
pre    | 20 |       | Thu 01 Dec 2016 01:43:29 AM UTC | root | number  | nclu pre  'net commit' (user cumulus)  |              
post   | 21 | 20    | Thu 01 Dec 2016 01:43:31 AM UTC | root | number  | nclu post 'net commit' (user cumulus)  |              
pre    | 22 |       | Thu 01 Dec 2016 01:44:18 AM UTC | root | number  | nclu pre  '20 rollback' (user cumulus) |              
post   | 23 | 22    | Thu 01 Dec 2016 01:44:18 AM UTC | root | number  | nclu post '20 rollback' (user cumulus) |              
single | 26 |       | Thu 01 Dec 2016 11:23:06 PM UTC | root |         | test_snapshot                          |              
pre    | 29 |       | Thu 01 Dec 2016 11:55:16 PM UTC | root | number  | pre-apt                                | important=yes
post   | 30 | 29    | Thu 01 Dec 2016 11:55:21 PM UTC | root | number  | post-apt                               | important=yes
pre    | 31 |       | Fri 02 Dec 2016 12:18:08 AM UTC | root | number  | nclu pre  'ACL' (user cumulus)         |              
post   | 32 | 31    | Fri 02 Dec 2016 12:18:10 AM UTC | root | number  | nclu post 'ACL' (user cumulus)         |            
```

### View Differences between Snapshots

To see a line by line comparison of changes between two snapshots, run
the `sudo snapper diff` command:

``` diff
cumulus@switch:~$ sudo snapper diff 20..21
--- /.snapshots/20/snapshot/etc/cumulus/acl/policy.d/50_nclu_acl.rules  2016-11-30 23:00:42.675092103 +0000
+++ /.snapshots/21/snapshot/etc/cumulus/acl/policy.d/50_nclu_acl.rules  2016-12-01 01:43:30.029171289 +0000
@@ -1,7 +0,0 @@
-[iptables]
-# control-plane: acl ipv4 EXAMPLE1 inbound
--A INPUT --in-interface swp+ -j ACCEPT -p tcp -s 10.0.0.11/32 -d 10.0.0.12/32 --dport 110
-
-# swp1: acl ipv4 EXAMPLE1 inbound
--A FORWARD --in-interface swp1 --out-interface swp2 -j ACCEPT -p tcp -s 10.0.0.11/32 -d 10.0.0.12/32 --dport 110
-
--- /.snapshots/20/snapshot/var/lib/cumulus/nclu/nclu_acl.conf  2016-11-30 23:00:18.030079000 +0000
+++ /.snapshots/21/snapshot/var/lib/cumulus/nclu/nclu_acl.conf  2016-12-01 00:23:10.096136000 +0000
@@ -1,8 +1,3 @@
-acl ipv4 EXAMPLE1 priority 10 accept tcp 10.0.0.11/32 10.0.0.12/32 pop3 outbound-interface swp2
 
-control-plane
-    acl ipv4 EXAMPLE1 inbound
 
-iface swp1
-    acl ipv4 EXAMPLE1 inbound
```

You can view the diff for a single file by specifying the name in the
command:

``` diff
cumulus@switch:~$ sudo snapper diff 20..21 /var/lib/cumulus/nclu/nclu_acl.conf 
--- /.snapshots/20/snapshot/var/lib/cumulus/nclu/nclu_acl.conf  2016-11-30 23:00:18.030079000 +0000
+++ /.snapshots/21/snapshot/var/lib/cumulus/nclu/nclu_acl.conf  2016-12-01 00:23:10.096136000 +0000
@@ -1,8 +1,3 @@
-acl ipv4 EXAMPLE1 priority 10 accept tcp 10.0.0.11/32 10.0.0.12/32 pop3 outbound-interface swp2
 
-control-plane
-    acl ipv4 EXAMPLE1 inbound
 
-iface swp1
-    acl ipv4 EXAMPLE1 inbound
```

For a higher level view; for example, to display the names of changed,
added, or deleted files only, run the `sudo snapper status` command:

``` text
cumulus@switch:~$ sudo snapper status 20..21
c..... /etc/cumulus/acl/policy.d/50_nclu_acl.rules
c..... /var/lib/cumulus/nclu/nclu_acl.conf
```

### Delete Snapshots

You can remove one or more snapshots using NCLU or snapper. 

Take care when deleting a snapshot. You cannot restore a snapshot after
you delete it.

To remove a single snapshot or a range of snapshots created with NCLU,
run:

``` text
cumulus@switch:~$ net commit delete SNAPSHOT|SNAPSHOT1-SNAPSHOT2
```

To remove a single snapshot or a range of snapshots using `snapper`,
run:

``` text
cumulus@switch:~$ sudo snapper delete SNAPSHOT|SNAPSHOT1-SNAPSHOT2
```

Snapshot 0 is the running configuration. You cannot roll back to it or
delete it. However, you can take a snapshot of it. 

Snapshot 1 is the root file system.

The `snapper` utility preserves a number of snapshots and automatically
deletes older snapshots after the limit is reached. It does this in two
ways.

By default, `snapper` preserves 10 snapshots that are
labeled *important*. A snapshot is labeled important if it is created
when you run `apt-get`. To change this number, run:

``` text
cumulus@switch:~$ sudo snapper set-config NUMBER_LIMIT_IMPORTANT=<NUM>
```

Always make `NUMBER_LIMIT_IMPORTANT` an even number as two snapshots are
always taken before and after an upgrade. This does not apply to
`NUMBER_LIMIT`, described next.

`snapper` also deletes unlabeled snapshots. By default, `snapper`
preserves five snapshots. To change this number, run:

``` text
cumulus@switch:~$ sudo snapper set-config NUMBER_LIMIT=<NUM>
```

You can prevent snapshots from being taken automatically before and
after
running `apt-get upgrade|install|remove|dist-upgrade`. Edit `/etc/cumulus/apt-snapshot.conf` and
set:

``` plain
APT_SNAPSHOT_ENABLE=no
```

## Roll Back to Earlier Snapshots

If you need to restore Cumulus Linux to an earlier state, you can roll
back to an older snapshot.

For a snapshot created with NCLU, you can revert to the configuration
prior to a specific snapshot listed in the output from
`net show commit history` by running `net rollback SNAPSHOT_NUMBER`. For
example, if you have snapshots 10, 11 and 12 in your commit history and
you run `net rollback 11`, the switch configuration reverts to the
configuration captured by snapshot 10.

You can also revert to the previous snapshot by specifying last by
running `net rollback last`.

``` text
cumulus@switch:~$ net rollback SNAPSHOT_NUMBER|last
```

If you provided a description when you committed changes, mentioning a
description rolls the configuration back to the commit prior to the
specified description. For example, consider the following commit
history:

``` text
cumulus@switch:~$ net show commit history 
 #  Date                             Description
--  -------------------------------  --------------------------------
10  Tue 06 Nov 2018 12:07:14 AM UTC  nclu "net commit" (user cumulus)
12  Tue 06 Nov 2018 10:19:50 PM UTC  nclu rocket
14  Tue 06 Nov 2018 10:20:22 PM UTC  nclu turtle 
```

Running `net rollback description turtle` rolls the configuration back
to the state it was in when you ran `net commit description rocket`.

### Roll Back with snapper

For any snapshot on the switch, you can use `snapper` to roll back to a
specific snapshot. When running `snapper rollback`, you must reboot the
switch for the rollback to complete:

``` text
cumulus@switch:~$ sudo snapper rollback SNAPSHOT_NUMBER
cumulus@switch:~$ sudo reboot
```

You can revert to an earlier version of a specific file instead of
rolling back the whole file system:

``` text
cumulus@switch:~$ sudo snapper undochange 31..32 /etc/cumulus/acl/policy.d/50_nclu_acl.rules
```

You can also copy the file directly from the snapshot directory:

``` text
cumulus@switch:~$ cp /.snapshots/32/snapshot/etc/cumulus/acl/policy.d/50_nclu_acl.rules /etc/cumulus/acl/policy.d/
```

## Configure Automatic Time-based Snapshots

You can configure Cumulus Linux to take hourly snapshots. Enable
`TIMELINE_CREATE` in the snapper configuration:

``` text
cumulus@switch:~$ sudo snapper set-config TIMELINE_CREATE=yes
cumulus@switch:~$ sudo snapper get-config                                                                                            
Key                    | Value
-----------------------+------
ALLOW_GROUPS           |      
ALLOW_USERS            |      
BACKGROUND_COMPARISON  | yes  
EMPTY_PRE_POST_CLEANUP | yes  
EMPTY_PRE_POST_MIN_AGE | 1800 
FSTYPE                 | btrfs
NUMBER_CLEANUP         | yes  
NUMBER_LIMIT           | 5    
NUMBER_LIMIT_IMPORTANT | 10   
NUMBER_MIN_AGE         | 1800 
QGROUP                 |      
SPACE_LIMIT            | 0.5  
SUBVOLUME              | /    
SYNC_ACL               | no   
TIMELINE_CLEANUP       | yes  
TIMELINE_CREATE        | yes  
TIMELINE_LIMIT_DAILY   | 5    
TIMELINE_LIMIT_HOURLY  | 5    
TIMELINE_LIMIT_MONTHLY | 5    
TIMELINE_LIMIT_YEARLY  | 5    
TIMELINE_MIN_AGE       | 1800 
```

## Caveats and Errata

You might notice that the root partition is mounted multiple times. This
is due to the way the `btrfs` file system handles subvolumes, mounting
the root partition once for each subvolume. `btrfs` keeps one subvolume
for each snapshot taken, which stores the snapshot data. While all
snapshots are subvolumes, not all subvolumes are snapshots.

Cumulus Linux excludes a number of directories when taking a snapshot of
the root file system (and from any rollbacks):

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Directory</th>
<th>Reason</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>/home</code></td>
<td>This directory is excluded to avoid user data loss on rollbacks.</td>
</tr>
<tr class="even">
<td><code>/var/log, /var/support</code></td>
<td><p>The log file and Cumulus support location. These directories are excluded from snapshots to allow post-rollback analysis.</p></td>
</tr>
<tr class="odd">
<td><code>/tmp, /var/tmp</code></td>
<td><p>There is no need to rollback temporary files.</p></td>
</tr>
<tr class="even">
<td><code>/opt, /var/opt</code></td>
<td><p>Third-party software is installed typically in <code>/opt</code>. Exclude <code>/opt</code> to avoid re-installing these applications after rollbacks.</p></td>
</tr>
<tr class="odd">
<td><code>/srv</code></td>
<td><p>This directory contains data for HTTP and FTP servers. Exclude this directory to avoid server data loss on rollbacks.</p></td>
</tr>
<tr class="even">
<td><code>/usr/local</code></td>
<td><p>This directory is used when installing locally built software. Exclude this directory to avoid re-installing this software after rollbacks.</p></td>
</tr>
<tr class="odd">
<td><code>/var/spool</code></td>
<td><p>Exclude this directory to avoid loss of mail after a rollback.</p></td>
</tr>
<tr class="even">
<td><code>/var/lib/libvirt/images</code></td>
<td><p>This is the default directory for libvirt VM images. Exclude this directory from the snapshot. Additionally, disable Copy-On-Write (COW) for this subvolume as COW and VM image I/O access patterns are not compatible.</p></td>
</tr>
<tr class="odd">
<td><p><code>/boot/grub/i386-pc, /boot/grub/x86_64-efi, /boot/grub/arm-uboot</code></p></td>
<td><p>The GRUB kernel modules must stay in sync with the GRUB kernel installed in the master boot record or UEFI system partition.</p></td>
</tr>
</tbody>
</table>
