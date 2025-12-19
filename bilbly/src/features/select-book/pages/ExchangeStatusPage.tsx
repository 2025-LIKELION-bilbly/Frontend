import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ExchangeStatusPage.styles'; 
import { getMyGroups } from '../../../api/group.api';
import api from '../../../api/apiClient';

const convertDriveUrl = (url: string) => {
    if (!url) return "";
    if (url.includes('drive.google.com') && url.includes('id=')) {
        const idMatch = url.match(/id=([^&]+)/);
        if (idMatch && idMatch[1]) {
            return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w500`;
        }
    }
    return url;
};

function ExchangeStatusPage() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 내 그룹 정보 조회
        const myGroups = await getMyGroups();
        
        if (myGroups && myGroups.length > 0) {
          const groupId = myGroups[0].groupId;

          // 💡 2. [핵심] 찾으신 API로 멤버들의 현재 선택 상태 조회
          // URL: /api/v1/assignments/groups/{groupId}/current
          const res = await api.get(`/v1/assignments/groups/${groupId}/current`);
          
          if (res.data && res.data.success) {
            const assignmentData = res.data.data.memberAssignments;
            
            // 💡 3. API 응답 데이터를 화면 포맷에 맞게 변핑
            const processedMembers = assignmentData.map((m: any) => ({
              id: m.memberId,
              nickname: m.nickname,
              // hasBook이 true이고 coverImageUrl이 있을 때만 이미지 표시
              displayImage: m.coverImageUrl, 
              color: m.color
            }));
            
            setMembers(processedMembers);
          }
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        // API 실패 시 getMyGroups의 기본 멤버 리스트라도 노출 (방어 로직)
        const groups = await getMyGroups().catch(() => []);
        if (groups.length > 0) setMembers(groups[0].members || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <S.Container>
      <S.TitleSection>
        <S.MainTitle>책 고르기 완료</S.MainTitle>
        <S.SubTitle>다른 모임원들이 모두 책을 고르면<br/>교환독서를 시작해요</S.SubTitle>
      </S.TitleSection>

      <S.BookGrid>
        {!loading ? (
          members.map((member) => (
            <S.BookWrapper key={member.id}>
              {/* 💡 displayImage(coverImageUrl) 존재 여부에 따라 분기 */}
              {member.displayImage ? (
                <S.BookImage 
                  src={convertDriveUrl(member.displayImage)} 
                  alt={member.nickname} 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <S.BookPlaceholder>
                    책<br/>고르는 중
                </S.BookPlaceholder>
              )}
              <S.Nickname>{member.nickname}</S.Nickname>
            </S.BookWrapper>
          ))
        ) : (
          <div style={{ textAlign: 'center', width: '100%', padding: '50px' }}>현황 확인 중...</div>
        )}
      </S.BookGrid>

      <S.ButtonGroup>
        <S.HomeButton onClick={() => navigate('/main')}>
            홈으로
        </S.HomeButton>
      </S.ButtonGroup>
    </S.Container>
  );
}

export default ExchangeStatusPage;