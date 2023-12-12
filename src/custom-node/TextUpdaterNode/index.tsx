import { Handle, Position } from 'reactflow';

interface Props {
  data: any;
}

export function TextUpdaterNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id={'t'} />
      <div className={'border border-solid border-black bg-white rounded-2 p-5 flex gap-4 items-center'}>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={e => console.log(e.target.value)} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id={'f'} />
    </>
  );
}