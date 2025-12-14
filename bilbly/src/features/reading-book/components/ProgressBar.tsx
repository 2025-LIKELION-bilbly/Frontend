import * as S from "./ProgressBar.styles";

type Props = {
    percent: number;
    onDragPercent?: (value: number) => void;
};

const ProgressBar = ({ percent, onDragPercent }: Props) => {
    // 드래그 이벤트 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        onDragPercent?.(value);
    };

    return (
        <S.Wrapper onClick={(e) => e.stopPropagation()}>
    

            <S.BarContainer>
                <S.Track />
                <S.Fill style={{ width: `${percent}%` }} />
                <S.RangeInput 
                    type="range"
                    min={0}
                    max={100}
                    value={percent}
                    onChange={handleChange}
                />
            </S.BarContainer>

            <S.PercentText>{percent}%</S.PercentText>
        </S.Wrapper>
    );
};

export default ProgressBar;
