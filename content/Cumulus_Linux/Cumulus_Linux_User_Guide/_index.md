---
title: Cumulus Linux User Guide
author: Unknown
weight: 1
pageID: 8362527
aliases:
 - /old/Cumulus_Linux/Cumulus_Linux_User_Guide.html
imgData: Cumulus_Linux
siteSlug: Cumulus_Linux
---
## What is Cumulus Linux?

Cumulus Linux is the first full-featured Linux operating system for the
networking industry. The [Debian
Jessie](https://www.debian.org/releases/jessie/)-based,
networking-focused distribution runs on hardware produced by a [broad
partner ecosystem](http://cumulusnetworks.com/hcl/), ensuring unmatched
customer choice regarding silicon, optics, cables, and systems.

This user guide provides in-depth documentation on the Cumulus Linux
installation process, system configuration and management, network
solutions, and monitoring and troubleshooting recommendations. In
addition, the quick start guide provides an end-to-end setup process to
get you started.

This documentation is current as of May 7, 2019 for version 3.7.6. Visit
the [Cumulus Networks Web site](http://docs.cumulusnetworks.com) for the
most up to date documentation.

Read the [release
notes](https://cumulusnetworks.zendesk.com/knowledge/articles/360007793174)
for new features and known issues in this release.

### What's New in this Release?

For information on new features, bug fixes, and known issues present in
this release, refer to the [product release
notes](https://support.cumulusnetworks.com/hc/en-us/articles/360007793174-Cumulus-Linux-3-7-Release-Notes).

### Open Source Contributions

To implement various Cumulus Linux features, Cumulus Networks has forked
various software projects, like CFEngine, `Netdev` and some Puppet Labs
packages. The forked code resides in the Cumulus Networks [GitHub
repository](https://github.com/CumulusNetworks).

Cumulus Networks has also developed and released new applications as
open source. The list of open source projects is on the [open source
software](http://oss.cumulusnetworks.com/) page.

### Hardware Compatibility List

You can find the most up-to-date hardware compatibility list (HCL)
[here](http://cumulusnetworks.com/hcl/). Use the HCL to confirm that
your switch model is supported by Cumulus Networks. The HCL is updated
regularly, listing products by port configuration, manufacturer, and SKU
part number.

  - [Quick Start Guide](/old/Cumulus_Linux/Quick_Start_Guide.html)

  - [Installation
    Management](/old/Cumulus_Linux/Installation_Management.html)

      - [Managing Cumulus Linux Disk
        Images](/old/Cumulus_Linux/Managing_Cumulus_Linux_Disk_Images.html)

      - [Installing a New Cumulus Linux
        Image](/old/Cumulus_Linux/Installing_a_New_Cumulus_Linux_Image.html)

      - [Upgrading Cumulus
        Linux](/old/Cumulus_Linux/Upgrading_Cumulus_Linux.html)

      - [Using Snapshots](/old/Cumulus_Linux/Using_Snapshots.html)

      - [Adding and Updating
        Packages](/old/Cumulus_Linux/Adding_and_Updating_Packages.html)

      - [Zero Touch Provisioning -
        ZTP](/old/Cumulus_Linux/Zero_Touch_Provisioning_-_ZTP.html)

  - [System Configuration](/old/Cumulus_Linux/System_Configuration.html)

      - [Network Command Line Utility -
        NCLU](/old/Cumulus_Linux/Network_Command_Line_Utility_-_NCLU.html)

      - [Setting Date and
        Time](/old/Cumulus_Linux/Setting_Date_and_Time.html)

      - [Authentication, Authorization and
        Accounting](/old/Cumulus_Linux/Authentication,_Authorization_and_Accounting.html)

          - [SSH for Remote
            Access](/old/Cumulus_Linux/SSH_for_Remote_Access.html)

          - [User Accounts](/old/Cumulus_Linux/User_Accounts.html)

          - [Using sudo to Delegate
            Privileges](/old/Cumulus_Linux/Using_sudo_to_Delegate_Privileges.html)

          - [LDAP Authentication and
            Authorization](/old/Cumulus_Linux/LDAP_Authentication_and_Authorization.html)

          - [TACACS Plus](/old/Cumulus_Linux/TACACS_Plus.html)

          - [RADIUS AAA](/old/Cumulus_Linux/RADIUS_AAA.html)

      - [Netfilter - ACLs](/old/Cumulus_Linux/Netfilter_-_ACLs.html)

          - [Default Cumulus Linux ACL
            Configuration](/old/Cumulus_Linux/Default_Cumulus_Linux_ACL_Configuration.html)

          - [Filtering Learned MAC
            Addresses](/old/Cumulus_Linux/Filtering_Learned_MAC_Addresses.html)

      - [Services and Daemons in Cumulus
        Linux](/old/Cumulus_Linux/Services_and_Daemons_in_Cumulus_Linux.html)

      - [Configuring
        switchd](/old/Cumulus_Linux/Configuring_switchd.html)

      - [Power over Ethernet -
        PoE](/old/Cumulus_Linux/Power_over_Ethernet_-_PoE.html)

      - [Configuring a Global
        Proxy](/old/Cumulus_Linux/Configuring_a_Global_Proxy.html)

      - [HTTP API](/old/Cumulus_Linux/HTTP_API.html)

  - [Layer 1 and Switch
    Ports](/old/Cumulus_Linux/Layer_1_and_Switch_Ports.html)

      - [Interface Configuration and
        Management](/old/Cumulus_Linux/Interface_Configuration_and_Management.html)

          - [Switch Port
            Attributes](/old/Cumulus_Linux/Switch_Port_Attributes.html)

          - [ifplugd](/old/Cumulus_Linux/ifplugd.html)

      - [Buffer and Queue
        Management](/old/Cumulus_Linux/Buffer_and_Queue_Management.html)

          - [Hardware-enabled DDOS
            Protection](/old/Cumulus_Linux/Hardware-enabled_DDOS_Protection.html)

      - [DHCP Relays](/old/Cumulus_Linux/DHCP_Relays.html)

      - [DHCP Servers](/old/Cumulus_Linux/DHCP_Servers.html)

      - [Facebook Voyager Optical
        Interfaces](/old/Cumulus_Linux/Facebook_Voyager_Optical_Interfaces.html)

      - [802.1X Interfaces](/old/Cumulus_Linux/802.1X_Interfaces.html)

      - [Prescriptive Topology Manager -
        PTM](/old/Cumulus_Linux/Prescriptive_Topology_Manager_-_PTM.html)

  - [Layer 2](/old/Cumulus_Linux/Layer_2.html)

      - [Spanning Tree and Rapid Spanning
        Tree](/old/Cumulus_Linux/Spanning_Tree_and_Rapid_Spanning_Tree.html)

      - [Link Layer Discovery
        Protocol](/old/Cumulus_Linux/Link_Layer_Discovery_Protocol.html)

          - [Voice VLAN](/old/Cumulus_Linux/Voice_VLAN.html)

      - [Bonding - Link
        Aggregation](/old/Cumulus_Linux/Bonding_-_Link_Aggregation.html)

      - [Ethernet Bridging -
        VLANs](/old/Cumulus_Linux/Ethernet_Bridging_-_VLANs.html)

          - [VLAN-aware Bridge
            Mode](/old/Cumulus_Linux/VLAN-aware_Bridge_Mode.html)

          - [Traditional Bridge
            Mode](/old/Cumulus_Linux/Traditional_Bridge_Mode.html)

          - [VLAN Tagging](/old/Cumulus_Linux/VLAN_Tagging.html)

      - [Multi-Chassis Link Aggregation -
        MLAG](/old/Cumulus_Linux/Multi-Chassis_Link_Aggregation_-_MLAG.html)

      - [LACP Bypass](/old/Cumulus_Linux/LACP_Bypass.html)

      - [Virtual Router Redundancy - VRR and
        VRRP](/old/Cumulus_Linux/Virtual_Router_Redundancy_-_VRR_and_VRRP.html)

      - [IGMP and MLD
        Snooping](/old/Cumulus_Linux/IGMP_and_MLD_Snooping.html)

  - [Network
    Virtualization](/old/Cumulus_Linux/Network_Virtualization.html)

      - [Static VXLAN
        Configurations](/old/Cumulus_Linux/Static_VXLAN_Configurations.html)

          - [Static VXLAN
            Tunnels](/old/Cumulus_Linux/Static_VXLAN_Tunnels.html)

          - [Static MAC Bindings with
            VXLAN](/old/Cumulus_Linux/Static_MAC_Bindings_with_VXLAN.html)

      - [Ethernet Virtual Private Network -
        EVPN](/old/Cumulus_Linux/Ethernet_Virtual_Private_Network_-_EVPN.html)

      - [Lightweight Network Virtualization
        Overview](/old/Cumulus_Linux/Lightweight_Network_Virtualization_Overview.html)

          - [LNV Full Example](/old/Cumulus_Linux/LNV_Full_Example.html)

      - [VXLAN Active-Active
        Mode](/old/Cumulus_Linux/VXLAN_Active-Active_Mode.html)

      - [VXLAN Routing](/old/Cumulus_Linux/VXLAN_Routing.html)

      - [VXLAN Scale](/old/Cumulus_Linux/VXLAN_Scale.html)

      - [Hybrid Cloud Connectivity with QinQ and
        VXLANs](/old/Cumulus_Linux/Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs.html)

      - [Troubleshooting
        VXLANs](/old/Cumulus_Linux/Troubleshooting_VXLANs.html)

      - [Virtualization
        Integrations](/old/Cumulus_Linux/Virtualization_Integrations.html)

          - [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](/old/Cumulus_Linux/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html)

          - [Integrating Hardware VTEPs with VMware
            NSX-V](/old/Cumulus_Linux/Integrating_Hardware_VTEPs_with_VMware_NSX-V.html)

          - [Integrating Hardware VTEPs with VMware
            NSX-MH](/old/Cumulus_Linux/Integrating_Hardware_VTEPs_with_VMware_NSX-MH.html)

          - [OVSDB Server High
            Availability](/old/Cumulus_Linux/OVSDB_Server_High_Availability.html)

  - [Layer 3](/old/Cumulus_Linux/Layer_3.html)

      - [Routing](/old/Cumulus_Linux/Routing.html)

      - [Introduction to Routing
        Protocols](/old/Cumulus_Linux/Introduction_to_Routing_Protocols.html)

      - [Network Topology](/old/Cumulus_Linux/Network_Topology.html)

      - [FRRouting Overview](/old/Cumulus_Linux/FRRouting_Overview.html)

          - [Upgrading from Quagga to
            FRRouting](/old/Cumulus_Linux/Upgrading_from_Quagga_to_FRRouting.html)

      - [Configuring
        FRRouting](/old/Cumulus_Linux/Configuring_FRRouting.html)

          - [Comparing NCLU and vtysh
            Commands](/old/Cumulus_Linux/Comparing_NCLU_and_vtysh_Commands.html)

      - [Address Resolution Protocol -
        ARP](/old/Cumulus_Linux/Address_Resolution_Protocol_-_ARP.html)

      - [Open Shortest Path First -
        OSPF](/old/Cumulus_Linux/Open_Shortest_Path_First_-_OSPF.html)

      - [Open Shortest Path First v3 -
        OSPFv3](/old/Cumulus_Linux/Open_Shortest_Path_First_v3_-_OSPFv3.html)

      - [Border Gateway Protocol -
        BGP](/old/Cumulus_Linux/Border_Gateway_Protocol_-_BGP.html)

      - [Policy-based
        Routing](/old/Cumulus_Linux/Policy-based_Routing.html)

      - [Bidirectional Forwarding Detection -
        BFD](/old/Cumulus_Linux/Bidirectional_Forwarding_Detection_-_BFD.html)

      - [Equal Cost Multipath Load Sharing - Hardware
        ECMP](/old/Cumulus_Linux/Equal_Cost_Multipath_Load_Sharing_-_Hardware_ECMP.html)

      - [Redistribute
        Neighbor](/old/Cumulus_Linux/Redistribute_Neighbor.html)

      - [Virtual Routing and Forwarding -
        VRF](/old/Cumulus_Linux/Virtual_Routing_and_Forwarding_-_VRF.html)

      - [Management VRF](/old/Cumulus_Linux/Management_VRF.html)

      - [GRE Tunneling](/old/Cumulus_Linux/GRE_Tunneling.html)

      - [Protocol Independent Multicast -
        PIM](/old/Cumulus_Linux/Protocol_Independent_Multicast_-_PIM.html)

      - [Segment Routing](/old/Cumulus_Linux/Segment_Routing.html)

  - [Monitoring and
    Troubleshooting](/old/Cumulus_Linux/Monitoring_and_Troubleshooting.html)

      - [Single User Mode - Boot
        Recovery](/old/Cumulus_Linux/Single_User_Mode_-_Boot_Recovery.html)

      - [Resource Diagnostics Using
        cl-resource-query](/old/Cumulus_Linux/Resource_Diagnostics_Using_cl-resource-query.html)

      - [Monitoring System
        Hardware](/old/Cumulus_Linux/Monitoring_System_Hardware.html)

          - [Network Switch Port LED and Status LED
            Guidelines](/old/Cumulus_Linux/Network_Switch_Port_LED_and_Status_LED_Guidelines.html)

      - [Monitoring Virtual Device
        Counters](/old/Cumulus_Linux/Monitoring_Virtual_Device_Counters.html)

      - [ASIC Monitoring](/old/Cumulus_Linux/ASIC_Monitoring.html)

      - [Understanding the cl-support Output
        File](/old/Cumulus_Linux/Understanding_the_cl-support_Output_File.html)

          - [Troubleshooting Log
            Files](/old/Cumulus_Linux/Troubleshooting_Log_Files.html)

          - [Troubleshooting the etc
            Directory](/old/Cumulus_Linux/Troubleshooting_the_etc_Directory.html)

      - [Troubleshooting Network
        Interfaces](/old/Cumulus_Linux/Troubleshooting_Network_Interfaces.html)

          - [Monitoring Interfaces and Transceivers Using
            ethtool](/old/Cumulus_Linux/Monitoring_Interfaces_and_Transceivers_Using_ethtool.html)

          - [Monitoring Interfaces and Transceivers Using ethtool
            — ethtool Counter
            Definitions](/old/Cumulus_Linux/Monitoring_Interfaces_and_Transceivers_Using_ethtool_—%C2%A0ethtool_Counter_Definitions.html)

      - [Network
        Troubleshooting](/old/Cumulus_Linux/Network_Troubleshooting.html)

          - [Using NCLU to Troubleshoot Your Network
            Configuration](/old/Cumulus_Linux/Using_NCLU_to_Troubleshoot_Your_Network_Configuration.html)

          - [Monitoring System Statistics and Network Traffic with
            sFlow](/old/Cumulus_Linux/Monitoring_System_Statistics_and_Network_Traffic_with_sFlow.html)

      - [Simple Network Management Protocol (SNMP)
        Monitoring](/old/Cumulus_Linux/Simple_Network_Management_Protocol_\(SNMP\)_Monitoring.html)

          - [Using Nutanix Prism as a Monitoring
            Tool](/old/Cumulus_Linux/Using_Nutanix_Prism_as_a_Monitoring_Tool.html)

      - [Monitoring Best
        Practices](/old/Cumulus_Linux/Monitoring_Best_Practices.html)

      - [switchd Log Message
        Reference](/old/Cumulus_Linux/switchd_Log_Message_Reference.html)

      - [FRRouting Log Message
        Reference](/old/Cumulus_Linux/FRRouting_Log_Message_Reference.html)

  - [Network Solutions](/old/Cumulus_Linux/Network_Solutions.html)

      - [Data Center Host to ToR
        Architecture](/old/Cumulus_Linux/Data_Center_Host_to_ToR_Architecture.html)

      - [Cumulus Networks Services
        Demos](/old/Cumulus_Linux/Cumulus_Networks_Services_Demos.html)

      - [Docker on Cumulus
        Linux](/old/Cumulus_Linux/Docker_on_Cumulus_Linux.html)

      - [OpenStack Neutron ML2 and Cumulus
        Linux](/old/Cumulus_Linux/OpenStack_Neutron_ML2_and_Cumulus_Linux.html)

      - [Anycast Design
        Guide](/old/Cumulus_Linux/Anycast_Design_Guide.html)

      - [RDMA over Converged Ethernet -
        RoCE](/old/Cumulus_Linux/RDMA_over_Converged_Ethernet_-_RoCE.html)

      - [Cumulus Hyperconverged Solution with
        Nutanix](/old/Cumulus_Linux/Cumulus_Hyperconverged_Solution_with_Nutanix.html)

  - [Cumulus Linux Index](/old/Cumulus_Linux/Cumulus_Linux_Index.html)
