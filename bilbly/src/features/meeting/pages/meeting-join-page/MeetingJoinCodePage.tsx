import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./MeetingJoinCodePage.styles";
import * as G from "../../../../styles/GlobalStyle";
import NextBtn from "../../../../components/NextBtn";
import CodeInput from "../../components/CodeInputBox"; // 코드 입력 컴포넌트
import CodeErrorToast  from "../../components/meeting-join/CodeErrorToast"; // 코드 오류 토스트 컴포넌트
import JoinConfirmModal from "../../components/meeting-join/JoinConfirmModal";  // 모임 확인용 모달
import JoinFullModal from "../../components/meeting-join/JoinFullModal"; // 꽉찬 모임 화면 모달
import { getDemoMeetingCode } from "../../../../store/DemoMeetingCode"; // ✨ 추후 연동시 수정: 데모 코드 테스트 위함

type Member = {
    nickname: string;
    color: keyof typeof G.theme.colors;
};

type Meeting = {
    name: string;
    period: number;
    members: Member[];
};

//✨ 추후 연동시 수정: 테스트를 위한 데모 데이터
const MOCK_MEETINGS: Record<string, Meeting> = {
    "9999": {
        name: "C.3.1.1 독서모임",
        period: 3,
        members: [
        { nickname: "강아지", color: "userRose" },
        { nickname: "강백호", color: "userBlue" },
        { nickname: "강동원", color: "userLime" },
        { nickname: "강동원", color: "userGreen" },
        { nickname: "강동원", color: "userBrown" },
        { nickname: "강동원", color: "userMint" },
        { nickname: "강동원", color: "userPink" },
        { nickname: "강동원", color: "userViolet" }
        ]
    },
    "1234": {
        name: "월요일 저녁 모임",
        period: 3,
        members: [
        { nickname: "박철수", color: "userPink" },
        { nickname: "이영희", color: "userMint" }
        ]
    }
};


const MeetingJoinCodePage = () => {
    const navigate = useNavigate();
    
    const [code, setCode] = useState("    "); // 빈 4칸으로 초기화
    const trimmedCode = code.replace(/\s/g, ""); // 코드 빈칸 없애기
    const isValid = trimmedCode.length === 4; // 4칸 모두 입력됐는지 확인

    const [errorToastVisible, setErrorToastVisible] = useState(false);  // 코드 입력 오류시 토스트

    // 모임 확인 모달 상태
    const [showModal, setShowModal] = useState(false);
    
    // 모임 다 찼을 때의 모달 상태
    const [showFullModal, setShowFullModal] = useState(false);

    
    // 연동시 삭제 예정
    const [meetingName, setMeetingName] = useState("");
    const [members, setMembers] = useState<Member[]>([]);


    // ✨ 추후 연동시 수정: 새로 만들어진 랜덤 코드
    const correctCode = getDemoMeetingCode();  
    // ✨ 추후 연동시 수정: 테스트 위해 이미 만들어진 코드 꺼내오기(데모용 코드)
    const createdCode = MOCK_MEETINGS[trimmedCode];  

// 💡 trimmedCode가 정답확인용 코드

    // ➡️ 코드 확인 변수
    const handleNext = () => {
        if (!isValid) return;

      // 1) 랜덤 생성된 코드 
        if (trimmedCode === correctCode) { // 나중에 모달 뜨도록 수정
            setMeetingName("새로 생성된 모임");  // ✨ 추후 연동시 수정: 새로 만들어진 모임 이름 불러와야 함
            setMembers([]); 
            setShowModal(true);
            return;
        }

        // 2) 데모용 코드(나중에 이와 같은 모달 형식 사용)
        if (createdCode) {

            // 데모용 코드에서 사람이 8명 이상일 때
            if (createdCode.members.length >= 8) {
                setMeetingName(createdCode.name);
                setMembers(createdCode.members);
                setShowFullModal(true); 
                return;
            }

            setMeetingName(createdCode.name);
            setMembers(createdCode.members);
            setShowModal(true);
            return;
        }

        // 3) 둘 다 아니라면 → 오류 토스트
        setErrorToastVisible(true);
    };

    // <참여하기> 버튼 누른 다음 이동
    const handleConfirmJoin = () => {
        navigate(`/meeting/join/${trimmedCode}/2`, {
            state: {
                members,     // 현재 모임의 멤버 데이터 전달 ➡️ 추후 수정
                meetingName,   // 모임 이름 전달 ➡️ 추후 수정
            }
        });
    };



    return (
        <>
        <S.Container>
            <S.MainContainer>
                <S.MainBox1>
                    <S.StepText>1/3</S.StepText>
                    <S.Title>참여코드를 입력해 주세요</S.Title>
                    <S.Subtitle>참여할 모임의 코드를 입력해주세요</S.Subtitle>          
                </S.MainBox1>


                {/* 입력 모드로 랜덤 생성한 코드 표시 */}
                {/* ✨ 추후 수정 예정: 데모파일에다가 입력값을 보냄 */}
                <CodeInput 
                    value={code}
                    onChange={setCode} 
                    readOnly={false}
                />
            </S.MainContainer>

            {/* 에러 토스트 */}
            {errorToastVisible && (
                <CodeErrorToast
                    duration={1500}
                    onClose={() => setErrorToastVisible(false)}
                />
            )}

            {/* 모임 확인 모달 */}
            {showModal && (
                <JoinConfirmModal
                    meetingName={meetingName}
                    members={members}
                    onClose={() => setShowModal(false)}   
                    onConfirm={handleConfirmJoin}
                />
            )}


            {/* 꽉 찬 모임 확인 모달 */}
            {showFullModal && (
                <JoinFullModal
                    meetingName={meetingName}
                    members={members}
                    onClose={() => setShowFullModal(false)}
                />
            )}

            <S.BottomArea>
                <NextBtn 
                    label="다음으로" 
                    state={isValid ? "valid" : "invalid"}
                    onClick={handleNext} 
                />
            </S.BottomArea>
        </S.Container>
        </>
    );
};

export default MeetingJoinCodePage;
