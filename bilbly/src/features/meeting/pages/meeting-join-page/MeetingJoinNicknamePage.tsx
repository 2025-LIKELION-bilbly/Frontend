import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as S from "./MeetingJoinNicknamePage.styles";
import NextBtn from "../../components/NextBtn";
import NicknameInputBox from "../../components/NicknameInputBox";

const MeetingJoinNickname = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // 👉 CodePage에서 넘어온 데이터 받기
    const { members, meetingName} = location.state || {};

    const [nickname, setName] = useState("");

    // 확인용 console
    console.log("현재 모임 코드: ", code);
    // console.log("넘어온 멤버 정보: ", members);

    // 특수문자 검사
    const hasSpecialChar = /[~!@#$%";'^,&*()_+|</>=>`?:{[}]/g.test(nickname);

    // 1~8글자 && 특수문자 X
    const isValid =
        nickname.length >= 1 &&
        nickname.length <= 8 &&
        !hasSpecialChar;

    const isInvalid = nickname.length > 0 && !isValid;
    const buttonState = nickname.length === 0 ? "default" : isValid ? "valid" : "invalid";

    const handleNext = () => {
        console.log("meeting-nickname: ", nickname);

        if (buttonState !== "valid") return;

        navigate(`/meeting/join/${code}/3`, {
            state: {
                members,       // 다음 페이지로 다시 전달
                meetingName,
                nickname       // 사용자가 입력한 닉네임 전달
            }
        });
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.MainBox1>
                    <S.StepText>2/3</S.StepText>

                    <S.Title>사용할 닉네임을 설정해 주세요</S.Title>
                    <S.SubTitle>
                        모임별로 다르게 지정할 수 있어요<br />한 번 설정하면 바꿀 수 없어요
                    </S.SubTitle>
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

export default MeetingJoinNickname;
