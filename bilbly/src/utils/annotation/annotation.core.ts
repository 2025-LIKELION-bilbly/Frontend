/* ==============================
 * Types
 * ============================== */

export type AnnotationType = "highlight";

export type NoteType = "comment" | "memo";
export type NoteSource = "focus" | "together";

export interface Note {
  id: string;
  type: NoteType;       // comment | memo
  source: NoteSource;   // focus | together
  content: string;
  isMine: boolean;
  createdAt: number;
}

export interface TextRange {
  start: number;
  end: number;
}

export interface Annotation {
  id: string;
  type: "highlight";
  isMine: boolean;

  range: TextRange;
  text: string;
  page: number;
  bookId: string;
  color?: string;

  notes: Note[];        // 🔥 comment + memo 전부 여기
}

/* ==============================
 * Internal helpers
 * ============================== */

const generateUniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

/* ==============================
 * Factory
 * ============================== */

export function createHighlightFromSelection(params: {
  text: string;
  range: TextRange;
  page: number;
  bookId: string;
  color?: string;
}): Annotation {
  return {
    id: generateUniqueId(), // 나중에 서버 id로 교체
    type: "highlight",
    isMine: true,
    text: params.text,
    range: params.range,
    page: params.page,
    bookId: params.bookId,
    color: params.color,
    notes: [],              // 🔥 여기로 통일
  };
}

/* ==============================
 * State utils
 * ============================== */

export function addAnnotation(
  annotations: Annotation[],
  next: Annotation
): Annotation[] {
  return [...annotations, next];
}

export function removeAnnotationById(
  annotations: Annotation[],
  id: string
): Annotation[] {
  return annotations.filter(a => a.id !== id);
}

/* ==============================
 * Validation
 * ============================== */

export function isValidRange(range: TextRange): boolean {
  return range.start >= 0 && range.end > range.start;
}
