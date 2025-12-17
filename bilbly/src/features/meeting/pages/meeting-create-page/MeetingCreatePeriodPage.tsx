import * as S from "./MeetingCreatePeriodPage.styles";
import NextBtn from "../../../../components/NextBtn";

type MeetingCreatePeriodProps = {
    readingPeriod: number;
    setReadingPeriod: (v: number) => void;
    onNext: () => void;
    };


const MeetingCreatePeriod = ({ 
    readingPeriod,
    setReadingPeriod,
    onNext, 
}: MeetingCreatePeriodProps) => {
    const periodInput = readingPeriod === 0 ? "" : String(readingPeriod);

    const period = Number(periodInput);

    const isValid = period >= 7 && period <= 60;
    const isInvalid = periodInput.length > 0 && !isValid;

    const buttonState = periodInput.length === 0 ? "default" : isValid ? "valid" : "invalid";


    const handleNext = () => {
        console.log("readingPeriod: ", period);
        
        if (buttonState !== "valid") return;  // 조건 불만족하면 이동 막기
        onNext(); // 만족하면 이동
    };

    return (
        <S.Container>
            <S.MainContainer>
                <S.MainBox1>
                    <S.StepText>2/4</S.StepText>

                    <S.Title>독서 기간을 정해주세요</S.Title>
                    <S.SubTitle>언제를 주기로 교환할까요?</S.SubTitle>
                </S.MainBox1>

                <S.MainBox2>
                    <S.InputWrapper>
                        <S.InputField
                            value={periodInput}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setReadingPeriod(Number.isNaN(value) ? 0 : value);
                            }}
                            placeholder="기간을 입력해 주세요"
                            $isInvalid={isInvalid}
                        />

                        <S.Desc $isInvalid={isInvalid}>
                        7~60일 사이 설정 가능해요
                        </S.Desc>
                    </S.InputWrapper>
                    <S.DateLabel>일</S.DateLabel>
                </S.MainBox2>
            </S.MainContainer>

                <S.BottomArea>
                    <NextBtn label="다음으로" state={buttonState} onClick={handleNext} />
                </S.BottomArea>
        </S.Container>
    );
};

export default MeetingCreatePeriod;
