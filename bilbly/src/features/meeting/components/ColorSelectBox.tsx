// ColorSelectBox.tsx
import * as S from "./ColorSelectBox.styles";

type Props = {
  bgColor: string;
  textColor: string;
  label: string;
  selected: boolean;
  isUsed?: boolean;
  onClick: () => void;
};

const ColorSelectBox = ({
  bgColor,
  textColor,
  label,
  selected,
  isUsed = false,
  onClick,
}: Props) => {
  return (
    <S.Box
      $bgColor={bgColor}
      $selected={selected}
      $disabled={isUsed}
      onClick={onClick}
    >
      {selected && <S.CheckIcon $color={textColor} />}

      <S.Label $color={textColor}>{label}</S.Label>

      {isUsed && !selected && <S.UncheckIcon $color={textColor} />}
    </S.Box>
  );
};

export default ColorSelectBox;
