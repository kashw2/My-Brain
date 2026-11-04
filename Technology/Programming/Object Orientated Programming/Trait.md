A **Trait** is a reusable unit of behaviour that can be mixed into a [[Class]]. In [[Scala]] Traits are used for everything from [[Interface|Interfaces]] to mixins to [[TypeClass|TypeClasses]], every TypeClass in [[Functional Programming]] ([[Functor]], [[Applicative]], [[Monad]], [[Semigroup]], [[Monoid]]) is written as a Trait.

---

## Rationales

**Mixins**
A [[Class]] can only extend one parent [[Class]], but it can mix in any number of Traits using `with`. That gives the main benefit of multiple [[Inheritance]], sharing implemented methods across unrelated classes, in small focused pieces.

**Linearisation**
When two Traits define the same method, Scala resolves it by **linearisation**. The Trait mixed in last wins, and its `super` calls go to the Trait mixed in before it. This is how Scala avoids the **Diamond Problem**.

**Traits in other languages**
[[PHP]] has `trait` too, but its methods are copied into the [[Class]] at compile time and it doesn't create a type you can use in a signature. [[TypeScript]] has no Traits, the closest is the mixin pattern, a function that takes a [[Class]] and returns an extended one, effectively a [[Higher Order Functions|Higher Order Function]] over classes.

---

## Examples

```scala
trait Pet {
	def owner: String

	def greetOwner(): String = s"Hello $owner!"
}

trait Trained {
	def tricks: List[String]

	def perform(): String = tricks.mkString(", ")
}

class Dog(name: String, val owner: String, val tricks: List[String])
	extends Animal(name) with Pet with Trained {
	def speak(): String = "Woof"
}

val rex = new Dog("Rex", "Alex", List("Sit", "Roll over"))
rex.greetOwner() // Hello Alex!
rex.perform()    // Sit, Roll over
```

```typescript
// TypeScript has no Traits, the mixin pattern is the closest equivalent
type Constructor<T = {}> = new (...args: any[]) => T;

function Pet<TBase extends Constructor>(Base: TBase) {
	return class extends Base {
		owner = "";

		greetOwner(): string {
			return `Hello ${this.owner}!`;
		}
	};
}

class Goldfish {
	constructor(public name: string) {}
}

const PetGoldfish = Pet(Goldfish);

const bubbles = new PetGoldfish("Bubbles");
bubbles.owner = "Alex";
bubbles.greetOwner(); // Hello Alex!
```

---

## Hierarchy

![[Inheritance Hierarchy]]


### References

- [Scala Docs](https://docs.scala-lang.org/tour/traits.html)
- [Scala Docs: Mixins](https://docs.scala-lang.org/tour/mixin-class-composition.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/mixins.html)
- [PHP Docs](https://www.php.net/manual/en/language.oop5.traits.php)
