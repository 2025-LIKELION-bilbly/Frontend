// ReadingBookPage.tsx

import {
  useLayoutEffect,
  useState,
  useMemo,
  useRef,
} from "react";
// import { createComment } from "../../../api/comment.api";

import { useParams } from "react-router-dom";
import * as S from "./ReadingBookPage.styles";
import ReadingHeader from "../components/ReadingHeader";
import ModeToggle from "../components/ModeToggle";
import ProgressBar from "../components/ProgressBar";
import ToolBar from "../components/ToolBar";
import DeleteHighlightModal from "../components/DeleteHighlightModal";
import DeleteAlertModal from "../components/DeleteAlterModal";

import { getTextRangeFromSelection } from "../../../utils/annotation/selection.adapter";

import { createGlobalStyle } from "styled-components";
import { getBgColor, toBackendColor } from "../../../styles/ColorUtils";
import { getAnnotations } from "../../../utils/controllers/annotation.controller";
import { renderAnnotations } from "../../../utils/annotation/annotation.renderer";

import CommentEntryButton from "../components/CommentEntryButton";
import CommentThread from "../components/CommentThread";
import OverlapToTogetherModal from "../components/overlap/OverlapToTogetherModal";

import { createAnnotation, deleteAnnotation} from "../../../utils/controllers/annotation.controller";

import type { Annotation, AnnotationType } from "../../../utils/annotation/annotation.core";
import WarningModal from "../components/WarningModel"; 

import { showMemoPopup } from "../../../utils/memoPopup";




