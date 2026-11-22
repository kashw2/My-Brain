## Terminology
 - **[[#Switch]]**: A device that connects devices on the same local network and forwards **[[OSI Model#Network Frame|Frames]]** between them using MAC addresses[^wiki-switch]
 - **[[#MAC Address]]**: A 48-bit address that identifies a network interface, written as six pairs of hexadecimal digits such as `AA:AA:AA:AA:AA:AA`[^wiki-mac]
 - **[[#MAC Address Table]]**: The switch's list of which port each MAC address is reachable through[^wiki-bridge]
 - **[[#Flooding]]**: Sending a Frame out of every port except the one it arrived on[^wiki-bridge]
 - **[[#VLAN]]**: A separate local network created on a switch, isolated from the others at **[[OSI Model#2. Data Link Layer|Layer 2]]**[^wiki-vlan]
 - **[[#Trunk]]**: A single link that carries Frames for several VLANs, with each Frame tagged with its VLAN (802.1Q)[^wiki-vlan][^wiki-dot1q]
 - **[[#Spanning Tree]]**: A protocol that blocks redundant links between switches so Frames can't loop[^wiki-stp]
 - **[[#EtherChannel]]**: Several physical links between two devices grouped into one logical link[^wiki-etherchannel]

---

## MAC Address Table

A **[[#Switch]]** keeps a **MAC Address Table** that records which port each MAC address is reachable through.[^wiki-bridge]

| MAC Address         | Port | Device               |
| ------------------- | ---- | -------------------- |
| `AA:AA:AA:AA:AA:AA` | 1    | PC                   |
| `CC:CC:CC:CC:CC:CC` | 2    | Printer              |
| `EE:EE:EE:EE:EE:EE` | 3    | Home router          |
| `22:22:22:22:22:22` | 4    | Laptop, via Switch 2 |
| `44:44:44:44:44:44` | 4    | Server, via Switch 2 |

The mapping isn't 1:1, it's many-to-one. One port can have many MAC addresses, which is common when the port connects to another switch, but each MAC address is only on one port.[^ciscopress-mac-table] In the table above, port 4 connects to Switch 2, so both devices on Switch 2 are reachable through port 4.

---

## References

[^wiki-switch]: [Wikipedia: Network switch](https://en.wikipedia.org/wiki/Network_switch) — a switch connects devices on a network, works at Layer 2, and learns the MAC addresses of connected devices so it only forwards data to the port of the destination device
[^wiki-mac]: [Wikipedia: MAC address](https://en.wikipedia.org/wiki/MAC_address) — MAC addresses are 48 bits, identify a network interface, and are written as six groups of two hexadecimal digits
[^wiki-bridge]: [Wikipedia: Bridging (networking)](https://en.wikipedia.org/wiki/Bridging_(networking)#Transparent_bridging) — the table records which port each address is reachable through, and an unknown destination is flooded to every port except the one it came in on
[^wiki-vlan]: [Wikipedia: VLAN](https://en.wikipedia.org/wiki/VLAN) — a VLAN is a broadcast domain partitioned and isolated at Layer 2, and VLAN tagging lets a single trunk carry data for multiple VLANs
[^wiki-dot1q]: [Wikipedia: IEEE 802.1Q](https://en.wikipedia.org/wiki/IEEE_802.1Q) — 802.1Q adds a tag to each Frame to show which VLAN it belongs to
[^wiki-stp]: [Wikipedia: Spanning Tree Protocol](https://en.wikipedia.org/wiki/Spanning_Tree_Protocol) — STP blocks ports on redundant links between switches to build a loop-free topology
[^wiki-etherchannel]: [Wikipedia: EtherChannel](https://en.wikipedia.org/wiki/EtherChannel) — EtherChannel groups several physical Ethernet links into one logical link
[^ciscopress-mac-table]: [Cisco Press: The MAC Address Table (7.3)](https://www.ciscopress.com/articles/article.asp?p=3089352&seqNum=6) — one port can have many MAC addresses, which is common when it connects to another switch (7.3.4), and a MAC address that turns up on a different port has its entry replaced, so each MAC address is only on one port (7.3.2)