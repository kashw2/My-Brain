**A*** (A Star) is a pathfinding [[Algorithms|Algorithm]] that finds the shortest path from a start to a goal like [[Dijkstra]] does, but uses a heuristic, an estimate of the distance left to go, to search towards the goal instead of spreading out in every direction. It was published by Hart, Nilsson and Raphael in 1968.

---

## How it Works

**f = g + h**
For every node it tracks `g`, the real cost of getting there from the start, and `h`, the heuristic's estimate of the cost from there to the goal. It always expands the node with the lowest `f = g + h` next, so it prefers nodes that are both cheap to reach and look close to the goal. It's done as soon as the goal is the cheapest node waiting.

**The Heuristic**
The heuristic has to be **admissible**, meaning it never overestimates the real remaining cost, or A* can return a path that isn't the shortest. On a grid where you move in four directions use Manhattan distance, if diagonal moves are allowed use diagonal (octile) distance, and for free movement use straight line distance. If it's also **consistent** (the estimate never drops by more than the cost of the step you just took) no node ever needs processing twice.

**Compared to Dijkstra**
[[Dijkstra]] is just A* with `h` always 0. It only knows the cost of travel between nodes, so it spreads out evenly until it happens to reach the goal. A* needs to know something about *where* nodes are (coordinates on a map or grid) to make its estimate, but in return it explores far fewer nodes. If all you have is a graph of costs with no sense of position, like the one in the [[Dijkstra]] note, or you want the shortest path to every node rather than one goal, Dijkstra is the right tool. If you have a map and one destination, use A*.

**Cost**
In the worst case it's the same as Dijkstra, O((V + E) log V) with a binary heap as the priority queue, and a useless heuristic gets you exactly that. The bigger problem on huge maps is memory, since it holds on to every node it has seen.

**Where it Shows Up**
Games (units finding their way around a map), map routing, robotics and puzzle solvers.

---

## Examples

```typescript
type Point = [number, number]; // [x, y]

// 0 is open ground, 1 is a wall
const grid: number[][] = [
	[0, 0, 0, 0, 0],
	[1, 1, 1, 1, 0],
	[0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1],
	[0, 0, 0, 0, 0],
];

// Manhattan distance never overestimates when you can only move up, down, left and right
const heuristic = ([x1, y1]: Point, [x2, y2]: Point): number => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const neighbours = ([x, y]: Point): Point[] =>
	([[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]] as Point[]).filter(([nx, ny]) => grid[ny]?.[nx] === 0);

function aStar(start: Point, goal: Point): Point[] | null {
	const key = (p: Point): string => p.join(',');
	const g: Map<string, number> = new Map([[key(start), 0]]); // Real cost from the start
	const cameFrom: Map<string, Point> = new Map();
	const f = (p: Point): number => g.get(key(p))! + heuristic(p, goal); // Cost so far + estimate to go
	const open: Point[] = [start];

	while (open.length > 0) {
		open.sort((a, b) => f(a) - f(b)); // A real implementation would use a priority queue
		const current: Point = open.shift()!;
		if (key(current) === key(goal)) {
			const path: Point[] = [current];
			while (cameFrom.has(key(path[0]))) {
				path.unshift(cameFrom.get(key(path[0]))!);
			}
			return path;
		}
		for (const next of neighbours(current)) {
			const cost: number = g.get(key(current))! + 1; // Every step costs 1 on this grid
			if (cost < (g.get(key(next)) ?? Infinity)) {
				cameFrom.set(key(next), current);
				g.set(key(next), cost);
				if (!open.some(p => key(p) === key(next))) {
					open.push(next);
				}
			}
		}
	}
	return null; // The goal is walled off
}

console.log(aStar([0, 0], [4, 4])?.map(p => p.join(',')).join(' -> '));
// 0,0 -> 1,0 -> 2,0 -> 3,0 -> 4,0 -> 4,1 -> 4,2 -> 3,2 -> 2,2 -> 1,2 -> 0,2 -> 0,3 -> 0,4 -> 1,4 -> 2,4 -> 3,4 -> 4,4
```

Change `heuristic` to always return 0 and this becomes [[Dijkstra]]. This little maze only has one route so both check every open cell, but on an open 20 × 20 grid with one wall A* checked 175 cells to Dijkstra's 307.

---

### References

- [Red Blob Games: Introduction to A*](https://www.redblobgames.com/pathfinding/a-star/introduction.html)
- [Wikipedia](https://en.wikipedia.org/wiki/A*_search_algorithm)
