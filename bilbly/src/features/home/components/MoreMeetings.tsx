import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import * as S from './MoreMeetings.styles';

const generateMockCards = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    text: '이 책에 대한 코멘트를\n다같이 공유해봐요',
    user: `모임원${(index % 3) + 1}`,
    progress: '-71%',
    isBlurred: index >= 3,
  }));
};

const MOCK_CARDS = generateMockCards(12); // 총 12개 카드 생성

function MoreMeetings() {
  const theme = useTheme();

  // 색상 팔레트 (테마 색상 활용)
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

  // 랜덤 각도 및 색상 인덱스 계산
  const cardStyles = useMemo(() => {
    return MOCK_CARDS.map(() => ({
      rotation: (Math.random() * 16) - 8,
      colorIndex: Math.floor(Math.random() * colorPalette.length),
    }));
  }, [colorPalette.length]);

  return (
    <S.Container>
      <S.Header>
        <S.Title>흔적 모아보기</S.Title>
        <S.ViewMoreLink>더보기 &gt;</S.ViewMoreLink>
      </S.Header>
      
      <S.CardContainer>
        {MOCK_CARDS.map((card, index) => (
          <S.Card 
            key={card.id}
            style={{ transform: `rotate(${cardStyles[index].rotation}deg)` }} 
          >
            {/* 상단 원 */}
            <S.CircleIcon $color={colorPalette[cardStyles[index].colorIndex]} />
            
            {/* 본문 텍스트 */}
            <S.CardText $isBlurred={card.isBlurred}>
              {card.text}
            </S.CardText>

            {/* 하단 정보 (모임원1 -71%) */}
            <S.CardFooter>
              <S.Divider />
              <S.FooterText>{card.user}</S.FooterText>
              <S.FooterText>{card.progress}</S.FooterText>
            </S.CardFooter>

          </S.Card>
        ))}
      </S.CardContainer>
    </S.Container>
  );
}

export default MoreMeetings;