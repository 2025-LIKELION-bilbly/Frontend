import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './SelectBookResultPage.styles';

// API
import { getBookDetail, selectExchangeBook, type BookDetail } from '../../../api/book.api';

// 기본 이미지
import BookCover1 from '../../../assets/book_cover_1.jpg';

// 아이콘들
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M15 19.5L7.5 12L15 4.5" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseXIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18.75 5.25L5.25 18.75" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.75 18.75L5.25 5.25" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 💡 구글 드라이브 썸네일 변환 로직 수정
const convertDriveUrl = (url: string) => {
    if (!url) return "";
    if (url.includes('drive.google.com')) {
        const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
        if (idMatch && idMatch[1]) {
            return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w500`;
        }
    }
    return url;
};

const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return dateString.split('T')[0].replace(/-/g, '.');
};

function SelectBookResultPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialBook = location.state?.book;
  const groupId = location.state?.groupId;
  
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const isTaken = initialBook?.isTaken;

  useEffect(() => {
    const fetchDetail = async () => {
        if (initialBook?.bookId) {
            try {
                const response = await getBookDetail(initialBook.bookId);
                if (response.success) {
                    setBookDetail(response.data);
                }
            } catch (error) {
                console.error("책 상세 정보 로딩 실패:", error);
            }
        }
    };
    fetchDetail();
  }, [initialBook]);

  const handleBack = () => {
    navigate(-1); 
  };

  const handleSelect = async () => {
    if (isTaken) {
        setIsToastOpen(true);
        return;
    }

    if (initialBook?.bookId && groupId) {
        try {
            console.log(`책 등록 요청: BookID=${initialBook.bookId}, GroupID=${groupId}`);
            await selectExchangeBook(initialBook.bookId, groupId);
            
            // 🔥 [핵심 추가] 서버 배정 전까지 화면에 즉시 띄우기 위해 로컬 스토리지에 이미지 저장
            const finalImageUrl = bookDetail?.coverUrl || initialBook?.coverImageUrl || initialBook?.image;
            if (finalImageUrl) {
                localStorage.setItem('lastSelectedBookCover', finalImageUrl);
            }

            alert("책 등록이 완료되었습니다!");
            navigate('/exchange/status'); 
        } catch (error) {
            console.error("책 등록 실패", error);
            alert("책 등록 중 오류가 발생했습니다.");
        }
    } else {
        alert("책 정보나 그룹 정보를 찾을 수 없습니다.");
    }
  };

  const displayTitle = bookDetail?.title || initialBook?.title || "책 제목";
  const displayAuthor = bookDetail?.author || initialBook?.author || "작가 미상";
  const rawImageUrl = bookDetail?.coverUrl || initialBook?.coverImageUrl || initialBook?.image;
  const displayImage = rawImageUrl ? convertDriveUrl(rawImageUrl) : BookCover1;
  const displayGenre = bookDetail?.genre || "장르 정보 없음";
  const displayPage = bookDetail?.pageCount ? `${bookDetail.pageCount}쪽` : "-";
  const displayDate = bookDetail?.publishedAt ? formatDate(bookDetail.publishedAt) : "-";
  const displayPublisher = bookDetail?.publisher || "-";
  const displayIsbn = bookDetail?.isbn || "-";
  const displayDesc = bookDetail?.description || "줄거리 정보가 없습니다.";

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={handleBack}>
            <BackIcon />
        </S.BackButton>
        <S.HeaderTitle>책 정보</S.HeaderTitle>
      </S.Header>

      <S.BookSection>
        <S.LargeBookImage 
            src={displayImage} 
            alt="선택한 책 표지" 
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = BookCover1; }} 
        />
        
        <S.BookTextInfo>
          <S.BookTitle>{displayTitle}</S.BookTitle>

          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>저자</S.InfoLabel>
              <S.InfoValue>{displayAuthor}</S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>장르</S.InfoLabel>
              <S.InfoValue style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayGenre.split(',')[0]}
              </S.InfoValue>
            </S.InfoItem>
            <S.InfoItem>
              <S.InfoLabel>페이지수</S.InfoLabel>
              <S.InfoValue>{displayPage}</S.InfoValue>
            </S.InfoItem>
          </S.InfoGrid>

          <S.DetailInfo>
            <S.DetailText>발행일 <S.DetailValue>{displayDate}</S.DetailValue></S.DetailText>
            <S.DetailText>출판사 <S.DetailValue>{displayPublisher}</S.DetailValue></S.DetailText>
            <S.DetailText>ISBN <S.DetailValue>{displayIsbn}</S.DetailValue></S.DetailText>
          </S.DetailInfo>

          <S.SummarySection>
            <S.SummaryText>
                {displayDesc.length > 150 ? displayDesc.substring(0, 150) + "..." : displayDesc}
            </S.SummaryText>
          </S.SummarySection>
        </S.BookTextInfo>
      </S.BookSection>

      <S.BottomButtonArea>
        <S.SelectButton 
            onClick={handleSelect}
            $isTaken={isTaken}
        >
          선택하기
        </S.SelectButton>
      </S.BottomButtonArea>

      {isToastOpen && (
        <S.ToastContainer>
            <S.ToastIconBtn onClick={() => setIsToastOpen(false)}>
                <CloseXIcon />
            </S.ToastIconBtn>
            <S.ToastTextContainer>
                <S.ToastTitle>이미 모임원이 이 책을 골랐어요</S.ToastTitle>
                <S.ToastSubTitle>다른 책은 어떠신가요?</S.ToastSubTitle>
            </S.ToastTextContainer>
        </S.ToastContainer>
      )}
    </S.Container>
  );
}

export default SelectBookResultPage;