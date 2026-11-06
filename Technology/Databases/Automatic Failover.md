Automatic Failover is a methodology that allows businesses to have extra confidence in their Database infrastructure and its reliability and resilience against failure. It works by using a Primary and Standby [[Databases|Database]] server where your primary is where all queries are directed to by default and the standby uses [[Physical Replication]] to stream data from the primary to the standby[^pg-streaming] and in the case of failure in the primary, 'steps in' as a Failover for the primary.[^pg-failover] In some [[Cloud|cloud]] scenarios, this can be known as [[High Availability|High Availability Automatic Failover]].[^azure-ha]

![[Diagrams/Automatic Failover]]

If the Standby has replicas streaming from it, they keep streaming from it once it is promoted to Primary, as long as `recovery_target_timeline` is left at its default of `latest`.[^pg-cascade]

----
## STONITH
Shoot The Other Node In The Head[^pg-failover]

STONITH refers to a methodology used during the recovery phase during an Automatic Failover. If your Primary database server fails and the Standby takes over, one of the ways to recover is to remove the old primary and to promote the standby to primary otherwise, 'shooting the other node in the head'.[^pg-failover]


----

## References

[^pg-streaming]: [PostgreSQL: Streaming Replication](https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION) — the standby streams data from the primary
[^pg-failover]: [PostgreSQL: Failover](https://www.postgresql.org/docs/current/warm-standby-failover.html) — the standby steps in when the primary fails, and STONITH (Shoot The Other Node In The Head) removing the old primary
[^azure-ha]: [Microsoft Learn: High availability in Azure Database for PostgreSQL flexible server](https://learn.microsoft.com/en-us/azure/postgresql/high-availability/concepts-high-availability) — a cloud provider calling a primary and standby with automatic failover "high availability"
[^pg-cascade]: [PostgreSQL: Cascading Replication](https://www.postgresql.org/docs/current/warm-standby.html#CASCADING-REPLICATION) — replicas streaming from a Standby keep streaming from it after it is promoted to Primary, when `recovery_target_timeline` is `latest` (the default)

