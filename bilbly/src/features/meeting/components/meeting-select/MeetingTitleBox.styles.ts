import styled from "styled-components";

// 타이틀 컨테이너
export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 160px;
    padding-bottom: 64px;
    align-items: center;
`;

// 공통 텍스트 스타일 
const BaseTitle = styled.div`
    color: var(--text-primary, #100F0F);
    text-align: center;
    font-family: Pretendard;
    font-style: normal;
    line-height: 150%;
`;

// 메인 타이틀 
export const MainTitle = styled(BaseTitle)`
    font-size: 20px;
    font-weight: 600;
`;

// 서브 타이틀 
export const SubTitle = styled(BaseTitle)`
    font-size: 16px;
    font-weight: 400;
`;


