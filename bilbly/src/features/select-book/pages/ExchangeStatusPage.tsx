import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ExchangeStatusPage.styles'; 

// API
import { getMyGroups, getCurrentAssignments } from '../../../api/group.api';

const convertDriveUrl = (url: string) => {
    if (!url) return "";
    if (url.includes('drive.google.com') && url.includes('id=')) {
        const idMatch = url.match(/id=([^&]+)/);
        if (idMatch && idMatch[1]) {
            return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
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
        const myGroups = await getMyGroups();
        
        if (myGroups && myGroups.length > 0) {
            const currentGroup = myGroups[0];
            const groupId = currentGroup.groupId;

            try {
                const assignmentRes = await getCurrentAssignments(groupId);
                
                if (assignmentRes && assignmentRes.memberAssignments) {
                    console.log("✅ 배정 현황 조회 성공");
                    setMembers(assignmentRes.memberAssignments);
                } else {
                    setMembers(currentGroup.members);
                }
            } catch (err: any) {
                console.log("ℹ️ 아직 독서 모임 시작 전 (멤버 목록 사용)");
                setMembers(currentGroup.members);
            }
        }
      } catch (error) {
        console.error("❌ 그룹 정보 로딩 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔥 [수정] 홈으로 이동 함수
  const handleGoHome = () => {
    navigate('/main'); 
  };

  return (
    <S.Container>
      <S.TitleSection>
        <S.MainTitle>
          책 고르기 완료
        </S.MainTitle>
        <S.SubTitle>
          다른 모임원들이 모두 책을 고르면<br/>
          교환독서를 시작해요
        </S.SubTitle>
      </S.TitleSection>

      <S.BookGrid>
        {!loading && members.length > 0 ? (
          members.map((member) => {
            let imageUrl = member.coverImageUrl;
            let title = member.bookTitle;

            if (!imageUrl && member.selectedBook) {
                imageUrl = member.selectedBook.coverImageUrl || member.selectedBook.coverImage || member.selectedBook.image;
                title = member.selectedBook.title;
            }

            return (
                <S.BookWrapper key={member.memberId}>
                  {imageUrl ? (
                    <S.BookImage 
                      src={convertDriveUrl(imageUrl)} 
                      alt={title || "책 표지"} 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                          e.currentTarget.style.display = 'none'; 
                      }}
                    />
                  ) : (
                    <S.BookPlaceholder>
                      책<br/>고르는 중
                    </S.BookPlaceholder>
                  )}
                  <S.Nickname>{member.nickname}</S.Nickname>
                </S.BookWrapper>
            );
          })
        ) : (
          <div style={{marginTop: '100px'}}>로딩 중...</div>
        )}
      </S.BookGrid>

      <S.ButtonGroup>
        <S.HomeButton onClick={handleGoHome}>
            홈으로
        </S.HomeButton>
      </S.ButtonGroup>

    </S.Container>
  );
}

export default ExchangeStatusPage;