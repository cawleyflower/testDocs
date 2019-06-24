---
title: Cumulus Linux User Guide
author: Cumulus Networks
weight: 1
aliases:
 - /display/CL35/Cumulus+Linux+User+Guide
 - /pages/viewpage.action?pageId=8357317
slug: Cumulus_Linux_User_Guide
pageID: 8357317
product: Cumulus Linux
version: '3.5'
imgData: Cumulus_Linux_35
siteSlug: Cumulus_Linux_35
---
## Introducing Cumulus Linux

Cumulus Linux is the networking industry's first full-featured Linux
operating system. The [Debian
Jessie](https://www.debian.org/releases/jessie/)-based,
networking-focused distribution runs on hardware produced by a [broad
partner ecosystem](http://cumulusnetworks.com/hcl/), ensuring unmatched
customer choice regarding silicon, optics, cables, and systems.

This user guide provides in-depth documentation covering installing
Cumulus Linux, system configuration and management, network solutions,
and monitoring and troubleshooting recommendations. In addition, the
quick start guide provides an end-to-end setup process to get you
started with Cumulus Linux.

This documentation is current as of March 2, 2018 for version 3.5.3.
Please visit the [Cumulus Networks Web
site](http://docs.cumulusnetworks.com) for the most up to date
documentation.

Read the [release
notes](https://support.cumulusnetworks.com/hc/en-us/articles/115015543848)
for new features and known issues in this release.

### What's New in Cumulus Linux 3.5

Cumulus Linux 3.5 contains a number of new platforms, features and
improvements:

  - New [platforms](https://cumulusnetworks.com/hcl) include:
    
      - Accton OMP-800 chassis/Cumulus Express CX-10256-S (100G)
    
      - Delta 9032-v1 (100G Tomahawk) and AG7648 (10G Trident II)
    
      - Broadcom Maverick-based 10G switches, including Dell S4128F-ON
    
      - Edgecore AS5812 AC with 3Y PSU
    
      - Facebook Wedge-100S now generally available
    
      - Mellanox Spectrum A1 chipsets in the 2100, 2410 and 2700 models;
        Mellanox 2740 (100G) and 2740B (40G)
    
      - Quanta LY7 (10G)
    
      - 10GBASE-LR BiDi optics

  - [Symmetric VXLAN routing](/VXLAN_Routing.html)

  - VLAN-aware bridge support for ovs-vtepd, for [VXLAN solutions using
    controllers](/Virtualization_Integrations.html)

  - OSPF is now [VRF-aware](/Virtual_Routing_and_Forwarding_-_VRF.html)

  - [Voice VLAN](/Voice_VLAN.html)

  - [PIM](/Protocol_Independent_Multicast_-_PIM.html) now supports
    overlapping IP addresses and IP multicast boundaries

  - [Bridge layer 2 protocol
    tunnels](https://support.cumulusnetworks.com/hc/en-us/articles/115015809147)

  - The SNMP
    [Cumulus-Counters-MIB](/SNMP_Monitoring.html#src-8357390_SNMPMonitoring-supported_mibs)
    file includes a new table `pfcClCountersTable` for link pause and
    priority flow control counters

  - See [what's new and different with
    NCLU](https://support.cumulusnetworks.com/hc/en-us/articles/115015593787)
    in this release

For further information regarding bug fixes and known issues present in
this release, refer to the [product release
notes](https://support.cumulusnetworks.com/hc/en-us/articles/115015543848).

### Open Source Contributions

Cumulus Networks has forked various software projects, like CFEngine,
`Netdev` and some Puppet Labs packages in order to implement various
Cumulus Linux features. The forked code resides in the Cumulus Networks
[GitHub repository](https://github.com/CumulusNetworks).

Cumulus Networks developed and released as open source some new
applications as well.

The list of open source projects is on the [open source
software](http://oss.cumulusnetworks.com/) page.

### Hardware Compatibility List

You can find the most up to date hardware compatibility list (HCL)
[here](http://cumulusnetworks.com/hcl/). Use the HCL to confirm that
your switch model is supported by Cumulus Networks. The HCL is updated
regularly, listing products by port configuration, manufacturer, and SKU
part number.

  - [Quick Start Guide](/Quick_Start_Guide.html)

  - [Installation Management](/Installation_Management.html)
    
      - [Managing Cumulus Linux Disk
        Images](/Managing_Cumulus_Linux_Disk_Images.html)
    
      - [Installing a New Cumulus Linux
        Image](/Installing_a_New_Cumulus_Linux_Image.html)
    
      - [Upgrading Cumulus Linux](/Upgrading_Cumulus_Linux.html)
    
      - [Using Snapshots](/Using_Snapshots.html)
    
      - [Adding and Updating
        Packages](/Adding_and_Updating_Packages.html)
    
      - [Zero Touch Provisioning -
        ZTP](/Zero_Touch_Provisioning_-_ZTP.html)

  - [System Configuration](/System_Configuration.html)
    
      - [Network Command Line Utility -
        NCLU](/Network_Command_Line_Utility_-_NCLU.html)
        
          - [Network Command Line
            Utility](/Network_Command_Line_Utility.html)
    
      - [Setting Date and Time](/Setting_Date_and_Time.html)
    
      - [Authentication, Authorization and
        Accounting](/Authentication,_Authorization_and_Accounting.html)
        
          - [SSH for Remote Access](/SSH_for_Remote_Access.html)
        
          - [User Accounts](/User_Accounts.html)
        
          - [Using sudo to Delegate
            Privileges](/Using_sudo_to_Delegate_Privileges.html)
        
          - [LDAP Authentication and
            Authorization](/LDAP_Authentication_and_Authorization.html)
        
          - [TACACS Plus](/TACACS_Plus.html)
        
          - [RADIUS AAA](/RADIUS_AAA.html)
    
      - [Netfilter - ACLs](/Netfilter_-_ACLs.html)
        
          - [Default Cumulus Linux ACL
            Configuration](/Default_Cumulus_Linux_ACL_Configuration.html)
        
          - [Filtering Learned MAC
            Addresses](/Filtering_Learned_MAC_Addresses.html)
    
      - [Managing Application
        Daemons](/Managing_Application_Daemons.html)
    
      - [Configuring switchd](/Configuring_switchd.html)
    
      - [Power over Ethernet - PoE](/Power_over_Ethernet_-_PoE.html)
    
      - [Configuring a Global Proxy](/Configuring_a_Global_Proxy.html)
    
      - [HTTP API](/HTTP_API.html)

  - [Interface Configuration and
    Management](/Interface_Configuration_and_Management.html)
    
      - [Layer 1 and Switch Port
        Attributes](/Layer_1_and_Switch_Port_Attributes.html)
    
      - [Buffer and Queue Management](/Buffer_and_Queue_Management.html)
        
          - [Configuring Hardware-enabled DDOS
            Protection](/Configuring_Hardware-enabled_DDOS_Protection.html)
    
      - [Configuring DHCP Relays](/Configuring_DHCP_Relays.html)
    
      - [Configuring DHCP Servers](/Configuring_DHCP_Servers.html)
    
      - [802.1X Interfaces](/802.1X_Interfaces.html)

  - [Layer 1 and 2](/Layer_1_and_2.html)
    
      - [Spanning Tree and Rapid Spanning
        Tree](/Spanning_Tree_and_Rapid_Spanning_Tree.html)
    
      - [Link Layer Discovery
        Protocol](/Link_Layer_Discovery_Protocol.html)
        
          - [Voice VLAN](/Voice_VLAN.html)
    
      - [Prescriptive Topology Manager -
        PTM](/Prescriptive_Topology_Manager_-_PTM.html)
    
      - [Bonding - Link Aggregation](/Bonding_-_Link_Aggregation.html)
    
      - [Ethernet Bridging - VLANs](/Ethernet_Bridging_-_VLANs.html)
        
          - [VLAN-aware Bridge Mode for Large-scale Layer 2
            Environments](/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments.html)
        
          - [Traditional Mode Bridges](/Traditional_Mode_Bridges.html)
        
          - [VLAN Tagging](/VLAN_Tagging.html)
    
      - [Multi-Chassis Link Aggregation -
        MLAG](/Multi-Chassis_Link_Aggregation_-_MLAG.html)
    
      - [LACP Bypass](/LACP_Bypass.html)
    
      - [Virtual Router Redundancy -
        VRR](/Virtual_Router_Redundancy_-_VRR.html)
        
          - [ifplugd](/ifplugd.html)
    
      - [IGMP and MLD Snooping](/IGMP_and_MLD_Snooping.html)

  - [Network Virtualization](/Network_Virtualization.html)
    
      - [Static VXLAN Configurations](/Static_VXLAN_Configurations.html)
        
          - [Static VXLAN Tunnels](/Static_VXLAN_Tunnels.html)
        
          - [Static MAC Bindings with
            VXLAN](/Static_MAC_Bindings_with_VXLAN.html)
    
      - [Lightweight Network Virtualization - LNV
        Overview](/Lightweight_Network_Virtualization_-_LNV_Overview.html)
        
          - [LNV VXLAN Active-Active
            Mode](/LNV_VXLAN_Active-Active_Mode.html)
        
          - [LNV Full Example](/LNV_Full_Example.html)
    
      - [Ethernet Virtual Private Network -
        EVPN](/Ethernet_Virtual_Private_Network_-_EVPN.html)
    
      - [VXLAN Routing](/VXLAN_Routing.html)
    
      - [Virtualization Integrations](/Virtualization_Integrations.html)
        
          - [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html)
        
          - [Integrating Hardware VTEPs with VMware
            NSX-V](/Integrating_Hardware_VTEPs_with_VMware_NSX-V.html)
        
          - [Integrating Hardware VTEPs with VMware
            NSX](/Integrating_Hardware_VTEPs_with_VMware_NSX.html)
    
      - [VXLAN Scale](/VXLAN_Scale.html)
    
      - [Hybrid Cloud Connectivity with QinQ and
        VXLANs](/Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs.html)

  - [Layer 3](/Layer_3.html)
    
      - [Routing](/Routing.html)
    
      - [Introduction to Routing
        Protocols](/Introduction_to_Routing_Protocols.html)
    
      - [Network Topology](/Network_Topology.html)
    
      - [FRRouting Overview](/FRRouting_Overview.html)
        
          - [Upgrading from Quagga to
            FRRouting](/Upgrading_from_Quagga_to_FRRouting.html)
    
      - [Configuring FRRouting](/Configuring_FRRouting.html)
        
          - [Comparing NCLU and vtysh
            Commands](/Comparing_NCLU_and_vtysh_Commands.html)
    
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
    
      - [Protocol Independent Multicast -
        PIM](/Protocol_Independent_Multicast_-_PIM.html)
    
      - [Segment Routing](/Segment_Routing.html)

  - [Monitoring and
    Troubleshooting](/Monitoring_and_Troubleshooting.html)
    
      - [Single User Mode - Boot
        Recovery](/Single_User_Mode_-_Boot_Recovery.html)
    
      - [Resource Diagnostics Using
        cl-resource-query](/Resource_Diagnostics_Using_cl-resource-query.html)
    
      - [Monitoring System Hardware](/Monitoring_System_Hardware.html)
        
          - [Network Switch Port LED and Status LED
            Guidelines](/Network_Switch_Port_LED_and_Status_LED_Guidelines.html)
    
      - [Monitoring Virtual Device
        Counters](/Monitoring_Virtual_Device_Counters.html)
    
      - [Buffer Monitoring](/Buffer_Monitoring.html)
    
      - [Understanding the cl-support Output
        File](/Understanding_the_cl-support_Output_File.html)
        
          - [Troubleshooting Log Files](/Troubleshooting_Log_Files.html)
        
          - [Troubleshooting the etc
            Directory](/Troubleshooting_the_etc_Directory.html)
    
      - [Troubleshooting Network
        Interfaces](/Troubleshooting_Network_Interfaces.html)
        
          - [Monitoring Interfaces and Transceivers Using
            ethtool](/Monitoring_Interfaces_and_Transceivers_Using_ethtool.html)
    
      - [Network Troubleshooting](/Network_Troubleshooting.html)
        
          - [Using NCLU to Troubleshoot Your Network
            Configuration](/Using_NCLU_to_Troubleshoot_Your_Network_Configuration.html)
        
          - [Monitoring System Statistics and Network Traffic with
            sFlow](/Monitoring_System_Statistics_and_Network_Traffic_with_sFlow.html)
    
      - [SNMP Monitoring](/SNMP_Monitoring.html)
        
          - [Using Nutanix Prism as a Monitoring
            Tool](/Using_Nutanix_Prism_as_a_Monitoring_Tool.html)
    
      - [Monitoring Best Practices](/Monitoring_Best_Practices.html)

  - [Network Solutions](/Network_Solutions.html)
    
      - [Data Center Host to ToR
        Architecture](/Data_Center_Host_to_ToR_Architecture.html)
    
      - [Cumulus Networks Services
        Demos](/Cumulus_Networks_Services_Demos.html)
    
      - [Docker on Cumulus Linux](/Docker_on_Cumulus_Linux.html)
    
      - [OpenStack Neutron ML2 and Cumulus
        Linux](/OpenStack_Neutron_ML2_and_Cumulus_Linux.html)
    
      - [Anycast Design Guide](/Anycast_Design_Guide.html)
    
      - [RDMA over Converged Ethernet -
        RoCE](/RDMA_over_Converged_Ethernet_-_RoCE.html)

  - [Cumulus Linux Index](/Cumulus_Linux_Index.html)

<article id="html-search-results" class="ht-content" style="display: none;">

</article>

<footer id="ht-footer">

</footer>
