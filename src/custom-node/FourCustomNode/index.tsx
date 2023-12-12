import { Handle, NodeProps, Position } from 'reactflow';

interface Props extends NodeProps<{
  label: string;
  type?: 'start' | 'end' | 'common'
}>{}

export const FourCustomNode = ({
  data: {
    label,
    type = 'common',
  },
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
}: Props) => {

  return (
    <div className={'text-md rounded-full bg-white border border-solid border-black px-3 py-1 flex gap-2 justify-center items-center'}>
      <button className={'w-4 h-4 rounded-full bg-green/9 border border-solid border-green'} />
      <div> {label} </div>

      { type !== 'start' && (targetPosition === Position.Top ?
        <Handle type={'target'} position={Position.Top} id={'t'} />
        :
        <Handle type={'target'} position={Position.Left} id={'l'} />
      )}
      { type !== 'end' && (sourcePosition === Position.Bottom ?
        <Handle type={'source'} position={Position.Bottom} id={'b'} />
        :
        <Handle type={'source'} position={Position.Right} id={'r'} />
      )}
    </div>
  );
};