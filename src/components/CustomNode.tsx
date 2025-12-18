import { Handle, Position, type NodeProps, useReactFlow } from '@xyflow/react';
import type { AppNode } from '../types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Cpu, MemoryStick, HardDrive, MapPin, CheckCircle2, AlertCircle, Server } from 'lucide-react';
import { Input } from '@/components/ui/input';

// --- OFFICIAL BRAND LOGOS (Inline SVGs) ---

const PostgresLogo = () => (
  <svg viewBox="0 0 512 512" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c114.9 0 208-93.2 208-208S370.7 48 255.8 48zm0 0" fill="#336791"/>
    <path d="M197.6 307.7c-21.4 0-36.9-17-36.9-37.4 0-19.4 16.6-35.3 36.9-35.3 20.2 0 35.8 15.9 35.8 35.3 0 20.4-15.6 37.4-35.8 37.4zm0 0" fill="#fff"/>
    <path d="M207.8 464c-6.8-5.3-17.6-11.4-17.6-32.9 0-13.9 6.2-22.1 11.6-29.3 5.9-7.8 12.5-16.6 12.5-30.8 0-18.7-14.1-34.1-33.5-34.1-23.7 0-46.7 15.9-46.7 48.7 0 5.5.9 10.9 2.6 15.9-25.2-12.7-43.1-38.3-43.1-68.5 0-42.9 35.4-77.6 78.9-77.6 17.6 0 34.6 5.8 48.3 16.6 12.8-22.3 36.8-37.4 64.3-37.4 41.1 0 74.3 33.3 74.3 74.3 0 29.7-17.4 55-42.9 66.8 2.2 23.3-4.2 47.6-19.1 66.8-13.6 17.6-33.9 27.5-56.3 27.5-11.2 0-21.4-2.4-30.6-6.6-1.5 1-2.9 1.1-2.9 1.1z" fill="#fff"/>
  </svg>
);

const RedisLogo = () => (
  <svg viewBox="0 0 64 64" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M57 18.5V47.5L32 62L7 47.5V18.5L32 4L57 18.5Z" fill="#D82C20"/>
    <path d="M32 4L7 18.5L32 33L57 18.5L32 4Z" fill="#A41E11"/>
    <path d="M32 33V62L7 47.5V18.5L32 33Z" fill="#C2261A"/>
    <path d="M32 33V62L57 47.5V18.5L32 33Z" fill="#E53E31"/>
  </svg>
);

const MongoLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.875 1.5C11.875 1.5 4.375 9.75 4.375 15.75C4.375 19.892 7.733 23.25 11.875 23.25C16.017 23.25 19.375 19.892 19.375 15.75C19.375 9.75 11.875 1.5 11.875 1.5Z" fill="#00ED64"/>
    <path d="M12.5 1.5V23.25C12.5 23.25 11.875 18.75 11.875 15.75" stroke="#00684A" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11.875 10.5C9.375 12 9.375 15.75 11.875 18.75" stroke="#00684A" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const ApiGatewayLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#60A5FA" strokeWidth="2"/>
    <path d="M2 12H22" stroke="#60A5FA" strokeWidth="2"/>
    <path d="M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22" stroke="#60A5FA" strokeWidth="2"/>
    <path d="M12 2C9.5 4.5 8 8 8 12C8 16 9.5 19.5 12 22" stroke="#60A5FA" strokeWidth="2"/>
  </svg>
);

// --- AWS FOOTER LOGO ---
const AwsLogo = () => (
  <svg width="30" height="15" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
    <path d="M9.5 14L7.5 7L5.5 14H3L0 4H2.5L4.5 11L6.5 4H8.5L10.5 11L12.5 4H15L12 14H9.5Z" fill="white"/>
    <path d="M21 14L19.5 10H17.5L17 11.5L16 14H13.5L17 4H20.5L24 14H21ZM19 8.5L18.5 6L18 8.5H19Z" fill="white"/>
    <path d="M29 11.5C29.5 11.8 30.5 12 31.5 12C32.5 12 33 11.8 33 11.2C33 10.8 32.5 10.5 31.5 10.2L30 9.8C28.5 9.4 27.5 8.5 27.5 7C27.5 5.2 29 4 31.5 4C33.5 4 35 4.5 36 5L35 7C34 6.5 33 6.2 32 6.2C31 6.2 30.5 6.5 30.5 6.8C30.5 7.2 31 7.5 32 7.8L33.5 8.2C35 8.6 36 9.5 36 11C36 12.8 34.5 14 32 14C29.5 14 28 13.5 27 13L28 11L29 11.5Z" fill="white"/>
    <path d="M7 16C12 19 25 19 30 16" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// --- CONFIG ---
const statusConfig = {
  Healthy: { bg: 'bg-green-900/30', text: 'text-green-400', border: 'border-green-800', icon: CheckCircle2, label: 'Success' },
  Degraded: { bg: 'bg-yellow-900/30', text: 'text-yellow-400', border: 'border-yellow-800', icon: AlertCircle, label: 'Warning' },
  Down: { bg: 'bg-red-900/30', text: 'text-red-400', border: 'border-red-800', icon: AlertCircle, label: 'Error' },
};

// --- ICON SELECTOR LOGIC ---
const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('postgres')) return PostgresLogo;
    if (l.includes('redis')) return RedisLogo;
    if (l.includes('mongo')) return MongoLogo;
    if (l.includes('gateway') || l.includes('api')) return ApiGatewayLogo;
    // Default fallback
    return () => <Server className="w-5 h-5 text-slate-400" />;
};

