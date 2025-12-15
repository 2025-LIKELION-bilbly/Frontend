interface MemoPopupParams {
  annotationId: string;
  initialContent?: string;
  onSave(content: string): void;
  onDelete(): void;
}

export function openMemoPopup(params: MemoPopupParams) {
  const popup = document.createElement("div");
  popup.className = "memo-popup";

  const textarea = document.createElement("textarea");
  textarea.value = params.initialContent ?? "";

  const save = document.createElement("button");
  save.innerText = "저장";
  save.onclick = () => {
    params.onSave(textarea.value);
    popup.remove();
  };

  const del = document.createElement("button");
  del.innerText = "삭제";
  del.onclick = () => {
    params.onDelete();
    popup.remove();
  };

  popup.append(textarea, save, del);
  document.body.appendChild(popup);
}
