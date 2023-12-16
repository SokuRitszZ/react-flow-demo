import { Handle, Position, NodeProps, useReactFlow } from 'reactflow';

import { useState } from 'react';
import { useDeleteCond, useAddBranch } from '@/utils';

interface Data {
  endNodeId: string;
  parentId: string;
}

interface Props extends NodeProps<Data> {}

export const AddBranchNode = ({ id, data: { endNodeId } }: Props) => {
  const handleAdd = useAddBranch();

  return (
    <>
      <Handle type={'target'} position={Position.Top} />
      <Handle type={'source'} position={Position.Bottom} />
      <div onClick={() => handleAdd(id, endNodeId)} className={'w-8 h-5 bd ct cursor-pointer'}>
        拆
      </div>
    </>
  );
};

export const EndBranchNode = () => {
  return (
    <>
      <Handle type={'target'} position={Position.Top} />
      <Handle type={'source'} position={Position.Bottom} />
      <div className={'w-8 h-5 bg-white bd ct'}>
        合
      </div>
    </>
  );
};

interface CondNodeProps extends NodeProps {}

export const CondNode = ({ id }: CondNodeProps) => {
  const [visible, setVisible] = useState(false);
  const deleteCond = useDeleteCond();
  const { setNodes, setEdges } = useReactFlow();

  const handleClick = () => {
    const { nodes, edges } = deleteCond(id);

    setNodes(nodes);
    setEdges(edges);
  };

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Handle type={'target'} position={Position.Top} />
      <Handle type={'source'} position={Position.Bottom} />
      <div className={'w-6 h-5 bd ct bg-white relative'}>
        如
        {visible &&
          <div
            onClick={handleClick}
            className={'nodrag bg-red w-3 h-3 rounded-full absolute right-0 top-0 translate-x-50% -translate-y-50% cursor-pointer'}
          />
        }
      </div>
    </div>
  );
};