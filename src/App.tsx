import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls, MiniMap,
  OnConnect, Panel,
  ReactFlow, ReactFlowProvider,
  useEdgesState,
  useNodesState, useReactFlow,
} from 'reactflow';

import 'reactflow/dist/style.css';
import React from 'react';
import { FourCustomNode, RangeNode, TextUpdaterNode } from './custom-node';
import { DeleteEdge } from './custom-edge';
import { sortLayout } from './utils';
import { initialEdges, initialNodes } from './constants.ts';

const nodeTypes = { TextUpdaterNode, RangeNode, FourCustomNode };
const edgeTypes = { DeleteEdge };

function App() {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleConnect: OnConnect = (params) => {
    setEdges((eds) => addEdge({ ...params, type: 'DeleteEdge' }, eds));
  };

  const handleLayout = React.useCallback(
    (direction: 'TB' | 'LR') => {
      const layouted = sortLayout(nodes, edges, { direction });

      setEdges([...layouted.edges]);
      setNodes([...layouted.nodes]);

      window.requestAnimationFrame(() => fitView());
    },
    [nodes, edges],
  );

  return (
    <div className={'w-screen h-screen relative'}>
      <ReactFlow
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        fitView
      >
        <Panel position="top-right">
          <div className={'flex gap-4'}>
            <button className={'text-xl p-4 rounded-2'} onClick={() => handleLayout('TB')}>
            TB SORT
            </button>
            <button className={'text-xl p-4 rounded-2'} onClick={() => handleLayout('LR')}>
            LR SORT
            </button>
          </div>
        </Panel>
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Cross} gap={50} size={10} />
      </ReactFlow>
    </div>
  );
}

export default () => 
  <ReactFlowProvider>
    <App />
  </ReactFlowProvider>
;
