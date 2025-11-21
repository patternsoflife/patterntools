# Patterns NodeJS CLI
This package contains command-line NodeJS scripts that invoke functionality
from the [patterns](https://www.npmjs.com/package/@patternsoflife/patterns)
package.

## Installation
Easiest is to install this package globally on your system:
```
npm i -g @patternsoflife/patterns-cli
```
This will make the `patternjs` command available.

## Running a script
You can now run scripts in the following way:
```
patternjs <cmd> [args]
```
Where `<cmd>` specifies the script to run and `[args]` the arguments,
if any, needed to run the script. For example:
```
patternjs svg mypattern.json
```

## Getting help
For more information about the available commands, run:
```
patternjs -h
```
For help on a specific command, run:
```
patternjs <cmd> -h
```

## Definitions for SVG generator
The `patternjs svg` command assumes that there is a `definitions` directory
containing the `context_categories.json`, `role_categories.json`, and
`node_definitions.json` files.
