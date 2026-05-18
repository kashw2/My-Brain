Open System Interconnect Model

## Purpose

The OSI model's purpose is to distinguish between roles and responsibilities in computer network communication. It provides a hierarchical approach to understanding of the networking stack

### Hierarchy
From lowest to highest on the [[#Structure]]
- Bit
- Frame
- Packet
- Segment ^1c4a4d
- Data

## Structure

The OSI Model separates networking into 7 distinct layers.

In most cases, Layer 4 to Layer 7 are collapsed into a single layer (Layer 7) and known colloquially as the Application Layer.

### 1. Physical Layer

The **Physical Layer** represents the transport of individual bits over a physical medium (such as copper, fiber, radio) on a network.

This layer is not aware of anything other than individual bits.

### 2. Data Link Layer

The **Data Link Layer** is responsible for organisation of individual bits (as the [[#1. Physical Layer]] would see them) into [[#Network Frames]].

The MAC header lives at this Layer
### 3. Network Layer

The **Network Layer** is responsible for routing packets between networks. The packet specifically does not exist as a concept below this layer.

### 4. Transport Layer

The **Transport Layer** implements various lower level transport protocols such as TCP and UDP. It is responsible for the transport of packets between nodes.

This layer is where the **Segment** exists

### 5. Session Layer

### 6. Presentation Layer

### 7. Application Layer

The **Application Layer** operates with higher level client networking protocols such as HTTP, HTTPS, FTP, SMTP, SSH.

The responsibility of this layer is to provide data for the lower layers.

## Network Frames

Network Frames or as they are more commonly referred to as **Frames** make up the payload from [[#3. Network Layer]] and above. A single **Frame** includes headers like:
- The MAC Header ([[#2. Data Link Layer]])
- Embedded upper layer headers such as:
	- IP Header [[#3. Network Layer]]
	- TCP/UDP Header [[#4. Transport Layer]]
	- Data [[#7. Application Layer]]