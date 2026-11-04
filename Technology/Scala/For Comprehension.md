A **For Comprehension** is [[Scala]]'s syntax sugar for chains of `flatMap`, `map` and `withFilter`. It lets you write a series of dependent steps, the kind of thing [[FlatMap]] and [[Monad]] are about, top to bottom instead of as nested lambdas.

---

## Rationales

**Desugaring**
The compiler rewrites it into method calls before type checking. Every `<-` except the last becomes a `flatMap`, the last becomes a `map` over whatever is in the `yield`, and an `if` becomes `withFilter`. A `name = expr` line binds a plain value without unwrapping anything. Without a `yield` the whole thing becomes `foreach`, for side effects only.

**Why Bother**
Nested `flatMap`s get hard to read fast, every step adds another level of indentation and another closing bracket. A for comprehension flattens that into something that reads like imperative code, but it's still a single expression with no mutation, and every step can use the names bound above it.

**Short Circuiting**
What happens on failure is up to the type's `flatMap`. With `Option` the first `None` stops everything and the result is `None`. With `Either` the first `Left` is returned. With `List` you get every combination, like nested loops.

**No TypeClass Required**
The rewrite is purely syntactic, it just calls methods by name. Any type with the right methods works, no [[Monad]] instance involved. The flip side is the types have to line up with each other's `flatMap`, so mixing `Option` and `Either` in one comprehension won't compile until you convert one of them.

**Other Languages**
[[Haskell]] has `do` notation for the same idea. In [[TypeScript]] `async`/`await` is similar, but it only works for `Promise`.

---

## Examples

```scala
def parse(s: String): Option[Int] = s.toIntOption

val sum: Option[Int] = for {
	a <- parse("1")
	b <- parse("2")
} yield a + b // Some(3)

// What the compiler turns it into
val sum2: Option[Int] = parse("1").flatMap(a => parse("2").map(b => a + b))

// The first None stops the rest
val failed: Option[Int] = for {
	a <- parse("1")
	b <- parse("two")
} yield a + b // None

// List gives every combination, the if becomes withFilter
val pairs: List[String] = for {
	n      <- List(1, 2, 3)
	if n % 2 == 1
	letter <- List("a", "b")
} yield s"$n$letter" // List("1a", "1b", "3a", "3b")

// No yield, desugars to foreach
for (n <- List(1, 2, 3)) println(n)
```

```scala
// Scala 3 can drop the braces
val total = for
	a <- parse("1")
	b <- parse("2")
yield a + b
```

```typescript
// The same shape, but only for Promises
async function total(): Promise<number> {
	const a = await fetchNumber("a");
	const b = await fetchNumber("b");
	return a + b;
}
```

---

### References

- [Scala Docs](https://docs.scala-lang.org/tour/for-comprehensions.html)
- [Scala 3 Book: for Expressions](https://docs.scala-lang.org/scala3/book/control-structures.html)
- [Scala FAQ: How does for / yield work?](https://docs.scala-lang.org/tutorials/FAQ/index.html#how-does-for--yield-work)
