import Toolbar from "@/components/toolbar/Toolbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Layers from "@/components/layers/Layers";
import Canvas from "@/components/canvas/Canvas";
import {useTools} from "@/hooks/useTools";
import "@/App.css";

function App() {
  const {activeTool, selectTool} = useTools();

  return (
    <div className="app">
      {/* Main Canvas */}
      <Canvas activeTool={activeTool} />

      {/* Top Toolbar */}
      <Toolbar activeTool={activeTool} onToolChange={selectTool} />

      {/* Left Sidebar */}
      <Sidebar />

      {/* Layers Panel */}
      <Layers />
    </div>
  );
}

export default App;
