A **Cuckoo Filter** is a probabilistic [[Data Structures|Data Structure]] that, like a [[Bloom Filter]], tells you a value definitely isn't in a set or might be. Unlike a Bloom Filter it can also delete values, because it stores small fingerprints of values in a hash table instead of setting shared bits.

---

## How it Works

**Fingerprints in Buckets**
The filter is a table of buckets, each with a few slots (usually 4). Adding a value stores a short fingerprint of it, say 8 bits, in one of two possible buckets. Checking a value just means looking for its fingerprint in those two buckets.

**Two Homes per Value**
The first bucket comes from hashing the value. The second is the first bucket XOR the hash of the fingerprint. The trick is that from a fingerprint and the bucket it's sitting in, you can always work out its other bucket without the original value, which is what lets fingerprints be moved around.

**Kicking Out the Cuckoo**
If both buckets are full, the new fingerprint takes a random slot and the one it pushed out moves to *its* other bucket, possibly pushing out another, like a cuckoo chick shoving eggs out of the nest. After a few hundred kicks without finding space the filter counts as full. With 4 slots per bucket that doesn't happen until it's about 95% full.

**Deleting**
Removing a value deletes one copy of its fingerprint from either of its buckets. A [[Bloom Filter]] can't do this, since each bit might be shared by several values. The catch is you should only delete values you actually added, otherwise you might delete a different value's matching fingerprint and cause a false negative.

**Cuckoo vs Bloom**

| | [[Bloom Filter]] | Cuckoo Filter |
| --- | --- | --- |
| Add | O(k), k hash functions, never fails | O(1) amortised, can fail when full |
| Check | O(k) | O(1), at most two buckets |
| Delete | Not possible | O(1) |
| False positives | Set by bits per value and k | About 2 × slots ÷ 2^fingerprint bits, ~3% for 4 slots and 8 bits |

Pick a Cuckoo Filter when you need deletes, or when you want a false positive rate under about 3%, where it also uses less space. Stick with a Bloom Filter when the set only ever grows and you never want an add to fail.

---

## Examples

```typescript
// Same hash as the Bloom Filter example, the seed turns one function into several
function hash(value: string, seed: number): number {
	let hash: number = 2166136261 ^ seed;
	for (let i = 0; i < value.length; i++) {
		hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
	}
	return hash >>> 0;
}

class CuckooFilter {
	private readonly buckets: number[][];
	private readonly slots: number = 4;
	private readonly mask: number;

	// bucketCount must be a power of two so the XOR trick always lands on a real bucket
	constructor(bucketCount: number) {
		this.buckets = Array.from({ length: bucketCount }, () => []);
		this.mask = bucketCount - 1;
	}

	// Doing this twice gets you back to the bucket you started in
	private other(index: number, fingerprint: number): number {
		return (index ^ hash(String(fingerprint), 2)) & this.mask;
	}

	// An 8 bit fingerprint (1 to 255) and the value's two buckets
	private locate(value: string): [number, number, number] {
		const fingerprint: number = (hash(value, 1) % 255) + 1;
		const first: number = hash(value, 0) & this.mask;
		return [fingerprint, first, this.other(first, fingerprint)];
	}

	add(value: string): boolean {
		let [fingerprint, index] = this.locate(value);
		for (let kick = 0; kick < 500; kick++) {
			for (const i of [index, this.other(index, fingerprint)]) {
				if (this.buckets[i].length < this.slots) {
					this.buckets[i].push(fingerprint);
					return true;
				}
			}
			// Both full: swap with a random resident, then find a home for that one instead
			const slot: number = Math.floor(Math.random() * this.slots);
			[fingerprint, this.buckets[index][slot]] = [this.buckets[index][slot], fingerprint];
			index = this.other(index, fingerprint);
		}
		return false; // Full. Real implementations stash the leftover fingerprint so it isn't lost
	}

	mightContain(value: string): boolean {
		const [fingerprint, first, second] = this.locate(value);
		return this.buckets[first].includes(fingerprint) || this.buckets[second].includes(fingerprint);
	}

	// Only remove values you know were added
	remove(value: string): boolean {
		const [fingerprint, first, second] = this.locate(value);
		for (const bucket of [this.buckets[first], this.buckets[second]]) {
			const slot: number = bucket.indexOf(fingerprint);
			if (slot !== -1) {
				bucket.splice(slot, 1);
				return true;
			}
		}
		return false;
	}
}

const userIds: CuckooFilter = new CuckooFilter(256);
userIds.add('user-123');
userIds.add('user-456');

console.log(userIds.mightContain('user-123')); // true
console.log(userIds.mightContain('user-999')); // false

userIds.remove('user-123');
console.log(userIds.mightContain('user-123')); // false, something a Bloom Filter can't do
```

---

### References

- [Redis: Cuckoo filter](https://redis.io/docs/latest/develop/data-types/probabilistic/cuckoo-filter/)
- [Fan et al.: Cuckoo Filter, Practically Better Than Bloom](https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf)
- [Wikipedia](https://en.wikipedia.org/wiki/Cuckoo_filter)
