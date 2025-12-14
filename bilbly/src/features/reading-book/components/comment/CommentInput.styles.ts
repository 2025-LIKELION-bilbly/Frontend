import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 12px;
`;

export const InputArea = styled.textarea`
  width: 100%;
  min-height: 60px;
  resize: none;
  border: none;
  border-bottom: 2px solid #111;
  background: transparent;
  font-size: 14px;
  padding: 6px 2px;
  outline: none;

  &::placeholder {
    color: #777;
  }
`;
