# Validate Network Protocol and Service Operations

With the NetQ UI, you can validate the operation of the network
protocols and services running in your network either on demand or on a
scheduled basis. There are three card workflows to perform this
validation: one for creating the validation request (either on-demand or
scheduled) and two validation results (one for on-demand and one for
scheduled). ( how long are the results saved? diff if scheduled or not?
)

This release supports validation of the following network protocols and
services: Agents, BGP, CLAG, EVPN, Interfaces, License, and NTP.

For a more general understanding of how well your network is operating,
refer to the [Monitor Network Health](Monitor_Network_Health) topic.

# Contents

This topic describes how to...

# Create Validation Requests

The Validation Request card workflow is used to create both on-demand
and scheduled validation requests. The intent of the request changes the
flow through the card, so the various options are described separately.

## Validation Request Card Workflow

The small Validation Request card displays:

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
<td><p><img src="images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" alt="images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" /></p></td>
<td><p>Indicates a validation request</p></td>
</tr>
<tr class="even">
<td><p>Validation</p></td>
<td><p>Either enter a name to create a new validation request, or filter and select a previously saved request to run that request on-demand</p></td>
</tr>
<tr class="odd">
<td><p>GO</p></td>
<td><p>Start the validation request</p></td>
</tr>
</tbody>
</table>

The medium Validation Request card displays:

&lt;insert image&gt;

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
<td><p><img src="images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" alt="images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" /></p></td>
<td><p>Indicates a validation request</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>Validation Request</p></td>
</tr>
<tr class="odd">
<td><p>Schedule a New Validation</p></td>
<td><p>Link to the large card to create a new scheduled validation request</p></td>
</tr>
<tr class="even">
<td><p>Validation</p></td>
<td><p>Either enter a name to create a new validation request, or select a previously saved request from the list to run that request on-demand</p></td>
</tr>
<tr class="odd">
<td><p>Protocols</p></td>
<td><p>By default all protocols are selected. Use the large card to create a validation request for selected protocols.</p></td>
</tr>
<tr class="even">
<td><p>Device Group</p></td>
<td><p>Disabled in this release</p></td>
</tr>
<tr class="odd">
<td><p>Schedule:</p></td>
<td><p>For new, on-demand requests, the schedule does not apply and so remains empty.</p>
<p>For a selected scheduled validation, the schedule is populated as defined and the time of the last run is displayed.</p></td>
</tr>
<tr class="even">
<td><p>Run Now</p></td>
<td><p>Start the validation request</p></td>
</tr>
<tr class="odd">
<td><p>Edit</p></td>
<td><p>Where does this go? L3?</p></td>
</tr>
</tbody>
</table>

The large Validation Request card displays:

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
<td><p><img src="images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" alt="images/lh4.googleusercontent.com/5dEYDdH5hI2y48LYin7TY5bI2F1S55h8S37KzGqqTEAwmEylGbCG8xk7VlZIBxH0rSZjlwolHQ3xlCvJDZRw_z1wX1iv-dNBBOfo2N9I8pSX9bWXhUupcPaxnnRMjydAyaFfRyLx" /></p></td>
<td><p>Indicates a validation request</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>Validation Request | New Request</p></td>
</tr>
<tr class="odd">
<td><p>Validation</p></td>
<td><p>Either enter a name to create a new validation request, or select a previously saved request from the list to run that request on-demand</p></td>
</tr>
<tr class="even">
<td><p>Protocols</p></td>
<td><p>Select the protocols to include in the request</p></td>
</tr>
<tr class="odd">
<td><p>Device Group</p></td>
<td><p>Disabled in this release</p></td>
</tr>
<tr class="even">
<td><p>Schedule: (optional)</p></td>
<td><p>For a new, on-demand validation request,</p>
<ul>
<li><p>Run Every: Select how often to run the request. Choose from 30 minutes, 1, 3, 6, or 12 hours, or 1 day.</p></li>
<li><p>Starting: ( Enter manually? if yes, specific format, or ) Select the date and time to start the first request in the series</p></li>
</ul>
<p>For a selected scheduled validation request, the schedule is populated as defined and the time of the last run is displayed. You can modify as needed.</p></td>
</tr>
<tr class="odd">
<td><p>Notify on Failure</p></td>
<td><p>By default, the user interface informs application users when a request fails. If you do not want to be notified when a request fails, uncheck the box.</p></td>
</tr>
<tr class="even">
<td><p>Run Now</p></td>
<td><p>Start the validation request</p></td>
</tr>
<tr class="odd">
<td><p>Update</p></td>
<td><p>When changes are made to a selected validation request, <strong>Update</strong> becomes available so that you can save your changes.</p>
<div class="confbox admonition admonition-info">
<div class="admonition-body">
{{% notice info %}} Be aware, that if you update a previously saved validation request, the historical data collected will no longer match the data results of future runs of the request. If your intention is to leave this request unchanged and create a new request, click Save As New instead. {{% /notice %}}
</div>
</div>
<p>Does this also run it, or do you then have to click run now?</p></td>
</tr>
<tr class="even">
<td><p>Save As New</p></td>
<td><p>When changes are made to a previously saved validation request, Save As New becomes available so that you can save the modified request as a new request. Does this Does this also run it, or do you then have to click run now?</p></td>
</tr>
</tbody>
</table>

