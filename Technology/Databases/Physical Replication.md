**Physical Replication** copies a [[Databases|Database]] by shipping the low level changes made to its [[Data File|data files]] (in [[PostgreSQL]], the Write Ahead Log) from a primary to one or more standbys, which replay them to stay an exact byte for byte copy. It's what [[Automatic Failover]] and most [[High Availability]] setups are built on.

---

## How it Works

**Shipping the WAL**
Every change on the primary is written to the WAL before it touches the data files anyway. With streaming replication the standby connects to the primary and receives those WAL records as they're written, then replays them the same way crash recovery would. To get started the standby is seeded with a full copy of the primary's data directory using `pg_basebackup`.

**Everything, Same Version**
Because it copies changes to disk blocks rather than rows, you get everything: every database, table, index and role. You can't pick and choose tables, and the standby has to run the same major [[PostgreSQL]] version on the same hardware architecture. Logical replication is the alternative, it sends row changes, can copy just some tables and works across major versions, but it's more work to run and doesn't copy schema changes for you.

**Read Only Standbys**
A hot standby can answer read-only queries while it replays, so replicas double as read scaling. All writes still go to the primary. Long queries on a standby can clash with changes being replayed, which is what settings like `hot_standby_feedback` and `max_standby_streaming_delay` are for.

**Sync vs Async**
By default it's asynchronous, the primary commits without waiting, so a crash can lose the last few transactions the standby hadn't received yet. Naming standbys in `synchronous_standby_names` makes commits wait for them, trading slower writes for no data loss on failover. [[Azure PostgreSQL]] HA works this way, streaming the WAL synchronously to a standby in another availability zone (though you can't query that standby).

**Replication Slots**
A slot makes the primary keep WAL around until a particular standby has received it, so a standby that falls behind can catch up instead of needing a fresh base backup. The catch is that if that standby disappears for good, WAL piles up until the primary's disk fills, so drop slots you're not using.

---

## Examples

```bash
# Seed the standby from the primary, write its standby config (-R) and use a slot (-S)
pg_basebackup -h primary.internal -U replicator -D /var/lib/postgresql/data -R -S standby_1
```

```sql
-- On the primary: a role for the standby to connect as, and a slot to hold WAL for it
CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'change-me';
SELECT pg_create_physical_replication_slot('standby_1');

-- Who's connected and how far behind they are
SELECT client_addr, state, sync_state, replay_lag
FROM pg_stat_replication;

-- Make commits wait for the standby (matches the application_name it connects with)
ALTER SYSTEM SET synchronous_standby_names = 'standby_1';
SELECT pg_reload_conf();
```

```sql
-- On the standby: true while it's replaying WAL from a primary
SELECT pg_is_in_recovery();
SELECT pg_last_wal_replay_lsn();

-- Promote it to primary, the step a failover does for you
SELECT pg_promote();
```

---

### References

- [PostgreSQL: Log-Shipping Standby Servers](https://www.postgresql.org/docs/current/warm-standby.html)
- [PostgreSQL: Replication settings](https://www.postgresql.org/docs/current/runtime-config-replication.html)
- [Wikipedia: Replication](https://en.wikipedia.org/wiki/Replication_(computing))
