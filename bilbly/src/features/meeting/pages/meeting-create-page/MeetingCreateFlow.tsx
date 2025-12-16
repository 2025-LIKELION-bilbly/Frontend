import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

import MeetingCreateGroupName from "./MeetingCreateGroupNamePage";
import MeetingCreatePeriod from "./MeetingCreatePeriodPage";
import MeetingCreateNickname from "./MeetingCreateNicknamePage";
import MeetingCreateColor from "./MeetingCreateColorPage";
import CodeDisplayPage from "./CodeDisplayPage";
import SelectBookIntroPage from "./SelectBookIntroPage";

import type { BgKey } from "../../../../styles/ColorUtils";

const MeetingCreateFlow = () => {
    const { step } = useParams();
    const navigate = useNavigate();

    const stepNumber = Number(step) || 1;

    /* ✅ 공통 state (여기가 핵심) */
    const [groupName, setGroupName] = useState("");
    const [readingPeriod, setReadingPeriod] = useState(14);
    const [nickname, setNickname] = useState("");
    const [color, setColor] = useState<BgKey>("userRose");

    const goNext = () => {
        navigate(`/meeting/create/${stepNumber + 1}`);
    };

    const renderStep = () => {
        switch (stepNumber) {
        case 1:
            return (
            <MeetingCreateGroupName
                groupName={groupName}
                setGroupName={setGroupName}
                onNext={goNext}
            />
            );

        case 2:
            return (
            <MeetingCreatePeriod
                readingPeriod={readingPeriod}
                setReadingPeriod={setReadingPeriod}
                onNext={goNext}
            />
            );

        case 3:
            return (
            <MeetingCreateNickname
                nickname={nickname}
                setNickname={setNickname}
                onNext={goNext}
            />
            );

        case 4:
            return (
            <MeetingCreateColor
                color={color}
                setColor={setColor}
                onNext={goNext}
            />
            );

        case 5:
            return (
            <CodeDisplayPage
                groupName={groupName}
                readingPeriod={readingPeriod}
                nickname={nickname}
                color={color}
                onNext={goNext}
            />
            );

        case 6:
            return <SelectBookIntroPage />;

        default:
            return (
            <MeetingCreateGroupName
                groupName={groupName}
                setGroupName={setGroupName}
                onNext={goNext}
            />
            );
        }
    };

    return <>{renderStep()}</>;
};

export default MeetingCreateFlow;
