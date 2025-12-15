interface CommentOverlayParams {
  annotationId: string;
  onInput(value: string): void;
  onSave(value: string): void;
  onCancel(): void;
}

export function openCommentOverlay(params: CommentOverlayParams) {
  const wrapper = document.createElement("div");
  wrapper.className = "comment-input-wrapper";

  const textarea = document.createElement("textarea");
  textarea.placeholder = "코멘트 입력";

  textarea.addEventListener("input", () => {
    params.onInput(textarea.value);
  });

  textarea.addEventListener("blur", () => {
    params.onSave(textarea.value);
    wrapper.remove();
  });

  wrapper.appendChild(textarea);
  document.body.appendChild(wrapper);
}
