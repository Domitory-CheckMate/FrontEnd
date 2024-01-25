import React, { useState, useEffect } from 'react';
import { ReactComponent as Plus } from '../../assets/icon/icon_plus.svg';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getChecklistApi } from '../../api/userApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myCheckListState } from '../../data/atoms';

interface CallCheckListProps {
  onCallCheckChange: (newCheckList: checklistApiType) => void;
}

const CallCheckList: React.FC<CallCheckListProps> = ({ onCallCheckChange }) => {
  // const checkList = [
  //   '🚭 비흡연자 선호',
  //   '️️☀️ 아침형 인간',
  //   '🧽 일주일에 1번 청소',
  //   '😴 잠꼬대, 코골이',
  //   '🍺 안 마시는',
  //   '🏠 매주 본가',
  //   '🗣️ 이어폰 필수, 전화는 짧게',
  // ];

  // 리코일 값 부르기
  const myCheckList = useRecoilValue(myCheckListState);
  const [callCheckList, setCallCheckList] = useState(false);
  const [callCheck, setCallCheck] = useState<checklistApiType>();

  const handleCallCheckListChange = () => {
    onCallCheckChange(myCheckList);
    setCallCheckList(true);
  };

  const handleCallCheckChange = (newCallCheck: checklistApiType) => {
    setCallCheck(newCallCheck);
    console.log(callCheck);
  };

  useEffect(() => {
    onCallCheckChange(callCheck as checklistApiType);
  }, [callCheck]);

  return (
    <div className="flex-col mt-[25px]]">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">
          체크리스트
        </div>
      </div>
      {!callCheckList && (
        <div className="flex cursor-pointer w-full mt-[13px] text-sm text-primary font-normal px-[14px] py-[12px] border-primary border-[1px] rounded-[10px] flex justify-center">
          <div
            className="flex justify-center gap-[7.5px] items-center"
            onClick={handleCallCheckListChange}
          >
            <Plus /> 기존 체크리스트 불러오기
          </div>
        </div>
      )}
      {callCheckList && <MyCheckList onCallCheckList={handleCallCheckChange} />}

      {/* {CallCheckList && (
        <div className="flex flex-wrap mt-[13px] gap-[8px]">
          {checkList.map((check) => (
            <ChecklistBlock text={check} />
          ))}
        </div>
      )} */}
    </div>
  );
};
import { CustomError, checklistApiType } from '../../data/type';

const CheckBlock = ({ emoji, content }: { emoji: string; content: string }) => {
  const navigate = useNavigate();

  return (
    <div
      className="text-[10px] text-center flex py-2 px-4 text-black rounded-[19px] bg-[#E5E5E5] cursor-pointer"
      onClick={() => {
        navigate(`/checklist`);
      }}
    >
      {emoji + ' ' + content}
    </div>
  );
};

