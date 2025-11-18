// ColorSelectBox.tsx
import * as S from "./ColorSelectBox.styles";

type Props = {
    label: string;
    color: string;
    selected: boolean;
    hasSelected: boolean;  // 선택된 항목이 있는지 여부
    onClick: () => void;
};

const ColorSelectBox = ({ label, color, selected, hasSelected, onClick }: Props) => {
    return (
        <S.Box $bgColor={color} $selected={selected} onClick={onClick}>
            {selected && <S.CheckIcon />}        {/* 선택된 경우 체크 */}
            {!selected && hasSelected && <S.UncheckIcon />}  {/* 선택된 항목이 있을 때만 X */}
            <span>{label}</span>
        </S.Box>
    );
};

export default ColorSelectBox;
