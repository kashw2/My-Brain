A [Functor](https://typelevel.org/cats/typeclasses/functor.html) is a [[TypeClass]] that abstracts over type constructors providing a lawful `fmap` method.

---

## Laws
According to the [Haskell Wiki](https://wiki.haskell.org/Typeclassopedia#Laws) in order to satisfy the requirements of a Functor, a type constructor must have a `fmap` method that abides two laws, they are:

1)  "mapping the identity function over every item in a container has no effect."
2)  "mapping a composition of two functions over every item in a container is the same as first mapping one function, and then mapping the other."

The first law (otherwise known as the **Identity Law**) just states that a map method cannot change the structure of the original input. For example:

You have a `Functor[List[_]]` and instantiate a `List[Int](1, 2, 3)`. Calling `map` on the previously mentioned list must return 3 elements, the so called **Identity Function** is the `map` function.

The second law (otherwise known as the **Functoriality Law**) just states that that applying a function that performs a transformation inside of a `map` function must yield the same result as doing it using composition. For example:

You have a `Functor[List[_]]` and instantiate a `List[Int](1, 2, 3)`. Calling `map` on the previous like `List[Int](1, 2, 3).map(v => (v * 2).toString())` must yield the same result as running `List[Int](1, 2, 3).map(v => v * 2).map(v => v.toString())`.

---

## Examples

```scala
trait Functor[F[_]] {
	def map[A, B](fn: F[A])(v: A => B): F[B];
}
```

```typescript
/**
* As Higher Kinded Types aren't a capability of TypeScript, their 
* implementations can be a bit hacky and odd and should not be 
* regarded as true implementations and merely just seen as 
* 'friendlyer' explainations of the concept.
**/

interface Functor<F> {
  map<A, B>(fa: F, f: (a: A) => B): F;
}

// Define the Array functor instance
const Array: Functor<Array<any>> = {
  map<A, B>(fa: Array<A>, f: (a: A) => B): Array<B> {
    return fa.map(f);
  }
};
```

---

## Hierarchy

![[Functor Hierarchy]]


### References

[Haskell Wiki](https://wiki.haskell.org/Typeclassopedia#Functor)
[TypeLevel Scala](https://typelevel.org/cats/typeclasses/functor.html)