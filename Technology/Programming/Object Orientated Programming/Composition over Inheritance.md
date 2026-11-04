**Composition over Inheritance** is the principle that a [[Class]] should get its behaviour by holding other [[Object|Objects]] that provide it (*has a*), rather than by [[Inheritance|inheriting]] it from a parent (*is a*).

---

## Rationales

**The Problem with Deep Hierarchies**
Inheritance trees get rigid. Say you have `Animal`, `FlyingAnimal` and `SwimmingAnimal`, then a duck turns up that does both. With single [[Inheritance]] there's no clean place to put it, and any change to a parent ripples down to every child (the **Fragile Base Class** problem).

**Swap Behaviour at Runtime**
A composed [[Object]] can be handed a different collaborator. Inherited behaviour is fixed when the [[Class]] is written.

**Easier to Test**
Collaborators are usually defined as [[Interface|Interfaces]], so they can be replaced with fakes in tests.

**Link to Functional Programming**
This is the same argument [[Kinds]] makes for lifting abstractions to the type level. Passing behaviour in as a function, a [[Higher Order Functions|Higher Order Function]], is composition in its simplest form, and it's how [[Functional Programming]] builds programs.

---

## Examples

```scala
trait Movement {
	def move(): String
}

class Flying extends Movement {
	def move(): String = "Flies"
}

class Swimming extends Movement {
	def move(): String = "Swims"
}

class Duck(movements: List[Movement]) {
	def move(): String = movements.map(_.move()).mkString(" and ")
}

new Duck(List(new Flying, new Swimming)).move() // Flies and Swims
```

```typescript
interface Movement {
	move(): string;
}

const flying: Movement = { move: () => "Flies" };
const swimming: Movement = { move: () => "Swims" };

class Duck {
	constructor(private movements: Movement[]) {}

	move(): string {
		return this.movements.map(m => m.move()).join(" and ");
	}
}

new Duck([flying, swimming]).move(); // Flies and Swims
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Composition_over_inheritance)
- [Scala Docs: Mixins](https://docs.scala-lang.org/tour/mixin-class-composition.html)
