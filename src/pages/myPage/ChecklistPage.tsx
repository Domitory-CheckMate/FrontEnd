import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
import ChecklistBlock from '../../components/myPage/ChecklistBlock';
import CategorySelector from '../../components/myPage/CategorySelector';

const ChecklistPage = () => {
  const navigate = useNavigate();

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="w-full h-full flex flex-col justify-between">
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
        {isEditMode ? (
          <div>
            <ChecklistBlock
              text1={'홍길동님은'}
              text2="🚭 비흡연자 선호"
              text3="하며"
            />
            <ChecklistBlock
              text1={'생활패턴은'}
              text2="☀️ 아침형 인간"
              text3="이에요"
            />
            <ChecklistBlock
              text1={'청소는'}
              text2="🧽 일주일에 1번"
              text3="이 적당하다 생각"
            />
            <ChecklistBlock
              text1={'하고, 잠버릇은'}
              text2="😴 잠꼬대, 코골이"
              text3="가 있어요."
            />
            <ChecklistBlock
              text1={'음주는'}
              text2="🍺️ 안마시는"
              text3="편이고,"
            />
            <ChecklistBlock
              text1={'본가는'}
              text2="🏠 매주"
              text3="갈 예정이고,"
            />
            <ChecklistBlock
              text1={'방 안에서는'}
              text2="🗣️ 이어폰 필수, 전화는 짧게"
              text3="부탁"
            />
            <p className="text-lg w-full font-normal text-center flex px-4 py-1.5 items-center text-black">
              드려요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-end h-full w-full">
            <CategorySelector />
          </div>
        )}
      </div>
      {!isEditMode && (
        <div className="bg-white  px-[16px] pt-[11px] pb-[29px]">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="w-full h-[50px]  bg-primary text-white rounded-[27px]"
          >
            {' '}
            수정 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default ChecklistPage;
