import api from "../api/apiClient";
import type { BookShelfResponse } from "../features/bookshelf/type";


export const getBookShelf = async (
    groupId: number
    ): Promise<BookShelfResponse> => {
    const res = await api.get<BookShelfResponse>(
        `/api/v1/groups/${groupId}/bookshelf`
    );
    return res.data;
};
