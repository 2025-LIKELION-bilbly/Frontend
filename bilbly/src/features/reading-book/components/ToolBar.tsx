import * as S from "./ToolBar.styles";

type Props = {
    position: { top: number; left: number } | null;
    onHighlight: () => void;
    onComment?: () => void;
    onMemo?: () => void;
};

const ToolBar = ({ position, onHighlight, onComment, onMemo }: Props) => {
    if (!position) return null;

    return (
        <S.Container style={{ top: position.top, left: position.left }}>
            <S.Highlight onClick={onHighlight}></S.Highlight>
            <S.Comment onClick={onComment}></S.Comment>
            <S.Memo onClick={onMemo}></S.Memo>
        </S.Container>
    );
};

export default ToolBar;
