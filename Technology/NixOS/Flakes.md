A **Flake** is a directory with a `flake.nix` that declares its **inputs** (other Flakes, usually [[NixPkgs]]) and **outputs** (packages, dev shells, [[NixOS]] configurations, [[Overlays]]) in a standard schema. A `flake.lock` pins every input to an exact commit.

---

## How it Works

**Reproducibility**
Without Flakes, `<nixpkgs>` means "whatever channel this machine has", so two machines with the same config can build different systems. A `flake.lock` pins nixpkgs to an exact revision, so the same Flake builds the same thing everywhere until you choose to update.

**Pure Evaluation**
Flakes evaluate in pure mode: no `<nixpkgs>` lookups, no environment variables and no files outside the Flake. In a git repo only files tracked by git are visible, so a new file that hasn't been `git add`ed won't be found.

**Inputs and follows**
Inputs can share dependencies with `follows`. Making [[Home Manager]] follow your nixpkgs input means only one copy of nixpkgs gets downloaded and evaluated.

**Experimental**
Flakes are still marked experimental in upstream Nix and need `nix.settings.experimental-features = [ "nix-command" "flakes" ];`. In practice most of the ecosystem uses them.

---

## Examples

```nix
{
  description = "My NixOS configuration";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { nixpkgs, home-manager, ... }: {
    # nixpkgs.hostPlatform is set in hardware-configuration.nix
    nixosConfigurations.laptop = nixpkgs.lib.nixosSystem {
      modules = [
        ./configuration.nix
        home-manager.nixosModules.home-manager
      ];
    };
  };
}
```

```bash
nix flake show             # List a Flake's outputs
nix flake check            # Evaluate and run checks
nix flake update           # Update every input in flake.lock
nix flake update nixpkgs   # Update one input
sudo nixos-rebuild switch --flake .#laptop
```

---

### References

- [NixOS Wiki](https://wiki.nixos.org/wiki/Flakes)
- [Nix Manual](https://nix.dev/manual/nix/stable/command-ref/new-cli/nix3-flake)
