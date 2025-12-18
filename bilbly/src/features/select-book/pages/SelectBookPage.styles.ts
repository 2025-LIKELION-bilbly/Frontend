import styled, { keyframes } from 'styled-components'; 
import BackgroundPattern from '../../../assets/background_pattern.png'; 

// ----------------------------------------------------------------
// 기존 스타일
// ----------------------------------------------------------------

export const Container = styled.div`
  width: 100%;
  max-width: 393px;
  margin: 0 auto;
  background-color: #FFFCF8;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  overflow: hidden; 
  z-index: 0;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${BackgroundPattern});
    background-repeat: repeat;
    opacity: 0.1;
    mix-blend-mode: multiply;
    z-index: -1;
    pointer-events: none;
  }
`;

export const SearchHeader = styled.div`
  padding: 24px 16px 12px 16px;
  background-color: transparent; 
  z-index: 10;
  flex-shrink: 0;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 38px;
  border: 1px solid #100F0F;
  border-radius: 2px;
  padding: 4px 16px;
  font-size: 14px;
  background-color: #FFFCF8; 
  outline: none;
  
  &::placeholder {
    color: #595959;
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
`;

export const ScrollContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 100px 16px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #100F0F;
  margin: 24px 0;
  padding: 5px 0;
`;

// 1. 새로 나온 책 그리드
export const NewBookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 32px; 
  row-gap: 36px;
`;

export const BookItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center; 
`;

export const BookImageWrapper = styled.div`
  position: relative;
  width: 89px;
  height: 132px;
  flex-shrink: 0;
`;

export const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #100F0F;
  border-radius: 2px;
`;

// 유저 아이콘 오버레이 (우측 하단)
export const UserIconOverlay = styled.div`
  position: absolute;
  bottom: -8px; 
  right: -8px;  
  z-index: 5;
`;

export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px; 
  text-align: left;
  width: 89px;
`;

export const BookTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #100F0F;
  line-height: 1.3;
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
`;

export const BookAuthor = styled.div`
  font-size: 11px;
  color: #595959;
  width: 100%; 

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const slideUp = keyframes`
  from { transform: translate(-50%, 100%); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
`;

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 80px; 
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;

  display: flex;
  width: 360px;
  padding: 12px 16px;
  align-items: center;
  gap: 24px;

  background-color: #FFFFFF; 
  border: 1px solid #100F0F; 
  border-radius: 2px; 

  animation: ${slideUp} 0.3s ease-out;
`;

export const ToastIconBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ToastTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ToastTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #100F0F;
  line-height: 24px;
`;

export const ToastSubTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #100F0F;
  letter-spacing: -0.5px;
`;

export const UserCircle = styled.div<{ $bg: string; $text: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.$bg};
  color: ${props => props.$text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #fff; 
`;