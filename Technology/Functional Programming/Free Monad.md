A [Free Monad](https://typelevel.org/cats/datatypes/freemonad.html) turns any type constructor into a [[Monad]] for free. It lets you write a program as a data structure describing *what* to do, then run it later with an **interpreter** that decides *how*.

---

## Rationales

**Programs as Data**
You define your operations as an [[Algebraic Data Types|ADT]] (the **algebra**), like `Put` and `Get` for a key-value store. `Free` wraps them so they can be chained with `flatMap` and [[For Comprehension|for comprehensions]]. Building the program runs nothing, it only produces a description of the steps.

**Interpreters**
An interpreter turns each operation into a real effect, using a **natural transformation** (`~>`), a function that converts `F[A]` to `G[A]` for every `A`. The same program can be run with a production interpreter that talks to a database and a test interpreter that uses an in-memory `Map`.

**Why it's Pure**
Since the program is only data until it's interpreted, everything up to the interpreter is [[Pure]]. Side effects are pushed to a single place at the edge of the program.

**Trade-offs**
Free Monads add boilerplate and some runtime overhead. Many Scala codebases now use **Tagless Final** instead, which gets the same separation of program and interpreter using [[TypeClass|TypeClasses]].

---

## Examples

```scala
import cats.{~>, Id}
import cats.free.Free
import scala.collection.mutable

// 1. The algebra
sealed trait KVStoreA[A]
case class Put(key: String, value: Int) extends KVStoreA[Unit]
case class Get(key: String) extends KVStoreA[Option[Int]]

type KVStore[A] = Free[KVStoreA, A]

def put(key: String, value: Int): KVStore[Unit] = Free.liftF(Put(key, value))
def get(key: String): KVStore[Option[Int]] = Free.liftF(Get(key))

// 2. The program, nothing runs yet
val program: KVStore[Option[Int]] = for {
	_      <- put("apples", 2)
	apples <- get("apples")
} yield apples

// 3. An interpreter
val inMemory: KVStoreA ~> Id = new (KVStoreA ~> Id) {
	val store = mutable.Map.empty[String, Int]

	def apply[A](op: KVStoreA[A]): Id[A] = op match {
		case Put(key, value) => store(key) = value
		case Get(key)        => store.get(key)
	}
}

// 4. Run it
program.foldMap(inMemory) // Some(2)
```

---

### References

[TypeLevel Scala](https://typelevel.org/cats/datatypes/freemonad.html)
[Haskell Wiki](https://wiki.haskell.org/Free_structure)
