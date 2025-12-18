import type { Annotation } from "../annotation/annotation.core";

/**
 * 🔥 다른 사용자 annotation mock (겹침 테스트용)
 */
export const otherUserAnnotationsMock: Annotation[] = [
  {
    id: "other-1",
    type: "highlight",
    text: "there was a human being with",
    page: 1,
    isMine: false,
    range: { start: 50, end: 80 },
    color: "#C5DDF3",
  },
  {
    id: "other-2",
    type: "highlight",
    text: "night the ice broke a",
    page: 0,
    isMine: false,
    range: { start: 79, end: 100 },
    color: "#E6D5C9",
  },
  {
    id: "other-3",
    type: "highlight",
    text: "arge loose masses which float about after the breaking up of the ice. I profited of this time to",
    page: 0,
    isMine: false,
    range: { start: 200, end: 300 },
    color: "#CDF1CD",
  },
];
