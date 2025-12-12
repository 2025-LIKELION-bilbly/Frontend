// utils/memo.ts
import { removeAnnotation } from "./annotation.core";

const generateMemoId = () =>
  `m-${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;

/* ======================================
 * 1️⃣ 드래그로 새 메모 생성 (selection)
 * ====================================== */
export const applyMemo = () => {
  const selection = window.getSelection();
  if (!selection || !selection.toString().trim()) return null;

  const range = selection.getRangeAt(0);
  const id = generateMemoId();

  const span = createMemoSpan(id);

  try {
    range.surroundContents(span);
    selection.removeAllRanges();
  } catch {
    return null;
  }

  return { id, type: "memo" as const };
};

/* ======================================
 * 2️⃣ 기존 annotation 위에 메모 추가
 *    (highlight → memo, quote → memo)
 * ====================================== */
export const applyMemoToElement = (target: HTMLElement) => {
  const id = generateMemoId();

  const span = createMemoSpan(id);

  const parent = target.parentNode;
  if (!parent) return null;

  parent.insertBefore(span, target);
  span.appendChild(target);

  return { id, type: "memo" as const };
};

/* ======================================
 * 공통 memo span 생성
 * ====================================== */
const createMemoSpan = (id: string) => {
  const span = document.createElement("span");
  span.classList.add("annotation", "memo");
  span.dataset.id = id;
  span.dataset.type = "memo";

  // 밑줄
  span.style.borderBottom = "1px solid #c93b4d";
  span.style.paddingBottom = "2px";
  span.style.position = "relative";
  span.style.cursor = "pointer";

  // 아이콘
  const icon = document.createElement("span");
  icon.classList.add("memo-icon");
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M11.375 1.75H2.625C2.39294 1.75 2.17038 1.84219 2.00628 2.00628C1.84219 2.17038 1.75 2.39294 1.75 2.625V11.375C1.75 11.6071 1.84219 11.8296 2.00628 11.9937C2.17038 12.1578 2.39294 12.25 2.625 12.25H8.56898C8.68393 12.2504 8.79781 12.2279 8.90399 12.1839C9.01017 12.1398 9.10654 12.0751 9.1875 11.9935L11.9935 9.1875C12.0751 9.10654 12.1398 9.01017 12.1839 8.90399C12.2279 8.79781 12.2504 8.68393 12.25 8.56898V2.625C12.25 2.39294 12.1578 2.17038 11.9937 2.00628C11.8296 1.84219 11.6071 1.75 11.375 1.75ZM8.75 11.194V8.75H11.194L8.75 11.194Z" fill="#970522"/>
    </svg>
  `;

  icon.style.position = "absolute";
  icon.style.right = "-18px";
  icon.style.bottom = "-10px";
  icon.style.cursor = "pointer";

  span.appendChild(icon);
  return span;
};

/* ======================================
 * 삭제
 * ====================================== */
export const removeMemo = (memoId: string) => {
  removeAnnotation(memoId);
};
