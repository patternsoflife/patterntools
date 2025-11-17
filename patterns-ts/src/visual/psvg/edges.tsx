/**
 * Convert pattern edges to SVG.
 */

import { getBezierPath } from '@xyflow/react';
import { PatternEdge, PatternNode } from '@patternsoflife/patterns';
import { calcEdgePosition, calcNodeIntersection } from '../utils';
import { cardSize } from '../skin';


/**
 * Returns the intersection point of the line between the center of the
 * intersectionNode and the target node.
 */
const getNodeIntersection = (intersectionNode: PatternNode, targetNode: PatternNode) => {
  const [ix, iy] = intersectionNode.pos;
  const [iw, ih] = cardSize(intersectionNode.def.roleCat);
  const [tx, ty] = targetNode.pos;
  const [tw, th] = cardSize(targetNode.def.roleCat);
  return calcNodeIntersection({x: ix, y: iy}, iw, ih, {x: tx, y: ty}, tw, th);
};


/**
 * Returns the position passed node compared to the intersection point.
 */
const getEdgePosition = (node: PatternNode, intersectionPoint: {x: number, y: number}) => {
  const [x, y] = node.pos;
  const [w, h] = cardSize(node.def.roleCat);
  return calcEdgePosition({x, y}, w, h, intersectionPoint);
};


export const EdgeSVG = ({ edge }: {
  edge: PatternEdge,
}) => {
  const [source, target] = edge.nodes;

  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  const [d, ] = getBezierPath({
    sourceX: sourceIntersectionPoint.x,
    sourceY: sourceIntersectionPoint.y,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: targetIntersectionPoint.x,
    targetY: targetIntersectionPoint.y,
  });

  return (
    <path d={d} className='p2s_arrowpath' markerEnd="url(#p2s_arrowmarker)" />
  );
};
