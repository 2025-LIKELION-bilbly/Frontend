import { useEffect, useRef, useState } from "react";
import * as S from "./CommentInputModal.styles";

type Props = {
    initialValue?: string;
    onSubmit: (value: string) => void;
    onClose: () => void;
};

const CommentInputModal = ({
    initialValue = "",
    onSubmit,
    onClose,
    }: Props) => {
    const [value, setValue] = useState(initialValue);
    const boxRef = useRef<HTMLDivElement>(null);

    /* 🔥 바깥 클릭 시 저장 */
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (!boxRef.current) return;
        if (!boxRef.current.contains(e.target as Node)) {
            if (value.trim()) {
            onSubmit(value.trim());
            }
            onClose();
        }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [value, onSubmit, onClose]);

    /* ESC로 닫기 */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <S.Backdrop>
        <S.Box ref={boxRef}>
            <S.Textarea
            autoFocus
            placeholder="코멘트를 입력하세요"
            value={value}
            onChange={e => setValue(e.target.value)}
            />
        </S.Box>
        </S.Backdrop>
    );
};

export default CommentInputModal;
