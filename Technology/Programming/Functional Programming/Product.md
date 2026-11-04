A **Product** (or **Product Type**) is a type made by combining several values together, all of which are present at once. Tuples and case classes are Products, `(Int, String)` holds an `Int` **and** a `String`.

---

## Rationales

**Why "Product"**
The number of possible values of a Product is the *product* of the number of values of its parts. `Boolean` has 2 values, so `(Boolean, Boolean)` has 2 × 2 = 4. Together with **Sum Types** (where the counts add) these make up [[Algebraic Data Types]].

**Unit is the Identity**
`Unit` has exactly one value, `()`. Pairing anything with it adds no information, `(A, Unit)` holds exactly the same information as `A`, the two are [[Isomorphism|Isomorphic]]. This is what the **Left Identity** and **Right Identity** laws in [[Applicative]] and [[Monad]] are describing.

**Associativity**
`((A, B), C)` and `(A, (B, C))` hold the same information and are [[Isomorphism|Isomorphic]] too. Being associative with an identity means types under Product behave like a [[Monoid]].

**Product in TypeClasses**
[[Apply]] provides `product`, which combines `F[A]` and `F[B]` into `F[(A, B)]`, the Product of two values inside a context.

---

## Examples

```scala
// Tuples and case classes are Products
val pair: (Int, String) = (1, "one")

case class User(name: String, age: Int)

// (A, Unit) and A are Isomorphic
def to[A](pair: (A, Unit)): A = pair._1
def from[A](a: A): (A, Unit) = (a, ())

// product with Apply / Applicative
import cats.syntax.all._
val both: Option[(Int, String)] = Option(1).product(Option("one")) // Some((1, "one"))
```

```typescript
type Pair = [number, string];

type User = {
	name: string;
	age: number;
};
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Product_type)
- [TypeLevel Scala](https://typelevel.org/cats/api/cats/Semigroupal.html)
