import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ExchangeStatusPage.styles'; 
import { getMyGroups } from '../../../api/group.api';
import api from '../../../api/apiClient';

// 💡 [해결] any 제거를 위한 인터페이스 정의
interface MemberStatus {
  id: number;
  nickname: string;
  displayImage: string | null;
  color: string;
}

const convertDriveUrl = (url: string | null) => {
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
  // 💡 [해결] any[] 대신 정의한 인터페이스 사용
  const [members, setMembers] = useState<MemberStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 내 그룹 정보 조회
        const myGroups = await getMyGroups();
        
        if (myGroups && myGroups.length > 0) {
          // 가장 최근 그룹 ID 가져오기
          const groupId = myGroups[0].groupId;

          // 2. 멤버들의 현재 선택 상태 조회
          const res = await api.get(`/v1/assignments/groups/${groupId}/current`);
          
          if (res.data && res.data.success) {
            const assignmentData = res.data.data.memberAssignments;
            
            // 💡 [핵심] API 응답의 고유한 닉네임과 데이터를 정확히 매핑
            const processedMembers: MemberStatus[] = assignmentData.map((m: any) => ({
              id: m.memberId,
              nickname: m.nickname,
              displayImage: m.coverImageUrl, 
              color: m.color
            }));
            
            setMembers(processedMembers);
          }
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
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
              {/* 💡 각 멤버별로 할당된 이미지 표시 */}
              {member.displayImage && member.displayImage !== "string" ? (
                <S.BookImage 
                  src={convertDriveUrl(member.displayImage)} 
                  alt={member.nickname} 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <S.BookPlaceholder>
                  {/* 💡 책을 아직 안 고른 멤버는 이 화면이 뜸 */}
                  책<br/>고르는 중
                </S.BookPlaceholder>
              )}
              {/* 💡 정확한 멤버의 닉네임 출력 */}
              <S.Nickname>{member.nickname}</S.Nickname>
            </S.BookWrapper>
          ))
        ) : (
          <div style={{ textAlign: 'center', width: '100%', padding: '50px' }}>
            모임원 현황 확인 중...
          </div>
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