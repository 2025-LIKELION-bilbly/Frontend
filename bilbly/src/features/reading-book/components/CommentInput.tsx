import { useState } from "react";

interface CommentInputProps {
  onSubmit: (content: string) => void;
}

import CommentSubmitButton from "./CommentSubmitButton";

const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <div>
      {/* 입력 영역 */}
      <textarea
        placeholder="코멘트를 입력..."
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={1}
        style={{
          width: "100%",
          border: "none",
          borderBottom: "1px solid #111",
          background: "transparent",
          resize: "none",
          outline: "none",
          fontSize: 14,
          padding: "8px",
          lineHeight: "1.4",
          color: "#100F0F",
          marginBottom: 12,
        }}
        onInput={e => {
          const el = e.currentTarget;
          el.style.height = "auto";
          el.style.height = el.scrollHeight + "px";
        }}
      />

      {/* 등록 버튼 */}
    <CommentSubmitButton onClick={handleSubmit} />
    </div>
  );
};

export default CommentInput;
