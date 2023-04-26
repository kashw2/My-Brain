A [Monoid](https://typelevel.org/cats/typeclasses/monoid.html) is a [[TypeClass]] that abstracts over a [[Generics|Generic]] and provides an `empty` value and also inherits `combine` from [[Semigroup]]. It is not a [[Kinds|Higher Kinded Type]] as it does not take a type constructor. It extends the [[Semigroup]] [[TypeClass]].

---

## Laws

1) **Associativity** which states that regardless of the order of operations, the result must be the same making the results [[Isomorphism|Isomorphic]].
2) **Left Identity** which states that if you have a left associative [[Product]] and combine it with a value who's identity function performs no action (Unit or Void) that the [[Product]] should be returned.
3) **Right Identity** similar to the second law states that if you have a right associative [[Product]] and combine it with a value who's identity function performs no action (Unit or Void) that the [[Product]] should be returned.

---

## Examples

```scala
trait Semigroup[A] {
  def combine(x: A, y: A): A
}

trait Monoid[A] extends Semigroup[A] {
  def empty: A
}
```

```typescript
interface Semigroup<A> {
	combine<A>(a: A, b: A): A;
}

interface Monoid<A> extends Semigroup<A> {
	empty: A;
}
```

### References

[TypeLevel Scala](https://typelevel.org/cats/typeclasses/monoid.html)
[Haskell Wiki](https://wiki.haskell.org/Typeclassopedia#Laws_5)