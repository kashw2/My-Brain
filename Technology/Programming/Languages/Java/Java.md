Java is a compiled, [[Static Typing|Statically Typed]], [[Object Orientated Programming|Object Orientated]] Programming Language that compiles to bytecode and runs on the [[Java Virtual Machine|JVM]]. It's the language the JVM was built for, which is why [[Scala]] can use any Java library directly.

----

## Features

- [[Static Typing]] with local type inference (`var`)
- [[Class]] based [[Object Orientated Programming|OOP]], everything lives inside a [[Class]]
- Single [[Inheritance]], but a [[Class]] can implement many [[Interface|Interfaces]]
- [[Abstract Class|Abstract Classes]]
- [[Access Modifiers]], `public`, `protected`, `private` and package-private (the default, no keyword)
- [[Method Overloading]] and [[Method Overriding]] (with the `@Override` annotation)
- [[Generics]], erased at compile time so `List<String>` and `List<Integer>` are the same class at runtime
- Records and sealed interfaces, which give Java [[Algebraic Data Types]]
- [[Pattern Matching]] in `switch` and `instanceof`
- Lambdas and the Streams API for [[Higher Order Functions]]
- Checked exceptions, the compiler forces you to handle or declare them
- Garbage collected, no manual memory management unlike [[C]]
- Maven and Gradle are the common build tools

## Examples

```java
abstract class Animal {
	private final String name;

	Animal(String name) {
		this.name = name;
	}

	abstract String speak();

	String introduce() {
		return "I'm " + name + " and I say " + speak();
	}
}

class Dog extends Animal {
	Dog(String name) {
		super(name);
	}

	@Override
	String speak() {
		return "Woof";
	}
}

// A record is an immutable data class, the constructor, accessors,
// equals, hashCode and toString all come for free
record Fruit(String name, int ripeness) {}

new Dog("Rex").introduce(); // I'm Rex and I say Woof
```

### References

- [Dev.java](https://dev.java/learn/)
- [Oracle Java Documentation](https://docs.oracle.com/en/java/)
- [Wikipedia](https://en.wikipedia.org/wiki/Java_(programming_language))
