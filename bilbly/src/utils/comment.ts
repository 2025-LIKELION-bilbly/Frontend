// utils/comment.ts

import { surroundSelection, removeAnnotation } from "./annotation.core";
import type { AnnotationResult, ActiveAnnotation } from "./annotation.core";

// ⭐ 글자 수 제한 상수 정의
const MAX_COMMENT_LENGTH = 25;

// ⭐ 1. 컨테이너 셀렉터 정의 (ReadingBookPage.tsx의 ContainerRef가 가리키는 요소의 ID나 클래스를 사용해야 합니다)
const READING_CONTAINER_SELECTOR = '#reading-page-container'; 

/**
 * 주어진 ID를 가진 하이라이트 그룹 중 가장 마지막 줄의 컨테이너 상대 좌표를 계산합니다.
 */
const getLastLinePosition = (annotationId: string) => {
    // ReadingBookPage의 Container Ref와 동일한 요소를 문서에서 찾습니다.
    const containerEl = document.querySelector(READING_CONTAINER_SELECTOR) as HTMLElement;
    if (!containerEl) {
        console.error("독서 페이지 컨테이너 요소를 찾을 수 없습니다:", READING_CONTAINER_SELECTOR);
        return null;
    }

    // 1. 해당 ID를 가진 모든 주석 span을 찾습니다.
    const allSpans = document.querySelectorAll(`.annotation[data-id="${annotationId}"]`);
    if (allSpans.length === 0) return null;
    
    let lastRect: DOMRect | null = null;
    let maxBottom = -1;

    // 2. 모든 span을 순회하며 뷰포트 기준 bottom 값이 가장 큰 rect를 찾습니다.
    allSpans.forEach(span => {
        const rects = span.getClientRects();
        for (let i = 0; i < rects.length; i++) {
            const rect = rects[i];
            // 뷰포트 하단 경계가 가장 아래 있는 rect를 찾습니다.
            if (rect.bottom > maxBottom) {
                maxBottom = rect.bottom;
                lastRect = rect;
            }
        }
    });

    if (lastRect) {
        const rect = lastRect as DOMRect; 
        const containerRect = containerEl.getBoundingClientRect();
        
        // 4. Container 기준 상대 좌표로 변환
        // top: 마지막 줄 bottom - 컨테이너 top + 컨테이너 스크롤 위치 + 여백(10px)
        const top = rect.bottom - containerRect.top + containerEl.scrollTop + 10; 
        
        // left: 하이라이트 시작 위치 + 여백(16px) (가독성을 위해 약간 우측으로 이동)
        const left = rect.left - containerRect.left + 16;
        
        return { top, left };
    }

    return null;
};

/**
 * 코멘트/인용 주석을 적용하고 입력 요소를 표시합니다.
 * (이 함수는 입력창의 위치와 글자 수 제한을 담당하며, 마커의 인라인 배치는 updateCommentMarker에서 처리합니다.)
 */
