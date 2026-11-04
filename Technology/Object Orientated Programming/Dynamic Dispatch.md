**Dynamic Dispatch** is choosing which implementation of a method to run at runtime, based on the actual type of the [[Object]] it's called on rather than the declared type of the variable holding it. It's the mechanism behind subtype [[Polymorphism]] and [[Method Overriding]].

---

## Rationales

**Declared Type vs Runtime Type**
In `val animal: Animal = new Dog("Rex")` the compiler only knows `animal` is an `Animal`. It checks that `speak()` exists on `Animal`, then at runtime the call goes to `Dog`'s version. The compiler decides *whether* you can call it, the runtime decides *which one* runs.

**Static Dispatch is the Opposite**
Static dispatch is decided at compile time. [[Method Overloading]] works this way, the overload is picked from the declared types of the arguments. That's the classic gotcha: overrides are chosen by the runtime type, overloads by the compile time type.

**How it Works**
Compiled OOP languages usually give each [[Class]] a **virtual method table** (vtable), a list of pointers to its method implementations, and a call looks up the right slot. [[JavaScript]] looks methods up by name instead, walking up the prototype chain until it finds one. There's a small cost per call, and the [[Java Virtual Machine|JVM]]'s JIT can often optimise it away when only one implementation is in use. Marking a method `final` opts out of being overridden at all.

**Single vs Multiple Dispatch**
[[Scala]], [[Java]], [[TypeScript]] and [[PHP]] are single dispatch, only the runtime type of the receiver (`this`) matters, never the arguments. Languages with multiple dispatch pick on the runtime types of every argument. The Visitor [[Design Patterns|Design Pattern]] exists to fake double dispatch in single dispatch languages.

**Dynamic Dispatch vs TypeClasses**
[[TypeClass|TypeClasses]] give a similar "right implementation for the type" result, but the instance is found at compile time through [[Implicits]]. Subtypes can be chosen from data that only exists at runtime, TypeClasses can be added to types you don't own.

---

## Examples

```scala
val animal: Animal = new Dog("Rex")

// The compiler only knows it's an Animal, the runtime finds Dog's speak
animal.speak() // Woof

// Overloads are picked at compile time from the declared type
object Vet {
	def check(animal: Animal): String = "Checking an animal"
	def check(dog: Dog): String = "Checking a dog"
}

Vet.check(animal)         // Checking an animal, even though it's a Dog
Vet.check(new Dog("Rex")) // Checking a dog
```

```typescript
const animals: Animal[] = [new Dog("Rex"), new Cat("Tom")];

// `introduce` lives on Animal, but the `this.speak()` inside it
// is looked up on each object at runtime
for (const animal of animals) {
	console.log(animal.introduce());
}
// I'm Rex and I say Woof
// I'm Tom and I say Meow
```

---

### References

- [Java Tutorials: Polymorphism](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Dynamic_dispatch)
- [Wikipedia: Virtual Method Table](https://en.wikipedia.org/wiki/Virtual_method_table)
