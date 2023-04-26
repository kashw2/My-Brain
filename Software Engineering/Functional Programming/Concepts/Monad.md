A [Monad](https://typelevel.org/cats/typeclasses/monad.html) is a [[TypeClass]] that abstracts over a type constructor and provides a `flatten` method which also inherits `pure` and `ap` from [[Applicative]] as well as `fmap` from [[Functor]].

---

## Laws

According to the [Haskell Documentation](https://wiki.haskell.org/Monad_laws) in order to satisfy the requirements of an Applicative, a type constructor must have a `pure` method that returns the value wrapped in said type constructor and an `ap` method that abides by three laws, they are:

1) **Associativity** which states that regardless of the order of operations, the result must be the same making the results [[Isomorphism|Isomorphic]].
2) **Left Identity** which states that if you have a left associative [[Product]] and combine it with a value who's identity function performs no action (Unit or Void) that the [[Product]] should be returned.
3) **Right Identity** similar to the second law states that if you have a right associative [[Product]] and combine it with a value who's identity function performs no action (Unit or Void) that the [[Product]] should be returned.

---

## Examples

```scala
trait FlatMap[F[_]] extends Apply[F] {
  def flatMap[A, B](fa: F[A])(f: A => F[B]): F[B]
}

trait Monad[F[_]] extends FlatMap[F] with Applicative[F]
```

### References

[Haskell Monad Laws](https://wiki.haskell.org/Monad_laws)
[Haskell Monad Documentation](https://wiki.haskell.org/Typeclassopedia#Laws_3)
[TypeLevel Scala](https://typelevel.org/cats/typeclasses/monad.html#monad-instances)