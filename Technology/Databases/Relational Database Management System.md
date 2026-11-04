A **Relational Database Management System** (RDBMS) is a [[Databases|Database]] that stores data as tables of rows and columns, links tables together through keys and lets you query them with SQL. [[PostgreSQL]], [[Microsoft SQL Server]] and MySQL (what [[PlanetScale]] started on) are all RDBMSs.

---

## How it Works

**The Relational Model**
It all comes from E. F. Codd's relational model from 1970. A table (a relation) is a [[Set]] of rows (tuples), and every row has the same typed columns (attributes), a bit like a [[Product]] type. Because it's a set, rows have no order unless you ask for one with `ORDER BY`. SQL bends the maths slightly and allows duplicate rows unless a key stops it.

**Keys and Relationships**
A primary key identifies each row. A foreign key in one table points at the primary key of another, which is how you model "an order belongs to a customer" without copying the customer into every order. Splitting data up like this so each fact lives in exactly one place is called normalisation.

**SQL is Declarative**
You describe the result you want (joins, filters, groupings) and the query planner works out how to get it: which indexes to use and what order to join tables in. As the data grows the plan can change without you touching the query.

**Constraints and Transactions**
The database enforces the rules for you: types, `NOT NULL`, `UNIQUE`, `CHECK` and foreign keys. Changes happen inside [[ACID]] transactions, so data never ends up half updated, even with lots of clients writing at once.

**When to Pick One**
Default to an RDBMS when data has structure and relationships and correctness matters more than raw write throughput, which covers most business apps. Document stores (like [[Fauna]] was) and key-value stores make more sense for loosely structured data or very simple access patterns, though the line is blurry now that [[PostgreSQL]] has `jsonb` columns.

---

## Examples

```sql
CREATE TABLE customers (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	email TEXT NOT NULL UNIQUE
);

CREATE TABLE orders (
	id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	customer_id BIGINT NOT NULL REFERENCES customers (id), -- Foreign key
	total NUMERIC(10, 2) NOT NULL CHECK (total >= 0)
);

INSERT INTO customers (email) VALUES ('alice@example.com');
INSERT INTO orders (customer_id, total) VALUES (1, 42.50), (1, 10.00);

-- Rejected: there's no customer 99, so the foreign key stops it
INSERT INTO orders (customer_id, total) VALUES (99, 5.00);

-- Join the tables back together
SELECT c.email, COUNT(o.id) AS order_count, SUM(o.total) AS spent
FROM customers c
JOIN orders o ON o.customer_id = c.id
GROUP BY c.email;
-- alice@example.com | 2 | 52.50
```

---

### References

- [PostgreSQL: Concepts](https://www.postgresql.org/docs/current/tutorial-concepts.html)
- [Wikipedia: Relational database](https://en.wikipedia.org/wiki/Relational_database)
- [Wikipedia: Relational model](https://en.wikipedia.org/wiki/Relational_model)
