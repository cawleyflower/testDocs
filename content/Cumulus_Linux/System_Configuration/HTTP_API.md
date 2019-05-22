---
title: HTTP API
author: Unknown
weight: 79
pageID: 8362591
aliases:
 - /old/Cumulus_Linux/HTTP_API.html
imgData: Cumulus_Linux
siteSlug: Cumulus_Linux
---
Cumulus Linux implements an HTTP application programing interface to
[OpenStack ML2
driver](/old/Cumulus_Linux/OpenStack_Neutron_ML2_and_Cumulus_Linux.html)
and [NCLU](/old/Cumulus_Linux/Network_Command_Line_Utility_-_NCLU.html).
Rather than accessing Cumulus Linux using SSH, you can interact with the
switch using an HTTP client, such as cURL, HTTPie or a web browser.

{{%notice note%}}

The HTTP API service is enabled by default on chassis hardware only.
However, the associated server is configured to only listen to traffic
originating from within the chassis.

The service is not enabled by default on non-chassis hardware.

{{%/notice%}}
