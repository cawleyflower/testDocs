\--- title: author: keywords: ---

# Maintain NetQ

While regular maintenance of NetQ is not required, there are some tasks
that you may want to perform in the course of everyday operations. As
the network changes, you might have the need to add or remove monitored
nodes, notification integrations, and NetQ Agents for example. You might
also need to restore NetQ to a prior version or upgrade to a new
version.

<div id="src-8365409_MaintainNetQ-ManageEventNotificationIntegrations" class="section section-1">

## Manage Event Notification Integrations

You might need to modify event notification configurations at some point
in the lifecycle of your deployment. Adding new integrations and filters
are described in Configuring Optional NetQ Capabilities. Removing them
is described
here.

<div id="src-8365409_MaintainNetQ-RemoveanEventNotificationChannel" class="section section-2">

### Remove an Event Notification Channel

You can delete an event notification integration using the `netq config
del notification` command. You can verify it has been removed using the
related `show` command.

For example, to remove a Slack integration and verify it is no longer in
the configuration:

``` 
                
cumulus@switch:~$ netq del notification channel slk-netq-events
cumulus@switch:~$ netq show notification channel

    
```

</div>

<div id="src-8365409_MaintainNetQ-DeleteanEventNotificationFilter" class="section section-2">

### Delete an Event Notification Filter

To delete a filter, use the following command, then verify it has been
removed:

``` 
                
cumulus@switch:~$ netq del notification filter drop-if
cumulus@switch:~$ netq show notification filter

    
```

</div>

</div>

<div id="src-8365409_MaintainNetQ-ManagetheNetQAgents" class="section section-1">

## Manage the NetQ Agents

At various points in time, you might want to change which network nodes
are being monitored by NetQ or look more closely at a network node for
troubleshooting purposes. Adding the NetQ Agent to a switch or host is
described in [Install NetQ](Install_NetQ). Disabling an Agent is
described here and managing NetQ Agent logging is also presented in this
section.

<div id="src-8365409_MaintainNetQ-DisableNetQAgentonaNode" class="section section-2">

### Disable NetQ Agent on a Node

You can temporarily disable NetQ Agent on a node. Disabling the agent
maintains the activity history in the NetQ database.

To disable NetQ Agent on a node, run the following command from the
node:

``` 
                
cumulus@switch:~$ netq config stop agent

    
```

</div>

<div id="src-8365409_MaintainNetQ-RemoveNetQAgentfromaNode" class="section section-2">

### Remove NetQ Agent from a Node

You can decommission a NetQ Agent on a given node. You might need to do
this when you:

  - RMA the switch or host being monitored

  - Change the hostname of the switch or host being monitored

  - Move the switch or host being monitored from one data center to
    another

<div class="confbox admonition admonition-note">

<div class="admonition-body">

{{% notice note %}} Decommissioning the node removes the agent server
settings from the local configuration file. {{% /notice %}}

</div>

</div>

To decommission a node from the NetQ database, run the following command
*from that node*:

``` 
                
cumulus@switch:~$ netq config del agent server

    
```

</div>

<div id="src-8365409_MaintainNetQ-AgentLogConfigureLoggingforaNetQAgent" class="section section-2">

### Configure Logging for a NetQ Agent

The logging level used for a NetQ Agent determines what types of events
are logged about the NetQ Agent on the switch or host.

First, you need to decide what level of logging you want to configure.
You can configure the logging level to be the same for every NetQ Agent,
or selectively increase or decrease the logging level for a NetQ Agent
on a problematic
node.

<div class="tablewrap">

| Logging Level | Description                                                                                |
| ------------- | ------------------------------------------------------------------------------------------ |
| debug         | Sends notifications for all debugging-related, informational, warning, and error messages. |
| info          | Sends notifications for informational, warning, and error messages (default).              |
| warning       | Sends notifications for warning and error messages.                                        |
| error         | Sends notifications for errors messages.                                                   |

</div>

You can view the NetQ Agent log directly. Messages have the following
structure:

`<timestamp> <node> <service>[PID]: <level>:
<message>`

<div class="tablewrap">

