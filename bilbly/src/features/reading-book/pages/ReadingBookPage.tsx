// ReadingBookPage.tsx (최종 수정: 메모 위치 로직 개선 및 불필요한 코드 제거)

import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom"; 
import * as S from "./ReadingBookPage.styles";
import ReadingHeader from "../components/ReadingHeader";
import WarningModal from "../components/WarningModel";
import ModeToggle from "../components/ModeToggle";
import ProgressBar from "../components/ProgressBar";
import ToolBar from "../components/ToolBar";
import DeleteHighlightModal from "../components/DeleteHighlightModal"; 
import DeleteAlertModal from "../components/DeleteAlterModal";


import { showMemoPopup } from "../../../utils/memoPopup";
// 코멘트 유틸리티 (applyComment는 이제 1개의 인수만 받도록 처리)
import { applyComment, removeComment, updateCommentMarker } from "../../../utils/comment"; 

// 하이라이트 유틸리티
import { applyHighlight, removeHighlight } from "../../../utils/highlight"; 
// ⭐ removeMemo import 포함 확인
import { applyMemo, removeMemo } from "../../../utils/memo";
// 통합된 주석 상태 타입 import
import type { AnnotationType } from "../../../utils/annotation.core";


import { getBgColor, toBackendColor } from "../../../styles/ColorUtils";

import { createGlobalStyle } from "styled-components";




export const AnnotationStyle = createGlobalStyle`
    .annotation.memo {
        position: relative;
        border-bottom: 1px solid #c93b4d;
        padding-bottom: 2px;
        top: 100%;
    }

    .annotation.memo .memo-line {
    position: absolute;
    left: 0;
    right: 14px;
    bottom: -6px;    
    height: 2px;
    background: #c93b4d;
    }

    .annotation.memo .memo-icon {
        position: absolute;
        bottom: -2px;  
        width: 12px;
        height: 12px;
        cursor: pointer;
}

`;

type Mode = "focus" | "together";

const MAX_HEIGHT = 599;

/**
 * 긴 텍스트를 페이지 영역에 맞게 분할하는 함수
 */
const paginateText = (
    fullText: string,
    measureRef: React.RefObject<HTMLDivElement | null>
) => {
    if (!measureRef.current) return [];
    const words = fullText.split(" ");
    const pages: string[] = [];
    let currentText = "";

    for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? "" : " ") + words[i];
        measureRef.current.innerText = currentText;

        // MAX_HEIGHT 사용
        if (measureRef.current.scrollHeight > MAX_HEIGHT) { 
            pages.push(currentText.slice(0, currentText.lastIndexOf(" ")));
            currentText = words[i];
            measureRef.current.innerText = currentText;
        }
    }

    if (currentText.trim()) pages.push(currentText);
    return pages;
};


// 통합된 주석 상태 타입 정의
interface ActiveAnnotation {
    id: string;
    type: AnnotationType;
}

