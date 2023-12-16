import { tree, stratify } from 'd3-hierarchy';
import { Edge, Node, Position } from 'reactflow';

const g = tree();

interface Option {
  direction: 'TB' | 'BT' | 'LR' | 'RL'
}

export const hierarchyLayout = (nodes: Node[], edges: Edge[], option?: Option) => {
  if (nodes.length === 0) return { nodes, edges };

  const { width, height } = document
    .querySelector(`[data-id="${nodes[0].id}"]`)!
    .getBoundingClientRect();

  const hierarchy = stratify()
    .id((node: any) => node.id)
    .parentId((node: any) => edges.find((edge) => edge.target === node.id)?.source);

  // step1
  const root = hierarchy(nodes);

  // step2
  const layout = g.nodeSize([width * 2, height * 2])(root);
  const { direction = 'TB' } = option ?? {};
  const newNodes = layout
    .descendants()
    .map((node: any) => ({
      ...node.data,
      targetPosition: direction === 'TB' ? Position.Top : Position.Left,
      sourcePosition: direction === 'TB' ? Position.Bottom : Position.Right,
      position: { x: node.x, y: node.y },
    }));

  return {
    nodes: newNodes,
    edges,
  };
};