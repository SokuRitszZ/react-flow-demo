import { n as _n, e as _e } from '@/utils';

const n = _n('FourCustomNode');

export const initialNodes = [
  n('IDEA', 'start'),
  n('UI'),
  n('REVIEW'),
  n('FE PERIOD'),
  n('BE PERIOD'),
  n('FE TO DEV'),
  n('BE TO DEV'),
  n('QA PERIOD'),
  n('FE DEV'),
  n('BE DEV'),
  n('QA TEST'),
  n('COMMISSION'),
  n('TESTING'),
  n('UI WT'),
  n('TO LAUNCH'),
  n('LAUNCHED', 'end'),
];

const e = _e('');

export const initialEdges = [
  e('IDEA', 'UI'),
  e('UI', 'REVIEW'),
  e('REVIEW', 'FE PERIOD'),
  e('REVIEW', 'BE PERIOD'),
  e('FE PERIOD', 'FE TO DEV'),
  e('FE PERIOD', 'QA PERIOD'),
  e('BE PERIOD', 'BE TO DEV'),
  e('BE PERIOD', 'QA PERIOD'),
  e('FE TO DEV', 'FE DEV'),
  e('BE TO DEV', 'BE DEV'),
  e('QA PERIOD', 'QA TEST'),
  e('FE DEV', 'COMMISSION'),
  e('BE DEV', 'COMMISSION'),
  e('COMMISSION', 'TESTING'),
  e('COMMISSION', 'UI WT'),
  e('TESTING', 'TO LAUNCH'),
  e('TO LAUNCH', 'LAUNCHED'),
];