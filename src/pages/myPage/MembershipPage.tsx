import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';

const MembershipPage = () => {
  const navigate = useNavigate();
  const [isMembershipChecked, setIsMembershipChecked] = useState(1);
  const checkMembership = (num: number) => {
    setIsMembershipChecked(num);
    navigate(-1);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-center items-center w-full px-4 mt-[65px] relative text-[18px] text-black font-bold">
        <Prev
          className="absolute inset-y-0 left-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        멤버십
      </div>
      <div className="mt-10 text-lg font-normal w-full text-start ">
        {' '}
        ~를 <p>무제한으로 즐겨보세요.</p>
      </div>
      <div
        className={`border-[1px] h-[118px] px-4 mt-[52px] rounded-[8px] align-start flex items-center text-xl font-bold cursor-pointer ${
          isMembershipChecked == 1
            ? 'border-primary text-black '
            : 'border-[#CBCBCC] text-[#CBCBCC]'
        }`}
        onClick={() => setIsMembershipChecked(1)}
      >
        12개월
      </div>
      <div
        className={`border-[1px] h-[78px] px-4 mt-[22px] rounded-[8px] align-start flex items-center text-xl font-bold cursor-pointer ${
          isMembershipChecked == 2
            ? 'border-primary text-black '
            : 'border-[#CBCBCC] text-[#CBCBCC]'
        }`}
        onClick={() => setIsMembershipChecked(2)}
      >
        1개월
      </div>
      <button
        onClick={() => checkMembership(isMembershipChecked)}
        className="w-full h-[50px] mt-8 bg-primary text-white rounded-[27px]"
      >
        <span className="text-[#FFD36A]">일주일간 무료 체험 </span>
        시작하기
      </button>
    </div>
  );
};

export default MembershipPage;
