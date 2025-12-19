import React, { useState, useRef, useEffect } from 'react';
import * as S from './BookCarousel.styles';

const COLOR_SYSTEM: { [key: string]: { bg: string; text: string } } = {
  ROSE: { bg: '#F6C5CF', text: '#970522' },   
  LIME: { bg: '#F2F4C6', text: '#888F00' },   
  BLUE: { bg: '#C5DDF3', text: '#074D8F' },   
  GREEN: { bg: '#CDF1CD', text: '#347333' },  
  VIOLET: { bg: '#D5C2F0', text: '#422072' }, 
  MINT: { bg: '#CBEFED', text: '#30706C' },   
  PINK: { bg: '#FBD7EE', text: '#7E1853' },   
  ORANGE: { bg: '#E6D5C9', text: '#6E3C16' }, 
};

const getTheme = (serverColor: string) => {
  const map: { [key: string]: string } = {
    RED: 'ROSE', YELLOW: 'LIME', BLUE: 'BLUE', GREEN: 'GREEN',
    PURPLE: 'VIOLET', MINT: 'MINT', PINK: 'PINK', ORANGE: 'ORANGE'
  };
  return COLOR_SYSTEM[map[serverColor] || 'ROSE'];
};

interface BookCarouselProps {
  onSlideChange?: (index: number) => void;
  members: any[]; 
  readingInfo?: any;
}

function BookCarousel({ onSlideChange, members, readingInfo }: BookCarouselProps) {
  const [activeId, setActiveId] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const convertDriveUrl = (url: string | null) => {
    if (!url || url === "string" || url.length < 10) return "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000"; 
    const driveIdMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
    if (driveIdMatch && driveIdMatch[1]) return `https://drive.google.com/thumbnail?id=${driveIdMatch[1]}&sz=w800`;
    return url;
  };

  const getBookImage = (member: any) => {
    if (member.nickname === '민지') {
      const saved = localStorage.getItem('lastSelectedBookCover');
      if (saved && saved !== "string") return convertDriveUrl(saved);
    }
    return convertDriveUrl(member.coverImageUrl || (activeId === 0 ? readingInfo?.coverImageUrl : ""));
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveId(index);
          if (onSlideChange) onSlideChange(index);
        }
      });
    }, { root: scrollRef.current, threshold: 0.6 });
    itemRefs.current.forEach((item) => { if (item) observer.observe(item); });
    return () => observer.disconnect();
  }, [members, onSlideChange]);

  const scrollToItem = (index: number) => {
    const item = itemRefs.current[index];
    if (item) item.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return (
    <S.Container>
      <S.ScrollContainer ref={scrollRef}>
        {members.map((member, index) => {
          const isActive = activeId === index;
          const theme = getTheme(member.color);

          // 💡 날짜 데이터 연동: readingInfo에서 남은 일수와 날짜 추출
          const daysLeftText = (index === 0 && readingInfo?.daysRemaining !== undefined)
            ? `${readingInfo.daysRemaining}일 남음`
            : "";
          const dateRangeText = (index === 0 && readingInfo?.nextExchangeDate)
            ? `~${readingInfo.nextExchangeDate.slice(2, 10).replace(/-/g, '.')}`
            : "";

          return (
            <S.BookItem 
              key={index} data-index={index} 
              ref={el => { itemRefs.current[index] = el; }}
              $isActive={isActive} onClick={() => scrollToItem(index)}
            >
              <S.CoverWrapper $isActive={isActive} style={{ border: '1px solid #100F0F' }}>
                <S.BookCoverImage src={getBookImage(member)} alt={member.nickname} referrerPolicy="no-referrer" />
              </S.CoverWrapper>

              <S.HiddenInfo $isActive={isActive}>
                {index === 0 ? (
                  <>
                    <S.ProgressBarTrack>
                      <S.ProgressBarFill percent={readingInfo?.progressPercent ? readingInfo.progressPercent * 100 : 0} />
                    </S.ProgressBarTrack>
                    <S.InfoContainer>
                      <S.DaysLeft>{daysLeftText}</S.DaysLeft>
                      <S.DateRange>{dateRangeText}</S.DateRange>
                    </S.InfoContainer>
                  </>
                ) : (
                  <S.UserInfo>
                    <S.UserIcon $bgColor={theme.bg} $textColor={theme.text}>
                      {member.nickname.charAt(0)}
                    </S.UserIcon>
                    <S.UserTextContainer>
                      <S.UserName>{member.nickname}</S.UserName>
                      <S.UserStatus>{member.hasBook ? "읽는중" : "준비중"}</S.UserStatus>
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