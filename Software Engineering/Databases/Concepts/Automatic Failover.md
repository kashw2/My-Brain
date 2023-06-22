Automatic Failover is a methodology that allows businesses to have extra confidence in their Database infrastructure and it's reliability and resilience against failure. It works by using a Primary and Standby [[Software Engineering/Databases/Databases|Database]] server where your primary is where all queries are directed to by default and the standby uses [[Software Engineering/Databases/Concepts/Physical Replication|Physical Replication]] to stream data from the primary to the standby and in the case of failure in the primary, 'steps in' as a Failover for the primary. In some cloud scenarios, this can be known as [[Software Engineering/Cloud/High Availability|High Availability Automatic Failover]]

----
# STONITH
Shoot The Other Node In The Head

STONITH refers to a methodology used during the recovery phase during an Automatic Failover. If your Primary database server fails and the Standby takes over, one of the ways to recover is to remove the old primary and to promote the standby to primary otherwise, 'shooting the other node in the head'.


----

# Examples

![[Excalidraw/Automatic Failover]]

----

# References

- [PostgreSQL Documentation](https://www.postgresql.org/about/news/postgresql-automatic-failover-paf-v230-2018/)

