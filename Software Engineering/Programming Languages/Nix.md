The **Nix** Programming Language is a [[Software Engineering/Functional Programming/Functional Programming|Functional Programming]] language used by the [[Operating Systems/Linux/Package Manager|Nix Package Manager]] and [[Operating Systems/Linux/Distributions/NixOS/NixOS|NixOS]].

---

## Syntax

### attribute set
The `{}` keyword is used to define an attribute set. It's Syntax is as follows
```nix
{
	a = "a";
	b = "b";
}
```

### rec
The `rec` keyword is used to define a recursive set. It's Syntax is as follows
```nix
rec {
	a = "a";
	b = "b";
}
```