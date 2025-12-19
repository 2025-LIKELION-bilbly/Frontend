import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './LandingPage.styles';
import Header from '../../../components/Header'; 
import Navbar from '../../../components/BottomNavBar'; 
import MeetingSelector from '../../home/pages/MeetingSelector';
import CategoryTabs from '../../home/pages/CategoryTabs';
import api from '../../../api/apiClient';
import { getMyGroups } from '../../../api/group.api';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
    <path d="M0.5 0.5L8 8L0.5 15.5" stroke="#100F0F" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const convertDriveUrl = (url: string) => {
    if (!url) return "";
    if (url.includes('drive.google.com')) {
        const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
        if (idMatch && idMatch[1]) return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w500`;
    }
    return url;
};

function LandingPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<any[]>([]);
  const [groupName, setGroupName] = useState("");
  const [currentGroupId, setCurrentGroupId] = useState<number | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const groups = await getMyGroups();
        if (groups && groups.length > 0) {
          // 💡 가장 최근 모임(groupId: 82 등)을 자동으로 타겟팅
          const firstGroup = groups[0];
          const groupId = firstGroup.groupId;
          setCurrentGroupId(groupId);
          setGroupName(firstGroup.groupName || firstGroup.name);

          // 📡 멤버 현황 조회
          const res = await api.get(`/v1/assignments/groups/${groupId}/current`);
          if (res.data && res.data.success) {
            const memberList = res.data.data.memberAssignments || [];
            console.log("🔍 [랜딩페이지 데이터 확인]:", memberList);
            setMembers(memberList);
          }
        }
      } catch (error) {
        console.error("현황 조회 실패:", error);
      }
    };
    fetchStatus();
  }, []);

  const handleStartExchange = () => {
    if (!currentGroupId) return;
    navigate('/exchange/start', { state: { groupId: currentGroupId } });
  };

  return (
    <S.Container>
      <Header />
      <MeetingSelector groupName={groupName} />
      
      {/* 💡 하니 닉네임이 탭에 포함되는지 확인 */}
      <CategoryTabs members={members.map(m => m.nickname)} />

      <S.BookImageContainer>
        {members.map((member) => (
          <S.BookWrapper key={member.memberId}>
            {/* 💡 이미지가 없더라도 (하니가 책을 안 골랐어도) 래퍼는 생성됨 */}
            {member.coverImageUrl ? (
              <S.BookImage 
                src={convertDriveUrl(member.coverImageUrl)} 
                alt={member.nickname} 
              />
            ) : (
              <S.BookPlaceholder>
                {/* 💡 하니의 닉네임을 여기에 표시하여 누락 방지 */}
                {member.nickname}<br/>책 고르는 중
              </S.BookPlaceholder>
            )}
            <S.Nickname>{member.nickname}</S.Nickname>
          </S.BookWrapper>
        ))}
      </S.BookImageContainer>

      <S.BottomSection>
        <S.SectionTitle>교환독서를 시작할까요?</S.SectionTitle>
        <S.ActionBtn onClick={handleStartExchange}>
          교환독서 시작하기
          <ArrowIcon />
        </S.ActionBtn>
      </S.BottomSection>

      <S.BottomSection>
        <S.SectionTitle>기다리는 동안<br />새로운 모임은 어떠세요?</S.SectionTitle>
        <S.ActionBtn $isLast onClick={() => navigate('/meeting/create/step')}>
          새로운 모임 생성/참여하기
          <ArrowIcon />
        </S.ActionBtn>
      </S.BottomSection>
      
      <Navbar />
    </S.Container>
  );
}

export default LandingPage;