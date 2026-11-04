A LinkedList is a [[Data Structures|Data Structure]] that stores values in a chain of nodes, where each node points to the next node in the chain.

---

## Description

A **LinkedList** is made up of nodes, and each node holds two things: a **value** and a **pointer** to the next node.[^wiki-ll] The first node is called the **head**, and the last node points to `null` to mark the end of the list.[^wiki-ll]

```
head
 │
 ▼
┌───┬───┐    ┌───┬───┐    ┌───┬──────┐
│ 1 │ ●─┼───▶│ 2 │ ●─┼───▶│ 3 │ null │
└───┴───┘    └───┴───┘    └───┴──────┘
```

Unlike an array, the nodes don't need to sit next to each other in memory. This means values can be added or removed without moving the rest of the list around.[^wiki-ll]

The trade off is that there is no way to jump straight to a position. Getting the 5th value means starting at the **head** and following the pointers one node at a time.[^wiki-ll] This is why most operations take longer as the list grows:[^wiki-ll]

| Operation | Cost |
| --- | --- |
| Add or remove at the head | O(1) |
| Add at the end | O(n), or O(1) if the last node is kept track of |
| Add or remove in the middle | O(n) |
| Get a value by index | O(n) |
| Search for a value | O(n) |

A **LinkedList** is often used to build other [[Data Structures]], such as a [[Stack]] or a queue.[^wiki-ll]

A [[DoublyLinkedList]] adds a second pointer to each node that points back to the previous node, so the list can be walked in both directions.[^wiki-ll]

## Examples

```typescript
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;

  // O(1): the new node points at the old head, then becomes the head
  prepend(value: T): void {
    const node: ListNode<T> = new ListNode(value);
    node.next = this.head;
    this.head = node;
  }

  // O(n): walks to the last node to attach the new one
  append(value: T): void {
    const node: ListNode<T> = new ListNode(value);
    if (this.head === null) {
      this.head = node;
      return;
    }
    let current: ListNode<T> = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }

  // O(n): walks the list to find the node before the one being removed
  remove(value: T): boolean {
    if (this.head === null) {
      return false;
    }
    if (this.head.value === value) {
      this.head = this.head.next;
      return true;
    }
    let current: ListNode<T> = this.head;
    while (current.next !== null) {
      if (current.next.value === value) {
        current.next = current.next.next; // Point past the removed node
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // O(n): may have to check every node
  contains(value: T): boolean {
    let current: ListNode<T> | null = this.head;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // O(n): visits every node
  toArray(): T[] {
    const values: T[] = [];
    let current: ListNode<T> | null = this.head;
    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
}

const numbers: LinkedList<number> = new LinkedList();
numbers.append(2);
numbers.append(3);
numbers.prepend(1);

console.log(numbers.toArray()); // [ 1, 2, 3 ]

numbers.remove(2);

console.log(numbers.toArray()); // [ 1, 3 ]
console.log(numbers.contains(2)); // false
```

---

## References

[^wiki-ll]: [Wikipedia: Linked list](https://en.wikipedia.org/wiki/Linked_list) — nodes holding a value and a pointer to the next node, the head and the `null` end, nodes not sitting next to each other in memory so values can be added or removed without moving the rest, no jumping straight to a position, the operation costs, building a Stack or queue, and the DoublyLinkedList's pointer back to the previous node
