import React, { useState } from 'react';
import MBTIButton from './MBTIButton';
import { mbtiType } from '../../data/type';
import CompleteButton from '../../components/loginPage/CompleteButton';
import { ReactComponent as Close } from '../../assets/icon/icon_close.svg';
import { useNavigate } from 'react-router-dom';

const OnboardingPage2 = () => {
  const navigate = useNavigate();
  const [selectedMBTI, setSelectedMBTI] = useState<mbtiType>({
    first: '',
    second: '',
    third: '',
    fourth: '',
  });
  return (
    <div className="w-full h-full flex flex-col items-center relative">
      <div
        className="absolute top-[68px] right-4 cursor-pointer"
        onClick={() => {
          navigate('/login');
        }}
      >
        <Close />
      </div>
      <div className="w-full flex flex-col px-4 grow">
        <div className="mt-[102px] flex w-full flex-col gap-y-[14px]">
          <div className="text-[22px] leading-8">MBTI를 알려주세요</div>
          <div className="text-[14px] leading-[25px] w-9/12 break-keep">
            MBTI를 입력하고 내가 선호하는 MBTI를 가진 룸메이트를 찾아보세요
          </div>
        </div>
        <div className="flex flex-col gap-y-[14px] mt-[47px]">
          <div className="flex items-center w-full gap-x-2">
            <MBTIButton
              text="E"
              icon="👩🏻‍❤️‍👩🏻"
              content="외향형"
              isSelected={selectedMBTI.first === 'E'}
              onSelected={() =>
                setSelectedMBTI((prev) => ({ ...prev, first: 'E' }))
              }
            />
            <MBTIButton
              text="I"
              icon="💆🏻‍♀️"
              content="내향형"
              isSelected={selectedMBTI.first === 'I'}
              onSelected={() =>
                setSelectedMBTI((prev) => ({ ...prev, first: 'I' }))
              }
            />
          </div>
          <div className="flex items-center w-full gap-x-2">
            <MBTIButton
              text="S"
              icon="🙋🏻‍️"
              content="감각형"
              isSelected={selectedMBTI.second === 'S'}
              onSelected={() =>
                setSelectedMBTI((prev) => ({ ...prev, second: 'S' }))
              }
            />
            <MBTIButton
              text="N"
              icon="💭"
              content="직관형"
              isSelected={selectedMBTI.second === 'N'}
              onSelected={() =>
                setSelectedMBTI((prev) => ({ ...prev, second: 'N' }))
              }
            />
          </div>
          <div className="flex items-center w-full gap-x-2">
            <MBTIButton
              text="T"
              icon="🧐‍"
              content="사고형"
              isSelected={selectedMBTI.third === 'T'}
              onSelected={() =>
                setSelectedMBTI((prev) => ({ ...prev, third: 'T' }))
              }
            />
            <MBTIButton
              text="F"
              icon="🥺"
              content="감정형"
              isSelected={selectedMBTI.third === 'F'}
              onSelected={() =>
                setSelectedMBTI((prev) => ({ ...prev, third: 'F' }))
              }
            />
          </div>
          <div className="flex items-center w-full gap-x-2">
            <MBTIButton
              text="J"
              icon="📑"
              content="판단형"
              isSelected={selectedMBTI.fourth === 'J'}
              onSelected={() =>
                setSelectedMBTI((prev) => ({ ...prev, fourth: 'J' }))
              }
            />
            <MBTIButton
              text="P"
              icon="🗯️"
              content="인식형"
              isSelected={selectedMBTI.fourth === 'P'}
              onSelected={() =>
                setSelectedMBTI((prev) => ({ ...prev, fourth: 'P' }))
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center">
        <CompleteButton
          text="확인"
          isAble={true}
          onClick={() => {
            navigate('/login');
          }}
        />
      </div>
    </div>
  );
};

export default OnboardingPage2;
