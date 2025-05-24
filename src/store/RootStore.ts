import {createContext, useContext} from "react";
import {ToolStore} from "./ToolStore";

export class RootStore {
  toolStore: ToolStore;

  constructor() {
    this.toolStore = new ToolStore();
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
