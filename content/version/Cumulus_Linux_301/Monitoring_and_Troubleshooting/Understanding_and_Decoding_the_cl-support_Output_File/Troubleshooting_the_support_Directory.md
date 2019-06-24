---
title: Troubleshooting the support Directory
author: Cumulus Networks
weight: 283
aliases:
 - /display/CL30/Troubleshooting+the_support_Directory
 - /pages/viewpage.action?pageId=0
slug: >-
 /Cumulus_Linux_301//Monitoring_and_Troubleshooting/Understanding_and_Decoding_the_cl-support_Output_File
pageID: 5118239
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
The `support` directory is unique in the fact that it is not a copy of
the switch's filesystem. Actually, it is the output from various
commands. For example:

| File            | Equivalent Command               | Description                                                                                                                  |
| --------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| support/ip.addr | `cumulus@switch:~$ ip addr show` | This shows you all the interfaces (including swp front panel ports), IP address information, admin state and physical state. |
