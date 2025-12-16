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

    const [groupName, setGroupName] = useState("");
    const [readingPeriod, setReadingPeriod] = useState<number>(0);


    const goNext = () => {
        navigate(`/meeting/create/${stepNumber + 1}`);
    };

    // 이전 내용으로
    // const goPrev = () => {
    //     navigate(`/meeting/create/${stepNumber - 1}`);
    // };

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
            return <MeetingCreateNickname onNext={goNext} />;
        case 4:
            return <MeetingCreateColor onNext={goNext} />;
        case 5:
            return <CodeDisplayPage onNext={goNext} />;
        case 6:
            return <SelectBookIntroPage />;
        default:
            return <MeetingCreateGroupName onNext={goNext} />;
        }
    };

    return <>{renderStep()}</>;
};

export default MeetingCreateFlow;
