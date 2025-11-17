/**
 * Pattern I/O types.
 * 
 * These types define the fields of certain JSON objects returned by
 * various endpoints in the Patterns of Life ecosystem.
 */

export interface CategoryFields {
  id: number;
  name: string;
  is_building_block: boolean;
  icon?: string;
}

export interface NodeDefinitionFields {
  id: number;
  name: string;
  context: number;
  role: number;
  icon?: string;
  explanation: string;
  is_generic: boolean;
  hyphenated_name: string;
}

export interface PatternNodeFields {
  id: number,
  definition: number,
  custom_name: string,
  description: string,
  position_x: number,
  position_y: number,
  cross_revision_id: string,
}

export interface PatternEdgeFields {
  source: number,
  target: number,
  cross_revision_id: string,
}

export interface PatternShortFields {
  id: number,
  name: string,
  created: string,
  locale: string,
}

export interface PatternLongFields extends PatternShortFields {
  position_x: number,
  position_y: number,
  zoom: number,
  nodes: PatternNodeFields[],
  edges: PatternEdgeFields[],
}
