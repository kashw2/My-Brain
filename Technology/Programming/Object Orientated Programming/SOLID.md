**SOLID** is an acronym for five design principles for [[Object Orientated Programming|Object Orientated]] code: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation and Dependency Inversion. Robert C. Martin popularised the principles, the acronym itself came later from Michael Feathers.

---

## Rationales

**S, Single Responsibility**
A [[Class]] should have one reason to change. `BankAccount` should enforce balance rules, not also format statements and email them. When one [[Class]] does three jobs, a change to any of them risks breaking the other two.

**O, Open/Closed**
Code should be open for extension but closed for modification. Adding a `GiftCard` to the `PaymentMethod` example in [[Abstraction]] means writing a new [[Class]], `checkout` doesn't change. New behaviour comes from new code, not edits to code that already works.

**L, Liskov Substitution**
Anywhere a parent type is expected, a subtype has to work without surprises. The `Square` extending `Rectangle` problem from [[Inheritance]] is the classic violation, and it's why [[Method Overriding|overrides]] have to keep the parent's promises.

**I, Interface Segregation**
Many small [[Interface|Interfaces]] beat one big one, no [[Class]] should be forced to implement methods it doesn't need. The separate `Pet` and `Trained` [[Trait|Traits]] in [[Trait]] are this in practice, a goldfish can be a `Pet` without pretending to know tricks.

**D, Dependency Inversion**
High level code should depend on abstractions, not concrete classes. `checkout` takes a `PaymentMethod`, never a `CreditCard`, which is what lets a fake be passed in for tests.

**SOLID Outside OOP**
[[Functional Programming]] ends up in a similar place by a different road. Small [[Pure]] functions have a single responsibility, [[TypeClass|TypeClasses]] are open for extension (new instances without editing the TypeClass) and passing functions in as [[Higher Order Functions]] is dependency inversion.

---

## Examples

```scala
// I, small focused traits
trait PaymentMethod {
	def pay(amount: BigDecimal): Either[String, Unit]
}

trait Receipts {
	def send(email: String, amount: BigDecimal): Unit
}

// S and D, Checkout only coordinates, and depends on traits not concrete classes
class Checkout(receipts: Receipts) {
	def complete(total: BigDecimal, method: PaymentMethod, email: String): Either[String, Unit] =
		method.pay(total).map(_ => receipts.send(email, total))
}

// O, adding a GiftCard is a new PaymentMethod, Checkout doesn't change
```

```typescript
// L, the classic violation
class Rectangle {
	constructor(public width: number, public height: number) {}

	setWidth(width: number): void {
		this.width = width;
	}

	area(): number {
		return this.width * this.height;
	}
}

class Square extends Rectangle {
	constructor(side: number) {
		super(side, side);
	}

	// A square has to keep its sides equal, which breaks what Rectangle promised
	override setWidth(width: number): void {
		this.width = width;
		this.height = width;
	}
}

function stretch(rect: Rectangle): number {
	rect.setWidth(10);
	return rect.area(); // Expects 10 * the original height
}

stretch(new Rectangle(2, 5)); // 50
stretch(new Square(5));       // 100, surprise
```

---

### References

- [The Clean Code Blog: Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html)
- [Wikipedia](https://en.wikipedia.org/wiki/SOLID)
- [Wikipedia: Liskov Substitution Principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle)
