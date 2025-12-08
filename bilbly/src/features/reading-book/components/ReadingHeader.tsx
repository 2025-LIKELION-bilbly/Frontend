import * as S from "../components/ReadingHeader.styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
};

const ReadingHeader = ({ title }: Props) => {
    const [showBookmarkToast, setShowBookmarkToast] = useState(false);
    const navigate = useNavigate();

    const handleBookmark = () => {
        setShowBookmarkToast(true);
        setTimeout(() => setShowBookmarkToast(false), 1500);
    };

    const handleBack = () => {
        navigate("/reading-test-start"); // 🔥 원하는 경로로 이동
    };

    return (
        <>
        <S.HeaderBox onClick={(e) => e.stopPropagation()}>
            {/* 뒤로가기 */}
            <S.LeftIcon onClick={handleBack}>‹</S.LeftIcon>

            {/* 책 제목 */}
            <S.Title>{title}</S.Title>

            {/* 북마크 아이콘 / 추후 추가: 북마크 클릭시 진행현황 저장*/}
            <S.BookmarkButton onClick={handleBookmark}>🔖</S.BookmarkButton>
        </S.HeaderBox>

        {/* 북마크 저장 토스트 */}
        {showBookmarkToast && (
            <S.BookmarkToast>현재 진행도를 기준으로 북마크 저장</S.BookmarkToast>
        )}
        </>
    );
};

export default ReadingHeader;