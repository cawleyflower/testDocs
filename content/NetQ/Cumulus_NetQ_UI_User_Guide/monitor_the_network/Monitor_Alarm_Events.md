\--- title: author: keywords: ---

# Monitor Alarm Events

Two event workflows, the Alarms card workflow and the Info card
workflow, provide a view into the events occurring in the network. The
Alarms card workflow tracks critical severity events, whereas the Info
card workflow tracks all warning, info, and debug severity events.

To focus on events from a single device perspective, refer to Monitor
Switches . To monitor informational alarms, refer to [Monitor
Informational
Events](Monitor_Informational_Events).

<div id="src-8365539_MonitorAlarmEvents-AlarmsCardWorkflowSummary" class="section section-1">

## Alarms Card Workflow Summary

The small Alarms card displays:

  - total number of alarms

  - distribution of alarms

  - performance indicator

The medium Alarms card displays:

  - total number of alarms

  - total number, distribution, and trend of alarms overall

  - total number, distribution, and trend of alarms triggered by system

  - total number, distribution, and trend of alarms triggered by
    interfaces

  - total number, distribution, and trend of alarms triggered by network
    services

The large Alarms card displays:

  - total number, distribution, and trend of alarms triggered by all
    services

  - total number, distribution, and trend of alarms triggered by NetQ
    Agents

  - total number, distribution, and trend of alarms triggered by invalid
    licenses

  - total number, distribution, and trend of alarms triggered by device
    sensors

  - total number, distribution, and trend of alarms triggered by ports

  - total number, distribution, and trend of alarms triggered by links

  - total number, distribution, and trend of alarms triggered by MTU
    issues

  - total number, distribution, and trend of alarms triggered by the
    LLDP service

  - total number, distribution, and trend of alarms triggered by
    configuration changes

The full screen Alarms card provides tabs for all
events.

</div>

<div id="src-8365539_MonitorAlarmEvents-ViewAlarmStatusSummary" class="section section-1">

## View Alarm Status Summary

A summary of the critical alarms in the network includes the number of
alarms, a trend indicator, a performance indicator, and a distribution
of those alarms. The trend indicator is based on the count of alarms
that have occurred compared to the count in the last two time periods:

  - Upward facing arrow: alarm count is higher that the last two time
    periods, an increasing trend

  - Downward facing arrow: alarm count is lower than the last two time
    periods, a decreasing trend

  - No arrow: count is unchanged, trend is steady.

The performance indicator is based on a set of pre-defined thresholds,
where:

  - Low: alarm count is less than x

  - Med: alarm count is between x and y

  - High: alarm count is more than y

To view the summary, open the small Alarms
card.

![/images/download/attachments/8365539/image2019-2-19\_16\_26\_35.png](/images/download/attachments/8365539/image2019-2-19_16_26_35.png)

</div>

<div id="src-8365539_MonitorAlarmEvents-ViewtheDistributionofAlarms" class="section section-1">

## View the Distribution of Alarms

It is helpful to know where and when alarms are occurring in your
network. The Alarms card workflow enables you to see the distribution of
alarms based on its source—network services, interfaces, traces or other
system service. You can also view the trend of alarms in each source
category.

To view the alarm distribution, open the medium Alarms card. Scroll down
to view all of the
charts.

![/images/download/attachments/8365539/image2019-2-19\_16\_28\_50.png](/images/download/attachments/8365539/image2019-2-19_16_28_50.png)

</div>

<div id="src-8365539_MonitorAlarmEvents-MonitorSystemandInterfaceAlarmDetails" class="section section-1">

## Monitor System and Interface Alarm Details

The Alarms card workflow enables users to easily view and track critical
severity system and interface alarms occurring anywhere in your
network.

<div id="src-8365539_MonitorAlarmEvents-ViewAllSystemandInterfaceAlarms" class="section section-2">

### View All System and Interface Alarms

