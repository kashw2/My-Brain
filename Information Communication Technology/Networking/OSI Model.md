Open System Interconnect Model

## Purpose

The OSI model's purpose is to distinguish between roles and responsibilities in computer network communication. It provides a hierarchical approach to understanding of the networking stack

## Structure

The OSI Model separates networking into 7 distinct layers.

In most cases, Layer 4 to Layer 7 are collapsed into a single layer (Layer 7) and known colloquially as the Application Layer.

### 1. Physical Layer

The **Physical Layer** represents the transport of individual bits over a physical medium (such as copper, fiber, radio) on a network

### 2. Data Link Layer

The **Data Link Layer** is responsible for organisation of individual bits in the [[#1. Physical Layer]] and organising them into [[#Frames]].

### 3. Network Layer

The **Network Layer** is responsible for routing packets between networks. The packet specifically does not exist as a concept below this layer.

### 4. Transport Layer

The **Transport Layer** implements various lower level transport protocols such as TCP and UDP. It is responsible for the transport of packets between nodes.

### 5. Session Layer

### 6. Presentation Layer

### 7. Application Layer

The **Application Layer** operates with higher level client networking protocols such as HTTP, HTTPS, FTP, SMTP, SSH.

The responsibility of this layer is to provide data for the lower layers.

## Network Frames

Network Frames or as they are more commonly referred to as **Frames** make up individual segments of a packet such as the:
- MAC header [[#1. Physical Layer]]
- IP header [[#3. Network Layer]]
- TCP header [[#4. Network Layer]]
- HTTP header [[#7. Application Layer]]
- Data