**nix-direnv** loads a [[Nix Shell]] automatically when you `cd` into a project and unloads it when you leave. It's a faster, caching replacement for [direnv](https://direnv.net)'s built-in Nix support.

---

## How it Works

**direnv**
direnv runs the `.envrc` file in a directory when you enter it and undoes its changes when you leave. `use flake` or `use nix` in `.envrc` tells it to load the project's dev shell.

**Caching**
Evaluating a Nix shell can take seconds. nix-direnv caches the result and only re-evaluates when `flake.nix`, `flake.lock`, `shell.nix` or other watched files change.

**GC Roots**
The cached shell is registered as a [[Nix Garbage Collection|GC root]], so collecting garbage doesn't delete your project's dependencies and force a re-download.

**Trust**
direnv won't run a new or changed `.envrc` until you approve it with `direnv allow`, because it executes arbitrary code.

**Your Own Shell**
direnv hooks into your shell, so you stay in Nushell, unlike `nix develop` which starts Bash (see [[Nix Shell]]).

---

## Examples

On [[NixOS]]:

```nix
{
  # Also enables nix-direnv on NixOS
  programs.direnv.enable = true;
}
```

Or with [[Home Manager]]:

```nix
{
  programs.direnv = {
    enable = true;
    nix-direnv.enable = true;
    enableNushellIntegration = true;
    # Globally gitignore the .direnv/ cache folder
    enableGitIntegration = true;
  };
}
```

In a project:

```bash
echo "use flake" > .envrc
direnv allow
```

---

### References

- [nix-direnv](https://github.com/nix-community/nix-direnv)
- [direnv](https://direnv.net)
