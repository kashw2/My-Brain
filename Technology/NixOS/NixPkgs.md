**NixPkgs** is the central package repository for [[NixOS|NixOS]]. 

---

## Branches

**NixPkgs** comprises of several branches including but not limited to:
- Stable
- Unstable
- Small

### Stable
The stable branch (usually denoted with a version number referring to the version of [[NixOS|NixOS]] it was built for) which contains all the packages that are running on stable builds and are likely to work without issues.

### Unstable
The unstable branch, containing packages that are closer to following their source than those found on stable or small channels but not close enough to be considered 'on the edge'.

### Small
The small branch, containing smaller binaries and packages that can generally also be found in other branches.

---

## Updating Packages

Updating packages in [[NixOS|NixOS]] can range anywhere from fairly trivial to complex.

Trivial package updates are those that usually just involve updating the package's  `version` attribute as well as it's `hash` and or `vendorHash` attributes. 

In cases where the package in question is hosted on GitHub, `nix-update` can do most of the work.

In this case you can follow the following steps:
- Clone [**NixPkgs**](https://github.com/NixOS/nixpkgs).
- Run `nix-update myPathToPackageInNixPkgs` (Ex: to update act we would run `nix-update pkgs.act`).
- Run `nix-build -A pkgs.act` to build your new and updated package locally.
- Test the package.
- Regression test using `nix-shell -p nixpkgs-review --run "nixpkgs-review rev HEAD"`.


## References
- [NixPkgs](https://github.com/NixOS/nixpkgs)
- [NixOS Documentation](https://nixos.org/manual/nixos/stable/index.html#ch-development)
- [Jon Ringer Video (How to update a package)](https://www.youtube.com/watch?v=D_IZ2EfW_8U)