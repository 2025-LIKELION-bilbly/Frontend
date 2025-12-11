import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom"; 
import * as S from "./ReadingBookPage.styles";
import ReadingHeader from "../components/ReadingHeader";
import WarningModal from "../components/WarningModel";
import ModeToggle from "../components/ModeToggle";
import ProgressBar from "../components/ProgressBar";
import ToolBar from "../components/ToolBar";
import DeleteHighlightModal from "../components/DeleteHighlightModal"; 

// 코멘트 유틸리티 (인라인 입력/업데이트 포함)
import { applyComment, removeComment, updateCommentMarker } from "../../../utils/comment"; 

// 하이라이트 유틸리티
import { applyHighlight, removeHighlight } from "../../../utils/highlight"; 

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

    const measureRef = useRef<HTMLDivElement>(null);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const selectedBgKey = "userMint";
    const cssColor = getBgColor(selectedBgKey);
    const backendColor = toBackendColor(selectedBgKey); // backendColor 이제 사용됨

    const fullText = useMemo( // fullText 이제 paginateText 호출 시 사용됨
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
        // fullText와 measureRef가 paginateText 내에서 사용됩니다.
        const generated = paginateText(fullText, measureRef); 
        setPages(generated);
    }, [fullText]);
    
    // 코멘트 저장 이벤트 리스너 등록 (컴포넌트 마운트 시 한 번만 실행)
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


    // 스와이프
    const handleTouchStart = (e: React.TouchEvent) => { // touchStartX 이제 사용됨
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => { // touchEndX 이제 사용됨
        touchEndX.current = e.changedTouches[0].clientX;
        const diff = touchEndX.current - touchStartX.current;

        if (Math.abs(diff) < 50) return;

        if (diff > 0) setPage(prev => Math.max(prev - 1, 0));
        else setPage(prev => Math.min(prev + 1, pages.length - 1));
    };


    // 드래그 후 텍스트 선택 시 툴바 표시
    const handleMouseUp = () => {
        const selection = window.getSelection();

        if (!selection || selection.toString().trim() === "") {
            return;
        }

        setActiveAnnotation(null); 
        
        const rect = selection.getRangeAt(0).getBoundingClientRect();

        setToolbarPos({
            top: rect.top + window.scrollY - 4,
            left: rect.left + rect.width / 2,
        });
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
            setToolbarPos({
                top: rect.top + window.scrollY - 8,
                left: rect.left + rect.width / 2,
            });

            setActiveAnnotation({ id: annotationId, type: annotationType });

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
        
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = x / rect.width;

        if (ratio < 0.25) setPage(p => Math.max(p - 1, 0));
        else if (ratio > 0.75) setPage(p => Math.min(p + 1, pages.length - 1));
        else setShowUI(prev => !prev);
    };


    // 1. 드래그 후 새로운 하이라이트 적용 (생성)
    const handleHighlight = () => {
        const result = applyHighlight(cssColor); 
        setToolbarPos(null);
        setActiveAnnotation(null); 

        if (result) {
            console.log(`[POST] 하이라이트 생성 ID: ${result.id}, 색상: ${backendColor}`);
        }
    };
    
    // 2. 코멘트 버튼 클릭 (인라인 입력 UI 활성화)
    const handleCommentClick = () => {
        const result = applyComment();
        setToolbarPos(null);
        setActiveAnnotation(null); 
        
        if (result) {
             console.log("코멘트 입력 UI 활성화:", result.id);
        }
    };

    
    // 3. 통합된 삭제 처리 로직
    const handleDeleteAnnotation = () => {
        if (!activeAnnotation) return;

        console.log(`${activeAnnotation.type} ID ${activeAnnotation.id} 삭제를 진행합니다.`);

        switch (activeAnnotation.type) {
            case 'highlight':
                removeHighlight(activeAnnotation.id);
                break;
            case 'quote':
                removeComment(activeAnnotation.id);
                break;
            default:
                console.warn(`Unknown annotation type: ${activeAnnotation.type}`);
                break;
        }

        console.log(`[DELETE] ${activeAnnotation.type} ID ${activeAnnotation.id}`);

        setActiveAnnotation(null);
        setToolbarPos(null);
        setShowDeleteModal(false);
    };


    return (
        <S.Container
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
            
            <ToolBar 
                position={toolbarPos} 
                onHighlight={handleHighlight} 
                onComment={handleCommentClick}
                
                activeAnnotation={activeAnnotation}
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
                ref={measureRef} // measureRef 이제 사용됨
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