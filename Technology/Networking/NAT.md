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

---

## Example Journey

![[NAT Example Journey]]

On the way out, the home router rewrites the source address and **[[#Port]]**, and saves the pair in its **[[#Translation Table]]**. On the way back, it uses that entry to rewrite the destination to the PC's address and Port.[^rfc3022]

The router finds the PC from the reply's destination **[[#Port]]** (`62001`), not from a MAC address:[^rfc3022]
 - The PC's MAC address isn't in the reply, as each **[[OSI Model#Network Frame|Frame]]** only covers one **[[Routing#Hop|Hop]]**
 - Reading the Port means NAT works with the TCP/UDP header (**[[OSI Model#4. Transport Layer|Transport Layer]]**), not just the IP header[^rfc3022]
 - After rewriting the destination, the router finds the PC's MAC address with **[[Routing#ARP|ARP]]**, like it would for any other Packet

---

## References

[^rfc2663]: [RFC 2663: NAT Terminology and Considerations](https://www.rfc-editor.org/rfc/rfc2663#section-3) — NAT maps IP addresses from one network to another
[^rfc1918]: [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918#section-3) — globally unique addresses, the three private ranges, that anyone can use them, and that routers reject routes for them and don't forward Packets to or from them (§3)
[^rfc3022]: [RFC 3022: Traditional IP Network Address Translator](https://www.rfc-editor.org/rfc/rfc3022#section-2.2) — a home router shares one public address, NAPT maps a public address and Port to a private address and Port, and the router rewrites the source address and Port on the way out and the destination address and Port on the way back (§2.2), the pair is saved when the first Packet goes out (§3.1), and the TCP/UDP header is rewritten along with the IP header (§4.1)
[^rfc9293]: [RFC 9293: Transmission Control Protocol (TCP)](https://www.rfc-editor.org/rfc/rfc9293#section-2.2) — Port numbers identify application services and keep separate connections apart
