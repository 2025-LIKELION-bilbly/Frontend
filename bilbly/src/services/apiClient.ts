// src/services/apiClient.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (
    path: string,
    options?: RequestInit
    ) => {
    const res = await fetch(`${BASE_URL}${path}`, {
        credentials: "include", // 필요 없으면 제거 가능
        ...options,
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json();
};
