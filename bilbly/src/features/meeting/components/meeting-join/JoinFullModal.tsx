import MemberCircle from "../../../../components/MemberCircle";
import * as S from "./JoinFullModal.styles"; 
import * as G from '../../../../styles/GlobalStyle';
import NextBtn from "../../../../components/NextBtn"


type Member = {
    nickname: string;
    color: keyof typeof G.theme.colors;
}; 

type Props = {
    meetingName: string;
    members: Member[];
    onClose: () => void;
    };

    const JoinFullModal = ({ 
        meetingName,
        members, 
        onClose 
    }: Props) => {

return (
        <S.Backdrop>
            <S.Sheet>
                <S.MainBox>
                    <S.Title>{meetingName}</S.Title>
                    <S.Subtitle>이 모임을 정원이 채워져 가입할 수 없어요</S.Subtitle>
                </S.MainBox>

                {/* 멤버 MemberCircle */}
                <S.MemberRow>
                    {members.map((member, index) => (
                        <div
                        key={index}
                        style={{
                            marginLeft: index === 0 ? 0 : -12,  // 원을 겹치게 하기 위함
                            zIndex: index + 1,                 // 오른쪽 원이 위에 오도록
                            position: "relative"
                        }}
                        >
                        <MemberCircle
                            name={member.nickname}
                            color={member.color}
                        />
                        </div>
                    ))}
                </S.MemberRow>


                {/*NextBtn 컴포넌트 */}
                <NextBtn label="뒤로가기" onClick={onClose} />
            </S.Sheet>
        </S.Backdrop>
    );
};

export default JoinFullModal;
