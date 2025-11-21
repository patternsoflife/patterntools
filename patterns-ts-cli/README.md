# Patterns NodeJS CLI
This package contains command-line NodeJS scripts that invoke functionality
from the [patterns](https://www.npmjs.com/package/@patternsoflife/patterns)
package.

## Installation
### Downloading from npmjs
The easiest way is to install this package globally on your system:
```
npm i -g @patternsoflife/patterns-cli
```
This will make the `patternjs` command available.

### Local development
If you have the `patterntools` git repository checked out on your system for
local development, you can also install this package in development mode:
```
cd patterns-ts-cli
npm install
npm run build
npm link
```
This will make the `patternjs` command globally available by linking it to
the `bin` entrypoint in your `package.json`. After rebuilding the package
with `npm run build`, the global command will reflect the changes.

## Usage
### Running a script
After installation you can run scripts in the following way:
```
patternjs <cmd> [args]
```
Where `<cmd>` specifies the script to run and `[args]` the arguments,
if any, needed to run the script. For example:
```
patternjs svg mypattern.json
```

### Getting help
For more information about the available commands, run:
```
patternjs -h
```
For help on a specific command, run:
```
patternjs <cmd> -h
```

### Definitions for SVG generator
The `patternjs svg` command assumes that there is a `definitions` directory
containing the `context_categories.json`, `role_categories.json`, and
`node_definitions.json` files.
