A **Trie** (or prefix tree) is a tree shaped [[Data Structures|Data Structure]] for storing strings, where each step down the tree is one character and words that share a prefix share the same path from the root. It's what makes autocomplete and "everything starting with..." lookups fast.

---

## How it Works

**Paths Spell Words**
The root is empty. Inserting `nix` walks (or creates) the child for `n`, then `i`, then `x`, and marks that last node as the end of a word. Inserting `nixos` later reuses the same `n → i → x` path and only adds the new tail. The end of word marker matters, it's how the trie knows `nix` is a word but `ni` is only a prefix.

**Cost Depends on Key Length, Not Size**
Lookups take as many steps as the key has characters, whether the trie holds ten words or ten million. A hash table is also fast for exact lookups, but it can't answer prefix queries without scanning every key.

| Operation | Cost (m = key length) |
| --- | --- |
| Insert | O(m) |
| Lookup | O(m) |
| Delete | O(m) |
| All words with a prefix | O(m) plus the size of everything under that prefix |

**Not Probabilistic**
It sits next to the [[Bloom Filter]] and [[Cuckoo Filter]] in my list, but a trie always gives exact answers, no false positives. The price is memory, every node holds its own map of children, so a trie of unrelated words can be much bigger than a plain list of them. A **radix tree** (Patricia trie) saves space by squashing chains of single-child nodes into one edge labelled with a whole substring.

**Where it Shows Up**
Autocomplete, spell checking and shell tab completion. IP [[Routing]] uses tries for longest prefix matching on addresses, the [[Linux]] [[Kernel]] keeps its IPv4 routing table in an LC-trie. [[Scala]]'s immutable `HashMap` and `HashSet` are tries too, over the bits of each key's hash rather than characters, which is how they stay fast while being immutable.

---

## Examples

```typescript
class TrieNode {
	children: Map<string, TrieNode> = new Map();
	isWord: boolean = false;
}

class Trie {
	private readonly root: TrieNode = new TrieNode();

	insert(word: string): void {
		let node: TrieNode = this.root;
		for (const char of word) {
			if (!node.children.has(char)) {
				node.children.set(char, new TrieNode());
			}
			node = node.children.get(char)!;
		}
		node.isWord = true;
	}

	// Walk down the path for a prefix, ending up undefined if any character is missing
	private find(prefix: string): TrieNode | undefined {
		let node: TrieNode | undefined = this.root;
		for (const char of prefix) {
			node = node?.children.get(char);
		}
		return node;
	}

	has(word: string): boolean {
		return this.find(word)?.isWord ?? false;
	}

	// Find the prefix node, then collect every word underneath it
	startingWith(prefix: string, node: TrieNode | undefined = this.find(prefix)): string[] {
		if (node === undefined) {
			return [];
		}
		const below: string[] = [...node.children].flatMap(([char, child]) => this.startingWith(prefix + char, child));
		return node.isWord ? [prefix, ...below] : below;
	}
}

const commands: Trie = new Trie();
['nix', 'nixos-rebuild', 'nix-shell', 'nmap', 'node'].forEach(word => commands.insert(word));

console.log(commands.has('nix')); // true
console.log(commands.has('ni')); // false, only a prefix
console.log(commands.startingWith('nix')); // [ 'nix', 'nixos-rebuild', 'nix-shell' ]
```

---

### References

- [Linux Kernel: LC-trie implementation notes](https://docs.kernel.org/networking/fib_trie.html)
- [Wikipedia: Trie](https://en.wikipedia.org/wiki/Trie)
- [Wikipedia: Radix tree](https://en.wikipedia.org/wiki/Radix_tree)
