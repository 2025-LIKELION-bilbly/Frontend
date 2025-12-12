// src/components/ToolBar.tsx


import * as S from "./ToolBar.styles"; 

// ActiveAnnotation 타입 (유지)
type AnnotationType = 'highlight' | 'quote' | 'memo'; 

interface ActiveAnnotation {
    id: string;
    type: AnnotationType;
}

// ⭐ Props 정의: isDeleteUiActive 포함 (유지)
type Props = {
    position: { top: number; left: number } | null;
    onHighlight: () => void;
    onComment: () => void; 
    onMemo?: () => void;
    
    activeAnnotation: ActiveAnnotation | null; 
    isDeleteUiActive: boolean; // ⭐ 새로 추가된 Prop
    onDeleteClick: () => void;
};

const ToolBar = ({ 
    position, 
    onHighlight, 
    onComment, 
    onMemo,
    activeAnnotation, 
    isDeleteUiActive, // Prop으로 받기
    onDeleteClick
}: Props) => {
    if (!position) return null;

    const isAnnotationSelected = !!activeAnnotation;
    
    // ⭐ 삭제 버튼 표시 조건: 주석이 선택되었고 (1차 클릭) AND 삭제 UI가 활성화되었을 때 (2차 재클릭)
    const shouldShowDeleteButton = isAnnotationSelected && isDeleteUiActive;

    return (
        <S.Container style={{ top: position.top, left: position.left }}>
            
            {/* 1. 생성 버튼들 (항상 표시) */}
            <S.Highlight onClick={onHighlight} />
            <S.Comment onClick={onComment} />
            {onMemo && <S.Memo onClick={onMemo} />} 

            {/* 2. ⭐ 삭제 버튼 (재클릭 시만 표시) */}
            {shouldShowDeleteButton && (
                <>
                    <S.Separator />
                    <S.DeleteButton onClick={onDeleteClick}>
                        삭제
                    </S.DeleteButton>
                </>
            )}
        </S.Container>
    );
};

export default ToolBar;