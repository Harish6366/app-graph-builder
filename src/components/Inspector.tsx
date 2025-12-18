import { useReactFlow } from '@xyflow/react'
import { useStore } from '../store'
import type { ServiceNodeData } from '../types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Cpu, Zap, HardDrive, MapPin } from 'lucide-react'

export function Inspector() {
  const {
    selectedNodeId,
    setSelectedNodeId,
    activeInspectorTab,
    setActiveInspectorTab,
  } = useStore()

  // 1. Use the official updateNodeData hook for performant live updates
  const { getNode, updateNodeData } = useReactFlow()

  const node = selectedNodeId ? getNode(selectedNodeId) : null
  const data = node?.data as ServiceNodeData | undefined

  if (!node || !data) return null

  // 2. This function directly mutates the specific node's data object in the store
  const handleUpdate = (key: keyof ServiceNodeData, value: any) => {
    updateNodeData(node.id, { [key]: value })
  }

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 border-l border-slate-900">
      
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-slate-900 bg-black/40">
        <div>
          <h3 className="font-semibold text-lg text-white">Configuration</h3>
          <p className="text-xs text-slate-500">Edit service parameters</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedNodeId(null)}
          className="text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X size={18} />
        </Button>
      </div>

      <div className="p-5 space-y-6 overflow-y-auto">
        
        {/* Service Name Input */}
        <div className="space-y-3">
          <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">
            Service Name
          </Label>
          <Input
            value={data.label}
            onChange={(e) => handleUpdate('label', e.target.value)}
            className="bg-black border-slate-800 focus-visible:ring-blue-600 text-slate-200"
          />
        </div>

        {/* Status Pills */}
        <div className="space-y-3">
          <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">
            Current Status
          </Label>
          <div className="flex gap-2">
            {(['Healthy', 'Degraded', 'Down'] as const).map((s) => (
              <Badge
                key={s}
                variant="outline"
                className={`cursor-pointer transition-all px-3 py-1 ${
                  data.status === s
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20'
                    : 'border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                }`}
                onClick={() => handleUpdate('status', s)}
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* TABS CONTROLLER */}
        <Tabs
          value={activeInspectorTab}
          onValueChange={setActiveInspectorTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 bg-black border border-slate-800 h-10">
            <TabsTrigger value="config" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">Resources</TabsTrigger>
            <TabsTrigger value="runtime" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">Metadata</TabsTrigger>
          </TabsList>

          {/* TAB 1: RESOURCES (Sliders) */}
          <TabsContent value="config" className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-2">
            {/* CPU */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2 text-slate-300 text-sm">
                  <Cpu size={14} className="text-blue-500" /> CPU Allocation
                </Label>
                <span className="text-xs font-mono text-blue-400 font-bold">
                  {data.cpu}%
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  value={[data.cpu]}
                  max={100}
                  step={1}
                  onValueChange={([v]) => handleUpdate('cpu', v)}
                  className="flex-1 [&>.relative>.bg-primary]:bg-blue-500"
                />
                <Input
                  type="number"
                  className="w-16 h-8 bg-black border-slate-800 text-xs text-right"
                  value={data.cpu}
                  onChange={(e) => handleUpdate('cpu', Number(e.target.value))}
                />
              </div>
            </div>

            {/* Memory */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2 text-slate-300 text-sm">
                  <Zap size={14} className="text-purple-500" /> Memory Limit
                </Label>
                <span className="text-xs font-mono text-purple-400 font-bold">
                  {data.memory} MB
                </span>
              </div>
              <div className="flex gap-4 items-center">
                <Slider
                  value={[data.memory]}
                  max={2048}
                  step={16}
                  onValueChange={([v]) => handleUpdate('memory', v)}
                  className="flex-1 [&>.relative>.bg-primary]:bg-purple-500"
                />
                <Input
                  type="number"
                  className="w-16 h-8 bg-black border-slate-800 text-xs text-right"
                  value={data.memory}
                  onChange={(e) => handleUpdate('memory', Number(e.target.value))}
                />
              </div>
            </div>
            
            {/* Disk (Added for completeness) */}
             <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="flex items-center gap-2 text-slate-300 text-sm">
                  <HardDrive size={14} className="text-green-500" /> Disk IOPS
                </Label>
                <span className="text-xs font-mono text-green-400 font-bold">
                  High
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 w-[75%]"></div>
              </div>
            </div>

          </TabsContent>

          {/* TAB 2: METADATA (Read Only info) */}
          <TabsContent value="runtime" className="pt-4 space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="p-4 rounded-lg bg-black border border-slate-800 space-y-3">
              <div className="flex justify-between text-xs items-center border-b border-slate-900 pb-2">
                <span className="text-slate-500 flex gap-2 items-center"><MapPin size={12}/> Region</span>
                <span className="font-mono text-slate-300 bg-slate-900 px-2 py-0.5 rounded">{data.region}</span>
              </div>
              <div className="flex justify-between text-xs items-center border-b border-slate-900 pb-2">
                <span className="text-slate-500">Node ID</span>
                <span className="font-mono text-slate-400">{node.id}</span>
              </div>
              <div className="flex justify-between text-xs items-center">
                <span className="text-slate-500">Hourly Cost</span>
                <span className="font-mono text-green-400 font-bold">
                  ${data.cost}
                </span>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-black border border-slate-800">
                <Label className="text-xs text-slate-500 mb-2 block">JSON Data Preview</Label>
                <pre className="text-[10px] text-slate-400 font-mono bg-slate-950 p-2 rounded overflow-x-auto">
                    {JSON.stringify({ cpu: data.cpu, mem: data.memory, status: data.status }, null, 2)}
                </pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}