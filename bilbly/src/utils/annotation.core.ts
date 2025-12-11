// utils/annotation.core.ts

// 고유 ID 생성을 위한 함수
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

// 주석 타입 정의 (memo 포함)
export type AnnotationType = 'highlight' | 'quote' | 'memo';

// 생성 결과 인터페이스
export interface AnnotationResult {
    id: string;
    textSentence: string;
    startOffset: number;
    endOffset: number;
    type: AnnotationType;
    color?: string;
    content?: string;
}

/**
 * 선택 영역을 <span>으로 감싸는 핵심 함수 (Annotation 생성)
 */
export const surroundSelection = (
    type: AnnotationType, 
    style: React.CSSProperties, 
    content?: string,
    // ⭐ 코멘트 입력 활성화 여부 추가
    isCommentInput?: boolean 
): AnnotationResult | null => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === "") return null;

    const range = selection.getRangeAt(0);
    
    const selectedText = selection.toString();
    const annotationId = `${type[0]}-${generateUniqueId()}`; 

    const span = document.createElement("span");
    
    // ⭐ DOM 속성 부여
    span.classList.add("annotation", type); 
    span.dataset.id = annotationId; 
    span.dataset.type = type; 
    Object.assign(span.style, style);

    try {
        // 선택 영역을 <span>으로 감쌉니다.
        range.surroundContents(span);
        selection.removeAllRanges();
    } catch (e) {
        console.error("Failed to surround contents:", e);
        return null;
    }
    
    // ⭐ 코멘트 입력/마커 추가 로직 (span 바로 다음에 삽입)
    if (type === 'quote' && span.parentNode) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('comment-wrapper');
        wrapper.dataset.id = annotationId; // wrapper도 ID를 가집니다.

        if (isCommentInput) {
            // ⭐ 1. 코멘트 입력 활성화 시: <textarea>와 버튼 삽입
            const textarea = document.createElement('textarea');
            textarea.classList.add('comment-input');
            textarea.placeholder = "여기에 코멘트를 입력하세요...";
            
            const saveButton = document.createElement('button');
            saveButton.classList.add('comment-save-btn');
            saveButton.innerText = '저장';

            wrapper.appendChild(textarea);
            wrapper.appendChild(saveButton);
        } else if (content) {
            // 2. 저장된 코멘트가 있을 시: 코멘트 내용 표시 마커 (저장된 내용)
            const marker = document.createElement('span');
            marker.classList.add('comment-marker');
            marker.innerText = content; 
            wrapper.appendChild(marker);
        }
        
        // ⭐ 텍스트 노드(span) 바로 뒤에 wrapper를 삽입합니다.
        span.insertAdjacentElement('afterend', wrapper);
    }
    
    // ⭐ 반환 객체 생성
    return {
        id: annotationId,
        textSentence: selectedText,
        startOffset: range.startOffset, 
        endOffset: range.endOffset,    
        type: type,
        color: type === 'highlight' ? style.backgroundColor : undefined,
        content: content,
    };
};


/**
 * 특정 ID를 가진 주석을 DOM에서 제거하는 핵심 함수 (Annotation 삭제)
 */
export const removeAnnotation = (annotationId: string): void => {
    // 1. 주석 span 요소 찾기
    const selector = `span.annotation[data-id="${annotationId}"]`;
    const annotationElement = document.querySelector(selector) as HTMLElement | null;
    
    // ⭐ 2. 코멘트 UI/마커 요소 찾기 및 제거 (span 바로 다음에 있으므로 별도 제거 필요)
    const commentWrapperSelector = `div.comment-wrapper[data-id="${annotationId}"]`;
    const commentWrapper = document.querySelector(commentWrapperSelector);
    if (commentWrapper) {
        commentWrapper.remove();
    }

    if (!annotationElement) {
        console.warn(`Annotation element with ID ${annotationId} not found.`);
        return;
    }

    const parentNode = annotationElement.parentNode;
    if (!parentNode) return;

    // 3. 내용 복원 
    while (annotationElement.firstChild) {
        parentNode.insertBefore(annotationElement.firstChild, annotationElement);
    }

    // 4. <span> 요소 제거 및 DOM 정리
    parentNode.removeChild(annotationElement);
    parentNode.normalize();
};