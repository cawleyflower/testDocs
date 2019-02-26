# Install NetQ

If you have purchased a NetQ Appliance, the only installation steps
required are to load the NetQ Agent on any host you want to monitor. If
you already have a Cumulus Linux switch and you want to add NetQ
functionality to it, installation involves verifying your server meets
the hardware and software requirements, loading the software onto the
switch, and then loading the agent on the hosts.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes...

-   [Prerequisites](#InstallNetQ-Prerequisites)
    -   [Hardware Requirements](#InstallNetQ-hwspecHardwareRequirements)
    -   [Operating System
        Requirements](#InstallNetQ-OperatingSystemRequirements)
    -   [NetQ Application Support](#InstallNetQ-NetQApplicationSupport)
-   [Install Workflow](#InstallNetQ-InstallWorkflow)
-   [Install the NetQ Platform](#InstallNetQ-InstalltheNetQPlatform)
-   [Install the NetQ Agent](#InstallNetQ-agentInstalltheNetQAgent)
    -   [Install NetQ Agent on a Cumulus Linux
        Switch](#InstallNetQ-AgentCLInstallNetQAgentonaCumulusLinuxSwitch)
    -   [Install NetQ Agent on an Ubuntu Server
        (Optional)](#InstallNetQ-AgentUbuntuInstallNetQAgentonanUbuntuServer(Optional))
    -   [Install NetQ Agent on a Red Hat or CentOS Server
        (Optional)](#InstallNetQ-AgentRHCInstallNetQAgentonaRedHatorCentOSServer(Optional))
-   [Set Up the NetQ Agents](#InstallNetQ-SetUptheNetQAgents)
    -   [Basic Configuration ](#InstallNetQ-BasicConfiguration)
    -   [Configure the Agent to Use a VRF
        (Optional)](#InstallNetQ-AgentVRFConfiguretheAgenttoUseaVRF(Optional))
    -   [Configure the Agent to Communicate over a Specific Port
        (Optional)](#InstallNetQ-portConfiguretheAgenttoCommunicateoveraSpecificPort(Optional))
    -   [Enabling Docker for Container
        Environments](#InstallNetQ-AgentDockerEnablingDockerforContainerEnvironments)
-   [Integrate with Event Notification
    Tools](#InstallNetQ-EvntNotifIntIntegratewithEventNotificationTools)
-   [Set Up Security](#InstallNetQ-SetUpSecurity)

## Prerequisites

### Hardware Requirements

NetQ is supported on the NetQ Appliance and a variety of other hardware.
Refer to the [Cumulus Hardware Compatibility
List](https://cumulusnetworks.com/products/hardware-compatibility-list/)
for the hardware supported and descriptions of the available options. In
all cases, the NetQ software requires eight (8) virtual CPUs, 64 GB of
memory, and a 256 GB SSD.

### Operating System Requirements

NetQ 2.0.0 is supported on the following operating systems:

-   Cumulus Linux 3.7.0 and later
-   Ubuntu 16.04
-   Red Hat<sup>®</sup> Enterprise Linux (RHEL) 7.1
-   CentOS 7

### NetQ Application Support

-   NetQ CLI is supported on NetQ 1.0 and later.
-   NetQ UI is supported on NetQ 2.0.
-   RESTful API is supported on NetQ 2.0.

## Install Workflow

Installation of NetQ involves installing the NetQ Platform, and
installing and configuring the NetQ Agents. Additional steps are needed
to Integrate NetQ with Event Notification Applications. This flow chart
shows the steps to install and setup NetQ to start validating your
network.

![](attachments/8365372/9012820.png){width="650"}

## Install the NetQ Platform

If you *are* *not* using the NetQ Appliance, you must install the NetQ
Platform on your selected hardware. If you have deployed the NetQ
Appliance, you can skip to [Install NetQ Agent](#InstallNetQ-agent).

The NetQ Platform is comprised of the following components:

-   **NetQ application**: network monitoring and analytics functionality
-   **NetQ CLI**: command line user interface for monitoring network and
    administering NetQ through a terminal session
-   **NetQ UI**: graphical interface for monitoring network and
    administering NetQ
-   **NetQ API**: Restful application programming interface for
    accessing NetQ data and integrating with third-party tools
-   **Authorization**: secure access functionality

The server is available in one of two formats:

-   Virtual: 
    -   VMware ESXi™ 6.5 virtual machine (VM)
    -   KVM/QCOW (QEMU Copy on Write) image for use on CentOS, Ubuntu
        and RHEL hosts
-   Physical:
    -   NetQ Appliance

Best Practice

Cumulus Networks recommends you install the NetQ software on a server
that is part of an out-of-band management network to ensure it can
monitor in-band network issues without being affected itself. Ideally,
you should run the software on a separate, powerful server for maximum
usability and performance. Refer to [Hardware
Support](#InstallNetQ-hwspec) for specifics.

The NetQ Platform components reside in containers in the VM. These
containers are completely separate from any containers you may have on
the hosts you are monitoring with NetQ. The NetQ containers do not
overwrite the host containers and vice versa.

To install the NetQ Platform image:

1.  Download the NetQ Platform image. 
    1.  On the [Cumulus
        Downloads](https://cumulusnetworks.com/downloads/) page,
        select *NetQ Lab* from the **Product** list box.
    2.  Click *2.0* from the **Version** list box, and then
        select *2.0.0* from the submenu.
    3.  Optionally, select the hypervisor you wish to use from
        the **Hypervisor** list box.
    4.  Optionally, select the provider you wish to use from
        the **Provider** list box.  
          
        ![](attachments/8365372/9013552.png){height="250"}  
        **Note**: If the 2.0 version option does not appear in the
        Version list box, please contact your Cumulus sales
        representative.
    5.  Scroll down to review the images that match your selection
        criteria, and click **Download** for the image you want.  
          
        ![](attachments/8365372/9013553.png){height="250"}
2.  Open your hypervisor.  
    The following steps are shown using an OVA file with VMware ESXi.

3.  Enter the address of the hardware in your browser.

4.  Log in to VMware using credentials with root access.  
      
    ![](attachments/8365372/9012816.png){width="600"}

5.  Click **Create/Register VM** at the top of the right pane.  
    ![](attachments/8365372/9012818.png)
6.  Select **Deploy a virtual machine from and OVF or OVA file**, and
    click **Next**.  
      
    ![](attachments/8365372/9012811.png){width="600"}

7.  Provide a name for the VM, for example *Cumulus NetQ*.
8.  Drag and drop the NetQ Platform image file you downloaded in Step 1
    above.
9.  Click **Next**.  
      
    ![](attachments/8365372/9012812.png){width="600"}
10. Select the storage type and data store for the image to use, then
    click **Next**. In this example, only one is available.  
      
    ![](attachments/8365372/9012813.png){width="600"}
11. Accept the default deployment options or modify them according to
    your network needs. Click **Next** when you are finished.  
      
    ![](attachments/8365372/9012814.png){width="600"}
12. Review the configuration summary. Click **Back** to change any of
    the settings, or click **Finish** to continue with the creation of
    the VM.  
      
    ![](attachments/8365372/9012815.png){width="600"}  
    The progress of the request is shown in the Recent Tasks window at
    the bottom of the application. This may take some time, so continue
    with your other work until the upload finishes.
13. Once completed, view the full details of the VM and hardware.  
    ![](attachments/8365372/9012819.png){width="600"}
14. Verify you can access the NetQ CLI. 

    1.  From a terminal window, log in to the switch (*switch*) using
        the default credentials (*cumulus/CumulusLinux!*).

        ``` plain
        <computer>:~<username>$ ssh cumulus@switch
        Warning: Permanently added 'netq-appliance,10.0.0.167' (ECDSA) to the list of known hosts.
        cumulus@netq-appliance's password: <enter CumulusLinux! here>

        Welcome to Cumulus (R) Linux (R)

        For support and online technical documentation, visit
        http://www.cumulusnetworks.com/support

        The registered trademark Linux (R) is used pursuant to a sublicense from LMI,
        the exclusive licensee of Linus Torvalds, owner of the mark on a world-wide
        basis.

        cumulus@switch:~$ 
        ```

    2.  Run some NetQ commands.

        ``` plain
        cumulus@switch:~$ netq show lldp
        cumulus@switch:~$ netq check ntp
        ```

15. Continue the NetQ installation by loading the NetQ Agent on each
    switch or host you want to monitor. Refer to the next section for
    instructions.

## Install the NetQ Agent

Whether using the NetQ Appliance or your own hardware, the NetQ Agent
must be installed on each node you want to monitor.  The node can be a:

-   Switch running Cumulus Linux version 3.7.0 or later
-   Server running Red Hat RHEL 7.1, Ubuntu 16.04 or CentOS 7
-   Linux virtual machine running any of the above Linux operating
    systems

To install the NetQ Agent you need to install the OS-specific meta
package, `cumulus-netq`, on each switch. Optionally, you can install it
on hosts. The meta package contains the NetQ Agent, the NetQ command
line interface (CLI), and the NetQ library. The library contains modules
used by both the NetQ Agent and the CLI.

Instructions for installing the meta package on each node type are
included here:

-   [Install NetQ Agent on a Cumulus Linux Switch](#InstallNetQ-AgentCL)
-   [Install NetQ Agent on an Ubuntu Server](#InstallNetQ-AgentUbuntu)
-   [Install NetQ Agent on a Red Hat or CentOS
    Server](#InstallNetQ-AgentRHC)

If your network uses a proxy server for external connections, you should
first configure a global proxy so apt-get can access the meta package on
the Cumulus Networks repository.

### Install NetQ Agent on a Cumulus Linux Switch

A simple two-step process installs the NetQ Agent on a Cumulus switch.

1.  On a switch, edit `/etc/apt/sources.list` to add the repository for
    Cumulus NetQ. Note that NetQ has a separate repository from Cumulus
    Linux.

    ``` text
    cumulus@leaf01:~$ sudo nano /etc/apt/sources.list.d
    ...
    deb http://apps3.cumulusnetworks.com/repos/deb CumulusLinux-3 netq-2.0
    ...
    ```

    The repository
    `deb http://apps3.cumulusnetworks.com/repos/deb CumulusLinux-3 netq-latest`
    can be used if you want to always retrieve the latest posted version
    of NetQ.

2.  Update the local `apt` repository, then install the NetQ meta
    package on the switch. 

    ``` text
    cumulus@leaf01:~$ sudo apt-get update && sudo apt-get install cumulus-netq
    ```

Repeat these steps for each node, or use an automation tool to install
NetQ Agent on multiple nodes. Refer to [Deployment
Appendices](https://docs.cumulusnetworks.com/pages/viewpage.action?pageId=8365385)
for an example Ansible playbook.

### Install NetQ Agent on an Ubuntu Server (Optional)

Before you install the NetQ Agent on an Ubuntu server, make sure the
following packages are installed and running these minimum versions:

-   iproute 1:4.3.0-1ubuntu3.16.04.1 all
-   iproute2 4.3.0-1ubuntu3 amd64
-   lldpd 0.7.19-1 amd64

-   ntp 1:4.2.8p4+dfsg-3ubuntu5.6 amd64
-   docker-ce 17.06.1\~ce-0\~ubuntu amd64

    This package is required only if you plan to monitor Docker
    instances on the host; otherwise do not install it.

    Make sure you are running lldp**d**, not lldp**ad**. Ubuntu does not
    include `lldpd` by default, which is required for the installation.
    To install this package, run the following commands:

    ``` text
    root@ubuntu:~# apt-get update
    root@ubuntu:~# apt-get install lldpd
    root@ubuntu:~# systemctl enable lldpd.service
    root@ubuntu:~# systemctl start lldpd.service
    ```

To install the NetQ Agent on an Ubuntu server:

1.  Reference and update the local `apt` repository.

    ``` text
    root@ubuntu:~# wget -O- https://apps3.cumulusnetworks.com/setup/cumulus-apps-deb.pubkey | apt-key add -
    ```

2.  Create the
    file `/etc/apt/sources.list.d/cumulus-host-ubuntu-xenial.list` and
    add the following lines:

    ``` text
    root@ubuntu:~# vi /etc/apt/sources.list.d/cumulus-apps-deb-xenial.list
    ...
    deb [arch=amd64] https://apps3.cumulusnetworks.com/repos/deb xenial netq-latest
    deb [arch=amd64] https://apps3.cumulusnetworks.com/repos/deb xenial roh-3
    ...
    ```

    The use of `netq-latest` in this example means that a get to the
    repository always retrieves the last version of NetQ, even in the
    case where a major version update has been made. If you want to keep
    the repository on a specific version — such as `netq-1.4` — use that
    instead.

3.  Install NTP on the server.

    ``` text
    root@ubuntu:~# apt install ntp
    root@ubuntu:~# systemctl enable ntp
    root@ubuntu:~# systemctl start ntp
    ```

4.  Install the meta package on the server.

    ``` text
    root@ubuntu:~# apt-get update ; apt-get install cumulus-netq
    ```

5.  Restart the NetQ daemon.

    ``` text
    root@ubuntu:~# systemctl enable netqd ; systemctl restart netqd
    ```

### Install NetQ Agent on a Red Hat or CentOS Server (Optional)

Before you install the NetQ Agent on a Red Hat or CentOS server, make
sure the following packages are installed and running these minimum
versions:

-   iproute-3.10.0-54.el7\_2.1.x86\_64
-   lldpd-0.9.7-5.el7.x86\_64

    Make sure you are running lldp**d**, not lldp**ad**.

    CentOS does not include `lldpd` by default, nor does it include
    `wget`, which is required for the installation. To install this
    package, run the following commands:

    ``` text
    root@centos:~# yum -y install epel-release
    root@centos:~# yum -y install lldpd
    root@centos:~# systemctl enable lldpd.service
    root@centos:~# systemctl start lldpd.service
    root@centos:~# yum install wget
    ```

-   ntp-4.2.6p5-25.el7.centos.2.x86\_64
-   ntpdate-4.2.6p5-25.el7.centos.2.x86\_64

To install the NetQ Agent on a Red Hat or CentOS server:

1.  Reference and update the local `yum` repository.

    ``` text
    root@rhel7:~# rpm --import https://apps3.cumulusnetworks.com/setup/cumulus-apps-rpm.pubkey
    root@rhel7:~# wget -O- https://apps3.cumulusnetworks.com/setup/cumulus-apps-rpm-el7.repo > /etc/yum.repos.d/cumulus-host-el.repo
    ```

2.  Edit `/etc/yum.repos.d/cumulus-host-el.repo` to set
    the `enabled=1` flag for the two NetQ repositories.

    ``` text
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

3.  Install NTP on the server.

    ``` text
    root@rhel7:~# yum install ntp
    root@rhel7:~# systemctl enable ntpd
    root@rhel7:~# systemctl start ntpd
    ```

4.  Install the Bash completion and NetQ meta packages on the server.

    ``` text
    root@rhel7:~# yum -y install bash-completion
    root@rhel7:~# yum install cumulus-netq
    ```

5.  Restart the NetQ daemon.

    ``` text
    root@rhel7:~# systemctl enable netqd ; systemctl restart netqd
    ```

## Set Up the NetQ Agents

Once the NetQ Agents have been installed on the network nodes you want
to monitor, the NetQ Agents must be configured to obtain useful and
relevant data. The code examples shown in this section illustrate how to
configure the NetQ Agent on a Cumulus switch acting as a host, but it
is exactly the same for the other type of nodes. Depending on your
deployment, follow the relevant additional instructions after the basic
configuration steps:

-   [Basic
    Configuration](https://docs.cumulusnetworks.com/display/NETQ140DRAFT/Cumulus+NetQ+1.4+Installation+Guide#CumulusNetQ1.4InstallationGuide-BasicConfig)
-   [Configuring the Agent to Use a VRF](#InstallNetQ-AgentVRF)
-   [Configuring the Agent to Communicate over a Specific
    Port](#InstallNetQ-port)
-   [Enabling Docker for Container
    Environments](#InstallNetQ-AgentDocker)

### Basic Configuration 

This is the minimum configuration required to properly monitor your
nodes.

1.  Verify
    that [NTP](https://docs.cumulusnetworks.com/display/DOCS/Setting+Date+and+Time) is
    running on the host node. Nodes must be in time synchronization with
    the NetQ Platform to enable useful statistical analysis.

    ``` text
    cumulus@switch:~$ sudo systemctl status ntp
    [sudo] password for cumulus:
    ● ntp.service - LSB: Start NTP daemon
       Loaded: loaded (/etc/init.d/ntp; bad; vendor preset: enabled)
       Active: active (running) since Fri 2018-06-01 13:49:11 EDT; 2 weeks 6 days ago
         Docs: man:systemd-sysv-generator(8)
       CGroup: /system.slice/ntp.service
               └─2873 /usr/sbin/ntpd -p /var/run/ntpd.pid -g -c /var/lib/ntp/ntp.conf.dhcp -u 109:114
    ```

2.  Restart `rsyslog` so log files are sent to the correct destination.
    ``` text
    cumulus@switch:~$ sudo systemctl status ntp
    ```

3.  Link the host node to the NetQ Platform you configured above.  
    In this code example, the IP address for the NetQ
    Platform is *198.168.1.254.  *Note: Run ifconfig eth0 on the NetQ
    Platform if you forgot to write down the address.

     

    ``` text
    cumulus@switch:~$ netq config add agent server 198.168.1.254
    ```

    This command updates the configuration in
    the `/etc/netq/netq.yml` file and enables the NetQ CLI.

4.  Restart NetQ Agent.

     

    ``` text
    cumulus@switch:~$ netq config restart agent
    ```

     

    If you see the following error, it means you haven't added the NetQ
    Platform or the server wasn't configured:

    ``` text
    Error: Please specify IP address of DB server
    ```

5.  Verify NetQ Agent can reach the NetQ Platform.

     

    ``` text
    cumulus@switch:~$ netq config show server
    ```

### Configure the Agent to Use a VRF (Optional)

While optional, Cumulus strongly recommends that you configure NetQ
Agents to communicate with the NetQ Platform only via
a [VRF](https://docs.cumulusnetworks.com/display/DOCS/Virtual+Routing+and+Forwarding+-+VRF),
including a [management
VRF](https://docs.cumulusnetworks.com/display/DOCS/Management+VRF). To
do so, you need to specify the VRF name when configuring the NetQ Agent.
For example, if the management VRF is configured and you want the agent
to communicate with the NetQ Platform over it, configure the agent like
this: 

``` text
cumulus@leaf01:~$ netq config add agent server 198.168.1.254 vrf mgmt
cumulus@leaf01:~$ netq config add cli server 198.168.253 vrf mgmt
```

  
You then restart the agent as described in the previous section: 

``` text
cumulus@leaf01:~$ netq config restart agent
cumulus@leaf01:~$ netq config restart cli
```

### Configure the Agent to Communicate over a Specific Port (Optional)

By default, NetQ uses port 6379 for communication between the NetQ
Platform and NetQ Agents. If you want the NetQ Agent to communicate with
the NetQ Platform via a different port, you need to specify the port
number when configuring the NetQ Agent like this: 

``` text
cumulus@switch:~$ netq config add agent server 198.168.1.254 port 7379
```

If you are using NetQ in high availability mode, you can only configure
it on port 6379 or 26379.

### Enabling Docker for Container Environments

Before enabling Docker, you must first install Docker. The code examples
used here were created on an Ubuntu 16.04 host. 

To install and enable Docker:

1.  Add the Docker repository key.

    ``` text
    root@host:~# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    ```

2.  Install the Docker repository.

    ``` text
    root@host:~# echo "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
    ```

3.  Update the package lists.

    ``` text
    root@host:~# apt-get update
    ```

4.  Install Docker on the Ubuntu host.

    ``` text
    root@host:~# apt-get install -y docker-ce
    ```

5.  Check that the Docker service is running on the Ubuntu 16.04 host.

    ``` text
    root@host:~# systemctl status docker
    ● docker.service - Docker Application Container Engine
       Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
       Active: active (running) since Wed 2017-10-18 02:51:48 UTC; 1min 42s ago
         Docs: https://docs.docker.com
     Main PID: 18661 (dockerd)
       CGroup: /system.slice/docker.service
               ├─18661 /usr/bin/dockerd -H fd://
               └─18666 docker-containerd -l unix:///var/run/docker/libcontainerd/docker-containerd.sock --metrics-interval=0 --start-timeout 2m --state-dir /var/run/docker/libcontainerd/containerd --shim docker-containerd-shim --runtime docker-runc
    ```

6.  **Optional: **Add the docker group to your user account to be able
    to run docker commands without using `sudo`.

    ``` plain
    user@host:~$ sudo adduser ${USER} docker
    ```

    Adding groups to different users requires a logout and login to take
    effect.

7.  Enable Docker by adding the following three lines to
    the `netq.yml` file on the container host. This command also sets
    how often to pull data from the container to every 15 seconds.

    ``` text
    root@host:~# vi /etc/netq/netq.yml
      
    ...
    docker:
      enable: true
      poll_period: 15
    ...
    ```

## Integrate with Event Notification Tools

If you want to proactively monitor events in your network, you can
integrate NetQ with PagerDuty or Slack. To do so you need to configure
both the notification application itself to receive the messages, and
the NetQ notifier with what messages to send and where to send them.
Refer to [Integrate NetQ with Event Notification
Applications](Configuring_Optional_NetQ_Capabilities) to use the CLI for
configuration.

## Set Up Security

When you set up and configured your Cumulus Linux switches, you likely
configured a number of the security features available. Cumulus
recommends the same security measures be followed for the NetQ Platform
in the out-of-band-network. Refer to the  Securing Cumulus Linux white
paper for details.

Your Cumulus Linux switches have a number of ports open (refer to
Default Open Ports in Cumulus Linux article).                           
         

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ Install
Process Flow.png](attachments/8365372/8365378.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-16
13:11:57.png](attachments/8365372/8365377.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-16
17:15:28.png](attachments/8365372/8365376.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-16
17:47:33.png](attachments/8365372/8365375.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-10-3
19:3:41.png](attachments/8365372/8365374.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-10-3
19:4:52.png](attachments/8365372/8365373.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-10-3
19:6:7.png](attachments/8365372/8365371.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ 20 Install
Process Flow.xml](attachments/8365372/9012636.xml) (text/xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-31
15:49:9.png](attachments/8365372/9012637.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
11:50:38.png](attachments/8365372/9012811.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
11:53:5.png](attachments/8365372/9012812.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
11:54:19.png](attachments/8365372/9012813.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
11:55:27.png](attachments/8365372/9012814.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
11:58:45.png](attachments/8365372/9012815.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
12:6:45.png](attachments/8365372/9012816.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
12:7:55.png](attachments/8365372/9012817.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
12:8:30.png](attachments/8365372/9012818.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
12:26:28.png](attachments/8365372/9012819.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ 20 Install
Process Flow.png](attachments/8365372/9012894.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ 20 Install
Process Flow.png](attachments/8365372/9012820.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-18
10:10:42.png](attachments/8365372/9013549.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-18
10:17:14.png](attachments/8365372/9013551.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-18
10:18:8.png](attachments/8365372/9013552.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-18
10:19:49.png](attachments/8365372/9013553.png) (image/png)  
