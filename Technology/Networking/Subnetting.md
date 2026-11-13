## Purpose

**Subnetting** is dividing a network into smaller networks.[^wiki-subnet] Each one is set by a **[[IP Address#Subnet Mask|Subnet Mask]]**, and the mask tells you how many addresses the network holds and which **[[IP Address#Network and Broadcast Addresses|Network and Broadcast Addresses]]** an address belongs to.

### Terminology
 - **[[#From a mask|Partial Octet]]**: The mask Octet that isn't `255` or `0`, where the Network Part ends
 - **[[#Finding the Block|Block Size]]**: The step between Network Addresses, in the Octet where the Prefix ends
 - **[[#Finding the Block|Boundary]]**: Where a network can start: a multiple of its Block Size
 - **[[#From a mask|Magic Number]]**: `256 −` the Partial Octet. It's the Block Size and the step between Network Addresses

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

A network can only start on a **boundary**: a multiple of its **block size**, in the Octet where the Prefix ends. The Network Address is the start of the block an address falls in, not the address itself.

### Steps

The boundaries are in the Octet the Prefix ends in:

| Prefix | `/1`–`/8` | `/9`–`/16` | `/17`–`/24` | `/25`–`/32` |
| ------ | --------- | ---------- | ----------- | ----------- |
| Octet  | 1st       | 2nd        | 3rd         | 4th         |

1. **`1`s in that Octet** = Prefix − 8 for each Octet before it. **`0`s** = 8 − `1`s
2. **Block size** = 2^(`0`s)
3. **Boundaries** = 0, then add the block size each time, up to 256
4. **Network Address**: keep the Octets before, use the largest boundary ≤ the address's Octet, and set every Octet after to `0`
5. **Broadcast Address**: keep the Octets before, use the next boundary − 1, and set every Octet after to `255`

|                   | `192.168.1.200/26`  | `10.0.77.5/18`      | `172.20.5.9/12`            |
| ----------------- | ------------------- | ------------------- | -------------------------- |
| Octet             | 4th                 | 3rd                 | 2nd                        |
| `1`s / `0`s       | 26 − 24 = 2 / 6     | 18 − 16 = 2 / 6     | 12 − 8 = 4 / 4             |
| Block size        | 2⁶ = 64             | 2⁶ = 64             | 2⁴ = 16                    |
| Address's Octet   | 200                 | 77                  | 20                         |
| Boundaries        | 0, 64, 128, **192** | 0, **64**, 128, 192 | 0, **16**, 32, 48 …        |
| Network Address   | `192.168.1.192`     | `10.0.64.0`         | `172.16.0.0`               |
| Broadcast Address | `192.168.1.255`     | `10.0.127.255`      | `172.31.255.255`           |
| Addresses         | 64                  | 64 × 256 = 16,384   | 16 × 256 × 256 = 1,048,576 |

The block size is only the number of addresses when the Prefix ends in the 4th Octet. For every Octet after the one it ends in, multiply by 256.

### Why boundaries are multiples of the block size

A Network Address has every Host Part bit set to `0`. With 6 `0`s in the Octet, the last 6 bits are only all `0` at four values:

| Octet  | `0`         | `64`        | `128`       | `192`       |
| ------ | ----------- | ----------- | ----------- | ----------- |
| Binary | `00 000000` | `01 000000` | `10 000000` | `11 000000` |

So `192.168.1.60` and `192.168.1.70` are **not** on the same `/26` network: `.60` is in the `.0` block, and `.70` is in the `.64` block.

### From a mask

With a mask in place of a Prefix, the block size is `256 −` the **partial Octet**: the mask Octet that isn't `255` or `0`. This is called the **magic number**. For `255.255.192.0`, 256 − 192 = **64** in the 3rd Octet, the same as `/18`.

### Masks with no partial Octet

With `/8`, `/16`, `/24` or `/32`, the Prefix ends exactly at the end of an Octet, so there are no boundaries to find. Keep the Network Part Octets, then set the rest to `0` for the Network Address and `255` for the Broadcast Address. For `192.168.1.38`:

| Prefix | Mask              | Host Part     | Network Address | Broadcast Address |
| ------ | ----------------- | ------------- | --------------- | ----------------- |
| `/8`   | `255.0.0.0`       | Last 3 Octets | `192.0.0.0`     | `192.255.255.255` |
| `/16`  | `255.255.0.0`     | Last 2 Octets | `192.168.0.0`   | `192.168.255.255` |
| `/24`  | `255.255.255.0`   | Last Octet    | `192.168.1.0`   | `192.168.1.255`   |
| `/32`  | `255.255.255.255` | None          | `192.168.1.38`  | `192.168.1.38`    |

With `/32` there's no Host Part to change, so the network is just the one address.

![[Network Boundaries]]

---

## References

[^wiki-subnet]: [Wikipedia: Subnet](https://en.wikipedia.org/wiki/Subnet) — dividing a network into two or more networks is called subnetting
