Base-2 Numeral System
## Purpose

**Binary** writes numbers using only two digits, `0` and `1`.[^wiki-binary] Almost all computers use it.[^wiki-binary]

### Terminology
 - **[[#Binary]]**: Writing numbers using only two digits, `0` and `1`[^wiki-binary]
 - **[[#Bit]]**: One binary digit, either `0` or `1`[^wiki-binary]
 - **[[#Bit Value]]**: What a `1` in that position adds to the number. Each one doubles from right to left[^wiki-binary]

---

## Bit Value

Every bit has a **Bit Value**: what a `1` in that position adds to the number. The rightmost bit is worth 1, and each bit to its left is worth double.[^wiki-binary] For 8 bits:

| Bit value | 128 | 64  | 32  | 16  | 8   | 4   | 2   | 1   |
| --------- | --- | --- | --- | --- | --- | --- | --- | --- |

A binary number's value is the Bit Values that have a `1` added together.[^wiki-binary] A `0` adds nothing.

---

## Converting to Binary

Go left to right through the **[[#Bit Value|Bit Values]]**, and at each bit ask whether its value fits into what's left of the number:
 - **Yes**: write `1` and subtract the value
 - **No**: write `0` and move on

For `38`, the last **[[IP Address#Structure|Octet]]** of the **[[IP Address]]** `192.168.1.38`:

| Bit value | Fits into what's left? | Bit | Left after  |
| --------- | ---------------------- | --- | ----------- |
| 128       | 38: no                 | `0` | 38          |
| 64        | 38: no                 | `0` | 38          |
| 32        | 38: yes                | `1` | 38 − 32 = 6 |
| 16        | 6: no                  | `0` | 6           |
| 8         | 6: no                  | `0` | 6           |
| 4         | 6: yes                 | `1` | 6 − 4 = 2   |
| 2         | 2: yes                 | `1` | 2 − 2 = 0   |
| 1         | 0: no                  | `0` | 0           |

Reading the Bit column from top to bottom gives `00100110`.
 - The bit is `1` whenever the value fits, even when nothing is left after subtracting
 - An Octet is always 8 bits, so write all 8, including the leading `0`s

To check, or to convert back, add up the Bit Values that have a `1`: 32 + 4 + 2 = **38**.[^wiki-binary]

---

## References

[^wiki-binary]: [Wikipedia: Binary number](https://en.wikipedia.org/wiki/Binary_number) — binary uses only two symbols, `0` and `1`, each digit is a bit, and almost all modern computers use it (intro), and the rightmost bit is worth 1 with each bit to its left worth double, and a number's value is the sum of the bits that have a `1` (Binary counting)
