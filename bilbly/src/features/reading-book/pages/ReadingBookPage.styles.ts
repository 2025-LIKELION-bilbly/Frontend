// ReadingBookPage.styles.ts

import styled  from "styled-components";
import BackgroundPattern from '../../../assets/background_pattern.png';

export const Container = styled.div`
    width: 100%;
    max-width: 393px;
    background-color: #FFFCF8;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 16px;
    position: relative; /* ⭐ 툴바와 코멘트 wrapper의 absolute 기준점 */
    z-index: 0;
    user-select: text;

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
    }

    // =======================================================
    // ⭐ 주석 (Annotation) 및 코멘트 스타일링
    // =======================================================
    
    .annotation {
        position: relative; /* ⭐ 필수: .comment-wrapper의 absolute 기준점 */
    }

    .comment-wrapper {
        // ⭐ 수정: absolute로 텍스트 흐름에서 분리
        position: absolute; 
        
        /* 문장 아래로 더 내림 (간격 확보) */
        top: 60%; /* 드래그된 문장 바로 아래 라인에 위치 */
        left: 0; 
        
        width: auto;
        max-width: 100%; 
        
        padding: 0;
        background-color: transparent;
        border: none;
        box-shadow: none;
        z-index: 10;
        
        /* 문장과 코멘트 사이의 간격 */
        margin-top: 10px; /* ⭐ 수정: 간격 10px로 확장 */
    }

    .comment-input {
        font-family: 'Pretendard', sans-serif;
        font-size: 14px; 
        line-height: 1.4; 
        
        /* 높이를 줄여서 한 줄 입력에 최적화 */
        width: auto;
        max-width: 300px;
        height: 20px; 
        min-height: 20px; 
        
        padding: 0;
        border: none;
        outline: none;
        resize: none; 
        
        color: #B54747; 
        background: transparent;
        
        display: inline; 
        overflow: hidden; 
    }

    .comment-save-btn {
        display: none; 
    }

    .comment-marker {
        font-family: 'Pretendard', sans-serif;
        font-size: 11px; 
        font-weight: 500;
        color: #007bff;
        background-color: #e7f5ff;
        padding: 2px 6px;
        border-radius: 10px;
        cursor: pointer;
        display: inline-block;
    }
`;



export const ToggleWrapper = styled.div<{ $showUI: boolean }>`
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: ${({ $showUI }) => ($showUI ? "100px" : "24px")};
    transition: bottom 0.25s ease;
    z-index: 20;
`;

export const ContentBox = styled.div`
    padding-top: 60px;     
    padding-bottom: 100px; 
    padding-left: 20px;
    padding-right: 20px;


    font-family: 'Pretendard', sans-serif;
    font-size: 16px;
    line-height: 30px;
    color: #222;

    height: 599px;          
    overflow: hidden;

    display: flex;
    flex-direction: column;

    position: relative;
    z-index: 1;
    user-select: text;
`;

export const TextWrapper = styled.div`
    flex: 1;
    width: 100%;
    
    display: block;
    user-select: text;

    /* ⭐⭐⭐ 핵심 수정: 책처럼 가득 차게 보이게 하는 설정 ⭐⭐⭐ */
    text-align: justify;           /* 좌우 정렬을 맞춤 (양쪽 정렬) */
    text-justify: inter-character; /* 글자 사이 간격을 조절하여 정렬 (한국어에 적합) */
    
    word-break: break-all;         /* 단어가 길어도 줄바꿈하여 빈 공간 최소화 (취향에 따라 keep-all로 변경 가능) */    /* 원본의 줄바꿈은 유지하되, 긴 줄은 자동 줄바꿈 */
    
    letter-spacing: -0.02em;       /* 자간을 살짝 좁혀 텍스트 밀도감을 높임 */
`;

// ... (나머지 스타일 유지)