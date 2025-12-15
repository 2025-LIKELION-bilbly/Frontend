import type { Annotation } from "../annotation/annotation.core";
import {
  createAnnotationFromSelection,
  addAnnotation,
  removeAnnotationById,
} from "../annotation/annotation.core";
import { getTextRangeFromSelection } from "../annotation/selection.adapter";
import { renderAnnotations } from "../annotation/annotation.renderer";

/* ===============================
 * 내부 상태
 * =============================== */
let annotations: Annotation[] = [];

/* ===============================
 * LocalStorage key
 * =============================== */
const STORAGE_KEY = "reading-annotations";

/* ===============================
 * Annotation 생성 (highlight / quote 전용)
 * =============================== */
export function createAnnotation(
  root: HTMLElement,
  params: {
    type: "highlight" | "quote";
    color?: string;
    content?: string;
    groupId?: string;
  }
): Annotation | null {
  const result = getTextRangeFromSelection(root);
  if (!result) return null;

  const annotation = createAnnotationFromSelection({
    type: params.type,
    text: result.text,
    range: result.range,
    color: params.color,
    content: params.content,
  });

  if (params.groupId) {
    annotation.groupId = params.groupId;
  }

  annotations = addAnnotation(annotations, annotation);

  // 🔥 항상 전체 재렌더 (memo는 관여 ❌)
  renderAnnotations(root, annotations);

  // ✅ 생성 즉시 저장
  persistAnnotations();

  return annotation;
}

/* ===============================
 * Annotation 삭제
 * =============================== */
export function deleteAnnotation(root: HTMLElement, id: string) {
  annotations = removeAnnotationById(annotations, id);
  renderAnnotations(root, annotations);

  // ✅ 삭제 즉시 저장
  persistAnnotations();
}

/* ===============================
 * 조회
 * =============================== */
export function getAnnotations() {
  return annotations;
}

/* ===============================
 * 🔐 저장 (store)
 * =============================== */
export function persistAnnotations() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(annotations)
    );
  } catch (e) {
    console.error("annotation 저장 실패", e);
  }
}

/* ===============================
 * 🔄 복원 (restore)
 * =============================== */
export function restoreAnnotations(root: HTMLElement) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const saved: Annotation[] = JSON.parse(raw);
    if (!Array.isArray(saved)) return;

    annotations = saved;

    // 🔥 DOM 텍스트가 준비된 이후 호출돼야 함
    renderAnnotations(root, annotations);
  } catch (e) {
    console.error("annotation 복원 실패", e);
  }
}

/* ===============================
 * (선택) 전체 초기화
 * =============================== */
export function clearAnnotations(root: HTMLElement) {
  annotations = [];
  localStorage.removeItem(STORAGE_KEY);
  renderAnnotations(root, annotations);
}
