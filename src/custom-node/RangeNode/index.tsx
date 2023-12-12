import { Handle, Position } from 'reactflow';

export function RangeNode() {
  return (
    <div className={'p-5 bg-white border border-solid border-black rounded-2'}>
      <Handle type={'target'} position={Position.Top} id={'a'}/>
      <input className={'nodrag'} type={'range'} min={0} max={100} />
      <Handle type={'source'} position={Position.Bottom} id={'b'}/>
    </div>
  );
}