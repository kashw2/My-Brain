An Isomorphism is occurance of a bidirectional process of transformation between two objects or types

----

## Rationales

**Function**
A function or process is said to be **Isomorphic** if it facilitates a transformation to a new type where it is possible to perform the inverse action on the results while maintaining it's original identity.

**Types**
A type is Isomorphic is there exists a process between itself and another type to conduct a transformation where it is possible to do the inverse on the results. An example is between `List[Char]` and `String` as there exists a a process of going between the two types. Another such example is between `Int` and `BigInt` as you can freely do conversions between the two

---

## Example

```scala
object Isomorphism {
	val createList: String => List[Char] =  _.toList()
	val createString: List[Char] => String = _._
}
```

---

### References

- [Wikipedia](https://en.wikipedia.org/wiki/Isomorphism)
- [StackOverflow](https://stackoverflow.com/questions/57887988/monoid-homomorphism-and-isomorphism)