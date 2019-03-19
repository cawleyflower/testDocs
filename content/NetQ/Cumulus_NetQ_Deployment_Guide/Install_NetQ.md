\--- title: author: keywords: ---

# Install NetQ

If you have purchased a NetQ Appliance, the only installation steps
required are to load the NetQ Agent on any host you want to monitor. If
you already have a Cumulus Linux switch and you want to add NetQ
functionality to it, installation involves verifying your server meets
the hardware and software requirements, loading the software onto the
switch, and then loading the agent on the
hosts.

<div id="src-8365372_InstallNetQ-Prerequisites" class="section section-1">

## Prerequisites

<div id="src-8365372_InstallNetQ-hwspecHardwareRequirements" class="section section-2">

### Hardware Requirements

NetQ is supported on the NetQ Appliance and a variety of other hardware.
Refer to the [Cumulus Hardware Compatibility
List](https://cumulusnetworks.com/products/hardware-compatibility-list/)
for the hardware supported and descriptions of the available options. In
all cases, the NetQ software requires eight (8) virtual CPUs, 64 GB of
memory, and a 256 GB SSD.

If you are *not* using the NetQ Appliance, you must open the following
ports on the NetQ server to use the NetQ software:

<div class="tablewrap">

| Port  | On Device                      | Component Access         |
| ----- | ------------------------------ | ------------------------ |
| 31980 | NetQ Server or Appliance       | NetQ Platform            |
| 32708 | NetQ Server or Appliance       | API Gateway              |
| 32666 | NetQ Server or Appliance       | Web-based User Interface |
| 8980  | Switch or Host being monitored | NetQ Agent               |

</div>

<div class="confbox admonition admonition-info">

<div class="admonition-body">

{{% notice info %}} These ports have changed from NetQ 1.4 and earlier.
{{% /notice
%}}

</div>

</div>

</div>

<div id="src-8365372_InstallNetQ-OperatingSystemRequirements" class="section section-2">

### Operating System Requirements

NetQ 2.0.1 is supported on the following operating systems:

  - Cumulus Linux 3.7.0 and later

  - Ubuntu 16.04

  - Red Hat<sup>®</sup> Enterprise Linux (RHEL) 7.1

  - CentOS
7

</div>

<div id="src-8365372_InstallNetQ-NetQApplicationSupport" class="section section-2">

### NetQ Application Support

  - NetQ CLI is supported on NetQ 1.0 and later.

  - NetQ UI is supported on NetQ 2.0.

  - RESTful API is supported on NetQ
2.0.

</div>

</div>

<div id="src-8365372_InstallNetQ-InstallWorkflow" class="section section-1">

## Install Workflow

Installation of NetQ involves installing the NetQ Platform, and
installing and configuring the NetQ Agents. Additional steps are needed
to Integrate NetQ with Event Notification Applications . This flow chart
shows the steps to install and setup NetQ to start validating your
network.

![/images/download/attachments/8365372/NetQ\_20\_Install\_Process\_Flow.png](/images/download/attachments/8365372/NetQ_20_Install_Process_Flow.png)

</div>

<div id="src-8365372_InstallNetQ-InstalltheNetQPlatform" class="section section-1">

## Install the NetQ Platform

If you *are* *not* using the NetQ Appliance, you must install the NetQ
Platform on your selected hardware. If you have deployed the NetQ
Appliance, you can skip to [Install NetQ
Agent](#src-8365372_InstallNetQ-agent).

The NetQ Platform is comprised of the following components:

  - **NetQ application**: network monitoring and analytics functionality

  - **NetQ CLI**: command line user interface for monitoring network and
    administering NetQ through a terminal session

  - **NetQ UI**: graphical interface for monitoring network and
    administering NetQ

  - **NetQ API**: Restful application programming interface for
    accessing NetQ data and integrating with third-party tools

  - **Authorization**: secure access functionality

The server is available in one of two formats:

  - Virtual:
    
      - VMware ESXi™ 6.5 virtual machine (VM)
    
      - KVM/QCOW (QEMU Copy on Write) image for use on CentOS, Ubuntu
        and RHEL hosts

  - Physical:
    
      - NetQ Appliance

<div class="confbox admonition admonition-info">

<div class="admonition-body">

{{% notice info %}} Cumulus Networks recommends you install the NetQ
software on a server that is part of an out-of-band management network
to ensure it can monitor in-band network issues without being affected
itself. Ideally, you should run the software on a separate, powerful
server for maximum usability and performance. Refer to Hardware Support
for specifics. {{% /notice %}}

</div>

</div>

<div class="confbox admonition admonition-tip">

<div class="admonition-body">

{{% notice tip %}} The NetQ Platform components reside in containers in
the VM. These containers are completely separate from any containers you
may have on the hosts you are monitoring with NetQ. The NetQ containers
do not overwrite the host containers and vice versa. {{% /notice %}}

</div>

</div>

To install the NetQ Platform image:

1.  Download the NetQ Platform image.
    
    1.  On the [Cumulus
        Downloads](https://cumulusnetworks.com/downloads/) page, select
        *NetQ Lab* from the **Product** list box.
    
    2.  Click *2.0* from the **Version** list box, and then select
        *2.0.0* from the submenu.
    
    3.  Optionally, select the hypervisor you wish to use from the
        **Hypervisor** list box.
    
    4.  Optionally, select the provider you wish to use from the
        **Provider** list
        box.
        
        ![/images/download/attachments/8365372/image2019-2-18\_10\_18\_8.png](/images/download/attachments/8365372/image2019-2-18_10_18_8.png)
        
        **Note**: If the 2.0 version option does not appear in the
        Version list box, please contact your Cumulus sales
        representative.
    
    5.  Scroll down to review the images that match your selection
        criteria, and click **Download** for the image you
        want.
        
        ![/images/download/attachments/8365372/image2019-2-18\_10\_19\_49.png](/images/download/attachments/8365372/image2019-2-18_10_19_49.png)

2.  Open your hypervisor.  
    The following steps are shown using an OVA file with VMware ESXi.

3.  Enter the address of the hardware in your browser.

4.  Log in to VMware using credentials with root
    access.  
      
    ![/images/download/attachments/8365372/image2019-2-6\_12\_6\_45.png](/images/download/attachments/8365372/image2019-2-6_12_6_45.png)

5.  Click **Create/Register VM** at the top of the right
    pane.
    
    ![/images/download/attachments/8365372/image2019-2-6\_12\_8\_30.png](/images/download/attachments/8365372/image2019-2-6_12_8_30.png)

6.  Select **Deploy a virtual machine from and OVF or OVA file**, and
    click
    **Next**.  
      
    ![/images/download/attachments/8365372/image2019-2-6\_11\_50\_38.png](/images/download/attachments/8365372/image2019-2-6_11_50_38.png)

7.  Provide a name for the VM, for example *Cumulus NetQ*.

8.  Drag and drop the NetQ Platform image file you downloaded in Step 1
    above.

9.  Click
    **Next**.
    
    ![/images/download/attachments/8365372/image2019-2-6\_11\_53\_5.png](/images/download/attachments/8365372/image2019-2-6_11_53_5.png)

10. Select the storage type and data store for the image to use, then
    click **Next**. In this example, only one is
    available.
    
    ![/images/download/attachments/8365372/image2019-2-6\_11\_54\_19.png](/images/download/attachments/8365372/image2019-2-6_11_54_19.png)

11. Accept the default deployment options or modify them according to
    your network needs. Click **Next** when you are
    finished.
    
    ![/images/download/attachments/8365372/image2019-2-6\_11\_55\_27.png](/images/download/attachments/8365372/image2019-2-6_11_55_27.png)

12. Review the configuration summary. Click **Back** to change any of
    the settings, or click **Finish** to continue with the creation of
    the
    VM.
    
    ![/images/download/attachments/8365372/image2019-2-6\_11\_58\_45.png](/images/download/attachments/8365372/image2019-2-6_11_58_45.png)
    
    The progress of the request is shown in the Recent Tasks window at
    the bottom of the application. This may take some time, so continue
    with your other work until the upload finishes.

13. Once completed, view the full details of the VM and
    hardware.
    
    ![/images/download/attachments/8365372/image2019-2-6\_12\_26\_28.png](/images/download/attachments/8365372/image2019-2-6_12_26_28.png)

14. Verify you can access the NetQ CLI.
    
    1.  From a terminal window, log in to the switch (*switch*) using
        the default credentials (*cumulus/CumulusLinux\!*).
        
        ``` 
                        
        :~$ ssh cumulus@switch
        Warning: Permanently added 'netq-appliance,10.0.0.167' (ECDSA) to the list of known hosts.
        cumulus@netq-appliance's password: 
         
        Welcome to Cumulus (R) Linux (R)
         
        For support and online technical documentation, visit
        http://www.cumulusnetworks.com/support
         
        The registered trademark Linux (R) is used pursuant to a sublicense from LMI,
        the exclusive licensee of Linus Torvalds, owner of the mark on a world-wide
        basis.
         
        cumulus@switch:~$ 
        
            
        ```
    
    2.  Run some NetQ commands.
        
        ``` 
                        
        cumulus@switch:~$ netq show lldp
        cumulus@switch:~$ netq check ntp
        
            
        ```

15. Continue the NetQ installation by loading the NetQ Agent on each
    switch or host you want to monitor. Refer to the next section for
    instructions.

</div>

<div id="src-8365372_InstallNetQ-agentInstalltheNetQAgent" class="section section-1">

## Install the NetQ Agent

Whether using the NetQ Appliance or your own hardware, the NetQ Agent
must be installed on each node you want to monitor. The node can be a:

  - Switch running Cumulus Linux version 3.7.0 or later

  - Server running Red Hat RHEL 7.1, Ubuntu 16.04 or CentOS 7

  - Linux virtual machine running any of the above Linux operating
    systems

To install the NetQ Agent you need to install the OS-specific meta
package, `cumulus-netq`, on each switch. Optionally, you can install it
on hosts. The meta package contains the NetQ Agent, the NetQ command
line interface (CLI), and the NetQ library. The library contains modules
used by both the NetQ Agent and the CLI.

Instructions for installing the meta package on each node type are
included here:

  - [Install NetQ Agent on a Cumulus Linux
    Switch](#src-8365372_InstallNetQ-AgentCL)

  - [Install NetQ Agent on an Ubuntu
    Server](#src-8365372_InstallNetQ-AgentUbuntu)

  - [Install NetQ Agent on a Red Hat or CentOS
    Server](#src-8365372_InstallNetQ-AgentRHC)

<div class="confbox admonition admonition-info">

<div class="admonition-body">

{{% notice info %}} If your network uses a proxy server for external
connections, you should first configure a global proxy so apt-get can
access the meta package on the Cumulus Networks repository . {{% /notice
%}}

</div>

</div>

<div id="src-8365372_InstallNetQ-AgentCLInstallNetQAgentonaCumulusLinuxSwitch" class="section section-2">

### Install NetQ Agent on a Cumulus Linux Switch

A simple process installs the NetQ Agent on a Cumulus switch.

1.  If you are upgrading from a prior version of NetQ, first purge the
    current NetQ Agent and application software from your switch or
    host; otherwise skip to Step 3.
    
    ``` 
                    
    cumulus@switch:~$ sudo systemctl stop netq-agent netq-agent@mgmt
    cumulus@switch:~$ sudo systemctl stop netqd netqd@mgmt
    cumulus@switch:~$ apt-get purge --auto-remove cumulus-netq netq-agent netq-apps
    
        
    ```

2.  Verify you have removed all older NetQ packages. You should not see
    any older version files.
    
    ``` 
                    
    cumulus@switch:~$ dpkg -l | grep netq
    
        
    ```

3.  Edit the `/etc/apt/sources.list` file to add the repository for
    Cumulus NetQ. Note that NetQ has a separate repository from Cumulus
    Linux.
    
    ``` 
                    
    cumulus@switch:~$ sudo nano /etc/apt/sources.list.d
    ...
    deb http://apps3.cumulusnetworks.com/repos/deb CumulusLinux-3 netq-2.0
    ...
    
        
    ```
    
    <div class="confbox admonition admonition-tip">
    
    <div class="admonition-body">
    
    {{% notice tip %}} The repository deb
    http://apps3.cumulusnetworks.com/repos/deb CumulusLinux-3
    netq-latest can be used if you want to always retrieve the latest
    posted version of NetQ. {{% /notice %}}
    
    </div>
    
    </div>

4.  Update the local `apt` repository, then install the NetQ meta
    package on the switch.
    
    ``` 
                    
    cumulus@switch:~$ sudo apt-get update && sudo apt-get install cumulus-netq
    
        
    ```

Repeat these steps for each Cumulus switch, or use an automation tool to
install NetQ Agent on multiple
nodes.

</div>

<div id="src-8365372_safe-id-SW5zdGFsbE5ldFEtQWdlbnRVYnVudHVJbnN0YWxsTmV0UUFnZW50b25hblVidW50dVNlcnZlcihPcHRpb25hbCk" class="section section-2">

### Install NetQ Agent on an Ubuntu Server (Optional)

Before you install the NetQ Agent on an Ubuntu server, make sure the
following packages are installed and running these minimum versions:

  - iproute 1:4.3.0-1ubuntu3.16.04.1 all

  - iproute2 4.3.0-1ubuntu3 amd64

  - lldpd 0.7.19-1 amd64

  - ntp 1:4.2.8p4+dfsg-3ubuntu5.6 amd64
    
    <div class="confbox admonition admonition-info">
    
    <div class="admonition-body">
    
    {{% notice info %}} Make sure you are running lldpd, not lldpad.
    Ubuntu does not include lldpd by default, which is required for the
    installation. To install this package, run the following commands:
    root@ubuntu:\~\# apt-get update root@ubuntu:\~\# apt-get install
    lldpd root@ubuntu:\~\# systemctl enable lldpd.service
    root@ubuntu:\~\# systemctl start lldpd.service {{% /notice %}}
    
    </div>
    
    </div>

To install the NetQ Agent on an Ubuntu server:

1.  If you are upgrading from a prior version of NetQ, first purge the
    current NetQ Agent and application software from your switch or
    host; otherwise skip to Step 3.
    
    ``` 
                    
    cumulus@switch:~$ sudo systemctl stop netq-agent netq-agent@mgmt
    cumulus@switch:~$ sudo systemctl stop netqd netqd@mgmt
    cumulus@switch:~$ apt-get purge --auto-remove cumulus-netq netq-agent netq-apps
    
        
    ```

2.  Verify you have removed all older NetQ packages. You should not see
    any older version files.
    
    ``` 
                    
    cumulus@switch:~$ dpkg -l | grep netq
    
        
    ```

3.  Reference and update the local `apt` repository.
    
    ``` 
                    
    root@ubuntu:~# wget -O- https://apps3.cumulusnetworks.com/setup/cumulus-apps-deb.pubkey | apt-key add -
    
        
    ```

4.  Create the file
    `/etc/apt/sources.list.d/cumulus-host-ubuntu-xenial.list` and add
    the following lines:
    
    ``` 
                    
    root@ubuntu:~# vi /etc/apt/sources.list.d/cumulus-apps-deb-xenial.list
    ...
    deb [arch=amd64] https://apps3.cumulusnetworks.com/repos/deb xenial netq-2.0
    deb [arch=amd64] https://apps3.cumulusnetworks.com/repos/deb xenial roh-3
    ...
    
        
    ```
    
    <div class="confbox admonition admonition-note">
    
    <div class="admonition-body">
    
    {{% notice note %}} The use of netq-latest in this example means
    that a get to the repository always retrieves the last version of
    NetQ, even in the case where a major version update has been made.
    If you want to keep the repository on a specific version — such as
    netq-1.4 — use that instead. {{% /notice %}}
    
    </div>
    
    </div>

5.  Install NTP on the server.
    
    ``` 
                    
    root@ubuntu:~# apt install ntp
    root@ubuntu:~# systemctl enable ntp
    root@ubuntu:~# systemctl start ntp
    
        
    ```

6.  Install the meta package on the server.
    
    ``` 
                    
    root@ubuntu:~# apt-get update ; apt-get install cumulus-netq
    
        
    ```

7.  Restart the NetQ daemon.
    
    ``` 
                    
    root@ubuntu:~# systemctl enable netqd ; systemctl restart netqd
    
        
    ```

</div>

<div id="src-8365372_safe-id-SW5zdGFsbE5ldFEtQWdlbnRSSENJbnN0YWxsTmV0UUFnZW50b25hUmVkSGF0b3JDZW50T1NTZXJ2ZXIoT3B0aW9uYWwp" class="section section-2">

### Install NetQ Agent on a Red Hat or CentOS Server (Optional)

Before you install the NetQ Agent on a Red Hat or CentOS server, make
sure the following packages are installed and running these minimum
versions:

  - iproute-3.10.0-54.el7\_2.1.x86\_64

  - lldpd-0.9.7-5.el7.x86\_64
    
    <div class="confbox admonition admonition-info">
    
    <div class="admonition-body">
    
    {{% notice info %}} Make sure you are running lldpd, not lldpad.
    CentOS does not include lldpd by default, nor does it include wget,
    which is required for the installation. To install this package, run
    the following commands: root@centos:\~\# yum -y install epel-release
    root@centos:\~\# yum -y install lldpd root@centos:\~\# systemctl
    enable lldpd.service root@centos:\~\# systemctl start lldpd.service
    root@centos:\~\# yum install wget {{% /notice %}}
    
    </div>
    
    </div>

  - ntp-4.2.6p5-25.el7.centos.2.x86\_64

  - ntpdate-4.2.6p5-25.el7.centos.2.x86\_64

To install the NetQ Agent on a Red Hat or CentOS server:

1.  If you are upgrading from a prior version of NetQ, first purge the
    current NetQ Agent and application software from your switch or
    host; otherwise skip to Step 3.
    
    ``` 
                    
    cumulus@switch:~$ sudo systemctl stop netq-agent netq-agent@mgmt
    cumulus@switch:~$ sudo systemctl stop netqd netqd@mgmt
    cumulus@switch:~$ apt-get purge --auto-remove cumulus-netq netq-agent netq-apps
    
        
    ```

2.  Verify you have removed all older NetQ packages. You should not see
    any older version files.
    
    ``` 
                    
    cumulus@switch:~$ dpkg -l | grep netq
    
        
    ```

3.  Reference and update the local `yum` repository.
    
    ``` 
                    
    root@rhel7:~# rpm --import https://apps3.cumulusnetworks.com/setup/cumulus-apps-rpm.pubkey
    root@rhel7:~# wget -O- https://apps3.cumulusnetworks.com/setup/cumulus-apps-rpm-el7.repo > /etc/yum.repos.d/cumulus-host-el.repo
    
        
    ```

4.  Edit `/etc/yum.repos.d/cumulus-host-el.repo` to set the `enabled=1`
    flag for the two NetQ repositories.
    
    ``` 
                    
    root@rhel7:~# vi /etc/yum.repos.d/cumulus-host-el.repo
    ... 
    [cumulus-arch-netq-2.0]
    name=Cumulus netq packages
    baseurl=https://apps3.cumulusnetworks.com/repos/rpm/el/7/netq-2.0/$basearch 
    gpgcheck=1
    enabled=1
    [cumulus-noarch-netq-2.0]
    name=Cumulus netq architecture-independent packages
    baseurl=https://apps3.cumulusnetworks.com/repos/rpm/el/7/netq-2.0/noarch
    gpgcheck=1
    enabled=1
    ...
    
        
    ```

5.  Install NTP on the server.
    
    ``` 
                    
    root@rhel7:~# yum install ntp
    root@rhel7:~# systemctl enable ntpd
    root@rhel7:~# systemctl start ntpd
    
        
    ```

6.  Install the Bash completion and NetQ meta packages on the server.
    
    ``` 
                    
    root@rhel7:~# yum -y install bash-completion
    root@rhel7:~# yum install cumulus-netq
    
        
    ```

7.  Restart the NetQ daemon.
    
    ``` 
                    
    root@rhel7:~# systemctl enable netqd ; systemctl restart netqd
    
        
    ```

</div>

</div>

<div id="src-8365372_InstallNetQ-SetUptheNetQAgents" class="section section-1">

## Set Up the NetQ Agents

Once the NetQ Agents have been installed on the network nodes you want
to monitor, the NetQ Agents must be configured to obtain useful and
relevant data. The code examples shown in this section illustrate how to
configure the NetQ Agent on a Cumulus switch acting as a host, but it is
exactly the same for the other type of nodes. Depending on your
deployment, follow the relevant additional instructions after the basic
configuration steps:

  - [Basic
    Configuration](https://docs.cumulusnetworks.com/display/NETQ140DRAFT/Cumulus+NetQ+1.4+Installation+Guide#CumulusNetQ1.4InstallationGuide-BasicConfig)

  - [Configuring the Agent to Use a
    VRF](#src-8365372_InstallNetQ-AgentVRF)

  - [Configuring the Agent to Communicate over a Specific
    Port](#src-8365372_InstallNetQ-port)

<div id="src-8365372_InstallNetQ-BasicConfiguration" class="section section-2">

### Basic Configuration

This is the minimum configuration required to properly monitor your
nodes.

1.  Verify that
    [NTP](https://docs.cumulusnetworks.com/display/DOCS/Setting+Date+and+Time)
    is running on the host node. Nodes must be in time synchronization
    with the NetQ Platform to enable useful statistical analysis.
    
    ``` 
                    
    cumulus@switch:~$ sudo systemctl status ntp
    [sudo] password for cumulus:
    ● ntp.service - LSB: Start NTP daemon
       Loaded: loaded (/etc/init.d/ntp; bad; vendor preset: enabled)
       Active: active (running) since Fri 2018-06-01 13:49:11 EDT; 2 weeks 6 days ago
         Docs: man:systemd-sysv-generator(8)
       CGroup: /system.slice/ntp.service
               └─2873 /usr/sbin/ntpd -p /var/run/ntpd.pid -g -c /var/lib/ntp/ntp.conf.dhcp -u 109:114
    
        
    ```

2.  Restart `rsyslog` so log files are sent to the correct destination.
    
    ``` 
                    
    cumulus@switch:~$ sudo systemctl restart rsyslog.service
    
        
    ```

3.  Link the host node to the NetQ Platform you configured above.  
    You must configure both the agent server and the cli server to link
    to the NetQ Platform. In this example, the IP address for the agent
    server is *192.168.1.254* and the IP address for the cli server is
    *192.168.1.253*.
    
    ``` 
                    
    cumulus@switch:~$ netq config add agent server 192.168.1.254
    cumulus@switch:~$ netq config add cli server 192.168.1.253
    
        
    ```
    
    This command updates the configuration in the `/etc/netq/netq.yml`
    file and enables the NetQ CLI.

4.  Restart NetQ Agent and CLI.
    
    ``` 
                    
    cumulus@switch:~$ netq config restart agent
    cumulus@switch:~$ netq config restart cli
    
        
    ```

</div>

<div id="src-8365372_safe-id-SW5zdGFsbE5ldFEtQWdlbnRWUkZDb25maWd1cmV0aGVBZ2VudHRvVXNlYVZSRihPcHRpb25hbCk" class="section section-2">

### Configure the Agent to Use a VRF (Optional)

While optional, Cumulus strongly recommends that you configure NetQ
Agents to communicate with the NetQ Platform only via a
[VRF](https://docs.cumulusnetworks.com/display/DOCS/Virtual+Routing+and+Forwarding+-+VRF),
including a [management
VRF](https://docs.cumulusnetworks.com/display/DOCS/Management+VRF). To
do so, you need to specify the VRF name when configuring the NetQ Agent.
For example, if the management VRF is configured and you want the agent
to communicate with the NetQ Platform over it, configure the agent like
this:

``` 
                
cumulus@leaf01:~$ netq config add agent server 192.168.1.254 vrf mgmt
cumulus@leaf01:~$ netq config add cli server 192.168.253 vrf mgmt

    
```

You then restart the agent as described in the previous section:

``` 
                
cumulus@leaf01:~$ netq config restart agent
cumulus@leaf01:~$ netq config restart cli

    
```

</div>

<div id="src-8365372_safe-id-SW5zdGFsbE5ldFEtcG9ydENvbmZpZ3VyZXRoZUFnZW50dG9Db21tdW5pY2F0ZW92ZXJhU3BlY2lmaWNQb3J0KE9wdGlvbmFsKQ" class="section section-2">

### Configure the Agent to Communicate over a Specific Port (Optional)

By default, NetQ uses port 8981 for communication between the NetQ
Platform and NetQ Agents. If you want the NetQ Agent to communicate with
the NetQ Platform via a different port, you need to specify the port
number when configuring the NetQ Agent like this:

``` 
                
cumulus@switch:~$ netq config add agent server 192.168.1.254 port 7379

    
```

</div>

</div>

<div id="src-8365372_InstallNetQ-EvntNotifIntIntegratewithEventNotificationTools" class="section section-1">

## Integrate with Event Notification Tools

If you want to proactively monitor events in your network, you can
integrate NetQ with PagerDuty or Slack. To do so you need to configure
both the notification application itself to receive the messages, and
the NetQ notifier with what messages to send and where to send them.
Refer to [Integrate NetQ with Event Notification
Applications](Configuring_Optional_NetQ_Capabilities) to use the CLI for
configuration.

</div>

<div id="src-8365372_InstallNetQ-SetUpSecurity" class="section section-1">

## Set Up Security

When you set up and configured your Cumulus Linux switches, you likely
configured a number of the security features available. Cumulus
recommends the same security measures be followed for the NetQ Platform
in the out-of-band-network. Refer to the Securing Cumulus Linux white
paper for details.

Your Cumulus Linux switches have a number of ports open by default. A
few additional ports must be opened to run the NetQ software (refer to
Default Open Ports in Cumulus Linux and NetQ article).

</div>
