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

## References

[^rfc2663]: [RFC 2663: NAT Terminology and Considerations](https://www.rfc-editor.org/rfc/rfc2663#section-3) — NAT maps IP addresses from one network to another
[^rfc1918]: [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918#section-3) — globally unique addresses, the three private ranges, that anyone can use them, and that routers reject routes for them and don't forward Packets to or from them (§3)
