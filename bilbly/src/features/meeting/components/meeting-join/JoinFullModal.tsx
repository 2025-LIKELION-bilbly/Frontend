import MemberCircle from "../../../../shared/components/MemberCircle";
import * as S from "./JoinFullModal.styles"; 
import * as G from '../../../../styles/GlobalStyle';
import NextBtn from "../../components/NextBtn"


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
                    <S.Subtitle>이 모임에 참여하는 게 맞나요?</S.Subtitle>
                </S.MainBox>

                {/* 멤버 MemberCircle */}
                <S.MemberRow>
                    {members.map((member, index) => (
                        <div
                        key={index}
                        style={{
                            marginLeft: index === 0 ? 0 : -12,  // ⭐ 겹치게 하는 핵심
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
