A **Binary Cache** (or **substituter**) is a server that holds pre-built [[Nix Store]] paths. Before building a [[Derivation]], Nix checks its caches for the output's hash and downloads it if it's there, so most packages never need building locally.

---

## How it Works

**Same Hash, Same Output**
A store path's hash is computed from all of its inputs, so Nix can ask a cache "do you have `/nix/store/<hash>-firefox`?" and trust the answer is exactly what it would have built itself.

**cache.nixos.org**
The official cache. [Hydra](https://hydra.nixos.org), the NixOS build farm, builds [[NixPkgs]] and pushes the results here. Channels only advance once Hydra has built and tested a commit, which is why there's a delay between a PR merging and it showing up in `nixos-unstable`.

**Signing**
Cache contents are signed. Nix only accepts paths signed by a key in `trusted-public-keys`, so a compromised or fake cache can't slip in modified binaries.

**When the Cache Misses**
Anything you change, like a patch in an [[Overlays|Overlay]], gets a new hash that no cache has, so Nix builds it from source. Overriding something low in the dependency tree (like `openssl`) can mean rebuilding a large part of the system.

**Third-party Caches**
Projects like `nix-community` and Hyprland publish their own caches, usually hosted on [Cachix](https://www.cachix.org).

---

## Examples

```nix
{
  nix.settings = {
    # Setting these replaces the defaults, so keep cache.nixos.org in the list
    substituters = [
      "https://cache.nixos.org/"
      "https://nix-community.cachix.org"
    ];
    trusted-public-keys = [
      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
    ];
  };
}
```

```bash
# Is this package in the official cache?
nix path-info --store https://cache.nixos.org nixpkgs#hello

# What would be downloaded vs built
nix build nixpkgs#hello --dry-run
```

---

### References

- [Nix Manual](https://nix.dev/manual/nix/stable/package-management/binary-cache-substituter)
- [NixOS Wiki](https://wiki.nixos.org/wiki/Binary_Cache)
