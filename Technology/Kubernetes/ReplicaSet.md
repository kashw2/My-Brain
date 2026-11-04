A **ReplicaSet** keeps a set number of identical Pods running in a [[Kubernetes]] cluster. If a Pod dies or its node disappears it creates a replacement, and if there are too many it deletes the extras.

---

## How it Works

**Selector, Replicas, Template**
It has three parts: a label selector for which Pods it owns, a `replicas` count, and a Pod template for making new ones. The template's labels have to match the selector. It's a control loop that keeps comparing the Pods it can see against `replicas` and fixing the difference.

**Usually Owned by a Deployment**
You rarely write one by hand. A [[Deployments|Deployment]] creates a new ReplicaSet every time its Pod template changes, scales it up while scaling the old one down, and keeps old ReplicaSets around at zero replicas (`revisionHistoryLimit`, 10 by default). `kubectl rollout undo` just scales an old one back up, which is why rollbacks are quick. A `pod-template-hash` label keeps each one's Pods separate.

**No Rolling Updates**
Changing the template on a bare ReplicaSet doesn't touch existing Pods, only new ones get it. That's the gap Deployments fill, so a bare ReplicaSet only makes sense if you're doing your own update orchestration or never update at all.

**Adopting Pods**
Ownership is tracked in each Pod's `metadata.ownerReferences`. A ReplicaSet adopts any Pod that matches its selector and has no controller, so a stray Pod with the same labels gets counted, and if that takes it over `replicas` one gets deleted.

**Scaling Down**
When removing Pods it picks Pending ones first, then ones with a lower `controller.kubernetes.io/pod-deletion-cost` annotation, then ones on nodes running more replicas, then the newest. It replaced the older ReplicationController, which only supported equality-based selectors.

---

## Examples

```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: frontend
  labels:
    app: guestbook
spec:
  replicas: 3
  selector:
    matchLabels:
      tier: frontend
  template:
    metadata:
      labels:
        tier: frontend
    spec:
      containers:
        - name: web
          image: nginx
          ports:
            - containerPort: 80
```

```bash
kubectl get rs                                     # DESIRED, CURRENT, READY
kubectl scale rs frontend --replicas=5
kubectl delete pod -l tier=frontend --wait=false   # Watch them come straight back
kubectl delete rs frontend --cascade=orphan        # Remove the ReplicaSet, keep its Pods

# The ReplicaSets behind a Deployment, one per revision
kubectl get rs -l app=api
kubectl rollout history deployment/api
```

---

### References

- [Kubernetes: ReplicaSet](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/)
- [Kubernetes: Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
