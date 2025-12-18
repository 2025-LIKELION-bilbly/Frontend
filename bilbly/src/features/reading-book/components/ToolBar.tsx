import * as S from "./ToolBar.styles"; 



type ActiveAnnotation = {id: string};

type Props = {
  position: { top: number; left: number } | null;

  // 생성
  onHighlight: () => void;
  onComment: ( ) => void;
  onMemo?: () => void;

  // 선택 상태
  activeAnnotation: ActiveAnnotation | null;

  // 삭제 가능 여부
  canDelete: boolean;

  // 재클릭 상태
  isDeleteUiActive: boolean;

  onDeleteClick: () => void;
};

;

const ToolBar = ({
  position,
  onHighlight,
  onMemo,
  onComment,
  activeAnnotation,
  canDelete,
  isDeleteUiActive,
  onDeleteClick,
}: Props) => {
  if (!position) return null;

  const isAnnotationSelected = !!activeAnnotation;

  // 내 annotation + 재클릭 상태일 때만 삭제 버튼
  const shouldShowDeleteButton = isAnnotationSelected && isDeleteUiActive && canDelete;

  

  return (
    <S.Container style={{ top: position.top, left: position.left }}>

      {/* 생성 버튼 */}
      <S.Highlight onClick={onHighlight} />

{/* 
      하이라이트에서 선택된 상태에서 comment, memo */}
      <S.Comment
        onClick={onComment}
        disabled={!isAnnotationSelected}
      />
      <S.Memo
        onClick={onMemo}
        disabled={!isAnnotationSelected}
      />

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