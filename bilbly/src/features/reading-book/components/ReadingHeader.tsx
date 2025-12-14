import * as S from "../components/ReadingHeader.styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
    percent: number;
    page: number;
    bookId: string | number; // 책 ID 필요
};

type Bookmark = {
    page: number;
    percent: number;
};

const ReadingHeader = ({ title, percent, page, bookId }: Props) => {
    const navigate = useNavigate();

    const STORAGE_KEY = `bookmarks_${bookId}`;

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 페이지 또는 책이 바뀔 때 북마크 로드
    useEffect(() => {
        const saved = localStorage.getItem(`bookmarks_${bookId}`);

        // 저장된 데이터가 없으면 초기화하고 종료
        if (!saved) {
            // 다음 tick에서 실행 → Strict Mode 경고 사라짐
            setTimeout(() => {
                setBookmarks([]);
                setIsBookmarked(false);
            }, 0);
            return;
        }

        try {
            const parsed: Bookmark[] = JSON.parse(saved);

            // 북마크 목록 설정
            setTimeout(() => {
                setBookmarks(parsed);

                // 현재 페이지가 북마크되어 있는지 확인
                const exists = parsed.some(b => b.page === page);
                setIsBookmarked(exists);
            }, 0);

        } catch (err) {
            console.error("Bookmark parsing error:", err);

            // 오류 발생 시 초기화
            setTimeout(() => {
                setBookmarks([]);
                setIsBookmarked(false);
            }, 0);
        }
    }, [page, bookId]);




    // 북마크 토글 기능
    const handleBookmark = () => {
        let updated: Bookmark[];

        if (isBookmarked) {
            // 북마크 해제
            updated = bookmarks.filter(b => b.page !== page);
        } else {
            // 북마크 추가
            updated = [...bookmarks, { page, percent }];
        }

        setBookmarks(updated);
        setIsBookmarked(!isBookmarked);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        console.log("업데이트된 북마크 목록:", updated);
    };

    const handleBack = () => {
        navigate("/reading-test-start");
    };

    return (
        <S.HeaderBox onClick={(e) => e.stopPropagation()}>
            <S.LeftIcon onClick={handleBack} />

            <S.Title>{title}</S.Title>

            {/* 북마크 버튼 */}
            <S.BookmarkButton onClick={handleBookmark}>
                {isBookmarked ? <S.BookmarkFilled /> : <S.Bookmark />}
            </S.BookmarkButton>
        </S.HeaderBox>
    );
};

export default ReadingHeader;
