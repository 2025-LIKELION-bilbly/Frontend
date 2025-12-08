import * as S from "./ModeToggle.styles";

type Props = {
    mode: "focus" | "together";
    onChangeMode: (m: "focus" | "together") => void;
};

const ModeToggle = ({ mode, onChangeMode }: Props) => {
    return (
        <S.Wrapper>
        <S.Button
            $active={mode === "focus"}
            onClick={() => onChangeMode("focus")}
        >
            집중하기
        </S.Button>

        <S.Button
            $active={mode === "together"}
            onClick={() => onChangeMode("together")}
        >
            같이보기
        </S.Button>
        </S.Wrapper>
    );
};

export default ModeToggle;
