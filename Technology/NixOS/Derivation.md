A **Derivation** is a build recipe. It describes the inputs (source, dependencies, build script, environment) and the outputs a build will produce in the [[Nix Store]]. Every package in [[NixPkgs]] is a Derivation.

---

## How it Works

**Evaluation then Build**
Nix works in two steps. Evaluating [[Nix]] code produces a `.drv` file in the [[Nix Store]] that describes the build. Building (or *realising*) that `.drv` runs the builder and writes the output to the store. If the output already exists locally or in a [[Binary Cache]], the build is skipped.

**Sandboxing**
Builds run in a sandbox with no network access and only the declared inputs visible. If something isn't declared as an input the build can't see it, which is what keeps builds reproducible. Fetchers like `fetchFromGitHub` are the exception, they're **fixed-output derivations** and can use the network because their `hash` is known up front.

**stdenv.mkDerivation**
The raw `derivation` builtin is rarely used directly. `stdenv.mkDerivation` wraps it with a standard environment (compiler, coreutils, make) and a set of **phases**: `unpackPhase`, `patchPhase`, `configurePhase`, `buildPhase`, `checkPhase`, `installPhase` and `fixupPhase`. Most packages only override one or two of them.

**finalAttrs**
Passing a function to `mkDerivation` gives access to the final attributes after any overrides, see the `finalAttrs` pattern in [[Nix]] and [[Overlays]].

---

## Examples

```nix
{ lib, stdenv, fetchFromGitHub }:

stdenv.mkDerivation (finalAttrs: {
  pname = "hello-world";
  version = "1.0.0";

  src = fetchFromGitHub {
    owner = "example";
    repo = "hello-world";
    tag = "v${finalAttrs.version}";
    # Build once with lib.fakeHash and Nix prints the real hash
    hash = lib.fakeHash;
  };

  installPhase = ''
    runHook preInstall
    install -Dm755 hello $out/bin/hello
    runHook postInstall
  '';

  meta = {
    description = "Prints hello world";
    license = lib.licenses.mit;
    mainProgram = "hello";
  };
})
```

```bash
# Show the .drv a package evaluates to
nix derivation show nixpkgs#hello

# Build it, the output is symlinked to ./result
nix build nixpkgs#hello
```

---

### References

- [Nix Manual](https://nix.dev/manual/nix/stable/language/derivations.html)
- [NixPkgs Manual: stdenv](https://nixos.org/manual/nixpkgs/stable/#chap-stdenv)
- [Nix Pills](https://nixos.org/guides/nix-pills/)
