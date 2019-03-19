\--- title: author: keywords: ---

# NetQ User Interface Overview

The NetQ 2.0.0 graphical user interface (UI) enables you to access NetQ
capabilities through a web browser as opposed to through a terminal
window using the Command Line Interface (CLI). Visual representations of
the health of the network, inventory, and system events make it easy to
both find faults and misconfigurations and to fix them.

The UI is supported on Google Chrome. Other popular browsers may be
used, but have not been tested and may have some presentation issues.

<div class="confbox admonition admonition-tip">

<div class="admonition-body">

{{% notice tip %}} Before you get started, you should refer to the
release notes for this version. {{% /notice
%}}

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-AccesstheNetQUI" class="section section-1">

## Access the NetQ UI

Logging in to the NetQ UI is as easy as opening any web page.

To log in to the UI:

1.  Open a new Internet browser window or tab.

2.  Enter the following URL into the Address bar: http:// *\<
    netq\_platform\_ipaddress\>:32666.*
    
    ![/images/download/attachments/8365523/image2019-2-19\_10\_20\_1.png](/images/download/attachments/8365523/image2019-2-19_10_20_1.png)

3.  Select your language of choice (English or Spanish) from the
    dropdown at the top of the window.

4.  Enter your username and then your password ( *admin, admin* by
    default).  
    ![/images/download/attachments/8365523/image2019-2-19\_10\_31\_4.png](/images/download/attachments/8365523/image2019-2-19_10_31_4.png)  
    The default Cumulus Workbench opens, with your username showing in
    the upper right corner of the application.

To log out of the UI:

1.  Click the user icon at the top right of the application.

2.  Select **Log
Out.**

</div>

<div id="src-8365523_NetQUserInterfaceOverview-ApplicationLayout" class="section section-1">

## Application Layout

The NetQ UI contains three main areas:

  - **Navigation History** (1): Provides quick access to your recent
    actions.

  - **Application Header** (2): Contains the main menu, search
    capabilities, quick health status chart, and user account
    information.

  - **Workbench** (3): Contains a task bar, targeted content cards with
    status and configuration information about your network and its
    various components, and the software
version.

![/images/download/attachments/8365523/image2019-2-19\_10\_36\_12.png](/images/download/attachments/8365523/image2019-2-19_10_36_12.png)

</div>

<div id="src-8365523_NetQUserInterfaceOverview-MainMenu" class="section section-1">

## Main Menu

Found in the application header, click
![/images/download/attachments/8365523/image2018-12-10\_15\_56\_55.png](/images/download/attachments/8365523/image2018-12-10_15_56_55.png)
to open the main menu which provides navigation to:

  - **Favorites**: contains list of links to workbenches that you have
    designated as favorites; Home is listed by default

  - **NetQ**: contains list of links to all workbenches in the
    application

  - **Network**: contains list of links to tabular data about various
    network elements

  - **Admin**: contains link to user
documentation

![/images/download/attachments/8365523/image2019-2-19\_10\_39\_9.png](/images/download/attachments/8365523/image2019-2-19_10_39_9.png)

The content of the NetQ and Favorites lists change as you create and
favorite
workbenches.

</div>

<div id="src-8365523_NetQUserInterfaceOverview-QuickNetworkHealthView" class="section section-1">

## Quick Network Health View

Found in the header, the graph and performance rating provide a view
into the health of your network at a
glance.

![/images/download/attachments/8365523/image2019-2-4\_16\_2\_35.png](/images/download/attachments/8365523/image2019-2-4_16_2_35.png)

</div>

<div id="src-8365523_NetQUserInterfaceOverview-Search" class="section section-1">

## Search

The Global Search field in the UI header enables you to search for
devices.

<div id="src-8365523_NetQUserInterfaceOverview-CreateaSearch" class="section section-2">

### Create a Search

As with most search fields, simply begin entering the criteria in the
search field. As you type, items that match the search criteria are
shown in the search history dropdown along with the last time the search
was viewed. Wildcards are not allowed, but this predictive matching
eliminates the need for them. By default, the most recent searches are
shown. If more have been performed, they can be accessed. This may
provide a quicker search by reducing entry specifics and suggesting
recent searches. Selecting a suggested search from the list provides a
preview of the search results to the right.

