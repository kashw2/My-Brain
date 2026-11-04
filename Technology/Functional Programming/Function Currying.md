**Function Currying** is turning a function that takes several arguments into a chain of functions that each take one. `(a, b) => c` becomes `a => b => c`.

---

## Rationales

**One Argument at a Time**
A curried function returns a new function after each argument, so you can supply some arguments now and the rest later. It turns a function with an [[Arity]] of `n` into `n` functions with an [[Arity]] of one. Each step returns a function, so every curried function is a [[Higher Order Functions|Higher Order Function]].

**Currying vs Partial Application**
They're related but different. Currying *restructures* a function into single-argument steps. Partial application *fixes* some arguments of a function to produce one that takes fewer. Currying makes partial application easy.

**Why it's Useful**
- Specialise a general function, `add(5)` becomes an `addFive` function.
- Fit a function into places that expect fewer arguments, like `map`.
- [[Scala]] uses multiple parameter lists for this, which also helps type inference and lets the last list be [[Implicits|implicit]].

---

## Examples

```scala
// Multiple parameter lists
def add(a: Int)(b: Int): Int = a + b

val addFive: Int => Int = add(5)
addFive(3) // 8

List(1, 2, 3).map(add(10)) // List(11, 12, 13)

// Currying an existing function
val multiply = (a: Int, b: Int) => a * b
val curried: Int => Int => Int = multiply.curried
curried(2)(4) // 8
```

```typescript
const add = (a: number) => (b: number): number => a + b;

const addFive = add(5);
addFive(3); // 8

[1, 2, 3].map(add(10)); // [11, 12, 13]
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Currying)
- [Scala Docs](https://docs.scala-lang.org/tour/multiple-parameter-lists.html)
