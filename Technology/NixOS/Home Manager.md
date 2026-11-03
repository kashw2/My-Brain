**Home Manager** brings the declarative approach of [[NixOS]] to a user's home directory. It manages user packages and dotfiles (git, shell, editor config) with the same [[NixOS Modules|Module System]], so `~/.config` is built from [[Nix]] instead of edited by hand.

---

## How it Works

**Two Ways to Run It**

1) **NixOS module**, Home Manager is part of the system config and applied by [[nixos-rebuild]]. One command updates everything.
2) **Standalone**, run with `home-manager switch` separately from the system. This also works on other [[Linux]] distros and macOS.

**Dotfiles are Store Paths**
Generated config files live in the [[Nix Store]] and are symlinked into place, which makes them read-only. Editing `~/.config/git/config` by hand won't stick, change the Nix config instead.

**Generations**
Home Manager has its own [[Generations]], separate from the system's, and can roll back the same way.

**stateVersion**
`home.stateVersion` works like `system.stateVersion`. It's the release your config was first written for and shouldn't be bumped when upgrading.

**Options**
Home Manager Options are separate from [[NixOS Options]], search them at [home-manager-options.extranix.com](https://home-manager-options.extranix.com).

---

## Examples

As a NixOS module (see [[Flakes]] for adding the input):

```nix
{
  home-manager = {
    useGlobalPkgs = true;
    useUserPackages = true;
    users.alex = import ./home.nix;
  };
}
```

`home.nix`:

```nix
{ pkgs, ... }:

{
  home.stateVersion = "25.11";

  home.packages = with pkgs; [
    ripgrep
    fd
  ];

  programs.bat.enable = true;

  # See nix-direnv
  programs.direnv = {
    enable = true;
    nix-direnv.enable = true;
  };
}
```

```bash
home-manager switch        # Standalone only
home-manager generations
```

---

### References

- [Home Manager Manual](https://nix-community.github.io/home-manager/)
- [Home Manager Options](https://home-manager-options.extranix.com/)
