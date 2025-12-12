// utils/comment.ts

import { surroundSelection, surroundElement } from "./annotation.core";
import type { AnnotationResult, ActiveAnnotation } from "./annotation.core";

const READING_CONTAINER_SELECTOR = ".reading-page-container";

let activeCommentInputId: string | null = null;






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
        // ⭐ 3. 타입 안정성을 위해 lastRect를 DOMRect로 단언합니다.
        const rect = lastRect as DOMRect; 
        const containerRect = containerEl.getBoundingClientRect();
        
        // 4. Container 기준 상대 좌표로 변환
        // top: 마지막 줄 bottom - 컨테이너 top + 컨테이너 스크롤 위치 + 여백(10px)
        const top = rect.bottom - containerRect.top + containerEl.scrollTop-2; 
        
        // left: 하이라이트 시작 위치 + 여백(16px) (가독성을 위해 약간 우측으로 이동)
        const left = rect.left - containerRect.left + 16;
        
        return { top, left };
    }

    return null;
};

/**
 * 코멘트/인용 주석을 적용하고 입력 요소를 표시합니다.
 * @param activeAnnotation - 현재 클릭된 주석 정보 (중첩 코멘트 생성 시 사용)
 */
export const applyComment = (
    activeAnnotation?: ActiveAnnotation | null
    ): AnnotationResult | null => {
    const selection = window.getSelection();

    const style: React.CSSProperties = {
        cursor: "pointer",
    };

    let result: AnnotationResult | null = null;
    let targetAnnotationId: string | null = null;

    // 1. quote span 생성
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

    // ✅ 기존 입력 UI 제거 (겹침 방지)
    if (activeCommentInputId) {
        document.querySelector(".comment-input-wrapper")?.remove();
    }
    activeCommentInputId = targetAnnotationId;

    // ✅ container 기준 overlay 생성
    const container = document.querySelector(
        READING_CONTAINER_SELECTOR
    ) as HTMLElement | null;
    if (!container) {
        console.error("독서 페이지 컨테이너 요소를 찾을 수 없습니다");
        return result;
    }

    const position = getLastLinePosition(targetAnnotationId);
    if (!position) return result;

    const wrapper = document.createElement("div");
    wrapper.className = "comment-input-wrapper";
    wrapper.style.position = "absolute";
    wrapper.style.top = `${position.top}px`;
    wrapper.style.left = `${position.left}px`;
    wrapper.style.width = "250px";
    wrapper.style.zIndex = "999";

    wrapper.innerHTML = `
        <textarea class="comment-input" placeholder="여기에 코멘트를 입력하세요"></textarea>
        <button class="comment-save-btn">저장</button>
    `;

    container.appendChild(wrapper);

    return result;
};


/**
 * 저장 후 코멘트 마커를 업데이트하고 입력 요소를 제거합니다.
 */
export const updateCommentMarker = (
    annotationId: string,
    content: string
    ) => {
    document.querySelector(".comment-input-wrapper")?.remove();
    activeCommentInputId = null;

    const span = document.querySelector(
        `.annotation[data-id="${annotationId}"]`
    ) as HTMLElement | null;
    if (!span) return;

    span.dataset.content = content;

  // TODO: marker UI (아이콘, underline 등)
};


/**
 * 코멘트 주석과 그와 관련된 모든 DOM 요소를 제거합니다.
 */
export const removeComment = (commentId: string): void => {
  // 1️⃣ comment 입력 UI 제거 (🔥 핵심)
  document.querySelector(".comment-input-wrapper")?.remove();
  activeCommentInputId = null;

  // 2️⃣ quote annotation 제거
  const el = document.querySelector(
    `.annotation.quote[data-id="${commentId}"]`
  ) as HTMLElement | null;

  if (!el) return;

  const parent = el.parentNode;
  if (!parent) return;

  // 텍스트만 남기고 annotation 제거
  const text = document.createTextNode(el.textContent || "");
  parent.insertBefore(text, el);
  el.remove();

  parent.normalize();
};

