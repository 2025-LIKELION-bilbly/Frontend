import * as S from "./MeetingTitleBox.styles";

const MeetingTitleBox = () => {
    return (
        <>
        <S.TitleContainer>
            <S.MainTitle>비블리를 시작해요</S.MainTitle>
            <S.SubTitle>
                직접 모임을 만들거나
                <br />
                기존 모임에 참여할 수 있어요
            </S.SubTitle>
        </S.TitleContainer>
        </>
    );
};

export default MeetingTitleBox;
