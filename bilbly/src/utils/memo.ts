// utils/memo.ts
import { showMemoPopup } from "./memoPopup";

const READING_CONTAINER_SELECTOR = ".reading-page-container";

export const applyMemo = (groupId?: string) => {
  const selection = window.getSelection();
  if (!selection || !selection.toString().trim()) return null;

  const range = selection.getRangeAt(0);
  const id = `m-${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2)}`;

  /* ===============================
   * 1️⃣ memo span 생성
   * =============================== */
  const span = document.createElement("span");
  span.classList.add("annotation", "memo");
  span.dataset.id = id;
  span.dataset.type = "memo";
  span.dataset.groupId = groupId ?? id;
  span.style.borderBottom = "1px solid #c93b4d";
  span.style.paddingBottom = "2px";

  /* ===============================
   * 2️⃣ 선택 영역 감싸기
   * =============================== */
  try {
    range.surroundContents(span);
    selection.removeAllRanges();
  } catch {
    return null;
  }

  /* ===============================
   * 3️⃣ 메모 아이콘 생성
   * =============================== */
  const icon = document.createElement("span");
  icon.className = "memo-icon";
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M11.375 1.75H2.625C2.39294 1.75 2.17038 1.84219 2.00628 2.00628C1.84219 2.17038 1.75 2.39294 1.75 2.625V11.375C1.75 11.6071 1.84219 11.8296 2.00628 11.9937C2.17038 12.1578 2.39294 12.25 2.625 12.25H8.56898L11.9935 9.1875Z"
        fill="#970522"/>
    </svg>
  `;
  icon.style.marginLeft = "4px";
  icon.style.verticalAlign = "middle";
  icon.style.cursor = "pointer";

  span.appendChild(icon);

  /* ===============================
   * 4️⃣ memoPopup 여는 공통 함수
   * =============================== */
  const openPopup = () => {
    const container = document.querySelector(
      READING_CONTAINER_SELECTOR
    ) as HTMLElement | null;
    if (!container) return;

    const rect = span.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    showMemoPopup({
      container,
      top:
        rect.bottom -
        containerRect.top +
        container.scrollTop +
        8,
      left: rect.left - containerRect.left,

      initialContent: span.dataset.content || "",

      onSave: (content) => {
        span.dataset.content = content;
        console.log("[POST] memo save:", id, content);
      },

      onCancel: () => {
        console.log("memo canceled");
      },
    });
  };

  /* ===============================
   * 5️⃣ 아이콘 클릭 → 팝업
   * =============================== */
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    openPopup();
  });

  /* ===============================
   * 6️⃣ 🔥 메모 버튼 클릭 직후
   *     → 즉시 팝업 열기
   * =============================== */
  openPopup();

  return { id, type: "memo" as const };
};

/* ===============================
 * 메모 삭제
 * =============================== */
export const removeMemo = (memoId: string) => {
  const el = document.querySelector(
    `.annotation.memo[data-id="${memoId}"]`
  ) as HTMLElement | null;

  if (!el) return;

  const parent = el.parentNode;
  if (!parent) return;

  const text = document.createTextNode(el.textContent || "");
  parent.insertBefore(text, el);
  el.remove();
  parent.normalize();
};
