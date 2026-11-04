```mermaid
flowchart BT
    subgraph values ["Values: A"]
        Monoid --> Semigroup
    end

    subgraph single ["Type constructors: F[_]"]
        Apply --> Functor
        Apply --> Semigroupal
        Applicative --> Apply
        FlatMap --> Apply
        Monad --> FlatMap
        Monad --> Applicative
        CoflatMap --> Functor
        Comonad --> CoflatMap
        Bimonad --> Monad
        Bimonad --> Comonad
    end

    subgraph double ["Type constructors: F[_, _]"]
        Bifunctor
        Bifoldable
    end

    class Semigroup,Monoid,Functor,Apply,Applicative,FlatMap,Monad,Bimonad,Bifunctor,Bifoldable internal-link;
    classDef noNote stroke-dasharray: 5 5;
    class Semigroupal,CoflatMap,Comonad noNote;
```

Arrows point from a [[TypeClass]] to the one it extends, following the [Cats](https://typelevel.org/cats/typeclasses.html) hierarchy. Groups are the [[Kinds|Kind]] of type each one abstracts over. Click a box to open its note, dashed boxes don't have a note yet. [[Free Monad]] isn't on here because it's a data type, not a TypeClass, it gives any `F[_]` a [[Monad]].
