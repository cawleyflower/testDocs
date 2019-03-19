\--- title: author: keywords: ---

# Validate Network Protocol and Service Operations

With the NetQ UI, you can validate the operation of the network
protocols and services running in your network either on demand or on a
scheduled basis. There are three card workflows to perform this
validation: one for creating the validation request (either on-demand or
scheduled) and two validation results (one for on-demand and one for
scheduled).

This release supports validation of the following network protocols and
services: Agents, BGP, CLAG, EVPN, Interfaces, License, and NTP.

For a more general understanding of how well your network is operating,
refer to the [Monitor Network Health](Monitor_Network_Health)
topic.

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-CreateValidationRequests" class="section section-1">

## Create Validation Requests

The Validation Request card workflow is used to create both on-demand
and scheduled validation requests. The intent of the request changes the
flow through the card, so the various options are described separately
here.

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-ValidationRequestCardWorkflow" class="section section-2">

### Validation Request Card Workflow

The small Validation Request card
displays:

![/images/download/attachments/9015479/image2019-3-13\_11\_32\_50.png](/images/download/attachments/9015479/image2019-3-13_11_32_50.png)

<div class="tablewrap">

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
<td><p><img src="/images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" alt="/images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" /></p></td>
<td><p>Indicates a validation request</p></td>
</tr>
<tr class="even">
<td><p>Validation</p></td>
<td><p>Optionally select a previously saved request to run that request on-demand. The following validation requests are provided by default:</p>
<ul>
<li><p>BGP Validation: Runs a network-wide validation check on the BGP protocol service</p></li>
<li><p>All Validation: Runs a network-wide validation check on all available network protocols and services</p></li>
<li><p>Default Validation: Runs a network-wide validation check on all available network protocols and services when no selection is made</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>GO</p></td>
<td><p>Start the validation request. The corresponding On-demand Validation Result cards are opened on your workbench.</p></td>
</tr>
</tbody>
</table>

</div>

The medium Validation Request card
displays:

![/images/download/attachments/9015479/image2019-3-13\_11\_36\_42.png](/images/download/attachments/9015479/image2019-3-13_11_36_42.png)

<div class="tablewrap">

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
<td><p><img src="/images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" alt="/images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" /></p></td>
<td><p>Indicates a validation request</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>Validation Request</p></td>
</tr>
<tr class="odd">
<td><p>Validation</p></td>
<td><p>Either enter a name to create a new validation request, or select a previously saved request from the list to run that request on-demand</p></td>
</tr>
<tr class="even">
<td><p>Protocols</p></td>
<td><p>By default all protocols are selected. Use the large card to create a validation request for selected protocols.</p></td>
</tr>
<tr class="odd">
<td><p>Schedule:</p></td>
<td><p>For a selected scheduled validation, the schedule and the time of the last run are displayed.</p>
<p>For new, on-demand requests, the schedule does not apply and so is not displayed.</p></td>
</tr>
<tr class="even">
<td><p>Run Now</p></td>
<td><p>Start the validation request</p></td>
</tr>
</tbody>
</table>

</div>

The large Validation Request card
displays:

![/images/download/attachments/9015479/image2019-3-13\_12\_4\_24.png](/images/download/attachments/9015479/image2019-3-13_12_4_24.png)

<div class="tablewrap">

| Item                                                                                                                                                                                                                                                                                                                                                       | Description                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| ![/images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw\_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx](/images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx) | Indicates a validation request                                                                                                           |
| Title                                                                                                                                                                                                                                                                                                                                                      | Validation Request                                                                                                                       |
| Validation                                                                                                                                                                                                                                                                                                                                                 | Either enter a name to create a new validation request, or select a previously saved request from the list to run that request on-demand |
| Protocols                                                                                                                                                                                                                                                                                                                                                  | Select the protocols to include in the request                                                                                           |
| Run Now                                                                                                                                                                                                                                                                                                                                                    | Start the validation request                                                                                                             |

</div>

The full screen Validation Request card displays all scheduled
validation
requests.

![/images/download/attachments/9015479/image2019-3-13\_12\_25\_16.png](/images/download/attachments/9015479/image2019-3-13_12_25_16.png)

