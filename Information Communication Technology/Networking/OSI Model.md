Open System Interconnect Model

## Purpose

The OSI model's purpose is to distinguish between roles and responsibilities in computer network communication. It provides a hierarchical approach to understanding of the networking stack

## Terminology
 - **Bit**: A representation of data/information in it's lowest form
 - [[#Network Frames|Frame]]: A wrapper around a **Packet**
 - **Packet**: A wrapper around a **Segment**
 - **Segment**: A wrapper around application data
 - **PDU (Protocol Data Unit)**: A way of representing individual layer units such as those in [[#Hierarchy]] 

### Hierarchy
From lowest to highest on the [[#Structure]]
- Bit
- Frame
- Packet
- Segment
- Data

## Structure

The OSI Model separates networking into 7 distinct layers.

In most cases, Layer 4 to Layer 7 are collapsed into a single layer (Layer 7) and known colloquially as the Application Layer.

### 1. Physical Layer

The **Physical Layer** represents the transport of individual bits over a physical medium (such as copper, fiber, radio) on a network.

The **PDU** for this layer is the [[#Bit]]. It is not aware of anything else

### 2. Data Link Layer

The **Data Link Layer** is responsible for organisation of individual bits (as the [[#1. Physical Layer]] would see them) into [[#Network Frames]].

The MAC header lives at this Layer

The **PDU** for this layer is the **[[#Network Frames|Frame]]**
### 3. Network Layer

The **Network Layer** is responsible for routing packets between networks. The **Packet** specifically does not exist as a concept below this layer.

The **PDU** for this layer is the **[[#Packet]]**

### 4. Transport Layer

The **Transport Layer** implements various lower level transport protocols such as TCP and UDP. It is responsible the transport of data via **Segments** from a source to an application on the host via an address and a port.

The **PDU** for this layer is the **[[#Segment]]**

### 5. Session Layer

### 6. Presentation Layer

### 7. Application Layer

The **Application Layer** operates with higher level client networking protocols such as HTTP, HTTPS, FTP, SMTP, SSH.

The responsibility of this layer is to provide data for the lower layers.

The **PDU** for this layer is **[[#Data]]**

## Bit

A **Bit** is the smallest unit of measurement of digital information in computing. It is a binary representation of data with It's purpose being to facilitate interaction with hardware logic gates. In networking this is usually implemented via an electrical, optical or radio signal.

A **Bit** consists of exactly one **[[#Network Frames|Frame]]** 
## Network Frames

Network Frames or as they are more commonly referred to as **Frames** make up the payload from [[#3. Network Layer]] and above. A single **Frame** can include headers like:
- The MAC Header ([[#2. Data Link Layer]])
- Embedded upper layer headers such as:
	- IP Header [[#3. Network Layer]]
	- TCP/UDP Header [[#4. Transport Layer]]
	- Data [[#7. Application Layer]]

A **Frame** contains exactly one **[[#Packet]]**

## Packet
A **Packet** is made up of a sender and receivers IP address as well as a [[#Segment]]

A **Packet** contains exactly one **[[#Segment]]**

As the packet exists at the **[[#3. Network Layer|Network Layer]]** it itself contains a single header with information about the IP address it is delivering data to

## Segment
A **Segment** is made up of data from the [[#7. Application Layer]].

As a **Segment** exists at the **[[#4. Transport Layer|Transport Layer]]** it itself contains a single TCP or UDP header with information about the port in which it is transporting data to.