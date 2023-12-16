import { CommonEdge } from '@/custom-edge';
import { DeletableNode, StartNode, EndNode, EndBranchNode, AddBranchNode, CondNode } from '@/custom-node';
import { n as _n, e as _e } from '@/utils';

export const nodeTypes = {
  DeletableNode,
  StartNode,
  EndNode,
  EndBranchNode,
  AddBranchNode,
  CondNode,
};

export const edgeTypes = {
  CommonEdge,
};

export const initialNodes = [
  _n('StartNode')('START'),
  _n('EndNode', 200)('END'),
];

export const initialEdges = [
  _e('CommonEdge')('START', 'END'),
];