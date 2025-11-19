import { useEffect, useState,  } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./CodeDisplayPage.styles";
import NextBtn from "../../components/NextBtn";
import CodeInput from "../../components/meeting-create/CodeInputBox";
import CodeCopyToast  from "../../components/meeting-create/CodeCopyToast";

// 4자리 숫자 랜덤  생성  
const generateCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); 
};

const CodeDisplayPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("    "); // 빈 4칸으로 초기화
  const [toastVisible, setToastVisible] = useState(false); // ✨ 코드 복사 토스트 상태 관리


  useEffect(() => {
    setTimeout(() => {
      setCode(generateCode());
    }, 0);
  }, []);


  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setToastVisible(true);
    // alert("코드가 복사되었어요!");
  };

  // 책 선택 인트로 페이지로 이동
  const handleNext = () => {
    navigate("/meeting/create/complete/");
  };

  return (
    <>
    <S.Container>
      <S.MainContainer>
        <S.MainBox1>
          <S.Confetti />
          <S.Title>환영합니다!</S.Title>
          <S.Subtitle>
            코드를 복사해 모임원을 초대하세요
            <br />
            코드는 7일 동안 유효해요
          </S.Subtitle>          
        </S.MainBox1>


        <S.DateText>~2025.09.10</S.DateText>

        {/* readOnly 모드로 랜덤 생성한 코드 표시 */}
        <CodeInput readOnly value={code} />  

        <S.CopyButton onClick={handleCopy}>코드 복사하기</S.CopyButton>
          
      </S.MainContainer>

      <S.BottomArea>
        <NextBtn label="다음으로" state="valid" onClick={handleNext} />
      </S.BottomArea>
    </S.Container>


    {toastVisible && (
      <CodeCopyToast
        duration={1200}
        onClose={() => setToastVisible(false)}
      />
    )}
    </>
  );
};

export default CodeDisplayPage;