export const AnnotationStyle = createGlobalStyle`
  .annotation.memo {
    position: relative;
    border-bottom: 1px solid #c93b4d;
    padding-bottom: 2px;
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

interface ActiveAnnotation {
  id: string;
  type: AnnotationType;
  annotation?: Annotation;
}

const MAX_HEIGHT = 599;

const ReadingBookPage = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const lastSelectionRangeRef = useRef<Range | null>(null);
  const didPaginateRef = useRef(false);

  const touchStartX = useRef(0);

  const [pages, setPages] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [showUI, setShowUI] = useState(false);
  const [mode, setMode] = useState<Mode>("focus");
  

  // 교환독서 처음 시작 시 경고 모달
  const [showWarning, setShowWarning] = useState(() => {
    const hideForever = localStorage.getItem("hideReadingWarning") === "true";

    const startedKey = `exchangeReadingStarted_${bookId}`;
    const hasStarted = localStorage.getItem(startedKey) === "true";

    return hasStarted && !hideForever;
  });

  // // 🔥 페이지별 메모 저장소
  // const [memoStore, setMemoStore] = useState<
  //   Record<number, ReturnType<typeof collectMemos>>
  // >({});



  const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<ActiveAnnotation | null>(null);
  const [isDeleteUiActive, setIsDeleteUiActive] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBlockedType, setDeleteBlockedType] = useState<AnnotationType | null>(null);

  const selectedBgKey = "userMint";
  const cssColor = getBgColor(selectedBgKey);
  const backendColor = toBackendColor(selectedBgKey);
  const [commentTarget, setCommentTarget] = useState<Annotation | null>(null);
  const [showCommentEntry, setShowCommentEntry] = useState(false);

  const [showOverlapTogether, setShowOverlapTogether] = useState(false);

// 겹친 annotation이 있는 페이지로 이동하기 위한 상태
const [overlapTargetPage, setOverlapTargetPage] = useState<number | null>(null);

  // annotationId → 댓글 목록
  interface ThreadComment {
    id: string;
    content: string;
    isMine: boolean;
  }

  const [commentMap, setCommentMap] = useState<Record<string, ThreadComment[]>>({});

  const [commentAnchorPos, setCommentAnchorPos] =
    useState<{ top: number; left: number } | null>(null);

  const threadComments = commentTarget ? commentMap[commentTarget.id] ?? [] : [];

  const fullText = useMemo(
    () => "책 내용이 들어가는 자리 ".repeat(500),
    []
  );


  /* -----------------------------
   * Pagination
   * ----------------------------- */
  useLayoutEffect(() => {
    if (!measureRef.current || didPaginateRef.current) return;
    didPaginateRef.current = true;

    const words = fullText.split(" ");
    const result: string[] = [];
    let current = "";

    for (const word of words) {
      current += (current ? " " : "") + word;
      measureRef.current.innerText = current;

      if (measureRef.current.scrollHeight > MAX_HEIGHT) {
        result.push(current.slice(0, current.lastIndexOf(" ")));
        current = word;
        measureRef.current.innerText = current;
      }
    }

    if (current) result.push(current);

    requestAnimationFrame(() => setPages(result));

    return () => {
      didPaginateRef.current = false;
    };
  }, [fullText]);


    useLayoutEffect(() => {
      if (!containerRef.current) return;

      let annotations = getAnnotations().filter(
        a => a.page === page
      );

      // 여기
      if (mode === "focus") {
        annotations = annotations.filter(a => a.isMine);
      }

      renderAnnotations(containerRef.current, annotations);
    }, [page, mode]);







  const percent = useMemo(() => {
    if (pages.length <= 1) return 100;
    return Math.round((page / (pages.length - 1)) * 100);
  }, [page, pages.length]);

  /* -----------------------------
   * Mouse / Touch UX
   * ----------------------------- */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) < 50) return;



    if (diff > 0) setPage(p => Math.max(p - 1, 0));
    else setPage(p => Math.min(p + 1, pages.length - 1));
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (handleAnnotationClick(e)) return;

    const selection = window.getSelection();
    if (selection && selection.toString().trim()) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;

    if (ratio < 0.25) {
      // 페이지 이동 - 메모 저장

      setPage(p => Math.max(p - 1, 0));
    } else if (ratio > 0.75) {

      setPage(p => Math.min(p + 1, pages.length - 1));
    } else {
      setShowUI(prev => !prev);
    }

    setToolbarPos(null);
    setActiveAnnotation(null);
    setIsDeleteUiActive(false);
  };

  /* -----------------------------
   * Selection → Toolbar
   * ----------------------------- */
  const handleMouseUp = () => {
    const sel = window.getSelection();
    if (!sel || !sel.toString().trim()) return;

    const range = sel.getRangeAt(0);
    lastSelectionRangeRef.current = range.cloneRange();

    if (!containerRef.current) return;

// selection → text range 변환
const textRange = getTextRangeFromSelection(containerRef.current);
if (!textRange) return;

// 집중 모드 + 다른 사람 annotation과 겹치면
if (mode === "focus") {
  const overlaps = getAnnotations().filter(
    a =>
      !a.isMine &&
      a.page === page &&
      textRange.range.start < a.range.end &&
      textRange.range.end > a.range.start
  );

  if (overlaps.length > 0) {
    // 이동할 페이지 저장
    setOverlapTargetPage(overlaps[0].page);

    // selection / UI 정리
    sel.removeAllRanges();
    setToolbarPos(null);
    setActiveAnnotation(null);
    setIsDeleteUiActive(false);

    // 모달 열기
    setShowOverlapTogether(true);
    return; // 여기서 끝
  }
}

    const rects = range.getClientRects();
    if (!rects.length || !containerRef.current) return;

    const lastRect = rects[rects.length - 1];
    const containerRect = containerRef.current.getBoundingClientRect();

    setToolbarPos({
      top:
        lastRect.top -
        containerRect.top +
        containerRef.current.scrollTop -
        8,
      left: lastRect.left - containerRect.left + lastRect.width / 2,
    });

    setActiveAnnotation(null);
    setIsDeleteUiActive(false);
  };

const handleAnnotationClick = (e: React.MouseEvent) => {
  const el = (e.target as HTMLElement).closest(
    ".annotation[data-id]"
  ) as HTMLElement | null;

  if (!el || !containerRef.current) return false;

  const annotationId = el.dataset.id!;
  const annotation = getAnnotations().find(a => a.id === annotationId);
  if (!annotation) return false;

  const rect = el.getBoundingClientRect();
  const containerRect = containerRef.current.getBoundingClientRect();

  const anchorPos = {
    top:
      rect.bottom -
      containerRect.top +
      containerRef.current.scrollTop +
      8,
    left: rect.left - containerRect.left,
  };

  /* ===============================
   * 🔥 남의 annotation → 무조건 코멘트 버튼
   * =============================== */
  if (!annotation.isMine) {
    setCommentTarget(annotation);
    setCommentAnchorPos(anchorPos);
    setShowCommentEntry(true);

    // ❌ 툴바 / 삭제 / 선택 상태 전부 제거
    setToolbarPos(null);
    setActiveAnnotation(null);
    setIsDeleteUiActive(false);

    return true; // 🔥 여기서 끝
  }

  /* ===============================
   * 🔥 내 annotation → 기존 툴바 로직
   * =============================== */
  setToolbarPos({
    top:
      rect.top -
      containerRect.top +
      containerRef.current.scrollTop -
      8,
    left: rect.left - containerRect.left + rect.width / 2,
  });

  setActiveAnnotation({
    id: annotation.id,
    type: annotation.type,
    annotation,
  });

  setIsDeleteUiActive(true);
  return true;
};







  /* -----------------------------
   * Annotation Actions
   * ----------------------------- */
  const handleHighlight = () => {
    if (!containerRef.current) return;

    const annotation = createAnnotation(containerRef.current, {
      type: "highlight",
      color: cssColor,
      page,
    });

    if (annotation) {
      setActiveAnnotation({
        id: annotation.id,
        type: "highlight",
        annotation,
      });
      console.log("[POST] highlight", backendColor);
    }

    setToolbarPos(null);
  };



  
const handleComment = () => {
  if (!containerRef.current || !lastSelectionRangeRef.current) return;

  // selection 복구
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(lastSelectionRangeRef.current);

  // highlight 생성 (없으면)
  const annotation = createAnnotation(containerRef.current, {
    type: "quote",
    page,
  });

  if (!annotation) return;

  const commentEl = document.querySelector(
    `.annotation.quote[data-id="${annotation.id}"]`
  ) as HTMLElement | null;

  if (!commentEl) return;

  // 중복 입력 방지
  if (commentEl.querySelector(".inline-comment-input")) return;

  // textarea 생성
  const textarea = document.createElement("textarea");
  textarea.className = "inline-comment-input";
  textarea.placeholder = "코멘트를 입력하세요";
  textarea.rows = 1;

  commentEl.appendChild(textarea);
  textarea.focus();

  // 높이 자동 조절
  const resize = () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };
  textarea.addEventListener("input", resize);
  resize();

  const save = () => {
    const value = textarea.value.trim();
    textarea.remove();
    if (!value) return;

    // annotation 데이터에 저장
    annotation.content = value;
    if (containerRef.current === null) return;

// DOM에 span 붙이지 않음
// renderAnnotations가 책임지게 함

  renderAnnotations(containerRef.current, getAnnotations());

    // 화면 표시
    // const span = document.createElement("span");
    // span.className = "inline-comment";
    // span.textContent = value;
    // commentEl.appendChild(span);
    
  };

  textarea.addEventListener("blur", save);


  setToolbarPos(null);
  setActiveAnnotation(null);
};





  const handleMemo = () => {
    if (!containerRef.current || !lastSelectionRangeRef.current) return;

    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(lastSelectionRangeRef.current);

    const annotation = createAnnotation(containerRef.current, {
      type: "memo",
      page,
      content: "",
    });

    if (!annotation) return;

    // 🔥 위치 계산 (드래그된 텍스트 기준)
    const range = lastSelectionRangeRef.current;
    const rect = range.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    showMemoPopup({
      container: containerRef.current,
      top: rect.bottom - containerRect.top + containerRef.current.scrollTop + 6,
      left: rect.left - containerRect.left,
      initialContent: "",
      onSave: value => {
        annotation.content = value;

        renderAnnotations(
          containerRef.current!,
          getAnnotations().filter(a => a.page === page)
        );
      },
      onCancel: () => {
        deleteAnnotation(containerRef.current!, annotation.id);
      },
    });


    setActiveAnnotation(null);
    setToolbarPos(null);
    setIsDeleteUiActive(false);
  };





  const handleDelete = () => {
    if (!containerRef.current || !activeAnnotation) return;

    // 남의 annotation은 삭제 불가
    if (!activeAnnotation.annotation?.isMine) return;

    deleteAnnotation(containerRef.current, activeAnnotation.id);

    setActiveAnnotation(null);
    setToolbarPos(null);
    setIsDeleteUiActive(false);
    setShowDeleteModal(false);
  };


  /* -----------------------------
   * Render
   * ----------------------------- */
  return (
    <>
      <AnnotationStyle />

      {showWarning && (
        <WarningModal
          onClose={() => {
            // 첵 첫 진입 처리 완료
            localStorage.removeItem(`exchangeReadingStarted_${bookId}`);

            setShowWarning(false);
          }}
        />
      )}

      <S.Container
        ref={containerRef}
        className="reading-page-container"
        style={{ position: "relative" }}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {showUI && (
          <ReadingHeader
            title="책 이름" // 수정
            percent={percent} // 진행현황
            page={page}
            bookId={bookId ?? ""}
          />
        )}

        <ToolBar
          position={toolbarPos}
          activeAnnotation={activeAnnotation}
          isDeleteUiActive={isDeleteUiActive}

          // 🔥 여기서 판단
          canDelete={!!activeAnnotation?.annotation?.isMine}

          onHighlight={handleHighlight}
          onComment={handleComment}
          onMemo={handleMemo}
          onDeleteClick={() => setShowDeleteModal(true)}
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
            onDragPercent={(p) =>
              setPage(Math.round((p / 100) * (pages.length - 1)))
            }
          />
        )}

        <div
          ref={measureRef}
          style={{
            position: "absolute",
            visibility: "hidden",
            width: "100%",
            padding: "0 16px",
            fontSize: "16px",
            lineHeight: "30px",
          }}
        />


        {/* 다른 사용자 하이라이트 클릭 시 */}
        {showCommentEntry && commentTarget && commentAnchorPos && (
          <CommentEntryButton
            top={commentAnchorPos.top}
            left={commentAnchorPos.left}
            onClick={() => setShowCommentEntry(false)}
          />
        )}


        {!showCommentEntry && commentTarget && commentAnchorPos && (
          <CommentThread
            annotation={commentTarget}
            comments={threadComments} 
            top={commentAnchorPos.top}
            left={commentAnchorPos.left}
            onClose={() => {
              setCommentTarget(null);
              setShowCommentEntry(false);
              setCommentAnchorPos(null);
            }}
            onAddComment={newComment => {
              setCommentMap(prev => ({
                ...prev,
                [commentTarget.id]: [
                  ...(prev[commentTarget.id] ?? []),
                  newComment,
                ],
              }));

          // 🔥 나중에 여기서 API 연동
          // createComment(...)
          }}
          />
        )}
      </S.Container>

      {showDeleteModal && activeAnnotation && (
        <DeleteHighlightModal
          type={activeAnnotation.type}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}

      {deleteBlockedType && (
        <DeleteAlertModal
          type={deleteBlockedType}
          onConfirm={() => setDeleteBlockedType(null)}
        />
      )}

      {showOverlapTogether && (
        <OverlapToTogetherModal
          highlights={[]} // (지금은 UI용이라 비워도 됨)
          onConfirm={() => {
            if (overlapTargetPage !== null) {
              setPage(overlapTargetPage); // 🔥 해당 페이지로 이동
            }
            setMode("together");          // 🔥 같이 보기 전환
            setShowOverlapTogether(false);
            setOverlapTargetPage(null);
          }}
          onCancel={() => {
            setShowOverlapTogether(false);
            setOverlapTargetPage(null);
          }}
        />
      )}

    </>
  );
};

export default ReadingBookPage;
