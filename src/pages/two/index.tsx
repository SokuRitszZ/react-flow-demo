import {
  ReactFlow,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  Background,
  BackgroundVariant,
  addEdge,
  Connection,
} from 'reactflow';
import { nodeTypes, initialNodes, edgeTypes, initialEdges } from './constants';

const PageTwo = () => {
  const [nodes, , ONC] = useNodesState(initialNodes);
  const [edges, setEdges, OEC] = useEdgesState(initialEdges);

  const handleConnect = (params: Connection) => {
    setEdges(eds => addEdge({
      ...params,
      type: 'CommonEdge',
    }, eds));
  };

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={ONC}
      onEdgesChange={OEC}
      onConnect={handleConnect}
      nodeOrigin={[0.5, 0.0]}
      fitView
    >
      <MiniMap />
      <Controls />
      <Background variant={BackgroundVariant.Cross} gap={50} size={10} />
    </ReactFlow>
  );
};

export default PageTwo;