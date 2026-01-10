"use client";

import { Node } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodesState {
  isLoading: boolean;
  nodes: Node[];
}

const initialState: NodesState = {
  isLoading: false,
  nodes: [
    {
      id: 1,
      title: "Pinecone tree",
      ordering: 0,
      depth: 0,
      parentNodeId: null,
    },
  ],
};

const nodesSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showGlobalSpinner: (state) => {
      state.isLoading = true;
    },
    hideGlobalSpinner: (state) => {
      state.isLoading = false;
    },
    setAllNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    editNode: (state, action: PayloadAction<Node>) => {
      const indexOfEditedNode = state.nodes.findIndex(
        (n) => n.id === action.payload.id
      );
      if (indexOfEditedNode) state.nodes[indexOfEditedNode] = action.payload;
    },
    createNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action: PayloadAction<number>) => {
      const indexOfDeletedNode = state.nodes.findIndex(
        (n) => n.id === action.payload
      );
      if (indexOfDeletedNode) state.nodes.splice(indexOfDeletedNode, 1);
    },
  },
});

export const {
  showGlobalSpinner,
  hideGlobalSpinner,
  setAllNodes,
  editNode,
  removeNode,
  createNode,
} = nodesSlice.actions;
export default nodesSlice.reducer;
