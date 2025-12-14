import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './ExchangePage.styles';
import BookCover1 from '../../../assets/book_cover_1.jpg';

function ExchangePage() {
  const navigate = useNavigate();
  
  const [review, setReview] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };

  //유효성 검사 로직
  const isFilled = review.length > 0;
  const isError = review.length > 40; 
  
  // 안내 문구 표시 조건: (안 썼거나) 또는 (에러거나)
  const showHelperText = !isFilled || isError;

  // 버튼 비활성화 조건: (안 썼거나) 또는 (에러거나)
  const isNextButtonDisabled = !isFilled || isError;

  const handleNext = () => {
    // 비활성화 상태면 함수 실행 안 함
    if (isNextButtonDisabled) return;
    
    console.log("다음 단계로 이동");
    navigate('/exchange/result');
  };

  return (
    <S.Container>
      <S.TopSection>
        <S.Title>교환할 시간이에요</S.Title>
        <S.SubTitle>
          다음 사람에게 보여줄 한줄평을 작성해 주세요
        </S.SubTitle>
      </S.TopSection>

      <S.BookInfoSection>
        <S.BookImage src={BookCover1} alt="책 표지" />
        <S.BookTextInfo>
          <S.BookTitle>책제목</S.BookTitle>
          <S.BookAuthor>작가이름</S.BookAuthor>
        </S.BookTextInfo>
      </S.BookInfoSection>

      <S.InputSection>
        <S.ReviewInput 
          placeholder="한줄평을 입력해주세요" 
          value={review}
          onChange={handleChange}
          $isError={isError} 
        />
        
        <S.HelperText $isError={isError} $show={showHelperText}>
          최대 40자까지만 입력 가능해요
        </S.HelperText>
      </S.InputSection>

      {/* disabled 속성 추가 -> 스타일에 전달됨 */}
      <S.NextButton 
        onClick={handleNext} 
        disabled={isNextButtonDisabled}
      >
        다음으로
      </S.NextButton>

    </S.Container>
  );
}

export default ExchangePage;