import NextBtn from "../../../components/NextBtn";
import NextBtnTwo from "../../../components/NextBtnTwo";
import * as S from "./DeleteHighlightModal.styles";

type Props = {
    type: "highlight" | "quote" | "memo";
    blocked?: boolean;
    onCancel?: () => void;
    onConfirm: () => void;
};

type AnnotationType = "highlight" | "quote" | "memo";

const TITLE_MAP: Record<AnnotationType, string> = {
    highlight: "형광펜을 \n 삭제하실건가요?",
    quote: "코멘트를 \n 삭제하실건가요?",
    memo: "메모를 \n삭제하실건가요?",
};

const BLOCKED_MESSAGE_MAP: Record<AnnotationType, string> = {
    highlight: "삭제된 형광펜은 복구할 수 없습니다",
    quote: "저장하지 않은 코멘트는 삭제돼요",
    memo: "저장하지 않은 코멘트는 삭제돼요",
};


const DeleteHighlightModal = ({
    type,
    blocked = false,
    onCancel,
    onConfirm,
}: Props) => {
    return (
        <S.Backdrop>
            <S.Sheet>
                <S.MainBox>
                        <>
                            <S.Title>{TITLE_MAP[type]}</S.Title>
                            <S.Subtitle>{BLOCKED_MESSAGE_MAP[type]}</S.Subtitle>
                        </>
                </S.MainBox>

                {blocked ? (
                    <NextBtn label="확인" onClick={onConfirm} />
                ) : (
                    <NextBtnTwo
                        leftLabel="취소"
                        rightLabel="확인"
                        onLeftClick={onCancel!}
                        onRightClick={onConfirm}
                    />
                )}
            </S.Sheet>
        </S.Backdrop>
    );
};

export default DeleteHighlightModal;
