import * as S from './BookShelf.styles'; 
import { useState } from "react";
import ComingSoonModal from "../components/ComingSoonModal";


// 헤더
import Header from '../../../components/Header'; 
import MeetingSelector from '../../home/pages/MeetingSelector'

import ShelfSection from "../components/SelfSection";
import BookGrid from "../components/BookGrid";
import BookGrid3 from "../components/BookGrid3";
import BookCard from "../components/BookCard";
import type { BookShelfResponse } from "../type";

interface BookShelfProps {
    data: BookShelfResponse;
    groupName: string;
}

function BookShelf({ data, groupName }: BookShelfProps) {
    const { inProgressBooks, completedBooks } = data;
    const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);



    return (
        <S.Container>
            <Header />

            <MeetingSelector groupName={groupName} />  
            
            {/* 교환 중 */}
            <ShelfSection title="교환 중인 책">
                <BookGrid>
                {inProgressBooks.map(book => (
                    <BookCard
                    key={book.sessionId}
                    title={book.title}
                    coverImageUrl={book.coverImageUrl}
                    currentReaderName={book.currentReaderName}
                    />
                ))}
                </BookGrid>
            </ShelfSection>

                  {/* 완료 */}
            <ShelfSection title="교환 완료한 책">
                <BookGrid3>
                {completedBooks.map(book => (
                    <BookCard
                    key={book.sessionId}
                    title={book.title}
                    coverImageUrl={book.coverImageUrl}
                    onClick={() =>
                        setIsComingSoonOpen(true)
                    }
                    />
                ))}
                </BookGrid3>
            </ShelfSection>   

            {isComingSoonOpen && (
                <ComingSoonModal
                    onClose={() => setIsComingSoonOpen(false)}
                />
            )} 
        </S.Container>
    );
}
export default BookShelf;