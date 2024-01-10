import React from 'react';
import { ReactComponent as Clean } from '../../assets/icon/icon_keyword_clean.svg';

const KeywordCard = ({
  tag,
  title,
  text,
  keyword,
}: {
  tag: string;
  title: string;
  text: string;
  keyword: string;
}) => {
  const keywordImage = () => {
    switch (keyword) {
      case 'clean':
        return <Clean />;
      default:
        return <Clean />;
    }
  };

  return (
    <div className="w-[259px] h-[306px] rounded-[20px] flex flex-col justify-between items-start bg-keywordBg pt-[20px]">
      <div className="w-full flex flex-col items-start px-[21px]">
        <div className="flex items-center justify-center px-4 py-[6px] bg-white rounded-[18.5px] text-primary text-[10px]">
          {tag}
        </div>
        <div className="w-[204px] text-[20px] font-bold mt-[19px]">{title}</div>
        <div className="whitespace-pre-line text-[12px] leading-[121.22%] mt-[9px]">
          {text}
        </div>
      </div>
      <div className="w-full flex items-center justify-center pb-[37.11px]">
        {keywordImage()}
      </div>
    </div>
  );
};

export default KeywordCard;
