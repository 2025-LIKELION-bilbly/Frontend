// ReadingBookPage.tsx (최종 오류 수정 및 메모 기능 통합 버전)

import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom"; 
import * as S from "./ReadingBookPage.styles";
import ReadingHeader from "../components/ReadingHeader";
import WarningModal from "../components/WarningModel";
import ModeToggle from "../components/ModeToggle";
import ProgressBar from "../components/ProgressBar";
import ToolBar from "../components/ToolBar";
import DeleteHighlightModal from "../components/DeleteHighlightModal"; 

// 코멘트 유틸리티
import { applyComment, removeComment, updateCommentMarker } from "../../../utils/comment"; 

// 하이라이트 유틸리티
import { applyHighlight, removeHighlight } from "../../../utils/highlight"; 

// 메모 유틸리티
import { applyMemo, updateMemoMarker, removeMemo } from "../../../utils/memo"; 

// 통합된 주석 상태 타입 import
import type { AnnotationType } from "../../../utils/annotation.core";

import { getBgColor, toBackendColor } from "../../../styles/ColorUtils";

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

    const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);

    const [mode, setMode] = useState<Mode>("focus");
    const [showWarning, setShowWarning] = useState(
        () => localStorage.getItem("hideReadingWarning") !== "true"
    );

    const [pages, setPages] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [showUI, setShowUI] = useState(false);

    // 통합된 삭제 모달 상태
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
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
    
    // 코멘트/메모 저장 이벤트 리스너 통합 (바깥 클릭 저장 처리 포함)
    useEffect(() => {
        const setupAnnotationListeners = () => {
            const handleSaveClick = (e: Event) => {
                const target = e.target as HTMLElement;
                const color = getBgColor(selectedBgKey);

                // 1. 코멘트 저장 로직 (comment-save-btn 클릭)
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
                
                // 2. 메모 저장 로직 (memo-save-btn 클릭)
                if (target.classList.contains('memo-save-btn')) { 
                    const wrapper = target.closest('.memo-wrapper') as HTMLElement;
                    const textarea = wrapper?.querySelector('.memo-input') as HTMLTextAreaElement;
                    
                    if (wrapper && textarea) { 
                        const annotationId = wrapper.dataset.id;
                        const content = textarea.value.trim();
                        
                        if (annotationId) {
                            updateMemoMarker(annotationId, content, color); 
                            console.log(`[POST] 메모 저장: ID ${annotationId}, 내용: ${content}`);
                        }
                    }
                }
            };

            // 바깥 화면 클릭 시 저장 처리 및 UI 초기화
            const handleOutsideClick = (e: MouseEvent) => {
                 const target = e.target as HTMLElement;
                 const color = getBgColor(selectedBgKey);

                // 툴바, 모달, 입력창 등을 제외한 클릭
                if (
                    !target.closest('.toolbar-container') && 
                    !target.closest('.delete-modal') &&
                    !target.closest('.comment-wrapper') &&
                    !target.closest('.memo-wrapper') &&
                    !target.closest('.annotation')
                ) {
                    // 열려있는 모든 입력창 저장 처리
                    let didSave = false;
                    document.querySelectorAll('.comment-wrapper, .memo-wrapper').forEach(wrapper => {
                        const annotationId = wrapper.getAttribute('data-id');
                        const isComment = wrapper.classList.contains('comment-wrapper');
                        const input = wrapper.querySelector(isComment ? '.comment-input' : '.memo-input') as HTMLTextAreaElement;
                        
                        if (annotationId && input) {
                            const content = input.value.trim();
                            
                            if (isComment) {
                                updateCommentMarker(annotationId, content);
                            } else {
                                // 메모 저장 (밑줄 마커 적용)
                                updateMemoMarker(annotationId, content, color);
                            }
                            didSave = true;
                        }
                    });
                    
                    // 입력창이 닫혔다면 상태 초기화
                    if(didSave) {
                        setToolbarPos(null);
                        setActiveAnnotation(null);
                        setIsDeleteUiActive(false);
                    }
                }
            };

            document.addEventListener('click', handleSaveClick);
            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('click', handleSaveClick);
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        };

        setupAnnotationListeners();
    }, [selectedBgKey]);
    

    const percent = useMemo(() => {
        if (pages.length <= 1) return 100;
        return Math.round((page / (pages.length - 1)) * 100);
    }, [page, pages.length]);


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
     */
    const calculateToolbarPosition = (rect: DOMRect) => {
        if (!containerRef.current) {
            return {
                top: rect.top + window.scrollY - 8,
                left: rect.left + rect.width / 2,
            };
        }

        const containerRect = containerRef.current.getBoundingClientRect();

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

        setActiveAnnotation(null); 
        setIsDeleteUiActive(false); 
        
        const range = selection.getRangeAt(0);
        const clientRects = range.getClientRects();
        
        if (clientRects.length === 0) return;
        
        const lastRect = clientRects[clientRects.length - 1];

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
            
            setToolbarPos(calculateToolbarPosition(rect));

            setActiveAnnotation({ id: annotationId, type: annotationType });
            setIsDeleteUiActive(false);

            console.log(`클릭한 ${annotationType} ID:`, annotationId);
            return true;
        }

        return false;
    };


    // 페이지 클릭 UI 처리
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
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
            return true;
        }
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
        setToolbarPos(null);
        setActiveAnnotation(null); 
        setIsDeleteUiActive(false); 

        if (result) {
            console.log(`[POST] 하이라이트 생성 ID: ${result.id}, 색상: ${backendColor}`);
        }
    };
    
    
    // 2. 코멘트 버튼 클릭 (인라인 입력 UI 활성화)
    const handleCommentClick = () => {

        // 1. 드래그 선택 영역이 있는 경우 (새 코멘트 생성 시도)
        if (!activeAnnotation) {
            // ⭐ 오류 수정: position 인수를 제거했습니다.
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
        
        if (activeAnnotation.type === 'highlight') {
            const groupId = activeAnnotation.id; 
            
            const allHighlightSpansInGroup = document.querySelectorAll(`.annotation[data-id="${groupId}"]`);
            
            let isCommentAlreadyPresent = false;
            allHighlightSpansInGroup.forEach(span => {
                // comment.core에서 생성한 div.comment-wrapper로 확인
                if (span.parentNode?.querySelector(`div.comment-wrapper[data-id="${groupId}"]`)) { 
                    isCommentAlreadyPresent = true;
                }
            });

            if (isCommentAlreadyPresent) {
                console.log(`코멘트 생성 실패: 그룹 ID ${groupId}에 이미 코멘트가 존재합니다.`);
                setToolbarPos(null);
                setActiveAnnotation(null);
                setIsDeleteUiActive(false); 
                return;
            }
        }
        
        // 3. 기존 주석에 코멘트 추가 또는 기존 코멘트 클릭 시
        // ⭐ 오류 수정: position 인수를 제거했습니다.
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

    
    // 4. 메모 버튼 클릭 핸들러 (메모 생성 로직)
    const handleMemoClick = () => {
        const color = getBgColor(selectedBgKey); 

        // 1. 재클릭 시 삭제 모드 전환
        if (activeAnnotation && activeAnnotation.type === 'memo') {
             if (handleToolbarIconClick('memo')) return; 
        }
        
        // 2. 새로운 메모 생성 (activeAnnotation이 없어야 함 = 드래그된 상태)
        if (activeAnnotation) {
            // 메모는 하이라이트 위에 중첩되지 않고 독립적으로 생성되어야 합니다.
            console.warn("메모는 기존 주석 위에 추가될 수 없습니다. 새로운 메모 생성을 시도합니다.");
        }
        
        // 메모 입력 UI 활성화 (선택 영역에)
        const result = applyMemo(color); 
        
        setToolbarPos(null);
        setActiveAnnotation(null);
        setIsDeleteUiActive(false);
        
        if (result) {
            console.log("메모 입력 UI 활성화:", result.id);
        } else {
            console.log("메모 생성 실패: 선택 영역 없음");
        }
    }
    
    // 3. 통합된 삭제 처리 로직 (메모 삭제 추가)
    const handleDeleteAnnotation = () => {
        if (!activeAnnotation) {
            console.error("삭제할 activeAnnotation이 없습니다.");
            return;
        }

        console.log(`${activeAnnotation.type} ID ${activeAnnotation.id} 삭제를 진행합니다.`);

        switch (activeAnnotation.type) {
            case 'highlight':
                removeHighlight(activeAnnotation.id);
                break;
            case 'quote':
                removeComment(activeAnnotation.id);
                break;
            case 'memo': 
                removeMemo(activeAnnotation.id); // 메모 삭제 함수 호출
                break;
            default:
                console.warn(`Unknown annotation type: ${activeAnnotation.type}`);
                break;
        }

        setActiveAnnotation(null);
        setToolbarPos(null);
        setShowDeleteModal(false);
        setIsDeleteUiActive(false);
    };


    return (
        <S.Container
            // Container Ref 연결
            ref={containerRef}
            // ID 지정 (유틸리티 함수에서 위치 계산 시 사용)
            id="reading-page-container" 
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {showWarning && (
                <WarningModal onClose={() => setShowWarning(false)} />
            )}
            
            {showDeleteModal && (
                <DeleteHighlightModal
                    onConfirm={handleDeleteAnnotation} 
                    onCancel={() => setShowDeleteModal(false)}
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
                // onMemo prop을 handleMemoClick 함수와 연결
                onMemo={handleMemoClick}
                
                activeAnnotation={activeAnnotation}
                isDeleteUiActive={isDeleteUiActive} 

                onDeleteClick={() => {
                    setToolbarPos(null); 
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
    );
};

export default ReadingBookPage;