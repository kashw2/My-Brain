A [Semigroup](https://typelevel.org/cats/typeclasses/semigroup.html) is a [[TypeClass]] that abstracts over a [[Generics|Generic]] and provides a `combine` method. It is not a [[Kinds|Higher Kinded Type]] as it does not take a type constructor.

To sumerise, a [Semigroup](https://typelevel.org/cats/typeclasses/semigroup.html) just gives a generalised way to combine two of values of the same type. An example of this would be defining `combine` for an Integer which would give an implementation that would perform an addition on two Integers thus combining them.

An even more common implementation of `combine` is the `concat` method on String.

---

## Laws

1) **Associativity** which states that regardless of the order of operations, the result must be the same making the results [[Isomorphism|Isomorphic]].

---

## Examples

```scala
trait Semigroup[A] {
  def combine(x: A, y: A): A
}
```

```typescript
interface Semigroup<A> {
	combine(a: A, b: A): A;
}
```

### References

[TypeLevel Scala](https://typelevel.org/cats/typeclasses/semigroup.html)
[Haskell Wiki](https://wiki.haskell.org/Typeclassopedia#Semigroup)