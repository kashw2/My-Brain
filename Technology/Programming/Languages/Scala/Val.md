A **`val`** in [[Scala]] names a value that can't be reassigned. It's evaluated once, when it's defined, and is the default way to name things in Scala. Its mutable sibling is `var`.

---

## Rationales

**Prefer val**
Reaching for `val` first is the Scala habit. A name that can't change means the same thing everywhere it's used, which makes code easier to follow. It's the starting point for [[Immutability]] and [[Pure]] functions. Use `var` only when you really need it, and keep it local.

**The Name is Fixed, Not the Object**
`val` stops the name pointing at something else, it doesn't make the thing it points at immutable. A `val` holding an `ArrayBuffer` can still be appended to. For real [[Immutability]] pair `val` with immutable types like `List`, `Map` and case classes.

**Evaluated Once, Now**
The right hand side runs straight away and the result is stored. Compare a [[Lazy|lazy val]] (once, on first access) and a [[Def]] (every time it's called).

**In Classes**
Marking a constructor parameter `val` makes it a public field. Case class parameters are `val`s by default, which is why case classes are immutable unless you go out of your way. A `val` can implement a parameterless `def` from a [[Trait]], but not the other way around, because a `val` promises the value never changes.

---

## Examples

```scala
val name = "Alex"  // type inferred as String
val age: Int = 30
// name = "Sam"    // Compile error, reassignment to val

var count = 0
count += 1         // fine, it's a var

import scala.collection.mutable.ArrayBuffer
val buffer = ArrayBuffer(1, 2)
buffer += 3        // fine, the name is fixed but the buffer is mutable

case class User(name: String, email: String) // both fields are vals
val (first, second) = (1, 2)                 // destructuring
```

```typescript
const name = "Alex";
// name = "Sam"; // Compile error, can't reassign a const

const items = [1, 2];
items.push(3); // fine, const doesn't freeze the array
```

---

### References

- [Scala Docs](https://docs.scala-lang.org/tour/basics.html)
- [Scala 3 Book: Variables and Data Types](https://docs.scala-lang.org/scala3/book/taste-vars-data-types.html)
