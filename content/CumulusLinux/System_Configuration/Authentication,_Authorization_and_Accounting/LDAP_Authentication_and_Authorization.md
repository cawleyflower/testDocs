---
title: LDAP Authentication and Authorization
author: Unknown
weight: 279
pageID: 8362556
aliases:
 - /old/LDAP_Authentication_and_Authorization.html
---
# LDAP Authentication and Authorization

Cumulus Linux uses Pluggable Authentication Modules (PAM) and Name
Service Switch (NSS) for user authentication.

NSS specifies the order of information sources used to resolve names for
each service. Using this with authentication and authorization, it
provides the order and location used for user lookup and group mapping
on the system. PAM handles the interaction between the user and the
system, providing login handling, session setup, authentication of
users, and authorization of user actions.

NSS enables PAM to use LDAP to provide user authentication, group
mapping, and information for other services on the system.

## Configure LDAP Authentication

There are 3 common ways to configure LDAP authentication on Linux:

  - libnss-ldap

  - libnss-ldapd

  - libnss-sss

This chapter describes using `libnss-ldapd` only. From internal testing,
this library worked best with Cumulus Linux and is the easiest to
configure, automate, and troubleshoot.

## Install libnss-ldapd

The `libpam-ldapd` package depends on `nslcd`. To install
`libnss-ldapd`, `libpam-ldapd`, and `ldap-utils`, run the following
command:

``` 
                   
cumulus@switch:~$ sudo apt-get install libnss-ldapd libpam-ldapd ldap-utils nslcd
   
    
```

Follow the interactive prompts to answer questions about the LDAP URI,
search base distinguished name (DN), and services that must have LDAP
lookups enabled. This creates a very basic LDAP configuration using
anonymous bind and initiates user search under the base DN specified.

{{%notice note%}}

Alternatively, you can pre-seed these parameters using the
`debconf-utils`. To use this method, run `apt-get install debconf-utils`
and create the pre-seeded parameters using `debconf-set-selections` with
the appropriate answers. Run `debconf-show <pkg>` to check the settings.
Here is an [example of how to pre-seed answers to the installer
questions using
`debconf-set-selections`](/old/attachments_8362555_1_kb_debconf.txt) .

{{%/notice%}}

After the install is complete, the *name service LDAP caching daemon*
(`nslcd`) runs. This service handles all of the LDAP protocol
interactions and caches information returned from the LDAP server. In
the `/etc/nsswitch.conf` file, `ldap` **** is appended and is the
secondary information source for *passwd*, *group*, and *shadow*. The
local files (`/etc/passwd`, `/etc/groups` and `/etc/shadow`) are used
first, as specified by the `compat` source.

``` 
                   
passwd: compat ldap
group: compat ldap
shadow: compat ldap
   
    
```

{{%notice warning%}}

Cumulus Networks recommends that you keep `compat` as the first source
in NSS for *passwd*, *group*, and *shadow*. This prevents you from
getting locked out of the system.

{{%/notice%}}

## Configure nslcd.conf

