import { useNavigate } from "react-router-dom";
import * as S from "./MeetingSelectPage.styles";

import MeetingTitleBox from "../components/meeting-select/MeetingTitleBox";
import OldMeetingCard from "../components/meeting-select/OldMeetingCard";
import NewMeetingCard from "../components/meeting-select/NewMeetingCard";


const MeetingSelectPage = () => {
    const navigate = useNavigate();

    const handleNewClick = () => navigate("/meeting/create/1");
    const handleOldClick = () => navigate("/meeting/join/_/1");

    return (
        <S.Container>
            <MeetingTitleBox />

            <S.CardContainer>
                <NewMeetingCard onClick={handleNewClick} />
                <OldMeetingCard onClick={handleOldClick} />
            </S.CardContainer>
        </S.Container>
    );
};

export default MeetingSelectPage;
