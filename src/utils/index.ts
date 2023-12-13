export * from './dagreLayout';
export * from './hierarchyLayout';
export * from './middleWay';

let INIT_X = 0;

export const n = (nodeType: string, dist = 20) => {
  return (name: string, type?: 'start' | 'end') => ({
    id: name,
    type: nodeType,
    data: { label: name, type },
    position: { x: 0, y: INIT_X += dist },
  });
};

export const e = (type: string) => {
  return (source: string, target: string) => ({
    id: `${source}-${target}`,
    type,
    source,
    target,
    animated: true,
  });
};

export const gid = () => {
  return Date.now() + '';
};