A **Pure Function** is a function whose output depends only on its inputs and which has no side effects. Given the same arguments it always returns the same result, and calling it changes nothing outside of it.

---

## Rationales

**No Side Effects**
A side effect is anything a function does besides returning a value: writing to a database, printing, mutating a variable outside its scope, reading the clock, throwing an exception. A Pure Function does none of these.

**Referential Transparency**
Because a Pure Function always gives the same result, any call to it can be replaced with its result without changing the program. `add(2, 3)` can be swapped for `5` anywhere. This is what lets us reason about code like algebra, and it's what the laws of [[TypeClass|TypeClasses]] like [[Functor]] and [[Monad]] rely on.

**Why it Matters**
- **Testing**, no mocks or setup, just inputs and expected outputs.
- **Memoisation**, results can be cached safely because they never change.
- **Parallelism**, Pure Functions can't race on shared state.
- **Reasoning**, you only need to read the function to know what it does.

**Pushing Effects to the Edges**
Real programs need side effects. [[Functional Programming]] keeps the core of a program pure and describes effects as values (like Cats Effect's `IO`) that are only run at the edge of the program. [[Free Monad|Free Monads]] take this further by describing a whole program as data.

**Pure is not Idempotent**
`x => x + 1` is pure but not [[Idempotency|Idempotent]], applying it twice gives a different result to applying it once.

**Beyond Code**
[[Nix]] treats every package build like a Pure Function, the same inputs always produce the same output in the [[Nix Store]].

---

## Examples

```scala
// Pure
def add(a: Int, b: Int): Int = a + b

// Impure, reads the clock
def greeting(name: String): String =
	if (java.time.LocalTime.now().getHour < 12) s"Good morning $name"
	else s"Good afternoon $name"

// Pure again, the clock is passed in
def greeting(name: String, hour: Int): String =
	if (hour < 12) s"Good morning $name"
	else s"Good afternoon $name"
```

```typescript
// Impure, mutates its input
function addItem(cart: string[], item: string): string[] {
	cart.push(item);
	return cart;
}

// Pure, returns a new array
function addItem(cart: readonly string[], item: string): string[] {
	return [...cart, item];
}
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Pure_function)
- [Scala Docs](https://docs.scala-lang.org/scala3/book/fp-pure-functions.html)
