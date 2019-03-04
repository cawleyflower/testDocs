# TACACS Plus

Cumulus Linux implements TACACS+ client AAA (Accounting, Authentication,
and Authorization) in a transparent way with minimal configuration. The
client implements the TACACS+ protocol as described in [this IETF
document](https://tools.ietf.org/html/draft-grant-tacacs-02). There is
no need to create accounts or directories on the switch. Accounting
records are sent to all configured TACACS+ servers by default. Use of
per-command authorization requires additional setup on the switch.

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes ...

-   [Supported Features](#TACACSPlus-SupportedFeatures)
-   [Install the TACACS+ Client
    Packages](#TACACSPlus-InstalltheTACACS+ClientPackages)
-   [Configure the TACACS+
    Client](#TACACSPlus-ConfiguretheTACACS+Client)
-   [TACACS+ Authentication
    (login)](#TACACSPlus-TACACS+Authentication(login))
-   [Local Fallback
    Authentication](#TACACSPlus-fallback-authLocalFallbackAuthentication)
-   [TACACS+ Accounting](#TACACSPlus-TACACS+Accounting)
-   [Configure NCLU for TACACS+
    Users](#TACACSPlus-ncluConfigureNCLUforTACACS+Users)
-   [TACACS+ Per-command
    Authorization](#TACACSPlus-TACACS+Per-commandAuthorization)
-   [NSS Plugin](#TACACSPlus-NSSPlugin)
-   [TACACS Configuration
    Parameters](#TACACSPlus-TACACS_config_paramsTACACSConfigurationParameters)
-   [Remove the TACACS+ Client
    Packages](#TACACSPlus-RemovetheTACACS+ClientPackages)
-   [Troubleshooting](#TACACSPlus-Troubleshooting)
    -   [Basic Server Connectivity or NSS
        Issues](#TACACSPlus-BasicServerConnectivityorNSSIssues)
    -   [Issues with Per-command
        Authorization](#TACACSPlus-IssueswithPer-commandAuthorization)
    -   [Debug Issues with Accounting
        Records](#TACACSPlus-DebugIssueswithAccountingRecords)
    -   [TACACS Component Software
        Descriptions](#TACACSPlus-TACACSComponentSoftwareDescriptions)
-   [Limitations](#TACACSPlus-Limitations)
    -   [TACACS+ Client Is only Supported through the Management
        Interface](#TACACSPlus-TACACS+ClientIsonlySupportedthroughtheManagementInterface)
    -   [Multiple TACACS+ Users](#TACACSPlus-MultipleTACACS+Users)
    -   [Issues with deluser
        Command](#TACACSPlus-IssueswithdeluserCommand)

## Supported Features

-   Authentication using PAM; includes `login`, `ssh`, `sudo` and `su`
-   Runs over the eth0 management interface

-   Ability to run in the [management VRF](Management_VRF)
-   TACACS+ privilege 15 users can run any command with sudo using
    the `/etc/sudoers.d/tacplus` file that is installed by
    the `libtacplus-map1` package
-   Up to seven TACACS+ servers

## Install the TACACS+ Client Packages

TACACS+ requires the following packages to be installed on Cumulus
Linux. These packages are not part of the base Cumulus Linux image
installation.

To install all required packages, run these commands:

``` text
cumulus@switch:~$ sudo -E apt-get update
cumulus@switch:~$ sudo -E apt-get install tacplus-client
```

## Configure the TACACS+ Client

After installing TACACS+, edit the `/etc/tacplus_servers` file to add at
least one server and one shared secret (key). You can specify the
`server` and secret parameters in any order anywhere in the file.
Whitespace (spaces or tabs) are not allowed. For example, if your
TACACS+ server IP address is `192.168.0.30` and your shared secret is
`tacacskey`, add these parameters to the `/etc/tacplus_servers` file:

``` text
secret=tacacskey
server=192.168.0.30
```

Cumulus Linux supports a maximum of seven TACACS+ servers.

To specify multiple servers, they can be added, one per line,
to the `/etc/tacplus_servers` file. 

Connections are made in the order in which they are listed in this file.
In most cases, you do not need to change any other parameters. You can
add parameters used by any of the packages to this file, which affects
all the TACACS+ client software. For example, the timeout value for NSS
lookups (see description below) is set to 5 seconds by default  in the
`/etc/tacplus_nss.conf` file, whereas the timeout value for other
packages is 10 seconds and is set in the `/etc/tacplus_servers` file.
The timeout value is per connection to the TACACS+ servers. (If
authorization is configured per command, the timeout occurs
for *each* command.) There are several (typically four) connections to
the server per login attempt from PAM, as well as two or more through
NSS. Therefore, with the default timeout values, a TACACS+ server that
is not reachable can delay logins by a minute or more per unreachable
server. If you must list unreachable TACACS+ servers, place them at the
end of the server list and consider reducing the timeout values.

When you add or remove TACACS+ servers, you must restart `auditd`  (with
the  `systemctl restart auditd` command) or you must send a signal
(with `killall -HUP audisp-tacplus`) before `audisp-tacplus`  rereads
the configuration to see the changed server list.

You can also configure the IP address used as the source IP address when
communicating with the TACACS+ server. See [TACACS Configuration
Parameters](#TACACSPlus-TACACS_config_params) below for the full list of
TACACS+ parameters.

Following is the complete list of the TACACS+ client configuration
files, and their use.

| Filename                                | Description                                                                                                                                                                                                                                                                                                                                                                                          |
|-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /etc/tacplus\_servers                   | This is the primary file that requires configuration after installation. The file is used by all packages with `include=/etc/tacplus_servers` parameters in the other configuration files that are installed. Typically, this file contains the shared secrets; make sure that the Linux file mode is 600.                                                                                           |
| /etc/nsswitch.conf                      | When the `libnss_tacplus` package is installed, this file is configured to enable tacplus lookups via `libnss_tacplus`.  If you replace this file by automation or other means, you need to add tacplus as the first lookup method for the *passwd * database line.                                                                                                                                  |
| /etc/tacplus\_nss.conf                  | This file sets the basic parameters for `libnss_tacplus`. It includes a debug variable for debugging NSS lookups separately from other client packages.                                                                                                                                                                                                                                              |
| /usr/share/pam-configs/tacplus          | This is the configuration file for `pam-auth-update` to generate the files in the next row. These configurations are used at `login`, by `su`, and by `ssh`.                                                                                                                                                                                                                                         |
| /etc/pam.d/common-\*                    | The `/etc/pam.d/common-*` files are updated for `tacplus` authentication. The files are updated with `pam-auth-update`, when `libpam-tacplus` is installed or removed.                                                                                                                                                                                                                               |
| /etc/sudoers.d/tacplus                  | This file allows TACACS+ privilege level 15 users to run commands with `sudo`. The file includes an example (commented out) of how to enable privilege level 15 TACACS users to use `sudo` without having to enter a password and provides an example of how to enable all TACACS users to run specific commands with sudo. Only edit this wile with the command *visudo -f /etc/sudoers.d/tacplus.* |
|  audisp-tacplus.conf                    | This is the `audisp` plugin configuration file. Typically, no modifications are required.                                                                                                                                                                                                                                                                                                            |
| /etc/audisp/audisp-tac\_plus.conf       | This is the TACACS+ server configuration file for accounting. Typically, no modifications are required. You can use this configuration file when you only want to debug TACACS+ accounting issues, not all TACACS+ users.                                                                                                                                                                            |
| /etc/audit/rules.d/audisp-tacplus.rules | The `auditd` rules for TACACS+ accounting.  The `augenrules` command uses all rule files to generate the rules file (described below).                                                                                                                                                                                                                                                               |
| /etc/audit/audit.rules                  | This is the audit rules file generated when `auditd` is installed.                                                                                                                                                                                                                                                                                                                                   |

You can edit the `/etc/pam.d/common-*` files manually. However, if you
run `pam-auth-update` again after making the changes, the update fails.
Only perform configuration in `/usr/share/pam-configs/tacplus`, then run
`pam-auth-update`.

## TACACS+ Authentication (login)

The initial authentication configuration is done through the PAM modules
and an updated version of the `libpam-tacplus` package. When the package
is installed, the PAM configuration is updated in `/etc/pam.d` with
the `pam-auth-update` command. If you have made changes to your PAM
configuration, you need to integrate these changes yourself. If you are
also using LDAP with the `libpam-ldap `package, you might need to edit
the PAM configuration to ensure the LDAP and TACACS ordering that you
prefer. The `libpam-tacplus` are configured to skip over rules and the
values in the `success=2 `might require adjustments to skip over LDAP
rules.

A user privilege level is determined by the TACACS+ privilege attribute
`priv_lvl` for the user that is returned by the TACACS+ server during
the user authorization exchange. The client accepts the attribute in
either the mandatory or optional forms and also accepts `priv-lvl` as
the attribute name. The attribute value must be a numeric string in the
range 0 to 15, with 15 the most privileged level.

By default, TACACS+ users at privilege levels other than 15 are not
allowed to run `sudo` commands and are limited to commands that can be
run with standard Linux user permissions.

## Local Fallback Authentication

If a site wants to allow local fallback authentication for a user when
none of the TACACS servers can be reached, you can add a privileged user
account as a local account on the switch. 

To configure local fallback authentication:

1.  Edit the `/etc/nsswitch.conf` file to remove the keyword `tacplus`
    from the line starting with `passwd`. (You need to add the keyword
    back in step 3.)

    An example of the `/etc/nsswitch.conf` file with the
    keyword `tacplus` removed from the line starting with `passwd` is
    shown below.

    ``` text
    cumulus@switch:~$ sudo vi /etc/nsswitch.conf
    #
    # Example configuration of GNU Name Service Switch functionality.
    # If you have the `glibc-doc-reference' and `info' packages installed, try:
    # `info libc "Name Service Switch"' for information about this file.
    passwd:         compat
    group:          compat
    shadow:         compat
    gshadow:        files
    ...
    ```

2.  To enable the local privileged user to run `sudo` and NCLU commands,
    run the `adduser` commands shown below. In the example commands, the
    TACACS account name is tacadmin. 

    The first `adduser` command prompts for information and a password.
    You can skip most of the requested information by pressing ENTER.

    ``` text
    cumulus@switch:~$ sudo adduser --ingroup tacacs tacadmin
    cumulus@switch:~$ sudo adduser tacadmin netedit
    cumulus@switch:~$ sudo adduser tacadmin sudo
    ```

3.  Edit the `/etc/nsswitch.conf` file to add the keyword `tacplus` back
    to the line starting with `passwd` (the keyword you removed in the
    first step).
4.  Restart the `netd` service with the following command:

    ``` text
    cumulus@switch:~$ sudo systemctl restart netd
    ```

## TACACS+ Accounting

TACACS+ accounting is implemented with the `audisp` module, with an
additional plugin for `auditd`/`audisp`. The plugin maps the auid in the
accounting record to a TACACS login, based on the `auid` and
`sessionid`. The `audisp` module requires `libnss_tacplus` and uses
the `libtacplus_map.so` library interfaces as part of the modified
`lipam_tacplus` package.

Communication with the TACACS+ servers is done with the
`libsimple-tacact1` library, through `dlopen()`. A maximum of 240 bytes
of command name and arguments are sent in the accounting record, due to
the TACACS+ field length limitation of 255 bytes.

All Linux commands result in an accounting record, including commands
run as part of the login process or as sub-processes of other
commands. This can sometimes generate a large number of accounting
records.

Configure the IP address and encryption key of the server  in the
`/etc/tacplus_servers` file. Minimal configuration to `auditd` and
`audisp` is necessary to enable the audit records necessary for
accounting. These records are installed as part of the package.

`audisp-tacplus` installs the audit rules for command accounting.
Modifying the configuration files is not usually necessary. However,
when a [management VRF](Management_VRF) is configured, the accounting
configuration does need special modification because the `auditd`
service starts prior to networking. It is necessary to add the *vrf*
parameter and to signal the `audisp-tacplus` process to reread the
configuration. The example below shows that the management VRF is
named *mgmt*. You can place the *vrf* parameter in either
the `/etc/tacplus_servers` file or in
the `/etc/audisp/audisp-tac_plus.conf` file.

``` text
vrf=mgmt
```

After editing the configuration file, send the **HUP**
signal `killall -HUP audisp-tacplus` to notify the accounting process to
reread the file.

All `sudo` commands run by TACACS+ users generate accounting records
against the original TACACS+ login name.

For more information, refer to the `audisp.8` and `auditd.8` man pages.

## Configure NCLU for TACACS+ Users

When you install or upgrade TACACS+ packages, mapped user accounts are
created automatically. All *tacacs0* through *tacacs15* users are added
to the *netshow* group.

In order for any TACACS+ users to execute `net add`, `net del`, and
`net commit` commands and to restart services with NCLU, you need to add
those users to the `users_with_edit` variable in the `/etc/netd.conf`
file. Cumulus Networks recommends you add the *tacacs15* user and,
depending upon your policies, other users (*tacacs1* through *tacacs14*)
to this variable. 

To give a TACACS+ user access to the show commands, add the *tacacs*
group to the `groups_with_show` variable.

Do not add the *tacacs* group to the `groups_with_edit` variable; this
is dangerous and can potentially enable any user to log into the switch
as the root user.

To add the users, edit the `/etc/netd.conf` file:

``` text
cumulus@switch:~$ sudo nano /etc/netd.conf
  
...
  
# Control which users/groups are allowed to run "add", "del",
# "clear", "abort", and "commit" commands.
users_with_edit = root, cumulus, tacacs15
groups_with_edit = netedit
  
# Control which users/groups are allowed to run "show" commands
users_with_show = root, cumulus
groups_with_show = netshow, netedit, tacacs
  
...
```

After you save and exit the `netd.conf` file, restart the `netd`
service. Run:

``` text
cumulus@switch:~$ sudo systemctl restart netd
```

## TACACS+ Per-command Authorization

The `tacplus-auth` command handles the per-command authorization. To
make this an enforced authorization, you must change the TACACS+ login
to use a restricted shell, with a very limited executable search path.
Otherwise, the user can bypass the authorization. The `tacplus-restrict`
utility simplifies the setup of the restricted environment. The example
below initializes the environment for the *tacacs0* user account. This
is the account used for TACACS+ users at privilege level `0`. 

``` text
tacuser0@switch:~$ sudo tacplus-restrict -i -u tacacs0 -a command1 command2 ... commandN
```

If the user/command combination is not authorized by the TACACS+ server,
a message similar to the following displays:

``` text
tacuser0@switch:~$ net show version
net not authorized by TACACS+ with given arguments, not executing
```

The following table provides the command options:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>-i</td>
<td>Initializes the environment. You only need to issue this option once per username.</td>
</tr>
<tr class="even">
<td>-a</td>
<td>You can invoke the utility with the <code>-a</code> option as many times as desired. For each command in the <code>-a</code> list, a symbolic link is created from <code>tacplus-auth</code> to the relative portion of the command name in the local <code>bin</code> subdirectory. You also need to enable these commands on the TACACS+ server (refer to the TACACS+ server documentation). It is common to have the server allow some options to a command, but not others.</td>
</tr>
<tr class="odd">
<td>-f</td>
<td><p>Re-initializes the environment. If you need to restart, issue the <code>-f</code> option with <code>-i</code> to force the re-initialization; otherwise, repeated use of <code>-i</code> is ignored.</p>
<p>As part of the initialization:</p>
<ul>
<li>The user's shell is changed to <code>/bin/rbash</code>.</li>
<li>Any existing dot files are saved.</li>
<li>A limited environment is set up that does not allow general command execution, but instead allows only commands from the user's local <code>bin</code> subdirectory.</li>
</ul></td>
</tr>
</tbody>
</table>

For example, if you want to allow the user to be able to run the `net`
and `ip` commands (if authorized by the TACACS+ server), use the
command:

``` text
cumulus@switch:~$ sudo tacplus-restrict -i -u tacacs0 -a ip net
```

After running this command, examine the `tacacs0` directory::

``` text
cumulus@switch:~$ sudo ls -lR ~tacacs0
total 12
lrwxrwxrwx 1 root root 22 Nov 21 22:07 ip -> /usr/sbin/tacplus-auth
lrwxrwxrwx 1 root root 22 Nov 21 22:07 net -> /usr/sbin/tacplus-auth
```

Other than shell built-ins, the only two commands the privilege level 0
TACACS users can run are the `ip` and `net` commands.

If you mistakenly add potential commands with the `-a` option, you can
remove them. The example below shows how to remove the `net` command:

``` plain
cumulus@switch:~$ sudo rm ~tacacs0/bin/net
```

You can remove all commands as follows:

``` plain
cumulus@switch:~$ sudo rm ~tacacs0/bin/*
```

Use the `man` command on the switch for more information
on `tacplus-auth` and `tacplus-restrict`.

``` plain
cumulus@switch:~$ man tacplus-auth tacplus-restrict
```

## NSS Plugin

When used with `pam_tacplus`, TACACS+ authenticated users can log in
without a local account on the system using the NSS plugin that comes
with the `tacplus_nss` package. The plugin uses the
mapped `tacplus` information if the user is not found in the local
password file, provides the `getpwnam()` and `getpwuid()`entry point,s
and uses the TACACS+ authentication functions.

The plugin asks the TACACS+ server if the user is known, and then for
relevant attributes to determine the privilege level of the user. When
the `libnss_tacplus` package is installed, `nsswitch.conf` is modified
to set `tacplus` as the first lookup method for `passwd`. If the order
is changed, lookups return the local accounts, such as `tacacs0`

If the user is not found, a mapped lookup is performed using the
`libtacplus.so` exported functions. The privilege level is appended to
`tacacs` and the lookup searches for the name in the local password
file. For example, privilege level 15 searches for the tacacs15 user. If
the user is found, the password structure is filled in with information
for the user.

If the user is not found, the privilege level is decremented and checked
again until privilege level 0 (user t`acacs0`) is reached. This allows
use of only the two local users `tacacs0` and `tacacs15`, if minimal
configuration is desired.

## TACACS Configuration Parameters

The recognized configuration options are the same as the
`libpam_tacplus` command line arguments; however, not all `pam_tacplus`
options are supported. These configuration parameters are documented in
the `tacplus_servers.5` man page, which is part of the `libpam-tacplus`
package.

The table below describes the configuration options available:

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Configuration Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>debug</td>
<td><p>The output debugging information through <code>syslog(3)</code>.</p>
<div>
<div>
<p>Debugging is heavy, including passwords. Do not leave debugging enabled on a production switch after you have completed troubleshooting.</p>
</div>
</div></td>
</tr>
<tr class="even">
<td>secret=STRING</td>
<td>The secret key used to encrypt and decrypt packets sent to and received from the server. You can specify the secret key more than once in any order with respect to the server= parameter.  When fewer secret= parameters are specified, the last secret given is used for the remaining servers. Only use this parameter in files such as <code>/etc/tacplus_servers</code> that are not world readable.</td>
</tr>
<tr class="odd">
<td><p>server=HOSTNAME</p>
<p>server=IP_ADDR</p></td>
<td><p>Adds a TACACS+ server to the servers list. Servers are queried in turn until a match is found, or no servers remain in the list. Can be specified up to 7 times. An IP address can be optionally followed by a port number, preceded by a ":".  The default port is 49.</p>
<div>
<div>
<p>When sending accounting records, the record is sent to all servers in the list if <code>acct_all=1,</code> which is the default.</p>
</div>
</div></td>
</tr>
<tr class="even">
<td><p>source_ip=IPv4_ADDRESS</p></td>
<td><p>Sets the IP address used as the source IP address when communicating with the TACACS+ server. You must specify an IPv4 address. IPv6 addresses and hostnames are not supported. The address must must be valid for the interface being used.</p></td>
</tr>
<tr class="odd">
<td>timeout=SECONDS</td>
<td>TACACS+ server(s) communication timeout. This parameter defaults to 10 seconds in the <code>/etc/tacplus_servers</code> file, but defaults to 5 seconds in the <code>/etc/tacplus_nss.conf</code> file.</td>
</tr>
<tr class="even">
<td>include=/file/name</td>
<td>A supplemental configuration file to avoid duplicating configuration information. You can include up to 8 more configuration files.</td>
</tr>
<tr class="odd">
<td>min_uid=value</td>
<td>The minimum user ID that the NSS plugin looks up. Setting it to <em>0</em> means uid 0 (root) is never looked up, which is desirable for performance reasons. The value should not be greater than the local TACACS+ user IDs (0 through 15), to ensure they can be looked up.</td>
</tr>
<tr class="even">
<td>exclude_users=user1,user2,...</td>
<td><p>A comma-separated list of usernames that are never looked up by the NSS plugin, set in the <code>tacplus_nss.conf</code> file. You cannot use * (asterisk) as a wild card in the list. While it's not a legal username, bash may lookup this as a user name during pathname completion, so it is included in this list as a username string.</p>
<div>
<div>
<p>Cumulus Networks strongly recommends that you do <strong>not</strong> remove the <em>cumulus</em> user from the <code>exclude_users</code> list, because doing so can make it impossible to log in as the cumulus user, which is the primary administrative account in Cumulus Linux.</p>
<p>If you do remove the cumulus user, Cumulus Networks recommends you add some other local fallback user that does not rely on TACACS but is a member of sudo and netedit groups, so that these accounts can run <code>sudo</code> and NCLU commands.</p>
</div>
</div></td>
</tr>
<tr class="odd">
<td>login=STRING</td>
<td><p>TACACS+ authentication service (pap, chap, or login). The default value is <em>pap</em>.</p></td>
</tr>
<tr class="even">
<td>user_homedir=1</td>
<td><p>This is not enabled by default. When enabled, a separate home directory for each TACACS+ user is created when the TACACS+ user first logs in. By default, the home directory in the mapping accounts in <code>/etc/passwd</code> (<code>/home/tacacs0</code> ... <code>/home/tacacs15</code>) is used. If the home directory does not exist, it is created with the <code>mkhomedir_helper</code> program, in the same manner as <code>pam_mkhomedir</code>.</p>
<p>This option is not honored for accounts with restricted shells when per-command authorization is enabled.</p></td>
</tr>
<tr class="odd">
<td>acct_all=1</td>
<td><p>Configuration option for <code>audisp_tacplus</code> and <code>pam_tacplus</code> sending accounting records to all supplied servers (1), or the first server to respond (0). The default value is <em>1</em>.</p></td>
</tr>
<tr class="even">
<td>timeout=<strong>SECS</strong></td>
<td>Sets the timeout in seconds for connections to each TACACS+ server.   The default is 10 seconds for all lookups except that NSS lookups use a 5 second timeout.</td>
</tr>
<tr class="odd">
<td>vrf=<strong>VRFNAME</strong></td>
<td><p>If the management network is in a VRF, set this variable to the VRF name. This  would  usually  be  "mgmt".  When this variable is set, the connection to the TACACS+ accounting servers is made through the named VRF.</p></td>
</tr>
<tr class="even">
<td>service</td>
<td><p>TACACS+ accounting and authorization service. Examples include shell, pap, raccess, ppp, and slip.</p>
<p>The default value is <em>shell</em>.</p></td>
</tr>
<tr class="odd">
<td>protocol</td>
<td><p>TACACS+ protocol field. This option is use dependent.</p>
<p>PAM uses the SSH protocol.</p></td>
</tr>
</tbody>
</table>

## Remove the TACACS+ Client Packages

To remove all of the TACACS+ client packages, use the following
commands:

``` plain
cumulus@switch:~$ sudo -E apt-get remove tacplus-client
cumulus@switch:~$ sudo -E apt-get autoremove
```

To remove the TACACS+ client configuration files as well as the packages
(recommended), use this command:

``` plain
cumulus@switch:~$ sudo -E apt-get autoremove --purge
```

## Troubleshooting

### Basic Server Connectivity or NSS Issues

You can use the `getent` command to determine if TACACS+ is configured
correctly and if the local password is stored in the configuration
files. In the example commands below, the cumulus user represents the
local user, while cumulusTAC represents the TACACS user.

To look up the username within all NSS methods:

``` plain
cumulus@switch:~$ sudo getent passwd cumulusTAC
cumulusTAC:x:1016:1001:TACACS+ mapped user at privilege level 15,,,:/home/tacacs15:/bin/bash
```

To look up the user within the local database only:

``` plain
cumulus@switch:~$ sudo getent -s compat passwd cumulus
cumulus:x:1000:1000:cumulus,,,:/home/cumulus:/bin/bash
```

To look up the user within the TACACS+ database only:

``` plain
cumulus@switch:~$ sudo getent -s tacplus passwd cumulusTAC
cumulusTAC:x:1016:1001:TACACS+ mapped user at privilege level 15,,,:/home/tacacs15:/bin/bash
```

If TACACS does not appear to be working correctly, debug the following
configuration files by adding the *debug=1* parameter to one or more of
these files:

-   /etc/tacplus\_servers

-   /etc/tacplus\_nss.conf

*`You can also add` debug=1* to individual `pam_tacplus` lines in
`/etc/pam.d/common*`.

All log messages are stored in `/var/log/syslog`.

#### Incorrect Shared Key

The TACACS client on the switch and the TACACS server should have the
same shared secret key. If this key is incorrect, the following message
is printed to `syslog`:

``` text
2017-09-05T19:57:00.356520+00:00 leaf01 sshd[3176]: nss_tacplus: TACACS+ server 192.168.0.254:49 read failed with protocol error (incorrect shared secret?) user cumulus 
```

### Issues with Per-command Authorization

To debug TACACS user command authorization, have the TACACS+ user enter
the following command at a shell prompt, then try the command again:

``` plain
tacuser0@switch:~$ export TACACSAUTHDEBUG=1 
```

When this debugging is enabled, additional information is shown for the
command authorization conversation with the TACACS+ server:

``` plain
tacuser0@switch:~$ net pending
tacplus-auth: found matching command (/usr/bin/net) request authorization
tacplus-auth: error connecting to 10.0.3.195:49 to request authorization for net: Transport endpoint is not connected
tacplus-auth: cmd not authorized (16)
tacplus-auth: net not authorized from 192.168.3.189:49
net not authorized by TACACS+ with given arguments, not executing

tacuser0@switch:~$ net show version
tacplus-auth: found matching command (/usr/bin/net) request authorization
tacplus-auth: error connecting to 10.0.3.195:49 to request authorization for net: Transport endpoint is not connected
tacplus-auth: 192.168.3.189:49 authorized command net
tacplus-auth: net authorized, executing
DISTRIB_ID="Cumulus Linux"
DISTRIB_RELEASE=3.4.0
DISTRIB_DESCRIPTION="Cumulus Linux 3.4.0"
```

To disable debugging:

``` plain
tacuser0@switch:~$ export -n TACACSAUTHDEBUG
```

### Debug Issues with Accounting Records

If you have added or deleted TACACS+ servers from the configuration
files, make sure you notify the `audisp` plugin with this command:

``` plain
cumulus@switch:~$ sudo killall -HUP audisp-tacplus
```

If accounting records are still not being sent, add *debug=1* to
the `/etc/audisp/audisp-tac_plus.conf `file, then issue the command
above to notify the plugin. Ask the TACACS+ user to run a command and
examine the end of `/var/log/syslog` for messages from the plugin. You
can also check the auditing log file `/var/log/audit/audit.log` to be
sure the auditing records are being written.  If they are not, restart
the audit daemon with:

``` plain
cumulus@switch:~$ sudo systemctl restart auditd.service
```

### TACACS Component Software Descriptions

The following table describes the different pieces of software involved
with delivering TACACS.

<table>
<colgroup>
<col style="width: 50%" />
<col style="width: 50%" />
</colgroup>
<thead>
<tr class="header">
<th>Package Name</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>audisp-tacplus_1.0.0-1-cl3u3</td>
<td>This package uses auditing data from <code>auditd</code> to send accounting records to the TACACS+ server and is started as part of <code>auditd</code>.</td>
</tr>
<tr class="even">
<td>libtac2_1.4.0-cl3u2</td>
<td>Basic TACACS+ server utility and communications routines.</td>
</tr>
<tr class="odd">
<td>libnss-tacplus_1.0.1-cl3u3</td>
<td>Provides an interface between <code>libc</code> username lookups, the mapping functions, and the TACACS+ server.</td>
</tr>
<tr class="even">
<td>tacplus-auth-1.0.0-cl3u1</td>
<td>This package includes the tacplus-restrict setup utility, which enables you to perform per-command TACACS+ authorization. Per-command authorization is not done by default.</td>
</tr>
<tr class="odd">
<td>libpam-tacplus_1.4.0-1-cl3u2</td>
<td>A modified version of the standard Debian package.</td>
</tr>
<tr class="even">
<td>libtacplus-map1_1.0.0-cl3u2</td>
<td>The mapping functionality between local and TACACS+ users on the server. Sets the immutable <code>sessionid</code> and auditing UID to ensure the original user can be tracked through multiple processes and privilege changes. Sets the auditing <code>loginuid</code> as immutable if supported. Creates and maintains a status database in <code>/run/tacacs_client_map</code> to manage and lookup mappings.</td>
</tr>
<tr class="odd">
<td>libsimple-tacacct1_1.0.0-cl3u2</td>
<td>Provides an interface for programs to send accounting records to the TACACS+ server. Used by <code>audisp-tacplus</code>.</td>
</tr>
<tr class="even">
<td>libtac2-bin_1.4.0-cl3u2
<p> </p></td>
<td>Provides the <code>tacc</code> testing program and TACACS+ man page.</td>
</tr>
</tbody>
</table>

## Limitations

### TACACS+ Client Is only Supported through the Management Interface

The TACACS+ client is only supported through the management interface on
the switch: eth0, eth1, or the VRF management interface. The TACACS+
client is not supported through bonds, switch virtual interfaces (SVIs),
or switch port interfaces (swp).

### Multiple TACACS+ Users

If two or more TACACS+ users are logged in simultaneously with the same
privilege level, while the accounting records are maintained correctly,
a lookup on either name will match both users, while a UID lookup will
only return the user that logged in first.

This means that any processes run by either user will be attributed to
both, and all files created by either user will be attributed to the
first name matched. This is similar to adding two local users to the
password file with the same UID and GID, and is an inherent limitation
of using the UID for the base user from the password file.

The current algorithm returns the first name matching the UID from the
mapping file; this can be the first or the second user that logged in.

To work around this issue, you can use the switch audit log or the
TACACS server accounting logs to determine which processes and files are
created by each user.

-   For commands that do not execute other commands (for example,
    changes to configurations in an editor, or actions with tools like
    `clagctl` and `vtysh`), no additional accounting is done.

-   Per-command authorization is implemented at the most basic level
    (commands are permitted or denied based on the standard Linux user
    permissions for the local TACACS users and only privilege level 15
    users can run `sudo` commands by default).

The Linux `auditd` system does not always generate audit events for
processes when terminated with a signal (with the `kill` system call or
internal errors such as SIGSEGV). As a result, processes that exit on a
signal that is not caught and handled, might not generate a STOP
accounting record.

### Issues with deluser Command

TACACS+ and other non-local users that run the `deluser` command with
the `--remove-home` option will see an error about not finding the user
in `/etc/passwd`:

``` text
tacuser0@switch: deluser --remove-home USERNAME
userdel: cannot remove entry ‘USERNAME’ from /etc/passwd
/usr/sbin/deluser: `/usr/sbin/userdel USERNAME' returned error code 1. Exiting
```

However, the command does remove the home directory. The user can still
log in on that account, but will not have a valid home directory. This
is a known upstream issue with the `deluser` command for all non-local
users.

Only use the `--remove-home` option when the `user_homedir=1`
configuration command is in use. 

 
