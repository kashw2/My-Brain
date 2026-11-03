**NixOS Containers** are lightweight containers declared directly in a [[NixOS]] configuration, each running its own full NixOS system. They're built on `systemd-nspawn` and share the host's [[Nix Store]], so they start quickly and don't duplicate packages.

---

## How it Works

**Declarative**
A container is defined under `containers.<name>`, and its `config` is a regular NixOS configuration using the same [[NixOS Options|Options]] as the host. [[nixos-rebuild]] builds and updates containers along with the host.

**Networking**
By default a container shares the host's network. `privateNetwork = true` gives it its own virtual ethernet link with a `hostAddress` and `localAddress`.

**Isolation**
NixOS Containers aren't a security boundary like a VM. They're good for separating services, not for running untrusted code.

**vs Docker**
NixOS Containers run NixOS systems. To run OCI images (Docker or Podman) declaratively, use `virtualisation.oci-containers` instead. For orchestrating containers across many machines see [[Kubernetes]].

---

## Examples

```nix
{
  containers.webserver = {
    autoStart = true;
    privateNetwork = true;
    hostAddress = "192.168.100.10";
    localAddress = "192.168.100.11";

    config = { pkgs, ... }: {
      services.nginx.enable = true;
      networking.firewall.allowedTCPPorts = [ 80 ];
      system.stateVersion = "25.11";
    };
  };
}
```

```bash
nixos-container list
sudo nixos-container root-login webserver
systemctl status container@webserver
```

---

### References

- [NixOS Manual](https://nixos.org/manual/nixos/stable/#ch-containers)
- [NixOS Wiki](https://wiki.nixos.org/wiki/NixOS_Containers)
