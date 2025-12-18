import { useStore } from '../store';
import { useQuery } from '@tanstack/react-query';
import { fetchApps } from '../api/mock';
import { Search, Plus, ChevronRight, ChevronUp, MoreHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Custom SuperTokens Logo
const SuperTokensLogo = () => (
    <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
         <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v20M2 12h20" strokeLinecap="round" />
            <circle cx="12" cy="12" r="8" strokeWidth="2" />
         </svg>
    </div>
);

const LangIcon = ({ color, char }: { color: string; char: string }) => (
    <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white font-bold text-xs shadow-inner`}>
        {char}
    </div>
);

const getAppVisuals = (name: string) => {
  if (name.includes('golang') || name.includes('go')) return { char: 'Go', color: 'bg-blue-600' };
  if (name.includes('java')) return { char: 'Ja', color: 'bg-purple-600' };
  if (name.includes('python')) return { char: 'Py', color: 'bg-yellow-600' };
  if (name.includes('ruby')) return { char: 'Rb', color: 'bg-red-500' };
  return { char: 'ST', color: 'bg-indigo-600' };
};

export function AppSelector() {
  const { selectedAppId, setSelectedAppId } = useStore();
  const { data: apps } = useQuery({ queryKey: ['apps'], queryFn: fetchApps });

  const currentApp = apps?.find(a => a.id === selectedAppId);

  return (
    <div className="flex flex-col w-[320px] font-sans drop-shadow-2xl">
      
      {/* HEADER CARD (Dropdown Trigger) */}
      <div className="bg-[#050505] border border-slate-800 rounded-xl p-3 flex items-center justify-between relative z-20 mb-2 shadow-lg">
         <div className="flex items-center gap-3">
            <SuperTokensLogo />
            <span className="text-sm font-bold text-white tracking-wide">
                {currentApp?.name || 'supertokens-golang'}
            </span>
         </div>
         <div className="flex items-center gap-3 text-slate-400 pr-1">
            <ChevronUp size={18} />
            <MoreHorizontal size={18} />
         </div>
      </div>

      {/* DROPDOWN BODY */}
      <Card className="bg-[#050505] border border-slate-800 rounded-xl overflow-hidden relative z-10 shadow-2xl">
        
        {/* Title & Search */}
        <div className="p-4 border-b border-slate-900/50">
            <h3 className="font-bold text-base text-white mb-4">Application</h3>
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input 
                        placeholder="Search..." 
                        className="pl-9 bg-[#161b22] border-none text-slate-300 h-10 rounded-lg text-sm placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-blue-600" 
                    />
                </div>
                {/* BLUE PLUS BUTTON */}
                <Button size="icon" className="bg-blue-600 hover:bg-blue-500 h-10 w-10 rounded-lg text-white shadow-lg shadow-blue-900/20">
                    <Plus className="h-5 w-5" />
                </Button>
            </div>
        </div>

        {/* List Items */}
        {/* max-h-[400px] ensures enough space for 5-6 items before scrolling */}
        <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">
            {apps?.map((app) => {
                const { char, color } = getAppVisuals(app.name);
                const isSelected = selectedAppId === app.id;

                return (
                    <div
                        key={app.id}
                        onClick={() => setSelectedAppId(app.id)}
                        className={`
                            group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all border
                            ${isSelected ? 'bg-[#161b22] border-slate-800' : 'bg-transparent border-transparent hover:bg-[#161b22]'}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <LangIcon char={char} color={color} />
                            <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                                {app.name}
                            </span>
                        </div>
                        <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400" />
                    </div>
                );
            })}
        </div>
      </Card>
    </div>
  );
}