JavaScript is a dynamically typed, multi-paradigm Programming Language and the scripting language built into every web browser. Through runtimes like Node.js it's also a common choice on the server, and it's a compile target for languages like [[TypeScript]] and [[Scala]].

----

## Features

- Dynamic typing, types are checked at runtime not compile time. Adding [[Static Typing]] on top is the whole point of [[TypeScript]]
- Prototype based [[Inheritance]], the `class` keyword is syntax sugar over prototypes
- First class functions, so [[Higher Order Functions]] like `map`, `filter` and `reduce` are everyday tools
- Closures, a function keeps access to the variables in scope where it was created
- Single threaded event loop, async work is handled with callbacks, Promises and `async` / `await`
- Standardised as ECMAScript
- Runs in the browser and on the server (Node.js, Deno, Bun)
- npm as the main [[Package Manager]]
- Compile target for [[TypeScript]] and for [[Scala]] via Scala.js

## Examples

```javascript
// Functions are values, so Higher Order Functions are everywhere
const fruits = ["Apple", "Banana", "Orange"];
fruits.map(fruit => fruit.toUpperCase()); // ["APPLE", "BANANA", "ORANGE"]

// Closures, `count` lives on after makeCounter returns
function makeCounter() {
	let count = 0;
	return () => ++count;
}

const next = makeCounter();
next(); // 1
next(); // 2

// Dynamic typing means surprises nothing catches before runtime
"5" + 1; // "51"
"5" - 1; // 4

// async / await on top of Promises
async function getFruit(id) {
	const response = await fetch(`/api/fruit/${id}`);
	return response.json();
}
```

### References

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [ECMAScript Specification](https://tc39.es/ecma262/)
- [Wikipedia](https://en.wikipedia.org/wiki/JavaScript)
