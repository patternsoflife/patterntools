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
} from "../core.js";
import {
  CategoryFields,
  NodeDefinitionFields,
  PatternLongFields,
} from "./types.js";


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


class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}


const validate = <K, V>(map: ReadonlyMap<K, V>, id: K, entity: string): V => {
  const v = map.get(id);
  if (v === undefined) {
    throw new ValidationError(`Unknown ${entity} id: ${id}`);
  }
  return v;
}


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
      validate(this.contextCatsById, data.context, "context category"),
      validate(this.roleCatsById, data.role, "role category"),
      data.is_generic,
    );
    def.id = data.id;
    if (!data.is_generic) {
      def.name = data.name;
    }
    def.iconName = data.icon || '';
    def.explanation = data.explanation;
    def.hyphenatedName = data.hyphenated_name;
    return def;
  };

  deserializePattern = (data: PatternLongFields): Pattern => {
    const nodeMap = new Map(
      data.nodes.map(n => [n.id, new PatternNode(
        validate(this.nodeDefsById, n.definition, "node definition"),
        [n.position_x, n.position_y],
        n.cross_revision_id,
        n.custom_name,
        n.description,
      )])
    );

    const edges = data.edges.map(e => new PatternEdge(
      validate(nodeMap, e.source, "node"),
      validate(nodeMap, e.target, "node"),
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
