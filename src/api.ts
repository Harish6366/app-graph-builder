import type { App, GraphData } from './types';

const MOCK_APPS: App[] = [
  { id: 'app-1', name: 'E-Commerce Core', description: 'Main shopping services' },
  { id: 'app-2', name: 'Analytics Pipeline', description: 'Data processing flow' },
];

const MOCK_GRAPHS: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      { id: '1', position: { x: 100, y: 100 }, data: {
          label: 'Auth Service', status: 'Healthy', memory: 40, version: '1.0.0',
          cpu: 0,
          disk: 0,
          region: '',
          cost: 0,
          iconType: 'database'
      }, type: 'default' },
      { id: '2', position: { x: 400, y: 100 }, data: {
          label: 'Payment API', status: 'Degraded', memory: 85, version: '2.1.0',
          cpu: 0,
          disk: 0,
          region: '',
          cost: 0,
          iconType: 'database'
      }, type: 'default' },
      { id: '3', position: { x: 250, y: 300 }, data: {
          label: 'User DB', status: 'Healthy', memory: 60, version: '14.2',
          cpu: 0,
          disk: 0,
          region: '',
          cost: 0,
          iconType: 'database'
      }, type: 'default' },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e1-3', source: '1', target: '3' },
    ],
  },
  'app-2': {
    nodes: [
      { id: '4', position: { x: 100, y: 200 }, data: {
          label: 'Ingestor', status: 'Down', memory: 0, version: '0.9',
          cpu: 0,
          disk: 0,
          region: '',
          cost: 0,
          iconType: 'database'
      }, type: 'default' },
      { id: '5', position: { x: 400, y: 200 }, data: {
          label: 'Worker', status: 'Healthy', memory: 30, version: '1.1',
          cpu: 0,
          disk: 0,
          region: '',
          cost: 0,
          iconType: 'database'
      }, type: 'default' },
    ],
    edges: [{ id: 'e4-5', source: '4', target: '5', animated: true }],
  },
};

export const fetchApps = async (): Promise<App[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_APPS), 800));
};

export const fetchGraph = async (appId: string): Promise<GraphData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = MOCK_GRAPHS[appId];
      if (data) resolve(data);
      else reject(new Error('Graph not found'));
    }, 1000);
  });
};