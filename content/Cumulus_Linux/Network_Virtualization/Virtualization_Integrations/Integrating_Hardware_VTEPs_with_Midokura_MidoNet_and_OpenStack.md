---
title: Integrating Hardware VTEPs with Midokura MidoNet and OpenStack
author: Unknown
weight: 389
pageID: 8362812
aliases:
 - /old/Cumulus_Linux/Integrating_Hardware_VTEPs_with_Midokura_MidoNet_and_OpenStack.html
imgData: Cumulus_Linux
siteSlug: Cumulus_Linux
---
Cumulus Linux seamlessly integrates with the MidoNet OpenStack
infrastructure, where the switches provide the VTEP gateway for
terminating VXLAN tunnels from within MidoNet. MidoNet connects to the
OVSDB server running on the Cumulus Linux switch, and exchanges
information about the VTEPs and MAC addresses associated with the
OpenStack Neutron networks. This provides seamless Ethernet connectivity
between virtual and physical server infrastructures.

{{%imgOld 0 %}}

## Getting Started

Make sure you have a layer 2 gateway; a Tomahawk, Trident II+ or Trident
II switch running Cumulus Linux. Cumulus Linux includes OVSDB server
(`ovsdb-server`) and VTEPd (`ovs-vtepd`), which support [VLAN-aware
bridges](/old/Cumulus_Linux/VLAN-aware_Bridge_Mode.html).

To integrate a VXLAN with MidoNet, you need to:

  - Configure the MidoNet integration on the swtich

  - Configure the MidoNet VTEP and port bindings

  - Verify the VXLAN configuration

For more information about MidoNet, see the MidoNet Operations Guide,
version 1.8 or later.

{{%notice note%}}

