// NextButton.tsx
import * as S from "./NextBtn.styles";

// valid: able, invalid: disable, default: 기본
type NextButtonProps = {
    label: string;
    state: "default" | "valid" | "invalid";
    onClick?: () => void;
};

const NextButton = ({ label, state, onClick }: NextButtonProps) => {
    return (
        <S.ButtonWrapper
        $state={state}
        onClick={state === "valid" ? onClick : undefined}
        >
        {label}
        </S.ButtonWrapper>
    );
};

export default NextButton;
