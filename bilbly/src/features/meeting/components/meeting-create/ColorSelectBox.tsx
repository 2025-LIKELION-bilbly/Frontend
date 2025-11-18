// ColorSelectBox.tsx
import * as S from "./ColorSelectBox.styles";

type Props = {
    label: string;
    color: string;        // 박스 배경색
    textColor: string;    // 글자 색상 (새로 추가)
    selected: boolean;
    hasSelected: boolean; // 선택된 항목이 하나라도 있는지
    onClick: () => void;
};

const ColorSelectBox = ({ 
    label, 
    color, 
    textColor, 
    selected, 
    hasSelected, 
    onClick 
}: Props) => {
    return (
        <S.Box $bgColor={color} $selected={selected} onClick={onClick}>
            
            {/* 선택된 경우 체크 표시 */}
            {selected && <S.CheckIcon $color={textColor}/>}

            {/* 선택된 것이 있으면서, 선택된 박스가 아니면 X 표시 */}
            {!selected && hasSelected && <S.UncheckIcon $color={textColor} />}

            {/* 전역 테마 색상 사용 */}
            <S.Label $color={textColor}>{label}</S.Label>
        </S.Box>
    );
};

export default ColorSelectBox;
