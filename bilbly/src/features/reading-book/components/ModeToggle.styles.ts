import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  background: #000;
  padding: 4px;
  border-radius: 24px;
  gap: 4px;
`;

export const Button = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  color: ${({ $active }) => ($active ? "#000" : "#fff")};
  font-size: 14px;
`;
