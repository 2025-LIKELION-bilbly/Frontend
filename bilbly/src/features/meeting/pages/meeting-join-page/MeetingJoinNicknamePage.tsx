import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as S from "./MeetingJoinNicknamePage.styles";
import NextBtn from "../../../../components/NextBtn";
import NicknameInputBox from "../../components/NicknameInputBox";
import type { BgKey } from "../../../../styles/ColorUtils";

/* =====================
 * Types
 * ===================== */

type Member = {
  nickname: string;
  color: BgKey;
};

type LocationState = {
  groupId: number;
  groupName: string;
  members: Member[];
  usedColors: BgKey[];
};

/* =====================
 * Component
 * ===================== */

const MeetingJoinNickname = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    groupId,
    groupName,
    members = [],
    usedColors = [],
  } = (location.state as LocationState) || {};

  const [nickname, setNickname] = useState("");

  /* =====================
   * 안전 처리: state 없으면 되돌리기
   * ===================== */
  useEffect(() => {
    if (!location.state) {
      navigate(`/meeting/join/${code}/1`, { replace: true });
    }
  }, [location.state, navigate, code]);

  /* =====================
   * Validation
   * ===================== */

  const hasSpecialChar = /[^a-zA-Z0-9가-힣]/g.test(nickname);
  const isLengthValid = nickname.length >= 1 && nickname.length <= 8;
  const isDuplicate = members.some((m) => m.nickname === nickname);

  const isValid =
    isLengthValid &&
    !hasSpecialChar &&
    !isDuplicate;

  const isInvalid = nickname.length > 0 && !isValid;

  const buttonState =
    nickname.length === 0
      ? "default"
      : isValid
      ? "valid"
      : "invalid";

  /* =====================
   * Next
   * ===================== */

  const handleNext = () => {
    if (!isValid) return;

    navigate(`/meeting/join/${code}/3`, {
      state: {
        groupId,
        groupName,
        members,
        usedColors,
        nickname,
      },
    });
  };

  return (
    <S.Container>
      <S.MainContainer>
        <S.MainBox1>
          <S.StepText>2/3</S.StepText>

          <S.Title>사용할 닉네임을 설정해 주세요</S.Title>
          <S.SubTitle>
            모임별로 다르게 지정할 수 있어요
            <br />
            한 번 설정하면 바꿀 수 없어요
          </S.SubTitle>
        </S.MainBox1>

        <S.MainBox2>
          <NicknameInputBox
            value={nickname}
            onChange={setNickname}
            isInvalid={isInvalid}
          />
        </S.MainBox2>
      </S.MainContainer>

      <S.BottomArea>
        <NextBtn
          label="다음으로"
          state={buttonState}
          onClick={handleNext}
        />
      </S.BottomArea>
    </S.Container>
  );
};

export default MeetingJoinNickname;
