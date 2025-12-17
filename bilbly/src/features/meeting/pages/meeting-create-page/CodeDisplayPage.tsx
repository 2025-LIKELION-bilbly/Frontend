import { useEffect, useState } from "react";
import * as S from "./CodeDisplayPage.styles";
import NextBtn from "../../../../components/NextBtn";
import CodeInput from "../../components/CodeInputBox";
import CodeCopyToast from "../../components/meeting-create/CodeCopyToast";

import { createGroup } from "../../../../api/group.api";
import { toBackendColor } from "../../../../styles/ColorUtils";
import type { BgKey } from "../../../../styles/ColorUtils";

type CodeDisplayProps = {
  groupName: string;
  readingPeriod: number;
  nickname: string;
  color: BgKey;
  onNext: () => void;
};

const CodeDisplayPage = ({
  groupName,
  readingPeriod,
  nickname,
  color,
  onNext,
}: CodeDisplayProps) => {
  const [inviteCode, setInviteCode] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  //const hasCreatedRef = useRef(false);

  // 만료일
  const getExpireDateText = (days: number) => {
    const now = new Date();
    const expireDate = new Date(now);
    expireDate.setDate(now.getDate() + days);

    const year = expireDate.getFullYear();
    const month = String(expireDate.getMonth() + 1).padStart(2, "0");
    const day = String(expireDate.getDate()).padStart(2, "0");

    return `~${year}.${month}.${day}`;
  };




useEffect(() => {
  if (inviteCode) return; // ⭐ 이미 생성됨 → 절대 다시 호출 안 함

  const create = async () => {
    try {
      console.log("보내는 payload:", {
        groupName,
        readingPeriod,
        nickname,
        color: toBackendColor(color),
      });

      const res = await createGroup({
        groupName,
        readingPeriod,
        nickname,
        color: toBackendColor(color),
      });

      console.log("응답:", res);
      setInviteCode(res.inviteCode);
    } catch (e) {
      console.error("모임 생성 실패", e);
    } finally {
      setLoading(false);
    }
  };

  create();
},  [groupName, readingPeriod, nickname, color, inviteCode]); // ⭐ 이것만!


  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setToastVisible(true);
  };

  const handleNext = () => {
    onNext();
  };

  if (loading) {
    return <div>모임을 생성 중이에요...</div>;
  }

  return (
    <>
      <S.Container>
        <S.MainContainer>
          <S.MainBox1>
            <S.Confetti />
            <S.Title>환영합니다!</S.Title>
            <S.Subtitle>
              코드를 복사해 모임원을 초대하세요
              <br />
              코드는 7일 동안 유효해요
            </S.Subtitle>
          </S.MainBox1>

          <S.DateText>{getExpireDateText(readingPeriod)}</S.DateText>

          {inviteCode && (
            <CodeInput
              readOnly
              value={inviteCode}
              length={inviteCode.length}
            />
          )}




          <S.CopyButton onClick={handleCopy}>
            코드 복사하기
          </S.CopyButton>
        </S.MainContainer>

        <S.BottomArea>
          <NextBtn label="다음으로" state="valid" onClick={handleNext} />
        </S.BottomArea>
      </S.Container>

      {toastVisible && (
        <CodeCopyToast
          duration={1200}
          onClose={() => setToastVisible(false)}
        />
      )}
    </>
  );
};

export default CodeDisplayPage;
