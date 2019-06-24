---
title: Configuring and Managing Network Interfaces
author: Cumulus Networks
weight: 19
aliases:
 - /display/CL30/Configuring+and_Managing_Network_Interfaces
 - /pages/viewpage.action?pageId=0
slug: /Cumulus_Linux_301//Configuring_and_Managing_Network_Interfaces
pageID: 5118370
product: Cumulus Linux
version: 3.0.1
imgData: Cumulus_Linux_301
siteSlug: Cumulus_Linux_301
---
`ifupdown` is the network interface manager for Cumulus Linux. Cumulus
Linux 2.1 and later uses an updated version of this tool, `ifupdown2`.

For more information on network interfaces, see [Layer 1 and Switch Port
Attributes](/Layer_1_and_Switch_Port_Attributes.html).

{{%notice info%}}

By default, `ifupdown` is quiet; use the verbose option `-v` when you
want to know what is going on when bringing an interface down or up.

{{%/notice%}}

## Commands

  - ifdown

  - ifquery

  - ifreload

  - ifup

  - mako-render

## Man Pages

The following man pages have been updated for `ifupdown2`:

  - man ifdown(8)

  - man ifquery(8)

  - man ifreload

  - man ifup(8)

  - man ifupdown-addons-interfaces(5)

  - man interfaces(5)

## Configuration Files

  - /etc/network/interfaces

## ifupdown2 Interface Classes

`ifupdown2` provides for the grouping of interfaces into separate
classes, where a class is simply a user-defined label used to group
interfaces that share a common function (like uplink, downlink or
compute). You specify classes in `/etc/network/interfaces`.

The most common class users are familiar with is *auto*, which you
configure like this:

    auto swp1
    iface swp1

You can add other classes using the *allow* prefix. For example, if you
have multiple interfaces used for uplinks, you can make up a class
called *uplinks:*

    auto swp1
    allow-uplink swp1
    iface swp1 inet static
        address 10.1.1.1/31

    auto swp2
    allow-uplink swp2
    iface swp2 inet static
        address 10.1.1.3/31

This allows you to perform operations on only these interfaces using the
--allow-uplinks option, or still use the `-a` options since these
interfaces are also in the auto class:

    cumulus@switch:~$ sudo ifup --allow=uplinks 
    cumulus@switch:~$ sudo ifreload -a 

Another example where this feature is useful is if you're using
[Management VRF](/Management_VRF.html), you can use the special
interface class called *mgmt*, and put the management interface into
that class:

    allow-mgmt eth0
    iface eth0 inet dhcp
        vrf mgmt
    allow-mgmt mgmt
    iface mgmt
        address 127.0.0.1/8
        vrf-table auto

All `ifupdown2` commands (`ifup`, `ifdown`, `ifquery`, `ifreload`) can
take a class. Include the `--allow=<class>` option when you run the
command. For example, to reload the configuration for the management
interface described above, run:

    cumulus@switch:~$ sudo ifreload --allow=mgmt 

### Bringing All auto Interfaces Up or Down

You can easily bring up or down all interfaces marked with the common
`auto` class in `/etc/network/interfaces`. Use the `-a` option. For
further details, see individual man pages for `ifup(8)`, `ifdown(8)`,
`ifreload(8)`.

To administratively bring up all interfaces marked auto, run:

    cumulus@switch:~$ sudo ifup -a

To administratively bring down all interfaces marked auto, run:

    cumulus@switch:~$ sudo ifdown -a

To reload all network interfaces marked `auto`, use the `ifreload`
command, which is equivalent to running `ifdown` then `ifup`, the one
difference being that `ifreload` skips any configurations that didn't
change):

    cumulus@switch:~$ sudo ifreload -a

## ifupdown2 Interface Dependencies

`ifupdown2` understands interface dependency relationships. When `ifup`
and `ifdown` are run with all interfaces, they always run with all
interfaces in dependency order. When run with the interface list on the
command line, the default behavior is to not run with dependents. But if
there are any built-in dependents, they will be brought up or down.

To run with dependents when you specify the interface list, use the
`--with-depends` option. `--with-depends` walks through all dependents
in the dependency tree rooted at the interface you specify. Consider the
following example configuration:

    auto bond1
    iface bond1
        address 100.0.0.2/16
        bond-slaves swp29 swp30
    
    auto bond2
    iface bond2
        address 100.0.0.5/16
        bond-slaves swp31 swp32
    
    auto br2001
    iface br2001
        address 12.0.1.3/24
        bridge-ports bond1.2001 bond2.2001
        bridge-stp on

Using `ifup --with-depends br2001` brings up all dependents of br2001:
bond1.2001, bond2.2001, bond1, bond2, bond1.2001, bond2.2001, swp29,
swp30, swp31, swp32.

    cumulus@switch:~$ sudo ifup --with-depends br2001

Similarly, specifying `ifdown --with-depends br2001` brings down all
dependents of br2001: bond1.2001, bond2.2001, bond1, bond2, bond1.2001,
bond2.2001, swp29, swp30, swp31, swp32.

    cumulus@switch:~$ sudo ifdown --with-depends br2001

