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