const ReadingBookPage = () => {
    const { bookId } = useParams<{ bookId: string }>();

    const [deleteBlockedType, setDeleteBlockedType] =
    useState<AnnotationType | null>(null);

    // 🔥 임시 로그인 유저 (나중에 auth에서 교체)
    const MY_OWNER_ID = "me";

    /**
     * 다른 사람(ownerId !== me)이 단 코멘트가 연결돼 있는지 검사
     */
    const hasLinkedCommentFromOthers = (groupId: string) => {
        const annotations = document.querySelectorAll(
            `.annotation[data-group-id="${groupId}"]`
        );

        return Array.from(annotations).some(annotation => {
            const comments = annotation.querySelectorAll(".comment-wrapper");

            return Array.from(comments).some(comment =>
            (comment as HTMLElement).dataset.ownerId !== MY_OWNER_ID
            );
        });
    };



    const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);

    const [mode, setMode] = useState<Mode>("focus");
    const [showWarning, setShowWarning] = useState(
        () => localStorage.getItem("hideReadingWarning") !== "true"
    );

    // 통합된 삭제 모달 상태
    const [showDeleteModal, setShowDeleteModal] = useState(false);




    const [pages, setPages] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [showUI, setShowUI] = useState(false);

    
    
    // 통합된 activeAnnotation 상태 (클릭된 하이라이트/코멘트 관리)
    const [activeAnnotation, setActiveAnnotation] = useState<ActiveAnnotation | null>(null); 
    
    // 새로 추가된 상태: 삭제 UI 표시 여부 (재클릭 시 true)
    const [isDeleteUiActive, setIsDeleteUiActive] = useState(false); 

    // Container DOM 요소에 대한 Ref 추가
    const containerRef = useRef<HTMLDivElement>(null); 
    const measureRef = useRef<HTMLDivElement>(null);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const selectedBgKey = "userMint";
    const cssColor = getBgColor(selectedBgKey);
    const backendColor = toBackendColor(selectedBgKey); 

    // 드래그 시점의 selection range 저장
    const lastSelectionRangeRef = useRef<Range | null>(null);


    // 새로 추가된 상태: 메모 입력 박스 상태
    const [memoInputState, setMemoInputState] = useState<{ 
        id: string; 
        position: { top: number; left: number }; 
        content?: string; 
    } | null>(null);

    const fullText = useMemo( 
        () =>
            `
        책 내용이 들어가는 자리 ...
        책 내용이 들어가는 자리 ...
    `.repeat(100),
        []
    ); 

    // 페이지 자동 분리
    useEffect(() => {
        if (!measureRef.current) return;
        const generated = paginateText(fullText, measureRef); 
        setPages(generated);
    }, [fullText]);
    
    // 코멘트 저장 이벤트 리스너 등록 
    useEffect(() => {
        const setupCommentListener = () => {
            const handleSaveClick = (e: Event) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains('comment-save-btn')) {
                    const wrapper = target.closest('.comment-wrapper') as HTMLElement;
                    const textarea = wrapper?.querySelector('.comment-input') as HTMLTextAreaElement;
                    
                    if (wrapper && textarea && textarea.value.trim()) {
                        const annotationId = wrapper.dataset.id;
                        const content = textarea.value.trim();
                        
                        if (annotationId) {
                            updateCommentMarker(annotationId, content);
                            console.log(`[POST] 코멘트 저장: ID ${annotationId}, 내용: ${content}`);
                        }
                    }
                }
            };

            document.addEventListener('click', handleSaveClick);
            return () => document.removeEventListener('click', handleSaveClick);
        };

        setupCommentListener();
    }, []);
    

    const percent = useMemo(() => {
        if (pages.length <= 1) return 100;
        return Math.round((page / (pages.length - 1)) * 100);
    }, [page, pages.length]);

    // 상호작용 상태 초기화 함수 (기능 동시에 적용 가능하도록)
    const resetInteractionState = () => {
        setMemoInputState(null);
        setIsDeleteUiActive(false);
        setToolbarPos(null);
    };


    // 스와이프
    const handleTouchStart = (e: React.TouchEvent) => { 
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => { 
        touchEndX.current = e.changedTouches[0].clientX;
        const diff = touchEndX.current - touchStartX.current;

        if (Math.abs(diff) < 50) return;

        if (diff > 0) setPage(prev => Math.max(prev - 1, 0));
        else setPage(prev => Math.min(prev + 1, pages.length - 1));
    };

    /**
     * 툴바 위치를 Container 기준으로 계산하는 함수
     * @param rect - 주석 요소 또는 선택 영역의 getBoundingClientRect() 값
     * @returns Container 내부의 { top, left } 좌표
     */
    const calculateToolbarPosition = (rect: DOMRect) => {
        if (!containerRef.current) {
            // Container Ref가 없을 경우 기존 window.scrollY 기반 위치 반환 (Fallback)
            return {
                top: rect.top + window.scrollY - 8,
                left: rect.left + rect.width / 2,
            };
        }

        const containerRect = containerRef.current.getBoundingClientRect();

        // 툴바 위치 계산 로직 수정 (Container 기준 상대 좌표)
        // -8은 툴바가 선택 영역 위에 오도록 하는 오프셋입니다.
        const top = rect.top - containerRect.top + containerRef.current.scrollTop - 8;
        const left = rect.left - containerRect.left + rect.width / 2;
        
        return { top, left };
    };


    // 드래그 후 텍스트 선택 시 툴바 표시
    const handleMouseUp = () => {
        const selection = window.getSelection();

        if (!selection || selection.toString().trim() === "") {
            return;
        }

        lastSelectionRangeRef.current = selection.getRangeAt(0).cloneRange();

        setActiveAnnotation(null); 
        // 삭제 모드 초기화
        setIsDeleteUiActive(false); 
        
        // ⭐ 수정: 선택 영역의 모든 줄 경계(rects)를 가져와 마지막 줄을 사용합니다.
        const range = selection.getRangeAt(0);
        const clientRects = range.getClientRects();
        
        if (clientRects.length === 0) return;
        
        // 핵심: clientRects에서 가장 마지막 라인 (마지막 요소)의 경계를 사용합니다.
        const lastRect = clientRects[clientRects.length - 1];

        // 툴바 위치 계산 함수를 마지막 라인의 경계(DOMRect)로 호출합니다.
        setToolbarPos(calculateToolbarPosition(lastRect as DOMRect));
    };


    // 통합된 주석 클릭 시 toolbar 표시 및 ID 저장
    const handleAnnotationClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;

        const annotationEl = (target as Element).closest(".annotation[data-id]") as HTMLElement | null;
        
        
        if (annotationEl) {
            const annotationId = annotationEl.dataset.id;
            const annotationType = annotationEl.dataset.type as AnnotationType;
            
            if (!annotationId || !annotationType) return false;

            const rect = annotationEl.getBoundingClientRect();
            
            // 툴바 위치 계산 함수 사용
            setToolbarPos(calculateToolbarPosition(rect));

            // 1차 클릭: activeAnnotation 설정, 삭제 UI 비활성화
            setActiveAnnotation({ id: annotationId, type: annotationType });
            setIsDeleteUiActive(false);

            console.log(`클릭한 ${annotationType} ID:`, annotationId);
            return true;
        }

        return false;
    };


    // 페이지 클릭 UI 처리
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
          // 🔥 코멘트 입력 중이면 → 저장하고 끝
        // if (saveCommentInline()) {
        //     return;
        // }
        


        const inputWrapper = document.querySelector(".comment-input-wrapper");
            if (inputWrapper) {
                const textarea = inputWrapper.querySelector(
                ".comment-input"
                ) as HTMLTextAreaElement | null;

                const id = inputWrapper.getAttribute("data-id");

                if (textarea && id && textarea.value.trim()) {
                updateCommentMarker(id, textarea.value.trim());
                }
            }

        // ✅ comment 입력 UI가 열려 있으면 "글 영역 클릭" 시 자동 저장
        const wrapper = document.querySelector(
            ".comment-input-wrapper"
        ) as HTMLElement | null;

        if (wrapper) {
            const textarea = wrapper.querySelector(
                ".comment-input"
            ) as HTMLTextAreaElement | null;

            const annotationId = wrapper.dataset.id; // ✅ comment.ts에서 dataset.id 넣어준 값

            if (textarea && textarea.value.trim() && annotationId) {
                updateCommentMarker(annotationId, textarea.value.trim());
                console.log("[AUTO SAVE] comment:", annotationId, textarea.value.trim());
            }

        }

        // ⬇️⬇️⬇️ 아래는 네 기존 코드 그대로 유지 ⬇️⬇️⬇️
        if (memoInputState) return;

        if (handleAnnotationClick(e)) return;

        const selection = window.getSelection();
        if (selection && selection.toString().trim() !== "") return;

        setToolbarPos(null);
        setActiveAnnotation(null);
        setIsDeleteUiActive(false);

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = x / rect.width;

        if (ratio < 0.25) setPage(p => Math.max(p - 1, 0));
        else if (ratio > 0.75) setPage(p => Math.min(p + 1, pages.length - 1));
        else setShowUI(prev => !prev);
    };



    // 새로 추가: 툴바 아이콘 재클릭 시 삭제 모드로 전환하는 로직
    const handleToolbarIconClick = (type: AnnotationType): boolean => {
        if (activeAnnotation && activeAnnotation.type === type) {

            setIsDeleteUiActive(true);
            return true; // 생성 로직 실행 방지
        }
        // 주석이 선택되지 않았거나 타입이 다르다면 생성 로직을 실행합니다.
        return false;
    };


    // 1. 드래그 후 새로운 하이라이트 적용 (생성)
    const handleHighlight = () => {

        if (activeAnnotation) {
            setToolbarPos(null);
            setActiveAnnotation(null);
            setIsDeleteUiActive(false);
            return; 
        }
        
        const result = applyHighlight(cssColor); 

        resetInteractionState();
        
        setToolbarPos(null);
        setActiveAnnotation(null); 
        setIsDeleteUiActive(false); 

        if (result) {
            console.log(`[POST] 하이라이트 생성 ID: ${result.id}, 색상: ${backendColor}`);
        }
    };
    
    
    // 2. 코멘트 버튼 클릭 (인라인 입력 UI 활성화)
    const handleCommentClick = () => {
        resetInteractionState();

        if (memoInputState) return;

        // 1. 드래그 선택 영역이 있는 경우 (새 코멘트 생성 시도)
        if (!activeAnnotation) {
            
            // ⭐ 타입 오류를 피하기 위해 position 인수를 제거하고,
            // 코멘트 위치 계산은 applyComment 유틸리티 함수 내부에서 처리되도록 합니다.
            const result = applyComment(null); 
            
            setToolbarPos(null);
            setActiveAnnotation(null); 
            setIsDeleteUiActive(false); 

            if (result) {
                console.log("새 코멘트 입력 UI 활성화:", result.id);
            } else {
                console.log("코멘트 생성 실패: 선택 영역 없음");
            }
            return;
        }
        
        // 2. 기존 주석(highlight)이 Active 상태인 경우 (클릭 후 코멘트 버튼)
        if (activeAnnotation.type === 'highlight') {
            const groupId = activeAnnotation.id; 
            
            // 2-1. 중복 코멘트 확인 로직
            const allHighlightSpansInGroup = document.querySelectorAll(`.annotation[data-id="${groupId}"]`);
            
            let isCommentAlreadyPresent = false;
            allHighlightSpansInGroup.forEach(span => {
                if (span.querySelector('.comment-wrapper')) {
                    isCommentAlreadyPresent = true;
                }
            });

            if (isCommentAlreadyPresent) {
                console.log(`코멘트 생성 실패: 그룹 ID ${groupId}에 이미 코멘트가 존재합니다.`);
                setToolbarPos(null);
                setActiveAnnotation(null);
                setIsDeleteUiActive(false); 
                return; // 중복 생성 방지
            }
        }
        
        // 3. 코멘트가 없는 하이라이트인 경우 또는 기존 코멘트(quote)를 클릭한 경우
        // ⭐ position 인수를 제거하고, applyComment 유틸리티 함수에 책임을 넘깁니다.
        const result = applyComment(activeAnnotation);
        
        setToolbarPos(null);
        setActiveAnnotation(null); 
        setIsDeleteUiActive(false); 
        
        if (result) {
            console.log("코멘트 입력 UI 활성화 (위치 지정):", result.id);
        } else {
            console.log("코멘트 생성 실패");
        }
    };

    
    // 3. 통합된 삭제 처리 로직
    const handleDeleteAnnotation = () => {
        if (!activeAnnotation) {
            console.error("삭제할 activeAnnotation이 없습니다.");
            return;
        }

        const el = document.querySelector(
            `.annotation[data-id="${activeAnnotation.id}"]`
        ) as HTMLElement | null;

        const groupId = el?.dataset.groupId;

        if (groupId && hasLinkedCommentFromOthers(groupId)) {
            setShowDeleteModal(false);
            setDeleteBlockedType(activeAnnotation.type);
            return;
        }

        // 실제 삭제
        setMemoInputState(null);

        

        switch (activeAnnotation.type) {
            case "highlight":
                removeHighlight(activeAnnotation.id);
                break;
            case "quote":
                removeComment(activeAnnotation.id);
                break;
            case "memo":
                removeMemo(activeAnnotation.id);
                break;
        }

        setActiveAnnotation(null);
        setToolbarPos(null);
        // setShowDeleteModal(false);
        setIsDeleteUiActive(false);
    };


    // ⭐ 3. 메모 버튼 클릭 (메모 입력 UI 활성화)


