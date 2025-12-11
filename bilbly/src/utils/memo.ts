// utils/memo.ts

import { surroundSelection, removeAnnotation} from "./annotation.core";
import type { AnnotationResult } from "./annotation.core";
/**
 * 메모 주석을 적용합니다. (내용 입력 모달이 별도로 필요할 수 있습니다.)
 */
export const applyMemo = (): AnnotationResult | null => {
    const style: React.CSSProperties = {
        backgroundColor: 'rgba(255, 255, 102, 0.5)', 
        border: '1px dotted #ffcc00',
    };
    return surroundSelection('memo', style); 
};

export const removeMemo = (memoId: string): void => {
    removeAnnotation(memoId);
};