Dijkstra is an [[Algorithms|Algorithm]] used to find the shortest path between point **A** and point **B**. It's heavily used in Networking and also has use cases in general path based distance calculations.

Dijkstra works off of a 'cost of travel' model. It assumes that it is the cost of travel between nodes that is known, not the location of the specific node itself. For example it assumes to know that travel between point A and point B may have a cost of 8 where as a cost between point A and point C may have a cost of 3 as opposed of knowing that A's position is 0, 0; B's 1, 8; C's 3, 9 etc. This means that no location calculation's are required when implementing it.

![[Dijkstra Graph]]

In the above. Dijkstra would be used to calculate the path with the least distance between A and F. To do this we do the following:

1) Create a Graph (This is just a fancy way of saying model for our nodes and their distances).

```typescript
let graph: object = {
  'A': {'B': 1, 'C': 2},
  'B': {'D': 3},
  'C': {'D': 5, 'E': 1, 'F': 3},
  'D': {'F': 4},
  'E': {'F': 10}
};
```

2) Create a function that is able to find and return the object with the least distance.

```typescript
function findSmallestDistance(nodes: object): object {
  const nodeNames: string[] = Object.keys(nodes);
  let distance: number = 999;
  let bestNode: object = {};
  for (let nodeIndex in nodeNames) {
    if (distance > nodes[nodeNames[nodeIndex]]) {
      distance = nodes[nodeNames[nodeIndex]];
      delete bestNode[nodeNames[nodeIndex - 1]];
      bestNode[nodeNames[nodeIndex]] = distance;
    }
  }
  return bestNode;
}
```

3) Create our main function that puts it all together and returns an object with the path to take and it's relative distance.

```typescript
function dijkstra(graph: object): object {
  const nodeNames: string[] = Object.keys(graph);
  let visitedNodes: Record<string, any> = {};
  for (let nodeIndex in nodeNames) {
    visitedNodes[nodeNames[nodeIndex]] = findSmallestDistance(graph[nodeNames[nodeIndex]]);
  }
  return visitedNodes;
}
```

With this, you should be able to `console.log(dijkstra(graph))` and get the following output `{ A: { B: 1 }, B: { D: 3 }, C: { E: 1 }, D: { F: 4 }, E: { F: 10 } }`

## Examples

```typescript
let graph: object = {
  'A': {'B': 1, 'C': 2},
  'B': {'D': 3},
  'C': {'D': 5, 'E': 1, 'F': 3},
  'D': {'F': 4},
  'E': {'F': 10}
};

function dijkstra(graph: object): object {
  const nodeNames: string[] = Object.keys(graph);
  let visitedNodes: Record<string, any> = {};
  for (let nodeIndex in nodeNames) {
    visitedNodes[nodeNames[nodeIndex]] = findSmallestDistance(graph[nodeNames[nodeIndex]]);
  }
  return visitedNodes;
}

function findSmallestDistance(nodes: object): object {
  const nodeNames: string[] = Object.keys(nodes);
  let distance: number = 999;
  let bestNode: object = {};
  for (let nodeIndex in nodeNames) {
    if (distance > nodes[nodeNames[nodeIndex]]) {
      distance = nodes[nodeNames[nodeIndex]];
      delete bestNode[nodeNames[nodeIndex - 1]];
      bestNode[nodeNames[nodeIndex]] = distance;
    }
  }
  return bestNode;
}

console.log(dijkstra(graph));

/**
* Will output
* { A: { B: 1 }, B: { D: 3 }, C: { E: 1 }, D: { F: 4 }, E: { F: 10 } }
**/

```

---

### References

[Wikipedia](https://en.wikipedia.org/wiki/Dijkstra's_algorithm)