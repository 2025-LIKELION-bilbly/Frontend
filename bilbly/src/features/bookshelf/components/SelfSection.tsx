// bookshelf/components/ShelfSection.tsx
import styled from "styled-components";

const Section = styled.section`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-top: 36px;
`;

export default function ShelfSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <Title>{title}</Title>
      {children}
    </Section>
  );
}
