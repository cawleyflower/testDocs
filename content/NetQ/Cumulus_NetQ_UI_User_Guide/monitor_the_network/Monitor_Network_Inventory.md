# Monitor Network Inventory

With NetQ, a network administrator can monitor both the switch hardware
and its operating system for misconfigurations or misbehaving services.
The *Devices Inventory* card workflow provides a view into the switches
and hosts installed in your network and their various hardware and
software components. The workflow contains a small card with a count of
each device type in your network, a medium card displaying the operating
systems running on each set of devices, large cards with component
information statistics, and full-screen cards displaying tables with
attributes of all switches and all hosts in your network.

The Devices Inventory card workflow helps answer questions such as:

-   What switches do I have in the network?

-   What is the distribution of ASICs across my network?

-   Do all switches have valid licenses?

-   Are NetQ agents running on all of my switches?

For monitoring inventory and performance on a switch-by-switch basis,
refer to the Monitor Switches topic .

# Contents

This topic describes how to...

# Devices Inventory Card Workflow Summary

The small Devices Inventory card displays:

-   total number of monitored switches and hosts

The medium Devices Inventory card displays:

-   total number of monitored switches and hosts

-   distribution of operating systems deployed on switches and hosts

The large Devices Inventory card displays.

-   total number of switches

-   distribution and unique number of ASIC vendors and models

-   distribution and unique number of OS version

-   distribution and unique number of license status

-   distribution and unique number of NetQ Agents versions

-   distribution and unique number of platform versions

The full screen Devices Inventory card provides tabs for all switches
and all hosts.

View the Number of Each Device Type in Your Network

You can view the number of switches and hosts deployed in your network.
As you grow your network this can be useful for validating that devices
have been added as scheduled.

To view the quantity of devices in your network, o pen the small Devices
Inventory card.

![](images/download/attachments/8365531/image2019-2-19_15_57_38.png)

{{% notice tip %}} Chassis are not monitored in this release, so an NA
(not applicable) value is displayed for these devices, even if you have
chassis in your network. {{% /notice %}}

# View Which Operating Systems Are Running on Your Network Devices

You can view the distribution of operating systems running on your
switches and hosts. This is useful for verifying which versions of the
OS are deployed and for upgrade planning. It also provides a view into
the relative dependence on a given OS in your network.

To view the OS distribution, open the medium Devices Inventory card if
it is not already on your workbench.

![](images/download/attachments/8365531/image2019-2-19_15_58_24.png){height="250"}

{{% notice tip %}} Chassis are not monitored in this release, so an NA
(not applicable) value is displayed for these devices, even if you have
chassis in your network. {{% /notice %}}

# View Switch Components

To view switch components, open the large Devices Inventory card. By
default the Switches tab is shown displaying the total number of
switches, ASIC vendor, OS versions, license status, NetQ Agent versions,
and specific platforms deployed on all of your switches.

![](images/download/attachments/8365531/image2019-2-19_15_59_3.png){height="250"}

## Highlight a Selected Component Type

You can hover over any of the segments in a component distribution chart
to highlight a specific type of the given component. When you *hover*, a
tooltip appears displaying:

-   the name or value of the component type, such as the version number
    or status

-   the total number of switches with that type of component deployed
    compared to the total number of switches

-   percentage of this type with respect to all component types.\
    ![](images/download/attachments/8365531/image2019-2-19_16_6_3.png){height="250"}
    ![](images/download/attachments/8365531/image2019-2-19_16_7_28.png)

Additionally, sympathetic highlighting is used to show the related
component types relevant to the highlighted segment and the number of
unique component types associated with this type (shown in blue here).

## Focus on a Selected Component Type

To dig deeper on a particular component type, you can filter the card
data by that type. In this procedure, the result of filtering on the OS
is shown.

To view component type data:

1.  *Click* a segment of the component distribution charts.

    ![](images/download/attachments/8365531/image2019-2-19_16_14_21.png)

2.  Select the first option from the popup, *Filter* &lt;*component
    name*&gt;. The card data is filtered to show only the components
    associated with selected component type. A filter tag appears next
    to the total number of switches indicating the filter criteria.

    ![](images/download/attachments/8365531/image2019-2-19_16_18_42.png)

3.  Hover over the segments to view the related components.

    ![](images/download/attachments/8365531/image2019-2-19_16_17_42.png){height="250"}

4.  To return to the full complement of components, click the
    ![](images/download/attachments/8365531/image2019-1-28_11_34_7.png)
    in the filter tag.

## Navigate to Related Cards

The large Switches card provides quick links to full-screen cards in the
Device Inventory workflow.

To navigate to a related card:

1.  Click the component name or a segment of a component on the
    distribution chart.

2.  Select the desired card from the dropdown list.

    ![](images/download/attachments/8365531/image2019-2-19_16_14_21.png)

## Navigate to the Switch Inventory Workflow

While the Device Inventory cards provide a network-wide view, you may
want to see more detail about your switch inventory. This can be found
in the Switches Inventory card workflow. To open that workflow, click
the **Switch Inventory** button at the top right of the Switches card.

![](images/download/attachments/8365531/image2019-2-19_16_21_7.png){height="250"}

# View All Switches

You can view all stored attributes for all switches in your network. To
view all switch details, open the full screen Devices Inventory card and
click the **All Switches** tab in the navigation panel.

![](images/download/attachments/8365531/image2019-2-19_15_59_43.png)

To return to your workbench, click
![](images/download/attachments/8365531/image2019-1-28_11_34_7.png) in
the top right corner of the card.

# View All Hosts

You can view all stored attributes for all hosts in your network. To
view all hosts details, open the full screen Devices Inventory card and
click the **All Hosts** tab in the navigation panel.

![](images/download/attachments/8365531/image2019-2-19_16_22_54.png)

To return to your workbench, click
![](images/download/attachments/8365531/image2019-1-28_11_34_7.png) in
the top right corner of the card.
