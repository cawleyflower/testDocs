---
title: Cumulus Linux User Guide
author: Unknown
weight: 1
pageID: 8362022
aliases:
 - /old/Cumulus_Linux_36/Cumulus_Linux_User_Guide.html
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
subsection: true
---
## Introducing Cumulus Linux

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

This documentation is current as of September 19, 2018 for version
3.6.2. Visit the [Cumulus Networks Web
site](http://docs.cumulusnetworks.com) for the most up to date
documentation.

Read the [release
notes](https://support.cumulusnetworks.com/hc/en-us/articles/115015543848)
for new features and known issues in this release.

### What's New in Cumulus Linux 3.6.2

Cumulus Linux 3.6.2 contains the following new features, platforms, and
improvements:

  - [Facebook Voyager](https://cumulusnetworks.com/hcl) (DWDM) (100G
    Tomahawk) now generally available

  - NCLU commands available for [configuring traditional mode
    bridges](/old/Cumulus_Linux_36/Traditional_Bridge_Mode.html)

  - [VRF static route leaking with
    EVPN](/old/Cumulus_Linux_36/Virtual_Routing_and_Forwarding_-_VRF.html#src-8362412_VirtualRoutingandForwarding-VRF-EVPN_static_route_leak)
    symmetric routing

  - New [`vrf_route_leak_enable`
    option](/old/Cumulus_Linux_36/Virtual_Routing_and_Forwarding_-_VRF.html#src-8362412_VirtualRoutingandForwarding-VRF-enable_route_leaking)
    used to enable VRF route leaking

### What's New in Cumulus Linux 3.6.0

Cumulus Linux 3.6.0 contains a number of new platforms, features and
improvements:

  - New [platforms](https://cumulusnetworks.com/hcl) include:

      - Dell S4128T-ON (10GBASE-T Maverick)

      - Dell S5048-ON (25G Tomahawk+)

      - Delta AG-5648v1 (25G Tomahawk+)

      - Edgecore AS7312-54XS (Tomahawk+)

      - Facebook Voyager (100G Tomahawk/DWDM) Early Access

      - Penguin Arctica 1600CS (100G Spectrum)

      - Penguin Arctica 3200CS (100G Spectrum)

      - Penguin Arctica 4808X (10G Spectrum)

  - [Policy-based
    Routing](/old/Cumulus_Linux_36/Policy-based_Routing.html)

  - [VRF Route
    Leaking](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Virtual+Routing+and+Forwarding+-+VRF#VirtualRoutingandForwarding-VRF-VRFRouteLeaking)

  - [PTP Boundary
    Clock](/old/Cumulus_Linux_36/Setting_Date_and_Time.html#src-8362040_SettingDateandTime-PTP)
    on Mellanox switches

  - [GRE Tunneling](/old/Cumulus_Linux_36/GRE_Tunneling.html) on
    Mellanox switches

  - New `/etc/cumulus/ports.conf` file validator finds syntax errors and
    provides a reason for each invalid line. Error messages are shown
    when you run the `net commit` command.

  - Support for the combination of the `local-as` and `allowas-in`
    commands

  - OSPFv3 enhancements:

      - Validated interoperability with other routers at a scale of 120
        neighbors

      - New NCLU commands to configure
        [OSPFv3](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Open+Shortest+Path+First+v3+-+OSPFv3+-+Protocol#OpenShortestPathFirstv3-OSPFv3-Protocol-ConfiguringtheOSPFv3Area)

  - EVPN Enhancements:

      - [Type-5 routes with asymmetric
        routing](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN#EthernetVirtualPrivateNetwork-EVPN-EVPNType-5RoutingwithAsymmetricRouting)

      - [Originate default EVPN type-5
        routes](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN#EthernetVirtualPrivateNetwork-EVPN-OriginatingDefaultEVPNType-5Routes)

      - [Filter EVPN routes based on
        type](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN#EthernetVirtualPrivateNetwork-EVPN-filter_evpn_route_typeFilteringEVPNRoutesBasedonType)

      - [Control which RIB routes are injected into
        EVPN](/old/Cumulus_Linux_36/https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN#EthernetVirtualPrivateNetwork-EVPN-ControllingWhichRIBRoutesAreInjectedintoEVPN)

For information on bug fixes and known issues present in this release,
refer to the [product release
notes](https://support.cumulusnetworks.com/hc/en-us/articles/360003039873-Cumulus-Linux-3-6-Release-Notes).

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

  - [Quick Start Guide](/old/Cumulus_Linux_36/Quick_Start_Guide.html)

  - [Installation
    Management](/old/Cumulus_Linux_36/Installation_Management.html)

      - [Managing Cumulus Linux Disk
        Images](/old/Cumulus_Linux_36/Managing_Cumulus_Linux_Disk_Images.html)

      - [Installing a New Cumulus Linux
        Image](/old/Cumulus_Linux_36/Installing_a_New_Cumulus_Linux_Image.html)

      - [Upgrading Cumulus
        Linux](/old/Cumulus_Linux_36/Upgrading_Cumulus_Linux.html)

      - [Using Snapshots](/old/Cumulus_Linux_36/Using_Snapshots.html)

      - [Adding and Updating
        Packages](/old/Cumulus_Linux_36/Adding_and_Updating_Packages.html)

      - [Zero Touch Provisioning -
        ZTP](/old/Cumulus_Linux_36/Zero_Touch_Provisioning_-_ZTP.html)

  - [System
    Configuration](/old/Cumulus_Linux_36/System_Configuration.html)

      - [Network Command Line Utility -
        NCLU](/old/Cumulus_Linux_36/Network_Command_Line_Utility_-_NCLU.html)

          - [Network Command Line
            Utility](/old/Cumulus_Linux_36/Network_Command_Line_Utility.html)

      - [Setting Date and
        Time](/old/Cumulus_Linux_36/Setting_Date_and_Time.html)

      - [Authentication, Authorization and
        Accounting](/old/Cumulus_Linux_36/Authentication,_Authorization_and_Accounting.html)

          - [SSH for Remote
            Access](/old/Cumulus_Linux_36/SSH_for_Remote_Access.html)

          - [User Accounts](/old/Cumulus_Linux_36/User_Accounts.html)

          - [Using sudo to Delegate
            Privileges](/old/Cumulus_Linux_36/Using_sudo_to_Delegate_Privileges.html)

          - [LDAP Authentication and
            Authorization](/old/Cumulus_Linux_36/LDAP_Authentication_and_Authorization.html)

          - [TACACS Plus](/old/Cumulus_Linux_36/TACACS_Plus.html)

          - [RADIUS AAA](/old/Cumulus_Linux_36/RADIUS_AAA.html)

      - [Netfilter - ACLs](/old/Cumulus_Linux_36/Netfilter_-_ACLs.html)

          - [Default Cumulus Linux ACL
            Configuration](/old/Cumulus_Linux_36/Default_Cumulus_Linux_ACL_Configuration.html)

          - [Filtering Learned MAC
            Addresses](/old/Cumulus_Linux_36/Filtering_Learned_MAC_Addresses.html)

      - [Managing Application
        Daemons](/old/Cumulus_Linux_36/Managing_Application_Daemons.html)

      - [Configuring
        switchd](/old/Cumulus_Linux_36/Configuring_switchd.html)

      - [Power over Ethernet -
        PoE](/old/Cumulus_Linux_36/Power_over_Ethernet_-_PoE.html)

      - [Configuring a Global
        Proxy](/old/Cumulus_Linux_36/Configuring_a_Global_Proxy.html)

      - [HTTP API](/old/Cumulus_Linux_36/HTTP_API.html)

  - [Layer 1 and Switch
    Ports](/old/Cumulus_Linux_36/Layer_1_and_Switch_Ports.html)

      - [Interface Configuration and
        Management](/old/Cumulus_Linux_36/Interface_Configuration_and_Management.html)

          - [Switch Port
            Attributes](/old/Cumulus_Linux_36/Switch_Port_Attributes.html)

      - [Buffer and Queue
        Management](/old/Cumulus_Linux_36/Buffer_and_Queue_Management.html)

          - [Configuring Hardware-enabled DDOS
            Protection](/old/Cumulus_Linux_36/Configuring_Hardware-enabled_DDOS_Protection.html)

      - [DHCP Relays](/old/Cumulus_Linux_36/DHCP_Relays.html)

      - [DHCP Servers](/old/Cumulus_Linux_36/DHCP_Servers.html)

      - [Facebook Voyager Optical
        Interfaces](/old/Cumulus_Linux_36/Facebook_Voyager_Optical_Interfaces.html)

      - [802.1X
        Interfaces](/old/Cumulus_Linux_36/802.1X_Interfaces.html)

      - [Prescriptive Topology Manager -
        PTM](/old/Cumulus_Linux_36/Prescriptive_Topology_Manager_-_PTM.html)

  - [Layer 2](/old/Cumulus_Linux_36/Layer_2.html)

      - [Spanning Tree and Rapid Spanning
        Tree](/old/Cumulus_Linux_36/Spanning_Tree_and_Rapid_Spanning_Tree.html)

      - [Link Layer Discovery
        Protocol](/old/Cumulus_Linux_36/Link_Layer_Discovery_Protocol.html)

          - [Voice VLAN](/old/Cumulus_Linux_36/Voice_VLAN.html)

      - [Bonding - Link
        Aggregation](/old/Cumulus_Linux_36/Bonding_-_Link_Aggregation.html)

      - [Ethernet Bridging -
        VLANs](/old/Cumulus_Linux_36/Ethernet_Bridging_-_VLANs.html)

          - [VLAN-aware Bridge
            Mode](/old/Cumulus_Linux_36/VLAN-aware_Bridge_Mode.html)

          - [Traditional Bridge
            Mode](/old/Cumulus_Linux_36/Traditional_Bridge_Mode.html)

          - [VLAN Tagging](/old/Cumulus_Linux_36/VLAN_Tagging.html)

          - [VLAN-aware Bridge Mode for Large-scale Layer 2
            Environments](/old/Cumulus_Linux_36/VLAN-aware_Bridge_Mode_for_Large-scale_Layer_2_Environments.html)

      - [Multi-Chassis Link Aggregation -
        MLAG](/old/Cumulus_Linux_36/Multi-Chassis_Link_Aggregation_-_MLAG.html)

      - [LACP Bypass](/old/Cumulus_Linux_36/LACP_Bypass.html)

      - [Virtual Router Redundancy -
        VRR](/old/Cumulus_Linux_36/Virtual_Router_Redundancy_-_VRR.html)

          - [ifplugd](/old/Cumulus_Linux_36/ifplugd.html)

      - [IGMP and MLD
        Snooping](/old/Cumulus_Linux_36/IGMP_and_MLD_Snooping.html)

  - [Network
    Virtualization](/old/Cumulus_Linux_36/Network_Virtualization.html)

      - [Static VXLAN
        Configurations](/old/Cumulus_Linux_36/Static_VXLAN_Configurations.html)

          - [Static VXLAN
            Tunnels](/old/Cumulus_Linux_36/Static_VXLAN_Tunnels.html)

          - [Static MAC Bindings with
            VXLAN](/old/Cumulus_Linux_36/Static_MAC_Bindings_with_VXLAN.html)

      - [Lightweight Network Virtualization
        Overview](/old/Cumulus_Linux_36/Lightweight_Network_Virtualization_Overview.html)

          - [LNV VXLAN Active-Active
            Mode](/old/Cumulus_Linux_36/LNV_VXLAN_Active-Active_Mode.html)

          - [LNV Full
            Example](/old/Cumulus_Linux_36/LNV_Full_Example.html)

      - [Ethernet Virtual Private Network -
        EVPN](/old/Cumulus_Linux_36/Ethernet_Virtual_Private_Network_-_EVPN.html)

      - [VXLAN Routing](/old/Cumulus_Linux_36/VXLAN_Routing.html)

      - [Virtualization
        Integrations](/old/Cumulus_Linux_36/Virtualization_Integrations.html)

          - [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html)

          - [Integrating Hardware VTEPs with VMware
            NSX-V](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_VMware_NSX-V.html)

          - [Integrating Hardware VTEPs with VMware
            NSX](/old/Cumulus_Linux_36/Integrating_Hardware_VTEPs_with_VMware_NSX.html)

      - [VXLAN Scale](/old/Cumulus_Linux_36/VXLAN_Scale.html)

      - [Hybrid Cloud Connectivity with QinQ and
        VXLANs](/old/Cumulus_Linux_36/Hybrid_Cloud_Connectivity_with_QinQ_and_VXLANs.html)

  - [Layer 3](/old/Cumulus_Linux_36/Layer_3.html)

      - [Routing](/old/Cumulus_Linux_36/Routing.html)

      - [Introduction to Routing
        Protocols](/old/Cumulus_Linux_36/Introduction_to_Routing_Protocols.html)

      - [Network Topology](/old/Cumulus_Linux_36/Network_Topology.html)

      - [FRRouting
        Overview](/old/Cumulus_Linux_36/FRRouting_Overview.html)

          - [Upgrading from Quagga to
            FRRouting](/old/Cumulus_Linux_36/Upgrading_from_Quagga_to_FRRouting.html)

      - [Configuring
        FRRouting](/old/Cumulus_Linux_36/Configuring_FRRouting.html)

          - [Comparing NCLU and vtysh
            Commands](/old/Cumulus_Linux_36/Comparing_NCLU_and_vtysh_Commands.html)

      - [Address Resolution Protocol -
        ARP](/old/Cumulus_Linux_36/Address_Resolution_Protocol_-_ARP.html)

      - [Open Shortest Path First - OSPF -
        Protocol](/old/Cumulus_Linux_36/Open_Shortest_Path_First_-_OSPF_-_Protocol.html)

      - [Open Shortest Path First v3 - OSPFv3 -
        Protocol](/old/Cumulus_Linux_36/Open_Shortest_Path_First_v3_-_OSPFv3_-_Protocol.html)

      - [Border Gateway Protocol -
        BGP](/old/Cumulus_Linux_36/Border_Gateway_Protocol_-_BGP.html)

      - [Policy-based
        Routing](/old/Cumulus_Linux_36/Policy-based_Routing.html)

      - [Bidirectional Forwarding Detection -
        BFD](/old/Cumulus_Linux_36/Bidirectional_Forwarding_Detection_-_BFD.html)

      - [Equal Cost Multipath Load Sharing - Hardware
        ECMP](/old/Cumulus_Linux_36/Equal_Cost_Multipath_Load_Sharing_-_Hardware_ECMP.html)

      - [Redistribute
        Neighbor](/old/Cumulus_Linux_36/Redistribute_Neighbor.html)

      - [Virtual Routing and Forwarding -
        VRF](/old/Cumulus_Linux_36/Virtual_Routing_and_Forwarding_-_VRF.html)

      - [Management VRF](/old/Cumulus_Linux_36/Management_VRF.html)

      - [GRE Tunneling](/old/Cumulus_Linux_36/GRE_Tunneling.html)

      - [Protocol Independent Multicast -
        PIM](/old/Cumulus_Linux_36/Protocol_Independent_Multicast_-_PIM.html)

      - [Segment Routing](/old/Cumulus_Linux_36/Segment_Routing.html)

  - [Monitoring and
    Troubleshooting](/old/Cumulus_Linux_36/Monitoring_and_Troubleshooting.html)

      - [Single User Mode - Boot
        Recovery](/old/Cumulus_Linux_36/Single_User_Mode_-_Boot_Recovery.html)

      - [Resource Diagnostics Using
        cl-resource-query](/old/Cumulus_Linux_36/Resource_Diagnostics_Using_cl-resource-query.html)

      - [Monitoring System
        Hardware](/old/Cumulus_Linux_36/Monitoring_System_Hardware.html)

          - [Network Switch Port LED and Status LED
            Guidelines](/old/Cumulus_Linux_36/Network_Switch_Port_LED_and_Status_LED_Guidelines.html)

      - [Monitoring Virtual Device
        Counters](/old/Cumulus_Linux_36/Monitoring_Virtual_Device_Counters.html)

      - [ASIC Monitoring](/old/Cumulus_Linux_36/ASIC_Monitoring.html)

      - [Understanding the cl-support Output
        File](/old/Cumulus_Linux_36/Understanding_the_cl-support_Output_File.html)

          - [Troubleshooting Log
            Files](/old/Cumulus_Linux_36/Troubleshooting_Log_Files.html)

          - [Troubleshooting the etc
            Directory](/old/Cumulus_Linux_36/Troubleshooting_the_etc_Directory.html)

      - [Troubleshooting Network
        Interfaces](/old/Cumulus_Linux_36/Troubleshooting_Network_Interfaces.html)

          - [Monitoring Interfaces and Transceivers Using
            ethtool](/old/Cumulus_Linux_36/Monitoring_Interfaces_and_Transceivers_Using_ethtool.html)

      - [Network
        Troubleshooting](/old/Cumulus_Linux_36/Network_Troubleshooting.html)

          - [Using NCLU to Troubleshoot Your Network
            Configuration](/old/Cumulus_Linux_36/Using_NCLU_to_Troubleshoot_Your_Network_Configuration.html)

          - [Monitoring System Statistics and Network Traffic with
            sFlow](/old/Cumulus_Linux_36/Monitoring_System_Statistics_and_Network_Traffic_with_sFlow.html)

      - [Simple Network Management Protocol (SNMP)
        Monitoring](/old/Cumulus_Linux_36/Simple_Network_Management_Protocol_\(SNMP\)_Monitoring.html)

          - [Using Nutanix Prism as a Monitoring
            Tool](/old/Cumulus_Linux_36/Using_Nutanix_Prism_as_a_Monitoring_Tool.html)

      - [Monitoring Best
        Practices](/old/Cumulus_Linux_36/Monitoring_Best_Practices.html)

      - [switchd Log Message
        Reference](/old/Cumulus_Linux_36/switchd_Log_Message_Reference.html)

      - [FRRouting Log Message
        Reference](/old/Cumulus_Linux_36/FRRouting_Log_Message_Reference.html)

  - [Network Solutions](/old/Cumulus_Linux_36/Network_Solutions.html)

      - [Data Center Host to ToR
        Architecture](/old/Cumulus_Linux_36/Data_Center_Host_to_ToR_Architecture.html)

      - [Cumulus Networks Services
        Demos](/old/Cumulus_Linux_36/Cumulus_Networks_Services_Demos.html)

      - [Docker on Cumulus
        Linux](/old/Cumulus_Linux_36/Docker_on_Cumulus_Linux.html)

      - [OpenStack Neutron ML2 and Cumulus
        Linux](/old/Cumulus_Linux_36/OpenStack_Neutron_ML2_and_Cumulus_Linux.html)

      - [Anycast Design
        Guide](/old/Cumulus_Linux_36/Anycast_Design_Guide.html)

      - [RDMA over Converged Ethernet -
        RoCE](/old/Cumulus_Linux_36/RDMA_over_Converged_Ethernet_-_RoCE.html)

  - [Cumulus Linux
    Index](/old/Cumulus_Linux_36/Cumulus_Linux_Index.html)
