# Monitor Informational Events

Two event workflows, the Alarms card workflow and the Info card
workflow, provide a view into the events occurring in the network. The
Alarms card workflow tracks critical severity events, whereas the Info
card workflow tracks all warning, info, and debug severity events.

To focus on events from a single device perspective, refer to [Monitor
Switches](Monitor_Switches). To monitor alarms, refer to [Monitor Alarm
Events](Monitor_Alarm_Events).

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Info Card Workflow
    Summary](#MonitorInformationalEvents-InfoCardWorkflowSummary)
-   [View Info Events
    Summary](#MonitorInformationalEvents-ViewInfoEventsSummary)
-   [Compare Timing of Info and Alarm
    Events](#MonitorInformationalEvents-CompareTimingofInfoandAlarmEvents)
-   [View All Info Events Sorted by Time of
    Occurrence](#MonitorInformationalEvents-ViewAllInfoEventsSortedbyTimeofOccurrence)
-   [View Devices with the Most Info
    Events](#MonitorInformationalEvents-ViewDeviceswiththeMostInfoEvents)
-   [View All Events](#MonitorInformationalEvents-ViewAllEvents)
-   [Informational Events
    Reference](#MonitorInformationalEvents-InformationalEventsReference)

## Info Card Workflow Summary

The Info card workflow enables users to easily view and track
informational alarms occurring anywhere in your network.

The small Info card displays:

-   total number and distribution of info events
-   total number and distribution of alarms

The medium Info card displays:

-   types of info events that occurred
-   total number and distribution of info events
-   total number and distribution of alarms

The large Alarms card displays:

-   types of info events that occurred
-   total number and distribution of info events
-   total number and distribution of alarms
-   info events by most recent
-   devices by most issues

The full screen Info card provides tabs for all events.

## View Info Events Summary

A summary of the informational events occurring in the network can be
found on the small, medium, and large Info cards. Additional details are
available as you increase the size of the card.

To view the summary with the *small* Info card, simply open the card.
This card gives you a high-level view in a condensed visual, including
the number and distribution of the info events along with the alarms
that have occurred during the same time period. 

![](/attachments/9012102/9013711.png)

To view the summary with the *medium* Info card, simply open the card.
This card gives you the same count and distribution of info and alarm
events, but it also provides information about the sources of the info
events and enables you to view a small slice of time using the
distribution charts.

![](/attachments/9012102/9013712.png){height="250"}

Use the chart at the top of the card to view the various sources, types,
of info events. The four or so types with the most info events are
called out separately, with all others collected together into an
*Other* category.

![](/attachments/9012102/9013713.png){height="250"}

To view the summary with the large Info card, open the card. The left
side of the card provides the same capabilities as the medium Info card.

## Compare Timing of Info and Alarm Events

While you can see the relative relationship between info and alarm
events on the small Info card, the medium and large cards provide
considerably more information. Open either of these to view individual
line charts for the events. Generally, alarms have some corollary info
events. For example, when a network service becomes unavailable, a
critical alarm is often issued, and when the service becomes available
again, an info event of severity warning is generated. For this reason,
you might see some level of tracking between the info and alarm counts
and distributions. Some other possible scenarios:

-   When a critical alarm is resolved, you may see a temporary increase
    in info events as a result.
-   When you get a burst of info events, you may see a follow-on
    increase in critical alarms, as the info events may have been
    warning you of something beginning to go wrong.
-   You set logging to debug, and a large number of info events of
    severity debug are seen. You would not expect to see an increase in
    critical alarms.

## View All Info Events Sorted by Time of Occurrence

You can view all info events using the large Info card. Open the large
card and confirm the **Events By Most Recent** option is selected in the
dropdown above the table on the right. When this option is selected, all
of the info events are listed with the most recently occurring event at
the top. Scrolling down shows you the info events that have occurred at
an earlier time within the selected time period for the card.

![](/attachments/9012102/9013714.png){height="250"}

## View Devices with the Most Info Events

You can filter instead for the devices that have the most info events by
selecting the **Devices by Event Count** option from the dropdown above
the table.

![](/attachments/9012102/9013715.png){width="350"}

![](/attachments/9012102/9013716.png){height="250"}

## View All Events

You can view all events in the network either by clicking the **Show All
Events** link under the table on the large Info Events card, or by
opening the full screen Info Events card.

 OR 

To return to your workbench, click  in the top right corner of the
card. 

## Informational Events Reference

The following table lists alarm messages organized by message type and
then severity, by default. Click the column header to sort the list by
that characteristic. Click ![](/attachments/9012102/9012104.png) in any
column header to toggle the sort order between A-Z and Z-A. Recommended
actions suggest NetQ GUI cards, CLI commands and Cumulus Linux NCLU
commands for further investigation. 

Type

Trigger

Severity

Message Format

Example

 

agent

NetQ Agent state changed from Rotten to Fresh

Info

Agent state changed to fresh

Agent state changed to fresh

bgp

BGP Session state changed from Failed to Established

Info

BGP session with peer @peer @peerhost @neighbor vrf @vrf session state
changed from Failed to Established

BGP session with peer swp5 spine02 spine03 vrf default session state
changed from Failed to Established

bgp

BGP Session state changed from Established to Failed

Info

BGP session with peer @peer @neighbor vrf @vrf state changed from
Established to Failed

BGP session with peer leaf03 leaf04 vrf mgmt state changed from
Established to Failed

cable

The speed setting for a given port changed

Info

@ifname speed changed from @old\_speed to @new\_speed

swp9 speed changed from 10 to 40

cable

The transceiver status for a given port changed

Info

@ifname transreceiver changed from @old\_transareceiver to
@new\_transareceiver

swp4 transreceiver changed from disabled to enabled

cable

The vendor of a given transceiver changed

Info

@ifname vendor name changed from @old\_vendor\_name to
@new\_vendor\_name

swp23 vendor name changed from Broadcom to Mellanox

cable

The part number of a given transceiver changed

Info

@ifname part number changed from @old\_part\_number to
@new\_part\_number

swp7 part number changed from FP1ZZ5654002A to MSN2700-CS2F0

cable

The serial number of a given transceiver changed

Info

@ifname serial number changed from @old\_serial\_number to
@new\_serial\_number

swp4 serial number changed from 571254X1507020 to MT1552X12041

cable

The status of forward error correction (FEC) support for a given port
changed

Info

@ifname  supported fec changed from @old\_supported\_fec to
@new\_supported\_fec

swp12 supported fec changed from supported to unsupported

swp12 supported fec changed from unsupported to supported

cable

The advertised support for FEC for a given port changed

Info

@ifname  supported fec changed from @old\_advertised\_fec to
@new\_advertised\_fec

swp24 supported FEC changed from advertized to not advertized

cable

 The FEC status for a given port changed

Info

@ifname  fec changed from @old\_fec to @new\_fec

swp15 fec changed from disabled to enabled

clag

CLAG remote peer state changed from down to up

Info

Peer state changed to up

Peer state changed to up

clag

Local CLAG host state changed from down to up

Info

Clag state changed from down to up

Clag state changed from down to up

clag

CLAG bond in Conflicted state was updated with new bonds

Info

Clag conflicted bond changed from @old\_conflicted\_bonds to
@new\_conflicted\_bonds

Clag conflicted bond changed from swp7 swp8 to @swp9 swp10

clag

CLAG bond changed state from protodown to up state

Info

Clag conflicted bond changed from @old\_state\_protodownbond to
@new\_state\_protodownbond

Clag conflicted bond changed from protodown to up

configdiff

Configuration file has been modified

Info

@hostname config file @type was modified

spine03 config file /etc/frr/frr.conf was modified

configdiff

Configuration file has been created

Info

@hostname config file @type was created

leaf12 config file /etc/lldp.d/README.conf was created

evpn

A VNI was configured and moved from the down state to the up state

Info

VNI @vni state changed from down to up

VNI 36 state changed from down to up

evpn

The kernel state changed on a VNI

Info

VNI @vni kernel state changed from @old\_in\_kernel\_state to
@new\_in\_kernel\_state"

VNI 3 kernel state changed from down to up

evpn

A VNI state changed from not advertising all VNIs to advertising all
VNIs

Info

VNI @vni vni state changed from @old\_adv\_all\_vni\_state to
@new\_adv\_all\_vni\_state"

VNI 11 vni state changed from false to true

link

Link operational state changed from down to up

Info

HostName @hostname changed state from @old\_state to @new\_state
Interface:@ifname

HostName leaf04 changed state from down to up Interface:swp11

lldp

Local LLDP host has new neighbor information

Info

LLDP Session with host @hostname and @ifname modified fields
@changed\_fields

LLDP Session with host leaf02 swp6 modified fields leaf06 swp21

lldp

Local LLDP host has new peer interface name

Info

LLDP Session with host @hostname and @ifname @old\_peer\_ifname  changed
to @new\_peer\_ifname

LLDP Session with host spine01 and swp5 swp12 changed to port12

lldp

Local LLDP host has new peer hostname

Info

LLDP Session with host @hostname and @ifname  @old\_peer\_hostname
changed to @new\_peer\_hostname

LLDP Session with host leaf03 and swp2 leaf07 changed to exit01

ntp

NTP sync state changed from not in sync to in sync

Info

Sync state changed from @old\_state to @new\_state for @hostname

Sync state changed from not sync to in sync for leaf06

sensor

A temperature, fan, or power supply sensor state changed from a higher
severity to a lower severity

Info

Sensor @sensor state changed from @old\_state to @new\_state

Sensor temperature state changed from critical to low

sensor

A temperature, fan, or power supply sensor state changed from a low or
medium severity to a medium or low severity

Info

Sensor @sensor state changed from @old\_state to @new\_state

Sensor temperature state changed from medium to low

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[close.png](attachments/9012102/9012101.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-12-5
17:18:48.png](attachments/9012102/9012104.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-15
11:56:17.png](attachments/9012102/9012127.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-5
16:54:15.png](attachments/9012102/9012764.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
17:40:12.png](attachments/9012102/9013711.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
17:41:0.png](attachments/9012102/9013712.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
17:44:21.png](attachments/9012102/9013713.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
17:46:36.png](attachments/9012102/9013714.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
17:47:58.png](attachments/9012102/9013715.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
17:51:22.png](attachments/9012102/9013716.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
17:55:47.png](attachments/9012102/9013718.png) (image/png)
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
17:57:1.png](attachments/9012102/9013719.png) (image/png)
