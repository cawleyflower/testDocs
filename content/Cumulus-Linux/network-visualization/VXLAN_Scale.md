# VXLAN Scale

On Broadcom Trident II and Tomahawk switches running Cumulus
Linux, there is a limit to the number of VXLANs you can configure
simultaneously. The limit most often given is 2000 VXLANs, but you might
want to get more specific and know exactly the limit for your specific
design.

While this limitation does apply to Trident II+, Trident3, or Maverick
ASICs, Cumulus Linux supports the same number of VXLANs on these ASICs
as it does for Trident II or Tomahawk ASICs.

Mellanox Spectrum ASICs do not have a limitation on the number of VXLANs
that they can support.

The limit is a physical to virtual mapping where a switch can hold 15000
mappings in hardware before you encounter hash collisions. There is also
an upper limit of around 3000 VLANs you can configure before you hit the
reserved range (Cumulus Linux uses 3000-3999 by default). Cumulus
Networks typically uses a soft number because the math is unique to each
environment. An internal VLAN is consumed by each layer 3 port,
subinterface, traditional bridge, and the VLAN-aware bridge. Therefore,
the number of configurable VLANs is:

(total configurable 802.1q VLANs) - (reserved VLANS) - (physical or
logical interfaces) = 4094-999-eth0-loopback = 3093 by default (without
any other configuration)

The equation for the number of configurable VXLANs looks like this:

(number of trunks) \* (VXLAN/VLANs per trunk) = 15000 - (Linux logical
and physical interfaces)

For example, on a 10Gb switch with 48 \* 10 G ports and 6 \* 40G
uplinks, you can calculate for X, the amount of configurable VXLANs:

48 \* X = 15000 - (48 downlinks + 6 uplinks + 1 loopback + 1 eth0 +  1
bridge)  
 48 \* X = 14943  
X = **311** VXLANs

Similarly, you can apply this logic to a 32 port 100G switch where 16
ports are broken up to 4 \* 25 Gbps ports, for a total of 64 \* 25 Gbps
ports:

64 \* X = 15000 - (64 downlinks + 16 uplinks + 1 loopback + 1 eth0 +  1
bridge)

 64 \* X = 14917

X = **233** VXLANs

However, not all ports are trunks for all VXLANs (or at least not all
the time). It is much more common for subsets of ports to be used for
different VXLANs. For example, a 10G (48 \* 10G + 6 \* 40G uplinks) can
have the following configuration:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th><div>
Ports
</div></th>
<th><div>
Trunks
</div></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>swp1-20</td>
<td>100 VXLAN/VLANs</td>
</tr>
<tr class="even">
<td>swp21-30</td>
<td>100 VXLAN/VLANs</td>
</tr>
<tr class="odd">
<td>swp31-48</td>
<td>X VXLAN/VLANs</td>
</tr>
</tbody>
</table>

The equation now looks like this:

20 swps \* 100 VXLANs + 10 swps \* 100 VXLANs + 18 swps \* X VXLANs +
(48 downlinks + 6 uplinks + loopback + 1 eth0 + 1 bridge) = 15000

20 swps \* 100 VXLANs + 10 swps \* 100 VXLANs + 18 swps \* X VXLANs
= 14943

18 \* X = 11943

663 = VXLANS (still configurable) for a total of **863**

 

## Attachments:

![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_netcomponents.png](attachments/8362768/8362767.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_logswp\_create.png](attachments/8362768/8362769.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_logswp\_done.png](attachments/8362768/8362770.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_loglayer.png](attachments/8362768/8362771.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_logswitch\_done.png](attachments/8362768/8362772.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_createvni.png](attachments/8362768/8362773.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_logswitch.png](attachments/8362768/8362774.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_gwsvc.png](attachments/8362768/8362775.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_bootstrap.screenshot.png](attachments/8362768/8362776.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_nsx.png](attachments/8362768/8362777.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"} [image2017-1-22
21:50:55.png](attachments/8362768/8362778.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_addbinding.png](attachments/8362768/8362779.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_gwsvc\_create.png](attachments/8362768/8362780.png)
(image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_nsx\_cert.png](attachments/8362768/8362781.png) (image/png)  
![](images/icons/bullet_blue.gif){width="8" height="8"}
[vxlan\_cert\_term.png](attachments/8362768/8362782.png) (image/png)  