{{%notice warning%}}

As mentioned earlier, `ifdown2` always deletes logical interfaces after
bringing them down. Use the `--admin-state` option if you only want to
administratively bring the interface up or down. In terms of the above
example, `ifdown br2001` deletes `br2001`.

{{%/notice%}}

To guide you through which interfaces will be brought down and up, use
the `--print-dependency` option to get the list of dependents.

Use `ifquery --print-dependency=list -a` to get the dependency list of
all interfaces:

    cumulus@switch:~$ sudo ifquery --print-dependency=list -a
    lo : None
    eth0 : None
    bond0 : ['swp25', 'swp26']
    bond1 : ['swp29', 'swp30']
    bond2 : ['swp31', 'swp32']
    br0 : ['bond1', 'bond2']
    bond1.2000 : ['bond1']
    bond2.2000 : ['bond2']
    br2000 : ['bond1.2000', 'bond2.2000']
    bond1.2001 : ['bond1']
    bond2.2001 : ['bond2']
    br2001 : ['bond1.2001', 'bond2.2001']
    swp40 : None
    swp25 : None
    swp26 : None
    swp29 : None
    swp30 : None
    swp31 : None
    swp32 : None

To print the dependency list of a single interface, use:

    cumulus@switch:~$ sudo ifquery --print-dependency=list br2001
    br2001 : ['bond1.2001', 'bond2.2001']
    bond1.2001 : ['bond1']
    bond2.2001 : ['bond2']
    bond1 : ['swp29', 'swp30']
    bond2 : ['swp31', 'swp32']
    swp29 : None
    swp30 : None
    swp31 : None
    swp32 : None

To print the dependency information of an interface in `dot` format:

    cumulus@switch:~$ sudo ifquery --print-dependency=dot br2001
    /* Generated by GvGen v.0.9 (http://software.inl.fr/trac/wiki/GvGen) */
    digraph G {
        compound=true;
        node1 [label="br2001"];
        node2 [label="bond1.2001"];
        node3 [label="bond2.2001"];
        node4 [label="bond1"];
        node5 [label="bond2"];
        node6 [label="swp29"];
        node7 [label="swp30"];
        node8 [label="swp31"];
        node9 [label="swp32"];
        node1->node2;
        node1->node3;
        node2->node4;
        node3->node5;
        node4->node6;
        node4->node7;
        node5->node8;
        node5->node9;
    }

You can use `dot` to render the graph on an external system where `dot`
is installed.

{{\< imgOld 0 \>}}

To print the dependency information of the entire `interfaces` file:

    cumulus@switch:~$ sudo ifquery --print-dependency=dot -a >interfaces_all.dot

{{\< imgOld 1 \>}}

### ifup Handling of Upper (Parent) Interfaces

When you run `ifup` on a logical interface (like a bridge, bond or VLAN
interface), if the `ifup` resulted in the creation of the logical
interface, by default it implicitly tries to execute on the interface's
upper (or parent) interfaces as well. This helps in most cases,
especially when a bond is brought down and up, as in the example below.
This section describes the behavior of bringing up the upper interfaces.

Consider this example configuration:

    auto br100
    iface br100
        bridge-ports bond1.100 bond2.100
    
    auto bond1
    iface bond1
        bond-slaves swp1 swp2

If you run `ifdown bond1`, `ifdown` deletes bond1 and the VLAN interface
on bond1 (bond1.100); it also removes bond1 from the bridge br100. Next,
when you run `ifup bond1`, it creates bond1 and the VLAN interface on
bond1 (bond1.100); it also executes `ifup br100` to add the bond VLAN
interface (bond1.100) to the bridge br100.

As you can see above, implicitly bringing up the upper interface helps,
but there can be cases where an upper interface (like br100) is not in
the right state, which can result in warnings. The warnings are mostly
harmless.

If you want to disable these warnings, you can disable the implicit
upper interface handling by setting `skip_upperifaces=1` in
`/etc/network/ifupdown2/ifupdown2.conf`.

With `skip_upperifaces=1`, you will have to explicitly execute `ifup` on
the upper interfaces. In this case, you will have to run `ifup br100`
after an `ifup bond1` to add bond1 back to bridge br100.

{{%notice note%}}

Although specifying a subinterface like swp1.100 and then running `ifup
swp1.100` will also result in the automatic creation of the swp1
interface in the kernel, Cumulus Networks recommends you specify the
parent interface swp1 as well. A parent interface is one where any
physical layer configuration can reside, such as `link-speed 1000` or
`link-duplex full`.

It's important to note that if you only create swp1.100 and not swp1,
then you cannot run `ifup swp1` since you did not specify it.

{{%/notice%}}

## Specifying User Commands

You can specify additional user commands in the `interfaces` file. As
shown in the example below, the interface stanzas in
`/etc/network/interfaces` can have a command that runs at pre-up, up,
post-up, pre-down, down, and post-down:

    auto swp1
    iface swp1
        address 12.0.0.1/30
        up /sbin/foo bar

