// utils/storage/annotation.storage.ts

import type { Annotation } from "../annotation/annotation.core";

export interface SavedState {
  annotations: Annotation[];
  memos: {
    id: string;
    text: string;
    content?: string;
  }[];
}

const STORAGE_KEY = "reading-annotations";

export function saveState(state: SavedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadState(): SavedState | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
