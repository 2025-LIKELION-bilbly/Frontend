// bookshelf/components/BookGrid.tsx
import styled from "styled-components";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin: 0 30px;
`;

export default function BookGrid3({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return <Grid>{children}</Grid>;
}
