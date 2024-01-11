import React from 'react';
import { ReactComponent as Plus } from '../../assets/icon/icon_plus_gray.svg';
import Keyword from './Keyword';
import { useNavigate } from 'react-router-dom';

const KeywordInput = ({ title }: { title: string }) => {
  const keywords = ['청결 1순위', '100%이상', '키워드3', '키워드4', '키워드5'];
  const navigate = useNavigate();

  return (
    <div className="flex-col mt-[25px]]">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">{title}</div>
      </div>
      <div
        className="flex cursor-pointer w-full justify-between items-center mt-[13px] text-sm font-normal px-[14px] py-[12px] border-[#999] border-[1px] rounded-[10px] text-[#999]"
        onClick={() => navigate('/keyword')}
      >
        중요하게 생각하는 키워드를 입력해주세요. <Plus />
      </div>

      <div className="flex flex-wrap gap-[7px] mt-[13px]">
        {keywords.map((keyword) => (
          <Keyword string={keyword} />
        ))}
      </div>
    </div>
  );
};

export default KeywordInput;
