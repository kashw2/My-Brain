**Abstraction** is hiding the details of how something works and exposing only what's needed to use it. In [[Object Orientated Programming]] the main tools for this are [[Interface|Interfaces]], [[Abstract Class|Abstract Classes]] and [[Trait|Traits]].

---

## Rationales

**Abstraction vs Encapsulation**
The two are often confused. [[Encapsulation (OOP)|Encapsulation]] is about *hiding data* inside an [[Object]]. Abstraction is about *hiding complexity*, letting the caller work with an idea ("something I can pay with") instead of a concrete implementation ("a credit card charged through a specific payment gateway").

**Depend on the Abstraction**
Code that depends on an abstraction works with any implementation of it. This is what lets you add a new payment method without touching the checkout, and swap a real implementation for a fake one in tests.

**Levels of Abstraction**
Abstraction isn't unique to OOP. [[Functional Programming]] takes it a level higher with [[TypeClass|TypeClasses]] and [[Kinds|Higher Kinded Types]], abstracting over types and type constructors rather than over [[Object|Objects]].

---

## Examples

```scala
trait PaymentMethod {
	def pay(amount: BigDecimal): Either[String, Unit]
}

class CreditCard(number: String) extends PaymentMethod {
	def pay(amount: BigDecimal): Either[String, Unit] = {
		// Talk to the card provider, handle retries, etc.
		Right(())
	}
}

class GiftCard(private var credit: BigDecimal) extends PaymentMethod {
	def pay(amount: BigDecimal): Either[String, Unit] =
		if (amount > credit) Left("Not enough credit")
		else {
			credit -= amount
			Right(())
		}
}

// The checkout doesn't know or care which PaymentMethod it was given
def checkout(total: BigDecimal, method: PaymentMethod): Either[String, Unit] =
	method.pay(total)
```

```typescript
interface PaymentMethod {
	pay(amount: number): void;
}

class CreditCard implements PaymentMethod {
	constructor(private number: string) {}

	pay(amount: number): void {
		// Talk to the card provider, handle retries, etc.
	}
}

function checkout(total: number, method: PaymentMethod): void {
	method.pay(total);
}
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Abstraction_(computer_science))
- [Scala Docs](https://docs.scala-lang.org/scala3/book/domain-modeling-oop.html)