To create a new search:

1.  Click in the **Global Search** field.

2.  Enter your search criteria.

3.  Click the device hostname or card workflow in the search list to
    open the associated
    information.
    
    ![/images/download/attachments/8365523/image2019-2-19\_10\_44\_41.png](/images/download/attachments/8365523/image2019-2-19_10_44_41.png)

</div>

<div id="src-8365523_NetQUserInterfaceOverview-RunaRecentSearch" class="section section-2">

### Run a Recent Search

If you did not save a recent search, but want to rerun the search, you
can check the navigation panel to see if it is in the actions list. If
it is there, just click it to run the search. If it is no longer in the
actions list:

1.  Click in the **Global Search** field.

2.  Begin entering your search criteria.

3.  When the desired search appears in the suggested searches list,
    select it. You may need to click **See All \# Results** to find the
    desired
    search.
    
    ![/images/download/attachments/8365523/image2019-2-19\_10\_42\_9.png](/images/download/attachments/8365523/image2019-2-19_10_42_9.png)

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-Workbenches" class="section section-1">

## Workbenches

A workbench is comprised of a given set of cards. Each user may have one
or more workbenches. A user might create a workbench that focuses on
each category of tasks for which he is responsible. For example, a user
could create a workbench focused on Switch Performance and a workbench
focused on Inventory. A set of preconfigured default workbenches are
available to get you started; however, they can can be modified to
better suit your specific
tasks.

<div id="src-8365523_NetQUserInterfaceOverview-DefaultWorkbenches" class="section section-2">

### Default Workbenches

The Cumulus Workbench is the default workbench provided with the UI. It
contains Device Inventory, Switch Inventory, Alarm and Info Events, and
Network Health cards.

On initial login, if the default workbench is not open, click
![/images/download/attachments/8365523/image2019-2-13\_20\_29\_27.png](/images/download/attachments/8365523/image2019-2-13_20_29_27.png)
and select Cumulus Workbench from the NetQ category. After that, to open
a different workbench:

1.  Click
    ![/images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U](/images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U)
    in the Workbench header.

2.  Select the desired
    workbench.
    
    ![/images/download/attachments/8365523/image2019-2-19\_10\_49\_42.png](/images/download/attachments/8365523/image2019-2-19_10_49_42.png)

You can modify a workbench by adding or removing cards or card decks, as
described in Add or Remove a Card
.

</div>

<div id="src-8365523_NetQUserInterfaceOverview-CreateCustomWorkbench" class="section section-2">

### Create Custom Workbench

When the default workbench does not meet your needs, you can create
custom workbenches.

To create a custom workbench:

1.  Click
    ![/images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U](/images/lh5.googleusercontent.com/V88gxOaxuUjBWw5tni0vwGrNs2JBQsz0SwWFpQCdJTOSYfuUGQnpkWz8-cHDSF-jZsE4TeZfpRhaeIhOU7UIZZE2AwtP870d78GBCwuD0Kzqb7TbAiDnX5hgQh5DC68zoKgoLd5U)
    in the Workbench header.

2.  Select **Cumulus Workbench**.

3.  Click
    ![/images/lh5.googleusercontent.com/jACUqufGvJcFmOEzwCU-709HG49Ef79ioLejTcqOTyr3oSfpjbonBH8UAjyIesHqBpoqgobOZnfDTX6bwZnOoecjebnHWawtX1rQrDNzdXYIzoTBJMWyVQSkjO6OeDGcB\_C0Igfv](/images/lh5.googleusercontent.com/jACUqufGvJcFmOEzwCU-709HG49Ef79ioLejTcqOTyr3oSfpjbonBH8UAjyIesHqBpoqgobOZnfDTX6bwZnOoecjebnHWawtX1rQrDNzdXYIzoTBJMWyVQSkjO6OeDGcB_C0Igfv)
    to remove all cards if you want to start with a clean slate.

