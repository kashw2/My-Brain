Haskell is a compiled, [[Static Typing|Statically Typed]], purely [[Functional Programming|Functional]] Programming Language with [[Lazy]] evaluation by default. A lot of the [[Functional Programming]] ideas used in [[Scala]], like [[TypeClass|TypeClasses]], [[Functor]] and [[Monad]], trace back to Haskell, which is why so many references in these notes point at the Haskell Wiki.

----

## Features

- [[Pure|Purity]], side effects are tracked in the type system with `IO` rather than happening anywhere
- [[Lazy|Lazy Evaluation]], nothing is computed until it's needed, which makes infinite lists possible
- [[Static Typing]] with type inference, most type signatures are optional (but good practice)
- [[Immutability]] everywhere, there's no reassignment
- [[TypeClass|TypeClasses]], declared with `class` and implemented with `instance`
- [[Kinds|Higher Kinded Types]]
- [[Algebraic Data Types]] and [[Pattern Matching]]
- [[Function Currying|Automatic Currying]], every function takes exactly one argument
- [[Function Composition]] with the `.` operator
- `do` notation, sequences [[Monad]] steps one after another
- [[Functor]], [[Applicative]] and [[Monad]] are part of the standard Prelude

## Examples

```haskell
data Fruit = Apple | Banana | Orange
	deriving (Show, Eq)

-- Pattern Matching on an Algebraic Data Type
isCitrus :: Fruit -> Bool
isCitrus Orange = True
isCitrus _      = False

-- Every function is curried, `add 1` is a new function waiting for one more Int
add :: Int -> Int -> Int
add a b = a + b

increment :: Int -> Int
increment = add 1

-- Side effects only happen inside IO, `do` sequences them
main :: IO ()
main = do
	print (filter isCitrus [Apple, Banana, Orange]) -- [Orange]
	print (map increment [1, 2, 3])                 -- [2,3,4]
```

### References

- [Haskell Documentation](https://www.haskell.org/documentation/)
- [Wikipedia](https://en.wikipedia.org/wiki/Haskell)
