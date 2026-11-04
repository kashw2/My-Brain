A **Distributed System** is a group of separate machines that coordinate over a [[Networking|network]] so they behave like one system. Pretty much everything in the [[Cloud]] is one, from a [[Kubernetes]] cluster to a replicated [[PostgreSQL]] database.

---

## How it Works

**Partial Failure**
On one machine a program either works or crashes. In a distributed system one node can die, or just go slow, while the rest carry on, and from the outside a slow node and a dead one look the same. A timeout is a guess, not proof that something failed.

**Unreliable Networks**
Messages get lost, delayed, duplicated or arrive out of order. [[Transmission Control Protocol - TCPIP|TCP]] hides some of this between two hosts, but when a request times out you still can't tell whether the other side processed it. That's why retries need [[Idempotency]], sending the same request twice has to leave the same state as sending it once.

**CAP Theorem**
When a network partition splits the nodes, the system has to choose between consistency (every read sees the latest write) and availability (every node keeps answering). Partitions will happen, so the real question is which one you give up while one is going on. A single primary database leans towards consistency, many NoSQL stores lean towards availability and settle for eventual consistency.

**Consensus and Quorums**
To agree on something like who the leader is, nodes use a consensus algorithm such as Raft or Paxos, where a majority has to agree. That's why clusters have an odd number of members: 3 survive 1 failure, 5 survive 2. [[Kubernetes]] keeps all its state in etcd, which uses Raft. Without a quorum you risk split brain, two nodes both thinking they're the primary, see [[Automatic Failover]].

**No Shared Clock**
Every machine's clock drifts, so timestamps from different nodes can't reliably order events. Systems either let a single leader decide the order or use logical clocks that count events instead of time.

---

## Examples

```bash
# Retry with backoff. Safe because the API dedupes on the key (if it supports one)
key=$(uuidgen)
for attempt in 1 2 3 4 5; do
	curl --fail -X POST https://api.example.com/payments \
		-H "Idempotency-Key: $key" \
		-H "Content-Type: application/json" \
		-d '{"amount": 1000, "currency": "AUD"}' && break
	sleep $((2 ** attempt))
done
```

| Problem | Usual answer |
| --- | --- |
| Request timed out, did it happen? | Retries with [[Idempotency]] keys |
| A node died | Replication and failover, see [[High Availability]] |
| Two nodes think they're the leader | Quorum or consensus (Raft), fencing the old leader |
| Clocks disagree | A single leader or logical clocks |
| One slow node holds everything up | Timeouts, circuit breakers, backpressure |

---

### References

- [AWS Builders' Library: Making Retries Safe with Idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)
- [The Raft Consensus Algorithm](https://raft.github.io/)
- [Wikipedia](https://en.wikipedia.org/wiki/Distributed_computing)
