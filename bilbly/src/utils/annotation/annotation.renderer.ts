import type { Annotation } from "./annotation.core";

/* ===============================
 * 전체 Annotation 렌더
 * =============================== */
export function renderAnnotations(
  root: HTMLElement,
  annotations: Annotation[]
) {
  clearAnnotations(root);

  // 🔥 start offset 기준으로 정렬 (겹침 방지)
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
function renderAnnotation(root: HTMLElement, annotation: Annotation) {
  const domRange = createDomRange(root, annotation.range);
  if (!domRange) return;

  const span = document.createElement("span");
  span.classList.add("annotation", annotation.type);
  span.dataset.id = annotation.id;

  /* ---------------------------
   * Highlight 스타일
   * --------------------------- */
  if (annotation.type === "highlight" && annotation.color) {
    span.style.backgroundColor = annotation.color;
  }

  /* ---------------------------
   * Memo / Comment 공통 스타일
   * → 텍스트도 highlight처럼 감쌈
   * --------------------------- */
  if (annotation.type === "memo") {
    span.style.borderBottom = "1px solid #c93b4d";
    span.style.paddingBottom = "2px";
  }

  /* ---------------------------
   * Range 감싸기 (🔥 핵심)
   * --------------------------- */
  try {
    domRange.surroundContents(span);
  } catch {
    return;
  }

  /* ---------------------------
   * Comment 인라인 표시
   * --------------------------- */
  if (annotation.content) {
    const commentEl = document.createElement("span");
    commentEl.className = "inline-comment";
    commentEl.textContent = annotation.content;
    span.appendChild(commentEl);
  }
}

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
