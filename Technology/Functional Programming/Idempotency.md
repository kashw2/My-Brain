An operation is **Idempotent** if applying it more than once has the same result as applying it once. For a function, `f(f(x)) == f(x)`.

---

## Rationales

**Functions**
`abs`, `toUpperCase`, `distinct` and `sorted` are all Idempotent. Once a list is sorted, sorting it again changes nothing.

**Systems**
For systems the idea is the same but applied to effects, doing something twice leaves the world in the same state as doing it once. HTTP `PUT` and `DELETE` are meant to be Idempotent, `POST` isn't. This is what makes retries safe, if a request times out and you don't know whether it worked, an Idempotent request can just be sent again.

**Declarative Config**
Declarative tools are built around Idempotency. Running [[nixos-rebuild]] `switch` with the same config twice changes nothing the second time, it describes *what* the system should be, not *steps* to get there.

**Idempotent is not Pure**
An Idempotent operation can have side effects, `DELETE /users/1` changes the database. A [[Pure]] function can be non-Idempotent, `x => x + 1` gives a new result every time it's reapplied.

---

## Examples

```scala
val f: String => String = _.toUpperCase

f("hello") == f(f("hello")) // true, both are "HELLO"

val g: Int => Int = _ + 1
g(1) == g(g(1)) // false, 2 vs 3
```

```typescript
// Idempotent, setting a value twice gives the same state
function setEmail(user: User, email: string): User {
	return { ...user, email };
}

// Not Idempotent, every call adds another item
function addItem(cart: string[], item: string): string[] {
	return [...cart, item];
}
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Idempotence)
- [MDN: Idempotent HTTP Methods](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent)
