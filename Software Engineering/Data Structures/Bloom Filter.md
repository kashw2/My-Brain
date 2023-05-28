Bloom filters are probabilistic [[Software Engineering/Data Structures/Data Structures|Data Structures]] that present a way to quickly and efficiently determine if a value definitely does not exist or it it may exist in a record set.

---

## Description

The purpose of a **Bloom Filter** is to provide a way to quickly and efficiently determine if a record is possibly in a record set or if it is definitely not in a record set. It's backwards like approach to logic and reason is what powers many of the tools and pieces of software we use today. Examples of their usage can be found in:

- PostgreSQL
- Redis
- Cassandra
- Oracle
- Old Google Search (Malicious Site Alerting)

A common implementation of a **Bloom Filter** is is services that have an in memory cache but also have a connection for querying a [[Software Engineering/Databases/Databases|Database]]. 

If a user queries this service looking for a piece of data, a **Bloom Filter** can be put in place as a stop gap between sending the query directly to the database versus retrieving data from the cache. 

If the **Bloom Filter** finds that the item (usually a UID of some sort) is not in it's record set, it would allow a direct query to the database instead of hitting the cache.

If however the **Bloom Filter** finds that the value is probably there then we will attempt to retrieve that value. This will work as if it wasn't there, the **Bloom Filter** would have found that the value definitely did not exist, so in this case we can be assured that inside the cache our value does exist.

## Inner workings