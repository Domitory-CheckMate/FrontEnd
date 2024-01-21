import React, { useEffect, useState } from 'react';
import ChecklistCheckBlock from './ChecklistCheckBlock';
import ChecklistMultiCheckBlock from './ChecklistMultiCheckBlock';
import { ReactComponent as Check } from '../../assets/icon/icon_check_primary.svg';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { editChecklistApi, getChecklistApi } from '../../api/userApi';
import { postChecklistApi } from '../../api/userApi';
import { CustomError, checklistApiType } from '../../data/type';
import { sleep } from 'react-query/types/core/utils';

const CategorySelector = ({
  setEdit,
}: {
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [smokingPreference, setSmokingPreference] = useState(-1);
  const [lifestylePattern, setLifestylePattern] = useState(-1);
  const [cleaningFrequency, setCleaningFrequency] = useState(-1);
  const [sleepingHabit, setSleepingHabit] = useState([0, 0, 0, 0, 0]);
  const [drinkingFrequency, setDrinkingFrequency] = useState(-1);
  const [hometown, setHometown] = useState(-1);
  const [noiseLevel, setNoiseLevel] = useState([0, 0, 0, 0]);

  const smokeType = ['NO', 'YES'];
  const cleanType = ['RARELY', 'SOMETIMES', 'OFTEN', 'USUALLY', 'ALWAYS'];
  const drinkType = ['NEVER', 'SOMETIMES', 'OFTEN', 'ALWAYS'];
  const homeType = ['RARELY', 'SOMETIMES', 'OFTEN', 'ALWAYS'];
  const lifePatternType = ['MORNING', 'EVENING'];
  const noiseType = ['EARPHONE', 'OUTSIDE', 'SHORT', 'ANYWAY'];
  const sleepType = ['SNORING', 'GRINDING', 'TALKING', 'TURNING', 'NOTHING'];

  const { state } = useLocation();
  const { checklist } = state;
  const [finalList, setFinalList] = useState<checklistApiType>(checklist);

  // const token =
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNSIsImlhdCI6MTcwNDk5NTkzMSwiZXhwIjoxNzA1NjAwNzMxfQ.24gTBd8ecIiLtMsZjia6ixrfB_aq_nH8ojNpjwZ0s1Y';

  const onHandleClickEdit = () => {
    const sleepGridingType = sleepingHabit[1] == 1 ? 'TRUE' : 'FALSE';
    const sleepSnoreType = sleepingHabit[0] == 1 ? 'TRUE' : 'FALSE';
    const sleepTalkingType = sleepingHabit[2] == 1 ? 'TRUE' : 'FALSE';
    const sleepTurningType = sleepingHabit[3] == 1 ? 'TRUE' : 'FALSE';

    const myCheckList: checklistApiType = {
      cleanType: cleanType[cleaningFrequency] as checklistApiType['cleanType'],
      drinkType: drinkType[drinkingFrequency] as checklistApiType['drinkType'],
      homeType: homeType[hometown] as checklistApiType['homeType'],
      lifePatternType: lifePatternType[
        lifestylePattern
      ] as checklistApiType['lifePatternType'],
      noiseType: noiseType[noiseLevel[0]] as checklistApiType['noiseType'],
      smokeType: smokeType[smokingPreference] as checklistApiType['smokeType'],
      sleepGridingType:
        sleepGridingType as checklistApiType['sleepGridingType'],
      sleepSnoreType: sleepSnoreType as checklistApiType['sleepSnoreType'],
      sleepTalkingType:
        sleepTalkingType as checklistApiType['sleepTalkingType'],
      sleepTurningType:
        sleepTurningType as checklistApiType['sleepTurningType'],
    };

    setFinalList(myCheckList);
    tryChecklistEdit();
  };

  const { data, error, isLoading } = useQuery('checklistData', getChecklistApi);

  useEffect(() => {
    if (data) {
      console.log('Data:', data);
      // 여기에서 데이터 처리 로직을 추가할 수 있습니다.
      setCleaningFrequency(cleanType.indexOf(data.data.data.cleanType));
      setDrinkingFrequency(drinkType.indexOf(data.data.data.drinkType));
      setHometown(homeType.indexOf(data.data.data.homeType));
      setLifestylePattern(
        lifePatternType.indexOf(data.data.data.lifePatternType),
      );
      setNoiseLevel([noiseType.indexOf(data.data.data.noiseType), 0, 0, 0]);
      setSmokingPreference(smokeType.indexOf(data.data.data.smokeType));
      setSleepingHabit([
        data.data.data.sleepSnoreType == 'TRUE' ? 1 : 0,
        data.data.data.sleepGridingType == 'TRUE' ? 1 : 0,
        data.data.data.sleepTalkingType == 'TRUE' ? 1 : 0,
        data.data.data.sleepTurningType == 'TRUE' ? 1 : 0,
        data.data.data.sleepSnoreType == 'FALSE' &&
        data.data.data.sleepGridingType == 'FALSE' &&
        data.data.data.sleepTalkingType == 'FALSE' &&
        data.data.data.sleepTurningType == 'FALSE'
          ? 1
          : 0,
      ]);

      setFinalList(data.data.data);
    }

    if (error) {
      console.error('Error:', error);
      const customErr = error as CustomError;
      if (customErr.response?.status === 500) {
        console.log('오류가 발생하였습니다.');
      }
    }
  }, [data, error, setEdit]);

  const { mutate: tryChecklistEdit } = useMutation(
    () => editChecklistApi(finalList),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: unknown) => {
        console.log(error);
        const customErr = error as CustomError;
        if (customErr.response?.status === 500) {
          console.log('오류가 발생하였습니다.');
        }
      },
    },
  );

  const handleSmokingPreferenceChange = (selectedOption: number) => {
    setSmokingPreference(selectedOption);
  };

  const handleLifestylePatternChange = (selectedOption: number) => {
    setLifestylePattern(selectedOption);
  };

  const handleSleepingHabitChange = (array: Array<number>) => {
    setSleepingHabit(array);
  };

  const handleDrinkingFrequencyChange = (selectedOption: number) => {
    setDrinkingFrequency(selectedOption);
  };

  const handleHometownChange = (selectedOption: number) => {
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
          onClick={onHandleClickEdit}
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
