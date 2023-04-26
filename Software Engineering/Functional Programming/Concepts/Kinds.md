Types can be organised into Kinds. Kinded Types, often refered to in practice as [Kind Polymorphism](https://docs.scala-lang.org/scala3/reference/other-new-features/kind-polymorphism.html), provide us a way to reason about types with an understanding of their abilities and purpose. Recognising Kinded Types as we work with increasingly complex systems give us the ability to group [[Types]] that follow patterns into other [[Types]], an easy and probably practical example could be:

```scala
case class Animal() {
	def eat(): Unit = {
		println("I'm hungry, I'll eat now");
	}
}

case class Human() {
	def eat(): Unit = {
		println("I'm hungry, I'll eat now");
	}
}
```

As we can see both these case classes contain the same 'pattern' with needing an `eat` method. Now consider the following

```scala
trait Living {
	def eat(): Unit;
}

case class Animal() extends Living {}
case class Human() extends Living {}
```

This is actually an example of [[Inheritance]] however shows how we can abstract out logic.

In complex systems we want to be able to perform an abstraction like this, however we'd like to do it at the type level allowing the developer to reason about their program using thought patterns that pertain to a Type instead of thought patterns and domain knowledge that exists in mere logical abstractions. 

In scenarios dealing with Kind Polymorphism there are two primary Kinds that matter:

1) **First Order Kinded Types**: This umbrella consists of any type that does not take a type parameter. All primatives (`Int`, `String`, `Char`, `Boolean` etc) fall under this however so to can a class with zero type parameters or [[Generics]].
2) **Higher Kinded Types**: These Types represent some of the highest level of abstraction in a type system, they power much of the [[TypeClass|TypeLevel]] stack through their abstraction over type constructors. Popular examples include [[Functor]], [[Applicative]], [[Monad]] and many more.

So with this in mind we can take our previous example and change it to something like:

```scala
trait Eater[A[_]] {
	def eat(): Unit;
}
trait Living[A] {}

case class Human() {}
case class Animal() {}


// Later on in code

def performOperationOnThingThatEats(thing: Eater[Living]): Unit {
	thing.eat()
}
```

Notice how doing this lifts the logic away from an inherited model that can create complexity when refactoring to meet needs of another similar class that doesn't fulfill the contract of the class we'd like to inherit from and instead allows us to forget about the contractual requirements that [[Inheritance]] can present and provide it at the type level.

### References

[Scala Docs](https://docs.scala-lang.org/scala3/reference/other-new-features/kind-polymorphism.html)
[TypeLevel Scala](https://typelevel.org/blog/2016/08/21/hkts-moving-forward.html)
[Rock The JVM](https://blog.rockthejvm.com/scala-types-kinds/)
[Haskell Wiki](https://downloads.haskell.org/~ghc/7.8.3/docs/html/users_guide/kind-polymorphism.html)