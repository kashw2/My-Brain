**High Availability** (HA) is designing a system to keep running when parts of it fail, by running redundant copies in separate failure domains and switching between them automatically. It's measured as uptime, usually in "nines", and is one of the main reasons [[Distributed Systems]] exist in the [[Cloud]].

---

## Rationales

**No Single Point of Failure**
Anything you only have one of will eventually take everything down: one VM, one database, one zone. HA starts with finding those and adding redundancy wherever the downtime would cost more than the extra copy.

**Failure Domains**
Redundancy only helps if the copies don't fail together. Cloud regions are split into availability zones, separate datacentres with their own power, cooling and networking. Spreading across zones survives a datacentre outage but not a region outage, which needs a second region. In [[Azure]], Australia East has zones and Australia Southeast doesn't.

**Automatic Failover**
Redundancy doesn't help much if a person has to notice and switch over at 3am. Health checks spot the failure and traffic moves to a healthy copy: load balancers drop bad instances, [[Kubernetes]] restarts and reschedules Pods, and databases promote a standby, see [[Automatic Failover]].

**State is the Hard Part**
Stateless apps are easy, just run more replicas behind a load balancer ([[Deployments]], [[App Service]] instances), with a PodDisruptionBudget so node upgrades can't drain them all at once. Data is harder because the copies have to stay in sync. Synchronous replication loses nothing but slows every commit, asynchronous is faster but can lose the last few writes on failover. [[Azure PostgreSQL]] HA uses a synchronous standby for exactly this reason.

**The Nines**
99.9% allows about 8.8 hours of downtime a year, 99.99% about 53 minutes and 99.999% about 5 minutes. Each nine costs a lot more than the last, and dependencies multiply: two 99.9% services in a chain give about 99.8%. Pick the target from what downtime actually costs.

---

## Examples

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      # Spread replicas evenly across zones so losing one zone leaves the rest running
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: DoNotSchedule
          labelSelector:
            matchLabels:
              app: api
      containers:
        - name: api
          image: ghcr.io/example/api
```

```bash
# Add a standby in another zone to an existing Azure PostgreSQL server
az postgres flexible-server update --name psql-demo --resource-group rg-demo --zonal-resiliency Enabled

# Test it: forced failover causes a short outage, so watch how the app copes
az postgres flexible-server restart --name psql-demo --resource-group rg-demo --failover Forced
```

---

### References

- [Microsoft Learn: What Are Azure Availability Zones?](https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview)
- [Kubernetes: Pod Topology Spread Constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/)
- [Wikipedia](https://en.wikipedia.org/wiki/High_availability)
