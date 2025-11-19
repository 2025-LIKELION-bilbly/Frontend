import { useEffect } from "react";
import * as S from "./CodeCopyToast.styles";

type ToastProps = {
    onClose: () => void;
    duration?: number; //ms
};

const CodeCopyToast = ({duration = 2000, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
        onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <S.ToastContainer>
            <S.ToastBox>
                <S.CheckIcon></S.CheckIcon>
                <S.MessageBox>
                    <S.Message>코드를 복사했어요 </S.Message>
                    <S.SubMessage>참여 코드를 붙여넣어 보세요</S.SubMessage>
                </S.MessageBox>
            </S.ToastBox>
        </S.ToastContainer>
    );
};

export default CodeCopyToast;