You can view the alarms associated with the system and interfaces using
the Alarms card workflow. You can sort alarms based on their occurrence
or view devices with the most network services alarms.

To view network services alarms, open the large Alarms
card.

![/images/download/attachments/8365539/image2019-2-19\_16\_35\_50.png](/images/download/attachments/8365539/image2019-2-19_16_35_50.png)

From this card, you can view the distribution of alarms for each of the
categories over time. Scroll down to view any hidden charts. A list of
the associated alarms is also displayed.

By default, the list of the most recent alarms for the systems and
interfaces is displayed when viewing the large
cards.

</div>

<div id="src-8365539_MonitorAlarmEvents-ViewDeviceswiththeMostAlarms" class="section section-2">

### View Devices with the Most Alarms

You can filter instead for the devices that have the most alarms.

To view devices with the most alarms, open the large Alarms card, and
then select **Devices by event count** from the
dropdown.

![/images/download/attachments/8365539/image2019-2-19\_16\_40\_52.png](/images/download/attachments/8365539/image2019-2-19_16_40_52.png)

</div>

<div id="src-8365539_MonitorAlarmEvents-FilterAlarmsbySystemorInterface" class="section section-2">

### Filter Alarms by System or Interface

You can focus your view to include alarms for selected system or
interface categories.

To filter for selected categories:

1.  Click the checkbox to the left of one or more charts to remove those
    set of alarms from the table on the right.

2.  Select the **Devices by event count** to view the devices with the
    most alarms for the selected categories.

3.  Switch back to most recent events by selecting **Events by most
    recent**.

4.  Click the checkbox again to return a category's data to the table.

In this example, we removed the Services from the event
listing.

![/images/download/attachments/8365539/image2019-2-19\_16\_50\_42.png](/images/download/attachments/8365539/image2019-2-19_16_50_42.png)

</div>

<div id="src-8365539_MonitorAlarmEvents-CompareAlarmswithaPriorTime" class="section section-2">

### Compare Alarms with a Prior Time

You can change the time period for the data to compare with a prior
time. If the same devices are consistently indicating the most alarms,
you might want to look more carefully at those devices using the
Switches card workflow.

To compare two time periods:

1.  Open a second Alarm Events card. Remember it goes to the bottom of
    the workbench.

2.  Switch to the large size view.

3.  Move the card to be next to the original Alarm Events card. Note
    that moving large cards can take a few extra seconds since they
    contain a large amount of data.

4.  Hover over the card and click
    ![/images/lh4.googleusercontent.com/fo-yr9tPWzyO\_CQPDiddcB5tmuwuX1OS7nIlj4\_9iA3\_6xnmg\_c-54SmAAdNJL\_odR0UGjeTSxRHw2BHkeZ3YEfiwOhjpUeHVwPVd8s4F2XwOGnRWXD4NfaIzj86ETYgEU8frnzw](/images/lh4.googleusercontent.com/fo-yr9tPWzyO_CQPDiddcB5tmuwuX1OS7nIlj4_9iA3_6xnmg_c-54SmAAdNJL_odR0UGjeTSxRHw2BHkeZ3YEfiwOhjpUeHVwPVd8s4F2XwOGnRWXD4NfaIzj86ETYgEU8frnzw)
    .
    
    ![/images/download/attachments/8365539/image2019-2-19\_17\_20\_17.png](/images/download/attachments/8365539/image2019-2-19_17_20_17.png)

5.  Select a different time
    period.  
    ![/images/download/attachments/8365539/image2019-2-19\_17\_22\_49.png](/images/download/attachments/8365539/image2019-2-19_17_22_49.png)
    ![/images/download/attachments/8365539/image2019-2-19\_17\_22\_58.png](/images/download/attachments/8365539/image2019-2-19_17_22_58.png)

6.  Compare the two cards with the **Devices by event count** filter
    applied.  
    In this example, the total alarm count is down, but the same device
    has the most alarms in each time period, so it might be worth
    investigating this device in more
