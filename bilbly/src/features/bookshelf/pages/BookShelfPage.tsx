import { useEffect, useState } from "react";
import BookShelf from "./BookShelf";
import { getBookShelf } from "../../../api/bookshelf.api";
import type { BookShelfResponse } from "../type";

function BookShelfPage() {
    const [data, setData] = useState<BookShelfResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // TODO: 실제 선택된 모임 ID로 교체
    const groupId = 1;

    useEffect(() => {
        const fetchBookShelf = async () => {
        try {
            setLoading(true);
            const res = await getBookShelf(groupId);
            setData(res);
        } catch (e) {
            console.error(e);
            setError("책장 정보를 불러오지 못했어요.");
        } finally {
            setLoading(false);
        }
        };

        fetchBookShelf();
    }, [groupId]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return null;

    return <BookShelf data={data} />;
}

export default BookShelfPage;
