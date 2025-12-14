// utils/highlightStorage.ts
export type HighlightItem = {
    id: number;
    page: number;
    start: number;
    end: number;
    color: string;        // CSS color
    backendColor: string; // RED / BLUE / ...
    text: string;
};

const STORAGE_KEY = "highlights";

export const saveHighlight = (item: HighlightItem) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

    if (!data[item.page]) data[item.page] = [];
    data[item.page].push(item);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadHighlights = (page: number): HighlightItem[] => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return data[page] || [];
};
