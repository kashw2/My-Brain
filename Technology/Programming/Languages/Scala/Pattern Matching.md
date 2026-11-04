**Pattern Matching** checks a value against a list of patterns and runs the first case that fits, pulling the matched pieces out into names as it goes. In [[Scala]] it's written with `match` and is the main way to take apart [[Algebraic Data Types]].

---

## Rationales

**A Much Better Switch**
`match` can do what a `switch` does with constants, but it can also match on types, the shape of case classes, tuples and lists, add `if` guards, and bind the parts it matched to names. It's an expression, so the whole match returns a value.

**Destructuring**
Case classes come with an `unapply` method, so `case Circle(r)` both checks the value is a `Circle` and pulls out its radius. Patterns nest, `case Some(User(name, _))` digs two levels deep in one line.

**Exhaustiveness**
When the type being matched is `sealed` (or a Scala 3 `enum`) the compiler knows every possible case and warns if a match misses one. That's what makes [[Algebraic Data Types]] so safe to change, add a new case and the compiler points at every match that needs updating. A match that does miss a case throws a `MatchError` at runtime.

**Extractors**
You can write your own patterns by defining `unapply` on an [[Object]]. It returns an `Option` of the pieces, and `None` means no match. Handy for matching on things that aren't case classes, like parsing a `String`.

**Type Erasure**
On the [[Java Virtual Machine|JVM]] generic type arguments are erased at runtime, so `case xs: List[Int]` can only check that it's a `List`, not what's in it. The compiler warns when a pattern can't really be checked.

---

## Examples

```scala
sealed trait Shape
case class Circle(radius: Double) extends Shape
case class Rectangle(width: Double, height: Double) extends Shape

// Exhaustive, leave out a case and the compiler warns
def area(shape: Shape): Double = shape match {
	case Circle(r)       => math.Pi * r * r
	case Rectangle(w, h) => w * h
}

def describe(x: Any): String = x match {
	case 0                  => "zero"
	case n: Int if n < 0    => "a negative number"
	case n: Int             => s"the number $n"
	case "hello" | "hi"     => "a greeting"
	case (a, b)             => s"a pair of $a and $b"
	case head :: _          => s"a list starting with $head"
	case c @ Circle(_)      => s"a circle, $c"
	case _                  => "something else"
}

// A custom extractor
object Email {
	def unapply(s: String): Option[(String, String)] = s.split("@") match {
		case Array(user, domain) => Some((user, domain))
		case _                   => None
	}
}

"alex@example.com" match {
	case Email(user, domain) => s"$user at $domain"
	case _                   => "not an email"
}

// Patterns also work in vals and partial functions
val (name, age) = ("Alex", 30)
List(Circle(1), Rectangle(2, 3)).collect { case Rectangle(w, h) => w * h } // List(6.0)
```

[[TypeScript]] has no `match`, the closest thing is a `switch` on a discriminated union (see [[Algebraic Data Types]]), with a `never` check in the `default` case to get exhaustiveness.

---

### References

- [Scala Docs](https://docs.scala-lang.org/tour/pattern-matching.html)
- [Scala Docs: Extractor Objects](https://docs.scala-lang.org/tour/extractor-objects.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Pattern_matching)
