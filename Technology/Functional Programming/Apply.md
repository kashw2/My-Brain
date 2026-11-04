[Apply](https://typelevel.org/cats/typeclasses/apply.html) is a [[TypeClass]] that abstracts over a type constructor and provides an `ap` method, as well as `map2` and `product` for combining independent values. It extends [[Functor]], and [[Applicative]] is an Apply with `pure` added.

---

## Rationales

**Combining Independent Values**
A [[Functor]] can change the value inside one `F[A]`. Apply can combine several, `map2(fa, fb)(f)` runs `f` on the values inside two contexts. The values must be independent, neither can depend on the result of the other, that's what [[FlatMap]] adds.

**Why Split it from Applicative**
Some types can combine values but can't create one from nothing with `pure`. A `Map[K, _]` can combine two maps by matching keys, but there's no sensible `pure` for "a map containing this value" without a key. Splitting Apply out lets those types still get `ap`, `map2` and `product`.

**product**
`product` combines `F[A]` and `F[B]` into `F[(A, B)]`, see [[Product]].

---

## Laws

According to the [TypeLevel Apply Documentation](https://typelevel.org/cats/typeclasses/apply.html), an Apply must satisfy the [[Functor]] laws plus:

1) **Composition** which states that applying functions with `ap` must be associative, applying `f` then `g` using `ap` twice is the same as composing them first and applying once, see [[Function Composition]].

---

## Examples

```scala
trait Apply[F[_]] extends Functor[F] {
	def ap[A, B](ff: F[A => B])(fa: F[A]): F[B]

	def map2[A, B, Z](fa: F[A], fb: F[B])(f: (A, B) => Z): F[Z] =
		ap(map(fa)(a => (b: B) => f(a, b)))(fb)

	def product[A, B](fa: F[A], fb: F[B]): F[(A, B)] =
		map2(fa, fb)((a, b) => (a, b))
}
```

```scala
import cats.syntax.all._

(Option(2), Option(3)).mapN(_ + _)        // Some(5)
(Option(2), Option.empty[Int]).mapN(_ + _) // None
```

---

## Hierarchy

![[Applicative Hierarchy]]


### References

[TypeLevel Scala](https://typelevel.org/cats/typeclasses/apply.html)
[Haskell Wiki](https://wiki.haskell.org/Typeclassopedia#Applicative)
