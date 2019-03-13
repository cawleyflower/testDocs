# Monitor Switches

With the NetQ UI, you can monitor individual switches separately from
the network. You are able to view the various components deployed for
all switches in the network. Being able to monitor switch component
inventory aids in upgrade, compliance, and other planning tasks.

For network-wide monitoring, refer to [Monitor the
Network](Monitor_the_Network).

# Contents

This topic describes...

# Switch Inventory Card Workflow Summary

The small Switch Inventory card displays:

-   total number of switches

The medium Switch Inventory card displays:

-   the distribution and unique count of disk sizes deployed

-   the distribution and unique count of Operating Systems deployed

-   the distribution and unique count of NetQ Agents deployed

-   the distribution and unique count of ASIC vendors and models
    deployed

-   the distribution and unique count of platform vendors and models
    deployed

-   the distribution and unique count of CPU models deployed

-   the distribution and unique count of license states

-   the distribution and unique count of memory sizes deployed

The large Switch Inventory card contains four tabs.

-   The Summary tab displays:

    -   distribution and unique count of components sorted by software
        and hardware

-   The ASIC Details tab displays:

    -   distribution of ASIC vendors

    -   distribution of ASIC models

-   The Platform Details tab displays:

    -   distribution of platform vendors

    -   distribution of platform models

    -   distribution of license states

-   The Software Details tab displays:

    -   distribution of operating systems

    -   distribution of NetQ Agent versions

The full screen Switch Inventory card provides tabs for all switches,
ASIC, platform, CPU, memory, disk, and OS components.

There are a multitude of ways to view and analyze the available data
within this workflow. A few examples are provided here.

# View a Summary of Communication Status for All Switches

A communication status summary for all of your switches across the
network is available from the small Switch Inventory card.

![](images/download/attachments/8367157/image2019-2-19_18_31_24.png)

# View the Number of Types of Any Component Deployed

For each of the components monitored on a switch, NetQ displays the
variety of those component by way of a count. For example, if you have
three operating systems running on your switches, say Cumulus Linux,
Ubuntu and RHEL, NetQ indicates a total unique count of three OSs. If
you only use Cumulus Linux, then the count shows as one.

To view this count for all of the components on the switch:

1.  Open the medium Switch Inventory card.

    ![](images/download/attachments/8367157/image2019-2-19_18_37_40.png){height="250"}

2.  Note the number in the **Unique** column for each component.\
    In the above example, there are four different disk sizes deployed,
    four different OSs running, four different ASIC vendors and models
    deployed, and so forth.

3.  Scroll down to see additional components.

By default, the data is shown for switches with a fresh communication
status. You can choose to look at the data for switches in the rotten
state instead. For example, if you wanted to see if there was any
correlation to a version of OS to the switch having a rotten status, you
could select **Rotten Switches** from the dropdown at the top of the
card and see if they all use the same OS (count would be 1). It may not
be the cause of the lack of communication, but you get the idea.

# View the Distribution of Any Component Deployed

NetQ monitors a number of switch components. For each component you can
view the distribution of versions or models or vendors deployed across
your network for that component.

To view the distribution:

1.  Open the medium or large Switch Inventory card. Each component has a
    chart showing the distribution.\
    ![](images/download/attachments/8367157/image2019-2-19_18_37_400.png){height="250"}
    OR
    ![](images/download/attachments/8367157/image2019-2-19_18_44_19.png){height="250"}

2.  Hover over a segment of the chart to view the name, version, model
    or vendor and the number of switches that have been deployed. You
    can also see the percentage of all switches this total represents.
    On the large Switch Inventory card, hovering also highlights the
    related components for the selected component. This is shown in blue
    here.

    ![](images/download/attachments/8367157/image2019-2-19_18_53_14.png){height="250"}

3.  Point to additional segments on that component or other components
    to view their detail.

4.  Scroll down to view additional components.

# View the Number of Switches with Invalid or Missing Licenses

It is important to know when you have switches that have invalid or
missing Cumulus Linux licenses, as not all of the features are
operational without a valid license. Simply open the medium or large
Switch Inventory card, and hover over the License chart to see the
count.

![](images/download/attachments/8367157/image2019-2-19_19_0_15.png){height="250"}

To view which vendors and platforms have bad or missing licenses, open
the large Switch Inventory card, and click to open the Platform Details
tab. Hover over the License State bar chart to highlight the vendor and
platforms with the various states.

To view which switches have invalid or missing licenses, either:

-   hover over the large Switch Inventory card and click to open the
    Platform Details tab. Above the Licenses State or the Vendor chart,
    click Show All.

-   open the full screen Switch Inventory card .

Then sort the All Switches tab data table by the License State column to
locate the switches with bad or missing licenses.

![](images/download/attachments/8367157/image2019-2-19_19_13_25.png)

# View the Most Commonly Deployed ASIC

It can be useful to know the quantity and ratio of many components
deployed in your network to determine the scope of upgrade tasks,
balance vendor reliance, or for detailed troubleshooting. You can view
the most commonly deployed components in generally the same way. Some
components have additional details contained in large card tabs.

To view the most commonly deployed ASIC, for example:

1.  Open the medium or large Switch Inventory card.

2.  Hover over the largest segment in the ASIC chart. The tooltip that
    appears shows you the number of switches with the given ASIC and the
    percentage of your entire switch population with this ASIC. Click on
    any other component in a similar fashion to see the most common type
    of that component.

3.  If you opened the medium Switch Inventory card, s witch to the large
    card.

4.  Hover over the card, and click to open the ASIC Details tab. Here
    you can more easily view the various vendors and platforms based on
    the ASIC deployed.

5.  Hover over the Vendor pie chart to highlight which platforms are
    supported by the vendor; and vice versa, hover over the Platform pie
    chart to see which vendor supports that platform. Moving your cursor
    off of the carts removes the highlight.

6.  Click on a segment of the Vendor pie chart to drill down and see
    only that Vendor and its supported models. A filter tag is placed at
    the top of the charts .

7.  To return to the complete view of vendors and platforms, click on
    the filter tag.

# View the Number of Switches with a Particular NetQ Agent

It is recommended that when you upgrade NetQ that you also upgrade the
NetQ Agents. You can determine if you have covered all of your agents
using the medium or large Switch Inventory card. To view the NetQ Agent
distribution by version:

1.  Open the medium Switch Inventory card.

2.  View the number in the Unique column next to Agent.

3.  If the number is greater than one, you have multiple NetQ Agent
    versions deployed.

4.  If you have multiple versions, hover over the Agent chart to view
    the count of switches using each version.

5.  For more detail, switch to the large Switch Inventory card.

6.  Hover over the card and click to open the Software Details tab.

7.  Hover over the chart on the right to view the number of switches
    using the various versions of the NetQ Agent.

8.  Hover over the Operating System chart to see which NetQ Agent
    versions are being run on each OS.

9.  Click either chart to focus on a particular OS or agent version.

10. To return to the full view, click in the filter tag.

11. Filter the data on the card by switches that are having trouble
    communicating, by selecting Rotten Switches from the dropdown above
    the charts.

# View a List of All Data for a Specific Component

When the small, medium and large Switch Inventory cards do not provide
either enough information or are not organized in a fashion that
provides the information you need, open the full screen Switch Inventory
card. Select the component tab of interest and filter and sort as
desired. Export the data to a third-party tool, by clicking **Export**.

![](images/download/attachments/8367157/image2019-2-19_19_34_48.png){height="250"}
