import { useState } from "react";
import * as S from "./MeetingCreateNicknamePage.styles";
import NextBtn from "../../../../components/NextBtn";
import NicknameInputBox from "../../components/NicknameInputBox";


type MeetingCreateNicknameProps = {
    onNext: () => void;
};

const MeetingCreateNickname = ({ onNext }: MeetingCreateNicknameProps) => {
    const [nickname, setName] = useState("");

    // 특수문자 검사
    const hasSpecialChar = /[~!@#$%";'^,&*()_+|</>=>`?:{[}]/g.test(nickname);

    // 조건 검사: 8자 이하인지 특수문자가 없는지
    const isValid =
        nickname.length >= 1 &&
        nickname.length <= 8 &&
        !hasSpecialChar

    const isInvalid = nickname.length > 0 && !isValid;
    const buttonState = nickname.length === 0 ? "default" : isValid ? "valid" : "invalid";

    const handleNext = () => {
        console.log("meeting-nickname: ", nickname)
        
        if (buttonState !== "valid") return;  // 조건 불만족하면 이동 막기
        onNext(); // 성공하면 이동
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

export default MeetingCreateNickname;
