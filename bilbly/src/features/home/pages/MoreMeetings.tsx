import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'styled-components';
import * as S from './MoreMeetings.styles';

// 카드 데이터 타입 정의
interface CardData {
  id: number;
  text: string;
  user: string;
  progress: string;
  isBlurred: boolean;
}

// 목업 데이터 생성 함수 (startIndex부터 count개 생성)
const generateMockCards = (startIndex: number, count: number): CardData[] => {
  return Array.from({ length: count }, (_, index) => {
    const currentIndex = startIndex + index;
    return {
      id: currentIndex + 1,
      text: '이 책에 대한 코멘트를 다같이 공유해봐요',
      user: `모임원${(currentIndex % 3) + 1}`,
      progress: '-71%',
      isBlurred: currentIndex >= 3, // 4번째 카드부터는 계속 블러 처리
    };
  });
};

function MoreMeetings() {
  const theme = useTheme();
  
  // 1. 카드 상태 관리 (초기 12개)
  const [cards, setCards] = useState<CardData[]>(generateMockCards(0, 12));
  
  // 2. 무한 스크롤 감지용 Ref
  const observerRef = useRef<HTMLDivElement | null>(null);

  // 색상 팔레트
  const colorPalette = useMemo(() => [
    theme.colors?.UserPointblue || '#2285E3',
    theme.colors?.UserPointbrown || '#A06437',
    theme.colors?.UserPointgreen || '#5ED15D',
    theme.colors?.UserPointlime || '#DFE82B',
    theme.colors?.UserPointmint || '#57CBC4',
    theme.colors?.UserPointpink || '#F27DC7',
    theme.colors?.UserPointrose || '#ED264E',
    theme.colors?.UserPointviolet || '#783ACF',
  ], [theme]);

  // 각 카드별 회전 각도와 색상 인덱스 계산 (데이터가 늘어날 때마다 유지/추가)
  const cardStyles = useMemo(() => {
    return cards.map(() => ({
      rotation: (Math.random() * 16) - 8,
      colorIndex: Math.floor(Math.random() * colorPalette.length),
    }));
  }, [cards.length, colorPalette.length]);

  // 3. 데이터 추가 로드 함수
  const loadMoreCards = useCallback(() => {
    // 0.5초 딜레이를 주어 자연스럽게 로딩되는 느낌 (선택사항)
    setTimeout(() => {
      setCards((prevCards) => [
        ...prevCards,
        ...generateMockCards(prevCards.length, 6), // 6개씩 추가 로드
      ]);
    }, 500);
  }, []);

  // 4. IntersectionObserver 설정 (스크롤 감지)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // 타겟(observerRef)이 화면에 보이면 데이터 로드
        if (entries[0].isIntersecting) {
          loadMoreCards();
        }
      },
      { threshold: 1.0 } // 100% 보일 때 트리거
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMoreCards]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>흔적 모아보기</S.Title>
        <S.ViewMoreLink>더보기 &gt;</S.ViewMoreLink>
      </S.Header>
      
      <S.CardContainer>
        {cards.map((card, index) => (
          <S.Card 
            key={card.id}
            style={{ transform: `rotate(${cardStyles[index]?.rotation || 0}deg)` }} 
          >
            {/* 상단 원 */}
            <S.CircleIcon $color={colorPalette[cardStyles[index]?.colorIndex || 0]} />
            
            {/* 본문 텍스트 */}
            <S.CardText $isBlurred={card.isBlurred}>
              {card.text}
            </S.CardText>

            {/* 하단 정보 */}
            <S.CardFooter>
              <S.Divider />
              <S.FooterText>{card.user}</S.FooterText>
              <S.FooterText>{card.progress}</S.FooterText>
            </S.CardFooter>

          </S.Card>
        ))}
        
        {/* 5. 스크롤 감지용 투명 요소 (리스트 맨 아래 배치) */}
        <div ref={observerRef} style={{ width: '100%', height: '20px' }} />
        
      </S.CardContainer>
    </S.Container>
  );
}

export default MoreMeetings;