export function CustomNode({ id, data, selected }: NodeProps<AppNode>) {
  const { updateNodeData } = useReactFlow();
  const IconComponent = getIcon(data.label);
  const status = statusConfig[data.status];

  // Handler to sync input box with slider
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(id, { cpu: Number(e.target.value) });
  };

  return (
    <Card className={`
        w-[340px] bg-black border-[1px] shadow-2xl transition-all duration-300 group
        ${selected ? 'border-slate-500 shadow-[0_0_20px_rgba(30,41,59,0.5)]' : 'border-slate-800'}
        rounded-2xl
    `}>
      <Handle type="target" position={Position.Left} className="!bg-slate-500 !w-2 !h-2" />
      
      {/* HEADER */}
      <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between border-b border-transparent">
        <div className="flex items-center gap-3">
          {/* Logo Container: White background ensures brand logos pop */}
          <div className="p-2 rounded-lg bg-white flex items-center justify-center shadow-md">
            <IconComponent />
          </div>
          <div>
            <div className="font-bold text-white text-[15px]">{data.label}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Badge variant="secondary" className="bg-[#111] text-green-400 border border-green-900/50 font-mono text-[11px] px-2 py-0.5 rounded-md">
             ${data.cost}/HR
           </Badge>
           <Settings size={18} className="text-slate-600 cursor-pointer hover:text-slate-400" />
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2 space-y-5">
        
        {/* STATS ROW */}
        <div className="flex justify-between items-center text-slate-300 font-medium text-[12px] px-1">
            <div className="w-10 text-left">0.02</div>
            <div className="w-16 text-center text-slate-400">0.05 GB</div>
            <div className="w-16 text-center text-slate-400">10.00 GB</div>
            <div className="w-8 text-right text-slate-400">1</div>
        </div>

        {/* TABS (White Active Tab style) */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-[#111] rounded-xl border border-slate-900">
            {/* Active Tab: White with Black text */}
            <div className="bg-white text-black rounded-lg py-1.5 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer font-bold text-[11px]">
                <Cpu size={12} strokeWidth={2.5} /> CPU
            </div>
            {/* Inactive Tabs */}
            <div className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-300 text-[11px] cursor-pointer font-medium">
                <MemoryStick size={12} /> Memory
            </div>
            <div className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-300 text-[11px] cursor-pointer font-medium">
                <HardDrive size={12} /> Disk
            </div>
            <div className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-slate-300 text-[11px] cursor-pointer font-medium">
                <MapPin size={12} /> Region
            </div>
        </div>

        {/* GRADIENT SLIDER & INPUT */}
        <div className="flex items-center gap-4 pt-1">
            <div className="relative flex-1 h-6 flex items-center">
                {/* Gradient Track (Blue -> Green -> Red) */}
                <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-blue-600 via-green-500 to-red-500 opacity-80"></div>
                
                {/* White Knob */}
                <div 
                    className="absolute h-4 w-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] cursor-pointer hover:scale-110 transition-transform border border-slate-200"
                    style={{ left: `${data.cpu}%`, transform: 'translateX(-50%)' }}
                />
            </div>
            
            {/* Dark Number Input Box */}
            <Input 
                className="w-16 h-9 bg-black border border-slate-800 text-right text-slate-200 text-sm focus-visible:ring-slate-700 font-mono rounded-md"
                value={data.cpu}
                onChange={handleInputChange}
            />
        </div>

        {/* FOOTER: Status & Logo */}
        <div className="flex items-center justify-between mt-2">
            <Badge className={`${status.bg} ${status.text} ${status.border} border px-3 py-1 text-[11px] font-bold rounded-md flex gap-1.5 shadow-sm`}>
                <status.icon size={12} strokeWidth={2.5} /> {status.label}
            </Badge>
            <div className="mt-1">
                <AwsLogo />
            </div>
        </div>

      </CardContent>
      <Handle type="source" position={Position.Right} className="!bg-slate-500 !w-2 !h-2" />
    </Card>
  );
}