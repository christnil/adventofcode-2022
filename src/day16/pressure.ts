import { readLinesRemoveEmpty } from '../utils/input';
import printerFactory from '../utils/print';
import { Graph, graph, priorityQueue } from '../utils/datastruct';
import { bfs } from '../utils/alg';
import { sum } from '../utils/reduce';

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
          bfsResult[targetValve.id].distance + 1,
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
      const addedPressure = (30 - (step + edge.weight)) * edge.nodeTo.flowRate;
      if (addedPressure < 0) {
        return currentPressure;
      }
      return maxFlow(
        graph,
        edge.nodeTo,
        { ...opened, [edge.nodeTo.id]: true },
        step + edge.weight,
        currentPressure + addedPressure,
      );
    });
  return Math.max(currentPressure, ...moveOptions);
};

export const part1 = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);
  const valves = parseLines(lines);
  const graph = buildGraph(valves);
  const max = maxFlow(graph, valves.find((v) => v.id === 'AA')!, { AA: true });
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
              (26 - (step + edge.weight)) * edge.nodeTo.flowRate;
            if (addedPressure < 0) {
              return currentPressure;
            }
            return maxFlow2(
              graph,
              edge.nodeTo,
              nodeElephant,
              { ...opened, [edge.nodeTo.id]: true },
              step + edge.weight,
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
              (26 - (stepElephant + edge.weight)) * edge.nodeTo.flowRate;
            if (addedPressure < 0) {
              return currentPressure;
            }
            return maxFlow2(
              graph,
              node,
              edge.nodeTo,
              { ...opened, [edge.nodeTo.id]: true },
              step,
              stepElephant + edge.weight,
              currentPressure + addedPressure,
            );
          });
  return Math.max(currentPressure, ...moveOptions, ...moveOptionsElephant);
};

const maxFlowQueue = (graph: Graph<Valve>, startPos: Valve): number => {
  type FlowState = {
    n1: Valve;
    n1Step: number;
    n2: Valve;
    n2Step: number;
    opened: { [key: string]: boolean };
    flow: number;
    maxLeft: number;
  };
  let best = 0;
  const queue = priorityQueue<FlowState>(
    (a, b) => {
      const aVal = a.flow + a.maxLeft;
      const bVal = b.flow + b.maxLeft;
      if (aVal > bVal) {
        return -1;
      }
      if (aVal < bVal) {
        return 1;
      }
      return 0;
    },
    [
      {
        n1: startPos,
        n1Step: 0,
        n2: startPos,
        n2Step: 0,
        opened: { AA: true },
        flow: 0,
        maxLeft: 1,
      },
    ],
  );
  while (!queue.isEmpty()) {
    const item = queue.pop();
    if (item.flow + item.maxLeft < best) {
      continue;
    }
    graph
      .getEdges(item.n1.id)
      .filter((e) => !item.opened[e.nodeTo.id])
      .filter((e) => item.n1Step + e.weight < 26 - 1)
      .forEach((e) => {
        const n1Step = item.n1Step + e.weight;
        const flow = item.flow + (26 - n1Step) * e.nodeTo.flowRate;
        if (flow > best) {
          best = flow;
          console.log('New best: ', best);
        }
        const opened = { ...item.opened, [e.nodeTo.id]: true };
        const maxLeft = 26 - Math.min(n1Step, item.n2Step);
        const nodesLeft = graph
          .getNodes()
          .filter((node) => !opened[node.id])
          .map((node) => node.flowRate);
        const avgNode = nodesLeft.reduce(sum, 0) / nodesLeft.length;
        queue.push({
          n1: e.nodeTo,
          n1Step,
          n2: item.n2,
          n2Step: item.n2Step,
          opened,
          flow,
          maxLeft: maxLeft * avgNode,
        });
      });
    graph
      .getEdges(item.n2.id)
      .filter((e) => !item.opened[e.nodeTo.id])
      .filter((e) => item.n2Step + e.weight < 26 - 1)
      .forEach((e) => {
        const n2Step = item.n2Step + e.weight;
        const flow = item.flow + (26 - n2Step) * e.nodeTo.flowRate;
        if (flow > best) {
          best = flow;
          console.log('New best: ', best);
        }
        const opened = { ...item.opened, [e.nodeTo.id]: true };
        const maxLeft = 26 - Math.min(n2Step, item.n1Step);
        const nodesLeft = graph
          .getNodes()
          .filter((node) => !opened[node.id])
          .map((node) => node.flowRate);
        const avgNode = nodesLeft.reduce(sum, 0) / nodesLeft.length;
        queue.push({
          n2: e.nodeTo,
          n2Step,
          n1: item.n1,
          n1Step: item.n1Step,
          opened,
          flow,
          maxLeft: maxLeft * avgNode,
        });
      });
  }
  return best;
};

export const part2 = (fileName: string) => {
  const lines = readLinesRemoveEmpty(fileName);
  const valves = parseLines(lines);
  const graph = buildGraph(valves);
  const max = maxFlowQueue(graph, valves.find((v) => v.id === 'AA')!);
  return max;
};
