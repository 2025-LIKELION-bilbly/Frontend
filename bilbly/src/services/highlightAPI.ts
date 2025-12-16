// src/services/highlightAPI.ts
import type {
    HighlightItem,
    CreateHighlightPayload,
} from "../types/highlight";
import { apiFetch } from "./apiClient";

const MOCK_MODE = true; // 실제 서버로 하려면 false로 변경

// mockDB의 타입 지정
let mockDB: HighlightItem[] = [];
let autoId = 1;

const highlightAPI = {
    /** -------------------------------
     *  특정 페이지 하이라이트 조회
     --------------- ㅁ----------------- */
    async getHighlights(page: number): Promise<HighlightItem[]> {
        if (MOCK_MODE) {
        return mockDB.filter((h) => h.page === page);
        }

        return apiFetch(`/api/v1/highlights?page=${page}`);
    },

    /** -------------------------------
     *  하이라이트 생성
     -------------------------------- */
    async createHighlight(
        payload: CreateHighlightPayload
    ): Promise<HighlightItem> {
        if (MOCK_MODE) {
        const newItem: HighlightItem = {
            highlightId: autoId++,
            memberId: 1, // mock 로그인 사용자 ->나
            commentCount: 0,
            memoCount: 0,
            ...payload,
        };

        mockDB.push(newItem);
        return newItem;
        }

        return apiFetch("/api/v1/highlights", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
    },

    /** -------------------------------
     *  하이라이트 삭제
     -------------------------------- */
    async deleteHighlight(
        highlightId: number,
        memberId: number
    ): Promise<void> {
        if (MOCK_MODE) {
        mockDB = mockDB.filter((h) => h.highlightId !== highlightId);
        return;
        }

        await apiFetch(
        `/api/v1/highlights/${highlightId}?memberId=${memberId}`,
        {
            method: "DELETE",
        }
        );
    },
};

export default highlightAPI;
