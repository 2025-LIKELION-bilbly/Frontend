// utils/memo.ts (요청 사항 반영)

import { surroundSelection, removeAnnotation } from "./annotation.core";
import type { AnnotationResult } from "./annotation.core";

const READING_CONTAINER_SELECTOR = '#reading-page-container'; 
const MAX_MEMO_LENGTH = 250; 

/**
 * 하이라이트/주석 영역의 마지막 줄 위치를 기준으로 입력창의 절대 위치를 계산합니다.
 */
const getLastLinePosition = (annotationId: string): { top: number, left: number } | null => {
    const containerEl = document.querySelector(READING_CONTAINER_SELECTOR) as HTMLElement;
    if (!containerEl) {
        console.error("독서 페이지 컨테이너 요소를 찾을 수 없습니다:", READING_CONTAINER_SELECTOR);
        return null;
    }

    const allSpans = document.querySelectorAll(`.annotation[data-id="${annotationId}"]`);
    if (allSpans.length === 0) return null;
    
    let lastRect: DOMRect | null = null;
    let maxBottom = -1;

    allSpans.forEach(span => {
        const rects = span.getClientRects();
        for (let i = 0; i < rects.length; i++) {
            const rect = rects[i];
            if (rect.bottom > maxBottom) {
                maxBottom = rect.bottom;
                lastRect = rect;
            }
        }
    });

    if (lastRect) {
        const rect = lastRect as DOMRect;
        const containerRect = containerEl.getBoundingClientRect();
        
        // 메모 입력창은 하이라이트 영역 위에 표시 (입력창 높이 150px 고려하여 위로 띄움)
        const top = rect.top - containerRect.top + containerEl.scrollTop - 160; 
        const left = rect.left - containerRect.left + 16;
        
        return { top: Math.max(0, top), left }; 
    }
    return null;
};

/**
 * ⭐ 메모 입력 UI를 적용하고 표시합니다. (정사각형, 250자 카운터 적용)
 */
export const applyMemo = (color: string): AnnotationResult | null => {
    const selection = window.getSelection();
    
    if (!selection || selection.toString().trim() === "") return null;
    
    const result = surroundSelection('memo', { cursor: 'pointer' }, undefined, true); 

    if (result) {
        const annotationId = result.id;
        // ⭐ utils/annotation.core.ts에서 생성한 wrapper를 찾습니다.
        const memoWrapper = document.querySelector(`div.memo-wrapper[data-id="${annotationId}"]`) as HTMLElement;

        if (memoWrapper) {
            const position = getLastLinePosition(annotationId);

            if (position) {
                // 위치 설정
                memoWrapper.style.top = `${position.top}px`;
                memoWrapper.style.left = `${position.left}px`;
                
                // ⭐ 요청 반영: 정사각형 모양
                memoWrapper.style.width = '200px'; 
                memoWrapper.style.height = '150px'; 
                
                // ⭐ 요청 반영: 선택된 색상으로 테두리/배경색 설정
                memoWrapper.style.border = `1px solid ${color}`;
                memoWrapper.style.backgroundColor = 'white'; // 배경은 흰색으로 깔끔하게
                memoWrapper.style.boxShadow = '2px 2px 5px rgba(0,0,0,0.2)';
                memoWrapper.style.padding = '5px';
            }
            
            const textarea = memoWrapper.querySelector('.memo-input') as HTMLTextAreaElement;
            const counter = document.createElement('div');
            counter.classList.add('memo-char-counter');
            
            // 카운터 스타일 설정 (밑부분에 표시)
            counter.style.fontSize = '10px';
            counter.style.textAlign = 'right';
            counter.style.position = 'absolute';
            counter.style.bottom = '5px'; 
            counter.style.right = '10px';
            counter.style.color = '#777'; 
            counter.style.zIndex = '10';

            if (textarea) {
                textarea.maxLength = MAX_MEMO_LENGTH; 
                textarea.style.height = 'calc(100% - 10px)'; // 카운터 공간 확보를 위한 조정
                textarea.style.width = '100%';
                textarea.style.boxSizing = 'border-box';
                textarea.style.padding = '0';
                textarea.style.border = 'none'; 
                textarea.style.resize = 'none';
                textarea.style.backgroundColor = 'transparent';

                const updateCounter = () => {
                    const currentLength = textarea.value.length;
                    // ⭐ 요청 반영: 현재 글자 수/최대 글자 수 표시
                    counter.textContent = `${currentLength}/${MAX_MEMO_LENGTH}자`;
                    counter.style.color = currentLength > MAX_MEMO_LENGTH ? 'red' : '#555';
                };

                textarea.addEventListener('input', updateCounter);
                memoWrapper.appendChild(counter); // 입력창 하단에 카운터 삽입
                updateCounter();
            }
            memoWrapper.style.display = 'block'; // UI 표시
        }
    }
    
    return result;
};

// updateMemoMarker 및 removeMemo 함수는 이전 답변의 최종 코드를 그대로 유지합니다.

/**
 * 저장 후 메모 밑줄 마커를 업데이트하고 입력 요소를 제거합니다.
 */
export const updateMemoMarker = (annotationId: string, content: string, color: string): void => {
    // 1. 입력 요소 wrapper 제거
    document.querySelector(`div.memo-wrapper[data-id="${annotationId}"]`)?.remove();
    
    // 2. 기존 주석 span 요소 찾기
    const allSpans = document.querySelectorAll(`.annotation[data-id="${annotationId}"]`);
    if (allSpans.length === 0) return;

    // 3. 각 span에 밑줄 마커 스타일 적용
    allSpans.forEach(span => {
        const spanEl = span as HTMLElement;
        
        // ⭐ 요청 반영: 메모 밑줄 표현 (두꺼운 실선)
        spanEl.style.textDecoration = `underline`;
        spanEl.style.textDecorationColor = color;
        spanEl.style.textDecorationStyle = 'solid';
        spanEl.style.textDecorationThickness = '2px'; 
        
        spanEl.style.backgroundColor = 'transparent'; 
        spanEl.setAttribute('data-has-memo', 'true');
    });
    
    console.log(`[UPDATE] 메모 마커 ID ${annotationId}에 밑줄 적용됨. 내용: ${content}`);
};

/**
 * 메모 주석과 그와 관련된 모든 DOM 요소를 제거합니다.
 */
export const removeMemo = (memoId: string): void => {
    const allSpans = document.querySelectorAll(`.annotation[data-id="${memoId}"]`);
    allSpans.forEach(span => {
        const spanEl = span as HTMLElement;
        spanEl.style.textDecoration = 'none';
        spanEl.removeAttribute('data-has-memo');
    });

    removeAnnotation(memoId);
    console.log(`[DELETE] 메모 ID ${memoId} 삭제 완료.`);
};