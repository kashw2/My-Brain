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

Go left to right through the **[[#Bit Value|Bit Values]]**, and at each bit subtract its value from what's left of the number:
 - **It works** (the answer is `0` or more): write `1`, and the answer is what's left for the next bit
 - **Too big** (the answer would go below `0`): write `0`, and what's left stays the same

For `38`, the last **[[IP Address#Structure|Octet]]** of the **[[IP Address]]** `192.168.1.38`:

![[Converting to Binary|700]]

Reading the Bit row from left to right gives `00100110`.
 - An answer of exactly `0` still works, so the bit is `1` (2 − 2 = 0)
 - An Octet is always 8 bits, so write all 8, including the leading `0`s

Adding up the Bit Values that have a `1` does two jobs:
 - **Verify a result**: the sum should match the number you started with: 32 + 4 + 2 = **38**
 - **Convert bits to decimal**: the sum is the number the bits represent[^wiki-binary]

---

## References

[^wiki-binary]: [Wikipedia: Binary number](https://en.wikipedia.org/wiki/Binary_number) — binary uses only two symbols, `0` and `1`, each digit is a bit, and almost all modern computers use it (intro), and the rightmost bit is worth 1 with each bit to its left worth double, and a number's value is the sum of the bits that have a `1` (Binary counting)
