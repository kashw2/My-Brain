**Design Patterns** are named, reusable solutions to problems that keep coming up when designing [[Object Orientated Programming|Object Orientated]] code. They aren't code you import, they're a shared vocabulary for a shape of solution built from [[Class|Classes]], [[Interface|Interfaces]] and [[Object|Objects]].

---

## Rationales

**The Gang of Four**
The 1994 book *Design Patterns: Elements of Reusable Object-Oriented Software* by Gamma, Helm, Johnson and Vlissides catalogued 23 patterns. Many of the pattern names people use today come from it.

**Three Groups**
1) **Creational** patterns are about how [[Object|Objects]] get made, e.g. Factory Method, Builder, Singleton.
2) **Structural** patterns are about how [[Object|Objects]] fit together, e.g. Adapter, Decorator, Composite.
3) **Behavioural** patterns are about how [[Object|Objects]] share responsibility and talk to each other, e.g. Strategy, Observer, Template Method.

**A Shared Vocabulary**
The biggest win is communication. "Wrap it in a Decorator" says in four words what would otherwise take a paragraph, and anyone who knows the pattern knows the trade-offs that come with it.

**Patterns I Already Use**
- **Template Method**, `Report.render()` in [[Abstract Class]] fixes the steps and lets subclasses fill one in.
- **Strategy**, `PaymentMethod` in [[Abstraction]] and `Movement` in [[Composition over Inheritance]] are swappable algorithms behind one [[Interface]].
- **Singleton**, a [[Scala]] `object` is a Singleton built into the language, see [[Object]].

**Patterns and Functional Programming**
A lot of patterns are workarounds for missing language features. Strategy is just passing a function ([[Higher Order Functions]]), Decorator is [[Function Composition]], and Visitor is [[Pattern Matching]] over an [[Algebraic Data Types|Algebraic Data Type]]. [[Functional Programming]] has its own patterns too, they're just called [[Functor]] and [[Monad]].

**Don't Force Them**
A pattern is worth it when the problem actually fits. Applying them everywhere "just in case" adds layers of indirection that make simple code hard to follow.

---

## Examples

```scala
// Strategy, the OOP way. Each strategy is an object behind a shared trait
trait Discount {
	def apply(total: BigDecimal): BigDecimal
}

class PercentOff(percent: Int) extends Discount {
	def apply(total: BigDecimal): BigDecimal = total * (100 - percent) / 100
}

def checkout(total: BigDecimal, discount: Discount): BigDecimal = discount(total)

checkout(100, new PercentOff(10)) // 90

// Strategy, the functional way. It's just a function
def checkoutWith(total: BigDecimal, discount: BigDecimal => BigDecimal): BigDecimal =
	discount(total)

checkoutWith(100, total => total - 5) // 95
```

```typescript
// Decorator, wraps a PaymentMethod and adds behaviour without changing it
interface PaymentMethod {
	pay(amount: number): void;
}

class CreditCard implements PaymentMethod {
	pay(amount: number): void {
		// Charge the card
	}
}

class LoggedPayment implements PaymentMethod {
	constructor(private inner: PaymentMethod) {}

	pay(amount: number): void {
		console.log(`Paying ${amount}`);
		this.inner.pay(amount);
	}
}

const method: PaymentMethod = new LoggedPayment(new CreditCard());
method.pay(50); // Logs "Paying 50", then charges the card
```

---

### References

- [Refactoring Guru](https://refactoring.guru/design-patterns)
- [Wikipedia](https://en.wikipedia.org/wiki/Software_design_pattern)
- [Wikipedia: Design Patterns (book)](https://en.wikipedia.org/wiki/Design_Patterns)
