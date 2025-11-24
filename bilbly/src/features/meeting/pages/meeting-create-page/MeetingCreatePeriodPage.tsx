import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MeetingCreatePeriodPage.styles";
import NextBtn from "../../components/NextBtn";



const Step1NamePage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");

    const period = Number(name);

    const isValid = period >= 7 && period <= 60;
    const isInvalid = name.length > 0 && !isValid;
    const buttonState = name.length === 0 ? "default" : isValid ? "valid" : "invalid";


    const handleNext = () => {
        console.log("period: ", period);
        
        if (buttonState !== "valid") return;  // 조건 불만족하면 이동 막기
        navigate("/meeting/create/3");
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.MainBox1>
                    <S.StepText>2/4</S.StepText>

                    <S.Title>독서 기간을 정해주세요</S.Title>
                    <S.SubTitle>언제를 주기로 교환할까요?</S.SubTitle>
                </S.MainBox1>

                <S.MainBox2>
                    <S.InputWrapper>
                        <S.InputField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="기간을 입력해 주세요"
                        $isInvalid={isInvalid}
                        />

                        <S.Desc $isInvalid={isInvalid}>
                        7~60일 사이 설정 가능해요
                        </S.Desc>
                    </S.InputWrapper>
                    <S.DateLabel>일</S.DateLabel>
                </S.MainBox2>
            </S.MainContainer>

                <S.BottomArea>
                    <NextBtn label="다음으로" state={buttonState} onClick={handleNext} />
                </S.BottomArea>
        </S.Container>
    );
};

export default Step1NamePage;
