**Fauna** (FaunaDB) was a distributed, document-relational [[Databases|Database]] offered as a serverless API, with [[ACID]] transactions across regions and its own query language, FQL. **As of 2026-11-04 the hosted service no longer exists**, it was shut down at the end of May 2025, and the core database now lives on as an Apache 2.0 licensed project on GitHub that you'd have to run yourself.

---

## How it Works

**Status (correct as of 2026-11-04)**
In March 2025 Fauna announced it couldn't raise the capital needed to keep running a global database service, stopped taking new customers and switched the hosted service off at the end of May 2025. Before shutting down it published the core database source on GitHub under the Apache 2.0 licence, and the drivers and CLI are still there too. There's no managed Fauna anymore and the core repo hasn't had a commit since May 2025, so treat it as something to learn from rather than build on.

**Document-Relational**
Data lived in JSON-like documents grouped into collections (roughly tables). Unlike most document stores it also had proper relationships between documents, unique constraints, indexes, and schema you could tighten over time with its schema language, FSL. Think a document store that doesn't make you give up joins.

**FQL**
Queries were written in FQL, a [[TypeScript]] inspired language with optional [[Static Typing|static typing]]. Projecting a field that referenced another document resolved it, much like a SQL join. Everything went over HTTPS through drivers, which suited serverless code like a [[Function App]] that can't hold long lived connections open.

**Consistency**
Every query was a transaction. The transaction engine was based on the Calvin protocol and gave strict serialisability for read-write queries even with data replicated across regions, which is the genuinely hard part in [[Distributed Systems]].

**Built in Scala**
The open sourced core is written in [[Scala]], runs on the [[Java Virtual Machine|JVM]] and builds with [[Simple Build Tool|sbt]], so it's an interesting large Scala codebase to read.

**What to Pick Instead**
For a new project I'd go with a [[Relational Database Management System]] like [[PostgreSQL]] (self-hosted, [[Azure PostgreSQL]] or [[PlanetScale]]) and use `jsonb` columns where I want document style flexibility.

---

## Examples

```fql
// FSL: a collection with a unique constraint and an index
collection Customer {
	name: String
	email: String

	unique [.email]

	index byEmail {
		terms [.email]
	}
}
```

```fql
// FQL: find a customer through the index, then their orders
let customer = Customer.byEmail("alice@example.com").first()

// Projecting the customer reference resolves it, like a SQL JOIN
Order.where(.customer == customer).order(desc(.createdAt)) {
	status,
	total,
	customer { name, email }
}
```

```sql
-- Roughly the same query in SQL
SELECT o.status, o.total, c.name, c.email
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE c.email = 'alice@example.com'
ORDER BY o.created_at DESC;
```

---

### References

- [FaunaDB on GitHub](https://github.com/fauna/faunadb)
- [The Register: FaunaDB shuts down but hints at open source future](https://www.theregister.com/2025/03/24/faunadb_shut_down/)
- [InfoWorld: Fauna to shut down FaunaDB service in May](https://www.infoworld.com/article/3853569/fauna-to-shut-down-faunadb-service-in-may.html)
