import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "styled-components";
import { useState } from "react";
import * as S from "./MeetingJoinColorPage.styles";
import ColorSelectBox from "../../components/ColorSelectBox";
import NextBtn from "../../../../components/NextBtn";
import UsedColorToast from "../../components/meeting-join/UsedColorToast";

import { COLOR_OPTIONS, type BgKey, toBackendColor } from "../../../../styles/ColorUtils";
import { joinGroup } from "../../../../api/group.api";


type Member = {
    nickname: string;
    color: BgKey;
};

type LocationState = {
    groupId: number;
    groupName: string;
    members: Member[];
    nickname: string;
};

const MeetingJoinColor = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();

    const { groupId, members, nickname } =
        (location.state as LocationState) || {};

    const [selectedColor, setSelectedColor] = useState<BgKey | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);

    // 이미 사용 중인 색상
    const usedColors: BgKey[] = members.map((m) => m.color);

    const handleSelect = (bgKey: BgKey) => {
        if (usedColors.includes(bgKey)) {
        setShowToast(true);
        return;
        }
        setSelectedColor((prev) => (prev === bgKey ? null : bgKey));
    };

    /* =====================
    * 참여 확정 
    * ===================== */
    const handleNext = async () => {
        if (!selectedColor || loading) return;

        try {
        setLoading(true);

        console.log("joinGroup 호출", {
            groupId,
            nickname,
            color: toBackendColor(selectedColor),
        });

        const res = await joinGroup(groupId, {
            nickname,
            color: toBackendColor(selectedColor),
        });

        console.log("joinGroup 성공 응답:", res);

        // 참여 완료 후 다음 화면으로
        navigate(`/meeting/join/${code}/4`, {
            state: {
            groupId: res.groupId,
            groupName: res.groupName,
            members: res.members,
            },
        });
        } catch (e) {
        console.error("모임 참여 실패", e);
        } finally {
        setLoading(false);
        }
    };

    return (
        <S.Container>
        <S.MainContainer>
            <S.MainBox1>
            <S.StepText>3/3</S.StepText>
            <S.Title>사용할 색을 설정해 주세요</S.Title>
            <S.SubTitle>
                글씨, 메모, 프로필 색으로 사용돼요
                <br />
                한 번 설정하면 바꿀 수 없어요
            </S.SubTitle>
            </S.MainBox1>

            <S.ColorGrid>
            {COLOR_OPTIONS.map((opt) => {
                const isUsed = usedColors.includes(opt.bgKey);

                return (
                <ColorSelectBox
                    key={opt.bgKey}
                    label={opt.label}
                    bgColor={theme.colors[opt.bgKey]}
                    textColor={theme.colors[opt.textKey]}
                    selected={selectedColor === opt.bgKey}
                    isUsed={isUsed}
                    onClick={() => handleSelect(opt.bgKey)}
                />
                );
            })}
            </S.ColorGrid>
        </S.MainContainer>

        {showToast && (
            <UsedColorToast
            duration={1500}
            onClose={() => setShowToast(false)}
            />
        )}

        <S.BottomArea>
            <NextBtn
            label="완료"
            state={selectedColor && !loading ? "valid" : "default"}
            onClick={handleNext}
            />
        </S.BottomArea>
        </S.Container>
    );
};

export default MeetingJoinColor;
