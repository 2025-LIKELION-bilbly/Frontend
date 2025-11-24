import { useRef, useEffect } from "react";
import * as S from "./CodeInputBox.styles";

type Props = {
  length?: number; // 기본 4자리
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
};

const CodeInputBox = ({ length = 4, value, onChange, readOnly = false }: Props) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // 숫자만 입력 가능 + 포커스 이동 + 삭제 시 이전 이동
  const handleChange = (idx: number, digit: string) => {
    if (readOnly) return;

    // 숫자 1자리만 허용
    if (!/^\d?$/.test(digit)) return;

    const newValue =
      value.substring(0, idx) + digit + value.substring(idx + 1);
      if (onChange) {
        onChange(newValue);
      }

    // 입력된 경우 다음 칸으로 자동 이동
    if (digit && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };


  // 백스페이스 처리(자동으로 입력값이 지워지면서 왼쪽으로 이동)
  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (readOnly) return;

    if (e.key === "Backspace") {
      e.preventDefault();

      // 상태 먼저 업데이트 (현재 칸 비우기)
      const newValue =
        value.substring(0, idx) + " " + value.substring(idx + 1);

      if (onChange) {
        onChange(newValue);
      }

      // 상태 반영 직후에 이전 칸으로 이동시키기 (한 프레임 뒤)
      requestAnimationFrame(() => {
        if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
        }
      });
    }
  };


  // 포커스 자동 이동 보정 (value가 바뀔 때마다)
  useEffect(() => {
    const firstEmpty = value.indexOf(" ");
    if (firstEmpty !== -1) {
      inputsRef.current[firstEmpty]?.focus();
    }
  }, [value]);

  // 최종 digits 배열 생성
  const digits = value.padEnd(length, " ").split("");

  return (
    <S.Container>
      {digits.map((digit, idx) => (
        <S.Box key={idx}>
          {readOnly ? (
            <S.ReadOnlyDigit>{digit}</S.ReadOnlyDigit>
          ) : (
            <S.Input
              maxLength={1}
              value={digit.trim()}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              ref={(el) => (inputsRef.current[idx] = el)}
            />
          )}
        </S.Box>
      ))}
    </S.Container>
  );
};

export default CodeInputBox;
