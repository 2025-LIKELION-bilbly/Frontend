import type { Annotation } from "./annotation.core";
import { showMemoPopup } from "../../utils/memoPopup";
// import { deleteAnnotation } from "../controllers/annotation.controller";



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
export function renderAnnotation(root: HTMLElement, annotation: Annotation) {
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
   * 🔥 Range 감싸기 (먼저!)
   * --------------------------- */
  try {
    domRange.surroundContents(span);
  } catch {
    return;
  }

  /* ---------------------------
   * Quote / Memo content 렌더링
   * (항상 span 안에서!)
   * --------------------------- */
  if (
    (annotation.type === "quote" ) &&
    annotation.content
  ) {
    const commentEl = document.createElement("span");
    commentEl.className = "inline-comment";
    commentEl.textContent = annotation.content;
    span.appendChild(commentEl);
  }

  /* ---------------------------
 *  Memo 아이콘 & 팝업 연결
 * --------------------------- */
  if (annotation.type === "memo") {
    const icon = document.createElement("span");
    icon.className = "memo-icon";
    icon.textContent = "📝";
    icon.style.marginLeft = "4px";
    icon.style.cursor = "pointer";

    icon.addEventListener("click", e => {
      e.stopPropagation(); 

  const container = document.querySelector(
    ".reading-page-container"
  ) as HTMLElement | null;

  if (!container) return;


      const rect = span.getBoundingClientRect();
      const cRect = container.getBoundingClientRect();

      showMemoPopup({
        container,
        top: rect.bottom - cRect.top + container.scrollTop + 6,
        left: rect.left - cRect.left,
        initialContent: annotation.content ?? "",
        onSave: value => {
          annotation.content = value;
        },
        onCancel: () => {},
      });
    });

    span.appendChild(icon);
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

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // inline-comment 내부 텍스트는 전부 제외
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
