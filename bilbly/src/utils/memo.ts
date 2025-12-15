// utils/memo.ts
import { showMemoPopup } from "./memoPopup";

const CONTAINER_SELECTOR = ".reading-page-container";

export const applyMemo = () => {
  const selection = window.getSelection();
  if (!selection || !selection.toString().trim()) return null;

  const range = selection.getRangeAt(0);

  // 🔥 memo 중첩 방지
  const parent =
    range.startContainer.nodeType === Node.ELEMENT_NODE
      ? (range.startContainer as HTMLElement)
      : range.startContainer.parentElement;

  if (parent?.closest(".annotation.memo")) return null;

  const id = `m-${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2)}`;

  const span = document.createElement("span");
  span.className = "annotation memo";
  span.dataset.id = id;
  span.style.borderBottom = "1px solid #c93b4d";
  span.style.paddingBottom = "2px";

  try {
    range.surroundContents(span);
    selection.removeAllRanges();
  } catch {
    return null;
  }

  const icon = document.createElement("span");
  icon.className = "memo-icon";
  icon.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
  width="14"
  height="14"
  viewBox="0 0 14 14"
  fill="none">
  <path
    d="M11.375 1.75H2.625C2.39294 1.75 2.17038 1.84219 2.00628 2.00628C1.84219 2.17038 1.75 2.39294 1.75 2.625V11.375C1.75 11.6071 1.84219 11.8296 2.00628 11.9937C2.17038 12.1578 2.39294 12.25 2.625 12.25H8.56898C8.68393 12.2504 8.79781 12.2279 8.90399 12.1839C9.01017 12.1398 9.10654 12.0751 9.1875 11.9935L11.9935 9.1875C12.0751 9.10654 12.1398 9.01017 12.1839 8.90399C12.2279 8.79781 12.2504 8.68393 12.25 8.56898V2.625C12.25 2.39294 12.1578 2.17038 11.9937 2.00628C11.8296 1.84219 11.6071 1.75 11.375 1.75ZM8.75 11.194V8.75H11.194L8.75 11.194Z"
    fill="#970522"
  />
</svg>
`;

  icon.style.cursor = "pointer";
  icon.style.marginLeft = "4px";

  span.appendChild(icon);

  const openPopup = () => {
    const container = document.querySelector(CONTAINER_SELECTOR) as HTMLElement;
    if (!container) return;

    const rect = span.getBoundingClientRect();
    const cRect = container.getBoundingClientRect();

    showMemoPopup({
      container,
      top: rect.bottom - cRect.top + container.scrollTop + 6,
      left: rect.left - cRect.left,
      initialContent: span.dataset.content || "",
      onSave: content => {
        span.dataset.content = content;
      },
      onCancel: () => {},
    });
  };

  // 🔥 메모 버튼 누르면 바로 팝업
  openPopup();

  // 아이콘 클릭 → 수정
  icon.addEventListener("click", e => {
    e.stopPropagation();
    openPopup();
  });

  return { id };
};

export const removeMemo = (memoId: string) => {
  const el = document.querySelector(
    `.annotation.memo[data-id="${memoId}"]`
  ) as HTMLElement | null;

  if (!el || !el.parentNode) return;

  const text = document.createTextNode(el.textContent || "");
  el.parentNode.insertBefore(text, el);
  el.remove();
};
