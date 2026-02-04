/**
 * Implementation of the svg command.
 * 
 * Read a pattern from a json file and write it to an svg file.
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Pattern } from "@patternsoflife/patterns";
import { PatternDeserializer } from "@patternsoflife/patterns/io";
import { pattern2svg } from "@patternsoflife/patterns/visual";


/**
 * Read a json file and parse it.
 */
const readData = async (dataPath: string) => {
  try {
    const data = await readFile(dataPath, { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Cannot read data from ${dataPath}:\n${error.message}`);
    } else {
      throw error;
    }
  }
};


/**
 * Read a pattern from a json file and deserialize it.
 */
const readPattern = async (patternPath: string): Promise<Pattern> => {
  const patternData = await readData(patternPath);
  const defPath = `definitions/${patternData.locale}`;

  const [contextCatData, roleCatData, nodeDefData] = await Promise.all([
    `${defPath}/context_categories.json`,
    `${defPath}/role_categories.json`,
    `${defPath}/node_definitions.json`
  ].map(readData));

  const deserializer = new PatternDeserializer(
    contextCatData, roleCatData, nodeDefData
  );

  return deserializer.deserializePattern(patternData);
};


/**
 * Write a pattern from a json file to an svg file.
 * 
 * If the source file is pattern.json the output will be pattern.svg.
 */
export const writeSVG = async (patternPath: string, debug: boolean) => {
  try {
    const destPath = `${path.parse(patternPath).name}.svg`;
    const pattern = await readPattern(patternPath);
    const svg = pattern2svg(pattern, { useDropShadows: true });
    await writeFile(destPath, svg);
  } catch (error) {
    if (error instanceof Error) {
      console.error(debug ? error : error.message);
      process.exitCode = 1;
    } else {
      throw error;
    }
  }
};
