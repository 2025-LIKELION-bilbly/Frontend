// src/api/comment.api.ts

export interface CreateCommentPayload {
  highlightId: string;
  content: string;
  parentCommentId?: string | null;
}

/**
 * ❗ 지금은 mock
 * ❗ 나중에 fetch로 교체
 */
export async function createComment(
  payload: CreateCommentPayload
): Promise<void> {
  console.log("[MOCK API] createComment", payload);

  // ⬇️ 나중에 이 부분만 교체
  // return fetch(`${API_BASE}/api/v1/comments`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     memberId: 1,
  //     visibility: "PUBLIC",
  //     ...payload,
  //   }),
  // }).then(res => {
  //   if (!res.ok) throw new Error("API error");
  // });
}
