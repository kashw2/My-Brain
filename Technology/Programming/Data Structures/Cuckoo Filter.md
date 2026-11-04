A **Cuckoo Filter** is a probabilistic [[Data Structures|Data Structure]] that, like a [[Bloom Filter]], tells you a value definitely isn't in a set or might be. Unlike a Bloom Filter it can also delete values, because it stores small fingerprints of values in a hash table instead of setting shared bits.

---

## How it Works

**Fingerprints in Buckets**
The filter is a table of buckets, each with a few slots (usually 4). Adding a value stores a short fingerprint of it (say 8 bits) in one of two buckets: the first comes from hashing the value, the second is the first XOR the hash of the fingerprint. That XOR trick means you can always work out a fingerprint's other bucket from the fingerprint and the bucket it's in, without the original value, which is what lets fingerprints be moved around. Checking a value just means looking for its fingerprint in its two buckets.

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
// The same hash as the Bloom Filter example, squashed onto one line
const hash = (value: string, seed: number): number =>
	value.split('').reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261 ^ seed) >>> 0;

class CuckooFilter {
	private readonly buckets: number[][]; // Each bucket holds up to 4 fingerprints
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
				if (this.buckets[i].length < 4) {
					this.buckets[i].push(fingerprint);
					return true;
				}
			}
			// Both full: swap with a random resident, then find a home for that one instead
			const slot: number = Math.floor(Math.random() * 4);
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
		const bucket: number[] | undefined = [this.buckets[first], this.buckets[second]].find(b => b.includes(fingerprint));
		bucket?.splice(bucket.indexOf(fingerprint), 1);
		return bucket !== undefined;
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
