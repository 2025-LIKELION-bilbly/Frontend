import styled from "styled-components";
import HighlightSvg from "@/assets/highlight.svg?react";
import CommentSvg from "@/assets/comment.svg?react";
import MemoSvg from "@/assets/memo.svg?react";

// 기본 버튼 스타일 (삭제 버튼의 기반이 될 수 있도록 정의)
const BaseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    margin: 0;
    white-space: nowrap;
`;

export const Container = styled.div`
    position: absolute;
    transform: translate(-50%, -120%);

    background: #141414;
    padding: 8px 16px;
    border-radius: 28px;

    display: flex;
    /* 생성 버튼 그룹과 관리 그룹 간의 간격을 위해 gap을 씁니다. */
    gap: 16px; 
    align-items: center;
    z-index: 200;
`;

// 1. ⭐ 생성 버튼 (SVG 기반, 클릭 이벤트 핸들러가 있는 버튼)
export const Highlight = styled(HighlightSvg)`
    font-size: 18px;
    cursor: pointer;
    color: white;
    user-select: none;
    width: 20px;
    height: 20px;

    &:hover {
        opacity: 0.8;
    }
`;

export const Comment = styled(CommentSvg)`
    font-size: 18px;
    cursor: pointer;
    color: white;
    user-select: none;
    width: 20px;
    height: 20px;

    &:hover {
        opacity: 0.8;
    }
`;

export const Memo = styled(MemoSvg)`
    font-size: 18px;
    cursor: pointer;
    color: white;
    user-select: none;
    width: 20px;
    height: 20px;

    &:hover {
        opacity: 0.8;
    }
`;


// --- 삭제/선택 모드 UI ---

// 2. ⭐ 선택된 주석 타입 아이콘 (SVG 재활용)
//    - 버튼이 아닌 시각적 요소로, 색상이나 테두리를 주어 구분합니다.
const SelectedIconBase = styled.div`
    display: flex;
    align-items: center;
    /* padding: 0 4px; */
`;

export const SelectedHighlightIcon = styled(SelectedIconBase)`
    /* 하이라이트 아이콘 */
    & > svg {
        color: #ffc107; /* 강조 색상 */
        width: 20px;
        height: 20px;
    }
`;

export const SelectedCommentIcon = styled(SelectedIconBase)`
    /* 코멘트 아이콘 */
    & > svg {
        color: #66ccff; /* 코멘트 강조 색상 */
        width: 20px;
        height: 20px;
    }
`;

// ToolBar.tsx에서 SVG 컴포넌트를 직접 전달하면 Styled Component가 이를 렌더링하도록
// 템플릿을 조정하는 것이 더 깔끔합니다. (이전 ToolBar.tsx 코드가 이 방식을 사용했습니다.)

// 이 코드를 ToolBar.tsx에 적용하기 위해 SelectedIconBase를 SVG를 감싸는 스타일로 변경하겠습니다.

export const IconWrapper = styled.div`
    /* SVG를 감싸는 컨테이너 */
    display: flex;
    align-items: center;
    
    /* 이 wrapper의 자식 SVG에 색상을 적용 */
    & > svg {
        width: 20px;
        height: 20px;
    }
`;

export const SelectedHighlightIconSvg = styled(IconWrapper)`
    & > svg {
        color: #ffc107; /* 강조 색상 */
    }
`;

export const SelectedCommentIconSvg = styled(IconWrapper)`
    & > svg {
        color: #66ccff; /* 코멘트 강조 색상 */
    }
`;

// 3. ⭐ 삭제 버튼 (Delete 대신 DeleteButton 사용)
export const DeleteButton = styled(BaseButton)`
    background-color: #ff4d4f; 
    color: white;
    padding: 6px 10px;
    border-radius: 12px;
    font-weight: bold;
    
    &:hover {
        background-color: #cc0000;
    }
`;

// 4. ⭐ 구분선
export const Separator = styled.div`
    width: 1px;
    height: 16px; /* 버튼 높이에 맞춥니다 */
    background: #555;
    margin: 0;
`;