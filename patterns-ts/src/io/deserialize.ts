/**
 * Deserialization of patterns and associated classes.
 */

import {
  NodeCategory,
  ContextCategory,
  RoleCategory,
  NodeDefinition,
  Pattern,
  PatternNode,
  PatternEdge,
} from "@patternsoflife/patterns";
import {
  CategoryFields,
  NodeDefinitionFields,
  PatternLongFields,
} from "./types";


const deserializeContextCat = (data: CategoryFields): ContextCategory => ({
  id: data.id,
  name: data.name,
  iconName: data.icon || '',
  isBuildingBlock: data.is_building_block,
});


const deserializeRoleCat = (data: CategoryFields): RoleCategory => ({
  id: data.id,
  name: data.name,
  isBuildingBlock: data.is_building_block,
});


/**
 * Deserializer for patterns and associated classes.
 */
export class PatternDeserializer {
  readonly contextCats: ReadonlyArray<ContextCategory>;
  readonly roleCats: ReadonlyArray<RoleCategory>;
  readonly nodeDefs: ReadonlyArray<NodeDefinition>;
  readonly contextCatsById: ReadonlyMap<number, ContextCategory>;
  readonly roleCatsById: ReadonlyMap<number, RoleCategory>;
  readonly nodeDefsById: ReadonlyMap<number, NodeDefinition>;

  constructor(
    contextCatData: CategoryFields[],
    roleCatData: CategoryFields[],
    nodeDefData: NodeDefinitionFields[],
  ) {
    const comp = (a: NodeCategory, b: NodeCategory): number => a.id - b.id;
    this.contextCats = contextCatData.map(deserializeContextCat).sort(comp);
    this.contextCatsById = new Map(this.contextCats.map(x => [x.id, x]));
    this.roleCats = roleCatData.map(deserializeRoleCat).sort(comp);
    this.roleCatsById = new Map(this.roleCats.map(x => [x.id, x]));
    this.nodeDefs = nodeDefData.map(this._deserializeNodeDef);
    this.nodeDefsById = new Map(this.nodeDefs.map(x => [x.id, x]));
  }

  private _deserializeNodeDef = (data: NodeDefinitionFields): NodeDefinition => {
    const def = new NodeDefinition(
      this.contextCatsById.get(data.context),
      this.roleCatsById.get(data.role),
      data.is_generic,
    );
    def.id = data.id;
    if (!data.is_generic) {
      def.name = data.name;
    }
    def.iconName = data.icon;
    def.explanation = data.explanation;
    def.hyphenatedName = data.hyphenated_name;
    return def;
  };

  deserializePattern = (data: PatternLongFields): Pattern => {
    const nodeMap = new Map(
      data.nodes.map(n => [n.id, new PatternNode(
        this.nodeDefsById.get(n.definition),
        [n.position_x, n.position_y],
        n.cross_revision_id,
        n.custom_name,
        n.description,
      )])
    );

    const edges = data.edges.map(e => new PatternEdge(
      nodeMap.get(e.source),
      nodeMap.get(e.target),
      e.cross_revision_id,
    ));

    return new Pattern(
      data.name,
      [...nodeMap.values()],
      edges,
      [data.position_x, data.position_y],
      data.zoom,
      data.locale,
    );
  };

}
