import * as S from "./MeetingCard.styles";

type NewMeetingCardProps = {
    onClick: () => void;
};

const NewMeetingCard = ({ onClick }: NewMeetingCardProps) => {
    return (
        <S.CardContainer onClick={onClick}>
            <S.CardContent>
                <S.Title>새로운 모임 만들기</S.Title>
                <S.Description>새로운 모임을 만들어<br />모임원들을 초대해요</S.Description>
            </S.CardContent>


        <S.RightIcon />
        </S.CardContainer>
    );
};

export default NewMeetingCard;
