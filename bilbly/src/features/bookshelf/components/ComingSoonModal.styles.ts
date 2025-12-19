import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 260px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 16px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: black;
  color: white;
  font-size: 14px;
  cursor: pointer;
`;
