import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Welcome } from '../../assets/icon/welcome_new.svg';

const JoinCompletedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-start ">
      <div className="mt-[88px] px-4 text-black text-[30px] font-bold leading-[42px]">
        회원가입 완료!
      </div>
      <div className="mt-[16px] px-4 text-[#646464] text-xl font-normal leading-[30px]">
        OOO님, 내가 찾던 룸메이트를{' '}
      </div>
      <div className="px-4 text-[#646464] text-xl font-normal leading-[30px]">
        체크메이트에서 쉽게 찾아보세요.
      </div>

      <Welcome className="self-start m-[28.61px]" />
      <button
        className={`py-4 
      bg-primary text-white text-[18px] rounded-full mb-[26px] mx-4`}
        onClick={() => navigate('/my-page')}
      >
        체크리스트 작성하기
      </button>
      <button
        className={`
      bg-white text-primary text-[18px] mb-[48px]`}
        onClick={() => navigate('/main')}
      >
        구경 먼저 할래요
      </button>
    </div>
  );
};

export default JoinCompletedPage;