<div class="tablewrap">

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
<td><p>Validation Request</p></td>
</tr>
<tr class="even">
<td><p><img src="/images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" alt="/images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" /></p></td>
<td><p>Closes full screen card and returns to workbench</p></td>
</tr>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes; select an alternate time period by clicking ( what does Default Time mean here? )</p></td>
</tr>
<tr class="even">
<td><p>Results</p></td>
<td><p>Number of results found for the selected tab</p></td>
</tr>
<tr class="odd">
<td><p>Validation Requests</p></td>
<td><p>Displays all validation requests. By default, the requests list is sorted by ( name/start time? ). This tab provides the following additional data about each request:</p>
<ul>
<li><p><strong>Name</strong>: Text identifier of the validation</p></li>
<li><p><strong>Type</strong>: Name of network protocols and/or services included in the validation</p></li>
<li><p><strong>Created At</strong>: Date and time that the validation request was originally defined</p></li>
<li><p><strong>Start Time</strong>: Data and time that the validation request was initiated ( for the first time, most recently? )</p></li>
<li><p><strong>Last Modified</strong>: Date and time of the most recent change made to the validation request</p></li>
<li><p><strong>Cadence</strong>: How often, in minutes, that the validation is scheduled to run</p></li>
<li><p><strong>Is Active</strong>: Indicates whether the request is currently active (true) or not (false) ( could these be yes and no rather than true and false? )</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Export</p></td>
<td><p>Enables export of all or selected items in a CSV or JSON formatted file</p></td>
</tr>
<tr class="odd">
<td><p><img src="/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

</div>

</div>

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-CreateandRunaNewOn-demandValidationRequest" class="section section-2">

### Create and Run a New On-demand Validation Request

When you want to validate the operation of all network protocols and
services right now, you can run an on-demand validation request using
the medium Validation Request card.

To run a request for *all* protocols and services:

1.  Open the small, medium, or large Validation Request card.  
    \<insert image\>

2.  Enter a name for your request in the **Validation** field. For
    example, All Protos and Svcs or Whole Health. ( does this check
    against "taken" names, like BGP Validation, to avoid confusion with
    the standard results card? is there a character limit for the name?
    Or do you select New Validation and end up with a bunch of new
    validation result cards? )  
    The **Protocols** field is grayed out because you are running the
    validation for all of them and no selection is needed. The **Device
    Group** field is grayed out because it is disabled in this release.

3.  Ignore the **Schedule** options since you are creating an on-demand
    request.

4.  If you do *not* want to be notified if any failures occur, uncheck
    the **Notify on Failure** checkbox. ( may be removed? )

5.  Click **Run Now** to start the validation.  
    The associated on-demand validation result cards are opened on your
    current workbench, one for each protocol or service, and a
    confirmation message is posted in the top right corner of the
    application. ( do you get multiple conf. toasts? )

When you want to select which protocols or services you want to validate
right now, you can create and run an on-demand validation request using
the large Validation Request card.

To create and run a request for *selected* protocols and/or services:

1.  Open the large Validation Request card.  
    \<insert image\>

2.  Enter a name for your request in the **Validation** field. For
    example, BGP Health or BGP and EVPN Health.  
    The **Device Group** field is grayed out because it is disabled in
    this release.

3.  Select the types of validations you want included in the request.
    For example, BGP and EVPN.
    
    1.  Click in the **Network Protocols and Services** field to open
        the dropdown list.
    
    2.  Either select from the list directly, scrolling when needed, or
        start typing the name to filter the list and then select it.  
        The dropdown list remains open for you to add another protocol
        or service until you point to another area of the card.
    
    3.  Continue adding options until you have selected all of the
        protocols and services you want to validate with this request.

4.  Ignore the **Schedule** options since you are creating an on-demand
    request.

5.  If you do *not* want to be notified if any failures occur, uncheck
    the **Notify on Failure** checkbox.

6.  If you have chosen to include EVPN in your validation, you also have
    the option to enable advanced EVPN analysis. To enable this feature:
    
    1.  Hover over card, and click \<evpn icon\>.
    
    2.  Move the toggle switch to the right.

7.  Click **Run Now** to start the validation.  
    The associated on-demand validation result card is opened on your
    current workbench and a confirmation message is posted in the top
    right corner of the application. ( what is the name/title of the
    assoc. card?
)

</div>

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-ScheduleanOn-demandValidationRequest" class="section section-2">

### Schedule an On-demand Validation Request

