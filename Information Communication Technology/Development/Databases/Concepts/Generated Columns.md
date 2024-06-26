**Generated Columns** or **Virtual Columns** are a special column that is always computed from the values of other columns.

---

## Implementations

### PostgreSQL

**Generated Columns** in [[PostgreSQL|PostgreSQL]] have the following characteristics:
- **Stored Generated Columns** occupy storage as if they were normal columns.
- **Stored Generated Columns** are updated on write to any of the columns required for it to be calculated. Write in this example refers to `INSERT` and `UPDATE`.
- Expressions are allowed but must be [[Software Engineering/Concepts/Immutability|Immutable]].
- Expressions cannot reference another **Generated Column**.

---

## Considerations

### Stored Generated Columns

When using **Stored Generated Columns** one should be aware that the value is recomputed during each write operation. This can mean that the implementation of a **Stored Generated Column** could prove detrimental to a [[Databases|Databases]] performance at scale if you are having to recalculate the columns value because of a write to a value it depends on for calculation. An ideal usage of a **Stored Generated Column** is for calculating values that are unlikely to change when they are inserted.

### Virtual Generated Columns

---

## References
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/ddl-generated-columns.html)