A **Higher Order Function** is a Function that either takes a Function as a parameter or returns one.

--- 

**Higher Order Functions** are extremely useful functions used in a variety of different ways in programming, they're rooted in [[Software Engineering/Functional Programming/Functional Programming|Functional Programming]] however are possible in many different paradigms. 

**Higher Order Functions** have two common occurances. As a Function that takes a function as a parameter, or as a Function that returns a Function, also known as [[Software Engineering/Functional Programming/Concepts/Function Currying|Function Currying]]

## Examples

```scala
object HigherOrderFunctions {

	def hof(thunk: () => Unit): Unit = ???;
	def hof2(fruit: String, thunk: (fruit: String) => Unit) = {
		return thunk(fruit);
	}

	def printFavouriteFruit(): Unit = {
		return this.hof2('Apple', Println);
		// Will Println `Apple`
	}

	def curriedFunction(fruit: String)(thunk: (fruit: String) => Unit): Unit = {
		return thunk(fruit);
		// If provided Println as a curried input and 'Apple' as the fruit, will Println 'Apple'
	}

}
```

---

### References
- [Scala Docs](https://docs.scala-lang.org/tour/higher-order-functions.html)