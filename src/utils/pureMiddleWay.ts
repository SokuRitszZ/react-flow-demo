import { Node, Edge } from 'reactflow';

interface Option {
  direction: 'TB' | 'LR';
  middleY?: number;
}

export const pureMiddleWay = (nodes: Node[], edges: Edge[], option: Option) => {
  const { direction, middleY = 0 } = option;
  const sx: 'x' | 'y' = direction === 'LR' ? 'x' : 'y';
  const sy: 'x' | 'y' = sx === 'x' ? 'y' : 'x';

  const hierarchyNodeMap: Record<number, Node[]> = nodes.reduce(
    (map, node) => {
      const x = node.position[sx] | 0;
      const nodeList = map[x] ?? [];
      map[x] = [...nodeList, node];
      return map;
    },
    {} as Record<number, Node[]>,
  );

  Object.values(hierarchyNodeMap)
    .forEach(
      nodeList => {
        nodeList.sort((a, b) => a.position[sy] - b.position[sy]);
        let dy = 0;
        if (nodeList.length % 2 === 1)
          dy = middleY - nodeList[nodeList.length >> 1].position[sy];
        else
          dy = middleY - (nodeList.at(-1)!.position[sy] + nodeList[0].position[sy]) / 2;

        nodeList.forEach(node => node.position[sy] += dy);
      },
    );

  return { nodes, edges };
};