The **Nix Shell** provides a shell environment inside of [[NixOS]] that can be used in isolation or alongside the system it is being run on.

---

## Flags

- --pure
	- Allows the discarding of parent environment variables
	- Enables a completely isolated environment

### References

[nix.dev](https://nix.dev/tutorials/first-steps/ad-hoc-shell-environments)
[NixOS Manual](https://nixos.org/manual/nix/stable/command-ref/nix-shell)