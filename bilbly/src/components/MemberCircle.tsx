import * as S from "./MemberCircle.styles";
import * as G from '../styles/GlobalStyle';
import { getTextColorFromBg } from "../styles/ColorUtils";

type Props = {
    name: string;
    color: keyof typeof G.theme.colors; 
    size?:number;
    fontSize?: number;
};

const MemberCircle = ({ name, color, size = 40, fontSize = 16}: Props) => {
    const first = name[0];

    const textColor = getTextColorFromBg(color); // ColorUtiles로부터 color을 받아 정해진 배경색, 글자색 결정

    return <S.Circle $bgColor={color} $textColor={textColor} $size={size} $fontSize={fontSize}>{first}</S.Circle>;
};

export default MemberCircle;

