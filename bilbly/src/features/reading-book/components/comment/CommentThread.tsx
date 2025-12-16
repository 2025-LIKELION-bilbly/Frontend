import { useState } from "react";
import * as S from "./CommentThread.styles";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import AddCommentButton from "./AddCommentButton";

interface Props {
    highlightId: string;
    autoFocus?: boolean;
}

const CommentThread = ({ highlightId, autoFocus }: Props) => {
    const [isWriting, setIsWriting] = useState<boolean>(!!autoFocus);

    return (
        <S.Wrapper>
        {/* 선택된 문장 요약 */}
        <S.ContextText>
            책 내용내용내용(저장된 위치의 원문)
        </S.ContextText>

        <CommentList highlightId={highlightId} /> 
        // 사용자들이 입력한 코멘트 목록

        {isWriting ? (
            <CommentInput
            autoFocus
            onSubmit={() => setIsWriting(false)}
            />
        ) : (
            <AddCommentButton onClick={() => setIsWriting(true)} />
        )}
        </S.Wrapper>
    );
};

export default CommentThread;
