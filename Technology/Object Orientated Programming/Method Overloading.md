**Method Overloading** is defining several methods with the same name in the same [[Class]], told apart by their parameter lists. The compiler picks which one to call from the argument types, which makes it the simplest form of ad-hoc [[Polymorphism]].

---

## Rationales

**Same Idea, Different Inputs**
Callers get one name for one idea. `add(fruit)` and `add("Apple")` read better than `addFruit` and `addFruitByName`, and the compiler sorts out which one is meant.

**Picked at Compile Time**
The overload is chosen from the *declared* types of the arguments, not what they turn out to be at runtime. That's the opposite of [[Method Overriding]], which uses [[Dynamic Dispatch]]. Passing a `Dog` held in an `Animal` variable calls the `Animal` overload.

**Return Type Doesn't Count**
Overloads have to differ in their parameters (number, types or order). Two methods that only differ by return type won't compile. On the [[Java Virtual Machine|JVM]] there's an extra catch, [[Generics]] are erased, so `add(List[Fruit])` and `add(List[String])` clash because both become `add(List)`.

**Not Every Language Has It**
[[Java]] and [[Scala]] have real overloading. [[TypeScript]] has overload *signatures* but only one implementation, which has to check the types itself because they're gone at runtime. [[PHP]] has none, declaring a method twice is a fatal error. Confusingly, the PHP manual uses "overloading" for its magic methods like `__call`, which is something else entirely.

**Often a Default Parameter is Better**
Overloads that only exist to fill in missing arguments (`greet()` and `greet(name)`) are cleaner as one method with a default value. For "same operation, many types" [[TypeClass|TypeClasses]] are the more principled option.

---

## Examples

```scala
class Basket {
	private var fruits = List.empty[Fruit]

	def add(fruit: Fruit): Unit = {
		fruits = fruit :: fruits
	}

	def add(name: String): Unit = add(new Fruit(name))

	def add(name: String, count: Int): Unit = (1 to count).foreach(_ => add(name))

	// Won't compile, only the return type differs
	// def add(fruit: Fruit): Boolean = ...
}
```

```typescript
class Basket {
	private fruits: Fruit[] = [];

	// Overload signatures, what callers see
	add(fruit: Fruit): void;
	add(name: string): void;

	// The single implementation has to work out which one was called
	add(fruitOrName: Fruit | string): void {
		const fruit = typeof fruitOrName === "string" ? new Fruit(fruitOrName) : fruitOrName;
		this.fruits.push(fruit);
	}
}
```

```php
class Basket
{
	private array $fruits = [];

	// No overloading in PHP, a union type does the same job
	public function add(Fruit|string $fruit): void
	{
		$this->fruits[] = is_string($fruit) ? new Fruit($fruit) : $fruit;
	}
}
```

---

### References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads)
- [Java Tutorials](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Function_overloading)
