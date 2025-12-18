# App Graph Builder 

A responsive, node-based infrastructure visualization tool built with React, ReactFlow, and TypeScript. This project replicates a specific dark-mode UI design, featuring custom interactive nodes, dynamic data fetching, and state management.

## 🚀 Features

- **Custom Node Engine:** heavily customized ReactFlow nodes featuring:
  - Interactive CPU/Memory sliders.
  - Tabbed interface (Resources vs. Metadata).
  - Dynamic status indicators (Healthy/Degraded/Down).
  - SVG Brand logos (AWS, Postgres, Redis, MongoDB).
- **Interactive Graph:** Drag, drop, pan, zoom, and delete nodes.
- **Mock Backend:** Simulates API latency and data relationships using TanStack Query.
- **Inspector Panel:** Real-time bi-directional data binding. Changing a value in the side panel updates the graph node instantly.
- **Responsive Design:** Sidebar converts to a slide-over drawer on mobile devices.
- **Bonus Features:**
  - "Add Node" functionality.
  - Keyboard shortcuts (`Shift+A` to add, `Shift+F` to fit view).
  - Node type styling (different visual accents for DB vs. Service nodes).

## 🛠️ Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript (Strict Mode)
- **Graph Library:** ReactFlow (@xyflow/react)
- **State Management:** Zustand
- **Data Fetching:** TanStack Query
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React + Inline SVGs

## 📦 Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YOUR_USERNAME/app-graph-builder.git
    cd app-graph-builder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

## 🧠 Key Decisions

1.  **UI Architecture (Screenshot Fidelity):**
    - The requirement emphasized "Screenshot Layout." I prioritized visual fidelity, implementing a "Deep Dark" theme using Tailwind colors (Slate-950/Black) and custom SVG assets to match the provided mockup exactly.
    - The "App Selector" was implemented as a floating overlay on the canvas (per screenshot visuals) rather than a rigid sidebar element, though the code structure allows it to be moved easily.

2.  **State Management Strategy:**
    - **ReactFlow Internal State:** Used for high-frequency updates (dragging nodes) to ensure 60fps performance.
    - **Zustand:** Used for global app state (`selectedAppId`, `isMobilePanelOpen`) where prop-drilling would be messy.
    - **TanStack Query:** Used for server state (Apps/Graph data) to handle caching and loading states gracefully.

3.  **Component Isolation:**
    - `CustomNode.tsx` encapsulates all logic for the node visualization, keeping the main Canvas clean.
    - `Inspector.tsx` uses `updateNodeData` from ReactFlow to modify nodes directly without triggering full-graph re-renders.

## ⚠️ Known Limitations

1.  **Persistence:** Since there is no real backend, changes made to nodes (renaming, slider adjustments) will reset upon refreshing the page.
2.  **Edge Creation:** Users cannot currently draw *new* edges between nodes manually (UI focus was on Node interaction), though existing edges render correctly.
3.  **Mobile Editing:** While the UI is responsive (drawer slides in), editing complex graphs on small touch screens is inherently difficult due to screen real estate.

## ⌨️ Keyboard Shortcuts

- **Shift + A**: Add a random Service Node.
- **Shift + F**: Fit graph to view.
- **Shift + D**: Toggle Inspector/Mobile Drawer.
- **Delete / Backspace**: Remove selected node.

