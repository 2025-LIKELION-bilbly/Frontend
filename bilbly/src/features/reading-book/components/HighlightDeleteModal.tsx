import styled from "styled-components";

interface Props {
    onCancel: () => void;
    onConfirm: () => void;
}

export default function HighlightDeleteModal({ onCancel, onConfirm }: Props) {
    return (
        <Dim>
        <Box>
            <p>형광펜을 삭제하시겠어요?</p>
            <Buttons>
            <button onClick={onCancel}>취소</button>
            <button className="danger" onClick={onConfirm}>
                삭제
            </button>
            </Buttons>
        </Box>
        </Dim>
    );
}

const Dim = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.35);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 260px;
    text-align: center;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;

    button {
        flex: 1;
        margin: 0 4px;
        padding: 10px;
        border-radius: 8px;
        border: none;
    }

    .danger {
        background: #ff4d4f;
        color: white;
    }
`;