If you ran an on-demand request and you would like to have access to the
results on a regular basis, you can schedule the request to run
automatically.

If you have just run the on-demand validation for *all* protocols and
services and the medium Validation Request card is still open, click
**Edit**. This takes you to the large Validation Request card
pre-populated with all information except the schedule. Add the schedule
and click **Save As New**. ( Is this even permitted? Won't we have a
default validation with all protos and services? If so, then it would
make more sense to tell them to edit the schedule of that one rather
than schedule their own on demand version. )

If you have just run the on-demand validation for *selected* protocols
and services and the large Validation Request card is still open:

1.  Enter the schedule frequency by selecting it from the **Timeframe**
    dropdown list.

2.  Select the starting day and time.

3.  Click **Save As New**.

4.  Enter a name for the validation.

5.  Click **Save**.

If the original Validation Request card is no longer open, follow the
instructions in the next
section.

</div>

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-RunaScheduledValidationRequestOnDemand" class="section section-2">

### Run a Scheduled Validation Request On Demand

You may find that although you have a validation scheduled to run at a
later time, you would like to run it now.

To run a scheduled validation now:

1.  Open the small Validation Request card.  
    \<insert image\>

2.  Select the validation from the **Validation** dropdown list, or
    start typing the name of the validation until it is shown in the
    list and then select it.

3.  Click **Go**.  
    The associated Validation Result cards are opened on your
workbench.

</div>

</div>

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-ViewOn-demandValidationResults" class="section section-1">

## View On-demand Validation Results

The On-demand Validation Result card workflows enable you to view the
results of on-demand validation requests. When a request has started
processing, the associated medium Validation Result card is displayed on
your workbench. When multiple network protocols or services are included
in a validation, a validation result card is opened for each protocol
and service. Each protocol and service has its own validation result
card, but the content is similar on
each.

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-On-DemandValidationResultCardWorkflow" class="section section-2">

### On-Demand Validation Result Card Workflow

The small Validation Result card
displays:

![/images/download/attachments/9015479/image2019-3-13\_12\_27\_29.png](/images/download/attachments/9015479/image2019-3-13_12_27_29.png)

<div class="tablewrap">

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
<td><p><img src="/images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" alt="/images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" /></p></td>
<td><p>Indicates an on-demand validation result</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>On-demand Result &lt;Network Protocol or Service Name&gt; Validation</p></td>
</tr>
<tr class="odd">
<td><p>Timestamp</p></td>
<td><p>Date and time the validation was completed</p></td>
</tr>
<tr class="even">
<td><p>, ,</p></td>
<td><p>Overall result status, where:</p>
<ul>
<li><p>Good: All checks passed.</p></li>
<li><p>Warning: One or more validation runs posted warnings during the check.</p></li>
<li><p>Failed: One or more validation runs failed during the check.</p></li>
</ul></td>
</tr>
</tbody>
</table>

</div>

The medium Validation Result card
displays:

![/images/download/attachments/9015479/image2019-3-13\_12\_29\_4.png](/images/download/attachments/9015479/image2019-3-13_12_29_4.png)

