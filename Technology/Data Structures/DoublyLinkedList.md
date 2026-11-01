A DoublyLinkedList is a [[LinkedList]] where each node points to both the next node and the previous node, so the list can be walked in either direction.

---

## Description

A **DoublyLinkedList** is made up of nodes, and each node holds three things: a **value**, a **pointer** to the next node and a **pointer** to the previous node.[^wiki-dll] The first node's previous pointer and the last node's next pointer are both `null`, which marks each end of the list.[^wiki-dll]

The list keeps track of both its first node, the **head**, and its last node, the **tail**, so it can be walked from either end.[^wiki-dll] Each node below is drawn as `previous | value | next`:

```
head                                             tail
 │                                                 │
 ▼                                                 ▼
┌──────┬───┬───┐    ┌───┬───┬───┐    ┌───┬───┬──────┐
│ null │ 1 │ ● │◀──▶│ ● │ 2 │ ● │◀──▶│ ● │ 3 │ null │
└──────┴───┴───┘    └───┴───┴───┘    └───┴───┴──────┘
```

The previous pointer is what makes a **DoublyLinkedList** different from a [[LinkedList]]. If you already have a node, you can remove it straight away, because the node knows its neighbours on both sides. In a [[LinkedList]] you would first have to walk the list to find the node before it.[^wiki-dll][^wiki-ll]

The trade off is that every node uses more memory to hold the extra pointer, and adding or removing a node means updating more pointers.[^wiki-dll][^wiki-ll]

Like a [[LinkedList]], there is still no way to jump straight to a position, so getting a value by index or searching for a value means walking the list one node at a time:[^wiki-dll][^wiki-ll]

| Operation | Cost |
| --- | --- |
| Add or remove at the head | O(1) |
| Add or remove at the tail | O(1) |
| Remove a node you already have | O(1) |
| Get a value by index | O(n) |
| Search for a value | O(n) |

## Examples

```typescript
class ListNode<T> {
  value: T;
  previous: ListNode<T> | null = null;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class DoublyLinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;

  // O(1): the new node points at the old head, then becomes the head
  prepend(value: T): ListNode<T> {
    const node: ListNode<T> = new ListNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return node;
    }
    node.next = this.head;
    this.head.previous = node;
    this.head = node;
    return node;
  }

  // O(1): the new node points at the old tail, then becomes the tail
  append(value: T): ListNode<T> {
    const node: ListNode<T> = new ListNode(value);
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      return node;
    }
    node.previous = this.tail;
    this.tail.next = node;
    this.tail = node;
    return node;
  }

  // O(1): the nodes either side are pointed at each other, skipping the removed node
  removeNode(node: ListNode<T>): void {
    if (node.previous === null) {
      this.head = node.next;
    } else {
      node.previous.next = node.next;
    }
    if (node.next === null) {
      this.tail = node.previous;
    } else {
      node.next.previous = node.previous;
    }
    node.previous = null;
    node.next = null;
  }

  // O(n): walks the list to find the node, then removes it in O(1)
  remove(value: T): boolean {
    let current: ListNode<T> | null = this.head;
    while (current !== null) {
      if (current.value === value) {
        this.removeNode(current);
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // O(n): visits every node from the head to the tail
  toArray(): T[] {
    const values: T[] = [];
    let current: ListNode<T> | null = this.head;
    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }

  // O(n): visits every node from the tail to the head
  toArrayReversed(): T[] {
    const values: T[] = [];
    let current: ListNode<T> | null = this.tail;
    while (current !== null) {
      values.push(current.value);
      current = current.previous;
    }
    return values;
  }
}

const numbers: DoublyLinkedList<number> = new DoublyLinkedList();
numbers.append(2);
const three: ListNode<number> = numbers.append(3);
numbers.append(4);
numbers.prepend(1);

console.log(numbers.toArray()); // [ 1, 2, 3, 4 ]
console.log(numbers.toArrayReversed()); // [ 4, 3, 2, 1 ]

numbers.removeNode(three); // No search needed, we already have the node

console.log(numbers.toArray()); // [ 1, 2, 4 ]

numbers.remove(1);

console.log(numbers.toArray()); // [ 2, 4 ]
console.log(numbers.toArrayReversed()); // [ 4, 2 ]
```

---

## References

[^wiki-dll]: [Wikipedia: Doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) — nodes holding a value and pointers to the next and previous nodes, the `null` at each end, the head and tail letting the list be walked from either end, no need to walk the list to find the node before the one being removed, and more pointers to update when adding or removing
[^wiki-ll]: [Wikipedia: Linked list](https://en.wikipedia.org/wiki/Linked_list) — removing a node you already have without the node before it, the extra memory per node, no jumping straight to a position, and the operation costs
