Open System Interconnect Model
## Purpose

The OSI model's purpose is to distinguish between roles and responsibilities in computer network communication. It provides a hierarchical approach to understanding of the [[Networking|networking]] stack

![[OSI Layers]]

### Terminology
 - **[[#Bit]]**: A representation of data/information in its lowest form
 - **[[#Network Frame|Frame]]**: A wrapper around a **[[#Packet]]**
 - **[[#Packet]]**: A wrapper around a **[[#Segment]]**
 - **[[#Segment]]**: A wrapper around chunks of **[[#Data|application data]]**
 - **[[#Data]]**: The information an application sends, before any network headers are added
 - **[[#PDU (Protocol Data Unit)]]**: A way of representing individual layer units such as those in [[#PDU Hierarchy|Hierarchy]]  ^d95b46
 - **[[#Encapsulation]]**: The process of each layer wrapping the **[[#^d95b46|PDU]]** from the layer above with its own header

### PDU Hierarchy
From lowest to highest on the [[#Structure]][^wiki-pdu]
- Bit
- Frame
- Packet
- Segment
- Data

When sending, **[[#Encapsulation]]** builds these in reverse order (Data → Bit). When receiving, **[[#Decapsulation]]** unwraps them in the order listed (Bit → Data).

---

## Structure

The OSI Model separates networking into 7 distinct layers.[^x200][^wiki-osi]

In most cases, Layer 4 to Layer 7 are collapsed into a single layer (Layer 7) and known colloquially as the Application Layer.

### 1. Physical Layer

The **Physical Layer** represents the transport of individual bits over a physical medium (such as copper, fiber, radio) on a network.

The **[[#^d95b46|PDU]]** for this layer is the [[#Bit]]. It is not aware of anything else

### 2. Data Link Layer

The **Data Link Layer** is responsible for organisation of individual bits (as the [[#1. Physical Layer]] would see them) into [[#Network Frame|Network Frames]].

The MAC header lives at this Layer

The **[[#^d95b46|PDU]]** for this layer is the **[[#Network Frame|Frame]]**
### 3. Network Layer

The **Network Layer** is responsible for [[Routing|routing]] packets between networks. The **Packet** specifically does not exist as a concept below this layer.

The **[[#^d95b46|PDU]]** for this layer is the **[[#Packet]]**

### 4. Transport Layer

The **Transport Layer** implements various lower level transport protocols such as [[Transmission Control Protocol - TCPIP|TCP]] and [[UDP]]. It is responsible the transport of data via **Segments** from a source to an application on the host via an address and a port.

The **[[#^d95b46|PDU]]** for this layer is the **[[#Segment]]**

### 5. Session Layer

### 6. Presentation Layer

### 7. Application Layer

The **Application Layer** operates with higher level client networking protocols such as HTTP, HTTPS, FTP, SMTP, SSH.

The responsibility of this layer is to provide data for the lower layers.

The **[[#^d95b46|PDU]]** for this layer is **[[#Data]]**

---

## PDU (Protocol Data Unit)
### Bit
A **Bit** is the smallest unit of measurement of digital information in computing. It is a binary representation of data with its purpose being to facilitate interaction with hardware logic gates. In networking this is usually implemented via an electrical, optical or radio signal.
### Network Frame
A Network Frame (commonly referred to as a **Frame**) is the **[[#^d95b46|PDU]]** that exists at the **[[#2. Data Link Layer|Data Link Layer]]**. It consists of a single header with information on the:
- Source MAC Address
- Destination MAC Address[^wiki-eth]
As well as a payload consisting of a single **[[#Packet]]**
### Packet
A **Packet** is the **[[#^d95b46|PDU]]** that exists at the **[[#3. Network Layer|Network Layer]]**. It consists of a single header with information on the:
- Source IP Address
- Destination IP Address[^rfc791]
As well as a payload consisting of a single **[[#Segment]]**
### Segment
A **Segment** is the **[[#^d95b46|PDU]]** that exists at the **[[#4. Transport Layer|Transport Layer]]**. It consists of a single header with information on the:
- Source Port
- Destination Port[^rfc9293]
As well as a payload consisting of a single chunk of **Data** from the **[[#7. Application Layer|Application Layer]]**
### Data
**Data** is the **[[#^d95b46|PDU]]** that exists at the **[[#7. Application Layer|Application Layer]]** (as well as the **[[#5. Session Layer|Session]]** and **[[#6. Presentation Layer|Presentation]]** layers). It is the actual message an application wants to send, such as a web page request or an email.

Unlike the other **[[#^d95b46|PDUs]]**, Data has no network header. Instead it consists of:
- Headers defined by the application protocol (such as HTTP, HTTPS, MQTT[^mqtt] or SMTP[^rfc5321])
- The message content itself

The lower layers never read inside Data. To them it is just a payload of bytes.

For example, a browser requesting a web page sends this as Data:
```
GET /index.html HTTP/1.1
Host: example.com
```
`GET /index.html` is the request and `Host` is an HTTP header.[^rfc9112] The browser and web server understand these, but the lower layers only see bytes. With HTTPS, these bytes are encrypted before they reach the **[[#4. Transport Layer|Transport Layer]]**[^rfc9110][^mdn-https], so the lower layers can't read them at all.[^rfc9846]

The **[[#4. Transport Layer|Transport Layer]]** splits Data into chunks and wraps each chunk in a **[[#Segment]]**.

---

## Encapsulation

**Encapsulation** is the process of each layer wrapping the **[[#^d95b46|PDU]]** from the layer above with its own header. The wrapped PDU becomes the payload of the new PDU.[^x200][^wiki-encap]

When sending, the PDUs are built from the top layer down:

```
Data    = [HTTP request]
Segment = [TCP header | Data]
Packet  = [IP header  | TCP header | Data]
Frame   = [MAC header | IP header  | TCP header | Data]
```

The **[[#Network Frame|Frame]]** is then sent across the network as **[[#Bit|Bits]]** by the **[[#1. Physical Layer|Physical Layer]]**.

![[Encapsulation]]

Each layer only reads its own header and treats everything inside it as payload. For example, a router reads the IP header of a **[[#Packet]]** to decide where to send it[^rfc1812], but never reads the **[[#Segment]]** or **[[#Data]]** inside it.

An example of **Encapsulation** in action is:

A email being sent:
```
Data = [SMTP request]
Segment = [TCP header | Data]
Packet = [IP header | TCP header | Data]
Frame = [MAC header | IP header | TCP header | Data]
```

The email client makes a request via the SMTP **Application Layer** protocol, from there it is wrapped in a **Segment** which includes the port (587[^rfc6409] or 465[^rfc8314] when an email client sends to its mail server, 2525 as an alternative some providers accept[^sendgrid], and 25 between mail servers[^rfc5321][^rfc6409]), which is then wrapped in a **Packet** which provides a router the host information (IP address) to send to a host a **Frame** then wraps the **Packet** and provides its own MAC header to direct it to a physical machine

### Decapsulation

On the receiving side the process runs in reverse. Each layer reads and removes its own header, then passes the payload up to the layer above, until the application receives the original **[[#Data]]**.[^wiki-encap]

---

## References

[^wiki-pdu]: [Wikipedia: Protocol data unit](https://en.wikipedia.org/wiki/Protocol_data_unit) — the PDU names bit, frame, packet and segment
[^x200]: [ITU-T X.200: OSI Basic Reference Model (identical to ISO/IEC 7498-1)](https://www.itu.int/rec/T-REC-X.200-199407-I/en) — the seven layers (§6.1.2, §7), and each layer's PDU being its own control information plus the user data from the layer above (§5.6.1)
[^wiki-osi]: [Wikipedia: OSI model](https://en.wikipedia.org/wiki/OSI_model) — what each layer does, including encryption at the Presentation Layer in the OSI Layers diagram
[^wiki-eth]: [Wikipedia: Ethernet frame](https://en.wikipedia.org/wiki/Ethernet_frame) — the Frame header holds the destination and source MAC addresses
[^rfc791]: [RFC 791: Internet Protocol](https://www.rfc-editor.org/rfc/rfc791#section-3.1) — the Packet header holds the source and destination IP addresses
[^rfc9293]: [RFC 9293: Transmission Control Protocol (TCP)](https://www.rfc-editor.org/rfc/rfc9293#section-3.1) — the Segment header holds the source and destination ports
[^mqtt]: [MQTT Version 5.0 (OASIS Standard)](https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html) — MQTT is an application protocol that runs over TCP/IP
[^rfc5321]: [RFC 5321: Simple Mail Transfer Protocol](https://www.rfc-editor.org/rfc/rfc5321#section-4.5.4.2) — SMTP and port 25
[^rfc9112]: [RFC 9112: HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112#section-3) — the request line and Host header in the HTTP example (§3, §3.2)
[^rfc9110]: [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110#section-4.2.2) — HTTPS is HTTP secured with TLS
[^mdn-https]: [MDN: HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS) — HTTPS uses TLS to encrypt all communication between client and server
[^rfc9846]: [RFC 9846: The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc9846#section-1) — data sent over TLS is only visible to the two endpoints
[^wiki-encap]: [Wikipedia: Encapsulation (networking)](https://en.wikipedia.org/wiki/Encapsulation_(networking)) — Encapsulation and Decapsulation
[^rfc1812]: [RFC 1812: Requirements for IP Version 4 Routers](https://www.rfc-editor.org/rfc/rfc1812#section-5.2.4.3) — routers choose where to send a Packet using its destination IP address
[^rfc6409]: [RFC 6409: Message Submission for Mail](https://www.rfc-editor.org/rfc/rfc6409#section-3.1) — mail clients submit on port 587, while relay between servers stays on port 25
[^rfc8314]: [RFC 8314: Cleartext Considered Obsolete](https://www.rfc-editor.org/rfc/rfc8314#section-3.3) — port 465 for submission over TLS
[^sendgrid]: [Twilio SendGrid: Integrating with the SMTP API](https://www.twilio.com/docs/sendgrid/for-developers/sending-email/integrating-with-the-smtp-api) — mail providers also accept port 2525
