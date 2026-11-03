**Specialisations** let one [[NixOS]] configuration produce several variants of the system, each with its own boot menu entry. Each variant is a set of changes layered on top of the main configuration.

---

## How it Works

**Inheriting the Parent**
By default a Specialisation inherits everything from the main configuration and only applies its own changes on top. Setting `inheritParentConfig = false` builds a completely separate system instead.

**Switching**
Pick a Specialisation from the boot menu, or switch to one at runtime with `sudo nixos-rebuild switch --specialisation <name>`. A normal `nixos-rebuild switch` goes back to the main configuration.

**Use Cases**
- A gaming setup with a different kernel or GPU drivers, alongside a clean default
- A low-power profile for a laptop on battery
- Trying a risky change (like a new kernel) while keeping a known-good default

**Cost**
Each Specialisation is a full system closure in the [[Nix Store]], so builds take longer and every [[Generations|Generation]] gets an extra boot entry per Specialisation.

---

## Examples

```nix
{ lib, pkgs, ... }:

{
  specialisation = {
    gaming.configuration = {
      programs.steam.enable = true;
      boot.kernelPackages = pkgs.linuxPackages_zen;
    };

    battery.configuration = {
      # mkForce because the desktop enables it in the main config, see NixOS Options
      services.power-profiles-daemon.enable = lib.mkForce false;
      services.tlp.enable = true;
    };
  };
}
```

```bash
# List available specialisations
ls /run/current-system/specialisation/

sudo nixos-rebuild switch --specialisation gaming
```

---

### References

- [NixOS Wiki](https://wiki.nixos.org/wiki/Specialisation)
- [NixOS Options Search](https://search.nixos.org/options?query=specialisation)
