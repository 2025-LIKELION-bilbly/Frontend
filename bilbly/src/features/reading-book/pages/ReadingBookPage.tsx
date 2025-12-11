import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom"; 
import * as S from "./ReadingBookPage.styles";
import ReadingHeader from "../components/ReadingHeader";
import WarningModal from "../components/WarningModel";
import ModeToggle from "../components/ModeToggle";
import ProgressBar from "../components/ProgressBar";
import ToolBar from "../components/ToolBar";

import { applyHighlight } from "../../../utils/highlight";

// 🔥 색상 매핑 유틸 추가
import { getBgColor, toBackendColor } from "../../../styles/ColorUtils";

type Mode = "focus" | "together";

const MAX_HEIGHT = 599;

const paginateText = (
    fullText: string,
    measureRef: React.RefObject<HTMLDivElement | null>
) => {
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
    const { bookId } = useParams<{ bookId: string }>();

    const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);

    const [mode, setMode] = useState<Mode>("focus");
    const [showWarning, setShowWarning] = useState(
        () => localStorage.getItem("hideReadingWarning") !== "true"
    );

    const [pages, setPages] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [showUI, setShowUI] = useState(false);

    const measureRef = useRef<HTMLDivElement>(null);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // 사용자가 모임에서 선택한 색상 (나중에 연동시 수정)
    const selectedBgKey = "userMint";

    // 실제 CSS로 칠할 색상
    const cssColor = getBgColor(selectedBgKey);

    // 백엔드 ENUM 컬러로 변환
    const backendColor = toBackendColor(selectedBgKey);

    const fullText = useMemo(
        () =>
            `
        책 내용이 들어가는 자리 ...
        책 내용이 들어가는 자리 ...
    `.repeat(100),
        []
    ); 

    // 페이지 자동 분리
    useEffect(() => 
    {
        if (!measureRef.current) return;
        const generated = paginateText(fullText, measureRef);
        setPages(generated);
    }, [fullText]);

    const percent = useMemo(() => 
    {
        if (pages.length <= 1) return 100;
        return Math.round((page / (pages.length - 1)) * 100);
    }, [page, pages.length]);


    // 스와이프
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].clientX;
        const diff = touchEndX.current - touchStartX.current;

        if (Math.abs(diff) < 50) return;

        if (diff > 0) setPage(prev => Math.max(prev - 1, 0));
        else setPage(prev => Math.min(prev + 1, pages.length - 1));
    };

    // 드래그 후 툴바 표시
    const handleMouseUp = () => {
        const selection = window.getSelection();
        if (!selection || selection.toString().trim() === "") {
            setToolbarPos(null);
            return;
        }

        const rect = selection.getRangeAt(0).getBoundingClientRect();

        setToolbarPos({
            top: rect.top + window.scrollY - 4,
            left: rect.left + rect.width / 2,
        });
    };


    // 페이지 클릭 UI 처리
    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const selection = window.getSelection();
        if (selection && selection.toString().trim() !== "") return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = x / rect.width;

        if (ratio < 0.25) setPage(p => Math.max(p - 1, 0));
        else if (ratio > 0.75) setPage(p => Math.min(p + 1, pages.length - 1));
        else setShowUI(prev => !prev);
    };


    // ⭐ 실제 색칠하는 부분
    const handleHighlight = () => {
        applyHighlight(cssColor);
        setToolbarPos(null);

        console.log("백엔드로 보낼 ENUM:", backendColor);
    };


    return (
        <S.Container
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {showWarning && (
                <WarningModal onClose={() => setShowWarning(false)} />
            )}

            {showUI && (
                <ReadingHeader
                    title="책 이름"
                    percent={percent}
                    page={page}
                    bookId={bookId ?? "unknown"}
                />
            )}

            <ToolBar position={toolbarPos} onHighlight={handleHighlight} />

            <S.ContentBox onMouseUp={handleMouseUp} onClick={handleContentClick}>
                <S.TextWrapper>{pages[page]}</S.TextWrapper>
            </S.ContentBox>

            <S.ToggleWrapper $showUI={showUI}>
                <ModeToggle mode={mode} onChangeMode={setMode} />
            </S.ToggleWrapper>

            {showUI && pages.length > 1 && (
                <ProgressBar
                    percent={percent}
                    onDragPercent={(p) => {
                        const newPageIndex = Math.round((p / 100) * (pages.length - 1));
                        setPage(newPageIndex);
                    }}
                />
            )}

            <div
                ref={measureRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    width: "100%",
                    pointerEvents: "none",
                    padding: "0 16px"
                }}
            />
        </S.Container>
    );
};

export default ReadingBookPage;
