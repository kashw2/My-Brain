Bloom filters are probabilistic [[Data Structures]] that present a way to quickly and efficiently determine if a value definitely does not exist or it it may exist in a record set.

---

## Description

The purpose of a **Bloom Filter** is to provide a way to quickly and efficiently determine if a record is possibly in a record set or if it is definitely not in a record set. Its backwards like approach to logic and reason is what powers many of the tools and pieces of software we use today. Examples of their usage can be found in:

- [[PostgreSQL]]
- Redis
- Cassandra
- Oracle

A common implementation of a **Bloom Filter** is is services that have an in memory cache but also have a connection for querying a [[Databases|Database]]. 

If a user queries this service looking for a piece of data, a **Bloom Filter** can be put in place as a stop gap between sending the query directly to the database versus retrieving data from the cache. 

If the **Bloom Filter** finds that the item (usually a UID of some sort) is not in its record set, it would allow a direct query to the database instead of hitting the cache.

If however the **Bloom Filter** finds that the value is probably there then we will attempt to retrieve that value from the cache. This is only a "probably" though, the bits it checked could have been set by other values (a false positive). So if the value turns out not to be in the cache, we fall back to querying the database. False positives are rare, so most lookups that reach the cache will find what they need.

## Examples

A **Bloom Filter** is an array of bits that all start off, plus a few hash functions.

- **Adding** a value runs it through each hash function, and each result picks a bit to turn on.
- **Checking** a value runs the same hashes. If any of those bits is off, the value **definitely does not exist**. If they are all on, it **may exist**, as other values could have turned those bits on.

Below is the filter from the code, shrunk to 10 bits (`new BloomFilter(10, 3)`), after adding `user-123` and `user-456`. Each row shows the 3 bits a value's hashes pick, with `●` for a bit that is on and `✗` for a bit that is off:

```
            0   1   2   3   4   5   6   7   8   9
          ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
          │ 0 │ 0 │ 0 │ 1 │ 1 │ 1 │ 0 │ 0 │ 1 │ 0 │
          └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
user-123                ●       ●           ●         added
user-456                ●   ●               ●         added
user-999    ✗       ✗                   ✗             definitely does not exist
user-202                ●   ●   ●                     may exist (false positive)
```

`user-202` was never added, but `user-123` and `user-456` turned on all 3 of its bits, so the filter says it may exist.

```typescript
// Changing the seed gives a different number for the same value, so one function can act as many hash functions
function hash(value: string, seed: number): number {
  let hash: number = 2166136261 ^ seed;
  for (let i = 0; i < value.length; i++) {
    hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
  }
  return hash >>> 0;
}

class BloomFilter {
  private readonly bits: boolean[];
  private readonly hashCount: number;

  constructor(size: number, hashCount: number) {
    this.bits = new Array(size).fill(false);
    this.hashCount = hashCount;
  }

  add(value: string): void {
    for (let seed = 0; seed < this.hashCount; seed++) {
      this.bits[hash(value, seed) % this.bits.length] = true;
    }
  }

  mightContain(value: string): boolean {
    for (let seed = 0; seed < this.hashCount; seed++) {
      if (!this.bits[hash(value, seed) % this.bits.length]) {
        return false; // A bit is off, so it was never added
      }
    }
    return true; // Every bit is on, so it was probably added
  }
}

const userIds: BloomFilter = new BloomFilter(1000, 3);
userIds.add('user-123');
userIds.add('user-456');

console.log(userIds.mightContain('user-123')); // true
console.log(userIds.mightContain('user-999')); // false
```
