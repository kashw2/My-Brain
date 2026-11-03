An **Object** is an instance of a [[Class]]. It bundles together state (the values of its fields) and behaviour (its methods) into a single unit that other Objects can interact with.

---

## Rationales

**Identity**
Every Object has its own identity. Two Objects created from the same [[Class]] with the same values are still two separate Objects, by default comparing them checks *which* Object they are, not *what* they hold.

**State**
The values held in an Object's fields at a point in time. Mutating state is normal in [[Object Orientated Programming|OOP]], which is the biggest contrast with [[Functional Programming]] where values are immutable and functions are [[Pure]].

**Behaviour**
The methods an Object exposes. Other Objects should interact with it through its behaviour rather than reaching into its state, see [[Encapsulation (OOP)|Encapsulation]].

---

## Examples

Using the `Fruit` [[Class]]:

```scala
val apple = new Fruit("Apple")
val anotherApple = new Fruit("Apple")

apple == anotherApple           // false, different identities
apple.name == anotherApple.name // true, same state
```

Making `Fruit` a `case class` instead changes `==` to compare state, so `apple == anotherApple` would be `true`.

```typescript
const apple = new Fruit("Apple");
const anotherApple = new Fruit("Apple");

apple === anotherApple;           // false, different identities
apple.name === anotherApple.name; // true, same state
```

---

## Scala `object`

In [[Scala]], `object` is also a keyword. It defines a **Singleton Object**, a [[Class]] with exactly one instance that's created lazily the first time it's referenced. When an `object` has the same name as a [[Class]] in the same file it's called a **Companion Object**, the two can access each other's private members and it's the usual home for factory methods.

```scala
class Fruit(val name: String)

object Fruit {
	def apple(): Fruit = new Fruit("Apple")
}

val apple = Fruit.apple()
```

---

### References

- [Scala Docs](https://docs.scala-lang.org/tour/singleton-objects.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Object_(computer_science))
