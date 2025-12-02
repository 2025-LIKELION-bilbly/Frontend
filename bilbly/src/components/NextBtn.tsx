import * as S from "./NextBtn.styles";

type NextButtonProps = {
    label: string;
    state?: "default" | "valid" | "invalid";
    onClick?: () => void;
};

const NextButton = ({ label, state = "default", onClick }: NextButtonProps) => {
    const isDisabled = state !== "valid";

    const handleClick = () => {
        if (isDisabled) return; // ⭐ 클릭 차단
        onClick?.();            // 안전하게 실행
    };

    return (
        <S.ButtonWrapper
            $state={state}
            onClick={handleClick}
            aria-disabled={isDisabled}
        >
            {label}
        </S.ButtonWrapper>
    );
};

export default NextButton;
