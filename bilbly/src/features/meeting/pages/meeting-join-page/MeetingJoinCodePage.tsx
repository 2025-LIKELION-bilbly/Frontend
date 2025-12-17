import { useState } from "react";
import * as S from "./MeetingJoinCodePage.styles";
import NextBtn from "../../../../components/NextBtn";
import CodeInput from "../../components/CodeInputBox";
import CodeErrorToast from "../../components/meeting-join/CodeErrorToast";
import JoinConfirmModal from "../../components/meeting-join/JoinConfirmModal";
import JoinFullModal from "../../components/meeting-join/JoinFullModal";

import { validateInviteCode } from "../../../../api/group.api";
import { backendToBgKey, type BgKey } from "../../../../styles/ColorUtils";

/* =====================
 * Types
 * ===================== */

type Member = {
  nickname: string;
  color: BgKey;
};

type Props = {
  inviteCode: string;
  setInviteCode: (v: string) => void;
  setGroupId: (id: number) => void;
  setGroupName: (name: string) => void;
  setUsedColors: (colors: BgKey[]) => void;
  onNext: () => void;
};

/* =====================
 * Component
 * ===================== */

const MeetingJoinCodePage = ({
  inviteCode,
  setInviteCode,
  setGroupId,
  setGroupName,
  setUsedColors,
  onNext,
}: Props) => {
  const trimmedCode = inviteCode.replace(/\s/g, "");
  const isValid = trimmedCode.length === 4;

  const [loading, setLoading] = useState(false);
  const [errorToastVisible, setErrorToastVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFullModal, setShowFullModal] = useState(false);

  const [members, setMembers] = useState<Member[]>([]);
  const [meetingName, setMeetingName] = useState("");

  /* =====================
   * 초대 코드 검증
   * ===================== */
  const handleNext = async () => {
    if (!isValid || loading) return;

    try {
      setLoading(true);

      const res = await validateInviteCode(trimmedCode);

      const { groupId, groupName, members: serverMembers } = res;

      // 🔁 backend color → BgKey 변환
      const mappedMembers: Member[] = serverMembers.map((m) => ({
        nickname: m.nickname,
        color: backendToBgKey(m.color),
      }));

      // 🚫 모임 인원 초과
      if (mappedMembers.length >= 8) {
        setMeetingName(groupName);
        setMembers(mappedMembers);
        setShowFullModal(true);
        return;
      }

      // ✅ 정상
      setGroupId(groupId);
      setGroupName(groupName);
      setMembers(mappedMembers);
      setUsedColors(mappedMembers.map((m) => m.color));
      setMeetingName(groupName);
      setShowConfirmModal(true);
    } catch {
      setErrorToastVisible(true);
    } finally {
      setLoading(false);
    }
  };

  /* =====================
   * 모달에서 참여 확정
   * ===================== */
  const handleConfirmJoin = () => {
    setShowConfirmModal(false);
    onNext();
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

      {/* ❌ 코드 오류 */}
      {errorToastVisible && (
        <CodeErrorToast
          duration={1500}
          onClose={() => setErrorToastVisible(false)}
        />
      )}

      {/* ✅ 모임 확인 */}
      {showConfirmModal && (
        <JoinConfirmModal
          meetingName={meetingName}
          members={members}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmJoin}
        />
      )}

      {/* 🚫 모임 인원 초과 */}
      {showFullModal && (
        <JoinFullModal
          meetingName={meetingName}
          members={members}
          onClose={() => setShowFullModal(false)}
        />
      )}
    </>
  );
};

export default MeetingJoinCodePage;
