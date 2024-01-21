import React from 'react';
import { keywordType } from '../../data/type';
import { ReactComponent as Clean } from '../../assets/illust/keyword_clean.svg';
import { ReactComponent as Unsmoke } from '../../assets/illust/keyword_unsmoke.svg';
import { ReactComponent as Smoke } from '../../assets/illust/keyword_smoke.svg';
import { ReactComponent as Morning } from '../../assets/illust/keyword_morning.svg';
import { ReactComponent as Night } from '../../assets/illust/keyword_night.svg';
import { ReactComponent as Sleep } from '../../assets/illust/keyword_sleep.svg';
import { ReactComponent as Drink } from '../../assets/illust/keyword_drink.svg';
import { useNavigate } from 'react-router-dom';

const KeywordCard = ({
  tag,
  title,
  text,
  keyword,
}: {
  tag: string;
  title: string;
  text: string;
  keyword: keywordType;
}) => {
  const navigate = useNavigate();

  const keywordImage = () => {
    switch (keyword) {
      case '청결도':
        return (
          <Clean className="w-full h-auto flex items-center justify-center absolute bottom-0" />
        );
      case '비흡연':
        return (
          <Unsmoke className="w-full h-auto flex items-center justify-center absolute bottom-0" />
        );
      case '흡연':
        return (
          <Smoke className="w-full h-auto flex items-center justify-center absolute bottom-0" />
        );
      case '아침형':
        return (
          <Morning className="w-full h-auto flex items-center justify-center absolute bottom-0" />
        );
      case '저녁형':
        return (
          <Night className="w-full h-auto flex items-center justify-center absolute bottom-0" />
        );
      case '잠버릇':
        return (
          <Sleep className="w-full h-auto flex items-center justify-center absolute bottom-0" />
        );
      case '애주가':
        return (
          <Drink className="w-full h-auto  flex items-center justify-center absolute bottom-0" />
        );
      default:
        return (
          <Clean className="w-full h-auto  flex items-center justify-center absolute bottom-0" />
        );
    }
  };

  return (
    <div
      className="w-[259px] h-[306px] rounded-[20px] flex flex-col justify-start items-start bg-keywordBg pt-[20px] relative cursor-pointer"
      onClick={() => navigate('/main/keyword', { state: keyword })}
    >
      <div className="w-full flex flex-col items-start px-[21px]">
        <div className="flex items-center justify-center px-4 py-[6px] bg-white rounded-[18.5px] text-primary text-[10px]">
          {tag}
        </div>
        <div className="w-[204px] text-[20px] font-bold mt-[19px]">{title}</div>
        <div className="whitespace-pre-line text-[12px] leading-[121.22%] mt-[9px]">
          {text}
        </div>
      </div>
      {keywordImage()}
    </div>
  );
};

export default KeywordCard;
