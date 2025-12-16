import { apiFetch } from "./apiClient";

export interface CreateCommentBody {
    highlightId: number;
    content: string;
}

export const commentAPI = {
    createComment: async (body: CreateCommentBody) => {
        return apiFetch("/api/v1/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        });
    },

    deleteComment: async (commentId: number) => {
        return apiFetch(`/api/v1/comments/${commentId}`, {
        method: "DELETE",
        });
    },
};
