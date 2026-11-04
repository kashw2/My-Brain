The **Kernel** is the core of an [[Operating Systems|operating system]], the one program with full access to the hardware, which manages the CPU, memory and devices so everything else can share them safely. Strictly speaking, [[Linux]] itself is just a kernel.

---

## How it Works

**Kernel Space vs User Space**
The CPU has privilege levels. The kernel runs in privileged mode, apps run in user mode and can't touch hardware or another process's memory directly. If an app crashes only that app dies, if the kernel crashes (a **kernel panic**) the whole machine goes down.

**System Calls**
User space asks the kernel to do things through system calls like `open`, `read`, `write`, `fork` and `execve`. Libraries like glibc wrap them, so most code never calls them directly. `strace` shows every syscall a program makes, which is great for working out why something is failing.

**What it Manages**
Process scheduling, virtual memory, device drivers, filesystems and networking. On Linux the [[Transmission Control Protocol - TCPIP|TCP/IP]] stack lives in the kernel, so layers 3 and 4 of the [[OSI Model]] are handled here and apps just read and write sockets.

**Monolithic vs Microkernel**
Linux is **monolithic**: drivers, filesystems and the network stack all run in kernel space. It's fast, but a buggy driver can take everything down. **Microkernels** like seL4 or MINIX 3 move those into separate user space services for isolation. Windows NT and the XNU kernel in [[MacOS|macOS]] are usually called hybrids. Linux gets some flexibility back with **loadable modules**, which can be added and removed at runtime but still run in kernel space.

**Choosing a Kernel on NixOS**
`boot.kernelPackages` picks a whole package set, not just the kernel, because out of tree modules (like the NVIDIA driver) must be built against the exact same kernel. I run xanmod, a third party kernel build with extra patches and tuned defaults. Changing it is a normal rebuild that creates a new [[Generations|Generation]], so if a kernel won't boot I pick the previous entry in the boot menu.

---

## Examples

```bash
# Running kernel release and architecture
uname -r
uname -m

# Loaded modules, and info about one
lsmod
modinfo kvm

# Kernel log and the parameters it booted with
journalctl -k -b
cat /proc/cmdline

# Count the syscalls a command makes
strace -c ls
```

```nix
{ pkgs, ... }:
{
  boot.kernelPackages = pkgs.linuxPackages_xanmod_stable;
  boot.kernelParams = [ "quiet" ];
  boot.kernel.sysctl."kernel.sysrq" = 1;
}
```

---

### References

- [Linux Kernel Documentation](https://docs.kernel.org/)
- [NixOS Manual: Linux Kernel](https://nixos.org/manual/nixos/stable/#sec-kernel-config)
- [Wikipedia](https://en.wikipedia.org/wiki/Kernel_(operating_system))
