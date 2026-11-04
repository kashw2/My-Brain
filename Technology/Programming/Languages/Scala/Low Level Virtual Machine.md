**LLVM** is a toolkit for building compilers: a shared **intermediate representation** (LLVM IR), an optimiser, and back ends that turn IR into machine code for lots of CPUs. It started out as "Low Level Virtual Machine", but the project now says the name isn't an acronym. Scala Native uses it to compile [[Scala]] to native binaries.

---

## How it Works

**Front End, IR, Back End**
A language's compiler (the front end) only has to translate source code into LLVM IR. LLVM optimises the IR, then a back end generates machine code for the target, x86-64, ARM, WebAssembly and more. Clang ([[C]] and C++), Rust, Swift and Scala Native all work this way.

**Why it Matters**
Writing a good optimiser and a code generator for every CPU is a massive job. A new language built on LLVM gets years of optimisation work and every supported platform for free, and every improvement to LLVM helps every language using it.

**LLVM IR**
IR is a low level, typed, assembly-like language that isn't tied to one CPU. Values are in SSA form (each one is assigned exactly once), which makes optimisations much easier to write.

**Scala Native**
Scala Native compiles Scala ahead of time into a native executable. The Scala compiler emits Scala Native's own NIR (Native Intermediate Representation), which is optimised and lowered to LLVM IR, then Clang compiles and links it. The result doesn't need a [[Java Virtual Machine|JVM]], starts almost instantly and uses less memory, which suits command line tools. It brings its own garbage collector (Immix by default).

**Trade-offs**
Without a JVM most Java libraries aren't available, so you're limited to libraries published for Scala Native. In return you can call [[C]] functions directly with `@extern`.

---

## Examples

```c
int add(int a, int b) {
	return a + b;
}
```

```llvm
; Simplified LLVM IR for the same function
define i32 @add(i32 %a, i32 %b) {
	%sum = add i32 %a, %b
	ret i32 %sum
}
```

```bash
clang -S -emit-llvm -O1 add.c -o add.ll   # C to LLVM IR
llc add.ll -o add.s                        # LLVM IR to assembly
```

```scala
// build.sbt, after adding the sbt-scala-native plugin to project/plugins.sbt
enablePlugins(ScalaNativePlugin)
```

```scala
import scala.scalanative.unsafe._

// Calling a C function directly
@extern
object libc {
	def abs(x: CInt): CInt = extern
}

object Main {
	def main(args: Array[String]): Unit =
		println(libc.abs(-42)) // 42
}
```

```bash
sbt nativeLink   # Build the native executable
sbt run          # Build and run it
```

---

### References

- [LLVM](https://llvm.org/)
- [Wikipedia](https://en.wikipedia.org/wiki/LLVM)
- [Scala Native](https://scala-native.org/en/stable/)
