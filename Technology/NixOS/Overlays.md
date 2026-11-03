An **Overlay** is a function that modifies or extends [[NixPkgs]]. It takes two versions of the package set, `final` and `prev`, and returns an attribute set of packages to add or replace.

---

## How it Works

**final and prev**
`prev` is the package set *before* this Overlay is applied, `final` is the package set *after every* Overlay has been applied. Use `prev` for the package you're modifying and `final` for its dependencies, so changes made by other Overlays are picked up. It's the same fixed-point idea as [[Nix]]'s `rec` and the `finalAttrs` pattern. Older docs call them `self` and `super`.

**override vs overrideAttrs**
- `override` changes the *function arguments* of a package, like swapping a dependency or toggling a feature flag.
- `overrideAttrs` changes the *attributes passed to* `mkDerivation`, like `version`, `src` or `patches`, see [[Derivation]].

**Composition**
Overlays are a list applied in order, each building on the last. That's [[Composition over Inheritance|composition]], each Overlay adds behaviour without knowing about the others. [[Flakes]] commonly expose an `overlays.default` output for others to use.

**The Cost**
Changed packages get new hashes, so they're no longer in the [[Binary Cache]] and have to be built locally, along with everything that depends on them.

---

## Examples

```nix
{
  nixpkgs.overlays = [
    (final: prev: {
      # Patch an existing package
      htop = prev.htop.overrideAttrs (old: {
        patches = (old.patches or [ ]) ++ [ ./htop-fix.patch ];
      });

      # Toggle a build option (rebuilds ffmpeg and everything using it)
      ffmpeg = prev.ffmpeg.override { withUnfree = true; };

      # Add a new package
      hello-script = final.writeShellScriptBin "hello" ''
        echo "Hello from an overlay"
      '';
    })
  ];
}
```

---

### References

- [NixPkgs Manual](https://nixos.org/manual/nixpkgs/stable/#chap-overlays)
- [NixOS Wiki](https://wiki.nixos.org/wiki/Overlays)
