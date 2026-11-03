A **Generation** is a snapshot of a profile at a point in time. Every [[nixos-rebuild]] `switch` or `boot` creates a new system Generation, and every previous one stays in the [[Nix Store]] until it's deleted.

---

## How it Works

**Profiles are Symlinks**
`/nix/var/nix/profiles/system` is a symlink to the latest `system-<number>-link`, which points at a complete system in the [[Nix Store]]. Creating a Generation is just adding a new numbered link, rolling back is pointing at an older one. Nothing is copied or overwritten, so switching is **atomic**, the system is either fully on the old Generation or fully on the new one.

**Boot Menu**
Every system Generation gets its own boot menu entry. If an update breaks boot, pick the previous entry and you're back on a working system.

**Rolling Back**
`nixos-rebuild switch --rollback` switches to the previous Generation without rebooting. Only the system changes, files in `/home` and state in `/var` aren't touched.

**Other Profiles**
User profiles and [[Home Manager]] have their own Generations, separate from the system's.

**Cleaning Up**
Old Generations are [[Nix Garbage Collection|GC roots]] and keep their packages alive, so deleting them is how you free disk space. `boot.loader.systemd-boot.configurationLimit` caps the boot menu so `/boot` doesn't fill up.

---

## Examples

```bash
# List system generations
nixos-rebuild list-generations

# Go back one generation
sudo nixos-rebuild switch --rollback

# Keep only the last 5 system generations, then collect garbage to free the space
sudo nix-env --delete-generations +5 --profile /nix/var/nix/profiles/system
sudo nix-collect-garbage

# Home Manager generations
home-manager generations
```

```nix
{
  # Only keep 10 entries in the boot menu
  boot.loader.systemd-boot.configurationLimit = 10;
}
```

---

### References

- [NixOS Manual](https://nixos.org/manual/nixos/stable/#sec-rollback)
- [Nix Manual](https://nix.dev/manual/nix/stable/command-ref/nix-env/delete-generations)
