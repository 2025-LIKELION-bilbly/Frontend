// ReadingBookPage.styles.ts

import styled from "styled-components";
import BackgroundPattern from "../../../assets/background_pattern.png";

export const Container = styled.div`
  position: relative;
  overflow: hidden; 
  width: 100%;
  max-width: 393px;
  background-color: #fffcf8;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 16px;
  position: relative;
  z-index: 0;
  user-select: text;
    overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(${BackgroundPattern});
    background-repeat: repeat;
    opacity: 0.1;
    mix-blend-mode: multiply;
    z-index: -1;
  }

  /* ===============================
   * Annotation
   * =============================== */

.annotation {
  position: relative; /* 기준점 */
}

.inline-comment-anchor {
  position: absolute;
  top: 60%;      /* ❗ 레이아웃 영향 제거 */
  pointer-events: auto;
  left: 20%;
}

.inline-comment {
  display: inline-block;
  font-size: 14px;
  position: absolute;
  color: #444;
  white-space: nowrap;

  /* 선택사항 */
  background: transparent;
}




`;

export const ToggleWrapper = styled.div<{ $showUI: boolean }>`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: ${({ $showUI }) => ($showUI ? "100px" : "24px")};
  transition: bottom 0.25s ease;
  z-index: 20;
`;

export const ContentBox = styled.div`
  padding-top: 60px;
  padding-bottom: 100px;
  padding-left: 20px;
  padding-right: 20px;

  font-family: "Pretendard", sans-serif;
  font-size: 16px;
  line-height: 30px;
  color: #222;

  height: 599px;
  overflow: hidden;

  position: relative;
  z-index: 1;

  text-align: justify;
  text-justify: inter-character;
  letter-spacing: -0.02em;

  user-select: text;
`;

export const TextWrapper = styled.div`
  width: 100%;
  user-select: text;
`;
export const InlineCommentBlock = styled.div`
  // sdsd
`;

export const InlineComment = styled.div`
  font-size: 13px;
  color: #b00020;
  background: #fff5f5;
  padding: 6px 10px;
  border-left: 3px solid #b00020;
  border-radius: 4px;
  cursor: pointer;
`;
