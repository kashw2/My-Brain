## Purpose

**Routing** is how a **[[OSI Model#Packet|Packet]]** gets from its source to a destination on a different network. It happens at the **[[OSI Model#3. Network Layer|Network Layer]]** and is carried out by **[[#Router|Routers]]**.

No single router knows the whole path. Each router only picks the next **[[#Hop]]** that gets the Packet closer, and this repeats until the Packet reaches the destination's network.

### Terminology
 - **[[#Router]]**: A device that connects networks and forwards Packets between them using IP addresses
 - **[[#Hop]]**: One step of the journey, from one device to the next
 - **[[#Routing Table]]**: The list a Router checks to decide where to send each Packet
 - **[[#Prefix]]**: A range of IP addresses, written like `31.91.0.0/16`
 - **[[#Default Route]]**: The route used when nothing more specific matches, written `0.0.0.0/0`
 - **[[#NAT (Network Address Translation)|NAT]]**: Swapping a private IP address for a public one at the edge of a network

---

## Router

A **Router** connects two or more networks. It reads the destination IP address of each **[[OSI Model#Packet|Packet]]** and forwards it towards that address.

## Hop

A **Hop** is one step of the journey between two devices on the same local network, such as a PC to its home router, or one router to the next.

Two layers work together at every hop:

| | Layer 2 (Data Link) | Layer 3 (Network) |
|---|---|---|
| Address used | MAC address | IP address |
| Scope | One hop, within one local network | End to end, across many networks |
| Read by | Switches | Routers |
| Changes at each router? | Yes, a new Frame every hop | No, the destination stays the same for the whole trip |

At each router the **[[OSI Model#Network Frame|Frame]]** is removed, the IP address is read, and the Packet is wrapped in a new Frame addressed to the next device. The **[[OSI Model#2. Data Link Layer|Data Link Layer]]** only ever delivers a Frame across one hop, while the **[[OSI Model#3. Network Layer|Network Layer]]** gets the Packet to its final destination.

### ARP

**ARP (Address Resolution Protocol)** finds the MAC address that belongs to an IP address on the local network. A device uses it to fill in the destination MAC address of the next Frame.

## Example Journey

Sending a request from `192.168.1.38` (a device on a home network) to `31.91.21.8` (a server on an external network):

1. **The device** sees `31.91.21.8` is not on the local network, so it sends the Packet to the home router (the default gateway, such as `192.168.1.1`). It uses **[[#ARP]]** to find the router's MAC address and puts it in the Frame.
2. **The home router** removes the Frame and reads the destination `31.91.21.8`. It swaps the private source address `192.168.1.38` for the home's public IP address (**[[#NAT (Network Address Translation)|NAT]]**), then sends the Packet to the ISP in a new Frame.
3. **Each router on the internet** removes the Frame, reads `31.91.21.8`, picks the next router from its **[[#Routing Table]]**, and wraps the Packet in a new Frame.
4. **The last router**, on the destination's network, uses **[[#ARP]]** to find the MAC address of `31.91.21.8` and delivers the Frame directly to it.
5. **The destination** **[[OSI Model#Decapsulation|decapsulates]]** the Frame back into the Packet, Segment and Data.

### NAT (Network Address Translation)

Addresses such as `192.168.x.x` are private. They can't be used on the internet, and many homes use the same ones. The home router swaps the private source address for its public IP address, and keeps a table of which device sent what so replies can be passed back to the right device.

This means the source IP address changes once, at the home router. The destination IP address stays the same for the whole trip.

---

## Routing vs Forwarding

Routers never ask other routers where to send a Packet while it is travelling. The work is split into two jobs:
- **Routing** runs in the background all the time. Routers exchange information with their neighbours using **[[#Routing Protocols]]** to build their **[[#Routing Table|Routing Tables]]**.
- **Forwarding** happens for every Packet. The router looks up the destination IP address in its Routing Table and sends the Packet to the listed next hop.

All the knowledge gathering happens before the Packet arrives, so forwarding is a single lookup.

## Routing Table

A **Routing Table** maps destination networks (**[[#Prefix|Prefixes]]**) to the next hop:

| Destination network | Next hop |
|---|---|
| `31.91.21.0/24` | Router C |
| `31.91.0.0/16` | Router B |
| `0.0.0.0/0` | ISP |

A device's own routing table can be viewed with `ip route`.

### Prefix

A **Prefix** is a range of IP addresses, written as an address followed by a slash and a number. The number is how many leading bits of the address must match, so a bigger number means a smaller, more specific range:
- `/0` covers every address
- `/16` covers 65,536 addresses
- `/24` covers 256 addresses
- `/32` covers a single address

### Longest Prefix Match

When more than one entry matches, the router picks the most specific one (the longest prefix).

For `31.91.21.8`, all three entries in the table above match. The `/24` entry is the most specific, so the Packet goes to Router C.

### Default Route

The **Default Route** (`0.0.0.0/0`) matches every address. It means "if nothing more specific matches, send it here". A home router's table is mostly just the local network plus a Default Route pointing to the ISP.

---

## Route Aggregation

Not every router needs to know every network:
1. **Home routers** only know the local network. Everything else goes to the ISP through the **[[#Default Route]]**.
2. **ISP routers** know their customers' networks, plus routes learned from other networks.
3. **Backbone routers** know a route to every network on the internet, roughly a million entries.

A Packet travels up to routers that know more, then down towards the destination, where the routing tables get more specific. This is because of **Route Aggregation** (also called summarisation):
1. The destination's ISP knows its customers' small networks in detail, such as `31.91.21.0/24` and `31.91.22.0/24`.
2. It tells the rest of the internet only about one big block: "send anything in `31.91.0.0/16` to me".
3. Routers far away store that one entry instead of hundreds.
4. Once the Packet reaches that ISP, its routers use the detailed entries to find the exact customer network.

Without aggregation, every router would need an entry for every small network on the internet.

How specific the matched entry is at each hop of the **[[#Example Journey]]**:

| Hop | Entry matched | How specific |
|---|---|---|
| Home router | `0.0.0.0/0` → ISP | Least specific (matches everything) |
| Your ISP | `0.0.0.0/0` → upstream provider, or `31.91.0.0/16` if it has the full table | Broad |
| Backbone router | `31.91.0.0/16` → destination's ISP | Broad |
| Destination's ISP | `31.91.21.0/24` → customer's router | More specific |
| Customer's router | `31.91.21.0/24` directly connected → ARP for `.8` | Final network |

Each router still makes its own decision from its own table. The Packet carries no record of earlier choices.

---

## Routing Protocols

**Routing Protocols** are how routers share what they know with their neighbours to build their **[[#Routing Table|Routing Tables]]**.

Routing Protocols work at two levels:

| | Inside one network | Between networks |
|---|---|---|
| Protocol | OSPF (or IS-IS) | BGP |
| How it works | Every router shares its links, so each router has a full map of that network | Each network announces which Prefixes it can reach, and the list of networks on the way |
| Algorithm | Dijkstra's shortest path | BGP best path selection |
| "Best" means | Lowest total link cost, usually based on link speed | The operator's business policy first (cheapest or preferred partner), then fewest networks on the path |

BGP does not pick the fastest path. It picks the path each operator prefers, which is usually the cheapest for them. This is why internet routes are not always the shortest geographically.
