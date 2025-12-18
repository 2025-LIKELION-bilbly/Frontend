// ReadingBookPage.tsx

import {
  useLayoutEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { deleteNote } from "../../../utils/controllers/annotation.controller";



import { useParams } from "react-router-dom";
import * as S from "./ReadingBookPage.styles";
import ReadingHeader from "../components/ReadingHeader";
import ModeToggle from "../components/ModeToggle";
import ProgressBar from "../components/ProgressBar";
import ToolBar from "../components/ToolBar";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import DeleteAlertModal from "../components/DeleteAlterModal";

import { getTextRangeFromSelection } from "../../../utils/annotation/selection.adapter";

// import { createGlobalStyle } from "styled-components";
import { getBgColor, toBackendColor } from "../../../styles/ColorUtils";
import { getAnnotations } from "../../../utils/controllers/annotation.controller";
import { renderAnnotations } from "../../../utils/annotation/annotation.renderer";

import CommentEntryButton from "../components/CommentEntryButton";
import CommentThread from "../components/CommentThread";
import OverlapToTogetherModal from "../components/overlap/OverlapToTogetherModal";

import { createHighlight, deleteHighlight } from "../../../utils/controllers/annotation.controller";
import type { Annotation } from "../../../utils/annotation/annotation.core";



import WarningModal from "../components/WarningModel"; 

import { showMemoPopup } from "../../../utils/memoPopup";






type Mode = "focus" | "together";
// type DeleteTargetType = "highlight" | "comment" | "memo";


interface ActiveAnnotation {
  id: string;
  annotation: Annotation;
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
  const [pendingDelete, setPendingDelete] = useState<{
    annotationId: string;
    noteType: "comment" | "memo";
  } | null>(null);

  const [deleteBlockedType, setDeleteBlockedType] =
    useState<"highlight" | "comment" | "memo" | null>(null);



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
    if (!containerRef.current || !bookId) return;

    let annotations = getAnnotations(bookId).filter(
      a => a.page === page
    );

    // 여기
    if (mode === "focus") {
      annotations = annotations.filter(a => a.isMine);
    }

    renderAnnotations(containerRef.current, annotations);
  }, [page, mode, bookId]);







  const percent = useMemo(() => {
    if (pages.length <= 1) return 100;
    return Math.round((page / (pages.length - 1)) * 100);
  }, [page, pages.length]);



//   function canDeleteAnything({
//   annotation,
//   mode,
// }: {
//   annotation: Annotation;
//   mode: Mode;
// }) {
//   // 1️⃣ 같이보기 모드: 무조건 삭제 불가
//   if (mode === "together") {
//     return false;
//   }

//   // 2️⃣ 집중모드: 다른 사용자의 together 코멘트가 있으면 삭제 불가
//   const hasOtherTogetherComment = annotation.notes.some(
//     n =>
//       n.type === "comment" &&
//       n.source === "together" &&
//       !n.isMine
//   );

//   if (hasOtherTogetherComment) {
//     return false;
//   }

//   // 3️⃣ 그 외에는 삭제 가능
//   return true;
// }

