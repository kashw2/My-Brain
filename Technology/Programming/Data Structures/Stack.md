A **Stack** is a [[Data Structures|Data Structure]] where the last value put in is the first one taken out (LIFO, last in first out), like a stack of plates. You only ever touch the top.

---

## How it Works

**Push, Pop, Peek**
`push` puts a value on top, `pop` takes the top value off and returns it, and `peek` looks at the top without removing it. That's basically the whole interface, and all three are O(1). Searching or getting a value by position isn't what a stack is for.

| Operation | Cost |
| --- | --- |
| Push | O(1), amortised if backed by an array |
| Pop | O(1) |
| Peek | O(1) |
| Search | O(n) |

**Built on a LinkedList or an Array**
A [[LinkedList]] makes a natural stack, the head is the top and adding or removing at the head is O(1). A dynamic array ([[Vector]]) works too, using the end as the top, and is friendlier to the CPU cache. In [[Scala]] an immutable `List` already is a stack: `::` pushes, `head` peeks and `tail` pops, and thanks to [[Immutability]] the old stack is still there after a pop.

**The Call Stack**
Every function call pushes a frame (its arguments and local variables) onto the call stack, and returning pops it. Recurse too deeply and you run out of room, which is the `StackOverflowError` on the [[Java Virtual Machine|JVM]]. The Scala compiler turns self-recursive tail calls into a loop so they don't grow the stack, and `@tailrec` makes it a compile error if it can't.

**Where it Shows Up**
Undo history, the browser back button, matching brackets in a parser, evaluating expressions, depth-first search and backtracking. Whenever the most recent thing is the next thing to deal with, it's a stack. If you need the oldest thing first, you want a queue instead.

---

## Examples

```typescript
// A TypeScript array already works as a stack with push and pop
function isBalanced(input: string): boolean {
	const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
	const stack: string[] = [];
	for (const char of input) {
		if ('([{'.includes(char)) {
			stack.push(char); // Opening bracket goes on top
		} else if (char in pairs && stack.pop() !== pairs[char]) {
			return false; // The top didn't match this closing bracket
		}
	}
	return stack.length === 0; // Anything left over was never closed
}

console.log(isBalanced('{ a: [1, (2 + 3)] }')); // true
console.log(isBalanced('{ a: [1, (2 + 3]) }')); // false
```

```scala
// An immutable stack as an Algebraic Data Type
sealed trait Stack[+A] {
	def push[B >: A](value: B): Stack[B] = NonEmpty(value, this)

	def pop: Option[(A, Stack[A])] = this match {
		case NonEmpty(top, rest) => Some((top, rest))
		case Empty => None
	}
}
case object Empty extends Stack[Nothing]
final case class NonEmpty[+A](top: A, rest: Stack[A]) extends Stack[A]

val stack: Stack[String] = Empty.push("a").push("b")
stack.pop // Some((b,NonEmpty(a,Empty)))
Empty.pop // None
```

The Scala version uses [[Algebraic Data Types]] and [[Pattern Matching]], and every `push` returns a new stack rather than changing the old one.

---

### References

- [Scala API: mutable.Stack](https://www.scala-lang.org/api/current/scala/collection/mutable/Stack.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
