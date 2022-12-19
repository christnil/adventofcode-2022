export const matrix = <T>(defaultValue?: T) => {
  const internal: { [k1: string]: { [k2: string]: T } } = {};

  const setWeight = (x: string, y: string, value: T) => {
    if (!internal[x]) {
      internal[x] = {};
    }
    internal[x][y] = value;
  };

  const getWeight = (x: string, y: string) => {
    (internal[x] || {})[y] || defaultValue || null;
  };

  return {
    setWeight,
    getWeight,
  };
};

export type Queue<T> = {
  push: (val: T) => void;
  peek: () => T;
  pop: () => T;
  isEmpty: () => boolean;
  length: () => number;
  clear: () => void;
};

export const priorityQueue = <T>(
  comp: (a: T, b: T) => number,
  items?: T[],
): Queue<T> => {
  let _queue: T[] = items || [];

  const push = (val: T) => {
    _queue.push(val);
    _queue.sort(comp);
  };

  const peek = () => {
    const item = _queue[0];
    if (!item) {
      throw new Error('No more items');
    }
    return item;
  };

  const pop = () => {
    const item = _queue.shift();
    if (!item) {
      throw new Error('No more items');
    }
    return item;
  };

  const isEmpty = () => _queue.length === 0;

  const length = () => _queue.length;

  const clear = () => {
    _queue = [];
  };

  return {
    push,
    peek,
    pop,
    isEmpty,
    length,
    clear,
  };
};

export type Edge<T> = {
  nodeFrom: T;
  nodeTo: T;
  weight: number;
};

export type Graph<T> = {
  addNode: (node: T) => void;
  addEdge: (from: T | string, to: T | string, weight?: number) => void;
  getEdges: (from: T | string) => Edge<T>[];
  getNodes: () => T[];
  setEdgeWeight: (from: T | string, to: T | string, weight?: number) => void;
};

export const graph = <T extends { id: string }>(nodes?: T[]): Graph<T> => {
  const _nodes: { [key: string]: T } =
    nodes?.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}) || {};
  const _edges: { [key: string]: Edge<T>[] } =
    nodes?.reduce((acc, curr) => ({ ...acc, [curr.id]: [] }), {}) || {};

  const addNode = (node: T) => {
    _nodes[node.id] = node;
    _edges[node.id] = [];
  };

  const addEdge = (from: T | string, to: T | string, weight = 1) => {
    const fromId = typeof from === 'string' ? from : from.id;
    const toId = typeof to === 'string' ? to : to.id;
    const nodeFrom = _nodes[fromId];
    const nodeTo = _nodes[toId];
    if (!nodeFrom || !nodeTo) {
      throw new Error('nodes not in graph');
    }
    if (_edges[nodeFrom.id].some((e) => e.nodeTo.id === nodeTo.id)) {
      throw new Error('node already have edge');
    }
    _edges[nodeFrom.id].push({ nodeTo, nodeFrom, weight });
  };

  const getEdges = (node: T | string) => {
    const nodeId = typeof node === 'string' ? node : node.id;
    const graphNode = _nodes[nodeId];
    if (!graphNode) {
      throw new Error('Node does not exist');
    }
    return _edges[graphNode.id];
  };

  const getNodes = (): T[] => {
    return Object.values(_nodes);
  };

  const setEdgeWeight = (from: T | string, to: T | string, weight = 1) => {
    const fromId = typeof from === 'string' ? from : from.id;
    const toId = typeof to === 'string' ? to : to.id;
    const nodeFrom = _nodes[fromId];
    const nodeTo = _nodes[toId];
    if (!nodeFrom || !nodeTo) {
      throw new Error('nodes not in graph');
    }
    const edge = _edges[nodeFrom.id].find((e) => e.nodeTo.id === nodeTo.id);
    if (!edge) {
      addEdge(from, to, weight);
    } else {
      edge.weight = weight;
    }
  };

  return {
    addNode,
    addEdge,
    getEdges,
    getNodes,
    setEdgeWeight,
  };
};
