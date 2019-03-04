# NetQ User Interface Overview

The NetQ 2.0.0 graphical user interface (UI) enables you to access NetQ
capabilities through a web browser as opposed to through a terminal
window using the Command Line Interface (CLI). Visual representations of
the health of the network, inventory, and system events make it easy to
both find faults and misconfigurations and to fix them. 

The UI is supported on Google Chrome. Other popular browsers may be
used, but have not been tested and may have some presentation issues. 

Before you get started, you should refer to the release notes for this
version.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes...

-   [Access the NetQ UI](#NetQUserInterfaceOverview-AccesstheNetQUI)
-   [Application Layout](#NetQUserInterfaceOverview-ApplicationLayout)
-   [Main Menu](#NetQUserInterfaceOverview-MainMenu)
-   [Quick Network Health
    View](#NetQUserInterfaceOverview-QuickNetworkHealthView)
-   [Search](#NetQUserInterfaceOverview-Search)
    -   [Create a Search](#NetQUserInterfaceOverview-CreateaSearch)
    -   [Run a Recent
        Search](#NetQUserInterfaceOverview-RunaRecentSearch)
-   [Workbenches](#NetQUserInterfaceOverview-Workbenches)
    -   [Default
        Workbenches](#NetQUserInterfaceOverview-DefaultWorkbenches)
    -   [Create Custom
        Workbench](#NetQUserInterfaceOverview-CreateCustomWorkbench)
-   [Cards](#NetQUserInterfaceOverview-Cards)
    -   [Card Sizes](#NetQUserInterfaceOverview-CardSizes)
        -   [Small Cards](#NetQUserInterfaceOverview-SmallCards)
        -   [Medium Cards](#NetQUserInterfaceOverview-MediumCards)
        -   [Large Cards](#NetQUserInterfaceOverview-LargeCards)
        -   [Full-Screen
            Cards](#NetQUserInterfaceOverview-Full-ScreenCards)
        -   [Data Grid
            Settings](#NetQUserInterfaceOverview-DataGridSettings)
        -   [Export Data](#NetQUserInterfaceOverview-ExportData)
        -   [Card Size
            Summary](#NetQUserInterfaceOverview-CardSizeSummary)
    -   [Card Interactions](#NetQUserInterfaceOverview-CardInteractions)
        -   [Change the Time Period for the Card
            Data](#NetQUserInterfaceOverview-ChangetheTimePeriodfortheCardData)
        -   [Switch to a Different Card
            Size](#NetQUserInterfaceOverview-SwitchtoaDifferentCardSize)
        -   [Reposition a Card on Your
            Workbench](#NetQUserInterfaceOverview-RepositionaCardonYourWorkbench)
    -   [Add or Remove a
        Card](#NetQUserInterfaceOverview-AddDelCardAddorRemoveaCard)
-   [Card Workflows](#NetQUserInterfaceOverview-CardWorkflows)
    -   [Access a Card
        Workflow](#NetQUserInterfaceOverview-AccessaCardWorkflow)
-   [Card Decks](#NetQUserInterfaceOverview-CardDecks)
-   [Basic Terminology and
    Acronyms](#NetQUserInterfaceOverview-BasicTerminologyandAcronyms)
-   [Get Help](#NetQUserInterfaceOverview-GetHelp)

## Access the NetQ UI

Logging in to the NetQ UI is as easy as opening any web page.

To log in to the UI:

1.  Open a new Internet browser window or tab.
2.  Enter the following URL into the Address bar:
    http://*&lt;netq\_platform\_ipaddress&gt;:32666.*

    ![](attachments/8365523/9013598.png){height="250"}

3.  Select your language of choice (English or Spanish) from the
    dropdown at the top of the window.
4.  Enter your username and then your password (*admin, admin *by
    default).  
      
    The default Cumulus Workbench opens, with your username showing in
    the upper right corner of the application.

To log out of the UI:

1.  Click the user icon at the top right of the application.
2.  Select **Log Out.**

## Application Layout

The NetQ UI contains three main areas:

-   **Navigation History** (1): Provides quick access to your recent
    actions. 
-   **Application Header** (2): Contains the main menu, search
    capabilities, quick health status chart, and user account
    information.
-   **Workbench** (3): Contains a task bar, targeted content cards with
    status and configuration information about your network and its
    various components, and the software version.

![](attachments/8365523/9013601.png){width="750"}

## Main Menu

Found in the application header, click
![](attachments/8365523/8367047.png){width="18"}to open the main menu
which provides navigation to:

-   **Favorites**: contains list of links to workbenches that you have
    designated as favorites; Home is listed by default
-   **NetQ**: contains list of links to all workbenches in the
    application
-   **Network**: contains list of links to tabular data about various
    network elements
-   **Admin**: contains link to user documentation

![](attachments/8365523/9013602.png){width="400"}

The content of the NetQ and Favorites lists change as you create and
favorite workbenches.

## Quick Network Health View

Found in the header, the graph and performance rating provide a view
into the health of your network at a glance.

![](attachments/8365523/9012673.png)

## Search

The Global Search field in the UI header enables you to search for
devices.

### Create a Search

As with most search fields, simply begin entering the criteria in the
search field. As you type, items that match the search criteria are
shown in the search history dropdown along with the last time the search
was viewed. Wildcards are not allowed, but this predictive matching
eliminates the need for them. By default, the most recent searches are
shown. If more have been performed, they can be accessed. This may
provide a quicker search by reducing entry specifics and suggesting
recent searches. Selecting a suggested search from the list provides a
preview of the search results to the right.

To create a new search:

1.  Click in the **Global Search** field.
2.  Enter your search criteria.
3.  Click the device hostname or card workflow in the search list to
    open the associated information.  
      
    ![](attachments/8365523/9013604.png){width="300"}

### Run a Recent Search

If you did not save a recent search, but want to rerun the search, you
can check the navigation panel to see if it is in the actions list. If
it is there, just click it to run the search. If it is no longer in the
actions list:

1.  Click in the **Global Search** field.
2.  Begin entering your search criteria.
3.  When the desired search appears in the suggested searches list,
    select it. You may need to click **See All \# Results** to find the
    desired search.  
      
    ![](attachments/8365523/9013603.png){width="300"}

## Workbenches

A workbench is comprised of a given set of cards. Each user may have one
or more workbenches. A user might create a workbench that focuses on
each category of tasks for which he is responsible. For example, a user
could create a workbench focused on Switch Performance and a workbench
focused on Inventory. A set of preconfigured default workbenches are
available to get you started; however, they can can be modified to
better suit your specific tasks.

### Default Workbenches

The Cumulus Workbench is the default workbench provided with the UI. It
contains Device Inventory, Switch Inventory, Alarm and Info Events, and
Network Health cards.

On initial login, if the default workbench is not open,
click ![](attachments/8365523/9013288.png){width="18"} and select
Cumulus Workbench from the NetQ category. After that, to open a
different workbench:

1.  Click  in the Workbench header.
2.  Select the desired workbench.  
      
    ![](attachments/8365523/9013605.png){width="200"}

You can modify a workbench by adding or removing cards or card decks, as
described in Add or Remove a Card.

### Create Custom Workbench

When the default workbench does not meet your needs, you can create
custom workbenches.

To create a custom workbench:

1.  Click ![](https://lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U){width="16"}
    in the Workbench header.
2.  Select **Cumulus Workbench**.
3.  Click  to remove all cards if you want to start with a clean slate.
4.  Follow the instruction in [Add or Remove a
    Card](#NetQUserInterfaceOverview-AddDelCard) to add or remove
    individual cards or card decks.

## Cards

Cards present information about your network for monitoring and
troubleshooting. This is where you can expect to spend most of your
time. Each card describes a particular aspect of the network. Cards are
available in multiple sizes, from small to full screen. The level of the
content on a card varies in accordance with the size of the card, with
the highest level of information on the smallest card to the most
detailed information on the full-screen view. Cards are collected onto a
workbench where you see all of the data relevant to a task or set of
tasks. You can add and remove cards from a workbench, move between cards
and card sizes, and make copies of cards to show different levels of
data at the same time.

### Card Sizes

The various sizes of cards enables you to view your content at just the
right level. For each aspect that you are monitoring there is typically
a single card, that presents increasing amounts of data over its four
sizes. For example, a snapshot of your total inventory may be
sufficient, but to monitor the distribution of hardware vendors may
requires a bit more space. 

#### Small Cards

Small cards are most effective at providing a quick view of the
performance or statistical value of a given aspect of your network. They
are commonly comprised of an icon to identify the aspect being
monitored, summary performance or statistics in the form of a graph
and/or counts, and often an indication of any related events. Other
content items may be present.  Some examples include a Devices Inventory
card, a Switch Inventory card, an Alarm Events card, an Info Events
card, and a Network Health card, as shown here:

![](attachments/8365523/9013606.png){width="900"}

#### Medium Cards

Medium cards are most effective at providing the key measurements for a
given aspect of your network. They are commonly comprised of an icon to
identify the aspect being monitored, one or more key measurements that
make up the overall performance. Often additional information is also
included, such as related events or components. Some examples include a
Devices Inventory card, a Switch Inventory card, an Alarm Events card,
an Info Events card, and a Network Health card, as shown here. Compare
these with their related small- and large-sized cards.

![](attachments/8365523/9013607.png){width="900"}

#### Large Cards

Large cards are most effective at providing the detailed information for
monitoring specific components or functions of a given aspect of your
network. These can aid in isolating and resolving existing issues or
preventing potential issues. They are commonly comprised of detailed
statistics and graphics. Some large cards also have tabs for additional
detail about a given statistic or other related information. Some
examples include a Devices Inventory card, an Alarm Events card, and a
Network Health card, as shown here. Compare these with their related
small- and medium-sized cards.

![](attachments/8365523/9013608.png){width="500"}

#### Full-Screen Cards

Full-screen cards are most effective for viewing all available data
about an aspect of your network all in one place. When you cannot find
what you need in the small, medium, or large cards, it is likely on the
full-screen card. Most full-screen cards are comprised of data grid, or
table; however, some contain visualizations. Some examples include All
Events card and All Switches card, as shown here.

![](attachments/8365523/9013609.png){width="650"}

![](attachments/8365523/9013610.png){width="750"}

#### Data Grid Settings

You can manipulate the data in a data grid in a full screen card in
several ways.

*Sort Data by Column*

Hover over a column header and click  .

*Choose Columns to Display *

1.  Click  at the top right of the card.
2.  Click **Change Columns**.
3.  Click the checkbox next to each column name to toggle on/off the
    columns you would like displayed. Columns listed under **Active**
    are displayed. Columns listed under **Inactive** are not displayed.

    When you have a large number of possible columns for display, you
    can search for the column name using the **Quick Filter** to find
    and select or deselect the column more quickly.

4.  Click  to close the selection box and view the updated data grid.

*Change Order of Columns *

1.  Click ![](https://lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w){width="16"}
    and then click **Change Columns**.
2.  Hover over a column name. 
3.  Point to the six dots to the left of the checkbox. 
4.  Click and drag the selected column up or down in the list.   
    ![](attachments/8365523/9013611.png){height="250"}
5.  Click  to close the selection box and view the updated data grid.

#### Export Data

You can export tabular data from a full screen card to a CSV- or
JSON-formatted file.

To export the data:

1.  Click **EXPORT**.  
    ![](attachments/8365523/9013612.png){width="250"}
2.  Select all data or selected data for export in the dialog box:  
    ![](attachments/8365523/9013304.png){height="250"}
3.  Select the export format.
4.  Click **EXPORT** to save the file to your downloads directory.

#### Card Size Summary

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
<col style="width: 20%" />
</colgroup>
<thead>
<tr class="header">
<th>Card Size</th>
<th>Small</th>
<th>Medium</th>
<th>Large</th>
<th>Full Screen</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Primary Purpose</td>
<td><ul>
<li>Quick view of status, typically at the level of good or bad</li>
<li>Enable quick actions, run a validation or trace for example</li>
</ul></td>
<td><ul>
<li>View key performance parameters or statistics</li>
<li>Perform an action</li>
<li>Look for potential issues</li>
</ul></td>
<td><ul>
<li>View detailed performance and statistics</li>
<li>Perform actions</li>
<li>Compare and review related information</li>
</ul></td>
<td><ul>
<li>View all attributes for given network aspect</li>
<li>Free-form data analysis and visualization</li>
<li>Export data to third-party tools</li>
</ul></td>
</tr>
</tbody>
</table>

### Card Interactions

Every card contains a standard set of interactions, including the
ability to switch between card sizes, and change the time period of the
presented data. Most cards also have additional actions that can be
taken, in the form of links to other cards, scrolling, and so forth. The
four sizes of cards for a particular aspect of the network are connected
into a flow; however, you can have duplicate cards displayed at the
different sizes. Cards with tabular data provide filtering, sorting, and
export of data. The medium and large cards have descriptive text on the
back of the cards.

To access the time period, card size, and additional actions, hover over
the card. These options appear, covering the card header, enabling you
to select the desired option. 

#### Change the Time Period for the Card Data

All cards have a default time period for the data shown on the card,
typically the last 24 hours. You can change the time period to view the
data during a different time range to aid analysis of previous or
existing issues.

To change the time period for a card:

1.  Hover over any card.
2.  Click in the header.
3.  Select a time period from the dropdown list.  
    ![](attachments/8365523/9013613.png){width="200"}

Changing the time period in this manner only changes the time period for
the given card.

#### Switch to a Different Card Size

You can switch between the different card sizes at any time. Only one
size is visible at a time. To view the same card in different sizes,
open a second copy of the card.

To change the card size:

1.  Hover over the card.

2.  Hover over the Card Size Picker and move the cursor to the right or
    left until the desired size option is highlighted.  
    ![](attachments/8365523/9013614.png){width="200"}  
    Single width opens a small card. Double width opens a medium card.
    Triple width opens large cards. Full width opens full-screen cards.
3.  Click the Picker.  
    The card changes to the selected size, and may move its location on
    the workbench.

#### Reposition a Card on Your Workbench

You can also move cards around on the workbench.

To move a card:

1.  Simply click and drag the card to cover another card next to where
    you want to place the card. 
2.  Release your hold on the card when the other card becomes
    highlighted with a dotted line. In this example, we are moving the
    small card on the top right to the left of the medium Devices
    Inventory card. Note when you release the small card, it appears
    greyed out in its original location and the Devices Inventory card
    has the blue dotted line around it.  
    ![](attachments/8365523/9013615.png){height="250"}
3.  Click the card with the highlight to move the original card.  
    ![](attachments/8365523/9013616.png){height="250"}

### Add or Remove a Card

You can add or remove cards from a workbench at any time.

To add a card:

1.  Click ![](attachments/8365523/9012519.png){width="16"}.  
    ![](attachments/8365523/9013312.png){width="125"}
2.  Select a card from the available list.

The card is placed at the end of the set of cards currently on the
workbench. You might need to scroll down to see it. By default, the
medium size of the card is added to your workbench. You can move it to
another location as described above.

To remove a card:

1.  Hover over the card you want to remove.
2.  Click  (*More Actions* menu).
3.  Click **Remove**.  
      
    ![](attachments/8365523/9013617.png){width="110"}

The card is removed from the workbench, but not from the application.

## Card Workflows

The UI provides a number of card workflows. Card workflows focus on a
particular aspect of your network and are a linked set of each size
card—a small card, a medium card, one or more large cards, and one or
more full-screen cards. The following card workflows are available:

-   Network Health: network-wide view of network health
-   Device Inventory: information about all switches and hosts in the
    network
-   Switch Inventory: information about the components on a given switch
-   Alarm Events: information about all critical severity events in the
    system
-   Info Events: information about all warning, info, and debug events
    in the system

### Access a Card Workflow

You can access a card workflow in multiple ways:

-   For workbenches available from the main menu, open the workbench
    that contains the card flow
-   Open a prior search
-   Add it to a workbench
-   Search for it

To open the card workflow through a default workbench:

1.  Click .
2.  Select the relevant workbench.

The workbench opens, hiding your previous workbench.

To open the card workflow from a prior search:

1.  Browse your search list in the navigation panel.
2.  Look for an "Add: &lt;card name&gt;" item.
3.  If it is still available, click the item.

The card appears on the current workbench, at the bottom.

To access the card workflow by adding the card:

1.  Click .
2.  Select the relevant card.

The card appears on the current workbench, at the bottom. 

If you have multiple cards open on your workbench already, you might
need to scroll down to see the card you have just added.

To access the card workflow by searching for the card:

1.  Click in the **Global Search** field.
2.  Enter at least part of the card name.
3.  Select it from the list.

The card appears on a current workbench, at the bottom.

## Card Decks

A card deck is a collection of related cards that can be added and
removed from a workbench all at once. They are distinct from card
workflows, which focus on a particular aspect of your network. A card
deck pulls multiple cards with related information to aid the user in
performing a broader task. It also simplifies the creation of new
workbenches when a card deck is available. The following card decks are
provided by default:

-   Inventory: includes the medium Inventory \| Switch card
-   Events: includes the medium Events \| Alarms card and the small
    Events \| Info card

## Basic Terminology and Acronyms

The following table covers some basic terms used throughout the NetQ
user documentation. 

 

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Term</p></th>
<th><p>Definition</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Agent</p></td>
<td><p>NetQ software that resides on a host server that provides metrics about the host to the NetQ Telemetry Server for network health analysis.</p></td>
</tr>
<tr class="even">
<td>Alarm</td>
<td>In UI, event with critical severity.</td>
</tr>
<tr class="odd">
<td><p>Bridge</p></td>
<td><p>Device that connects two communication networks or network segments. Occurs at OSI Model Layer 2, Data Link Layer.</p></td>
</tr>
<tr class="even">
<td><p>Clos</p></td>
<td><p>Multistage circuit switching network used by the telecommunications industry, first formalized by Charles Clos in 1952.</p></td>
</tr>
<tr class="odd">
<td>Device</td>
<td>UI term referring to a switch, host, or chassis or combination of these. Typically used when describing hardware and components versus a software or network topology. See also Node.</td>
</tr>
<tr class="even">
<td>Event</td>
<td>Change or occurrence in network or component; may or may not trigger a notification. In the NetQ UI, there are two types of events: Alarms which indicate a critical severity event, and Info which indicate warning, informational, and debugging severity events.</td>
</tr>
<tr class="odd">
<td><p>Fabric</p></td>
<td><p>Network topology where a set of network nodes is interconnected through one or more network switches.</p></td>
</tr>
<tr class="even">
<td><p>Fresh</p></td>
<td><p>Node that has been heard from in the last 90 seconds.</p></td>
</tr>
<tr class="odd">
<td><p>High Availability</p></td>
<td><p>Software used to provide a high percentage of uptime (running and available) for network devices.</p></td>
</tr>
<tr class="even">
<td><p>Host</p></td>
<td><p>Device that is connected to a TCP/IP network. May run one or more Virtual Machines.</p></td>
</tr>
<tr class="odd">
<td><p>Hypervisor</p></td>
<td><p>Software which creates and runs Virtual Machines. Also called a Virtual Machine Monitor.</p></td>
</tr>
<tr class="even">
<td>Info</td>
<td>In UI, event with warning, informational, or debugging severity.</td>
</tr>
<tr class="odd">
<td><p>IP Address</p></td>
<td><p>An Internet Protocol address is comprised of a series of numbers assigned to a network device to uniquely identify it on a given network. Version 4 addresses are 32 bits and written in dotted decimal notation with 8-bit binary numbers separated by decimal points. Example: 10.10.10.255. Version 6 addresses are 128 bits and written in 16-bit hexadecimal numbers separated by colons. Example: 2018:3468:1B5F::6482:D673.</p></td>
</tr>
<tr class="even">
<td><p>Leaf</p></td>
<td><p>An access layer switch in a Spine-Leaf or Clos topology. An Exit-Leaf is switch that connects to services outside of the Data Center such as firewalls, load balancers, and Internet routers.</p>
<p>See also Spine, CLOS, Top of Rack and Access Switch.</p></td>
</tr>
<tr class="odd">
<td><p>Linux</p></td>
<td><p>Set of free and open-source software operating systems built around the Linux kernel. Cumulus Linux is one available distribution packages.</p></td>
</tr>
<tr class="even">
<td>Node</td>
<td>UI term referring to a switch, host or chassis in a topology.</td>
</tr>
<tr class="odd">
<td>Notification</td>
<td>Item that informs a user of an event. In UI there are two types of notifications: Alert which is a notification sent by system to inform a user about an event; specifically received through a third-party application, and Message which is a notification sent by a user to share content with another user.</td>
</tr>
<tr class="even">
<td><p>Peerlink</p></td>
<td><p>Link, or bonded links, used to connect two switches in an MLAG pair.</p></td>
</tr>
<tr class="odd">
<td><p>Rotten</p></td>
<td><p>Node that has not been heard from in 90 seconds or more.</p></td>
</tr>
<tr class="even">
<td><p>Router</p></td>
<td><p>Device that forwards data packets (directs traffic) from nodes on one communication network to nodes on another network. Occurs at the OSI Model Layer 3, Network Layer.</p></td>
</tr>
<tr class="odd">
<td><p>Spine</p></td>
<td><p>Used to describe the role of a switch in a Spine-Leaf or CLOS topology. See also Aggregation switch, End of Row switch, and distribution switch.</p></td>
</tr>
<tr class="even">
<td><p>Switch</p></td>
<td><p>High-speed device that connects that receives data packets from one device or node and redirects them to other devices or nodes on a network.</p></td>
</tr>
<tr class="odd">
<td><p>Telemetry server</p></td>
<td><p>NetQ server which receives metrics and other data from NetQ agents on leaf and spine switches and hosts.</p></td>
</tr>
<tr class="even">
<td><p>Top of Rack</p></td>
<td><p>Switch that connects to the network (versus internally)</p></td>
</tr>
<tr class="odd">
<td><p>Virtual Machine</p></td>
<td><p>Emulation of a computer system that provides all of the functions of a particular architecture.</p></td>
</tr>
<tr class="even">
<td><p>Web-scale</p></td>
<td><p>A network architecture designed to deliver capabilities of large cloud service providers within an enterprise IT environment.</p></td>
</tr>
<tr class="odd">
<td><p>Whitebox</p></td>
<td><p>Generic, off-the-shelf, switch or router hardware used in Software Defined Networks (SDN).</p></td>
</tr>
</tbody>
</table>

 

The following table covers some common acronyms used throughout the NetQ
user documentation. 

 

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Acronym</p></th>
<th><p>Meaning</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>ACL</p></td>
<td><p>Access Control Link</p></td>
</tr>
<tr class="even">
<td><p>ARP</p></td>
<td><p>Address Resolution Protocol</p></td>
</tr>
<tr class="odd">
<td><p>ASN</p></td>
<td><p>Autonomous System Number</p></td>
</tr>
<tr class="even">
<td><p>BGP/eBGP/iBGP</p></td>
<td><p>Border Gateway Protocol, External BGP, Internal BGP</p></td>
</tr>
<tr class="odd">
<td><p>CLAG</p></td>
<td><p>Cumulus multi-chassis Link Aggregation Group</p></td>
</tr>
<tr class="even">
<td><p>DHCP</p></td>
<td><p>Dynamic Host Control Protocol</p></td>
</tr>
<tr class="odd">
<td><p>DNS</p></td>
<td><p>Domain Name Server</p></td>
</tr>
<tr class="even">
<td><p>ECMP</p></td>
<td><p>Equal Cost Multi-Path routing</p></td>
</tr>
<tr class="odd">
<td><p>EVPN</p></td>
<td><p>Ethernet Virtual Private Network</p></td>
</tr>
<tr class="even">
<td><p>FDB</p></td>
<td><p>Forwarding Data Base</p></td>
</tr>
<tr class="odd">
<td><p>GNU</p></td>
<td><p>GNU’s Not Linux</p></td>
</tr>
<tr class="even">
<td><p>HA</p></td>
<td><p>High Availability</p></td>
</tr>
<tr class="odd">
<td><p>IGMP</p></td>
<td><p>Internet Group Management Protocol</p></td>
</tr>
<tr class="even">
<td><p>IPv4/IPv6</p></td>
<td><p>Internet Protocol, version 4 or 6</p></td>
</tr>
<tr class="odd">
<td><p>LACP</p></td>
<td><p>Link Aggregation Control Protocol</p></td>
</tr>
<tr class="even">
<td><p>LAN</p></td>
<td><p>Local Area Network</p></td>
</tr>
<tr class="odd">
<td><p>LLDP</p></td>
<td><p>Link Layer Data Protocol</p></td>
</tr>
<tr class="even">
<td><p>MAC</p></td>
<td><p>Media Access Control</p></td>
</tr>
<tr class="odd">
<td><p>MIB</p></td>
<td><p>Management Information Base</p></td>
</tr>
<tr class="even">
<td><p>MLAG</p></td>
<td><p>Multi-chassis Link Aggregation Group</p></td>
</tr>
<tr class="odd">
<td><p>MLD</p></td>
<td><p>Multicast Listener Discovery</p></td>
</tr>
<tr class="even">
<td><p>NTP</p></td>
<td><p>Network Time Protocol</p></td>
</tr>
<tr class="odd">
<td><p>OOB</p></td>
<td><p>Out of Band (management)</p></td>
</tr>
<tr class="even">
<td><p>OSPF</p></td>
<td><p>Open Shortest Path First</p></td>
</tr>
<tr class="odd">
<td><p>RFC</p></td>
<td><p>Remote Function Call</p></td>
</tr>
<tr class="even">
<td><p>SDN</p></td>
<td><p>Software-Defined Network</p></td>
</tr>
<tr class="odd">
<td><p>SNMP</p></td>
<td><p>Simple Network Management Protocol</p></td>
</tr>
<tr class="even">
<td><p>SSH</p></td>
<td><p>Secure SHell</p></td>
</tr>
<tr class="odd">
<td><p>SQL</p></td>
<td><p>Structured Query Language</p></td>
</tr>
<tr class="even">
<td><p>STP</p></td>
<td><p>Spanning Tree Protocol</p></td>
</tr>
<tr class="odd">
<td><p>TCP</p></td>
<td><p>Transport Control Protocol</p></td>
</tr>
<tr class="even">
<td><p>ToR</p></td>
<td><p>Top of Rack</p></td>
</tr>
<tr class="odd">
<td><p>UDP</p></td>
<td><p>User Datagram Protocol</p></td>
</tr>
<tr class="even">
<td><p>URL</p></td>
<td><p>Universal Resource Locator</p></td>
</tr>
<tr class="odd">
<td><p>USB</p></td>
<td><p>Universal Serial Bus</p></td>
</tr>
<tr class="even">
<td><p>VLAN</p></td>
<td><p>Virtual Local Area Network</p></td>
</tr>
<tr class="odd">
<td><p>VNI</p></td>
<td><p>Virtual Network Instance</p></td>
</tr>
<tr class="even">
<td><p>VPN</p></td>
<td><p>Virtual Private Network</p></td>
</tr>
<tr class="odd">
<td><p>VRF</p></td>
<td><p>Virtual Routing and Forwarding</p></td>
</tr>
<tr class="even">
<td><p>VRR</p></td>
<td><p>Virtual Router Redundancy</p></td>
</tr>
<tr class="odd">
<td><p>VTEP</p></td>
<td><p>VXLAN Tunnel EndPoint</p></td>
</tr>
<tr class="even">
<td><p>VXLAN</p></td>
<td><p>Virtual Extensible Local Area Network</p></td>
</tr>
<tr class="odd">
<td><p>ZTP</p></td>
<td><p>Zero Touch Provisioning</p></td>
</tr>
</tbody>
</table>

 

Format Cues 

Color is used to indicate links, options, and status within the UI.

| Item                                | Color  |
|-------------------------------------|--------|
| Hover on item                       | Blue   |
| Clickable item                      | Black  |
| Selected item                       | Green  |
| Highlighted item                    | Blue   |
| Link                                | Blue   |
| Good/Successful results             | Green  |
| Result with critical severity event | Pink   |
| Result with high severity event     | Red    |
| Result with medium severity event   | Orange |
| Result with low severity event      | Yellow |

## Get Help

You can access the user documentation for the UI from the Main Menu.
Just click ![](attachments/8365523/9012525.png){width="18"} and select
*Help Documentation* under the ADMIN category.

 

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-10-24
11:17:15.png](attachments/8365523/8365521.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-10-24
11:19:7.png](attachments/8365523/8365522.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-10-24
15:31:13.png](attachments/8365523/8365545.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-10-24
17:59:28.png](attachments/8365523/8365562.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-12-10
15:56:55.png](attachments/8365523/8367047.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-28
16:24:47.png](attachments/8365523/9012519.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-28
16:26:52.png](attachments/8365523/9012520.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-28
16:51:0.png](attachments/8365523/9012525.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
15:40:33.png](attachments/8365523/9012669.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
15:41:28.png](attachments/8365523/9012670.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
15:46:27.png](attachments/8365523/9012671.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
16:2:35.png](attachments/8365523/9012673.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
16:12:43.png](attachments/8365523/9012674.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-4
16:18:12.png](attachments/8365523/9012675.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-13
20:29:27.png](attachments/8365523/9013288.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-13
20:51:19.png](attachments/8365523/9013304.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-13
20:55:19.png](attachments/8365523/9013309.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-13
20:56:7.png](attachments/8365523/9013310.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-13
20:56:45.png](attachments/8365523/9013311.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-13
20:58:15.png](attachments/8365523/9013312.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:19:40.png](attachments/8365523/9013597.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:20:1.png](attachments/8365523/9013598.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:31:4.png](attachments/8365523/9013600.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:36:12.png](attachments/8365523/9013601.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:39:9.png](attachments/8365523/9013602.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:42:9.png](attachments/8365523/9013603.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:44:41.png](attachments/8365523/9013604.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:49:42.png](attachments/8365523/9013605.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
10:54:2.png](attachments/8365523/9013606.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:1:42.png](attachments/8365523/9013607.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:4:45.png](attachments/8365523/9013608.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:13:52.png](attachments/8365523/9013609.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:15:42.png](attachments/8365523/9013610.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:26:10.png](attachments/8365523/9013611.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:35:31.png](attachments/8365523/9013612.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:47:45.png](attachments/8365523/9013613.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:50:3.png](attachments/8365523/9013614.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
11:58:18.png](attachments/8365523/9013615.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
12:1:10.png](attachments/8365523/9013616.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
12:6:2.png](attachments/8365523/9013617.png) (image/png)  
