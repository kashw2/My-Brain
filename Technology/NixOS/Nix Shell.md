A **Nix Shell** is a temporary shell environment with specific packages available, without installing them. Leave the shell and they're gone from your `PATH`, though they stay in the [[Nix Store]] until [[Nix Garbage Collection|Garbage Collection]].

---

## How it Works

**The Commands**
A few commands overlap:

| Command | What it does |
|-|-|
| `nix-shell -p cowsay` | Classic command, Bash shell with packages from `<nixpkgs>` |
| `nix-shell` | Loads `shell.nix` from the current directory |
| `nix shell nixpkgs#cowsay` | New CLI, adds packages to `PATH` in your own shell |
| `nix develop` | Loads a [[Flakes|Flake's]] `devShells` output, or a package's build environment |
| `nix run nixpkgs#cowsay` | Runs a package's main program without a shell at all |

**Declarative Shells**
A `shell.nix` or a Flake's `devShells` puts a project's dev dependencies in the repo. Anyone with Nix gets the same tools at the same versions. Pair it with [[nix-direnv]] to load the shell automatically on `cd`.

**Shell Choice**
`nix-shell` and `nix develop` start Bash. To stay in Nushell use `nix develop -c nu` or `nix-shell --run nu`.

**Shebangs**
`nix-shell` can act as a script interpreter, so a script brings its own dependencies:

```bash
#!/usr/bin/env nix-shell
#!nix-shell -i bash -p jq curl
curl -s https://api.github.com/repos/NixOS/nixpkgs | jq .stargazers_count
```

---

## Examples

`shell.nix`:

```nix
{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs
    pnpm
  ];

  shellHook = ''
    echo "Node $(node --version) ready"
  '';
}
```

The [[Flakes|Flake]] equivalent, loaded with `nix develop`:

```nix
{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { nixpkgs, ... }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
    in
    {
      devShells.x86_64-linux.default = pkgs.mkShell {
        packages = with pkgs; [ nodejs pnpm ];
      };
    };
}
```

---

### References

- [nix.dev](https://nix.dev/tutorials/first-steps/declarative-shell)
- [Nix Manual](https://nix.dev/manual/nix/stable/command-ref/nix-shell)
