A self-test for **[[IP Address#Subnet Mask|Subnet Masks]]**. Reveal the answers with the fold-out callout at the bottom.

## Questions

### Mask ↔ Prefix
1. Write `/27` as a dotted-decimal subnet mask.
2. What prefix is `255.255.255.240`?
3. What prefix is `255.255.0.0`?

### Valid mask?
4. Is `255.255.240.255` a valid subnet mask? Why or why not?
5. Is `255.255.255.254` valid? If so, what prefix is it and how many addresses does it hold?

### The formula (`256 − 2^(0s)`)
6. A mask Octet has **7** `1`s. What's its value?
7. A mask Octet is `252`. How many `1`s and `0`s?

### Address & host counts
8. How many **total** addresses and how many **usable hosts** in a `/28`?
9. How many usable hosts in a `/30`?
10. You need **30 usable hosts** on a network. What is the smallest prefix that fits?

### Network / broadcast addresses
11. `172.16.20.75` with `255.255.255.240` — give the network address and the broadcast address.
12. `192.168.1.200` with `/26` — network and broadcast?

### Same network?
13. Are `10.1.1.60` and `10.1.1.70` on the same network with a `/26` mask?

### Watch the caveat
14. `255.255.252.0` — what prefix is it, and how many total addresses does the network hold? (Does the last-Octet `2^(0s)` shortcut apply?)

---

> [!tip]- Answers (click to reveal)
> 1. **`255.255.255.224`** — `/27` = 27 `1`s, last Octet `11100000` = 224.
> 2. **`/28`** — 256 − 240 = 16 = 2⁴ → 4 `0`s → 8 − 4 = 4 `1`s in the last Octet, 24 + 4 = 28.
> 3. **`/16`** — two full Octets of `1`s.
> 4. **No.** The `1`s must be contiguous from the left. `240` then `255` puts `0`s *before* `1`s (`...11110000.11111111`), which isn't allowed.
> 5. **Yes — `/31`, 2 addresses.** 256 − 254 = 2 = 2¹ → 1 `0`, 7 `1`s → 24 + 7 = 31. (A `/31` is the point-to-point special case with no network/broadcast reserved.)
> 6. **`254`** — 7 `1`s → 1 `0` → 256 − 2¹ = 254.
> 7. **6 `1`s, 2 `0`s** — 256 − 252 = 4 = 2² → 2 `0`s, so 6 `1`s.
> 8. **16 total, 14 usable** — 2^(32 − 28) = 2⁴ = 16; minus the network + broadcast addresses = 14.
> 9. **2 usable** — `/30` = 4 total − 2 = 2.
> 10. **`/27`** — need ≥ 32 total to cover 30 usable (32 − 2 = 30). `/27` = 32 addresses; `/28` = 16 would only give 14.
> 11. **Network `172.16.20.64`, broadcast `172.16.20.79`** — `.240` is `/28`, block size 16 → boundaries .64/.80; `75` falls in 64–79.
> 12. **Network `192.168.1.192`, broadcast `192.168.1.255`** — `/26`, block size 64 → `200` falls in 192–255.
> 13. **No** — `/26` block size 64: `.60` is in 0–63 (network `.0`), `.70` is in 64–127 (network `.64`). Different networks.
> 14. **`/22`, 1,024 total addresses.** Third Octet `252` = 6 `1`s → 16 + 6 = 22. The shortcut does **not** apply — the split is in the *third* Octet, so use the **[[IP Address#Prefix|Prefix]]** formula: 2^(32 − 22) = 2¹⁰ = 1,024.
