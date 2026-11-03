The **Nix Store** (`/nix/store`) is where Nix keeps every package, [[Derivation]] and build output. Every entry is immutable and lives in its own directory named after a hash of everything that went into building it.

---

## How it Works

**Store Paths**
A store path looks like `/nix/store/b6gvzjyb2pg0kjfwrjmg1vfhh54ad73z-firefox-144.0`. The hash at the front is computed from every input of the build: source, dependencies, build script and flags. Change any input and you get a new hash and a new path, so different versions of the same package sit side by side without conflict.

**Immutability**
Once a path is written it's never modified, on [[NixOS]] the store is mounted read-only. This is what makes [[Generations|rollbacks]] safe, the old system is still sitting in the store untouched. It's the same idea as immutable values in [[Functional Programming]], a build is treated like a [[Pure]] function where the same inputs always give the same output.

**Closures**
A package's **closure** is the package plus everything it depends on, all the way down. Copying a closure to another machine (or a [[Binary Cache]]) is enough to run it there.

**Nothing is Installed**
What's "installed" is decided by symlinks. `/run/current-system` points at the active system in the store, and `/nix/var/nix/profiles/system` points at the latest [[Generations|Generation]]. Paths nothing points to anymore are removed by [[Nix Garbage Collection|Garbage Collection]].

---

## Examples

```bash
# Everything the running system depends on (its closure)
nix-store --query --requisites /run/current-system

# Total closure size
nix path-info --closure-size --human-readable /run/current-system

# Why does my system depend on this path?
nix why-depends /run/current-system /nix/store/<hash>-python3-<version>

# Check the store for corruption
sudo nix-store --verify --check-contents
```

---

### References

- [Nix Manual](https://nix.dev/manual/nix/stable/store/)
- [Nix Pills](https://nixos.org/guides/nix-pills/)
