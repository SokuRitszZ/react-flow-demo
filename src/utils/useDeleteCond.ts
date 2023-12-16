import { useCallback } from 'react';
import { useReactFlow } from 'reactflow';
import { e, myLayout } from './index.ts';

export const useDeleteCond = () => {
  const { getNode, getEdges, getNodes } = useReactFlow();
  return useCallback(
    (id: string) => {
      let edges = getEdges();
      let nodes = getNodes().filter(nd => nd.id !== id);

      const parentAddBranchNodeId = edges.find(ed => ed.target === id)!.source;
      const parentAddBranchNode = getNode(parentAddBranchNodeId)!;
      edges = edges.filter(ed => ed.target !== id);

      const queue = [id];
      let i = 0;
      while (i < queue.length) {
        const u = getNode(queue[i++])!;
        if (u.type === 'EndBranchNode') continue;

        const sourceEdges = edges.filter(ed => ed.source === u.id);
        const sourceEdgeTargets = sourceEdges.map(ed => ed.target);
        const sourceEdgeIds = sourceEdges.map(ed => ed.id);
        const newEdges = edges.filter(ed => !sourceEdgeIds.includes(ed.id));
        const deletableNodeIds = sourceEdgeTargets
          .filter(ndId => !newEdges.find(ed => ed.target === ndId));

        queue.push(...deletableNodeIds);
        edges = newEdges;
        nodes = nodes.filter(nd => !deletableNodeIds.includes(nd.id));
      }

      if (!edges.find(ed => ed.source === parentAddBranchNodeId)) {
        const endBranchNode = getNode(queue.at(-1)!)!;
        nodes = nodes
          .filter(nd => ![parentAddBranchNode.id, endBranchNode.id].includes(nd.id));
        edges = edges
          .filter(ed => ed.target !== parentAddBranchNode.id && ed.source !== endBranchNode.id)
          .concat(e('CommonEdge')(parentAddBranchNode.data.parentId, endBranchNode.data.sonId));
      }

      return myLayout(nodes, edges);
    },
    [getEdges, getNode, getNodes],
  );
};