// utils/annotation.core.ts

const generateUniqueId = () =>
    Date.now().toString(36) + Math.random().toString(36).slice(2);

export type AnnotationType = "highlight" | "quote" | "memo";

export interface ActiveAnnotation {
    id: string;
    type: AnnotationType;
}

export interface AnnotationResult {
    id: string;
    type: AnnotationType;
    groupId?: string;
    textSentence: string;
    startOffset: number;
    endOffset: number;
    color?: string;
    content?: string;
}

/* ------------------------------
 * Comment wrapper (quote 전용)
 * ------------------------------ */
const createCommentWrapper = (
    annotationId: string,
    isInput?: boolean,
    content?: string
    ) => {
    const wrapper = document.createElement("span");
    wrapper.className = "comment-wrapper";
    wrapper.dataset.id = annotationId;

    if (isInput) {
        const textarea = document.createElement("textarea");
        textarea.className = "comment-input";
        textarea.placeholder = "코멘트 입력"; 
        

        const save = document.createElement("button");
        save.className = "comment-save-btn";
        save.innerText = "저장";

        wrapper.append(textarea, save);
    } else if (content) {
        const marker = document.createElement("span");
        marker.className = "comment-marker";
        marker.innerText = content;
        wrapper.append(marker);
    }

    return wrapper;
    };

    /* ------------------------------
    * Selection surround (핵심)
    * ------------------------------ */


    
export const surroundSelection = (
    type: AnnotationType,
    style: React.CSSProperties,
    content?: string,
    isCommentInput?: boolean
    ): AnnotationResult | null => {

    const selection = window.getSelection();
    if (!selection || !selection.toString().trim()) return null;

    const range = selection.getRangeAt(0);

    const startEl =
        range.startContainer.nodeType === Node.ELEMENT_NODE
            ? (range.startContainer as HTMLElement)
            : range.startContainer.parentElement;

        if (startEl?.closest(".annotation")) {
            console.warn("이미 annotation 내부입니다. surroundSelection 중단");
        return null;
    }


    const text = selection.toString();

    const id = `${type[0]}-${generateUniqueId()}`;
    const groupId = id; // 기본값: 자기 자신
    const span = document.createElement("span");

    span.classList.add("annotation", type);
    span.dataset.id = id;
    
    span.dataset.groupId = groupId;
    span.dataset.type = type;

    Object.assign(span.style, style, { position: "relative" });

    try {
        range.surroundContents(span);
        selection.removeAllRanges();
    } catch (e) {
        console.error("Failed to surround contents:", e);
        return null;
    }

    if (type === "quote") {
        const commentWrapper = createCommentWrapper(id, isCommentInput, content);
        span.appendChild(commentWrapper);
    }

    if (type === "highlight") {
    // 아무것도 추가하지 않아도 됨
    // 하지만 명시적으로 분기 존재시켜야 안정됨
    }


    return {
        id,
        type,
        groupId,
        textSentence: text,
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        color: type === "highlight" ? style.backgroundColor : undefined,
        content,
    };

};


/* ------------------------------
 * Remove annotation
 * ------------------------------ */
export const removeAnnotation = (annotationId: string) => {
    const el = document.querySelector(
        `.annotation[data-id="${annotationId}"]`
    ) as HTMLElement | null;

    if (!el) return;

    const parent = el.parentNode;
    if (!parent) return;

    // (선택) quote wrapper 제거 로직이 있으면 여기에

    // ✅ unwrap
    while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
    }

    // ✅ remove 먼저 해도 parent는 변수로 잡혀있음
    el.remove();

    // ✅ parent가 null이 아님
    parent.normalize();
};

export const surroundElement = (
    targetElement: HTMLElement,
    type: AnnotationType,
    style: React.CSSProperties,
    content?: string,
    isCommentInput?: boolean
    ): AnnotationResult | null => {
    const parent = targetElement.parentNode;
    if (!parent) return null;

    const annotationId = `${type[0]}-${generateUniqueId()}`;
    const text = targetElement.innerText;

    const wrapper = document.createElement("span");
    wrapper.classList.add("annotation", type);
    wrapper.dataset.id = annotationId;
    wrapper.dataset.type = type;

    Object.assign(wrapper.style, style, { position: "relative" });

    // 기존 element를 감싸는 구조
    parent.insertBefore(wrapper, targetElement);
    wrapper.appendChild(targetElement);

    // quote 전용 UI
    if (type === "quote") {
        const commentWrapper = createCommentWrapper(
        annotationId,
        isCommentInput,
        content
        );
        wrapper.appendChild(commentWrapper);
    }

    return {
        id: annotationId,
        type,
        textSentence: text,
        startOffset: 0,
        endOffset: text.length,
        color: type === "highlight" ? style.backgroundColor : undefined,
        content,
    };
};

