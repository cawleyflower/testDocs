# Configuring Optional NetQ Capabilities

After you have installed NetQ applications package and the NetQ Agents,
you may want to configure some of the additional capabilities that NetQ
offers. This topic describes how to install, setup, and configure these
capabilities.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Integrate NetQ with an Event Notification
    Application](#ConfiguringOptionalNetQCapabilities-IntegrateNotificationIntegrateNetQwithanEventNotificationApplication)
    -   [NetQ
        Notifier](#ConfiguringOptionalNetQCapabilities-NetQNotifier)
        -   [Event Message
            Format](#ConfiguringOptionalNetQCapabilities-EventMessageFormat)
    -   [NetQ Notification Commands
        Overview](#ConfiguringOptionalNetQCapabilities-NetQNotificationCommandsOverview)
    -   [Configure NetQ Event
        Logging](#ConfiguringOptionalNetQCapabilities-NotifierLogConfigureNetQEventLogging)
    -   [Configure PagerDuty Using NetQ
        CLI](#ConfiguringOptionalNetQCapabilities-PDcliConfigurePagerDutyUsingNetQCLI)
    -   [Configure Slack Using NetQ
        CLI](#ConfiguringOptionalNetQCapabilities-ConfigureSlackUsingNetQCLI)
    -   [View
        Integrations](#ConfiguringOptionalNetQCapabilities-ViewIntegrations)
-   [Create NetQ Notifier
    Filters](#ConfiguringOptionalNetQCapabilities-NotifierFiltersCreateNetQNotifierFilters)
    -   [Build Filter
        Rules ](#ConfiguringOptionalNetQCapabilities-FilterRuleBuildFilterRules)
    -   [Example: Create a Filter for Events from a Selected
        Switch](#ConfiguringOptionalNetQCapabilities-Example:CreateaFilterforEventsfromaSelectedSwitch)
    -   [Example: Create a Filter to Drop Notifications from a Given
        Interface](#ConfiguringOptionalNetQCapabilities-Example:CreateaFiltertoDropNotificationsfromaGivenInterface)
    -   [Example: Add Multiple Rules to a
        Filter](#ConfiguringOptionalNetQCapabilities-Example:AddMultipleRulestoaFilter)
    -   [Example: Create a Filter to Send BGP Session State
        Notifications to
        Slack](#ConfiguringOptionalNetQCapabilities-Example:CreateaFiltertoSendBGPSessionStateNotificationstoSlack)
    -   [Example: Create a Filter to Drop All Temperature-Related Event
        Notifications](#ConfiguringOptionalNetQCapabilities-Example:CreateaFiltertoDropAllTemperature-RelatedEventNotifications)
    -   [Example: Create a Filter for License Validation Event
        Notifications](#ConfiguringOptionalNetQCapabilities-Example:CreateaFilterforLicenseValidationEventNotifications)
-   [Integrate with a Hardware
    Chassis](#ConfiguringOptionalNetQCapabilities-IntegratewithaHardwareChassis)

## Integrate NetQ with an Event Notification Application

By default, alert messages are sent to the database; however, other
third-party tools may be configured to receive the alert messages. Once
you have observed the events received (using the `netq show events`
command) for some period of time, you can more easily determine which
events you want to direct to a given notification application and how
you might assign the events to various event channels. You can integrate
NetQ with two third-party notification applications, PagerDuty and
Slack. You may integrate with one or both of these applications with or
without filtering the events sent. To set up the integrations, you must
configure the NetQ notifier on the NetQ Platform.

### NetQ Notifier

The NetQ notifier is responsible for delivering alerts to users through
mediums such as Slack and syslog, informing users of network events. The
NetQ notifier listens for events on the relevant streaming topic,
stores, filters and sends messages to any configured notification
applications. Filters are based on rules you create.

![](attachments/8365387/9013637.png){width="600"}

Notifications can be generated for the following types of events:

-   BGP status and session state
-   Cable status and states
-   CLAG (MLAG) status and session state
-   Configuration File changes
-   EVPN status and session state
-   Fan status
-   License status
-   Link status
-   LLDP status
-   LNV status and session state
-   MTU status
-   NTP status
-   OSFP status and session state
-   Port status
-   PSU (power supply unit) status
-   Services status
-   Temperature status
-   Trace status
-   VLAN status and session state
-   VXLAN status and session state

The NetQ notifier is preconfigured to monitor for *all* events and
publish *all* alert messages. No additional configuration is required;
however, you can modify this default behavior to:

-   Limit the events that are logged: The NetQ notifier sends out alerts
    based on the configured logging level. If you want to change the
    default logging level of *info* to increase or decrease the set of
    events that are logged, refer to [Configure NetQ Event
    Logging](#ConfiguringOptionalNetQCapabilities-NotifierLog).

-   Limit the events that are published: If you do not want to receive
    alerts for all events, you can limit the messages to publish
    by creating an notifier filter. Refer to [Create NetQ Notifier
    Filters](#ConfiguringOptionalNetQCapabilities-NotifierFilters) for
    details.
-   Use an alternate tool to view alerts: You can integrate the notifier
    with third-party event notification applications. Integration
    consists of setting a few parameters in the NetQ configuration
    file to identify the output, and then creating a filter to publish
    messages on that channel ([Create NetQ Notifier
    Filters](#ConfiguringOptionalNetQCapabilities-NotifierFilters)).

NetQ notifier was installed as part of the NetQ Platform installation
process. You configure the notifier using the NetQ CLI, or by manually
editing the `/etc/netq/netq.yml` configuration file.

#### Event Message Format

Messages have the following structure:

``

| Element      | Description                                                                                                                                        |
|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| message type | Category of event; *bgp, cable, clag, configdiff, evpn, fan, license, link, lldp, lnv, mtu, ntp, OS, ospf, sensor, services, trace, vlan or vxlan* |
| timestamp    | Date and time event occurred in UTC format                                                                                                         |
| opid         | Identifier of the service or process that generated the event                                                                                      |
| hostname     | Hostname of network device where event occurred                                                                                                    |
| severity     | Severity level in which the given event is classified; *debug*, *error*, *info*, *warning,* or critical                                            |
| message      | Text description of event                                                                                                                          |
| message info | Change seen that triggered the event; indicated by key value pair(s)                                                                               |

  
For example:

![](attachments/8365387/9013646.png){width="700"}

### NetQ Notification Commands Overview

The NetQ Command Line Interface (CLI) is used to filter and send
notifications to third-party tools based on severity, service,
event-type, and device. The CLI enables you to configure these items
without editing the configuration file, reducing the risk of errors. You
can use TAB completion or the help keyword to assist when needed.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>add</td>
<td>Adds or modifies notification configuration, including filters, or sets master data node for DB cluster</td>
</tr>
<tr class="even">
<td>del</td>
<td>Removes existing notification configuration</td>
</tr>
<tr class="odd">
<td>restart</td>
<td>Restarts the notification daemon</td>
</tr>
<tr class="even">
<td>show</td>
<td>Displays current DB server configuration or notification integrations</td>
</tr>
<tr class="odd">
<td>start</td>
<td>Starts the notification daemon</td>
</tr>
<tr class="even">
<td>status</td>
<td><p>Display notification status</p></td>
</tr>
<tr class="odd">
<td>stop</td>
<td>Stops notification daemon</td>
</tr>
</tbody>
</table>

The command syntax is:

``` text
##Integrations
netq add notification channel slack <text-channel-name> webhook <text-webhook-url> [severity info|severity warning|severity error|severity debug|severity info] [tag <text-slack-tag>]
netq add notification channel pagerduty <text-channel-name> api-access-key <text-api-access-key> api-channel-key <text-api-channel-key> [severity info|severity warning|severity error|severity debug|severity info]
netq add notification channel pagerduty <text-channel-name> api-channel-key <text-api-channel-key> api-access-key <text-api-access-key> [severity info|severity warning|severity error|severity debug|severity info]

##Filters
netq add notification filter <text-filter-name> [severity info|severity warning|severity error|severity debug|severity info] [rule <text-rule-name-anchor>] [channel <text-channel-name-anchor>]
 
##Logging
netq config add agent loglevel [debug|error|info|warning]
 
##Management
netq del notification channel <text-channel-name-anchor>
netq del notification filter <text-filter-name-anchor>
netq del notification rule <text-rule-name-anchor>
netq config del agent loglevel
netq config (restart|status) agent
netq config (restart|status) cli
netq show notification [channel|filter|rule] [json]
```

The options are described in the following sections where they are used.

### Configure NetQ Event Logging

The logging level used by the NetQ notifier determines what types of
messages are published and what messages are suppressed. Five levels of
logging are available, as shown in this table.

| Logging Level | Description                                                                                          |
|---------------|------------------------------------------------------------------------------------------------------|
| debug         | Sends notifications for all debugging-related, informational, warning, error, and critical messages. |
| info          | Sends notifications for critical, informational, warning, and error messages (default).              |
| warning       | Sends notifications for critical, warning, and error messages.                                       |
| error         | Sends notifications for critical and errors messages.                                                |
| critical      | Sends notifications for critical messages.                                                           |

You can view the messages using the `netq show events` command as shown
here, or use the notification applications.

``` text
cumulus@switch:~$ netq show events level critical between now and 6h
Matching events records:
Hostname          Message Type Severity Message                             Timestamp
----------------- ------------ -------- ----------------------------------- -------------------------
leaf02            bgp          critical BGP session with peer  swp7.3 vrf D 5h:0m:36s
                                        ataVrf1081 state changed from NotEs
                                        td to NotEstd
leaf02            bgp          critical BGP session with peer  swp7.2 vrf D 5h:0m:36s
                                        ataVrf1080 state changed from NotEs
                                        td to NotEstd
leaf02            bgp          critical BGP session with peer  swp7.4 vrf D 5h:0m:36s
                                        ataVrf1082 state changed from NotEs
                                        td to NotEstd
leaf02            bgp          critical BGP session with peer  swp7 vrf def 5h:0m:36s
                                        ault state changed from NotEstd to
                                        NotEstd
leaf01            bgp          critical BGP session with peer  swp7.3 vrf D 5h:0m:41s
                                        ataVrf1081 state changed from NotEs
                                        td to NotEstd
leaf01            bgp          critical BGP session with peer  swp7.2 vrf D 5h:0m:41s
                                        ataVrf1080 state changed from NotEs
                                        td to NotEstd
...
```

**Example: Configure debug-level logging**

1.  Set the logging level to *debug.*

    ``` text
    cumulus@switch:~$ netq config add agent loglevel debug
    ```

2.  Restart the NetQ Agent.

    ``` text
    cumulus@switch:~$ netq config restart agent
    Restarting netq-agent... Success!
    ```

Example: Configure warning-level logging

``` text
cumulus@switch:~$ netq config add agent loglevel warning 
cumulus@switch:~$ netq config restart agent 
```

**Example: Disable NetQ Event Notification Logging**

If you have set the logging level to debug for troubleshooting, it is
recommended that you either change the logging level to a less heavy
mode or completely disable agent logging altogether when you are
finished troubleshooting.

To change the logging level, run the following command and restart the
agent service:

``` text
cumulus@switch:~$ netq config add agent loglevel <LOG_LEVEL> 
cumulus@switch:~$ netq config restart agent
```

To disable all logging:

``` text
cumulus@switch:~$ netq config del agent loglevel 
cumulus@switch:~$ netq config restart agent
```

 

### Configure PagerDuty Using NetQ CLI

NetQ sends notifications to PagerDuty as PagerDuty events.

For example:

 

To configure the NetQ notifier to send notifications to PagerDuty:

1.  Configure the following options using
    the `netq`` add notification channel` command:

    | Option                    | Description                                                                                                                                                        |
    |---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | CHANNEL\_TYPE             | The third-party notification system; use *pagerduty* in this case.                                                                                                 |
    | &lt;text-channel-name&gt; | The name for the notification channel.                                                                                                                             |
    | api-access-key            | The required API access key is also called the [authorization token](https://v2.developer.pagerduty.com/docs/authentication).                                      |
    | api-channel-key           | The [integration](https://v2.developer.pagerduty.com/docs/events-api-v2) key is also called the service\_key or routing\_key. The default in an empty string (""). |
    | severity                  | (Optional) The log level to set, which can be one of *info*, *warning*, *error*, *critical* or *debug*. The severity defaults to *info*.                           |

    ``` plain
    cumulus@switch:~$ netq add notification channel pagerduty pager-duty-test api-access-key 1234567890 api-channel-key 9876543210
    ```

2.  Restart the NetQ CLI.

    ``` plain
    cumulus@switch:~$ netq config restart cli
    ```

3.  Verify that the channel is configured properly.

    ``` plain
    cumulus@switch:~$ netq show notification channel
    ```

### Configure Slack Using NetQ CLI

NetQ Notifier sends notifications to Slack as incoming webhooks for a
Slack channel you configure. For example:

To configure NetQ to send notifications to Slack:

1.  If needed, create one or more Slack channels on which to receive the
    notifications.
    1.  Click + next to **Channels**.
    2.  Enter a name for the channel, and click **Create Channel**.
    3.  Navigate to the new channel.
    4.  Click **+ Add an app** link below the channel name to open the
        application directory.
    5.  In the search box, start typing *incoming* and
        select* ***Incoming WebHooks** when it appears.
    6.  Click **Add Configuration** and enter the name of the channel
        you created (where you want to post notifications).
    7.  Click **Add Incoming WebHooks integration**.
    8.  Save WebHook URL in a text file for use in next step.
2.  Configure the following options in
    the `netq ``config add notification channel` command:

    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Option</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>CHANNEL_TYPE</td>
    <td>The third-party notification system; use <em>slack</em> in this case.</td>
    </tr>
    <tr class="even">
    <td>&lt;text-channel-name&gt;</td>
    <td>The name for the notification channel.</td>
    </tr>
    <tr class="odd">
    <td>WEBHOOK</td>
    <td><p>Copy the WebHook URL from the text file OR in the desired channel, locate the initial message indicating the addition of the webhook, click <strong>incoming-webhook</strong> link, click <strong>Settings</strong>.</p>
    <p>Example URL: <code>https://hooks.slack.com/services/text/moretext/evenmoretext</code></p></td>
    </tr>
    <tr class="even">
    <td>severity</td>
    <td>The log level to set, which can be one of <em>error, warning, info,</em> or <em>debug</em>. The severity defaults to <em>info</em>.</td>
    </tr>
    <tr class="odd">
    <td>tag</td>
    <td>Optional tag appended to the Slack notification to highlight particular channels or people. The tag value must be preceded by the @ sign. For example, <em>@netq-info</em>.</td>
    </tr>
    </tbody>
    </table>

3.  Restart the NetQ event  service.

    ``` text
    cumulus@switch:~$ netq add notification channel slack netq-events webhook https://hooks.slack.com/services/text/moretext/evenmoretext
    Successfully added/updated channel netq-events
     
    cumulus@switch:~$ netq config restart cli
    Restarting NetQ CLI... Success!
    ```

4.  Verify the channel is configured correctly.  
    From the CLI:

    ``` text
    cumulus@switch:~$ netq show notification channel 
    ```

    From the Slack Channel:  
      
    ![](attachments/8365387/9013442.png){width="400"}

### View Integrations

You can view configured integrations using
the `netq show notification` commands. To view the channels, filters,
and rules, run the three flavors of the command. Include
the `json` option to display JSON-formatted output.

For example:

``` text
cumulus@switch:~$ netq show notification channel
Matching config_notify records:
Name            Type             Severity Channel Info
--------------- ---------------- -------- ------------
slack-netq-leaf slack            info     webhook:http
02                                        s://hooks.sl
                                          ack.com/serv
                                          ices/text/mo
                                          retext/evenm
                                          oretext
 
cumulus@switch:~$ netq show notification filter
Matching config_notify records:
Name            Severity Channels Rules
--------------- -------- -------- -----
leaf02-filter   info     slack-ne host-
                         tq-leaf0 leaf0
                         2        2
 
cumulus@switch:~$ netq show notification rule
Matching config_notify records:
Name            Rule Key Rule Value
--------------- -------- ----------
host-leaf02     hostname leaf02
 
cumulus@switch:~$ netq show notification channel json
{
    "config_notify":[
        {
            "type":"slack",
            "name":"netq-events",
            "channelInfo":"webhook:https://hooks.slack.com/services/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",
            "severity":"info"
        },
        {
            "type":"pagerduty",
            "name":"pager-duty-license",
            "channelInfo":"access_key:1234567890\nchannel_key:9876543210",
            "severity":"info"
    }
    ],
    "truncatedResult":false
}

cumulus@switch:~$ netq show notification filter json
{
    "config_notify":[
        {
            "channels":"netq-events",
            "rules":"bgp-events",
            "name":"bgp",
            "severity":"info"
        },
        {
            "channels":"netq-events",
            "rules":"ifswp5drop-1, ifswp5drop-1, ifswp5drop-1, ifswp5drop",
            "name":"drop-if",
            "severity":"info"
        },
        {
            "channels":"netq-events",
            "rules":"license-valid",
            "name":"licenseBad",
            "severity":"info"
    }
    ],
    "truncatedResult":false
}
 
cumulus@switch:~$ netq show notification rule json
{
    "config_notify":[
        {
            "ruleKey":"BgpSession",
            "ruleValue":"all",
            "name":"bgp-events"
        },
        {
            "ruleKey":"hostname",
            "ruleValue":"leaf04",
            "name":"ifswp5drop"
        },
        {
            "ruleKey":"Link",
            "ruleValue":"swp5",
            "name":"ifswp5drop-1"
        },
        {
            "ruleKey":"License",
            "ruleValue":"spine-1",
            "name":"license-valid"
    }
    ],
    "truncatedResult":false
}
```

## Create NetQ Notifier Filters

You can limit or direct event messages sent by NetQ using filters.
Filters are created based on rules you define. Each filter contains one
or more rules. Each rule contains a single key-value pair.  When a
message matches the rule, it is sent to the indicated destination. The
default rule is matches all messages. You can specify rules using
entities such as hostnames or interface names in the regular expression,
enabling you to filter messages specific to those hosts or interfaces.
Additionally, you can send log messages to PagerDuty or a given Slack
channel; you need to have already defined the PagerDuty or Slack
configurations (as described earlier).

By default, filters are processed in the order they appear in
the `netq.yml` configuration file (from top to bottom) until a match is
found. This means that each event message is first evaluated by the
first filter listed, and if it matches then it is processed, ignoring
all other filters, and the system moves on to the next event message
received. If the event does not match the first filter, it is tested
against the second filter, and if it matches then it is processed and
the system moves on to the next event received. And so forth. Events
that do not match any filter are ignored.  This diagram shows an example
with four defined filters with sample output results.

![](attachments/8365387/8365388.png){width="250"}

When you create a new filter, it is automatically added to the top of
the list, before all others, so you may need to rearrange them in the
`netq.yml` file to ensure you capture the events you want and drop the
events you do not want. 

Filter names may contain spaces, but must be enclosed with single quotes
in commands. It is easier to use dashes in place of spaces or mixed case
for better readability. For example, use bgpSessionChanges or
BGP-session-changes or BGPsessions, instead of 'BGP Session Changes'.
Filter names are also case sensitive.

You must restart the NetQ CLI service after configuring filters so they
can take effect; run the `netq config restart cli` command.

### Build Filter Rules 

Each rule is comprised of a single key-value pair. Creating multiple
rules for a given filter can provide a very defined filter. There is a
fixed set of valid rule keys. Values are entered as regular expressions
and *vary according to your deployment*.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Rule Key</th>
<th>Rule Values</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>BgpSession</td>
<td><p>Regular expression identifying a hostname, peer name, ASN, or VRF</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf11, exit01, spine-4</li>
<li>peer_name: server4, leaf-3, exit02, spine06</li>
<li>asn: 65020, 65012</li>
<li>vrf: mgmt, default</li>
</ul></td>
</tr>
<tr class="even">
<td>ClagSession</td>
<td><p>Regular expression identifying a hostname or CLAG system MAC address</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf-9, exit01, spine04</li>
<li>Clag_sysmac: 44:38:39:00:00:5C</li>
</ul></td>
</tr>
<tr class="odd">
<td>Fan</td>
<td><p>Regular expression identifying a hostname, sensor name, or sensor description</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf16, exit01, spine-12</li>
<li>s_name: fan1, fan-2</li>
<li>s_desc: 'fan 1, tray 1' </li>
</ul></td>
</tr>
<tr class="even">
<td>hostname</td>
<td><p>Regular expression identifying a hostname</p>
<p>For example, host-06 or spine2.</p></td>
</tr>
<tr class="odd">
<td>License</td>
<td><p>Regular expression identifying a hostname or license name </p>
<p>Examples: </p>
<ul>
<li>hostname: server02, leaf-25, exit01, spine10</li>
<li>name: Cumulus Linux, RHEL, Ubuntu, CentOS</li>
</ul></td>
</tr>
<tr class="even">
<td>Link</td>
<td><p>Regular expression identifying a hostname, interface name, or kind of link</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf-6, exit01, spine7</li>
<li>ifname: eth0, swp53</li>
<li>kind: bond, bridge, eth, loopback, macvlan, swp, vlan, vrf, vxlan</li>
</ul></td>
</tr>
<tr class="odd">
<td>LnvSession</td>
<td><p>Regular expression identifying a hostname or role</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf41, exit01, spine-5, tor-36</li>
</ul></td>
</tr>
<tr class="even">
<td>OS</td>
<td><p>Regular expression identifying a hostname</p>
<p>For example, host-12 or spine05.</p></td>
</tr>
<tr class="odd">
<td>Port</td>
<td><p>Regular expression identifying a hostname or interface name</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf13, exit01, spine-8</li>
<li>ifname: eth0, swp14</li>
</ul></td>
</tr>
<tr class="even">
<td>PSU</td>
<td><p>Regular expression identifying a hostname, sensor name</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf-26, exit01, spine2-4</li>
<li>s_name: psu1, psu2</li>
</ul></td>
</tr>
<tr class="odd">
<td>Services</td>
<td><p>Regular expression identifying a hostname, service name, or VRF</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf03, exit01, spine-8</li>
<li>name: clagd, lldpd, ssh, ntp, netqd, net-agent</li>
<li>vrf: mgmt, default</li>
</ul></td>
</tr>
<tr class="even">
<td>Temp</td>
<td><p>Regular expression identifying a hostname, sensor name, sensor description</p>
<p>Examples:</p>
<ul>
<li>hostname: server02, leaf-01, exit01, spine6</li>
<li>s_name: psu1temp1, temp2</li>
<li>s_desc: 'board sensor near fan'</li>
</ul></td>
</tr>
</tbody>
</table>

Rules are case sensitive, and no wildcards are permitted. Use Tab
completion to view the command options syntax.

### Example: Create a Filter for Events from a Selected Switch

In this example, we created a notification integration with a Slack
channel called *slack-netq-leaf02*. We then created a rule *host-leaf02*
and a filter called *leaf02-filter* for any notifications that mention
switches named *leaf-02*. The result is that any event messages
mentioning the leaf02 hostname is filtered to
the *slack-netq-leaf02 *channel. After restarting the CLI, we verify the
configuration.

``` text
cumulus@switch:~$ netq add notification channel slack slack-netq-leaf02 webhook https://hooks.slack.com/services/text/moretext/evenmoretext  
cumulus@switch:~$ netq add notification rule host-leaf02 key hostname value leaf02
cumulus@switch:~$ netq add notification filter leaf02-filter rule host-leaf02 channel slack-netq-leaf02
cumulus@switch:~$ netq config restart cli
 
cumulus@switch:~$ netq show notification channel
Matching config_notify records:
Name            Type             Severity Channel Info
--------------- ---------------- -------- ------------
slack-netq-leaf slack            info     webhook:http
02                                        s://hooks.sl
                                          ack.com/serv
                                          ices/text/mo
                                          retext/evenm
                                          oretext


cumulus@switch:~$ netq show notification filter
Matching config_notify records:
Name            Severity Channels Rules
--------------- -------- -------- -----
leaf02-filter   info     slack-ne host-
                         tq-leaf0 leaf0
                         2        2
 
cumulus@switch:~$ netq show notification rule
Matching config_notify records:
Name            Rule Key Rule Value
--------------- -------- ----------
host-leaf02     hostname leaf02
```

### Example: Create a Filter to Drop Notifications from a Given Interface

In this example, we created a filter, *ifswp21drop*, that drops
notifications for events from interface *swp21*. Make sure to capitalize
the Port rule option. Note that you must restart the Notifier for this
configuration change to take effect.

``` text
cumulus@switch:~$ netq add notification rule ifswp21 key Port value swp21
Successfully added/updated rule ifswp21
cumulus@switch:~$ netq add notification filter ifswp21drop rule ifswp21
Successfully added/updated filter ifswp21drop
cumulus@switch:~$ netq config restart cli
```

### Example: Add Multiple Rules to a Filter

In this example, we created a filter (*drop-if*) with two rules to drop
notifications from a particular switch (leaf04) and link (swp5). We have
already created the channel (if-events). Note that you need to create
the rules first, and then create the filter. 

``` text
cumulus@switch:~$ netq add notification rule ifswp5drop-1 key Link value swp5
Successfully added/updated rule ifswp5drop-1
cumulus@switch:~$ netq add notification rule ifswp5drop-2 key hostname value leaf04
Successfully added/updated rule ifswp5drop-2
 
cumulus@switch:~$ netq show notification rule
Matching config_notify records:
Name            Rule Key Rule Value
--------------- -------- ----------
ifswp5drop-1    Link     swp5
ifswp5drop-2    hostname leaf04


cumulus@switch:~$ netq add notification filter drop-if rule ifswp5drop-1 channel if-events
Successfully added/updated filter drop-if
cumulus@switch:~$ netq add notification filter drop-if rule ifswp5drop-2 channel if-events
Successfully added/updated filter drop-if
 
cumulus@switch:~$ netq show notification filter
Matching config_notify records:
Name            Severity Channels Rules
--------------- -------- -------- -----
drop-if         info     if-event ifswp
                         s        5drop
                                  -1,
                                  ifswp
                                  5drop
                                  -2                         
```

### Example: Create a Filter to Send BGP Session State Notifications to Slack

In this example, we created a filter, *BGPslackchannel*, to send BGP
session state notifications to an existing Slack
channel, *slack-channel-BGP*, and all other event notifications to a
generic Slack channel, *slack-channel-catchall*. The Slack integration
should be created before creating the filter. Note that you must restart
the CLI for this configuration change to take effect.

``` text
cumulus@switch:~$ netq add notification rule bgp-events key BgpSession value all
cumulus@switch:~$ netq add notification filter BGPslackchannel rule bgp-events channel slack-channel-BGP
cumulus@switch:~$ netq config restart cli
```

### Example: Create a Filter to Drop All Temperature-Related Event Notifications

In this example, we created a filter, tempDrop, to drop all temperature
related event notifications. Note: capitalization is important with
these rules. Use Tab completion to view the command options syntax.
Restart the CLI for this configuration change to take effect.

``` text
cumulus@switch:~$ netq add notification rule temp-events key Temp value all
cumulus@switch:~$ netq add notification filter tempDrop rule Temp-events channel netq-events
cumulus@switch:~$ netq config restart cli
```

### Example: Create a Filter for License Validation Event Notifications

In this example, we created a filter, license-bad, to notify persons
with access to a PagerDuty messages on the pager-duty-license channel
when an invalid license is detected on *spine01*. Note: capitalization
is important with these rules. Use Tab completion to view the command
options syntax. Restart the CLI for this configuration change to take
effect. 

``` text
cumulus@switch:~$ netq add notification channel pagerduty pager-duty-license api-access-key 1234567890 api-integration-key 9876543210
Successfully added/updated channel pager-duty-license
 
cumulus@switch:~$ netq add notification rule license1 key License value spine-1
Successfully added/updated rule license1

cumulus@switch:~$ netq add notification filter license-bad rule license1 channel netq-events
Successfully added/updated filter license-bad
cumulus@switch:~$ netq config restart cli
 
cumulus@switch:~$ netq show notification channel
Matching config_notify records:
Name            Type             Severity Channel Info
--------------- ---------------- -------- ------------
pager-duty-lice pagerduty        info     access_key:1
nse                                       234567890
                                          annel_key:98
                                          76543210
 
cumulus@switch:~$ netq show notification rule
Matching config_notify records:
Name            Rule Key Rule Value
--------------- -------- ----------
license1        License  spine-1

cumulus@switch:~$ netq show notification filter
Matching config_notify records:
Name            Severity Channels Rules
--------------- -------- -------- -----
license-bad     info     netq-eve licen
                         nts      se1
```

## Integrate with a Hardware Chassis

NetQ can run within a [Facebook Backpack
chassis](https://cumulusnetworks.com/products/cumulus-express/getting-started/backpack/), [Cumulus
Express CX-10256-S
chassis](https://cumulusnetworks.com/products/cumulus-express/getting-started/cx10256s-omp800/) or [Edgecore
OMP-800
chassis](https://cumulusnetworks.com/products/cumulus-express/getting-started/cx10256s-omp800/). 

Keep the following issues in mind if you intend to use NetQ with a
chassis:

-   You must assign a unique hostname to every node that runs the NetQ
    Agent. By default, all the fabric cards in the chassis have the same
    hostname.
-   The NetQ Agent must be installed on every line card. 
-   No information is returned about the ASIC when you
    run `netq show inventory asic`. This is a known issue.
-   Since the chassis sensor information is shared, every line card and
    fabric card can report the same sensor data. By default, sensor data
    is disabled on a chassis to avoid this duplication. To enable sensor
    data on a line card,
    edit `/etc/netq/netq.yml` or `/etc/netq/config.d/user.yml` and set
    the `send_chassis_sensor_data` keyword to *true*, then restart the
    NetQ Agent with `netq config agent restart`. Configuring NetQ in
    this way prevents any duplication of data in the NetQ database.

    ``` text
    cumulus@chassis:~$ sudo nano /etc/netq/netq.yml
     
    ...
    netq-agent:
      send_chassis_sensor_data: true
    ...
    ```

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"} [netq slack
webhook.png](attachments/8365387/8365406.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-6
14:29:16.png](attachments/8365387/8365407.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [netq notifier
and redis.png](attachments/8365387/8365400.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ
PagerDuty.png](attachments/8365387/8365401.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ Slack
channel.png](attachments/8365387/8365402.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[netq-notifier.log.png](attachments/8365387/8365403.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ 1.1
splunk.png](attachments/8365387/8365404.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ 1.1
logstash.png](attachments/8365387/8365405.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-19
11:31:5.png](attachments/8365387/8365399.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-19
11:39:30.png](attachments/8365387/8365398.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-19
12:4:50.png](attachments/8365387/8365397.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-19
12:5:49.png](attachments/8365387/8365396.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-19
14:1:18.png](attachments/8365387/8365395.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-7-19
14:24:39.png](attachments/8365387/8365394.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-6-25
13:4:31.png](attachments/8365387/8365393.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-7
16:8:32.png](attachments/8365387/8365392.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-7
16:11:9.png](attachments/8365387/8365391.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-7
16:21:25.png](attachments/8365387/8365390.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [NetQ Notifier
Filtering2.png](attachments/8365387/8365389.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-9
14:59:13.png](attachments/8365387/8365388.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2018-8-10
14:19:40.png](attachments/8365387/8365386.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-6
14:50:0.png](attachments/8365387/9012856.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-15
11:6:7.png](attachments/8365387/9013415.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-15
14:23:32.png](attachments/8365387/9013437.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-15
14:33:54.png](attachments/8365387/9013442.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-15
17:7:58.png](attachments/8365387/9013448.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
14:4:25.png](attachments/8365387/9013637.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
14:46:54.png](attachments/8365387/9013642.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2019-2-19
15:5:2.png](attachments/8365387/9013646.png) (image/png)  
