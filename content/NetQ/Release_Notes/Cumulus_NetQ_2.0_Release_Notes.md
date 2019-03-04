# Cumulus NetQ 2.0 Release Notes

## Overview

These release notes support Cumulus NetQ 2.0.0 and 2.0.1 releases and
describe currently available features and known issues.

## Stay up to Date 

-   Subscribe to our [product
    bulletin](https://lists.cumulusnetworks.com/listinfo/cumulus-product-bulletin) mailing
    list to receive important announcements and updates about issues
    that arise in our products.
-   Subscribe to our [security
    announcement](https://lists.cumulusnetworks.com/listinfo/cumulus-security-announce) mailing
    list to receive alerts whenever we update our software for security
    issues.

 

## Contents

-   [Overview](#CumulusNetQ2.0ReleaseNotes-Overview)
-   [Stay up to Date ](#CumulusNetQ2.0ReleaseNotes-StayuptoDate)
-   [What's New in Cumulus NetQ
    2.0](#CumulusNetQ2.0ReleaseNotes-What'sNewinCumulusNetQ2.0)
-   [Licensing](#CumulusNetQ2.0ReleaseNotes-Licensing)
-   [Install or Upgrade to Version
    2.0](#CumulusNetQ2.0ReleaseNotes-InstallorUpgradetoVersion2.0)
-   [Issues Fixed in Cumulus NetQ
    2.0.1](#CumulusNetQ2.0ReleaseNotes-IssuesFixedinCumulusNetQ2.0.1)
-   [New Known Issues in Cumulus NetQ
    2.0.1](#CumulusNetQ2.0ReleaseNotes-NewKnownIssuesinCumulusNetQ2.0.1)
-   [Known Issues in Cumulus NetQ
    2.0.0](#CumulusNetQ2.0ReleaseNotes-KnownIssuesinCumulusNetQ2.0.0)

 

## What's New in Cumulus NetQ 2.0

**Cumulus NetQ 2.0.1** includes the following new and updated features:

-   Added
    -   UI: Ability to monitor all BGP, MLAG, EVPN, and LLDP sessions
        network-wide. (This was already available in the CLI.)
    -   API: Included BGP, MLAG, EVPN and LLDP network services APIs in
        swagger.json file
-   Updated
    -   UI:
    -   CLI:
    -   API:

**Cumulus NetQ 2.0.0** includes the following new and updated features:

-   Added
    -   Modern cloud-based infrastructure enables scalable
        and agile network with real-time data collection
        -   Graphical User Interface (UI) provides a visual
            representation of the network devices and eventsMonitor
            network-wide health
        -   Monitor individual device health and configuration
        -   View network devices inventory and device component
            inventory
        -   Track alarms and informational events across the network and
            for individual devices and components, protocols and
            services
        -   Customize your own monitoring workbench to meet your needs
    -   RESTful API provides access to data for use in third-party
        analytic tools
    -   NetQ Appliance with the NetQ Platform pre-installed to speed
        deployment and get monitoring as quickly as possible
-   Updated
    -   Instead of using the `netq show` commands to display changes
        between two points in time, a new `netq`` show events` command
        is available to see these changes.
    -   The `netq config ts` commands used to configure the Telemetry
        Server has been deprecated. `netq config` commands remain for
        local file-based configuration and `netq notification` commands
        have been added for configuring event notifications.
    -   Timestamps which indicate when a change occurred are displayed
        as an absolute time (Mon Feb  4 07:23:18 2019) versus relative
        to the current time (0d:2h:58m:34s ago). Uptimes remain relative
        to the current time.

The following features have been deprecated in this release:

-   The early access features provided with NetQ 1.4 that were not fully
    productized are not available with this release. 

    -   Extension of NetQ CLI with custom commands

    -   NetQL, query language for directly accessing the database. This
        data will be available through the NetQ UI or API over time.

    -   Export of interface statistics to third-party analytics tools
        (like Grafana). This data will be available through the NetQ UI
        or API over time.

    -   Image and Provisioning Management (IPM) application

-   `netq-shell` command. This is no longer needed as you can run
    commands from any node.
-   Service Console. Access the CLI directly rather than through the UI.

## Licensing

Cumulus NetQ is licensed on a per-switch basis. For hosts, one license
is required per rack. You should have received a license key from
Cumulus Networks.

## Install or Upgrade to Version 2.0

To install Cumulus NetQ 2.0 for the first time, follow the steps in
the [Install NetQ](Install_NetQ) section of the *Cumulus NetQ Deployment
Guide*. To upgrade Cumulus NetQ 2.0 from an earlier version, follow the
steps in [Maintain NetQ](Maintain_NetQ) section of the *Cumulus NetQ
Deployment Guide.*

Documentation

The technical documentation is available from your Cumulus Networks
sales team.

## Issues Fixed in Cumulus NetQ 2.0.1

The following is a list of issues fixed in Cumulus NetQ 2.0.1 from
Cumulus NetQ 2.0.0.

## New Known Issues in Cumulus NetQ 2.0.1

The following is a list of known issues in Cumulus NetQ 2.0.1 release.

## Known Issues in Cumulus NetQ 2.0.0

The following is a list of known issues in Cumulus NetQ 2.0.0 release.

<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 33%" />
<col style="width: 33%" />
</colgroup>
<tbody>
<tr class="odd">
<td><strong>Release Note ID</strong></td>
<td><strong>Summary</strong></td>
<td><strong>Description</strong></td>
</tr>
<tr class="even">
<td>RN-1273 (NETQ-1390)</td>
<td><p>Network Health card reports incorrect score under certain conditions</p></td>
<td><p>Medium size Network Health card reports incorrect network services health chart score.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td>RN-1274 (NETQ-1392)</td>
<td>Inventory Switches card becomes unresponsive</td>
<td><p>No data is displayed when the Rotten Switches filter is selected in the large size Inventory Switches card.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="even">
<td>RN-1275 (NETQ-1385)</td>
<td><p>License State bar graph shows incorrect titles when filtering</p></td>
<td><p>Large size Inventory Switches card displays incorrect labels for the license state bar graph.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td>RN-1276 (NETQ-1375)</td>
<td><p>License state bar graph shows no data</p></td>
<td><p>Large size Inventory Switches card incorrectly displays license state bar graph.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="even">
<td>RN-1277 (NETQ-1387)</td>
<td>Switch status shows all red at times</td>
<td><p>Small size Inventory Switches card displays inconsistent status color.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td>RN-1278 (NETQ-1383)</td>
<td><p>Port monitoring is unavailable when NetQ Agent is not running on all nodes</p></td>
<td><p>When NetQ Agent is not running on all network nodes, port monitoring data become unavailable.</p>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="even">
<td>RN-1279 (NETQ-1384)</td>
<td>`netq show notification channel` fails</td>
<td><p>The following error is shown when the <code>netq show notification channel</code> command is run:</p>
<div class="code panel pdl" style="border-width: 1px;">
<div class="codeContent panelContent pdl">
<pre class="plain" data-syntaxhighlighter-params="brush: plain; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: plain; gutter: false; theme: Confluence"><code>cumulus@switch:~$ netq show notification channel
Expected String or Unicode</code></pre>
</div>
</div>
<p>This is a known issue that is currently being investigated.</p></td>
</tr>
<tr class="odd">
<td>RN-1280 (NETQ-1509)</td>
<td>NetQ 1.4.x early access features not available in NetQ 2.0.0</td>
<td><p>Extension of the NetQ CLI with custom commands, NetQL, and the export of interface statistics information early access features are not currently available.</p>
<p>These is a known issue that is currently being investigate.</p></td>
</tr>
</tbody>
</table>