const handleMemo = () => {
    resetInteractionState();

    if (!lastSelectionRangeRef.current) return;

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(lastSelectionRangeRef.current);

    const result = applyMemo();
    if (!result) return;

    const range = lastSelectionRangeRef.current;
    const rects = range.getClientRects();
    if (!rects.length) return;

    const lastRect = rects[rects.length - 1];
    const { top, left } = calculateToolbarPosition(lastRect as DOMRect);

    showMemoPopup({
        container: containerRef.current!,
        top: top + lastRect.height + 15,
        left: left - 125,
        onSave: (content) => {
            const el = document.querySelector(
                `.annotation.memo[data-id="${result.id}"]`
            ) as HTMLElement | null;

            if (el) {
                el.dataset.content = content; // ✅ 여기 이미 입력 내용이 저장됨
            }

            console.log("[POST] 메모 저장:", result.id, content);
        },

        onCancel: () => {
            removeMemo(result.id);
        },
    });

};



    return (
        <>
            <AnnotationStyle />
            <S.Container
                // Container Ref 연결   
                className="reading-page-container"
                ref={containerRef}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {showWarning && (
                    <WarningModal onClose={() => setShowWarning(false)} />
                )}
                
                {showDeleteModal && activeAnnotation && (
                    <DeleteHighlightModal
                        type={activeAnnotation.type}   // ⭐ 이 줄이 핵심
                        onConfirm={handleDeleteAnnotation}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                    )}


                {deleteBlockedType && (
                    <DeleteAlertModal
                        type={deleteBlockedType}
                        onConfirm={() => setDeleteBlockedType(null)}
                    />
                )}

                
                {showUI && (
                    <ReadingHeader
                        title="책 이름"
                        percent={percent}
                        page={page}
                        bookId={bookId ?? "unknown"}
                    />
                )}
                
                {/* ToolBar는 Container 내부에 렌더링되므로, Container를 벗어나지 않습니다. */}



                <ToolBar 
                    position={toolbarPos} 
                    onHighlight={() => {
                        if (activeAnnotation && activeAnnotation.type === 'highlight') {
                            if (handleToolbarIconClick('highlight')) return;
                        }
                        handleHighlight(); 
                    }} 
                    onComment={() => {
                        if (activeAnnotation && activeAnnotation.type === 'quote') {
                            if (handleToolbarIconClick('quote')) return;
                        }
                        handleCommentClick(); 
                    }}
                    
                    // ⭐ 메모 핸들러 연결
                    onMemo={() => {
                    if (!activeAnnotation || activeAnnotation.type !== "memo") {
                        // 🆕 새 메모 생성
                        handleMemo();
                        return;
                    }

                    // 🗑 삭제 UI 활성화 (두 번째 클릭 상태)
                    handleToolbarIconClick("memo"); // ❗ return 절대 하면 안 됨

                    // ✏️ 수정 팝업 열기
                    if (!containerRef.current) return;

                    const el = document.querySelector(
                        `.annotation.memo[data-id="${activeAnnotation.id}"]`
                    ) as HTMLElement | null;

                    if (!el) return;

                    const rect = el.getBoundingClientRect();
                    const containerRect = containerRef.current.getBoundingClientRect();

                    showMemoPopup({
                        container: containerRef.current,
                        top: rect.bottom - containerRect.top + 12,
                        left: rect.left - containerRect.left,

                        // ✅ 기존 메모 내용 유지
                        initialContent: el.dataset.content || "",

                        onSave: (content) => {
                        el.dataset.content = content;
                        console.log("[PUT] 메모 수정:", activeAnnotation.id, content);
                        },

                        onCancel: () => {
                        // ❌ 취소해도 삭제 UI는 유지
                        console.log("메모 수정 취소");
                        },
                    });
                    }}




                    activeAnnotation={activeAnnotation}
                    isDeleteUiActive={isDeleteUiActive} 

                    onDeleteClick={() => {
                        setToolbarPos(null); 
                        // 하이라이트/코멘트는 삭제 모달을 띄우고, 메모는 바로 삭제할 수도 있습니다.
                        setShowDeleteModal(true); 
                    }}
                />

                <S.ContentBox onClick={handleContentClick}>
                    <S.TextWrapper>{pages[page]}</S.TextWrapper>
                </S.ContentBox>

                <S.ToggleWrapper $showUI={showUI}>
                    <ModeToggle mode={mode} onChangeMode={setMode} />
                </S.ToggleWrapper>

                {showUI && pages.length > 1 && (
                    <ProgressBar
                        percent={percent}
                        onDragPercent={(p) => {
                            const newPageIndex = Math.round((p / 100) * (pages.length - 1));
                            setPage(newPageIndex);
                        }}
                    />
                )}

                <div
                    ref={measureRef} 
                    style={{
                        position: "absolute",
                        visibility: "hidden",
                        width: "100%",
                        pointerEvents: "none",
                        padding: "0 16px"
                    }}
                />
            </S.Container>
        </>
    );
};

export default ReadingBookPage;