import { Node, Edge } from 'reactflow';
import { dagreLayout } from './dagreLayout';
import { pureMiddleWay } from './pureMiddleWay';

interface Option {
  direction: 'TB' | 'LR';
}

export function middleWay(_nodes: Node[], _edges: Edge[], { direction }: Option, ..._: any[]) {
  const layout = dagreLayout(_nodes, _edges, { direction });
  const { nodes, edges } = pureMiddleWay(layout.nodes, layout.edges, { direction });

  return { nodes, edges };
}