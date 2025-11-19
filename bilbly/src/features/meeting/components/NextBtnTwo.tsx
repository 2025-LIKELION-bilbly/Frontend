// src/components/common/TwoButtons.tsx
import * as S from "./NextBtnTwo.styles";

type Props = {
    leftLabel: string;
    rightLabel: string;
    onLeftClick: () => void;
    onRightClick: () => void;
}; 

const NextBtnTwo = ({
    leftLabel,
    rightLabel,
    onLeftClick,
    onRightClick,
    }: Props) => {
    return (
        <S.Container>
            <S.LeftButton onClick={onLeftClick}>
                {leftLabel}
            </S.LeftButton>

            <S.RightButton onClick={onRightClick}>
                {rightLabel}
            </S.RightButton>
        </S.Container>
    );
};

export default NextBtnTwo;
