// highlightAPI.ts
import type { HighlightItem, CreateHighlightPayload } from "../types/highlight";


const MOCK_MODE = true;

//  mockDB의 타입 지정
let mockDB: HighlightItem[] = [];
let autoId = 1;

const highlightAPI = {
    /** -------------------------------
     *  특정 페이지 하이라이트 조회
     -------------------------------- */
    async getHighlights(page: number): Promise<HighlightItem[]> {
        if (MOCK_MODE) {
        return mockDB.filter((h) => h.page === page);
        }

        const res = await fetch(`/api/v1/highlights?page=${page}`);
        return res.json();
    },

    /** -------------------------------
     *  하이라이트 생성
     -------------------------------- */
    async createHighlight(payload: CreateHighlightPayload): Promise<HighlightItem> {
        if (MOCK_MODE) {
        const newItem: HighlightItem = {
            highlightId: autoId++,
            memberId: 1, // 로그인 사용자 ID (mock)
            commentCount: 0,
            memoCount: 0,
            ...payload,
        };

        mockDB.push(newItem);
        return newItem;
        }

        const res = await fetch("/api/v1/highlights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        return res.json();
    },

    /** -------------------------------
     *  하이라이트 삭제
     -------------------------------- */
    async deleteHighlight(highlightId: number, memberId: number): Promise<void> {
        if (MOCK_MODE) {
        mockDB = mockDB.filter((h) => h.highlightId !== highlightId);
        return;
        }

        await fetch(`/api/v1/highlights/${highlightId}?memberId=${memberId}`, {
        method: "DELETE",
        });
    },
};

export default highlightAPI;
