import { BaseEdge, EdgeLabelRenderer, EdgeProps, getStraightPath, useReactFlow } from 'reactflow';

interface Props extends EdgeProps {}

export const DeleteEdge = ({ id, ...props }: Props) => {
  const [edgePath, labelX, labelY] = getStraightPath({ ...props });
  const { setEdges } = useReactFlow();

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <button
          className={'bg-red rounded-full flex justify-center items-center text-2 w-6 h-6 text-white absolute'}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
          onClick={() => setEdges(edges => edges.filter(ed => ed.id !== id))}
        >
          删
        </button>
      </EdgeLabelRenderer>
    </>
  );
};
