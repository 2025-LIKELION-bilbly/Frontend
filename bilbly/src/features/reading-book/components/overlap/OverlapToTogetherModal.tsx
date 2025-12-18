import { useEffect } from "react";
import * as S from "./OverlapToTogetherModal.styles";
// import type { HighlightRange } from "../../../../utils/highlightOverlap";

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

const OverlapToTogetherModal = ({
    onConfirm,
    onCancel,
    }: Props) => {
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onCancel();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onCancel]);

    return (
        <S.Overlay onClick={onCancel}>
        <S.Modal onClick={(e) => e.stopPropagation()}>
            <S.Title>이미 표시된 구간이에요</S.Title>

            <S.Desc>
            이 문장은 이미 표시되었어요.
            <br />
            같이 보기로 전환해서 코멘트를 남겨볼까요?
            </S.Desc>

            <S.ButtonRow>
            <S.CancelButton onClick={onCancel}>취소</S.CancelButton>
            <S.ConfirmButton onClick={onConfirm}>
                같이 보기로 전환
            </S.ConfirmButton>
            </S.ButtonRow>
        </S.Modal>
        </S.Overlay>
    );
};

export default OverlapToTogetherModal;
