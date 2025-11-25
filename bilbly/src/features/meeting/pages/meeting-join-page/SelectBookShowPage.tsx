import * as S from "./SelectBookShowPage.styles";
import { useParams, useNavigate } from "react-router-dom";
import BookCard from "../../components/BookCard";
import NextBtn from "../../components/NextBtn"

type Member = {
    id: number;
    nickname: string;
    bookCover: string | null;
};

const mockMembers: Member[] = [
    { id: 1, nickname: "철수", bookCover: "/images/book1.png"},
    { id: 2, nickname: "영희", bookCover: "/images/book2.png"},
    { id: 3, nickname: "민수", bookCover: "/images/book3.png"},
    { id: 4, nickname: "지은", bookCover: "/images/book1.png"},
    { id: 5, nickname: "나리", bookCover: "/images/book2.png"},
    { id: 6, nickname: "호준", bookCover: "/images/book3.png"},
    { id: 7, nickname: "하린", bookCover: null },   // default 카드 사용
    ];

    const SelectBookShowPage = () => {
    const { code } = useParams();
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/meeting/join/${code}/selectbooklist`);
    };

    return (
        <S.Container>
            <S.MainBox1>
                <S.Confetti />
                <S.Title>환영합니다!</S.Title>
                <S.Subtitle>
                    각자 고른책을 
                    <br /> nn일 마다 교환해요
                </S.Subtitle>  
                <S.SectionTitle>모임원이 고른 책</S.SectionTitle>        
            </S.MainBox1>

            <S.BookScrollArea>
                <S.Grid>
                    {mockMembers.map((m) => (
                        <BookCard
                            key={m.id}
                            coverUrl={m.bookCover}
                            nickname={m.nickname}
                        />
                    ))}
                </S.Grid>
            </S.BookScrollArea>

            <S.BottomArea>
                <NextBtn label="책 고르기" state="valid" onClick={handleNext} />
            </S.BottomArea>
        </S.Container>
    );
};


export default SelectBookShowPage;
