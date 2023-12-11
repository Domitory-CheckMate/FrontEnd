import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Close } from '../assets/icon/icon_close.svg';

const JoinPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center items-center w-full px-4 mt-[65px] relative">
        <Close
          className="absolute inset-y-0 left-4 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="mt-10 text-xl font-bold w-full text-center">
        {' '}
        체크메이트 이용약관
      </div>

      <div className="flex flex-col w-full px-4 mt-4 grow">
        <div className="leading-5 text-base font-semibold">제 1장 총칙</div>
        <div className="mt-[12px] leading-4 text-sm font-medium ">
          제 1조 (목적)
        </div>
        <div className="mt-[13px] leading-3 text-xs font-normal">
          본 이용약관은 주식회사 체크메이트(이하 “회사”라 합니다)가 제공하는
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
