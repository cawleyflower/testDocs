\--- title: author: keywords: ---

# Monitor Informational Events

Two event workflows, the Alarms card workflow and the Info card
workflow, provide a view into the events occurring in the network. The
Alarms card workflow tracks critical severity events, whereas the Info
card workflow tracks all warning, info, and debug severity events.

To focus on events from a single device perspective, refer to [Monitor
Switches](Monitor_Switches). To monitor alarms, refer to [Monitor Alarm
Events](Monitor_Alarm_Events).

<div id="src-9012102_MonitorInformationalEvents-InfoCardWorkflowSummary" class="section section-1">

## Info Card Workflow Summary

The Info card workflow enables users to easily view and track
informational alarms occurring anywhere in your network.

The small Info card displays:

  - total number and distribution of info events

  - total number and distribution of alarms

The medium Info card displays:

  - types of info events that occurred

  - total number and distribution of info events

  - total number and distribution of alarms

The large Alarms card displays:

  - types of info events that occurred

  - total number and distribution of info events

  - total number and distribution of alarms

  - info events by most recent

  - devices by most issues

The full screen Info card provides tabs for all
events.

</div>

<div id="src-9012102_MonitorInformationalEvents-ViewInfoEventsSummary" class="section section-1">

## View Info Events Summary

A summary of the informational events occurring in the network can be
found on the small, medium, and large Info cards. Additional details are
available as you increase the size of the card.

To view the summary with the *small* Info card, simply open the card.
This card gives you a high-level view in a condensed visual, including
the number and distribution of the info events along with the alarms
that have occurred during the same time
period.

![/images/download/attachments/9012102/image2019-2-19\_17\_40\_12.png](/images/download/attachments/9012102/image2019-2-19_17_40_12.png)

To view the summary with the *medium* Info card, simply open the card.
This card gives you the same count and distribution of info and alarm
events, but it also provides information about the sources of the info
events and enables you to view a small slice of time using the
distribution
charts.

![/images/download/attachments/9012102/image2019-2-19\_17\_41\_0.png](/images/download/attachments/9012102/image2019-2-19_17_41_0.png)

Use the chart at the top of the card to view the various sources, types,
of info events. The four or so types with the most info events are
called out separately, with all others collected together into an
*Other*
category.

![/images/download/attachments/9012102/image2019-2-19\_17\_44\_21.png](/images/download/attachments/9012102/image2019-2-19_17_44_21.png)

To view the summary with the large Info card, open the card. The left
side of the card provides the same capabilities as the medium Info
card.

</div>

<div id="src-9012102_MonitorInformationalEvents-CompareTimingofInfoandAlarmEvents" class="section section-1">

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

  - When a critical alarm is resolved, you may see a temporary increase
    in info events as a result.

  - When you get a burst of info events, you may see a follow-on
    increase in critical alarms, as the info events may have been
    warning you of something beginning to go wrong.

  - You set logging to debug, and a large number of info events of
    severity debug are seen. You would not expect to see an increase in
    critical
alarms.

</div>

<div id="src-9012102_MonitorInformationalEvents-ViewAllInfoEventsSortedbyTimeofOccurrence" class="section section-1">

## View All Info Events Sorted by Time of Occurrence

You can view all info events using the large Info card. Open the large
card and confirm the **Events By Most Recent** option is selected in the
dropdown above the table on the right. When this option is selected, all
of the info events are listed with the most recently occurring event at
the top. Scrolling down shows you the info events that have occurred at
an earlier time within the selected time period for the
card.

![/images/download/attachments/9012102/image2019-2-19\_17\_46\_36.png](/images/download/attachments/9012102/image2019-2-19_17_46_36.png)

</div>

<div id="src-9012102_MonitorInformationalEvents-ViewDeviceswiththeMostInfoEvents" class="section section-1">

## View Devices with the Most Info Events

You can filter instead for the devices that have the most info events by
selecting the **Devices by Event Count** option from the dropdown above
the
table.

![/images/download/attachments/9012102/image2019-2-19\_17\_47\_58.png](/images/download/attachments/9012102/image2019-2-19_17_47_58.png)

![/images/download/attachments/9012102/image2019-2-19\_17\_51\_22.png](/images/download/attachments/9012102/image2019-2-19_17_51_22.png)

</div>

<div id="src-9012102_MonitorInformationalEvents-ViewAllEvents" class="section section-1">

## View All Events

You can view all events in the network either by clicking the **Show All
Events** link under the table on the large Info Events card, or by
opening the full screen Info Events
card.

