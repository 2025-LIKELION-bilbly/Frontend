import * as S from "./ColorSelectBox.styles";

type Props = {
    label: string;
    color: string;
    textColor: string;
    selected: boolean;
    hasSelected: boolean;   
    isUsed?: boolean;
    onClick: () => void;
};

const ColorSelectBox = ({
    label,
    color,
    textColor,
    selected,
    isUsed = false,
    hasSelected, 
    onClick
}: Props) => {
    return (
        <S.Box
            $bgColor={color}
            $selected={selected}
            $disabled={isUsed}
            onClick={onClick}
        >
            {/* 선택된 색이면 체크 아이콘 */}
            {selected && <S.CheckIcon $color={textColor} />}

            {/* 이미 다른 멤버가 사용 중이면 X 아이콘 */}
            {isUsed && !selected && <S.UncheckIcon $color={textColor} />}

            <S.Label $color={textColor}>{label}</S.Label>
        </S.Box>
    );
};

export default ColorSelectBox;
