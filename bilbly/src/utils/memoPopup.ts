export const showMemoPopup = ({
    container,
    top,
    left,
    onSave,
    onCancel,
}: {
    container: HTMLElement;
    top: number;
    left: number;
    onSave: (content: string) => void;
    onCancel: () => void;
}) => {
    const existing = document.getElementById("memo-popup");
    if (existing) existing.remove();

    const POPUP_WIDTH = 140;
    const POPUP_HEIGHT = 150;
    const PADDING = 8;

    const containerRect = container.getBoundingClientRect();

    // 🔥 container 기준으로 위치 보정
    let adjustedTop = top;
    let adjustedLeft = left;

    // 좌측 넘침 방지
    adjustedLeft = Math.max(
        PADDING,
        Math.min(
            adjustedLeft,
            containerRect.width - POPUP_WIDTH - PADDING
        )
    );

    // 상단 넘침 방지
    adjustedTop = Math.max(
        PADDING,
        Math.min(
            adjustedTop,
            containerRect.height - POPUP_HEIGHT - PADDING
        )
    );

    const wrapper = document.createElement("div");
    wrapper.id = "memo-popup";
    wrapper.style.position = "absolute";
    wrapper.style.top = `${adjustedTop}px`;
    wrapper.style.left = `${adjustedLeft}px`;
    wrapper.style.width = `${POPUP_WIDTH}px`;
    wrapper.style.height = `${POPUP_HEIGHT}px`;
    wrapper.style.background = "#f7dddd";
    wrapper.style.border = "1px solid #c93b4d";
    wrapper.style.borderRadius = "4px";
    wrapper.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
    wrapper.style.zIndex = "9999";
    wrapper.style.padding = "10px";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";

    const textarea = document.createElement("textarea");
    textarea.style.flex = "1";
    textarea.style.resize = "none";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.background = "transparent";
    textarea.placeholder = "여기에 메모를 입력하세요...";

    wrapper.appendChild(textarea);

    // ⭐ container 안에 append (body ❌)
    container.appendChild(wrapper);

    textarea.focus();

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
        document.addEventListener("click", handleClickOutside);
    });

    return cleanup;
};
