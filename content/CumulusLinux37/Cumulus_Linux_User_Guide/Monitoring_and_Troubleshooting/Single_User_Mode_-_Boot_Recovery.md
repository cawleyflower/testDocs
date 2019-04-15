---
title: Single User Mode - Boot Recovery
author: Unknown
weight: 227
pageID: 8362606
---
# Single User Mode - Boot Recovery

<span id="src-8362606_indexterm-3264DDA3C14F460422BF94033784BDAA">Use
</span><span id="src-8362606_indexterm-C9F507CE4BA12AD3FD2BAF7A201B2156">single
</span><span id="src-8362606_indexterm-B410EED72B4AD5CFD1A94DD938394221">user
mode to assist in troubleshooting system </span>boot issues or for
password recovery. To enter single user mode, follow the steps below.

1.  Boot the switch, as soon as you see the GRUB menu.
    
    ``` 
                       
                           GNU GRUB  version 2.02~beta2-22+deb8u1
     
     +----------------------------------------------------------------------------+
     |*Cumulus Linux GNU/Linux                                                    | 
     | Advanced options for Cumulus Linux GNU/Linux                               |
     | ONIE                                                                       |
     |                                                                            |
     +----------------------------------------------------------------------------+     
       
        
    ```

2.  Use the ^ and v arrow keys to select **Advanced options for Cumulus
    Linux GNU/Linux**. A menu similar to the following should appear:
    
    ``` 
                       
                           GNU GRUB  version 2.02~beta2-22+deb8u1
     
     +----------------------------------------------------------------------------+
     | Cumulus Linux GNU/Linux, with Linux 4.1.0-cl-1-amd64                       | 
     | Cumulus Linux GNU/Linux, with Linux 4.1.0-cl-1-amd64 (sysvinit)            |
     |*Cumulus Linux GNU/Linux, with Linux 4.1.0-cl-1-amd64 (recovery mode)       |
     |                                                                            |
     +----------------------------------------------------------------------------+  
       
        
    ```

3.  Select **Cumulus Linux GNU/Linux, with Linux 4.1.0-cl-1-amd64
    (recovery mode)**.

4.  Press ctrl-x to reboot.

5.  After the system reboots, set a new **root** password.
    
    ``` 
                       
    cumulus@switch:~$ sudo passwd
    Enter new UNIX password: 
    Retype new UNIX password: 
    passwd: password updated successfully
       
        
    ```

6.  Sync the `/etc` directory using `btrfs`, then reboot the system:
    
    ``` 
                       
    cumulus@switch:~$ sudo btrfs filesystem sync /etc
    cumulus@switch:~$ sudo reboot -f
    Restarting the system. 
       
        
    ```
