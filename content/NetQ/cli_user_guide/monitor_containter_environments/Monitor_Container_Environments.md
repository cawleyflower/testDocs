# Monitor Container Environments

The NetQ Agent monitors container environments the same way it
monitors [physical
servers](https://docs.cumulusnetworks.com/display/NETQ140DRAFT/Monitor+Linux+Hosts).
There is no special implementation. The NetQ Agent pulls data from the
container as it would pull data from a Cumulus Linux switch or Linux
host. It can be installed on a Linux server or in a Linux VM. NetQ Agent
integrates with container orchestrators including Kubernetes and Docker
Swarm.

NetQ monitors many aspects of containers on your network, including
their:

-   **Identity**: The NetQ agent tracks every container's IP and MAC
    address, name, image, and more. NetQ can locate containers across
    the fabric based on a container's name, image, IP or MAC address,
    and protocol and port pair.
-   **Port mapping on a network**: The NetQ agent tracks protocol and
    ports exposed by a container. NetQ can identify containers exposing
    a specific protocol and port pair on a network.
-   **Connectivity**: NetQ can provide information on network
    connectivity for a container, including adjacency, and can identify
    containers that can be affected by a top of rack switch.

NetQ helps answer questions such as:

-   Where is this container located?

-   Open ports? What image is being used?

-   Which containers are part of this service? How are they connected?

## Contents

![](images/icons/grey_arrow_down.png){.expand-control-image}This topic
describes how to...

-   [Use NetQ with Kubernetes
    Clusters](#MonitorContainerEnvironments-UseNetQwithKubernetesClusters)
    -   [Requirements](#MonitorContainerEnvironments-Requirements)
    -   [Command Summary](#MonitorContainerEnvironments-CommandSummary)
    -   [Enable Kubernetes
        Monitoring](#MonitorContainerEnvironments-enable_k8sEnableKubernetesMonitoring)
    -   [View Status of Kubernetes
        Clusters](#MonitorContainerEnvironments-ViewStatusofKubernetesClusters)
    -   [View Changes to a
        Cluster](#MonitorContainerEnvironments-ViewChangestoaCluster)
    -   [View Kubernetes Node
        Information](#MonitorContainerEnvironments-ViewKubernetesNodeInformation)
    -   [View Container
        Connectivity](#MonitorContainerEnvironments-ViewContainerConnectivity)
    -   [View Kubernetes Service Connectivity and
        Impact](#MonitorContainerEnvironments-ViewKubernetesServiceConnectivityandImpact)
    -   [View Kubernetes Cluster Configuration in the
        Past](#MonitorContainerEnvironments-ViewKubernetesClusterConfigurationinthePast)
-   [Use NetQ with Docker
    Swarm](#MonitorContainerEnvironments-UseNetQwithDockerSwarm)
    -   [Requirements](#MonitorContainerEnvironments-Requirements.1)
    -   [Command
        Summary](#MonitorContainerEnvironments-CommandSummary.1)
    -   [Enable Docker Container
        Monitoring](#MonitorContainerEnvironments-enableEnableDockerContainerMonitoring)
    -   [View Container Summary
        Information](#MonitorContainerEnvironments-ViewContainerSummaryInformation)
    -   [Identify Containers on the
        Network](#MonitorContainerEnvironments-IdentifyContainersontheNetwork)
    -   [View Deployed Container Network
        Drivers](#MonitorContainerEnvironments-ViewDeployedContainerNetworkDrivers)
    -   [View All Containers in a
        Network](#MonitorContainerEnvironments-ViewAllContainersinaNetwork)
    -   [View Container
        Adjacency](#MonitorContainerEnvironments-ViewContainerAdjacency)
    -   [Show Container-Specific
        Information](#MonitorContainerEnvironments-ShowContainer-SpecificInformation)
    -   [Show Containers with a Specific
        Image](#MonitorContainerEnvironments-ShowContainerswithaSpecificImage)
    -   [Show Container
        Connectivity](#MonitorContainerEnvironments-ShowContainerConnectivity)
    -   [Check Network Traffic over a Given
        Protocol](#MonitorContainerEnvironments-CheckNetworkTrafficoveraGivenProtocol)
    -   [Show Docker Swarm Clusters and
        Networks](#MonitorContainerEnvironments-ShowDockerSwarmClustersandNetworks)
    -   [Show Docker Service Connectivity and
        Impact](#MonitorContainerEnvironments-ShowDockerServiceConnectivityandImpact)
    -   [View Docker Configuration in the
        Past](#MonitorContainerEnvironments-ViewDockerConfigurationinthePast)

## Use NetQ with Kubernetes Clusters

The NetQ Agent interfaces with a Kubernetes API server and listens to
Kubernetes events. The NetQ Agent monitors network identity and physical
network connectivity of Kubernetes resources like Pods, Daemon sets,
Service, and so forth. NetQ works with any container network interface
(CNI), such as Calico or Flannel.

The NetQ Kubernetes integration enables network administrators to:

-   Identify and locate pods, deployment, replica-set and services
    deployed within the network using IP, name, label, and so forth.
-   Track network connectivity of all pods of a service, deployment and
    replica set.
-   Locate what pods have been deployed adjacent to a top of rack (ToR)
    switch.
-   Check what pod, services, replica set or deployment can be impacted
    by a specific ToR switch.

NetQ also helps network administrators identify changes within a
Kubernetes cluster and determine if such changes had an adverse effect
on the network performance (caused by a noisy neighbor for example).
Additionally, NetQ helps the infrastructure administrator determine how
Kubernetes workloads are distributed within a network.

### Requirements

The NetQ Agent supports Kubernetes version 1.9.2 or later.

Due to the higher memory requirements to run containers, Cumulus
Networks recommends you run the NetQ Platform on a host with at least
64G RAM. 

### Command Summary

There is a large set of commands available to monitor Kubernetes
configurations, including the ability to monitor clusters, nodes,
daemon-set, deployment, pods, replication, and services. Run
`netq show kubernetes help` to see all the possible commands:

``` text
netq [<hostname>] show kubernetes cluster [name <kube-cluster-name>] [around <text-time>] [json]
netq [<hostname>] show kubernetes node [components] [name <kube-node-name>] [cluster <kube-cluster-name> ] [label <kube-node-label>] [around <text-time>] [json]
netq [<hostname>] show kubernetes daemon-set [name <kube-ds-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-ds-label>] [around <text-time>] [json]
netq [<hostname>] show kubernetes daemon-set [name <kube-ds-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-ds-label>] connectivity [around <text-time>] [json]
netq [<hostname>] show kubernetes deployment [name <kube-deployment-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-deployment-label>] [around <text-time>] [json]
netq [<hostname>] show kubernetes deployment [name <kube-deployment-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-deployment-label>] connectivity [around <text-time>] [json]
netq [<hostname>] show kubernetes pod [name <kube-pod-name>] [cluster <kube-cluster-name> ] [namespace <namespace>] [label <kube-pod-label>] [pod-ip <kube-pod-ipaddress>] [node <kube-node-name>] [around <text-time>] [json]
netq [<hostname>] show kubernetes replication-controller [name <kube-rc-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-rc-label>] [around <text-time>] [json]
netq [<hostname>] show kubernetes replica-set [name <kube-rs-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-rs-label>] [around <text-time>] [json]
netq [<hostname>] show kubernetes replica-set [name <kube-rs-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-rs-label>] connectivity [around <text-time>] [json]
netq [<hostname>] show kubernetes service [name <kube-service-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-service-label>] [service-cluster-ip <kube-service-cluster-ip>] [service-external-ip <kube-service-external-ip>] [around <text-time>] [json]
netq [<hostname>] show kubernetes service [name <kube-service-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-service-label>] [service-cluster-ip <kube-service-cluster-ip>] [service-external-ip <kube-service-external-ip>] connectivity [around <text-time>] [json]
netq  <hostname>  show impact kubernetes service [master <kube-master-node>] [name <kube-service-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-service-label>] [service-cluster-ip <kube-service-cluster-ip>] [service-external-ip <kube-service-external-ip>] [around <text-time>] [json]
netq <hostname> show impact kubernetes replica-set [master <kube-master-node>] [name <kube-rs-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-rs-label>] [around <text-time>] [json]
netq <hostname> show impact kubernetes deployment [master <kube-master-node>] [name <kube-deployment-name>] [cluster <kube-cluster-name>] [namespace <namespace>] [label <kube-deployment-label>] [around <text-time>] [json]
netq config add agent kubernetes-monitor [poll-period <text-duration-period>]
netq config del agent kubernetes-monitor
netq config show agent kubernetes-monitor [json]
```

### Enable Kubernetes Monitoring

For NetQ to monitor the containers on a host, you must configure the
following on the Kubernetes master node:

1.  Configure the host to point to the NetQ Platform by its IP
    address. See the [Install NetQ](Install_NetQ) topic for details.
2.  Enable Kubernetes monitoring by NetQ. You can specify a polling
    period between 10 and 120 seconds; 15 seconds is the default.

    ``` text
    cumulus@host:~$ netq config add agent kubernetes-monitor poll-period 20
    Successfully added kubernetes monitor. Please restart netq-agent.
    ```

3.  Restart the NetQ agent:

    ``` text
    cumulus@server01:~$ netq config restart agent
    ```

Next, you must enable the NetQ Agent on all the worker nodes, as
described in the [Install
NetQ](https://docs.cumulusnetworks.com/display/NETQ140DRAFT/Install+NetQ)
topic, for complete insight into your container network.

### View Status of Kubernetes Clusters

You can get the status of all Kubernetes clusters in the fabric using
the `netq show kubernetes cluster` command:

``` text
cumulus@switch:~$ netq show kubernetes cluster 
Matching kube_cluster records:
Master                   Cluster Name     Controller Status    Scheduler Status Nodes
------------------------ ---------------- -------------------- ---------------- --------------------
server11:3.0.0.68        default          Healthy              Healthy          server11 server13 se
                                                                                rver22 server11 serv
                                                                                er12 server23 server
                                                                                24
server12:3.0.0.69        default          Healthy              Healthy          server12 server21 se
                                                                                rver23 server13 serv
                                                                                er14 server21 server
                                                                                22
```

To filter the list, you can specify the hostname of the master before
the `show` command:

``` text
cumulus@switch:~$ netq server11 show kubernetes cluster
Matching kube_cluster records:
Master                   Cluster Name     Controller Status    Scheduler Status Nodes
------------------------ ---------------- -------------------- ---------------- --------------------
server11:3.0.0.68        default          Healthy              Healthy          server11 server13 se
                                                                                rver22 server11 serv
                                                                                er12 server23 server
                                                                                24
```

Optionally, you can output the results in JSON format:

``` text
cumulus@server11:~$ netq show kubernetes cluster json
{
    "kube_cluster":[
        {
            "clusterName":"default",
            "schedulerStatus":"Healthy",
            "master":"server12:3.0.0.69",
            "nodes":"server12 server21 server23 server13 server14 server21 server22",
            "controllerStatus":"Healthy"
        },
        {
            "clusterName":"default",
            "schedulerStatus":"Healthy",
            "master":"server11:3.0.0.68",
            "nodes":"server11 server13 server22 server11 server12 server23 server24",
            "controllerStatus":"Healthy"
    }
    ],
    "truncatedResult":false
}
```

### View Changes to a Cluster

If data collection from the NetQ Agents is not occurring as it once was,
you can verify that no changes have been made to the Kubernetes cluster
configuration using the *around* keyword. This example shows the changes
that have been made in the last hour. 

``` text
cumulus@server11:~$ netq show kubernetes cluster around 1h 
Matching kube_cluster records:
Master                   Cluster Name     Controller Status    Scheduler Status Nodes                                    DBState  Last changed
------------------------ ---------------- -------------------- ---------------- ---------------------------------------- -------- -------------------------
server11:3.0.0.68        default          Healthy              Healthy          server11 server13 server22 server11 serv Add      Fri Feb  8 01:50:50 2019
                                                                                er12 server23 server24
server12:3.0.0.69        default          Healthy              Healthy          server12 server21 server23 server13 serv Add      Fri Feb  8 01:50:50 2019
                                                                                er14 server21 server22
server12:3.0.0.69        default          Healthy              Healthy          server12 server21 server23 server13      Add      Fri Feb  8 01:50:50 2019
server11:3.0.0.68        default          Healthy              Healthy          server11                                 Add      Fri Feb  8 01:50:50 2019
server12:3.0.0.69        default          Healthy              Healthy          server12                                 Add      Fri Feb  8 01:50:50 2019
```

View Kubernetes Pod Information

You can show configuration and status of the pods in a cluster,
including the names, labels, addresses, associated cluster and
containers, and whether the pod is running. This example shows pods for
FRR, Nginx, Calico, various Kubernetes components sorted by master node.

``` text
cumulus@server11:~$ netq show kubernetes pod 
Matching kube_pod records:
Master                   Namespace    Name                 IP               Node         Labels               Status   Containers               Last Changed
------------------------ ------------ -------------------- ---------------- ------------ -------------------- -------- ------------------------ ----------------
server11:3.0.0.68        default      cumulus-frr-8vssx    3.0.0.70         server13     pod-template-generat Running  cumulus-frr:f8cac70bb217 Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server11:3.0.0.68        default      cumulus-frr-dkkgp    3.0.5.135        server24     pod-template-generat Running  cumulus-frr:577a60d5f40c Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server11:3.0.0.68        default      cumulus-frr-f4bgx    3.0.3.196        server11     pod-template-generat Running  cumulus-frr:1bc73154a9f5 Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server11:3.0.0.68        default      cumulus-frr-gqqxn    3.0.2.5          server22     pod-template-generat Running  cumulus-frr:3ee0396d126a Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server11:3.0.0.68        default      cumulus-frr-kdh9f    3.0.3.197        server12     pod-template-generat Running  cumulus-frr:94b6329ecb50 Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server11:3.0.0.68        default      cumulus-frr-mvv8m    3.0.5.134        server23     pod-template-generat Running  cumulus-frr:b5845299ce3c Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server11:3.0.0.68        default      httpd-5456469bfd-bq9 10.244.49.65     server22     app:httpd            Running  httpd:79b7f532be2d       Fri Feb  8 01:50:50 2019
                                      zm
server11:3.0.0.68        default      influxdb-6cdb566dd-8 10.244.162.128   server13     app:influx           Running  influxdb:15dce703cdec    Fri Feb  8 01:50:50 2019
                                      9lwn
server11:3.0.0.68        default      nginx-8586cf59-26pj5 10.244.9.193     server24     run:nginx            Running  nginx:6e2b65070c86       Fri Feb  8 01:50:50 2019
server11:3.0.0.68        default      nginx-8586cf59-c82ns 10.244.40.128    server12     run:nginx            Running  nginx:01b017c26725       Fri Feb  8 01:50:50 2019
server11:3.0.0.68        default      nginx-8586cf59-wjwgp 10.244.49.64     server22     run:nginx            Running  nginx:ed2b4254e328       Fri Feb  8 01:50:50 2019
server11:3.0.0.68        kube-system  calico-etcd-pfg9r    3.0.0.68         server11     k8s-app:calico-etcd  Running  calico-etcd:f95f44b745a7 Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:142071906
                                                                                         5
server11:3.0.0.68        kube-system  calico-kube-controll 3.0.2.5          server22     k8s-app:calico-kube- Running  calico-kube-controllers: Fri Feb  8 01:50:50 2019
                                      ers-d669cc78f-4r5t2                                controllers                   3688b0c5e9c5
server11:3.0.0.68        kube-system  calico-node-4px69    3.0.2.5          server22     k8s-app:calico-node  Running  calico-node:1d01648ebba4 Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:da350802a3d2
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:324404111
                                                                                         9
server11:3.0.0.68        kube-system  calico-node-bt8w6    3.0.3.196        server11     k8s-app:calico-node  Running  calico-node:9b3358a07e5e Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:d38713e6fdd8
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:324404111
                                                                                         9
server11:3.0.0.68        kube-system  calico-node-gtmkv    3.0.3.197        server12     k8s-app:calico-node  Running  calico-node:48fcc6c40a6b Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:f0838a313eff
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:324404111
                                                                                         9
server11:3.0.0.68        kube-system  calico-node-mvslq    3.0.5.134        server23     k8s-app:calico-node  Running  calico-node:7b361aece76c Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:f2da6bc36bf8
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:324404111
                                                                                         9
server11:3.0.0.68        kube-system  calico-node-sjj2s    3.0.5.135        server24     k8s-app:calico-node  Running  calico-node:6e13b2b73031 Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:fa4b2b17fba9
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:324404111
                                                                                         9
server11:3.0.0.68        kube-system  calico-node-vdkk5    3.0.0.70         server13     k8s-app:calico-node  Running  calico-node:fb3ec9429281 Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:b56980da7294
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:324404111
                                                                                         9
server11:3.0.0.68        kube-system  calico-node-zzfkr    3.0.0.68         server11     k8s-app:calico-node  Running  calico-node:c1ac399dd862 Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:60a779fdc47a
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:324404111
                                                                                         9
server11:3.0.0.68        kube-system  etcd-server11        3.0.0.68         server11     tier:control-plane c Running  etcd:dde63d44a2f5        Fri Feb  8 01:50:50 2019
                                                                                         omponent:etcd
server11:3.0.0.68        kube-system  kube-apiserver-hostd 3.0.0.68         server11     tier:control-plane c Running  kube-apiserver:0cd557bbf Fri Feb  8 01:50:50 2019
                                      -11                                                omponent:kube-apiser          2fe
                                                                                         ver
server11:3.0.0.68        kube-system  kube-controller-mana 3.0.0.68         server11     tier:control-plane c Running  kube-controller-manager: Fri Feb  8 01:50:50 2019
                                      ger-server11                                       omponent:kube-contro          89b2323d09b2
                                                                                         ller-manager
server11:3.0.0.68        kube-system  kube-dns-6f4fd4bdf-p 10.244.34.64     server23     k8s-app:kube-dns     Running  dnsmasq:284d9d363999 kub Fri Feb  8 01:50:50 2019
                                      lv7p                                                                             edns:bd8bdc49b950 sideca
                                                                                                                       r:fe10820ffb19
server11:3.0.0.68        kube-system  kube-proxy-4cx2t     3.0.3.197        server12     k8s-app:kube-proxy p Running  kube-proxy:49b0936a4212  Fri Feb  8 01:50:50 2019
                                                                                         od-template-generati
                                                                                         on:1 controller-revi
                                                                                         sion-hash:3953509896
server11:3.0.0.68        kube-system  kube-proxy-7674k     3.0.3.196        server11     k8s-app:kube-proxy p Running  kube-proxy:5dc2f5fe0fad  Fri Feb  8 01:50:50 2019
                                                                                         od-template-generati
                                                                                         on:1 controller-revi
                                                                                         sion-hash:3953509896
server11:3.0.0.68        kube-system  kube-proxy-ck5cn     3.0.2.5          server22     k8s-app:kube-proxy p Running  kube-proxy:6944f7ff8c18  Fri Feb  8 01:50:50 2019
                                                                                         od-template-generati
                                                                                         on:1 controller-revi
                                                                                         sion-hash:3953509896
server11:3.0.0.68        kube-system  kube-proxy-f9dt8     3.0.0.68         server11     k8s-app:kube-proxy p Running  kube-proxy:032cc82ef3f8  Fri Feb  8 01:50:50 2019
                                                                                         od-template-generati
                                                                                         on:1 controller-revi
                                                                                         sion-hash:3953509896
server11:3.0.0.68        kube-system  kube-proxy-j6qw6     3.0.5.135        server24     k8s-app:kube-proxy p Running  kube-proxy:10544e43212e  Fri Feb  8 01:50:50 2019
                                                                                         od-template-generati
                                                                                         on:1 controller-revi
                                                                                         sion-hash:3953509896
server11:3.0.0.68        kube-system  kube-proxy-lq8zz     3.0.5.134        server23     k8s-app:kube-proxy p Running  kube-proxy:1bcfa09bb186  Fri Feb  8 01:50:50 2019
                                                                                         od-template-generati
                                                                                         on:1 controller-revi
                                                                                         sion-hash:3953509896
server11:3.0.0.68        kube-system  kube-proxy-vg7kj     3.0.0.70         server13     k8s-app:kube-proxy p Running  kube-proxy:8fed384b68e5  Fri Feb  8 01:50:50 2019
                                                                                         od-template-generati
                                                                                         on:1 controller-revi
                                                                                         sion-hash:3953509896
server11:3.0.0.68        kube-system  kube-scheduler-hostd 3.0.0.68         server11     tier:control-plane c Running  kube-scheduler:c262a8071 Fri Feb  8 01:50:50 2019
                                      -11                                                omponent:kube-schedu          3cb
                                                                                         ler
server12:3.0.0.69        default      cumulus-frr-2gkdv    3.0.2.4          server21     pod-template-generat Running  cumulus-frr:25d1109f8898 Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server12:3.0.0.69        default      cumulus-frr-b9dm5    3.0.3.199        server14     pod-template-generat Running  cumulus-frr:45063f9a095f Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server12:3.0.0.69        default      cumulus-frr-rtqhv    3.0.2.6          server23     pod-template-generat Running  cumulus-frr:63e802a52ea2 Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server12:3.0.0.69        default      cumulus-frr-tddrg    3.0.5.133        server22     pod-template-generat Running  cumulus-frr:52dd54e4ac9f Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server12:3.0.0.69        default      cumulus-frr-vx7jp    3.0.5.132        server21     pod-template-generat Running  cumulus-frr:1c20addfcbd3 Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server12:3.0.0.69        default      cumulus-frr-x7ft5    3.0.3.198        server13     pod-template-generat Running  cumulus-frr:b0f63792732e Fri Feb  8 01:50:50 2019
                                                                                         ion:1 name:cumulus-f
                                                                                         rr controller-revisi
                                                                                         on-hash:3710533951
server12:3.0.0.69        kube-system  calico-etcd-btqgt    3.0.0.69         server12     k8s-app:calico-etcd  Running  calico-etcd:72b1a16968fb Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:142071906
                                                                                         5
server12:3.0.0.69        kube-system  calico-kube-controll 3.0.5.132        server21     k8s-app:calico-kube- Running  calico-kube-controllers: Fri Feb  8 01:50:50 2019
                                      ers-d669cc78f-bdnzk                                controllers                   6821bf04696f
server12:3.0.0.69        kube-system  calico-node-4g6vd    3.0.3.198        server13     k8s-app:calico-node  Running  calico-node:1046b559a50c Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:0a136851da17
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:490828062
server12:3.0.0.69        kube-system  calico-node-4hg6l    3.0.0.69         server12     k8s-app:calico-node  Running  calico-node:4e7acc83f8e8 Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:a26e76de289e
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:490828062
server12:3.0.0.69        kube-system  calico-node-4p66v    3.0.2.6          server23     k8s-app:calico-node  Running  calico-node:a7a44072e4e2 Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:9a19da2b2308
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:490828062
server12:3.0.0.69        kube-system  calico-node-5z7k4    3.0.5.133        server22     k8s-app:calico-node  Running  calico-node:9878b0606158 Fri Feb  8 01:50:50 2019
                                                                                         pod-template-generat          install-cni:489f8f326cf9
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:490828062
...
```

You can filter this information to focus on a particular pod:

``` text
cumulus@server11:~$ netq show kubernetes pod node server11
Matching kube_pod records:
Master                   Namespace    Name                 IP               Node         Labels               Status   Containers               Last Changed
------------------------ ------------ -------------------- ---------------- ------------ -------------------- -------- ------------------------ ----------------
server11:3.0.0.68        kube-system  calico-etcd-pfg9r    3.0.0.68         server11     k8s-app:calico-etcd  Running  calico-etcd:f95f44b745a7 2d:14h:0m:59s
                                                                                         pod-template-generat
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:142071906
                                                                                         5
server11:3.0.0.68        kube-system  calico-node-zzfkr    3.0.0.68         server11     k8s-app:calico-node  Running  calico-node:c1ac399dd862 2d:14h:0m:59s
                                                                                         pod-template-generat          install-cni:60a779fdc47a
                                                                                         ion:1 controller-rev
                                                                                         ision-hash:324404111
                                                                                         9
server11:3.0.0.68        kube-system  etcd-server11        3.0.0.68         server11     tier:control-plane c Running  etcd:dde63d44a2f5        2d:14h:1m:44s
                                                                                         omponent:etcd
server11:3.0.0.68        kube-system  kube-apiserver-serve 3.0.0.68         server11     tier:control-plane c Running  kube-apiserver:0cd557bbf 2d:14h:1m:44s
                                      r11                                                omponent:kube-apiser          2fe
                                                                                         ver
server11:3.0.0.68        kube-system  kube-controller-mana 3.0.0.68         server11     tier:control-plane c Running  kube-controller-manager: 2d:14h:1m:44s
                                      ger-server11                                       omponent:kube-contro          89b2323d09b2
                                                                                         ller-manager
server11:3.0.0.68        kube-system  kube-proxy-f9dt8     3.0.0.68         server11     k8s-app:kube-proxy p Running  kube-proxy:032cc82ef3f8  2d:14h:0m:59s
                                                                                         od-template-generati
                                                                                         on:1 controller-revi
                                                                                         sion-hash:3953509896
server11:3.0.0.68        kube-system  kube-scheduler-serve 3.0.0.68         server11     tier:control-plane c Running  kube-scheduler:c262a8071 2d:14h:1m:44s
                                      r11                                                omponent:kube-schedu          3cb
                                                                                         ler
```

### View Kubernetes Node Information

You can view a lot of information about a node, including the pod CIDR
and kubelet status. 

``` text
cumulus@host:~$ netq server11 show kubernetes node
Matching kube_cluster records:
Master                   Cluster Name     Node Name            Role       Status           Labels               Pod CIDR                 Last Changed
------------------------ ---------------- -------------------- ---------- ---------------- -------------------- ------------------------ ----------------
server11:3.0.0.68        default          server11             master     KubeletReady     node-role.kubernetes 10.224.0.0/24            14h:23m:46s
                                                                                           .io/master: kubernet
                                                                                           es.io/hostname:hostd
                                                                                           -11 beta.kubernetes.
                                                                                           io/arch:amd64 beta.k
                                                                                           ubernetes.io/os:linu
                                                                                           x
server11:3.0.0.68        default          server13             worker     KubeletReady     kubernetes.io/hostna 10.224.3.0/24            14h:19m:56s
                                                                                           me:server13 beta.kub
                                                                                           ernetes.io/arch:amd6
                                                                                           4 beta.kubernetes.io
                                                                                           /os:linux
server11:3.0.0.68        default          server22             worker     KubeletReady     kubernetes.io/hostna 10.224.1.0/24            14h:24m:31s
                                                                                           me:server22 beta.kub
                                                                                           ernetes.io/arch:amd6
                                                                                           4 beta.kubernetes.io
                                                                                           /os:linux
server11:3.0.0.68        default          server11             worker     KubeletReady     kubernetes.io/hostna 10.224.2.0/24            14h:24m:16s
                                                                                           me:server11 beta.kub
                                                                                           ernetes.io/arch:amd6
                                                                                           4 beta.kubernetes.io
                                                                                           /os:linux
server11:3.0.0.68        default          server12             worker     KubeletReady     kubernetes.io/hostna 10.224.4.0/24            14h:24m:16s
                                                                                           me:server12 beta.kub
                                                                                           ernetes.io/arch:amd6
                                                                                           4 beta.kubernetes.io
                                                                                           /os:linux
server11:3.0.0.68        default          server23             worker     KubeletReady     kubernetes.io/hostna 10.224.5.0/24            14h:24m:16s
                                                                                           me:server23 beta.kub
                                                                                           ernetes.io/arch:amd6
                                                                                           4 beta.kubernetes.io
                                                                                           /os:linux
server11:3.0.0.68        default          server24             worker     KubeletReady     kubernetes.io/hostna 10.224.6.0/24            14h:24m:1s
                                                                                           me:server24 beta.kub
                                                                                           ernetes.io/arch:amd6
                                                                                           4 beta.kubernetes.io
                                                                                           /os:linux
```

To display the kubelet or Docker version, append `components` to the
above command. This example lists all the details of all master and
worker nodes because the master's hostname — *server11* in this case —
was included in the query.

``` text
cumulus@server11:~$ netq server11 show kubernetes node components 
Matching kube_cluster records:
                         Master           Cluster Name         Node Name    Kubelet      KubeProxy         Container Runt
                                                                                                           ime
------------------------ ---------------- -------------------- ------------ ------------ ----------------- --------------
server11:3.0.0.68        default          server11             v1.9.2       v1.9.2       docker://17.3.2   KubeletReady
server11:3.0.0.68        default          server13             v1.9.2       v1.9.2       docker://17.3.2   KubeletReady
server11:3.0.0.68        default          server22             v1.9.2       v1.9.2       docker://17.3.2   KubeletReady
server11:3.0.0.68        default          server11             v1.9.2       v1.9.2       docker://17.3.2   KubeletReady
server11:3.0.0.68        default          server12             v1.9.2       v1.9.2       docker://17.3.2   KubeletReady
server11:3.0.0.68        default          server23             v1.9.2       v1.9.2       docker://17.3.2   KubeletReady
server11:3.0.0.68        default          server24             v1.9.2       v1.9.2       docker://17.3.2   KubeletReady
```

To view only the details for a worker node, specify the hostname at the
end of the command after the `name` command:

``` text
cumulus@server11:~$ netq server11 show kubernetes node components name server13
Matching kube_cluster records:
                         Master           Cluster Name         Node Name    Kubelet      KubeProxy         Container Runt
                                                                                                           ime
------------------------ ---------------- -------------------- ------------ ------------ ----------------- --------------
server11:3.0.0.68        default          server13             v1.9.2       v1.9.2       docker://17.3.2   KubeletReady
```

You can view information about the replica set:

``` text
cumulus@server11:~$ netq server11 show kubernetes replica-set
Matching kube_replica records:
Master                   Cluster Name Namespace        Replication Name               Labels               Replicas                           Ready Replicas Last Changed
------------------------ ------------ ---------------- ------------------------------ -------------------- ---------------------------------- -------------- ----------------
server11:3.0.0.68        default      default          influxdb-6cdb566dd             app:influx           1                                  1              14h:19m:28s
server11:3.0.0.68        default      default          nginx-8586cf59                 run:nginx            3                                  3              14h:24m:39s
server11:3.0.0.68        default      default          httpd-5456469bfd               app:httpd            1                                  1              14h:19m:28s
server11:3.0.0.68        default      kube-system      kube-dns-6f4fd4bdf             k8s-app:kube-dns     1                                  1              14h:27m:9s
server11:3.0.0.68        default      kube-system      calico-kube-controllers-d669cc k8s-app:calico-kube- 1                                  1              14h:27m:9s
                                                       78f                            controllers
```

You can view information about the daemon set:

``` text
cumulus@server11:~$ netq server11 show kubernetes daemon-set namespace default
Matching kube_daemonset records:
Master                   Cluster Name Namespace        Daemon Set Name                Labels               Desired Count Ready Count Last Changed
------------------------ ------------ ---------------- ------------------------------ -------------------- ------------- ----------- ----------------
server11:3.0.0.68        default      default          cumulus-frr                    k8s-app:cumulus-frr  6             6           14h:25m:37s
```

You can view information about the pod:

``` text
cumulus@server11:~$ netq server11 show kubernetes pod namespace default label nginx
Matching kube_pod records:
Master                   Namespace    Name                 IP               Node         Labels               Status   Containers               Last Changed
------------------------ ------------ -------------------- ---------------- ------------ -------------------- -------- ------------------------ ----------------
server11:3.0.0.68        default      nginx-8586cf59-26pj5 10.244.9.193     server24     run:nginx            Running  nginx:6e2b65070c86       14h:25m:24s
server11:3.0.0.68        default      nginx-8586cf59-c82ns 10.244.40.128    server12     run:nginx            Running  nginx:01b017c26725       14h:25m:24s
server11:3.0.0.68        default      nginx-8586cf59-wjwgp 10.244.49.64     server22     run:nginx            Running  nginx:ed2b4254e328       14h:25m:24s

cumulus@server11:~$ netq server11 show kubernetes pod namespace default label app
Matching kube_pod records:
Master                   Namespace    Name                 IP               Node         Labels               Status   Containers               Last Changed
------------------------ ------------ -------------------- ---------------- ------------ -------------------- -------- ------------------------ ----------------
server11:3.0.0.68        default      httpd-5456469bfd-bq9 10.244.49.65     server22     app:httpd            Running  httpd:79b7f532be2d       14h:20m:34s
                                      zm
server11:3.0.0.68        default      influxdb-6cdb566dd-8 10.244.162.128   server13     app:influx           Running  influxdb:15dce703cdec    14h:20m:34s
                                      9lwn
```

You can view information about the replication controller:

``` text
cumulus@server11:~$ netq server11 show kubernetes replication-controller 
No matching kube_replica records found
```

You can view information about a deployment:

``` text
cumulus@server11:~$ netq server11 show kubernetes deployment name nginx
Matching kube_deployment records:
Master                   Namespace       Name                 Replicas                           Ready Replicas Labels                         Last Changed
------------------------ --------------- -------------------- ---------------------------------- -------------- ------------------------------ ----------------
server11:3.0.0.68        default         nginx                3                                  3              run:nginx                      14h:27m:20s
```

You can search for information using labels as well. The label search is
similar to a "contains" regular expression search. In the following
example, we are looking for all nodes that contain *kube* in the
replication set name or label:

``` text
cumulus@server11:~$ netq server11 show kubernetes replica-set label kube
Matching kube_replica records:
Master                   Cluster Name Namespace        Replication Name               Labels               Replicas                           Ready Replicas Last Changed
------------------------ ------------ ---------------- ------------------------------ -------------------- ---------------------------------- -------------- ----------------
server11:3.0.0.68        default      kube-system      kube-dns-6f4fd4bdf             k8s-app:kube-dns     1                                  1              14h:30m:41s
server11:3.0.0.68        default      kube-system      calico-kube-controllers-d669cc k8s-app:calico-kube- 1                                  1              14h:30m:41s
                                                       78f                            controllers
```

### View Container Connectivity

You can view the connectivity graph of a Kubernetes pod, seeing its
replica set, deployment or service level. The impact/connectivity graph
starts with the server where the pod is deployed, and shows the peer for
each server interface.

``` text
cumulus@server11:~$ netq server11 show kubernetes deployment name nginx connectivity
nginx -- nginx-8586cf59-wjwgp -- server22:swp1:torbond1 -- swp7:hostbond3:torc-21
                              -- server22:swp2:torbond1 -- swp7:hostbond3:torc-22
                              -- server22:swp3:NetQBond-2 -- swp20:NetQBond-20:edge01
                              -- server22:swp4:NetQBond-2 -- swp20:NetQBond-20:edge02
      -- nginx-8586cf59-c82ns -- server12:swp2:NetQBond-1 -- swp23:NetQBond-23:edge01
                              -- server12:swp3:NetQBond-1 -- swp23:NetQBond-23:edge02
                              -- server12:swp1:swp1 -- swp6:VlanA-1:tor-1
      -- nginx-8586cf59-26pj5 -- server24:swp2:NetQBond-1 -- swp29:NetQBond-29:edge01
                              -- server24:swp3:NetQBond-1 -- swp29:NetQBond-29:edge02
                              -- server24:swp1:swp1 -- swp8:VlanA-1:tor-2
```

### View Kubernetes Service Connectivity and Impact

You can show the Kubernetes services in a cluster:

``` text
cumulus@server11:~$ netq show kubernetes service 
Matching kube_service records:
Master                   Namespace        Service Name         Labels       Type       Cluster IP       External IP      Ports                               Last Changed
------------------------ ---------------- -------------------- ------------ ---------- ---------------- ---------------- ----------------------------------- ----------------
server11:3.0.0.68        default          kubernetes                        ClusterIP  10.96.0.1                         TCP:443                             2d:13h:45m:30s
server11:3.0.0.68        kube-system      calico-etcd          k8s-app:cali ClusterIP  10.96.232.136                     TCP:6666                            2d:13h:45m:27s
                                                               co-etcd
server11:3.0.0.68        kube-system      kube-dns             k8s-app:kube ClusterIP  10.96.0.10                        UDP:53 TCP:53                       2d:13h:45m:28s
                                                               -dns
server12:3.0.0.69        default          kubernetes                        ClusterIP  10.96.0.1                         TCP:443                             2d:13h:46m:24s
server12:3.0.0.69        kube-system      calico-etcd          k8s-app:cali ClusterIP  10.96.232.136                     TCP:6666                            2d:13h:46m:20s
                                                               co-etcd
server12:3.0.0.69        kube-system      kube-dns             k8s-app:kube ClusterIP  10.96.0.10                        UDP:53 TCP:53                       2d:13h:46m:20s
                                                               -dns
```

And get detailed information about a Kubernetes service:

``` text
cumulus@server11:~$ netq show kubernetes service name calico-etcd 
Matching kube_service records:
Master                   Namespace        Service Name         Labels       Type       Cluster IP       External IP      Ports                               Last Changed
------------------------ ---------------- -------------------- ------------ ---------- ---------------- ---------------- ----------------------------------- ----------------
server11:3.0.0.68        kube-system      calico-etcd          k8s-app:cali ClusterIP  10.96.232.136                     TCP:6666                            2d:13h:48m:10s
                                                               co-etcd
server12:3.0.0.69        kube-system      calico-etcd          k8s-app:cali ClusterIP  10.96.232.136                     TCP:6666                            2d:13h:49m:3s
                                                               co-etcd
```

To see the connectivity of a given Kubernetes service, run:

``` text
cumulus@server11:~$ netq show kubernetes service name calico-etcd connectivity 
calico-etcd -- calico-etcd-pfg9r -- server11:swp1:torbond1 -- swp6:hostbond2:torc-11
                                 -- server11:swp2:torbond1 -- swp6:hostbond2:torc-12
                                 -- server11:swp3:NetQBond-2 -- swp16:NetQBond-16:edge01
                                 -- server11:swp4:NetQBond-2 -- swp16:NetQBond-16:edge02
calico-etcd -- calico-etcd-btqgt -- server12:swp1:torbond1 -- swp7:hostbond3:torc-11
                                 -- server12:swp2:torbond1 -- swp7:hostbond3:torc-12
                                 -- server12:swp3:NetQBond-2 -- swp17:NetQBond-17:edge01
                                 -- server12:swp4:NetQBond-2 -- swp17:NetQBond-17:edge02
```

To see the impact of a given Kubernetes service, run:

``` text
cumulus@server11:~$ netq server11 show impact kubernetes service name calico-etcd 
calico-etcd -- calico-etcd-pfg9r -- server11:swp1:torbond1 -- swp6:hostbond2:torc-11
                                 -- server11:swp2:torbond1 -- swp6:hostbond2:torc-12
                                 -- server11:swp3:NetQBond-2 -- swp16:NetQBond-16:edge01
                                 -- server11:swp4:NetQBond-2 -- swp16:NetQBond-16:edge02
```

### View Kubernetes Cluster Configuration in the Past

You can use the ["time machine"
features](Methods_for_Diagnosing_Network_Issues) of NetQ on a Kubernetes
cluster, using the `around` keyword to go back in time to check the
network status and identify any changes that occurred on the network.

This example shows the current state of the network. Notice there is a
node named *server23*. server23 is there because the
node *server22* went down and Kubernetes spun up a third replica on a
different host to satisfy the deployment requirement.

``` text
cumulus@redis-1:~$ netq server11 show kubernetes deployment name nginx connectivity
nginx -- nginx-8586cf59-fqtnj -- server12:swp2:NetQBond-1 -- swp23:NetQBond-23:edge01
                              -- server12:swp3:NetQBond-1 -- swp23:NetQBond-23:edge02
                              -- server12:swp1:swp1 -- swp6:VlanA-1:tor-1
      -- nginx-8586cf59-8g487 -- server24:swp2:NetQBond-1 -- swp29:NetQBond-29:edge01
                              -- server24:swp3:NetQBond-1 -- swp29:NetQBond-29:edge02
                              -- server24:swp1:swp1 -- swp8:VlanA-1:tor-2
      -- nginx-8586cf59-2hb8t -- server23:swp1:swp1 -- swp7:VlanA-1:tor-2
                              -- server23:swp2:NetQBond-1 -- swp28:NetQBond-28:edge01
                              -- server23:swp3:NetQBond-1 -- swp28:NetQBond-28:edge02
```

You can see this by going back in time 10 minutes. *server23* was not
present, whereas *server22* **was** present:

``` text
cumulus@redis-1:~$ netq server11 show kubernetes deployment name nginx connectivity around 10m
nginx -- nginx-8586cf59-fqtnj -- server12:swp2:NetQBond-1 -- swp23:NetQBond-23:edge01
                              -- server12:swp3:NetQBond-1 -- swp23:NetQBond-23:edge02
                              -- server12:swp1:swp1 -- swp6:VlanA-1:tor-1
      -- nginx-8586cf59-2xxs4 -- server22:swp1:torbond1 -- swp7:hostbond3:torc-21
                              -- server22:swp2:torbond1 -- swp7:hostbond3:torc-22
                              -- server22:swp3:NetQBond-2 -- swp20:NetQBond-20:edge01
                              -- server22:swp4:NetQBond-2 -- swp20:NetQBond-20:edge02
      -- nginx-8586cf59-8g487 -- server24:swp2:NetQBond-1 -- swp29:NetQBond-29:edge01
                              -- server24:swp3:NetQBond-1 -- swp29:NetQBond-29:edge02
                              -- server24:swp1:swp1 -- swp8:VlanA-1:tor-2
```

You can determine the impact on the Kubernetes deployment in the event a
host or switch goes down. The output is color coded (not shown in the
example below) so you can clearly see the impact: green shows no impact,
yellow shows partial impact, and red shows full impact.

``` text
cumulus@server11:~$ netq torc-21 show impact kubernetes deployment name nginx
nginx -- nginx-8586cf59-wjwgp -- server22:swp1:torbond1 -- swp7:hostbond3:torc-21
                              -- server22:swp2:torbond1 -- swp7:hostbond3:torc-22
                              -- server22:swp3:NetQBond-2 -- swp20:NetQBond-20:edge01
                              -- server22:swp4:NetQBond-2 -- swp20:NetQBond-20:edge02
      -- nginx-8586cf59-c82ns -- server12:swp2:NetQBond-1 -- swp23:NetQBond-23:edge01
                              -- server12:swp3:NetQBond-1 -- swp23:NetQBond-23:edge02
                              -- server12:swp1:swp1 -- swp6:VlanA-1:tor-1
      -- nginx-8586cf59-26pj5 -- server24:swp2:NetQBond-1 -- swp29:NetQBond-29:edge01
                              -- server24:swp3:NetQBond-1 -- swp29:NetQBond-29:edge02
                              -- server24:swp1:swp1 -- swp8:VlanA-1:tor-2
cumulus@server11:~$ netq server12 show impact kubernetes deployment name nginx
nginx -- nginx-8586cf59-wjwgp -- server22:swp1:torbond1 -- swp7:hostbond3:torc-21
                              -- server22:swp2:torbond1 -- swp7:hostbond3:torc-22
                              -- server22:swp3:NetQBond-2 -- swp20:NetQBond-20:edge01
                              -- server22:swp4:NetQBond-2 -- swp20:NetQBond-20:edge02
      -- nginx-8586cf59-c82ns -- server12:swp2:NetQBond-1 -- swp23:NetQBond-23:edge01
                              -- server12:swp3:NetQBond-1 -- swp23:NetQBond-23:edge02
                              -- server12:swp1:swp1 -- swp6:VlanA-1:tor-1
      -- nginx-8586cf59-26pj5 -- server24:swp2:NetQBond-1 -- swp29:NetQBond-29:edge01
                              -- server24:swp3:NetQBond-1 -- swp29:NetQBond-29:edge02
```

## Use NetQ with Docker Swarm

The NetQ Agent parses the following Docker events:

-   Image: pull and delete
-   Container: run, stop, start, restart, attach and detach
-   Network: create, connect, disconnect and destroy

Currently, the NetQ Agent does not support:

-   Monitoring Docker volume mount and unmount events
-   Plugin install and deletes
-   Third party network configuration through plugins like Calico

### Requirements

The NetQ Agent supports Docker version 1.13 (Jan 2017), 17.03 or later,
including Docker Swarm.

Due to the higher memory requirements to run containers, Cumulus
Networks recommends you run the NetQ Telemetry Server on a host with at
least 32G RAM. For more information, read the [How Far Back in Time Can
You
Travel?](Methods-for-Diagnosing-Network-Issues_8365488.html#MethodsforDiagnosingNetworkIssues-matrix) topic.

### Command Summary

NetQ provides a set of commands to monitor Docker configurations,
including the ability to monitor network, service, Swarm cluster,
network, and nodes. Run `netq show docker help` to see all the possible
commands:

``` text
netq [<hostname>] show docker container [<ipv4> | <ipv6>] [portmap] [name <container-name> | image <container-image> | service <swarm-service-name> | network <network-name> ] [around <text-time>] [json]
netq [<hostname>] show docker container [<ipv4> | <ipv6>] <proto> [<port>] [network <network-name>] [around <text-time>] [json]
netq [<hostname>] show docker container [<ipv4> | <ipv6> | name <container-name> | image <container-image> | service <swarm-service-name> | network <network-name> ] connectivity [around <text-time>] [json]
netq <hostname> show docker container adjacent [interfaces <remote-physical-interface>] [around <text-time>] [json]
netq [<hostname>] show docker summary [<docker-version>] [around <text-time>] [json]
netq [<hostname>] show docker network [name <network-name> | <ipv4/prefixlen>] [brief] [around <text-time>] [json]
netq [<hostname>] show docker network driver <network-driver> [brief] [around <text-time>] [json]
netq [<hostname>] show docker service [name <swarm-service-name> | mode <mode>] [around <text-time>] [json]
netq [<hostname>] show docker service [name <swarm-service-name> | mode <mode>] connectivity [vrf <vrf>] [around <text-time>] [json]
netq <hostname> show impact docker service [<swarm-service-name>] [vrf <vrf>] [around <text-time>] [json]
netq [<hostname>] show docker swarm cluster [node-name <cluster-node>] [around <text-time>] [json]
netq [<hostname>] show docker swarm cluster [<cluster-name>] [node-name <cluster-node>] [around <text-time>] [json]
netq <hostname>   show docker swarm cluster [<cluster-name>] [json]
netq [<hostname>] show docker swarm network [<swarm-service-name>] [around <text-time>] [json]
netq  <hostname>  show docker swarm network [<swarm-service-name>] [json]
netq [<hostname>] show docker swarm node [<node-name> | role <role>] [cluster <cluster-name>] [around <text-time>] [json]
netq  <hostname>  show docker swarm node [<node-name> | role <role>] [cluster <cluster-name>] [json]
netq config show agent [kubernetes-monitor|docker-monitor|loglevel|stats|sensors|frr-monitor] [json]
```

### Enable Docker Container Monitoring

For NetQ to monitor the Docker containers on a host, you must configure
the following on the host:

1.  Configure the host to point to the NetQ Platform by its IP
    address. Refer to the [Install NetQ](Install_NetQ) topic for
    details.
2.  Enable Docker monitoring by NetQ. You can specify a polling period
    between 10 and 120 seconds; 15 seconds is the default.

    ``` text
    cumulus@server11:~$ netq config add agent docker-monitor poll-period 20
    Successfully added docker monitor. Please restart netq-agent.
    ```

3.  Restart the NetQ agent:

    ``` text
    cumulus@server01:~$ netq config restart agent
    ```

### View Container Summary Information

To see a high level view of the network, including the number of
containers installed and running on the network, run
the `netq show docker summary` command:

``` text
cumulus@host:~$ netq show docker summary 
Hostname    Version     Installed    Running    Images    Swarm Cluster    Networks
----------  ----------  -----------  ---------  --------  ---------------  ----------
exit01      17.06.0-ce           26         26         1                            3
exit02      17.06.0-ce            1          0         3                            3
server01    17.06.0-ce           14         14         4  default                   5
server02    17.06.0-ce            0          0         0                            3
server03    17.06.0-ce            0          0         0                            3
server04    17.06.0-ce            0          0         0                            3
server01    17.06.0-ce           13         13         1  default                   3
server02    17.06.0-ce            0          0         0                            3
```

### Identify Containers on the Network

To view the different container networks and the containers in them,
run `netq show docker network`:

``` text
cumulus@host:~$ netq show docker network
Network Name     Hostname   subnet          gateway         ipv6      ip masq. 
---------------- ---------- --------------- --------------- --------- -------- 
bridge           exit01     172.17.0.0/16                   Disabled  True     
bridge           exit02     172.17.0.0/16                   Disabled  True     
bridge           server01   172.17.0.0/16                   Disabled  True     
bridge           server02   172.17.0.0/16                   Disabled  True     
bridge           server03   172.17.0.0/16                   Disabled  True     
bridge           server04   172.17.0.0/16                   Disabled  True     
bridge           server01   172.17.0.0/16                   Disabled  True     
bridge           server02   172.17.0.0/16                   Disabled  True     
bridge           server03   172.17.0.0/16                   Disabled  True     
bridge           server04   172.17.0.0/16                   Disabled  True    
host             exit01                                     Disabled  False    
host             exit02                                     Disabled  False    
host             server01                                   Disabled  False    
host             server02                                   Disabled  False    
host             server03                                   Disabled  False   
host             server04                                   Disabled  False   
host             server01                                   Disabled  False    
host             server02                                   Disabled  False    
host             server03                                   Disabled  False    
host             server04                                   Disabled  False    
none             exit01                                     Disabled  False    
none             exit02                                     Disabled  False    
none             server01                                   Disabled  False    
none             server02                                   Disabled  False    
none             server03                                   Disabled  False    
none             server04                                   Disabled  False    
none             server01                                   Disabled  False    
none             server02                                   Disabled  False    
none             server03                                   Disabled  False    
none             server04                                   Disabled  False    
```

### View Deployed Container Network Drivers

To view all the hosts using a specific container network driver,
use `netq show docker network driver NAME`. Use the `brief` keyword for
a shorter summary. Docker supports many network drivers. 

``` text
cumulus@host:~$ netq show docker network driver bridge brief 
Network Name     Hostname   Driver    subnet          gateway         IP Masq  Containers
---------------- ---------- --------- --------------- --------------- -------- -------------------------
bridge           exit01     bridge    172.17.0.0/16                   True     Name:netcat-8085 IPv4:172
                                                                               .17.0.7/16,
                                                                               Name:netcat-8082 IPv4:172
                                                                               .17.0.4/16,
                                                                               Name:netcat-8083 IPv4:172
                                                                               .17.0.5/16,
                                                                               Name:netcat-8089 IPv4:172
                                                                               .17.0.11/16,
                                                                               Name:netcat-8081 IPv4:172
                                                                               .17.0.3/16,
                                                                               Name:netcat-8084 IPv4:172
                                                                               .17.0.6/16,
                                                                               Name:netcat-8090 IPv4:172
                                                                               .17.0.12/16,
                                                                               Name:netcat-8080 IPv4:172
                                                                               .17.0.2/16,
                                                                               Name:netcat-8091 IPv4:172
                                                                               .17.0.13/16,
                                                                               Name:netcat-8092 IPv4:172
                                                                               .17.0.14/16,
                                                                               Name:netcat-8088 IPv4:172
                                                                               .17.0.10/16,
                                                                               Name:netcat-8087 IPv4:172
                                                                               .17.0.9/16,
                                                                               Name:netcat-8086 IPv4:172
                                                                               .17.0.8/16
bridge           exit02     bridge    172.17.0.0/16                   True     
bridge           server01   bridge    172.17.0.0/16                   True     
bridge           server02   bridge    172.17.0.0/16                   True     
bridge           server03   bridge    172.17.0.0/16                   True     
bridge           server04   bridge    172.17.0.0/16                   True     
bridge           server01   bridge    172.17.0.0/16                   True     Name:netcat-8082 IPv4:172
                                                                               .17.0.4/16,
                                                                               Name:netcat-8085 IPv4:172
                                                                               .17.0.7/16,
                                                                               Name:netcat-8083 IPv4:172
                                                                               .17.0.5/16,
                                                                               Name:netcat-8086 IPv4:172
                                                                               .17.0.8/16,
                                                                               Name:netcat-8089 IPv4:172
                                                                               .17.0.11/16,
                                                                               Name:netcat-8084 IPv4:172
                                                                               .17.0.6/16,
                                                                               Name:netcat-8092 IPv4:172
                                                                               .17.0.14/16,
                                                                               Name:netcat-8087 IPv4:172
                                                                               .17.0.9/16,
                                                                               Name:netcat-8080 IPv4:172
                                                                               .17.0.2/16,
                                                                               Name:netcat-8081 IPv4:172
                                                                               .17.0.3/16,
                                                                               Name:netcat-8090 IPv4:172
                                                                               .17.0.12/16,
                                                                               Name:netcat-8091 IPv4:172
                                                                               .17.0.13/16,
                                                                               Name:netcat-8088 IPv4:172
                                                                               .17.0.10/16
bridge           server02   bridge    172.17.0.0/16                   True
bridge           server03   bridge    172.17.0.0/16                   True
bridge           server04   bridge    172.17.0.0/16                   True
```

### View All Containers in a Network

To see all the containers on a given container network, run the
following command, where the container network is named *host*:

``` text
cumulus@host:~$ netq show docker container network host 
Container Name       Hostname   Container IP      IP Masq  Network Name   Service Name    UpTime
-------------------- ---------- ----------------- -------- -------------- --------------- ---------------
netcat-9080          exit01     45.0.0.17/26,     False    host                           0:29:42
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9081          exit01     45.0.0.17/26,     False    host                           0:29:41
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9082          exit01     45.0.0.17/26,     False    host                           0:29:42
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9083          exit01     45.0.0.17/26,     False    host                           0:29:39
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9084          exit01     45.0.0.17/26,     False    host                           0:29:40
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9085          exit01     45.0.0.17/26,     False    host                           0:29:40
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9086          exit01     45.0.0.17/26,     False    host                           0:29:39
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9087          exit01     45.0.0.17/26,     False    host                           0:29:38
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9088          exit01     45.0.0.17/26,     False    host                           0:29:37
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9089          exit01     45.0.0.17/26,     False    host                           0:29:38
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9090          exit01     45.0.0.17/26,     False    host                           0:29:36
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9091          exit01     45.0.0.17/26,     False    host                           0:29:37
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9092          exit01     45.0.0.17/26,     False    host                           0:29:38
                                27.0.0.3/32,
                                192.168.0.15/24
```

The Service Name column is populated when a container is created by
Docker Swarm for a service:

``` text
cumulus@leaf01:mgmt-vrf:~$ netq show docker container
Matching container records are:
Container Name       Hostname   Container IP      IP Masq  Network Name   Service Name    UpTime
-------------------- ---------- ----------------- -------- -------------- --------------- ---------------
Web.3.xm2jjbe1l60eje server11   10.255.0.9        False    ingress        Web             16:30:47 
sgpx8rlq5pf 
redis2.nh7ouztl2ap79 server21   172.17.0.2        True     bridge         redis2          16:36:52 
2iyycl5bukfh.lznwsxh
8jepg65hr16kccxeau 
redis2.rx8uywzrkm9pj server11   172.17.0.2        True     bridge         redis2          16:36:52 
e9a81613gfpm.s6fhc09
1xwoqmkjdi3y1kxm7z 
Web.1.m72ghox4y2bfeg server21   10.255.0.7        False    ingress        Web             16:30:47
f1ukeocjhgn
Web.2.9t9yuv9za28taz server11   10.255.0.8        False    ingress        Web             16:30:46
3mee6pr8d11
Web.3.kv0icnnh7fxb45 server21   10.255.0.11       False    ingress        Web             14:31:58
```

### View Container Adjacency

NetQ can list all the containers running on hosts adjacent to a top of
rack switch. This helps in analyzing what impact the ToR switch can have
on an
application. Run `netq NODE show docker container adjacent `to identify
all the containers that may have been launched on hosts adjacent to a
given node: 

``` text
cumulus@leaf01:~$ netq leaf01 show docker container adjacent
Interface            Peer Node  Peer Interface        Container Name       IP                   Network    Service Name
-------------------- ---------- --------------------- -------------------- -------------------- ---------- ---------------
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9090                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9082                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9091                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9086                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9081                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9083                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9087                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9088                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9085                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9080                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9084                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9089                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9092                               host
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8089          172.17.0.11          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8084          172.17.0.6           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8092          172.17.0.14          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8083          172.17.0.5           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8085          172.17.0.7           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8081          172.17.0.3           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8080          172.17.0.2           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8086          172.17.0.8           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8088          172.17.0.10          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8082          172.17.0.4           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8091          172.17.0.13          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8090          172.17.0.12          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8087          172.17.0.9           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8091          172.17.0.13          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8083          172.17.0.5           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8087          172.17.0.9           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8082          172.17.0.4           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8080          172.17.0.2           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8092          172.17.0.14          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8086          172.17.0.8           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8084          172.17.0.6           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8088          172.17.0.10          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8090          172.17.0.12          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8085          172.17.0.7           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8089          172.17.0.11          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8081          172.17.0.3           bridge
```

You can filter this output for a given interface:

``` text
cumulus@switch:~$ netq leaf01 show docker container adjacent interfaces swp6
Interface            Peer Node  Peer Interface        Container Name       IP                   Network    Service Name
-------------------- ---------- --------------------- -------------------- -------------------- ---------- ---------------
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9090                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9082                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9091                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9086                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9081                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9083                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9087                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9088                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9085                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9080                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9084                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9089                               host                                
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9092                               host
```

### Show Container-Specific Information

You can see information about a given container by
running `netq show docker container name NAME`:

``` text
cumulus@host:~$ netq show docker container name netcat-9092
Name                 Node       IP                IP Masq. Network        Service Name    Up time
-------------------- ---------- ----------------- -------- -------------- --------------- ---------------
netcat-9092          exit01     45.0.0.17/26,     False    host                           0:34:15
                                27.0.0.3/32,
                                192.168.0.15/24
```

### Show Containers with a Specific Image

To search for all the containers on the network with a specific Docker
image, run `netq show docker container image IMAGE_NAME`:  

``` text
cumulus@host:~$ netq show docker container image chilcano/netcat:jessie 
Name                 Node       IP                IP Masq. Network        Service Name    Up time
-------------------- ---------- ----------------- -------- -------------- --------------- ---------------
netcat-8080          exit01     172.17.0.2        True     bridge                         0:32:09
netcat-8080          server01   172.17.0.2        True     bridge                         0:23:11
netcat-8081          exit01     172.17.0.3        True     bridge                         0:32:07
netcat-8081          server01   172.17.0.3        True     bridge                         0:23:10
netcat-8082          exit01     172.17.0.4        True     bridge                         0:32:08
netcat-8082          server01   172.17.0.4        True     bridge                         0:23:08
netcat-8083          exit01     172.17.0.5        True     bridge                         0:32:07
netcat-8083          server01   172.17.0.5        True     bridge                         0:23:07
netcat-8084          exit01     172.17.0.6        True     bridge                         0:32:07
netcat-8084          server01   172.17.0.6        True     bridge                         0:23:09
netcat-8085          exit01     172.17.0.7        True     bridge                         0:32:05
netcat-8085          server01   172.17.0.7        True     bridge                         0:23:06
netcat-8086          exit01     172.17.0.8        True     bridge                         0:32:06
netcat-8086          server01   172.17.0.8        True     bridge                         0:23:06
netcat-8087          exit01     172.17.0.9        True     bridge                         0:32:05
netcat-8087          server01   172.17.0.9        True     bridge                         0:23:06
netcat-8088          exit01     172.17.0.10       True     bridge                         0:32:04
netcat-8088          server01   172.17.0.10       True     bridge                         0:23:06
netcat-8089          exit01     172.17.0.11       True     bridge                         0:32:02
netcat-8089          server01   172.17.0.11       True     bridge                         0:23:03
netcat-8090          exit01     172.17.0.12       True     bridge                         0:32:01
netcat-8090          server01   172.17.0.12       True     bridge                         0:23:05
netcat-8091          exit01     172.17.0.13       True     bridge                         0:32:03
netcat-8091          server01   172.17.0.13       True     bridge                         0:23:04
netcat-8092          exit01     172.17.0.14       True     bridge                         0:31:59
netcat-8092          server01   172.17.0.14       True     bridge                         0:23:03
netcat-9080          exit01     45.0.0.17/26,     False    host                           0:31:51
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9081          exit01     45.0.0.17/26,     False    host                           0:31:51
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9082          exit01     45.0.0.17/26,     False    host                           0:31:52
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9083          exit01     45.0.0.17/26,     False    host                           0:31:49
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9084          exit01     45.0.0.17/26,     False    host                           0:31:50
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9085          exit01     45.0.0.17/26,     False    host                           0:31:50
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9086          exit01     45.0.0.17/26,     False    host                           0:31:48
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9087          exit01     45.0.0.17/26,     False    host                           0:31:48
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9088          exit01     45.0.0.17/26,     False    host                           0:31:47
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9089          exit01     45.0.0.17/26,     False    host                           0:31:48
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9090          exit01     45.0.0.17/26,     False    host                           0:31:46
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9091          exit01     45.0.0.17/26,     False    host                           0:31:47
                                27.0.0.3/32,
                                192.168.0.15/24
netcat-9092          exit01     45.0.0.17/26,     False    host                           0:31:47
                                27.0.0.3/32,
                                192.168.0.15/24
```

### Show Container Connectivity

Run `netq HOST show docker container network NAME connectivity` to
determine how a particular container is attached to a network.  The
output tells you the host where the container was launched, adjacent
nodes, and adjacent ports. 

``` text
cumulus@leaf01:~$ netq server01 show docker container network host connectivity 
Name            Swarm Service Cont IP         Network    Node       Port                 Peer Node  Peer Port
--------------- ------------- --------------- ---------- ---------- -------------------- ---------- --------------------
netcat-9080                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9080                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9080                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9081                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9081                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9081                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9082                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9082                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9082                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9083                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9083                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9083                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9084                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9084                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9084                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9085                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9085                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9085                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9086                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9086                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9086                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9087                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9087                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9087                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9088                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9088                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9088                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9089                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9089                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9089                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9090                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9090                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9090                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9091                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9091                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9091                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
netcat-9092                                   host       server01   swp2:NetQBond-1      edge01     swp21:NetQBond-19
netcat-9092                                   host       server01   swp3:NetQBond-1      edge02     swp21:NetQBond-19
netcat-9092                                   host       server01   swp1:swp1            leaf01     Local Node leaf01 and
                                                                                                    Ports swp6 <==> Remo
                                                                                                    te  Node/s server11
                                                                                                    and Ports swp1
```

### Check Network Traffic over a Given Protocol

You can specify either the TCP or UDP protocol when you observe a given
flow of traffic on the network and want to identify which container sent
or received traffic using that protocol from a given port. 

``` text
cumulus@switch:mgmt-vrf:~$ netq server11 show docker container 6.0.1.5 tcp 
Container Name       Node       Proto  Port     Cont IP           Network        Host IP               Host Port
-------------------- ---------- ------ -------- ----------------- -------------- --------------------- ------------
netcat-9080          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9080          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9081          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9081          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9082          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9082          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9083          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9083          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9084          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9084          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9085          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9085          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9086          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9086          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9087          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9087          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9088          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9088          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9089          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9089          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9090          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9090          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9091          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9091          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
netcat-9092          server01   tcp    9192                       host           6.0.1.5/26:swp1.1004  9192
netcat-9092          server01   tcp    8182                       host           6.0.1.5/26:swp1.1004  8182
```

### Show Docker Swarm Clusters and Networks

To see the elements of a Docker Swarm cluster, run:

``` text
cumulus@host:~$ netq show docker swarm cluster
Matching swarm records are:
Cluster Name    Num Nodes Manager Nodes                            Worker Nodes
--------------- --------- ---------------------------------------- ------------------------------
default         3         server01:45.0.0.20:2377,                 server01, server02, server03
                          server02:45.0.0.24:2377
default         2         server05:45.0.0.27:2377                  server04, server05
```

Optionally, you can output the results in JSON format:

``` text
cumulus@host:~$ netq show docker swarm cluster json
{
    "swarm": [
        {
            "clusterName": "default",
            "managerNodes": "server01:45.0.0.20:2377, server02:45.0.0.24:2377",
            "workerNodes": "server01, server02, server03",
            "numNodes": 3
        },
        {
            "clusterName": "default",
            "managerNodes": "server05:45.0.0.27:2377",
            "workerNodes": "server04, server05",
            "numNodes": 2
        }
    ],
    "truncatedResult": false
}
```

You can show the nodes in a swarm:

``` text
cumulus@host:~$ netq show docker swarm node
Matching swarm records are:
Swarm Node    Node Id                    Cluster Name    Role     Docker Version    State    Availability
------------  -------------------------  --------------  -------  ----------------  -------  --------------
server01      knyao3pkk8h872cep3vabrpum  default         manager  17.06.1-ce        ready    active
server02      jatmsbs71rv9nmqw5grqncqw2  default         manager  17.06.1-ce        ready    active
server03      tqrj8ro7b1ycymihquawr1szr  default         worker   17.06.1-ce        ready    active
server04      gwp89587uujywot6d2fo5vi3e  default         worker   17.06.1-ce        ready    active
server05      26boo6bak3exgi6nox8dmm2o2  default         manager  17.06.1-ce        ready    active
```

You can drill down to get information about a specific node in a swarm:

``` text
cumulus@host:~$ netq show docker swarm cluster node-name server04
Matching swarm records are:
Cluster Name    Num Nodes Manager Nodes                            Worker Nodes
--------------- --------- ---------------------------------------- ------------------------------
default         2         server05:45.0.0.27:2377                  server04, server05
```

To view configuration at an earlier point in time, run:

``` text
cumulus@server05:~$ netq show docker swarm cluster node-name server04 around 10m
Matching swarm records are:
Cluster Name    Num Nodes Manager Nodes                            Worker Nodes
--------------- --------- ---------------------------------------- ------------------------------
default         2         server05:45.0.0.27:2377                  server04, server05
```

For details about a Docker Swarm network, run:

``` text
cumulus@server01:~$ netq show docker swarm network nginx
Matching swarm records are:
Service Name    Port Mapping               Virtual IP      Network Name
--------------  -------------------------  --------------  --------------
nginx           tcp:9080:80, tcp:9443:443  10.255.0.12/16  ingress
```

### Show Docker Service Connectivity and Impact

You can show the Docker services in a cluster:

``` text
cumulus@host:~$ netq show docker service
Matching service records are:
Service Name    Manager    Cluster    Mode        Replicas    Running
--------------  ---------  ---------  ----------  ----------  ---------
redis           server01   default    Replicated           6          6
redis           server02   default    Replicated           6          6
```

And get detailed information about a Docker service:

``` text
cumulus@host:~$ netq show docker container service redis
Matching container records are:
Container Name       Hostname   Container IP      IP Masq  Network Name   Service Name    UpTime
-------------------- ---------- ----------------- -------- -------------- --------------- ---------------
redis.1.d3k6fyx3cmdn server01   10.255.0.6        False    ingress        redis           0:07:11
3y5tr0uveuenk
redis.2.qcs7kt3si79i server02   10.255.0.11       False    ingress        redis           0:06:42
s98tdkbid9k03
redis.3.kh4bvgcpmnfg server02   10.255.0.7        False    ingress        redis           0:06:41
hvihbx2oi9xb0
redis.4.48h1jm5gq3u9 server03   10.255.0.8        False    ingress        redis           0:06:42
rmtb68lzap6kp
redis.5.kz1djm3gczst server03   10.255.0.9        False    ingress        redis           0:06:42
w8xf34oa9592z
redis.6.jicycmsbe8qj server01   10.255.0.10       False    ingress        redis           0:06:50
kw2m5c1mn7dxb
```

To see the connectivity of a given Docker service, run:

``` text
cumulus@host:~$ netq show docker service name redis connectivity
redis -- redis.3.kh4bvgcpmnfghvihbx2oi9xb0 -- server02 -- leaf01
                                                    -- exit01
                                                    -- leaf05
    -- redis.5.kz1djm3gczstw8xf34oa9592z -- server03 -- leaf05
                                                    -- leaf01
                                                    -- exit01
    -- redis.1.d3k6fyx3cmdn3y5tr0uveuenk -- server01 -- leaf03
                                                    -- leaf02
                                                    -- leaf01
                                                    -- exit01
    -- redis.6.jicycmsbe8qjkw2m5c1mn7dxb -- server01 -- leaf03
                                                    -- leaf02
                                                    -- leaf01
                                                    -- exit01
    -- redis.4.48h1jm5gq3u9rmtb68lzap6kp -- server03 -- leaf05
                                                    -- leaf01
                                                    -- exit01
    -- redis.2.qcs7kt3si79is98tdkbid9k03 -- server02 -- leaf01
                                                    -- exit01
                                                    -- leaf05
```

You can determine the impact on the Docker deployment in the event a
host or switch goes down. The output is color coded (not shown in the
example below) so you can clearly see the impact: green shows no impact,
yellow shows partial impact, and red shows full impact.

``` text
cumulus@server01:~$ netq leaf05 show impact docker service redis
redis -- redis.3.kh4bvgcpmnfghvihbx2oi9xb0 -- server02 -- leaf01
                                                    -- exit01
                                                    -- leaf05
    -- redis.5.kz1djm3gczstw8xf34oa9592z -- server03 -- leaf05
                                                    -- leaf01
                                                    -- exit01
    -- redis.1.d3k6fyx3cmdn3y5tr0uveuenk -- server01 -- leaf03
                                                    -- leaf02
                                                    -- leaf01
                                                    -- exit01
    -- redis.6.jicycmsbe8qjkw2m5c1mn7dxb -- server01 -- leaf03
                                                    -- leaf02
                                                    -- leaf01
                                                    -- exit01
    -- redis.4.48h1jm5gq3u9rmtb68lzap6kp -- server03 -- leaf05
                                                    -- leaf01
                                                    -- exit01
    -- redis.2.qcs7kt3si79is98tdkbid9k03 -- server02 -- leaf01
                                                    -- exit01
                                                    -- leaf05
```

### View Docker Configuration in the Past

You can use the ["time machine"
features](Methods_for_Diagnosing_Network_Issues) of NetQ on a Docker
container, using the `around` keyword to go back in time to check the
network status and identify any changes that occurred on the network.
This example shows the state of the network one hour earlier. 

``` text
cumulus@leaf01:~$ netq leaf01 show docker container adjacent around 1h
Interface            Peer Node  Peer Interface        Container Name       IP                   Network    Service Name
-------------------- ---------- --------------------- -------------------- -------------------- ---------- ---------------
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9090                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9082                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9091                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9086                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9081                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9083                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9087                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9088                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9085                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9080                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9084                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9089                               host
swp6:VlanA-1         server01   mac:00:02:00:00:00:27 netcat-9092                               host
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8089          172.17.0.11          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8084          172.17.0.6           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8092          172.17.0.14          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8083          172.17.0.5           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8085          172.17.0.7           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8081          172.17.0.3           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8080          172.17.0.2           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8086          172.17.0.8           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8088          172.17.0.10          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8082          172.17.0.4           bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8091          172.17.0.13          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8090          172.17.0.12          bridge
swp7:VlanA-1         server02   mac:00:02:00:00:00:2a netcat-8087          172.17.0.9           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8091          172.17.0.13          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8083          172.17.0.5           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8087          172.17.0.9           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8082          172.17.0.4           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8080          172.17.0.2           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8092          172.17.0.14          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8086          172.17.0.8           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8084          172.17.0.6           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8088          172.17.0.10          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8090          172.17.0.12          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8085          172.17.0.7           bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8089          172.17.0.11          bridge
swp8:VlanA-1         server03   mac:00:02:00:00:00:2d netcat-8081          172.17.0.3           bridge
```
