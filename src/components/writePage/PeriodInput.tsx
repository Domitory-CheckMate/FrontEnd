import React, { useEffect, useState } from 'react';
import { ReactComponent as Calendar } from '../../assets/icon/icon_calendar.svg';

const PeriodInput = () => {
  const todayDate = new Date();
  const [defaultDate, setDefaultDate] = useState(
    `${todayDate.getFullYear()}. ${
      todayDate.getMonth() + 1
    }. ${todayDate.getDate()}`,
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setDefaultDate(
      `${startDate.getFullYear()}. ${
        startDate.getMonth() + 1
      }. ${startDate.getDate()}`,
    );
    setStartDate(startDate);
    setEndDate(endDate);
    setIsEdit(false);
  }, []);

  return (
    <div className="flex-col">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">
          모집 기간 설정
        </div>
      </div>
      <div
        className={`flex w-full mt-[13px] text-sm font-semibold px-[14px] py-[12px] border-[#999] border-[1px] rounded-[10px] ${
          isEdit == true ? 'text-black' : 'text-[#999]'
        }`}
      >
        <Calendar className="w-[20px] h-[20px] mr-[10px]" />
        {defaultDate}
      </div>
    </div>
  );
};

export default PeriodInput;
