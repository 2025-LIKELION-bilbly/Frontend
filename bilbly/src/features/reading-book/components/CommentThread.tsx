import type { Annotation } from "../../../utils/annotation/annotation.core";
import CommentInput from "./CommentInput";

interface CommentThreadProps {
  annotation: Annotation;
  comments: { id: string; content: string; isMine: boolean }[];
  top: number;
  left: number;
  onClose: () => void;
  onAddComment: (comment: {
    id: string;
    content: string;
    isMine: boolean;
  }) => void;
}

const THREAD_MAX_HEIGHT = 360;

const CommentThread = ({
  annotation,
  comments,
  top,
  left,
  onClose,
  onAddComment,
}: CommentThreadProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: 212,
        maxHeight: THREAD_MAX_HEIGHT,
        padding: "8px 16px 16px 16px",
        background: "#FFFCF8",
        border: "1px solid #100F0F",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 닫기 */}
      <div
        onClick={onClose}
        style={{ textAlign: "right", cursor: "pointer" }}
      >
        ✕
      </div>

      {/* 🔹 드래그된 문장 */}
      <div
        style={{
          marginBottom: 12,
          fontSize: 14,
          flexShrink: 0,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: "1.4em",
          maxHeight: "2.8em",
          borderBottom: "1px solid #ddd",
          paddingBottom: 8,
        }}
      >
        {annotation.text}
      </div>

      {/* 🔹 댓글 리스트 (스크롤) */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: 12,
        }}
      >
        {comments.map(c => (
          <div
            key={c.id}
            style={{
              padding: "6px 8px",
              fontSize: 14,
              color: c.isMine ? "#100F0F" : "#555",
            }}
          >
            {c.content}
          </div>
        ))}
      </div>

      {/* 🔹 입력 */}
      <CommentInput
        onSubmit={content => {
          onAddComment({
            id: Date.now().toString(),
            content,
            isMine: true,
          });
        }}
      />
    </div>
  );
};

export default CommentThread;
