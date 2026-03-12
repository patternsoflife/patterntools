/**
 * Convert a pattern object to an SVG image.
 */

import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Pattern, PatternEdge } from '../../core.js';
import { PatternSVGConfig, SvgContext } from './config.js';
import { SvgDocument } from './kit.js';
import { NodeSVG } from './nodes.js';
import { EdgeSVG } from './edges.js';


// TODO: Refactor and integrate with the css styling of the graph editor
const MARGIN_X_START = 100;
const MARGIN_X_END = 300;
const MARGIN_Y_START = 100;
const MARGIN_Y_END = 300;


export const PatternSVG = ({ pattern, config }: {
  pattern: Pattern,
  config: PatternSVGConfig,
}) => {
  const xCoors = pattern.nodes.map(node => node.pos[0]);
  const yCoors = pattern.nodes.map(node => node.pos[1]);
  const xStart = Math.min(...xCoors) - MARGIN_X_START;
  const yStart = Math.min(...yCoors) - MARGIN_Y_START;
  const xEnd = Math.max(...xCoors) + MARGIN_X_END;
  const yEnd = Math.max(...yCoors) + MARGIN_Y_END;
  const width = xEnd - xStart;
  const height = yEnd - yStart;

  const edgeMap = new Map<string, { edge: PatternEdge, isBidirectional: boolean }>();

  for (const edge of pattern.edges) {
    const [s, t] = edge.nodes.map(node => node.crossRevisionId);
    const key = `${s}-${t}`;
    const reverseKey = `${t}-${s}`;

    if (edgeMap.has(reverseKey)) {
      edgeMap.set(reverseKey, { edge, isBidirectional: true });
    } else {
      edgeMap.set(key, { edge, isBidirectional: false });
    }
  }


  return (
    <SvgContext value={config}>
      <SvgDocument
        pos={[xStart, yStart]}
        size={[width, height]}
      >
        {
          Array.from(edgeMap.entries(), ([key, { edge, isBidirectional }]) => (
            <EdgeSVG
              key={key}
              edge={edge}
              isBidirectional={isBidirectional}
            />
          ))
        }
        {
          pattern.nodes.map(node => (
            <NodeSVG key={node.crossRevisionId} node={node} />
          ))
        }
      </SvgDocument>
    </SvgContext>
  );
};


export const pattern2svg = (pattern: Pattern, config: PatternSVGConfig) => {
  return ReactDOMServer.renderToStaticMarkup(
    <PatternSVG pattern={pattern} config={config} />
  );
};
