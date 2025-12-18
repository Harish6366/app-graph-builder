import type { Node, Edge } from '@xyflow/react';

export type ServiceStatus = 'Healthy' | 'Degraded' | 'Down';

// 1. Data stored inside a Node
export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  subLabel?: string; 
  status: ServiceStatus;
  memory: number; // 0-100
  cpu: number;    // 0-100
  disk: number;   // 0-100
  region: string; // e.g., "us-east-1"
  cost: number;   // e.g., 0.03
  iconType: 'database' | 'service' | 'auth';
}

// 2. Typed Node and Edge wrappers
export type AppNode = Node<ServiceNodeData>;
export type AppEdge = Edge; // <--- This is the specific line you were missing!

// 3. App Data Structure
export interface App {
  id: string;
  name: string;
  description: string;
}

export interface GraphData {
  nodes: AppNode[];
  edges: AppEdge[];
}