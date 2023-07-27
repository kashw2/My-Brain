**Generated Columns** or **Virtual Columns** are a special column that is always computed from the values of other columns.

---

## Implementations

### PostgreSQL

**Generated Columns** in [[Software Engineering/Databases/PostgreSQL|PostgreSQL]] have the following characteristics:
- Storage
	- **Stored Generated Columns** occupy storage as if they were normal columns
	- **Virtual Generated Columns** do not occupy any storage
- Compute
	- **Stored Generated Columns** are updated on write to any of the columns required for it to be calculated. Write in this example refers to `INSERT` and `UPDATE`.
	- **Virtual Generated Columns** are updated only on read.


---

## References
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/ddl-generated-columns.html)