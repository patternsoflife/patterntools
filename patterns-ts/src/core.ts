/**
 * Core pattern interfaces and classes
 *
 * These are the class-based TypeScript definitions for the
 * core data models used in the Pattern Explorer application
 * and Patterns of Life data science tooling.
 */

export interface NodeCategory {
  id: number;
  name: string;
  isBuildingBlock: boolean;
}


export interface RoleCategory extends NodeCategory {
}


export interface ContextCategory extends NodeCategory {
  iconName: string;
}


export class NodeDefinition {
  id = 0;
  name = '';
  iconName = '';
  explanation = '';
  hyphenatedName = '';

  constructor(
    public contextCat: ContextCategory,
    public roleCat: RoleCategory,
    public isCustom = true,
  ) {}
}


// Temporary solution
// TODO: refactor
export const isThought = (roleCat: RoleCategory) => (roleCat.id === 5);


export class Pattern {
  constructor(
    public name: string,
    public nodes: PatternNode[],
    public edges: PatternEdge[],
    public pos: [number, number] = [0, 0],
    public zoom: number = 1,
    public locale: string,
  ) {}
}


export class PatternNode {
  constructor(
    public def: NodeDefinition,
    public pos: [number, number],
    public crossRevisionId: string,
    public customName = '',
    public description = '',
  ) {}

  get name(): string {
    return this.customName || this.def.name;
  }

  get hyphenatedName(): string {
    return this.customName || this.def.hyphenatedName;
  }
}


export class PatternEdge {
  nodes: [PatternNode, PatternNode];

  constructor(
    a: PatternNode,
    b: PatternNode,
    public crossRevisionId: string,
  ) {
    this.nodes = [a, b];
  }
}