function canDeleteAnnotation(
  annotation: Annotation,
  mode: Mode
): boolean {
  if (mode === "together") return false;

  const hasOtherTogetherComment = annotation.notes.some(
    n =>
      n.type === "comment" &&
      n.source === "together" &&
      !n.isMine
  );

  return !hasOtherTogetherComment;
}








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
    if (handleNoteIconClick(e.nativeEvent)) return;
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
  const overlaps = getAnnotations(bookId!).filter(
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


const handleNoteIconClick = (e: MouseEvent) => {
  const icon = (e.target as HTMLElement).closest(
    ".note-icon"
  ) as HTMLElement | null;

  if (!icon) return false;

  const noteType = icon.dataset.noteType as "comment" | "memo";
  const annotationId = icon.dataset.annotationId;
  if (!annotationId || !noteType) return false;

  const annotation = getAnnotations(bookId!).find(
    a => a.id === annotationId
  );
  if (!annotation) return false;

  if (!canDeleteAnnotation(annotation, mode)) {
    setDeleteBlockedType(noteType);
    return true;
  }

  setPendingDelete({ annotationId, noteType });
  setShowDeleteModal(true);
  return true;
};



  const handleAnnotationClick = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest(
      ".annotation[data-id]"
    ) as HTMLElement | null;

    if (!el || !containerRef.current) return false;

    const annotationId = el.dataset.id!;
    const annotation = getAnnotations(bookId!).find(
    a => a.id === annotationId
  );

    if (!annotation) return false;

    const rect = el.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();



    /* ===============================
    * 🔥 남의 annotation → 무조건 코멘트 버튼
    * =============================== */
      // 1️⃣ 남의 annotation
    if (!annotation.isMine) {
      setCommentTarget(annotation);
      setCommentAnchorPos({
        top:
          rect.bottom -
          containerRect.top +
          containerRef.current.scrollTop +
          8,
        left: rect.left - containerRect.left,
      });
      setShowCommentEntry(true);

      setToolbarPos(null);
      setActiveAnnotation(null);
      setIsDeleteUiActive(false);
      return true;
    }

    
    if (annotation.isMine) {
      // 1️⃣ 툴바 위치 계산 (기존 로직 유지)
      setToolbarPos({
        top:
          rect.top -
          containerRect.top +
          containerRef.current.scrollTop -
          8,
        left: rect.left - containerRect.left + rect.width / 2,
      });

      // 2️⃣ activeAnnotation 설정
      setActiveAnnotation({
        id: annotation.id,
        annotation,
      });

      setIsDeleteUiActive(true);

      // 3️⃣ 🔥 메모가 있으면 즉시 메모 팝업 열기
      const memoNotes = annotation.notes.filter(n => n.type === "memo");

      if (memoNotes.length > 0) {
        const container = containerRef.current;
        if (!container) return true;

        const top =
          rect.bottom -
          containerRect.top +
          container.scrollTop +
          6;

        const left =
          rect.left -
          containerRect.left;

        const existing = document.getElementById("memo-popup");
        if (!existing) {
          showMemoPopup({
            container,
            top,
            left,
            initialContent: memoNotes.map(n => n.content).join("\n"),
            onSave: value => {
              annotation.notes = annotation.notes.map(n =>
                n.type === "memo"
                  ? { ...n, content: value }
                  : n
              );

              renderAnnotations(
                container,
                getAnnotations(bookId!).filter(a => a.page === page)
              );
            },
            onCancel: () => {},
          });
        }
      }


      return true;
    }


  };





  function restoreSelection() {
    if (!lastSelectionRangeRef.current) return;

    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(lastSelectionRangeRef.current);
  }


  /* -----------------------------
   * Annotation Actions
   * ----------------------------- */
  const handleHighlight = () => {
    if (!containerRef.current) return;

    restoreSelection();

  const annotation = createHighlight(containerRef.current, {
    page,
    bookId: bookId!,
    color: cssColor,
});


  if (annotation) {
    setActiveAnnotation({
      id: annotation.id,
      annotation,
    });
    console.log("[POST] highlight", backendColor);
    }

    setToolbarPos(null);
  };


  
  const handleComment = () => {
    const highlight = activeAnnotation?.annotation;
    if (!highlight) return;

    highlight.notes.push({
      id: Date.now().toString(),
      type: "comment",
      source: mode === "focus" ? "focus" : "together",
      content: "",
      isMine: true,
      createdAt: Date.now(),
    });

    setCommentTarget(highlight);
    setShowCommentEntry(true);

    setToolbarPos(null);
    setActiveAnnotation(null);
  };





  const handleMemo = () => {
    const highlight = activeAnnotation?.annotation;
    if (!highlight || !containerRef.current) return;

    const span = containerRef.current.querySelector(
      `.annotation[data-id="${highlight.id}"]`
    ) as HTMLElement | null;
    if (!span) return;

    const rect = span.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    showMemoPopup({
      container: containerRef.current,
      top:
        rect.bottom -
        containerRect.top +
        containerRef.current.scrollTop +
        6,
      left: rect.left - containerRect.left,
      initialContent: "",
      onSave: value => {
        highlight.notes.push({
          id: Date.now().toString(),
          type: "memo",
          source: "focus",
          content: value,
          isMine: true,
          createdAt: Date.now(),
        });

        renderAnnotations(
          containerRef.current!,
          getAnnotations(bookId!).filter(a => a.page === page)
        );
      },
      onCancel: () => {},
    });

    setToolbarPos(null);
    setActiveAnnotation(null);
  };



  const handleConfirmDeleteHighlight = () => {
  if (!activeAnnotation || !containerRef.current) return;

  deleteHighlight(containerRef.current, activeAnnotation.id, bookId!);

  setActiveAnnotation(null);
  setToolbarPos(null);
  setShowDeleteModal(false);
};

  const handleConfirmDeleteNote = () => {
  if (!pendingDelete || !containerRef.current) return;

  deleteNote(
    pendingDelete.annotationId,
    pendingDelete.noteType
  );

  renderAnnotations(
    containerRef.current,
    getAnnotations(bookId!).filter(a => a.page === page)
  );

  setPendingDelete(null);
  setShowDeleteModal(false);
  };




  /* -----------------------------
   * Render
   * ----------------------------- */
  return (
    <>

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
          canDelete={
            !!activeAnnotation &&
            canDeleteAnnotation(activeAnnotation.annotation, mode)
          }
          onHighlight={handleHighlight}
          onComment={handleComment}
          onMemo={handleMemo}
          onDeleteClick={() => {
            if (!activeAnnotation) return;

            if (!canDeleteAnnotation(activeAnnotation.annotation, mode)) {
              setDeleteBlockedType("highlight");
              return;
            }

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

      {showDeleteModal && (
        <DeleteConfirmModal
          type={pendingDelete ? pendingDelete.noteType : "highlight"}
          onConfirm={
            pendingDelete
              ? handleConfirmDeleteNote
              : handleConfirmDeleteHighlight
          }
          onCancel={() => {
            setPendingDelete(null);
            setShowDeleteModal(false);
          }}
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
              setPage(overlapTargetPage); // 해당 페이지로 이동
            }
            setMode("together");          // 같이 보기 전환
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
