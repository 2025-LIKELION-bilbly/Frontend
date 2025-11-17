import { useState } from "react";
import * as S from "./Step1NamePage.styles";
import NextBtn from "../../components/NextBtn";

const Step1NamePage = () => {
    const [name, setName] = useState("");

    const isValid = name.length >= 1 && name.length <= 15;
    const isInvalid = name.length > 0 && !isValid;
    const buttonState = name.length === 0 ? "default" : isValid ? "valid" : "invalid";

    const handleNext = () => {
        if (!isValid) return;
        console.log("다음 스텝으로 이동", name);
        // navigate("/meeting/create/step2");
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.MainBox1>
                    <S.StepText>1/4</S.StepText>

                    <S.Title>모임이름을 정해주세요</S.Title>
                    <S.SubTitle>모임이름을 정해주세요</S.SubTitle>
                </S.MainBox1>

                <S.MainBox2>
                    <S.InputWrapper>

                        <S.InputField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="모임이름을 입력해 주세요"
                        $isInvalid={isInvalid}
                        />

                        <S.Desc $isInvalid={isInvalid}>
                        최대 15자까지만 입력 가능해요
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

export default Step1NamePage;
