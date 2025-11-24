// NextButton.tsx
import * as S from "./NextBtn.styles";

// valid: able, invalid: disable, default: 기본
type NextButtonProps = {
    label: string;
    state?: "default" | "valid" | "invalid";
    onClick?: () => void;
};

const NextButton = ({ label, state = "valid", onClick }: NextButtonProps) => {
    return (
        <S.ButtonWrapper $state={state} onClick={onClick}>
            {label}
        </S.ButtonWrapper>
    );
};

export default NextButton;
