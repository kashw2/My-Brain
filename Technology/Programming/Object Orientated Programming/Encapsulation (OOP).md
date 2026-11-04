**Encapsulation** is the bundling of data with the methods that operate on it, while restricting direct access to that data from outside the [[Object]]. Not to be confused with [[Encapsulation]] in [[Networking]].

---

## Rationales

**Information Hiding**
An [[Object]] should expose *what* it can do, not *how* it does it. Its internal state is hidden behind [[Access Modifiers]] (`private`, `protected`) so it can only be changed through the [[Object|Object's]] own methods.

**Invariants**
Because only the [[Object]] can change its own state, it can guarantee that state is always valid. A `BankAccount` that only allows changes through `deposit` and `withdraw` can make sure the balance never goes negative. If `balance` were public, anything could set it to `-100`.

**Freedom to Refactor**
As long as the public methods behave the same, the internals can change without breaking anything that uses the [[Class]].

---

## Examples

```scala
class BankAccount(private var balance: BigDecimal) {

	def deposit(amount: BigDecimal): Unit = {
		require(amount > 0, "Deposit must be positive")
		balance += amount
	}

	def withdraw(amount: BigDecimal): Either[String, BigDecimal] =
		if (amount > balance) Left("Insufficient funds")
		else {
			balance -= amount
			Right(balance)
		}

	def currentBalance: BigDecimal = balance
}
```

```typescript
class BankAccount {
	// `#` fields are private at runtime, `private` is only checked by the compiler
	#balance: number;

	constructor(openingBalance: number) {
		this.#balance = openingBalance;
	}

	deposit(amount: number): void {
		if (amount <= 0) throw new Error("Deposit must be positive");
		this.#balance += amount;
	}

	withdraw(amount: number): number {
		if (amount > this.#balance) throw new Error("Insufficient funds");
		this.#balance -= amount;
		return this.#balance;
	}

	get balance(): number {
		return this.#balance;
	}
}
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming))
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/classes.html)
