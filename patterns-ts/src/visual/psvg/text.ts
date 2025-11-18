/**
 * Text processing.
 */


/*
  Word-wrapping delimiters.
  Note that whitespace characters are matched but excluded,
  whereas matching punctuation marks are included.
*/
const DELIMS = `((?:\\s)|[-/\u00AD])`;


/**
 * Simple monospace word wrapper.
 *
 * For inspiration, see:
 * https://stackoverflow.com/questions/14484787/wrap-text-in-javascript/#51506718
 */
export const simpleWordWrap = (text: string, width: number) => (

  // Remove soft hyphens after slashes.
  text.replaceAll('/\u00AD', '/')

    // Add newlines.
    .replace(new RegExp(`(([^\\n]{1,${width}})($|${DELIMS}))`, 'gu'), '$1\n')

    // Remove double newlines.
    .replaceAll('\n\n', '\n')

    // Remove the final newline character.
    .slice(0, -1)

    // Make soft hyphens at line breaks visible.
    .replaceAll('\u00AD\n', '-\n')

    // Remove other soft hyphens.
    .replaceAll('\u00AD', '')

);
