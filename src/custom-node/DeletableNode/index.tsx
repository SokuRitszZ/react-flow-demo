import { NodeProps, useReactFlow, Handle, Position } from 'reactflow';
import { useState, useCallback } from 'react';
import { gid } from '@/utils';

interface Props extends NodeProps<{
  label: string;
  type?: 'start' | 'end';
}>{}

export const DeletableNode = ({ data: { label }, id }: Props) => {
  const [deletable, setDeletable] = useState(false);
  const {
    getEdges,
    getNode,
    setNodes,
    setEdges,
  } = useReactFlow();

  const handleClick = useCallback(
    () => {
      // const node = getNode(id);
      const targetEdge = getEdges().find(edge => edge.target === id)!;
      const sourceEdge = getEdges().find(edge => edge.source === id)!;

      const source = getNode(targetEdge.source)!;
      const target = getNode(sourceEdge.target)!;

      setEdges((eds) => [...eds.filter(ed => ![targetEdge.id, sourceEdge.id].includes(ed.id)), {
        id: gid(),
        type: 'CommonEdge',
        animated: true,
        source: source.id,
        target: target.id,
      }]);
      setNodes(nds => nds.filter(nd => nd.id !== id));
    },
    [getEdges, getNode, id, setEdges, setNodes],
  );

  return (
    <>
      <Handle className={'z-1'} type={'target'} position={Position.Top} />
      <div
        onMouseEnter={() => setDeletable(true)}
        onMouseLeave={() => setDeletable(false)}
        className={'px-3 py-1 ct w-100px z-0 bg-white border border-solid border-black rounded-1 relative'}
      >
        {deletable &&
          <div
            onClick={handleClick}
            className={'nodrag bg-red w-3 h-3 rounded-full absolute right-0 top-0 translate-x-50% -translate-y-50% cursor-pointer'}
          />
        }
        {label.slice(0, 5)}
      </div>
      <Handle className={'z-1'} type={'source'} position={Position.Bottom} />
    </>
  );
};