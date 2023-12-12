let INIT_X = 0;

const n = (name: string, type?: 'start' | 'end') => ({
  id: name,
  type: 'FourCustomNode',
  data: { label: name, type },
  position: { x: 0, y: INIT_X += 20 },
});

const e = (source: string, target: string) => ({
  id: `${source}-${target}`,
  source,
  target,
  animated: true,
});

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