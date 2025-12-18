import NextBtn from "../../../components/NextBtn";
import NextBtnTwo from "../../../components/NextBtnTwo";
import * as S from "./DeleteConfirmModal.styles";

type DeleteTargetType = "highlight" | "comment" | "memo";

type Props =
    | {
        type: DeleteTargetType;
        blocked?: false;
        onCancel: () => void;   
        onConfirm: () => void;
        }
    | {
        type: DeleteTargetType;
        blocked: true;
        onConfirm: () => void;  // cancel 없음
        };


const TITLE_MAP: Record<DeleteTargetType, string> = {
    highlight: "형광펜을\n삭제하시겠어요?",
    comment: "코멘트를\n삭제하시겠어요?",
    memo: "메모를\n삭제하시겠어요?",
};

const MESSAGE_MAP: Record<DeleteTargetType, string> = {
    highlight: "삭제된 형광펜은 복구할 수 없어요",
    comment: "삭제된 코멘트는 복구할 수 없어요",
    memo: "삭제된 메모는 복구할 수 없어요",
};

const BLOCKED_MESSAGE_MAP: Record<DeleteTargetType, string> = {
    highlight: "다른 사람이 남긴 코멘트가 있어\n형광펜을 삭제할 수 없어요",
    comment: "다른 사람이 남긴 답글이 있어\n코멘트를 삭제할 수 없어요",
    memo: "다른 사람이 남긴 노트가 있어\n메모를 삭제할 수 없어요",
};

const DeleteConfirmModal = (props: Props) => {
    const { type, onConfirm } = props;

    if (props.blocked) {
        // 🔒 blocked === true
        return (
        <S.Backdrop>
            <S.Sheet>
            <S.MainBox>
                <S.Title>{TITLE_MAP[type]}</S.Title>
                <S.Subtitle>{BLOCKED_MESSAGE_MAP[type]}</S.Subtitle>
            </S.MainBox>

            <NextBtn label="확인" onClick={onConfirm} />
            </S.Sheet>
        </S.Backdrop>
        );
    }

    // 🔓 여기서는 TS가 확신함:
    // props = { blocked?: false; onCancel: () => void; ... }
    const { onCancel } = props;

    return (
        <S.Backdrop>
        <S.Sheet>
            <S.MainBox>
            <S.Title>{TITLE_MAP[type]}</S.Title>
            <S.Subtitle>{MESSAGE_MAP[type]}</S.Subtitle>
            </S.MainBox>

            <NextBtnTwo
            leftLabel="취소"
            rightLabel="확인"
            onLeftClick={onCancel}
            onRightClick={onConfirm}
            />
        </S.Sheet>
        </S.Backdrop>
    );
};



export default DeleteConfirmModal;
