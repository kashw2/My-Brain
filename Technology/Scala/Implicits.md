**Implicits** let the compiler fill in arguments for you based on their type. Scala 2 marks everything with `implicit`, Scala 3 splits the idea into **givens** (`given` and `using`), `extension` methods and `Conversion`s. They're how [[Scala]] does [[TypeClass|TypeClasses]].

---

## Rationales

**Implicit Parameters**
A parameter list marked `implicit` (Scala 2) or `using` (Scala 3) doesn't need to be passed by hand. The compiler looks for a value of the right type in scope and passes it in. Great for context that gets threaded through everything, like an `ExecutionContext`, a config or a [[TypeClass]] instance.

**TypeClasses**
You define a trait like `Show[A]`, provide instances for the types you care about, and ask for one with a context bound `[A: Show]`. The compiler picks the right instance at compile time, giving ad hoc [[Polymorphism]] without [[Inheritance]]. This is what powers [[Functor]], [[Monad]] and the rest of Cats.

**Where the Compiler Looks**
First the local scope (definitions and imports), then the companion objects of the types involved. Putting instances in the companion [[Object]] of `Show` or of your own type means they're found without any imports. If two candidates are equally good it's an ambiguity error at compile time, never a runtime surprise.

**Why Scala 3 Changed Them**
In Scala 2 one keyword did three jobs: implicit parameters, implicit conversions and extension methods (`implicit class`). That made code hard to read and errors hard to understand. Scala 3 gives each job its own syntax, and givens have to be imported explicitly with `import Show.given`, a plain `import Show.*` won't bring them in. Scala 3 still accepts the Scala 2 syntax to ease migration.

**Use Conversions Sparingly**
Implicit conversions silently turn one type into another, which makes code hard to follow. Scala 3 wants them written as a `given Conversion[A, B]` and warns about defining one unless `scala.language.implicitConversions` is imported.

---

## Examples

```scala
// Scala 2
trait Show[A] {
	def show(a: A): String
}

object Show {
	implicit val intShow: Show[Int] = new Show[Int] {
		def show(a: Int): String = s"Int($a)"
	}
}

def display[A](a: A)(implicit s: Show[A]): String = s.show(a)

// Context bound, the same thing with an unnamed parameter
def displayAll[A: Show](items: List[A]): String =
	items.map(a => implicitly[Show[A]].show(a)).mkString(", ")

object syntax {
	implicit class ShowOps[A](a: A) {
		def show(implicit s: Show[A]): String = s.show(a)
	}
}
import syntax._

display(42) // "Int(42)", the compiler passes Show.intShow
42.show     // "Int(42)"
```

```scala
// Scala 3, same Show trait as above
object Show {
	given intShow: Show[Int] = new Show[Int] {
		def show(a: Int): String = s"Int($a)"
	}
}

def display[A](a: A)(using s: Show[A]): String = s.show(a)

extension [A](a: A)(using s: Show[A]) {
	def show: String = s.show(a)
}

display(42)                     // "Int(42)"
display(42)(using Show.intShow) // passing it explicitly
42.show                         // "Int(42)"
```

---

### References

- [Scala Docs: Contextual Abstractions](https://docs.scala-lang.org/scala3/book/ca-contextual-abstractions-intro.html)
- [Scala Docs: Implicit Parameters (Scala 2)](https://docs.scala-lang.org/tour/implicit-parameters.html)
- [Scala 3 Reference: Relationship with Scala 2 Implicits](https://docs.scala-lang.org/scala3/reference/contextual/relationship-implicits.html)
