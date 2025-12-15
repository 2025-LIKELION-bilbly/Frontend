import type { Annotation } from "../annotation/annotation.core";

/**
 * 🔥 다른 사용자 annotation mock
 * - 나중에 API 응답으로 대체될 파일
 */
export const otherUserAnnotationsMock: Annotation[] = [
  {
    id: "other-1",
    type: "highlight",
    text: "자리 책 내용이",
    page: 0,
    isMine: false,
    range: { start: 5, end: 13 },
    color: "#FFD54F",
  },
  {
    id: "other-2",
    type: "highlight",
    text: "책 내용이 들어가는",
    page: 0,
    isMine: false,
    range: { start: 20, end: 32 },
    color: "#FFECB3",
  },
];
