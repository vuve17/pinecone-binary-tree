"use client";

import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Node } from "@prisma/client";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ConfirmationModal from "./components/common/confirmational-modal";
import GlobalSpinner from "./components/common/global-spinner";
import { RecursiveTree } from "./components/node/recursive-tree";
import { nodeService } from "./services/node.service";
import {
  createNode, editNode, hideGlobalSpinner, removeNode, setAllNodes,
  showGlobalSpinner
} from "./store/node.slice";
import { showSnackbar } from "./store/notification.slice";
import { AppDispatch, RootState } from "./store/store";
import { ApiErrorResponse } from "./types/api-error-response.interface";
import { buildBinaryTree } from "./utils/build-binary-tree";
import { validateNodeDragAndDropMove } from "./utils/handle-drag-end-helper";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const nodes = useSelector((state: RootState) => state.nodesReducer.nodes);
  const isLoading = useSelector((state: RootState) =>
    state.nodesReducer.isLoading);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [nodeToDelete, setNodeToDelete] = useState<Node | null>(null)
  const [currentScale, setCurrentScale] = useState(1);
  const [activeDraggingNode, setActiveDraggingNode] = useState<Node | null>(null);
  const [mounted, setMounted] = useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    const node = event.active.data.current as Node;
    setActiveDraggingNode(node);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 10,
        tolerance: 5,
      },
    })
  );

  const handleDeleteModalOpen = (node: Node) => {
    setNodeToDelete(node)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteModalClose = () => {
    setNodeToDelete(null)
    setIsDeleteModalOpen(false)
  }

  // GET
  const fetchNodes = async () => {
    setMounted(true);
    try {
      dispatch(showGlobalSpinner());
      const data: Node[] = await nodeService.getAll();
      dispatch(setAllNodes(data));
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      dispatch(showSnackbar({
        message: error?.response?.data?.error ?
          error?.response?.data?.error : "Failed to load tree", severity: "error"
      }));
    } finally {
      dispatch(hideGlobalSpinner());
    }
  };

  useEffect(() => {
    fetchNodes()
  }, []);

  if (!mounted) return null;
  // CREATE
  const handleCreate = async (parentId: number, ordering: number, title:
    string) => {
    try {
      const createdNode = await nodeService.create(parentId, ordering,
        title);
      dispatch(createNode(createdNode));
      dispatch(showSnackbar({
        message: "Node created", severity: "success"
      }));
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      dispatch(showSnackbar({
        message: error?.response?.data?.error ?
          error?.response?.data?.error : "Creation failed", severity: "error"
      }));
    }
  };

  // EDIT
  const handleEdit = async (id: number, title: string) => {
    try {
      const updatedNode = await nodeService.update(id, title);
      dispatch(editNode(updatedNode));
      dispatch(showSnackbar({
        message: "Node renamed", severity: "success"
      }));
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      dispatch(showSnackbar({
        message: error?.response?.data?.error ?
          error?.response?.data?.error : "Rename failed", severity: "error"
      }));
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    dispatch(showGlobalSpinner());
    try {
      await nodeService.delete(id);
      dispatch(removeNode(id));
      dispatch(showSnackbar({
        message: "Node deleted", severity: "success"
      }));
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      dispatch(showSnackbar({
        message: error?.response?.data?.error ?
          error?.response?.data?.error : "Delete failed", severity: "error"
      }));
    } finally {
      dispatch(hideGlobalSpinner());
      setIsDeleteModalOpen(false);
    }
  };

  const binaryTree = buildBinaryTree(nodes);


  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveDraggingNode(null);
    try {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const activeNodeId = active.id as number;
      let newParentId: number;
      let ordering: number | undefined;
      if (!over.data.current) {
        dispatch(showSnackbar({
          message: "Invalid drag & drop target", severity:
            "warning"
        }));
        return;
      }
      if (over.data.current.placeholder) {
        newParentId = over.data.current.parentNodeId;
        ordering = over.data.current.ordering;
      } else {
        newParentId = over.data.current.parentNodeId;
        ordering = over.data.current.ordering
      }

      const validation = validateNodeDragAndDropMove(nodes, active.data.current as Node,
        over.data.current as Node, dispatch);
      if (!validation) return;
      const updatedNode = await nodeService.reorder(activeNodeId, {
        parentNodeId: newParentId,
        ordering: ordering,
      });

      dispatch(editNode(updatedNode));
      dispatch(showSnackbar({
        message: "Node moved successfully", severity:
          "success"
      }));
      fetchNodes();
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      dispatch(showSnackbar({
        message: error?.response?.data?.error ?
          error?.response?.data?.error : "Failed to move node", severity:
          "error"
      }));
    }
  };

  const createScaleModifier = (scale: number) => {
    return ({ transform }: { transform: any }) => {
      return {
        ...transform,
        x: transform.x / scale,
        y: transform.y / scale,
      };
    };
  };

  return (

    <main className="bg-gray-50 overflow-auto" style={{
      minWidth: "100vw",
      minHeight: "100vh"
    }}>
      <TransformWrapper
        initialScale={1}
        minScale={0.2}
        maxScale={3}
        centerOnInit={true}
        wheel={{ step: 0.1, disabled: !!activeDraggingNode }}
        panning={{ disabled: !!activeDraggingNode }}
        disabled={!!activeDraggingNode}
        onTransformed={(ref) => setCurrentScale(ref.state.scale)}
      >
        <TransformComponent wrapperClass="!w-full !h-full" wrapperStyle={{
          width: "100vw",
          height: "100vh",
        }}
          contentStyle={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GlobalSpinner show={isLoading} />
          <DndContext onDragEnd={handleDragEnd}
            onDragStart={handleDragStart} sensors={sensors}
            modifiers={[createScaleModifier(currentScale)]}>
            {
              isDeleteModalOpen && nodeToDelete != null &&
              <ConfirmationModal
                openModal={isDeleteModalOpen}
                onCancel={handleDeleteModalClose}
                onConfirm={() => handleDelete(nodeToDelete.id)}
                noText="Cancel"
                yesText="Delete"
                question={`Are you sure you want to delete 
"${nodeToDelete.title} node"?`}
                dialogText="Warning! This will also delete all of its 
children nodes."
              />
            }

            <div className="flex justify-center pt-10">
              {!isLoading && binaryTree ? (
                <RecursiveTree
                  treeNode={binaryTree}
                  onEdit={handleEdit}
                  onDelete={handleDeleteModalOpen}
                  onAddChild={handleCreate}
                  isThisNodeBeingDragged={activeDraggingNode}
                />
              ) : !isLoading && (
                <p>No root node found. Seed your database.</p>
              )}
            </div>
          </DndContext>
        </TransformComponent>
      </TransformWrapper>
    </main>
  );
}

