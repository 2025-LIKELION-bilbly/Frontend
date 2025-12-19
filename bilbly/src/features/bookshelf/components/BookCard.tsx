import * as S from "./BookCard.styles";
import MemberCircle from "../../../components/MemberCircle";
import type { BgKey } from "../../../styles/ColorUtils";
import * as G from "../../../styles/GlobalStyle";

interface BookCardProps {
    title: string;
    coverImageUrl: string;
    currentReaderName?: string;
    currentReaderColor?: BgKey;
    onClick?: () => void;
}

export default function BookCard({
    title,
    coverImageUrl,
    currentReaderName,
    currentReaderColor = "userBlue",
    onClick,
}: BookCardProps) {
    return (
        <S.Card clickable={!!onClick} onClick={onClick}>
        <S.Cover src={coverImageUrl} alt={title} />

        {currentReaderName && (
            <S.MemberCircleWrapper>
            <MemberCircle
                name={currentReaderName}
                color={
                currentReaderColor as keyof typeof G.theme.colors
                }
                size={24}
                fontSize={12}
            />
            </S.MemberCircleWrapper>
        )}
        </S.Card>
    );
}
