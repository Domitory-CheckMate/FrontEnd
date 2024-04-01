import React, { useEffect, useState } from 'react';
import { ReactComponent as CalendarIcon } from '../../assets/icon/icon_calendar.svg';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
interface PeriodInputProps {
  onPeriodChange: (newPeriod: string) => void;
  defaultValue?: string;
}

const PeriodInput: React.FC<PeriodInputProps> = ({
  onPeriodChange,
  defaultValue,
}) => {
  const todayDate = new Date();
  const [defaultDate, setDefaultDate] = useState('');

  useEffect(() => {
    console.log('??');
    if (defaultValue != undefined) {
      const defaultYear = defaultValue?.split('-')[0];
      const defaultMonth = defaultValue?.split('-')[1];
      const defaultDay = defaultValue?.split('-')[2];
      setDefaultDate(`${defaultYear}. ${defaultMonth}. ${defaultDay}`);
    } else {
      setDefaultDate(
        `${todayDate.getFullYear()}. ${
          todayDate.getMonth() + 1
        }. ${todayDate.getDate()}`,
      );
    }
  }, []);

  const [isEdit, setIsEdit] = useState(false);

  const onChange = (value: Date) => {
    setDefaultDate(
      `${value.getFullYear()}. ${value.getMonth() + 1}. ${value.getDate()}`,
    );

    const year = value.getFullYear();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const date = value.getDate().toString().padStart(2, '0');

    onPeriodChange(`${year}-${month}-${date}`);
    setIsEdit(false);
  };

  return (
    <div className="flex-col">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">
          모집 기간 설정
        </div>
      </div>
      <div
        className={`flex flex-col w-full mt-[13px] text-sm font-semibold px-[14px] py-[12px] border-[#999] border-[1px] rounded-[10px] gap-[8px] ${
          isEdit == true ? 'text-black' : 'text-[#999]'
        }`}
      >
        <div className="flex" onClick={() => setIsEdit(!isEdit)}>
          <CalendarIcon className="w-[20px] h-[20px] mr-[10px]" />
          {defaultDate}
        </div>
        {isEdit == true && (
          <div className="w-full flex justify-center">
            <Calendar
              onChange={onChange as () => void}
              value={defaultDate}
              showNeighboringMonth={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodInput;
