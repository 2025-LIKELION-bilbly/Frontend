import styled from "styled-components";

interface Props {
    onClose: () => void;
}

export default function HighlightBlockedModal({ onClose }: Props) {
    return (
        <Dim>
        <Box>
            <p>추가 코멘트가 있어 삭제할 수 없어요.</p>
            <button onClick={onClose}>확인</button>
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

    button {
        margin-top: 16px;
        padding: 10px 20px;
    }
`;
