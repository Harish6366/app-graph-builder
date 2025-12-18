import type { App, GraphData } from '../types';

const MOCK_APPS: App[] = [
  { id: 'app-1', name: 'supertokens-golang', description: 'Backend' },
  { id: 'app-2', name: 'supertokens-java', description: 'Wrapper' },
  { id: 'app-3', name: 'supertokens-python', description: 'Scripts' },
  { id: 'app-4', name: 'supertokens-ruby', description: 'Gem' },
  { id: 'app-5', name: 'supertokens-go', description: 'Core' },
];

const MOCK_GRAPHS: Record<string, GraphData> = {
  'app-1': {
    nodes: [
      { 
        id: '1', position: { x: 500, y: 50 }, type: 'serviceNode',
        data: {
            label: 'API Gateway', status: 'Healthy', memory: 45, cpu: 20, region: 'us-east-1', cost: 0.03, iconType: 'service',
            disk: 0
        } 
      },
      { 
        id: '2', position: { x: 100, y: 200 }, type: 'serviceNode',
        data: {
            label: 'Postgres', status: 'Healthy', memory: 60, cpu: 65, region: 'us-east-1', cost: 0.03, iconType: 'database',
            disk: 0
        } 
      },
      { 
        id: '3', position: { x: 500, y: 400 }, type: 'serviceNode',
        data: {
            label: 'Redis', status: 'Down', memory: 80, cpu: 90, region: 'eu-west-1', cost: 0.03, iconType: 'database',
            disk: 0
        } 
      },
      { 
        id: '4', position: { x: 900, y: 200 }, type: 'serviceNode',
        data: {
            label: 'MongoDB', status: 'Degraded', memory: 30, cpu: 45, region: 'us-west-2', cost: 0.03, iconType: 'database',
            disk: 0
        } 
      },
    ],
    edges: [
        { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#94a3b8', strokeDasharray: '5 5' } },
        { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#94a3b8', strokeDasharray: '5 5' } },
        { id: 'e1-4', source: '1', target: '4', animated: true, style: { stroke: '#94a3b8', strokeDasharray: '5 5' } },
    ],
  },
};

export const fetchApps = async (): Promise<App[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_APPS), 100));
};

export const fetchGraph = async (appId: string): Promise<GraphData> => {
  // Always return the main graph for demo purposes if ID not found
  return new Promise((resolve) => {
    resolve(MOCK_GRAPHS[appId] || MOCK_GRAPHS['app-1']);
  });
};


// 'app-2': {
//     nodes: [
//       { 
//         id: '4', position: { x: 100, y: 200 }, type: 'serviceNode',
//         data: { label: 'Ingestor', subLabel: 'kafka-stream', status: 'Down', memory: 0, cpu: 0, disk: 0, region: 'ap-south-1', cost: 0.01, iconType: 'service' } 
//       },
//     ],
//     edges: [],
//   },