After installation, you need to update the main configuration file
(`/etc/nslcd.conf`) to accommodate the expected LDAP server settings.
The [nslcd.conf man page](http://linux.die.net/man/5/nslcd.conf) details
all the available configuration options. Some of the more important
options relate to security and how the queries are handled.

### Connection

The LDAP client starts a session by connecting to the LDAP server on TCP
and UDP port 389, or on port 636 for LDAPS. Depending on the
configuration, this connection might be unauthenticated (anonymous
bind); otherwise, the client must provide a bind user and password. The
variables used to define the connection to the LDAP server are the URI
and bind credentials.

The URI is mandatory and specifies the LDAP server location using the
FQDN or IP address. The URI also designates whether to use `ldap://` for
clear text transport, or `ldaps://` for SSL/TLS encrypted transport. You
can also specify an alternate port in the URI. Typically, in production
environments, it is best to utilize the LDAPS protocol; otherwise, all
communications are clear text and not secure.

After the connection to the server is complete, the BIND operation
authenticates the session. The BIND credentials are optional, and if not
specified, an anonymous bind is assumed. This is typically not allowed
in most production environments. Configure authenticated (Simple) BIND
by specifying the user (*binddn*) and password (*bindpw*) in the
configuration. Another option is to use SASL (Simple Authentication and
Security Layer) BIND, which provides authentication services using other
mechanisms, like Kerberos. Contact your LDAP server administrator for
this information as it depends on the configuration of the LDAP server
and the credentials that are created for the client device.

``` 
                   
# The location at which the LDAP server(s) should be reachable.
uri ldaps://ldap.example.com
# The DN to bind with for normal lookups.
binddn cn=CLswitch,ou=infra,dc=example,dc=com
bindpw CuMuLuS
   
    
```

### Search Function

When an LDAP client requests information about a resource, it must
connect and bind to the server. Then, it performs one or more resource
queries depending on the lookup. All search queries sent to the LDAP
server are created using the configured search *base*, *filter*, and the
desired entry (*uid=myuser*) being searched. If the LDAP directory is
large, this search might take a significant amount of time. It is a good
idea to define a more specific search base for the common *maps*
(*passwd* and *group*).

``` 
                   
# The search base that will be used for all queries.
base dc=example,dc=com
# Mapped search bases to speed up common queries.
base passwd ou=people,dc=example,dc=com
base group ou=groups,dc=example,dc=com
   
    
```

### Search Filters

It is also common to use search filters to specify criteria used when
searching for objects within the directory. This is used to limit the
search scope when authenticating users. The default filters applied are:

``` 
                   
filter passwd (objectClass=posixAccount)
filter group (objectClass=posixGroup) 
   
    
```

### Attribute Mapping

The *map* configuration allows you to override the attributes pushed
from LDAP. To override an attribute for a given *map*, specify the
attribute name and the new value. This is useful to ensure that the
shell is *bash* and the home directory is `/home/cumulus`:

``` 
                   
map    passwd homeDirectory "/home/cumulus"
map    passwd shell "/bin/bash"
   
    
```

{{%notice note%}}

In LDAP, the ***map*** refers to one of the supported maps specified in
the manpage for `nslcd.conf` (such as *passwd* or *group*).

{{%/notice%}}

### Example Configuration

Here is an [example
configuration ](/old/attachments_8362557_1_nslcd.conf)using Cumulus
Linux.

## Troubleshooting

### nslcd Debug Mode

When setting up LDAP authentication for the first time, Cumulus Networks
recommends you turn off the `nslcd` service using the `systemctl stop
nslcd.service` command and run it in debug mode. Debug mode works
whether you are using LDAP over SSL (port 636) or an unencrypted LDAP
connection (port 389).

``` 
                   
cumulus@switch:~$ sudo systemctl stop nslcd.service
cumulus@switch:~$ sudo nslcd -d
   
    
```

After you enable debug mode, run the following command to test LDAP
queries:

``` 
                   
cumulus@switch:~$ sudo getent myuser
   
    
```

If LDAP is configured correctly, the following messages appear after you
run the `getent` command:

``` 
                   
nslcd: DEBUG: accept() failed (ignored): Resource temporarily unavailable
nslcd: [8e1f29] DEBUG: connection from pid=11766 uid=0 gid=0
nslcd: [8e1f29]  DEBUG: myldap_search(base="dc=example,dc=com", filter="(objectClass=posixAccount)")
nslcd: [8e1f29]  DEBUG: ldap_result(): uid=myuser,ou=people,dc=example,dc=com
nslcd: [8e1f29]  DEBUG: ldap_result(): ... 152 more results
nslcd: [8e1f29]  DEBUG: ldap_result(): end of results (162 total)
   
    
```

In the output above, *\<passwd(all)\>* indicates that the entire
directory structure is queried.

You can query a specific user with the following command:

``` 
                   
cumulus@switch:~$ sudo getent passwd myuser
   
    
```

You can replace *myuser* with any username on the switch. The following
debug output indicates that user *myuser* exists:

``` 
                   
nslcd: DEBUG: add_uri(ldap://10.50.21.101)
nslcd: version 0.8.10 starting
nslcd: DEBUG: unlink() of /var/run/nslcd/socket failed (ignored): No such file or directory
nslcd: DEBUG: setgroups(0,NULL) done
nslcd: DEBUG: setgid(110) done
nslcd: DEBUG: setuid(107) done
nslcd: accepting connections
nslcd: DEBUG: accept() failed (ignored): Resource temporarily unavailable
nslcd: [8b4567] DEBUG: connection from pid=11369 uid=0 gid=0
nslcd: [8b4567]  DEBUG: myldap_search(base="dc=cumulusnetworks,dc=com", filter="(&(objectClass=posixAccount)(uid=myuser))")
nslcd: [8b4567]  DEBUG: ldap_initialize(ldap://)
nslcd: [8b4567]  DEBUG: ldap_set_rebind_proc()
nslcd: [8b4567]  DEBUG: ldap_set_option(LDAP_OPT_PROTOCOL_VERSION,3)
nslcd: [8b4567]  DEBUG: ldap_set_option(LDAP_OPT_DEREF,0)
nslcd: [8b4567]  DEBUG: ldap_set_option(LDAP_OPT_TIMELIMIT,0)
nslcd: [8b4567]  DEBUG: ldap_set_option(LDAP_OPT_TIMEOUT,0)
nslcd: [8b4567]  DEBUG: ldap_set_option(LDAP_OPT_NETWORK_TIMEOUT,0)
nslcd: [8b4567]  DEBUG: ldap_set_option(LDAP_OPT_REFERRALS,LDAP_OPT_ON)
nslcd: [8b4567]  DEBUG: ldap_set_option(LDAP_OPT_RESTART,LDAP_OPT_ON)
nslcd: [8b4567]  DEBUG: ldap_simple_bind_s(NULL,NULL) (uri="ldap://")
nslcd: [8b4567]  DEBUG: ldap_result(): end of results (0 total)
   
    
```

Notice how the `<passwd="myuser">` shows that the specific *myuser* user
was queried.

### Common Problems

#### SSL/TLS

  - The FQDN of the LDAP server URI does not match the FQDN in the
    CA-signed server certificate exactly.

  - `nslcd` cannot read the SSL certificate and reports a *Permission
    denied* error in the debug during server connection negotiation.
    Check the permission on each directory in the path of the root SSL
    certificate. Ensure that it is readable by the `nslcd` user.

#### NSCD

  - If the `nscd cache` daemon is also enabled and you make some changes
    to the user from LDAP, you can clear the cache using the following
    commands:
    
    ``` 
                       
    nscd --invalidate = passwd 
    nscd --invalidate = group
       
        
    ```

  - The `nscd` package works with `nslcd` to cache name entries returned
    from the LDAP server. This might cause authentication failures. To
    work around these issues:
    
    1.  Disable `nscd` by running:
        
        ``` 
                           
        cumulus@switch:~$ sudo nscd -K
           
            
        ```
    
    2.  Restart the `nslcd` service:
        
        ``` 
                           
        cumulus@switch:~$ sudo systemctl restart nslcd.service
           
            
        ```
    
    3.  Try the authentication again.

#### LDAP

  - The search filter returns wrong results. Check for typos in the
    search filter. Use `ldapsearch` to test your filter.

  - Optionally, configure the basic LDAP connection and search
    parameters in `/etc/ldap/ldap.conf`.
    
    ``` 
                       
    # ldapsearch -D 'cn=CLadmin' -w 'CuMuLuS' "(&(ObjectClass=inetOrgUser)(uid=myuser))"
       
        
    ```

  - When a local username also exists in the LDAP database, the order of
    the information sources in `/etc/nsswitch` can be updated to query
    LDAP before the local user database. This is generally not
    recommended. For example, the configuration below ensures that LDAP
    is queried before the local database.
    
    ``` 
                       
    # /etc/nsswitch.conf
    passwd:         ldap compat
       
        
    ```

## Configure LDAP Authorization

Linux uses the *sudo* command to allow non-administrator users (such as
the default *cumulus* user account) to perform privileged operations. To
control the users authorized to use sudo, the `/etc/sudoers` file and
files located in the `/etc/sudoers.d/` directory have a series of rules
defined. Typically, the rules are based on groups, but can also be
defined for specific users. Therefore, sudo rules can be added using the
group names from LDAP. For example, if a group of users are associated
with the group *netadmin*, you can add a rule to give those users sudo
privileges. Refer to the sudoers manual (`man sudoers`) for a complete
usage description. Here's an illustration of this in `/etc/sudoers`:

``` 
                   
# The basic structure of a user specification is “who where = (as_whom) what”.
%sudo ALL=(ALL:ALL) ALL
%netadmin ALL=(ALL:ALL) ALL
   
    
```

## Active Directory Configuration

Active Directory (AD) is a fully featured LDAP-based NIS server created
by Microsoft. It offers unique features that classic OpenLDAP servers
lack. Therefore, it can be more complicated to configure on the client
and each version of AD is a little different in how it works with
Linux-based LDAP clients. Some more advanced configuration examples,
from testing LDAP clients on Cumulus Linux with Active Directory
(AD/LDAP), are available in our [knowledge
base](https://support.cumulusnetworks.com/hc/en-us/articles/204383797).

## Related Information

  - [Debian - configuring LDAP
    authentication](https://wiki.debian.org/LDAP/NSS)

  - [Debian - configuring PAM to use
    LDAP](https://wiki.debian.org/LDAP/PAM)

  - [GitHub - Arthur de Jong nslcd.conf
    file](https://raw.githubusercontent.com/arthurdejong/nss-pam-ldapd/master/nslcd.conf)

  - [Debian backports](http://backports.debian.org/Instructions/)