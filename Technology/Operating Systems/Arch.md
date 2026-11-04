**Arch Linux** is a minimal, rolling release [[Linux]] distribution. You start from a bare base system and add only what you want, using its [[Package Manager|package manager]] `pacman`.

---

## How it Works

**Rolling Release**
There are no numbered releases to jump between like on Ubuntu or Fedora. Packages are updated continuously and `pacman -Syu` brings the whole system up to date. You get new software quickly, the trade off is that an update occasionally needs manual steps, so it's worth checking the [news page](https://archlinux.org/news/) before a big upgrade. Partial upgrades (syncing the repos then installing one package without upgrading the rest) aren't supported and are a classic way to break things.

**pacman**
Installs pre-built binary packages from the official repos (`core`, `extra`, `multilib`), resolves dependencies and puts files in the usual places like `/usr/bin` and `/usr/lib`. There's one version of each library on the system and upgrades overwrite files in place, which is the traditional model the [[Package Manager|Nix Package Manager]] was designed to avoid.

**The AUR**
The Arch User Repository is community maintained build scripts (`PKGBUILD`s), not binaries. `makepkg` builds and packages them locally, helpers like `yay` or `paru` automate it. It's not officially supported, so read the `PKGBUILD` before building. A `PKGBUILD` is loosely like a [[Derivation]], but without hashed inputs or a sandbox by default.

**Do it Yourself**
The classic install is done by hand from a live USB (there's an `archinstall` script now too). Configuration lives in plain text files under `/etc` that you edit directly. Nothing is hidden, which makes it a great way to learn how a Linux system fits together.

**Arch vs NixOS**
Both are minimal and up to date, but Arch is imperative: you run commands that mutate the system. [[NixOS]] is declarative and has [[Generations]], so a bad update is a reboot away from fixed. On Arch you'd downgrade from the package cache (`/var/cache/pacman/pkg`) or restore a filesystem snapshot. The [ArchWiki](https://wiki.archlinux.org/) is still one of the best Linux references, even when running NixOS.

---

## Examples

```bash
# Sync the repos and upgrade everything (always together)
sudo pacman -Syu

# Install, search and remove (with unneeded dependencies and config)
sudo pacman -S nushell
pacman -Ss xanmod
sudo pacman -Rns nushell

# Which package owns this file?
pacman -Qo /usr/bin/ls

# Packages I explicitly installed, and orphans nothing depends on
pacman -Qe
pacman -Qdtq

# Build and install something from the AUR by hand
git clone https://aur.archlinux.org/paru.git
cd paru
makepkg -si
```

---

### References

- [ArchWiki: pacman](https://wiki.archlinux.org/title/Pacman)
- [ArchWiki: Arch User Repository](https://wiki.archlinux.org/title/Arch_User_Repository)
- [Wikipedia](https://en.wikipedia.org/wiki/Arch_Linux)
