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
import { applyMemo } from "../../../utils/memo";

import { createGlobalStyle } from "styled-components";
import { getBgColor, toBackendColor } from "../../../styles/ColorUtils";
import { getAnnotations } from "../../../utils/controllers/annotation.controller";
import { renderAnnotations } from "../../../utils/annotation/annotation.renderer";


import CommentEntryButton from "../components/CommentEntryButton";
import CommentThread from "../components/CommentThread";


import {
  createAnnotation,
  deleteAnnotation,
} from "../../../utils/controllers/annotation.controller";

import type {
  Annotation,
  AnnotationType,
} from "../../../utils/annotation/annotation.core";



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

  const [toolbarPos, setToolbarPos] =
    useState<{ top: number; left: number } | null>(null);

  const [activeAnnotation, setActiveAnnotation] =
    useState<ActiveAnnotation | null>(null);

  const [isDeleteUiActive, setIsDeleteUiActive] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBlockedType, setDeleteBlockedType] =
    useState<AnnotationType | null>(null);

  const selectedBgKey = "userMint";
  const cssColor = getBgColor(selectedBgKey);
  const backendColor = toBackendColor(selectedBgKey);
  const [commentTarget, setCommentTarget] =
  useState<Annotation | null>(null);
const [showCommentEntry, setShowCommentEntry] = useState(false);

const [commentAnchorPos, setCommentAnchorPos] =
  useState<{ top: number; left: number } | null>(null);





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

  // 🔥 집중모드에서는 "내 annotation만"
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

  // 🔥 위치 계산
  const rect = el.getBoundingClientRect();
  const containerRect = containerRef.current.getBoundingClientRect();

  setCommentAnchorPos({
    top:
      rect.bottom -
      containerRect.top +
      containerRef.current.scrollTop +
      8,
    left: rect.left - containerRect.left,
  });

  // 🔥 여기서 버튼 띄우는 로직
  if (mode === "together" && !annotation.isMine) {
    setCommentTarget(annotation);
    setShowCommentEntry(true);
    return true;
  }

  // 내 annotation
  setActiveAnnotation({
    id: annotation.id,
    type: annotation.type,
    annotation,
  });

  console.log("mode:", mode);
console.log("annotation.isMine:", annotation.isMine);
console.log("showCommentEntry:", showCommentEntry);
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

  // 🔥 selection 복구
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(lastSelectionRangeRef.current);

  // 🔥 highlight 생성 (없으면)
  const annotation = createAnnotation(containerRef.current, {
    type: "highlight",
    page,
  });

  if (!annotation) return;

  const highlightEl = document.querySelector(
    `.annotation.highlight[data-id="${annotation.id}"]`
  ) as HTMLElement | null;

  if (!highlightEl) return;

  // 중복 입력 방지
  if (highlightEl.querySelector(".inline-comment-input")) return;

  // textarea 생성
  const textarea = document.createElement("textarea");
  textarea.className = "inline-comment-input";
  textarea.placeholder = "코멘트를 입력하세요";
  textarea.rows = 1;

  highlightEl.appendChild(textarea);
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

    // 🔥 annotation 데이터에 저장
    annotation.content = value;

    // 🔥 화면 표시
    const span = document.createElement("span");
    span.className = "inline-comment";
    span.textContent = value;
    highlightEl.appendChild(span);
  };

  textarea.addEventListener("blur", save);
  textarea.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      textarea.blur();
    }
    if (e.key === "Escape") {
      textarea.remove();
    }
  });

  setToolbarPos(null);
  setActiveAnnotation(null);
};





const handleMemo = () => {
  if (!lastSelectionRangeRef.current) return;

  const sel = window.getSelection();
  if (!sel) return;

  // 🔥 기존 selection 완전 초기화
  sel.removeAllRanges();

  // 🔥 마지막 드래그 selection 복구
  sel.addRange(lastSelectionRangeRef.current);

  // 🔥 memo 생성 (popup + icon은 memo.ts에서 처리)
  const result = applyMemo();

  // ❗ 실패하면 아무 것도 정리하지 않음
  if (!result) return;

  // UI 정리
  setActiveAnnotation(null);
  setToolbarPos(null);
  setIsDeleteUiActive(false);
};



  const handleDelete = () => {
    if (!containerRef.current || !activeAnnotation) return;

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
      <S.Container
        ref={containerRef}
        className="reading-page-container"
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {showUI && (
          <ReadingHeader
            title="책 이름"
            percent={percent}
            page={page}
            bookId={bookId ?? ""}
          />
        )}

        <ToolBar
          position={toolbarPos}
          activeAnnotation={activeAnnotation}
          isDeleteUiActive={isDeleteUiActive}
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


      {/* 1️⃣ 다른 사용자 하이라이트 클릭 시 */}
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
    top={commentAnchorPos.top}
    left={commentAnchorPos.left}
    onClose={() => {
      setCommentTarget(null);
      setShowCommentEntry(false);
      setCommentAnchorPos(null);
    }}
    onSubmit={content => {
      console.log("POST comment", content);
      setCommentTarget(null);
      setShowCommentEntry(false);
      setCommentAnchorPos(null);
    }}
  />
)}




    </>
  );
};

export default ReadingBookPage;
