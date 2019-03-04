# FRRouting Log Message Reference

The following table lists the HIGH severity ERROR log messages generated
by FRRouting. These messages appear in `/var/log/frr/frr.log`.

<table style="width:100%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
<col style="width: 16%" />
</colgroup>
<thead>
<tr class="header">
<th>Category</th>
<th><p>Severity</p></th>
<th>Message #</th>
<th>Message Text</th>
<th>Explanation</th>
<th>Recommended Action</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Babel</td>
<td>HIGH</td>
<td>16777217</td>
<td>BABEL Memory Errors</td>
<td>Babel has failed to allocate memory. The system is about to run out of memory.</td>
<td><div>
<div>
Find the process that is causing memory shortages and remediate that process. Restart FRR.
</div>
</div></td>
</tr>
<tr class="even">
<td>Babel</td>
<td>HIGH</td>
<td>16777218</td>
<td>BABEL Packet Error</td>
<td>Babel has detected a packet encode/decode problem.</td>
<td>Collect the relevant log files and report the issue for troubleshooting.</td>
</tr>
<tr class="odd">
<td>Babel</td>
<td>HIGH</td>
<td>16777219</td>
<td>BABEL Configuration Error</td>
<td>Babel has detected a configuration error of some sort.</td>
<td>Ensure that the configuration is correct.</td>
</tr>
<tr class="even">
<td>Babel</td>
<td>HIGH</td>
<td>16777220</td>
<td>BABEL Route Error</td>
<td>Babel has detected a routing error and is in an inconsistent state.</td>
<td>Gather data to report the issue for troubleshooting. Restart FRR.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554433</td>
<td>BGP attribute flag is incorrect</td>
<td>BGP attribute flag is set to the wrong value (Optional/Transitive/Partial).</td>
<td><div>
<div>
Determine the soure of the attribute and determine why the attribute flag has been set incorrectly.
</div>
</div></td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554434</td>
<td>BGP attribute length is incorrect</td>
<td>BGP attribute length is incorrect.</td>
<td><div>
<div>
Determine the soure of the attribute and determine why the attribute length has been set incorrectly.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554435</td>
<td>BGP attribute origin value invalid</td>
<td>BGP attribute origin value is invalid.</td>
<td><div>
<div>
Determine the soure of the attribute and determine why the origin attribute has been set incorrectly.
</div>
</div></td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554436</td>
<td>BGP as path is invalid</td>
<td>BGP AS path has been malformed.</td>
<td><div>
<div>
Determine the soure of the update and determine why the AS path has been set incorrectly.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554437</td>
<td>BGP as path first as is invalid</td>
<td>BGP update has invalid first AS in AS path.</td>
<td><div>
<div>
Determine the soure of the update and determine why the AS path first AS value has been set incorrectly.
</div>
</div></td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554439</td>
<td>BGP PMSI tunnel attribute type is invalid</td>
<td>BGP update has invalid type for PMSI tunnel.</td>
<td><div>
<div>
Determine the soure of the update and determine why the PMSI tunnel attribute type has been set incorrectly.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554440</td>
<td>BGP PMSI tunnel attribute length is invalid</td>
<td>BGP update has invalid length for PMSI tunnel.</td>
<td><div>
<div>
Determine the soure of the update and determine why the PMSI tunnel attribute length has been set incorrectly.
</div>
</div></td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554442</td>
<td>BGP peergroup operated on in error</td>
<td>BGP operating on peer-group instead of peers included.</td>
<td>Ensure the configuration doesn't contain peer-groups contained within peer-groups.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554443</td>
<td>BGP failed to delete peer structure</td>
<td>BGP was unable to delete the peer structure when the address-family was removed.</td>
<td><div>
<div>
Determine if all expected peers are removed and restart FRR if not. This is most likely a bug.
</div>
</div></td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554444</td>
<td>BGP failed to get table chunk memory</td>
<td>BGP unable to get chunk memory for table manager.</td>
<td>Ensure there is adequate memory on the device to support the table requirements.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554445</td>
<td>BGP received MACIP with invalid IP addr len</td>
<td>BGP received MACIP with invalid IP address length from Zebra.</td>
<td>Verify the MACIP entries inserted in Zebra are correct. This is most likely a bug.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554446</td>
<td>BGP received invalid label manager message</td>
<td>BGP received an invalid label manager message from the label manager.</td>
<td><div>
<div>
Label manager sent an invalid message to BGP for the wrong protocol instance. This is most likely a bug.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554447</td>
<td>BGP unable to allocate memory for JSON output</td>
<td>BGP attempted to generate JSON output and was unable to allocate the memory required.</td>
<td>Ensure that the device has adequate memory to support the required functions.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554448</td>
<td>BGP update had attributes too long to send</td>
<td>BGP attempted to send an update but the attributes were too long to fit.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554449</td>
<td>BGP update group creation failed</td>
<td>BGP attempted to create an update group but was unable to do so.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554450</td>
<td>BGP error creating update packet</td>
<td>BGP attempted to create an update packet but was unable to do so.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554451</td>
<td>BGP error receiving open packet</td>
<td>BGP received an open from a peer that was invalid.</td>
<td>Determine the sending peer and correct its invalid open packet.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554452</td>
<td>BGP error sending to peer</td>
<td>BGP attempted to respond to open from a peer and failed.</td>
<td><div>
<div>
BGP attempted to respond to an open and could not send the packet. Check the local IP address for the source.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554453</td>
<td>BGP error receiving from peer</td>
<td>BGP received an update from a peer but the status was incorrect.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554454</td>
<td>BGP error receiving update packet</td>
<td>BGP received an invalid update packet.</td>
<td>Determine the source of the update and resolve the invalid update being sent.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554455</td>
<td>BGP error due to capability not enabled</td>
<td>BGP attempted a function that did not have the capability enabled.</td>
<td>Enable the capability if this functionality is desired.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554456</td>
<td>BGP error receiving notify message</td>
<td>BGP unable to process the notification message.</td>
<td><div>
<div>
BGP notify received while in a stopped state. If the problem persists, report it for troubleshooting.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554457</td>
<td>BGP error receiving keepalive packet</td>
<td>BGP unable to process a keepalive packet.</td>
<td><div>
<div>
BGP keepalive received while in a stopped state. If the problem persists, report it for troubleshooting.
</div>
</div></td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554458</td>
<td>BGP error receiving route refresh message</td>
<td>BGP unable to process route refresh message.</td>
<td><div>
<div>
BGP route refresh received while in a stopped state. If the problem persists, report it for troubleshooting.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554459</td>
<td>BGP error capability message</td>
<td>BGP unable to process received capability.</td>
<td><div>
<div>
BGP capability message received while in a stopped state. If the problem persists, report it for troubleshooting.
</div>
</div></td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554460</td>
<td>BGP error with nexthopo update</td>
<td>BGP unable to process nexthop update.</td>
<td><div>
<div>
BGP received the nexthop update but the nexthop is not reachable in this BGP instance. Report the problem for troubleshooting.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554461</td>
<td>Failure to apply label</td>
<td>BGP attempted to attempted to apply a label but could not do so.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554462</td>
<td>Multipath specified is invalid</td>
<td>BGP was started with an invalid ECMP/multipath value.</td>
<td>Correct the ECMP/multipath value supplied when starting the BGP daemon.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554463</td>
<td>Failure to process a packet</td>
<td>BGP attempted to process a received packet but could not do so.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554464</td>
<td>Failure to connect to peer</td>
<td>BGP attempted to send open to a peer but couldn't connect.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554465</td>
<td>BGP FSM issue</td>
<td>BGP neighbor transition problem.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554466</td>
<td>BGP VNI creation issue</td>
<td>BGP could not create a new VNI.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554467</td>
<td>BGP default instance missing</td>
<td>BGP could not find default instance.</td>
<td>Define a default instance of BGP since some feature requires its existence.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554468</td>
<td>BGP remote VTEP invalid</td>
<td>BGP remote VTEP is invalid and cannot be used.</td>
<td>Correct the remote VTEP configuration or resolve the source of the problem.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554469</td>
<td>BGP ES route error</td>
<td>BGP ES route incorrect as it learned both local and remote routes.</td>
<td><div>
<div>
Correct the configuration or address it so that same route is not learned both local and remote.
</div>
</div></td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554470</td>
<td>BGP EVPN route delete error</td>
<td>BGP attempted to delete an EVPN route and failed.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554471</td>
<td>BGP EVPN install/uninstall error</td>
<td>BGP attempted to install or uninstall an EVPN prefix and failed.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554472</td>
<td>BGP EVPN route received with invalid contents</td>
<td>BGP received an EVPN route with invalid contents.</td>
<td><div>
<div>
Determine the source of the EVPN route and resolve whatever is causing the invalid content.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554473</td>
<td>BGP EVPN route create error</td>
<td>BGP attempted to create an EVPN route and failed.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554474</td>
<td>BGP EVPN ES entry create error</td>
<td>BGP attempted to create an EVPN ES entry and failed.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554475</td>
<td>BGP config multi-instance issue</td>
<td>BGP configuration attempting multiple instances without enabling the feature.</td>
<td>Correct the configuration so that BGP multiple-instance is enabled if desired.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554476</td>
<td>BGP AS configuration issue</td>
<td>BGP configuration attempted for a different AS than is currently configured.</td>
<td>Correct the configuration so that the correct BGP AS number is used.</td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554477</td>
<td>BGP EVPN AS and process name mismatch</td>
<td>BGP configuration has AS and process name mismatch.</td>
<td>Correct the configuration so that the BGP AS number and instance name are consistent.</td>
</tr>
<tr class="even">
<td>BGP</td>
<td>HIGH</td>
<td>33554478</td>
<td>BGP Flowspec packet processing error</td>
<td>The BGP flowspec subsystem has detected an error in the sending or receiving of a packet.</td>
<td><div>
<div>
Gather log files from both sides of the peering relationship and report the issue for troubleshooting.
</div>
</div></td>
</tr>
<tr class="odd">
<td>BGP</td>
<td>HIGH</td>
<td>33554479</td>
<td>BGP Flowspec Installation/removal Error</td>
<td>The BGP flowspec subsystem has detected that there was a failure for installation/removal/modification of Flowspec from the dataplane.</td>
<td>Gather log files from the router and report the issue for troubleshooting. Restart FRR.</td>
</tr>
<tr class="even">
<td>EIGRP</td>
<td>HIGH</td>
<td>50331649</td>
<td>EIGRP Packet Error</td>
<td>EIGRP has a packet that does not correctly decode or encode.</td>
<td><div>
<div>
Gather log files from both sides of the neighbor relationship and report the issue for troubleshooting.
</div>
</div></td>
</tr>
<tr class="odd">
<td>EIGRP</td>
<td>HIGH</td>
<td>50331650</td>
<td>EIGRP Configuration Error</td>
<td>EIGRP has detected a configuration error.</td>
<td>Correct the configuration issue. If it still persists, report the issue for troubleshooting.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>100663297</td>
<td>Failure to raise or lower privileges</td>
<td>FRR attempted to raise or lower its privileges and was unable to do so.</td>
<td><div>
<div>
Ensure that you are running FRR as the frr user and that the user has sufficient privileges to properly access root privileges.
</div>
</div></td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>100663298</td>
<td>VRF Failure on Start</td>
<td>Upon startup, FRR failed to properly initialize and start up the VRF subsystem.</td>
<td>Ensure that there is sufficient memory to start processes, then restart FRR.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>100663299</td>
<td>Socket Error</td>
<td>When attempting to access a socket, a system error occured and FRR was unable to properly complete the request.</td>
<td><div>
<div>
Ensure that there are sufficient system resources available and ensure that the frr user has sufficient permisions to work.
</div>
</div></td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>100663303</td>
<td>System Call Error</td>
<td>FRR has detected an error from using a vital system call and has probably already exited.</td>
<td><div>
<div>
Ensure permissions are correct for FRR users and groups. Additionally, check that sufficient system resources are available.
</div>
</div></td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>100663304</td>
<td>VTY Subsystem Error</td>
<td>FRR has detected a problem with the specified configuration file.</td>
<td><div>
<div>
Ensure the configuration file exists and has the correct permissions for operations. Additionally, ensure that all config lines are correct as well.
</div>
</div></td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>100663305</td>
<td>SNMP Subsystem Error</td>
<td>FRR has detected a problem with the SNMP library it uses. A callback from this subsystem has indicated some error.</td>
<td>Examine the callback message and ensure SNMP is properly set up and working.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>100663306</td>
<td>Interface Subsystem Error</td>
<td>FRR has detected a problem with interface data from the kernel as it deviates from what we would expect to happen via normal netlink messaging.</td>
<td>Open an issue with all relevant log files and restart FRR.</td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>100663307</td>
<td>NameSpace Subsystem Error</td>
<td>FRR has detected a problem with namespace data from the kernel as it deviates from what we would expect to happen via normal kernel messaging.</td>
<td>Open an issue with all relevant log files and restart FRR.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>4043309068</td>
<td>A necessary work queue does not exist.</td>
<td>A necessary work queue does not exist.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>100663308</td>
<td>Developmental Escape Error</td>
<td>FRR has detected an issue where new development has not properly updated all code paths.</td>
<td>Open an issue with all relevant log files.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>100663309</td>
<td>ZMQ Subsystem Error</td>
<td>FRR has detected an issue with the ZeroMQ subsystem and ZeroMQ is not working properly now.</td>
<td>Open an issue with all relevant log files and restart FRR.</td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>100663310</td>
<td>Feature or system unavailable</td>
<td>FRR was not compiled with support for a particular feature or it is not available on the current platform.</td>
<td>Recompile FRR with the feature enabled or find out what platforms support the feature.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>4043309071</td>
<td>IRDP message length mismatch</td>
<td>The length encoded in the IP TLV does not match the length of the packet received.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>4043309073</td>
<td>Dataplane installation failure</td>
<td>Installation of routes to the underlying dataplane failed.</td>
<td>Check all configuration parameters for correctness.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>4043309075</td>
<td>Netlink backend not available</td>
<td>FRR was not compiled with support for Netlink. Any operations that require Netlink will fail.</td>
<td>Recompile FRR with Netlink or install a package that supports this feature.</td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>4043309076</td>
<td>Protocol Buffers backend not available</td>
<td>FRR was not compiled with support for protocol buffers. Any operations that require protobuf will fail.</td>
<td>Recompile FRR with protobuf support or install a package that supports this feature.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>4043309087</td>
<td>Cannot set receive buffer size</td>
<td>The socket receive buffer size could not be set in the kernel.</td>
<td>Ignore this error.</td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>4043309089</td>
<td>Receive buffer overrun</td>
<td>The kernel's buffer for a socket has been overrun, rendering the socket invalid.</td>
<td>Zebra will restart itself. Notify a developer if this issue shows up frequently.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>4043309091</td>
<td>Received unexpected response from kernel</td>
<td>Received unexpected response from the kernel via Netlink.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>General</td>
<td>HIGH</td>
<td>4043309094</td>
<td>String could not be parsed as IP prefix</td>
<td>There was an attempt to parse a string as an IPv4 or IPv6 prefix, but the string could not be parsed and this operation failed.</td>
<td>Notify a developer.</td>
</tr>
<tr class="even">
<td>General</td>
<td>HIGH</td>
<td>268435457</td>
<td>WATCHFRR Connection Error</td>
<td>WATCHFRR has detected a connectivity issue with one of the FRR daemons.</td>
<td>Ensure that FRR is still running. If it isn't, report the issue for troubleshooting.</td>
</tr>
<tr class="odd">
<td>ISIS</td>
<td>HIGH</td>
<td>67108865</td>
<td>ISIS Packet Error</td>
<td>ISIS has detected an error with a packet from a peer.</td>
<td>Gather log information and report the issue for troubleshooting. Restart FRR.</td>
</tr>
<tr class="even">
<td>ISIS</td>
<td>HIGH</td>
<td>67108866</td>
<td>ISIS Configuration Error</td>
<td>ISIS has detected an error within the configuration for the router.</td>
<td>Ensure configuration is correct.</td>
</tr>
<tr class="odd">
<td>OSPF</td>
<td>HIGH</td>
<td>134217729</td>
<td>Failure to process a packet</td>
<td>OSPF attempted to process a received packet but could not do so.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>OSPF</td>
<td>HIGH</td>
<td>134217730</td>
<td>Failure to process Router LSA</td>
<td>OSPF attempted to process a router LSA, but there was an advertising ID mismtach with the link ID.</td>
<td><div>
<div>
Check the OSPF network configuration for any configuration issue. If the problem persists, report it for troubleshooting.
</div>
</div></td>
</tr>
<tr class="odd">
<td>OSPF</td>
<td>HIGH</td>
<td>134217731</td>
<td>OSPF Domain Corruption</td>
<td>OSPF attempted to process a router LSA, but there was an advertising ID mismtach with the link ID.</td>
<td><div>
<div>
Check OSPF network database for a corrupted LSA. If the problem persists, shut down the OSPF domain and report the problem for troubleshooting.
</div>
</div></td>
</tr>
<tr class="even">
<td>OSPF</td>
<td>HIGH</td>
<td>134217732</td>
<td>OSPF Initialization failure</td>
<td>OSPF failed to initialized the OSPF default instance.</td>
<td><div>
<div>
Ensure there is adequate memory on the device. If the problem persists, report it for troubleshooting.
</div>
</div></td>
</tr>
<tr class="odd">
<td>OSPF</td>
<td>HIGH</td>
<td>134217733</td>
<td>OSPF SR Invalid DB</td>
<td>OSPF segment routing database is invalid.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>OSPF</td>
<td>HIGH</td>
<td>134217734</td>
<td>OSPF SR hash node creation failed</td>
<td>OSPF segment routing node creation failed.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="odd">
<td>OSPF</td>
<td>HIGH</td>
<td>134217735</td>
<td>OSPF SR Invalid lsa id</td>
<td>OSPF segment routing invalid LSA ID.</td>
<td>Restart the OSPF instance. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="even">
<td>OSPF</td>
<td>HIGH</td>
<td>134217736</td>
<td>OSPF SR Invalid Algorithm</td>
<td>OSPF segment routing invalid algorithm.</td>
<td>This is most likely a bug. If the problem persists, report it for troubleshooting.</td>
</tr>
<tr class="odd">
<td>PIM</td>
<td>HIGH</td>
<td>184549377</td>
<td>PIM MSDP Packet Error</td>
<td>PIM has received a packet from a peer that does not correctly decode.</td>
<td>Check the MSDP peer and ensure it is correctly working.</td>
</tr>
<tr class="even">
<td>PIM</td>
<td>HIGH</td>
<td>184549378</td>
<td>PIM Configuration Error</td>
<td>PIM has detected a configuration error.</td>
<td>Ensure the configuration is correct and apply the correct configuration.</td>
</tr>
<tr class="odd">
<td>RIP</td>
<td>HIGH</td>
<td>201326593</td>
<td>RIP Packet Error</td>
<td>RIP has detected a packet encode/decode issue.</td>
<td>Gather log files from both sides and open a Issue</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309057</td>
<td>Error reading response from label manager</td>
<td>Zebra could not read the ZAPI header from the label manager.</td>
<td>Wait for the error to resolve on its own. If it does not resolve, restart Zebra.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309058</td>
<td>Label manager could not find ZAPI client</td>
<td>Zebra was unable to find a ZAPI client matching the given protocol and instance number.</td>
<td>Ensure that clients that use the label manager are properly configured and running.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309059</td>
<td>Zebra could not relay label manager response</td>
<td>Zebra found the client and instance to relay the label manager response or request, but was unable to do so, possibly because the connection was closed.</td>
<td>Ensure that clients that use the label manager are properly configured and running.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>100663300</td>
<td>ZAPI Error</td>
<td>A version mismatch has been detected between Zebra and a client protocol.</td>
<td><div>
<div>
Two different versions of FRR have been installed and the install is not properly set up. Completely stop FRR, remove it from the system and reinstall. Typically, only developers should see this issue.
</div>
</div></td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309061</td>
<td>Mismatch between ZAPI instance and encoded message instance</td>
<td>While relaying a request to the external label manager, Zebra noticed that the instance number encoded in the message did not match the client instance number.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>100663301</td>
<td>ZAPI Error</td>
<td>The ZAPI subsystem has detected an encoding issue between Zebra and a client protocol.</td>
<td>Restart FRR.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>100663302</td>
<td>ZAPI Error</td>
<td>The ZAPI subsystem has detected a socket error between Zebra and a client.</td>
<td>Restart FRR.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309064</td>
<td>Zebra label manager used all available labels</td>
<td>Zebra is unable to assign additional label chunks because it has exhausted its assigned label range.</td>
<td>Make the label range bigger and restart Zebra.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309065</td>
<td>Daemon mismatch when releasing label chunks</td>
<td>Zebra noticed a mismatch between a label chunk and a protocol daemon number or instance when releasing unused label chunks.</td>
<td>Ignore this error.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309066</td>
<td>Zebra did not free any label chunks</td>
<td>Zebra's chunk cleanup procedure ran but no label chunks were released.</td>
<td>Ignore this error.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309067</td>
<td>Dataplane returned invalid status code</td>
<td>The underlying dataplane responded to a Zebra message or other interaction with an unrecognized unknown or invalid status code.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309069</td>
<td>Failed to add FEC for MPLS client</td>
<td>A client requested a label binding for a new FEC but Zebra was unable to add the FEC to its internal table.</td>
<td>Notify a developer.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309070</td>
<td>Failed to remove FEC for MPLS client</td>
<td>Zebra was unable to find and remove an FEC in its internal table.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309072</td>
<td>Attempted to perform nexthop update for unknown address family</td>
<td>Zebra attempted to perform a nexthop update for unknown address family.</td>
<td>Notify a developer.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309074</td>
<td>Zebra table lookup failed</td>
<td>Zebra attempted to look up a table for a particular address family and a subsequent address family but didn't find anything.</td>
<td><div>
<div>
If you entered a command to trigger this error, make sure you entered the arguments correctly. Check your configuration file for any potential errors. If these look correct, notify a developer.
</div>
</div></td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309077</td>
<td>Table manager used all available IDs</td>
<td>Zebra's table manager used up all IDs available to it and can't assign any more.</td>
<td>Reconfigure Zebra with a larger range of table IDs.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309078</td>
<td>Daemon mismatch when releasing table chunks</td>
<td>Zebra noticed a mismatch between a table ID chunk and a protocol daemon number instance when releasing unused table chunks.</td>
<td>Ignore this error.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309079</td>
<td>Zebra did not free any table chunks</td>
<td>Zebra's table chunk cleanup procedure ran but no table chunks were released.</td>
<td>Ignore this error.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309080</td>
<td>Address family specifier unrecognized</td>
<td>Zebra attempted to process information from somewhere that included an address family specifier but did not recognize the provided specifier.</td>
<td>Ensure that your configuration is correct. If it is, notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309081</td>
<td>Incorrect protocol for table manager client</td>
<td>Zebra's table manager only accepts connections from daemons managing dynamic routing protocols, but received a connection attempt from a daemon that does not meet this criterion.</td>
<td>Notify a developer.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309082</td>
<td>Mismatch between message and client protocol and/or instance</td>
<td>Zebra detected a mismatch between a client's protocol and/or instance numbers versus those stored in a message transiting its socket.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309083</td>
<td>Label manager unable to assign label chunk</td>
<td>Zebra's label manager was unable to assign a label chunk to client.</td>
<td><div>
<div>
Ensure that Zebra has a sufficient label range available and that there is not a range collision.
</div>
</div></td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309084</td>
<td>Label request from unidentified client</td>
<td>Zebra's label manager received a label request from an unidentified client.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309085</td>
<td>Table manager unable to assign table chunk</td>
<td>Zebra's table manager was unable to assign a table chunk to a client.</td>
<td><div>
<div>
Ensure that Zebra has sufficient table ID range available and that there is not a range collision.
</div>
</div></td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309086</td>
<td>Table request from unidentified client</td>
<td>Zebra's table manager received a table request from an unidentified client.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309088</td>
<td>Unknown Netlink message type</td>
<td>Zebra received a Netlink message with an unrecognized type field.</td>
<td><div>
<div>
Verify that you are running the latest version of FRR to ensure kernel compatibility. If the problem persists, notify a developer.
</div>
</div></td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309090</td>
<td>Netlink message length mismatch</td>
<td>Zebra received a Netlink message with incorrect length fields.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309092</td>
<td>Bad sequence number in Netlink message</td>
<td>Zebra received a Netlink message with a bad sequence number.</td>
<td>Notify a developer.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309093</td>
<td>Multipath number was out of valid range</td>
<td>The multipath number specified to Zebra must be in the appropriate range.</td>
<td>Provide a multipath number that is within its accepted range.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309095</td>
<td>Failed to add MAC address to interface</td>
<td>Zebra attempted to assign a MAC address to a VXLAN interface but failed.</td>
<td>Notify a developer.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309096</td>
<td>Failed to delete VNI</td>
<td>Zebra attempted to delete a VNI entry and failed.</td>
<td>Notify a developer.</td>
</tr>
<tr class="odd">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309097</td>
<td>Adding remote VTEP failed</td>
<td>Zebra attempted to add a remote VTEP and failed.</td>
<td>Notify a developer.</td>
</tr>
<tr class="even">
<td>Zebra</td>
<td>HIGH</td>
<td>4043309098</td>
<td>Adding VNI failed</td>
<td>Zebra attempted to add a VNI hash to an interface and failed.</td>
<td>Notify a developer.</td>
</tr>
</tbody>
</table>
