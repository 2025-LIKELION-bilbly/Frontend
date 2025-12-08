import { useEffect, useState, useMemo, useRef } from "react";
import * as S from "./ReadingBookPage.styles";
import ReadingHeader from "../components/ReadingHeader";
import WarningModal from "../components/WarningModel";
import ModeToggle from "../components/ModeToggle";
import ProgressBar from "../components/ProgressBar";

type Mode = "focus" | "together";

const MAX_HEIGHT = 599; // ContentBox 높이(px)

// ⭐ 자동 페이지 분리 함수
const paginateText = (
    fullText: string,
    measureRef: React.RefObject<HTMLDivElement | null>
): string[] => {
    if (!measureRef.current) return [];

    const words = fullText.split(" ");
    const pages: string[] = [];
    let currentText = "";

    for (let i = 0; i < words.length; i++) {
        currentText += (i === 0 ? "" : " ") + words[i];
        measureRef.current.innerText = currentText;

        if (measureRef.current.scrollHeight > MAX_HEIGHT) {
            pages.push(currentText.slice(0, currentText.lastIndexOf(" ")));
            currentText = words[i];
            measureRef.current.innerText = currentText;
        }
    }

    if (currentText.trim()) pages.push(currentText);
    return pages;
};


const ReadingBookPage = () => {
    const [mode, setMode] = useState<Mode>("focus");

    const [showWarning, setShowWarning] = useState(() => {
        return localStorage.getItem("hideReadingWarning") !== "true";
    });

    const [pages, setPages] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [showUI, setShowUI] = useState(false);

    const measureRef = useRef<HTMLDivElement>(null);

    // 스와이프 시작 위치 기록
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // 샘플 텍스트 (나중에 API로 교체)
    const fullText = `
        책 내용이 들어가는 자리 책 내용이 들어가는 자리 책 내용이 들어가는 자리
        책 내용이 들어가는 자리 책 내용이 들어가는 자리 책 내용이 들어가는 자리
        책 내용이 들어가는 자리 책 내용이 들어가는 자리 책 내용이 들어가는 자리
        책 내용이 들어가는 자리 책 내용이 들어가는 자리 책 내용이 들어가는 자리
        ... (이 텍스트는 아주 길다고 가정)
    `.repeat(20);

    // 자동 페이지 분리
    useEffect(() => {
        if (!measureRef.current) return;

        const generated = paginateText(fullText, measureRef);
        setPages(generated);

    }, []);

    // 진행률 계산
    const percent = useMemo(() => {
        if (pages.length <= 1) return 100;
        return Math.round((page / (pages.length - 1)) * 100);
    }, [page, pages.length]);


    // 스와이프 시작
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    // 스와이프 종료 → 방향 판별
    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;

        const diff = touchEndX.current - touchStartX.current;

        // 50px 이상 이동해야 스와이프 인식
        if (Math.abs(diff) < 50) return;

        if (diff > 0) {
            // → 오른쪽으로 스와이프 → 이전 페이지
            setPage(prev => Math.max(prev - 1, 0));
        } else {
            // ← 왼쪽으로 스와이프 → 다음 페이지
            setPage(prev => Math.min(prev + 1, pages.length - 1));
        }
    };

    // 진행률 드래그
    const handleDragPercent = (newPercent: number) => {
        if (!pages.length) return;

        const newPageIndex = Math.round(
            (newPercent / 100) * (pages.length - 1)
        );
        setPage(newPageIndex);
    };


    return (
        <S.Container
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* 최초 진입 모달 */}
            {showWarning && (
                <WarningModal onClose={() => setShowWarning(false)} />
            )}

            {/* 헤더 */}
            {showUI && <ReadingHeader title="책 이름" />}

            {/* === 3개 클릭 영역 오버레이 추가 === */}
            {!showWarning && (
                <>
                    <S.LeftClickZone onClick={() => setPage(prev => Math.max(prev - 1, 0))} />
                    <S.CenterClickZone onClick={() => setShowUI(prev => !prev)} />
                    <S.RightClickZone onClick={() => setPage(prev => Math.min(prev + 1, pages.length - 1))} />
                </>
            )}

            {/* 책 내용 */}
            <S.ContentBox>{pages[page]}</S.ContentBox>

            {/* 모드 토글 */}
            <S.ToggleWrapper 
                showUI={showUI}
                onClick={e => e.stopPropagation()}
            >
                <ModeToggle mode={mode} onChangeMode={setMode} />
            </S.ToggleWrapper>


            {/* 진행률 바 */}
            {showUI && pages.length > 1 && (
                <ProgressBar percent={percent} onDragPercent={handleDragPercent} />
            )}

            {/* 글자 높이 측정용 hidden box */}
            <div
                ref={measureRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    width: "100%",
                    padding: "0 16px",
                    pointerEvents: "none",
                    whiteSpace: "normal",
                }}
            />
        </S.Container>
    );

};

export default ReadingBookPage;
