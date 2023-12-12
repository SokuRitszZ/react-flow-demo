import { Node, Edge } from 'reactflow';
import { dagreLayout } from './dagreLayout';

export function middleWay(_nodes: Node[], _edges: Edge[], ..._: any[]) {
  const middleY = 0;

  const { nodes, edges } = dagreLayout(_nodes, _edges, { direction: 'LR' });
  const hierarchyNodeMap: Record<number, Node[]> = nodes.reduce(
    (map, node) => {
      const x = node.position.x | 0;
      const nodeList = map[x] ?? [];
      map[x] = [...nodeList, node];
      return map;
    },
    {} as Record<number, Node[]>,
  );

  Object.values(hierarchyNodeMap)
    .forEach(
      nodeList => {
        nodeList.sort((a, b) => a.position.y - b.position.y);
        let dy = 0;
        if (nodeList.length % 2 === 1) {
          dy = middleY - nodeList[nodeList.length >> 1].position.y;
        }
        else {
          dy = middleY - (nodeList.at(-1)!.position.y + nodeList[0].position.y) / 2;
        }
        nodeList.forEach(node => node.position.y += dy);
      },
    );

  return { nodes, edges };
}