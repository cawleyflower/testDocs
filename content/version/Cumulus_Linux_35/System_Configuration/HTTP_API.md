---
title: HTTP API
author: Unknown
weight: 79
pageID: 8357373
aliases:
 - /old/Cumulus_Linux_35/HTTP_API.html
imgData: Cumulus_Linux_35
---
# HTTP API

Cumulus Linux 3.4+ implements an HTTP application programing interface
to [OpenStack ML2
driver](/old/Cumulus_Linux_35/OpenStack_Neutron_ML2_and_Cumulus_Linux.html)
and
[NCLU](/old/Cumulus_Linux_35/Network_Command_Line_Utility_-_NCLU.html).
Rather than accessing a Cumulus Linux host with SSH, you can interact
with a server with a HTTP client, such as cURL, HTTPie or a web browser.

{{%notice note%}}

The HTTP API service is enabled by default on chassis hardware only.
However, the associated server is configured to only listen to traffic
originating from within the chassis.

The service is not enabled by default on non-chassis hardware.

{{%/notice%}}
