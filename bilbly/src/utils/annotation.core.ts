// utils/annotation.core.ts (메모/코멘트 입력 UI 삽입 로직 통합 및 DOM 구조 개선)

// 고유 ID 생성을 위한 함수
const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

// 주석 타입 정의 (memo 포함)
export type AnnotationType = 'highlight' | 'quote' | 'memo';

// Active Annotation 인터페이스 정의
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
 * 범용 입력/마커 DOM 요소를 생성하는 내부 유틸리티 (Container에 Absolute 배치)
 */
const createInputWrapper = (
    annotationId: string, 
    type: 'quote' | 'memo',
    content?: string, 
    isInputMode?: boolean
): HTMLDivElement => {
    
    const isMemo = type === 'memo';
    const wrapper = document.createElement('div');
    
    // ⭐ 메모/코멘트 wrapper 클래스 및 toolbar-container 클래스 추가 (바깥 클릭 제외용)
    wrapper.classList.add(isMemo ? 'memo-wrapper' : 'comment-wrapper', 'toolbar-container'); 
    wrapper.dataset.id = annotationId;
    wrapper.dataset.type = type;
    
    // Absolute 위치 지정을 위해 스타일 설정
    wrapper.style.position = 'absolute';
    wrapper.style.zIndex = '1000';
    wrapper.style.display = 'none'; 

    if (isInputMode) {
        // 1. 입력 활성화 시: <textarea> 삽입
        const textarea = document.createElement('textarea');
        textarea.classList.add(isMemo ? 'memo-input' : 'comment-input');
        textarea.placeholder = isMemo ? "메모를 입력하세요 (최대 250자)..." : "코멘트를 입력하세요...";
        
        wrapper.appendChild(textarea);
    } 
    // 저장된 마커 표시는 utility 파일에서 처리합니다.

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
    
    span.classList.add("annotation", type); 
    span.dataset.id = annotationId; 
    span.dataset.type = type; 
    
    Object.assign(span.style, style); 

    try {
        range.surroundContents(span);
        selection.removeAllRanges();
    } catch (e) {
        console.error("Failed to surround contents:", e);
        return null;
    }
    
    // ⭐ 코멘트/메모 입력 Wrapper를 Text Container에 삽입합니다.
    if ((type === 'quote' || type === 'memo') && isCommentInput) {
        const wrapper = createInputWrapper(annotationId, type, content, true);
        const container = document.querySelector('#reading-page-container'); 
        if (container) {
             container.appendChild(wrapper);
             wrapper.style.display = 'block'; // 입력 활성화 시 보이도록 설정
        }
    }
    
    // 반환 객체 생성
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

// surroundElement 및 removeAnnotation 함수는 이전 답변의 최종 코드를 그대로 유지합니다.
// ... (surroundElement 함수 생략)
// ... (removeAnnotation 함수 생략)

/**
 * 특정 ID를 가진 주석을 DOM에서 제거하는 핵심 함수 (Annotation 삭제)
 */
export const removeAnnotation = (annotationId: string): void => {
    // 1. 주석 span 요소 찾기
    const selector = `span.annotation[data-id="${annotationId}"]`;
    const annotationElement = document.querySelector(selector) as HTMLElement | null;
    
    // ⭐ 2. 코멘트/메모 입력 Wrapper 제거 (전역 컨테이너에서 찾습니다)
    const commentWrapper = document.querySelector(`div.comment-wrapper[data-id="${annotationId}"]`);
    const memoWrapper = document.querySelector(`div.memo-wrapper[data-id="${annotationId}"]`);
    
    commentWrapper?.remove();
    memoWrapper?.remove();

    if (!annotationElement) {
        console.warn(`Annotation element with ID ${annotationId} not found.`);
        return;
    }

    const parentNode = annotationElement.parentNode;
    if (!parentNode) return;

    // 3. 내용 복원 (중첩된 주석을 보존하는 로직)
    while (annotationElement.firstChild) {
        parentNode.insertBefore(annotationElement.firstChild, annotationElement);
    }

    // 4. <span> 요소 제거 및 DOM 정리
    parentNode.removeChild(annotationElement);
    parentNode.normalize();
};