4.  Follow the instruction in [Add or Remove a
    Card](#src-8365523_NetQUserInterfaceOverview-AddDelCard) to a dd or
    remove individual cards or card
decks.

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-Cards" class="section section-1">

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
data at the same
time.

<div id="src-8365523_NetQUserInterfaceOverview-CardSizes" class="section section-2">

### Card Sizes

The various sizes of cards enables you to view your content at just the
right level. For each aspect that you are monitoring there is typically
a single card, that presents increasing amounts of data over its four
sizes. For example, a snapshot of your total inventory may be
sufficient, but to monitor the distribution of hardware vendors may
requires a bit more
space.

<div id="src-8365523_NetQUserInterfaceOverview-SmallCards" class="section section-3">

#### Small Cards

Small cards are most effective at providing a quick view of the
performance or statistical value of a given aspect of your network. They
are commonly comprised of an icon to identify the aspect being
monitored, summary performance or statistics in the form of a graph
and/or counts, and often an indication of any related events. Other
content items may be present. Some examples include a Devices Inventory
card, a Switch Inventory card, an Alarm Events card, an Info Events
card, and a Network Health card, as shown
here:

![/images/download/attachments/8365523/image2019-2-19\_10\_54\_2.png](/images/download/attachments/8365523/image2019-2-19_10_54_2.png)

</div>

<div id="src-8365523_NetQUserInterfaceOverview-MediumCards" class="section section-3">

#### Medium Cards

Medium cards are most effective at providing the key measurements for a
given aspect of your network. They are commonly comprised of an icon to
identify the aspect being monitored, one or more key measurements that
make up the overall performance. Often additional information is also
included, such as related events or components. Some examples include a
Devices Inventory card, a Switch Inventory card, an Alarm Events card,
an Info Events card, and a Network Health card, as shown here. Compare
these with their related small- and large-sized
cards.

![/images/download/attachments/8365523/image2019-2-19\_11\_1\_42.png](/images/download/attachments/8365523/image2019-2-19_11_1_42.png)

</div>

<div id="src-8365523_NetQUserInterfaceOverview-LargeCards" class="section section-3">

#### Large Cards

Large cards are most effective at providing the detailed information for
monitoring specific components or functions of a given aspect of your
network. These can aid in isolating and resolving existing issues or
preventing potential issues. They are commonly comprised of detailed
statistics and graphics. Some large cards also have tabs for additional
detail about a given statistic or other related information. Some
examples include a Devices Inventory card, an Alarm Events card, and a
Network Health card, as shown here. Compare these with their related
small- and medium-sized
cards.

![/images/download/attachments/8365523/image2019-2-19\_11\_4\_45.png](/images/download/attachments/8365523/image2019-2-19_11_4_45.png)

</div>

<div id="src-8365523_NetQUserInterfaceOverview-Full-ScreenCards" class="section section-3">

#### Full-Screen Cards

Full-screen cards are most effective for viewing all available data
about an aspect of your network all in one place. When you cannot find
what you need in the small, medium, or large cards, it is likely on the
full-screen card. Most full-screen cards are comprised of data grid, or
table; however, some contain visualizations. Some examples include All
Events card and All Switches card, as shown
here.

![/images/download/attachments/8365523/image2019-2-19\_11\_13\_52.png](/images/download/attachments/8365523/image2019-2-19_11_13_52.png)

![/images/download/attachments/8365523/image2019-2-19\_11\_15\_42.png](/images/download/attachments/8365523/image2019-2-19_11_15_42.png)

</div>

<div id="src-8365523_NetQUserInterfaceOverview-DataGridSettings" class="section section-3">

#### Data Grid Settings

You can manipulate the data in a data grid in a full screen card in
several ways.

*Sort Data by Column*

Hover over a column header and click
![/images/lh3.googleusercontent.com/3rtgOOjZrQnbTdoelUi8ABzIsqZqZGRvrggdthbirqmuJcElrlQqWsd1UDZNafvkFHeqVkkRvfS34h8HmqTVSvVIoCpoygqj2VrhKAmjrZrvw3FTkQyM1FkDgAp3ZAihUoaOuN-v](/images/lh3.googleusercontent.com/3rtgOOjZrQnbTdoelUi8ABzIsqZqZGRvrggdthbirqmuJcElrlQqWsd1UDZNafvkFHeqVkkRvfS34h8HmqTVSvVIoCpoygqj2VrhKAmjrZrvw3FTkQyM1FkDgAp3ZAihUoaOuN-v)
.

*Choose Columns to Display*

1.  Click
    ![/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl\_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w](/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w)
    at the top right of the card.

2.  Click **Change Columns**.

3.  Click the checkbox next to each column name to toggle on/off the
    columns you would like displayed. Columns listed under **Active**
    are displayed. Columns listed under **Inactive** are not displayed.
    
    <div class="confbox admonition admonition-tip">
    
    <div class="admonition-body">
    
    {{% notice tip %}} When you have a large number of possible columns
    for display, you can search for the column name using the Quick
    Filter to find and select or deselect the column more quickly. {{%
    /notice %}}
    
    </div>
    
    </div>

4.  Click
    ![/images/lh4.googleusercontent.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI\_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T](/images/lh4.googleusercontent.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T)
    to close the selection box and view the updated data grid.

*Change Order of Columns*

1.  Click
    ![/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl\_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w](/images/lh5.googleusercontent.com/TxyRotE-Ks3VoU0rMfISNSl_V0m0yXqQyq8cn7CI6da54YIrMvzU8ttAOXmnbpUJdXBIQBG9OothePcEuJ-DoNYR1SdJIpW6RAlGd5wXxJdRcI0HPR3eMMcrSwotbHTrjqUNFH3w)
    and then click **Change Columns**.

2.  Hover over a column name.

3.  Point to the six dots to the left of the checkbox.

4.  Click and drag the selected column up or down in the
    list.
    
    ![/images/download/attachments/8365523/image2019-2-19\_11\_26\_10.png](/images/download/attachments/8365523/image2019-2-19_11_26_10.png)

5.  Click
    ![/images/lh4.googleusercontent.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI\_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T](/images/lh4.googleusercontent.com/DO5d-BvJ-vciNs7f0SlTY72rHmQgJpxHGUYsRkK0aDIMZ2VQP9ygWJzCZH5qouUZGI3MZOvOxdfvn8dt8xMxBI_4UvJVTZMJVnmb5Za0LEdQ3lOeqs01w942HG2AJ14kJm1sY56T)
    to close the selection box and view the updated data
grid.

</div>

<div id="src-8365523_NetQUserInterfaceOverview-ExportData" class="section section-3">

#### Export Data

You can export tabular data from a full screen card to a CSV- or
JSON-formatted file.

To export the data:

1.  Click
    **EXPORT**.
    
    ![/images/download/attachments/8365523/image2019-2-19\_11\_35\_31.png](/images/download/attachments/8365523/image2019-2-19_11_35_31.png)

2.  Select all data or selected data for export in the dialog
    box:
    
    ![/images/download/attachments/8365523/image2019-2-13\_20\_51\_19.png](/images/download/attachments/8365523/image2019-2-13_20_51_19.png)

3.  Select the export format.

4.  Click **EXPORT** to save the file to your downloads
directory.

</div>

<div id="src-8365523_NetQUserInterfaceOverview-CardSizeSummary" class="section section-3">

#### Card Size Summary

<div class="tablewrap">

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
<th><p>Card Size</p></th>
<th><p>Small</p></th>
<th><p>Medium</p></th>
<th><p>Large</p></th>
<th><p>Full Screen</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Primary Purpose</p></td>
<td><ul>
<li><p>Quick view of status, typically at the level of good or bad</p></li>
<li><p>Enable quick actions, run a validation or trace for example</p></li>
</ul></td>
<td><ul>
<li><p>View key performance parameters or statistics</p></li>
<li><p>Perform an action</p></li>
<li><p>Look for potential issues</p></li>
</ul></td>
<td><ul>
<li><p>View detailed performance and statistics</p></li>
<li><p>Perform actions</p></li>
<li><p>Compare and review related information</p></li>
</ul></td>
<td><ul>
<li><p>View all attributes for given network aspect</p></li>
<li><p>Free-form data analysis and visualization</p></li>
<li><p>Export data to third-party tools</p></li>
</ul></td>
</tr>
</tbody>
</table>

</div>

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-CardInteractions" class="section section-2">

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

To access the time period, card size, and additional actions, hover over
the card. These options appear, covering the card header, enabling you
to select the desired
option.

<div id="src-8365523_NetQUserInterfaceOverview-ChangetheTimePeriodfortheCardData" class="section section-3">

#### Change the Time Period for the Card Data

All cards have a default time period for the data shown on the card,
typically the last 24 hours. You can change the time period to view the
data during a different time range to aid analysis of previous or
existing issues.

To change the time period for a card:

1.  Hover over any card.

2.  Click in the header .

3.  Select a time period from the dropdown
    list.
    
    ![/images/download/attachments/8365523/image2019-2-19\_11\_47\_45.png](/images/download/attachments/8365523/image2019-2-19_11_47_45.png)

<div class="confbox admonition admonition-tip">

<div class="admonition-body">

{{% notice tip %}} Changing the time period in this manner only changes
the time period for the given card. {{% /notice
%}}

</div>

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-SwitchtoaDifferentCardSize" class="section section-3">

#### Switch to a Different Card Size

You can switch between the different card sizes at any time. Only one
size is visible at a time. To view the same card in different sizes,
open a second copy of the card.

To change the card size:

1.  Hover over the card.

2.  Hover over the Card Size Picker and move the cursor to the right or
    left until the desired size option is
    highlighted.
    
    ![/images/download/attachments/8365523/image2019-2-19\_11\_50\_3.png](/images/download/attachments/8365523/image2019-2-19_11_50_3.png)
    
    Single width opens a small card. Double width opens a medium card.
    Triple width opens large cards. Full width opens full-screen cards.

3.  Click the Picker.  
    The card changes to the selected size, and may move its location on
    the
workbench.

</div>

<div id="src-8365523_NetQUserInterfaceOverview-RepositionaCardonYourWorkbench" class="section section-3">

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
    has the blue dotted line around
    it.
    
    ![/images/download/attachments/8365523/image2019-2-19\_11\_58\_18.png](/images/download/attachments/8365523/image2019-2-19_11_58_18.png)

3.  Click the card with the highlight to move the original
    card.
    
    ![/images/download/attachments/8365523/image2019-2-19\_12\_1\_10.png](/images/download/attachments/8365523/image2019-2-19_12_1_10.png)

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-AddDelCardAddorRemoveaCard" class="section section-2">

### Add or Remove a Card

You can add or remove cards from a workbench at any time.

To add a card:

1.  Click
    ![/images/download/attachments/8365523/image2019-1-28\_16\_24\_47.png](/images/download/attachments/8365523/image2019-1-28_16_24_47.png)
    .
    
    ![/images/download/attachments/8365523/image2019-2-13\_20\_58\_15.png](/images/download/attachments/8365523/image2019-2-13_20_58_15.png)

2.  Select a card from the available list.

The card is placed at the end of the set of cards currently on the
workbench. You might need to scroll down to see it. By default, the
medium size of the card is added to your workbench. You can move it to
another location as described above.

To remove a card:

1.  Hover over the card you want to remove.

2.  Click
    ![/images/lh4.googleusercontent.com/2VPuKgI9RmbIKGMWYHIZEgLjxxWCG47tMpYrG3KB\_60oZ6U6KdeSlUq-mh8gxLyPqLWv7SFVtoBZPxEzGhsXt79fSwNbJEGRetV44mEE33K47ysvnQHGvfYaRTBwMBmXKQVVUWCx](/images/lh4.googleusercontent.com/2VPuKgI9RmbIKGMWYHIZEgLjxxWCG47tMpYrG3KB_60oZ6U6KdeSlUq-mh8gxLyPqLWv7SFVtoBZPxEzGhsXt79fSwNbJEGRetV44mEE33K47ysvnQHGvfYaRTBwMBmXKQVVUWCx)
    (*More Actions* menu).

3.  Click
    **Remove**.
    
    ![/images/download/attachments/8365523/image2019-2-19\_12\_6\_2.png](/images/download/attachments/8365523/image2019-2-19_12_6_2.png)

The card is removed from the workbench, but not from the
application.

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-CardWorkflows" class="section section-1">

## Card Workflows

The UI provides a number of card workflows. Card workflows focus on a
particular aspect of your network and are a linked set of each size
card—a small card, a medium card, one or more large cards, and one or
more full-screen cards. The following card workflows are available:

  - Network Health: network-wide view of network health

  - Device Inventory: information about all switches and hosts in the
    network

  - Switch Inventory: information about the components on a given switch

  - Alarm Events: information about all critical severity events in the
    system

  - Info Events: information about all warning, info, and debug events
    in the
system

<div id="src-8365523_NetQUserInterfaceOverview-AccessaCardWorkflow" class="section section-2">

### Access a Card Workflow

You can access a card workflow in multiple ways:

  - For workbenches available from the main menu, open the workbench
    that contains the card flow

  - Open a prior search

  - Add it to a workbench

  - Search for it

To open the card workflow through a default workbench:

1.  Click
    ![/images/lh4.googleusercontent.com/Ihm0JTW8BKRYhfGAskurMhk7YX22cYSDKBcT2M8G6PMR9hGBjfVrIno9QFPLjaNzMeedQw1R2Tun8TRNT5T8PWnrL7k63hLMx4ZMb59L8vXjvxmzbQznzTOxXq5G4dp-DD8-aC97](/images/lh4.googleusercontent.com/Ihm0JTW8BKRYhfGAskurMhk7YX22cYSDKBcT2M8G6PMR9hGBjfVrIno9QFPLjaNzMeedQw1R2Tun8TRNT5T8PWnrL7k63hLMx4ZMb59L8vXjvxmzbQznzTOxXq5G4dp-DD8-aC97)
    .

2.  Select the relevant workbench.

The workbench opens, hiding your previous workbench.

To open the card workflow from a prior search:

1.  Browse your search list in the navigation panel.

2.  Look for an "Add: \<card name\>" item.

3.  If it is still available, click the item.

The card appears on the current workbench, at the bottom.

To access the card workflow by adding the card:

1.  Click
    ![/images/lh6.googleusercontent.com/JaXSSELl\_nz1tMCRgnfs7dN4bErlnOHc-uteFbWlsLyCqW2khDGqUCVZcZYusEdlvGhDj3cml3sU0YGQq0aST\_mpgZe-p1d07LL4bP-GsWr7Xcozg7w7cDhpyYeCSgkrYRFDW9xx](/images/lh6.googleusercontent.com/JaXSSELl_nz1tMCRgnfs7dN4bErlnOHc-uteFbWlsLyCqW2khDGqUCVZcZYusEdlvGhDj3cml3sU0YGQq0aST_mpgZe-p1d07LL4bP-GsWr7Xcozg7w7cDhpyYeCSgkrYRFDW9xx)
    .

2.  Select the relevant card.

The card appears on the current workbench, at the bottom.

<div class="confbox admonition admonition-tip">

<div class="admonition-body">

{{% notice tip %}} If you have multiple cards open on your workbench
already, you might need to scroll down to see the card you have just
added. {{% /notice %}}

</div>

</div>

To access the card workflow by searching for the card:

1.  Click in the **Global Search** field.

2.  Enter at least part of the card name.

3.  Select it from the list.

The card appears on a current workbench, at the
bottom.

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-CardDecks" class="section section-1">

## Card Decks

A card deck is a collection of related cards that can be added and
removed from a workbench all at once. They are distinct from card
workflows, which focus on a particular aspect of your network. A card
deck pulls multiple cards with related information to aid the user in
performing a broader task. It also simplifies the creation of new
workbenches when a card deck is available. The following card decks are
provided by default:

  - Inventory: includes the medium Inventory | Switch card

  - Events: includes the medium Events | Alarms card and the small
    Events | Info
card

</div>

<div id="src-8365523_NetQUserInterfaceOverview-BasicTerminologyandAcronyms" class="section section-1">

## Basic Terminology and Acronyms

The following table covers some basic terms used throughout the NetQ
user documentation.

<div class="tablewrap">

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
<td><p>Alarm</p></td>
<td><p>In UI, event with critical severity.</p></td>
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
<td><p>Device</p></td>
<td><p>UI term referring to a switch, host, or chassis or combination of these. Typically used when describing hardware and components versus a software or network topology. See also Node.</p></td>
</tr>
<tr class="even">
<td><p>Event</p></td>
<td><p>Change or occurrence in network or component; may or may not trigger a notification. In the NetQ UI, there are two types of events: Alarms which indicate a critical severity event, and Info which indicate warning, informational, and debugging severity events.</p></td>
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
<td><p>Info</p></td>
<td><p>In UI, event with warning, informational, or debugging severity.</p></td>
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
<td><p>Node</p></td>
<td><p>UI term referring to a switch, host or chassis in a topology.</p></td>
</tr>
<tr class="odd">
<td><p>Notification</p></td>
<td><p>Item that informs a user of an event. In UI there are two types of notifications: Alert which is a n otification sent by system to inform a user about an event; specifically received through a third-party application, and Message which is a notification sent by a user to share content with another user.</p></td>
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

</div>

The following table covers some common acronyms used throughout the NetQ
user documentation.

<div class="tablewrap">

| Acronym       | Meaning                                             |
| ------------- | --------------------------------------------------- |
| ACL           | Access Control Link                                 |
| ARP           | Address Resolution Protocol                         |
| ASN           | Autonomous System Number                            |
| BGP/eBGP/iBGP | Border Gateway Protocol, External BGP, Internal BGP |
| CLAG          | Cumulus multi-chassis Link Aggregation Group        |
| DHCP          | Dynamic Host Control Protocol                       |
| DNS           | Domain Name Server                                  |
| ECMP          | Equal Cost Multi-Path routing                       |
| EVPN          | Ethernet Virtual Private Network                    |
| FDB           | Forwarding Data Base                                |
| GNU           | GNU’s Not Linux                                     |
| HA            | High Availability                                   |
| IGMP          | Internet Group Management Protocol                  |
| IPv4/IPv6     | Internet Protocol, version 4 or 6                   |
| LACP          | Link Aggregation Control Protocol                   |
| LAN           | Local Area Network                                  |
| LLDP          | Link Layer Data Protocol                            |
| MAC           | Media Access Control                                |
| MIB           | Management Information Base                         |
| MLAG          | Multi-chassis Link Aggregation Group                |
| MLD           | Multicast Listener Discovery                        |
| NTP           | Network Time Protocol                               |
| OOB           | Out of Band (management)                            |
| OSPF          | Open Shortest Path First                            |
| RFC           | Remote Function Call                                |
| SDN           | Software-Defined Network                            |
| SNMP          | Simple Network Management Protocol                  |
| SSH           | Secure SHell                                        |
| SQL           | Structured Query Language                           |
| STP           | Spanning Tree Protocol                              |
| TCP           | Transport Control Protocol                          |
| ToR           | Top of Rack                                         |
| UDP           | User Datagram Protocol                              |
| URL           | Universal Resource Locator                          |
| USB           | Universal Serial Bus                                |
| VLAN          | Virtual Local Area Network                          |
| VNI           | Virtual Network Instance                            |
| VPN           | Virtual Private Network                             |
| VRF           | Virtual Routing and Forwarding                      |
| VRR           | Virtual Router Redundancy                           |
| VTEP          | VXLAN Tunnel EndPoint                               |
| VXLAN         | Virtual Extensible Local Area Network               |
| ZTP           | Zero Touch Provisioning                             |

</div>

Format Cues

Color is used to indicate links, options, and status within the UI.

<div class="tablewrap">

| Item                                | Color  |
| ----------------------------------- | ------ |
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

</div>

</div>

<div id="src-8365523_NetQUserInterfaceOverview-GetHelp" class="section section-1">

## Get Help

You can access the user documentation for the UI from the Main Menu.
Just click
![/images/download/attachments/8365523/image2019-1-28\_16\_51\_0.png](/images/download/attachments/8365523/image2019-1-28_16_51_0.png)
and select *Help Documentation* under the ADMIN category.

</div>
