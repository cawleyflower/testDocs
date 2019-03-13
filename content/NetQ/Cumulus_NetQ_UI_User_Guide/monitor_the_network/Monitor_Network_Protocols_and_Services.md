# Monitor Network Protocols and Services

The Network Services card workflows provide a network-wide view into the
routing, link, and virtual network protocols installed in your network.
In this release, you can monitor the network-wide behavior (all
sessions) of the BGP, EVPN, MLAG, and LLDP services. Each protocol has
its own card workflow containing:

-   a small card with an overall status,

-   a medium card displaying key attributes of the protocol,

-   a large card with detailed performance statistics, some with
    additional tabs, and

-   full screen cards displaying attributes of all associated switches,
    sessions, alarms or other relevant data.

Refer to [NetQ User Interface Overview](NetQ_User_Interface_Overview)
for information about navigating the card workflows and performing
common actions.

# Contents

This topic describes how to...

# Monitor the BGP Service (All Sessions)

With NetQ, you can monitor the number of nodes running the BGP service,
view switches with the most established and unestablished BGP sessions,
and view alarms triggered by the BGP service. For an overview and how to
configure BGP to run in your data center network, refer to [Border
Gateway Protocol -
BGP](https://docs.cumulusnetworks.com/display/DOCS/Border+Gateway+Protocol+-+BGP).

## BGP Service Card Workflow

The small BGP Service card displays:

![](images/download/attachments/8367112/image2019-2-28_17_41_29.png)

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p><strong>BGP</strong>: All BGP Sessions, or the BGP Service</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches and hosts with the BGP service enabled during the designated time period</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of BGP-related alarms received during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Chart</p></td>
<td><p>Distribution of BGP-related alarms received during the designated time period</p></td>
</tr>
</tbody>
</table>

The medium BGP Service card displays:

![](images/download/attachments/8367112/image2019-2-28_17_48_6.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Network Services | All BGP Sessions</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches and hosts with the BGP service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of BGP-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Running chart</p></td>
<td><p>Total number and distribution of switches and hosts with the BGP service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Total Alarms chart</p></td>
<td><p>Total number and distribution of BGP-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Not Est. chart</p></td>
<td><p>Total number and distribution of switches and hosts with unestablished BGP sessions during the designated time period</p></td>
</tr>
</tbody>
</table>

The large BGP service card contains two tabs.

The Sessions Summary tab displays:

![](images/download/attachments/8367112/image2019-3-1_14_43_6.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Sessions Summary (visible when you hover over card)</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches and hosts with the BGP service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of BGP-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Running chart</p></td>
<td><p>Total number and distribution of switches and hosts with the BGP service enabled</p></td>
</tr>
<tr class="odd">
<td><p>Total Nodes Not Est. chart</p></td>
<td><p>Total number and distribution of switches and hosts with unestablished BGP sessions during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Table/Filter options</p></td>
<td><p>When the <strong>Switches with Most Sessions</strong> filter option is selected, the table displays the switches and hosts running BGP sessions in decreasing order of session count—devices with the largest number of sessions are listed first</p>
<p>When the <strong>Switches with Most Unestablished Sessions</strong> filter option is selected, the table switches and hosts running BGP sessions in decreasing order of unestablished sessions—devices with the largest number of unestablished sessions are listed first</p></td>
</tr>
<tr class="odd">
<td><p>Show All Sessions</p></td>
<td><p>Link to view data for all BGP sessions in the full screen card</p></td>
</tr>
</tbody>
</table>

The *Alarms* tab displays:

![](images/download/attachments/8367112/image2019-3-3_11_51_10.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Alarms (visible when you hover over card)</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches and hosts with the BGP service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of BGP-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Alarms chart</p></td>
<td><p>Total number and distribution of BGP-related alarms received during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Table/Filter options</p></td>
<td><p>When the selected filter option is <strong>Switches with Most Alarms</strong>, the table displays <strong></strong> switches and hosts running BGP in decreasing order of the count of alarms—devices with the largest number of BGP alarms are listed first</p></td>
</tr>
<tr class="even">
<td><p>Show All Sessions</p></td>
<td><p>Link to view data for all BGP sessions in the full screen card</p></td>
</tr>
</tbody>
</table>

The full screen BGP Service card provides tabs for all switches, all
sessions, and all alarms.

![](images/download/attachments/8367112/image2019-2-28_18_38_4.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Network Services | BGP</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" alt="images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" /></p></td>
<td><p>Closes full screen card and returns to workbench</p></td>
</tr>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes; select an alternate time period by clicking <img src="images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" alt="images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" /></p></td>
</tr>
<tr class="even">
<td><p>Results</p></td>
<td><p>Number of results found for the selected tab</p></td>
</tr>
<tr class="odd">
<td><p>All Switches tab</p></td>
<td><p>Displays all switches and hosts running the BGP service. By default, the device list is sorted by hostname. This tab provides the following additional data about each device:</p>
<ul>
<li><p>Agent State and Version</p></li>
<li><p>ASIC Core BW, Model, Model Id, Ports, and Vendor</p></li>
<li><p>CPU Arch, Max Freq, Model, and Nos</p></li>
<li><p>Disk Total Size</p></li>
<li><p>License State</p></li>
<li><p>Memory Size</p></li>
<li><p>OS Vendor, Version, and Version Id</p></li>
<li><p>Platform Date, MAC, Model, Number, Revision, Series, and Vendor</p></li>
<li><p>Time</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>All Sessions tab</p></td>
<td><p>Displays all BGP sessions network-wide. By default, the session list is sorted by hostname. This tab provides the following additional data about each session:</p>
<ul>
<li><p>ASN</p></li>
<li><p>Conn Dropped and Estd</p></li>
<li><p>DB State</p></li>
<li><p>Evpn, Ipv4, and Ipv6 Pfx Rcvd</p></li>
<li><p>Last Reset Time</p></li>
<li><p>Objid</p></li>
<li><p>OPID</p></li>
<li><p>Peer ASN, Hostname, Name, and Router Id</p></li>
<li><p>Reason</p></li>
<li><p>Rx and Tx Families</p></li>
<li><p>State</p></li>
<li><p>Timestamp</p></li>
<li><p>Upd8 Rx and Tx</p></li>
<li><p>Up Time</p></li>
<li><p>Vrf and Vrfid</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>All Alarms tab</p></td>
<td><p>Displays all BGP events network-wide. By default, the event list is sorted by time, with the most recent events listed first. The tab provides the following additional data about each event:</p>
<ul>
<li><p>Message</p></li>
<li><p>Severity</p></li>
<li><p>Source</p></li>
<li><p>Type</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Export</p></td>
<td><p>Enables export of all or selected items in a CSV or JSON formatted file</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

## View Service Status Summary

A summary of the BGP service is available from the Network Services card
workflow, including the number of nodes running the service, the number
of BGP-related alarms, and a distribution of those alarms.

To view the summary, open the small BGP Service card.

![](images/download/attachments/8367112/image2019-2-28_17_41_29.png)

For more detail, select a different size BGP Service card.

## View the Distribution of Sessions and Alarms

It is useful to know the number of network nodes running the BGP
protocol over a period of time, as it gives you insight into the amount
of traffic associated with and breadth of use of the protocol. It is
also useful to compare the number of nodes running BGP with
unestablished sessions with the alarms present at the same time to
determine if there is any correlation between the issues and the ability
to establish a BGP session.

To view these distributions, open the medium BGP Service card.

![](images/download/attachments/8367112/image2019-2-28_17_48_60.png){height="250"}

If a visual correlation is apparent, you can dig a little deeper with
the large BGP Service card tabs.

## View Devices with the Most BGP Sessions

You can view the load from BGP on your switches and hosts using the
large Network Services card. This data enables you to see which switches
are handling the most BGP traffic currently, validate that is what is
expected based on your network design, and compare that with data from
an earlier time to look for any differences.

To view switches and hosts with the most BGP sessions:

1.  Open the large BGP Service card.

2.  Select **SWITCHES WITH MOST SESSIONS** from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    running the most BGP sessions at the top. Scroll down to view those
    with the fewest sessions.

    ![](images/download/attachments/8367112/image2019-3-1_14_43_60.png){height="250"}

To compare this data with the same data at a previous time:

1.  Open another large BGP Service card.

2.  Move the new card next to the original card if needed.

3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](images/lh4.googleusercontent.com/fo-yr9tPWzyO_CQPDiddcB5tmuwuX1OS7nIlj4_9iA3_6xnmg_c-54SmAAdNJL_odR0UGjeTSxRHw2BHkeZ3YEfiwOhjpUeHVwPVd8s4F2XwOGnRWXD4NfaIzj86ETYgEU8frnzw)
    .

4.  Select the time period that you want to compare with the original
    time. We chose *Past Week* for this example.

    ![](images/download/attachments/8367112/image2019-3-3_12_34_3.png)

    You can now see whether there are significant differences between
    this time and the original time.

    ![](images/download/attachments/8367112/image2019-3-3_12_36_50.png){height="250"}

    In this example, there is no difference, but in a real data center
    environment you much more likely to see differences. If the changes
    are unexpected, you can investigate further by looking at another
    time frame, determining if more nodes are now running BGP than
    previously, looking for changes in the topology, and so forth.

View Devices with the Most Unestablished BGP Sessions

You can identify switches and hosts that are experiencing difficulties
establishing BGP sessions; both currently and in the past.

To view switches with the most unestablished BGP sessions:

1.  Open the large BGP Service card.

2.  Select **SWITCHES WITH MOST UNESTABLISHED SESSIONS** from the filter
    above the table.\
    The table content is sorted by this characteristic, listing nodes
    with the most unestablished BGP sessions at the top. Scroll down to
    view those with the fewest unestablished sessions.

    ![](images/download/attachments/8367112/image2019-3-3_12_43_26.png){height="250"}

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the **Total Nodes Not Est.** chart to focus on the
    switches and hosts with the most unestablished sessions during that
    smaller time slice.\
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.

    ![](images/download/attachments/8367112/image2019-3-3_12_47_26.png){height="250"}

-   Change the time period for the data to compare with a prior time.

    ![](images/download/attachments/8367112/image2019-3-3_12_50_4.png){height="250"}

    If the same switches are consistently indicating the most
    unestablished sessions (in our example, exit-2, tor-2, and spine-1),
    you might want to look more carefully at those switches using the
    Switches card workflow to determine probable causes. Refer to
    [Monitor Switches](Monitor_Switches).

-   Click **Show All Sessions** to investigate all BGP sessions with
    events in the full screen card.

## View Devices with the Most BGP-related Alarms

Switches or hosts experiencing a large number of BGP alarms may indicate
a configuration or performance issue that needs further investigation.
You can view the devices sorted by the number of BGP alarms and then use
the Switches card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view switches with the most BGP alarms:

1.  Open the large BGP Service card.

2.  Hover over the header and click
    ![](images/lh3.googleusercontent0.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT)
    .

3.  Select **SWITCHES WITH MOST ALARMS** from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    with the most BGP alarms at the top. Scroll down to view those with
    the fewest alarms.

    ![](images/download/attachments/8367112/image2019-3-3_12_58_38.png){height="250"}

Where to go next depends on what data you see, but a few options
include:

-   Hover over the Total Alarms chart to focus on the switches
    exhibiting alarms during that smaller time slice.\
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.

    ![](images/download/attachments/8367112/image2019-3-3_13_0_57.png){height="250"}

-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most alarms, you
    might want to look more carefully at those switches using the
    Switches card workflow.\
    ![](images/download/attachments/8367112/image2019-3-3_12_34_30.png)
    ![](images/download/attachments/8367112/image2019-3-3_13_3_50.png){height="250"}\
    In this example, the total alarm count has reduced significantly
    from one week ago.

-   Click **Show All Sessions** to investigate all BGP sessions with
    events in the full screen card.

## View All BGP Events

The BGP Network Services card workflow enables you to view all of the
BGP events in the designated time period.

To view all BGP events:

1.  Open the full screen BGP Service card.

2.  Click **All Alarms** tab in the navigation panel.\
    By default, events are listed in most recent to least recent order.

3.  Sort by **Type** to bring the BGP events to the top of the table.

    ![](images/download/attachments/8367112/image2019-3-3_13_19_4.png){height="250"}

Where to go next depends on what data you see, but a couple of options
include:

-   Open one of the other full screen tabs in this flow to focus on
    devices or sessions.

-   Export the data for use in another analytics tool, by clicking
    **Export** and providing a name for the data file.

## View Details for All Devices Running BGP

You can view all stored attributes of all switches and hosts running BGP
in your network in the full screen card.

To view all device details, open the full screen BGP Service card and
click the **All Switches** tab.

![](images/download/attachments/8367112/image2019-3-3_13_23_20.png)

To return to your workbench, click
![](images/download/attachments/8367112/close.png) in the top right
corner.

## View Details for All BGP Sessions

You can view all stored attributes of all BGP sessions in your network
in the full-screen card.

To view all session details, open the full screen BGP Service card and
click the **All Sessions** tab.

![](images/download/attachments/8367112/image2019-3-3_13_26_4.png)

To return to your workbench, click
![](images/download/attachments/8367112/close.png) next to the title of
the full screen card.

# Monitor the EVPN Service (All Sessions)

With NetQ, you can monitor the number of nodes running the EVPN service,
view switches with the sessions, total number of VNIs, and alarms
triggered by the EVPN service. For an overview and how to configure EVPN
in your data center network, refer to [Ethernet Virtual Private Network
-
EVPN](https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN).

## EVPN Service Card Workflow Summary

The small EVPN Service card displays:

![](images/download/attachments/8367112/image2019-3-3_13_33_42.png)

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p><strong>EVPN</strong>: All EVPN Sessions, or the EVPN Service</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches and hosts with the EVPN service enabled during the designated time period</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of EVPN-related alarms received during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Chart</p></td>
<td><p>Distribution of EVPN-related alarms received during the designated time period</p></td>
</tr>
</tbody>
</table>

The medium EVPN Service card displays:

![](images/download/attachments/8367112/image2019-3-3_15_9_13.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Network Services | All EVPN Sessions</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches and hosts with the EVPN service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of EVPN-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Running chart</p></td>
<td><p>Total number and distribution of switches and hosts with the EVPN service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Total Alarms chart</p></td>
<td><p>Total number and distribution of EVPN-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Sessions chart</p></td>
<td><p>Total number and distribution of EVPN sessions network-wide during the designated time period</p></td>
</tr>
</tbody>
</table>

The large EVPN service card contains two tabs.

The Sessions Summary tab which displays:

![](images/download/attachments/8367112/image2019-3-3_14_19_32.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Sessions Summary (visible when you hover over card)</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches and hosts with the EVPN service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of EVPN-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Running chart</p></td>
<td><p>Total number and distribution of switches and hosts with the EVPN service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Total Sessions chart</p></td>
<td><p>Total number and distribution of EVPN sessions network-wide during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total L3 VNIs chart</p></td>
<td><p>Total number and distribution of layer 3 VXLAN Network Identifiers network-wide</p></td>
</tr>
<tr class="odd">
<td><p>Table/Filter options</p></td>
<td><p>When the <strong>Top Switches with Most Sessions</strong> filter is selected, the table displays devices running EVPN sessions in decreasing order of session count—devices with the largest number of sessions are listed first.</p>
<p>When the <strong>Switches with Most L2 EVPN</strong> filter is selected, the table displays devices running layer 2 EVPN sessions in decreasing order of session count—devices with the largest number of sessions are listed first.</p>
<p>When the <strong>Switches with</strong> <strong>Most L3 EVPN</strong> filter is selected, the table displays devices running layer 3 EVPN sessions in decreasing order of session count—devices with the largest number of sessions are listed first.</p></td>
</tr>
<tr class="even">
<td><p>Show All Sessions</p></td>
<td><p>Link to view data for all EVPN sessions in the full screen card</p></td>
</tr>
</tbody>
</table>

The *Alarms* tab which displays:

![](images/download/attachments/8367112/image2019-3-3_14_36_17.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Alarms (visible when you hover over card)</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches and hosts with the EVPN service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of EVPN-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Alarms chart</p></td>
<td><p>Total number and distribution of EVPN-related alarms received during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Table/Filter options</p></td>
<td><p>When the <strong>Events by Most Active Device</strong> filter is selected, the table displays devices running EVPN sessions in decreasing order of alarm count—devices with the largest number of alarms are listed first</p></td>
</tr>
<tr class="even">
<td><p>Show All Sessions</p></td>
<td><p>Link to view data for all EVPN sessions in the full screen card</p></td>
</tr>
</tbody>
</table>

The full screen EVPN Service card provides tabs for all switches, all
sessions, all alarms.

![](images/download/attachments/8367112/image2019-3-3_14_43_58.png)

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Network Services | EVPN</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" alt="images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" /></p></td>
<td><p>Closes full screen card and returns to workbench</p></td>
</tr>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes; select an alternate time period by clicking <img src="images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" alt="images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" /></p></td>
</tr>
<tr class="even">
<td><p>Results</p></td>
<td><p>Number of results found for the selected tab</p></td>
</tr>
<tr class="odd">
<td><p>All Switches tab</p></td>
<td><p>Displays all switches and hosts running the EVPN service. By default, the device list is sorted by hostname. This tab provides the following additional data about each device:</p>
<ul>
<li><p>Agent State and Version</p></li>
<li><p>ASIC Core BW, Model, Model Id, Ports, and Vendor</p></li>
<li><p>CPU Arch, Max Freq, Model, and Nos</p></li>
<li><p>Disk Total Size</p></li>
<li><p>License State</p></li>
<li><p>Memory Size</p></li>
<li><p>OS Vendor, Version, and Version Id</p></li>
<li><p>Platform Date, MAC, Model, Number, Revision, Series, and Vendor</p></li>
<li><p>Time</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>All Sessions tab</p></td>
<td><p>Displays all EVPN sessions network-wide. By default, the session list is sorted by hostname. This tab provides the following additional data about each session:</p>
<ul>
<li><p>Adv All Vni and Adv Gw Ip</p></li>
<li><p>DB State</p></li>
<li><p>Export and Import RT</p></li>
<li><p>In Kernel</p></li>
<li><p>Is L3</p></li>
<li><p>Origin Ip</p></li>
<li><p>OPID</p></li>
<li><p>Rd</p></li>
<li><p>Timestamp</p></li>
<li><p>Vni</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>All Alarms tab</p></td>
<td><p>Displays all EVPN events network-wide. By default, the event list is sorted by time, with the most recent events listed first. The tab provides the following additional data about each event:</p>
<ul>
<li><p>Message</p></li>
<li><p>Severity</p></li>
<li><p>Source</p></li>
<li><p>Type</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Export</p></td>
<td><p>Enables export of all or selected items in a CSV or JSON formatted file</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

## View Service Status Summary

A summary of the EVPN service is available from the Network Services
card workflow, including the number of nodes running the service, the
number of EVPN-related alarms, and a distribution of those alarms.

To view the summary, open the small EVPN Network Service card.

![](images/download/attachments/8367112/image2019-3-3_13_33_42.png)

For more detail, select a different size EVPN Network Service card.

## View the Distribution of Sessions and Alarms

It is useful to know the number of network nodes running the EVPN
protocol over a period of time, as it gives you insight into the amount
of traffic associated with and breadth of use of the protocol. It is
also useful to compare the number of nodes running EVPN with the alarms
present at the same time to determine if there is any correlation
between the issues and the ability to establish an EVPN session.

To view these distributions, open the medium EVPN Service card.

![](images/download/attachments/8367112/image2019-3-3_15_9_4.png){height="250"}

If a visual correlation is apparent, you can dig a little deeper with
the large EVPN Service card tabs.

## View the Distribution of Layer 3 VNIs

It is useful to know the number of layer 3 VNIs, as it gives you insight
into the complexity of the VXLAN.

To view this distribution, open the large EVPN Service card and view the
bottom chart on the left.

![](images/download/attachments/8367112/image2019-3-3_15_14_21.png){height="250"}

## View Devices with the Most EVPN Sessions

You can view the load from EVPN on your switches and hosts using the
large EVPN Service card. This data enables you to see which switches are
handling the most EVPN traffic currently, validate that is what is
expected based on your network design, and compare that with data from
an earlier time to look for any differences.

To view switches and hosts with the most EVPN sessions:

1.  Open the large EVPN Service card.

2.  Select **TOP** **SWITCHES WITH MOST SESSIONS** from the filter above
    the table.\
    The table content is sorted by this characteristic, listing nodes
    running the most EVPN sessions at the top. Scroll down to view those
    with the fewest sessions.

    ![](images/download/attachments/8367112/image2019-3-3_15_21_25.png){height="250"}

To compare this data with the same data at a previous time:

1.  Open another large EVPN Service card.

2.  Move the new card next to the original card if needed.

3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](images/lh4.googleusercontent.com/fo-yr9tPWzyO_CQPDiddcB5tmuwuX1OS7nIlj4_9iA3_6xnmg_c-54SmAAdNJL_odR0UGjeTSxRHw2BHkeZ3YEfiwOhjpUeHVwPVd8s4F2XwOGnRWXD4NfaIzj86ETYgEU8frnzw)
    .

4.  Select the time period that you want to compare with the current
    time.\
    You can now see whether there are significant differences between
    this time period and the previous time period.\
    ![](images/download/attachments/8367112/image2019-3-3_12_34_30.png)
    ![](images/download/attachments/8367112/image2019-3-3_15_25_3.png){height="250"}

If the changes are unexpected, you can investigate further by looking at
another time frame, determining if more nodes are now running EVPN than
previously, looking for changes in the topology, and so forth.

## View Devices with the Most Layer 2 EVPN Sessions

You can view the number layer 2 EVPN sessions on your switches and hosts
using the large EVPN Service card. This data enables you to see which
switches are handling the most EVPN traffic currently, validate that is
what is expected based on your network design, and compare that with
data from an earlier time to look for any differences.

To view switches and hosts with the most layer 2 EVPN sessions:

1.  Open the large EVPN Service card.

2.  Select **SWITCHES WITH MOST L2 EVPN** from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    running the most layer 2 EVPN sessions at the top. Scroll down to
    view those with the fewest sessions.

    ![](images/download/attachments/8367112/image2019-3-3_15_30_5.png){height="250"}

To compare this data with the same data at a previous time:

1.  Open another large EVPN Service card.

2.  Move the new card next to the original card if needed.

3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](images/lh4.googleusercontent.com/fo-yr9tPWzyO_CQPDiddcB5tmuwuX1OS7nIlj4_9iA3_6xnmg_c-54SmAAdNJL_odR0UGjeTSxRHw2BHkeZ3YEfiwOhjpUeHVwPVd8s4F2XwOGnRWXD4NfaIzj86ETYgEU8frnzw)
    .

4.  Select the time period that you want to compare with the current
    time.\
    You can now see whether there are significant differences between
    this time period and the previous time period.\
    ![](images/download/attachments/8367112/image2019-3-3_12_34_30.png)
    ![](images/download/attachments/8367112/image2019-3-3_15_32_30.png){height="250"}

If the changes are unexpected, you can investigate further by looking at
another time frame, determining if more nodes are now running EVPN than
previously, looking for changes in the topology, and so forth.

## View Devices with the Most Layer 3 EVPN Sessions

You can view the number layer 3 EVPN sessions on your switches and hosts
using the large EVPN Service card. This data enables you to see which
switches are handling the most EVPN traffic currently, validate that is
what is expected based on your network design, and compare that with
data from an earlier time to look for any differences.

To view switches and hosts with the most layer 3 EVPN sessions:

1.  Open the large EVPN Service card.

2.  Select **SWITCHES WITH MOST L3 EVPN** from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    running the most layer 3 EVPN sessions at the top. Scroll down to
    view those with the fewest sessions.

    ![](images/download/attachments/8367112/image2019-3-3_15_35_22.png){height="250"}

To compare this data with the same data at a previous time:

1.  Open another large EVPN Service card.

2.  Move the new card next to the original card if needed.

3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](images/lh4.googleusercontent.com/fo-yr9tPWzyO_CQPDiddcB5tmuwuX1OS7nIlj4_9iA3_6xnmg_c-54SmAAdNJL_odR0UGjeTSxRHw2BHkeZ3YEfiwOhjpUeHVwPVd8s4F2XwOGnRWXD4NfaIzj86ETYgEU8frnzw)
    .

4.  Select the time period that you want to compare with the current
    time.\
    You can now see whether there are significant differences between
    this time period and the previous time period.\
    ![](images/download/attachments/8367112/image2019-3-3_12_34_30.png)
    ![](images/download/attachments/8367112/image2019-3-3_15_38_7.png){height="250"}

If the changes are unexpected, you can investigate further by looking at
another time frame, determining if more nodes are now running EVPN than
previously, looking for changes in the topology, and so forth.

## View Devices with the Most EVPN-related Alarms

Switches experiencing a large number of EVPN alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the switches sorted by the number of BGP alarms and then use
the Switches card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view switches with the most EVPN alarms:

1.  Open the large EVPN Service card.

2.  Hover over the header and click
    ![](images/lh3.googleusercontent0.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT)
    .

3.  Select **EVENTS BY MOST ACTIVE DEVICE** from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    with the most EVPN alarms at the top. Scroll down to view those with
    the fewest alarms.

    ![](images/download/attachments/8367112/image2019-3-3_16_5_32.png){height="250"}

Where to go next depends on what data you see, but a few options
include:

-   Hover over the Total Alarms chart to focus on the switches
    exhibiting alarms during that smaller time slice.\
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.

-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most alarms, you
    might want to look more carefully at those switches using the
    Switches card workflow.

-   Click **Show All Sessions** to investigate all EVPN sessions with
    alarms in the full screen card.

## View All EVPN Events

The EVPN Service card workflow enables you to view all of the EVPN
events in the designated time period.

To view all EVPN events:

1.  Open the full screen EVPN Service card.

2.  Click **All Alarms** tab in the navigation panel. By default, events
    are sorted by Time, with most recent events listed first.

    ![](images/download/attachments/8367112/image2019-3-3_16_11_30.png)

Where to go next depends on what data you see, but a few options
include:

-   Open one of the other full screen tabs in this flow to focus on
    devices or sessions.

-   Export the data for use in another analytics tool, by selecting all
    or some of the events and clicking **Export**.

-   Click ![](images/download/attachments/8367112/close.png) at the top
    right to return to your workbench.

## View Details for All Devices Running EVPN

You can view all stored attributes of all switches running EVPN in your
network in the full screen card.

To view all switch and host details, open the full screen EVPN Service
card, and click the **All Switches** tab.

![](images/download/attachments/8367112/image2019-3-3_16_16_19.png)

To return to your workbench, click
![](images/download/attachments/8367112/close.png) at the top right.

## View Details for All EVPN Sessions

You can view all stored attributes of all EVPN sessions in your network
in the full screen card.

To view all session details, open the full screen EVPN Service card, and
click the **All Sessions** tab.

![](images/download/attachments/8367112/image2019-3-3_16_17_53.png)

To return to your workbench, click
![](images/download/attachments/8367112/close.png) at the top right.

# Monitor the MLAG Service (All Sessions)

With NetQ, you can monitor the number of nodes running the MLAG service,
view sessions running, and view alarms triggered by the MLAG service.
For an overview and how to configure MLAG in your data center network,
refer to [Multi-Chassis Link Aggregation -
MLAG](https://docs.cumulusnetworks.com/display/DOCS/Multi-Chassis+Link+Aggregation+-+MLAG).

{{% notice info %}} The Cumulus Linux implementation of MLAG is referred
to by other vendors as CLAG, MC-LAG or VPC. The Cumulus NetQ UI still
uses the CLAG terminology in this release. {{% /notice %}}

## CLAG Service Card Workflow Summary

The small CLAG Service card displays:

![](images/download/attachments/8367112/image2019-3-3_16_22_4.png)

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p><strong>CLAG</strong>: All CLAG Sessions, or the CLAG Service</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches with the CLAG service enabled during the designated time period</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of CLAG-related alarms received during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Chart</p></td>
<td><p>Distribution of CLAG-related alarms received during the designated time period</p></td>
</tr>
</tbody>
</table>

The medium CLAG Service card displays:

![](images/download/attachments/8367112/image2019-3-3_16_24_58.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Network Services | <strong></strong> All CLAG Sessions</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches with the CLAG service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of CLAG-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/OZ7aek87vE2GR9IP49ewj7F8XTSYe4ec-eyolCoWYf3aTc79K-j1EjF0gj6EL-YqPlLxkERQ7iNHi3FHQPBwczW2SNRAOmlbDM0RbJqTSADWDKcK3VWCzPTrC_0uvHVkRrm9J2Id" alt="images/lh3.googleusercontent.com/OZ7aek87vE2GR9IP49ewj7F8XTSYe4ec-eyolCoWYf3aTc79K-j1EjF0gj6EL-YqPlLxkERQ7iNHi3FHQPBwczW2SNRAOmlbDM0RbJqTSADWDKcK3VWCzPTrC_0uvHVkRrm9J2Id" /></p></td>
<td><p>Total number of sessions with an inactive backup IP address</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh4.googleusercontent.com/uez2nLxgyfGtFFzPWdwXXWg-pfu5-s6bSXW7ZsXKpF7SS_ZEtRhuDuToD9ojGhz0thfzzzCDrgpJyjlelL9kWtGyaL-SaRBFvOX1qGgLv7gjuN5U0dxmAtxHIUKYLECr50heq0HN" alt="images/lh4.googleusercontent.com/uez2nLxgyfGtFFzPWdwXXWg-pfu5-s6bSXW7ZsXKpF7SS_ZEtRhuDuToD9ojGhz0thfzzzCDrgpJyjlelL9kWtGyaL-SaRBFvOX1qGgLv7gjuN5U0dxmAtxHIUKYLECr50heq0HN" /></p></td>
<td><p>Total number of bonds with only a single connection</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Running chart</p></td>
<td><p>Total number and distribution of switches with CLAG service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Total Alarms chart</p></td>
<td><p>Total number and distribution of CLAG-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Sessions chart</p></td>
<td><p>Total number and distribution of CLAG sessions network-wide during the designated time period</p></td>
</tr>
</tbody>
</table>

The large CLAG service card contains two tabs.

The All CLAG Sessions Summary tab which displays:

![](images/download/attachments/8367112/image2019-3-3_16_40_4.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>All CLAG Sessions Summary</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches with the CLAG service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of CLAG-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Running chart</p></td>
<td><p>Total number and distribution of switches with CLAG service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Total Sessions chart</p></td>
<td><p>Total number and distribution of CLAG sessions network-wide during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Sessions with Inactive-backup-ip chart</p></td>
<td><p>Total number and distribution of sessions without an active backup IP defined</p></td>
</tr>
<tr class="odd">
<td><p>Table/Filter options</p></td>
<td><p>When the <strong>SWITCHES WITH MOST SESSIONS</strong> filter is selected, the table displays switches running CLAG sessions in decreasing order of session count—devices with the largest number of sessions are listed first</p>
<p>When the <strong>SWITCHES WITH MOST UNESTABLISHED SESSIONS</strong> filter is selected, the table displays switches running CLAG sessions in decreasing order of unestablished session count—devices with the largest number of unestablished sessions are listed first</p></td>
</tr>
<tr class="even">
<td><p>Show All Sessions</p></td>
<td><p>Link to view all CLAG sessions in the full screen card</p></td>
</tr>
</tbody>
</table>

The full screen CLAG Service card provides tabs for all switches, all
sessions, and all alarms.

![](images/download/attachments/8367112/image2019-3-3_16_49_25.png)

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Network Services | CLAG</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" alt="images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" /></p></td>
<td><p>Closes full screen card and returns to workbench</p></td>
</tr>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes; select an alternate time period by clicking <img src="images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" alt="images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" /></p></td>
</tr>
<tr class="even">
<td><p>Results</p></td>
<td><p>Number of results found for the selected tab</p></td>
</tr>
<tr class="odd">
<td><p>All Switches tab</p></td>
<td><p>Displays all switches and hosts running the CLAG service. By default, the device list is sorted by hostname. This tab provides the following additional data about each device:</p>
<ul>
<li><p>Agent State and Version</p></li>
<li><p>ASIC Core BW, Model, Model Id, Ports, and Vendor</p></li>
<li><p>CPU Arch, Max Freq, Model, and Nos</p></li>
<li><p>Disk Total Size</p></li>
<li><p>License State</p></li>
<li><p>Memory Size</p></li>
<li><p>OS Vendor, Version, and Version Id</p></li>
<li><p>Platform Date, MAC, Model, Number, Revision, Series, and Vendor</p></li>
<li><p>Time</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>All Sessions tab</p></td>
<td><p>Displays all CLAG sessions network-wide. By default, the session list is sorted by hostname. This tab provides the following additional data about each session:</p>
<ul>
<li><p>Backup Ip and Backup Ip Active</p></li>
<li><p>Clag Sysmac</p></li>
<li><p>Conflicted, Single, Dual, and Proto Down Bonds</p></li>
<li><p>DB State</p></li>
<li><p>OPID</p></li>
<li><p>Peer If, Role, and State</p></li>
<li><p>Role</p></li>
<li><p>Timestamp</p></li>
<li><p>Vxlan Anycast</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>All Alarms tab</p></td>
<td><p>Displays all CLAG events network-wide. By default, the event list is sorted by time, with the most recent events listed first. The tab provides the following additional data about each event:</p>
<ul>
<li><p>Message</p></li>
<li><p>Severity</p></li>
<li><p>Source</p></li>
<li><p>Type</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Export</p></td>
<td><p>Enables export of all or selected items in a CSV or JSON formatted file</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

## View Service Status Summary

A summary of the CLAG service is available from the CLAG Service card
workflow, including the number of nodes running the service, the number
of CLAG-related alarms, and a distribution of those alarms.

To view the summary, open the small CLAG Service card.

![](images/download/attachments/8367112/image2019-3-3_16_22_4.png)

For more detail, select a different size CLAG Service card.

## View the Distribution of Sessions and Alarms

It is useful to know the number of network nodes running the CLAG
protocol over a period of time, as it gives you insight into the amount
of traffic associated with and breadth of use of the protocol. It is
also useful to compare the number of nodes running CLAG with the alarms
present at the same time to determine if there is any correlation
between the issues and the ability to establish an CLAG session.

To view these distributions, open the medium CLAG Service card.

![](images/download/attachments/8367112/image2019-3-3_16_24_58.png){height="250"}

If a visual correlation is apparent, you can dig a little deeper with
the large CLAG Service card tabs.

## View Devices with the Most CLAG Sessions

You can view the load from CLAG on your switches using the large CLAG
Service card. This data enables you to see which switches are handling
the most CLAG traffic currently, validate that is what is expected based
on your network design, and compare that with data from an earlier time
to look for any differences.

To view switches and hosts with the most CLAG sessions:

1.  Open the large CLAG Service card.

2.  Select **SWITCHES WITH MOST SESSIONS** from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    running the most CLAG sessions at the top. Scroll down to view those
    with the fewest sessions.

    ![](images/download/attachments/8367112/image2019-3-3_17_7_26.png){height="250"}

To compare this data with the same data at a previous time:

1.  Open another large CLAG Service card.

2.  Move the new card next to the original card if needed.

3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](images/lh4.googleusercontent.com/fo-yr9tPWzyO_CQPDiddcB5tmuwuX1OS7nIlj4_9iA3_6xnmg_c-54SmAAdNJL_odR0UGjeTSxRHw2BHkeZ3YEfiwOhjpUeHVwPVd8s4F2XwOGnRWXD4NfaIzj86ETYgEU8frnzw)
    .

4.  Select the time period that you want to compare with the current
    time.\
    You can now see whether there are significant differences between
    this time period and the previous time period.\
    ![](images/download/attachments/8367112/image2019-3-3_12_34_30.png)
    ![](images/download/attachments/8367112/image2019-3-3_17_9_28.png){height="250"}\
    If the changes are unexpected, you can investigate further by
    looking at another time frame, determining if more nodes are now
    running CLAG than previously, looking for changes in the topology,
    and so forth.

## View Devices with the Most Unestablished CLAG Sessions

You can identify switches that are experiencing difficulties
establishing CLAG sessions; both currently and in the past.

To view switches with the most unestablished CLAG sessions:

1.  Open the large CLAG Service card.

2.  Select **SWITCHES WITH MOST UNESTABLISHED SESSIONS** from the filter
    above the table.\
    The table content is sorted by this characteristic, listing nodes
    with the most unestablished CLAG sessions at the top. Scroll down to
    view those with the fewest unestablished sessions.

    ![](images/download/attachments/8367112/image2019-3-3_17_13_52.png){height="250"}

Where to go next depends on what data you see, but a few options
include:

-   Hover over the any of the charts to focus on the number of switches
    or sessions with the chart characteristic during that smaller time
    slice.\
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.

    ![](images/download/attachments/8367112/image2019-3-3_17_19_9.png){height="250"}

-   Change the time period for the data to compare with a prior time.\
    ![](images/download/attachments/8367112/image2019-3-3_12_34_30.png)
    ![](images/download/attachments/8367112/image2019-3-3_17_20_6.png){height="250"}\
    If the same switches are consistently indicating the most
    unestablished sessions, you might want to look more carefully at
    those switches using the Switches card workflow to determine
    probable causes. Refer to [Monitor Switches](Monitor_Switches).

-   Click **Show All Sessions** to investigate all CLAG sessions with
    events in the full screen card.

## View Switches with the Most CLAG-related Alarms

Switches experiencing a large number of CLAG alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the switches sorted by the number of CLAG alarms and then use
the Switches card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view switches with most CLAG alarms:

1.  Open the large CLAG Service card.

2.  Hover over the header and click .

3.  Select EVENTS BY MOST ACTIVE DEVICE from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    with the most CLAG alarms at the top. Scroll down to view those with
    the fewest alarms.

Where to go next depends on what data you see, but a few options
include:

-   Hover over the Total Alarms chart to focus on the switches
    exhibiting alarms during that smaller time slice.\
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.

-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most alarms, you
    might want to look more carefully at those switches using the
    Switches card workflow.

-   Click Show All Sessions to investigate all CLAG sessions with alarms
    in the full screen card.

## View All CLAG Events

The CLAG Service card workflow enables you to view all of the CLAG
events in the designated time period.

To view all CLAG events:

1.  Open the full screen CLAG Service card.

2.  Click All Alarms tab.

Where to go next depends on what data you see, but a few options
include:

-   Open the All Switches or All Sessions tabs to look more closely at
    the alarms from the switch or session perspective.

-   Sort on other parameters:

    -   by **Message** to determine the frequency of particular events

    -   by **Severity** to determine the most critical events

    -   by **Time** to find events that may have occurred at a
        particular time to try to correlate them with other system
        events

-   Return to your workbench by clicking
    ![](images/download/attachments/8367112/close-14.svg) in the top
    right corner

## View Detailed Information About All Switches Running CLAG

You can view all stored attributes of all switches running CLAG in your
network in the full-screen card.

To view all switch details, o pen the full screen CLAG Service card, and
click the **All Switches** tab.

![](images/download/attachments/8367112/image2019-3-3_17_37_3.png)

To return to your workbench, click in the top right corner.

# Monitor the LLDP Service (All Sessions)

With NetQ, you can monitor the number of nodes running the LLDP service,
view nodes with the most LLDP neighbor nodes, those nodes with the least
neighbor nodes, and view alarms triggered by the LLDP service. For an
overview and how to configure LLDP in your data center network, refer to
[Link Layer Discovery
Protocol](https://docs.cumulusnetworks.com/display/DOCS/Link+Layer+Discovery+Protocol).

## LLDP Service Card Workflow Summary

The small LLDP Service card displays:

![](images/download/attachments/8367112/image2019-3-3_17_42_53.png)

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p><strong>LLDP</strong>: All LLDP Sessions, or the LLDP Service</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches with the LLDP service enabled during the designated time period</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of LLDP-related alarms received during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Chart</p></td>
<td><p>Distribution of LLDP-related alarms received during the designated time period</p></td>
</tr>
</tbody>
</table>

The medium LLDP Service card displays:

![](images/download/attachments/8367112/image2019-3-3_17_45_53.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p><strong>LLDP</strong>: All LLDP Sessions, or the LLDP Service</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches with the LLDP service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of LLDP-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Running chart</p></td>
<td><p>Total number and distribution of switches and hosts with LLDP enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Total Alarms chart</p></td>
<td><p>Total number and distribution of LLDP-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Sessions chart</p></td>
<td><p>Total number and distribution of LLDP sessions running during the designated time period</p></td>
</tr>
</tbody>
</table>

The large LLDP service card contains two tabs.

The Sessions Summary tab which displays:

![](images/download/attachments/8367112/image2019-3-3_17_50_38.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Sessions Summary (visible when you hover over card)</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches with the LLDP service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of LLDP-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Nodes Running chart</p></td>
<td><p>Total number and distribution of switches and hosts with LLDP enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Total Sessions chart</p></td>
<td><p>Total number and distribution of LLDP sessions running during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Sessions with No Nbr chart</p></td>
<td><p>Total number and distribution of LLDP sessions missing neighbor information during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Table/Filter options</p></td>
<td><p>When the <strong>SWITCHES WITH MOST SESSIONS</strong> filter is selected, the table displays switches running LLDP sessions in decreasing order of session count—devices with the largest number of sessions are listed first</p>
<p>When the <strong>SWITCHES WITH MOST UNESTABLISHED SESSIONS</strong> filter is selected, the table displays switches running LLDP sessions in decreasing order of unestablished session count—devices with the largest number of unestablished sessions are listed first</p></td>
</tr>
<tr class="even">
<td><p>Show All Sessions</p></td>
<td><p>Link to view all LLDP sessions in the full screen card</p></td>
</tr>
</tbody>
</table>

The *Alarms* tab which displays:

![](images/download/attachments/8367112/image2019-3-3_18_0_13.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" alt="images/lh3.googleusercontent.com/9pKK7nvSXHVZ9B7ZhBwE4tJ0yTYz1Cnblgm_0e3-KDmA8qdySLR5COAhLPZomROlRUSRTTRlXlgwEKcjuVljew1z5zd6QRMCXQXjcVbkhXJiX63LgNYuAg5nC58u_mkmYpFHFK43" /></p></td>
<td><p>Indicates data is for all sessions of a Network Service or Protocol</p></td>
</tr>
<tr class="odd">
<td><p>Title</p></td>
<td><p><strong>Alarms</strong> (visible when you hover over card)</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" alt="images/lh3.googleusercontent.com/6savpoUbgaVzG-b8wvwDqPBL2SvepqAMmGuTy06oenbCU27_dmDBdmJobMvQD89-1iBJRpKB0lFW4cTzNEp3kdZuAOOs81DmptnyhBgCxeIwwuwkq91hLLOTSLACVkDRTfeYoMNe" /></p></td>
<td><p>Total number of switches with the LLDP service enabled during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" alt="images/lh3.googleusercontent.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT" /></p></td>
<td><p>Total number of LLDP-related alarms received during the designated time period</p></td>
</tr>
<tr class="even">
<td><p>Total Alarms chart</p></td>
<td><p>Total number and distribution of LLDP-related alarms received during the designated time period</p></td>
</tr>
<tr class="odd">
<td><p>Table/Filter options</p></td>
<td><p>When the <strong>EVENTS BY MOST ACTIVE DEVICE</strong> filter is selected, the table displays switches running LLDP sessions in decreasing order of alarm count—devices with the largest number of sessions are listed first</p></td>
</tr>
<tr class="even">
<td><p>Show All Sessions</p></td>
<td><p>Link to view all LLDP sessions in the full screen card</p></td>
</tr>
</tbody>
</table>

The full screen LLDP Service card provides tabs for all switches, all
sessions, and all alarms.

![](images/download/attachments/8367112/image2019-3-3_18_4_31.png){height="250"}

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Item</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Title</p></td>
<td><p>Network Services | LLDP</p></td>
</tr>
<tr class="even">
<td><p><img src="images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" alt="images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" /></p></td>
<td><p>Closes full screen card and returns to workbench</p></td>
</tr>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes; select an alternate time period by clicking <img src="images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" alt="images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" /></p></td>
</tr>
<tr class="even">
<td><p>Results</p></td>
<td><p>Number of results found for the selected tab</p></td>
</tr>
<tr class="odd">
<td><p>All Switches tab</p></td>
<td><p>Displays all switches and hosts running the LLDP service. By default, the device list is sorted by hostname. This tab provides the following additional data about each device:</p>
<ul>
<li><p>Agent State and Version</p></li>
<li><p>ASIC Core BW, Model, Model Id, Ports, and Vendor</p></li>
<li><p>CPU Arch, Max Freq, Model, and Nos</p></li>
<li><p>Disk Total Size</p></li>
<li><p>License State</p></li>
<li><p>Memory Size</p></li>
<li><p>OS Vendor, Version, and Version Id</p></li>
<li><p>Platform Date, MAC, Model, Number, Revision, Series, and Vendor</p></li>
<li><p>Time</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>All Sessions tab</p></td>
<td><p>Displays all LLDP sessions network-wide. By default, the session list is sorted by hostname. This tab provides the following additional data about each session:</p>
<ul>
<li><p>DB State</p></li>
<li><p>Ifname</p></li>
<li><p>LLDP Peer Bridge, Os, Osv, Router, and Station</p></li>
<li><p>OPID</p></li>
<li><p>Peer Hostname and Ifname</p></li>
<li><p>Timestamp</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>All Alarms tab</p></td>
<td><p>Displays all LLDP events network-wide. By default, the event list is sorted by time, with the most recent events listed first. The tab provides the following additional data about each event:</p>
<ul>
<li><p>Message</p></li>
<li><p>Severity</p></li>
<li><p>Source</p></li>
<li><p>Type</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Export</p></td>
<td><p>Enables export of all or selected items in a CSV or JSON formatted file</p></td>
</tr>
<tr class="odd">
<td><p><img src="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

## View Service Status Summary

A summary of the LLDP service is available from the Network Services
card workflow, including the number of nodes running the service, the
number of LLDP-related alarms, and a distribution of those alarms.

To view the summary, open the small LLDP Service card.

![](images/download/attachments/8367112/image2019-3-3_17_42_53.png)

For more detail, select a different size LLDP Network Services card.

## View the Distribution of Nodes, Alarms, and Sessions

It is useful to know the number of network nodes running the LLDP
protocol over a period of time, as it gives you insight into nodes that
might be misconfigured or experiencing communication issues due to
missing links.

To view the distribution, open the medium LLDP Service card.

![](images/download/attachments/8367112/image2019-3-3_17_45_53.png){height="250"}

## View the Distribution of Missing Neighbors

You can view the number of missing neighbors in any given time period
and how that number has changed over time. This is a good indicator of
link communication issues.

To view the distribution, open the large LLDP Service card and view the
bottom chart on the left, **Total Sessions with No Nbr**.

![](images/download/attachments/8367112/image2019-3-3_18_22_6.png){height="250"}

## View Devices with the Most LLDP Sessions

You can view the load from LLDP on your switches using the large LLDP
Service card. This data enables you to see which switches are handling
the most LLDP traffic currently, validate that is what is expected based
on your network design, and compare that with data from an earlier time
to look for any differences.

To view switches and hosts with the most LLDP sessions:

1.  Open the large LLDP Service card.

2.  Select **SWITCHES WITH MOST SESSIONS** from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    running the most LLDP sessions at the top. Scroll down to view those
    with the fewest sessions.

    ![](images/download/attachments/8367112/image2019-3-3_18_25_43.png){height="250"}

To compare this data with the same data at a previous time:

1.  Open another large LLDP Service card.

2.  Move the new card next to the original card if needed.

3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](images/lh4.googleusercontent.com/fo-yr9tPWzyO_CQPDiddcB5tmuwuX1OS7nIlj4_9iA3_6xnmg_c-54SmAAdNJL_odR0UGjeTSxRHw2BHkeZ3YEfiwOhjpUeHVwPVd8s4F2XwOGnRWXD4NfaIzj86ETYgEU8frnzw)
    .

4.  Select the time period that you want to compare with the current
    time.\
    You can now see whether there are significant differences between
    this time period and the previous time period.\
    ![](images/download/attachments/8367112/image2019-3-3_12_34_30.png)
    ![](images/download/attachments/8367112/image2019-3-3_18_28_1.png){height="250"}\
    In this case, notice that the alarms have reduced significantly in
    the last six hours. If the changes are unexpected, you can
    investigate further by looking at another time frame, determining if
    more nodes are now running LLDP than previously, looking for changes
    in the topology, and so forth.

## View Devices with the Most Unestablished LLDP Sessions

You can identify switches that are experiencing difficulties
establishing LLDP sessions; both currently and in the past.

To view switches with the most unestablished LLDP sessions:

1.  Open the large LLDP Service card.

2.  Select **SWITCHES WITH MOST UNESTABLISHED SESSIONS** from the filter
    above the table.\
    The table content is sorted by this characteristic, listing nodes
    with the most unestablished CLAG sessions at the top. Scroll down to
    view those with the fewest unestablished sessions.

    ![](images/download/attachments/8367112/image2019-3-3_18_30_23.png){height="250"}

Where to go next depends on what data you see, but a few options
include:

-   Hover over any of the charts to focus on the number of switches or
    sessions with the chart characteristic during that smaller time
    slice.\
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.

    ![](images/download/attachments/8367112/image2019-3-3_18_32_59.png){height="250"}

-   Change the time period for the data to compare with a prior time.\
    ![](images/download/attachments/8367112/image2019-3-3_12_34_30.png)
    ![](images/download/attachments/8367112/image2019-3-3_18_34_16.png){height="250"}\
    If the same switches are consistently indicating the most
    unestablished sessions, you might want to look more carefully at
    those switches using the Switches card workflow to determine
    probable causes. Refer to [Monitor Switches](Monitor_Switches).

-   Click **Show All Sessions** to investigate all LLDP sessions with
    events in the full screen card.

## View Switches with the Most LLDP-related Alarms

Switches experiencing a large number of LLDP alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the switches sorted by the number of LLDP alarms and then use
the Switches card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view switches with most LLDP alarms:

1.  Open the large LLDP Service card.

2.  Hover over the header and click
    ![](images/lh3.googleusercontent0.com/zfvCpsG-VHAjSrTbVj3Q9ZDhqhqlkG1MiPwZEFtSM10fC2F8AExk-7gTb3norOvIXhvQL6rLN5NWpDdrnx55YCLnzdn2Y2INmiKan-83QG6a9s4aw3LlOUm7zlOGoi4mK-yUNQDT)
    .

3.  Select **EVENTS BY MOST ACTIVE DEVICE** from the filter above the
    table.\
    The table content is sorted by this characteristic, listing nodes
    with the most BGP alarms at the top. Scroll down to view those with
    the fewest alarms.

    ![](images/download/attachments/8367112/image2019-3-3_18_38_47.png){height="250"}

Where to go next depends on what data you see, but a few options
include:

-   Hover over the Total Alarms chart to focus on the switches
    exhibiting alarms during that smaller time slice.\
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.

-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most alarms, you
    might want to look more carefully at those switches using the
    Switches card workflow.

-   Click **Show All Sessions** to investigate all LLDP sessions with
    events in a full screen card.

## View All LLDP Events

The LLDP Network Services card workflow enables you to view all of the
LLDP events in the designated time period.

To view all LLDP events:

1.  Open the full screen LLDP Service card.

2.  Click the **All Alarms** tab.

    ![](images/download/attachments/8367112/image2019-3-3_18_43_5.png)

Where to go next depends on what data you see, but a few options
include:

-   Open the **All Switches** or **All Sessions** tabs to look more
    closely at the alarms from the switch or session perspective.

-   Sort on other parameters:

    -   by **Message** to determine the frequency of particular events

    -   by **Severity** to determine the most critical events

    -   by **Time** to find events that may have occurred at a
        particular time to try to correlate them with other system
        events

-   Return to your workbench by clicking
    ![](images/download/attachments/8367112/close-14.svg) in the top
    right corner

## View Detailed Information About All Switches Running BGP

You can view all stored attributes of all switches running LLDP in your
network in the full screen card.

To view all switch details, open the LLDP Service card, and click the
**All Switches** tab.

![](images/download/attachments/8367112/image2019-3-3_18_45_2.png)

To return to your workbench, click
![](images/download/attachments/8367112/close.png) next to the title of
the full-screen card.

## View Detailed Information About All LLDP Sessions

You can view all stored attributes of all LLDP sessions in your network
in the full screen card.

To view all session details, open the LLDP Service card, and click the
**All Sessions** tab.

![](images/download/attachments/8367112/image2019-3-3_18_47_2.png)

To return to your workbench, click
![](images/download/attachments/8367112/close.png) next to the title of
the full-screen card.
