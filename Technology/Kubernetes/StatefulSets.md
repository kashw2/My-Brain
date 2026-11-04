A **StatefulSet** runs Pods in a [[Kubernetes]] cluster that each keep a stable identity: a fixed name, their own DNS hostname and their own persistent volume. It's the workload for databases and clustered apps where "which replica am I" matters.

---

## How it Works

**Stable Names**
Pods are named `<statefulset>-<ordinal>`, so `postgres-0`, `postgres-1`, `postgres-2`, and the replacement for a dead `postgres-1` is still `postgres-1`. Compare [[Deployments]], where Pods get random suffixes and are interchangeable.

**Headless Service and DNS**
You create a headless Service (`clusterIP: None`) yourself and point `serviceName` at it. Each Pod then gets its own DNS name like `postgres-0.postgres.default.svc.cluster.local`, so peers can reach a specific replica, e.g. standbys streaming from the primary with [[Physical Replication]].

**Storage per Pod**
`volumeClaimTemplates` gives each Pod its own PersistentVolumeClaim (`data-postgres-0` and so on) that follows it if it's rescheduled, which fixes the shared volume problem with Deployments. Scaling down or deleting the StatefulSet leaves the PVCs behind by default to protect the data, `persistentVolumeClaimRetentionPolicy` changes that.

**Ordering**
With the default `OrderedReady` policy, Pods start one at a time from 0 up, each waiting for the one before to be Ready, and stop in reverse. Rolling updates go from the highest ordinal down. `Parallel` starts and stops them all at once when order doesn't matter, and a rolling update `partition` only updates ordinals at or above a number, handy for canaries.

**Not a Database Operator**
A StatefulSet gives identity and storage, not replication or failover. If `postgres-0` dies nothing promotes `postgres-1`, see [[Automatic Failover]]. That logic comes from the app or an operator like CloudNativePG, and a managed service like [[Azure PostgreSQL]] is often less work.

---

## Examples

```yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
    - port: 5432
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 3 # Three independent servers, replication is still up to you
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres
          envFrom:
            - secretRef:
                name: postgres # Holds POSTGRES_PASSWORD
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql # Newer postgres images keep data under here
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
```

---

### References

- [Kubernetes: StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [Kubernetes: StatefulSet Basics](https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/)
