**Laziness** (lazy evaluation) means putting off working out a value until something actually needs it. In [[Scala]] a `lazy val` is a [[Val]] whose right hand side runs on first access instead of when it's defined, and the result is cached for every access after that.

---

## Rationales

**Strict by Default**
Most languages, Scala included, are **strict**: arguments and `val`s are evaluated straight away. [[Haskell]] is the odd one out, it's lazy by default. Scala lets you opt in to laziness with `lazy val`, by-name parameters (`=> A`), `LazyList` and collection `view`s.

**lazy val**
Runs once, on first use, and caches the result. Good for expensive things that might never be needed, like loading a big config, and for dodging initialisation order problems where one field depends on another that isn't set yet. Initialisation is thread-safe, if two threads hit it at once it still only runs once. If the right hand side throws, it's left uninitialised and the next access tries again.

**val vs lazy val vs def**
A [[Val]] is evaluated once, now. A `lazy val` is evaluated once, later. A [[Def]] is evaluated every time it's called. The price of a `lazy val` is a small check on every access to see if it's been initialised yet.

**By-name Parameters**
A parameter typed `=> A` isn't evaluated before the call. It's evaluated each time the method uses it, and never if it's not used. That's how you can write your own control structures, like a `logIf` that skips building an expensive message. Unlike a `lazy val` the result isn't cached.

**Infinite Data**
Lazy collections only compute elements as they're asked for, so they can describe infinite sequences. `LazyList` (Scala 2.13 and 3) remembers elements once computed. A `view` makes a chain of `map` and `filter` on a normal collection lazy, so no intermediate collections get built.

**Keep it Pure**
Laziness is only predictable when the delayed code is [[Pure]]. If it has side effects, when (or whether) they happen depends on who touches the value first.

---

## Examples

```scala
lazy val config: Map[String, String] = {
	println("Loading config")
	Map("env" -> "dev")
}
// Nothing printed yet
config("env") // prints "Loading config", returns "dev"
config("env") // cached, prints nothing

// By-name parameter, message is only built if enabled is true
def logIf(enabled: Boolean, message: => String): Unit =
	if (enabled) println(message)

logIf(false, expensiveDebugDump()) // expensiveDebugDump never runs

// Infinite, only the elements we ask for are computed
val naturals: LazyList[Int] = LazyList.from(1)
naturals.filter(_ % 2 == 0).take(3).toList // List(2, 4, 6)

// A view stops after finding two, instead of doubling a million numbers
(1 to 1000000).view.map(_ * 2).filter(_ % 3 == 0).take(2).toList // List(6, 12)
```

```typescript
// Generators are lazy too, values are produced on demand
function* naturals(): Generator<number> {
	let n = 1;
	while (true) yield n++;
}

const it = naturals();
it.next().value; // 1
it.next().value; // 2
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Lazy_evaluation)
- [Scala Docs: By-name Parameters](https://docs.scala-lang.org/tour/by-name-parameters.html)
- [Scala Docs: LazyList](https://docs.scala-lang.org/overviews/collections-2.13/concrete-immutable-collection-classes.html)
