import * as S from "./CommentList.styles";

interface Props {
  highlightId: string; // ✅ string으로
}

const mockComments = [
    { id: 1, content: "입력된 코멘트(첫번째)", color: "#c93b4d" },
    { id: 2, content: "추가된 코멘트 1", color: "#2f6bdc" },
    { id: 3, content: "추가된 코멘트 2", color: "#2e7d32" },
    { id: 4, content: "추가된 코멘트 3", color: "#7b1fa2" },
];

const CommentList = ({     highlightId }: Props) => {
    // ✅ 지금은 데모니까 highlightId를 “사용”만 해줘도 린트/에러 방지됨
    // (나중에 GET /comments?highlightId= 붙일 때 여기서 사용)
    console.log("CommentList for highlightId:", highlightId);

    return (
        <S.List>
        {mockComments.map((comment) => (
            <S.Item key={comment.id} $color={comment.color}>
            {comment.content}
            </S.Item>
        ))}
        </S.List>
    );
};

export default CommentList;
