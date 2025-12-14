import * as S from "./WarningModal.styles";
import { useState } from "react";
import NextBtn from "../../../components/NextBtn";

type Props = {
    onClose: () => void;
};

const WarningModal = ({ onClose }: Props) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const handleConfirm = () => {
        if (dontShowAgain) {
            localStorage.setItem("hideReadingWarning", "true");
        }
        onClose();
    };

    return (
        <S.Backdrop onClick={(e) => e.stopPropagation()}>
            <S.Sheet>
                <S.MainBox>
                    <S.Title>책을 읽기 전 <br/> 잠시 확인해주세요</S.Title>
                    <S.Subtitle>모두가 편안하게 읽고 쓸 수 있도록<br/>
                    타인에게 불쾌감을 줄 수 있는 표현은 피해주세요.</S.Subtitle>


                    <S.CheckArea>
                    <input
                        type="checkbox"
                        checked={dontShowAgain}
                        onChange={(e) => setDontShowAgain(e.target.checked)}
                    />
                    <label>다시 표시하지 않음</label>
                    </S.CheckArea>
                </S.MainBox>


                <NextBtn label="확인" onClick={handleConfirm} />
            </S.Sheet>
        </S.Backdrop>
    );
};

export default WarningModal;
