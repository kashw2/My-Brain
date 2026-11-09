Internet Protocol Address
## Purpose

An **IP Address** says where a device is on a network.[^rfc791] Every **[[OSI Model#Packet|Packet]]** carries a source and a destination IP address in its header, which are used to send it towards its destination.[^rfc791]

### Terminology
 - **[[#IP Address]]**: A number that says where a device is on a network[^rfc791]
 - **[[#IPv4]]**: The version of IP that uses 32-bit addresses[^rfc791]
 - **[[#IPv6]]**: The version of IP that uses 128-bit addresses[^rfc4291]
 - **[[#Structure|Octet]]**: A group of 8 bits. An IPv4 address is 4 Octets[^rfc791]
 - **[[#Structure|Dotted Decimal]]**: Writing each Octet as a decimal number from 0 to 255, separated by dots, such as `192.168.1.38`[^wiki-dotdec]
 - **[[#Network and Host Parts|Network Part]]**: The leading bits of an address, which say which network it belongs to[^rfc4632]
 - **[[#Network and Host Parts|Host Part]]**: The remaining bits, which say which device it is on that network[^rfc4632]
 - **[[#Prefix]]**: A range of IP addresses, written like `31.91.0.0/16`
 - **[[#Private Address]]**: An address that only means something inside one local network, such as `192.168.1.38`
 - **[[#Public Address]]**: An address that is unique across the whole internet[^rfc1918]

---

## Structure

An **[[#IPv4]]** address is 32 bits long, split into four Octets of 8 bits each.[^rfc791] It's written in Dotted Decimal: each Octet as a decimal number from 0 to 255, separated by dots.[^wiki-dotdec]

|         | Octet 1    | Octet 2    | Octet 3    | Octet 4    |
| ------- | ---------- | ---------- | ---------- | ---------- |
| Decimal | `192`      | `168`      | `1`        | `38`       |
| Binary  | `11000000` | `10101000` | `00000001` | `00100110` |

An Octet is 8 bits, so it can hold 256 values. That's why each number stops at 255.

### Network and Host Parts

Every address is split into two parts:[^rfc4632]
 - **Network Part**: the leading bits, which say which network the device is on
 - **Host Part**: the remaining bits, which say which device it is on that network

The **[[#Prefix]]** length says how many bits are in the Network Part.[^rfc4632]

For example, a home network using `192.168.1.0/24` has a 24-bit Network Part and an 8-bit Host Part:

| Device      | Address        | Network Part (first 24 bits) | Host Part (last 8 bits) |
| ----------- | -------------- | ---------------------------- | ----------------------- |
| Home router | `192.168.1.1`  | `192.168.1`                  | `1`                     |
| PC          | `192.168.1.38` | `192.168.1`                  | `38`                    |
| Phone       | `192.168.1.52` | `192.168.1`                  | `52`                    |

All three share the Network Part `192.168.1`, so they're on the same network. Each one has a different Host Part, which tells them apart.

The **[[#Prefix]]** decides where the split is, so whether two addresses are on the same network depends on it. With `/24`, `192.168.2.38` is on a different network from `192.168.1.38`:

| Address        | Prefix | Network Part | Host Part | Network                      |
| -------------- | ------ | ------------ | --------- | ---------------------------- |
| `192.168.1.38` | `/24`  | `192.168.1`  | `38`      | `192.168.1.0/24`             |
| `192.168.2.38` | `/24`  | `192.168.2`  | `38`      | `192.168.2.0/24` (different) |

With `/16`, the third Octet moves into the Host Part, so the same two addresses are on the same network:

| Address        | Prefix | Network Part | Host Part | Network                 |
| -------------- | ------ | ------------ | --------- | ----------------------- |
| `192.168.1.38` | `/16`  | `192.168`    | `1.38`    | `192.168.0.0/16`        |
| `192.168.2.38` | `/16`  | `192.168`    | `2.38`    | `192.168.0.0/16` (same) |

A device compares the destination's Network Part with its own. If they match, it sends the **[[OSI Model#Packet|Packet]]** straight to the destination. If they don't, it sends it to the router (see **[[Routing#Example Journey|Example Journey]]**).[^rfc1122]

---

## Prefix

A **Prefix** is a range of IP addresses, written as an address followed by a slash and a number.[^rfc4632] The number is how many leading bits of the address must match, so a bigger number means a smaller, more specific range:
- `/0` covers **every** address
- `/16` covers **65,536** addresses
- `/24` covers **256** addresses
- `/32` covers a **single** address

A Prefix holds 2^(32 − prefix length) addresses, because every bit left over after the cut goes to the **[[#Network and Host Parts|Host Part]]**.[^rfc4632] For `/24` that's 2⁸ = **256**, and for `/16` it's 2¹⁶ = **65,536**.

For every bit that you add to a prefix you halve the total number of available addresses in the prefix. This also works for the inverse, for every bit that you take away, you double your total number of available addresses in your prefix.[^rfc4632]

---

## Private Address

Three ranges are reserved for private networks:[^rfc1918]

| Range | Prefix | Class |
|---|---|---|
| `10.0.0.0` to `10.255.255.255` | `10.0.0.0/8` | 1 Class A network |
| `172.16.0.0` to `172.31.255.255` | `172.16.0.0/12` | 16 Class B networks |
| `192.168.0.0` to `192.168.255.255` | `192.168.0.0/16` | 256 Class C networks |

Anyone can use these without asking, so many networks use the same ones at the same time. Because of this, routers on the internet reject routes for them, and don't forward **[[OSI Model#Packet|Packets]]** to or from them.[^rfc1918]

---

## Public Address

A **Public Address** is unique across the whole internet.[^rfc1918] IANA hands out blocks to the Regional Internet Registries, which hand smaller blocks to ISPs, which assign them to their customers.[^rfc4632] A home gets one from its ISP, and the home router shares it with every device inside using **[[NAT]]**.[^rfc3022]

---

## References

[^rfc791]: [RFC 791: Internet Protocol](https://www.rfc-editor.org/rfc/rfc791#section-2.3) — an address indicates where a device is, and is four Octets (32 bits) (§2.3), the addresses in the header are used to send a Packet towards its destination (§1.4), and the header holds the source and destination addresses, in version 4 of IP (§3.1)
[^rfc4291]: [RFC 4291: IP Version 6 Addressing Architecture](https://www.rfc-editor.org/rfc/rfc4291#section-2) — IPv6 addresses are 128 bits (§2)
[^wiki-dotdec]: [Wikipedia: Dot-decimal notation](https://en.wikipedia.org/wiki/Dot-decimal_notation) — IPv4 addresses are written as four decimal numbers from 0 to 255, separated by dots
[^rfc4632]: [RFC 4632: Classless Inter-domain Routing (CIDR)](https://www.rfc-editor.org/rfc/rfc4632#section-3.1) — an IPv4 address is split into the network number and the bits that number individual devices, Prefix notation is an address, a slash, and the number of network bits, the number of addresses per prefix length, and that IANA allocates blocks to the Regional Internet Registries, which allocate smaller blocks to ISPs, which pass addresses on to their customers (§3.1)
[^rfc1918]: [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918#section-3) — globally unique addresses, the three private ranges and which class networks each one covers in pre-CIDR terms, that anyone can use them, and that routers reject routes for them and don't forward Packets to or from them (§3)
[^rfc1122]: [RFC 1122: Requirements for Internet Hosts](https://www.rfc-editor.org/rfc/rfc1122#page-47) — a device compares the network bits of the destination with its own, sends directly when they match, and sends through a gateway when they don't (§3.3.1.1)
[^rfc3022]: [RFC 3022: Traditional IP Network Address Translator](https://www.rfc-editor.org/rfc/rfc3022#section-1) — home users have a single IP address assigned to their router by their provider, and NAPT lets every device in the network share it (§1)
