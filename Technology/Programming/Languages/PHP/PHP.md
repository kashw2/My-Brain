PHP is a dynamically typed, interpreted, general purpose scripting language built for the web. It has full [[Class]] based [[Object Orientated Programming|OOP]] and an optional type system that's checked at runtime.

----

## Features

- Gradual typing, parameter, return and property types are optional and checked at runtime
- `declare(strict_types=1)` turns off automatic coercion of scalars (so `"5"` won't quietly become `5`)
- Union types and nullable types (`?string`)
- Single [[Inheritance]], [[Interface|Interfaces]], [[Abstract Class|Abstract Classes]] and [[Trait|Traits]]
- [[Access Modifiers]] including asymmetric visibility, readable publicly but only writable inside the [[Class]]
- `readonly` properties for [[Immutability]]
- Constructor property promotion, declare and assign fields straight from the constructor
- Enums, including backed enums with a `string` or `int` value
- `match` expressions, a stricter `switch` that returns a value
- No [[Method Overloading]], declaring a method twice is a fatal error
- No native [[Generics]]

## Examples

```php
<?php

declare(strict_types=1);

enum Ripeness: string
{
	case Green = 'green';
	case Ripe = 'ripe';
	case Rotten = 'rotten';
}

final class Fruit
{
	// Constructor property promotion, declares and assigns the fields in one go
	public function __construct(
		public readonly string $name,
		private Ripeness $ripeness = Ripeness::Green,
	) {}

	public function canEat(): bool
	{
		return match ($this->ripeness) {
			Ripeness::Ripe => true,
			Ripeness::Green, Ripeness::Rotten => false,
		};
	}
}

$apple = new Fruit('Apple');
$apple->canEat();      // false
$apple->name = 'Pear'; // Error, name is readonly
```

### References

- [PHP Manual](https://www.php.net/manual/en/)
- [PHP The Right Way](https://phptherightway.com/)
- [Wikipedia](https://en.wikipedia.org/wiki/PHP)
