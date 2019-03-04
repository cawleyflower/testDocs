# Monitor Network Health

As with any network, one of the challenges is keeping track of all of
the moving parts. With the NetQ GUI, you can view the overall health of
your network at a glance and then delve deeper for periodic checks or as
conditions arise that require attention. For a general understanding of
how well your network is operating, the Network Health card workflow is
the best place to start as it contains the highest view and performance
rollups.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Network Health Card Workflow
    Summary](#MonitorNetworkHealth-NetworkHealthCardWorkflowSummary)
-   [View Network Health
    Summary ](#MonitorNetworkHealth-ViewNetworkHealthSummary)
-   [View Key Metrics of Network
    Health](#MonitorNetworkHealth-ViewKeyMetricsofNetworkHealth)
-   [View Network Services
    Health ](#MonitorNetworkHealth-ViewNetworkServicesHealth)
    -   [View Devices with the Most
        Issues](#MonitorNetworkHealth-ViewDeviceswiththeMostIssues)
    -   [View Devices with Recent
        Issues](#MonitorNetworkHealth-ViewDeviceswithRecentIssues)
    -   [Filter Results by Network
        Service](#MonitorNetworkHealth-FilterResultsbyNetworkService)
-   [View All Events](#MonitorNetworkHealth-ViewAllEvents)

## Network Health Card Workflow Summary

The small Network Health card displays:

-   distribution of overall health
-   current overall score
-   overall health trend

![](attachments/8365529/9013656.png){width="220"}

The medium Network Health card displays the distribution, score, and
trend of the:

-   overall network performance
-   network services performance
-   interfaces performance
-   system performance

![](attachments/8365529/9013658.png){height="250"}

The large Network Health card contains three tabs.

-   System tab which displays:
    -   distribution, score, and trend of license status
    -   distribution, score, and trend of NetQ Agent health
    -   distribution, score, and trend of Sensor health
    -   devices by most failures
    -   devices by recent failures
-   Network Services tab which displays:
    -   distribution, score, and trend of NTP service performance
    -   distribution, score, and trend of LNV service performance
    -   distribution, score, and trend of VXLAN service performance
    -   distribution, score, and trend of EVPN service performance
    -   distribution, score, and trend of CLAG service performance
    -   distribution, score, and trend of OSPF service performance
    -   distribution, score, and trend of BGP service performance
    -   devices by most failures
    -   devices by recent failures
-   Interface tab which displays:
    -   distribution, score, and trend of interfaces performance
    -   distribution, score, and trend of MTU status 
    -   distribution, score, and trend of VLAN service performance
    -   devices by most failures
    -   devices by recent failures

![](attachments/8365529/9013662.png){height="250"}![](attachments/8365529/9013663.png){height="250"}  
![](attachments/8365529/9013664.png){height="250"}

## View Network Health Summary 

Overall network health is based on successful validation results. The
summary includes the percentage of successful results, a trend
indicator, and a distribution of the validation results. The trend
indicator is based on the count of successful validation results that
have occurred in the given period as compared to the count in the last
two time periods:

-   Upward facing arrow:  successful validation count is higher that the
    last two time periods, an increasing trend
-   Downward facing arrow: successful validation count is lower than the
    last two time periods, a decreasing trend
-   No arrow: count is unchanged, trend is steady.

To view a summary of your network health, open the small Network Health
card.

## View Key Metrics of Network Health

Overall network health is a calculated average of several key health
metrics: System, Network Services, and Interface health.

To view these key metrics, open the medium Network Health card. Each
metric is shown with the the percentage of successful validations, a
trend indicator, and a distribution of the validation results.

## View Network Services Health 

The network services health is a calculated average of the individual
network protocol and services health metrics. In all cases, validation
is performed on NTP, LLDP, interfaces, licenses, and NetQ Agents. If you
are running BGP, CLAG, or EVPN, the calculation includes these as well.
You can view the overall health of network services from the medium
Network Health card and information about individual services from the
large Network Health card.

To view information about each network protocol or service:

1.  Open the large Network Health card.
2.  Hover over the card and click .

The health of each protocol or service is represented on the left side
of the card by a distribution of the validation results, a trend
indicator, and a percentage of successful results. The right side of the
card provides a listing of devices running the services.

If you have more services running than fit naturally into the chart
area, a scroll bar appears for you to access their data.

### View Devices with the Most Issues

It is useful to know which devices are experiencing the most issues with
their network services in general, as this can help focus
troubleshooting efforts toward selected devices versus the protocol or
service. To view devices with the most issues, open the large Network
Health card. Select Most Failures from the dropdown above the table on
the right.

Devices with the highest number of issues are listed at the top. Scroll
down to view those with fewer issues. To further investigate the
critical devices, open the Event cards and filter on the indicated
switches.

### View Devices with Recent Issues

It is useful to know which devices are experiencing the most issues with
their network services right now, as this can help focus troubleshooting
efforts toward selected devices versus the protocol or service. To view
devices with the most issues, open the large Network Health card.
Select Recent Failures from the dropdown above the table on the right.
Devices with the highest number of issues are listed at the top. Scroll
down to view those with fewer issues. To further investigate the
critical devices, open the Event cards and filter on the indicated
switches.

### Filter Results by Network Service

You can focus the data in the table on the right, by unselecting one or
more services. Hover over a service chart, click the checkbox next to
the service when it appears. In this example, we are hovering over the
VXLAN so can see the blue checkbox.

![](attachments/8365529/9013668.png){height="250"} 

This grays out the chart and temporarily removes the data related to
that service from the table.

## View All Events

The Network Health card workflow enables you to view all of the network
protocol and services alarms in the designated time period. 

To view all alarms:

1.  Open the full screen Network Health card.
2.  Click **All Events** tab in the navigation panel.
3.  Sort alarm data by **Time** column to view alarms in most recent to
    least recent.

![](attachments/8365529/9013670.png){width="800"}

Where to go next depends on what data you see, but a few options
include: 

-   Sort or filter alarm data instead by severity, for example, or type.
-   Export the data for use in another analytics tool, by
    clicking **Export** and providing a name for the data file.

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-28
12:25:4.png](attachments/8365529/9012496.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-13
21:9:45.png](attachments/8365529/9013318.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-13
21:20:43.png](attachments/8365529/9013319.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:16:13.png](attachments/8365529/9013656.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:18:19.png](attachments/8365529/9013658.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:19:13.png](attachments/8365529/9013659.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:19:42.png](attachments/8365529/9013660.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:20:30.png](attachments/8365529/9013661.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:26:38.png](attachments/8365529/9013662.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:28:2.png](attachments/8365529/9013663.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:28:22.png](attachments/8365529/9013664.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:31:45.png](attachments/8365529/9013665.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:33:28.png](attachments/8365529/9013666.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:41:13.png](attachments/8365529/9013667.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:46:8.png](attachments/8365529/9013668.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:49:22.png](attachments/8365529/9013669.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:54:1.png](attachments/8365529/9013670.png) (image/png)  
