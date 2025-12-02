import { useParams, useNavigate } from "react-router-dom";
import MeetingCreateName from "./MeetingCreateNamePage";
import MeetingCreatePeriod from "./MeetingCreatePeriodPage";
import MeetingCreateNickname from "./MeetingCreateNicknamePage";
import MeetingCreateColor from "./MeetingCreateColorPage";
import CodeDisplayPage from "./CodeDisplayPage";
import SelectBookIntroPage from "./SelectBookIntroPage";

const MeetingCreateFlow = () => {
    const { step } = useParams();
    const navigate = useNavigate();

    const stepNumber = Number(step) || 1;

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
            return <MeetingCreateName onNext={goNext} />;
        case 2:
            return <MeetingCreatePeriod onNext={goNext} />;
        case 3:
            return <MeetingCreateNickname onNext={goNext} />;
        case 4:
            return <MeetingCreateColor onNext={goNext} />;
        case 5:
            return <CodeDisplayPage onNext={goNext} />;
        case 6:
            return <SelectBookIntroPage />;
        default:
            return <MeetingCreateName onNext={goNext} />;
        }
    };

    return <>{renderStep()}</>;
};

export default MeetingCreateFlow;
