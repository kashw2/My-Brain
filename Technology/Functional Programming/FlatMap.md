[FlatMap](https://typelevel.org/cats/typeclasses/monad.html) is a [[TypeClass]] that abstracts over a type constructor and provides a `flatMap` method. It extends [[Apply]], and a [[Monad]] is a FlatMap with `pure` from [[Applicative]] added.

---

## Rationales

**Dependent Steps**
[[Apply]] combines values that are independent of each other. `flatMap` lets the next step depend on the result of the previous one: `fa.flatMap(a => ...)` uses `a` to decide what to do next. That's what makes sequencing possible, like looking up a user and then loading their orders using the user's ID.

**map then flatten**
`flatMap` is `map` followed by `flatten`. Mapping `f: A => F[B]` over `F[A]` gives `F[F[B]]`, and `flatten` collapses it to `F[B]`.

**For Comprehensions**
[[Scala]]'s [[For Comprehension|for comprehensions]] are syntax for chains of `flatMap` and `map`.

**Stack Safety**
FlatMap also requires `tailRecM`, a stack-safe way to loop with `flatMap` so long chains don't overflow the stack.

---

## Laws

According to the [TypeLevel Documentation](https://typelevel.org/cats/typeclasses/monad.html), a FlatMap must satisfy the [[Apply]] laws plus:

1) **Associativity** which states that `fa.flatMap(f).flatMap(g)` must be the same as `fa.flatMap(a => f(a).flatMap(g))`, how the steps are nested doesn't change the result.
2) **tailRecM Consistency** which states that `tailRecM` must give the same result as writing the loop with `flatMap` directly.

---

## Examples

```scala
trait FlatMap[F[_]] extends Apply[F] {
	def flatMap[A, B](fa: F[A])(f: A => F[B]): F[B]

	def flatten[A](ffa: F[F[A]]): F[A] = flatMap(ffa)(fa => fa)

	def tailRecM[A, B](a: A)(f: A => F[Either[A, B]]): F[B]
}
```

```scala
def findUser(id: Int): Option[User] = ???
def findOrders(user: User): Option[List[Order]] = ???

// Each step depends on the last
val orders: Option[List[Order]] = findUser(1).flatMap(user => findOrders(user))

// The same thing as a for comprehension
val orders2: Option[List[Order]] = for {
	user   <- findUser(1)
	orders <- findOrders(user)
} yield orders
```

---

## Hierarchy

![[Monad Hierarchy]]


### References

[TypeLevel Scala](https://typelevel.org/cats/typeclasses/monad.html)
[Haskell Wiki](https://wiki.haskell.org/Typeclassopedia#Monad)
