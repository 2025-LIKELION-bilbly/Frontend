import * as S from "./MeetingCard.styles";

type OldMeetingCardProps = {
    onClick: () => void;
};

const OldMeetingCard = ({ onClick }: OldMeetingCardProps) => {
    return (
        <S.CardContainer onClick={onClick}>
        <S.CardContent>
            <S.Title>기존 모임에 참여하기</S.Title>
            <S.Description>기존 모임의 코드를 입력하고<br />모임에 참여하세요</S.Description>
        </S.CardContent>
            
        <S.RightIcon />
        </S.CardContainer>
    );
};

export default OldMeetingCard;