There is no support for [VXLAN
routing](/old/Cumulus_Linux/VXLAN_Routing.html) in the Trident II
chipset; use a loopback interface
([hyperloop](/old/Cumulus_Linux/VXLAN_Routing.html#src-8362747_VXLANRouting-t2))
instead.

{{%/notice%}}

## Configure the MidoNet Integration on the Switch

Before you start to configure the MidoNet tunnel zones and VTEP binding,
and connect virtual ports to the VXLAN, you need to enable and start the
`openvswitch-vtep` service, and configure the MidoNet integration on the
switch. This creates the VTEP gateway and initializes the OVS database
server.

Start the openvswitch-vtep Service

To enable and start the `openvswitch-vtep` service, run the following
command:

``` 
                   
cumulus@switch:~$ sudo systemctl enable openvswitch-vtep.service
cumulus@switch:~$ sudo systemctl start openvswitch-vtep.service
   
    
```

{{%notice note%}}

In previous versions of Cumulus Linux, you had to edit the
`/etc/default/openvswitch-vtep` file and then start the
`openvswitch-vtep` service . Now, you just have to enable and start the
` openvswitch-vtep  `service.

{{%/notice%}}

### Configure the MidoNet Integration Using the Configuration Script

The `vtep-bootstrap` script is available so you can perform the
configuration automatically. For information, read `man vtep-bootstrap`.
This script requires three parameters, in this order:

  - The switch name (the name of the switch that is the VTEP gateway).

  - The tunnel IP address (the datapath IP address of the VTEP).

  - The management IP address (the IP address of the management
    interface on the switch).

<!-- end list -->

``` 
                   
cumulus@switch:~$ sudo vtep-bootstrap sw11 10.111.1.1 10.50.20.21 --no_encryption
Executed: 
 define physical switch
 ().
Executed: 
 define local tunnel IP address on the switch
 ().
Executed: 
 define management IP address on the switch
 ().
Executed: 
 restart a service
 (Killing ovs-vtepd (28170).
Killing ovsdb-server (28146).
Starting ovsdb-server.
Starting ovs-vtepd.).
   
    
```

{{%notice note%}}

Because MidoNet does not have a controller, you need to use a dummy IP
address (for example, 1.1.1.1) for the controller parameter in the
script. After the script completes, delete the VTEP manager, as it is
not needed and will otherwise fill the logs with inconsequential error
messages:

``` 
                   
cumulus@switch:~$ sudo vtep-ctl del-manager
   
    
```

{{%/notice%}}

### Configure the MidoNet Integration Manually

If you do not use the configuration script, you must initialize the OVS
database instance manually and create the VTEP.

Perform the following commands in order (see the automated script
example above for values):

1.  Define the switch in OVSDB:
    
    ``` 
                       
    cumulus@switch:~$ sudo vtep-ctl add-ps 
       
        
    ```

2.  Define the VTEP tunnel IP address:
    
    ``` 
                       
    cumulus@switch:~$ sudo vtep-ctl set Physical_switch  tunnel_ips=
       
        
    ```

3.  Define the management interface IP address:
    
    ``` 
                       
    cumulus@switch:~$ sudo vtep-ctl set Physical_switch  management_ips=
       
        
    ```

4.  Restart the OVSDB server and `vtepd`:
    
    ``` 
                       
    cumulus@switch:~$ sudo systemctl restart openvswitch-vtep.service
       
        
    ```

The switch is now ready to connect to MidoNet. The rest of the
configuration is performed from the MidoNet Manager GUI or using the
MidoNet API.

## Configure MidoNet VTEP and Port Bindings

This part of the configuration sets up MidoNet and OpenStack to connect
the virtualization environment to the Cumulus Linux switch. The
`midonet-agent` is the networking component that manages the VXLAN,
while the Open Virtual Switch (OVS) client on the OpenStack controller
node communicates MAC address information between the `midonet-agent`
and the Cumulus Linux OVS database (OVSDB) server.

You can configure the MidoNet VTEP and port bindings from the MidoNet
Manager GUI or the MidoNet CLI.

### From the MidoNet Manager GUI

#### Create a Tunnel Zone

1.  Click **Tunnel Zones** in the menu on the left side.

2.  Click **Add**.

3.  Give the tunnel zone a **Name** and select **VTEP** for the
    **Type**.

4.  Click **Save**.
    
    {{%imgOld 1 %}}

#### Add Hosts to a Tunnel Zone

After you create the tunnel zone, click the name of the tunnel zone to
view the hosts table.

{{%imgOld 2 %}}

The tunnel zone is a construct used to define the VXLAN source address
used for the tunnel. The address of this host is used for the source of
the VXLAN encapsulation and traffic transits into the routing domain
from this point. Therefore, the host must have layer 3 reachability to
the Cumulus Linux switch tunnel IP.

Next, add a host entry to the tunnel zone:

1.  Click **Add**.

2.  Select a host from the **Host** list.

3.  Provide the tunnel source **IP Address** to use on the selected
    host.

4.  Click **Save**.
    
    {{%imgOld 3 %}}

The host list now displays the new entry:

{{%imgOld 4 %}}

#### Create the VTEP

1.  Click the **Vteps** menu on the left side.

2.  Click **Add**.

3.  Fill out the fields using the same information you used earlier on
    the switch for the bootstrap procedure:  
    \- **Management IP** is typically the eth0 address of the switch.
    This tells the OVS-client to connect to the OVSDB-server on the
    Cumulus Linux switch.  
    \- **Management Port** **Number** is the PTCP port you configured in
    the `ovs-ctl-vtep` script earlier (the example uses 6632).  
    \- **Tunnel Zone** is the name of the zone you created in the
    previous procedure.

4.  Click **Save**.
    
    {{%imgOld 5 %}}

The new VTEP appears in the list below. MidoNet then initiates a
connection between the OpenStack Controller and the Cumulus Linux
switch. If the OVS client successfully connects to the OVSDB server, the
VTEP entry displays the switch name and VXLAN tunnel IP address, which
you specified during the bootstrapping process.

{{%imgOld 6 %}}

#### Bind Ports to the VTEP

Now that connectivity is established to the switch, you need to add a
physical port binding to the VTEP on the Cumulus Linux switch:

1.  Click **Add**.

2.  In the **Port Name** list, select the port on the Cumulus Linux
    switch that you are using to connect to the VXLAN segment.

3.  Specify the **VLAN ID** (enter 0 for untagged).

4.  In the **Bridge** list, select the MidoNet bridge that the instances
    (VMs) are using in OpenStack.

5.  Click **Save**.
    
    {{%imgOld 7 %}}

You see the port binding displayed in the binding table under the VTEP.

{{%imgOld 8 %}}

After the port is bound, this automatically configures a VXLAN bridge
interface, and includes the VTEP interface and the port bound to the
bridge. Now the OpenStack instances (VMs) are able to ping the hosts
connected to the bound port on the Cumulus switch. The Troubleshooting
section below demonstrates the verification of the VXLAN data and
control planes.

### From the MidoNet CLI

To get started with the MidoNet CLI, you can access the CLI prompt on
the OpenStack Controller:

    root@os-controller:~# midonet-cli
    midonet>

From the MidoNet CLI, the commands explained in this section perform the
same operations depicted in the previous section with the MidoNet
Manager GUI.

1.  Create a tunnel zone with a name and type *vtep*:
    
    ``` 
                       
    midonet> tunnel-zone create name sw12 type vtep
    tzone1
       
        
    ```

2.  The tunnel zone is a construct used to define the VXLAN source
    address used for the tunnel. The address of this host is used for
    the source of the VXLAN encapsulation and traffic transits into the
    routing domain from this point. Therefore, the host must have layer
    3 reachability to the Cumulus Linux switch tunnel IP.
    
      - First, obtain the list of available hosts connected to the
        Neutron network and the MidoNet bridge.
    
      - Next, get a listing of all the interfaces.
    
      - Finally, add a host entry to the tunnel zone ID returned in the
        previous step and specify which interface address to use.
        
        ``` 
                           
        midonet> list host
        host host0 name os-compute1 alive true
        host host1 name os-network alive true 
        midonet> host host0 list interface
        iface midonet host_id host0 status 0 addresses [] mac 02:4b:38:92:dd:ce mtu 1500 type Virtual endpoint DATAPATH
        iface lo host_id host0 status 3 addresses [u'127.0.0.1', u'169.254.169.254', u'0:0:0:0:0:0:0:1'] mac 00:00:00:00:00:00 mtu 65536 type Virtual endpoint LOCALHOST
        iface virbr0 host_id host0 status 1 addresses [u'192.168.122.1'] mac 22:6e:63:90:1f:69 mtu 1500 type Virtual endpoint UNKNOWN
        iface tap7cfcf84c-26 host_id host0 status 3 addresses [u'fe80:0:0:0:e822:94ff:fee2:d41b'] mac ea:22:94:e2:d4:1b mtu 65000 type Virtual endpoint DATAPATH
        iface eth1 host_id host0 status 3 addresses [u'10.111.0.182', u'fe80:0:0:0:5054:ff:fe85:acd6'] mac 52:54:00:85:ac:d6 mtu 1500 type Physical endpoint PHYSICAL
        iface tapfd4abcea-df host_id host0 status 3 addresses [u'fe80:0:0:0:14b3:45ff:fe94:5b07'] mac 16:b3:45:94:5b:07 mtu 65000 type Virtual endpoint DATAPATH
        iface eth0 host_id host0 status 3 addresses [u'10.50.21.182', u'fe80:0:0:0:5054:ff:feef:c5dc'] mac 52:54:00:ef:c5:dc mtu 1500 type Physical endpoint PHYSICAL
        midonet> tunnel-zone tzone0 add member host host0 address 10.111.0.182
        zone tzone0 host host0 address 10.111.0.182
           
            
        ```
    
    Repeat this procedure for each OpenStack host connected to the
    Neutron network and the MidoNet bridge.

3.  Create a VTEP and assign it to the tunnel zone ID returned in the
    previous step. The management IP address (the destination address
    for the VXLAN or remote VTEP) and the port must be the same ones you
    configure in the `vtep-bootstrap` script or the manual
    bootstrapping:
    
    ``` 
                       
    midonet> vtep add management-ip 10.50.20.22 management-port 6632 tunnel-zone tzone0
    name sw12 description sw12 management-ip 10.50.20.22 management-port 6632 tunnel-zone tzone0 connection-state CONNECTED
       
        
    ```
    
    In this step, MidoNet initiates a connection between the OpenStack
    Controller and the Cumulus Linux switch. If the OVS client
    successfully connects to the OVSDB server, the returned values
    should show the name and description matching the `switch-name`
    parameter specified in the bootstrap process.
    
    {{%notice note%}}
    
    Verify the connection-state as CONNECTED. If ERROR is returned, you
    must debug. Typically this only fails if the `management-ip` and or
    the `management-port` settings are incorrect.
    
    {{%/notice%}}

4.  The VTEP binding uses the information provided to MidoNet from the
    OVSDB server, providing a list of ports that the hardware VTEP can
    use for layer 2 attachment. This binding virtually connects the
    physical interface to the overlay switch, and joins it to the
    Neutron bridged network.
    
    First, get the UUID of the Neutron network behind the MidoNet
    bridge:
    
    ``` 
                       
    midonet> list bridge
    bridge bridge0 name internal state up
    bridge bridge1 name internal2 state up
    midonet> show bridge bridge1 id
    6c9826da-6655-4fe3-a826-4dcba6477d2d
       
        
    ```
    
    Next, create the VTEP binding using the UUID and the switch port
    being bound to the VTEP on the remote end. If there is no VLAN ID,
    set `vlan` to 0:
    
    ``` 
                       
    midonet> vtep name sw12 binding add network-id 6c9826da-6655-4fe3-a826-4dcba6477d2d physical-port swp11s0 vlan 0
    management-ip 10.50.20.22 physical-port swp11s0 vlan 0 network-id 6c9826da-6655-4fe3-a826-4dcba6477d2d
       
        
    ```

At this point, the VTEP is connected and the layer 2 overlay is
operational. From the openstack instance (VM), you can ping a physical
server connected to the port bound to the hardware switch VTEP.
