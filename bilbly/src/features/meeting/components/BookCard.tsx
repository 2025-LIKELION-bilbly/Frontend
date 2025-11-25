import * as S from "./BookCard.style";

type Props = {
    coverUrl?: string | null;
    nickname?: string;
};

const BookCard = ({ coverUrl, nickname }: Props) => {
    const isSelected = !!coverUrl;

    return (
        <S.Container>
            {isSelected ? (
                <S.Cover src={coverUrl!} />
            ) : (
                <S.DefaultCard>
                <span>책</span>
                <span>고르는 중</span>
                </S.DefaultCard>
            )}

            {nickname && <S.Nickname>{nickname}</S.Nickname>}
        </S.Container>
    );
};

export default BookCard;
