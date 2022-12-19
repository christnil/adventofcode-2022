import { Graph, priorityQueue, Queue } from './datastruct';

type BfsQueueItem<T> = {
  node: T;
  parent?: T;
  distance: number;
};

export const bfs = <T extends { id: string }>(
  graph: Graph<T>,
  start: T,
  end?: T,
) => {
  const queue: Queue<BfsQueueItem<T>> = priorityQueue(
    (a, b) => {
      if (a.distance > b.distance) {
        return 1;
      }
      if (a.distance < b.distance) {
        return -1;
      }
      return 0;
    },
    [{ node: start, distance: 0 }],
  );
  const visited: {
    [key: string]: { node: T; distance: number; path: string[] };
  } = {};
  while (!queue.isEmpty() && (!end || !visited[end.id])) {
    const item = queue.pop();
    if (
      !visited[item.node.id] ||
      item.distance < visited[item.node.id].distance
    ) {
      visited[item.node.id] = {
        distance: item.distance,
        node: item.node,
        path: item.parent
          ? [...visited[item.parent.id].path, item.parent.id]
          : [],
      };
      graph.getEdges(item.node).forEach((edge) => {
        if (!visited[edge.nodeTo.id]) {
          queue.push({
            node: edge.nodeTo,
            parent: item.node,
            distance: item.distance + edge.weight,
          });
        }
      });
    }
  }
  return visited;
};
