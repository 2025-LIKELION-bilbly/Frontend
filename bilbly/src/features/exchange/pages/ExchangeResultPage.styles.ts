import styled from 'styled-components';
import BackgroundPattern from '../../../assets/background_pattern.png';

export const Container = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  background-color: #FFFCF8;
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */
  min-height: 100vh;
  
  padding: 0 19px 16px 19px;
  position: relative;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${BackgroundPattern});
    background-repeat: repeat;
    opacity: 0.1;
    mix-blend-mode: multiply;
    z-index: -1;
    pointer-events: none;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #100F0F;
  line-height: 30px;
  padding: 45px 0 40px 0;
  margin: 0;
`;

// 책 정보 영역 (중앙 배치)
export const BookSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
  margin: 0; 
`;

export const LargeBookImage = styled.img`
  width: 178px;  
  height: 264px; 
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #100F0F;
`;

export const BookTextInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const BookTitle = styled.h3`
  font-size: 24px; 
  font-weight: 600;
  color: #100F0F;
  margin: 36px 0 24px 0; /* 아래 여백 조정 */
  line-height: 36px;
`;

/* 저자 | 장르 | 페이지수 그리드 */
export const InfoGrid = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 40px; 
  margin-bottom: 28px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 12px;
  color: #595959;
  font-weight: 400;
`;

export const InfoValue = styled.span`
  font-size: 16px;
  color: #100F0F;
  font-weight: 500;
`;

/* 👇 [수정] 발행일, 출판사, ISBN 정보 (왼쪽 정렬) */
export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  text-align: left; 
  gap: 8px;
`;

export const DetailText = styled.p`
  font-size: 14px;
  color: #909090; 
  margin: 0;
  line-height: 21px;
`;
// 실제 데이터는 검정색(#100F0F)으로 표시하기 위한 스타일
export const DetailValue = styled.span`
  color: #100F0F;
  margin-left: 8px; /* 라벨과 데이터 사이 간격 */
`;

export const SummarySection = styled.div`
  width: 100%;
  text-align: left;
`;

export const SummaryText = styled.p`
  font-size: 14px;
  color: #100F0F;
  line-height: 21px;
  white-space: pre-wrap;
  margin: 28px 0 24px 0;
`;

/* 버튼 그룹 (홈으로 / 바로읽기) */
export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: auto; /* 바닥에 붙이기 */
`;

/* 홈 버튼 */
export const Button = styled.button<{ $primary?: boolean }>`
  flex: 1;
  height: 45px;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 12px;
  line-height: 21px;
  
  /* 배경색 설정 */
  background-color: ${props => props.$primary ? '#FF7932' : '#FFFCF8'};
  color: ${props => props.$primary ? '#FFFFFF' : '#100F0F'};
  border: ${props => props.$primary ? 'none' : '1px solid #100F0F'};
  position: relative;
  overflow: hidden; 
  z-index: 1;

  /* primary가 아닐 때(홈으로 버튼일 때)만 배경 패턴 적용 */
  &::before {
    content: "";
    display: ${props => props.$primary ? 'none' : 'block'};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    background-image: url(${BackgroundPattern});
    background-repeat: repeat;
    opacity: 0.1;
    mix-blend-mode: multiply;
    z-index: -1;
    pointer-events: none;
  }

  &:hover {
    opacity: 0.9;
  }
`;