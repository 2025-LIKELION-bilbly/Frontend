// bookshelf/types.ts

export interface InProgressBook {
    title: string;
    coverImageUrl: string;
    currentReaderName: string;
    sessionId: number;
}

export interface CompletedBook {
    title: string;
    coverImageUrl: string;
    sessionId: number;
}

export interface BookShelfResponse {
    totalBookCount: number;
    inProgressBooks: InProgressBook[];
    completedBooks: CompletedBook[];
}
