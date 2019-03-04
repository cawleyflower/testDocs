# Using sudo to Delegate Privileges

By default, Cumulus Linux has two user accounts: *root* and *cumulus*.
The *cumulus* account is a normal user and is in the group *sudo*.

You can add more user accounts as needed. Like the *cumulus* account,
these accounts must use `sudo` to execute privileged commands.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [sudo Basics](#UsingsudotoDelegatePrivileges-sudoBasics)
-   [sudoers Examples](#UsingsudotoDelegatePrivileges-sudoersExamples)
-   [Related
    Information](#UsingsudotoDelegatePrivileges-RelatedInformation)

## sudo Basics

`sudo` allows you to execute a command as superuser or another user as
specified by the security policy. See `man sudo(8)` for details.

The default security policy is *sudoers*, which is configured using
`/etc/sudoers`. Use `/etc/sudoers.d/` to add to the default sudoers
policy. See `man sudoers(5)` for details.

Use `visudo` only to edit the `sudoers` file; do not use another editor
like `vi` or `emacs`. See `man` `visudo(8)` for details.

When creating a new file in `/etc/sudoers.d`, use `visudo -f`. This
option performs sanity checks before writing the file to avoid errors
that prevent sudo from working.

Errors in the `sudoers` file can result in losing the ability to elevate
privileges to root. You can fix this issue only by power cycling the
switch and booting into single user mode. Before modifying `sudoers`,
enable the root user by setting a password for the root user.

By default, users in the *sudo* group can use `sudo` to execute
privileged commands. To add users to the sudo group, use the
`useradd(8)` or `usermod(8)` command. To see which users belong to the
sudo group, see `/etc/group` (`man group(5)`).

Any command can be run as `sudo`, including `su`. A password is
required.

The example below shows how to use `sudo` as a non-privileged user
*cumulus* to bring up an interface:

``` text
cumulus@switch:~$ ip link show dev swp1
3: swp1: <BROADCAST,MULTICAST> mtu 1500 qdisc pfifo_fast master br0 state DOWN mode DEFAULT qlen 500
link/ether 44:38:39:00:27:9f brd ff:ff:ff:ff:ff:ff

cumulus@switch:~$ ip link set dev swp1 up
RTNETLINK answers: Operation not permitted

cumulus@switch:~$ sudo ip link set dev swp1 up
Password:

cumulus@switch:~$ ip link show dev swp1
3: swp1: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast master br0 state UP mode DEFAULT qlen 500
link/ether 44:38:39:00:27:9f brd ff:ff:ff:ff:ff:ff
```

## sudoers Examples

The following examples show how you grant as few privileges as necessary
to a user or group of users to allow them to perform the required task.
For each example, the system group *noc* is used; groups are prefixed
with an %.

When executed by an unprivileged user, the example commands below must
be prefixed with `sudo.`

<table>
<colgroup>
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
<col style="width: 25%" />
</colgroup>
<thead>
<tr class="header">
<th>Category</th>
<th>Privilege</th>
<th>Example Command</th>
<th>sudoers Entry</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Monitoring</td>
<td>Switch port info</td>
<td><pre><code>ethtool -m swp1
          </code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/ethtool</code></pre></td>
</tr>
<tr class="even">
<td>Monitoring</td>
<td>System diagnostics</td>
<td><pre><code>cl-support</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/cumulus/bin/cl-support</code></pre></td>
</tr>
<tr class="odd">
<td>Monitoring</td>
<td>Routing diagnostics</td>
<td><pre><code>cl-resource-query</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/cumulus/bin/cl-resource-query</code></pre></td>
</tr>
<tr class="even">
<td>Image management</td>
<td>Install images</td>
<td><pre><code>onie-select http://lab/install.bin</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/cumulus/bin/onie-select</code></pre></td>
</tr>
<tr class="odd">
<td>Package management</td>
<td>Any apt-get command</td>
<td><pre><code>apt-get update or apt-get install</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/bin/apt-get</code></pre></td>
</tr>
<tr class="even">
<td>Package management</td>
<td>Just apt-get update</td>
<td><pre><code>apt-get update</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/bin/apt-get update</code></pre></td>
</tr>
<tr class="odd">
<td>Package management</td>
<td>Install packages</td>
<td><pre><code>apt-get install vim</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/bin/apt-get install *</code></pre></td>
</tr>
<tr class="even">
<td>Package management</td>
<td>Upgrading</td>
<td><pre><code>apt-get upgrade</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/bin/apt-get upgrade</code></pre></td>
</tr>
<tr class="odd">
<td>Netfilter</td>
<td>Install ACL policies</td>
<td><pre><code>cl-acltool -i</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/cumulus/bin/cl-acltool</code></pre></td>
</tr>
<tr class="even">
<td>Netfilter</td>
<td>List iptables rules</td>
<td><pre><code>iptables -L</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/iptables</code></pre></td>
</tr>
<tr class="odd">
<td>L1 + 2 features</td>
<td>Any LLDP command</td>
<td><pre><code>lldpcli show neighbors / configure</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/sbin/lldpcli</code></pre></td>
</tr>
<tr class="even">
<td>L1 + 2 features</td>
<td>Just show neighbors</td>
<td><pre><code>lldpcli show neighbors</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/sbin/lldpcli show neighbors*</code></pre></td>
</tr>
<tr class="odd">
<td>Interfaces</td>
<td>Modify any interface</td>
<td><pre><code>ip link set dev swp1 {up|down}</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/ip link set *</code></pre></td>
</tr>
<tr class="even">
<td>Interfaces</td>
<td>Up any interface</td>
<td><pre><code>ifup swp1</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/ifup</code></pre></td>
</tr>
<tr class="odd">
<td>Interfaces</td>
<td>Down any interface</td>
<td><pre><code>ifdown swp1</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/ifdown</code></pre></td>
</tr>
<tr class="even">
<td>Interfaces</td>
<td>Up/down only swp2</td>
<td><pre><code>ifup swp2 / ifdown swp2</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/ifup swp2,/sbin/ifdown swp2</code></pre></td>
</tr>
<tr class="odd">
<td>Interfaces</td>
<td>Any IP address chg</td>
<td><pre><code>ip addr {add|del} 192.0.2.1/30 dev swp1</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/ip addr *</code></pre></td>
</tr>
<tr class="even">
<td>Interfaces</td>
<td>Only set IP address</td>
<td><pre><code>ip addr add 192.0.2.1/30 dev swp1</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/ip addr add *</code></pre></td>
</tr>
<tr class="odd">
<td>Ethernet bridging</td>
<td>Any bridge command</td>
<td><pre><code>brctl addbr br0 / brctl delif br0 swp1</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/brctl</code></pre></td>
</tr>
<tr class="even">
<td>Ethernet bridging</td>
<td>Add bridges and ints</td>
<td><pre><code>brctl addbr br0 / brctl addif br0 swp1</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/brctl addbr *,/sbin/brctl addif *</code></pre></td>
</tr>
<tr class="odd">
<td>Spanning tree</td>
<td>Set STP properties</td>
<td><pre><code>mstpctl setmaxage br2 20</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/sbin/mstpctl</code></pre></td>
</tr>
<tr class="even">
<td>Troubleshooting</td>
<td>Restart switchd</td>
<td><pre><code>systemctl restart switchd.service</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/sbin/service switchd *</code></pre></td>
</tr>
<tr class="odd">
<td>Troubleshooting</td>
<td>Restart any service</td>
<td><pre><code>systemctl cron switchd.service</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/sbin/service</code></pre></td>
</tr>
<tr class="even">
<td>Troubleshooting</td>
<td>Packet capture</td>
<td><pre><code>tcpdump</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/sbin/tcpdump</code></pre></td>
</tr>
<tr class="odd">
<td>L3</td>
<td>Add static routes</td>
<td><pre><code>ip route add 10.2.0.0/16 via 10.0.0.1</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/bin/ip route add *</code></pre></td>
</tr>
<tr class="even">
<td>L3</td>
<td>Delete static routes</td>
<td><pre><code>ip route del 10.2.0.0/16 via 10.0.0.1</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/bin/ip route del *</code></pre></td>
</tr>
<tr class="odd">
<td>L3</td>
<td>Any static route chg</td>
<td><pre><code>ip route *</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/bin/ip route *</code></pre></td>
</tr>
<tr class="even">
<td>L3</td>
<td>Any iproute command</td>
<td><pre><code>ip *</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/bin/ip</code></pre></td>
</tr>
<tr class="odd">
<td>L3</td>
<td>Non-modal OSPF</td>
<td><pre><code>cl-ospf area 0.0.0.1 range 10.0.0.0/24</code></pre></td>
<td><pre><code>%noc ALL=(ALL) NOPASSWD:/usr/bin/cl-ospf</code></pre></td>
</tr>
</tbody>
</table>

## Related Information

-   [sudo](https://wiki.debian.org/sudo)
-   [Adding Yourself to
    sudoers](http://rubypond.com/blog/adding-yourself-to-the-sudoers-file)
