import { readLinesRemoveEmpty } from '../utils/input';
import printerFactory from '../utils/print';
import { Graph, graph } from '../utils/datastruct';
import { bfs } from '../utils/alg';

const printer = printerFactory();
const DEBUG = true;

type Valve = {
  id: string;
  flowRate: number;
  tunnels: string[];
};

const parseLine = (line: string): Valve => {
  const flowRate = (function getFlowRate() {
    const start = line.indexOf('=') + 1;
    const end = line.indexOf(';');
    return parseInt(line.slice(start, end), 10);
  })();
  const id = line.split(' ')[1];
  const tunnels = (function getTunnels() {
    const start = line.indexOf('valves');
    if (start > 0) {
      const substring = line.substring(start + 'valves '.length);
      return substring.split(', ');
    }
    const startSingleTunnel = line.indexOf(' valve ');
    return line.substring(startSingleTunnel + ' valve '.length).split(', ');
  })();
  return {
    id,
    flowRate,
    tunnels,
  };
};

const parseLines = (lines: string[]) => lines.map(parseLine);

const buildGraph = (valves: Valve[]): Graph<Valve> => {
  const initialGraph = graph<Valve>(valves);
  valves.forEach((valve) => {
    valve.tunnels.forEach((to) => {
      initialGraph.addEdge(valve, to, 1);
    });
  });
  const nonNullValves = valves.filter((v) => v.flowRate > 0 || v.id === 'AA');
  const mainGraph = graph<Valve>(nonNullValves);
  for (const valve of nonNullValves) {
    const bfsResult = bfs(initialGraph, valve);
    for (const targetValve of nonNullValves) {
      if (
        bfsResult[targetValve.id] &&
        targetValve.id !== valve.id &&
        targetValve.id !== 'AA'
      ) {
        mainGraph.addEdge(
          valve,
          targetValve,
          bfsResult[targetValve.id].distance,
        );
      }
    }
  }
  return mainGraph;
};

const maxFlow = (
  graph: Graph<Valve>,
  node: Valve,
  opened: { [key: string]: boolean },
  step = 0,
  currentPressure = 0,
): number => {
  if (step >= 30) {
    return currentPressure;
  }
  const moveOptions = graph
    .getEdges(node.id)
    .filter((edge) => !opened[edge.nodeTo.id])
    .map((edge) => {
      const addedPressure =
        (30 - (step + edge.weight + 1)) * edge.nodeTo.flowRate;
      if (addedPressure < 0) {
        return currentPressure;
      }
      return maxFlow(
        graph,
        edge.nodeTo,
        { ...opened, [edge.nodeTo.id]: true },
        step + edge.weight + 1,
        currentPressure + addedPressure,
      );
    });
  return Math.max(currentPressure, ...moveOptions);
};

export const part1 = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);
  const valves = parseLines(lines);
  const graph = buildGraph(valves);
  const max = maxFlow(
    graph,
    valves.find((v) => v.id === 'AA')!,
    valves
      .filter((v) => v.flowRate === 0)
      .reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {}),
  );
  return max;
};

const maxFlow2 = (
  graph: Graph<Valve>,
  node: Valve,
  nodeElephant: Valve,
  opened: { [key: string]: boolean },
  step = 0,
  stepElephant = 0,
  currentPressure = 0,
): number => {
  const moveOptions =
    step >= 25
      ? []
      : graph
          .getEdges(node.id)
          .filter((edge) => !opened[edge.nodeTo.id])
          .map((edge) => {
            const addedPressure =
              (26 - (step + edge.weight + 1)) * edge.nodeTo.flowRate;
            if (addedPressure < 0) {
              return currentPressure;
            }
            return maxFlow2(
              graph,
              edge.nodeTo,
              nodeElephant,
              { ...opened, [edge.nodeTo.id]: true },
              step + edge.weight + 1,
              stepElephant,
              currentPressure + addedPressure,
            );
          });
  const moveOptionsElephant =
    stepElephant >= 25
      ? []
      : graph
          .getEdges(nodeElephant.id)
          .filter((edge) => !opened[edge.nodeTo.id])
          .map((edge) => {
            const addedPressure =
              (26 - (stepElephant + edge.weight + 1)) * edge.nodeTo.flowRate;
            if (addedPressure < 0) {
              return currentPressure;
            }
            return maxFlow2(
              graph,
              node,
              edge.nodeTo,
              { ...opened, [edge.nodeTo.id]: true },
              step,
              stepElephant + edge.weight + 1,
              currentPressure + addedPressure,
            );
          });
  return Math.max(currentPressure, ...moveOptions, ...moveOptionsElephant);
};
export const part2 = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);
  const valves = parseLines(lines);
  const graph = buildGraph(valves);
  const max = maxFlow2(
    graph,
    valves.find((v) => v.id === 'AA')!,
    valves.find((v) => v.id === 'AA')!,
    valves
      .filter((v) => v.flowRate === 0)
      .reduce((acc, curr) => ({ ...acc, [curr.id]: true }), {}),
  );
  return max;
};
