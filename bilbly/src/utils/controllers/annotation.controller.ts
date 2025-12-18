// utils/controllers/annotation.controller.ts

import type { Annotation } from "../annotation/annotation.core";
import {
  createHighlightFromSelection,
  addAnnotation,
  removeAnnotationById,
} from "../annotation/annotation.core";
import { getTextRangeFromSelection } from "../annotation/selection.adapter";
import { renderAnnotations } from "../annotation/annotation.renderer";
import { otherUserAnnotationsMock } from "../mocks/annotation.mock";

/* ===============================
 * In-memory store
 * =============================== */

let annotations: Annotation[] = [];

/* ===============================
 * Highlight 생성
 * =============================== */
export function createHighlight(
  root: HTMLElement,
  params: {
    page: number;
    bookId: string;
    color?: string;
  }
): Annotation | null {
  const result = getTextRangeFromSelection(root);
  if (!result) return null;

  const annotation = createHighlightFromSelection({
    text: result.text,
    range: result.range,
    page: params.page,
    bookId: params.bookId,
    color: params.color,
  });

  annotations = addAnnotation(annotations, annotation);

  // ✅ 현재 책 기준으로만 렌더
  renderAnnotations(
    root,
    annotations.filter(a => a.bookId === params.bookId)
  );

  return annotation;
}

/* ===============================
 * Highlight 삭제
 * =============================== */
export function deleteHighlight(
  root: HTMLElement,
  annotationId: string,
  bookId: string
) {
  annotations = removeAnnotationById(annotations, annotationId);

  renderAnnotations(
    root,
    annotations.filter(a => a.bookId === bookId)
  );
}

export function deleteNote(
  annotationId: string,
  noteType: "comment" | "memo"
) {
  const annotation = annotations.find(a => a.id === annotationId);
  if (!annotation) return;

  annotation.notes = annotation.notes.filter(
    n => n.type !== noteType
  );
}

export function hasTogetherNotes(annotation: Annotation): boolean {
  return annotation.notes.some(
    note => note.source === "together"
  );
}

/* ===============================
 * 조회
 * =============================== */
export function getAnnotations(bookId: string): Annotation[] {
  return [
    ...annotations.filter(a => a.bookId === bookId),
    ...otherUserAnnotationsMock.filter(a => a.bookId === bookId),
  ];
}

/* ===============================
 * (선택) 내부 접근용
 * =============================== */
export function getMyAnnotations(bookId: string): Annotation[] {
  return annotations.filter(a => a.bookId === bookId);
}
