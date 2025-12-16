import { useState } from "react";
import * as S from "./CommentInput.styles";
import SubmitButton from "./SubmitButton";

interface Props {
    autoFocus?: boolean;
    onSubmit: (content: string) => void;
}

const CommentInput = ({ autoFocus, onSubmit }: Props) => {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        if (!value.trim()) return;
        onSubmit(value);
        setValue("");
    };

    return (
        <S.Wrapper>
        <S.InputArea
            autoFocus={autoFocus}
            placeholder="코멘트를 입력..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />

        <SubmitButton
            onClick={handleSubmit}
            disabled={!value.trim()}
        />
        </S.Wrapper>
    );
};

export default CommentInput;
