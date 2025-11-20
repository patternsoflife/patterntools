# Patterns NodeJS CLI
This package contains command-line scripts that invoke functionality
from the [patterns](https://www.npmjs.com/package/@patternsoflife/patterns)
package.

## Installation and running scripts

### Local installation
To make the scripts in this package available in a local project directory,
make sure you have Node and npm installed on your system, and then run:

```
npm install @patternsoflife/patterns-cli
```

You can now run scripts in the following way:

```
npm exec patternsvg mypattern.json
```

To make the commands globally available from any directory, install the
package as follows:

```
npm install -g @patternsoflife/patterns-cli
```

On Windows, this will add all the commands from this package to your `PATH`
environment variable. You can then run the command from any directory
without having to prefix it with `npm exec`:

```
patternsvg mypattern.json
```


## SVG generator
This package currently provides the `patternsvg` command. The syntax is as
follows:

```
patternsvg mypattern.json
```

This command will assume that there is a `definitions` directory containing
the `context_categories.json`, `role_categories.json`, and
`node_definitions.json` files.
