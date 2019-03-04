# Investigate NetQ Issues

There are several paths you can take to locate and investigate issues
that occur in the NetQ software itself, including viewing configuration
and log files, verifying NetQ Agent health, and verifying NetQ Platform
configuration. If these do not produce a resolution, you can capture a
log to use in discussion with Cumulus Networks support team.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Browse Configuration and Log
    Files](#InvestigateNetQIssues-BrowseConfigurationandLogFiles)
-   [Check NetQ Agent
    Health](#InvestigateNetQIssues-CheckNetQAgentHealth)
-   [Generate a Support
    File](#InvestigateNetQIssues-GenerateaSupportFile)

## Browse Configuration and Log Files

To aid in troubleshooting issues with NetQ, there are the following
configuration and log files that can provide insight into the root cause
of the issue:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>File</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><code>/etc/netq/netq.yml </code></td>
<td>The NetQ configuration file. This file appears only if you installed either the <code>netq-apps</code> package or the NetQ Agent on the system.</td>
</tr>
<tr class="even">
<td><code>/var/log/netqd.log</code> </td>
<td>The NetQ daemon log file for the NetQ CLI. This log file appears only if you installed the netq-apps package on the system.</td>
</tr>
<tr class="odd">
<td><p><code>/var/log/netq-agent.log</code></p></td>
<td>The NetQ Agent log file. This log file appears only if you installed the NetQ Agent on the system.</td>
</tr>
</tbody>
</table>

## Check NetQ Agent Health

Checking the health of the NetQ Agents is a good way to start
troubleshooting NetQ on your network. If any agents are rotten, meaning
three heartbeats in a row were not sent, then you can investigate the
rotten node. In the example below, the NetQ Agent on server01 is rotten,
so you know where to start looking for problems:

    cumulus@switch:$ netq check agents 
    Checked nodes: 12, Rotten nodes: 1
    netq@446c0319c06a:/$ netq show agents 
    Node      Status    Sys Uptime    Agent Uptime
    --------  --------  ------------  --------------
    exit01    Fresh     8h ago        4h ago
    exit02    Fresh     8h ago        4h ago
    leaf01    Fresh     8h ago        4h ago
    leaf02    Fresh     8h ago        4h ago
    leaf03    Fresh     8h ago        4h ago
    leaf04    Fresh     8h ago        4h ago
    server01  Rotten    4h ago        4h ago
    server02  Fresh     4h ago        4h ago
    server03  Fresh     4h ago        4h ago
    server04  Fresh     4h ago        4h ago
    spine01   Fresh     8h ago        4h ago
    spine02   Fresh     8h ago        4h ago

## Generate a Support File

The `opta-support` command generates an archive of useful information
for troubleshooting issues with NetQ. It is an extension of the
`cl-support` command in Cumulus Linux. It provides information about the
NetQ Platform configuration and runtime statistics as well as output
from the `docker ps` command. The Cumulus Networks support team may
request the output of this command when assisting with any issues that
you could not solve with your own troubleshooting. Run the following
command:

``` text
cumulus@switch:~$ opta-support
```
