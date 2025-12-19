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

  canDelete: boolean;

  isDeleteUiActive: boolean;

  onDeleteClick: () => void;
};

;

const ToolBar = ({
  position,
  onHighlight,
  onComment,
  onMemo,
  activeAnnotation,
  canDelete,
  isDeleteUiActive,
  onDeleteClick,
}: Props) => {
  if (!position) return null;

  const isAnnotationSelected = !!activeAnnotation;

  const shouldShowDeleteButton =
    isAnnotationSelected && isDeleteUiActive && canDelete;

  const memoClickHandler = () => {
    if (onMemo) {
      onMemo();
    }
  };

  return (
    <S.Container style={{ top: position.top, left: position.left }}>
      {/* 생성 버튼 */}
      <S.Highlight onClick={onHighlight} />
      <S.Comment onClick={onComment} />
      <S.Memo onClick={memoClickHandler} />

      {/* 삭제 버튼 */}
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