<div class="tablewrap">

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
<td><p><img src="/images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" alt="/images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" /></p></td>
<td><p>Indicates an on-demand validation result</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>On-demand Validation Result | &lt;Network Protocol or Service Name&gt;</p></td>
</tr>
<tr class="odd">
<td><p>Timestamp</p></td>
<td><p>Date and time the validation was completed</p></td>
</tr>
<tr class="even">
<td><p>, ,</p></td>
<td><p>Overall result status, where:</p>
<ul>
<li><p><strong>Good</strong>: All checks passed</p></li>
<li><p><strong>Warning</strong>: One or more validation runs posted warnings during the check</p></li>
<li><p><strong>Failed</strong>: One or more validation runs failed during the check</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Devices Tested</p></td>
<td><p>Chart with the total number of devices included in the validation and the distribution of the results.</p>
<ul>
<li><p><strong>Pass</strong>: Successful result count</p></li>
<li><p><strong>Warn</strong>: Warning result count</p></li>
<li><p><strong>Fail</strong>: Failed result count</p></li>
</ul>
<p>Hover over chart to view the number of devices and the percentage of all tested devices for each result category.</p></td>
</tr>
<tr class="even">
<td><p>Sessions Tested</p></td>
<td><p>For BGP, chart with total number of sessions included in the validation and the distribution of the overall results. Hover over chart to view the number of sessions and the percentage of all tested sessions for each result category.</p>
<p>For EVPN, chart with total number of BGP sessions included in the validation and the distribution of the overall results.Hover over chart to view the number of sessions and the percentage of all tested sessions for each result category.</p>
<p>For Interfaces, chart with total number of ports included in the validation and the distribution of the overall results. Hover over chart to view the number of sessions and the percentage of all tested sessions for each result category.</p>
<p>In each of these charts:</p>
<ul>
<li><p><strong>Pass</strong>: Successful result count</p></li>
<li><p><strong>Warn</strong>: Warning result count</p></li>
<li><p><strong>Fail</strong>: Failed result count</p></li>
</ul>
<p>This chart does not apply to other Network Protocols and Services, and thus is not displayed for those cards.</p></td>
</tr>
<tr class="odd">
<td><p>Open &lt;Network Protocol or Service Name&gt; Service Card</p></td>
<td><p>Click to open the corresponding medium Network Services card. Refer to <a href="Monitor_Network_Protocols_and_Services">Monitor Network Protocols and Services</a> for details about these cards and workflows.</p></td>
</tr>
</tbody>
</table>

</div>

The large Validation Result card contains two tabs.

The *Summary* tab
displays:

![/images/download/attachments/9015479/image2019-3-13\_14\_29\_22.png](/images/download/attachments/9015479/image2019-3-13_14_29_22.png)

<div class="tablewrap">

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
<td><p><img src="/images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" alt="/images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" /></p></td>
<td><p>Indicates an on-demand validation result</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>On-demand Validation Result | Summary | &lt;Network Protocol or Service Name&gt;</p></td>
</tr>
<tr class="odd">
<td><p>Devices Tested</p></td>
<td><p>Chart with the total number of devices included in the validation and the distribution of the results.</p>
<ul>
<li><p><strong>Pass</strong>: Successful result count</p></li>
<li><p><strong>Warn</strong>: Warning result count</p></li>
<li><p><strong>Fail</strong>: Failed result count</p></li>
</ul>
<p>Hover over chart to view the number of devices and the percentage of all tested devices for each result category.</p></td>
</tr>
<tr class="even">
<td><p>Sessions Tested</p></td>
<td><p>For BGP, chart with total number of sessions included in the validation and the distribution of the overall results. Hover over chart to view the number of sessions and the percentage of all tested sessions for each result category.</p>
<p>For EVPN, chart with total number of BGP sessions included in the validation and the distribution of the overall results.Hover over chart to view the number of sessions and the percentage of all tested sessions for each result category.</p>
<p>For Interfaces, chart with total number of ports included in the validation and the distribution of the overall results. Hover over chart to view the number of sessions and the percentage of all tested sessions for each result category.</p>
<p>In each of these charts:</p>
<ul>
<li><p><strong>Pass</strong>: Successful result count</p></li>
<li><p><strong>Warn</strong>: Warning result count</p></li>
<li><p><strong>Fail</strong>: Failed result count</p></li>
</ul>
<p>This chart does not apply to other Network Protocols and Services, and thus is not displayed for those cards.</p></td>
</tr>
<tr class="odd">
<td><p>Open &lt;Network Protocol or Service Name&gt; Service Card</p></td>
<td><p>Click to open the corresponding medium Network Services card. Refer to <a href="Monitor_Network_Protocols_and_Services">Monitor Network Protocols and Services</a> for details about these cards and workflows.</p></td>
</tr>
<tr class="even">
<td><p>Table/Filter options</p></td>
<td><p>When the <strong>Most Active</strong> filter option is selected, the table displays switches and hosts running the given service or protocol in decreasing order of alarm counts—devices with the largest number of warnings and failures are listed first ( column layout is odd, would expect to start with device, then count, then type? )</p>
<p>When the <strong>Most Recent</strong> filter option is selected, the table displays switches and hosts running the given service or protocol sorted by timestamp, with the device with the most recent warning or failure listed first. The table provides the following additional information:</p>
<ul>
<li><p><strong>Hostname</strong>: User-defined name for switch or host</p></li>
<li><p><strong>Message Type</strong>: Network protocol or service which triggered the event</p></li>
<li><p><strong>Message</strong>: Short description of the event</p></li>
<li><p><strong>Severity</strong>: Indication of importance of event; values in decreasing severity include critical, warning, error, info, debug ( only critical alarms? )</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Show All Devices</p></td>
<td><p>Click to open the full screen card with all on-demand validation results sorted by ?</p></td>
</tr>
</tbody>
</table>

