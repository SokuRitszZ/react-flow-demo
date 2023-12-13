import {
  EdgeProps,
  BaseEdge,
  useReactFlow,
  EdgeLabelRenderer,
  Node,
  Edge,
  getSmoothStepPath,
} from 'reactflow';
import { gid } from '@/utils';

interface Props extends EdgeProps {}

export const CommonEdge = ({ id, source, target, ...props }: Props) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({ ...props });
  const {
    getNodes,
    setNodes,
    getEdges,
    setEdges,
    getNode,
  } = useReactFlow();

  const handleClick = () => {
    const nodeId = gid();
    const sourceNode = getNode(source)!;
    const targetNode = getNode(target)!;
    const x = (sourceNode.position.x + targetNode.position.x) / 2;
    const y = (sourceNode.position.y + targetNode.position.y) / 2;
    const newNode: Node = {
      id: nodeId,
      type: 'DeletableNode',

      position: { x, y },
      data: { label: nodeId },
    };
    const newNodes = getNodes().concat(newNode);
    const newEdges: Edge[] = [
      ...getEdges().filter((ed) => id !== ed.id),
      { id: gid(), source: newNode.id, target, type: 'CommonEdge', animated: true },
      { id: gid() + 1, source, target: newNode.id, type: 'CommonEdge', animated: true },
    ];

    setNodes(newNodes);
    setEdges(newEdges);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          onClick={handleClick}
          className={'' +
            'bg-white border border-solid border-black w-6 h-6 rounded-full absolute cursor-pointer ' +
            'flex justify-center items-center'}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          生
        </div>
      </EdgeLabelRenderer>
    </>
  );
};