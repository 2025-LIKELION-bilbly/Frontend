

export const applyMemo = (groupId?: string) => {
  
  const selection = window.getSelection();
  if (!selection || !selection.toString().trim()) return null;

    
  const range = selection.getRangeAt(0);
  const id = `m-${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;  


  // 1️⃣ span 생성
  const span = document.createElement("span");
  span.classList.add("annotation", "memo");
  span.dataset.id = id;
  span.dataset.type = "memo";
  span.dataset.groupId = groupId ?? id;
  span.style.borderBottom = "1px solid #c93b4d";
  span.style.paddingBottom = "2px";

  // 2️⃣ 먼저 텍스트를 감싼다 (🔥 핵심)
  try {
    range.surroundContents(span);
    selection.removeAllRanges();
  } catch {
    return null;
  }

  // 3️⃣ 그 다음 SVG 아이콘 추가
  const icon = document.createElement("span");
  icon.className = "memo-icon";
  icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M11.375 1.75H2.625C2.39294 1.75 2.17038 1.84219 2.00628 2.00628C1.84219 2.17038 1.75 2.39294 1.75 2.625V11.375C1.75 11.6071 1.84219 11.8296 2.00628 11.9937C2.17038 12.1578 2.39294 12.25 2.625 12.25H8.56898L11.9935 9.1875Z"
        fill="#970522"/>
    </svg>
  `;

  icon.addEventListener("click", (e) => {
    e.stopPropagation(); // ❗ 중요
    });


  icon.style.marginLeft = "4px";
  icon.style.verticalAlign = "middle";
  icon.style.cursor = "pointer";

  span.appendChild(icon);

  return { id, type: "memo" as const };
};

// 메모 삭제

export const removeMemo = (memoId: string) => {
  const el = document.querySelector(
    `.annotation.memo[data-id="${memoId}"]`
  ) as HTMLElement | null;

  if (!el) return;

  const parent = el.parentNode;
  if (!parent) return;

  // ✅ 텍스트만 복구 (memo-icon은 버림)
  const text = document.createTextNode(el.textContent || "");
  parent.insertBefore(text, el);

  // ✅ annotation + svg 한 번에 제거
  el.remove();

  parent.normalize();
};
