import {
  EdgeProps,
  BaseEdge,
  useReactFlow,
  EdgeLabelRenderer,
  Node,
  Edge,
  getStraightPath,
} from 'reactflow';
import { useState } from 'react';
import { gid, useAddBranch, myLayout } from '@/utils';

interface Props extends EdgeProps {}

export const CommonEdge = ({ id, source, target, ...props }: Props) => {
  const [edgePath, labelX, labelY] = getStraightPath({ ...props });
  const {
    getNodes,
    setNodes,
    getEdges,
    setEdges,
    getNode,
  } = useReactFlow();

  const handleClick = (type: string) => {
    const nodeId = gid();
    const sourceNode = getNode(source)!;
    const targetNode = getNode(target)!;
    const x = (sourceNode.position.x + targetNode.position.x) / 2;
    const y = (sourceNode.position.y + targetNode.position.y) / 2;
    const newNode: Node = {
      id: nodeId,
      type,
      position: { x, y },
      data: { label: nodeId },
    };
    const newNodes = getNodes().concat(newNode);
    const newEdges: Edge[] = [
      ...getEdges().filter((ed) => id !== ed.id),
      { id: gid(), source: newNode.id, target, type: 'CommonEdge', animated: true },
      { id: gid() + 1, source, target: newNode.id, type: 'CommonEdge', animated: true },
    ];
    const { nodes, edges } = myLayout(newNodes, newEdges);

    setNodes([...nodes]);
    setEdges([...edges]);
  };

  const handleAddBranch = useAddBranch(id);

  const [visible, setVisible] = useState(false);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          className={'' +
            'bg-white border border-solid border-black w-6 h-6 rounded-full absolute ' +
            'flex justify-center items-center'}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
            生
          {visible &&
            <>
              <button
                onClick={() => handleClick('DeletableNode')}
                className={'absolute rounded-full w-6 h-6 bg-white left-0 -translate-x-100% bd ct cursor-pointer'}
              >
                点
              </button>
              <button
                onClick={() => handleAddBranch(source, target)}
                className={'absolute rounded-full w-6 h-6 bg-white right-0 translate-x-100% bd ct cursor-pointer'}
              >
                分
              </button>
            </>
          }
        </div>
      </EdgeLabelRenderer>
    </>
  );
};