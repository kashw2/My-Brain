A **Vector** is an indexed sequence that can grow, with fast access to any position by its index. In most languages it means a dynamic array (C++ `std::vector`, Rust `Vec`), while in [[Scala]] `Vector` is the go-to immutable indexed collection, built as a shallow tree.

---

## How it Works

**Dynamic Arrays**
Values sit next to each other in one block of memory, so reading index `i` is a single jump, O(1). When the block is full, adding another value allocates a bigger block (usually 1.5x or 2x the size), copies everything across and carries on. That copy is O(n) but happens rarely enough that adding to the end averages out to amortised O(1). [[TypeScript]] and [[JavaScript]] arrays behave like this.

**Versus a LinkedList**
Inserting or removing in the middle means shuffling everything after it along, O(n), which is where a [[LinkedList]] can win. But because a vector's values sit together in memory the CPU cache loves it, and in practice it beats a linked list for most workloads, even ones that look like they should favour the list.

**Scala's Vector**
Scala's `Vector` is immutable, so it can't just be one array. It's a tree where every node is an array of up to 32 children, so even a billion elements is only about six levels deep. Indexing, updating, appending and prepending only touch one path through the tree, which the Scala docs call "effectively constant" time (eC). An update copies that one path and shares the rest with the old vector, so the original stays untouched, which is what makes [[Immutability]] cheap.

**Vector vs List in Scala**
`List` is a [[LinkedList]], O(1) at the head but O(n) to index or append. Use `List` when you build things up from the front and [[Pattern Matching|pattern match]] on head and tail (it's a natural [[Stack]]), and `Vector` when you need random access or to add at the end.

| Operation | Dynamic array | Scala `Vector` | Scala `List` |
| --- | --- | --- | --- |
| Get by index | O(1) | eC | O(n) |
| Update by index | O(1) | eC | O(n) |
| Append | Amortised O(1) | eC | O(n) |
| Prepend | O(n) | eC | O(1) |
| Insert in the middle | O(n) | O(n) | O(n) |

---

## Examples

```scala
val numbers: Vector[Int] = Vector(1, 2, 3)

numbers(2) // 3, effectively constant
numbers :+ 4 // Vector(1, 2, 3, 4)
0 +: numbers // Vector(0, 1, 2, 3)
numbers.updated(1, 20) // Vector(1, 20, 3), copies one path and shares the rest
numbers // Vector(1, 2, 3), the original never changes

// Same calls on a List walk the whole thing
val list: List[Int] = List(1, 2, 3)
list(2) // 3, but O(n)
list :+ 4 // List(1, 2, 3, 4), also O(n)
```

```typescript
// A TypeScript array is a dynamic array: contiguous, indexed and growable
const readings: number[] = [21.5, 22.1];
readings.push(19.8); // Amortised O(1), the engine grows the storage for you

console.log(readings[1]); // 22.1, O(1)
readings.splice(1, 0, 20.0); // O(n), everything after index 1 shuffles along
console.log(readings); // [ 21.5, 20, 22.1, 19.8 ]
```

---

### References

- [Scala Docs: Concrete Immutable Collection Classes](https://docs.scala-lang.org/overviews/collections-2.13/concrete-immutable-collection-classes.html)
- [Scala Docs: Performance Characteristics](https://docs.scala-lang.org/overviews/collections-2.13/performance-characteristics.html)
- [Wikipedia: Dynamic array](https://en.wikipedia.org/wiki/Dynamic_array)
