// utils/comment.ts
// 역할: highlight에 종속된 comment UI 관리 (DOM overlay)
// ❌ 텍스트를 감싸지 않음
// ❌ annotation 생성하지 않음

// const READING_CONTAINER_SELECTOR = ".reading-page-container";

/* ==============================
 * Types
 * ============================== */

interface OpenCommentParams {
  container: HTMLElement;
  annotationId: string; // 🔥 highlight id
  top: number;
  left: number;
  initialContent?: string;
}

/* ==============================
 * Open Comment Input
 * ============================== */

export function openCommentInput({
  container,
  annotationId,
  top,
  left,
  initialContent = "",
}: OpenCommentParams) {
  // 이미 열려 있으면 중복 생성 방지
  const existing = document.querySelector(
    `.comment-input-wrapper[data-id="${annotationId}"]`
  );
  if (existing) return;

  const wrapper = document.createElement("div");
  wrapper.className = "comment-input-wrapper";
  wrapper.dataset.id = annotationId;

  wrapper.style.position = "absolute";
  wrapper.style.top = `${top}px`;
  wrapper.style.left = `${left}px`;
  wrapper.style.width = "70%";
  wrapper.style.zIndex = "999";
  wrapper.style.background = "#fff";
  wrapper.style.border = "1px solid #ddd";
  wrapper.style.borderRadius = "6px";
  wrapper.style.padding = "8px";
  wrapper.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

  wrapper.addEventListener("click", e => e.stopPropagation());

  wrapper.innerHTML = `
    <textarea
      class="comment-input"
      placeholder="여기에 코멘트를 입력하세요"
      style="
        width: 100%;
        resize: none;
        border: none;
        outline: none;
        font-size: 14px;
      "
      rows="2"
    >${initialContent}</textarea>

    <div style="text-align: right; margin-top: 6px;">
      <button
        class="comment-save-btn"
        style="
          font-size: 12px;
          padding: 4px 8px;
          cursor: pointer;
        "
      >
        저장
      </button>
    </div>
  `;

  container.appendChild(wrapper);

  const textarea = wrapper.querySelector(
    ".comment-input"
  ) as HTMLTextAreaElement;

  textarea.focus();
}

/* ==============================
 * Save Comment
 * ============================== */

/**
 * comment 저장
 * - 실제 텍스트는 highlight의 dataset에 저장
 */
export function updateCommentContent(
  annotationId: string,
  content: string
) {
  const highlightEl = document.querySelector(
    `.annotation.highlight[data-id="${annotationId}"]`
  ) as HTMLElement | null;

  if (!highlightEl) return;

  highlightEl.dataset.comment = content;
}

/* ==============================
 * Close / Remove Comment UI
 * ============================== */

export function closeCommentInput(annotationId: string) {
  document
    .querySelector(`.comment-input-wrapper[data-id="${annotationId}"]`)
    ?.remove();
}

/**
 * comment 삭제
 * - highlight는 유지
 * - comment UI + 데이터만 제거
 */
export function removeComment(annotationId: string) {
  closeCommentInput(annotationId);

  const highlightEl = document.querySelector(
    `.annotation.highlight[data-id="${annotationId}"]`
  ) as HTMLElement | null;

  if (!highlightEl) return;

  delete highlightEl.dataset.comment;
}

/* ==============================
 * Utility
 * ============================== */

/**
 * highlight에 comment가 있는지 확인
 */
export function hasComment(annotationId: string): boolean {
  const el = document.querySelector(
    `.annotation.highlight[data-id="${annotationId}"]`
  ) as HTMLElement | null;

  return Boolean(el?.dataset.comment);
}
