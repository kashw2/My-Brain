ACID is an acronym standing for Atomicity, Consistency, Isolation and Durability. It is used to describe a set of properties of a [[Software Engineering/Databases/Databases|Database]] that guarantee data validity and provides resiliency.

----

## Atomicity

Refers to the way in which a database processes a transaction. Processing a transaction atomically means to process each statement as an individual unit that takes into account the failure or succession of that unit. In case of a unit failing, the entire transaction fails and forces a rollback ensuring that no data is changed, however in case of success of a unit the database will process the next until all statements in a transaction have been processed, atomically.

---

## Consistency

Refers to the process of state change in a database during a transaction. A database must remain consistent from the beginning of a transaction, maintaining itself from before the transaction occurred up until successful completion of the transaction in which case state much update to conform with any changes made in the transaction. It is relied upon to also ensure integrity of the database during transactions.

---

## Isolation

Refers to the flexibility to run concurrent transactions in isolation without interference often in circumstances where simultaneous transactions are hitting the same table. Isolation ensures that the database and it's [[Software Engineering/Databases/Concepts/Data File|Data files]] are consistent with what the results of the transactions would have been if they were to have been run sequentially; Somewhat similarly to the law of **Associativity** found in Functional Programming concepts such as the [[Monad]].

---

## Durability

Refers to the guarantee that on transaction success and committal, any [[Software Engineering/Databases/Concepts/Data File|Data files]] that had been altered by a transaction will remain so in case of failure.  

---

### References

[Wikipedia](https://en.wikipedia.org/wiki/ACID)
[Hussien Nassar](https://youtu.be/pomxJOFVcQs)