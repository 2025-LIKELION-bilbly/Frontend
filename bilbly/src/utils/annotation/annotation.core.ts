export type AnnotationType = "highlight" | "quote" | "memo";

export interface TextRange {
  start: number; // document 기준 offset
  end: number;
}

export interface Annotation {
  id: string;
  type: AnnotationType;
  isMine: boolean;
  range: {
    start: number;
    end: number;
  };
  text: string;
  page: number;  

  color?: string;
  content?: string; // quote / memo 내용
  groupId?: string; // 연결용 (ex. highlight ↔ quote)
  parentId?: string;
  comments?: Comment[];
}


/* ==============================
 * Internal helpers
 * ============================== */

const generateUniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

/* ==============================
 * Factory functions (순수)
 * ============================== */

/**
 * Selection으로부터 Annotation 데이터를 생성
 * ⚠️ DOM 변경 없음
 */
export function createAnnotationFromSelection(
  params: {
    type: AnnotationType;
    text: string;
    range: TextRange;
    page: number; 
    color?: string;
    content?: string;
  }
): Annotation {
  const id = `${params.type[0]}-${generateUniqueId()}`;

  return {
    id,
    type: params.type,
    isMine: true, 
    text: params.text,
    range: params.range,
    page: params.page,  
    color: params.color,
    content: params.content,
    groupId: id,
  };
}

/* ==============================
 * State utilities
 * ============================== */

/**
 * Annotation 삭제 시 range 병합 등에 사용 가능
 */
export function removeAnnotationById(
  annotations: Annotation[],
  id: string
): Annotation[] {
  return annotations.filter(a => a.id !== id);
}

/**
 * Annotation 추가
 */
export function addAnnotation(
  annotations: Annotation[],
  next: Annotation
): Annotation[] {
  return [...annotations, next];
}

/**
 * 특정 groupId 기준으로 묶기
 */
export function getAnnotationsByGroup(
  annotations: Annotation[],
  groupId: string
): Annotation[] {
  return annotations.filter(a => a.groupId === groupId);
}

/* ==============================
 * Validation
 * ============================== */

export function isValidRange(range: TextRange): boolean {
  return range.start >= 0 && range.end > range.start;
}



export interface Comment {
  id: string;
  content: string;
  isMine: boolean;
}

export interface Annotation {
  id: string;
  type: AnnotationType;
  isMine: boolean;
  range: {
    start: number;
    end: number;
  };
  text: string;
  page: number;
  color?: string;
  comments?: Comment[]; // ✅ 추가
}
