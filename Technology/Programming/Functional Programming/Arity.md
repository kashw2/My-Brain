**Arity** is the number of arguments a function takes, or the number of type parameters a type constructor takes.

---

## Rationales

**Function Arity**
- **Nullary**, takes no arguments, `() => 42`
- **Unary**, takes one, `x => x + 1`
- **Binary**, takes two, `(a, b) => a + b`
- **Ternary**, takes three
- **Variadic**, takes any number, `(xs: Int*) => xs.sum`

In [[Scala]] a function's Arity is part of its type, `Function0` up to `Function22`. [[Function Currying]] turns any Arity into a chain of unary functions.

**Type Arity**
Type constructors have an Arity too, and it decides which [[TypeClass|TypeClasses]] they can have, see [[Kinds]]:
- `Int` takes no type parameters (a first order type).
- `List[_]` and `Option[_]` take one, so they can be a [[Functor]] or [[Monad]].
- `Either[_, _]` and `Tuple2[_, _]` take two, so they can be a [[Bifunctor]] or [[Bifoldable]].

---

## Examples

```scala
val nullary: () => Int = () => 42
val unary: Int => Int = x => x + 1
val binary: (Int, Int) => Int = (a, b) => a + b
def variadic(xs: Int*): Int = xs.sum

// The Arity is in the type
val f: Function2[Int, Int, Int] = binary
```

```typescript
const binary = (a: number, b: number): number => a + b;

binary.length; // 2, a function's Arity at runtime
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Arity)
