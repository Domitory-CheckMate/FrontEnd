import React from 'react';
import { useNavigate } from 'react-router-dom';
import CompleteButton from './CompleteButton';

const FindIdPage2 = ({
  handleNextStep,
}: {
  handleNextStep: (step: number) => void;
}) => {
  const navigation = useNavigate();

  const nextStepListener = () => {
    handleNextStep(1);
    navigation('/login');
  };

  return (
    <>
      <div className="grow w-full px-4 flex flex-col items-start mt-[35px] whitespace-pre-line">
        <div className="w-full flex text-[20px] leading-8 ">{`체크메이트에\n가입한 이메일입니다.`}</div>
        <div className="w-full bg-[#F7F7F7] py-6 flex items-center justify-center mt-9">
          c*******e@checkmate.co.kr
        </div>
      </div>
      <CompleteButton
        text="로그인하기"
        onClick={nextStepListener}
        isAble={true}
      />
    </>
  );
};

export default FindIdPage2;
