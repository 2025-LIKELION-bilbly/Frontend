import { useNavigate } from "react-router-dom";

const ReadingTestStart = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: 24, textAlign: "center" }}>
            <h1>📚 책 읽기 테스트</h1>
            <p>모임 생성 없이, 책 선택 없이 바로 테스트할 수 있어요.</p>

            <button
                onClick={() => navigate("/reading/1/1")} // api 연동시 수정 -> bookid, pagenumber
                style={{
                    padding: "12px 20px",
                    fontSize: 16,
                    background: "#333",
                    color: "white",
                    borderRadius: 8,
                    border: "none",
                    marginTop: 20,
                }}
            >
                읽기 페이지로 이동
            </button>
        </div>
    );
};

export default ReadingTestStart;
