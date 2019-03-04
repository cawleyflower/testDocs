# UI Preface

A variety of resources are available for you to become familiar with
Cumulus NetQ and to take advantage of its monitoring and analytic
capabilities. These resources are identified here along with information
about how the content is presented.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes...

-   [What's New in Cumulus NetQ
    2.0.0](#UIPreface-What'sNewinCumulusNetQ2.0.0)
-   [Available Documentation](#UIPreface-AvailableDocumentation)
-   [Document Formatting](#UIPreface-DocumentFormatting)
    -   [Typographical Conventions](#UIPreface-TypographicalConventions)
    -   [Note Conventions ](#UIPreface-NoteConventions)

## What's New in Cumulus NetQ 2.0.0

Cumulus NetQ 2.0.0 includes the following new and updated features:

-   Added
    -   Modern cloud-based infrastructure enables scalable
        and agile network with real-time data collection
    -   Graphical User Interface (UI) provides a visual representation
        of the network devices and events
        -   Monitor network-wide health
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
        between two points in time, a new `netq``show events` command is
        available to see these changes.
    -   The `netq config ts` commands used to configure the Telemetry
        Server has been deprecated. `netq config` commands remain for
        local file-based configuration and `netq notification` commands
        have been added for configuring event notifications.
    -   Timestamps which indicate when a change occurred are displayed
        as an absolute time (Mon Feb  4 07:23:18 2019) versus relative
        to the current time (0d:2h:58m:34s ago). Uptimes remain relative
        to the current time.

The following features have been deprecated in this release:

-   NetQL, query language for directly accessing the database. This data
    is now available through the NetQ UI.
-   `netq-shell` command. This is no longer needed as you can run
    commands from any node.
-   Service Console. Access the CLI directly rather than through the UI.

For additional details about changes to the CLI, refer to the [NetQ
Command Line
Overview](https://docs.cumulusnetworks.com/display/NETQ20DRAFT/NetQ+Command+Line+Overview).

For further information regarding bug fixes and known issues present in
this release, refer to the [release
notes](https://wiki.cumulusnetworks.com/display/PC/NetQ+2.0+EA+User+Documentation). 

## Available Documentation

The NetQ documentation set has been reorganized and updated from prior
releases. They still provide the information you need to
proactively monitor your Linux-based network fabric using Cumulus NetQ.
They assume that you have already installed Cumulus Linux and NetQ. 

You may start anywhere in the documentation or read it from start to
finish depending on your role and familiarity with the NetQ software and
Linux networking. If you are new to NetQ, you may want to read
the Cumulus NetQ Primer before reading the other available documents to
gain a high-level understanding of the product capabilities and
operation.

The following NetQ documents are available: 

-   [Cumulus NetQ Deployment Guide](Cumulus_NetQ_Deployment_Guide)
-   [Cumulus NetQ CLI User Guide](Cumulus_NetQ_CLI_User_Guide)
-   Cumulus NetQ UI User Guide (this guide)

-   [Cumulus NetQ Release
    Notes](https://wiki.cumulusnetworks.com/display/PC/NetQ+2.0+EA+User+Documentation)

This Cumulus NetQ Telemetry User Guide is available
in [PDF](https://wiki.cumulusnetworks.com/display/PC/NetQ+2.0+EA+User+Documentation)
for offline viewing.

## Document Formatting

This guide uses the following typographical and note conventions.

### Typographical Conventions

Throughout the guide, text formatting is used to convey contextual
information about the content.

 

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
<p><strong>Text Format</strong></p>
</div></th>
<th><div>
<p><strong>Meaning</strong></p>
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Green text</p></td>
<td>Link to additional content within the topic or to another topic</td>
</tr>
<tr class="even">
<td><p><code>Text in Monospace font</code></p></td>
<td><p>Filename, directory and path names, and command usage</p></td>
</tr>
<tr class="odd">
<td><p>[Text within square brackets]</p></td>
<td><p>Optional command parameters; may be presented in mixed case or all caps text</p></td>
</tr>
<tr class="even">
<td></td>
<td><p>Required command parameter values–variables that are to be replaced with a relevant value; may be presented in mixed case or all caps text</p></td>
</tr>
</tbody>
</table>

 

### Note Conventions 

Several note types are used throughout the document. The formatting of
the note indicates its intent and urgency.

Tip or Best Practice

Offers information to improve your experience with the tool, such as
time-saving or shortcut options, or indicates the common or recommended
method for performing a particular task or process

Information

Provides additional information or a reminder about a task or process
that may impact your next step or selection

Caution

Advises that failure to take or avoid specific action can result in
possible data loss

Warning

Advises that failure to take or avoid specific action can result in
possible physical harm to yourself, hardware equipment, or facility
