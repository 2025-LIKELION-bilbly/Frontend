import type { Annotation } from "../annotation/annotation.core";

/**
 * 🔥 다른 사용자 annotation mock (겹침 테스트용)
 */
export const otherUserAnnotationsMock: Annotation[] = [
  {
    id: "other-1",
    type: "highlight",
    text: "책 내용이 들어가는",
    page: 1,
    isMine: false,
    range: { start: 10, end: 20 },
    color: "#FFD54F",
  },
  {
    id: "other-2",
    type: "highlight",
    text: "내용이 들어",
    page: 0,
    isMine: false,
    range: { start: 40, end: 60 },
    color: "#FFECB3",
  },
  {
    id: "other-3",
    type: "memo",
    text: "전혀 안 겹침",
    page: 0,
    isMine: false,
    range: { start: 40, end: 50 },
    color: "#FFF9C4",
  },
];
