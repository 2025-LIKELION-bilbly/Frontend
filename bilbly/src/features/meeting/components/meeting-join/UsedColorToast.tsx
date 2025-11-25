import { useEffect } from "react";
import * as S from "./UsedColorToast.styles";

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
                    <S.Message>이미 다른 모임원이 선택했어요 </S.Message>
                    <S.SubMessage>다른 색을 선택해 주세요</S.SubMessage>
                </S.MessageBox>
            </S.ToastBox>
        </S.ToastContainer>
    );
};

export default CodeErrorToast;
