**TCP/IP** is the protocol suite the internet runs on, named after its two core protocols: the **Transmission Control Protocol (TCP)**, a reliable, connection-oriented protocol at the Transport Layer of the [[OSI Model]], and the **Internet Protocol (IP)** at the Network Layer, which handles addressing and [[Routing]]. Its lightweight sibling at the Transport Layer is [[UDP]].

---

## How it Works

**Two Halves**
IP gets a Packet to the right host on a best effort basis: packets can be dropped, duplicated or arrive out of order. TCP sits on top and gets bytes to the right application (identified by a port) reliably and in order. Every TCP Segment is wrapped in an IP Packet, see [[Encapsulation]].

**Three-way Handshake**
Before any data is sent the client sends `SYN`, the server replies `SYN-ACK` and the client answers `ACK`. Both sides agree on starting sequence numbers, and it costs a full round trip, which is why reusing connections (HTTP keep-alive, connection pools for [[PostgreSQL]]) matters so much for latency.

**Reliability**
Every byte has a sequence number and the receiver acknowledges what it has received. Anything not acknowledged in time is retransmitted, and the receiver reassembles everything in order. Apps see a continuous **byte stream** with no message boundaries, so protocols on top have to frame their own messages.

**Flow and Congestion Control**
The receiver advertises a window of how much it can buffer, so a fast sender can't overwhelm it. Congestion control makes the sender back off when the network is losing packets. Mainline Linux defaults to the CUBIC algorithm, my xanmod [[Kernel]] reports `bbr`.

**Head-of-line Blocking**
Because delivery is strictly in order, one lost Segment stalls everything behind it until it's retransmitted. That's part of why HTTP/3 moved to QUIC, which runs over [[UDP]] and handles reliability per stream.

**The TCP/IP Model**
TCP/IP has its own four layer model, which is what's actually implemented. The [[OSI Model]] (see [[OSI Layers]]) is the more detailed teaching model, and they map like the table below.

---

## Examples

| TCP/IP Layer | OSI Layers | Examples |
| --- | --- | --- |
| Application | 5 to 7 | HTTP, SSH, DNS, SMTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP |
| Link | 1 and 2 | Ethernet, Wi-Fi |

```bash
# Listening TCP sockets and which process owns them
ss -tlnp

# Established connections
ss -tn state established

# Raw TCP chat: listen in one terminal, connect from another
nc -l 9000
nc localhost 9000

# See the connection (and the TLS handshake on top of it) from the client's side
curl -v https://example.com

# Which congestion control algorithm the kernel is using
sysctl net.ipv4.tcp_congestion_control
```

---

### References

- [RFC 9293: Transmission Control Protocol](https://www.rfc-editor.org/rfc/rfc9293)
- [RFC 1122: Requirements for Internet Hosts](https://www.rfc-editor.org/rfc/rfc1122)
- [Wikipedia](https://en.wikipedia.org/wiki/Internet_protocol_suite)
