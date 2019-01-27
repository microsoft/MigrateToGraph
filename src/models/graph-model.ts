export interface Vertex {
  id: string;
  label: string;
  properties: {
    [key: string]: any;
  };
}

export interface Edge {
  id?: string;
  label: string;
  to: string;
  from: string;
  properties?: {
    [key: string]: any;
  };
}

export interface GraphInfo {
  vertices: Vertex[];
  edges: Edge[];
}

export interface VertexEdgeArray {
  [index: number]: Vertex | Edge;
}

// tslint:disable-next-line:interface-name
export interface GraphCmd {
  vertexCmd: string[];
  edgeCmd: string[];
}

export enum Etype {
  vertex = 'vertex',
  edge = 'edge',
}