The full screen Validation Request card displays all scheduled
validation requests.

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
<td><p>Validation Request | Scheduled</p></td>
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
<td><p>Scheduled Validations tab</p></td>
<td><p>Displays all scheduled validation requests. By default, the requests list is sorted by ( protocol/service? ). This tab provides the following additional data about each request:</p>
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
<td><p><img src="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

## Create and Run a New On-demand Validation Request

When you want to validate the operation of all network protocols and
services right now, you can create and run an on-demand validation
request using the medium Validation Request card. ( actually, why don't
we just tell them to run the default scheduled version of this on demand
rather than recreating it? )

To create and run a request for *all* protocols and services:

1.  Open the medium Validation Request card.\
    &lt;insert image&gt;

2.  Enter a name for your request in the **Validation** field. For
    example, All Protos and Svcs or Whole Health. ( does this check
    against "taken" names, like BGP Validation, to avoid confusion with
    the standard results card? is there a character limit for the name?
    Or do you select New Validation and end up with a bunch of new
    validation result cards? )\
    The **Protocols** field is grayed out because you are running the
    validation for all of them and no selection is needed. The **Device
    Group** field is grayed out because it is disabled in this release.

3.  Ignore the **Schedule** options since you are creating an on-demand
    request.

4.  If you do *not* want to be notified if any failures occur, uncheck
    the **Notify on Failure** checkbox. ( may be removed? )

5.  Click **Run Now** to start the validation.\
    The associated on-demand validation result cards are opened on your
    current workbench, one for each protocol or service, and a
    confirmation message is posted in the top right corner of the
    application. ( do you get multiple conf. toasts? )

When you want to select which protocols or services you want to validate
right now, you can create and run an on-demand validation request using
the large Validation Request card.

To create and run a request for *selected* protocols and/or services:

1.  Open the large Validation Request card.\
    &lt;insert image&gt;

2.  Enter a name for your request in the **Validation** field. For
    example, BGP Health or BGP and EVPN Health.\
    The **Device Group** field is grayed out because it is disabled in
    this release.

3.  Select the types of validations you want included in the request.
    For example, BGP and EVPN.

    1.  Click in the **Network Protocols and Services** field to open
        the dropdown list.

    2.  Either select from the list directly, scrolling when needed, or
        start typing the name to filter the list and then select it.\
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

    1.  Hover over card, and click &lt;evpn icon&gt;.

    2.  Move the toggle switch to the right.

7.  Click **Run Now** to start the validation.\
    The associated on-demand validation result card is opened on your
    current workbench and a confirmation message is posted in the top
    right corner of the application. ( what is the name/title of the
    assoc. card? )

## Schedule an On-demand Validation Request

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
instructions in the next section.

## Create and Run a New Scheduled Validation Request

When you want to see validation results on a regular basis, it is useful
to configure a scheduled validation request to avoid re-creating the
request each time.

To create and run a new scheduled validation:

1.  Open the large Validation Request card.\
    &lt;insert image&gt;

2.  Select New Validation from the Validation dropdown ( or skip this
    field altogether? )\
    The **Device Group** field is grayed out because it is disabled in
    this release.

