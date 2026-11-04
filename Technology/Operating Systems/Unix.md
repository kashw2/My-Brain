**Unix** is a family of multi-user, multitasking [[Operating Systems|operating systems]] that began at AT&T's Bell Labs in 1969, created by Ken Thompson and Dennis Ritchie. "Unix" is also a trademark for systems certified against the Single UNIX Specification (like [[MacOS|macOS]]), while [[Linux]] and the BSDs are usually called "Unix-like".

---

## How it Works

**The Unix Philosophy**
Write small programs that do one thing well, and make them work together through pipes, with text as the common interface. It's the same idea as [[Function Composition]] in [[Functional Programming]]: `cut`, `sort` and `uniq` are tiny functions chained into something bigger. Nushell keeps the pipes but passes structured data instead of plain text.

**Everything is a File**
Devices, pipes, sockets and (on Linux) process information under `/proc` are all exposed as files. The same `read` and `write` calls work on all of them, so tools that work on files work on almost everything.

**Written in C**
Unix was rewritten in [[C]] in 1973, and C itself was created at Bell Labs for the job. Being in a high level language made Unix portable to new hardware, which is a big reason it spread so far.

**Family Tree**
AT&T licensed Unix to universities and companies, which led to System V on the commercial side and BSD from Berkeley. BSD lives on in FreeBSD, OpenBSD, NetBSD and Darwin, the core of [[MacOS|macOS]]. [[Linux]] is a from-scratch reimplementation with no original Unix code, which is why it's Unix-like rather than Unix.

**POSIX**
POSIX is the standard for the shared interface (system calls, shell and utilities), so software can be ported between Unix-like systems. Linux follows it closely even though most distributions aren't certified. [[Windows]] is the odd one out among major desktops, it doesn't follow this lineage at all.

**Users and Permissions**
Unix was multi-user from the start. Every file has an owner, a group and read/write/execute bits for each, which is still the basis of permissions on Linux and macOS.

---

## Examples

```bash
# Small tools composed with pipes: most common login shells
cut -d: -f7 /etc/passwd | sort | uniq -c | sort -rn

# Permissions: owner, group, others
ls -l script.sh
chmod 755 script.sh

# Everything is a file
cat /proc/cpuinfo
echo "gone" > /dev/null

# Which Unix-like am I on?
uname -s
```

---

### References

- [POSIX (The Open Group Base Specifications)](https://pubs.opengroup.org/onlinepubs/9799919799/)
- [The Open Group: UNIX Certified Products](https://www.opengroup.org/openbrand/register/)
- [Wikipedia](https://en.wikipedia.org/wiki/Unix)
