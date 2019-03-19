\--- title: author: keywords: ---

# Upgrade NetQ 2.0.0 to NetQ 2.0.1

This document describes the steps required to upgrade from NetQ 2.0.0 to
NetQ 2.0.1. Note that any data you have collected while using NetQ 2.0.0
is maintained during this upgrade process.

Instructions for installing NetQ 2.0.1 as a clean install can be found
in the *Cumulus NetQ Deployment Guide*.

To upgrade NetQ:

1.  Obtain the NetQ-2.0.1.tgz and NetQ-2.0.1-installer.tgz files from
    your sales engineer.

2.  From a terminal window, log in to the NetQ Platform
    (*netq-appliance*) using your login credentials. This example uses
    the default *cumulus/CumulusLinux\!* credentials.
    
    ``` 
                    
    :~$ ssh cumulus@netq-appliance
    cumulus@netq-appliance's password: 
    cumulus@netq-appliance:~$ 
    
        
    ```

3.  Change to the root user.
    
    ``` 
                    
    cumulus@netq-appliance:~$ sudo -i
    [sudo] password for cumulus:
    root@netq-appliance:~#
    
        
    ```

4.  Create an *installables* subdirectory in the mount directory.
    
    ``` 
                    
    root@netq-appliance:~# mkdir -p /mnt/installables/
    root@netq-appliance:~#
    
        
    ```

5.  Copy the NetQ-2.0.1.tgz and NetQ-2.0.1-installer.tgz files into your
    new directory.
    
    ``` 
                    
    root@netq-appliance:~# cd /mnt/installables/
    root@netq-appliance:/mnt/installables# cp /home/usr/dir/{NetQ-2.0.1.tgz,NetQ-2.0.1-installer.tgz} ./ 
    
        
    ```

6.  Export the installer script.
    
    ``` 
                    
    root@netq-appliance:/mnt/installables# tar -xvf NetQ-2.0.1.tgz ./netq-install.sh
    
        
    ```

7.  Verify the contents of the directory. You should have the two TGZ
    files and the `netq-install.sh` script.
    
    ``` 
                    
    root@netq-appliance:/mnt/installables# ls -l
    total 9607744
    -rw-r--r-- 1 cumulus cumulus 277396386 Mar 6 20:36 NetQ-2.0.1-installer.tgz
    -rw-r--r-- 1 cumulus cumulus 9560923436 Mar 6 11:13 NetQ-2.0.1.tgz
    -rwxr-xr-x 1 _lldpd _lldpd 4309 Mar 6 20:34 netq-install.sh
    root@netq-appliance:/mnt/installables#
    
        
    ```

8.  Configure SSH access.
    
    <div class="confbox admonition admonition-info">
    
    <div class="admonition-body">
    
    {{% notice info %}} If you perform the upgrade more than once, you
    can skip this step after performing it once. {{% /notice %}}
    
    </div>
    
    </div>
    
    1.  Generate the SSH key to enable you to run the script.
        
        <div class="confbox admonition admonition-info">
        
        <div class="admonition-body">
        
        {{% notice info %}} Leave the passphrase blank to simplify
        running the script. {{% /notice %}}
        
        </div>
        
        </div>
        
        ``` 
                        
        root@netq-appliance:/mnt/installables# ssh-keygen -t rsa -b 4096
        Generating public/private rsa key pair.
        Enter file in which to save the key (/root/.ssh/id_rsa):
        Created directory '/root/.ssh'.
        Enter passphrase (empty for no passphrase): 
        Enter same passphrase again:
        Your identification has been saved in /root/.ssh/id_rsa.
        Your public key has been saved in /root/.ssh/id_rsa.pub.
        
            
        ```
    
    2.  Copy the key to the `authorized_keys` directory.
        
        ``` 
                        
        root@netq-appliance:/mnt/installables# cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
        root@netq-appliance:/mnt/installables# chmod 0600 ~/.ssh/authorized_keys
        root@netq-appliance:/mnt/installables#
        
            
        ```
    
    3.  Associate the key with the installer.
        
        ``` 
                        
        root@netq-appliance:~#/mnt/installables/./netq-install.sh --usekey ~/.ssh/id_rsa
        [Fri 08 Mar 2019 06:34:47 AM UTC] - This Script can only be invoked by user: root
        [Fri 08 Mar 2019 06:34:47 AM UTC] - The logged in user is root
        [Fri 08 Mar 2019 06:34:47 AM UTC] - Install directory /mnt/installables exists on system.
        [Fri 08 Mar 2019 06:34:47 AM UTC] - File /root/.ssh/id_rsa exists on system...
        [Fri 08 Mar 2019 06:34:47 AM UTC] - checking the presence of existing instaler-ssh-keys secret/instaler-ssh-keys created
        [Fri 08 Mar 2019 06:34:48 AM UTC] - Unable to find netq-installer up and running. Sleeping for 10 seconds ...
        [Fri 08 Mar 2019 06:34:58 AM UTC] - Unable to find netq-installer up and running. Sleeping for 10 seconds ...
        [Fri 08 Mar 2019 06:35:08 AM UTC] - Able to find the netq-installer up and running...
        
            
        ```

9.  Upgrade the netq-installer pod to the 2.0.1 version.*_  
    _*
    
    ``` 
                    
    root@netq-appliance:~# /mnt/installables/./netq-install.sh --installbundle /mnt/installables/NetQ-2.0.1-installer.tgz
    
        
    ```
    
    <div class="confbox admonition admonition-info">
    
    <div class="admonition-body">
    
    {{% notice info %}} Please allow 3-4 minutes for the installer
    upgrade to complete. {{% /notice %}}
    
    </div>
    
    </div>

10. Confirm the netq-installer has been upgraded to the 2.0.1 version.
    
    ``` 
                    
    root@netq-appliance:~# kubectl get pod -l app=netq-installer -o=jsonpath={.items[0].status.containerStatuses[0].image}
    netq-installer:2.0.1
    
        
    ```

11. Upgrade the NetQ software.
    
    ``` 
                    
    root@netq-appliance:~# /mnt/installables/./netq-install.sh --appsbundle /mnt/installables/NetQ-2.0.1.tgz
     
    [Fri 08 Mar 2019 07:11:24 AM UTC] - This Script can only be invoked by user: root
    <...>
    * Closing connection 0
    {"status":"SUCCESS"}
    [Fri 08 Mar 2019 07:11:24 AM UTC] - Able to execute the command for apps installer ...
    root@netq-appliance:~#
    
        
    ```
    
    <div class="confbox admonition admonition-info">
    
    <div class="admonition-body">
    
    {{% notice info %}} Please allow about an hour for the upgrade to
    complete. {{% /notice %}}
    
    </div>
    
    </div>

You are now running NetQ 2.0.1.
