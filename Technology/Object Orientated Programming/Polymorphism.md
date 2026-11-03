**Polymorphism** ("many forms") is the ability to use a single interface to represent many different types. Code written against that interface works with any type that fits it, without needing to know which one it actually has.

---

## Rationales

There are three main kinds of Polymorphism, and only the first is specific to [[Object Orientated Programming|OOP]]:

1) **Subtype Polymorphism** is what most people mean in OOP. A `Dog` and a `Cat` can both be treated as an `Animal`, and calling `speak()` runs the right implementation at runtime through [[Dynamic Dispatch]]. It relies on [[Inheritance]] or [[Interface|Interfaces]].
2) **Parametric Polymorphism** is better known as [[Generics]]. A [[LinkedList|List]] (`List[A]`) behaves the same whether `A` is an `Int` or a `Fruit`. [[Kinds|Kind Polymorphism]] takes this a step further by abstracting over type constructors.
3) **Ad-hoc Polymorphism** gives a separate implementation per type, chosen at compile time. [[Method Overloading]] is the simple form, [[TypeClass|TypeClasses]] are the powerful form. A `Semigroup[Int]` and a `Semigroup[String]` both provide `combine` but each does it differently, see [[Semigroup]].

---

## Examples

```scala
// Subtype Polymorphism, using the Animal classes from Inheritance
val animals: List[Animal] = List(new Dog("Rex"), new Cat("Tom"))
animals.map(_.speak()) // List(Woof, Meow)

// Parametric Polymorphism
def firstOf[A](items: List[A]): Option[A] = items.headOption

// Ad-hoc Polymorphism with a TypeClass and Implicits
trait Describe[A] {
	def describe(a: A): String
}

implicit object DescribeInt extends Describe[Int] {
	def describe(a: Int): String = s"The number $a"
}

implicit object DescribeFruit extends Describe[Fruit] {
	def describe(a: Fruit): String = s"A piece of fruit called ${a.name}"
}

def describe[A](a: A)(implicit d: Describe[A]): String = d.describe(a)

describe(42)                 // The number 42
describe(new Fruit("Apple")) // A piece of fruit called Apple
```

```typescript
// Subtype Polymorphism
const animals: Animal[] = [new Dog("Rex"), new Cat("Tom")];
animals.map(a => a.speak()); // ["Woof", "Meow"]

// Parametric Polymorphism
function firstOf<A>(items: A[]): A | undefined {
	return items[0];
}
```

The Scala TypeClass example uses [[Implicits]], the compiler finds the right `Describe` for the type at compile time.

---

## Hierarchy

![[Inheritance Hierarchy]]


### References

- [Wikipedia](https://en.wikipedia.org/wiki/Polymorphism_(computer_science))
- [Scala Docs](https://docs.scala-lang.org/tour/polymorphic-methods.html)
- [TypeLevel Scala](https://typelevel.org/cats/typeclasses.html)
