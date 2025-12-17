import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MeetingJoinCodePage.styles";
import NextBtn from "../../../../components/NextBtn";
import CodeInput from "../../components/CodeInputBox";
import CodeErrorToast from "../../components/meeting-join/CodeErrorToast";
import JoinConfirmModal from "../../components/meeting-join/JoinConfirmModal";
import JoinFullModal from "../../components/meeting-join/JoinFullModal";

import { validateInviteCode } from "../../../../api/group.api";
import { backendToBgKey, type BgKey } from "../../../../styles/ColorUtils";

type Member = {
  nickname: string;
  color: BgKey;
};

const MeetingJoinCodePage = () => {
  const navigate = useNavigate();

  // 🔹 로컬 state
  const [inviteCode, setInviteCode] = useState("");
  const trimmedCode = inviteCode.replace(/\s/g, "");
  const isValid = trimmedCode.length === 4;

  const [loading, setLoading] = useState(false);
  const [errorToastVisible, setErrorToastVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);

  const [members, setMembers] = useState<Member[]>([]);
  const [groupId, setGroupId] = useState<number>(0);
  
  const [groupName, setGroupName] = useState("");


  // 코드 검증
  const handleNext = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);

      const res = await validateInviteCode(trimmedCode);
      const { groupId, groupName, members: serverMembers } = res;

      const mappedMembers: Member[] = serverMembers.map((m) => ({
        nickname: m.nickname,
        color: backendToBgKey(m.color),
      }));

      // 🚫 모임 인원 초과
      if (mappedMembers.length >= 8) {
        setGroupName(groupName);
        setMembers(mappedMembers);
        setShowFullModal(true);
        return;
      }

      // ✅ 정상
      setGroupId(groupId);
      setGroupName(groupName);
      setMembers(mappedMembers);
      setShowConfirmModal(true);
    } catch {
      setErrorToastVisible(true);
    } finally {
      setLoading(false);
    }
  };

  /* =====================
   * 참여 확정
   * ===================== */
  const handleConfirmJoin = () => {
    if (!groupId) return;

    navigate(`/meeting/join/${trimmedCode}/2`, {
      state: {
        groupId,
        groupName,
        members,
        usedColors: members.map((m) => m.color),
      },
    });
  };

  return (
    <>
      <S.Container>
        <S.MainContainer>
          <S.MainBox1>
            <S.StepText>1/3</S.StepText>
            <S.Title>참여코드를 입력해 주세요</S.Title>
            <S.Subtitle>참여할 모임의 코드를 입력해주세요</S.Subtitle>
          </S.MainBox1>

          <CodeInput
            value={inviteCode}
            onChange={setInviteCode}
            readOnly={false}
          />
        </S.MainContainer>

        <S.BottomArea>
          <NextBtn
            label="다음으로"
            state={isValid && !loading ? "valid" : "invalid"}
            onClick={handleNext}
          />
        </S.BottomArea>
      </S.Container>

      {errorToastVisible && (
        <CodeErrorToast
          duration={1500}
          onClose={() => setErrorToastVisible(false)}
        />
      )}

      {showConfirmModal && (
        <JoinConfirmModal
          meetingName={groupName}
          members={members}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmJoin}
        />
      )}

      {showFullModal && (
        <JoinFullModal
          meetingName={groupName}
          members={members}
          onClose={() => setShowFullModal(false)}
        />
      )}
    </>
  );
};

export default MeetingJoinCodePage;
