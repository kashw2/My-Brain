The **Nix** Programming Language is a [[Software Engineering/Functional Programming/Functional Programming|Functional Programming]] language used by the [[Operating Systems/Linux/Package Manager|Nix Package Manager]] and [[Operating Systems/Linux/Distributions/NixOS/NixOS|NixOS]].

---

## Syntax

### attribute set
The [`{}`](https://nix.dev/tutorials/first-steps/nix-language#attribute-set) keyword is used to define an attribute set. It's Syntax is as follows
```nix
{
	a = "a";
	b = "b";
}
```

### rec
The [`rec`](https://nix.dev/tutorials/first-steps/nix-language#recursive-attribute-set-rec)keyword is used to define a recursive set. It's Syntax is as follows
```nix
rec {
	a = "a";
	b = "b";
	c = a + b;
}
```

### let ... in ...
Also known as a 'let expression' or 'let binding'. The [`let`](https://nix.dev/tutorials/first-steps/nix-language#attribute-set) keyword allows assignment of names to values for repeated use in an [`in`](https://nix.dev/tutorials/first-steps/nix-language#attribute-set) block. It's Syntax is as follows
```nix
let 
	a = 1;
	b = 2;
in
	a + b
# Yields 3
```

### attribute access
Attributes can be accessed by calling the assignment followed by the name of the attribute within. For example:

```nix
let a = { x = 1; y = 2; z = 3;};
in a.x + a.y + a.z
# Yields 6
```

Furthermore the following syntax is also valid with an attribute set inside of an attribute set.

```nix
let a = { b = { c = 1; d = { e = 1;};};};
in a.b.c + a.b.d.e
# Yields 2
```