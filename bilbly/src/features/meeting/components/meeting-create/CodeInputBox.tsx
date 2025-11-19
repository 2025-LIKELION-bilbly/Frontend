// CodeInput.tsx
import { useRef } from "react";
import * as S from "./CodeInputBox.styles";

type Props = {
    length?: number;               // 기본 4자리
    value: string;
    onChange?: (v: string) => void;
    readOnly?: boolean;
};

const CodeInputBox = ({ length = 4, value, onChange, readOnly = true }: Props) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (idx: number, digit: string) => {
    if (!onChange) return;

    // 숫자만 입력하도록 제한
    if (!/^[0-9]?$/.test(digit)) return;

    // 입력된 숫자를 value의 해당 위치에 반영(해당 자리만 교체)
    const newValue =
      value.substring(0, idx) + digit + value.substring(idx + 1);

    onChange(newValue);

    // 입력 시: 자동으로 다음 칸 자동 이동
    if (digit && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const digits = value.padEnd(length, " ").split("");

  return (
    <S.Container>
      {digits.map((digit, idx) => (
        <S.Box key={idx}>
          {readOnly ? (
            <S.ReadOnlyDigit>{digit}</S.ReadOnlyDigit>   // 숫자 1개
          ) : (
            <S.Input
              maxLength={1}
              value={digit.trim()}
              onChange={(e) => handleChange(idx, e.target.value)}
              ref={(el) => (inputsRef.current[idx] = el)} // 커서: 숫자 입력시 자동으로 다읍 칸 이동, 지웠을 때 자동으로 이전 칸 이동 위함
            />
          )}
        </S.Box>
      ))}
    </S.Container>
  );
};

export default CodeInputBox;
