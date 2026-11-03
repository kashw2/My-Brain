**NixOS Tests** are integration tests that boot one or more [[NixOS]] virtual machines and run a Python script against them. They're how [[NixPkgs]] checks that services actually work, not just that they build.

---

## How it Works

**Nodes**
Each node is a full NixOS configuration written with the same [[NixOS Options|Options]] as a real system. A test can have several nodes on a shared virtual network, like a client and a server.

**Test Script**
The test script is Python with helpers like `wait_for_unit`, `wait_for_open_port`, `succeed` (run a command, fail the test if it fails) and `fail` (run a command, fail the test if it succeeds).

**In NixPkgs**
Tests live in `nixos/tests` and are exposed as `nixosTests.<name>`. Packages link to them through `passthru.tests`, so after updating a package you can run `nix-build -A <package>.tests` as part of the testing step in [[NixPkgs#Updating Packages|Updating Packages]].

**Interactive Mode**
Building the `driverInteractive` attribute gives a Python REPL where you start the VMs and run commands step by step, useful for writing and debugging a test script.

**Indent with Spaces**
Nix `''` strings only strip leading spaces, not tabs. A test script indented with tabs keeps them and Python fails with an indentation error.

---

## Examples

```nix
{ pkgs, ... }:

pkgs.testers.runNixOSTest {
  name = "nginx-serves-page";

  nodes.machine = { pkgs, ... }: {
    environment.systemPackages = [ pkgs.curl ];

    services.nginx = {
      enable = true;
      virtualHosts."localhost".root = pkgs.writeTextDir "index.html" "Hello";
    };
  };

  testScript = ''
    machine.wait_for_unit("nginx.service")
    machine.wait_for_open_port(80)
    machine.succeed("curl --fail http://localhost | grep Hello")
  '';
}
```

```bash
# From a nixpkgs checkout
nix-build -A nixosTests.nginx

# Interactive driver
nix-build -A nixosTests.nginx.driverInteractive
./result/bin/nixos-test-driver
```

---

### References

- [NixOS Manual](https://nixos.org/manual/nixos/stable/#sec-nixos-tests)
- [nix.dev](https://nix.dev/tutorials/nixos/integration-testing-using-virtual-machines)
