/**
 * Convert pattern nodes to SVG.
 */

import React from 'react';
import { PatternNode, isThought } from '@patternsoflife/patterns';
import { simpleWordWrap } from './text';
import {
  CARD_SIZE_BB,
  CARD_SIZE_THOUGHT,
  CARD_SIZE_CONS,
  COLOR,
} from '../skin';
import { Card, Field, ThoughtBubble, TextBox, CARD_BORDER } from './kit';


const TITLE_WIDTH_CHARS_BB = 13;
const TITLE_WIDTH_CHARS_THOUGHT = 17;
const TITLE_WIDTH_CHARS_CONS = 20;
const TITLE_LINE_HEIGHT = 17;
const TITLE_VERTICAL_OFFSET = 20;
const TITLE_VERTICAL_OFFSET_THOUGHT = 30;
const TITLE_MAX_LINES_THOUGHT = 6;
const TITLE_MAX_LINES_CONS = 4;

const DESCR_WIDTH_CHARS = 18;
const DESCR_LINE_HEIGHT = 14;
const DESCR_VERTICAL_OFFSET = 90;
const DESCR_MAX_LINES = 6;


const BBNodeSVG = ({ node }: { node: PatternNode }) => {
  const color = COLOR.CONTEXT_CAT[node.def.contextCat.id].color;
  return (
    <Card pos={node.pos} size={CARD_SIZE_BB}>
      <Field cardPos={node.pos} cardSize={CARD_SIZE_BB} color={color} />
      <TextBox
        pos={[
          node.pos[0] + (CARD_SIZE_BB[0] / 2),
          node.pos[1] + CARD_BORDER + TITLE_VERTICAL_OFFSET,
        ]}
        text={simpleWordWrap(node.hyphenatedName, TITLE_WIDTH_CHARS_BB)}
        lineHeight={TITLE_LINE_HEIGHT}
        className='p2s_cardtitle'
      />
      <TextBox
        pos={[
          node.pos[0] + (CARD_SIZE_BB[0] / 2),
          node.pos[1] + CARD_BORDER + DESCR_VERTICAL_OFFSET,
        ]}
        text={simpleWordWrap(node.description, DESCR_WIDTH_CHARS)}
        lineHeight={DESCR_LINE_HEIGHT}
        maxLines={DESCR_MAX_LINES}
        className='p2s_carddescr'
      />
    </Card>
  );
};


const ThoughtNodeSVG = ({ node }: { node: PatternNode }) => {
  return (
    <Card pos={node.pos} size={CARD_SIZE_THOUGHT}>
      <ThoughtBubble pos={node.pos} />
      <TextBox
        pos={[
          node.pos[0] + (CARD_SIZE_CONS[0] / 2),
          node.pos[1] + CARD_BORDER + TITLE_VERTICAL_OFFSET_THOUGHT,
        ]}
        text={simpleWordWrap(node.name, TITLE_WIDTH_CHARS_THOUGHT)}
        lineHeight={TITLE_LINE_HEIGHT}
        maxLines={TITLE_MAX_LINES_THOUGHT}
        className='p2s_cardtitle'
      />
    </Card>
  );
};


const ConsequenceNodeSVG = ({ node }: {
  node: PatternNode,
}) => {
  const color = COLOR.CONTEXT_CAT[node.def.contextCat.id].color;
  return (
    <Card pos={node.pos} size={CARD_SIZE_CONS}>
      <Field cardPos={node.pos} cardSize={CARD_SIZE_CONS} color={color} />
      <TextBox
        pos={[
          node.pos[0] + (CARD_SIZE_CONS[0] / 2),
          node.pos[1] + CARD_BORDER + TITLE_VERTICAL_OFFSET,
        ]}
        text={simpleWordWrap(node.name, TITLE_WIDTH_CHARS_CONS)}
        lineHeight={TITLE_LINE_HEIGHT}
        maxLines={TITLE_MAX_LINES_CONS}
        className='p2s_cardtitle'
      />
    </Card>
  );
};


export const NodeSVG = ({ node }: {
  node: PatternNode,
}) => {
  const SpecificNodeSVG = (
    node.def.roleCat.isBuildingBlock ? BBNodeSVG :
      isThought(node.def.roleCat) ? ThoughtNodeSVG :
        ConsequenceNodeSVG
  );
  return <SpecificNodeSVG node={node} />;
};
