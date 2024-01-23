import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
import ChecklistBlock from '../../components/myPage/ChecklistBlock';
import CategorySelector from '../../components/myPage/CategorySelector';
import { useQuery } from 'react-query';
import { getChecklistApi } from '../../api/userApi';
import { CustomError } from '../../data/type';

const ChecklistPage = () => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  const [cleanType, setCleanType] = useState('');
  const [drinkType, setDrinkType] = useState('');
  const [homeType, setHomeType] = useState('');
  const [noiseType, setNoiseType] = useState('');

  const [lifePatternType, setLifePatternType] = useState('');
  const [sleepType, setSleepType] = useState('');
  const [smokeType, setSmokeType] = useState('');

  const { data, error, isLoading } = useQuery(
    'getChecklistInfo',
    getChecklistApi,
  );

  useEffect(() => {
    if (data) {
      console.log('Data:', data);
      // 여기에서 데이터 처리 로직을 추가할 수 있습니다.

      // data 객체 내에서 필요한 정보 추출
      const {
        cleanType,
        drinkType,
        homeType,
        lifePatterType,
        callType,
        earPhoneType,
        sleepGridingType,
        sleepSnoreType,
        sleepTalkingType,
        sleepTurningType,
        smokeType,
      } = data.data.data;
      // state 업데이트
      setCleanType(cleanType);
      setDrinkType(drinkType);
      setHomeType(homeType);
      setLifePatternType(lifePatterType);
      setSmokeType(smokeType);

      // 초기화
      let sleepType = '';

      // 각 값이 boolean일 때
      if (
        !sleepGridingType &&
        !sleepSnoreType &&
        !sleepTalkingType &&
        !sleepTurningType
      ) {
        sleepType = '상관없음';
      }

      // 각 값이 문자열일 때
      if (
        typeof sleepGridingType === 'string' &&
        sleepGridingType !== 'false'
      ) {
        sleepType += sleepGridingType;
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

      var noiseCall;
      if (callType === '1') {
        noiseCall = '통화는 밖에서';
      } else if (callType === '2') {
        noiseCall = '전화는 짧게';
      } else if (callType === '3') {
        noiseCall = '통화는 자유롭게';
      }

      var noiseEarPhone;

      if (earPhoneType === '1') {
        noiseEarPhone = '이어폰 필수';
      } else if (earPhoneType === '2') {
        noiseEarPhone = '이어폰 상관 없이';
      }

      setNoiseType(noiseCall + ', ' + noiseEarPhone);
    }

    if (error) {
      console.error('Error:', error);
      const customErr = error as CustomError;
      if (customErr.response?.status === 500) {
        console.log('오류가 발생하였습니다.');
      }
    }
  }, [data, error, isEditMode]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center w-full px-4 mt-[65px] relative mb-[48px]">
        <div className="w-1/3">
          <Prev className="cursor-pointer" onClick={() => navigate(-1)} />{' '}
        </div>
        <div className="text-[18px] font-bold">내 체크리스트</div>
        <div
          className="w-1/3 text-primary text-end cursor-pointer"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {' '}
          편집
        </div>
      </div>
      <div className="grow-1 w-full scrollbar-hide overflow-y-auto ">
        {!isEditMode ? (
          <div className="flex justify-start">
            <div>
              {smokeType === '비흡연자 선호' ? (
                <ChecklistBlock
                  text1={'홍길동님은'}
                  text2={'🚭 ' + smokeType}
                  text3="하며"
                />
              ) : (
                <ChecklistBlock
                  text1={'홍길동님은'}
                  text2={'🚬  ' + smokeType}
                  text3="하며"
                />
              )}
              <ChecklistBlock
                text1={'생활패턴은'}
                text2={'☀️ ' + lifePatternType}
                text3="이에요"
              />
              <ChecklistBlock
                text1={'청소는'}
                text2={'🧽 ' + cleanType}
                text3="이 적당하다 생각"
              />
              <ChecklistBlock
                text1={'하고, 잠버릇은'}
                text2={'😴 ' + sleepType}
                text3="가 있어요."
              />
              <ChecklistBlock
                text1={'음주는'}
                text2={'🍺️ ' + drinkType}
                text3="편이고,"
              />
              <ChecklistBlock
                text1={'본가는'}
                text2={'🏠 매주' + homeType}
                text3="갈 예정이고,"
              />
              <ChecklistBlock
                text1={'방 안에서는'}
                text2={'🗣️ ' + noiseType}
                text3="부탁"
              />
              <p className="text-lg w-full font-normal text-center flex px-4 py-1.5 items-center text-black">
                드려요.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-end h-full w-full">
            <CategorySelector setEdit={setIsEditMode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistPage;
