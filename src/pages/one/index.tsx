import {
  Panel,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  ReactFlow,
  useReactFlow,
  useNodesState, useEdgesState, OnConnect, addEdge,
} from 'reactflow';
import React from 'react';
import { initialNodes, initialEdges } from './constants';
import { TextUpdaterNode, RangeNode, FourCustomNode } from '@/custom-node';
import { DeleteEdge } from '@/custom-edge';
import { dagreLayout, hierarchyLayout, middleWay } from '@/utils';

const nodeTypes = { TextUpdaterNode, RangeNode, FourCustomNode };
const edgeTypes = { DeleteEdge };

const PageOne = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleConnect: OnConnect = (params) => {
    setEdges((eds) => addEdge({ ...params, type: 'DeleteEdge' }, eds));
  };

  const handleLayout = React.useCallback(
    (direction: 'TB' | 'LR', method: string = 'dagre') => {
      // const layouted = dagreLayout(nodes, edges, { direction });
      let layouted: any;
      const params = [nodes, edges, { direction }] as const;
      switch (method) {
      case 'dagre':
        layouted = dagreLayout(...params);
        break;
      case 'd3-hierarchy':
        layouted = hierarchyLayout(...params);
        break;
      case 'middle-way':
        layouted = middleWay(...params);
        break;
      default:
      }

      setEdges([...layouted.edges]);
      setNodes([...layouted.nodes]);

      window.requestAnimationFrame(() => fitView());
    },
    [nodes, edges],
  );
  return (
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
        <div className={'flex flex-col gap-3'}>
          <div className={'flex gap-4'}>
            <button className={'text-xl p-4 rounded-2'} onClick={() => handleLayout('TB', 'dagre')}>
              DAGRE TB SORT
            </button>
            <button className={'text-xl p-4 rounded-2'} onClick={() => handleLayout('LR', 'dagre')}>
              DAGRE LR SORT
            </button>
          </div>
          <div className={'flex gap-4'}>
            <button className={'text-xl p-4 rounded-2'} onClick={() => handleLayout('TB', 'd3-hierarchy')}>
              D3 HIERARCHY TB SORT
            </button>
            <button className={'text-xl p-3 rounded-2'} onClick={() => handleLayout('LR', 'd3-hierarchy')}>
              D3 HIERARCHY LR SORT
            </button>
          </div>
          <div className={'flex gap-4'}>
            <button className={'text-xl p-4 rounded-2'} onClick={() => handleLayout('LR', 'middle-way')}>LR MIDDLE WAY</button>
            <button className={'text-xl p-4 rounded-2'} onClick={() => handleLayout('TB', 'middle-way')}>TB MIDDLE WAY</button>
          </div>
        </div>
      </Panel>
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Cross} gap={50} size={10} />
    </ReactFlow>
  );
};

export default PageOne;