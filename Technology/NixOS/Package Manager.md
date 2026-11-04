A **Package Manager** installs, upgrades and removes software along with its dependencies. The **Nix Package Manager** does this differently from most: every package is built from a [[Derivation]] into its own immutable path in the [[Nix Store]], so versions never overwrite each other and every change can be rolled back.

---

## How it Works

**What a Package Manager Does**
It fetches packages from a repository, resolves their dependencies, puts the files where the system expects them (`/usr/bin`, `/usr/lib`) and tracks what's installed so it can upgrade or remove cleanly. `pacman` on [[Arch]], `apt` on Debian and Ubuntu, `brew` on [[MacOS|macOS]] and `winget` on [[Windows]] all work this way.

**The Traditional Problem**
There's one global `/usr` with one version of each library. Upgrading a library for one app upgrades it for everything, and two apps needing different versions is "dependency hell". Upgrades overwrite files in place, so an interrupted or bad upgrade can leave a half broken system with no easy way back.

**Hashed Store Paths**
Nix puts every package at `/nix/store/<hash>-name-version`, where the hash covers all of its inputs. Programs refer to their dependencies by exact store path rather than looking in `/usr/lib`, so many versions sit side by side and a package always gets exactly what it was built with.

**Source Based, Binary Backed**
Conceptually every package is built from source by a [[Derivation]], like a [[Pure]] function of its inputs. Because the hash identifies the exact output, Nix can download it from a [[Binary Cache]] instead, so in practice you rarely compile anything.

**Atomic Upgrades and Rollbacks**
Installing builds a new profile next to the old one and switches a symlink. Each switch is a new [[Generations|Generation]], rolling back just points at an older one, and paths nothing uses anymore are cleaned up by [[Nix Garbage Collection]].

**Declarative**
On [[NixOS]] and with [[Home Manager]] the package list is code in your config, built from [[NixPkgs]]. `nix profile` gives you the imperative style too, and [[Nix Shell]] lets you use a package without installing it at all.

---

## Examples

| Task | pacman | apt | brew | winget | Nix |
| --- | --- | --- | --- | --- | --- |
| Install | `pacman -S pkg` | `apt install pkg` | `brew install pkg` | `winget install pkg` | `nix profile add nixpkgs#pkg` |
| Search | `pacman -Ss pkg` | `apt search pkg` | `brew search pkg` | `winget search pkg` | `nix search nixpkgs pkg` |
| Upgrade all | `pacman -Syu` | `apt update && apt upgrade` | `brew upgrade` | `winget upgrade --all` | `nix profile upgrade --all` |
| Remove | `pacman -Rns pkg` | `apt remove pkg` | `brew uninstall pkg` | `winget uninstall pkg` | `nix profile remove pkg` |
| Roll back | Manual | Manual | Manual | Manual | `nix profile rollback` |

```bash
# Use a package once without installing it
nix shell nixpkgs#cowsay --command cowsay hello

# Where an installed command really lives
readlink -f $(which nu)
```

```nix
{ pkgs, ... }:
{
  # Declarative: rebuild and these are installed, remove a line and they're gone
  environment.systemPackages = with pkgs; [
    git
    ripgrep
  ];
}
```

---

### References

- [Nix Manual](https://nix.dev/manual/nix/stable/)
- [Eelco Dolstra: The Purely Functional Software Deployment Model](https://edolstra.github.io/pubs/phd-thesis.pdf)
- [Wikipedia](https://en.wikipedia.org/wiki/Package_manager)
