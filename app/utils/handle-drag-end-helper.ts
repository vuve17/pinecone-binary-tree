import { Node } from "@prisma/client";
import { showSnackbar } from "../store/notification.slice";
import { AppDispatch } from "../store/store";
import { isDescendant } from "./is-descendant-helper-func";

export const validateNodeDragAndDropMove = (
  nodes: Node[],
  active: Node,
  target: Node,
  dispatch: AppDispatch
): boolean => {
  if (active.depth !== target.depth) {
    const lowerDepthNode = active.depth < target.depth ? active : target;
    const higherDepthNode = lowerDepthNode.id === target.id ? active : target;

    if (isDescendant(nodes, lowerDepthNode.id, higherDepthNode.id)) {
      dispatch(
        showSnackbar({
          message: "Cannot move a parent into its own descendant.",
          severity: "error",
        })
      );
      return false;
    }
  }

  return true;
};
