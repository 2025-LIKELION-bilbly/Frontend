// utils/comment.ts

import { surroundSelection, removeAnnotation } from "./annotation.core";
import type { AnnotationResult } from "./annotation.core";

/**
 * 코멘트/인용 주석을 적용하고 입력 요소를 표시합니다.
 */
export const applyComment = (): AnnotationResult | null => {
    const style: React.CSSProperties = {
        backgroundColor: 'rgba(255, 107, 107, 0.3)', 
        borderBottom: '2px solid #ff6b6b',
        cursor: 'pointer',
    };
    // surroundSelection에 isCommentInput: true를 전달하여 입력 요소 활성화
    // content는 저장되지 않은 상태이므로 undefined를 전달
    return surroundSelection('quote', style, undefined, true); 
};

/**
 * 저장 후 코멘트 마커를 업데이트하고 입력 요소를 제거합니다.
 */
export const updateCommentMarker = (annotationId: string, content: string): void => {
    // 1. 입력 요소가 포함된 기존 wrapper 제거
    const oldWrapper = document.querySelector(`div.comment-wrapper[data-id="${annotationId}"]`);
    if (oldWrapper) oldWrapper.remove();
    
    // 2. 주석 span 요소 찾기
    const span = document.querySelector(`span.annotation[data-id="${annotationId}"]`);
    if (!span || !span.parentNode) return;

    // ⭐ 3. 새로운 마커를 담을 comment-wrapper 생성 (일관성 유지)
    const newWrapper = document.createElement('div');
    newWrapper.classList.add('comment-wrapper');
    newWrapper.dataset.id = annotationId;
    
    // 4. 새로운 마커(content) 요소 생성
    const newMarker = document.createElement('span');
    newMarker.classList.add('comment-marker');
    newMarker.innerText = content;
    
    newWrapper.appendChild(newMarker);

    // 5. 텍스트 노드(span) 바로 뒤에 새로운 wrapper를 삽입
    span.insertAdjacentElement('afterend', newWrapper);
    
    // TODO: 백엔드에 업데이트된 내용(content) 저장 API 호출
};

/**
 * 코멘트 주석과 그와 관련된 모든 DOM 요소를 제거합니다.
 */
export const removeComment = (commentId: string): void => {
    // annotation.core.ts의 removeAnnotation 함수가
    // 주석 span과 함께 comment-wrapper도 제거하도록 수정되었으므로,
    // 여기서 추가적인 DOM 제거 로직(wrapper.remove())은 필요 없습니다.
    
    removeAnnotation(commentId);
};