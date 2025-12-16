interface CommentEntryButtonProps {
  top: number;
  left: number;
  onClick: () => void;
}

const CommentEntryButton = ({ top, left, onClick }: CommentEntryButtonProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        zIndex: 50,
      }}
    >
      <button
        onClick={onClick}
        style={{
          padding: "10px 18px",
          borderRadius: "999px",
          background: "#111",
          color: "#fff",
          fontSize: "13px",
          border: "none",
          cursor: "pointer",
        }}
      >
        💬 코멘트 추가하기
      </button>
    </div>
  );
};

export default CommentEntryButton;
