#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Pattern } from "@patternsoflife/patterns";
import { PatternDeserializer } from "@patternsoflife/patterns/io";
import { pattern2svg } from "@patternsoflife/patterns/visual";


const readJSONFile = async (path: string) => {
  const data = await readFile(path, { encoding: 'utf8' });
  return JSON.parse(data);
};


const readPattern = async (path: string): Promise<Pattern> => {
  const [
    contextCatData, roleCatData, nodeDefData, patternData
  ] = await Promise.all([
    "definitions/context_categories.json",
    "definitions/role_categories.json",
    "definitions/node_definitions.json",
    path
  ].map(readJSONFile));

  const deserializer = new PatternDeserializer(
    contextCatData, roleCatData, nodeDefData
  );

  return deserializer.deserializePattern(patternData);
};

const sourcePath = process.argv[2];
if (sourcePath === undefined) {
  console.log("Please specify the pattern file as an argument to patternsvg");
} else {
  const destPath = `${path.parse(sourcePath).name}.svg`;
  const pattern = await readPattern(sourcePath);
  const svg = pattern2svg(pattern, { useDropShadows: true });
  await writeFile(destPath, svg);
}
