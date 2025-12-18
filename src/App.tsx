import { useEffect } from 'react';
import { ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useStore } from './store';
import { FlowCanvas } from './components/FlowCanvas';
import { Inspector } from './components/Inspector';
import { AppSelector } from './components/AppSelector';
import { Button } from '@/components/ui/button';
import { Share2, Moon, MoreHorizontal, Plus } from 'lucide-react';
import type { ServiceNodeData } from './types';

// react-icons imports
import { FaGithub } from "react-icons/fa";
import { SiPostgresql, SiRedis, SiMongodb } from "react-icons/si";
import { BsBox } from "react-icons/bs";
import { HiViewGrid } from "react-icons/hi";
import { TbTopologyStar } from "react-icons/tb";

const queryClient = new QueryClient();

// --- LOGIC COMPONENT (Must be inside ReactFlowProvider) ---
function AppControls({ children }: { children: React.ReactNode }) {
    const { addNodes, fitView } = useReactFlow();
    const { isMobilePanelOpen, setIsMobilePanelOpen } = useStore();

    // 1. Feature: Add Node
    const handleAddNode = () => {
        const id = Math.random().toString(36).substring(7);
        const types: ('database' | 'service' | 'auth')[] = ['database', 'service', 'auth'];
        const randomType = types[Math.floor(Math.random() * types.length)];

        addNodes({
            id,
            position: { x: Math.random() * 500, y: Math.random() * 400 },
            type: 'serviceNode',
            data: { 
                label: `New ${randomType === 'database' ? 'DB' : 'Service'}`, 
                status: 'Healthy', 
                memory: 50, 
                cpu: 20, 
                region: 'us-east-1', 
                cost: 0.01,
                iconType: randomType // This triggers the styling in CustomNode
            } as ServiceNodeData
        });
    };

    // 2. Feature: Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Shift + A = Add Node
            if (e.shiftKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                handleAddNode();
            }
            // Shift + F = Fit View
            if (e.shiftKey && e.key.toLowerCase() === 'f') {
                e.preventDefault();
                fitView({ duration: 800 });
            }
            // Shift + D = Toggle Drawer/Panel
            if (e.shiftKey && e.key.toLowerCase() === 'd') {
                e.preventDefault();
                setIsMobilePanelOpen(!isMobilePanelOpen);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [addNodes, fitView, isMobilePanelOpen, setIsMobilePanelOpen]);

    return (
        <>
            {/* Top Right Controls with ADD button */}
            <div className="absolute top-6 right-6 z-10 flex gap-3">
                 <Button 
                    onClick={handleAddNode} 
                    className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20 border border-blue-500"
                 >
                    <Plus className="mr-2 h-4 w-4" /> Add Node
                 </Button>

                <div className="flex items-center p-1 gap-1 bg-black/80 border border-slate-800 rounded-lg backdrop-blur-md shadow-xl">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md">
                        <Share2 size={16} />
                    </Button>
                    <div className="w-px h-4 bg-slate-800" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md">
                        <Moon size={16} />
                    </Button>
                    <div className="w-px h-4 bg-slate-800" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md">
                        <MoreHorizontal size={16} />
                    </Button>
                </div>
            </div>
            {children}
        </>
    );
}

function LeftRail() {
  return (
    <aside className="w-14 flex-shrink-0 flex flex-col items-center py-5 gap-3 bg-black border-r border-slate-900 z-20">
      <div className="mb-6 text-white pt-4">
        <FaGithub size={26} />
      </div>
      <nav className="flex flex-col gap-5 w-full items-center mt-6">
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-slate-900"><SiPostgresql className="w-5 h-5 text-blue-400" /></Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-slate-900"><SiRedis className="w-5 h-5 text-red-500" /></Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-slate-900"><SiMongodb className="w-5 h-5 text-green-500" /></Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-slate-900"><BsBox className="w-5 h-5 text-slate-300" /></Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-slate-900"><HiViewGrid className="w-5 h-5 text-yellow-400" /></Button>
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-slate-900"><TbTopologyStar className="w-5 h-5 text-emerald-400" /></Button>
      </nav>
    </aside>
  )
}

function MainLayout() {
  const { selectedNodeId, isMobilePanelOpen } = useStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-slate-200">
      <LeftRail />
      
      <div className="flex flex-col flex-1 h-full min-w-0 relative">
        <main className="flex-1 h-full relative z-0">
            <FlowCanvas />

            <div className="absolute top-6 left-6 z-10">
                <AppSelector />
            </div>

            {/* Controls injected here to access ReactFlow Context */}
            <AppControls children={undefined}>
                {/* Empty children, controls render absolute positions themselves */}
            </AppControls>
        </main>

        <aside 
            className={`
                absolute top-0 right-0 h-full w-80 bg-black/95 border-l border-slate-800 shadow-2xl transition-transform duration-300 z-30 backdrop-blur-xl
                ${selectedNodeId ? 'translate-x-0' : 'translate-x-full'}
                ${isMobilePanelOpen ? 'translate-x-0' : ''}
            `}
        >
            <Inspector />
        </aside>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <ReactFlowProvider>
            <MainLayout />
        </ReactFlowProvider>
    </QueryClientProvider>
  );
}