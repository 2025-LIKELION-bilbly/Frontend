import { createAnnotation } from "./annotation.controller";

export function createHighlight(
  root: HTMLElement,
  page: number,
  color: string
) {
  return createAnnotation(root, {
    type: "highlight",
    page,
    color,
  });
}
