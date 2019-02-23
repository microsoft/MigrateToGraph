/* tslint:disable */
declare module "gremlin"{
  export namespace driver {
    class Client {
      constructor(url: any, options: any);
      close(): any;
      open(): any;
      submit(message: any, bindings?: any): any;
    }
    class DriverRemoteConnection {
      constructor(url: any, options: any);
      close(): any;
      open(): any;
      submit(bytecode: any): any;
    }
    class RemoteConnection {
      constructor(url: any);
      url: any;
      close(): void;
      open(): void;
      submit(bytecode: any): void;
    }
    class RemoteStrategy {
      constructor(connection: any);
      connection: any;
      apply(traversal: any): any;
    }
    class RemoteTraversal {
      constructor(traversers: any, sideEffects: any);
      traversers: any;
      sideEffects: any;
      getBytecode(): any;
      iterate(): any;
      next(): any;
      toList(): any;
    }
    class ResultSet {
      constructor(items: any, attributes: any);
      attributes: any;
      length: any;
      first(): any;
      toArray(): any;
    }
    namespace auth {
      class Authenticator {
        constructor(options: any);
        evaluateChallenge(challenge: any): void;
      }
      class PlainTextSaslAuthenticator {
        constructor(username: any, password: any, authzid?: any);
        evaluateChallenge(challenge: any): any;
      }
    }
  }
  export namespace process {
    class AnonymousTraversalSource {
      static traversal(): any;
      withGraph(graph: any): any;
      withRemote(remoteConnection: any): any;
    }
    class Bytecode {
      constructor(toClone: any);
      sourceInstructions: any;
      stepInstructions: any;
      addSource(name: any, values: any): any;
      addStep(name: any, values: any): any;
    }
    class EnumValue {
      constructor(typeName: any, elementName: any);
      typeName: any;
      elementName: any;
    }
    class GraphTraversal {
      constructor(graph: any, traversalStrategies: any, bytecode: any);
      V(args: any): any;
      addE(args: any): any;
      addV(args: any): any;
      aggregate(args: any): any;
      and(args: any): any;
      as(args: any): any;
      barrier(args: any): any;
      both(args: any): any;
      bothE(args: any): any;
      bothV(args: any): any;
      branch(args: any): any;
      by(args: any): any;
      cap(args: any): any;
      choose(args: any): any;
      coalesce(args: any): any;
      coin(args: any): any;
      connectedComponent(args: any): any;
      constant(args: any): any;
      count(args: any): any;
      cyclicPath(args: any): any;
      dedup(args: any): any;
      drop(args: any): any;
      emit(args: any): any;
      filter(args: any): any;
      flatMap(args: any): any;
      fold(args: any): any;
      from_(args: any): any;
      getBytecode(): any;
      group(args: any): any;
      groupCount(args: any): any;
      has(args: any): any;
      hasId(args: any): any;
      hasKey(args: any): any;
      hasLabel(args: any): any;
      hasNot(args: any): any;
      hasValue(args: any): any;
      id(args: any): any;
      identity(args: any): any;
      inE(args: any): any;
      inV(args: any): any;
      in_(args: any): any;
      index(args: any): any;
      inject(args: any): any;
      is(args: any): any;
      iterate(): any;
      key(args: any): any;
      label(args: any): any;
      limit(args: any): any;
      local(args: any): any;
      loops(args: any): any;
      map(args: any): any;
      match(args: any): any;
      math(args: any): any;
      max(args: any): any;
      mean(args: any): any;
      min(args: any): any;
      next(): any;
      not(args: any): any;
      option(args: any): any;
      optional(args: any): any;
      or(args: any): any;
      order(args: any): any;
      otherV(args: any): any;
      out(args: any): any;
      outE(args: any): any;
      outV(args: any): any;
      pageRank(args: any): any;
      path(args: any): any;
      peerPressure(args: any): any;
      profile(args: any): any;
      program(args: any): any;
      project(args: any): any;
      properties(args: any): any;
      property(args: any): any;
      propertyMap(args: any): any;
      range(args: any): any;
      read(args: any): any;
      repeat(args: any): any;
      sack(args: any): any;
      sample(args: any): any;
      select(args: any): any;
      shortestPath(args: any): any;
      sideEffect(args: any): any;
      simplePath(args: any): any;
      skip(args: any): any;
      store(args: any): any;
      subgraph(args: any): any;
      sum(args: any): any;
      tail(args: any): any;
      timeLimit(args: any): any;
      times(args: any): any;
      to(args: any): any;
      toE(args: any): any;
      toList(): any;
      toV(args: any): any;
      tree(args: any): any;
      unfold(args: any): any;
      union(args: any): any;
      until(args: any): any;
      value(args: any): any;
      valueMap(args: any): any;
      values(args: any): any;
      where(args: any): any;
      with_(args: any): any;
      write(args: any): any;
    }
    class GraphTraversalSource {
      constructor(graph: any, traversalStrategies: any, bytecode: any);
      graph: any;
      traversalStrategies: any;
      bytecode: any;
      E(args: any): any;
      V(args: any): any;
      addE(args: any): any;
      addV(args: any): any;
      inject(args: any): any;
      io(args: any): any;
      withBulk(args: any): any;
      withPath(args: any): any;
      withRemote(remoteConnection: any): any;
      withSack(args: any): any;
      withSideEffect(args: any): any;
      withStrategies(args: any): any;
      with_(args: any): any;
      withoutStrategies(args: any): any;
    }
    class P {
      static between(args: any): any;
      static eq(args: any): any;
      static gt(args: any): any;
      static gte(args: any): any;
      static inside(args: any): any;
      static lt(args: any): any;
      static lte(args: any): any;
      static neq(args: any): any;
      static not(args: any): any;
      static outside(args: any): any;
      static test(args: any): any;
      static within(args: any): any;
      static without(args: any): any;
      constructor(operator: any, value: any, other: any);
      operator: any;
      value: any;
      other: any;
      and(arg: any): any;
      or(arg: any): any;
    }
    class TextP {
      static containing(args: any): any;
      static endingWith(args: any): any;
      static notContaining(args: any): any;
      static notEndingWith(args: any): any;
      static notStartingWith(args: any): any;
      static startingWith(args: any): any;
      constructor(operator: any, value: any, other: any);
      operator: any;
      value: any;
      other: any;
      and(arg: any): any;
      or(arg: any): any;
    }
    class Translator {
      constructor(traversalSource: any);
      getTargetLanguage(): any;
      getTraversalSource(): any;
      of(traversalSource: any): void;
      translate(bytecode: any): any;
    }
    class Traversal {
      constructor(graph: any, traversalStrategies: any, bytecode: any);
      graph: any;
      traversalStrategies: any;
      bytecode: any;
      traversers: any;
      sideEffects: any;
      getBytecode(): any;
      iterate(): any;
      next(): any;
      toList(): any;
    }
    class TraversalSideEffects {
    }
    class TraversalStrategies {
      constructor(parent: any);
      strategies: any;
      addStrategy(strategy: any): void;
      applyStrategies(traversal: any): any;
    }
    class TraversalStrategy {
      apply(traversal: any): void;
    }
    class Traverser {
      constructor(object: any, bulk: any);
      object: any;
      bulk: any;
    }
    const barrier: {
      normSack: {
        elementName: string;
        typeName: string;
      };
    };
    const cardinality: {
      list: {
        elementName: string;
        typeName: string;
      };
      set: {
        elementName: string;
        typeName: string;
      };
      single: {
        elementName: string;
        typeName: string;
      };
    };
    const column: {
      keys: {
        elementName: string;
        typeName: string;
      };
      values: {
        elementName: string;
        typeName: string;
      };
    };
    const direction: {
      both: {
        elementName: string;
        typeName: string;
      };
      in: {
        elementName: string;
        typeName: string;
      };
      out: {
        elementName: string;
        typeName: string;
      };
    };
    const operator: {
      addAll: {
        elementName: string;
        typeName: string;
      };
      and: {
        elementName: string;
        typeName: string;
      };
      assign: {
        elementName: string;
        typeName: string;
      };
      div: {
        elementName: string;
        typeName: string;
      };
      max: {
        elementName: string;
        typeName: string;
      };
      min: {
        elementName: string;
        typeName: string;
      };
      minus: {
        elementName: string;
        typeName: string;
      };
      mult: {
        elementName: string;
        typeName: string;
      };
      or: {
        elementName: string;
        typeName: string;
      };
      sum: {
        elementName: string;
        typeName: string;
      };
      sumLong: {
        elementName: string;
        typeName: string;
      };
    };
    const order: {
      asc: {
        elementName: string;
        typeName: string;
      };
      decr: {
        elementName: string;
        typeName: string;
      };
      desc: {
        elementName: string;
        typeName: string;
      };
      incr: {
        elementName: string;
        typeName: string;
      };
      shuffle: {
        elementName: string;
        typeName: string;
      };
    };
    const pick: {
      any: {
        elementName: string;
        typeName: string;
      };
      none: {
        elementName: string;
        typeName: string;
      };
    };
    const pop: {
      all: {
        elementName: string;
        typeName: string;
      };
      first: {
        elementName: string;
        typeName: string;
      };
      last: {
        elementName: string;
        typeName: string;
      };
      mixed: {
        elementName: string;
        typeName: string;
      };
    };
    const scope: {
      global: {
        elementName: string;
        typeName: string;
      };
      local: {
        elementName: string;
        typeName: string;
      };
    };
    namespace statics {
      function V(args: any): void;
      function addE(args: any): void;
      function addV(args: any): void;
      function aggregate(args: any): void;
      function and(args: any): void;
      function as(args: any): void;
      function barrier(args: any): void;
      function both(args: any): void;
      function bothE(args: any): void;
      function bothV(args: any): void;
      function branch(args: any): void;
      function cap(args: any): void;
      function choose(args: any): void;
      function coalesce(args: any): void;
      function coin(args: any): void;
      function constant(args: any): void;
      function count(args: any): void;
      function cyclicPath(args: any): void;
      function dedup(args: any): void;
      function drop(args: any): void;
      function emit(args: any): void;
      function filter(args: any): void;
      function flatMap(args: any): void;
      function fold(args: any): void;
      function group(args: any): void;
      function groupCount(args: any): void;
      function has(args: any): void;
      function hasId(args: any): void;
      function hasKey(args: any): void;
      function hasLabel(args: any): void;
      function hasNot(args: any): void;
      function hasValue(args: any): void;
      function id(args: any): void;
      function identity(args: any): void;
      function inE(args: any): void;
      function inV(args: any): void;
      function in_(args: any): void;
      function index(args: any): void;
      function inject(args: any): void;
      function is(args: any): void;
      function key(args: any): void;
      function label(args: any): void;
      function limit(args: any): void;
      function local(args: any): void;
      function loops(args: any): void;
      function map(args: any): void;
      function match(args: any): void;
      function math(args: any): void;
      function max(args: any): void;
      function mean(args: any): void;
      function min(args: any): void;
      function not(args: any): void;
      function optional(args: any): void;
      function or(args: any): void;
      function order(args: any): void;
      function otherV(args: any): void;
      function out(args: any): void;
      function outE(args: any): void;
      function outV(args: any): void;
      function path(args: any): void;
      function project(args: any): void;
      function properties(args: any): void;
      function property(args: any): void;
      function propertyMap(args: any): void;
      function range(args: any): void;
      function repeat(args: any): void;
      function sack(args: any): void;
      function sample(args: any): void;
      function select(args: any): void;
      function sideEffect(args: any): void;
      function simplePath(args: any): void;
      function skip(args: any): void;
      function store(args: any): void;
      function subgraph(args: any): void;
      function sum(args: any): void;
      function tail(args: any): void;
      function timeLimit(args: any): void;
      function times(args: any): void;
      function to(args: any): void;
      function toE(args: any): void;
      function toV(args: any): void;
      function tree(args: any): void;
      function unfold(args: any): void;
      function union(args: any): void;
      function until(args: any): void;
      function value(args: any): void;
      function valueMap(args: any): void;
      function values(args: any): void;
      function where(args: any): void;
    }
    const t: {
      id: {
        elementName: string;
        typeName: string;
      };
      key: {
        elementName: string;
        typeName: string;
      };
      label: {
        elementName: string;
        typeName: string;
      };
      value: {
        elementName: string;
        typeName: string;
      };
    };
    function traversal(): any;
    const withOptions: {
      all: number;
      ids: number;
      indexer: string;
      keys: number;
      labels: number;
      list: number;
      map: number;
      none: number;
      tokens: string;
      values: number;
    };
  }
  export namespace structure {
    class Edge {
      constructor(id: any, outV: any, label: any, inV: any, properties: any);
      outV: any;
      inV: any;
      properties: any;
      equals(other: any): any;
    }
    class Graph {
      traversal(): any;
    }
    class Path {
      constructor(labels: any, objects: any);
      labels: any;
      objects: any;
      equals(other: any): any;
    }
    class Property {
      constructor(key: any, value: any);
      key: any;
      value: any;
      equals(other: any): any;
    }
    class Vertex {
      constructor(id: any, label: any, properties: any);
      properties: any;
      equals(other: any): any;
    }
    class VertexProperty {
      constructor(id: any, label: any, value: any, properties: any);
      value: any;
      key: any;
      properties: any;
      equals(other: any): any;
    }
    namespace io {
      class GraphSONReader {
        constructor(options: any);
        read(obj: any): any;
      }
      class GraphSONWriter {
        constructor(options: any);
        adaptObject(value: any): any;
        write(obj: any): any;
      }
    }
    function toLong(value: any): any;
  }
}
