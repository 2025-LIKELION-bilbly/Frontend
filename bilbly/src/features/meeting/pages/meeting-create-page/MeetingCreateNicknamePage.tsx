import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MeetingCreateNicknamePage.styles";
import NextBtn from "../../components/NextBtn";
import NicknameInputBox from "../../components/meeting-create/NicknameInputBox";

const Step3NicknamePage = () => {
    const navigate = useNavigate();
    const [nickname, setName] = useState("");

    const isValid = nickname.length >= 1 && nickname.length <= 8;
    const isInvalid = nickname.length > 0 && !isValid;
    const buttonState = nickname.length === 0 ? "default" : isValid ? "valid" : "invalid";

    const handleNext = () => {
        console.log("meeting-nickname: ", nickname)
        if (buttonState !== "valid") return;  // 조건 불만족하면 이동 막기
        navigate("/meeting/create/4");
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.MainBox1>
                    <S.StepText>3/4</S.StepText>

                    <S.Title>사용할 닉네임을 설정해 주세요</S.Title>
                    <S.SubTitle>모임별로 다르게 지정할 수 있어요<br/>한 번 설정하면 바꿀 수 없어요</S.SubTitle>
                </S.MainBox1>

                <S.MainBox2>
                    <NicknameInputBox
                        value={nickname}
                        onChange={(value) => setName(value)}
                        isInvalid={isInvalid}
                    />
                </S.MainBox2>
            </S.MainContainer>

                <S.BottomArea>
                    <NextBtn label="다음으로" state={buttonState} onClick={handleNext} />
                </S.BottomArea>
        </S.Container>
    );
};

export default Step3NicknamePage;
