import { useRef, useEffect } from "react";
import * as S from "./CodeInputBox.styles";

type Props = {
  length?: number; // 기본 4자리
  value?: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
};

const CodeInputBox = ({
  length = 4,
  value = "",
  onChange,
  readOnly = false,
}: Props) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // 항상 안전한 기준 문자열
  const safeValue = value.padEnd(length, " ");

  /* 숫자 입력 처리 */
  const handleChange = (idx: number, digit: string) => {
    if (readOnly) return;
    if (!/^\d?$/.test(digit)) return;

    const newValue =
      safeValue.substring(0, idx) +
      digit +
      safeValue.substring(idx + 1);

    onChange?.(newValue);

    if (digit && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  /* 백스페이스 처리 */
  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (readOnly) return;

    if (e.key === "Backspace") {
      e.preventDefault();

      const newValue =
        safeValue.substring(0, idx) +
        " " +
        safeValue.substring(idx + 1);

      onChange?.(newValue);

      requestAnimationFrame(() => {
        if (idx > 0) {
          inputsRef.current[idx - 1]?.focus();
        }
      });
    }
  };

  /* value 변경 시 첫 빈칸으로 포커스 이동 */
  useEffect(() => {
    const firstEmpty = safeValue.indexOf(" ");
    if (firstEmpty !== -1) {
      inputsRef.current[firstEmpty]?.focus();
    }
  }, [safeValue]);

  /* 렌더용 digits */
  const digits = safeValue.split("");

  return (
    <S.Container>
      {digits.map((digit, idx) => (
        <S.Box key={idx}>
          {readOnly ? (
            <S.ReadOnlyDigit>{digit}</S.ReadOnlyDigit>
          ) : (
            <S.Input
              maxLength={1}
              inputMode="numeric"
              value={digit.trim()}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              inputRef={(el) => {inputsRef.current[idx] = el;
              }}
            />
          )}
        </S.Box>
      ))}
    </S.Container>
  );
};

export default CodeInputBox;
