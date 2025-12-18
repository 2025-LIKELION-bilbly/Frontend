import type { Annotation } from "./annotation.core";

//import type { Annotation, Note } from "./annotation.core";
/* ===============================
 * 전체 Annotation 렌더
 * =============================== */
export function renderAnnotations(
  root: HTMLElement,
  annotations: Annotation[]
) {
  clearAnnotations(root);

  const sorted = [...annotations].sort(
    (a, b) => a.range.start - b.range.start
  );

  for (const annotation of sorted) {
    renderAnnotation(root, annotation);
  }
}

/* ===============================
 * 개별 Annotation 렌더
 * =============================== */
export function renderAnnotation(
  root: HTMLElement,
  annotation: Annotation
) {
  const domRange = createDomRange(root, annotation.range);
  if (!domRange) return;

  const span = document.createElement("span");
  span.className = "annotation highlight";
  span.dataset.id = annotation.id;

  if (annotation.color) {
    span.style.backgroundColor = annotation.color;
  }

  try {
    domRange.surroundContents(span);
  } catch {
    return;
  }

  /* ---------------------------
   * Note 아이콘 렌더
   * --------------------------- */
  if (annotation.notes.length > 0) {
    const hasFocusComment = annotation.notes.some(
      n => n.type === "comment" && n.source === "focus"
    );

    const hasTogetherComment = annotation.notes.some(
      n => n.type === "comment" && n.source === "together"
    );

    const hasMemo = annotation.notes.some(n => n.type === "memo");

    if (hasFocusComment || hasTogetherComment) {
      const commentIcon = document.createElement("span");
      commentIcon.className = "note-icon comment";
      commentIcon.dataset.noteType = "comment";
      commentIcon.dataset.annotationId = annotation.id;
      commentIcon.dataset.source = hasTogetherComment ? "together" : "focus";
      commentIcon.textContent = "💬";
      span.appendChild(commentIcon);
    }

    if (hasMemo) {
      const memoIcon = document.createElement("span");
      memoIcon.className = "note-icon memo";
      memoIcon.dataset.noteType = "memo";
      memoIcon.dataset.annotationId = annotation.id;
      memoIcon.textContent = "📝";
      span.appendChild(memoIcon);
    }
  } // ← annotation.notes.length > 0 닫힘
  } // ← 🔥 renderAnnotation 함수 닫힘


/* ===============================
 * DOM Range 생성
 * =============================== */
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

/* ===============================
 * offset → 텍스트 노드 매핑
 * =============================== */
function findNode(
  root: HTMLElement,
  offset: number
): { node: Node; offset: number } | null {
  let count = 0;

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (node.parentElement?.closest(".inline-comment")) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

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

/* ===============================
 * 기존 Annotation 제거
 * =============================== */
function clearAnnotations(root: HTMLElement) {
  root.querySelectorAll(".annotation").forEach(el =>
    unwrap(el as HTMLElement)
  );
}

/* ===============================
 * span 해제
 * =============================== */
function unwrap(el: HTMLElement) {
  const parent = el.parentNode;
  if (!parent) return;

  while (el.firstChild) {
    parent.insertBefore(el.firstChild, el);
  }
  el.remove();
  parent.normalize();
}
