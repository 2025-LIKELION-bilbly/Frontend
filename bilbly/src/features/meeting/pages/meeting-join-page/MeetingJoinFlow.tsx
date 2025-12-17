import { useParams, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import MeetingJoinCodePage from "./MeetingJoinCodePage";
import MeetingJoinNickname from "./MeetingJoinNicknamePage";
import MeetingJoinColor from "./MeetingJoinColorPage";
import SelectBookShowPage from "./SelectBookShowPage";

const MeetingJoinFlow = () => {

    const { code, step } = useParams<{ code: string; step: string }>();
    const navigate = useNavigate();

    const stepNumber = Number(step) || 1;

    useEffect(() => {
        // 1단계가 아닌데 code가 "_"면 잘못된 접근
        if (code === "_" && stepNumber > 1) {
        navigate("/meeting/join/_/1", { replace: true });
        }
    }, [code, stepNumber, navigate]);

    const renderStep = () => {
        switch (stepNumber) {

            
        case 1:
            return <MeetingJoinCodePage />;

        case 2:
            return <MeetingJoinNickname />;

        case 3:
            return <MeetingJoinColor />;

        case 4:
            return <SelectBookShowPage />;

        default:
            return null;
        }
    };

    return <>{renderStep()}</>;
};

export default MeetingJoinFlow;
