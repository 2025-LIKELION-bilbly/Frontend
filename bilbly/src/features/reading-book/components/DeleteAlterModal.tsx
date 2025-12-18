import * as S from "./DeleteAlterModal.styles";
import NextBtn from "../../../components/NextBtn";

type BlockedType = "highlight" | "comment" | "memo";

type Props = {
    type: BlockedType;
    onConfirm: () => void;
};

const BLOCKED_MESSAGE_MAP: Record<BlockedType, string> = {
    highlight: "다른 사용자의 코멘트가 달린\n형광펜은 삭제할 수 없어요",
    comment: "다른 사용자의 코멘트는\n삭제할 수 없어요",
    memo: "다른 사용자의 메모는\n삭제할 수 없어요",
};

const DeleteAlertModal = ({ type, onConfirm }: Props) => {
    return (
        <S.Backdrop>
        <S.Sheet>
            <S.MainBox>
            <S.Subtitle>
                {BLOCKED_MESSAGE_MAP[type]}
            </S.Subtitle>
            </S.MainBox>

            <NextBtn label="확인" onClick={onConfirm} />
        </S.Sheet>
        </S.Backdrop>
    );
};

export default DeleteAlertModal;
