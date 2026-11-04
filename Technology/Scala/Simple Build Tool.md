**sbt** is the standard build tool for [[Scala]] projects (it handles Java too). It compiles, tests, runs and packages code, manages dependencies, and the build itself is written in Scala in a `build.sbt` file. It started life as "Simple Build Tool", but the project now says the name doesn't stand for anything and should be written lowercase.

---

## How it Works

**build.sbt**
The build is a list of settings written in Scala, `key := value`. You set the Scala version, add dependencies and enable plugins. Because it's real Scala the build is type checked like any other code. Supporting files live in `project/`: `build.properties` pins the sbt version so everyone builds with the same one, and `plugins.sbt` adds plugins.

**Dependencies**
Dependencies are downloaded from Maven Central and written as `"group" %% "artifact" % "version"`. The double `%%` appends the Scala binary version to the artifact name (like `_3` or `_2.13`), because Scala libraries are published separately for each Scala version. Plain Java libraries use a single `%`.

**The sbt Shell**
Running `sbt` with no arguments starts an interactive shell. The [[Java Virtual Machine|JVM]] and compiler stay warm between commands, so compiling again is much quicker than running `sbt compile` from scratch each time. Prefixing a command with `~` reruns it whenever a source file changes.

**Incremental Compilation**
sbt uses Zinc to work out which files are affected by a change and recompiles only those, rather than the whole project. On a big Scala codebase that's the difference between seconds and minutes.

**Cross Platform**
Plugins let the same code target [[JavaScript]] (Scala.js) or native binaries via [[Low Level Virtual Machine|LLVM]] (Scala Native), and `crossScalaVersions` builds a library against several Scala versions at once.

---

## Examples

```
my-app/
	build.sbt
	project/
		build.properties   # pins the sbt version
		plugins.sbt        # sbt plugins
	src/
		main/scala/        # application code
		test/scala/        # tests
```

```scala
// build.sbt
ThisBuild / scalaVersion := "3.3.9"

lazy val root = (project in file("."))
	.settings(
		name := "my-app",
		libraryDependencies ++= Seq(
			"org.typelevel" %% "cats-core" % "2.13.0",
			"org.scalameta" %% "munit"     % "1.3.6" % Test // only on the test classpath
		)
	)
```

```bash
sbt new scala/scala3.g8   # Create a project from a template
sbt                       # Start the sbt shell
sbt compile               # Compile
sbt run                   # Run the main class
sbt test                  # Run every test
sbt "testOnly *UserSpec"  # Run matching test classes
sbt console               # A Scala REPL with the project on the classpath
sbt ~test                 # Rerun the tests on every file change
sbt package               # Build a jar
```

Inside the shell drop the `sbt` prefix (`compile`, `~test`), and run `reload` after editing `build.sbt`.

---

### References

- [Scala Docs: Getting Started with sbt](https://docs.scala-lang.org/getting-started/sbt-track/getting-started-with-scala-and-sbt-on-the-command-line.html)
- [sbt FAQ](https://www.scala-sbt.org/1.x/docs/Faq.html)
- [Wikipedia](https://en.wikipedia.org/wiki/Sbt_(software))
