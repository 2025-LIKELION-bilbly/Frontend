import * as S from "./ComingSoonModal.styles";

interface Props {
    onClose: () => void;
}

export default function ComingSoonModal({ onClose }: Props) {
    return (
        <S.Backdrop onClick={onClose}>
        <S.Modal onClick={e => e.stopPropagation()}>
            <S.Title>아직 준비 중이에요</S.Title>
            <S.Description>
            이 기능은 곧 만나보실 수 있어요 🙂
            </S.Description>
            <S.Button onClick={onClose}>확인</S.Button>
        </S.Modal>
        </S.Backdrop>
    );
}
