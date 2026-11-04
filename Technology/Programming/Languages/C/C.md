C is a compiled, [[Static Typing|Statically Typed]], procedural Programming Language that sits just above assembly. It was created at Bell Labs alongside [[Unix]], and it's still what most [[Operating Systems]] and a lot of core infrastructure are written in, including the [[Linux]] [[Kernel]] and [[PostgreSQL]].

----

## Features

- Compiles straight to machine code with a tiny runtime, which is why it's fast and runs almost anywhere
- Manual memory management with `malloc` and `free`, no garbage collector
- Pointers and pointer arithmetic, direct access to memory addresses
- [[Static Typing]], but weakly typed, values are implicitly converted and anything can be cast
- Structs and unions for grouping data, no [[Class|Classes]] or built in [[Object Orientated Programming|OOP]]
- The preprocessor (`#include`, `#define`, macros)
- Undefined behaviour, reading past the end of an array or using freed memory isn't an error, it's just wrong

## Examples

```c
#include <stdio.h>
#include <stdlib.h>

// A struct groups data, but there are no methods
struct Fruit {
	const char *name;
	int ripeness;
};

// Behaviour is just functions that take a pointer to the data
void ripen(struct Fruit *fruit) {
	fruit->ripeness += 1;
}

int main(void) {
	// Memory is managed by hand, every malloc needs a free
	struct Fruit *apple = malloc(sizeof(struct Fruit));
	if (apple == NULL) return 1;

	apple->name = "Apple";
	apple->ripeness = 0;
	ripen(apple);

	printf("%s ripeness: %d\n", apple->name, apple->ripeness); // Apple ripeness: 1

	free(apple);
	return 0;
}
```

### References

- [C Reference (cppreference)](https://en.cppreference.com/w/c)
- [ISO C Working Group (WG14)](https://www.open-std.org/jtc1/sc22/wg14/)
- [Wikipedia](https://en.wikipedia.org/wiki/C_(programming_language))
