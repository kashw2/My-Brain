**macOS** is Apple's [[Operating Systems|operating system]] for Mac computers. Under the GUI it's a certified [[Unix]], built on Darwin, an open source core with the XNU [[Kernel|kernel]].

---

## How it Works

**Darwin and XNU**
Darwin is the open source foundation (kernel, drivers, core userland) that macOS and iOS share. Its kernel, XNU, is a hybrid of the Mach microkernel and code from FreeBSD. Apple's GUI, frameworks and apps sit on top and are closed source.

**A Real Unix**
Most releases since Mac OS X Leopard have been certified UNIX 03 by The Open Group, so unlike [[Linux]] it can legally call itself Unix. The default shell is `zsh` and the terminal feels familiar, but the userland is BSD flavoured, so tools like `sed`, `ls` and `date` take different flags to the GNU versions. `sed -i` needing an empty `''` argument is the classic gotcha when sharing scripts.

**Apple Silicon**
Macs moved from Intel to Apple's own ARM chips starting in 2020. Rosetta 2 translates x86_64 apps. In [[Nix]] terms the system is `aarch64-darwin` (or `x86_64-darwin` on Intel Macs).

**Locked Down System**
System Integrity Protection stops even root from modifying system directories, and the system volume is read-only. That's why the Nix installer creates a separate APFS volume for `/nix` on a Mac, it can't just create a directory at the root.

**Package Management**
There's the App Store for GUI apps but no built-in [[Package Manager|package manager]] for command line tools. Homebrew fills that gap. Nix also works on macOS, with nix-darwin doing for macOS what [[NixOS Modules]] do for NixOS, and [[Home Manager]] working the same as on Linux.

---

## Examples

```bash
# macOS version, and the Darwin kernel underneath
sw_vers
uname -a

# Install Apple's command line developer tools (git, clang, make)
xcode-select --install

# Homebrew
brew install nushell
brew upgrade
brew list
brew uninstall nushell
```

---

### References

- [XNU source](https://github.com/apple-oss-distributions/xnu)
- [Homebrew Documentation](https://docs.brew.sh/)
- [Wikipedia](https://en.wikipedia.org/wiki/MacOS)
