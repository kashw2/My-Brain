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
 - **[[#Subnet Mask]]**: A Prefix written out in full as 32 bits, such as `255.255.255.0` for `/24`[^rfc4632]
 - **[[#Network and Broadcast Addresses|Network Address]]**: The first address in a network, with the Host Part all `0`s. It names the network itself[^wiki-subnet]
 - **[[#Network and Broadcast Addresses|Broadcast Address]]**: The last address in a network, with the Host Part all `1`s. It sends to every device on the network[^wiki-subnet]
 - **[[#Class]]**: The old way of splitting an address into its Network and Host Parts, fixed by its leading bits[^rfc791]
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

## Subnet Mask

A **Subnet Mask** is a **[[#Prefix]]** written out as 32 bits: `1`s for the **[[#Network and Host Parts|Network Part]]**, then `0`s for the Host Part.[^rfc4632] Count the `1`s to get the Prefix:

| Mask              | Binary                                | Prefix |
| ----------------- | ------------------------------------- | ------ |
| `255.255.255.0`   | `11111111.11111111.11111111.00000000` | `/24`  |
| `255.255.255.192` | `11111111.11111111.11111111.11000000` | `/26`  |

The `1`s fill from the left, so each Octet can only be one of these:

| `1`s  | 0   | 1     | 2     | 3     | 4     | 5     | 6     | 7     | 8     |
| ----- | --- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Octet | `0` | `128` | `192` | `224` | `240` | `248` | `252` | `254` | `255` |

To calculate a value instead of looking it up, use **256 − 2^(number of `0`s)**:
 - **`1`s → value**: 3 `1`s means 5 `0`s, so 256 − 2⁵ = 256 − 32 = `224`
 - **Value → `1`s**: `240` → 256 − 240 = 16 = 2⁴, so 4 `0`s and 4 `1`s
 - **Addresses**: in the last Octet, the 2^(`0`s) is also how many addresses the network holds. `255.255.255.192` → 256 − 192 = **64**, the same as a `/26` from the **[[#Prefix]]** count (2⁶ = **64**)

Masking an address keeps the bits under the `1`s and zeroes the rest, leaving the **[[#Network and Broadcast Addresses|Network Address]]**: `192.168.1.38` masked with `255.255.255.0` is `192.168.1.0`.[^rfc4632] A device masks the destination and its own address, and if they match, the destination is on its network.[^rfc1122]

---

## Network and Broadcast Addresses

The first and last addresses in a network are reserved, so no device can use them:[^wiki-subnet][^rfc1122]
 - **Network Address**: the first address. Its **[[#Network and Host Parts|Host Part]]** is all `0`s, and it names the network itself, such as `192.168.1.0/24`
 - **Broadcast Address**: the last address. Its Host Part is all `1`s, and a **[[OSI Model#Packet|Packet]]** sent to it goes to every device on the network

For `192.168.1.0/24`, the Host Part is the last 8 bits:

| Address                          | Host Part (last 8 bits)  | Use               |
| -------------------------------- | ------------------------ | ----------------- |
| `192.168.1.0`                    | `00000000`               | Network Address   |
| `192.168.1.1` to `192.168.1.254` | `00000001` to `11111110` | Devices           |
| `192.168.1.255`                  | `11111111`               | Broadcast Address |

The last address is only `.255` when the Host Part is the whole last Octet. With `/26` the Host Part is the last 6 bits, so `192.168.1.64/26` ends at `.127`:[^wiki-subnet]

An easy way to work this out is that `192.168.1.0/24` gives 256 addresses, for every bit we add we half our address space so `/25` gets us 128, `/26` gives us 64 meaning that if we were starting at `192.168.1.64` with a `/26` prefix we would add those 64 addresses 

| Address                           | Host Part (last 6 bits) | Use               |
| --------------------------------- | ----------------------- | ----------------- |
| `192.168.1.64`                    | `000000`                | Network Address   |
| `192.168.1.65` to `192.168.1.126` | `000001` to `111110`    | Devices           |
| `192.168.1.127`                   | `111111`                | Broadcast Address |

To find them for any address, mask it to get the Network Address (see **[[#Subnet Mask]]**), then set every Host Part bit to `1` to get the Broadcast Address.

Losing these two leaves **254** addresses for devices in a `/24`, and **62** in a `/26`.[^wiki-subnet]

---

## Class

Before **[[#Prefix|Prefixes]]**, an address's leading bits decided where the **[[#Network and Host Parts|Network and Host Parts]]** split. There were three formats, called **Classes**:[^rfc791]

| Class | Leading bits | Network Part  | Host Part    | As a Prefix | First Octet    |
| ----- | ------------ | ------------- | ------------ | ----------- | -------------- |
| A     | `0`          | First 8 bits  | Last 24 bits | `/8`        | `0` to `127`   |
| B     | `10`         | First 16 bits | Last 16 bits | `/16`       | `128` to `191` |
| C     | `110`        | First 24 bits | Last 8 bits  | `/24`       | `192` to `223` |

The leading bits are why the first Octet shows the Class. `192` is `11000000`, which starts with `110`, so `192.168.1.38` is Class C.

RFC 791 counts the network bits after the leading bits (7, 14 and 21), but the leading bits are part of the Network Part too. That's why Class A, B and C networks are the same as `/8`, `/16` and `/24` Prefixes.[^rfc4632][^rfc1918]

Only three network sizes were possible, so Prefixes replaced Classes to allow any power-of-two size.[^rfc4632]

---

## Private Address

Three ranges are reserved for private networks:[^rfc1918]

| Range | Prefix | **[[#Class]]** |
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

[^rfc791]: [RFC 791: Internet Protocol](https://www.rfc-editor.org/rfc/rfc791#section-2.3) — an address indicates where a device is, is four Octets (32 bits), and comes in three classes whose leading bits set the network and local parts (§2.3), the addresses in the header are used to send a Packet towards its destination (§1.4), and the header holds the source and destination addresses, in version 4 of IP (§3.1)
[^rfc4291]: [RFC 4291: IP Version 6 Addressing Architecture](https://www.rfc-editor.org/rfc/rfc4291#section-2) — IPv6 addresses are 128 bits (§2)
[^wiki-dotdec]: [Wikipedia: Dot-decimal notation](https://en.wikipedia.org/wiki/Dot-decimal_notation) — IPv4 addresses are written as four decimal numbers from 0 to 255, separated by dots
[^rfc4632]: [RFC 4632: Classless Inter-domain Routing (CIDR)](https://www.rfc-editor.org/rfc/rfc4632#section-3.1) — an IPv4 address is split into the network number and the bits that number individual devices, Prefix notation is an address, a slash, and the number of network bits, a prefix length is the same as a mask whose first bits are ones and the rest zeros, used to extract the network portion, the number of addresses per prefix length, legacy Class B and C networks are the same as /16 and /24 prefixes, prefixes replaced the three fixed network sizes with any power-of-two size, and IANA allocates blocks to the Regional Internet Registries, which allocate smaller blocks to ISPs, which pass addresses on to their customers (§3.1), and the mask must be contiguous (§5.1)
[^wiki-subnet]: [Wikipedia: Subnet](https://en.wikipedia.org/wiki/Subnet#Special_addresses_and_subnets) — the all-zeros and all-ones Host Part values are reserved for the network address and the broadcast address, the broadcast address is the last address in a network, a `/26` starting at `.64` has the broadcast address `.127`, and a `/24` and a `/26` hold 254 and 62 hosts
[^rfc1918]: [RFC 1918: Address Allocation for Private Internets](https://www.rfc-editor.org/rfc/rfc1918#section-3) — globally unique addresses, the three private ranges and which class networks each one covers in pre-CIDR terms, that anyone can use them, and that routers reject routes for them and don't forward Packets to or from them (§3)
[^rfc1122]: [RFC 1122: Requirements for Internet Hosts](https://www.rfc-editor.org/rfc/rfc1122#page-47) — a device uses its address mask to extract the network bits of the destination and of its own address, compares them, sends directly when they match, and sends through a gateway when they don't (§3.3.1.1), and the host number can't be all `0`s or all `1`s except in special cases, where all `1`s is a broadcast to that network (§3.2.1.3)
[^rfc3022]: [RFC 3022: Traditional IP Network Address Translator](https://www.rfc-editor.org/rfc/rfc3022#section-1) — home users have a single IP address assigned to their router by their provider, and NAPT lets every device in the network share it (§1)
