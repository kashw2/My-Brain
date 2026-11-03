**Options** are the settings declared by [[NixOS Modules]], like `services.openssh.enable` or `networking.hostName`. A `configuration.nix` is mostly just setting Options.

---

## How it Works

**Types**
Every Option has a type (`bool`, `str`, `listOf package`, `attrsOf submodule` etc.). Values are checked against it during evaluation, so a wrong value or a misspelt Option name fails before anything is built. The type also decides how values from multiple modules are merged.

**Priorities**
When two modules set the same Option to different values, priority decides the winner. The lower number wins:

| Function | Priority | Use |
|-|-|-|
| `lib.mkForce` | 50 | Override everything |
| *(plain value)* | 100 | Normal config |
| `lib.mkDefault` | 1000 | A default users can override |
| `lib.mkOptionDefault` | 1500 | The Option's own default |

**Ordering**
For list Options, `lib.mkBefore` and `lib.mkAfter` control where values land in the merged list.

**Finding Options**
- [search.nixos.org/options](https://search.nixos.org/options) to search every Option
- `man configuration.nix` for the full list offline
- `nixos-rebuild repl` to inspect the evaluated values of your own config, see [[nixos-rebuild]]

---

## Examples

```nix
{ lib, pkgs, ... }:

{
  networking.hostName = "laptop";

  # Win against any other module that sets this
  services.openssh.enable = lib.mkForce false;

  # Merged with every other module's systemPackages
  environment.systemPackages = [
    pkgs.git
    pkgs.ripgrep
  ];
}
```

```bash
nixos-rebuild repl --flake .#laptop
nix-repl> config.networking.hostName
"laptop"
```

---

### References

- [NixOS Options Search](https://search.nixos.org/options)
- [NixOS Manual](https://nixos.org/manual/nixos/stable/#sec-option-declarations)
