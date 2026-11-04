**UDP** (User Datagram Protocol) is a connectionless protocol at the Transport Layer of the [[OSI Model]]. It sends independent datagrams with no handshake, no delivery guarantee and no ordering, trading the reliability of [[Transmission Control Protocol - TCPIP|TCP]] for low overhead and latency.

---

## How it Works

**Fire and Forget**
There's no connection setup, each datagram is sent on its own. It might be lost, duplicated or arrive out of order and UDP won't notice or retry. If the application cares, it handles that itself.

**Tiny Header**
The header is just 8 bytes: source port, destination port, length and checksum. A TCP header is at least 20 bytes. Like a TCP Segment it gets wrapped in an IP Packet, see [[Encapsulation]].

**Message Boundaries**
TCP is a byte stream, UDP keeps boundaries. One send is one datagram, and it arrives whole or not at all, which makes request/response protocols simple.

**When Late is Useless**
UDP suits traffic where waiting for a retransmit is worse than losing data: voice and video calls, online games, and DNS lookups (one small question, one answer, just ask again if nothing comes back). DHCP, NTP and WireGuard all run over UDP.

**Building on Top**
Because UDP adds so little, it's a good base for protocols that want their own rules. QUIC (used by HTTP/3) builds reliability, encryption and multiple streams on UDP in user space, so it avoids TCP's head-of-line blocking and can evolve without [[Kernel]] changes.

**No Brakes**
UDP has no congestion control, so well behaved apps add their own. With no handshake the source address is easy to spoof, which is why open UDP services get abused as amplifiers in DDoS attacks.

---

## Examples

| | TCP | UDP |
| --- | --- | --- |
| Connection | Three-way handshake | None |
| Delivery | Guaranteed, retransmits | Best effort |
| Ordering | In order | None |
| Data | Byte stream | Datagrams |
| Header | 20 to 60 bytes | 8 bytes |
| Congestion control | Yes | No |
| Used by | HTTP/1.1, HTTP/2, SSH, SMTP | DNS, HTTP/3 (QUIC), VoIP, games, WireGuard |

```bash
# Open UDP sockets and which process owns them
ss -ulnp

# Send a datagram: listen in one terminal, send from another
# Use 127.0.0.1, localhost can resolve to ::1 and UDP won't tell you nothing is listening there
nc -u -l 9000
nc -u 127.0.0.1 9000

# A DNS lookup, normally a single UDP exchange on port 53
dig example.com
```

---

### References

- [RFC 768: User Datagram Protocol](https://www.rfc-editor.org/rfc/rfc768)
- [RFC 8085: UDP Usage Guidelines](https://www.rfc-editor.org/rfc/rfc8085)
- [Wikipedia](https://en.wikipedia.org/wiki/User_Datagram_Protocol)
