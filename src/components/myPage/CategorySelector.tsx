import React, { useState } from 'react';
import ChecklistCheckBlock from './ChecklistCheckBlock';
import ChecklistMultiCheckBlock from './ChecklistMultiCheckBlock';

const CategorySelector = () => {
  const [smokingPreference, setSmokingPreference] = useState('');
  const [lifestylePattern, setLifestylePattern] = useState('');
  const [cleaningFrequency, setCleaningFrequency] = useState('');
  const [sleepingHabit, setSleepingHabit] = useState([0, 0, 0, 0, 0]);
  const [drinkingFrequency, setDrinkingFrequency] = useState('');
  const [hometown, setHometown] = useState('');
  const [noiseLevel, setNoiseLevel] = useState([0, 0, 0, 0]);

  // 다른 카테고리의 상태 관리 변수들 추가

  const handleSmokingPreferenceChange = (selectedOption: string) => {
    setSmokingPreference(selectedOption);
  };

  const handleLifestylePatternChange = (selectedOption: string) => {
    setLifestylePattern(selectedOption);
  };

  const handleCleaningFrequencyChange = (selectedOption: string) => {
    setCleaningFrequency(selectedOption);
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
      <ChecklistCheckBlock
        title={'청소 중요도 🧽'}
        option={['일주일에 1번', '일주일에 2번', '일주일에 3번']}
        selectedOption={cleaningFrequency}
        onOptionChange={handleCleaningFrequencyChange}
      />
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
  );
};

export default CategorySelector;
