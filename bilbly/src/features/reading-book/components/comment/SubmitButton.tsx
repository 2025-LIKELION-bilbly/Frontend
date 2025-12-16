import * as S from "./SubmitButton.styles";

interface Props {
    onClick: () => void;
    disabled?: boolean;
}

const SubmitButton = ({ onClick, disabled }: Props) => {
    return (
        <S.Button
        type="button"
        onClick={onClick}
        disabled={disabled}
        >
        <S.CheckIcon>✓</S.CheckIcon>
        등록하기
        </S.Button>
    );
};

export default SubmitButton;
