// src/components/DeleteHighlightModal.tsx

import React from 'react';
// import * as S from './Modal.styles'; // 스타일 파일 가정

interface DeleteHighlightModalProps {
    onConfirm: () => void; // '삭제 확인' 클릭 시
    onCancel: () => void;  // '취소' 클릭 시
}

const DeleteHighlightModal: React.FC<DeleteHighlightModalProps> = ({ 
    onConfirm, 
    onCancel 
}) => {
    // 모달 배경 클릭 방지 및 중앙 정렬을 위한 기본 스타일
    const modalStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000,
    };

    const contentStyle: React.CSSProperties = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        minWidth: '280px',
    };

    const buttonStyle: React.CSSProperties = {
        margin: '0 10px',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        border: 'none',
        fontWeight: 'bold',
    };

    return (
        <div style={modalStyle}>
            <div style={contentStyle}>
                <h3>하이라이트 삭제</h3>
                <p>정말 이 형광펜을 삭제하시겠습니까?</p>
                <div style={{ marginTop: '20px' }}>
                    <button 
                        onClick={onCancel}
                        style={{ ...buttonStyle, backgroundColor: '#eee' }}
                    >
                        취소
                    </button>
                    <button 
                        onClick={onConfirm}
                        style={{ ...buttonStyle, backgroundColor: '#ff6b6b', color: 'white' }}
                    >
                        삭제 확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteHighlightModal;