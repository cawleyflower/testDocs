\--- title: author: keywords: ---

# Configuring Optional NetQ Capabilities

After you have installed NetQ applications package and the NetQ Agents,
you may want to configure some of the additional capabilities that NetQ
offers. This topic describes how to install, setup, and configure these
capabilities.

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-IntegrateNotificationIntegrateNetQwithanEventNotificationApplication" class="section section-1">

## Integrate NetQ with an Event Notification Application

By default, alert messages are sent to the database; however, other
third-party tools may be configured to receive the alert messages . Once
you have observed the events received (using the `netq show events`
command) for some period of time, you can more easily determine which
events you want to direct to a given notification application and how
you might assign the events to various event channels. You can integrate
NetQ with two third-party notification applications, PagerDuty and
Slack. You may integrate with one or both of these applications with or
without filtering the events sent. To set up the integrations, you must
configure the NetQ notifier on the NetQ
Platform.

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-NetQNotifier" class="section section-2">

### NetQ Notifier

The NetQ notifier is responsible for delivering alerts to users through
mediums such as Slack and syslog, informing users of network events. The
NetQ notifier listens for events on the relevant streaming topic,
stores, filters and sends messages to any configured notification
applications . Filters are based on rules you
create.

![/images/download/attachments/8365387/image2019-2-19\_14\_4\_25.png](/images/download/attachments/8365387/image2019-2-19_14_4_25.png)

Notifications can be generated for the following types of events:

  - BGP status and session state

  - Cable status and states

  - CLAG (MLAG) status and session state

  - Configuration File changes

  - EVPN status and session state

  - Fan status

  - License status

  - Link status

  - LLDP status

  - LNV status and session state

  - MTU status

  - NTP status

  - OSFP status and session state

  - Port status

  - PSU (power supply unit) status

  - Services status

  - Temperature status

  - Trace status

  - VLAN status and session state

  - VXLAN status and session state

The NetQ notifier is preconfigured to monitor for *all* events and
publish *all* alert messages. No additional configuration is required;
however, you can modify this default behavior to:

  - Limit the events that are logged: The NetQ notifier sends out alerts
    based on the configured logging level. If you want to change the
    default logging level of *info* to increase or decrease the set of
    events that are logged, refer to [Configure NetQ Event
    Logging](#src-8365387_ConfiguringOptionalNetQCapabilities-NotifierLog).

  - Limit the events that are published: If you do not want to receive
    alerts for all events, you can limit the messages to publish by
    creating an notifier filter. Refer to [Create NetQ Notifier
    Filters](#src-8365387_ConfiguringOptionalNetQCapabilities-NotifierFilters)
    for details.

  - Use an alternate tool to view alerts: You can integrate the notifier
    with third-party event notification applications. Integration
    consists of setting a few parameters in the NetQ configuration file
    to identify the output, and then creating a filter to publish
    messages on that channel ([Create NetQ Notifier
    Filters](#src-8365387_ConfiguringOptionalNetQCapabilities-NotifierFilters)).

NetQ notifier was installed as part of the NetQ Platform installation
process. You configure the notifier using the NetQ CLI, or by manually
editing the `/etc/netq/netq.yml` configuration
file.

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-EventMessageFormat" class="section section-3">

#### Event Message Format

Messages have the following
structure:

`<message-type><timestamp><opid><hostname><severity><message><message-info>`

<div class="tablewrap">

| Element      | Description                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| message type | Category of event; *bgp, cable, clag, configdiff, evpn, fan, license, link, lldp, lnv, mtu, ntp, OS, ospf, sensor, services, trace, vlan or vxlan* |
| timestamp    | Date and time event occurred in UTC format                                                                                                         |
| opid         | Identifier of the service or process that generated the event                                                                                      |
| hostname     | Hostname of network device where event occurred                                                                                                    |
| severity     | Severity level in which the given event is classified; *debug*, *error*, *info*, *warning,* or *critical*                                          |
| message      | Text description of event                                                                                                                          |
| message info | Change seen that triggered the event; indicated by key value pair(s)                                                                               |

</div>

For
example:

![/images/download/attachments/8365387/image2019-2-19\_15\_5\_2.png](/images/download/attachments/8365387/image2019-2-19_15_5_2.png)

</div>

</div>

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-NetQNotificationCommandsOverview" class="section section-2">

### NetQ Notification Commands Overview

The NetQ Command Line Interface (CLI) is used to filter and send
notifications to third-party tools based on severity, service,
event-type, and device. The CLI enables you to configure these items
without editing the configuration file, reducing the risk of errors. You
can use TAB completion or the help keyword to assist when
needed.

<div class="tablewrap">

| Command | Description                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------- |
| add     | Adds or modifies notification configuration, including filters, or sets master data node for DB cluster |
| del     | Removes existing notification configuration                                                             |
| restart | Restarts the notification daemon                                                                        |
| show    | Displays current DB server configuration or notification integrations                                   |
| start   | Starts the notification daemon                                                                          |
| status  | Display notification status                                                                             |
| stop    | Stops notification daemon                                                                               |

</div>

The command syntax is:

``` 
                
##Integrations
netq add notification channel slack  webhook  [severity info|severity warning|severity error|severity debug] [tag ]
netq add notification channel pagerduty  api-access-key  api-channel-key  [severity info|severity warning|severity error|severity debug]
netq add notification channel pagerduty  api-channel-key  api-access-key  [severity info|severity warning|severity error|severity debug]
 
##Rules and Filters
netq add notification rule  key  value 
netq add notification filter  [severity info|severity warning|severity error|severity debug] [rule ] [channel ]
 
##Logging
netq config add agent loglevel [debug|error|info|warning]
 
##Management
netq del notification channel 
netq del notification filter 
netq del notification rule 
netq config del agent loglevel
netq config (restart|status) agent
netq config (restart|status) cli
netq show notification [channel|filter|rule] [json]

    
```

The options are described in the following sections where they are
used.

</div>

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-NotifierLogConfigureNetQEventLogging" class="section section-2">

### Configure NetQ Event Logging

The logging level used by the NetQ notifier determines what types of
messages are published and what messages are suppressed. Five levels of
logging are available, as shown in this
table.

<div class="tablewrap">

| Logging Level | Description                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| debug         | Sends notifications for all debugging-related, informational, warning, error, and critical messages. |
| info          | Sends notifications for critical, informational, warning, and error messages (default).              |
| warning       | Sends notifications for critical, warning, and error messages.                                       |
| error         | Sends notifications for critical and errors messages.                                                |
| critical      | Sends notifications for critical messages.                                                           |

</div>

You can view the messages using the `netq show events` command as shown
here, or use the notification applications.

``` 
                
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

1.  Set the logging level to *debug.*
    
    ``` 
                    
    cumulus@switch:~$ netq config add agent loglevel debug
    
        
    ```

2.  Restart the NetQ Agent.
    
    ``` 
                    
    cumulus@switch:~$ netq config restart agent
    Restarting netq-agent... Success!
    
        
    ```

Example: Configure warning-level logging

``` 
                
cumulus@switch:~$ netq config add agent loglevel warning 
cumulus@switch:~$ netq config restart agent 

    
```

**Example: Disable NetQ Notifier Logging**

If you have set the logging level to debug for troubleshooting, it is
recommended that you either change the logging level to a less heavy
mode or completely disable agent logging altogether when you are
finished troubleshooting.

To change the logging level, run the following command and restart the
agent service. This example changes the logging level to warning.

``` 
                
cumulus@switch:~$ netq config add agent loglevel warning 
cumulus@switch:~$ netq config restart agent

    
```

To disable all logging:

``` 
                
cumulus@switch:~$ netq config del agent loglevel 
cumulus@switch:~$ netq config restart agent

    
```

</div>

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-PDcliConfigurePagerDutyUsingNetQCLI" class="section section-2">

### Configure PagerDuty Using NetQ CLI

NetQ sends notifications to PagerDuty as PagerDuty events.

For
example:

![/images/download/attachments/8365387/NetQ\_PagerDuty.png](/images/download/attachments/8365387/NetQ_PagerDuty.png)

<div class="confbox admonition admonition-note">

<div class="admonition-body">

{{% notice note %}} {{% /notice %}}

</div>

</div>

To configure the NetQ notifier to send notifications to PagerDuty:

1.  Configure the following options using the `netq``  add notification
    channel `
    command:
    
    <div class="tablewrap">
    
    | Option                | Description                                                                                                                                                        |
    | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
    | CHANNEL\_TYPE         | The third-party notification system; use *pagerduty* in this case.                                                                                                 |
    | \<text-channel-name\> | The name for the notification channel.                                                                                                                             |
    | api-access-key        | The required API access key is also called the [authorization token](https://v2.developer.pagerduty.com/docs/authentication).                                      |
    | api-channel-key       | The [integration](https://v2.developer.pagerduty.com/docs/events-api-v2) key is also called the service\_key or routing\_key. The default in an empty string (""). |
    | severity              | (Optional) The log level to set, which can be one of *info*, *warning*, *error*, *critical* or *debug*. The severity defaults to *info*.                           |
    

    </div>
    
    ``` 
                    
    cumulus@switch:~$ netq add notification channel pagerduty pager-duty-test api-access-key 1234567890 api-channel-key 9876543210
    
        
    ```

2.  Restart the NetQ CLI.
    
    ``` 
                    
    cumulus@switch:~$ netq config restart cli
    
        
    ```

3.  Verify that the channel is configured properly.
    
    ``` 
                    
    cumulus@switch:~$ netq show notification channel
    
        
    ```

</div>

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-ConfigureSlackUsingNetQCLI" class="section section-2">

### Configure Slack Using NetQ CLI

NetQ Notifier sends notifications to Slack as incoming webhooks for a
Slack channel you configure. For
example:

![/images/download/attachments/8365387/NetQ\_Slack\_channel.png](/images/download/attachments/8365387/NetQ_Slack_channel.png)

To configure NetQ to send notifications to Slack:

1.  If needed, create one or more Slack channels on which to receive the
    notifications.
    
    1.  Click **+** next to **Channels**.
    
    2.  Enter a name for the channel, and click **Create Channel**.
    
    3.  Navigate to the new channel.
    
    4.  Click **+ Add an app** link below the channel name to open the
        application directory.
    
    5.  In the search box, start typing *incoming* and select **
        **Incoming WebHooks** when it appears.
    
    6.  Click **Add Configuration** and enter the name of the channel
        you created (where you want to post notifications).
    
    7.  Click **Add Incoming WebHooks integration**.
    
    8.  Save WebHook URL in a text file for use in next step.

2.  Configure the following options in the ` netq  ``config add
    notification channel` command:
    
    <div class="tablewrap">
    
    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th><p>Option</p></th>
    <th><p>Description</p></th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>CHANNEL_TYPE</p></td>
    <td><p>The third-party notification system; use <em>slack</em> in this case.</p></td>
    </tr>
    <tr class="even">
    <td><p>&lt;text-channel-name&gt;</p></td>
    <td><p>The name for the notification channel.</p></td>
    </tr>
    <tr class="odd">
    <td><p>WEBHOOK</p></td>
    <td><p>Copy the WebHook URL from the text file OR in the desired channel, locate the initial message indicating the addition of the webhook, click <strong>incoming-webhook</strong> link, click <strong>Settings</strong>.</p>
    <p>Example URL: <code>https://hooks.slack.com/services/text/moretext/evenmoretext</code></p></td>
    </tr>
    <tr class="even">
    <td><p>severity</p></td>
    <td><p>The log level to set, which can be one of <em>error, warning, info,</em> or <em>debug</em>. The severity defaults to <em>info</em>.</p></td>
    </tr>
    <tr class="odd">
    <td><p>tag</p></td>
    <td><p>Optional tag appended to the Slack notification to highlight particular channels or people. The tag value must be preceded by the @ sign. For example, <em>@netq-info</em>.</p></td>
    </tr>
    </tbody>
    </table>
    
    </div>

3.  Restart the NetQ Notification service.
    
    ``` 
                    
    cumulus@switch:~$ netq add notification channel slack netq-events webhook https://hooks.slack.com/services/text/moretext/evenmoretext
    Successfully added/updated channel netq-events
     
    cumulus@switch:~$ netq config restart cli
    Restarting NetQ CLI... Success!
    
        
    ```

4.  Verify the channel is configured correctly.  
    From the CLI:
    
    ``` 
                    
    cumulus@switch:~$ netq show notification channel 
    Matching config_notify records:
    Name            Type             Severity Channel Info
    --------------- ---------------- -------- ------------
    netq-events     slack            info     webhook:http
                                              s://hooks.sl
                                              ack.com/serv
                                              ices/text/mo
                                              retext/evenm
                                              oretext
    
        
    ```
    
    From the Slack
    Channel:  
      
    ![/images/download/attachments/8365387/image2019-2-15\_14\_33\_54.png](/images/download/attachments/8365387/image2019-2-15_14_33_54.png)

</div>

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-ViewIntegrations" class="section section-2">

### View Integrations

You can view configured integrations using the `netq show notification`
commands. To view the channels, filters, and rules, run the three
flavors of the command. Include the `json` option to display
JSON-formatted output.

For example:

``` 
                
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

</div>

</div>

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-NotifierFiltersCreateNetQNotifierFilters" class="section section-1">

## Create NetQ Notifier Filters

You can limit or direct event messages sent by NetQ using filters.
Filters are created based on rules you define. Each filter contains one
or more rules. Each rule contains a single key-value pair. When a
message matches the rule, it is sent to the indicated destination. The
default rule is matches all messages. You can specify rules using
entities such as hostnames or interface names in the regular expression,
enabling you to filter messages specific to those hosts or interfaces.
Additionally, you can send log messages to PagerDuty or a given Slack
channel; you need to have already defined the PagerDuty or Slack
configurations (as described earlier).

By default, filters are processed in the order they appear in the
`netq.yml` configuration file (from top to bottom) until a match is
found. This means that each event message is first evaluated by the
first filter listed, and if it matches then it is processed, ignoring
all other filters, and the system moves on to the next event message
received. If the event does not match the first filter, it is tested
against the second filter, and if it matches then it is processed and
the system moves on to the next event received. And so forth. Events
that do not match any filter are ignored. This diagram shows an example
with four defined filters with sample output
results.

![/images/download/attachments/8365387/image2018-8-9\_14\_59\_13.png](/images/download/attachments/8365387/image2018-8-9_14_59_13.png)

When you create a new filter, it is automatically added to the top of
the list, before all others, so you may need to rearrange them in the
`netq.yml` file to ensure you capture the events you want and drop the
events you do not want.

<div class="confbox admonition admonition-info">

<div class="admonition-body">

{{% notice info %}} Filter names may contain spaces, but must be
enclosed with single quotes in commands. It is easier to use dashes in
place of spaces or mixed case for better readability. For example, use
bgpSessionChanges or BGP-session-changes or BGPsessions, instead of 'BGP
Session Changes'. Filter names are also case sensitive. {{% /notice %}}

</div>

</div>

You must restart the NetQ CLI service after configuring filters so they
can take effect; run the `netq config restart cli`
command.

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-FilterRuleBuildFilterRules" class="section section-2">

### Build Filter Rules

Each rule is comprised of a single key-value pair. Creating multiple
rules for a given filter can provide a very defined filter. There is a
fixed set of valid rule keys. Values are entered as regular expressions
and *vary according to your deployment*.

<div class="tablewrap">

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><p>Rule Key</p></th>
<th><p>Rule Values</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>BgpSession</p></td>
<td><p>Regular expression identifying a hostname, peer name, ASN, or VRF</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf11, exit01, spine-4</p></li>
<li><p>peer_name: server4, leaf-3, exit02, spine06</p></li>
<li><p>asn: 65020, 65012</p></li>
<li><p>vrf: mgmt, default</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>ClagSession</p></td>
<td><p>Regular expression identifying a hostname or CLAG system MAC address</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf-9, exit01, spine04</p></li>
<li><p>Clag_sysmac: 44:38:39:00:00:5C</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Fan</p></td>
<td><p>Regular expression identifying a hostname, sensor name, or sensor description</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf16, exit01, spine-12</p></li>
<li><p>s_name: fan1, fan-2</p></li>
<li><p>s_desc: 'fan 1, tray 1'</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>hostname</p></td>
<td><p>Regular expression identifying a hostname</p>
<p>For example, host-06 or spine2.</p></td>
</tr>
<tr class="odd">
<td><p>License</p></td>
<td><p>Regular expression identifying a hostname or license name</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf-25, exit01, spine10</p></li>
<li><p>name: Cumulus Linux, RHEL, Ubuntu, CentOS</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Link</p></td>
<td><p>Regular expression identifying a hostname, interface name, or kind of link</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf-6, exit01, spine7</p></li>
<li><p>ifname: eth0, swp53</p></li>
<li><p>kind: bond, bridge, eth, loopback, macvlan, swp, vlan, vrf, vxlan</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>LnvSession</p></td>
<td><p>Regular expression identifying a hostname or role</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf41, exit01, spine-5, tor-36</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>OS</p></td>
<td><p>Regular expression identifying a hostname</p>
<p>For example, host-12 or spine05.</p></td>
</tr>
<tr class="odd">
<td><p>Port</p></td>
<td><p>Regular expression identifying a hostname or interface name</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf13, exit01, spine-8</p></li>
<li><p>ifname : eth0, swp14</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>PSU</p></td>
<td><p>Regular expression identifying a hostname, sensor name</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf-26, exit01, spine2-4</p></li>
<li><p>s_nam e: psu1, psu2</p></li>
</ul></td>
</tr>
<tr class="odd">
<td><p>Services</p></td>
<td><p>Regular expression identifying a hostname, service name, or VRF</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf03, exit01, spine-8</p></li>
<li><p>name: clagd, lldpd, ssh, ntp, netqd, net-agent</p></li>
<li><p>vrf: mgmt, default</p></li>
</ul></td>
</tr>
<tr class="even">
<td><p>Temp</p></td>
<td><p>Regular expression identifying a hostname, sensor name, sensor description</p>
<p>Examples:</p>
<ul>
<li><p>hostname: server02, leaf-01, exit01, spine6</p></li>
<li><p>s_name: psu1temp1, temp2</p></li>
<li><p>s_desc: 'board sensor near fan'</p></li>
</ul></td>
</tr>
</tbody>
</table>

</div>

<div class="confbox admonition admonition-info">

<div class="admonition-body">

{{% notice info %}} Rules are case sensitive, and no wildcards are
permitted. Use Tab completion to view the command options syntax. {{%
/notice
%}}

</div>

</div>

</div>

<div id="src-8365387_safe-id-Q29uZmlndXJpbmdPcHRpb25hbE5ldFFDYXBhYmlsaXRpZXMtRXhhbXBsZTpDcmVhdGVhRmlsdGVyZm9yRXZlbnRzZnJvbWFTZWxlY3RlZFN3aXRjaA" class="section section-2">

### Example: Create a Filter for Events from a Selected Switch

In this example, we created a notification integration with a Slack
channel called *slack-netq-leaf02*. We then created a rule *host-leaf02*
and a filter called *leaf02-filter* for any notifications that mention
switches named *leaf-02*. The result is that any event messages
mentioning the leaf02 hostname is filtered to the *slack-netq-leaf02*
channel. After restarting the CLI, we verify the configuration.

``` 
                
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

</div>

<div id="src-8365387_safe-id-Q29uZmlndXJpbmdPcHRpb25hbE5ldFFDYXBhYmlsaXRpZXMtRXhhbXBsZTpDcmVhdGVhRmlsdGVydG9Ecm9wTm90aWZpY2F0aW9uc2Zyb21hR2l2ZW5JbnRlcmZhY2U" class="section section-2">

### Example: Create a Filter to Drop Notifications from a Given Interface

In this example, we created a filter, *ifswp21drop*, that drops
notifications for events from interface *swp21*. Make sure to capitalize
the Port rule option. Note that you must restart the Notifier for this
configuration change to take effect.

``` 
                
cumulus@switch:~$ netq add notification rule ifswp21 key Port value swp21
Successfully added/updated rule ifswp21
cumulus@switch:~$ netq add notification filter ifswp21drop rule ifswp21
Successfully added/updated filter ifswp21drop
cumulus@switch:~$ netq config restart cli

    
```

</div>

<div id="src-8365387_safe-id-Q29uZmlndXJpbmdPcHRpb25hbE5ldFFDYXBhYmlsaXRpZXMtRXhhbXBsZTpBZGRNdWx0aXBsZVJ1bGVzdG9hRmlsdGVy" class="section section-2">

### Example: Add Multiple Rules to a Filter

In this example, we created a filter (*drop-if*) with two rules to drop
notifications from a particular switch (leaf04) and link (swp5). We have
already created the channel (if-events). Note that you need to create
the rules first, and then create the filter.

``` 
                
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

</div>

<div id="src-8365387_safe-id-Q29uZmlndXJpbmdPcHRpb25hbE5ldFFDYXBhYmlsaXRpZXMtRXhhbXBsZTpDcmVhdGVhRmlsdGVydG9TZW5kQkdQU2Vzc2lvblN0YXRlTm90aWZpY2F0aW9uc3RvU2xhY2s" class="section section-2">

### Example: Create a Filter to Send BGP Session State Notifications to Slack

In this example, we created a filter, *BGPslackchannel*, to send BGP
session state notifications to an existing Slack channel,
*slack-channel-BGP*, and all other event notifications to a generic
Slack channel, *slack-channel-catchall*. The Slack integration should be
created before creating the filter. Note that you must restart the CLI
for this configuration change to take effect.

``` 
                
cumulus@switch:~$ netq add notification rule bgp-events key BgpSession value all
cumulus@switch:~$ netq add notification filter BGPslackchannel rule bgp-events channel slack-channel-BGP
cumulus@switch:~$ netq config restart cli

    
```

</div>

<div id="src-8365387_safe-id-Q29uZmlndXJpbmdPcHRpb25hbE5ldFFDYXBhYmlsaXRpZXMtRXhhbXBsZTpDcmVhdGVhRmlsdGVydG9Ecm9wQWxsVGVtcGVyYXR1cmUtUmVsYXRlZEV2ZW50Tm90aWZpY2F0aW9ucw" class="section section-2">

### Example: Create a Filter to Drop All Temperature-Related Event Notifications

In this example, we created a filter, tempDrop, to drop all temperature
related event notifications. Note: capitalization is important with
these rules. Use Tab completion to view the command options syntax.
Restart the CLI for this configuration change to take effect.

``` 
                
cumulus@switch:~$ netq add notification rule temp-events key Temp value all
cumulus@switch:~$ netq add notification filter tempDrop rule Temp-events channel netq-events
cumulus@switch:~$ netq config restart cli

    
```

</div>

<div id="src-8365387_safe-id-Q29uZmlndXJpbmdPcHRpb25hbE5ldFFDYXBhYmlsaXRpZXMtRXhhbXBsZTpDcmVhdGVhRmlsdGVyZm9yTGljZW5zZVZhbGlkYXRpb25FdmVudE5vdGlmaWNhdGlvbnM" class="section section-2">

### Example: Create a Filter for License Validation Event Notifications

In this example, we created a filter, license-bad, to notify persons
with access to a PagerDuty messages on the pager-duty-license channel
when an invalid license is detected on *spine01*. Note: capitalization
is important with these rules. Use Tab completion to view the command
options syntax. Restart the CLI for this configuration change to take
effect.

``` 
                
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

</div>

</div>

<div id="src-8365387_ConfiguringOptionalNetQCapabilities-IntegratewithaHardwareChassis" class="section section-1">

## Integrate with a Hardware Chassis

NetQ can run within a [Facebook Backpack
chassis](https://cumulusnetworks.com/products/cumulus-express/getting-started/backpack/),
[Cumulus Express CX-10256-S
chassis](https://cumulusnetworks.com/products/cumulus-express/getting-started/cx10256s-omp800/)
or [Edgecore OMP-800
chassis](https://cumulusnetworks.com/products/cumulus-express/getting-started/cx10256s-omp800/).

Keep the following issues in mind if you intend to use NetQ with a
chassis:

  - You must assign a unique hostname to every node that runs the NetQ
    Agent. By default, all the fabric cards in the chassis have the same
    hostname.

  - The NetQ Agent must be installed on every line card.

  - No information is returned about the ASIC when you run `netq show
    inventory asic`. This is a known issue.

  - Since the chassis sensor information is shared, every line card and
    fabric card can report the same sensor data. By default, sensor data
    is disabled on a chassis to avoid this duplication . To enable
    sensor data on a line card, edit `/etc/netq/netq.yml` or
    `/etc/netq/config.d/user.yml` and set the `send_chassis_sensor_data`
    keyword to *true*, then restart the NetQ Agent with `netq config
    agent restart`. Configuring NetQ in this way prevents any
    duplication of data in the NetQ database.
    
    ``` 
                    
    cumulus@chassis:~$ sudo nano /etc/netq/netq.yml
     
    ...
    netq-agent:
      send_chassis_sensor_data: true
    ...
    
        
    ```

</div>
