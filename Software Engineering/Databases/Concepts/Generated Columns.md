**Generated Columns** or **Virtual Columns** are a special column that is always computed from the values of other columns.

---

## Implementations

### PostgreSQL

**Generated Columns** in [[Software Engineering/Databases/PostgreSQL|PostgreSQL]] have the following characteristics:
- **Stored Generated Columns** occupy storage as if they were normal columns.
- **Stored Generated Columns** are updated on write to any of the columns required for it to be calculated. Write in this example refers to `INSERT` and `UPDATE`.
- Expressions are allowed but must be [[Software Engineering/Concepts/Immutability|Immutable]].
- Expressions cannot reference another **Generated Column**.


---

## References
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/ddl-generated-columns.html)