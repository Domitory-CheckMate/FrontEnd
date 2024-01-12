import React, { useState } from 'react';
import ChecklistCheckBlock from './ChecklistCheckBlock';
import ChecklistMultiCheckBlock from './ChecklistMultiCheckBlock';
import { ReactComponent as Check } from '../../assets/icon/icon_check_primary.svg';

const CategorySelector = ({
  setEdit,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [smokingPreference, setSmokingPreference] = useState('');
  const [lifestylePattern, setLifestylePattern] = useState('');
  const [cleaningFrequency, setCleaningFrequency] = useState(-1);
  const [sleepingHabit, setSleepingHabit] = useState([0, 0, 0, 0, 0]);
  const [drinkingFrequency, setDrinkingFrequency] = useState('');
  const [hometown, setHometown] = useState('');
  const [noiseLevel, setNoiseLevel] = useState([0, 0, 0, 0]);

  // 다른 카테고리의 상태 관리 변수들 추가
  const handleEditClick = () => {
    // setEdit 함수 호출
    setEdit(false);
  };

  const handleSmokingPreferenceChange = (selectedOption: string) => {
    setSmokingPreference(selectedOption);
  };

  const handleLifestylePatternChange = (selectedOption: string) => {
    setLifestylePattern(selectedOption);
  };

  const handleSleepingHabitChange = (array: Array<number>) => {
    setSleepingHabit(array);
  };

  const handleDrinkingFrequencyChange = (selectedOption: string) => {
    setDrinkingFrequency(selectedOption);
  };

  const handleHometownChange = (selectedOption: string) => {
    setHometown(selectedOption);
  };

  const handleNoiseLevelChange = (array: Array<number>) => {
    setNoiseLevel(array);
  };

  // 다른 카테고리의 핸들러 함수들 추가

  return (
    <div className=" flex flex-col h-full ">
      <div className="scrollbar-hide overflow-y-auto grow">
        <ChecklistCheckBlock
          title={'흡연여부 🚬'}
          option={['흡연자 선호', '비흡연자 선호']}
          selectedOption={smokingPreference}
          onOptionChange={handleSmokingPreferenceChange}
        />
        <ChecklistCheckBlock
          title={'생활패턴 ☀️'}
          option={['아침형 인간', '저녁형 인간']}
          selectedOption={lifestylePattern}
          onOptionChange={handleLifestylePatternChange}
        />

        <div className="flex-col text-base font-normal text-center items-center text-black px-4 pb-1 mb-[20px]">
          <div className="flex w-full gap-x-[8px]">
            <div className="text-start">{'청소 중요도 🧽'}</div>
          </div>
          <div className="flex w-[340px] justify-between items-center px-[7px]  mt-[15px]">
            <div
              className={`rounded-full w-[24px] h-[24px] border-[1px] flex items-center justify-center ${
                cleaningFrequency == 0
                  ? 'border-[#FF6C3E] bg-[#FFE2D8]'
                  : 'border-[#E5E5E5] bg-white'
              }`}
              onClick={() => setCleaningFrequency(0)}
            >
              {cleaningFrequency == 0 ? <Check /> : null}
            </div>
            <div className="h-[1px] grow bg-[#E5E5E5]"></div>
            <div
              className={`rounded-full w-[24px] h-[24px] border-[1px] flex items-center justify-center ${
                cleaningFrequency == 1
                  ? 'border-[#FF6C3E] bg-[#FFE2D8]'
                  : 'border-[#E5E5E5] bg-white'
              }`}
              onClick={() => setCleaningFrequency(1)}
            >
              {cleaningFrequency == 1 ? <Check /> : null}
            </div>
            <div className="h-[1px] grow bg-[#E5E5E5]"></div>
            <div
              className={`rounded-full w-[24px] h-[24px] border-[1px] flex items-center justify-center ${
                cleaningFrequency == 2
                  ? 'border-[#FF6C3E] bg-[#FFE2D8]'
                  : 'border-[#E5E5E5] bg-white'
              }`}
              onClick={() => setCleaningFrequency(2)}
            >
              {cleaningFrequency == 2 ? <Check /> : null}
            </div>
            <div className="h-[1px] grow bg-[#E5E5E5]"></div>
            <div
              className={`rounded-full w-[24px] h-[24px] border-[1px] flex items-center justify-center ${
                cleaningFrequency == 3
                  ? 'border-[#FF6C3E] bg-[#FFE2D8]'
                  : 'border-[#E5E5E5] bg-white'
              }`}
              onClick={() => setCleaningFrequency(3)}
            >
              {cleaningFrequency == 3 ? <Check /> : null}
            </div>
            <div className="h-[1px] grow bg-[#E5E5E5]"></div>
            <div
              className={`rounded-full w-[24px] h-[24px] border-[1px] flex items-center justify-center ${
                cleaningFrequency == 4
                  ? 'border-[#FF6C3E] bg-[#FFE2D8]'
                  : 'border-[#E5E5E5] bg-white'
              }`}
              onClick={() => setCleaningFrequency(4)}
            >
              {cleaningFrequency == 4 ? <Check /> : null}
            </div>
          </div>
        </div>
        <ChecklistMultiCheckBlock
          title={'잠버릇 😴'}
          option={['코골이', '이갈이', '잠꼬대', '뒤척임', '없음']}
          subtitle="(중복 선택 가능)"
          selectedOption={sleepingHabit}
          onOptionChange={handleSleepingHabitChange}
        />
        <ChecklistCheckBlock
          title={'음주 빈도 🍺'}
          option={['안 마심', '1주에 2~3번', '1주에 4~5번', '매일']}
          selectedOption={drinkingFrequency}
          onOptionChange={handleDrinkingFrequencyChange}
        />
        <ChecklistCheckBlock
          title={'본가 가는 주기 🏠'}
          option={['매주', '1~2주에 1번', '달에 1번', '가끔']}
          selectedOption={hometown}
          onOptionChange={handleHometownChange}
        />
        <ChecklistMultiCheckBlock
          title={'소음 🗣️'}
          option={['이어폰 필수', '전화는 밖에서', '전화는 짧게', '상관 없음']}
          subtitle="(중복 선택 가능)"
          selectedOption={noiseLevel}
          onOptionChange={handleNoiseLevelChange}
        />
      </div>

      <div className="bg-white  px-[16px] pt-[11px] pb-[29px]">
        <button
          onClick={handleEditClick}
          className="w-full h-[50px]  bg-primary text-white rounded-[27px]"
        >
          {' '}
          수정 완료
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
