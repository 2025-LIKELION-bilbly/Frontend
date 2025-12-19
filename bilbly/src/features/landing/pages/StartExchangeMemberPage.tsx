import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../pages/LandingPage.styles'; 
import Header from '../../../components/Header'; 
import Navbar from '../../../components/BottomNavBar';
import MeetingSelector from '../../home/pages/MeetingSelector';
import CategoryTabs from '../../home/pages/CategoryTabs';
import api from '../../../api/apiClient';

// 💡 구글 드라이브 등 외부 이미지 URL이 깨지지 않도록 변환하는 함수
const convertDriveUrl = (url: string) => {
  if (!url || url === "string") return "";
  if (url.includes('drive.google.com')) {
    const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
    if (idMatch && idMatch[1]) return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
  }
  return url;
};

interface MemberPageProps {
  groupId: number;
  passedGroupName: string;
}

function StartExchangeMemberPage({ groupId, passedGroupName }: MemberPageProps) {
  const navigate = useNavigate();
  const [members, setMembers] = useState<any[]>([]);
  const [hasSelectedBook, setHasSelectedBook] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!groupId) {
        setLoading(false);
        return;
      }
      
      try {
        // 📡 API 연동: /v1/assignments/groups/{groupId}/current
        const res = await api.get(`/v1/assignments/groups/${groupId}/current`);
        
        if (res.data && res.data.success) {
          const mList = res.data.data.memberAssignments || [];
          console.log("🔍 [하니 화면 멤버 데이터]:", mList);
          setMembers(mList);
          
          const userId = localStorage.getItem('userId');
          const me = mList.find((m: any) => String(m.memberId) === String(userId));
          
          // 💡 본인이 책을 골랐는지 여부를 판단 (hasBook 필드 활용)
          if (me?.hasBook || me?.coverImageUrl) {
            setHasSelectedBook(true);
          }
        }
      } catch (error) {
        console.error("멤버 현황 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [groupId]);

  if (loading) return <S.Container><Header /><div>데이터 로딩 중...</div></S.Container>;

  return (
    <S.Container>
      <Header />
      <MeetingSelector groupName={passedGroupName} />
      <CategoryTabs members={members.map(m => m.nickname)} />
      
      <S.BookImageContainer>
        {members.map((member) => (
          <S.BookWrapper key={member.memberId}>
            {/* 💡 서버 API의 hasBook이 true이고 이미지 주소가 있을 때만 렌더링 */}
            {member.hasBook && member.coverImageUrl && member.coverImageUrl !== "string" ? (
              <S.BookImage 
                src={convertDriveUrl(member.coverImageUrl)} 
                alt={member.nickname} 
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // 이미지 로드 실패 시 숨김
                }}
              />
            ) : (
              <S.BookPlaceholder>
                {member.nickname}<br/>책 고르는 중
              </S.BookPlaceholder>
            )}
            <S.Nickname>{member.nickname}</S.Nickname>
          </S.BookWrapper>
        ))}
      </S.BookImageContainer>

      <S.BottomSection>
        <S.SectionTitle>
          {hasSelectedBook ? "기다리는 동안\n새로운 모임은 어떠세요?" : "교환할 책을 골라보세요"}
        </S.SectionTitle>
        <S.ActionBtn onClick={() => navigate(hasSelectedBook ? '/meeting/create/step' : '/select-book', { state: { groupId } })}>
          {hasSelectedBook ? "새로운 모임 생성/참여하기" : "책 고르러 가기"}
        </S.ActionBtn>
      </S.BottomSection>
      
      <Navbar />
    </S.Container>
  );
}

export default StartExchangeMemberPage;