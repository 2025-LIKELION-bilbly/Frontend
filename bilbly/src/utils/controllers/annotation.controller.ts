import type { Annotation, AnnotationType } from "../annotation/annotation.core";
import {
  createAnnotationFromSelection,
  addAnnotation,
  removeAnnotationById,
} from "../annotation/annotation.core";
import { getTextRangeFromSelection } from "../annotation/selection.adapter";
import { renderAnnotations } from "../annotation/annotation.renderer";
import { otherUserAnnotationsMock } from "../mocks/annotation.mock";


/**
 * 🔥 전역 annotation 상태
 * - 페이지 이동 / 재렌더 시 기준 데이터
 */
let annotations: Annotation[] = [];

/* ===============================
 * Annotation 생성
 * (highlight / comment / memo 공통)
 * =============================== */
export function createAnnotation(
  root: HTMLElement,
  params: {
    type: AnnotationType;          // ✅ highlight | comment | memo
    page: number;                  // ✅ 페이지 필수
    color?: string;                // highlight
    content?: string;              // comment / memo
    groupId?: string;
  }
): Annotation | null {
  const result = getTextRangeFromSelection(root);
  if (!result) return null;

const annotation: Annotation = {
  ...createAnnotationFromSelection({
    type: params.type,
    text: result.text,
    range: result.range,
    page: params.page,
    color: params.color,
    content: params.content,
  }),
  isMine: true, // 🔥 내가 만든 것
};



  if (params.groupId) {
    annotation.groupId = params.groupId;
  }

  annotations = addAnnotation(annotations, annotation);

  /**
   * 🔥 핵심
   * - 항상 전체 annotations 기준으로 렌더
   * - renderer 내부에서 page 필터링
   */
  renderAnnotations(root, annotations);

  return annotation;
}

/* ===============================
 * Annotation 삭제
 * =============================== */
export function deleteAnnotation(root: HTMLElement, id: string) {
  annotations = removeAnnotationById(annotations, id);
  renderAnnotations(root, annotations);
}

/* ===============================
 * 조회
 * =============================== */
export function getAnnotations() {
  return [...annotations, ...otherUserAnnotationsMock];
}
