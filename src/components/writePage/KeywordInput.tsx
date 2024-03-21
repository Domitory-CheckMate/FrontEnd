import React, { useEffect } from 'react';
import { ReactComponent as Plus } from '../../assets/icon/icon_plus_gray.svg';
import Keyword from './Keyword';
import KeywordPage from '../../pages/write/KeywordPage';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { keywordState } from '../../data/atoms';

interface KeywordInputProps {
  title: string;
  onKeywordChange: (newKeywordType: string) => void;
  onMatchChange: (newMatchType: string) => void;
  defaultKeyword?: string;
  defaultMatch?: string;
}

const KeywordInput: React.FC<KeywordInputProps> = ({
  title,
  onKeywordChange,
  onMatchChange,
  defaultKeyword,
  defaultMatch,
}) => {
  const keyword = useRecoilValue(keywordState);
  const [show, setShow] = React.useState(false);
  const handleShow = () => {
    setShow(false);
  };
  const setContent = useSetRecoilState(keywordState);

  useEffect(() => {
    console.log(defaultKeyword, defaultMatch);
    console.log(keyword);
    if (defaultKeyword != undefined && defaultMatch != undefined)
      setContent({ keyword: defaultKeyword, match: defaultMatch });
  }, []);

  const initialKeywords = [
    '청결 1순위',
    '비흡연자 1순위',
    '흡연자 1순위',
    '아침형인간 1순위',
    '저녁형인간 1순위',
    '잠버릇 없는 1순위',
    '애주가 1순위',
  ];

  // const initialKeywordsCode = [
  //   'CLEAN',
  //   'NON_SMOKE',
  //   'SMOKER',
  //   'MORNING',
  //   'EVENING',
  //   'SLEEP',
  //   'DRINK',
  // ];
  const initialMatch = [
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
  // const initialMatchCode = [
  //   'HUNDRED',
  //   'NINETY',
  //   'EIGHTY',
  //   'SEVENTY',
  //   'SIXTY',
  //   'FIFTY',
  //   'FORTY',
  //   'THIRTY',
  //   'TWENTY',
  //   'TEN',
  // ];

  useEffect(() => {
    onKeywordChange(keyword.keyword);
    onMatchChange(keyword.match);
  }, [keyword]);

  return (
    <div className="flex-col mt-[25px]]">
      <div className="flex w-full">
        <div className="text-start font-bold text-base text-black">{title}</div>
      </div>
      <div
        className="flex cursor-pointer w-full justify-between items-center mt-[13px] text-sm font-normal px-[14px] py-[12px] border-[#999] border-[1px] rounded-[10px] text-[#999]"
        onClick={() => setShow(true)}
      >
        중요하게 생각하는 키워드를 입력해주세요. <Plus />
      </div>

      <div className="flex flex-wrap gap-[7px] mt-[13px]">
        {keyword.keyword !== '' && (
          <Keyword string={initialKeywords[parseInt(keyword.keyword) - 1]} />
        )}
        {keyword.match !== '' && (
          <Keyword string={initialMatch[parseInt(keyword.match) - 1]} />
        )}
      </div>
      {show && <KeywordPage onClose={handleShow} />}
    </div>
  );
};

export default KeywordInput;
