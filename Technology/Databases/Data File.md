A **Data File** is a file on disk where a [[Databases|Database]] actually keeps its tables and indexes. It's what [[ACID]] durability is ultimately protecting, and what the Write Ahead Log in [[PostgreSQL]] exists to keep safe.

---

## How it Works

**Pages**
Data files are split into fixed size pages (8 kB by default in [[PostgreSQL]] and [[Microsoft SQL Server]]) and the database reads and writes whole pages, never single rows. Rows are packed into pages, and an index is just more pages pointing at rows in other pages.

**One File per Table**
In [[PostgreSQL]] every table and index gets its own file under `base/<database oid>/` in the data directory, named after its filenode number. Once a file reaches 1 GB it's split into numbered segments (`16395`, `16395.1`, ...). Each table also gets small companion files for its free space map (`_fsm`) and visibility map (`_vm`).

**Files and Filegroups**
[[Microsoft SQL Server]] goes the other way, a whole database lives in a few big files: a primary data file (`.mdf`), optional secondary data files (`.ndf`) and a transaction log (`.ldf`). Data files can be grouped into filegroups, which lets you spread tables across different disks.

**Lazy Writes**
Changes don't go straight to the data files. They're made to pages in memory and recorded in the log first, then flushed to the data files later at a checkpoint. If the server dies in between, the log is replayed over the data files on startup. That's why a commit only needs the log flushed to disk, not every data file the transaction touched.

**Why it Matters**
Data files are what gets copied for a base backup or to set up [[Physical Replication]], and because the layout is version specific, a physical replica has to run the same major version as the primary. They also explain disk usage. In [[PostgreSQL]] dead rows from updates and deletes stay in the data file until `VACUUM` marks the space as reusable, and plain `VACUUM` rarely shrinks the file, so a busy table can be much bigger on disk than its rows suggest.

---

## Examples

```sql
-- PostgreSQL: where the data directory is
SHOW data_directory;

-- Which file holds a table, relative to the data directory
SELECT pg_relation_filepath('orders'); -- base/5/16395

-- How big that file is, and the page size it's made of
SELECT pg_size_pretty(pg_relation_size('orders'));
SELECT current_setting('block_size'); -- 8192

-- Push dirty pages out of memory and into the data files right now
CHECKPOINT;
```

```sql
-- Microsoft SQL Server: the files behind the current database (size is in 8 KB pages)
SELECT name, type_desc, physical_name, size
FROM sys.database_files;
```

---

### References

- [PostgreSQL: Database File Layout](https://www.postgresql.org/docs/current/storage-file-layout.html)
- [PostgreSQL: Write-Ahead Logging](https://www.postgresql.org/docs/current/wal-intro.html)
- [Microsoft Learn: Database files and filegroups](https://learn.microsoft.com/en-us/sql/relational-databases/databases/database-files-and-filegroups)
