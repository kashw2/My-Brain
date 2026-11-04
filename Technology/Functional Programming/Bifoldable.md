[Bifoldable](https://typelevel.org/cats/api/cats/Bifoldable.html) is a [[TypeClass]] that abstracts over a type constructor with two type parameters (`F[_, _]`) and provides `bifoldLeft` and `bifoldRight` methods to reduce both sides down to a single value.

---

## Rationales

**Folding**
Folding reduces a structure to a single value by walking through it with an accumulator, `List(1, 2, 3).foldLeft(0)(_ + _)` gives `6`. The **Foldable** [[TypeClass]] does this for types with one type parameter.

**Two Sides**
Bifoldable is to Foldable what a [[Bifunctor]] is to a [[Functor]]. It folds types with two type parameters, like `Either[A, B]` and `(A, B)`, so it takes one function for each side.

**bifoldMap**
`bifoldMap` maps both sides into a [[Monoid]] and combines the results, so you don't have to provide a starting value or a combine function yourself.

---

## Examples

```scala
trait Bifoldable[F[_, _]] {
	def bifoldLeft[A, B, C](fab: F[A, B], c: C)(f: (C, A) => C, g: (C, B) => C): C

	def bifoldMap[A, B, C](fab: F[A, B])(f: A => C, g: B => C)(implicit C: Monoid[C]): C =
		bifoldLeft(fab, C.empty)(
			(c, a) => C.combine(c, f(a)),
			(c, b) => C.combine(c, g(b))
		)
}
```

```scala
import cats.syntax.all._

// Count characters on either side of an Either
val failed: Either[String, Int] = Left("oops")
failed.bifoldMap(_.length, _.toString.length) // 4

// Both sides of a tuple are combined with the String Monoid
("apples", 3).bifoldMap(identity, n => s" x$n") // "apples x3"
```

---

## Hierarchy

![[TypeClass Hierarchy]]


### References

[TypeLevel Scala](https://typelevel.org/cats/api/cats/Bifoldable.html)
[TypeLevel Scala: Foldable](https://typelevel.org/cats/typeclasses/foldable.html)
