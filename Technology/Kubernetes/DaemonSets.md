A **DaemonSet** makes sure every node in a [[Kubernetes]] cluster, or every node matching a selector, runs exactly one copy of a Pod. Nodes joining the cluster get the Pod automatically and it's cleaned up when they leave.

---

## How it Works

**One Pod per Node**
There's no `replicas` field like in [[Deployments]] or a [[ReplicaSet]]. The Pod count follows the node count, so scaling the cluster from 3 to 10 nodes gives you 10 Pods without touching the DaemonSet.

**What They're For**
Node-level agents: log collectors like Fluent Bit, monitoring like node-exporter, storage daemons and CNI network plugins (kube-proxy often runs as one too). If it cares about *which machine* it's on rather than *how many copies* there are, it's a DaemonSet. On locked-down nodes with no SSH, like EKS Auto Mode on [[Amazon Web Services]], a DaemonSet is the supported way to add a node agent.

**Picking Nodes**
A `nodeSelector` or node affinity in the Pod template limits it to some nodes, e.g. only GPU nodes or only [[Linux]] nodes. Tolerations let it run on tainted nodes like the control plane. The controller also adds some tolerations itself, like `node.kubernetes.io/unschedulable`, so daemons keep running on cordoned nodes.

**Updates**
`RollingUpdate` is the default and replaces Pods node by node, with `maxUnavailable` defaulting to 1. `OnDelete` only replaces a Pod when you delete it yourself, which is useful when you want to control the order, like rolling a network plugin out one node at a time by hand.

**vs Static Pods**
Static Pods are manifest files on the node that the kubelet runs directly without the API server, which makes them handy for bootstrapping (kubeadm runs the control plane this way). A DaemonSet is managed through the API, so you get `kubectl`, rolling updates and the rest of the normal tooling.

---

## Examples

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluent-bit
  namespace: logging
spec:
  selector:
    matchLabels:
      app: fluent-bit
  template:
    metadata:
      labels:
        app: fluent-bit
    spec:
      nodeSelector:
        kubernetes.io/os: linux
      tolerations:
        # Also collect logs from control plane nodes
        - key: node-role.kubernetes.io/control-plane
          operator: Exists
          effect: NoSchedule
      containers:
        - name: fluent-bit
          image: fluent/fluent-bit
          volumeMounts:
            - name: varlog
              mountPath: /var/log
              readOnly: true
      volumes:
        - name: varlog
          hostPath:
            path: /var/log
```

```bash
kubectl get daemonsets -A                          # DESIRED is the number of matching nodes
kubectl rollout status daemonset/fluent-bit -n logging
kubectl rollout undo daemonset/fluent-bit -n logging
```

---

### References

- [Kubernetes: DaemonSet](https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/)
- [Kubernetes: Perform a Rolling Update on a DaemonSet](https://kubernetes.io/docs/tasks/manage-daemon/update-daemon-set/)
