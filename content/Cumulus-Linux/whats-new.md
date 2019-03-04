---
title: "What's New"
date: 2019-02-20T13:45:32-05:00
draft: true
---

## What's New in Cumulus Linux 3.7.3

Cumulus Linux 3.7.3 contains a number of new platforms, features and
improvements:

-   New [platforms](https://cumulusnetworks.com/hcl) include:
    -   Dell Z9264F-ON (100G Broadcom Tomahawk2)

    -   Edgecore AS7816-64X (100G Broadcom Tomahawk2)
    -   Edgecore AS7726-32X (100G Broadcom Trident3)

    -   Edgecore AS7326-56X (25G Broadcom Trident3)
    -   HPE SN2700M (100G Mellanox Spectrum)
    -   HPE SN2100M (100G Mellanox Spectrum)

    -   HPE SN2410M (25G Mellanox Spectrum)

    -   Lenovo NE0152TO (1G Broadcom Helix4) now generally available
    -   Penguin Arctica NX4804x (10G Broadcom Maverick)

-   The [EVPN duplicate address
    detection](Ethernet-Virtual-Private-Network---EVPN_8362732.html#EthernetVirtualPrivateNetwork-EVPN-dad) freeze
    option lets you freeze a duplicate address permanently or for a
    certain amount of time
-   The [Cumulus Hyperconverged Solution
    (HCS)](https://docs.cumulusnetworks.com/display/DOCS/Cumulus+Hyperconverged+Solution+with+Nutanix) supports
    automated integration with the Nutanix Prism Management solution and
    the Nutanix AHV hypervisor

## What's New in Cumulus Linux 3.7.2

Cumulus Linux 3.7.2 contains a number of new platforms, features and
improvements:

-   New [platforms](https://cumulusnetworks.com/hcl) include:
    -   Dell S5232F-ON (100G Trident3)

    -   Delta AG9032v2 (100G Trident3)

    -   Lenovo NE10032O (100G Tomahawk)

    -   Lenovo NE2572O (25G Tomahawk+)  - swp1 thru swp8 support 25G
        speed only

    -   Lenovo NE0152TO (1G Helix4) - available for Early Access

-   On Facebook Voyager, the NCLU `net show transponder` command output
    shows the [Optical Signal to Noise ratio
    (OSNR)](Facebook-Voyager-Optical-Interfaces_8363049.html#FacebookVoyagerOpticalInterfaces-showTransponderStatus) in
    the network 

-   Support for [egress IPv6 ACL
    rules](Netfilter---ACLs_8362563.html#Netfilter-ACLs-ipv6EgressRules) on
    Broadcom switches

-   Support for [VRF route leaking on Mellanox
    switches](Virtual-Routing-and-Forwarding---VRF_8362942.html#VirtualRoutingandForwarding-VRF-routeleaking)

-   [RFC 5549 support with global IPv6
    peers](Border-Gateway-Protocol---BGP_8362926.html#BorderGatewayProtocol-BGP-rfc-5549)
-   [EVPN duplicate address
    detection](Ethernet-Virtual-Private-Network---EVPN_8362732.html#EthernetVirtualPrivateNetwork-EVPN-dad)
-   New TCAM profile for Mellanox switches
    ([ip-acl-heavy](Netfilter---ACLs_8362563.html#Netfilter-ACLs-MS-limits))
    to support creation of 16K 3-tuple and 5-tuple IPv4 ACLs

## What's New in Cumulus Linux 3.7.1

Cumulus Linux 3.7.1 contains bug fixes only.

## What's New in Cumulus Linux 3.7.0

Cumulus Linux 3.7.0 contains a number of new platforms, features and
improvements:

-   New [platforms](https://cumulusnetworks.com/hcl) include:
    -   QCT QuantaMesh BMS T4048-IX8 (25G Trident3)
    -   QCT QuantaMesh BMS T7032-IX7 (100G Trident3)
    -   Dell S5248F-ON (25G Trident3)
    -   Penguin Arctica 4806xt (10G Trident 2+)
-   [Line side
    loopback](Facebook-Voyager-Optical-Interfaces_8363049.html#FacebookVoyagerOpticalInterfaces-lineSideLoopback)
    and [Terminal
    loopback](Facebook-Voyager-Optical-Interfaces_8363049.html#FacebookVoyagerOpticalInterfaces-terminalLoopback)
    mode for Facebook Voyager troubleshooting
-   OVSDB Server High Availability (Early Access)
-   [RADIUS Change of Authorization (CoA)
    requests](802.1X-Interfaces_8363046.html#id-802.1XInterfaces-CoArequests)
-   RADIUS AAA local fallback authentication
-   TACACS+ local fallback authentication  
-   EVPN enhancements
    -   [Neighbor Discovery (ND) Extended
        Community](Ethernet-Virtual-Private-Network---EVPN_8362732.html#EthernetVirtualPrivateNetwork-EVPN-ND_extended_community) support
    -   Extended mobility support
    -   ECMP support for overlay networks on RIOT-capable Broadcom
        switches 
-   New NCLU commands:
    -   [Show the version of a
        package](Adding-and-Updating-Packages_8362631.html#AddingandUpdatingPackages-versionDisplay)
    -   Show the interface description (alias) for all interfaces on the
        switch
    -   Show which interfaces are in a VRF and the VNIs for VRF
        interfaces
    -   Change bond mode to IEEE 802.3ad link aggregation mode

For information on bug fixes and known issues present in this release,
refer to the [product release
notes](https://support.cumulusnetworks.com/hc/en-us/articles/360007793174-Cumulus-Linux-3-7-Release-Notes).

## Open Source Contributions

To implement various Cumulus Linux features, Cumulus Networks has forked
various software projects, like CFEngine, `Netdev` and some Puppet Labs
packages. The forked code resides in the Cumulus Networks [GitHub
repository](https://github.com/CumulusNetworks).

Cumulus Networks has also developed and released new applications as
open source. The list of open source projects is on the [open source
software](http://oss.cumulusnetworks.com/) page.

## Hardware Compatibility List

You can find the most up-to-date hardware compatibility list
(HCL) [here](http://cumulusnetworks.com/hcl/). Use the HCL to confirm
that your switch model is supported by Cumulus Networks. The HCL is
updated regularly, listing products by port configuration, manufacturer,
and SKU part number.

##  Download the User Guide

You can download the current Cumulus Linux User Guide, as well as
previous versions, in PDF format:

-   [Cumulus Linux 3.7.3 User Guide](attachments/8362527/9012689.pdf)
-   [Cumulus Linux 3.7.2 User Guide](attachments/8362527/8366177.pdf)
-   [Cumulus Linux 3.7.0 User Guide](attachments/8362527/8363060.pdf)
-   [Cumulus Linux 3.6.2 User Guide](attachments/8362527/8362529.pdf)
-   [Cumulus Linux 3.6.1 User Guide](attachments/8362527/8362530.pdf)
-   [Cumulus Linux 3.6.0 User Guide](attachments/8362527/8362531.pdf)
-   [Cumulus Linux 3.5.3 User Guide](attachments/8362527/8362534.pdf)
-   [Cumulus Linux 3.5.2 User Guide](attachments/8362527/8362533.pdf)
-   [Cumulus Linux 3.5.1 User Guide](attachments/8362527/8362539.pdf)
-   [Cumulus Linux 3.4.3 User Guide](attachments/8362527/8362538.pdf)
-   [Cumulus Linux 3.3.2 User Guide](attachments/8362527/8362537.pdf)
-   [Cumulus Linux 3.2.1 User Guide](attachments/8362527/8362536.pdf)
-   [Cumulus Linux 3.1.2 User Guide](attachments/8362527/8362535.pdf)
-   [Cumulus Linux 3.0.1 User Guide](attachments/8362527/8362540.pdf)
