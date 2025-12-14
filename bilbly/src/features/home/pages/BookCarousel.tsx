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
    isLocked: true, // 잠금 상태 표시
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

// 부모에게 상태를 전달하기 위한 Props 정의
interface BookCarouselProps {
  onSlideChange?: (id: number) => void;
}

function BookCarousel({ onSlideChange }: BookCarouselProps) {
  const [activeId, setActiveId] = useState<number>(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setActiveId(id);
            
            // ✅ 슬라이드가 변경되면 부모(HomePage)에게 알림
            if (onSlideChange) {
              onSlideChange(id);
            }
          }
        });
      },
      {
        root: scrollRef.current,
        threshold: 0.6,
      }
    );

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [onSlideChange]);

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