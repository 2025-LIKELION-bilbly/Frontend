import styled from "styled-components";
import BackgroundPattern from "../../../../assets/background_pattern.png"; 

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 2000;
`;

export const Sheet = styled.div`
    position: relative;
    display: flex;
    background: #f8f5f0;
    width: 392px;
    padding: 36px 16px;
    gap: 29px;
    flex-direction: column;
    align-items: center;
    border-top: 1px solid var(--Stroke-primary, #100F0F);
    animation: none;

    /* 패턴을 별도의 레이어 */
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-image: url(${BackgroundPattern});
        background-repeat: repeat;
        opacity: 0.1;        
        mix-blend-mode: multiply;
        z-index: 0;  
        pointer-events: none;   //✨ 투명레이어가 버튼을 누르는 것을 막는걸 방지    
    }

    /* 실제 내용은 배경 위로 */
    z-index: 1;

    @keyframes slideUp {
        from { transform: translateY(70px); opacity: 0; }
        to   { transform: translateY(0); opacity: 1; }
    }

    @keyframes slideDown {
        from { transform: translateY(0); opacity: 1; }
        to   { transform: translateY(70px); opacity: 0; }
    }

    /* 열릴 때 animation 추가 */
    &.open {
        animation: slideUp 0.25s ease-out forwards;
    }

    /* 닫힐 때 animation */
    &.close {
        animation: slideDown 0.25s ease-out forwards;
    }


`;

export const MainBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
`;

export const Title = styled.div`
    color: var(--text-primary, #100F0F);
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 30px; 
`;

export const Subtitle = styled.div`
    margin-top: 12px;
    color: var(--text-primary, #100F0F);
    text-align: center;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; 
`;

export const MemberRow = styled.div`
    position: relative;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    display: flex;
`;


export const ButtonArea = styled.div`
    display: flex;
    gap: 10px;
`;

export const CancelButton = styled.button`
    flex: 1;
    border: 1px solid #aaa;
    padding: 12px 0;
    background: white;
    border-radius: 10px;
    font-size: 16px;
    `;

export const ConfirmButton = styled.button`
    flex: 1;
    background: #f28b45;
    color: white;
    padding: 12px 0;
    border: none;
    border-radius: 10px;
    font-size: 16px;
`;
