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
refer to the Monitor Switches topic.

Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Devices Inventory Card Workflow
    Summary](#MonitorNetworkInventory-DevicesInventoryCardWorkflowSummary)
-   [View Which Operating Systems Are Running on Your Network
    Devices](#MonitorNetworkInventory-ViewWhichOperatingSystemsAreRunningonYourNetworkDevices)
-   [View Switch
    Components](#MonitorNetworkInventory-ViewSwitchComponents)
    -   [Highlight a Selected Component
        Type](#MonitorNetworkInventory-HighlightaSelectedComponentType)
    -   [Focus on a Selected Component
        Type](#MonitorNetworkInventory-FocusonaSelectedComponentType)
    -   [Navigate to Related
        Cards](#MonitorNetworkInventory-NavigatetoRelatedCards)
    -   [Navigate to the Switch Inventory
        Workflow](#MonitorNetworkInventory-NavigatetotheSwitchInventoryWorkflow)
-   [View All Switches](#MonitorNetworkInventory-ViewAllSwitches)
-   [View All Hosts](#MonitorNetworkInventory-ViewAllHosts)

## Devices Inventory Card Workflow Summary

The small Devices Inventory card displays:

-   total number of monitored switches and hosts

The medium Devices Inventory card displays:

-   total number of monitored switches and hosts
-   distribution of operating systems deployed on switches and hosts

The large Devices Inventory card displays.

-   total number of switches
-   distribution and unique number of ASIC vendors and models
-   distribution and unique number of OS version
-   distribution and unique number of license status
-   distribution and unique number of NetQ Agents versions
-   distribution and unique number of platform versions

The full screen Devices Inventory card provides tabs for all switches
and all hosts.

 View the Number of Each Device Type in Your Network

You can view the number of switches and hosts deployed in your network.
As you grow your network this can be useful for validating that devices
have been added as scheduled. 

To view the quantity of devices in your network, open the small Devices
Inventory card. 

Chassis are not monitored in this release, so an NA (not applicable)
value is displayed for these devices, even if you have chassis in your
network.

## View Which Operating Systems Are Running on Your Network Devices

You can view the distribution of operating systems running on your
switches and hosts. This is useful for verifying which versions of the
OS are deployed and for upgrade planning. It also provides a view into
the relative dependence on a given OS in your network.

To view the OS distribution, open the medium Devices Inventory card if
it is not already on your workbench.

![](attachments/8365531/9013674.png){height="250"}

Chassis are not monitored in this release, so an NA (not applicable)
value is displayed for these devices, even if you have chassis in your
network.

## View Switch Components

To view switch components, open the large Devices Inventory card. By
default the Switches tab is shown displaying the total number of
switches, ASIC vendor, OS versions, license status, NetQ Agent versions,
and specific platforms deployed on all of your switches. 

![](attachments/8365531/9013675.png){height="250"}

### Highlight a Selected Component Type

You can hover over any of the segments in a component distribution chart
to highlight a specific type of the given component. When you *hover*, a
tooltip appears displaying:

-   the name or value of the component type, such as the version number
    or status
-   the total number of switches with that type of component deployed
    compared to the total number of switches
-   percentage of this type with respect to all component types.   
    ![](attachments/8365531/9013680.png){height="250"}![](attachments/8365531/9013681.png){width="200"}

Additionally, sympathetic highlighting is used to show the related
component types relevant to the highlighted segment and the number of
unique component types associated with this type (shown in blue here).

### Focus on a Selected Component Type

To dig deeper on a particular component type, you can filter the card
data by that type. In this procedure, the result of filtering on the OS
is shown.

To view component type data:

1.  *Click* a segment of the component distribution charts.  
    ![](attachments/8365531/9013682.png){width="300"}
2.  Select the first option from the popup, *Filter* &lt;*component
    name*&gt;. The card data is filtered to show only the components
    associated with selected component type. A filter tag appears next
    to the total number of switches indicating the filter criteria.   
    ![](attachments/8365531/9013685.png){width="250"}
3.  Hover over the segments to view the related components.  
    ![](attachments/8365531/9013683.png){height="250"}
4.  To return to the full complement of components, click
    the ![](attachments/8365531/9012483.png){width="16"} in the filter
    tag.

### Navigate to Related Cards

The large Switches card provides quick links to full-screen cards in the
Device Inventory workflow. 

To navigate to a related card:

1.  Click the component name or a segment of a component on the
    distribution chart.
2.  Select the desired card from the dropdown list.  
    ![](attachments/8365531/9013682.png){width="300"}

### Navigate to the Switch Inventory Workflow

While the Device Inventory cards provide a network-wide view, you may
want to see more detail about your switch inventory. This can be found
in the Switches Inventory card workflow. To open that workflow, click
the **Switch Inventory** button at the top right of the Switches card.

![](attachments/8365531/9013686.png){height="250"}

## View All Switches

You can view all stored attributes for all switches in your network. To
view all switch details, open the full screen Devices Inventory card and
click the **All Switches** tab in the navigation panel.

![](attachments/8365531/9013676.png){width="700"}

To return to your workbench,
click ![](attachments/8365531/9012483.png){width="16"} in the top right
corner of the card. 

## View All Hosts

You can view all stored attributes for all hosts in your network. To
view all hosts details, open the full screen Devices Inventory card and
click the **All Hosts** tab in the navigation panel.

![](attachments/8365531/9013687.png){width="700"}

To return to your workbench,
click ![](attachments/8365531/9012483.png){width="16"} in the top right
corner of the card. 

 

 

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-12-13
15:23:33.png](attachments/8365531/8367206.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [navigation
drawer 1.svg](attachments/8365531/9011205.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [navigation
drawer 1.svg](attachments/8365531/9011206.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [navigation
drawer 1.svg](attachments/8365531/9011217.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [navigation
drawer 1.png](attachments/8365531/9011210.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [navigation
drawer 1.svg](attachments/8365531/9011202.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[bubble-chat-exclamation-2.svg](attachments/8365531/9011428.svg)
(image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-28
11:17:40.png](attachments/8365531/9012473.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-28
11:34:7.png](attachments/8365531/9012483.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:57:38.png](attachments/8365531/9013673.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:58:24.png](attachments/8365531/9013674.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:59:3.png](attachments/8365531/9013675.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:59:43.png](attachments/8365531/9013676.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
16:4:13.png](attachments/8365531/9013679.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
16:6:3.png](attachments/8365531/9013680.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
16:7:28.png](attachments/8365531/9013681.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
16:14:21.png](attachments/8365531/9013682.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
16:17:42.png](attachments/8365531/9013683.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
16:18:42.png](attachments/8365531/9013685.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
16:21:7.png](attachments/8365531/9013686.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
16:22:54.png](attachments/8365531/9013687.png) (image/png)  
