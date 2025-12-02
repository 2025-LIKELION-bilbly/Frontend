import MemberCircle from "../../../../components/MemberCircle";
import NextBtnTwo from "../../../../components/NextBtnTwo";
import * as S from "./JoinConfirmModal.styles";
import * as G from '../../../../styles/GlobalStyle';

type Member = {
    nickname: string;
    color: keyof typeof G.theme.colors;
}; 


type Props = {
    meetingName: string;
    members: Member[];
    onClose: () => void;
    onConfirm: () => void;
};

const JoinConfirmModal = ({
    meetingName,
    members,
    onClose,
    onConfirm
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


                {/*NextBtnTwo 컴포넌트 */}
                <NextBtnTwo
                    leftLabel="돌아가기"
                    rightLabel="참여하기"
                    onLeftClick={onClose}
                    onRightClick={onConfirm}
                />
            </S.Sheet>
        </S.Backdrop>
    );
};

export default JoinConfirmModal;
