import { useState } from "react";
import CommentSubmitButton from "./CommentSubmitButton";
import type { Annotation } from "../../../utils/annotation/annotation.core";

interface CommentThreadProps {
  annotation: Annotation;
  top: number;
  left: number;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const CommentThread = ({
  annotation,
  top,
  left,
  onClose,
  onSubmit,
}: CommentThreadProps) => {
  const [content, setContent] = useState("");

  // 🔥 지금은 fake 댓글
  const comments = [
    "입력된 코멘트(첫번째)",
    "추가된 코멘트 1",
  ];

  return (
<div
  style={{
    position: "absolute",
    top,
    left,
    width: 280,
    padding: 16,
    background: "#fffaf3",
    border: "1px solid #ddd",
    zIndex: 100,
  }}
>
      {/* 닫기 */}
      <div
        onClick={onClose}
        style={{ textAlign: "right", cursor: "pointer" }}
      >
        ✕
      </div>

      {/* 하이라이트 문장 */}
      <div style={{ marginBottom: 12, fontWeight: 600 }}>
        {annotation.text.slice(0, 40)}...
      </div>

      {/* 댓글 목록 */}
      <div style={{ marginBottom: 12 }}>
        {comments.map((c, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            {c}
          </div>
        ))}
      </div>

      {/* 입력 */}
      <textarea
        placeholder="코멘트를 입력..."
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{
          width: "100%",
          minHeight: 60,
          padding: 8,
          fontSize: 14,
        }}
      />

      <CommentSubmitButton
        onClick={() => {
          if (!content.trim()) return;
          onSubmit(content);
          setContent("");
        }}
      />
    </div>
  );
};

export default CommentThread;
