---
title: Cumulus Linux User Guide
author: Unknown
weight: 1
pageID: 8362022
product: Cumulus Linux
version: '3.6'
aliases:
 - /display/undefined/Cumulus+Linux_User_Guide
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
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
    bridges](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [VRF static route leaking with
    EVPN](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    symmetric routing

  - New [`vrf_route_leak_enable`
    option](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
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
    Routing](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [VRF Route
    Leaking](https://docs.cumulusnetworks.com/display/DOCS/Virtual+Routing+and+Forwarding+-+VRF#VirtualRoutingandForwarding-VRF-VRFRouteLeaking)

  - [PTP Boundary
    Clock](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    on Mellanox switches

  - [GRE
    Tunneling](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    on Mellanox switches

  - New `/etc/cumulus/ports.conf` file validator finds syntax errors and
    provides a reason for each invalid line. Error messages are shown
    when you run the `net commit` command.

  - Support for the combination of the `local-as` and `allowas-in`
    commands

  - OSPFv3 enhancements:
    
      - Validated interoperability with other routers at a scale of 120
        neighbors
    
      - New NCLU commands to configure
        [OSPFv3](https://docs.cumulusnetworks.com/display/DOCS/Open+Shortest+Path+First+v3+-+OSPFv3+-+Protocol#OpenShortestPathFirstv3-OSPFv3-Protocol-ConfiguringtheOSPFv3Area)

  - EVPN Enhancements:
    
      - [Type-5 routes with asymmetric
        routing](https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN#EthernetVirtualPrivateNetwork-EVPN-EVPNType-5RoutingwithAsymmetricRouting)
    
      - [Originate default EVPN type-5
        routes](https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN#EthernetVirtualPrivateNetwork-EVPN-OriginatingDefaultEVPNType-5Routes)
    
      - [Filter EVPN routes based on
        type](https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN#EthernetVirtualPrivateNetwork-EVPN-filter_evpn_route_typeFilteringEVPNRoutesBasedonType)
    
      - [Control which RIB routes are injected into
        EVPN](https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN#EthernetVirtualPrivateNetwork-EVPN-ControllingWhichRIBRoutesAreInjectedintoEVPN)

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

  - [Quick Start
    Guide](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [Installation
    Management](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Managing Cumulus Linux Disk
        Images](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Installing a New Cumulus Linux
        Image](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Upgrading Cumulus
        Linux](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Using
        Snapshots](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Adding and Updating
        Packages](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Zero Touch Provisioning -
        ZTP](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [System
    Configuration](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Network Command Line Utility -
        NCLU](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Network Command Line
            Utility](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Setting Date and
        Time](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Authentication, Authorization and
        Accounting](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [SSH for Remote
            Access](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [User
            Accounts](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Using sudo to Delegate
            Privileges](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [LDAP Authentication and
            Authorization](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [TACACS
            Plus](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [RADIUS
            AAA](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Netfilter -
        ACLs](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Default Cumulus Linux ACL
            Configuration](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Filtering Learned MAC
            Addresses](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Managing Application
        Daemons](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Configuring
        switchd](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Power over Ethernet -
        PoE](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Configuring a Global
        Proxy](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [HTTP
        API](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [Layer 1 and Switch
    Ports](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Interface Configuration and
        Management](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Switch Port
            Attributes](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Buffer and Queue
        Management](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Configuring Hardware-enabled DDOS
            Protection](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [DHCP
        Relays](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [DHCP
        Servers](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Facebook Voyager Optical
        Interfaces](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [802.1X
        Interfaces](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Prescriptive Topology Manager -
        PTM](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [Layer
    2](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Spanning Tree and Rapid Spanning
        Tree](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Link Layer Discovery
        Protocol](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Voice
            VLAN](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Bonding - Link
        Aggregation](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Ethernet Bridging -
        VLANs](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [VLAN-aware Bridge
            Mode](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Traditional Bridge
            Mode](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [VLAN
            Tagging](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [VLAN-aware Bridge Mode for Large-scale Layer 2
            Environments](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Multi-Chassis Link Aggregation -
        MLAG](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [LACP
        Bypass](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Virtual Router Redundancy -
        VRR](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [ifplugd](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [IGMP and MLD
        Snooping](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [Network
    Virtualization](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Static VXLAN
        Configurations](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Static VXLAN
            Tunnels](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Static MAC Bindings with
            VXLAN](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Lightweight Network Virtualization
        Overview](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [LNV VXLAN Active-Active
            Mode](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [LNV Full
            Example](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Ethernet Virtual Private Network -
        EVPN](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [VXLAN
        Routing](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Virtualization
        Integrations](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Integrating Hardware VTEPs with Midokura MidoNet and
            OpenStack](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Integrating Hardware VTEPs with VMware
            NSX-V](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Integrating Hardware VTEPs with VMware
            NSX](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [VXLAN
        Scale](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Hybrid Cloud Connectivity with QinQ and
        VXLANs](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [Layer
    3](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Routing](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Introduction to Routing
        Protocols](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Network
        Topology](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [FRRouting
        Overview](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Upgrading from Quagga to
            FRRouting](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Configuring
        FRRouting](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Comparing NCLU and vtysh
            Commands](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Address Resolution Protocol -
        ARP](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Open Shortest Path First - OSPF -
        Protocol](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Open Shortest Path First v3 - OSPFv3 -
        Protocol](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Border Gateway Protocol -
        BGP](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Policy-based
        Routing](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Bidirectional Forwarding Detection -
        BFD](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Equal Cost Multipath Load Sharing - Hardware
        ECMP](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Redistribute
        Neighbor](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Virtual Routing and Forwarding -
        VRF](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Management
        VRF](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [GRE
        Tunneling](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Protocol Independent Multicast -
        PIM](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Segment
        Routing](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [Monitoring and
    Troubleshooting](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Single User Mode - Boot
        Recovery](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Resource Diagnostics Using
        cl-resource-query](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Monitoring System
        Hardware](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Network Switch Port LED and Status LED
            Guidelines](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Monitoring Virtual Device
        Counters](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [ASIC
        Monitoring](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Understanding the cl-support Output
        File](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Troubleshooting Log
            Files](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Troubleshooting the etc
            Directory](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Troubleshooting Network
        Interfaces](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Monitoring Interfaces and Transceivers Using
            ethtool](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Network
        Troubleshooting](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Using NCLU to Troubleshoot Your Network
            Configuration](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Monitoring System Statistics and Network Traffic with
            sFlow](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Simple Network Management Protocol (SNMP)
        Monitoring](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
        
          - [Using Nutanix Prism as a Monitoring
            Tool](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Monitoring Best
        Practices](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [switchd Log Message
        Reference](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [FRRouting Log Message
        Reference](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [Network
    Solutions](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Data Center Host to ToR
        Architecture](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Cumulus Networks Services
        Demos](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Docker on Cumulus
        Linux](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [OpenStack Neutron ML2 and Cumulus
        Linux](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [Anycast Design
        Guide](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
    
      - [RDMA over Converged Ethernet -
        RoCE](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)

  - [Cumulus Linux
    Index](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//Cumulus_Linux_36/)