</div>

The *Configuration* tab
displays:

![/images/download/attachments/9015479/image2019-3-13\_14\_28\_7.png](/images/download/attachments/9015479/image2019-3-13_14_28_7.png)

<div class="tablewrap">

| Item                                                                                                                                                                                                                                                                                                                                                       | Description                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ![/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl\_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w](/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w) | Indicates an on-demand validation request configuration                                   |
| Title                                                                                                                                                                                                                                                                                                                                                      | On-demand Validation Result | Configuration | \<Network Protocol or Service Name\>        |
| Validations                                                                                                                                                                                                                                                                                                                                                | List of network protocols or services included in the request that produced these results |
| Schedule                                                                                                                                                                                                                                                                                                                                                   | Not relevant to on-demand validation results. Value is always N/A.                        |

</div>

The full screen Validation Result card provides a tab for all on-demand
validation results.

\<insert image\>

<div class="tablewrap">

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
<td><p>Validation Results | On-demand</p></td>
</tr>
<tr class="even">
<td><p><img src="/images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" alt="/images/lh4.googleusercontent0.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T" /></p></td>
<td><p>Closes full screen card and returns to workbench</p></td>
</tr>
<tr class="odd">
<td><p>Time period</p></td>
<td><p>Range of time in which the displayed data was collected; applies to all card sizes; select an alternate time period by clicking <img src="/images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" alt="/images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U" /></p></td>
</tr>
<tr class="even">
<td><p>Results</p></td>
<td><p>Number of results found for the selected tab</p></td>
</tr>
<tr class="odd">
<td><p>On-demand Validations</p></td>
<td><p>Displays all unscheduled validation results. By default, the results list is sorted by ( protocol/service? ). This tab provides the following additional data about each result:</p>
<ul>
<li><p>Creator</p></li>
<li><p>Date Created</p></li>
<li><p>Run Count</p></li>
<li><p>Last Run Result</p></li>
<li><p>Schedule</p></li>
<li><p>Validation Name</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Export</p></td>
<td><p>Enables export of all or selected items in a CSV or JSON formatted file</p></td>
</tr>
<tr class="odd">
<td><p><img src="/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

</div>

</div>

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-ViewOn-demandValidationResults.1" class="section section-2">

### View On-demand Validation Results

Once an on-demand validation request has completed, the results are
available in the corresponding Validation Result card.

To view the results:

1.  Locate the small on-demand Validation Result card on your workbench
    for the protocol or service that was run.  
    You can identify it by the on-demand result icon, , protocol or
    service name, and the date and time that it was run. The small card
    presents whether the validation result is good or whether it was Bad
    (there were warnings or failures).

2.  To view a bit more about these results, switch to the medium
    on-demand Validation Results card.  
    Note the total number and distribution of results for the devices
    and sessions tested. Are there many failures?

3.  Hover over the charts to view the total number of warnings or
    failures and what percentage of the total results that represents
    for both devices and sessions.

4.  Switch to the large on-demand Validation Result card.

5.  If there are a large number of device warnings or failures, view the
    devices with the most issues by clicking **Top Switches** in the
    dropdown list above the table.

6.  If there are a large number of session warnings or failures, view
    the sessions with the most issues by clicking Top Sessions in the
    dropdown list.

7.  If there are a large number of devices and sessions with warnings or
    failures, the protocol or service may be experiencing issues. View
    the health of the protocol or service as a whole by clicking
    **Open** \<*network service*\> **Card**.

8.  To view all data available for all on-demand validation results,
    switch to the full screen card. You may find that comparing various
    results gives you a clue as to why certain devices or sessions are
    experiencing more warnings or failures. For example, more failures
    occurred between certain times or xxx
.

</div>

</div>

<div id="src-9015479_ValidateNetworkProtocolandServiceOperations-ViewScheduledValidationResults" class="section section-1">

## View Scheduled Validation Results

With this release, you can view the results of scheduled validations
using the CLI.

</div>
