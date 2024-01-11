import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
import CheckKeyword from '../../components/writePage/CheckKeyword';

const KeywordPage = () => {
  const navigate = useNavigate();
  const keywords = [
    '청결 1순위',
    '비흡연자 1순위',
    '흡연자 1순위',
    '아침형인간 1순위',
    '저녁형인간 1순위',
    '잠버릇 없는 1순위',
    '애주가 1순위',
  ];
  const match = [
    '100% 이상',
    '90% 이상',
    '80% 이상',
    '70% 이상',
    '60% 이상',
    '50% 이상',
    '40% 이상',
    '30% 이상',
    '20% 이상',
    '10% 이상',
  ];

  return (
    <div className="w-full h-full flex flex-col justify-start px-4">
      <div className="flex justify-between items-center w-full mt-[65px] relative mb-[48px]">
        <div className="w-1/3">
          <Prev className="cursor-pointer" onClick={() => navigate(-1)} />
        </div>
        <div className="text-[18px] font-bold">키워드</div>
        <div className="w-1/3 flex justify-end text-[18px] font-bold text-primary">
          등록
        </div>
      </div>
      <div className="flex flex-col justify-start">
        <div className="text-black text-base font-normal">
          가장 중요하게 생각하는 키워드
        </div>
        <div className="flex flex-wrap gap-[8px] mt-[18px]">
          {keywords.map((keyword) => (
            <CheckKeyword string={keyword} />
          ))}
        </div>

        <div className="text-black text-base font-normal mt-[35px]">
          체크리스트 일치율
        </div>
        <div className="flex flex-wrap gap-[8px] mt-[18px]">
          {match.map((keyword) => (
            <CheckKeyword string={keyword} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordPage;
