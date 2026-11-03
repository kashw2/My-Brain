The **Module System** is how [[NixOS]] configuration is organised. Every piece of configuration, your own `configuration.nix` and every service in [[NixPkgs]], is a module. NixOS evaluates all of them together and merges the results into one system.

---

## How it Works

**Structure**
A module is a function that returns up to three things:

1) `imports`, other modules to include.
2) `options`, the settings this module *declares*, see [[NixOS Options]].
3) `config`, the values this module *sets*, for its own Options or anyone else's.

A module that only sets values can skip `options` and put everything at the top level, which is what a typical `configuration.nix` does.

**Options are the Interface**
`options` are a module's public [[Interface]] and `config` is the implementation. Users of `services.nginx` set `services.nginx.enable = true` and never need to see the systemd units it generates underneath, which is [[Encapsulation (OOP)|Encapsulation]] applied to system config.

**Merging**
The same Option can be set in many modules. How the values combine depends on its type, lists are concatenated and attribute sets are merged. List merging is a [[Monoid]], concatenation is associative and `[ ]` is the identity, so it doesn't matter how modules are grouped or nested. Conflicting single values (like two different strings) are an error unless a priority decides the winner, see [[NixOS Options]].

**Same System Everywhere**
[[Home Manager]] and nix-darwin use the same Module System, so these patterns work there too.

---

## Examples

`greeter.nix`:

```nix
{ config, lib, pkgs, ... }:

let
  cfg = config.services.greeter;
in
{
  options.services.greeter = {
    enable = lib.mkEnableOption "the greeter service";

    message = lib.mkOption {
      type = lib.types.str;
      default = "Hello";
      description = "Message to print on boot.";
    };
  };

  config = lib.mkIf cfg.enable {
    systemd.services.greeter = {
      wantedBy = [ "multi-user.target" ];
      serviceConfig.Type = "oneshot";
      script = "echo ${lib.escapeShellArg cfg.message}";
    };
  };
}
```

Using it from `configuration.nix`:

```nix
{
  imports = [ ./greeter.nix ];

  services.greeter = {
    enable = true;
    message = "G'day";
  };
}
```

---

### References

- [NixOS Manual](https://nixos.org/manual/nixos/stable/#sec-writing-modules)
- [nix.dev](https://nix.dev/tutorials/module-system/)
