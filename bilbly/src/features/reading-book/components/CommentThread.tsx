import { useState } from "react";
import CommentSubmitButton from "./CommentSubmitButton";
import type { Annotation } from "../../../utils/annotation/annotation.core";

interface Comment {
  id: string;
  content: string;
  isMine: boolean;
}

interface CommentThreadProps {
  annotation: Annotation;
  top: number;
  left: number;
  onClose: () => void;
  onSubmit: (content: string) => void; // API용
}

const CommentThread = ({
  annotation,
  top,
  left,
  onClose,
  onSubmit,
}: CommentThreadProps) => {
  /** ✅ 댓글은 반드시 state로 관리 */
  const [comments, setComments] = useState<Comment[]>([
    { id: "1", content: "입력된 코멘트(첫번째)", isMine: false },
    { id: "2", content: "추가된 코멘트 1", isMine: false },
  ]);

  const [content, setContent] = useState("");

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: 212,
        padding: 16,
        background: "#fffaf3",
        border: "1px solid #ddd",
        borderRadius: 8,
        zIndex: 100,
      }}
    >
      {/* 닫기 */}
      <div
        onClick={onClose}
        style={{ textAlign: "right", cursor: "pointer", marginBottom: 8 }}
      >
        ✕
      </div>

      {/* 🔥 드래그된 문장 */}
      <div
        style={{
          padding: "8px 12px",
          background: "#f5f5f5",
          borderRadius: 6,
          marginBottom: 12,
          fontSize: 14,
        }}
      >
        {annotation.text}
      </div>

      {/* 🔥 댓글 목록 */}
      <div style={{ marginBottom: 12 }}>
        {comments.map(c => (
          <div
            key={c.id}
            style={{
              padding: "6px 8px",
              background: c.isMine ? "#e3f2fd" : "#ffffff",
              borderRadius: 4,
              marginBottom: 6,
              fontSize: 14,
            }}
          >
            {c.content}
          </div>
        ))}
      </div>

      {/* 입력 */}
      <textarea
        placeholder="코멘트를 입력하세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        style={{
          width: "100%",
          minHeight: 60,
          padding: 8,
          fontSize: 14,
          marginBottom: 8,
        }}
      />

      <CommentSubmitButton
        onClick={() => {
          if (!content.trim()) return;

          const newComment: Comment = {
            id: Date.now().toString(),
            content,
            isMine: true,
          };

          /** ✅ 1. 화면에 즉시 추가 */
          setComments(prev => [...prev, newComment]);

          /** ✅ 2. API 연동은 여기서만 */
          onSubmit(content);

          /** ✅ 3. 스레드는 닫지 않음 */
          setContent("");
        }}
      />
    </div>
  );
};

export default CommentThread;
