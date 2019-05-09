---
title: Monitor Network Connectivity
author: Unknown
weight: 133
pageID: 10456855
aliases:
 - /old/Monitor_Network_Connectivity.html
---
# Monitor Network Connectivity

It is helpful to verify that communications are freely flowing between
the various devices in your network. You can verify the connectivity
between two devices currently or for a time in the past. You can also
view connectivity in both an adhoc fashion and specifically define
connectivity checks to occur on a scheduled basis. There are three card
workflows which enable you to view connectivity, the Trace Request,
On-demand Trace Results, and Scheduled Trace Results.

## Create a Trace Request

Two types of connectivity checks can be run–an immediate trace and a
scheduled trace. The Trace Request card workflow is used to configure
and run both of these trace types.

### Trace Request Card Workflow Summary

The small Trace Request card displays:

{{%imgOld 0 %}}

| Item              | Description                                    |
| ----------------- | ---------------------------------------------- |
| {{%imgOld 1 %}}   | Indicates a trace request                      |
| Select Trace list | Select a scheduled trace request from the list |
| Go                | Click to start the trace now                   |

The medium Trace Request card displays:

{{%imgOld 2
%}}

| Item              | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| {{%imgOld 3 %}}   | Indicates a trace request                                                                      |
| Title             | New Trace Request                                                                              |
| New Trace Request | Create a new request                                                                           |
| Source            | (Required) Starting point for the trace using a device. Value can be a hostname or IP address. |
| Destination       | (Required) Ending point for the trace using a device. Value must be an IP address.             |
| Run Trace         | Start the trace now                                                                            |

The large Trace Request card displays:

{{%imgOld 4
%}}

| Item            | Description                                                                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| {{%imgOld 5 %}} | Indicates a trace request                                                                                                                                                                                               |
| Title           | New Trace Request                                                                                                                                                                                                       |
| Trace selection | The only option with this release is *New Trace Request*                                                                                                                                                                |
| Source          | (Required) Starting point for the trace using a device. Value can be a hostname or IP address                                                                                                                           |
| Destination     | (Required) Ending point for the trace using a device. For layer 2 traces, value must be the MAC address. For layer 3 traces, value must be an IP address.                                                               |
| VRF             | Optional for layer 3 traces. Virtual Route Forwarding interface to be used as part of the trace path.                                                                                                                   |
| VLAN ID         | Optional for layer 2 traces. Virtual LAN to be used as part of the trace path.                                                                                                                                          |
| Schedule        | Sets the frequency with which to run a new trace (**Run every**) and when to start the trace for the first time (**Starting**).                                                                                         |
| Run Trace       | Start the trace now                                                                                                                                                                                                     |
| Update          | **Update** is available when a scheduled trace request is selected from the dropdown list and you make a change to its configuration. Clicking **Update** saves the changes to the existing scheduled trace.            |
| Save As New     | **Save As New** is available when you enter a source, destination, and schedule for a new trace. Clicking **Save As New** saves this newly-defined scheduled trace without changing the original trace it was based on. |

The full screen Trace Request card displays:

{{%imgOld 6 %}}

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
<td><p>Trace Request</p></td>
</tr>
<tr class="even">
<td><p>{{%imgOld 7 %}}</p></td>
<td><p>Closes full screen card and returns to workbench</p></td>
</tr>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes; select an alternate time period by clicking</p>
<p>{{%imgOld 8 %}}</p></td>
</tr>
<tr class="even">
<td><p>Results</p></td>
<td><p>Number of results found for the selected tab</p></td>
</tr>
<tr class="odd">
<td><p>Schedule Preview tab</p></td>
<td><p>Displays all scheduled trace requests for the given user. By default, the listing is sorted by <strong>Start Time</strong>, with the most recently started traces listed at the top. The tab provides the following additional data about each event:</p>
<ul>
<li><p><strong>Active</strong>: Indicates if trace is actively running (true), or stopped from running (false)</p></li>
<li><p><strong>Trace Name</strong>: User-defined name for a trace</p></li>
<li><p><strong>Trace Params</strong>: Indicates source and destination, optional VLAN or VRF specified, and whether to alert on failure</p></li>
<li><p><strong>Frequency</strong>: How often the trace is scheduled to run</p></li>
<li><p><strong>ID</strong>: Internal system identifier for the trace job</p></li>
<li><p><strong>Action</strong>: Indicates latest action taken on the trace job. Values include Add, Deleted, Update.</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Export</p></td>
<td><p>Enables export of all or selected items in a CSV or JSON formatted file</p></td>
</tr>
<tr class="odd">
<td><p>{{%imgOld 9 %}}</p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

