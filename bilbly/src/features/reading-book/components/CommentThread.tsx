import { useState } from "react";
import type { Annotation } from "../../../utils/annotation/annotation.core";
import CommentInput from "./CommentInput";

interface CommentThreadProps {
  annotation: Annotation;
  top: number;
  left: number;
  onClose: () => void;
  onSubmit: (content: string) => void;
}

const THREAD_MAX_HEIGHT = 360; // ⭐ ModeToggle 위까지만

const CommentThread = ({
  annotation,
  top,
  left,
  onClose,
  onSubmit,
}: CommentThreadProps) => {
  const [comments, setComments] = useState<
    { id: string; content: string; isMine: boolean }[]
  >(annotation.comments ?? []);


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
        style={{ textAlign: "right", cursor: "pointer"}}
      >
        ✕
      </div>

      {/* 드래그된 문장 (고정) */}
      <div
        style={{
          marginBottom: 12,
          fontSize: 14,
          flexShrink: 0,

          /* 2줄 말줄임 처리 */
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          lineHeight: "1.4em",
          maxHeight: "2.8em",

          /* 아래 구분선 */
          borderBottom: "1px solid #ddd",
          paddingBottom: 8,
        }}
      >
        {annotation.text}
      </div>


      {/* 댓글 리스트 (스크롤 영역) */}
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
            }}
          >
            {c.content}
          </div>
        ))}
      </div>

      {/* 입력 영역 (고정) */}
      <CommentInput
        onSubmit={content => {
          const newComment = {
            id: Date.now().toString(),
            content,
            isMine: true,
          };

          // ✅ 스레드에 즉시 추가
          setComments(prev => [...prev, newComment]);

          // ✅ API 연동용
          onSubmit(content);
        }}
      />
    </div>
  );
};

export default CommentThread;
