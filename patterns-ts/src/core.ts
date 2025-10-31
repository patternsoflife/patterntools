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
