A [Bifunctor](https://typelevel.org/cats/typeclasses/bifunctor.html) is a [[TypeClass]] that abstracts over a type constructor with *two* type parameters (`F[_, _]`) and provides a `bimap` method to map over both sides at once.

---

## Rationales

**Two Sides**
A [[Functor]] maps over a type with one type parameter. Types like `Either[A, B]` and `(A, B)` have two, see [[Arity]]. A Bifunctor can map either side, or both.

**leftMap**
A [[Functor]] for `Either` only maps the `Right` side. Bifunctor's `leftMap` maps the `Left` side, which is the common use, like turning a low-level error into a domain error.

**Either vs Tuple**
For `Either` only one side exists at a time, so only one of the two functions actually runs. For a tuple both sides exist, so both functions run.

---

## Laws

The Bifunctor laws are the [[Functor]] laws applied to both sides:

1) **Identity**, `bimap(identity, identity)` must return the original value unchanged.
2) **Composition**, `bimap(f1, g1)` then `bimap(f2, g2)` must be the same as `bimap(f1 andThen f2, g1 andThen g2)`, see [[Function Composition]].

---

## Examples

```scala
trait Bifunctor[F[_, _]] {
	def bimap[A, B, C, D](fab: F[A, B])(f: A => C, g: B => D): F[C, D]

	def leftMap[A, B, C](fab: F[A, B])(f: A => C): F[C, B] =
		bimap(fab)(f, identity)
}
```

```scala
import cats.syntax.all._

val result: Either[Throwable, Int] = Left(new Exception("timeout"))

result.leftMap(e => s"Request failed: ${e.getMessage}")
// Left("Request failed: timeout")

("apple", 3).bimap(_.toUpperCase, _ * 2)
// ("APPLE", 6)
```

---

## Hierarchy

![[TypeClass Hierarchy]]


### References

[TypeLevel Scala](https://typelevel.org/cats/typeclasses/bifunctor.html)
[Haskell Wiki](https://wiki.haskell.org/Typeclassopedia#Bifunctor)
