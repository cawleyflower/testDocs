---
title: HTTP API
author: Unknown
weight: 79
pageID: 8362086
product: Cumulus Linux
version: '3.6'
aliases:
 - /display/undefined/HTTP+API
imgData: Cumulus_Linux_36
siteSlug: Cumulus_Linux_36
---
Cumulus Linux 3.4+ implements an HTTP application programing interface
to [OpenStack ML2
driver](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//System_Configuration/HTTP_API/)
and
[NCLU](/Users/dcawley/Docs/Hugo/testDocs/content/version2/Cumulus_Linux_36//System_Configuration/HTTP_API/).
Rather than accessing Cumulus Linux using SSH, you can interact with the
switch through an HTTP client, such as cURL, HTTPie or a web browser.

{{%notice note%}}

The HTTP API service is enabled by default on chassis hardware only.
However, the associated server is configured to only listen to traffic
originating from within the chassis.

The service is not enabled by default on non-chassis hardware.

{{%/notice%}}
