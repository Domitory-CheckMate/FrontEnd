import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Close } from '../../assets/icon/icon_close.svg';

import TitleInput from '../../components/writePage/TitleInput';
import IntroInput from '../../components/writePage/IntroInput';
import KeywordInput from '../../components/writePage/KeywordInput';
import CallCheckList from '../../components/writePage/CallCheckList';
import PeriodInput from '../../components/writePage/PeriodInput';
import RoomTypeInput from '../../components/writePage/RoomTypeInput';

const WritePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-between p-4">
      <div className="flex justify-between items-center w-full mt-[65px] relative mb-[48px]">
        <div className="w-1/3"></div>
        <div className="text-[18px] font-bold">룸메이트 모집</div>
        <div className="w-1/3 flex justify-end">
          <Close className="cursor-pointer" onClick={() => navigate(-1)} />{' '}
        </div>
      </div>
      <div className="grow-1 w-full scrollbar-hide overflow-y-auto ">
        <div className="grid gap-y-[25px]">
          <TitleInput title="제목" />
          <IntroInput intro="한줄소개" />
          <KeywordInput title="키워드" />

          <CallCheckList />
          <PeriodInput />
          <RoomTypeInput />
        </div>
      </div>

      <div className="bg-white pt-[11px] pb-[29px]">
        <button className="w-full h-[50px]  bg-primary text-white rounded-[27px]">
          {' '}
          등록하기
        </button>
      </div>
    </div>
  );
};

export default WritePage;