3.  Select the protocols and/or services you want included in the
    validation.

    1.  Click in the **Network Protocols and Services** field to open
        the dropdown list.

    2.  Either select from the list directly, scrolling when needed, or
        start typing the name to filter the list and then select it.\
        The dropdown list remains open for you to add another protocol
        or service until you point to another area of the card.

    3.  Continue adding options until you have selected all of the
        protocols and services you want to validate with this request.

4.  Set the schedule:

    1.  Enter the schedule frequency by selecting it from the
        **Timeframe** dropdown list.

    2.  Select the starting day and time.

5.  If you do *not* want to be notified if any failures occur, uncheck
    the **Notify on Failure** checkbox.

6.  If you have chosen to include EVPN in your validation, you also have
    the option to enable advanced EVPN analysis. To enable this feature:

    1.  Hover over card, and click &lt; evpn icon &gt;.

    2.  Move the toggle switch to the right.

7.  Click **Save As New**.

8.  Enter a name for the validation.

9.  Click **Save**.

## Run a Scheduled Validation Request On Demand

You may find that although you have a validation scheduled to run at a
later time, you would like to run it now.

To run a scheduled validation now:

1.  Open the small Validation Request card.\
    &lt;insert image&gt;

2.  Select the validation from the **Validation** dropdown list, or
    start typing the name of the validation until it is shown in the
    list and then select it.

3.  Click **Go**.\
    The associated Validation Result cards are opened on your workbench.

## Modify an Existing Scheduled Validation Request

At some point you might want to change the schedule or validation types
that are specified in a scheduled validation request.

To modify a scheduled validation:

1.  Open the large Validation Request card.

2.  Select the validation fro the **Validation** dropdown list.

3.  Edit the schedule or validation types.

4.  If the EVPN validation type is included in the validation, you can
    enable or disable the advanced analysis feature by hovering over the
    card, clicking &lt;evpn icon&gt;, and setting the toggle as desired.

5.  Click **Update**.

{{% notice info %}} When you update a scheduled request, the results for
all future runs of the validation will be different than the results of
previous runs of the validation. {{% /notice %}}

# View On-demand Validation Results

The On-demand Validation Result card workflows enable you to view the
results of on-demand validation requests. When a request has completed
processing, the small Validation Result card is displayed on your
workbench. Each protocol and service has its own validation result card,
but the content is similar on each.

## On-Demand Validation Result Card Workflow

The small Validation Result card displays:

&lt;insert image&gt;

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
<td><p><img src="images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" alt="images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" /></p></td>
<td><p>Indicates an on-demand validation result</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>&lt;Network Protocol or Service Name&gt; Validation</p></td>
</tr>
<tr class="odd">
<td><p>Timestamp</p></td>
<td><p>Date and time the validation was completed</p></td>
</tr>
<tr class="even">
<td><p>, ,</p></td>
<td><p>Overall result status: Good, Warning, or Failed</p></td>
</tr>
</tbody>
</table>

The medium Validation Result card displays:

&lt;insert image&gt;

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
<td><p><img src="images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" alt="images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" /></p></td>
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
<td><p>Overall result status: Good, Warning, or Failed</p></td>
</tr>
<tr class="odd">
<td><p>Devices Tested</p></td>
<td><p>Chart illustrating total number of devices included in the validation and the distribution of the overall results. Hover over chart to view count for each result category.</p></td>
</tr>
<tr class="even">
<td><p>Sessions Tested</p></td>
<td><p>For BGP, chart illustrating total number of sessions included in the validation and the distribution of the overall results. Hover over chart to view count for each result category.</p>
<p>For EVPN, chart illustrating total number of BGP sessions included in the validation and the distribution of the overall results.Hover over chart to view count for each result category.</p>
<p>For Interfaces, chart illustrating total number of ports included in the validation and the distribution of the overall results. Hover over chart to view count for each result category.</p>
<p>Does not apply to other Network Protocols and Services.</p></td>
</tr>
<tr class="odd">
<td><p>Open &lt;Network Protocol or Service Name&gt; Service Card</p></td>
<td><p>Click to go to the corresponding medium Network Services card.</p></td>
</tr>
</tbody>
</table>

The large Validation Result card contains two tabs.

