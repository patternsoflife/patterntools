/**
 * Visualization utilities.
 * 
 * Based on the Floating Edge example code from React Flow.
 */

import { Position } from '@xyflow/react';


/**
 * Calculate the intersection point of the line between the center of the
 * intersection node and the target node.
 */
export const calcNodeIntersection = (
  intersectionNodePosition: { x: number, y: number },
  intersectionNodeWidth: number,
  intersectionNodeHeight: number,
  targetNodePosition: { x: number, y: number },
  targetNodeWidth: number,
  targetNodeHeight: number,
) => {
  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetNodePosition.x + targetNodeWidth / 2;
  const y1 = targetNodePosition.y + targetNodeHeight / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
};


/**
 * Calculate the position passed node compared to the intersection point.
 */
export const calcEdgePosition = (
  nodePosition: { x: number, y: number },
  nodeWidth: number,
  nodeHeight: number,
  intersectionPoint: { x: number, y: number },
): Position => {
  const nx = Math.round(nodePosition.x);
  const ny = Math.round(nodePosition.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + nodeWidth - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= nodePosition.y + nodeHeight - 1) {
    return Position.Bottom;
  }

  return Position.Top;
};
