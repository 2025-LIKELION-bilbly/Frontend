export const switchSessionMode = async (
    sessionId: number,
    mode: "FOCUS" | "TOGETHER"
    ) => {
    return fetch(`/api/v1/sessions/${sessionId}/mode`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
    });
};
