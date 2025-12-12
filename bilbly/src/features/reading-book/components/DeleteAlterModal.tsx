import * as S from "./DeleteAlterModal.styles";
import NextBtn from "../../../components/NextBtn";
import type { AnnotationType } from "../../../utils/annotation.core";

type Props = {
    type: AnnotationType;
    onConfirm: () => void;
};

const BLOCKED_MESSAGE_MAP: Record<AnnotationType, string> = {
    highlight: "다른 코멘트가 달린\n형광펜은 지울 수 없어요",
    quote: "다른 코멘트가 달린\n코멘트는 지울 수 없어요",
    memo: "다른 코멘트가 달린\n메모는 지울 수 없어요",
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
