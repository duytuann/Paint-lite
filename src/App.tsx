import Toolbar from "@/components/toolbar/Toolbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Layers from "@/components/layers/Layers";
import Canvas from "@/components/canvas/Canvas";
import "@/App.css";

function App() {
  return (
    <div className="app">
      {/* Main Canvas */}
      <Canvas />

      {/* Top Toolbar */}
      <Toolbar />

      {/* Left Sidebar */}
      <Sidebar />

      {/* Layers Panel */}
      <Layers />
    </div>
  );
}

export default App;
