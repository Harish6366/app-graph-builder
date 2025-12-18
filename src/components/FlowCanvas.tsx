import { useEffect, useMemo } from "react"
import {
  ReactFlow,
  Background,
  Controls,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type NodeTypes,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useQuery } from "@tanstack/react-query"
import { fetchGraph } from "../api/mock"
import { useStore } from "../store"
import { Loader2 } from "lucide-react"
import { CustomNode } from "./CustomNode"
import { type AppNode, type AppEdge } from "../types"

export function FlowCanvas() {
  const { selectedAppId, setSelectedNodeId } = useStore()

  // 1. Use the specific hooks for interactivity
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>([])

  const nodeTypes: NodeTypes = useMemo(() => ({
    serviceNode: CustomNode,
  }), [])

  const { data, isLoading } = useQuery({
    queryKey: ["graph", selectedAppId],
    queryFn: () => fetchGraph(selectedAppId!),
    enabled: !!selectedAppId,
  })

  // 2. Sync data from API to ReactFlow state
  useEffect(() => {
    if (data) {
      setNodes(data.nodes)
      setEdges(data.edges)
    }
  }, [data, setNodes, setEdges])

  if (!selectedAppId)
    return (
      <div className="flex h-full items-center justify-center text-slate-500 bg-black">
        Select an App to begin
      </div>
    )

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center text-slate-400 bg-black">
        <Loader2 className="animate-spin mr-2" /> Loading Canvas…
      </div>
    )

  return (
    // 3. Force pure black background on the container
    <div className="h-full w-full bg-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange} // Dragging support
        onEdgesChange={onEdgesChange} // Connection support
        onNodeClick={(_, node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        fitView
        colorMode="dark"
      >
        {/* 4. High-contrast Dots configuration */}
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#475569" /* Slate-600 for visible dots on black */
          className="bg-black"
        />
        <Controls className="bg-slate-900 border-slate-800 fill-white" />
      </ReactFlow>
    </div>
  )
}