| Element         | Description                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------- |
| timestamp       | Date and time event occurred in UTC format                                                   |
| node            | Hostname of network node where event occurred                                                |
| service \[PID\] | Service and Process IDentifier that generated the event                                      |
| level           | Logging level in which the given event is classified; *debug*, *error*, *info*, or *warning* |
| message         | Text description of event, including the node where the event occurred                       |

</div>

For
example:

![/images/download/attachments/8365409/image2018-10-2\_17\_48\_9.png](/images/download/attachments/8365409/image2018-10-2_17_48_9.png)

This example shows a portion of a NetQ Agent log with debug level
logging.

``` 
                
...
2019-02-16T18:45:53.951124+00:00 spine-1 netq-agent[8600]: INFO: OPTA Discovery exhibit url hydra-09.cumulusnetworks.com port 4786
2019-02-16T18:45:53.952035+00:00 spine-1 netq-agent[8600]: INFO: OPTA Discovery Agent ID spine-1
2019-02-16T18:45:53.960152+00:00 spine-1 netq-agent[8600]: INFO: Received Discovery Response 0
2019-02-16T18:46:54.054160+00:00 spine-1 netq-agent[8600]: INFO: OPTA Discovery exhibit url hydra-09.cumulusnetworks.com port 4786
2019-02-16T18:46:54.054509+00:00 spine-1 netq-agent[8600]: INFO: OPTA Discovery Agent ID spine-1
2019-02-16T18:46:54.057273+00:00 spine-1 netq-agent[8600]: INFO: Received Discovery Response 0
2019-02-16T18:47:54.157985+00:00 spine-1 netq-agent[8600]: INFO: OPTA Discovery exhibit url hydra-09.cumulusnetworks.com port 4786
2019-02-16T18:47:54.158857+00:00 spine-1 netq-agent[8600]: INFO: OPTA Discovery Agent ID spine-1
2019-02-16T18:47:54.171170+00:00 spine-1 netq-agent[8600]: INFO: Received Discovery Response 0
2019-02-16T18:48:54.260903+00:00 spine-1 netq-agent[8600]: INFO: OPTA Discovery exhibit url hydra-09.cumulusnetworks.com port 4786
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
    
        
    ```

3.  Optionally, verify connection to the NetQ platform by viewing the
    `netq-agent.log` messages.

Example: Configure warning-level logging

``` 
                
cumulus@switch:~$ netq config add agent loglevel warning 
cumulus@switch:~$ netq config restart agent 

    
```

**Example: Disable Agent Logging**

If you have set the logging level to debug for troubleshooting, it is
recommended that you either change the logging level to a less heavy
mode or completely disable agent logging altogether when you are
finished troubleshooting.

To change the logging level, run the following command and restart the
agent service:

``` 
                
cumulus@switch:~$ netq config add agent loglevel  
cumulus@switch:~$ netq config restart agent

    
```

To disable all logging:

``` 
                
cumulus@switch:~$ netq config del agent loglevel 
cumulus@switch:~$ netq config restart agent

    
```

</div>

</div>

<div id="src-8365409_MaintainNetQ-BackupUpgradeNetQ" class="section section-1">

## Upgrade NetQ

Before upgrading NetQ, consider the following:

  - The minimum supported Cumulus Linux version for NetQ 2.0.1 is 3.7.0.

  - You must upgrade your NetQ Agents as well as the NetQ Platform.

  - You can upgrade to NetQ 2.0.1 without upgrading Cumulus Linux.

To upgrade NetQ 1.x to NetQ 2.0 Core functions, please contact support
for assistance. To upgrade the NetQ Agents, follow the instructions in
[Install NetQ](Install_NetQ).

<div class="confbox admonition admonition-info">

<div class="admonition-body">

{{% notice info %}} Cumulus Networks recommends only upgrading NetQ
during a network maintenance window. {{% /notice %}}

</div>

</div>

<div class="confbox admonition admonition-note">

<div class="admonition-body">

{{% notice note %}} Events generated during the upgrade process will not
be available in the database. Once the upgrade process is complete, the
agents re-sync with the current state of the Host or Cumulus Linux
switch with the NetQ Platform. {{% /notice %}}

</div>

</div>

</div>
