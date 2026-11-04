**Function Composition** is combining two functions into a new one, where the output of the first becomes the input of the second. Composing `f: A => B` with `g: B => C` gives a function `A => C`.

---

## Rationales

**Building Programs from Small Pieces**
Composition is the core idea of [[Functional Programming]], it's literally in the definition. Small [[Pure]] functions that each do one thing are glued together into bigger ones, and because they're pure the result is easy to reason about.

**andThen vs compose**
In [[Scala]], `f andThen g` runs `f` first then `g`, reading left to right. `g compose f` means the same thing written the mathematical way, `g(f(x))`.

**Associativity**
Composition is associative, `(f andThen g) andThen h` is the same as `f andThen (g andThen h)`. Together with the identity function (`x => x`) as the identity, functions from a type to itself form a [[Monoid]].

**In the Laws**
The second law of a [[Functor]] is about composition, mapping `f` then mapping `g` must be the same as mapping `f andThen g` once.

---

## Examples

```scala
val trim: String => String = _.trim
val upper: String => String = _.toUpperCase
val exclaim: String => String = _ + "!"

val shout = trim andThen upper andThen exclaim

shout("  hello ") // "HELLO!"
```

```typescript
const pipe = <A>(...fns: Array<(a: A) => A>) => (a: A): A =>
	fns.reduce((acc, fn) => fn(acc), a);

const shout = pipe<string>(
	s => s.trim(),
	s => s.toUpperCase(),
	s => s + "!",
);

shout("  hello "); // "HELLO!"
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Function_composition_(computer_science))
- [Scala API](https://www.scala-lang.org/api/current/scala/Function1.html)
