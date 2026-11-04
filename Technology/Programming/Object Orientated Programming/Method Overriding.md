**Method Overriding** is when a subclass provides its own implementation of a method it [[Inheritance|inherited]] from a parent [[Class]], [[Interface]] or [[Trait]]. Which version runs is decided at runtime by [[Dynamic Dispatch]].

---

## Rationales

**Specialising Behaviour**
`Animal` declares `speak()`, `Dog` and `Cat` each override it. Code that works with an `Animal` gets the right sound without knowing which animal it has. This is what subtype [[Polymorphism]] is built on.

**Overriding vs Overloading**

| | Overriding | [[Method Overloading]] |
|-|-|-|
| Signature | Same as the parent | Different parameters |
| Where | In a subclass | Usually the same [[Class]] |
| Chosen | At runtime | At compile time |

**Mark it Explicitly**
[[Scala]] requires `override` when replacing a concrete method. [[Java]] has the `@Override` annotation, [[TypeScript]] has the `override` keyword (required with the `noImplicitOverride` flag) and [[PHP]] has the `#[\Override]` attribute since PHP 8.3. They all catch the same bug: rename or misspell the parent method and the "override" silently becomes a brand new method that nothing calls.

**Extend, Don't Just Replace**
An override can call the parent's version with `super` (`parent::` in [[PHP]]) and add to it, rather than rewriting it from scratch.

**Stay Substitutable**
An override has to keep the promises the parent made, that's Liskov Substitution, the "L" in [[SOLID]]. The compiler checks the signature but not the behaviour. An override that throws where the parent never did, or quietly does nothing, will break code written against the parent. Marking a method `final` stops it being overridden at all.

---

## Examples

```scala
class Puppy(name: String) extends Dog(name) {
	// Replacing a concrete method, so `override` is required
	override def speak(): String = s"${super.speak()}, but squeakier"
}

class Cat(name: String) extends Animal(name) {
	// Implementing an abstract method, `override` is optional
	def speak(): String = "Meow"

	// `final` stops any subclass of Cat overriding this again
	final override def introduce(): String = s"${super.introduce()}. Now leave me alone."
}

new Puppy("Bit").introduce() // I'm Bit and I say Woof, but squeakier
```

```typescript
class Puppy extends Dog {
	override speak(): string {
		return `${super.speak()}, but squeakier`;
	}

	// Compile error, Dog has no `speek` to override
	override speek(): string {
		return "Yip";
	}
}
```

```php
class Puppy extends Dog
{
	#[\Override]
	public function speak(): string
	{
		return parent::speak() . ', but squeakier';
	}
}
```

---

### References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [PHP Docs: Override](https://www.php.net/manual/en/class.override.php)
- [Wikipedia](https://en.wikipedia.org/wiki/Method_overriding)
