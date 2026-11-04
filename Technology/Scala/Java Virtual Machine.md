The **Java Virtual Machine** (JVM) is a runtime that executes **bytecode** from `.class` files. [[Java]], [[Scala]], Kotlin and Clojure all compile to bytecode, so they run anywhere a JVM is installed and can use each other's libraries.

---

## How it Works

**Bytecode**
Compilers like `javac` and `scalac` don't produce machine code for a particular CPU. They produce bytecode, instructions for an abstract stack based machine. Each platform ([[Linux]], [[MacOS]], [[Windows]]) has its own JVM that runs the same bytecode, which is the "write once, run anywhere" idea.

**JIT Compilation**
The JVM starts by interpreting bytecode, watches which code runs the most, then compiles those hot spots to native machine code while the program runs. Long running services get faster once they've warmed up, but startup is slow next to a native binary. That's a big part of why Scala Native ([[Low Level Virtual Machine|LLVM]]) and GraalVM native images exist.

**Garbage Collection**
Objects are allocated on the heap and a garbage collector frees them once nothing references them, so there's no manual memory management. There are several collectors to pick from, some tuned for throughput and some for short pauses.

**One Spec, Many JVMs**
The JVM is a specification, not a single program. HotSpot (the JVM in OpenJDK) is the most common implementation, Eclipse OpenJ9 and GraalVM are others.

**Why Scala Uses It**
Building on the JVM gave [[Scala]] a mature runtime, garbage collector and JIT, plus every Java library from day one. Scala classes compile to ordinary JVM classes, so calling Java from Scala is just a method call.

**Type Erasure**
Generic type arguments only exist at compile time. At runtime a `List[Int]` and a `List[String]` are both just `List`, so [[Pattern Matching]] on `List[Int]` gets a warning. [[Static Typing]] does the checking, the JVM never sees it.

---

## Examples

```scala
// Java libraries can be used directly
import java.time.LocalDate
import java.util.UUID

val today: LocalDate = LocalDate.now()
val id: UUID = UUID.randomUUID()

// Type erasure, the Int is gone at runtime
def isIntList(x: Any): Boolean = x match {
	case _: List[Int] => true // warning, the type argument can't be checked
	case _            => false
}

isIntList(List("a", "b")) // true!
```

```bash
scalac Hello.scala   # Compile to .class files
javap -c Hello       # Disassemble the bytecode
java -version        # Check which JVM is installed
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Java_virtual_machine)
- [Scala 3 Book: Interacting with Java](https://docs.scala-lang.org/scala3/book/interacting-with-java.html)
- [The JVM Specification](https://docs.oracle.com/javase/specs/)
