import React, { useEffect, useState } from 'react';
import ChecklistCheckBlock from './ChecklistCheckBlock';
import ChecklistMultiCheckBlock from './ChecklistMultiCheckBlock';
import { ReactComponent as Check } from '../../assets/icon/icon_check_primary.svg';
import { useMutation, useQuery } from 'react-query';
import { editChecklistApi, getChecklistApi } from '../../api/userApi';
import { postChecklistApi } from '../../api/userApi';
import { CustomError, checklistApiType } from '../../data/type';
import { useSetRecoilState } from 'recoil';
import { myCheckListState } from '../../data/atoms';

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
  const [earphone, setEarphone] = useState(-1);
  const [phone, setPhone] = useState(-1);

  const [isFirst, setIsFirst] = useState(true);

  const smokeType = ['SMOKE', 'NONE'];
  const cleanType = ['ALWAYS', 'USUALLY', 'OFTEN', 'SOMETIMES', 'RARELY'];
  const drinkType = ['NEVER', 'SOMETIMES', 'OFTEN', 'ALWAYS'];
  const homeType = ['ALWAYS', 'OFTEN', 'SOMETIMES', 'RARELY'];
  const lifePatternType = ['MORNING', 'EVENING'];
  const callType = ['OUTSIDE', 'INSIDE', 'ANYWAY'];
  const earphoneType = ['NEED', 'NOT_NEED'];

  const smokeTypeKor = ['흡연자 선호', '비흡연자 선호'];
  const lifePatternTypeKor = ['아침형 인간', '저녁형 인간'];
  const cleanTypeKor = [
    '매일매일',
    '1주일에 3~4번',
    '1주에 한 번',
    '2주에 1번',
    '한달에 한 번',
  ];
  const drinkTypeKor = ['안마심', '1주에 2~3번', '1주에 4~5번', '매일'];
  const homeTypeKor = ['매주', '1~2주에 한번', '1주에 한 번', '2주에 한 번'];
  const earphoneTypeKor = ['이어폰 착용', '상관없음'];
  const callTypeKor = ['통화는 밖에서', '5분 이내는 안에서', '상관 없음'];
  // const sleepTypeKor = ['코골이', '이갈이', '잠꼬대', '뒤척임', '없음'];

  const [finalList, setFinalList] = useState<checklistApiType>();

  const setList = useSetRecoilState(myCheckListState);

  const onHandleClickEdit = () => {
    if (
      smokingPreference == -1 ||
      lifestylePattern == -1 ||
      cleaningFrequency == -1 ||
      drinkingFrequency == -1 ||
      hometown == -1 ||
      earphone == -1 ||
      phone == -1 ||
      (sleepingHabit[0] == 0 &&
        sleepingHabit[1] == 0 &&
        sleepingHabit[2] == 0 &&
        sleepingHabit[3] == 0 &&
        sleepingHabit[4] == 0)
    ) {
      console.log('빈칸이 있습니다.');
    } else {
      if (isFirst) {
        tryChecklistCreate();
      } else {
        console.log(finalList);
        tryChecklistEdit();
      }
    }
  };

  useEffect(() => {
    const sleepGrindingType = sleepingHabit[1] == 1 ? 'TRUE' : 'FALSE';
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
      callType: callType[phone] as checklistApiType['callType'],
      earPhoneType: earphoneType[earphone] as checklistApiType['earPhoneType'],
      smokeType: smokeType[smokingPreference] as checklistApiType['smokeType'],
      sleepGrindingType:
        sleepGrindingType as checklistApiType['sleepGrindingType'],
      sleepSnoreType: sleepSnoreType as checklistApiType['sleepSnoreType'],
      sleepTalkingType:
        sleepTalkingType as checklistApiType['sleepTalkingType'],
      sleepTurningType:
        sleepTurningType as checklistApiType['sleepTurningType'],
    };
    setFinalList(myCheckList);
    setList(myCheckList);
  }, [
    smokingPreference,
    lifestylePattern,
    cleaningFrequency,
    drinkingFrequency,
    hometown,
    earphone,
    phone,
    sleepingHabit,
  ]);

  const { data, error, isLoading } = useQuery('checklistData', getChecklistApi);
  console.log(isLoading);

  useEffect(() => {
    if (data) {
      if (data.data.data == null) {
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }
      // data 객체 내에서 필요한 정보 추출

      console.log('Data:', data);
      // 여기에서 데이터 처리 로직을 추가할 수 있습니다.
      const {
        cleanType,
        drinkType,
        homeType,
        lifePatternType,
        callType,
        earPhoneType,
        sleepGrindingType,
        sleepSnoreType,
        sleepTalkingType,
        sleepTurningType,
        smokeType,
      } = data.data.data;

      //kor 배열에서의 index 반환
      setCleaningFrequency(cleanTypeKor.indexOf(cleanType));
      setDrinkingFrequency(drinkTypeKor.indexOf(drinkType));
      setHometown(homeTypeKor.indexOf(homeType));
      setLifestylePattern(lifePatternTypeKor.indexOf(lifePatternType));
      setPhone(callTypeKor.indexOf(callType));
      setEarphone(earphoneTypeKor.indexOf(earPhoneType));

      setSmokingPreference(smokeTypeKor.indexOf(smokeType));
      setSleepingHabit([
        sleepSnoreType == '코골이' ? 1 : 0,
        sleepGrindingType == '이갈이' ? 1 : 0,
        sleepTalkingType == '잠꼬대' ? 1 : 0,
        sleepTurningType == '뒤척임' ? 1 : 0,
        sleepSnoreType == 'false' &&
        sleepGrindingType == 'false' &&
        sleepTalkingType == 'false' &&
        sleepTurningType == 'false'
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
    () => editChecklistApi(finalList as checklistApiType),
    {
      onSuccess: (data) => {
        console.log(data);
        console.log(finalList);
        setEdit(false);
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

  const { mutate: tryChecklistCreate } = useMutation(
    () => postChecklistApi(finalList as checklistApiType),
    {
      onSuccess: (data) => {
        console.log(data);
        setEdit(false);
      },
      onError: (error: unknown) => {
        console.log(error);
        const customErr = error as CustomError;
        if (customErr.response?.status === 500) {
          console.log('오류가 발생하였습니다.');
        } else if (customErr.response?.status === 409) {
          console.log('이미 체크리스트가 존재합니다.');
          tryChecklistEdit();
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

  const handleEarphoneChange = (selectedOption: number) => {
    setEarphone(selectedOption);
  };

  const handlePhoneChange = (selectedOption: number) => {
    setPhone(selectedOption);
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
        <ChecklistCheckBlock
          title={'이어폰 🎧'}
          option={['이어폰 착용', '상관 없음']}
          selectedOption={earphone}
          onOptionChange={handleEarphoneChange}
        />
        <ChecklistCheckBlock
          title={'통화 ☎️'}
          option={['통화는 밖에서', '5분 이내는 안에서', '상관 없음']}
          selectedOption={phone}
          onOptionChange={handlePhoneChange}
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
