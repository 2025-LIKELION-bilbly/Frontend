import styled from "styled-components";
import CheckSvg from "@/assets/check.svg?react";
import XSvg from "@/assets/x.svg?react";

export const Box = styled.div<{
  $bgColor: string;
  $selected: boolean;
  $disabled: boolean;
}>`
  position: relative;
  width: 80px;
  height: 45px;
  padding: 12px 8px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: 8px;
  cursor: pointer;

  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
`;

export const Label = styled.div<{ $color: string }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ $color }) => $color};
`;

export const CheckIcon = styled(CheckSvg)<{ $color: string }>`
  width: 16px;
  height: 16px;
  stroke: ${({ $color }) => $color};
`;

export const UncheckIcon = styled(XSvg)<{ $color: string }>`
  width: 16px;
  height: 16px;
  stroke: ${({ $color }) => $color};
`;
