A **Set** is a [[Data Structures|Data Structure]] that holds unique values, no duplicates, and is built for answering "is this in here?" quickly. Unlike a [[LinkedList]] or [[Vector]] it cares about membership, not position.

---

## How it Works

**Uniqueness**
Adding a value that's already there does nothing, so adding is [[Idempotency|idempotent]]. What counts as "the same" depends on the language. [[Scala]] uses `equals` and `hashCode`, so two case classes with the same fields are one value. [[JavaScript]] and [[TypeScript]] compare objects by reference, so two separate `{ id: 1 }` objects are two values.

**Hash Sets vs Tree Sets**
A hash set hashes each value to find where it lives, giving O(1) average add, remove and lookup but no meaningful order. A tree set keeps values sorted in a balanced tree, so everything is O(log n) but you can walk it in order. JavaScript's `Set` is a hash set that remembers insertion order. Scala's default immutable `Set` is a hash set (past four elements it's a hash trie, see [[Tries]]), and `SortedSet` gives you the sorted kind.

| Operation | Hash set | Tree set |
| --- | --- | --- |
| Add | O(1) average | O(log n) |
| Remove | O(1) average | O(log n) |
| Contains | O(1) average | O(log n) |
| Iterate in sorted order | Sort first, O(n log n) | O(n) |

**Set Operations**
Union, intersection and difference are what sets are really for. Union is associative and the empty set is its identity, so sets form a [[Monoid]] (and so a [[Semigroup]]) under union, which is how Cats can combine them for you.

**When to Use One**
Reach for a Set whenever you'd otherwise call `includes` on an array inside a loop or `distinct` on a list: de-duplicating, tracking nodes you've already visited in a search like [[Dijkstra]] or [[A Star|A*]], tags and permissions. Swapping the array for a Set turns each O(n) lookup into O(1).

---

## Examples

```scala
val tags: Set[String] = Set("nix", "scala", "nix") // Set(nix, scala)

val more: Set[String] = tags + "postgres" // A new Set, tags is untouched
more.contains("postgres") // true

val backend: Set[String] = Set("postgres", "scala", "kubernetes")
more union backend // Set(nix, scala, postgres, kubernetes), or more | backend
more intersect backend // Set(scala, postgres), or more & backend
more diff backend // Set(nix), or more &~ backend

// Case classes compare by value, so this really is one user
final case class User(id: Int)
Set(User(1), User(1)).size // 1
```

```typescript
const tags: Set<string> = new Set(['nix', 'scala', 'nix']);
console.log(tags.size); // 2
console.log(tags.has('scala')); // true

// Gotcha: objects are compared by reference, not by value
const users: Set<{ id: number }> = new Set([{ id: 1 }, { id: 1 }]);
console.log(users.size); // 2
```

---

### References

- [Scala Docs: Sets](https://docs.scala-lang.org/overviews/collections-2.13/sets.html)
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Wikipedia](https://en.wikipedia.org/wiki/Set_(abstract_data_type))
