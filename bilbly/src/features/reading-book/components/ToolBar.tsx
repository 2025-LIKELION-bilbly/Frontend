// src/components/ToolBar.tsx (요구사항 반영 수정안)

import * as S from "./ToolBar.styles"; 

// ActiveAnnotation 타입 (유지)
type AnnotationType = 'highlight' | 'quote' | 'memo'; 

interface ActiveAnnotation {
    id: string;
    type: AnnotationType;
}

type Props = {
    position: { top: number; left: number } | null;
    onHighlight: () => void;
    onComment: () => void;
    onMemo?: () => void; 

    activeAnnotation: ActiveAnnotation | null;
    isDeleteUiActive: boolean;
    onDeleteClick: () => void;
};

const ToolBar = ({ 
    position, 
    onHighlight, 
    onComment, 
    onMemo,
    activeAnnotation, 
    isDeleteUiActive,
    onDeleteClick
}: Props) => {
    if (!position) return null;

    const isAnnotationSelected = !!activeAnnotation;
    
    // ⭐ 주석이 선택되었고, 삭제 UI가 활성화되었을 때 (재클릭 시)
    const shouldShowDeleteButton = isAnnotationSelected && isDeleteUiActive;

    // --- 주석 관리/생성 모드 분리 로직을 삭제하고, 항상 생성 버튼을 표시합니다. ---
    
    // onMemo가 전달되지 않았을 경우, 클릭 시 오류를 피하기 위해 더미 함수를 사용합니다.
    const memoClickHandler = () => {
        if (onMemo) {
            console.log("1. ✅ ToolBar: 'onMemo' prop을 통해 클릭 이벤트 전달 시작");
            onMemo();
        } else {
            console.error("1. 🛑 ToolBar: 'onMemo' 핸들러가 정의되지 않았습니다. 클릭 무시.");
        }
    };


    return (
        <S.Container style={{ top: position.top, left: position.left }}>
            
            {/* 1. 생성 버튼들 (주석 선택 여부와 관계없이 항상 표시) */}
            <S.Highlight onClick={onHighlight} />
            <S.Comment onClick={onComment} />
            <S.Memo onClick={memoClickHandler}  />


            {/* 2. ⭐ 삭제 버튼 (주석이 선택되었고, 재클릭 상태일 때만 표시) */}
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