import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Step3NicknamePage.styles";
import NextBtn from "../../components/NextBtn";

const Step3NicknamePage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const isValid = name.length >= 1 && name.length <= 8;
    const isInvalid = name.length > 0 && !isValid;
    const buttonState = name.length === 0 ? "default" : isValid ? "valid" : "invalid";

    const handleNext = () => {
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
                    <S.InputWrapper>

                        <S.InputField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="닉네임을 입력해 주세요"
                        $isInvalid={isInvalid}
                        />

                        <S.Desc $isInvalid={isInvalid}>
                        최대 8자까지 입력 가능해요
                        </S.Desc>
                    </S.InputWrapper>
                </S.MainBox2>
            </S.MainContainer>

                <S.BottomArea>
                    <NextBtn label="다음으로" state={buttonState} onClick={handleNext} />
                </S.BottomArea>
        </S.Container>
    );
};

export default Step3NicknamePage;