Any valid command can be hooked in the sequencing of bringing an
interface up or down, although commands should be limited in scope to
network-related commands associated with the particular interface.

For example, it wouldn't make sense to install some Debian package on
`ifup` of swp1, even though that is technically possible. See `man
interfaces` for more details.

## Sourcing Interface File Snippets

Sourcing interface files helps organize and manage the `interfaces(5)`
file. For example:

    cumulus@switch:~$ cat /etc/network/interfaces
    # The loopback network interface
    auto lo
    iface lo inet loopback
    
    # The primary network interface
    auto eth0
    iface eth0 inet dhcp
    
    source /etc/network/interfaces.d/bond0

The contents of the sourced file used above are:

    cumulus@switch:~$ cat /etc/network/interfaces.d/bond0
    auto bond0
    iface bond0
        address 14.0.0.9/30
        address 2001:ded:beef:2::1/64
        bond-slaves swp25 swp26

## Using Globs for Port Lists

Some modules support globs to define port lists (that is, a range of
ports). You can use the `glob` keyword to specify bridge ports and bond
slaves:

    auto br0
    iface br0
        bridge-ports glob swp1-6.100
    
    auto br1
    iface br1
        bridge-ports glob swp7-9.100  swp11.100 glob swp15-18.100

## Using Templates

`ifupdown2` supports [Mako-style
templates](http://www.makotemplates.org/). The Mako template engine is
run over the `interfaces` file before parsing.

Use the template to declare cookie-cutter bridges in the `interfaces`
file:

    %for v in [11,12]:
    auto vlan${v}
    iface vlan${v}
        address 10.20.${v}.3/24
        bridge-ports glob swp19-20.${v}
        bridge-stp on
    %endfor

And use it to declare addresses in the `interfaces` file:

    %for i in [1,12]:
    auto swp${i}
    iface swp${i}
        address 10.20.${i}.3/24

{{%notice note%}}

Regarding Mako syntax, use square brackets (`[1,12]`) to specify a list
of individual numbers (in this case, 1 and 12). Use `range(1,12)` to
specify a range of interfaces.

{{%/notice%}}

{{%notice tip%}}

You can test your template and confirm it evaluates correctly by running
`mako-render /etc/network/interfaces`.

{{%/notice%}}

{{%notice tip%}}

For more examples of configuring Mako templates, read this [knowledge
base
article](https://support.cumulusnetworks.com/hc/en-us/articles/202868023).

{{%/notice%}}

## Adding Descriptions to Interfaces

You can add descriptions to the interfaces configured in
`/etc/network/interfaces` by using the *alias* keyword. For example:

    auto swp1
    iface swp1
        alias swp1 hypervisor_port_1

You can query interface descriptions by running `ip link show`. The
alias appears on the `alias` line:

    cumulus@switch$ ip link show swp1
    3: swp1: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc pfifo_fast state DOWN mode DEFAULT qlen 500
        link/ether aa:aa:aa:aa:aa:bc brd ff:ff:ff:ff:ff:ff
        alias hypervisor_port_1

Interface descriptions also appear in the [SNMP
OID](/Monitoring_System_Hardware.html#src-5118231_MonitoringSystemHardware-snmp)
[IF-MIB::ifAlias](http://www.net-snmp.org/docs/mibs/ifMIBObjects.html#ifAlias).

{{%notice note%}}

Aliases are limited to 256 characters.

{{%/notice%}}

<span id="src-5118370_ConfiguringandManagingNetworkInterfaces-caveats"></span>

## Caveats and Errata

While `ifupdown2` supports the inclusion of multiple `iface` stanzas for
the same interface, Cumulus Networks recommends you use a single `iface`
stanza for each interface, if possible.

There are cases where you must specify more than one `iface` stanza for
the same interface. For example, the configuration for a single
interface can come from many places, like a template or a sourced file.

If you do specify multiple `iface` stanzas for the same interface, make
sure the stanzas do not specify the same interface attributes.
Otherwise, unexpected behavior can result.

For example, swp1 is configured in two places:

    cumulus@switch:~$ cat /etc/network/interfaces
    
    source /etc/interfaces.d/speed_settings
    
    auto swp1
    iface swp1
      address 10.0.14.2/24

As well as `/etc/interfaces.d/speed_settings`

    cumulus@switch:~$ cat /etc/interfaces.d/speed_settings
    
    auto swp1
    iface swp1
      link-speed 1000
      link-duplex full

`ifupdown2` correctly parses a configuration like this because the same
attributes are not specified in multiple `iface` stanzas.

And, as stated in the note above, you cannot purge existing addresses on
interfaces with multiple `iface` stanzas.

## Useful Links

  - <http://wiki.debian.org/NetworkConfiguration>

  - <http://www.linuxfoundation.org/collaborate/workgroups/networking/bonding>

  - <http://www.linuxfoundation.org/collaborate/workgroups/networking/bridge>

  - <http://www.linuxfoundation.org/collaborate/workgroups/networking/vlan>
