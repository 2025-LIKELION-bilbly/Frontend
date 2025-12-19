import { useState, useEffect } from 'react';
import * as S from './HomePage.styles'; 
import Header from '../../../components/Header'; 
import Navbar from '../../../components/BottomNavBar'; 
import MeetingSelector from './MeetingSelector'; 
import CategoryTabs from './CategoryTabs';
import BookCarousel from './BookCarousel';
import BookmarkGraph from './BookmarkGraph';
import MoreMeetings from './MoreMeetings';
import { getHomeData, type HomeDataResponse } from '../../../api/home';
import { getBookDetail, type BookDetail } from '../../../api/book.api';
import api from '../../../api/apiClient';

// 💡 다른 파일에서 쓸 수 있게 명정하게 export
export interface MemberAssignment {
  memberId: number;
  nickname: string;
  bookId: number;
  color: string;
  hasBook: boolean;
  coverImageUrl: string | null;
}

interface Group {
  groupId: number;
  groupName: string;
}

function HomePage() {
  const [activeSlideId, setActiveSlideId] = useState<number>(1);
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [currentGroupId, setCurrentGroupId] = useState<number | null>(null);
  const [homeData, setHomeData] = useState<HomeDataResponse | null>(null);
  const [groupMembers, setGroupMembers] = useState<MemberAssignment[]>([]);
  const [bookInfo, setBookInfo] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await api.get('/users/groups');
        const groups = res.data.data?.groups || [];
        setMyGroups(groups);
        if (groups.length > 0) {
          const latest = [...groups].sort((a: Group, b: Group) => b.groupId - a.groupId)[0];
          setCurrentGroupId(latest.groupId);
        }
      } catch {
        // 💡 catch(e) 대신 catch로 써서 미사용 변수 에러 해결
        console.error("초기 그룹 로드 실패");
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!currentGroupId) return;
    const fetchContent = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        const statusRes = await api.get(`/v1/assignments/groups/${currentGroupId}/current`);
        const members = statusRes.data?.data?.memberAssignments || [];
        setGroupMembers(members);

        try {
          const data = await getHomeData(userId!, currentGroupId);
          setHomeData(data);
        } catch {
          console.log("독서 데이터가 아직 없음");
        }
      } finally { setLoading(false); }
    };
    fetchContent();
  }, [currentGroupId]);

  useEffect(() => {
    if (activeSlideId === 1) {
      setBookInfo(null);
      return;
    }
    const fetchDetail = async () => {
      const targetBookId = groupMembers[activeSlideId - 1]?.bookId;
      if (!targetBookId) return;
      try {
        const res = await getBookDetail(targetBookId);
        if (res.success) setBookInfo(res.data);
      } catch {
        console.error("도서 상세 로드 실패");
      }
    };
    fetchDetail();
  }, [activeSlideId, groupMembers]);

  if (loading && !groupMembers.length) return <S.Container><Header /><div>연동 중...</div></S.Container>;

  return (
    <S.Container>
      <Header />
      <MeetingSelector groupName={myGroups.find(g => g.groupId === currentGroupId)?.groupName || "나의 모임"} />
      
      {/* 💡 에러 발생했던 activeTab 속성 제거 (CategoryTabs 내부 로직에 맡김) */}
      <CategoryTabs members={groupMembers.map(m => m.nickname)} />
      
      <BookCarousel 
        onSlideChange={setActiveSlideId} 
        members={groupMembers} 
        readingInfo={homeData?.currentReadingBookInfo} 
      />
      
      {activeSlideId === 1 ? (
        <>
          <S.Divider />
          <BookmarkGraph /> 
          <MoreMeetings />
        </>
      ) : (
        <S.IntroContainer>
          <S.BookDetailContainer>
            <S.Divider />
            <S.BookTitlePlaceholder>{bookInfo?.title || "정보 로딩 중..."}</S.BookTitlePlaceholder>
            <S.BookMetaInfo>
              <S.MetaRow>
                <S.MetaLabel>저자</S.MetaLabel>
                <S.MetaValue>{bookInfo?.author || "-"}</S.MetaValue>
              </S.MetaRow>
              <S.MetaRow style={{ alignItems: 'flex-start' }}>
                <S.MetaLabel>장르</S.MetaLabel>
                <S.MetaValue style={{ flex: 1, wordBreak: 'keep-all' }}>
                  {Array.isArray(bookInfo?.genre) ? bookInfo.genre.join(', ') : (bookInfo?.genre || "-")}
                </S.MetaValue>
              </S.MetaRow>
            </S.BookMetaInfo>
            <S.BookSummaryPlaceholder>{bookInfo?.description || "정보 없음"}</S.BookSummaryPlaceholder>
          </S.BookDetailContainer>
        </S.IntroContainer>
      )}
      <Navbar />
    </S.Container>
  );
}

export default HomePage;