#!/usr/bin/env node
import { readFile } from "node:fs/promises";
// import { Pattern } from "@patternsoflife/patterns";
// import { PatternDeserializer } from "@patternsoflife/patterns/io";
// import { pattern2svg } from "@patternsoflife/patterns/visual";



const readJSONFile = async (path: string): Promise<string> => {
  const data = await readFile(path, { encoding: 'utf8' });
  return JSON.parse(data);
};


const readAll = async () => {
  const [
    contextCatData, roleCatData, nodeDefData, patternData
  ] = await Promise.all([
    "definitions/context_categories.json",
    "definitions/role_categories.json",
    "definitions/node_definitions.json",
    "mypattern.json"
  ].map(readJSONFile));
  console.log(contextCatData);
};


await readAll();


// const p = new Pattern("test", [], []);
// const s = pattern2svg(p, { useDropShadows: true });



