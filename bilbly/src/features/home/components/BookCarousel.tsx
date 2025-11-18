// src/features/home/components/BookCarousel.tsx

import React, { useState, useRef, useEffect } from 'react';
import * as S from './BookCarousel.styles';

import BookCover1 from '../../../assets/book_cover_1.jpg';
import BookCover2 from '../../../assets/book_cover_2.jpg'; 

const books = [
  {
    id: 1,
    src: BookCover1,
    alt: '혼모노',
    progress: 50,
    daysLeft: '30일 남음',
    dateRange: '~25.10.31',
  },
  {
    id: 2,
    src: BookCover2,
    alt: '기적',
    isLocked: true,
    userInfo: {
      label: '강',
      name: '닉네임이여덟글자',
      status: '읽는중',
      color: '#F6C5CF',
      textColor: '#970522',
    }
  },
  {
    id: 3,
    src: BookCover1,
    alt: '책 3',
    progress: 20,
    daysLeft: '30일 남음',
    dateRange: '~25.10.31',
  },
];

function BookCarousel() {
  // 현재 활성화된 책의 ID (기본값 1)
  const [activeId, setActiveId] = useState<number>(1);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 👇 [핵심 로직] 스크롤 감지하여 activeId 변경
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 화면의 60% 이상 들어오면 '활성'으로 간주
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setActiveId(id);
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: 0.6, // 감도 조절 (0.6 ~ 0.7 추천)
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  // 👇 클릭 시 해당 책으로 스크롤 이동하는 함수
  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index];
    if (item) {
      item.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  return (
    <S.Container>
      <S.ScrollContainer ref={scrollRef}>
        {books.map((book, index) => {
          // 현재 책이 활성 상태인지 확인
          const isActive = book.id === activeId;

          return (
            <S.BookItem 
              key={book.id} 
              data-id={book.id}
              ref={el => { itemRefs.current[index] = el; }}
              $isActive={isActive}
              onClick={() => scrollToItem(index)}
              style={{ cursor: 'pointer' }}
            >
              
              <S.CoverWrapper $isActive={isActive}>
                <S.BookCoverImage src={book.src} alt={book.alt} />
              </S.CoverWrapper>

              {/* 👇 활성 상태($isActive)일 때만 정보 표시 */}
              <S.HiddenInfo $isActive={isActive}>
                {book.progress !== undefined && (
                  <>
                    <S.ProgressBarTrack>
                      <S.ProgressBarFill percent={book.progress} />
                    </S.ProgressBarTrack>
                    <S.InfoContainer>
                      <S.DaysLeft>{book.daysLeft}</S.DaysLeft>
                      <S.DateRange>{book.dateRange}</S.DateRange>
                    </S.InfoContainer>
                  </>
                )}

                {book.userInfo && (
                  <S.UserInfo>
                    <S.UserIcon $bgColor={book.userInfo.color} $textColor={book.userInfo.textColor}>
                      {book.userInfo.label}
                    </S.UserIcon>
                    <S.UserTextContainer>
                      <S.UserName>{book.userInfo.name}</S.UserName>
                      <S.UserStatus>{book.userInfo.status}</S.UserStatus>
                    </S.UserTextContainer>
                  </S.UserInfo>
                )}
              </S.HiddenInfo>

            </S.BookItem>
          );
        })}
      </S.ScrollContainer>
    </S.Container>
  );
}

export default BookCarousel;