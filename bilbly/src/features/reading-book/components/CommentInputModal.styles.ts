import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.div`
  width: 320px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  resize: none;
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 1.6;
`;
