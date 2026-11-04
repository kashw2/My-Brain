**Algebraic Data Types** (ADTs) are types built by combining other types in two ways: **[[Product]] Types** (*and*, all values at once) and **Sum Types** (*or*, exactly one of several options).

---

## Rationales

**Sum Types**
A Sum Type is one of a fixed set of cases. A `PaymentMethod` is a `Card` **or** `Cash` **or** a `GiftCard`. The number of possible values *adds up*, `Either[Boolean, Boolean]` has 2 + 2 = 4.

**Product Types**
A [[Product]] Type holds several values together. A `Card` has a `number` **and** an `expiry`. The number of possible values *multiplies*.

**Pattern Matching**
ADTs are taken apart with [[Pattern Matching]]. Because a Sum Type's cases are fixed (`sealed`), the compiler warns if a match misses one. Adding a new case points you at every place that needs to handle it.

**Make Illegal States Unrepresentable**
Modelling data as ADTs means invalid combinations can't be built. Instead of a `status: String` and an optional `error` field that might not agree, a `Result` is either a `Success(value)` or a `Failure(error)`, never both.

**They're Everywhere**
`Option` (`Some` or `None`), `Either` (`Left` or `Right`) and `List` (`::` or `Nil`) are all ADTs.

---

## Examples

```scala
// Scala 3 enum
enum PaymentMethod {
	case Card(number: String, expiry: String)
	case Cash
	case GiftCard(code: String, balance: BigDecimal)
}

def describe(method: PaymentMethod): String = method match {
	case PaymentMethod.Card(number, _)      => s"Card ending ${number.takeRight(4)}"
	case PaymentMethod.Cash                 => "Cash"
	case PaymentMethod.GiftCard(_, balance) => s"Gift card with $balance left"
}

// Scala 2, a sealed trait does the same job
sealed trait Shape
case class Circle(radius: Double) extends Shape
case class Rectangle(width: Double, height: Double) extends Shape
```

```typescript
// Discriminated union
type PaymentMethod =
	| { kind: "card"; number: string; expiry: string }
	| { kind: "cash" }
	| { kind: "giftCard"; code: string; balance: number };

function describe(method: PaymentMethod): string {
	switch (method.kind) {
		case "card":
			return `Card ending ${method.number.slice(-4)}`;
		case "cash":
			return "Cash";
		case "giftCard":
			return `Gift card with ${method.balance} left`;
	}
}
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Algebraic_data_type)
- [Scala Docs](https://docs.scala-lang.org/scala3/book/types-adts-gadts.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
