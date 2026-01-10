"use client";

import { Node } from "@prisma/client";
import { apiClient } from "../app-client";
import { getAllNodesType } from "../types/get-all.type";

export const nodeService = {
  getAll: async (): Promise<Node[]> => {
    const { data } = await apiClient.get<getAllNodesType>("/");
    return data.nodes;
  },

  create: async (
    parentNodeId: number,
    ordering: number,
    title: string
  ): Promise<Node> => {
    const { data } = await apiClient.post<Node>("/", {
      parentNodeId,
      ordering,
      title,
    });
    return data;
  },

  reorder: async (id: number, payload: Partial<Node>): Promise<Node> => {
    const { data } = await apiClient.put<Node>(`/${id}`, payload);
    return data;
  },

  update: async (id: number, title: string): Promise<Node> => {
    const { data } = await apiClient.patch<Node>(`/${id}`, { title });
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
};
