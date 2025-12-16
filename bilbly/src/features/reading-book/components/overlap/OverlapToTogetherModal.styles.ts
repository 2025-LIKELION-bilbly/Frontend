import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  width: 320px;
  background: #fffaf3;
  border: 2px solid #111;
  padding: 24px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
`;

export const Desc = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;

  b {
    color: #c93b4d;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 40px;
  border: 1px solid #111;
  background: #fff;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: 40px;
  background: #111;
  color: #fff;
  cursor: pointer;
`;
