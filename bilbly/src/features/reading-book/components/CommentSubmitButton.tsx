interface CommentSubmitButtonProps {
  onClick: () => void;
}

const CommentSubmitButton = ({ onClick }: CommentSubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: 16,
        padding: "14px",
        width: "100%",
        borderRadius: "999px",
        background: "#111",
        color: "#fff",
        fontSize: "14px",
        border: "none",
        cursor: "pointer",
      }}
    >
      ✔ 등록하기
    </button>
  );
};

export default CommentSubmitButton;
