/**
 * Skin definitions.
 *
 * These are aspects of the styling that affect both how the Pattern
 * Explorer renders cards and arrows on the canvas and how the SVGs
 * are being generated and styled. Furthermore, in the future we may
 * want to introduce multiple skins that offer very different visual
 * presentations. The definitions in this file might then become part
 * of the classic skin, for example.
 */

import React from 'react';
import { RoleCategory, isThought } from "@patternsoflife/patterns";


export const CARD_SIZE_BB: [number, number] = [140, 180];
export const CARD_SIZE_THOUGHT: [number, number] = [200, 140];
export const CARD_SIZE_CONS: [number, number] = [200, 100];


export const cardSize = (roleCat: RoleCategory) => (
  roleCat.isBuildingBlock ? CARD_SIZE_BB :
    isThought(roleCat) ? CARD_SIZE_THOUGHT :
      CARD_SIZE_CONS
);


export const COLOR = {
  ARROW: '#808080',
  ARROW_MARKER: '#909090',
  ARROW_SELECTED: '#008cff',
  BG_AIR: '#f3faff',
  CARD: '#ffffff',
  CONTEXT_CAT: {
    1: { color: '#c0c0c0', light: '#d8d8d8', dark: '#808080' },
    2: { color: '#7ebfff', light: '#bedfff', dark: '#337cc5' },
    3: { color: '#fe558e', light: '#feaac6', dark: '#d92e68' },
    4: { color: '#ecc63f', light: '#f5e29f', dark: '#bc9818' },
    5: { color: '#1db279', light: '#bbe8d7', dark: '#0c905e' },
  },
  TEXT: '#ffffff',
};


const Marker = ({ id, className, children }) => (
  <marker
    className={className}
    id={id}
    markerWidth="20"
    markerHeight="20"
    viewBox="-10 -10 20 20"
    orient="auto"
    refX="0"
    refY="0"
  >
    {children}
  </marker>
);


export const ArrowMarker = ({ id, className = '', selected = false, cairo = false }: {
  id: string,
  className?: string,
  selected?: boolean,
  cairo?: boolean,
}) => (
  <Marker id={id} className={className || "react-flow__arrowhead"}>
    <polyline
      stroke={selected ? COLOR.ARROW_SELECTED : COLOR.ARROW_MARKER}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      fill="none"
      points="-7,-4 -0.5,0 -7,4"
      {...(cairo ? { strokeDasharray: "20 0.01" } : {})}
    />
  </Marker>
);
