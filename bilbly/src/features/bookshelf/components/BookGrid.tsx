// bookshelf/components/BookGrid.tsx
import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 60px;
    margin: 0 60px;
`;

export default function BookGrid({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return <Grid>{children}</Grid>;
}
