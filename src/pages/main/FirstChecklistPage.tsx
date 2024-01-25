import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
import CategorySelector from '../../components/myPage/CategorySelector';

const FirstChecklistPage = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (data) {
  //     console.log('Data:', data);
  //     // 여기에서 데이터 처리 로직을 추가할 수 있습니다.

  //     // data 객체 내에서 필요한 정보 추출
  //     const {
  //       cleanType,
  //       drinkType,
  //       homeType,
  //       lifePatternType,
  //       callType,
  //       earPhoneType,
  //       sleepGrindingType,
  //       sleepSnoreType,
  //       sleepTalkingType,
  //       sleepTurningType,
  //       smokeType,
  //     } = data.data.data;
  //     // state 업데이트
  //     setCleanType(cleanType);
  //     setDrinkType(drinkType);
  //     setHomeType(homeType);
  //     setLifePatternType(lifePatternType);
  //     setSmokeType(smokeType);

  //     // 초기화
  //     let sleepType = '';

  //     // 각 값이 boolean일 때
  //     if (
  //       !lifePatternType &&
  //       !sleepSnoreType &&
  //       !sleepTalkingType &&
  //       !sleepTurningType
  //     ) {
  //       sleepType = '상관없음';
  //     }

  //     // 각 값이 문자열일 때
  //     if (
  //       typeof sleepGrindingType === 'string' &&
  //       sleepGrindingType !== 'false'
  //     ) {
  //       sleepType += sleepGrindingType;
  //     }
  //     if (typeof sleepSnoreType === 'string' && sleepSnoreType !== 'false') {
  //       sleepType += (sleepType ? ', ' : '') + sleepSnoreType;
  //     }
  //     if (
  //       typeof sleepTalkingType === 'string' &&
  //       sleepTalkingType !== 'false'
  //     ) {
  //       sleepType += (sleepType ? ', ' : '') + sleepTalkingType;
  //     }
  //     if (
  //       typeof sleepTurningType === 'string' &&
  //       sleepTurningType !== 'false'
  //     ) {
  //       sleepType += (sleepType ? ', ' : '') + sleepTurningType;
  //     }

  //     // 결과 사용
  //     setSleepType(sleepType);
  //     setIsError(false);

  //     setNoiseType(callType + ', ' + earPhoneType);
  //   }

  //   if (error) {
  //     console.error('Error:', error);
  //     setIsError(true);
  //     const customErr = error as CustomError;
  //     if (customErr.response?.status === 500) {
  //       console.log('오류가 발생하였습니다.');
  //     }
  //   }
  // }, [data, error]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center w-full px-4 mt-[65px] relative mb-[48px]">
        <div className="w-1/3">
          <Prev className="cursor-pointer" onClick={() => navigate(-1)} />{' '}
        </div>
        <div className="text-[18px] font-bold">체크리스트 등록</div>
        <div className="w-1/3"></div>
      </div>
      <div className="grow w-full scrollbar-hide overflow-y-auto ">
        <CategorySelector setEdit={() => {}} type="POST" />
      </div>
    </div>
  );
};

export default FirstChecklistPage;
