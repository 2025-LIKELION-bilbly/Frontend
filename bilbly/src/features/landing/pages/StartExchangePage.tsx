import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './StartExchangePage.styles';
import api from '../../../api/apiClient';

const convertDriveUrl = (url: string) => {
  if (!url || url === "string") return "";
  if (url.includes('drive.google.com')) {
    const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
    if (idMatch && idMatch[1]) return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w800`;
  }
  return url;
};

function StartExchangePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const groupId = location.state?.groupId || localStorage.getItem('lastGroupId');
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentStatus = async () => {
      if (!groupId) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get(`/v1/assignments/groups/${groupId}/current`);
        if (res.data && res.data.success) {
          setMembers(res.data.data.memberAssignments || []);
        }
      } catch (error) {
        console.error("현황 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentStatus();
  }, [groupId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleStart = async () => {
    try {
      const res = await api.post(`/v1/assignments/groups/${groupId}/start`);
      if (res.data.success) {
        navigate('/main'); 
      }
    } catch (error) {
      console.error("시작 API 호출 실패:", error);
      navigate('/main'); 
    }
  };

  if (loading) return <S.Container><S.MainTitle>현황 로딩 중...</S.MainTitle></S.Container>;

  return (
    <S.Container>
      <S.TitleSection>
        {/* 💡 요청대로 "모두 골랐을 때" 로직을 삭제하고 고정 타이틀 적용 */}
        <S.MainTitle>
          아직 책을 고르지 않은<br />모임원이 있어요
        </S.MainTitle>
        <S.SubTitle>
          책을 고르지 못한 모임원은<br />
          랜덤으로 책이 결정돼요
        </S.SubTitle>
      </S.TitleSection>

      <S.BookGrid>
        {members.map((member) => (
          <S.BookWrapper key={member.memberId}>
            {member.hasBook && member.coverImageUrl && member.coverImageUrl !== "string" ? (
              <S.BookImage src={convertDriveUrl(member.coverImageUrl)} alt={member.nickname} />
            ) : (
              <S.BookPlaceholder>
                책<br/>고르는 중
              </S.BookPlaceholder>
            )}
            <S.Nickname>{member.nickname}</S.Nickname>
          </S.BookWrapper>
        ))}
      </S.BookGrid>

      {/* 💡 뒤로가기 / 시작하기 버튼 구조 유지 */}
      <S.ButtonGroup>
        <S.Button onClick={handleBack}>뒤로가기</S.Button>
        <S.Button $primary onClick={handleStart}>시작하기</S.Button>
      </S.ButtonGroup>
    </S.Container>
  );
}

export default StartExchangePage;