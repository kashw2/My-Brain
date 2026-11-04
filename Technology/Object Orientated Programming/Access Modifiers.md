**Access Modifiers** are keywords that control which code can see and use a [[Class|Class's]] fields and methods. They're the tool [[Encapsulation (OOP)|Encapsulation]] is built on.

---

## Rationales

**The Usual Three**
`public` means anything can use it. `protected` means the [[Class]] and its subclasses. `private` means only the [[Class]] itself. Most languages share these, but the defaults and edge cases differ.

**Default to Private**
Every public member is a promise. Once other code depends on it, changing it means changing that code too. Starting private and only opening up what's needed keeps the [[Class]] free to refactor, which is the whole point of [[Encapsulation (OOP)|Encapsulation]].

**Protected is Still a Leak**
`protected` members are part of the contract with every subclass, and any subclass can use them to break the parent's invariants. It's one of the reasons deep [[Inheritance]] trees get fragile, see [[Composition over Inheritance]].

**Private is per Class, not per Object**
In [[Scala]], [[Java]], [[TypeScript]] and [[PHP]], one instance can read another instance's private fields as long as they're the same [[Class]]. That's what makes methods like `equals(other)` possible without a getter.

**Every Language Does it a Bit Differently**

| | Default | Notable extras |
|-|-|-|
| [[Scala]] | public (no keyword) | `private[pkg]` scopes access to a package |
| [[Java]] | package-private | `protected` also opens up to the same package |
| [[TypeScript]] | public | Checked at compile time only, `#field` is private at runtime |
| [[PHP]] | public | Asymmetric visibility (`public private(set)`) since PHP 8.4 |

---

## Examples

```scala
package bank

class BankAccount(private var balance: BigDecimal) {
	// Visible to anything in the `bank` package
	private[bank] def audit(): String = s"Balance: $balance"

	// Visible to this class and subclasses
	protected def fee: BigDecimal = 0

	// Public by default
	def currentBalance: BigDecimal = balance

	// `private` is per class, so one account can read another's balance
	def hasMoreThan(other: BankAccount): Boolean = balance > other.balance
}
```

```typescript
class BankAccount {
	#balance: number; // Private at runtime
	private auditLog: string[] = []; // Private, but only the compiler checks it

	constructor(openingBalance: number) {
		this.#balance = openingBalance;
	}

	get balance(): number {
		return this.#balance;
	}
}

const account = new BankAccount(100);
account.auditLog;          // Compile error
(account as any).auditLog; // Works, `private` is gone at runtime
```

```php
class BankAccount
{
	// Anyone can read it, only this class can change it
	public private(set) int $balance;

	public function __construct(int $openingBalance)
	{
		$this->balance = $openingBalance;
	}
}

$account = new BankAccount(100);
echo $account->balance;   // 100
$account->balance = -100; // Error, balance is private(set)
```

---

### References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/classes.html#member-visibility)
- [PHP Docs](https://www.php.net/manual/en/language.oop5.visibility.php)
- [Wikipedia](https://en.wikipedia.org/wiki/Access_modifiers)
