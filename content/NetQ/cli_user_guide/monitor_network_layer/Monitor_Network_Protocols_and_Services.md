# Monitor Network Protocols and Services

The Network Services card workflows provide a network-wide view into the
routing, link, and virtual network protocols installed in your network.
In this release, you can monitor the network-wide behavior or a single
session of the BGP, EVPN, MLAG, and LLDP services. Each protocol has its
own card workflow containing:

-   a small card with an overall status, 
-   a medium card displaying key attributes of the protocol, 
-   a large card with detailed performance statistics, some with
    additional tabs, and 
-   full screen cards displaying attributes of all associated switches,
    sessions, alarms or other relevant data.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Monitor the BGP Service (All
    Sessions)](#MonitorNetworkProtocolsandServices-MonitortheBGPService(AllSessions))
    -   [BGP Service Card Workflow
        Summary](#MonitorNetworkProtocolsandServices-BGPServiceCardWorkflowSummary)
    -   [View Service Status
        Summary](#MonitorNetworkProtocolsandServices-ViewServiceStatusSummary)
    -   [View the Distribution of Sessions and
        Alarms](#MonitorNetworkProtocolsandServices-ViewtheDistributionofSessionsandAlarms)
    -   [View Switches (devices?) with the Most BGP
        Sessions](#MonitorNetworkProtocolsandServices-ViewSwitches(devices?)withtheMostBGPSessions)
    -   [View Switches (Devices?) with the Most BGP-related
        Alarms](#MonitorNetworkProtocolsandServices-DevsMostAlarmsBGPViewSwitches(Devices?)withtheMostBGP-relatedAlarms)
    -   [View BGP Sessions with the Most
        Alarms](#MonitorNetworkProtocolsandServices-ViewBGPSessionswiththeMostAlarms)
    -   [View All BGP
        Alarms](#MonitorNetworkProtocolsandServices-ViewAllBGPAlarms)
    -   [View Details for All Switches Running
        BGP](#MonitorNetworkProtocolsandServices-ViewDetailsforAllSwitchesRunningBGP)
    -   [View Details for All BGP
        Sessions](#MonitorNetworkProtocolsandServices-ViewDetailsforAllBGPSessions)
-   [Monitor the EVPN Service (All
    Sessions)](#MonitorNetworkProtocolsandServices-MonitortheEVPNService(AllSessions))
    -   [EVPN Service Card Workflow
        Summary](#MonitorNetworkProtocolsandServices-EVPNServiceCardWorkflowSummary)
    -   [View Service Status
        Summary](#MonitorNetworkProtocolsandServices-ViewServiceStatusSummary.1)
    -   [View the Distribution of Sessions and
        Alarms](#MonitorNetworkProtocolsandServices-ViewtheDistributionofSessionsandAlarms.1)
    -   [View the Distribution of Layer 2 and Layer 3
        VNIs ](#MonitorNetworkProtocolsandServices-ViewtheDistributionofLayer2andLayer3VNIs)
    -   [View Switches (devices?) with the Most EVPN
        Sessions](#MonitorNetworkProtocolsandServices-ViewSwitches(devices?)withtheMostEVPNSessions)
    -   [View Switches (devices?) with the Most Layer 2 EVPN
        (Sessions?)](#MonitorNetworkProtocolsandServices-ViewSwitches(devices?)withtheMostLayer2EVPN(Sessions?))
    -   [View Switches (devices?) with the Most Layer 3 EVPN
        (Sessions?)](#MonitorNetworkProtocolsandServices-ViewSwitches(devices?)withtheMostLayer3EVPN(Sessions?))
    -   [View Switches (Devices?) with the Most EVPN-related
        Alarms](#MonitorNetworkProtocolsandServices-DevMostAlarmsEVPNViewSwitches(Devices?)withtheMostEVPN-relatedAlarms)
    -   [View EVPN Sessions with the Most
        Alarms](#MonitorNetworkProtocolsandServices-ViewEVPNSessionswiththeMostAlarms)
    -   [View All EVPN
        Alarms](#MonitorNetworkProtocolsandServices-ViewAllEVPNAlarms)
    -   [View Details for All Switches (Devices?)
        Running EVPN](#MonitorNetworkProtocolsandServices-ViewDetailsforAllSwitches(Devices?)RunningEVPN)
    -   [View Details for All EVPN
        Sessions](#MonitorNetworkProtocolsandServices-ViewDetailsforAllEVPNSessions)
-   [Monitor the MLAG Service (All
    Sessions)](#MonitorNetworkProtocolsandServices-MonitortheMLAGService(AllSessions))
    -   [CLAG Service Card Workflow
        Summary](#MonitorNetworkProtocolsandServices-CLAGServiceCardWorkflowSummary)
    -   [View Service Status
        Summary](#MonitorNetworkProtocolsandServices-ViewServiceStatusSummary.2)
    -   [View the Distribution of Node Peering State (not on card, but
        was expecting
        this...)](#MonitorNetworkProtocolsandServices-ViewtheDistributionofNodePeeringState(notoncard,butwasexpectingthis...))
    -   [View Switches with Single-Connected Bonds (not on card, but was
        expecting
        this...)](#MonitorNetworkProtocolsandServices-ViewSwitcheswithSingle-ConnectedBonds(notoncard,butwasexpectingthis...))
    -   [View Switches with Inactive Backup IP Addresses (not on card,
        but was expecting
        this...)](#MonitorNetworkProtocolsandServices-ViewSwitcheswithInactiveBackupIPAddresses(notoncard,butwasexpectingthis...))
    -   [View Switches with the Most CLAG-related
        Alarms](#MonitorNetworkProtocolsandServices-ViewSwitcheswiththeMostCLAG-relatedAlarms)
    -   [View CLAG Sessions with the Most
        Alarms](#MonitorNetworkProtocolsandServices-ViewCLAGSessionswiththeMostAlarms)
    -   [View All CLAG
        Alarms](#MonitorNetworkProtocolsandServices-ViewAllCLAGAlarms)
    -   [View Detailed Information About All Switches
        Running CLAG](#MonitorNetworkProtocolsandServices-ViewDetailedInformationAboutAllSwitchesRunningCLAG)
-   [Monitor the LLDP Service (All
    Sessions)](#MonitorNetworkProtocolsandServices-MonitortheLLDPService(AllSessions))
    -   [LLDP Service Card Workflow
        Summary](#MonitorNetworkProtocolsandServices-LLDPServiceCardWorkflowSummary)
    -   [View Service Status
        Summary](#MonitorNetworkProtocolsandServices-ViewServiceStatusSummary.3)
    -   [View the Distribution of Nodes and
        Alarms](#MonitorNetworkProtocolsandServices-ViewtheDistributionofNodesandAlarms)
    -   [View Switches with the Most Neighbors (this is what i am
        expecting, but not in
        wires)](#MonitorNetworkProtocolsandServices-ViewSwitcheswiththeMostNeighbors(thisiswhatiamexpecting,butnotinwires))
    -   [View Switches with the Least Neighbors (this is what i am
        expecting, but not in
        wires)](#MonitorNetworkProtocolsandServices-ViewSwitcheswiththeLeastNeighbors(thisiswhatiamexpecting,butnotinwires))
    -   [View Switches with the Most LLDP-related
        Alarms](#MonitorNetworkProtocolsandServices-ViewSwitcheswiththeMostLLDP-relatedAlarms)
    -   [View All LLDP
        Alarms](#MonitorNetworkProtocolsandServices-ViewAllLLDPAlarms)
    -   [View Detailed Information About All Switches Running
        BGP](#MonitorNetworkProtocolsandServices-ViewDetailedInformationAboutAllSwitchesRunningBGP)
    -   [View Detailed Information About All LLDP
        Sessions/links?/neighbors?](#MonitorNetworkProtocolsandServices-ViewDetailedInformationAboutAllLLDPSessions/links?/neighbors?)

## Monitor the BGP Service (All Sessions)

With NetQ, you can monitor the number of nodes running the BGP service,
view switches with the most established and unestablished BGP sessions,
and view alarms triggered by the BGP service. For an overview and how to
configure BGP to run in your data center network, refer to [Border
Gateway Protocol -
BGP](https://docs.cumulusnetworks.com/display/DOCS/Border+Gateway+Protocol+-+BGP).

### BGP Service Card Workflow Summary

The small BGP Service card displays:

-   total number of devices with BGP service enabled
-   total number of BGP-related alarms
-   distribution of those alarms

![](attachments/8367112/9011947.png)

The medium BGP Service card displays:

-   total number and distribution of devices with BGP service enabled
-   total number and distribution of BGP-related alarms
-   total number and distribution of devices with unestablished
    sessions 

  

The large BGP service card contains two tabs.

-   BGP Summary which displays:
    -   total number and distribution of devices with the BGP service
        enabled
    -   total number of BGP-related alarms
    -   total number and distribution of devices with unestablished BGP
        sessions
    -   devices with the most BGP sessions
    -   devices with the most unestablished sessions
-   BGP Alarms which displays:
    -   total number and distribution of alarms
    -   devices with the most alarms
    -   sessions with the most alarms
    -   alarms by date

  

The full screen BGP Service card provides tabs for all switches, all
sessions, all alarms, all large card tabs, and access to the topology
view.

### View Service Status Summary

A summary of the BGP service is available from the Network Services card
workflow, including the number of nodes running the service, the number
of BGP-related alarms, and a distribution of those alarms.

To view the summary, open the small BGP Service card.

For more detail, select a different size BGP Service card.

### View the Distribution of Sessions and Alarms

It is useful to know the number of network nodes running the BGP
protocol over a period of time, as it gives you insight into the amount
of traffic associated with and breadth of use of the protocol. It is
also useful to compare the number of nodes running BGP with
unestablished sessions with the alarms present at the same time to
determine if there is any correlation between the issues and the ability
to establish a BGP session.

To view these distributions, open the medium BGP Service card.

If a visual correlation is apparent, you can dig a little deeper with
the large BGP Service card tabs.

### View Switches (devices?) with the Most BGP Sessions

You can view the load from BGP on your switches and hosts using the
large Network Services card. This data enables you to see which switches
are handling the most BGP traffic currently, validate that is what is
expected based on your network design, and compare that with data from
an earlier time to look for any differences.

To view switches and hosts with the most BGP sessions:

1.  Open the large BGP Service card.
2.  Select **SWITCHES(Devices?) WITH MOST BGP SESSIONS** from the
    dropdown above the table.  
    The table content is sorted by this characteristic, listing nodes
    running the most BGP sessions at the top. Scroll down to view those
    with the fewest sessions.

To compare this data with the same data at a previous time:

1.  Open another large BGP Service card.
2.  Move the new card next to the original card if needed.
3.  Change the time period for the data on the new card by hovering over
    the card and
    clicking ![](attachments/8367112/9011969.png){width="18"}.
4.  Select the time period that you want to compare with the original
    time.  
    You can now see whether there are significant differences between
    this time and the original time. 

If the changes are unexpected, you can investigate further by looking at
another time frame, determining if more nodes are now running BGP than
previously, looking for changes in the topology, and so forth.  

View Switches (Devices?) with the Most Unestablished BGP Sessions

You can identify switches that are experiencing difficulties
establishing BGP sessions; both currently and in the past.

To view switches with the most unestablished BGP sessions:

1.  Open the large BGP Service card.
2.  Select **SWITCHES (Devices?) WITH MOST BGP SESSIONS NOT IN
    ESTABLISHED STATE** from the dropdown above the table.  
    The table content is sorted by this characteristic, listing nodes
    with the most unestablished BGP sessions at the top. Scroll down to
    view those with the fewest unestablished sessions.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Nodes Not Established chart to focus on the
    switches the most unestablished sessions during that smaller time
    slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of sessions?)
-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most unestablished
    sessions, you might want to look more carefully at those switches
    using the Switches card workflow to determine probable causes
    (insufficient memory, cpu, misconfig???). Refer to link to monitor
    switches.

### View Switches (Devices?) with the Most BGP-related Alarms

Switches experiencing a large number of BGP alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the switches sorted by the number of BGP alarms and then use
the Switches card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view switches with the most BGP alarms:

1.  Open the large BGP Service card.
2.  Hover over the header and
    click ![](attachments/8367112/9011965.png){width="16"}.
3.  Select **SWITCHES BY MOST ALARMS** from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing nodes
    with the most BGP alarms at the top. Scroll down to view those with
    the fewest alarms.

Where to go next depends on what data you see, but a few options
include:

-   Hover over the Total Alarms chart to focus on the switches
    exhibiting alarms during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most alarms, you
    might want to look more carefully at those switches using the
    Switches card workflow.
-   Click **Show All Switches** to investigate all switches with BGP
    alarms in the full screen card.

### View BGP Sessions with the Most Alarms

BGP sessions experiencing a large number of alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the sessions sorted by the number of BGP alarms and then using
the BGP Session card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view sessions with the most BGP alarms:

1.  Open the large BGP Service card.
2.  Hover over the header and click
    ![](attachments/8367112/9011965.png){width="16"}.
3.  Select **SESSIONS BY NUMBER OF ALARMS** from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing sessions
    with the most BGP alarms at the top. Scroll down to view those with
    the fewest alarms.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Alarms chart to focus on the sessions
    exhibiting alarms during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   View switches with the most alarms. Refer to above.

### View All BGP Alarms

The BGP Network Services card workflow enables you to view all of the
BGP alarms in the designated time period. Two views are available, one
through the large alarms card and one through the full screen card.

To view all BGP alarms with the *large* card:

1.  Open the large BGP Service card.
2.  Hover over the header and click
    ![](attachments/8367112/9011965.png){width="16"}. 
3.  Select **ALARMS BY DATE** from the dropdown above the table.  
    The table content is sorted by this characteristic, listing the most
    recent BGP alarms at the top. Scroll down to view those with the
    oldest alarms.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Alarms chart to focus on the alarms occurring
    during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   Open the Alarms card workflow and filter by BGP to view more details
    about the latest alarms. Refer to all events topic.

To view all BGP alarms with *full screen* card:

1.  Open the full screen BGP Service card.
2.  Click **All BGP ALARMS** tab in the navigation panel.
3.  Sort alarm data by (name=date/timestamp?) column to view alarms in
    most recent to least recent.

Where to go next depends on what data you see, but a few options
include:

-   Sort or filter alarm data further. Refer to gui overview section.
-   Open one of the other full screen tabs in this flow to focus on
    switches or sessions.
-   View the alarms in the topology workflow, by clicking **Topology**
    tab in the navigation panel.
-   Export the data for use in another analytics tool, by clicking
    **Export** and providing a name for the data file.

### View Details for All Switches Running BGP

You can view all stored attributes of all switches running BGP in your
network in the full screen card.

To view all switch details, open the full screen BGP Service card and
click the **All Switches** tab.

To return to your workbench, click
![](attachments/8367112/9011964.png){width="16"} next to the title of
the full-screen card. 

### View Details for All BGP Sessions

You can view all stored attributes of all BGP sessions in your network
in the full-screen card.

To view all session details, open the full screen BGP Service card and
click the **All Sessions** tab.

To return to your workbench,
click ![](attachments/8367112/9011964.png){width="16"} next to the title
of the full screen card.

## Monitor the EVPN Service (All Sessions)

With NetQ, you can monitor the number of nodes running the EVPN
service, view switches with the registration daemons (RDs) and service
node daemons (SNDs), total number of VNIs, and alarms triggered by the
EVPN service. For an overview and how to configure EVPN in your data
center network, refer to [Ethernet Virtual Private Network -
EVPN](https://docs.cumulusnetworks.com/display/DOCS/Ethernet+Virtual+Private+Network+-+EVPN).

### EVPN Service Card Workflow Summary

The small EVPN Service card displays:

-   total number of devices with EVPN service enabled
-   total number of EVPN-related alarms
-   distribution of those alarms

&lt;insert image&gt;

The medium EVPN Service card displays the total number and distribution
of:

-   devices with EVPN service enabled
-   EVPN-related alarms
-   sessions (established or all?)
-   layer 3 VNIs (virtual network instances)
-   another chart that i can't see (layer 2 vnis?)

The large EVPN service card contains two tabs.

-   Summary which displays:
    -   total number and distribution of devices with EVPN service
        enabled
    -   total number and distribution of devices with EVPN sessions
    -   total number and distribution of layer 3 VNIs
    -   another chart that i can't see
    -   devices with the most EVPN sessions
    -   devices with the most layer 2 EVPN sessions
    -   devices with the most layer 3 EVPN sessions
-   EVPN Alarms which displays:
    -   total number and distribution of alarms
    -   devices with the most alarms
    -   sessions with the most alarms
    -   alarms by date

The full screen EVPN Service card provides tabs for all switches, all
sessions, all alarms, all large card tabs, and access to the topology
view. 

### View Service Status Summary

A summary of the EVPN service is available from the Network Services
card workflow, including the number of nodes running the service, the
number of EVPN-related alarms, and a distribution of those alarms.

To view the summary, open the small EVPN Network Service card.

For more detail, select a different size EVPN Network Service card.

### View the Distribution of Sessions and Alarms

It is useful to know the number of network nodes running the EVPN
protocol over a period of time, as it gives you insight into the amount
of traffic associated with and breadth of use of the protocol. It is
also useful to compare the number of nodes running EVPN with the alarms
present at the same time to determine if there is any correlation
between the issues and the ability to establish an EVPN session.

To view these distributions, open the medium EVPN Service card.

If a visual correlation is apparent, you can dig a little deeper with
the large EVPN Service card tabs.

### View the Distribution of Layer 2 and Layer 3 VNIs 

It is useful to know the number of layer 2 and layer 3 VNIs, as it gives
you insight into xxx.

To view these distributions, open the medium EVPN Service card and
scroll down. 

If a visual correlation is apparent, you can dig a little deeper with
the large EVPN Service card tabs.

### View Switches (devices?) with the Most EVPN Sessions

You can view the load from EVPN on your switches and hosts using the
large EVPN Service card. This data enables you to see which switches are
handling the most EVPN traffic currently, validate that is what is
expected based on your network design, and compare that with data from
an earlier time to look for any differences.

To view switches and hosts with the most EVPN sessions:

1.  Open the large EVPN Service card.
2.  Select **SWITCHES(Devices?) WITH MOST EVPN SESSIONS** from the
    dropdown above the table.  
    The table content is sorted by this characteristic, listing nodes
    running the most EVPN sessions at the top. Scroll down to view those
    with the fewest sessions.

To compare this data with the same data at a previous time: 

1.  Open another large EVPN Service card.
2.  Move the new card next to the original card if needed.
3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](attachments/8367112/9011969.png){width="18"}.
4.  Select the time period that you want to compare with the current
    time.  
    You can now see whether there are significant differences between
    this time and now. 

If the changes are unexpected, you can investigate further by looking at
another time frame, determining if more nodes are now running EVPN than
previously, looking for changes in the topology, and so forth.  

&lt;insert images?&gt;

### View Switches (devices?) with the Most Layer 2 EVPN (Sessions?)

You can view the number layer 2 EVPN (sessions?) on your switches and
hosts using the large EVPN Service card. This data enables you to see
which switches are handling the most EVPN traffic currently, validate
that is what is expected based on your network design, and compare that
with data from an earlier time to look for any differences.

To view switches and hosts with the most layer 2 EVPN sessions:

1.  Open the large EVPN Service card.
2.  Select **SWITCHES(Devices?) WITH MOST L2 EVPN** from the dropdown
    above the table.  
    The table content is sorted by this characteristic, listing nodes
    running the most  layer 2 EVPN sessions at the top. Scroll down to
    view those with the fewest sessions.

To compare this data with the same data at a previous time:

1.  Open another large EVPN Service card.
2.  Move the new card next to the original card if needed.
3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](attachments/8367112/9011969.png){width="18"}.
4.  Select the time period that you want to compare with the current
    time.  
    You can now see whether there are significant differences between
    this time and now. 

If the changes are unexpected, you can investigate further by looking at
another time frame, determining if more nodes are now running EVPN than
previously, looking for changes in the topology, and so forth.  

&lt;insert images?&gt;

### View Switches (devices?) with the Most Layer 3 EVPN (Sessions?)

You can view the number layer 3 EVPN (sessions?) on your switches and
hosts using the large EVPN Service card. This data enables you
to see which switches are handling the most EVPN traffic currently,
validate that is what is expected based on your network design, and
compare that with data from an earlier time to look for any differences.

To view switches and hosts with the most layer 3 EVPN sessions:

1.  Open the large EVPN Service card.
2.  Select **SWITCHES(Devices?) WITH MOST L3 EVPN** from the dropdown
    above the table.  
    The table content is sorted by this characteristic, listing nodes
    running the most  layer 3 EVPN sessions at the top. Scroll down to
    view those with the fewest sessions.

To compare this data with the same data at a previous time:

1.  Open another large EVPN Service card.
2.  Move the new card next to the original card if needed.
3.  Change the time period for the data on the new card by hovering over
    the card and clicking
    ![](attachments/8367112/9011969.png){width="18"}.
4.  Select the time period that you want to compare with the current
    time.  
    You can now see whether there are significant differences between
    this time and now. 

If the changes are unexpected, you can investigate further by looking at
another time frame, determining if more nodes are now running EVPN than
previously, looking for changes in the topology, and so forth.  

&lt;insert images?&gt;

### View Switches (Devices?) with the Most EVPN-related Alarms

Switches experiencing a large number of EVPN alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the switches sorted by the number of BGP alarms and then use
the Switches card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view switches with the most EVPN alarms:

1.  Open the large EVPN Service card.
2.  Hover over the header and
    click ![](attachments/8367112/9011965.png){width="16"}.
3.  Select **SWITCHES WITH MOST ALARMS** from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing nodes
    with the most EVPN alarms at the top. Scroll down to view those with
    the fewest alarms.

Where to go next depends on what data you see, but a few options
include:

-   Hover over the Total Alarms chart to focus on the switches
    exhibiting alarms during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most alarms, you
    might want to look more carefully at those switches using the
    Switches card workflow.
-   Click **Show All Sessions (Switches/Devices?)** to investigate all
    switches with EVPN alarms in the full screen card.

### View EVPN Sessions with the Most Alarms

EVPN sessions experiencing a large number of alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the sessions sorted by the number of EVPN alarms and then using
the EVPN Service card workflow or the Alarms card workflow to gather
more information about possible causes for the alarms.

To view sessions with the most EVPN alarms:

1.  Open the large EVPN Service card.
2.  Hover over the header and click
    ![](attachments/8367112/9011965.png){width="16"}.
3.  Select **SESSIONS WITH MOST ALARMS** from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing sessions
    with the most EVPN alarms at the top. Scroll down to view those with
    the fewest alarms.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Alarms chart to focus on the sessions
    exhibiting alarms during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   View switches with the most alarms. Refer to above.

### View All EVPN Alarms

The EVPN Service card workflow enables you to view all of the EVPN
alarms in the designated time period. Two views are available, one
through the large alarms card and one through the full screen card.

To view all EVPN alarms with the *large* card:

1.  Open the large EVPN Service card.
2.  Hover over the header and click
    ![](attachments/8367112/9011965.png){width="16"}.
3.  Select **ALARMS BY DATE** from the dropdown above the table.  
    The table content is sorted by this characteristic, listing the most
    recent EVPN alarms at the top. Scroll down to view those with the
    oldest alarms.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Alarms chart to focus on the alarms occurring
    during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   Open the Alarms card workflow and filter by BGP to view more details
    about the latest alarms. Refer to all events topic.

To view all EVPN alarms with *full screen* card:

1.  Open the full screen EVPN Service card.
2.  Click **All ALARMS** tab in the navigation panel.
3.  Sort alarm data by (name=date/timestamp?) column to view alarms in
    most recent to least recent.

Where to go next depends on what data you see, but a few options
include:

-   Sort or filter alarm data further. Refer to gui overview section.
-   Open one of the other full screen tabs in this flow to focus on
    switches or sessions.
-   View the alarms in the topology workflow, by
    clicking **Topology** tab in the navigation panel.
-   Export the data for use in another analytics tool, by
    clicking **Export** and providing a name for the data file.

### View Details for All Switches (Devices?) Running EVPN

You can view all stored attributes of all switches running EVPN in your
network in the full screen card.

To view all switch details, open the full screen EVPN Service card, and
click the **All Switches** tab.

To return to your workbench,
click ![](attachments/8367112/9011964.png){width="16"} next to the title
of the full screen card. 

### View Details for All EVPN Sessions

You can view all stored attributes of all EVPN sessions in your network
in the full screen card.

To view all session details, open the full screen EVPN Service card, and
click the **All Sessions** tab.

To return to your workbench,
click ![](attachments/8367112/9011964.png){width="16"} next to the title
of the full screen card. 

## Monitor the MLAG Service (All Sessions)

With NetQ, you can monitor the number of nodes running the MLAG service,
view switches with the most peers alive and not alive, and view alarms
triggered by the MLAG service. For an overview and how to configure MLAG
in your data center network, refer to [Multi-Chassis Link Aggregation -
MLAG](https://docs.cumulusnetworks.com/display/DOCS/Multi-Chassis+Link+Aggregation+-+MLAG).

MLAG or CLAG?

The Cumulus Linux implementation of MLAG is referred to by other vendors
as CLAG, MC-LAG or VPC. The Cumulus NetQ UI still uses the CLAG
terminology in this release.

### CLAG Service Card Workflow Summary

The small CLAG Service card displays:

-   total number of devices with CLAG service enabled
-   total number of CLAG-related alarms
-   distribution of those alarms

&lt;insert image&gt;

The medium CLAG Service card displays:

-   total number and distribution of devices with CLAG service enabled
-   total number and distribution of CLAG-related alarms
-   total number and distribution of CLAG sessions
-   total number of CLAG sessions with single-connected bonds
-   total number of CLAG sessions with inactive backup IP addresses
    defined

The large CLAG service card contains two tabs:

-   CLAG Summary which displays:
    -   total number and distribution of devices with CLAG service
        enabled
    -   total number and distribution of CLAG sessions
    -   total number of CLAG sessions with single-connected bonds
    -   total number of CLAG sessions with dual-connected bonds
    -   total number of CLAG sessions with inactive backup IP addresses
        defined
    -   devices with the most CLAG sessions
    -   devices with the most unestablished CLAG sessions
-   CLAG Alarms which displays:
    -   total number and distribution of alarms
    -   devices with the most alarms
    -   sessions with the most alarms
    -   alarms by date

The full screen CLAG Service card provides tabs for all switches, all
sessions, all alarms, all large card tabs, and access to the topology
view.

### View Service Status Summary

A summary of the CLAG service is available from the CLAG Service card
workflow, including the number of nodes running the service, the number
of CLAG-related alarms, and a distribution of those alarms.

To view the summary, open the small CLAG Service card.

For more detail, select a different size CLAG Service card.

### View the Distribution of Node Peering State (not on card, but was expecting this...)

It is useful to know the number of network nodes running the CLAG
protocol over a period of time, as it gives you insight into the amount
of traffic associated with and breadth of use of the protocol. It is
also useful to compare the number of nodes running CLAG with
single-connected bonds, with the alarms present at the same time to
determine if there is any correlation between the issues and the ability
to establish the CLAG sessions or bonds. 

To view the distribution, open the medium CLAG Service card.

If a visual correlation is apparent, you can dig a little deeper with
the large Network Services cards.

### View Switches with Single-Connected Bonds (not on card, but was expecting this...)

Switches with single-connected bonds may indicate an incorrect
configuration. (some singles are ok? which are not?)

To view switches with single-connected bonds, open the large CLAG
Service card, and then select **SWITCHES WITH SINGLE-CONNECTED
BONDS** from the dropdown above the table.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Nodes Not Established chart to focus on the
    switches with single-connected bonds during that smaller time
    slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of sessions?)
-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the single-connected
    bonds, you might want to look more carefully at selected switches
    using the Switches card workflow. back and forth? when lost second
    bond?

### View Switches with Inactive Backup IP Addresses (not on card, but was expecting this...)

You can identify switches that do not have an active backup IP address
for use when the primary address becomes unavailable.

To view switches without active backup IP addresses, open the large CLAG
Service card, and then select **SWITCHES WITH INACTIVE BACKUP IP** from
the dropdown above the table.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Nodes Not Established chart to focus on the
    switches the without active backup IP addresses during that smaller
    time slice. This might help identify when a backup IP was configured
    or lost.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of sessions?)
-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating an inactive backup IP
    address, you might want to look more carefully at those switches
    using the Switches card workflow.

### View Switches with the Most CLAG-related Alarms

Switches experiencing a large number of CLAG alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the switches sorted by the number of CLAG alarms and then use
the Switches card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view switches with most CLAG alarms:

1.  Open the large CLAG Service card.
2.  Hover over the header and click .
3.  Select SWITCHES WITH MOST ALARMS from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing nodes
    with the most CLAG alarms at the top. Scroll down to view those with
    the fewest alarms.

Where to go next depends on what data you see, but a few options
include:

-   Hover over the Total Alarms chart to focus on the switches
    exhibiting alarms during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most alarms, you
    might want to look more carefully at those switches using the
    Switches card workflow.
-   Click Show All Switches to investigate all switches with CLAG alarms
    in the full screen card.

### View CLAG Sessions with the Most Alarms

CLAG sessions experiencing a large number of alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the sessions sorted by the number of CLAG alarms and then using
the CLAG Session card workflow or the Alarms card workflow to gather
more information about possible causes for the alarms.

To view sessions with most CLAG alarms:

1.  Open the large CLAG Service card.
2.  Hover over the header and click .
3.  Select SESSIONS WITH MOST ALARMS from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing sessions
    with the most CLAG alarms at the top. Scroll down to view those with
    the fewest alarms.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Alarms chart to focus on the sessions
    exhibiting alarms during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   View switches with the most alarms. (Refer to previous section.)

### View All CLAG Alarms

The CLAG Service card workflow enables you to view all of the CLAG
alarms in the designated time period. Two views are available, one
through the alarms tab of the large card and one through the full screen
card.

To view all CLAG alarms in the large card:

1.  Open the large CLAG Service card.
2.  Hover over the header and click .
3.  Select ALARMS BY DATE from the dropdown above the table.  
    The table content is sorted by this characteristic, listing the most
    recent CLAG alarms at the top. Scroll down to view those with the
    oldest alarms.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Alarms chart to focus on the alarms occurring
    during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   Open the Alarms card workflow and filter by CLAG to view more
    details about the latest alarms.

To view all CLAG alarms in the full screen card:

1.  Open the full screen CLAG Service card.
2.  Click All CLAG ALARMS tab.Sort alarm data by (name=date/timestamp?)
    column to view alarms in most recent to least recent order.

Where to go next depends on what data you see, but a few options
include:

-   Sort or filter alarm data further.
-   Open the All Switches or All Sessions tabs to look more closely at
    the alarms from the switch or session perspective.
-   View the alarms in the topology workflow, by clicking the Topology
    tab.

### View Detailed Information About All Switches Running CLAG

You can view all stored attributes of all switches running CLAG in your
network in the full-screen card.

To view all switch details, open the full screen CLAG Service card, and
click the **All Switches** tab.

To return to your workbench, click  next to the title of the full screen
card. 

## Monitor the LLDP Service (All Sessions)

With NetQ, you can monitor the number of nodes running the LLDP service,
view nodes with the most LLDP neighbor nodes, those nodes with the least
neighbor nodes, and view alarms triggered by the LLDP service. For an
overview and how to configure LLDP in your data center network, refer
to [Link Layer Discovery
Protocol](https://docs.cumulusnetworks.com/display/DOCS/Link+Layer+Discovery+Protocol).

### LLDP Service Card Workflow Summary

The small LLDP Service card displays:

-   total number of devices with LLDP service enabled
-   total number of LLDP-related alarms
-   distribution of those alarms

&lt;insert image&gt;

The medium LLDP Service card displays:

-   total number and distribution of devices with LLDP service enabled
-   total number and distribution of LLDP-related alarms
-   total number and distribution of LLDP sessions
-   total number of LLDP sessions with no neighbors
-   total number of LLDP sessions with ??? (can't see in wireframes)

The large LLDP service card contains two tabs:

-   LLDP Summary which displays:
    -   total number and distribution of devices with LLDP service
        enabled
    -   total number and distribution of LLDP sessions
    -   total number of LLDP sessions with no neighbors
    -   total number of LLDP sessions with ??? (can't see in wireframes)
    -   devices with the most LLDP sessions
    -   devices with the most unestablished LLDP sessions
-   LLDP Alarms which displays:
    -   total number and distribution of alarms
    -   devices with the most alarms
    -   sessions with the most alarms
    -   alarms by date

The full screen LLDP Service card provides tabs for all switches, all
sessions, all alarms, all large card tabs, and access to the topology
view.

### View Service Status Summary

A summary of the LLDP service is available from the Network Services
card workflow, including the number of nodes running the service, the
number of LLDP-related alarms, and a distribution of those alarms.

To view the summary, open the small LLDP Service card.

For more detail, select a different size LLDP Network Services card.

### View the Distribution of Nodes and Alarms

It is useful to know the number of network nodes running the LLDP
protocol over a period of time, as it gives you insight into nodes that
might be misconfigured or experiencing communication issues due to
missing links. It is also useful to compare the number of nodes
running LLDP with undetected neighbor nodes with the alarms present at
the same time to determine if there is any correlation between the
issues and the ability to reach neighbor nodes. 

To view the distribution, open the medium LLDP Service card.

If a visual correlation is apparent, you can dig a little deeper with
the large Network Services cards.

### View Switches with the Most Neighbors (this is what i am expecting, but not in wires)

You can view the load on your switches using the large LLDP Service
card; both currently and in the past.

To view switches with the most neighbors:

1.  Open the large LLDP Service card.
2.  Select **SWITCHES WITH MOST NEIGHBORS** from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing nodes
    running the LLDP with the most neighbors at the top. Scroll down to
    view those with the fewest neighbors.
3.  Optionally, change the time period for the data.

You can use this information to see which switches are experiencing the
highest load and validate that is what is expected based on your network
design.

### View Switches with the Least Neighbors (this is what i am expecting, but not in wires)

You can identify switches the least amount of detected neighbors
indicating a potential LLDP service disruption or a lightly loaded
switch; both currently and in the past.

To view switches with the least neighbors:

1.  Open the large LLDP Service card.
2.  Select **SWITCHES WITH LEAST NEIGHBORS** from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing nodes
    with the least neighbors at the top. Scroll down to view those with
    the most neighbors.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Nodes Least Neighbors chart to focus on the
    switches the least neighbors during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.
-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the least neighbors,
    you might want to look more carefully at those switches using the
    Switches card workflow.

### View Switches with the Most LLDP-related Alarms

Switches experiencing a large number of LLDP alarms may indicate a
configuration or performance issue that needs further investigation. You
can view the switches sorted by the number of LLDP alarms and then use
the Switches card workflow or the Alarms card workflow to gather more
information about possible causes for the alarms.

To view switches with most LLDP alarms:

1.  Open the large LLDP Service card.
2.  Hover over the header and click
    ![](attachments/8367112/9011965.png){width="16"}.
3.  Select **SWITCHES BY MOST ALARMS** from the dropdown above the
    table.  
    The table content is sorted by this characteristic, listing nodes
    with the most BGP alarms at the top. Scroll down to view those with
    the fewest alarms.

Where to go next depends on what data you see, but a few options
include:

-   Hover over the Total Alarms chart to focus on the switches
    exhibiting alarms during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes.
-   Change the time period for the data to compare with a prior time. If
    the same switches are consistently indicating the most alarms, you
    might want to look more carefully at those switches using the
    Switches card workflow.
-   Click **Show All Switches** to investigate all switches with LLDP
    alarms in a full screen card. (Sessions? check final card)

### View All LLDP Alarms

The LLDP Network Services card workflow enables you to view all of
the LLDP alarms in the designated time period. Two views are available,
one through the large alarms card and one through the full screen card.

To view all LLDP alarms with *large* card:

1.  Open the large LLDP Service card.
2.  Hover over the header and click
    ![](attachments/8367112/9011965.png){width="16"}.
3.  Select **ALARMS BY DATE** from the dropdown above the table.  
    The table content is sorted by this characteristic, listing the most
    recent LLDP alarms at the top. Scroll down to view those with the
    oldest alarms.

Where to go next depends on what data you see, but a couple of options
include:

-   Hover over the Total Alarms chart to focus on the alarms occurring
    during that smaller time slice.  
    The table content changes to match the hovered content. Click on the
    chart to persist the table changes. (how do you return to the full
    set of alarms?)
-   Open the Alarms card workflow and filter by LLDP to view more
    details about the latest alarms.

To view all LLDP alarms with *full screen* card:

1.  Open the full screen LLDP Service card.
2.  Click the **All LLDP ALARMS** tab.
3.  Sort alarm data by (name=date/timestamp?) column to view alarms in
    most recent to least recent.

Where to go next depends on what data you see, but a few options
include:

-   Sort or filter alarm data further.
-   Open one of the other full screen cards to focus on switches or
    sessions.
-   View the alarms in the topology workflow, by
    clicking **Topology** tab in the navigation panel.
-   Export the data for use in another analytics tool, by
    clicking **Export** and providing a name for the data file.

### View Detailed Information About All Switches Running BGP

You can view all stored attributes of all switches running LLDP in your
network in the full screen card.

To view all switch details, open the LLDP Service card, and click
the **All Switches** tab.

To return to your workbench,
click ![](attachments/8367112/9011964.png){width="16"} next to the title
of the full-screen card. 

### View Detailed Information About All LLDP Sessions/links?/neighbors?

You can view all stored attributes of all LLDP sessions in your network
in the full screen card.

To view all session details, open the LLDP Service card, and click
the **All Sessions** tab.

To return to your workbench,
click ![](attachments/8367112/9011964.png){width="16"} next to the title
of the full-screen card. 

 

 

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[calendar-check-2.svg](attachments/8367112/9011805.svg)
(image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [streamline -
line icon.iconjar.zip](attachments/8367112/9011807.zip)
(application/zip)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[alarm-sound.svg](attachments/8367112/9011810.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[clock-1.svg](attachments/8367112/9011821.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[close.svg](attachments/8367112/9011857.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[close-12.svg](attachments/8367112/9011876.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[close-14.svg](attachments/8367112/9011873.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[alarm-sound-12.svg](attachments/8367112/9011875.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[close-12.svg](attachments/8367112/9011879.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[close-12.svg](attachments/8367112/9011863.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-11
9:56:3.png](attachments/8367112/9011947.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-11
9:56:46.png](attachments/8367112/9011948.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-11
9:59:10.png](attachments/8367112/9011949.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-11
9:59:41.png](attachments/8367112/9011950.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-1-11
10:0:53.png](attachments/8367112/9011951.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [cursor double
click 1.svg](attachments/8367112/9011956.svg) (image/svg+xml)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [cursor double
click 1.png](attachments/8367112/9011959.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [file setting
2.png](attachments/8367112/9011960.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [settings
1.png](attachments/8367112/9011963.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[close.png](attachments/8367112/9011964.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [alarm
sound.png](attachments/8367112/9011965.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [clock
1.png](attachments/8367112/9011969.png) (image/png)  
