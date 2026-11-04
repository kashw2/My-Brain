A **Type** describes a set of possible values and what you're allowed to do with them. `Boolean` is the set `{true, false}`, `Int` is every 32-bit integer. A **type system** is the set of rules a language uses to give every expression a type and reject the ones that don't fit.

---

## Rationales

**Types as Sets**
Thinking of a type as the set of its values makes a lot of things click. `Unit` has exactly one value, `Nothing` has none. Combining types adds or multiplies their sizes, which is where [[Algebraic Data Types]] get their name, a `(Boolean, Boolean)` [[Product]] has 2 * 2 = 4 possible values.

**When Types are Checked**
With [[Static Typing]] the compiler checks types before the program runs. With dynamic typing values carry their type around at runtime and mistakes only show up when that code executes.

**Type Constructors**
`List` on its own isn't a type you can have a value of, `List[Int]` is. `List` is a **type constructor**, it takes a type and gives back a type. [[Generics]] let you write code that works for any type, and [[Kinds]] describe the "type of a type", which is what lets [[Functor]] and [[Monad]] abstract over type constructors themselves.

**Subtyping**
A type can be a subtype of another, so a `Dog` can be used wherever an `Animal` is expected ([[Inheritance]] and [[Polymorphism]]). In [[Scala]] every type sits under `Any`, which splits into `AnyVal` (`Int`, `Boolean` and friends) and `AnyRef` (every class), with `Nothing` at the bottom as a subtype of everything. That's why `throw` and `???` fit anywhere, their type is `Nothing`.

**Types as Design**
Good types make wrong code fail to compile. A `UserId` type stops you passing an email where an ID is wanted, and an `Option` forces you to handle the missing case. The more meaning you put in the types, the less you have to check at runtime.

**Nominal vs Structural**
Scala and [[Java]] are mostly **nominal**, two types only line up if they're declared to (by name or [[Inheritance]]). [[TypeScript]] is **structural**, any value with the right shape fits.

---

## Examples

```scala
// Nominal, the same shape isn't enough
case class Point(x: Int, y: Int)
case class Size(x: Int, y: Int)
// val p: Point = Size(1, 2) // Compile error, different types

// A type alias is just another name
type Email = String

// Scala 3 opaque type, a String at runtime but its own type to the compiler
object Ids {
	opaque type UserId = String
	object UserId {
		def apply(value: String): UserId = value
	}
}

// Scala 3 union type
def describe(x: Int | String): String = x match {
	case n: Int    => s"number $n"
	case s: String => s"text $s"
}

// ??? has type Nothing, so it fits any return type
def notDoneYet: Int = ???
```

```typescript
// Structural, the right shape is enough
type Point = { x: number; y: number };

const labelled = { x: 1, y: 2, label: "origin" };
const p: Point = labelled; // fine, it has an x and a y

function describe(x: number | string): string {
	return typeof x === "number" ? `number ${x}` : `text ${x}`;
}
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Type_system)
- [Scala 3 Book: A First Look at Types](https://docs.scala-lang.org/scala3/book/first-look-at-types.html)
- [Scala 3 Reference: Opaque Type Aliases](https://docs.scala-lang.org/scala3/reference/other-new-features/opaques.html)
