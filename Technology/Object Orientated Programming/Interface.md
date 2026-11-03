An **Interface** is a contract that describes *what* a [[Class]] can do without saying *how*. It lists method signatures, and any [[Class]] that implements the Interface must provide them.

---

## Rationales

**Contracts, not Implementations**
Interfaces hold no state and (traditionally) no implementation. That makes them the purest form of [[Abstraction]]. Code that depends on an Interface can be given any implementation, which is what makes swapping a real database for an in-memory one in tests possible.

**Implement Many**
In most languages a [[Class]] can only [[Inheritance|inherit]] from one parent, but it can implement as many Interfaces as it likes.

**Interfaces in Scala**
[[Scala]] has no `interface` keyword, a [[Trait]] with only abstract methods fills the same role.

**Structural vs Nominal**
[[TypeScript]] Interfaces are structural, an [[Object]] satisfies an Interface if it has the right shape, it never needs to say `implements`. [[Java]] and [[PHP]] are nominal, a [[Class]] must declare every Interface it implements.

---

## Examples

```scala
trait Repository[A] {
	def find(id: Int): Option[A]
	def save(item: A): Unit
}

class InMemoryFruitRepository extends Repository[Fruit] {
	private val store = scala.collection.mutable.Map.empty[Int, Fruit]

	def find(id: Int): Option[Fruit] = store.get(id)
	def save(item: Fruit): Unit = store.update(store.size + 1, item)
}
```

```typescript
interface Repository<A> {
	find(id: number): A | undefined;
	save(item: A): void;
}

class InMemoryFruitRepository implements Repository<Fruit> {
	private store = new Map<number, Fruit>();

	find(id: number): Fruit | undefined {
		return this.store.get(id);
	}

	save(item: Fruit): void {
		this.store.set(this.store.size + 1, item);
	}
}

// Structural typing, no `implements` needed
const fakeRepository: Repository<Fruit> = {
	find: () => undefined,
	save: () => {},
};
```

---

### References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Scala Docs](https://docs.scala-lang.org/tour/traits.html)
- [PHP Docs](https://www.php.net/manual/en/language.oop5.interfaces.php)
