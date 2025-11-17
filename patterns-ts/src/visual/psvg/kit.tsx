/**
 * Pattern Explorer SVG conversion kit.
 */

import React, { ReactNode, useContext } from 'react';
import { COLOR, CARD_SIZE_THOUGHT, ArrowMarker } from '../skin';
import { SvgContext } from './config';


export const CARD_BORDER = 8;
export const CARD_RADIUS = 12;
export const CARD_FIELD_RADIUS = CARD_RADIUS - CARD_BORDER;


// TODO: Refactor and integrate with the thought bubble SVG used for the graph editor
const THOUGHT_PATH_DATA = (
  'm556.84 157.09c2.6758-13.41 3.9688-44.766-34.676-65.633-36.73-19.836-74.602-1.0469-91.828 ' +
  '10.074-5.6289-13.52-20.52-34.148-59.477-39.43-43.172-5.8359-71.719 17.754-83.391 ' +
  '30.055-15.727-13.809-58.832-40.305-125.02 5.0664-36.934 25.312-35.766 53.211-32.219 ' +
  '66.852-12.539 5.6914-36.379 20.707-45.68 55.047-9.8438 36.363 19.172 61.227 35.23 ' +
  '71.855-2.4141 3.3672-4.3789 7.4531-5.668 11.984-2.6641 9.3594-4.5469 28.34 12.785 50.348 ' +
  '18.816 23.879 49 20.57 67.008 13.957 5.5039 7.5781 17.293 18.598 39.48 19.293 19.32 ' +
  '0.70703 32.312-11.184 39.699-22.641 11.613 14.156 31.254 29.551 56.195 29.547 4.7383 0 ' +
  '9.6602-0.54688 14.762-1.7734 23.906-5.7383 39.457-29.125 46.82-43.113 15.109 13.59 49.465 ' +
  '37.625 93.93 26.176 48.832-12.602 56.895-56.391 58.172-73.309 20.535-5.4414 52.16-23.352 ' +
  '57.121-62.344 5.6367-44.289-29.566-72.742-43.246-82.012z'
);


const AltShadow = ({ pos, size }: {
  pos: [number, number],
  size: [number, number],
}) => (
  <>
    <rect
      x={pos[0] - 2}
      y={pos[1] - 2}
      width={size[0] + 4}
      height={size[1] + 4}
      rx={CARD_RADIUS + 3}
      ry={CARD_RADIUS + 3}
      fill="rgba(0, 0, 0, 0.04)"
    />
    <rect
      x={pos[0] - 1}
      y={pos[1] - 1}
      width={size[0] + 2}
      height={size[1] + 3}
      rx={CARD_RADIUS + 2}
      ry={CARD_RADIUS + 2}
      fill="rgba(0, 0, 0, 0.08)"
    />
    <rect
      x={pos[0]}
      y={pos[1] + 1}
      width={size[0]}
      height={size[1]}
      rx={CARD_RADIUS}
      ry={CARD_RADIUS}
      fill="rgba(0, 0, 0, 0.3)"
    />
  </>
);


export const Card = ({ pos, size, children }: {
  pos: [number, number],
  size: [number, number],
  children: ReactNode,
}) => {
  const { useDropShadows } = useContext(SvgContext);
  return (
    <g>
        { useDropShadows || <AltShadow pos={pos} size={size} /> }
        <rect
          x={pos[0]}
          y={pos[1]}
          width={size[0]}
          height={size[1]}
          rx={CARD_RADIUS}
          ry={CARD_RADIUS}
          fill={COLOR.CARD}
          {...(useDropShadows ? {filter: 'url(#p2s_shadow)'} : {})}
        />
        { children }
    </g>
  );
};


export const Field = ({ cardPos, cardSize, color }: {
  cardPos: [number, number],
  cardSize: [number, number],
  color: string,
}) => (
  <rect
    x={cardPos[0] + CARD_BORDER }
    y={cardPos[1] + CARD_BORDER }
    width={cardSize[0] - (2 * CARD_BORDER) }
    height={cardSize[1] - (2 * CARD_BORDER) }
    rx={CARD_FIELD_RADIUS}
    ry={CARD_FIELD_RADIUS}
    fill={color}
  />
);


export const TextBox = ({ pos, text, lineHeight, className, maxLines = 0 }: {
  pos: [number, number],
  text: string,
  lineHeight: number,
  className: string,
  maxLines?: number,
}) => {
  let lines = text.split('\n');
  if (maxLines && (lines.length > maxLines)) {
    lines = lines.slice(0, maxLines);
    lines[maxLines - 1] = lines[maxLines - 1] + '...';
  }

  return <>{
    lines.map((line, index) => (
      <text
        key={index.toString()}
        x={pos[0]}
        y={pos[1] + (lineHeight * index)}
        className={className}
      >{ line }</text>
    ))
  }</>;
};


export const ThoughtBubble = ({ pos }: {
  pos: [number, number],
}) => (
  <use
    href='#p2s_thought'
    x={pos[0]}
    y={pos[1]}
    width={CARD_SIZE_THOUGHT[0]}
    height={CARD_SIZE_THOUGHT[1]}
  />
);


export const SvgDocument = ({ pos, size, children }: {
  pos: [number, number],
  size: [number, number],
  children: ReactNode,
}) => {
  const { useDropShadows } = useContext(SvgContext);
  return (
    <svg
      viewBox={`${pos[0]} ${pos[1]} ${size[0]} ${size[1]}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .p2s_cardtitle, .p2s_carddescr {
          fill: ${COLOR.TEXT};
          text-anchor: middle;
        }
        .p2s_cardtitle {
          font: bold 15px sans-serif;
        }
        .p2s_carddescr {
          font: 13px sans-serif;
        }
        .p2s_arrowpath {
          stroke: ${COLOR.ARROW};
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-dasharray: 5;
          fill: none;
        }
        .p2s_arrowhead {
          stroke-dasharray: none;
        }
      `}</style>
      <defs>
        { useDropShadows &&
          <filter id='p2s_shadow'>
            <feDropShadow dx='0' dy='2' stdDeviation='1' floodOpacity='0.3' />
            <feDropShadow dx='0' dy='0' stdDeviation='2' floodOpacity='0.2' />
          </filter>
        }
        <symbol id='p2s_thought' viewBox='75 50 530 350'>
          <path fill={COLOR.CONTEXT_CAT[1].color} d={THOUGHT_PATH_DATA} />
        </symbol>
        <ArrowMarker id='p2s_arrowmarker' className='p2s_arrowhead' cairo />
      </defs>
      <rect x={pos[0]} y={pos[1]} width={size[0]} height={size[1]} fill={COLOR.BG_AIR} />
      { children }
    </svg>
  );
};
