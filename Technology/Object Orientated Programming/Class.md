A **Class** is a blueprint for creating [[Object|Objects]]. It defines the data (fields) an [[Object]] holds and the behaviour (methods) it can perform.

---

## Rationales

**Fields**
Fields hold the state of an [[Object]]. Every [[Object]] created from a Class gets its own copy of the fields, so two instances of the same Class can hold different values.

**Methods**
Methods are functions that belong to a Class. They have access to the fields of the instance they're called on, usually through `this`. Who else can see a field or method is controlled by [[Access Modifiers]], see [[Encapsulation (OOP)|Encapsulation]].

**Constructors**
A constructor is what runs when an [[Object]] is created, it's responsible for setting the initial state of the fields. In [[Scala]] the constructor parameters are written directly after the class name, in [[TypeScript]] they go in a `constructor` method.

---

## Examples

```scala
class Fruit(val name: String, private var ripeness: Int = 0) {

	def ripen(): Unit = {
		ripeness += 1
	}

	def isRipe: Boolean = ripeness >= 3
}

val apple = new Fruit("Apple")
apple.ripen()
```

```typescript
class Fruit {
	constructor(public name: string, private ripeness: number = 0) {}

	ripen(): void {
		this.ripeness += 1;
	}

	isRipe(): boolean {
		return this.ripeness >= 3;
	}
}

const apple = new Fruit("Apple");
apple.ripen();
```

---

### References

- [Scala Docs](https://docs.scala-lang.org/tour/classes.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Class_(computer_programming))
