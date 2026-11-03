**nixos-rebuild** is the command that builds a [[NixOS]] configuration and makes it the running system. It evaluates your config, builds the result into the [[Nix Store]], creates a new [[Generations|Generation]] and activates it.

---

## How it Works

**Subcommands**

| Command | Builds | Activates now | Default on next boot |
|-|-|-|-|
| `switch` | Yes | Yes | Yes |
| `boot` | Yes | No | Yes |
| `test` | Yes | Yes | No |
| `build` | Yes | No | No |
| `dry-build` | No, only shows what would be built | No | No |
| `build-vm` | Yes, as a QEMU VM | No | No |

`boot` is the safer choice for kernel or driver changes, they're applied cleanly on the next boot. `test` is good for risky changes, a reboot puts you back on the previous Generation.

**Other Subcommands**
- `list-generations` shows every [[Generations|Generation]]
- `repl` opens `nix repl` with your config loaded, see [[NixOS Options]]
- `edit` opens your configuration in `$EDITOR`

**Useful Flags**
- `--flake .#laptop` builds the `laptop` output of a [[Flakes|Flake]]
- `--rollback` switches back to the previous Generation
- `--specialisation gaming` activates a [[Specialisations|Specialisation]]
- `--target-host` and `--build-host` build and deploy to another machine over SSH
- `--upgrade` updates channels before building. With [[Flakes]] use `nix flake update` instead

**nixos-rebuild-ng**
Recent NixOS releases ship `nixos-rebuild-ng`, a Python rewrite of the original Bash script. It has the same commands plus a few extras like `--elevate run0`.

---

## Examples

```bash
# Apply the config now and on boot
sudo nixos-rebuild switch --flake .#laptop

# Try it out, a reboot undoes it
sudo nixos-rebuild test --flake .#laptop

# Boot the config in a VM to check it first
nixos-rebuild build-vm --flake .#laptop
./result/bin/run-laptop-vm

# Undo the last switch
sudo nixos-rebuild switch --rollback
```

---

### References

- [NixOS Manual](https://nixos.org/manual/nixos/stable/#sec-changing-config)
- [NixOS Wiki](https://wiki.nixos.org/wiki/Nixos-rebuild)
