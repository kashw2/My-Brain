An **Abstract Class** is a [[Class]] that can't be instantiated directly and is designed to be [[Inheritance|inherited]] from. It sits between an [[Interface]] and a regular [[Class]], declaring abstract methods that subclasses must implement while also providing shared fields and implemented methods.

---

## Rationales

**When to use one**
Use an Abstract Class when several subclasses share real state or behaviour, not just a contract. `Animal` in [[Inheritance]] is a good fit, every animal has a `name` and the same `introduce()` method, only `speak()` differs.

**Abstract Class vs Interface**

| | Abstract Class | [[Interface]] |
|-|-|-|
| Holds state (fields) | Yes | No |
| Constructor | Yes | No |
| Implemented methods | Yes | Traditionally no |
| How many per class | One | Many |

**Template Method Pattern**
A common use is the **Template Method** [[Design Patterns|Design Pattern]], where the Abstract Class fixes the steps of an algorithm and subclasses fill in specific steps. `introduce()` calling the abstract `speak()` is a small example of it.

**Abstract Classes in Scala**
In [[Scala]], [[Trait|Traits]] can do almost everything an Abstract Class can. The main reasons to pick an Abstract Class are needing constructor parameters in Scala 2 (Scala 3 Traits can take them) or being called from [[Java]].

---

## Examples

```scala
abstract class Report(val title: String) {
	// Each report decides how to fetch its own rows
	protected def rows(): List[String]

	// The steps are fixed, only `rows` changes
	def render(): String =
		(s"# $title" :: rows()).mkString("\n")
}

class SalesReport extends Report("Sales") {
	protected def rows(): List[String] = List("Apples: 10", "Oranges: 4")
}

// new Report("Empty") won't compile, Report is abstract
```

```typescript
abstract class Report {
	constructor(public title: string) {}

	protected abstract rows(): string[];

	render(): string {
		return [`# ${this.title}`, ...this.rows()].join("\n");
	}
}

class SalesReport extends Report {
	constructor() {
		super("Sales");
	}

	protected rows(): string[] {
		return ["Apples: 10", "Oranges: 4"];
	}
}
```

---

## Hierarchy

![[Inheritance Hierarchy]]


### References

- [Scala Docs](https://docs.scala-lang.org/scala3/book/domain-modeling-tools.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Abstract_type)
