import Toolbar from "@/components/toolbar/Toolbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Layers from "@/components/layers/Layers";
import Canvas from "@/components/canvas/Canvas";
import {observer} from "mobx-react-lite";
import {useToolStore} from "@/store";
import "@/App.css";

const App = observer(() => {
  const toolStore = useToolStore();

  return (
    <div className="app">
      {/* Main Canvas */}
      <Canvas />

      {/* Top Toolbar */}
      <Toolbar />

      {/* Left Sidebar - hidden when selection tool is active */}
      {toolStore.activeTool !== "selection" && <Sidebar />}

      {/* Layers Panel */}
      <Layers />
    </div>
  );
});

export default App;
