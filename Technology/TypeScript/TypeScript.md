TypeScript is a [[Static Typing|Statically Typed]] superset of [[JavaScript]] that compiles down to plain [[JavaScript]]. Its types only exist at compile time, they're erased before the code runs, so they catch mistakes early but can't be checked at runtime.

----

## Features

- [[Static Typing]] with strong type inference, any valid [[JavaScript]] is (almost) valid TypeScript
- Structural typing, a value fits a type if it has the right shape, see [[Interface|Interfaces]]
- [[Generics]] with constraints (`<A extends Fruit>`)
- Union and intersection types
- Discriminated unions with narrowing, TypeScript's take on [[Algebraic Data Types]]
- [[Class|Classes]], [[Abstract Class|Abstract Classes]] and [[Interface|Interfaces]]
- [[Access Modifiers]] (`public`, `protected`, `private`) that are compile time only, `#private` fields are enforced at runtime
- [[Method Overloading]] through overload signatures with a single implementation
- The `override` keyword for [[Method Overriding]]
- No [[Trait|Traits]], the mixin pattern fills that gap
- Mapped and conditional types, types computed from other types
- `strict` mode, turns on the checks that make it worth using (null checks, no implicit `any`)

## Examples

```typescript
// A discriminated union, `kind` tells TypeScript which shape it has
type Shape =
	| { kind: "circle"; radius: number }
	| { kind: "square"; side: number };

function area(shape: Shape): number {
	switch (shape.kind) {
		case "circle":
			return Math.PI * shape.radius ** 2; // shape is narrowed to the circle here
		case "square":
			return shape.side ** 2;
	}
}

// Generics with a constraint
function longest<A extends { length: number }>(a: A, b: A): A {
	return a.length >= b.length ? a : b;
}

longest("apple", "fig");    // "apple"
longest([1, 2], [1, 2, 3]); // [1, 2, 3]
```

### References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Wikipedia](https://en.wikipedia.org/wiki/TypeScript)