![/images/download/attachments/9012102/image2019-2-19\_17\_55\_47.png](/images/download/attachments/9012102/image2019-2-19_17_55_47.png)
OR
![/images/download/attachments/9012102/image2019-2-19\_17\_57\_1.png](/images/download/attachments/9012102/image2019-2-19_17_57_1.png)

To return to your workbench, click
![/images/download/attachments/9012102/close.png](/images/download/attachments/9012102/close.png)
in the top right corner of the
card.

</div>

<div id="src-9012102_MonitorInformationalEvents-InformationalEventsReference" class="section section-1">

## Informational Events Reference

The following table lists alarm messages organized by message type and
then severity, by default. Click the column header to sort the list by
that characteristic. Click
![/images/download/attachments/9012102/image2018-12-5\_17\_18\_48.png](/images/download/attachments/9012102/image2018-12-5_17_18_48.png)
in any column header to toggle the sort order between A-Z and Z-A.
Recommended actions suggest NetQ GUI cards, CLI commands and Cumulus
Linux NCLU commands for further investigation.

<div class="tablewrap">

<table style="width:100%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Type</p></th>
<th><p>Trigger</p></th>
<th><p>Severity</p></th>
<th><p>Message Format</p></th>
<th><p>Example</p></th>
<th></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
<td><p> </p></td>
</tr>
<tr class="even">
<td><p>agent</p></td>
<td><p>NetQ Agent state changed from Rotten to Fresh</p></td>
<td><p>Info</p></td>
<td><p>Agent state changed to fresh</p></td>
<td><p>Agent state changed to fresh</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>bgp</p></td>
<td><p>BGP Session state changed from Failed to Established</p></td>
<td><p>Info</p></td>
<td><p>BGP session with peer @peer @peerhost @neighbor vrf @vrf session state changed from Failed to Established</p></td>
<td><p>BGP session with peer swp5 spine02 spine03 vrf default session state changed from Failed to Established</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>bgp</p></td>
<td><p>BGP Session state changed from Established to Failed</p></td>
<td><p>Info</p></td>
<td><p>BGP session with peer @peer @neighbor vrf @vrf state changed from Established to Failed</p></td>
<td><p>BGP session with peer leaf03 leaf04 vrf mgmt state changed from Established to Failed</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>cable</p></td>
<td><p>The speed setting for a given port changed</p></td>
<td><p>Info</p></td>
<td><p>@ifname speed changed from @old_speed to @new_speed</p></td>
<td><p>swp9 speed changed from 10 to 40</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>cable</p></td>
<td><p>The transceiver status for a given port changed</p></td>
<td><p>Info</p></td>
<td><p>@ifname transreceiver changed from @old_transareceiver to @new_transareceiver</p></td>
<td><p>swp4 transreceiver changed from disabled to enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>cable</p></td>
<td><p>The vendor of a given transceiver changed</p></td>
<td><p>Info</p></td>
<td><p>@ifname vendor name changed from @old_vendor_name to @new_vendor_name</p></td>
<td><p>swp23 vendor name changed from Broadcom to Mellanox</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>cable</p></td>
<td><p>The part number of a given transceiver changed</p></td>
<td><p>Info</p></td>
<td><p>@ifname part number changed from @old_part_number to @new_part_number</p></td>
<td><p>swp7 part number changed from FP1ZZ5654002A to MSN2700-CS2F0</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>cable</p></td>
<td><p>The serial number of a given transceiver changed</p></td>
<td><p>Info</p></td>
<td><p>@ifname serial number changed from @old_serial_number to @new_serial_number</p></td>
<td><p>swp4 serial number changed from 571254X1507020 to MT1552X12041</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>cable</p></td>
<td><p>The status of forward error correction (FEC) support for a given port changed</p></td>
<td><p>Info</p></td>
<td><p>@ifname supported fec changed from @old_supported_fec to @new_supported_fec</p></td>
<td><p>swp12 supported fec changed from supported to unsupported</p>
<p>swp12 supported fec changed from unsupported to supported</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>cable</p></td>
<td><p>The advertised support for FEC for a given port changed</p></td>
<td><p>Info</p></td>
<td><p>@ifname supported fec changed from @old_advertised_fec to @new_advertised_fec</p></td>
<td><p>swp24 supported FEC changed from advertized to not advertized</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>cable</p></td>
<td><p>The FEC status for a given port changed</p></td>
<td><p>Info</p></td>
<td><p>@ifname fec changed from @old_fec to @new_fec</p></td>
<td><p>swp15 fec changed from disabled to enabled</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>clag</p></td>
<td><p>CLAG remote peer state changed from down to up</p></td>
<td><p>Info</p></td>
<td><p>Peer state changed to up</p></td>
<td><p>Peer state changed to up</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>clag</p></td>
<td><p>Local CLAG host state changed from down to up</p></td>
<td><p>Info</p></td>
<td><p>Clag state changed from down to up</p></td>
<td><p>Clag state changed from down to up</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>clag</p></td>
<td><p>CLAG bond in Conflicted state was updated with new bonds</p></td>
<td><p>Info</p></td>
<td><p>Clag conflicted bond changed from @old_conflicted_bonds to @new_conflicted_bonds</p></td>
<td><p>Clag conflicted bond changed from swp7 swp8 to @swp9 swp10</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>clag</p></td>
<td><p>CLAG bond changed state from protodown to up state</p></td>
<td><p>Info</p></td>
<td><p>Clag conflicted bond changed from @old_state_protodownbond to @new_state_protodownbond</p></td>
<td><p>Clag conflicted bond changed from protodown to up</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>configdiff</p></td>
<td><p>Configuration file has been modified</p></td>
<td><p>Info</p></td>
<td><p>@hostname config file @type was modified</p></td>
<td><p>spine03 config file /etc/frr/frr.conf was modified</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>configdiff</p></td>
<td><p>Configuration file has been created</p></td>
<td><p>Info</p></td>
<td><p>@hostname config file @type was created</p></td>
<td><p>leaf12 config file /etc/lldp.d/README.conf was created</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>evpn</p></td>
<td><p>A VNI was configured and moved from the down state to the up state</p></td>
<td><p>Info</p></td>
<td><p>VNI @vni state changed from down to up</p></td>
<td><p>VNI 36 state changed from down to up</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>evpn</p></td>
<td><p>The kernel state changed on a VNI</p></td>
<td><p>Info</p></td>
<td><p>VNI @vni kernel state changed from @old_in_kernel_state to @new_in_kernel_state"</p></td>
<td><p>VNI 3 kernel state changed from down to up</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>evpn</p></td>
<td><p>A VNI state changed from not advertising all VNIs to advertising all VNIs</p></td>
<td><p>Info</p></td>
<td><p>VNI @vni vni state changed from @old_adv_all_vni_state to @new_adv_all_vni_state"</p></td>
<td><p>VNI 11 vni state changed from false to true</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>link</p></td>
<td><p>Link operational state changed from down to up</p></td>
<td><p>Info</p></td>
<td><p>HostName @hostname changed state from @old_state to @new_state Interface:@ifname</p></td>
<td><p>HostName leaf04 changed state from down to up Interface:swp11</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>lldp</p></td>
<td><p>Local LLDP host has new neighbor information</p></td>
<td><p>Info</p></td>
<td><p>LLDP Session with host @hostname and @ifname modified fields @changed_fields</p></td>
<td><p>LLDP Session with host leaf02 swp6 modified fields leaf06 swp21</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>lldp</p></td>
<td><p>Local LLDP host has new peer interface name</p></td>
<td><p>Info</p></td>
<td><p>LLDP Session with host @hostname and @ifname @old_peer_ifname changed to @new_peer_ifname</p></td>
<td><p>LLDP Session with host spine01 and swp5 swp12 changed to port12</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>lldp</p></td>
<td><p>Local LLDP host has new peer hostname</p></td>
<td><p>Info</p></td>
<td><p>LLDP Session with host @hostname and @ifname @old_peer_hostname changed to @new_peer_hostname</p></td>
<td><p>LLDP Session with host leaf03 and swp2 leaf07 changed to exit01</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>ntp</p></td>
<td><p>NTP sync state changed from not in sync to in sync</p></td>
<td><p>Info</p></td>
<td><p>Sync state changed from @old_state to @new_state for @hostname</p></td>
<td><p>Sync state changed from not sync to in sync for leaf06</p></td>
<td></td>
</tr>
<tr class="odd">
<td><p>sensor</p></td>
<td><p>A temperature, fan, or power supply sensor state changed from a higher severity to a lower severity</p></td>
<td><p>Info</p></td>
<td><p>Sensor @sensor state changed from @old_state to @new_state</p></td>
<td><p>Sensor temperature state changed from critical to low</p></td>
<td></td>
</tr>
<tr class="even">
<td><p>sensor</p></td>
<td><p>A temperature, fan, or power supply sensor state changed from a low or medium severity to a medium or low severity</p></td>
<td><p>Info</p></td>
<td><p>Sensor @sensor state changed from @old_state to @new_state</p></td>
<td><p>Sensor temperature state changed from medium to low</p></td>
<td></td>
</tr>
</tbody>
</table>

</div>

</div>
