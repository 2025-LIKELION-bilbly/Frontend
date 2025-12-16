import styled from "styled-components";

export const List = styled.div`
    margin-top: 12px;
`;

export const Item = styled.div<{ $color: string }>`
    font-size: 14px;
    margin-bottom: 6px;
    color: ${({ $color }) => $color};
    line-height: 1.4;
`;
