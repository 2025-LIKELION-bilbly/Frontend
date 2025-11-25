// features/meeting/components/NicknameInputBox.tsx
import * as S from "../components/NicknameInputBox.styles";

type Props = {
    value: string;
    onChange: (value: string) => void;
    isInvalid: boolean;
};

const NicknameInputBox = ({ value, onChange, isInvalid }: Props) => { 
    return (
        <S.InputWrapper>
            <S.InputField
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="닉네임을 입력해 주세요"
                $isInvalid={isInvalid}
            />

            <S.Desc $isInvalid={isInvalid}>
                최대 8자까지 입력 가능해요
            </S.Desc>
        </S.InputWrapper>
    );
};

export default NicknameInputBox;
