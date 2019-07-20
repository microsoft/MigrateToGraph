import { Edge, Vertex } from '../models/graph-model';
import { escapeSingleQuote } from '../utils/safeString';

export function getAddVertexQuery(vertexObj: Vertex): string {
  const label = escapeSingleQuote(vertexObj.label);
  const query = `g.addV('${label}')`;
  return query + getIdQuery(vertexObj) + getPropertiesQuery(vertexObj);
}

export function getUpsertVertexQuery(vertexObj: Vertex): string {
  const id = escapeSingleQuote(vertexObj.id);
  const query = `g.V().has('${
    vertexObj.label
  }','id','${id}').fold().coalesce(unfold(),addV(${
    vertexObj.label
  }).property('id','${id}'))`;
  return query + getPropertiesQuery(vertexObj);
}

export function getUpdateVertexQuery(vertexObj: Vertex): string {
  const id = escapeSingleQuote(vertexObj.id);
  const query = `g.V().hasId('${id}')`;
  return query + getPropertiesQuery(vertexObj);
}

export function getUpdateEdgeQuery(edgeObj: Edge): string {
  const id = escapeSingleQuote(edgeObj.id);
  const query = `g.E().hasId('${id}')`;
  return query + getPropertiesQuery(edgeObj);
}

export function getUpsertEdgeQuery(edgeObj: Edge): string {
  const id = escapeSingleQuote(edgeObj.id);
  const query = `g.E().has('${
    edgeObj.label
  }','id','${id}').fold().coalesce(unfold(),g.V().has('id','${
    edgeObj.from
  }').addE('${edgeObj.label}').to(g.V().has('id','${
    edgeObj.to
  }')).property('id','${id}'))`;
  return query + getPropertiesQuery(edgeObj);
}

export function getAddEdgeQuery(edgeObj: Edge): string {
  const from = escapeSingleQuote(edgeObj.from);
  const to = escapeSingleQuote(edgeObj.to);
  const label = escapeSingleQuote(edgeObj.label);
  const query =
    `g.V().has('id','${from}').addE('${label}')` +
    `.to(g.V().has('id','${to}'))`;

  return query + getIdQuery(edgeObj) + getPropertiesQuery(edgeObj);
}

export function getPropertiesQuery(obj: Vertex | Edge): string {
  let query = '';
  if (obj.properties) {
    for (const key of Object.keys(obj.properties)) {
      if (key === 'id') {
        continue;
      }
      let value = obj.properties[key];
      if (typeof value === 'string') {
        value = escapeSingleQuote(value);
        value = `'${value}'`;
      }
      const safeKey = escapeSingleQuote(key);
      query += `.property('${safeKey}',${value})`;
    }
  }
  return query;
}

export function removeDuplicateVertexes(vertexes: Vertex[]) {
  const seen: { [key: string]: boolean } = {};
  return vertexes.filter(vertex => {
    return seen.hasOwnProperty(vertex.id) ? false : (seen[vertex.id] = true);
  });
}

export function removeDuplicateEdges(edges: Edge[]) {
  const seen: { [key: string]: boolean } = {};
  return edges.filter(edge => {
    let edgeId = `${edge.label}-${edge.from}-${edge.to}`;
    if (edge.id) {
      edgeId = edge.id;
    }
    return seen.hasOwnProperty(edgeId) ? false : (seen[edgeId] = true);
  });
}

function getIdQuery(obj: Vertex | Edge) {
  if (!obj.id) {
    return '';
  }
  return `.property('id','${obj.id}')`;
}
