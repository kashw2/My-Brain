**`def`** defines a **method** in [[Scala]], a named block of code that runs every time it's called. Methods live in a [[Class]], [[Trait]] or [[Object]] (or at the top level in Scala 3) and aren't values themselves, unlike function values such as `(a: Int) => a + 1`.

---

## Rationales

**Evaluated Every Time**
A `def` with no parameters is re-run on every access, unlike a [[Val]] (once, when defined) or a [[Lazy|lazy val]] (once, on first access). That makes it the right choice for anything that should be recomputed, like a value derived from mutable state or the current time.

**Methods vs Function Values**
A function value is an object, an instance of a `Function1`, `Function2` and so on with an `apply` method, so it can be stored in a [[Val]], passed around and returned. That's what [[Higher Order Functions]] take. A method isn't an object, it belongs to whatever defines it, but it's more flexible: type parameters, default and named arguments, multiple parameter lists and [[Implicits|implicit]] parameters.

**Eta-expansion**
When you pass a method where a function is expected, like `list.map(double)`, the compiler wraps it in a function value for you. Scala 2 only does this when a function type is expected, otherwise you write `double _`. Scala 3 does it automatically and the `_` is no longer needed.

**Multiple Parameter Lists**
A `def` can have several parameter lists, used for [[Function Currying]], to help type inference flow from one list to the next, and to make the last list implicit.

**Return Types**
The return type is usually inferred, but recursive methods have to declare it. Writing it on public methods is good practice anyway, it's documentation the compiler checks.

---

## Examples

```scala
def add(a: Int, b: Int): Int = a + b

// No parameters, re-evaluated on every access
def now: Long = System.currentTimeMillis()

// Type parameters and default arguments
def greet[A](who: A, greeting: String = "Hello"): String = s"$greeting $who"

// Recursive, so the return type is required
def factorial(n: Int): Long = if (n <= 1) 1 else n * factorial(n - 1)

// A function value, an object with an apply method
val addFn: (Int, Int) => Int = (a, b) => a + b
addFn(1, 2)       // 3
addFn.apply(1, 2) // the same call

// Eta-expansion, method to function value
def double(n: Int): Int = n * 2
List(1, 2, 3).map(double) // both versions, a function type is expected
val f = double _          // Scala 2
val g = double            // Scala 3
```

---

### References

- [Scala 3 Book: Methods](https://docs.scala-lang.org/scala3/book/methods-intro.html)
- [Scala 3 Book: Eta-Expansion](https://docs.scala-lang.org/scala3/book/fun-eta-expansion.html)
- [Scala 3 Reference: Automatic Eta Expansion](https://docs.scala-lang.org/scala3/reference/changed-features/eta-expansion.html)
