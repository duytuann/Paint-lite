import {createContext, useContext} from "react";
import {ToolStore} from "./ToolStore";
import {CanvasStore} from "./CanvasStore";

export class RootStore {
  toolStore: ToolStore;
  canvasStore: CanvasStore;

  constructor() {
    this.toolStore = new ToolStore();
    this.canvasStore = new CanvasStore();
  }

  // Initialize the stores and set up any cross-store relationships
  init() {}
}

// Create the store instance
export const rootStore = new RootStore();

// Initialize the stores
rootStore.init();

// Create React context for the stores
export const StoreContext = createContext(rootStore);

// Hook to use the stores in components
export const useStores = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStores must be used within a StoreProvider");
  }
  return context;
};

// Individual store hooks for convenience
export const useToolStore = () => useStores().toolStore;
export const useCanvasStore = () => useStores().canvasStore;
