import { createAnnotation } from "./annotation.controller";

export function createHighlight(
  root: HTMLElement,
  color: string
) {
  return createAnnotation(root, {
    type: "highlight",
    color,
  });
}
