import { Handle, Position } from 'reactflow';

export const StartNode = () => {
  return (
    <>
      <div className={'w-10 h-10 bg-blue/6 border border-solid border-blue flex justify-center items-center rounded-full'}>始</div>
      <Handle type={'source'} position={Position.Bottom} />
    </>
  );
};