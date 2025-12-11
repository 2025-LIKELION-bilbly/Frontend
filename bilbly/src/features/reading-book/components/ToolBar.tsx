// src/components/ToolBar.tsx

import * as S from "./ToolBar.styles"; 

// ⭐ ReadingBookPage.tsx에서 사용되는 통합 상태 타입 정의 재사용/가져오기
// 이 파일에서 AnnotationType을 직접 정의하거나, 공통 utils에서 가져와야 합니다.
type AnnotationType = 'highlight' | 'quote' | 'memo'; // 임시 정의 (실제로는 import 해야 함)

interface ActiveAnnotation {
    id: string;
    type: AnnotationType;
}

// Props 정의 수정: highlightId 대신 activeAnnotation을 받고 onComment를 필수화합니다.
type Props = {
    position: { top: number; left: number } | null;
    onHighlight: () => void;
    onComment: () => void; // 코멘트 버튼이 항상 존재할 수 있으므로 필수화
    onMemo?: () => void;
    
    // ⭐ 통합 상태 객체로 변경 (ID와 타입을 모두 받음)
    activeAnnotation: ActiveAnnotation | null; 
    onDeleteClick: () => void;
};

const ToolBar = ({ 
    position, 
    onHighlight, 
    onComment, 
    onMemo,
    activeAnnotation, // ⭐ activeAnnotation으로 받음
    onDeleteClick
}: Props) => {
    if (!position) return null;

    // activeAnnotation이 있으면 삭제/관리 모드, 없으면 생성 모드
    const isDeleteMode = !!activeAnnotation;

    // 만약 삭제 모드라면, 삭제 대상의 타입도 확인하여 UI/문구를 변경할 수 있습니다.
    // const targetType = activeAnnotation?.type; 

    return (
        <S.Container style={{ top: position.top, left: position.left }}>
            {isDeleteMode ? (
                // ⭐ 1. 삭제 모드일 때: 삭제 버튼만 표시
                <S.Delete onClick={onDeleteClick}>
                    ❌ 삭제
                </S.Delete>
            ) : (
                // 2. 생성 모드일 때 (텍스트 드래그 시): 기존 버튼들 표시
                <>
                    <S.Highlight onClick={onHighlight}></S.Highlight>
                    <S.Comment onClick={onComment}></S.Comment>
                    {onMemo && <S.Memo onClick={onMemo}></S.Memo>} 
                </>
            )}
        </S.Container>
    );
};

export default ToolBar;