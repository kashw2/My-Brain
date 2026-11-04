**Windows** is Microsoft's family of [[Operating Systems|operating systems]], with every modern version built on the Windows NT [[Kernel|kernel]]. It dominates the desktop, and Windows Server is common in businesses and on [[Azure]].

---

## How it Works

**Windows NT**
Since Windows XP, consumer Windows has been NT based, a hybrid kernel with a layer that hides hardware differences from the rest of the system. It doesn't come from [[Unix]], so the conventions differ: drive letters (`C:\`), backslashes in paths, CRLF line endings, and a filesystem (NTFS) that is case-insensitive by default but keeps the case you typed.

**The Registry**
Instead of text config files in `/etc`, most system and app settings live in the Registry, a hierarchical database of keys and values (`HKEY_LOCAL_MACHINE`, `HKEY_CURRENT_USER`). It's fast and central, but much harder to diff, version or reproduce than a [[NixOS]] config.

**Shells**
`cmd.exe` is the legacy shell. PowerShell is the modern one and passes .NET objects through the pipeline instead of text, so you filter on properties rather than parsing columns. Nushell takes the same structured data idea and runs on Windows too.

**WSL**
The Windows Subsystem for Linux runs [[Linux]] distributions alongside Windows. WSL 2 uses a real Linux kernel in a lightweight virtual machine, so most Linux tools just work. There's even a community NixOS-WSL project.

**Package Management**
Traditionally you download an installer (`.exe` or `.msi`) that runs arbitrary code and writes to the Registry. `winget` is Microsoft's command line [[Package Manager|package manager]], included with modern Windows 10 and 11, and Chocolatey and Scoop are popular alternatives. They automate installers rather than isolating packages, so you don't get anything like [[Generations]] or rollbacks.

**Line Endings**
Windows uses CRLF (`\r\n`), Unix-likes use LF (`\n`). Mixed line endings cause noisy diffs and broken shell scripts, which is what Git's `core.autocrlf` setting is for.

---

## Examples

```powershell
# winget: search, install, upgrade everything
winget search nushell
winget install --id Nushell.Nushell
winget upgrade --all

# WSL: install, then list distros and their WSL version
wsl --install
wsl --list --verbose

# PowerShell pipes objects, not text
Get-Process | Where-Object CPU -gt 100 | Sort-Object CPU -Descending
```

---

### References

- [Microsoft Learn: winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/)
- [Microsoft Learn: What is WSL?](https://learn.microsoft.com/en-us/windows/wsl/about)
- [Wikipedia](https://en.wikipedia.org/wiki/Microsoft_Windows)
