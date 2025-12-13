import { surroundSelection, surroundElement } from "./annotation.core";
import type { AnnotationResult, ActiveAnnotation } from "./annotation.core";
import { applyMemo } from "./memo";

const READING_CONTAINER_SELECTOR = ".reading-page-container";
const COMMENT_LIMIT = 25;

let activeCommentInputId: string | null = null;

/* -----------------------------
 * 마지막 줄 위치 계산
 * ----------------------------- */
const getLastLinePosition = (annotationId: string) => {
  const container = document.querySelector(
    READING_CONTAINER_SELECTOR
  ) as HTMLElement | null;
  if (!container) return null;

  const spans = document.querySelectorAll(
    `.annotation[data-id="${annotationId}"]`
  );
  if (!spans.length) return null;

  let lastRect: DOMRect | null = null;

  spans.forEach(span => {
    Array.from(span.getClientRects()).forEach(rect => {
      if (!lastRect || rect.bottom > lastRect.bottom) {
        lastRect = rect;
      }
    });
  });

  if (!lastRect) return null;

  const rect = lastRect as DOMRect;
  const containerRect = container.getBoundingClientRect();

  return {
    top: rect.bottom - containerRect.top + container.scrollTop-2 ,
    left: rect.left - containerRect.left,
  };
};

/* -----------------------------
 * 코멘트 생성
 * ----------------------------- */
export const applyComment = (
  activeAnnotation?: ActiveAnnotation | null
): AnnotationResult | null => {
  const selection = window.getSelection();
  const style: React.CSSProperties = { cursor: "pointer" };

  let result: AnnotationResult | null = null;
  let annotationId: string | null = null;

  // 1️⃣ selection 기반
  if (selection && selection.toString().trim()) {
    result = surroundSelection("quote", style);
    if (result) annotationId = result.id;
  }
  // 2️⃣ 기존 annotation 기반
  else if (activeAnnotation) {
    const el = document.querySelector(
      `.annotation[data-id="${activeAnnotation.id}"]`
    ) as HTMLElement | null;

    if (el) {
      result = surroundElement(el, "quote", style);
      if (result) annotationId = result.id;
    }
  }

  if (!annotationId) return result;

  // 기존 코멘트 입력 제거
  if (activeCommentInputId && activeCommentInputId !== annotationId) {
    document
      .querySelector(
        `.comment-input-wrapper[data-id="${activeCommentInputId}"]`
      )
      ?.remove();
  }
  activeCommentInputId = annotationId;

  const container = document.querySelector(
    READING_CONTAINER_SELECTOR
  ) as HTMLElement | null;
  if (!container) return result;

  // 이미 열려 있으면 종료
  if (
    document.querySelector(
      `.comment-input-wrapper[data-id="${annotationId}"]`
    )
  ) {
    return result;
  }

  const position = getLastLinePosition(annotationId);
  if (!position) return result;

  // textarea overlay
  const wrapper = document.createElement("div");
  wrapper.className = "comment-input-wrapper";
  wrapper.dataset.id = annotationId;
  wrapper.style.position = "absolute";
  wrapper.style.top = `${position.top}px`;
  wrapper.style.left = `${position.left}px`;
  wrapper.style.width = "70%";
  wrapper.style.zIndex = "999";
  wrapper.addEventListener("click", e => e.stopPropagation());

  wrapper.innerHTML = `
    <textarea
      class="comment-input"
      placeholder="여기에 코멘트를 입력하세요"
      style="width:100%; resize:none;"
    ></textarea>
  `;

  container.appendChild(wrapper);

  const textarea = wrapper.querySelector(
    ".comment-input"
  ) as HTMLTextAreaElement;


/* ===============================
 * 🔥 25자 초과 → 메모 전환 (최종)
 * =============================== */
textarea.addEventListener("input", () => {
  const value = textarea.value;
  if (value.length <= COMMENT_LIMIT) return;

  const quoteEl = document.querySelector(
    `.annotation.quote[data-id="${annotationId}"]`
  ) as HTMLElement | null;
  if (!quoteEl) return;

  // 1️⃣ selection 복구 (applyMemo 필수)
  const range = document.createRange();
  range.selectNodeContents(quoteEl);

  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);

  // 2️⃣ textarea 제거
  wrapper.remove();
  activeCommentInputId = null;

  // 3️⃣ 메모 생성 (underline + svg)
  const memoResult = applyMemo();
  if (!memoResult) return;

  const memoEl = document.querySelector(
    `.annotation.memo[data-id="${memoResult.id}"]`
  ) as HTMLElement | null;
  if (!memoEl) return;

  // 4️⃣ 입력하던 내용 저장
  memoEl.dataset.content = value;

  

  // 5️⃣ 메모 위치 계산
  const position = getLastLinePosition(memoResult.id);
  if (!position) return;

  // 6️⃣ 🔥 memoPopup 즉시 오픈
  import("./memoPopup").then(({ showMemoPopup }) => {
    const container = document.querySelector(
      READING_CONTAINER_SELECTOR
    ) as HTMLElement;

    showMemoPopup({
      container,
      top: position.top + 6,
      left: position.left,
      initialContent: value,
      onSave: content => {
        memoEl.dataset.content = content;
      },
      onCancel: () => {
        memoEl.remove();
      },
    });
  });
});


  return result;
};

/* -----------------------------
 * 코멘트 저장 (DOM 변경 ❌)
 * ----------------------------- */
export const updateCommentMarker = (
  annotationId: string,
  content: string
) => {
  const el = document.querySelector(
    `.annotation[data-id="${annotationId}"]`
  ) as HTMLElement | null;

  if (!el) return;
  el.dataset.content = content;
};

/* -----------------------------
 * 코멘트 삭제
 * ----------------------------- */
export const removeComment = (commentId: string) => {
  document
    .querySelector(`.comment-input-wrapper[data-id="${commentId}"]`)
    ?.remove();

  activeCommentInputId = null;

  const el = document.querySelector(
    `.annotation.quote[data-id="${commentId}"]`
  ) as HTMLElement | null;

  if (!el || !el.parentNode) return;

  const parent = el.parentNode;
  const text = document.createTextNode(el.textContent || "");
  parent.insertBefore(text, el);
  el.remove();
  parent.normalize();
};
