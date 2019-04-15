---
title: Cumulus Linux User Guide
author: Unknown
weight: 1
pageID: 8362527
---
# Cumulus Linux User Guide

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

This documentation is current as of March 27, 2019 for version 3.7.4.
Visit the [Cumulus Networks Web site](http://docs.cumulusnetworks.com)
for the most up to date documentation.

Read the [release
notes](https://cumulusnetworks.zendesk.com/knowledge/articles/360007793174)
for new features and known issues in this release.

### What's New in Cumulus Linux 3.7.4

Cumulus Linux 3.7.4 contains a number of new platforms, features and
improvements:

  - New [platforms](https://cumulusnetworks.com/hcl) include:
    
      - [FS.com](http://FS.com) N8500-48B6C (25G Tomahawk+)

  - [Virtual Router Redundancy Protocol
    (VRRP)](Virtual_Router_Redundancy_-_VRR_and_VRRP.html#src-8362691_VirtualRouterRedundancy-VRRandVRRP-VRRP)

  - [Dynamic VRF route
    leaking](Virtual_Routing_and_Forwarding_-_VRF.html#src-8362942_VirtualRoutingandForwarding-VRF-routeleaking)
    is now supported for EVPN

  - [802.1X Multi Domain Authentication (MDA)](802.1X_Interfaces.html)
    is supported for phone and PCs connected to the same port

  - [Multiple Dynamic Authorization Server
    (DAS)](802.1X_Interfaces.html#src-8363046_id-802.1XInterfaces-CoArequests)
    support

  - [IGMP/MLD snooping](IGMP_and_MLD_Snooping.html) is supported over
    VXLAN bridges on Broadcom switches

  - NCLU commands support [MLAG
    unnumbered](Multi-Chassis_Link_Aggregation_-_MLAG.html)

  - [Ability to disable FEC on Mellanox
    switches](Switch_Port_Attributes.html#src-8363026_SwitchPortAttributes-FEC)

  - [Lightweight network virtualization
    (LNV)](Lightweight_Network_Virtualization_Overview.html) has been
    deprecated. The feature will be removed in Cumulus Linux 4.0.
    Cumulus Networks recommends you use [Ethernet virtual private
    network (EVPN)](Ethernet_Virtual_Private_Network_-_EVPN.html) for
    network virtualization.

### What's New in Cumulus Linux 3.7.3

Cumulus Linux 3.7.3 contains a number of new platforms, features and
improvements:

  - New [platforms](https://cumulusnetworks.com/hcl) include:
    
      - Dell Z9264F-ON (100G Broadcom Tomahawk2)
    
      - Edgecore AS7816-64X (100G Broadcom Tomahawk2)
    
      - Edgecore AS7726-32X (100G Broadcom Trident3)
    
      - Edgecore AS7326-56X (25G Broadcom Trident3)
    
      - HPE SN2700M (100G Mellanox Spectrum)
    
      - HPE SN2100M (100G Mellanox Spectrum)
    
      - HPE SN2410M (25G Mellanox Spectrum)
    
      - Lenovo NE0152TO (1G Broadcom Helix4) now generally available
    
      - Penguin Arctica NX4804x (10G Broadcom Maverick)

  - The [EVPN duplicate address
    detection](Ethernet_Virtual_Private_Network_-_EVPN.html#src-8362732_EthernetVirtualPrivateNetwork-EVPN-dad)
    freeze option lets you freeze a duplicate address permanently or for
    a certain amount of time

  - The [Cumulus Hyperconverged Solution
    (HCS)](Cumulus_Hyperconverged_Solution_with_Nutanix.html) supports
    automated integration with the Nutanix Prism Management solution and
    the Nutanix AHV hypervisor

### What's New in Cumulus Linux 3.7.2

Cumulus Linux 3.7.2 contains a number of new platforms, features and
improvements:

  - New [platforms](https://cumulusnetworks.com/hcl) include:
    
      - Dell S5232F-ON (100G Trident3)
    
      - Delta AG9032v2 (100G Trident3)
    
      - Lenovo NE10032O (100G Tomahawk)
    
      - Lenovo NE2572O (25G Tomahawk+) - swp1 thru swp8 support 25G
        speed only
    
      - Lenovo NE0152TO (1G Helix4) - available for Early Access

  - On Facebook Voyager, the NCLU `net show transponder` command output
    shows the [Optical Signal to Noise ratio
    (OSNR)](Facebook_Voyager_Optical_Interfaces.html#src-8363049_FacebookVoyagerOpticalInterfaces-showTransponderStatus)
    in the network

  - Support for [egress IPv6 ACL
    rules](Netfilter_-_ACLs.html#src-8362563_Netfilter-ACLs-ipv6EgressRules)
    on Broadcom switches

  - Support for [VRF route leaking on Mellanox
    switches](Virtual_Routing_and_Forwarding_-_VRF.html#src-8362942_VirtualRoutingandForwarding-VRF-routeleaking)

  - [RFC 5549 support with global IPv6
    peers](Border_Gateway_Protocol_-_BGP.html#src-8362926_BorderGatewayProtocol-BGP-rfc-5549)

  - [EVPN duplicate address
    detection](Ethernet_Virtual_Private_Network_-_EVPN.html#src-8362732_EthernetVirtualPrivateNetwork-EVPN-dad)

  - New TCAM profile for Mellanox switches
    ([ip-acl-heavy](Netfilter_-_ACLs.html#src-8362563_Netfilter-ACLs-MS-limits))
    to support creation of 16K 3-tuple and 5-tuple IPv4 ACLs

### What's New in Cumulus Linux 3.7.1

Cumulus Linux 3.7.1 contains bug fixes only.

### What's New in Cumulus Linux 3.7.0

Cumulus Linux 3.7.0 contains a number of new platforms, features and
improvements:

  - New [platforms](https://cumulusnetworks.com/hcl) include:
    
      - QCT QuantaMesh BMS T4048-IX8 (25G Trident3)
    
      - QCT QuantaMesh BMS T7032-IX7 (100G Trident3)
    
      - Dell S5248F-ON (25G Trident3)
    
      - Penguin Arctica 4806xt (10G Trident 2+)

  - [Line side
    loopback](Facebook_Voyager_Optical_Interfaces.html#src-8363049_FacebookVoyagerOpticalInterfaces-lineSideLoopback)
    and [Terminal
    loopback](Facebook_Voyager_Optical_Interfaces.html#src-8363049_FacebookVoyagerOpticalInterfaces-terminalLoopback)
    mode for Facebook Voyager troubleshooting

  - OVSDB Server High Availability (Early Access)

  - [RADIUS Change of Authorization (CoA)
    requests](802.1X_Interfaces.html#src-8363046_id-802.1XInterfaces-CoArequests)

  - RADIUS AAA local fallback authentication

  - TACACS+ local fallback authentication

  - EVPN enhancements
    
      - [Neighbor Discovery (ND) Extended
        Community](Ethernet_Virtual_Private_Network_-_EVPN.html#src-8362732_EthernetVirtualPrivateNetwork-EVPN-ND_extended_community)
        support
    
      - Extended mobility support
    
      - ECMP support for overlay networks on RIOT-capable Broadcom
        switches

  - New NCLU commands:
    
      - [Show the version of a
        package](Adding_and_Updating_Packages.html#src-8362631_AddingandUpdatingPackages-versionDisplay)
    
      - Show the interface description (alias) for all interfaces on the
        switch
    
      - Show which interfaces are in a VRF and the VNIs for VRF
        interfaces
    
      - Change bond mode to IEEE 802.3ad link aggregation mode

For information on bug fixes and known issues present in this release,
refer to the [product release
notes](https://support.cumulusnetworks.com/hc/en-us/articles/360007793174-Cumulus-Linux-3-7-Release-Notes).

### Open Source Contributions

<span id="src-8362527_indexterm-817213A88880AEC13452290445FA6C2F">To
implement various Cumulus Linux features, Cumulus Networks has forked
various </span>software projects, like CFEngine, `Netdev` and some
Puppet Labs packages. The forked code resides in the Cumulus Networks
[GitHub repository](https://github.com/CumulusNetworks).

Cumulus Networks has also developed and released new applications as
open source. The list of open source projects is on the [open source
software](http://oss.cumulusnetworks.com/) page.

### Hardware Compatibility List

<span id="src-8362527_indexterm-8276DDF95B65CCB943B2DB06106F0DD5">You
can find the most up-to-date
</span><span id="src-8362527_indexterm-DD8C5327E1108E16338A81BBD56EA0FC">hardware
</span>compatibility list (HCL) [here](http://cumulusnetworks.com/hcl/).
Use the HCL to confirm that your switch model is supported by Cumulus
Networks. The HCL is updated regularly, listing products by port
configuration, manufacturer, and SKU part number.

{{%notice tip%}}

This section exists solely to provide a list of all the pages of the
user guide and is visible only to Cumulus employees who are designated
as **editors** in Confluence. This TOC is copied into a [Zendesk KB
article](https://support.cumulusnetworks.com/hc/en-us/articles/115015334927).
This should help GSS with case avoidance, since the KB article is
searchable by customers about to file a ticket in Zendesk.

{{%/notice%}}

  - [Quick Start Guide](Quick_Start_Guide.html)

  - [Installation Management](Installation_Management.html)
    
      - [Managing Cumulus Linux Disk
        Images](Managing_Cumulus_Linux_Disk_Images.html)
    
      - [Installing a New Cumulus Linux
        Image](Installing_a_New_Cumulus_Linux_Image.html)
    
      - [Upgrading Cumulus Linux](Upgrading_Cumulus_Linux.html)
    
      - [Using Snapshots](Using_Snapshots.html)
    
      - [Adding and Updating
        Packages](Adding_and_Updating_Packages.html)
    
      - [Zero Touch Provisioning -
        ZTP](Zero_Touch_Provisioning_-_ZTP.html)

  - [System Configuration](System_Configuration.html)
    
      - [Network Command Line Utility -
        NCLU](Network_Command_Line_Utility_-_NCLU.html)
    
      - [Setting Date and Time](Setting_Date_and_Time.html)
    
      - [Authentication, Authorization and
        Accounting](Authentication,_Authorization_and_Accounting.html)
        
          - [SSH for Remote Access](SSH_for_Remote_Access.html)
        
          - [User Accounts](User_Accounts.html)
        
          - [Using sudo to Delegate
            Privileges](Using_sudo_to_Delegate_Privileges.html)
        
          - [LDAP Authentication and
            Authorization](LDAP_Authentication_and_Authorization.html)
        
          - [TACACS Plus](TACACS_Plus.html)
        
          - [RADIUS AAA](RADIUS_AAA.html)
    
      - [Netfilter - ACLs](Netfilter_-_ACLs.html)
        
          - [Default Cumulus Linux ACL
            Configuration](Default_Cumulus_Linux_ACL_Configuration.html)
        
          - [Filtering Learned MAC
            Addresses](Filtering_Learned_MAC_Addresses.html)
    
      - [Services and Daemons in Cumulus
        Linux](Services_and_Daemons_in_Cumulus_Linux.html)
    
      - [Configuring switchd](Configuring_switchd.html)
    
      - [Power over Ethernet - PoE](Power_over_Ethernet_-_PoE.html)
    
      - [Configuring a Global Proxy](Configuring_a_Global_Proxy.html)
    
      - [Copy of Netfilter - ACLs](Copy_of_Netfilter_-_ACLs.html)
    
      - [HTTP API](HTTP_API.html)

  - [Layer 1 and Switch Ports](Layer_1_and_Switch_Ports.html)
    
      - [Interface Configuration and
        Management](Interface_Configuration_and_Management.html)
        
          - [Switch Port Attributes](Switch_Port_Attributes.html)
    
      - [Buffer and Queue Management](Buffer_and_Queue_Management.html)
        
          - [Hardware-enabled DDOS
            Protection](Hardware-enabled_DDOS_Protection.html)
    
      - [DHCP Relays](DHCP_Relays.html)
    
      - [DHCP Servers](DHCP_Servers.html)
    
      - [Facebook Voyager Optical
        Interfaces](Facebook_Voyager_Optical_Interfaces.html)
    
      - [802.1X Interfaces](802.1X_Interfaces.html)
    
      - [Prescriptive Topology Manager -
        PTM](Prescriptive_Topology_Manager_-_PTM.html)

  - [Layer 2](Layer_2.html)
    
      - [Spanning Tree and Rapid Spanning
        Tree](Spanning_Tree_and_Rapid_Spanning_Tree.html)
    
      - [Link Layer Discovery
        Protocol](Link_Layer_Discovery_Protocol.html)
        
          - [Voice VLAN](Voice_VLAN.html)
    
      - [Bonding - Link Aggregation](Bonding_-_Link_Aggregation.html)
    
      - [Ethernet Bridging - VLANs](Ethernet_Bridging_-_VLANs.html)
        
          - [VLAN-aware Bridge Mode](VLAN-aware_Bridge_Mode.html)
        
          - [Traditional Bridge Mode](Traditional_Bridge_Mode.html)
        
          - [VLAN Tagging](VLAN_Tagging.html)
    
      - [Multi-Chassis Link Aggregation -
        MLAG](Multi-Chassis_Link_Aggregation_-_MLAG.html)
    
      - [LACP Bypass](LACP_Bypass.html)
    
      - [Virtual Router Redundancy - VRR and
        VRRP](Virtual_Router_Redundancy_-_VRR_and_VRRP.html)
        
          - [ifplugd](ifplugd.html)
    
      - [IGMP and MLD Snooping](IGMP_and_MLD_Snooping.html)
    
      - [Copy of Prescriptive Topology Manager -
        PTM](Copy_of_Prescriptive_Topology_Manager_-_PTM.html)
    
      - [Copy of Spanning Tree and Rapid Spanning
        Tree](Copy_of_Spanning_Tree_and_Rapid_Spanning_Tree.html)

  - [Network Virtualization](Network_Virtualization.html)
    
      - [Static VXLAN Configurations](Static_VXLAN_Configurations.html)
        
          - [Static VXLAN Tunnels](Static_VXLAN_Tunnels.html)
        
          - [Static MAC Bindings with
            VXLAN](Static_MAC_Bindings_with_VXLAN.html)
    
      - [Ethernet Virtual Private Network -
        EVPN](Ethernet_Virtual_Private_Network_-_EVPN.html)
    
      - [Lightweight Network Virtualization
        Overview](Lightweight_Network_Virtualization_Overview.html)
        
          - [LNV Full Example](LNV_Full_Example.html)
    
      - [VXLAN Active-Active Mode](VXLAN_Active-Active_Mode.html)
    
      - [VXLAN Routing](VXLAN_Routing.html)
    
      - [VXLAN Scale](VXLAN_Scale.html)
    
      - [Hybrid Cloud Connectivity with QinQ and
        VXLANs](Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs.html)
    
      - [Troubleshooting VXLANs](Troubleshooting_VXLANs.html)
    
      - [Virtualization Integrations](Virtualization_Integrations.html)
        
          - [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html)
        
          - [Integrating Hardware VTEPs with VMware
            NSX-V](Integrating_Hardware_VTEPs_with_VMware_NSX-V.html)
        
          - [Integrating Hardware VTEPs with VMware
            NSX-MH](Integrating_Hardware_VTEPs_with_VMware_NSX-MH.html)
        
          - [OVSDB Server High
            Availability](OVSDB_Server_High_Availability.html)
    
      - [VXLAN Tunnel DSCP Operations
        — DRAFT](VXLAN_Tunnel_DSCP_Operations_—%C2%A0DRAFT.html)
    
      - [Eng Update of VXLAN
        Hyperloop](Eng_Update_of_VXLAN_Hyperloop.html)
    
      - [VXLAN Active-Active](VXLAN_Active-Active.html)

  - [Layer 3](Layer_3.html)
    
      - [Routing](Routing.html)
    
      - [Introduction to Routing
        Protocols](Introduction_to_Routing_Protocols.html)
    
      - [Network Topology](Network_Topology.html)
    
      - [FRRouting Overview](FRRouting_Overview.html)
        
          - [Upgrading from Quagga to
            FRRouting](Upgrading_from_Quagga_to_FRRouting.html)
    
      - [Configuring FRRouting](Configuring_FRRouting.html)
        
          - [Comparing NCLU and vtysh
            Commands](Comparing_NCLU_and_vtysh_Commands.html)
    
      - [Address Resolution Protocol -
        ARP](Address_Resolution_Protocol_-_ARP.html)
    
      - [Open Shortest Path First -
        OSPF](Open_Shortest_Path_First_-_OSPF.html)
    
      - [Open Shortest Path First v3 -
        OSPFv3](Open_Shortest_Path_First_v3_-_OSPFv3.html)
    
      - [Border Gateway Protocol -
        BGP](Border_Gateway_Protocol_-_BGP.html)
    
      - [Policy-based Routing](Policy-based_Routing.html)
    
      - [Bidirectional Forwarding Detection -
        BFD](Bidirectional_Forwarding_Detection_-_BFD.html)
    
      - [Equal Cost Multipath Load Sharing - Hardware
        ECMP](Equal_Cost_Multipath_Load_Sharing_-_Hardware_ECMP.html)
    
      - [Redistribute Neighbor](Redistribute_Neighbor.html)
    
      - [Virtual Routing and Forwarding -
        VRF](Virtual_Routing_and_Forwarding_-_VRF.html)
    
      - [Management VRF](Management_VRF.html)
    
      - [GRE Tunneling](GRE_Tunneling.html)
    
      - [Protocol Independent Multicast -
        PIM](Protocol_Independent_Multicast_-_PIM.html)
    
      - [Segment Routing](Segment_Routing.html)

  - [Monitoring and
    Troubleshooting](Monitoring_and_Troubleshooting.html)
    
      - [Single User Mode - Boot
        Recovery](Single_User_Mode_-_Boot_Recovery.html)
    
      - [Resource Diagnostics Using
        cl-resource-query](Resource_Diagnostics_Using_cl-resource-query.html)
    
      - [Monitoring System Hardware](Monitoring_System_Hardware.html)
        
          - [Network Switch Port LED and Status LED
            Guidelines](Network_Switch_Port_LED_and_Status_LED_Guidelines.html)
    
      - [Monitoring Virtual Device
        Counters](Monitoring_Virtual_Device_Counters.html)
    
      - [ASIC Monitoring](ASIC_Monitoring.html)
    
      - [Understanding the cl-support Output
        File](Understanding_the_cl-support_Output_File.html)
        
          - [Troubleshooting Log Files](Troubleshooting_Log_Files.html)
        
          - [Troubleshooting the etc
            Directory](Troubleshooting_the_etc_Directory.html)
    
      - [Troubleshooting Network
        Interfaces](Troubleshooting_Network_Interfaces.html)
        
          - [Monitoring Interfaces and Transceivers Using
            ethtool](Monitoring_Interfaces_and_Transceivers_Using_ethtool.html)
    
      - [Network Troubleshooting](Network_Troubleshooting.html)
        
          - [Using NCLU to Troubleshoot Your Network
            Configuration](Using_NCLU_to_Troubleshoot_Your_Network_Configuration.html)
        
          - [Monitoring System Statistics and Network Traffic with
            sFlow](Monitoring_System_Statistics_and_Network_Traffic_with_sFlow.html)
    
      - [Simple Network Management Protocol (SNMP)
        Monitoring](Simple_Network_Management_Protocol_\(SNMP\)_Monitoring.html)
        
          - [Using Nutanix Prism as a Monitoring
            Tool](Using_Nutanix_Prism_as_a_Monitoring_Tool.html)
    
      - [Monitoring Best Practices](Monitoring_Best_Practices.html)
    
      - [switchd Log Message
        Reference](switchd_Log_Message_Reference.html)
    
      - [FRRouting Log Message
        Reference](FRRouting_Log_Message_Reference.html)

  - [Network Solutions](Network_Solutions.html)
    
      - [Data Center Host to ToR
        Architecture](Data_Center_Host_to_ToR_Architecture.html)
    
      - [Cumulus Networks Services
        Demos](Cumulus_Networks_Services_Demos.html)
    
      - [Docker on Cumulus Linux](Docker_on_Cumulus_Linux.html)
    
      - [OpenStack Neutron ML2 and Cumulus
        Linux](OpenStack_Neutron_ML2_and_Cumulus_Linux.html)
    
      - [Anycast Design Guide](Anycast_Design_Guide.html)
    
      - [RDMA over Converged Ethernet -
        RoCE](RDMA_over_Converged_Ethernet_-_RoCE.html)
    
      - [Cumulus Hyperconverged Solution with
        Nutanix](Cumulus_Hyperconverged_Solution_with_Nutanix.html)

  - [Cumulus Linux Index](Cumulus_Linux_Index.html)