The *Summary* tab displays:

&lt;insert image&gt;

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
<td><p><img src="images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" alt="images/lh4.googleusercontent.com/bnI7_0TnatdusGe1ASARt6edPrRjAT2sHQF2iMoBa9RoN0rfqt233oEECyNwI_yB7FVcsvlVWdP-gQRUVapgkYiwhOdGwKYxw-wxov7PhVUuk5If5ZmMZ37Ob_qNZvQWvfaF3rb-" /></p></td>
<td><p>Indicates an on-demand validation result</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>On-demand Validation Result | Summary | &lt;Network Protocol or Service Name&gt;</p></td>
</tr>
<tr class="odd">
<td><p>Devices Tested</p></td>
<td><p>Chart illustrating total number of devices included in the validation and the distribution of the overall results. Hover over chart to view count for each result category.</p></td>
</tr>
<tr class="even">
<td><p>Sessions Tested</p></td>
<td><p>For BGP, chart illustrating total number of sessions included in the validation and the distribution of the overall results. Hover over chart to view count for each result category.</p>
<p>For EVPN, chart illustrating total number of BGP sessions included in the validation and the distribution of the overall results.Hover over chart to view count for each result category.</p>
<p>For Interfaces, chart illustrating total number of ports included in the validation and the distribution of the overall results. Hover over chart to view count for each result category.</p>
<p>Does not apply to other Network Protocols and Services.</p></td>
</tr>
<tr class="odd">
<td><p>Open &lt;Network Protocol or Service Name&gt; Service Card</p></td>
<td><p>Click to go to the corresponding medium Network Services card.</p></td>
</tr>
<tr class="even">
<td><p>Table/Filter options</p></td>
<td><p>When the <strong>Top Switches</strong> filter option is selected, the table displays the switches and hosts running the given service or protocol in decreasing order of warning and failure result counts—devices with the largest number of warnings and failures are listed first</p></td>
</tr>
<tr class="odd">
<td><p>Show All Devices</p></td>
<td><p>? Don't have this L4 tab?</p></td>
</tr>
</tbody>
</table>

The *Configuration* tab displays:

&lt;insert image&gt;

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
<td><p><img src="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Indicates an on-demand validation request configuration</p></td>
</tr>
<tr class="even">
<td><p>Title</p></td>
<td><p>On-demand Validation Result | Configuration | &lt;Network Protocol or Service Name&gt;</p></td>
</tr>
<tr class="odd">
<td><p>Label</p></td>
<td><p>Disabled for this release. Value is always N/A.</p></td>
</tr>
<tr class="even">
<td><p>Validations</p></td>
<td><p>List of network protocols or services included in the request that produced these results</p></td>
</tr>
<tr class="odd">
<td><p>Schedule</p></td>
<td><p>Not relevant to on-demand validation results. Value is always N/A.</p></td>
</tr>
<tr class="even">
<td><p>Edit Config</p></td>
<td><p>Click to open ( medium/large? ) Validation Request card to make modifications to the request</p></td>
</tr>
</tbody>
</table>

The full screen Validation Result card provides a tab for all on-demand
validation results.

&lt;insert image&gt;

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
<td><p><img src="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" alt="images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w" /></p></td>
<td><p>Enables manipulation of table display; choose columns to display and reorder columns</p></td>
</tr>
</tbody>
</table>

## View On-demand Validation Results

Once an on-demand validation request has completed, the results are
available in the corresponding Validation Result card.

To view the results:

1.  Locate the small on-demand Validation Result card on your workbench
    for the protocol or service that was run.\
    You can identify it by the on-demand result icon, , protocol or
    service name, and the date and time that it was run. The small card
    presents whether the validation result is good or whether it was Bad
    (there were warnings or failures).

2.  To view a bit more about these results, switch to the medium
    on-demand Validation Results card.\
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
    **Open** &lt;*network service*&gt; **Card**.

8.  To view all data available for all on-demand validation results,
    switch to the full screen card. You may find that comparing various
    results gives you a clue as to why certain devices or sessions are
    experiencing more warnings or failures. For example, more failures
    occurred between certain times or xxx .

# View Scheduled Validation Results

With this release, you can view the results of scheduled validations
using the CLI.