detail.

</div>

</div>

<div id="src-8365539_MonitorAlarmEvents-ViewAllEvents" class="section section-1">

## View All Events

You can view all events in the network either by clicking the **Show All
Events** link under the table on the large Alarm Events card, or by
opening the full screen Alarm Events
card.

![/images/download/attachments/8365539/image2019-2-19\_17\_31\_15.png](/images/download/attachments/8365539/image2019-2-19_17_31_15.png)
OR
![/images/download/attachments/8365539/image2019-2-19\_17\_32\_19.png](/images/download/attachments/8365539/image2019-2-19_17_32_19.png)

To return to your workbench, click
![/images/download/attachments/8365539/close.png](/images/download/attachments/8365539/close.png)
in the top right corner of the
card.

</div>

<div id="src-8365539_MonitorAlarmEvents-AlarmsReference" class="section section-1">

## Alarms Reference

The following table lists alarm messages organized by message type, by
default. Click the column header to sort the list by that
characteristic. Click
![/images/download/attachments/8365539/image2018-12-5\_17\_18\_48.png](/images/download/attachments/8365539/image2018-12-5_17_18_48.png)
in any column header to toggle the sort order between A-Z and Z-A.

<div class="confbox admonition admonition-info">

<div class="admonition-body">

{{% notice info %}} The messages can be viewed in syslog or through
third-party notification applications. For details about configuring
notifications using the NetQ CLI, refer to the Deployment Guide,
Configure Optional NetQ Capabilities. {{% /notice
%}}

</div>

</div>

<div class="tablewrap">

| Type       | Trigger                                                                                           | Severity  | Message Format                                                                                              | Example                                                                          |  |
| ---------- | ------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |  |
|            |                                                                                                   |           |                                                                                                             |                                                                                  |  |
| agent      | NetQ Agent state changed from Fresh to Rotten (not heard from in over 15 seconds)                 | Critical  | Agent state changed to rotten                                                                               | Agent state changed to rotten                                                    |  |
| clag       | CLAG remote peer state changed from up to down                                                    | Critical  | Peer state changed to down                                                                                  | Peer state changed from up to down                                               |  |
| configdiff | Configuration file deleted on a device                                                            | Critical  | @hostname config file @type was deleted                                                                     | spine03 config file /etc/frr/frr.conf was deleted                                |  |
| link       | Link operational state changed from up to down                                                    | Critical  | HostName @hostname changed state from @old\_state to @new\_state Interface:@ifname                          | HostName leaf01 changed state from up to down Interface:swp34                    |  |
| sensor     | A temperature, fan, or power supply unit sensor has changed from low or warning to critical       | Critical  | Sensor @sensor state changed from @old\_s\_state to @new\_s\_state                                          | Sensor temperature state changed from low to critical                            |  |
| sensor     | A temperature, fan, or power supply unit sensor has crossed the maximum threshold for that sensor | Critical  | Sensor @sensor max value @new\_s\_max exceeds threshold @new\_s\_crit                                       | Sensor fan max value 2000 exceeds the threshold 1500                             |  |
| sensor     | A temperature, fan, or power supply unit sensor has crossed the minimum threshold for that sensor | Critical  | Sensor @sensor min value @new\_s\_lcrit fall behind threshold @new\_s\_min                                  | Sensor psu min value 10 fell below threshold 10.5                                |  |
| services   | The process ID for a service changed and the service status changed from down to up               | Critical  | Service @name with old pid @old\_pid changed to @new\_pid, status changed from @old\_status to @new\_status | Service bgp with old pid 12323 changed to 27651, status changed from down to up  |  |
| services   | The process ID for a service changed and the service status changed from up to down               | Criticial | Service @name with old pid @old\_pid changed to @new\_pid, status changed from @old\_status to @new\_status | Service lldp with old pid 32846 changed to 17493, status changed from up to down |  |

</div>

</div>
