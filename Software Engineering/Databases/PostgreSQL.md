PostgreSQL is an Open Source, Highly Flexible [[Software Engineering/Databases/Concepts/ACID|ACID]] conforming [[Software Engineering/Databases/Concepts/Relational Database Management System|Relational Database Management System]] 

----

Written in mostly [[Software Engineering/Programming Languages/C|C]], **PostgreSQL** has built a reputation for being one of the most flexible and most easy to access with lowest barrier to entry [[Software Engineering/Databases/Concepts/Relational Database Management System|Relational Database Management Systems]] available on the market. It consistently [ranks as one of the most used](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-databases) [[Software Engineering/Databases/Databases|Databases]] in the industry.

## Features

- High Amount of Flexibility and Customisation
- [[Software Engineering/Databases/Concepts/Generated Columns|Generated Columns]]
- Conforming to many International Standards
- High industry adoption
- Write Ahead Logging
- High scalability
	- One of the easiest to scale Horizontally
	- On par vertical scalability however more focus given to horizontal scalability and distribution

### Write Ahead Log (WAL)

The **Write Ahead Log** or **WAL** in **PostgreSQL** is a method of ensuring data integrity. It provides a detailed list of data changes inside a database to [[Software Engineering/Databases/Concepts/Data File|Data files]] as records in a log file. 

One of the key features in the inner workings of the **Write Ahead Log** that isn't seen in other [[Software Engineering/Databases/Concepts/Relational Database Management System|Relational Database Management Systems]] is that in **PostgreSQL** data is only written after the transaction is logged to the **Write Ahead Log**. On top of this, the usage of a **Write Ahead Log** in **PostgreSQL** greatly reduces the number of disk writes as only the log file needs to be flushed to disk to guarantee a transaction has been committed rather than transaction logs for every [[Software Engineering/Databases/Concepts/Data File|Data file]] that was touched in a transaction.

## References

[PostgreSQL Documentation](https://www.postgresql.org/docs/current)
[PostgreSQL GitHub](https://github.com/postgres/postgres)
[StackOverflow 2023 Developer Survey](https://survey.stackoverflow.co/2023/#section-most-popular-technologies-databases)
[StackOverflow WAL vs Command Log](https://stackoverflow.com/questions/14181180/why-do-sql-databases-use-a-write-ahead-log-over-a-command-log)