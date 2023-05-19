An [Applicative](https://typelevel.org/cats/typeclasses/applicative.html) is a [[TypeClass]] that abstracts over a type constructor and provides a `pure` and `ap` method which also inherits `fmap` by extending [[Functor]].

---

## Laws

According to the [TypeLevel Applicative Documentation](https://typelevel.org/cats/typeclasses/applicative.html) in order to satisfy the requirements of an Applicative, a type constructor must have a `pure` method that returns the value wrapped in said type constructor and an `ap` method that abides by three laws, they are:

1) **Associativity** which states that regardless of the order of operations, the result must be the same making the results [[Isomorphism|Isomorphic]].
2) **Left Identity** which states that if you have a left associative [[Product]] and combine it with a value who's identity function performs no action (Unit or Void) that the [[Product]] should be returned.
3) **Right Identity** similar to the second law states that if you have a right associative [[Product]] and combine it with a value who's identity function performs no action (Unit or Void) that the [[Product]] should be returned.

---

## Examples

```scala
trait Applicative[F[_]] extends Functor[F] {
  def ap[A, B](ff: F[A => B])(fa: F[A]): F[B]

  def pure[A](a: A): F[A]

  def map[A, B](fa: F[A])(f: A => B): F[B] = ap(pure(f))(fa)
}
```

---

## Hierarchy

![[Applicative Hierarchy]]



### References 

[Haskell Wiki](https://wiki.haskell.org/Typeclassopedia#Applicative)
[TypeLevel Scala](https://typelevel.org/cats/typeclasses/applicative.html)