import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
import ChecklistBlock from '../../components/myPage/ChecklistBlock';
import CategorySelector from '../../components/myPage/CategorySelector';
import axios from 'axios';

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

  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNSIsImlhdCI6MTcwNDk5NTkzMSwiZXhwIjoxNzA1NjAwNzMxfQ.24gTBd8ecIiLtMsZjia6ixrfB_aq_nH8ojNpjwZ0s1Y';

  useEffect(() => {
    axios
      .get('https://checkmate-domitory.shop/api/checklist/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;

        // data 객체 내에서 필요한 정보 추출
        const {
          cleaningType,
          drinkType,
          homeType,
          lifePatternType,
          noiseType,
          sleepType,
          smokeType,
        } = data;
        // state 업데이트
        setCleanType(cleaningType);
        setDrinkType(drinkType);
        setHomeType(homeType);
        setLifePatternType(lifePatternType);
        setNoiseType(noiseType);
        setSleepType(sleepType);
        setSmokeType(smokeType);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [isEditMode]);

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
              <ChecklistBlock
                text1={'홍길동님은'}
                text2="🚭 비흡연자 선호"
                text3="하며"
              />
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
