import Dagre from '@dagrejs/dagre';
import { Edge, Node, Position } from 'reactflow';

interface Option { direction?: 'TB' | 'LR' | 'BT' | 'RL'; }

export const dagreLayout = (nodes: Node[], edges: Edge[], options?: Option) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  const { direction = 'TB' } = options ?? {};
  g.setGraph({ rankdir: direction, nodesep: 100, ranksep: 100 });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });
  // ?
  nodes.forEach((node) => g.setNode(node.id, node as any));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const { x, y } = g.node(node.id);
      node.targetPosition = ['TB', 'BT'].includes(direction) ? Position.Top : Position.Left;
      node.sourcePosition = ['TB', 'BT'].includes(direction) ? Position.Bottom : Position.Right;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};