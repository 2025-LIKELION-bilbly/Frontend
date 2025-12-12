// utils/memo.ts (수정)

import { surroundSelection, removeAnnotation} from "./annotation.core";
import type { AnnotationResult } from "./annotation.core";

export const applyMemo = (): AnnotationResult | null => {
    const style: React.CSSProperties = {
        // 배경색과 테두리 스타일을 제거하거나 투명하게 설정합니다.
        // 마커가 DOM에는 존재하지만, 시각적으로는 보이지 않도록 합니다.
        // **중요:** 이 스타일은 메모 입력이 완료(저장)될 때까지 '임시' 상태를 나타냅니다.
        backgroundColor: 'transparent', 
        border: 'none',
        // 혹은 opacity 0을 주어 완전히 숨길 수도 있습니다.
        // opacity: 0, 
    };
    
    // 텍스트는 감싸서 주석 ID는 생성합니다.
    return surroundSelection('memo', style); 
};

export const removeMemo = (memoId: string): void => {
    removeAnnotation(memoId);
};