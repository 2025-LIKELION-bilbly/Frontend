import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import MeetingJoinCodePage from "./MeetingJoinCodePage";
import  MeetingJoinColor from "./MeetingJoinNicknamePage";
import  MeetingJoinNickname from "./MeetingJoinColorPage";
import SelectBookShowPage from "./SelectBookShowPage"

import type { BgKey } from "../../../../styles/ColorUtils";

const MeetingJoinFlow = () => {
    const { step } = useParams();
    const navigate = useNavigate();
    const stepNumber = Number(step) || 1;

    /* 공통 state  */
    const [inviteCode, setInviteCode] = useState("");
    const [groupId, setGroupId] = useState<number | null>(null);
    const [groupName, setGroupName] = useState("");
    const [nickname, setNickname] = useState("");
    const [color, setColor] = useState<BgKey | null>(null);
    const [usedColors, setUsedColors] = useState<string[]>([]);

    const goNext = () => {
        navigate(`/meeting/join/${stepNumber + 1}`);
    };

    const renderStep = () => {
        switch (stepNumber) {
            case 1:
            return (
            <MeetingJoinCodePage
                inviteCode={inviteCode}
                setInviteCode={setInviteCode}
                setGroupId={setGroupId}
                setGroupName={setGroupName}
                setUsedColors={setUsedColors}
                onNext={goNext}
            />
            );

      /** 2️⃣ 닉네임 입력 */
        case 2:
            return (
            <MeetingJoinNickname
                nickname={nickname}
                setNickname={setNickname}
                onNext={goNext}
            />
            );

      /** 3️⃣ 색상 선택 */
        case 3:
            if (!groupId) return null;

            return (
            <MeetingJoinColor
                color={color}
                setColor={setColor}
                usedColors={usedColors}
                groupId={groupId}
                nickname={nickname}
                onNext={goNext}
            />
            );

      /** 4️⃣ 참여 완료 → 책 선택 */
        case 4:
            return <SelectBookShowPage />;

        default:
            return null;
        }
    };

    return <>{renderStep()}</>;
};

export default MeetingJoinFlow;
