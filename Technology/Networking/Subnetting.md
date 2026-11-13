## Purpose

**Subnetting** is dividing a network into smaller networks.[^wiki-subnet] Each one is set by a **[[IP Address#Subnet Mask|Subnet Mask]]**, and the mask tells you how many addresses the network holds and which **[[IP Address#Network and Broadcast Addresses|Network and Broadcast Addresses]]** an address belongs to.

### Terminology
 - **[[#Finding the Block|Partial Octet]]**: The mask Octet that isn't `255` or `0`, where the Network Part ends
 - **[[#Finding the Block|Block Size]]**: The number of addresses one network holds
 - **[[#Finding the Block|Boundary]]**: Where a network can start: a multiple of its Block Size
 - **[[#Finding the Block|Magic Number]]**: `256 −` the Partial Octet. It's the Block Size and the step between Network Addresses

---

## The nine Octet values

The `1`s fill from the left with no gaps, so each Octet can only be one of nine values:

| `1`s  | 0   | 1     | 2     | 3     | 4     | 5     | 6     | 7     | 8     |
| ----- | --- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Octet | `0` | `128` | `192` | `224` | `240` | `248` | `252` | `254` | `255` |

### Calculating instead of memorising

It all comes from one formula, where `0`s is the number of `0` bits in the Octet:

**Octet value = 256 − 2^(`0`s)** — and that same **2^(`0`s)** is how many addresses the network holds when the mask splits the last Octet.

| To find… | Use | Example |
| --- | --- | --- |
| Octet value from the `1`s | 256 − 2^(`0`s) | 3 `1`s → 5 `0`s → 256 − 2⁵ = `224` |
| `1`s from an Octet value | 256 − value = 2^(`0`s) | `240` → 256 − 240 = 2⁴ → 4 `0`s, 4 `1`s |
| Addresses in the network | 2^(`0`s) | `192` → 256 − 192 = 2⁶ = **64** (a `/26`) |

**Example** — `255.255.255.224`: 256 − 224 = **32** = 2⁵, so 5 `0`s and 3 `1`s. The three `1`s extend the Prefix to `/27` (24 + 3), and the 2⁵ = **32** addresses per network match the **[[IP Address#Prefix|Prefix]]** count 2^(32 − 27) = 2⁵ = **32**.

---

## Finding the Block

A network always starts on a fixed **boundary**: a multiple of its own size. The Network Address is **not** whatever address you happen to start from — it's the start of the block that address falls in. The **block size** is the number of addresses the network holds (`256 − the partial mask Octet`, or `2^(Host bits)`), and networks of that size can only begin at `0`, one block, two blocks, and so on.

To find which network any address is in, determine the blocks within the host part and take your address and round **down** to the start of nearest range:
 - **Network Octet** = host Octet − (host Octet mod block size)
 - **Broadcast Octet** = Network Octet + block size − 1

**The magic number.** The block size comes straight from the mask: it's `256 −` the **partial Octet** (the one that's not `255` or `0`, which is where the split falls). This is called the *magic number* — it's both the block size and the step between Network Addresses:

| Mask              | Partial Octet | Magic number (`256 −`) | Prefix |
| ----------------- | ------------- | ---------------------- | ------ |
| `255.255.255.192` | `192`         | `64`                   | `/26`  |
| `255.255.255.224` | `224`         | `32`                   | `/27`  |
| `255.255.255.248` | `248`         | `8`                    | `/29`  |
| `255.255.192.0`   | `192`         | `64` (in the 3rd Octet) | `/18`  |

**Masks with no partial Octet.** When every Octet of the mask is `255` or `0` (`/8`, `/16`, `/24` and `/32`), the Network Part ends exactly at the end of an Octet. There's no partial Octet, so there's no magic number to work out. The Host Part is made of whole Octets, so:
 - the **Network Address** is the address with every Host Part Octet set to `0`
 - the **Broadcast Address** is the address with every Host Part Octet set to `255`

For `192.168.1.38`:

| Prefix | Mask              | Host Part     | Network Address | Broadcast Address |
| ------ | ----------------- | ------------- | --------------- | ----------------- |
| `/8`   | `255.0.0.0`       | Last 3 Octets | `192.0.0.0`     | `192.255.255.255` |
| `/16`  | `255.255.0.0`     | Last 2 Octets | `192.168.0.0`   | `192.168.255.255` |
| `/24`  | `255.255.255.0`   | Last Octet    | `192.168.1.0`   | `192.168.1.255`   |
| `/32`  | `255.255.255.255` | None          | `192.168.1.38`  | `192.168.1.38`    |

With `/32` there's no Host Part to change, so the network is just the one address.

The magic number only earns its keep when a block is a *fraction* of an Octet (mask Octet `128`–`254`), because that's the only time one Octet holds more than one network.

With `/26` the block size is 64, so an Octet has only four possible networks (256 / 64 = 4):

| Range         | Network Address | Broadcast Address |
| ------------- | --------------- | ----------------- |
| `.0` – `.63`    | `.0`            | `.63`             |
| `.64` – `.127`  | `.64`           | `.127`            |
| `.128` – `.191` | `.128`          | `.191`            |
| `.192` – `.255` | `.192`          | `.255`            |

So `192.168.1.200/26` sits in the `.192` block: Network `192.168.1.192`, Broadcast `192.168.1.255`. And `192.168.1.60` and `192.168.1.70` are **not** on the same network — `.60` is in the `.0` block, `.70` is in the `.64` block.

The boundary falls in whichever Octet the mask splits. For `/26` that's the last Octet; for a shorter Prefix like `/18` it's the third Octet, and the Octets below it just run `0`–`255` inside the block.

![[Network Boundaries]]

---

## References

[^wiki-subnet]: [Wikipedia: Subnet](https://en.wikipedia.org/wiki/Subnet) — dividing a network into two or more networks is called subnetting
