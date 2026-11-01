Open System Interconnect Model
## Purpose

The OSI model's purpose is to distinguish between roles and responsibilities in computer network communication. It provides a hierarchical approach to understanding of the networking stack

### Terminology
 - **[[#Bit]]**: A representation of data/information in it's lowest form
 - **[[#Network Frame|Frame]]**: A wrapper around a **[[#Packet]]**
 - **[[#Packet]]**: A wrapper around a **[[#Segment]]**
 - **[[#Segment]]**: A wrapper around chunks of **[[#Data|application data]]**
 - **[[#Data]]**: The information an application sends, before any network headers are added
 - **[[#PDU (Protocol Data Unit)]]**: A way of representing individual layer units such as those in [[#PDU Hierarchy|Hierarchy]]  ^d95b46

### PDU Hierarchy
From lowest to highest on the [[#Structure]]
- Bit
- Frame
- Packet
- Segment
- Data

---

## Structure

The OSI Model separates networking into 7 distinct layers.

In most cases, Layer 4 to Layer 7 are collapsed into a single layer (Layer 7) and known colloquially as the Application Layer.

### 1. Physical Layer

The **Physical Layer** represents the transport of individual bits over a physical medium (such as copper, fiber, radio) on a network.

The **[[#^d95b46|PDU]]** for this layer is the [[#Bit]]. It is not aware of anything else

### 2. Data Link Layer

The **Data Link Layer** is responsible for organisation of individual bits (as the [[#1. Physical Layer]] would see them) into [[#Network Frame|Network Frames]].

The MAC header lives at this Layer

The **[[#^d95b46|PDU]]** for this layer is the **[[#Network Frame|Frame]]**
### 3. Network Layer

The **Network Layer** is responsible for routing packets between networks. The **Packet** specifically does not exist as a concept below this layer.

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
A **Bit** is the smallest unit of measurement of digital information in computing. It is a binary representation of data with It's purpose being to facilitate interaction with hardware logic gates. In networking this is usually implemented via an electrical, optical or radio signal.
### Network Frame
A Network Frame (commonly referred to as a **Frame**) is the **[[#^d95b46|PDU]]** that exists at the **[[#2. Data Link Layer|Data Link Layer]]**. It consists of a single header with information on the:
- Source MAC Address
- Destination MAC Address
As well as a payload consisting of a single **[[#Packet]]**
### Packet
A **Packet** is the **[[#^d95b46|PDU]]** that exists at the **[[#3. Network Layer|Network Layer]]**. It consists of a single header with information on the:
- Source IP Address
- Destination IP Address
As well as a payload consisting of a single **[[#Segment]]**
### Segment
A **Segment** is the **[[#^d95b46|PDU]]** that exists at the **[[#4. Transport Layer|Transport Layer]]**. It consists of a single header with information on the:
- Source Port
- Destination Port
As well as a payload consisting of a single chunk of **Data** from the **[[#7. Application Layer|Application Layer]]**

### Data
**Data** is the **[[#^d95b46|PDU]]** that exists at the **[[#7. Application Layer|Application Layer]]** (as well as the **[[#5. Session Layer|Session]]** and **[[#6. Presentation Layer|Presentation]]** layers). It is the actual message an application wants to send, such as a web page request or an email.

Unlike the other **[[#^d95b46|PDUs]]**, Data has no network header. Instead it consists of:
- Headers defined by the application protocol (such as HTTP, HTTPS, MQTT or SMTP)
- The message content itself

The lower layers never read inside Data. To them it is just a payload of bytes.

For example, a browser requesting a web page sends this as Data:
```
GET /index.html HTTP/1.1
Host: example.com
```
`GET /index.html` is the request and `Host` is an HTTP header. The browser and web server understand these, but the lower layers only see bytes. With HTTPS, these bytes are encrypted before they reach the **[[#4. Transport Layer|Transport Layer]]**, so the lower layers can't read them at all.

The **[[#4. Transport Layer|Transport Layer]]** splits Data into chunks and wraps each chunk in a **[[#Segment]]**.

---

## Encapsulation

**Encapsulation** is the process of each layer wrapping the **[[#^d95b46|PDU]]** from the layer above with its own header. The wrapped PDU becomes the payload of the new PDU.

When sending, the PDUs are built from the top layer down:
```
Data    = [HTTP request]
Segment = [TCP header | Data]
Packet  = [IP header  | TCP header | Data]
Frame   = [MAC header | IP header  | TCP header | Data]
```
The **[[#Network Frame|Frame]]** is then sent across the network as **[[#Bit|Bits]]** by the **[[#1. Physical Layer|Physical Layer]]**.

Each layer only reads its own header and treats everything inside it as payload. For example, a router reads the IP header of a **[[#Packet]]** to decide where to send it, but never reads the **[[#Segment]]** or **[[#Data]]** inside it.

### Decapsulation

On the receiving side the process runs in reverse. Each layer reads and removes its own header, then passes the payload up to the layer above, until the application receives the original **[[#Data]]**.

### Splitting

A **[[#Network Frame|Frame]]** can only carry a limited amount of data (1500 bytes for Ethernet), so the **[[#4. Transport Layer|Transport Layer]]** splits large Data into chunks, with one chunk per **[[#Segment]]**. Each Segment carries a sequence number so the receiver can put the chunks back in order.

Splitting is for size, not security. Anyone capturing the traffic can reassemble the chunks. Only encryption, such as HTTPS, stops the **[[#Data]]** from being read.