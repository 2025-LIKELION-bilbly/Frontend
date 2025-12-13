export const showMemoPopup = ({
  container,
  top,
  left,
  initialContent = "",
  onSave,
  onCancel,
}: {
  container: HTMLElement;
  top: number;
  left: number;
  initialContent?: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}) => {
  const existing = document.getElementById("memo-popup");
  if (existing) existing.remove();

  const POPUP_WIDTH = 180;
  const POPUP_HEIGHT = 170;
  const PADDING = 8;

  const containerRect = container.getBoundingClientRect();

  /* ---------------- wrapper ---------------- */
  const wrapper = document.createElement("div");
  wrapper.id = "memo-popup";
  wrapper.style.position = "absolute";
  wrapper.style.width = `${POPUP_WIDTH}px`;
  wrapper.style.height = `${POPUP_HEIGHT}px`;
  wrapper.style.background = "#f7dddd";
  wrapper.style.border = "1px solid #c93b4d";
  wrapper.style.borderRadius = "6px";
  wrapper.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  wrapper.style.zIndex = "9999";
  wrapper.style.padding = "8px";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "6px";


  /* ---------------- position 보정 ---------------- */
  const adjustedLeft = Math.max(
    PADDING,
    Math.min(left, containerRect.width - POPUP_WIDTH - PADDING)
  );

  const adjustedTop = Math.max(
    PADDING,
    Math.min(top, containerRect.height - POPUP_HEIGHT - PADDING)
  );

  wrapper.style.left = `${adjustedLeft}px`;
  wrapper.style.top = `${adjustedTop}px`;

  /* ---------------- textarea ---------------- */
  const textarea = document.createElement("textarea");
  textarea.value = initialContent;
  textarea.maxLength = 250;
  textarea.placeholder = "여기에 메모를 입력하세요...";
  textarea.style.flex = "1";
  textarea.style.resize = "none";
  textarea.style.border = "none";
  textarea.style.outline = "none";
  textarea.style.background = "transparent";
  textarea.style.fontSize = "13px";

  /* ---------------- counter ---------------- */
  const counter = document.createElement("div");
  counter.style.fontSize = "11px";
  counter.style.textAlign = "right";
  counter.style.color = "#555";
  counter.innerText = `${textarea.value.length} / 250`;

  textarea.addEventListener("input", () => {
    counter.innerText = `${textarea.value.length} / 250`;
  });

  /* ---------------- append ---------------- */
  wrapper.appendChild(textarea);
  wrapper.appendChild(counter);
  container.appendChild(wrapper);

  wrapper.addEventListener("click", e => {
    e.stopPropagation();
  });
  
  textarea.focus();

  /* ---------------- outside click ---------------- */
  const handleClickOutside = (e: MouseEvent) => {
    if (!wrapper.contains(e.target as Node)) {
      const value = textarea.value.trim();
      if (value) onSave(value);
      else onCancel();
      cleanup();
    }
  };

  const cleanup = () => {
    document.removeEventListener("click", handleClickOutside);
    wrapper.remove();
  };

  setTimeout(() => {
    document.addEventListener("click", handleClickOutside, { once: false });
  }, 0);


  return cleanup;
};
