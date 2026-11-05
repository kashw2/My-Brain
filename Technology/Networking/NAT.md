Network Address Translation
## Terminology
 - **[[#NAT (Network Address Translation)|NAT]]**: A **[[Routing#Router|Router]]** rewriting the IP addresses in a **[[OSI Model#Packet|Packet]]** as it passes from one network to another[^rfc2663]
 - **[[#Private Address]]**: An address that only means something inside one local network, such as `192.168.1.38`
 - **[[#Public Address]]**: An address that is unique across the whole internet[^rfc1918]
 - **[[#Port]]**: A number in the TCP or UDP header that identifies which application a connection belongs to
 - **[[#Translation Table]]**: The router's record of which inside device each translated connection belongs to
 - **[[#NAPT (Network Address Port Translation)|NAPT]]**: NAT that also rewrites Ports, so many devices can share one Public Address
 - **[[#Port Forwarding]]**: A fixed rule that sends traffic arriving on a public Port to one device inside

---

## Private Address

Three ranges are reserved for private networks:[^rfc1918]

| Range | Prefix |
|---|---|
| `10.0.0.0` to `10.255.255.255` | `10.0.0.0/8` |
| `172.16.0.0` to `172.31.255.255` | `172.16.0.0/12` |
| `192.168.0.0` to `192.168.255.255` | `192.168.0.0/16` |

Anyone can use these without asking, so many networks use the same ones at the same time. Because of this, routers on the internet reject routes for them, and don't forward Packets to or from them.[^rfc1918]

---

## Translation Table

The **Translation Table** maps the router's Public IP:**[[#Port]]** to the Private IP:Port of the device that sent the request:[^rfc3022]

| Public IP:Port | Private IP:Port |
|---|---|
| `203.0.113.7:62001` | `192.168.1.38:51000` |

 - **The public Port makes each entry unique**: a home router has one **[[#Public Address]]**, so every entry shares it[^rfc3022]
 - **The private Port is needed too**: the PC can have several connections open at once, and the Port says which one the reply belongs to[^rfc9293]

### Why the Source Is Rewritten

The server replies by swapping the source and destination, so whatever the router writes as the source on the way out comes back as the destination.[^rfc3022] The router writes the same `203.0.113.7:62001` into the Packet and into its Translation Table, so the reply always carries a key the table already has.

| Rewritten on the way out | Why |
|---|---|
| Source IP: `192.168.1.38` → `203.0.113.7` | So the reply can reach the router. A reply addressed to a **[[#Private Address]]** would be dropped on the internet[^rfc1918] |
| Source Port: `51000` → `62001` | So the reply matches exactly one entry. Two devices can use the same private Port |

The Port doesn't always change. Some NATs keep the private Port when it's free, and only pick a new one when it would clash with another entry.[^rfc4787]

---

## Example Journey

![[NAT Example Journey]]

On the way out, the home router rewrites the source address and **[[#Port]]**, and saves the pair in its **[[#Translation Table]]**. On the way back, it uses that entry to rewrite the destination to the PC's address and Port.[^rfc3022]

The router finds the PC from the reply's destination **[[#Port]]** (`62001`):[^rfc3022]
 - Reading the Port means NAT works with the TCP/UDP header (**[[OSI Model#4. Transport Layer|Transport Layer]]**), not just the IP header (see **[[#Headers NAT Changes]]**)[^rfc3022]
 - After rewriting the destination, the router finds the PC's MAC address with **[[Routing#ARP|ARP]]**, like it would for any other Packet

### Headers NAT Changes

NAT rewrites two headers inside the same Packet:[^rfc3022]

| Layer | Header | On the way out | On the way back |
|---|---|---|---|
| **[[OSI Model#3. Network Layer\|Network]]** (L3) | IP | Source IP address and the IP checksum | Destination IP address and the IP checksum |
| **[[OSI Model#4. Transport Layer\|Transport]]** (L4) | TCP/UDP | Source Port and the TCP/UDP checksum | Destination Port and the TCP/UDP checksum |

The TCP/UDP checksum also covers the IP addresses, so it has to be recalculated even when only the IP address changes.[^rfc3022] Ping has no Port, so NAPT rewrites its ICMP query identifier instead.[^rfc3022]

The **[[OSI Model#Network Frame|Frame]]** (L2) is replaced at every **[[Routing#Hop|Hop]]** by every router, so that part isn't NAT.

---

## References

[^rfc2663]: [RFC 2663: NAT Terminology and Considerations](https://www.rfc-editor.org/rfc/rfc2663#section-3) — NAT maps IP addresses from one network to another
[^rfc1918]: [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918#section-3) — globally unique addresses, the three private ranges, that anyone can use them, and that routers reject routes for them and don't forward Packets to or from them (§3)
[^rfc3022]: [RFC 3022: Traditional IP Network Address Translator](https://www.rfc-editor.org/rfc/rfc3022#section-2.2) — a home router shares one public address, NAPT maps a public address and Port to a private address and Port, the router rewrites the source address and Port on the way out and the destination address and Port on the way back, the reply comes back addressed to the router's public address and Port, and ICMP query identifiers are rewritten in place of Ports (§2.2), the pair is saved when the first Packet goes out (§3.1), and the IP and TCP/UDP headers and checksums are rewritten, with the TCP/UDP checksum covering the IP addresses (§4.1)
[^rfc9293]: [RFC 9293: Transmission Control Protocol (TCP)](https://www.rfc-editor.org/rfc/rfc9293#section-2.2) — Port numbers identify application services and keep separate connections apart
[^rfc4787]: [RFC 4787: NAT Behavioral Requirements for Unicast UDP](https://www.rfc-editor.org/rfc/rfc4787#section-4.2.1) — some NATs keep the private Port when it is free and pick a different one when it would clash
