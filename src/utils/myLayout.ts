import { Node, Edge } from 'reactflow';
import { dagreLayout } from './dagreLayout';

export const myLayout = (nodes: Node[], edges: Edge[]) => {
  const start = nodes[0];
  const base = start.position;

  const _layout = dagreLayout(nodes, edges);
  nodes = _layout.nodes;
  edges = _layout.edges;

  nodes.forEach(nd => nd.position.y = base.y);

  const recurse = (node: Node, i = 0) => {
    node.position.y = Math.max(node.position.y, base.y + i * 100);

    const targets = edges.filter(ed => ed.source === node.id).map(ed => nodes.find(nd => nd.id === ed.target)!);

    targets.forEach(
      nd => {
        recurse(nd, i + 1);
      },
    );
  };

  recurse(start);
  // const hierarchyMap = nodes.reduce((map, nd) => {
  //   const x = nd.position.x;
  //   const list = map[x] ?? [];
  //   map[x] = [...list, nd];
  //   return map;
  // }, {} as Record<number, Node[]>);
  //
  // Object
  //   .values(hierarchyMap)
  //   .forEach((nds) => {
  //     nds.forEach((nd, i) => nd.position.x = i * 100 + base.x);
  //   });

  // const layout = pureMiddleWay(nodes, edges, { direction: 'TB', middleY: base.y });

  return { nodes, edges };
};