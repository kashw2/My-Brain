**Generics** let a function or type work with any type, using a **type parameter** as a placeholder. A `List[A]` works the same whether `A` is an `Int` or a `String`. This is also called **Parametric [[Polymorphism]]**.

---

## Rationales

**Write it Once**
Without Generics you'd need an `IntList`, a `StringList` and so on, or you'd lose type safety by using `Any`. With them, one implementation works for every type and the compiler still checks each use.

**First Order Types**
A generic type like `List[A]` abstracts over a *type*. [[Kinds|Higher Kinded Types]] go one level up and abstract over *type constructors* like `List` itself, which is what [[Functor]] and [[Monad]] need. [[Semigroup]] and [[Monoid]] only need regular Generics.

**Bounds**
A type parameter can be restricted. `A <: Animal` means "any `A` that's a subtype of `Animal`", tying Generics to [[Inheritance]]. A context bound like `A: Monoid` means "any `A` that has a [[Monoid]] instance", tying Generics to [[TypeClass|TypeClasses]].

**Variance**
Variance decides how subtyping passes through a generic type. In [[Scala]] `List[+A]` is covariant, so a `List[Dog]` can be used where a `List[Animal]` is expected.

---

## Examples

```scala
def firstOf[A](items: List[A]): Option[A] = items.headOption

case class Box[A](value: A) {
	def map[B](f: A => B): Box[B] = Box(f(value))
}

// Upper bound
def loudest[A <: Animal](animals: List[A]): Option[A] = animals.headOption

// Context bound, needs a Monoid instance for A
def combineAll[A: Monoid](items: List[A]): A =
	items.foldLeft(Monoid[A].empty)(Monoid[A].combine)
```

```typescript
function firstOf<A>(items: A[]): A | undefined {
	return items[0];
}

class Box<A> {
	constructor(public value: A) {}

	map<B>(f: (a: A) => B): Box<B> {
		return new Box(f(this.value));
	}
}
```

---

### References

- [Scala Docs](https://docs.scala-lang.org/tour/generic-classes.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Parametric_polymorphism)
