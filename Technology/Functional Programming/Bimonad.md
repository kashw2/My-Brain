A [Bimonad](https://typelevel.org/cats/api/cats/Bimonad.html) is a [[TypeClass]] for a type constructor that is both a [[Monad]] and a **Comonad**. Unlike [[Bifunctor]] and [[Bifoldable]], the "Bi" doesn't mean two type parameters, it means two TypeClasses.

---

## Rationales

**Comonads**
A Comonad is the dual (mirror image) of a [[Monad]]:
- A [[Monad]] has `pure: A => F[A]` to put a value *into* a context. A Comonad has `extract: F[A] => A` to take one *out*.
- A [[Monad]] has `flatMap: F[A] => (A => F[B]) => F[B]`. A Comonad has `coflatMap: F[A] => (F[A] => B) => F[B]`.

Most Monads can't be Comonads. You can't `extract` a value from an empty `Option` or `List`.

**Both at Once**
A Bimonad can go both ways, put a value in with `pure` and take it back out with `extract`. In Cats the instances are types that always hold exactly one value, like `Eval`, `Id` and `Function0`.

---

## Laws

A Bimonad must satisfy the [[Monad]] and Comonad laws plus:

1) **pure then extract** must give back the original value, `extract(pure(a)) == a`.

---

## Examples

```scala
trait Comonad[F[_]] extends CoflatMap[F] {
	def extract[A](fa: F[A]): A
}

trait Bimonad[F[_]] extends Monad[F] with Comonad[F]
```

```scala
import cats.{Bimonad, Eval}

val B = Bimonad[Eval]

val wrapped: Eval[Int] = B.pure(42)
B.extract(wrapped) // 42
```

---

## Hierarchy

![[TypeClass Hierarchy]]


### References

[TypeLevel Scala](https://typelevel.org/cats/api/cats/Bimonad.html)
[TypeLevel Scala: Comonad](https://typelevel.org/cats/typeclasses/comonad.html)
