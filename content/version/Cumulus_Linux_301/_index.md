---
title: Cumulus Linux User Guide
author: Cumulus Networks
weight: 1
aliases:
 - /display/CL30/Cumulus+Linux_User_Guide
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301/
pageID: 5118197
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
## Welcome to Cumulus Networks

We are transforming networking with Cumulus Linux, the industry's first,
full-featured Linux operating system for networking hardware. Cumulus
Linux is a complete network operating system, based on [Debian
Jessie](https://www.debian.org/releases/jessie/) and Linux kernel 4.1.
Unlike traditional embedded platforms, Cumulus Linux provides a complete
environment pre-installed with scripting languages, server utilities,
and monitoring tools. Management tasks are accomplished via SSH using
standard Linux commands or over a serial console connection.

{{%notice tip%}}

This user guide covers Cumulus Linux 3.0.0 through 3.0.1.

{{%/notice%}}

{{\< imgOld 0 \>}}

This documentation is current as of August 26, 2016 for version 3.0.1.
Please visit the [Cumulus Networks Web
site](http://docs.cumulusnetworks.com) for the most up to date
documentation.

  - [Release Notes for Cumulus
    Linux 3.0.1](https://support.cumulusnetworks.com/hc/en-us/articles/222822047)

  - [What's New in Cumulus Linux
    3.0.1](/What's_New_in_Cumulus_Linux_3.0.1.html)

  - [Quick Start Guide](/Quick_Start_Guide.html)

  - [Installation, Upgrading and Package
    Management](/Installation,_Upgrading_and_Package_Management.html)

  - [System Management](/System_Management.html)

  - [Configuring and Managing Network
    Interfaces](/Configuring_and_Managing_Network_Interfaces.html)

  - [Layer 2 Features](/Layer_1_and_Layer_2_Features.html)

  - [Layer 3 Features](/Layer_3_Features.html)

  - [Monitoring and
    Troubleshooting](/Monitoring_and_Troubleshooting.html)

<!-- end list -->

  - [What's New in Cumulus Linux
    3.0.1](/What's_New_in_Cumulus_Linux_3.0.1.html)

  - [Quick Start Guide](/Quick_Start_Guide.html)

  - [Installation, Upgrading and Package
    Management](/Installation,_Upgrading_and_Package_Management.html)
    
      - [Managing Cumulus Linux Disk
        Images](/Managing_Cumulus_Linux_Disk_Images.html)
        
          - [Installing a New Cumulus Linux
            Image](/Installing_a_New_Cumulus_Linux_Image.html)
        
          - [Upgrading Cumulus Linux](/Upgrading_Cumulus_Linux.html)
    
      - [Adding and Updating
        Packages](/Adding_and_Updating_Packages.html)
    
      - [Zero Touch Provisioning -
        ZTP](/Zero_Touch_Provisioning_-_ZTP.html)

  - [System Management](/System_Management.html)
    
      - [Setting Date and Time](/Setting_Date_and_Time.html)
    
      - [Authentication, Authorization, and
        Accounting](/Authentication,_Authorization,_and_Accounting.html)
        
          - [SSH for Remote Access](/SSH_for_Remote_Access.html)
        
          - [User Accounts](/User_Accounts.html)
        
          - [Using sudo to Delegate
            Privileges](/Using_sudo_to_Delegate_Privileges.html)
        
          - [LDAP Authentication and
            Authorization](/LDAP_Authentication_and_Authorization.html)
    
      - [Netfilter - ACLs](/Netfilter_-_ACLs.html)
    
      - [Managing Application
        Daemons](/Managing_Application_Daemons.html)
    
      - [Configuring switchd](/Configuring_switchd.html)
    
      - [Power over Ethernet - PoE](/Power_over_Ethernet_-_PoE.html)
    
      - [Configuring a Global Proxy](/Configuring_a_Global_Proxy.html)

  - [Configuring and Managing Network
    Interfaces](/Configuring_and_Managing_Network_Interfaces.html)
    
      - [Layer 1 and Switch Port
        Attributes](/Layer_1_and_Switch_Port_Attributes.html)
    
      - [Buffer and Queue Management](/Buffer_and_Queue_Management.html)
    
      - [Configuring DHCP Relays](/Configuring_DHCP_Relays.html)

  - [Layer 1 and Layer 2 Features](/Layer_1_and_Layer_2_Features.html)
    
      - [Spanning Tree and Rapid Spanning
        Tree](/Spanning_Tree_and_Rapid_Spanning_Tree.html)
    
      - [Link Layer Discovery
        Protocol](/Link_Layer_Discovery_Protocol.html)
    
      - [Prescriptive Topology Manager -
        PTM](/Prescriptive_Topology_Manager_-_PTM.html)
    
      - [Bonding - Link Aggregation](/Bonding_-_Link_Aggregation.html)
    
      - [Ethernet Bridging - VLANs](/Ethernet_Bridging_-_VLANs.html)
        
          - [VLAN Tagging](/VLAN_Tagging.html)
        
          - [VLAN-aware Bridge Mode for Large-scale Layer 2
            Environments](/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments.html)
    
      - [Multi-Chassis Link Aggregation -
        MLAG](/Multi-Chassis_Link_Aggregation_-_MLAG.html)
    
      - [LACP Bypass](/LACP_Bypass.html)
    
      - [Virtual Router Redundancy -
        VRR](/Virtual_Router_Redundancy_-_VRR.html)
    
      - [Network Virtualization](/Network_Virtualization.html)
        
          - [Integrating with VMware
            NSX](/Integrating_with_VMware_NSX.html)
        
          - [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html)
        
          - [Lightweight Network Virtualization -
            LNV](/Lightweight_Network_Virtualization_-_LNV.html)
            
              - [LNV VXLAN Active-Active
                Mode](/LNV_VXLAN_Active-Active_Mode.html)
            
              - [LNV Full Example](/LNV_Full_Example.html)
        
          - [Static MAC Bindings with
            VXLAN](/Static_MAC_Bindings_with_VXLAN.html)
    
      - [IGMP and MLD Snooping](/IGMP_and_MLD_Snooping.html)

  - [Layer 3 Features](/Layer_3_Features.html)
    
      - [Routing](/Routing.html)
    
      - [Introduction to Routing
        Protocols](/Introduction_to_Routing_Protocols.html)
    
      - [Network Topology](/Network_Topology.html)
    
      - [Quagga Overview](/Quagga_Overview.html)
    
      - [Configuring Quagga](/Configuring_Quagga.html)
        
          - [Cumulus Linux Quagga
            Commands](/Cumulus_Linux_Quagga_Commands.html)
    
      - [Open Shortest Path First - OSPF -
        Protocol](/Open_Shortest_Path_First_-_OSPF_-_Protocol.html)
    
      - [Open Shortest Path First v3 - OSPFv3 -
        Protocol](/Open_Shortest_Path_First_v3_-_OSPFv3_-_Protocol.html)
    
      - [Border Gateway Protocol -
        BGP](/Border_Gateway_Protocol_-_BGP.html)
    
      - [Bidirectional Forwarding Detection -
        BFD](/Bidirectional_Forwarding_Detection_-_BFD.html)
    
      - [Equal Cost Multipath Load Sharing - Hardware
        ECMP](/Equal_Cost_Multipath_Load_Sharing_-_Hardware_ECMP.html)
    
      - [Redistribute Neighbor](/Redistribute_Neighbor.html)
    
      - [Virtual Routing and Forwarding -
        VRF](/Virtual_Routing_and_Forwarding_-_VRF.html)
    
      - [Management VRF](/Management_VRF.html)

  - [Monitoring and
    Troubleshooting](/Monitoring_and_Troubleshooting.html)
    
      - [Single User Mode - Boot
        Recovery](/Single_User_Mode_-_Boot_Recovery.html)
    
      - [Resource Diagnostics Using
        cl-resource-query](/Resource_Diagnostics_Using_cl-resource-query.html)
    
      - [Monitoring System Hardware](/Monitoring_System_Hardware.html)
    
      - [Monitoring Virtual Device
        Counters](/Monitoring_Virtual_Device_Counters.html)
    
      - [Understanding and Decoding the cl-support Output
        File](/Understanding_and_Decoding_the_cl-support_Output_File.html)
        
          - [Troubleshooting Log Files](/Troubleshooting_Log_Files.html)
        
          - [Troubleshooting the etc
            Directory](/Troubleshooting_the_etc_Directory.html)
        
          - [Troubleshooting the support
            Directory](/Troubleshooting_the_support_Directory.html)
    
      - [Troubleshooting Network
        Interfaces](/Troubleshooting_Network_Interfaces.html)
        
          - [Monitoring Interfaces and Transceivers Using
            ethtool](/Monitoring_Interfaces_and_Transceivers_Using_ethtool.html)
    
      - [Network Troubleshooting](/Network_Troubleshooting.html)
        
          - [Using netshow to Troubleshoot Your Network
            Configuration](/Using_netshow_to_Troubleshoot_Your_Network_Configuration.html)
        
          - [Monitoring System Statistics and Network Traffic with
            sFlow](/Monitoring_System_Statistics_and_Network_Traffic_with_sFlow.html)
    
      - [SNMP Monitoring](/SNMP_Monitoring.html)

  - [Network Solutions](/Network_Solutions.html)
    
      - [Cumulus Networks Services
        Demos](/Cumulus_Networks_Services_Demos.html)
    
      - [Docker on Cumulus Linux](/Docker_on_Cumulus_Linux.html)

  - [Cumulus Linux Index](/Cumulus_Linux_Index.html)