export const applyComment = (activeAnnotation?: ActiveAnnotation | null): AnnotationResult | null => {
    const selection = window.getSelection();
    
    const style: React.CSSProperties = {
        cursor: 'pointer',
    };
    
    let result: AnnotationResult | null = null;
    let targetAnnotationId: string | null = null;

    // 1. 선택 영역이 있는 경우 (새로운 드래그)
    if (selection && selection.toString().trim()) {
        result = surroundSelection('quote', style, undefined, true); 
        if (result) {
            targetAnnotationId = result.id;
        }
    } 
    
    // 2. Active Annotation이 존재하는 경우 (하이라이트 클릭 후 코멘트 버튼 클릭)
    else if (activeAnnotation) {
        const targetElement = document.querySelector(`.annotation[data-id="${activeAnnotation.id}"]`);
        
        if (targetElement) {
            console.log(`[INFO] 중첩 코멘트 생성 시도: Target ID ${activeAnnotation.id}`);
            
            result = surroundElement(targetElement as HTMLElement, 'quote', style, undefined, true); 
            if (result) {
                targetAnnotationId = result.id;
            }
        }
    }

    // ⭐ 3. 코멘트 입력창 위치 및 글자 수 제한 적용 (공통 로직)
    if (targetAnnotationId) {
        const commentWrapper = document.querySelector(`div.comment-wrapper[data-id="${targetAnnotationId}"]`) as HTMLElement;

        if (commentWrapper) {
            const position = getLastLinePosition(targetAnnotationId);

            // A. 위치 조정
            if (position) {
                commentWrapper.style.position = 'absolute';
                commentWrapper.style.top = `${position.top}px`;
                commentWrapper.style.left = `${position.left}px`;
                commentWrapper.style.width = '250px'; 
            }
            
            // B. 글자 수 제한 및 카운터 표시 로직
            const textarea = commentWrapper.querySelector('.comment-input') as HTMLTextAreaElement;
            const counter = document.createElement('div');
            counter.classList.add('comment-char-counter');
            
            counter.style.fontSize = '10px';
            counter.style.textAlign = 'right';
            counter.style.marginTop = '4px';
            counter.style.color = '#777'; 

            if (textarea) {
                textarea.maxLength = MAX_COMMENT_LENGTH; 

                const updateCounter = () => {
                    const currentLength = textarea.value.length;
                    counter.textContent = `${currentLength}/${MAX_COMMENT_LENGTH}자`;
                    
                    if (currentLength > MAX_COMMENT_LENGTH) {
                        counter.style.color = 'red';
                    } else {
                        counter.style.color = '#777';
                    }
                };

                textarea.addEventListener('input', updateCounter);
                commentWrapper.appendChild(counter);
                updateCounter();
            }
        }
    }
    
    return result; 
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

    // 3. 새로운 마커를 담을 comment-wrapper 생성 및 위치 조정
    const newWrapper = document.createElement('div');
    newWrapper.classList.add('comment-wrapper');
    newWrapper.dataset.id = annotationId;
    
    // ⭐ ⭐ ⭐ 수정 부분: 가로로 나열되도록 스타일 추가 ⭐ ⭐ ⭐
    newWrapper.style.display = 'inline-block';
    newWrapper.style.marginRight = '8px'; // 마커 간 간격
    newWrapper.style.padding = '2px 6px';
    newWrapper.style.backgroundColor = '#e0f7fa'; // 예시 색상 (코멘트임을 시각적으로 보여줌)
    newWrapper.style.borderRadius = '4px';
    newWrapper.style.fontSize = '12px';
    newWrapper.style.color = '#006064';
    // ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ 
    
    // 4. 새로운 마커(content) 요소 생성
    const newMarker = document.createElement('span');
    newMarker.innerText = content;
    
    newWrapper.appendChild(newMarker);

    // 5. 텍스트 노드(span) 바로 뒤에 새로운 wrapper를 삽입
    // 이 위치는 텍스트 바로 다음입니다.
    span.insertAdjacentElement('afterend', newWrapper);
    
    // ⭐ 6. 최종 마커 위치 재설정 
    // 마커가 텍스트 흐름을 따르도록 (span 옆에 붙도록) 하기 위해
    // 기존의 absolute 포지셔닝을 제거하고 텍스트의 인라인 흐름을 따르게 합니다.
    
    // ⚠️ 인라인 요소로 만들었으므로, absolute 포지셔닝은 제거합니다.
    // 만약 여전히 코멘트가 한 줄씩 쌓인다면,
    // span의 부모 요소 또는 .comment-wrapper를 감싸는 상위 요소에
    // display: flex; flex-wrap: wrap; 와 같은 속성이 필요할 수 있습니다.
    
    // 절대 위치 지정 스타일은 제거하거나 인라인 흐름에 맞게 조정해야 합니다.
    // 여기서는 absolute 스타일을 적용하지 않음으로써 인라인 플로우를 따르게 합니다.
    
    // TODO: 백엔드에 업데이트된 내용(content) 저장 API 호출
};

/**
 * 코멘트 주석과 그와 관련된 모든 DOM 요소를 제거합니다.
 */
export const removeComment = (commentId: string): void => {
    removeAnnotation(commentId);
};