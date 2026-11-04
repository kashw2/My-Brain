**Inheritance** is when a [[Class]] (the **subclass** or **child**) is based on another [[Class]] (the **superclass** or **parent**), taking on its fields and methods and optionally adding to or [[Method Overriding|overriding]] them.

---

## Rationales

**"Is A" Relationship**
Inheritance models an *is a* relationship. A `Dog` *is an* `Animal`, so it makes sense for `Dog` to inherit from `Animal`. If the relationship is really *has a* (a `Car` *has an* `Engine`), then [[Composition over Inheritance|composition]] is the better fit.

**Liskov Substitution Principle**
The "L" in [[SOLID]]. Anywhere the parent is expected, a child must work without breaking anything. A `Square` that extends `Rectangle` is the classic violation, setting the width of a `Square` also changes its height, which code expecting a `Rectangle` won't anticipate.

**Single vs Multiple Inheritance**
Most languages ([[Java]], [[PHP]], [[TypeScript]]) only let a [[Class]] extend one parent, which avoids the **Diamond Problem** where two parents define the same method. [[Scala]] gets around this with [[Trait|Traits]], any number of which can be mixed in and are resolved in a fixed order.

**Inheritance in Functional Programming**
Inheritance isn't limited to domain models. The [[TypeClass]] hierarchy in [[Functional Programming]] is built with it: `Applicative extends Functor` and `Monad extends FlatMap with Applicative`, see [[Applicative]] and [[Monad]]. [[Kinds]] covers why lifting this to the type level can be better than inheriting from concrete classes.

---

## Examples

```scala
abstract class Animal(val name: String) {
	def speak(): String

	def introduce(): String = s"I'm $name and I say ${speak()}"
}

class Dog(name: String) extends Animal(name) {
	def speak(): String = "Woof"
}

class Cat(name: String) extends Animal(name) {
	def speak(): String = "Meow"
}

new Dog("Rex").introduce() // I'm Rex and I say Woof
```

```typescript
abstract class Animal {
	constructor(public name: string) {}

	abstract speak(): string;

	introduce(): string {
		return `I'm ${this.name} and I say ${this.speak()}`;
	}
}

class Dog extends Animal {
	speak(): string {
		return "Woof";
	}
}

class Cat extends Animal {
	speak(): string {
		return "Meow";
	}
}

new Dog("Rex").introduce(); // I'm Rex and I say Woof
```

---

## Hierarchy

![[Inheritance Hierarchy]]


### References

- [Scala Docs](https://docs.scala-lang.org/scala3/book/domain-modeling-oop.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming))
- [Liskov Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
