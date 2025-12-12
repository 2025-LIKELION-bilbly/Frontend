// utils/annotation.core.ts

// 고유 ID 생성을 위한 함수
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

// 주석 타입 정의 (memo 포함)
export type AnnotationType = 'highlight' | 'quote' | 'memo';

// ⭐ Active Annotation 인터페이스 정의 추가
export interface ActiveAnnotation {
    id: string;
    type: AnnotationType;
}

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
 * 코멘트 입력/마커 DOM 요소를 생성하는 내부 유틸리티
 */
const createCommentWrapper = (
    annotationId: string, 
    type: AnnotationType,
    content?: string, 
    isCommentInput?: boolean
): HTMLSpanElement => { 
    
    const wrapper = document.createElement('span'); 
    wrapper.classList.add('comment-wrapper');
    wrapper.dataset.id = annotationId;
    
    if (isCommentInput) {
        // 1. 코멘트 입력 활성화 시: <textarea>와 버튼 삽입
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

    return wrapper;
};


/**
 * 선택 영역을 <span>으로 감싸는 핵심 함수 (Annotation 생성)
 */
export const surroundSelection = (
    type: AnnotationType, 
    style: React.CSSProperties, 
    content?: string,
    isCommentInput?: boolean 
): AnnotationResult | null => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim() === "") return null;

    const range = selection.getRangeAt(0);
    
    const selectedText = selection.toString();
    const annotationId = `${type[0]}-${generateUniqueId()}`; 

    const span = document.createElement("span");
    
    // ⭐ DOM 속성 부여 및 Position: relative 추가 (Absolute 배치를 위함)
    span.classList.add("annotation", type); 
    span.dataset.id = annotationId; 
    span.dataset.type = type; 
    
    // ⭐ 수정 1: style 객체에 position: relative 추가
    Object.assign(span.style, style, { position: 'relative' }); 

    try {
        range.surroundContents(span);
        selection.removeAllRanges();
    } catch (e) {
        console.error("Failed to surround contents:", e);
        return null;
    }
    
    // ⭐ 코멘트 입력/마커 추가 로직 (span의 자식으로 삽입)
    if (type === 'quote' && span.parentNode) {
        const wrapper = createCommentWrapper(annotationId, type, content, isCommentInput);
        
        // ⭐ 수정 2: span 바로 뒤가 아닌, span의 자식으로 삽입 (Absolute 기준점 사용)
        span.appendChild(wrapper); 
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
 * ⭐ 특정 DOM 요소를 새로운 주석 타입으로 감싸는 함수 (Active Annotation 중첩 생성에 사용)
 */
export const surroundElement = (
    targetElement: HTMLElement, 
    type: AnnotationType, 
    style: React.CSSProperties, 
    content?: string,
    isCommentInput?: boolean
): AnnotationResult | null => {
    
    const parentNode = targetElement.parentNode;
    if (!parentNode) return null;
    
    const annotationId = `${type[0]}-${generateUniqueId()}`; 
    const selectedText = targetElement.innerText; // 감싸는 요소의 텍스트를 가져옵니다.

    const newSpan = document.createElement("span");
    
    // DOM 속성 부여
    newSpan.classList.add("annotation", type); 
    newSpan.dataset.id = annotationId; 
    newSpan.dataset.type = type; 
    
    // ⭐ 수정 3: style 객체에 position: relative 추가
    Object.assign(newSpan.style, style, { position: 'relative' });
    
    // 1. 기존 요소(targetElement, 예: 하이라이트 span) 바로 앞에 새 <span>을 삽입합니다.
    parentNode.insertBefore(newSpan, targetElement);
    
    // 2. 기존 요소를 새 <span>의 자식으로 만듭니다. (중첩)
    newSpan.appendChild(targetElement);
    
    // 3. 코멘트 입력/마커 추가 로직 (newSpan의 자식으로 삽입)
    if (type === 'quote' && newSpan.parentNode) {
        const wrapper = createCommentWrapper(annotationId, type, content, isCommentInput);
        
        // ⭐ 수정 4: newSpan 바로 뒤가 아닌, newSpan의 자식으로 삽입 (Absolute 기준점 사용)
        newSpan.appendChild(wrapper); 
    }

    // ⭐ 반환 객체 생성
    return {
        id: annotationId,
        textSentence: selectedText,
        startOffset: 0, 
        endOffset: selectedText.length,    
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
    
    // ⭐ 코멘트 UI/마커 요소 찾기 및 제거 (span.comment-wrapper로 셀렉터 유지)
    const commentWrapperSelector = `span.comment-wrapper[data-id="${annotationId}"]`;
    // ⭐ 수정 5: commentWrapper를 annotationElement의 자식으로 찾도록 합니다.
    const commentWrapper = annotationElement?.querySelector(commentWrapperSelector);
    
    if (commentWrapper) {
        commentWrapper.remove();
    }

    if (!annotationElement) {
        console.warn(`Annotation element with ID ${annotationId} not found.`);
        return;
    }

    const parentNode = annotationElement.parentNode;
    if (!parentNode) return;

    // ⭐ 3. 내용 복원 (중첩된 주석을 보존하는 로직)
    while (annotationElement.firstChild) {
        // 코멘트 Wrapper는 이미 위에서 제거했으므로, 텍스트 노드나 다른 span만 남습니다.
        parentNode.insertBefore(annotationElement.firstChild, annotationElement);
    }

    // 4. <span> 요소 제거 및 DOM 정리
    parentNode.removeChild(annotationElement);
    parentNode.normalize();
};