const MyCheckList = ({
  onCallCheckList,
}: {
  onCallCheckList: (newCheckList: checklistApiType) => void;
}) => {
  const setChecklist = useSetRecoilState(myCheckListState);

  const { data, error } = useQuery('getChecklistInfo', getChecklistApi);
  const [cleanType, setCleanType] = useState('');
  const [drinkType, setDrinkType] = useState('');
  const [homeType, setHomeType] = useState('');
  const [lifePatternType, setLifePatternType] = useState('');
  const [noiseType, setNoiseType] = useState('');
  // const [noiseCallType, setCallType] = useState('');
  // const [noiseEarPhoneType, setEarphoneType] = useState('');
  const [smokeType, setSmokeType] = useState('');
  // const [sleepGrindingType, setSleepGrindingType] = useState('');
  // const [sleepSnoreType, setSleepSnoreType] = useState('');
  // const [sleepTalkingType, setSleepTalkingType] = useState('');
  // const [sleepTurningType, setSleepTurningType] = useState('');
  const [sleepType, setSleepType] = useState('');

  const [finalList, setFinalList] = useState<checklistApiType>();

  const [cleanTypeApi, setCleanTypeApi] = useState('');
  const [drinkTypeApi, setDrinkTypeApi] = useState('');
  const [homeTypeApi, setHomeTypeApi] = useState('');
  const [lifePatternTypeApi, setLifePatternTypeApi] = useState('');
  const [callTypeApi, setCallTypeApi] = useState('');
  const [earPhoneTypeApi, setEarphoneTypeApi] = useState('');
  const [smokeTypeApi, setSmokeTypeApi] = useState('');
  const [sleepGrindingTypeApi, setSleepGrindingTypeApi] = useState('');
  const [sleepSnoreTypeApi, setSleepSnoreTypeApi] = useState('');
  const [sleepTalkingTypeApi, setSleepTalkingTypeApi] = useState('');
  const [sleepTurningTypeApi, setSleepTurningTypeApi] = useState('');

  const smokeTypeKor = ['흡연자 선호', '비흡연자 선호'];
  const lifePatternTypeKor = ['아침형 인간', '저녁형 인간'];
  const cleanTypeKor = [
    '1달에 한번',
    '2주에 1번',
    '1주에 1번',
    '1주에 3~4번',
    '매일매일',
  ];
  const drinkTypeKor = ['안마심', '1주에 2~3번', '1주에 4~5번', '매일'];
  const homeTypeKor = ['가끔', '달에 1번', '1~2주에 한번', '매주'];
  const callTypeKor = ['통화는 밖에서', '5분 이내는 안에서', '상관없음'];
  const earphoneTypeKor = ['이어폰 필수', '상관없음'];
  // const sleepTypeKor = ['코골이', '이갈이', '잠꼬대', '뒤척임', '없음'];

  useEffect(() => {
    if (data) {
      console.log('Data:', data);
      // 여기에서 데이터 처리 로직을 추가할 수 있습니다.

      // data 객체 내에서 필요한 정보 추출
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
      // state 업데이트
      setCleanType(cleanType);
      setDrinkType(drinkType);
      setHomeType(homeType);
      setLifePatternType(lifePatternType);
      setSmokeType(smokeType);

      // 초기화
      let sleepType = '';

      // 각 값이 boolean일 때
      if (
        !sleepGrindingType &&
        !sleepSnoreType &&
        !sleepTalkingType &&
        !sleepTurningType
      ) {
        sleepType = '상관없음';
      }

      // 각 값이 문자열일 때
      if (
        typeof sleepGrindingType === 'string' &&
        sleepGrindingType !== 'false'
      ) {
        sleepType += sleepGrindingType;
      }
      if (typeof sleepSnoreType === 'string' && sleepSnoreType !== 'false') {
        sleepType += (sleepType ? ', ' : '') + sleepSnoreType;
      }
      if (
        typeof sleepTalkingType === 'string' &&
        sleepTalkingType !== 'false'
      ) {
        sleepType += (sleepType ? ', ' : '') + sleepTalkingType;
      }
      if (
        typeof sleepTurningType === 'string' &&
        sleepTurningType !== 'false'
      ) {
        sleepType += (sleepType ? ', ' : '') + sleepTurningType;
      }

      // 결과 사용
      setSleepType(sleepType);

      setNoiseType(callType + ', ' + earPhoneType);

      // API CAll을 위한 state 업데이트
      setCleanTypeApi(`${cleanTypeKor.indexOf(cleanType) + 1}`);
      setDrinkTypeApi(`${drinkTypeKor.indexOf(drinkType) + 1}`);
      setHomeTypeApi(`${homeTypeKor.indexOf(homeType) + 1}`);
      setLifePatternTypeApi(
        `${lifePatternTypeKor.indexOf(lifePatternType) + 1}`,
      );
      setCallTypeApi(`${callTypeKor.indexOf(callType) + 1}`);
      setEarphoneTypeApi(`${earphoneTypeKor.indexOf(earPhoneType) + 1}`);

      setSmokeTypeApi(`${smokeTypeKor.indexOf(smokeType) + 1}`);
      setSleepGrindingTypeApi(sleepGrindingType == '이갈이' ? '1' : '2');
      setSleepSnoreTypeApi(sleepSnoreType == '코골이' ? '1' : '2');
      setSleepTalkingTypeApi(sleepTalkingType == '잠꼬대' ? '1' : '2');
      setSleepTurningTypeApi(sleepTurningType == '뒤척임' ? '1' : '2');
    } else {
      console.log('Data is undefined');
    }

    if (error) {
      console.error('Error:', error);
      const customErr = error as CustomError;
      if (customErr.response?.status === 500) {
        console.log('오류가 발생하였습니다.');
      }
    }
  }, [data, error]);

  useEffect(() => {
    const myCheckList: checklistApiType = {
      cleanType: cleanTypeApi,
      drinkType: drinkTypeApi,
      homeType: homeTypeApi,
      lifePatternType: lifePatternTypeApi,
      callType: callTypeApi,
      earPhoneType: earPhoneTypeApi,
      smokeType: smokeTypeApi,
      sleepGrindingType: sleepGrindingTypeApi,
      sleepSnoreType: sleepSnoreTypeApi,
      sleepTalkingType: sleepTalkingTypeApi,
      sleepTurningType: sleepTurningTypeApi,
    };

    setFinalList(myCheckList);
    setChecklist(myCheckList);
    onCallCheckList(myCheckList);
  }, [
    cleanTypeApi,
    drinkTypeApi,
    homeTypeApi,
    lifePatternTypeApi,
    callTypeApi,
    earPhoneTypeApi,
    smokeTypeApi,
    sleepGrindingTypeApi,
    sleepSnoreTypeApi,
    sleepTalkingTypeApi,
    sleepTurningTypeApi,
  ]);

  useEffect(() => {
    onCallCheckList(finalList as checklistApiType);
    console.log(finalList);
  }, [finalList]);

  return (
    <div className="flex flex-col gap-[10px] mt-[8px]">
      <div className="flex gap-[8px]">
        {smokeType == '비흡연자 선호' ? (
          <CheckBlock emoji="🚭" content={smokeType} />
        ) : (
          <CheckBlock emoji="🚬" content={smokeType} />
        )}{' '}
        {lifePatternType == '아침형 인간' ? (
          <CheckBlock emoji="☀️" content={lifePatternType} />
        ) : (
          <CheckBlock emoji="🌙" content={lifePatternType} />
        )}
        <CheckBlock emoji="🧽" content={cleanType} />
      </div>
      <div className="flex gap-[8px]">
        <CheckBlock emoji="😴" content={sleepType} />
        <CheckBlock emoji="🍺" content={drinkType} />
        <CheckBlock emoji="🏠" content={homeType} />
      </div>{' '}
      <div className="flex gap-[8px]">
        <CheckBlock emoji="🗣️" content={noiseType} />
      </div>
    </div>
  );
};

export default CallCheckList;
