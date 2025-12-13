import { surroundSelection, surroundElement } from "./annotation.core";
import type { AnnotationResult, ActiveAnnotation } from "./annotation.core";
// import { applyMemo } from "./memo";


const READING_CONTAINER_SELECTOR = ".reading-page-container";

let activeCommentInputId: string | null = null;

const COMMENT_LIMIT = 25;


// 위치 계산
const getLastLinePosition = (annotationId: string) => {
    const containerEl = document.querySelector(
        READING_CONTAINER_SELECTOR
    ) as HTMLElement | null;
    if (!containerEl) return null;

    const allSpans = document.querySelectorAll(
        `.annotation[data-id="${annotationId}"]`
    );
    if (!allSpans.length) return null;

    let lastRect: DOMRect | null = null;
    let maxBottom = -1;

    allSpans.forEach(span => {
        const rects = span.getClientRects();
        Array.from(rects).forEach(rect => {
        if (rect.bottom > maxBottom) {
            maxBottom = rect.bottom;
            lastRect = rect;
        }
        });
    });

    if (!lastRect) return null;

    const rect = lastRect as DOMRect;
    const containerRect = containerEl.getBoundingClientRect();
    return {
        top: rect.bottom - containerRect.top + containerEl.scrollTop - 2,
        left: rect.left - containerRect.left + 16,
    };
};

/* ----------------------------------
 * 코멘트 생성 + textarea overlay
 * ---------------------------------- */
export const applyComment = (
    activeAnnotation?: ActiveAnnotation | null
    ): AnnotationResult | null => {
    const selection = window.getSelection();
    const style: React.CSSProperties = { cursor: "pointer" };

    let result: AnnotationResult | null = null;
    let targetAnnotationId: string | null = null;

    if (selection && selection.toString().trim()) {
        result = surroundSelection("quote", style);
        if (result) targetAnnotationId = result.id;
    } else if (activeAnnotation) {
        const el = document.querySelector(
        `.annotation[data-id="${activeAnnotation.id}"]`
        ) as HTMLElement | null;

        if (el) {
        result = surroundElement(el, "quote", style);
        if (result) targetAnnotationId = result.id;
        }
    }

    if (!targetAnnotationId) return result;

    if (activeCommentInputId && activeCommentInputId !== targetAnnotationId) {
        document
        .querySelector(
            `.comment-input-wrapper[data-id="${activeCommentInputId}"]`
        )
        ?.remove();
    }
    activeCommentInputId = targetAnnotationId;

    const container = document.querySelector(
        READING_CONTAINER_SELECTOR
    ) as HTMLElement | null;
    if (!container) return result;

    // 이미 열려 있으면 다시 만들지 않음
    if (
        document.querySelector(
        `.comment-input-wrapper[data-id="${targetAnnotationId}"]`
        )
    ) {
        return result;
    }

    const position = getLastLinePosition(targetAnnotationId);
    if (!position) return result;

    const wrapper = document.createElement("div");
    wrapper.className = "comment-input-wrapper";
    wrapper.dataset.id = targetAnnotationId;
    wrapper.style.position = "absolute";
    wrapper.style.top = `${position.top}px`;
    wrapper.style.left = `${position.left}px`;
    wrapper.style.width = "250px";
    wrapper.style.zIndex = "999";
    wrapper.addEventListener("click", e => e.stopPropagation());

    wrapper.innerHTML = `
        <textarea class="comment-input" placeholder="여기에 코멘트를 입력하세요"></textarea>
    `;

    container.appendChild(wrapper);

    const textarea = wrapper.querySelector(
    ".comment-input"
    ) as HTMLTextAreaElement;


    textarea.addEventListener("input", () => {
    const value = textarea.value;

    if (value.length <= COMMENT_LIMIT) return;

    const annotationId = wrapper.dataset.id;
    if (!annotationId) return;

    // 1️⃣ comment 입력 UI 제거
    wrapper.remove();
    activeCommentInputId = null;

    // 2️⃣ quote annotation 찾기
    const quoteEl = document.querySelector(
        `.annotation.quote[data-id="${annotationId}"]`
    ) as HTMLElement | null;

    if (!quoteEl) return;
    

    // 3️⃣ 위치 계산 (memo popup 위치)
    const position = getLastLinePosition(annotationId);
    if (!position) return;

    // 4️⃣ quote 제거 (텍스트만 남김)
    const parent = quoteEl.parentNode;
    if (!parent) return;

    while (quoteEl.firstChild) {
        parent.insertBefore(quoteEl.firstChild, quoteEl);
    }
    quoteEl.remove();
    parent.normalize();

    // 5️⃣ 🔥 memo popup을 "바로" 띄운다 (내용 포함)
    import("./memoPopup").then(({ showMemoPopup }) => {
        const container = document.querySelector(
        READING_CONTAINER_SELECTOR
        ) as HTMLElement;

        showMemoPopup({
        container,
        top: position.top + 8,
        left: position.left,
        initialContent: value, // ⭐⭐⭐ 핵심
        onSave: (content) => {
            console.log("[POST] memo 저장:", content);
        },
        onCancel: () => {
            console.log("메모 취소");
        },
        });
    });
    });





    return result;
};

/* ----------------------------------
 * 저장: 데이터만 저장 (DOM 변경 ❌)
 * ---------------------------------- */
export const updateCommentMarker = (
    annotationId: string,
    content: string
    ) => {
    const annotationEl = document.querySelector(
        `.annotation[data-id="${annotationId}"]`
    ) as HTMLElement | null;

    if (!annotationEl) return;

    annotationEl.dataset.content = content;
    // ❗ textarea 유지
};

/* ----------------------------------
 * 코멘트 삭제
 * ---------------------------------- */
export const removeComment = (commentId: string): void => {
    // overlay 제거
    document
        .querySelector(`.comment-input-wrapper[data-id="${commentId}"]`)
        ?.remove();

    activeCommentInputId = null;

    // annotation unwrap
    const el = document.querySelector(
        `.annotation.quote[data-id="${commentId}"]`
    ) as HTMLElement | null;

    if (!el || !el.parentNode) return;

    const parent = el.parentNode;
    const text = document.createTextNode(el.textContent || "");
    parent.insertBefore(text, el);
    el.remove();
    parent.normalize();
};



