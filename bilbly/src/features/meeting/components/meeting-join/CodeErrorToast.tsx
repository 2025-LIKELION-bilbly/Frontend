import { useEffect } from "react";
import * as S from "./CodeErrorToast.styles";

type ToastProps = {
    onClose: () => void;
    duration?: number; //ms
};

const CodeErrorToast = ({duration = 2000, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
        onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <S.ToastContainer>
            <S.ToastBox>
                <S.XIcon></S.XIcon>
                <S.MessageBox>
                    <S.Message>해당하는 코드의 모임이 없어요 </S.Message>
                    <S.SubMessage>다시 코드를 입력해 주세요</S.SubMessage>
                </S.MessageBox>
            </S.ToastBox>
        </S.ToastContainer>
    );
};

export default CodeErrorToast;