### Create a Layer 2 On-demand Trace Request

It is helpful to verify the connectivity between two devices when you
suspect an issue is preventing proper communication between them.

To create the trace request:

1.  Open the medium Trace Request card.
    
    {{%imgOld 10 %}}

2.  In the **Source** field, enter the hostname or IP address of the
    device where you want to start the trace.

3.  In the **Destination** field, enter the MAC address for where you
    want to end the trace.  
    
    {{%imgOld 11 %}}
    
      
    In this example, we are starting our trace at *6.0.2.11* and ending
    it at *6.0.2.8*.
    
    {{%notice tip%}}
    
    If you mistype an address, you must double-click it, or backspace
    over the error, and retype the address. You cannot select the
    address by dragging over it as this action attempts to move the card
    to another location.
    
    {{%/notice%}}

4.  Click **Run Trace**. A corresponding Trace Results card is opened on
    your workbench. Refer to [View Layer 2 Trace
    Results](/old/#src-10456855_MonitorNetworkConnectivity-ODTL2) for
    details.

### Create a Layer 3 On-demand Trace Request

It is helpful to verify the connectivity between two devices when you
suspect an issue is preventing proper communication between them.

To create the trace request:

1.  Open the medium Trace Request card.
    
    {{%imgOld 12 %}}

2.  In the **Source** field, enter the hostname or IP address of the
    device where you want to start the trace.

3.  In the **Destination** field, enter the IP address of the device
    where you want to end the trace.  
    
    {{%imgOld 13 %}}
    
      
    In this example, we are starting our trace at *27.0.0.22* and ending
    it at *36.0.0.24*.
    
    {{%notice tip%}}
    
    If you mistype an address, you must double-click it, or backspace
    over the error, and retype the address. You cannot select the
    address by dragging over it as this action attempts to move the card
    to another location.
    
    {{%/notice%}}

4.  Click **Run Trace**. A corresponding Trace Results card is opened on
    your workbench. Refer to [View Layer 3 Trace
    Results](/old/#src-10456855_MonitorNetworkConnectivity-ODTL3) for
    details.

### Create a Layer 2 Trace Through a Given VLAN

If you want to guide a trace through a particular VLAN, you can do so
using the large New Trace Request card.

To create the trace request:

1.  Open the large Trace Request card.
    
    {{%imgOld 14 %}}

2.  In the **Source** field, enter the hostname or IP address of the
    device where you want to start the trace.

3.  In the **Destination** field, enter the MAC address for where you
    want to end the trace.

4.  In the **VLAN ID** field, enter the identifier for the VLAN you want
    to use.
    
    {{%imgOld 15 %}}
    
    In this example, we are starting our trace at *6.0.2.11* and ending
    it at *6.0.2.8* using VLAN *1008.*

5.  Click **Run Now**. A corresponding Trace Results card is opened on
    your workbench. Refer to [View Layer 2 Trace
    Results](/old/#src-10456855_MonitorNetworkConnectivity-ODTL2) for
    details.

### Create a Layer 3 Trace Through a Given VRF

If you want to guide a trace through a particular VRF interface, you can
do so using the large New Trace Request card.

To create the trace request:

1.  Open the large Trace Request card.

2.  In the **Source** field, enter the hostname or IP address of the
    device where you want to start the trace.

3.  In the **Destination** field, enter the IP address of the device
    where you want to end the trace.

4.  In the **VRF** field, enter the identifier for the VRF interface you
    want to use.
    
    {{%imgOld 16 %}}
    
    In this example, we are starting our trace at *27.0.0.22* and ending
    it at *36.0.0.24* using VRF *default.*

5.  Click **Run Trace**. A corresponding Trace Results card is opened on
    your workbench. Refer to [View Layer 3 Trace
    Results](/old/#src-10456855_MonitorNetworkConnectivity-ODTL3) for
    details.

### Create a Trace to Run on a Regular Basis

There may be paths through your network that you consider critical to
your everyday or particularly important operations. In that case, it
might be useful to create one or more traces to periodically confirm
that at least one path is available between the relevant two devices.
Scheduling a trace request can be performed from large Trace Request
card.

To schedule a trace from the large-sized card:

1.  Open the large Trace Request card.

2.  In the **Source** field, enter the hostname or IP address of the
    device where you want to start the trace.

3.  In the **Destination** field, enter the MAC address (layer 2) or IP
    address (layer 3) of the device where you want to end the trace.

4.  Optionally, enter a VLAN ID (layer 2) or VRF interface (layer 3).
    
    {{%imgOld 17 %}}

5.  Click **Timeframe** under **Schedule** to specify how often you want
    to run the trace.
    
    {{%imgOld 18 %}}

6.  Click **Date/Time** to specify the day you want the trace to run for
    the first time.
    
    {{%imgOld 19 %}}

7.  Click **Next**.

8.  Click the time you want the trace to run for the first time.
    
    {{%imgOld 20 %}}

9.  Click **OK**.

10. Click **Save As New**.

11. Provide a name for the trace. ***Note**: This name must be unique
    for a given user.*
    
    {{%imgOld 21 %}}

12. Click **Save**. You can now run this trace on demand or wait for it
    to run on its defined schedule.

### Run a Scheduled Trace on Demand

You may find that, although you have a schedule for a particular trace,
you want to have visibility into the connectivity data now. You can run
a scheduled trace on demand from the small, medium and large Trace
Request cards.

To run a scheduled trace now:

1.  Open the small or medium Trace Request card.  
      
    
    {{%imgOld 22 %}}
    
    {{%imgOld 23 %}}

2.  Select the scheduled trace from the **Select Trace** or **New Trace
    Request** list.

3.  Click **Go** or **Run Now**. A corresponding Trace Results card is
    opened on your workbench.

## View On-demand Trace Results

Once you have started an on-demand trace, the results are displayed in
the medium Trace Results card by default. You may view the results in
more or less detail by switching to the large or small Trace Results
card, respectively.

On-demand Trace Results Card Workflow Summary

The small On-demand Trace Results card displays:

{{%imgOld 24 %}}

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
<td><p>{{%imgOld 25 %}}</p></td>
<td><p>Indicates an on-demand trace result</p></td>
</tr>
<tr class="even">
<td><p> </p></td>
<td><p>Source and destination of the trace, identified by their address or hostname. Source is listed on top with arrow pointing to destination.</p></td>
</tr>
<tr class="odd">
<td><p>{{%imgOld 26 %}}</p>
,
<p>{{%imgOld 27 %}}</p></td>
<td><p>Indicates success or failure of the trace request. A successful result implies all paths were successful without any warnings or failures. A failure result implies there was at least one path with warnings or errors.</p></td>
</tr>
</tbody>
</table>

The medium On-demand Trace Results card displays:

{{%imgOld 28 %}}

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
<td><p>{{%imgOld 29 %}}</p></td>
<td><p>Indicates an on-demand trace result</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>On-demand Trace Result</p></td>
</tr>
<tr class="odd">
<td><p> </p></td>
<td><p>Source and destination of the trace, identified by their address or hostname. Source is listed on top with arrow pointing to destination.</p></td>
</tr>
<tr class="even">
<td><p>{{%imgOld 30 %}}</p>
,
<p>{{%imgOld 31 %}}</p></td>
<td><p>Indicates success or failure of the trace request. A successful result implies all paths were successful without any warnings or failures. A failure result implies there was at least one path with warnings or errors.</p></td>
</tr>
<tr class="odd">
<td><p>Total Paths Found</p></td>
<td><p>Number of paths found between the two devices</p></td>
</tr>
<tr class="even">
<td><p>MTU Overall</p></td>
<td><p>Average size of the maximum transmission unit for all paths</p></td>
</tr>
<tr class="odd">
<td><p>Minimum Hops</p></td>
<td><p>Smallest number of hops along a path between the devices</p></td>
</tr>
<tr class="even">
<td><p>Maximum Hops</p></td>
<td><p>Largest number of hops along a path between the devices</p></td>
</tr>
</tbody>
</table>

The large On-demand Trace Results card displays:

{{%imgOld 32 %}}

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
<td><p>{{%imgOld 33 %}}</p></td>
<td><p>Indicates an on-demand trace result</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>On-demand Trace Result</p></td>
</tr>
<tr class="odd">
<td><p>{{%imgOld 34 %}}</p>
,
<p>{{%imgOld 35 %}}</p></td>
<td><p>Indicates success or failure of the trace request. A successful result implies all paths were successful without any warnings or failures. A failure result implies there was at least one path with warnings or errors.</p></td>
</tr>
<tr class="even">
<td><p> </p></td>
<td><p>Source and destination of the trace, identified by their address or hostname. Source is listed on top with arrow pointing to destination.</p></td>
</tr>
<tr class="odd">
<td><p>Distribution by Hops chart</p></td>
<td><p>Displays the distributions of various hop counts for the available paths</p></td>
</tr>
<tr class="even">
<td><p>Distribution by MTU chart</p></td>
<td><p>Displays the distribution of MTUs used on the interfaces used in the available paths</p></td>
</tr>
<tr class="odd">
<td><p>Table</p></td>
<td><p>Provides detailed path information, sorted by the route identifier, including:</p>
<ul>
<li><p><strong>Route ID</strong>: Identifier of each path</p></li>
<li><p><strong>MTU</strong>: Average speed of the interfaces used</p></li>
<li><p><strong>Hops</strong>: Number of hops to get from the source to the destination device</p></li>
<li><p><strong>Warnings</strong>: Number of warnings encountered during the trace on a given path</p></li>
<li><p><strong>Errors</strong>: Number of errors encountered during the trace on a given path</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Total Paths Found</p></td>
<td><p>Number of paths found between the two devices</p></td>
</tr>
<tr class="odd">
<td><p>MTU Overall</p></td>
<td><p>Average size of the maximum transmission unit for all paths</p></td>
</tr>
<tr class="even">
<td><p>Minimum Hops</p></td>
<td><p>Smallest number of hops along a path between the devices</p></td>
</tr>
</tbody>
</table>

The full screen On-demand Trace Results card displays:

{{%imgOld 36 %}}

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
<td><p>On-demand Trace Results</p></td>
</tr>
<tr class="even">
<td><p>Trace Results tab</p></td>
<td><p>Provides detailed path information, sorted by the <strong>timestamp</strong> (date and time results completed), including:</p>
<ul>
<li><p><strong>Job ID</strong>: Identifier of each trace job</p></li>
<li><p><strong>Max Hop Count</strong>: Largest number of hops along a path between the devices</p></li>
<li><p><strong>Min Hop Count</strong>: Smallest number of hops along a path between the devices</p></li>
<li><p><strong>Total Paths</strong>: Number of paths found between the two devices</p></li>
<li><p><strong>MTU</strong>: Average size of the maximum transmission unit for all interfaces along the paths</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Export</p></td>
<td><p>Enables export of all or selected items in a CSV or JSON formatted file</p></td>
</tr>
<tr class="even">
<td><p>{{%imgOld 37 %}}</p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

### View Layer 2 Trace Results

When you start the trace, the corresponding results card is opened on
your workbench. While it is working on the trace, a notice is shown on
the card indicating it is running.

{{%imgOld 38 %}}

Once the job is completed, the results are displayed.

{{%imgOld 39 %}}

In this example, we see that the trace was successful. Three paths were
found between the devices, each with five hops and with an overall MTU
of 9152. If there was a difference between the minimum and maximum
number of hops or other failures, viewing the results on the large card
would provide additional information.

{{%imgOld 40 %}}

In our example, we can verify that every path option had five hops since
the distribution chart only shows one hop count and the table indicates
each path had a value of five hops. Similarly, you can view the MTU
data. If there had been any warnings, the count would have been visible
in the table.

### View Layer 3 Trace Results

When you start the trace, the corresponding results card is opened on
your workbench. While it is working on the trace, a notice is shown on
the card indicating it is running.

{{%imgOld 41 %}}

Once results are obtained, it displays them. Using our example from
earlier, the following results are shown:

{{%imgOld 42 %}}

In this example, we see that the trace was successful. Four paths were
found between the devices, each with three hops and with an overall MTU
of 9202. If there was a difference between the minimum and maximum
number of hops or other failures, viewing the results on the large card
would provide additional information.

{{%imgOld 43 %}}

In our example, we can verify that every path option had three hops
since the distribution chart only shows one hop count and the table
indicates each path had a value of three hops. Similarly, you can view
the MTU data. If there had been any warnings, the count would have been
visible in the table.

### View All On-demand Trace Results

If you have run multiple on-demand traces, you may find it easier to
view the results all together in a single view. The full screen Trace
Results card provides this information.

To view all on-demand trace results, open the full screen On-demand
Trace Results card.

{{%imgOld 44 %}}

Ordered by most recent trace, you can now view all recent traces
together.
