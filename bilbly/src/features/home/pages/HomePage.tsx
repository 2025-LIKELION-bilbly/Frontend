import React, { useState, useEffect } from 'react';
import * as S from './HomePage.styles'; 
import Header from '../../../components/Header'; 
import Navbar from '../../../components/BottomNavBar'; 
import MeetingSelector from './MeetingSelector'; 
import CategoryTabs from './CategoryTabs';
import BookCarousel from './BookCarousel';
import BookmarkGraph from './BookmarkGraph';
import MoreMeetings from './MoreMeetings';
import { getHomeData } from '../../../api/home';
import { getBookDetail } from '../../../api/book.api';
import api from '../../../api/apiClient';

function HomePage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [currentGroupId, setCurrentGroupId] = useState<number | null>(null);
  const [homeData, setHomeData] = useState<any>(null);
  const [readingInfo, setReadingInfo] = useState<any>(null); // 💡 날짜 데이터 저장용
  const [groupMembers, setGroupMembers] = useState<any[]>([]);
  const [bookInfo, setBookInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. 초기 그룹 목록 로드
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await api.get('/users/groups');
        const groups = res.data.data?.groups || [];
        setMyGroups(groups);
        if (groups.length > 0) {
          const latest = [...groups].sort((a, b) => b.groupId - a.groupId)[0];
          setCurrentGroupId(latest.groupId);
        }
      } catch (e) { console.error(e); }
    };
    fetchInitialData();
  }, []);

  // 2. 그룹 ID 변경 시 멤버 정보 및 '실제 날짜 API' 호출
  useEffect(() => {
    if (!currentGroupId) return;
    const fetchContent = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem('userId');
        
        // 멤버 목록 가져오기
        const statusRes = await api.get(`/v1/assignments/groups/${currentGroupId}/current`);
        const members = statusRes.data?.data?.memberAssignments || [];
        setGroupMembers(members);

        // 💡 [핵심] 민지님이 보여주신 날짜 연동 API 호출
        try {
          const readingRes = await api.get(`/v1/assignments/groups/${currentGroupId}/current-reading`);
          setReadingInfo(readingRes.data.data || readingRes.data);
        } catch (e) { console.error("날짜 API 로드 실패", e); }

        // 홈 상세 데이터 가져오기
        try {
          const data = await getHomeData(userId!, currentGroupId);
          setHomeData(data);
        } catch (e) {
          setHomeData({ currentGroupId, groupMemberNicknames: members.map((m:any)=>m.nickname) });
        }
      } finally { setLoading(false); }
    };
    fetchContent();
  }, [currentGroupId]);

  // 3. 슬라이드 변경 시 상세 정보 로드
  useEffect(() => {
    if (activeIndex === 0) { setBookInfo(null); return; }
    const fetchDetail = async () => {
      const targetBookId = groupMembers[activeIndex]?.bookId;
      if (!targetBookId) return;
      try {
        const res = await getBookDetail(targetBookId);
        if (res.success) setBookInfo(res.data);
      } catch (e) { console.error(e); }
    };
    fetchDetail();
  }, [activeIndex, groupMembers]);

  if (loading && !groupMembers.length) return <S.Container><Header /><div>동기화 중...</div></S.Container>;

  return (
    <S.Container>
      <Header />
      <MeetingSelector groupName={myGroups.find(g => g.groupId === currentGroupId)?.groupName || "나의 모임"} />
      <CategoryTabs members={groupMembers.map(m => m.nickname)} />
      
      <BookCarousel 
        onSlideChange={(index) => setActiveIndex(index)} 
        members={groupMembers} 
        readingInfo={readingInfo} /* 💡 실제 날짜 데이터 전달 */
      />
      
      {activeIndex === 0 ? (
        <>
          <S.Divider />
          <BookmarkGraph bookmarks={homeData?.recentBookmarks || []} members={groupMembers.map(m => m.nickname)} />
          <MoreMeetings groups={myGroups} />
        </>
      ) : (
        <S.IntroContainer>
          <S.BookDetailContainer>
            <S.Divider />
            <S.BookTitlePlaceholder>{bookInfo?.title || "로딩 중..."}</S.BookTitlePlaceholder>
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

            <S.SectionTitle>한줄평 (최근 흔적)</S.SectionTitle>
            {homeData?.recentTraceItems?.slice(0, 3).map((trace: any) => (
              <S.ReviewTable key={trace.highlightId}>
                <S.ReviewContentCell>{trace.textSentence}</S.ReviewContentCell>
                <S.VerticalLine />
                <S.ReviewInfoCell>모임원</S.ReviewInfoCell>
              </S.ReviewTable>
            ))}
          </S.BookDetailContainer>
        </S.IntroContainer>
      )}
      <Navbar />
    </S.Container>
  );
}

export default HomePage;