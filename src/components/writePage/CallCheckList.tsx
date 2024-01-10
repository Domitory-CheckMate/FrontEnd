import React, { useState } from 'react';
import { ReactComponent as Plus } from '../../assets/icon/icon_plus.svg';
import ChecklistBlock from './ChecklistBlock';

const CallCheckList = () => {
  const [CallCheckList, setCallCheckList] = useState(false);
  const checkList = [
    '🚭 비흡연자 선호',
    '️️☀️ 아침형 인간',
    '🧽 일주일에 1번 청소',
    '😴 잠꼬대, 코골이',
    '🍺 안 마시는',
    '🏠 매주 본가',
    '🗣️ 이어폰 필수, 전화는 짧게',
  ];

  return (
    <div className="flex-col mt-[25px]]">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">
          체크리스트
        </div>
      </div>
      {!CallCheckList && (
        <div className="flex cursor-pointer w-full mt-[13px] text-sm text-primary font-normal px-[14px] py-[12px] border-primary border-[1px] rounded-[10px] flex justify-center">
          <div
            className="flex justify-center gap-[7.5px] items-center"
            onClick={() => setCallCheckList(true)}
          >
            <Plus /> 기존 체크리스트 불러오기
          </div>
        </div>
      )}

      {CallCheckList && (
        <div className="flex flex-wrap mt-[13px] gap-[8px]">
          {checkList.map((check) => (
            <ChecklistBlock text={check} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CallCheckList;
