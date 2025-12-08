import styled from "styled-components";


export const Wrapper = styled.div`
    position: fixed;              /* 화면 하단에 togglebar랑 같이 고정 */
    bottom: env(safe-area-inset-bottom, 0);  /* iPhone 하단 안전영역 대응 */
    left: 50%;
    transform: translateX(-50%);  

    width: 100%;
    max-width: 393px;

    padding: 12px 16px 20px;

    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 100;

    border-top: 1px solid #100F0F;
`;


export const BarContainer = styled.div`
    position: relative;
    width: 100%;
    height: 8px;
`;

export const Track = styled.div`
    width: 100%;
    height: 8px;
    background-color: #D9D9D9;
    border-radius: 4px;
`;

export const Fill = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 8px;
    background-color: #F28C3A;
    border-radius: 4px;
`;

export const RangeInput = styled.input`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    opacity: 0;    /* 사용자 눈에는 안 보이지만 드래그 가능 */
    cursor: pointer;

    -webkit-appearance: none;
    appearance: none;
`;

export const PercentText = styled.div`
    color: var(--text-secondary, #595959);

    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 150% */
    letter-spacing: -0.5px;
`;
