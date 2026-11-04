**Static Typing** means the type of every expression is known and checked at compile time, before the program ever runs. **Static type analysis** is the compiler doing that check. [[Scala]], [[Java]], [[Haskell]] and [[TypeScript]] are statically typed, while [[JavaScript]] and [[PHP]] are **dynamically typed** and only find type problems at runtime.

---

## Rationales

**Catch Mistakes Early**
A whole class of bugs, calling a method that doesn't exist, passing a `String` where an `Int` is wanted, forgetting to handle a missing value, get found by the compiler instead of by a user in production. The earlier a bug is found the cheaper it is to fix.

**Types as Documentation**
A signature like `def findUser(id: UserId): Option[User]` tells you what it needs and that it might not find anything, and unlike a comment it can't go out of date. Types also power editor tooling: autocomplete, go to definition and renames you can trust across a whole codebase.

**Type Inference**
Static typing doesn't mean writing types everywhere. Scala infers local types, `val n = 1` is an `Int` without you saying so. You still write types on method parameters, and it's good practice on public return types.

**Encoding Rules in Types**
A richer type system lets you push more rules into the [[Types]] so the compiler enforces them for you. [[Algebraic Data Types]] make illegal states unrepresentable, [[Generics]] keep containers type-safe and [[Kinds|Higher Kinded Types]] let you abstract over things like [[Functor]] and [[Monad]].

**Trade-offs**
The compiler will reject some programs that would have run fine, and sometimes you fight the type checker to express something you know is correct. Compiles take longer. Escape hatches like `Any` and `asInstanceOf` in Scala or `any` in TypeScript exist, but they switch the checking off.

**Static vs Strong**
Static vs dynamic is about *when* types are checked. Strong vs weak is a separate, looser idea about how freely a language converts between types on its own. [[JavaScript]] is dynamic and weak (`"1" + 1` is `"11"`), Python is dynamic but stronger (`"1" + 1` is an error).

---

## Examples

```scala
def greet(name: String): String = s"Hello $name"

greet("Alex") // fine
// greet(42)  // Compile error, type mismatch

val n = 1 // inferred as Int
// n.toUpperCase // Compile error, Int has no toUpperCase

def findUser(id: Int): Option[String] = ???
// findUser(1).toUpperCase // Compile error, it's an Option, deal with None first
findUser(1).map(_.toUpperCase)
```

```typescript
function greet(name: string): string {
	return `Hello ${name.toUpperCase()}`;
}

greet("Alex");
// greet(42); // Compile error, number is not assignable to string
```

```javascript
function greet(name) {
	return `Hello ${name.toUpperCase()}`;
}

greet(42); // Runs, then throws a TypeError at runtime
```

[[TypeScript]] types are checked at compile time and then erased, so nothing checks them at runtime. Data coming in from outside (an API response, `JSON.parse`) still needs validating.

---

### References

- [Wikipedia: Type System](https://en.wikipedia.org/wiki/Type_system)
- [Scala 3 Book: Inferred Types](https://docs.scala-lang.org/scala3/book/types-inferred.html)
- [Scala 3 Book: Types and the Type System](https://docs.scala-lang.org/scala3/book/types-introduction.html)
