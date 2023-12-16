import { useCallback } from 'react';
import { Node, Edge, useReactFlow } from 'reactflow';
import { gid, e, n, myLayout } from '.';

/**
 * 如果创建 Branch Node 就要传两个普通节点的 id
 * 如果在 Branch Node 里面创建一个新的分支就要传 addNode 和 endNode 的 id
 * @param edgeId
 */
export const useAddBranch = (edgeId?: string) => {
  const {
    setEdges,
    setNodes,
    getNodes,
    getEdges,
  } = useReactFlow();

  return useCallback(
    (fromId: string, toId: string) => {
      const newE = e('CommonEdge');
      // f->t
      // f->ad->cond->ed->t
      const newNodes: Node[] = [...getNodes()];
      const newEdges: Edge[] = [...getEdges()];
      if (edgeId) {
        const endNode: Node = n('EndBranchNode')(gid());
        const addNode: Node = n('AddBranchNode')(gid());
        const condNode: Node = n('CondNode')(gid());
        addNode.data = {
          endNodeId: endNode.id,
          parentId: fromId,
        };
        endNode.data = {
          sonId: toId,
        };

        const edgeI = newEdges.findIndex(ed => ed.id === edgeId);
        newEdges.splice(edgeI, 1);
        newNodes.push(addNode, endNode, condNode);
        newEdges.push(newE(fromId, addNode.id), e()(addNode.id, condNode.id), newE(condNode.id, endNode.id), newE(endNode.id, toId));
      }
      else {
        const newNode = n('CondNode')(gid());
        newEdges.push(e()(fromId, newNode.id), newE(newNode.id, toId));
        newNodes.push(newNode);
      }
      const { nodes, edges } = myLayout(newNodes, newEdges);

      setNodes([...nodes]);
      setEdges([...edges]);
    },
    [edgeId, getEdges, getNodes, setEdges, setNodes],
  );
};