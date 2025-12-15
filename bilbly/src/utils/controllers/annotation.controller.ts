import type { Annotation } from "../annotation/annotation.core";
import {
  createAnnotationFromSelection,
  addAnnotation,
  removeAnnotationById,
} from "../annotation/annotation.core";
import { getTextRangeFromSelection } from "../annotation/selection.adapter";
import { renderAnnotations } from "../annotation/annotation.renderer";

let annotations: Annotation[] = [];

export function createAnnotation(
  root: HTMLElement,
  params: {
    type: "highlight" | "quote" | "memo";
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
  renderAnnotations(root, annotations);

  return annotation;
}

export function deleteAnnotation(root: HTMLElement, id: string) {
  annotations = removeAnnotationById(annotations, id);
  renderAnnotations(root, annotations);
}

export function getAnnotations() {
  return annotations;
}


// annotation.controller.ts

import type { AnnotationType } from "../annotation/annotation.core";

export function resolveCommentAnchor(
  container: HTMLElement,
  activeAnnotation?: { id: string; type: AnnotationType }
): { anchorId: string; created: boolean } | null {
  // 1️⃣ 이미 하이라이트가 선택된 상태
  if (activeAnnotation?.type === "highlight") {
    return {
      anchorId: activeAnnotation.id,
      created: false,
    };
  }

  // 2️⃣ 텍스트만 선택된 상태 → 하이라이트 먼저 생성
  const highlight = createAnnotation(container, {
    type: "highlight",
  });

  if (!highlight) return null;

  return {
    anchorId: highlight.id,
    created: true,
  };
}
