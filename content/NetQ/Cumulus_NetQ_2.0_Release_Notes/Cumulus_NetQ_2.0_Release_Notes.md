\--- title: author: keywords:
---

# Cumulus NetQ 2.0 Release Notes

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-Overview" class="section section-1">

## Overview

These release notes support Cumulus NetQ 2.0.0 and 2.0.1 releases, and
describe currently available features and known
issues.

</div>

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-StayuptoDate" class="section section-1">

## Stay up to Date

  - Subscribe to our [product
    bulletin](https://lists.cumulusnetworks.com/listinfo/cumulus-product-bulletin)
    mailing list to receive important announcements and updates about
    issues that arise in our products.

  - Subscribe to our [security
    announcement](https://lists.cumulusnetworks.com/listinfo/cumulus-security-announce)
    mailing list to receive alerts whenever we update our software for
    security
issues.

</div>

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-Contents" class="section section-1">

## Contents

</div>

<div id="src-9013728_safe-id-Q3VtdWx1c05ldFEyLjBSZWxlYXNlTm90ZXMtV2hhdCdzTmV3aW5DdW11bHVzTmV0UTIuMA" class="section section-1">

## What's New in Cumulus NetQ 2.0

**Cumulus NetQ 2.0.1** includes the following new and updated features:

  - Added
    
      - UI: Ability to monitor all BGP, MLAG, EVPN, and LLDP sessions
        network-wide. (This was already available in the CLI.)
    
      - API: Included BGP, MLAG, EVPN and LLDP network services APIs in
        swagger.json file

**Cumulus NetQ 2.0.0** includes the following new and updated features:

  - Added
    
      - Modern cloud-based infrastructure enables scalable and agile
        network with real-time data collection
        
          - Graphical User Interface (UI) provides a visual
            representation of the network devices and eventsMonitor
            network-wide health
        
          - Monitor individual device health and configuration
        
          - View network devices inventory and device component
            inventory
        
          - Track alarms and informational events across the network and
            for individual devices and components, protocols and
            services
        
          - Customize your own monitoring workbench to meet your needs
    
      - RESTful API provides access to data for use in third-party
        analytic tools
    
      - NetQ Appliance with the NetQ Platform pre-installed to speed
        deployment and get monitoring as quickly as possible

  - Updated
    
      - Instead of using the `netq show` commands to display changes
        between two points in time, a new `netq``  show events ` command
        is available to see these changes.
    
      - The `netq config ts` commands used to configure the Telemetry
        Server has been deprecated. `netq config` commands remain for
        local file-based configuration and `netq notification` commands
        have been added for configuring event notifications.
    
      - Timestamps which indicate when a change occurred are displayed
        as an absolute time (Mon Feb 4 07:23:18 2019) versus relative to
        the current time (0d:2h:58m:34s ago). Uptimes remain relative to
        the current time.

The following features have been deprecated in the 2.0 release:

  - The early access features provided with NetQ 1.4 that were not fully
    productized are not available with this release.
    
      - Extension of NetQ CLI with custom commands
    
      - NetQL, query language for directly accessing the database. This
        data will be available through the NetQ UI or API over time.
    
      - Export of interface statistics to third-party analytics tools
        (like Grafana). This data will be available through the NetQ UI
        or API over time.
    
      - Image and Provisioning Management (IPM) application. Life cycle
        management is in development for a future release.

  - Support for Docker and Docker Swarm. Use Kubernetes instead.

  - `netq-shell` command. A subset of NetQ commands had to be run on the
    Telemetry Server. There is no longer a Telemetry server in the NetQ
    2.0 architecture–multiple services are now responsible for this
    functionality. Commands that ran on the Telemetry Server have been
    removed and the replacement commands can be run from any node.

  - Service Console. Web-based UI access to the CLI is not currently
    available. Access the CLI directly through a terminal
window.

</div>

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-Licensing" class="section section-1">

## Licensing

Cumulus NetQ is licensed on a per-switch basis. For hosts, one license
is required per rack. You should have received a license key from
Cumulus
Networks.

</div>

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-InstallorUpgradetoVersion2.0" class="section section-1">

## Install or Upgrade to Version 2.0

To install Cumulus NetQ 2.0 for the first time, follow the steps in the
[Install
NetQ](https://docs.cumulusnetworks.com/display/NETQ20DRAFT/Install+NetQ)
section of the *Cumulus NetQ Deployment Guide*. To upgrade Cumulus NetQ
2.0 from an earlier version, contact your Cumulus Networks
representative.

</div>

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-Documentation" class="section section-1">

## Documentation

The technical documentation is available from your Cumulus Networks
sales
team.

</div>

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-IssuesFixedinCumulusNetQ2.0.1" class="section section-1">

## Issues Fixed in Cumulus NetQ 2.0.1

The following is a list of issues fixed in Cumulus NetQ 2.0.1 from
Cumulus NetQ 2.0.0.

<div class="tablewrap">

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Release Note ID</strong></p></td>
<td><p><strong>Summary</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>RN-1287 (NETQ-1572)</p></td>
<td><p>Kubernetes configuration required IP address for eth0 port.</p></td>
<td><p>Kubernetes configuration failed when eth0 did not have IP address assigned in time.</p>
<p>This issue is fixed in NetQ 2.0.1.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1286 (NETQ-1658)</p></td>
<td><p>Sometimes NetQ Agent was not discoverable by hostname.</p></td>
<td><p>When NetQ Agent hostname could not be resolved by NetQ Platform, NetQ Agent was not visible to NetQ.</p>
<p>This issue is fixed in NetQ 2.0.1.</p></td>
</tr>
<tr class="even">
<td><p>RN-1273 (NETQ-1390)</p></td>
<td><p>Network Health card reported incorrect score under certain condition</p></td>
<td><p>Medium size Network Health card reported incorrect network services health chart score.</p>
<p>This issue is fixed in NetQ 2.0.1.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1275 (NETQ-1385)</p></td>
<td><p>License State bar graph showed incorrect titles when filtering</p></td>
<td><p>Large size Inventory Switches card displayed incorrect labels for the license state bar graph.</p>
<p>This issue is fixed in NetQ 2.0.1.</p></td>
</tr>
<tr class="even">
<td><p>RN-1276 (NETQ-1375)</p></td>
<td><p>License state bar graph showed no data</p></td>
<td><p>Large size Inventory Switches card incorrectly displayed license state bar graph.</p>
<p>This issue is fixed in NetQ 2.0.1.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1277 (NETQ-1387)</p></td>
<td><p>Switch status showed all red at times</p></td>
<td><p>Small size Inventory Switches card displayed inconsistent status color.</p>
<p>This issue is fixed in NetQ 2.0.1.</p></td>
</tr>
<tr class="even">
<td><p>RN-1278 (NETQ-1383)</p></td>
<td><p>Port monitoring was unavailable when NetQ Agent was not running on all nodes</p></td>
<td><p>When NetQ Agent was not running on all network nodes, port monitoring data became unavailable.</p>
<p>This issue is fixed in NetQ 2.0.1.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1279 (NETQ-1384)</p></td>
<td><p>`netq show notification channel` failed</p></td>
<td><p>The following error was shown when the <code>netq show notification channel</code> command is run:</p>
<pre><code>                
cumulus@switch:~$ netq show notification channel
Expected String or Unicode

    </code></pre>
<p>This issue was fixed in NetQ 2.0.1.</p></td>
</tr>
</tbody>
</table>

</div>

</div>

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-NewKnownIssuesinCumulusNetQ2.0.1" class="section section-1">

## New Known Issues in Cumulus NetQ 2.0.1

The following is a list of known issues in Cumulus NetQ 2.0.1 release.

<div class="tablewrap">

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Release Note ID</strong></p></td>
<td><p><strong>Summary</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>RN-1282 (NETQ-1718)</p></td>
<td><p>EVPN Services card displays some incorrect data.</p></td>
<td><p>Medium size EVPN Services card shows incorrect heading on total sessions graph, correct heading is Total BGP Sessions.</p>
<p>Large size EVPN Services card incorrectly displays Total Sessions chart, instead of Total Layer 2 VNIs charts.</p>
<p>Large size EVPN Services card displays incorrect node VNI count in Value column of table.</p>
<p>These are known issues that are currently being investigated.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1283 (NETQ-1690)</p></td>
<td><p>CLAG services card displays some incorrect backup IP addresses.</p></td>
<td><p>Medium size CLAG services card summary banner incorrectly displays count of devices with inactive backup IP addresses.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="even">
<td><p>RN-1284 (NETQ-1701)</p></td>
<td><p>CLAG services card displays some incorrect alarm data.</p></td>
<td><p>Medium size CLAG services card Total Alarms chart displays incorrect alarm count and distribution.</p>
<p>Large size CLAG services card Alarms tab displays incorrect alarm count and distribution.</p>
<p>These are known issues that are currently being investigated.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1285 (NETQ-1368)</p></td>
<td><p>Switch Inventory card filter becomes unresponsive</p></td>
<td><p>Large size Switch Inventory card Rotten Switches filter does not change to Fresh Switches filter.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="even">
<td><p>RN-1288 (NETQ-1714)</p></td>
<td><p>NetQ Appliance points to development repositories.</p></td>
<td><p>NetQ Appliance points to development repository in /etc/apt/sources.list.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
</tbody>
</table>

</div>

</div>

<div id="src-9013728_CumulusNetQ2.0ReleaseNotes-KnownIssuesinCumulusNetQ2.0.0" class="section section-1">

## Known Issues in Cumulus NetQ 2.0.0

The following is a list of known issues in Cumulus NetQ 2.0.0 release.

<div class="tablewrap">

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><p><strong>Release Note ID</strong></p></td>
<td><p><strong>Summary</strong></p></td>
<td><p><strong>Description</strong></p></td>
</tr>
<tr class="even">
<td><p>RN-1273 (NETQ-1390)</p></td>
<td><p>Network Health card reports incorrect score under certain conditions</p></td>
<td><p>Medium size Network Health card reports incorrect network services health chart score.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1274 (NETQ-1392)</p></td>
<td><p>Inventory Switches card becomes unresponsive</p></td>
<td><p>No data is displayed when the Rotten Switches filter is selected in the large size Inventory Switches card.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="even">
<td><p>RN-1275 (NETQ-1385)</p></td>
<td><p>License State bar graph shows incorrect titles when filtering</p></td>
<td><p>Large size Inventory Switches card displays incorrect labels for the license state bar graph.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1276 (NETQ-1375)</p></td>
<td><p>License state bar graph shows no data</p></td>
<td><p>Large size Inventory Switches card incorrectly displays license state bar graph.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="even">
<td><p>RN-1277 (NETQ-1387)</p></td>
<td><p>Switch status shows all red at times</p></td>
<td><p>Small size Inventory Switches card displays inconsistent status color.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1278 (NETQ-1383)</p></td>
<td><p>Port monitoring is unavailable when NetQ Agent is not running on all nodes</p></td>
<td><p>When NetQ Agent is not running on all network nodes, port monitoring data become unavailable.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="even">
<td><p>RN-1279 (NETQ-1384)</p></td>
<td><p>`netq show notification channel` fails</p></td>
<td><p>The following error is shown when the <code>netq show notification channel</code> command is run:</p>
<pre><code>                
cumulus@switch:~$ netq show notification channel
Expected String or Unicode

    </code></pre>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1280 (NETQ-1509)</p></td>
<td><p>NetQ 1.4.x early access features not available in NetQ 2.0.0</p></td>
<td><p>Extension of the NetQ CLI with custom commands, NetQL, and the export of interface statistics information early access features are not currently available.</p>
<p>These is a known issue that is currently being investigate.</p></td>
</tr>
<tr class="even">
<td><p>RN-1286 (NETQ-1658)</p></td>
<td><p>Sometimes NetQ Agent is not discoverable by hostname.</p></td>
<td><p>When NetQ Agent hostname cannot be resolved by NetQ Platform, NetQ Agent is not visible to NetQ.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td><p>RN-1287 (NETQ-1572)</p></td>
<td><p>Kubernetes configuration requires IP address for eth0 port.</p></td>
<td><p>Kubernetes configuration fails when eth0 does not have IP address assigned in time.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
</tbody>
</table>

</div>

</div>
