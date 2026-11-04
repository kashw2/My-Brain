**Immutability** means a value can't be changed after it's created. Instead of modifying data, you create a new copy with the change applied.

---

## Rationales

**Values, not Variables**
In [[Functional Programming]] a name refers to a value, not a box that can be changed. In [[Scala]] that's `val` over `var`. It's a requirement for [[Pure]] functions, a function can't mutate what it's given if nothing can be mutated.

**Safe Sharing**
Immutable data can be shared between functions and threads without copying or locking, nothing can change it underneath you.

**Persistent Data Structures**
Copying everything on every change would be slow. Immutable collections use **structural sharing** instead, the new version reuses most of the old one. Prepending to a Scala `List` (a [[LinkedList]]) creates one new node that points at the existing list, both versions exist and share every other node.

**Contrast with OOP**
[[Object Orientated Programming]] usually models state that changes over time inside an [[Object]]. Immutability models it as a series of values instead, each one a snapshot. The [[Nix Store]] works the same way, nothing in it is ever modified.

---

## Examples

```scala
case class User(name: String, email: String)

val alex = User("Alex", "alex@example.com")
val updated = alex.copy(email = "alex@new.com") // alex is unchanged

val list = List(2, 3)
val longer = 1 :: list // List(1, 2, 3), shares the 2 and 3 nodes with list
```

```typescript
type User = { readonly name: string; readonly email: string };

const alex: User = { name: "Alex", email: "alex@example.com" };
const updated: User = { ...alex, email: "alex@new.com" };

// alex.email = "x"; // Compile error, email is readonly
```

`readonly` is only checked by the compiler, and `Object.freeze` only freezes the top level, nested objects can still be changed.

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Immutable_object)
- [Wikipedia: Persistent Data Structures](https://en.wikipedia.org/wiki/Persistent_data_structure)
- [Scala Docs](https://docs.scala-lang.org/overviews/collections-2.13/concrete-immutable-collection-classes.html)
