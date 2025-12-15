import type { Annotation } from "./annotation.core";

export function renderAnnotations(
  root: HTMLElement,
  annotations: Annotation[]
) {
  clearAnnotations(root);

  const sorted = [...annotations].sort(
    (a, b) => a.range.start - b.range.start
  );

  for (const a of sorted) {
    renderAnnotation(root, a);
  }
}

function renderAnnotation(root: HTMLElement, annotation: Annotation) {
  const domRange = createDomRange(root, annotation.range);
  if (!domRange) return;

  const span = document.createElement("span");
  span.classList.add("annotation", annotation.type);
  span.dataset.id = annotation.id;

  // 🔥 highlight 텍스트는 기존대로 유지

  if (annotation.comment) {
    const commentEl = document.createElement("span");
    commentEl.className = "inline-comment";
    commentEl.textContent = annotation.comment;
    span.appendChild(commentEl);
}



  if (annotation.type === "highlight" && annotation.color) {
    span.style.backgroundColor = annotation.color;
  }

  domRange.surroundContents(span);
}

function createDomRange(
  root: HTMLElement,
  range: { start: number; end: number }
): Range | null {
  const start = findNode(root, range.start);
  const end = findNode(root, range.end);
  if (!start || !end) return null;

  const r = document.createRange();
  r.setStart(start.node, start.offset);
  r.setEnd(end.node, end.offset);
  return r;
}

function findNode(
  root: HTMLElement,
  offset: number
): { node: Node; offset: number } | null {
  let count = 0;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  let node: Node | null = walker.nextNode();
  while (node) {
    const len = node.textContent?.length ?? 0;
    if (count + len >= offset) {
      return { node, offset: offset - count };
    }
    count += len;
    node = walker.nextNode();
  }
  return null;
}

function clearAnnotations(root: HTMLElement) {
  root.querySelectorAll(".annotation").forEach(el => unwrap(el as HTMLElement));
}

function unwrap(el: HTMLElement) {
  const parent = el.parentNode;
  if (!parent) return;

  while (el.firstChild) parent.insertBefore(el.firstChild, el);
  el.remove();
  parent.normalize();
}
