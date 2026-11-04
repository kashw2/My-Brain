**Microsoft SQL Server** is Microsoft's [[Relational Database Management System]], queried with its own SQL dialect, T-SQL. It's the default in a lot of .NET and [[Windows]] shops, and its engine is what sits behind Azure SQL in [[Azure]].

---

## How it Works

**T-SQL**
Transact-SQL is standard SQL plus Microsoft's extras: variables, `TRY...CATCH` error handling, `TOP` instead of `LIMIT`, `IDENTITY` columns and the `OUTPUT` clause for getting back what an `INSERT`, `UPDATE` or `DELETE` changed. Stored procedures tend to be a big part of how SQL Server apps are written.

**Storage**
Each database is a primary [[Data File]] (`.mdf`), optional secondary data files (`.ndf`) and a transaction log (`.ldf`), all made of 8 KB pages. Creating a primary key gives you a clustered index by default, which means the table itself is stored as a B-tree ordered by that key, so range scans on the key are cheap.

**Concurrency**
Out of the box the default `READ COMMITTED` isolation level uses locks, so readers and writers can block each other. Turning on Read Committed Snapshot Isolation (RCSI) makes readers use row versions instead, which is much closer to how [[PostgreSQL]] behaves. It's on by default in Azure SQL Database.

**High Availability**
Always On availability groups keep copies of a database on other servers and can fail over automatically, SQL Server's take on [[Automatic Failover]] and [[High Availability]].

**Where it Runs**
It started out on [[Windows]] but also runs on [[Linux]] and in containers. In [[Azure]] you can use Azure SQL Database (a fully managed single database), Azure SQL Managed Instance (closer to a whole server) or just run it on a VM. Editions go from the free Express and Developer editions up to the paid Standard and Enterprise ones.

**When to Pick It**
Licensing is the big difference from [[PostgreSQL]]. Pick SQL Server when you're already deep in the Microsoft ecosystem (.NET, Entity Framework, Windows authentication) or a vendor product needs it. Otherwise PostgreSQL does most of the same job without the licence bill.

---

## Examples

```sql
CREATE TABLE dbo.Users (
	Id INT IDENTITY(1, 1) PRIMARY KEY, -- Clustered index by default
	Email NVARCHAR(255) NOT NULL UNIQUE,
	CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

-- OUTPUT hands back the generated Id without a second query
INSERT INTO dbo.Users (Email)
OUTPUT inserted.Id
VALUES (N'alice@example.com');

-- TOP instead of LIMIT
SELECT TOP (10) Id, Email
FROM dbo.Users
ORDER BY CreatedAt DESC;

-- Both updates happen or neither does
BEGIN TRY
	BEGIN TRANSACTION;
	UPDATE dbo.Accounts SET Balance = Balance - 50 WHERE Id = 1;
	UPDATE dbo.Accounts SET Balance = Balance + 50 WHERE Id = 2;
	COMMIT TRANSACTION;
END TRY
BEGIN CATCH
	ROLLBACK TRANSACTION;
	THROW; -- Re-raise the original error
END CATCH;
```

---

### References

- [Microsoft Learn: SQL Server documentation](https://learn.microsoft.com/en-us/sql/sql-server/)
- [Microsoft Learn: Transact-SQL reference](https://learn.microsoft.com/en-us/sql/t-sql/language-reference)
- [Wikipedia](https://en.wikipedia.org/wiki/Microsoft_SQL_Server)
