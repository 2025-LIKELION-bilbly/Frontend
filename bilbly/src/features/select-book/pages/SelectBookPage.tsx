import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SelectBookPage.styles'; 

// API 함수 및 타입
import { getNewBooks, getPopularBooks, type Book } from '../../../api/book.api';
import { getMyGroups } from '../../../api/group.api';

// 이미지 경로
import BookCover1 from '../../../assets/book_cover_1.jpg';
import BookCover2 from '../../../assets/book_cover_2.jpg';

// 구글 드라이브 링크 변환 함수
const convertDriveUrl = (url: string) => {
    if (!url) return "";
    if (url.includes('drive.google.com') && url.includes('id=')) {
        const idMatch = url.match(/id=([^&]+)/);
        if (idMatch && idMatch[1]) {
            return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
        }
    }
    return url;
};

// 검색 아이콘
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <g clipPath="url(#clip0_2441_8388)">
      <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.8037 15.8035L21.0003 21" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_2441_8388">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const CATEGORIES = [
  { label: '강', bgColor: '#F6C5CF', textColor: '#970522' },
  { label: '강', bgColor: '#F2F4C6', textColor: '#888F00' },
  { label: '강', bgColor: '#C5DDF3', textColor: '#074D8F' },
  { label: '강', bgColor: '#CDF1CD', textColor: '#347333' },
];

const SelectBookPage = () => {
    const navigate = useNavigate();
    
    const [newBooks, setNewBooks] = useState<Book[]>([]);
    const [popularBooks, setPopularBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [myGroupId, setMyGroupId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const groups = await getMyGroups();
                if (groups && groups.length > 0) setMyGroupId(groups[0].groupId);

                const newRes = await getNewBooks();
                if (newRes.success) setNewBooks(newRes.data);

                const popRes = await getPopularBooks();
                if (popRes.success) setPopularBooks(popRes.data);

            } catch (error) {
                console.error("데이터 로딩 실패:", error);
            }
        };
        fetchData();
    }, []);

    const handleBookClick = (book: any) => {
        // 그룹 ID 정보도 같이 넘겨주면 좋음 (상세 페이지에서 API 호출 위해)
        navigate('/select-book/result', { 
            state: { 
                book: book,
                groupId: myGroupId 
            } 
        });
    };

    const getUserIconStyle = (idx: number) => CATEGORIES[idx % CATEGORIES.length];

    const renderBookItem = (book: any, idx: number) => {
        const iconStyle = getUserIconStyle(idx);
        const currentImage = convertDriveUrl(book.coverImageUrl);
        // 리스트 페이지에서는 이제 내가 선택한 표시를 할 필요가 없으므로 false 처리
        // (원하신다면 이 부분 로직은 유지 가능하지만, 상세페이지 이동이 주 목적이므로 간소화)
        const showIcon = false; 

        return (
            <S.BookItem 
                key={book.bookId}
                onClick={() => handleBookClick(book)}
                $isSelected={false}
            >
                <S.BookImageWrapper>
                    <S.BookImage 
                        src={currentImage} 
                        alt={book.title} 
                        referrerPolicy="no-referrer"
                        onError={(e) => { e.currentTarget.src = BookCover1; }} 
                    />
                    
                    {showIcon && (
                        <S.UserIconOverlay>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: iconStyle.bgColor,
                                color: iconStyle.textColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: 600,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                border: '1px solid #fff'
                            }}>
                                {iconStyle.label}
                            </div>
                        </S.UserIconOverlay>
                    )}
                </S.BookImageWrapper>

                <S.BookInfo>
                    <S.BookTitle>{book.title}</S.BookTitle>
                    <S.BookAuthor>{book.author}</S.BookAuthor>
                </S.BookInfo>
            </S.BookItem>
        );
    };

    return (
        <S.Container>
            <S.SearchHeader>
                <S.SearchInputWrapper>
                    <S.SearchInput 
                        placeholder="책 제목, 작가 검색" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <S.SearchIconWrapper>
                        <SearchIcon />
                    </S.SearchIconWrapper>
                </S.SearchInputWrapper>
            </S.SearchHeader>

            <S.ScrollContent>
                <S.SectionTitle>새로 나온 책</S.SectionTitle>
                <S.NewBookGrid> 
                    {newBooks.length > 0 ? newBooks.map((book, idx) => renderBookItem(book, idx)) : <div>로딩 중...</div>}
                </S.NewBookGrid>

                <S.SectionTitle>지금 많이 읽는 책</S.SectionTitle>
                <S.NewBookGrid> 
                    {popularBooks.length > 0 ? popularBooks.map((book, idx) => renderBookItem(book, idx + 3)) : <div>로딩 중...</div>}
                </S.NewBookGrid>
            </S.ScrollContent>
        </S.Container>
    );
};

export default SelectBookPage;