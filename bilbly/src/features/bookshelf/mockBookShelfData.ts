// bookshelf/mockBookShelfData.ts
import type { BookShelfResponse } from "./type";
import BookCover1 from '../../assets/book_cover_1.jpg';
import BookCover2 from '../../assets/book_cover_2.jpg'; 

export const mockBookShelfData: BookShelfResponse = {
  totalBookCount: 12,

  inProgressBooks: [
    {
      title: "데미안",
      coverImageUrl:
        BookCover1,
      currentReaderName: "연주",
      sessionId: 1,
    },
    {
      title: "어린 왕자",
      coverImageUrl:
        BookCover2,
      currentReaderName: "민수",
      sessionId: 2,
    },
  ],

  completedBooks: [
    {
      title: "1984",
      coverImageUrl:
        "https://image.yes24.com/goods/11223344/XL",
      sessionId: 10,
    },
    {
      title: "노인과 바다",
      coverImageUrl:
        "https://image.yes24.com/goods/55667788/XL",
      sessionId: 11,
    },
    {
      title: "이방인",
      coverImageUrl:
        "https://image.yes24.com/goods/99887766/XL",
      sessionId: 12,
    },
  ],
};
