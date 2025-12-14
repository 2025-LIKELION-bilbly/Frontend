// utils/restoreHighlight.ts
import type { HighlightItem } from "./highlightStorage";

export const applySavedHighlights = (text: string, items: HighlightItem[]) => {
    let html = text;

    // ★ 뒤에서부터 칠해야 앞 offset 안 무너짐
    const sorted = [...items].sort((a, b) => b.start - a.start);

    for (const h of sorted) {
        const before = html.slice(0, h.start);
        const target = html.slice(h.start, h.end);
        const after = html.slice(h.end);

        html = `${before}<mark style="background:${h.color};">${target}</mark>${after}`;
    }

    return html.replace(/\n/g, "<br/>");
};
