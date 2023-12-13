import { Handle, Position } from 'reactflow';

export const EndNode = () => {
  return (
    <>
      <Handle type={'target'} position={Position.Top} />
      <div className={'w-10 h-10 bg-blue/6 border border-solid border-blue rounded-full flex justify-center items-center'}>终</div>
    </>
  );
};