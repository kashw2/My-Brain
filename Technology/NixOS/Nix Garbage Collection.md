**Garbage Collection** in Nix deletes paths in the [[Nix Store]] that nothing refers to anymore. Nothing is removed when you uninstall a package or switch configuration, old versions stay until the garbage collector runs.

---

## How it Works

**GC Roots**
A path is kept if it's reachable from a **GC root**. Roots live in `/nix/var/nix/gcroots` and include every [[Generations|Generation]] of every profile, the running system and the `result` symlinks left behind by `nix build`. Anything not reachable from a root is garbage.

**Generations Keep Things Alive**
Old [[Generations]] are roots, so deleting old Generations is what actually frees most of the space. Once a Generation is deleted you can't roll back to it.

**Deduplication**
Many store paths contain identical files. Optimising the store replaces duplicates with hard links, which can save a lot of space.

**Dev Shells**
[[nix-direnv]] registers its cached shells as GC roots, so collecting garbage doesn't wipe your project dependencies.

---

## Examples

```bash
# Delete everything unreachable
nix-collect-garbage

# Delete generations older than 14 days, then collect
# sudo is needed to include system generations, rollbacks to them are gone after this
sudo nix-collect-garbage --delete-older-than 14d

# See what's keeping a path alive
nix-store --query --roots /nix/store/<hash>-some-package

# Deduplicate the store with hard links
sudo nix-store --optimise
```

Run it automatically:

```nix
{
  nix.gc = {
    automatic = true;
    dates = "weekly";
    options = "--delete-older-than 14d";
  };

  # Weekly deduplication, or set nix.settings.auto-optimise-store = true to do it on every build
  nix.optimise.automatic = true;
}
```

---

### References

- [Nix Manual](https://nix.dev/manual/nix/stable/package-management/garbage-collection)
- [NixOS Wiki](https://wiki.nixos.org/wiki/Storage_optimization)
