import React from 'react';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
import CheckKeyword from '../../components/writePage/CheckKeyword';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { keywordState } from '../../data/atoms';

const KeywordPage = ({ onClose }: { onClose: () => void }) => {
  const initialKeywords = [
    '청결 1순위',
    '비흡연자 1순위',
    '흡연자 1순위',
    '아침형인간 1순위',
    '저녁형인간 1순위',
    '잠버릇 없는 1순위',
    '애주가 1순위',
  ];

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

  //recoil 사용 선언부
  const setContent = useSetRecoilState(keywordState);
  const content = useRecoilValue(keywordState);

  const handleSave = () => {
    if (!content.keyword || !content.match) {
      alert('키워드와 일치율을 모두 선택해주세요');
    } else {
      console.log(content);
      onClose();
    }
  };

  const handleItemClick = (type: string, value: string) => {
    if (type === 'keyword') {
      setContent((prev) => ({
        ...prev,
        [type]: `${initialKeywords.indexOf(value) + 1}`,
      }));
    } else {
      setContent((prev) => ({
        ...prev,
        [type]: `${initialMatch.indexOf(value) + 1}`,
      }));
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
      <div className="absolute bg-white w-96 h-full">
        <div className="flex justify-between items-center w-96 mt-[65px] relative mb-[48px]">
          <div className="w-1/3">
            <Prev className="cursor-pointer" onClick={onClose} />
          </div>
          <div className="text-[18px] font-bold">키워드</div>
          <div
            className="w-1/3 flex justify-end text-[18px] font-bold text-primary cursor-pointer"
            onClick={handleSave}
          >
            등록
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <div className="text-black text-base font-normal">
            가장 중요하게 생각하는 키워드
          </div>
          <div className="flex flex-wrap gap-[8px] mt-[18px]">
            {initialKeywords.map((keyword, index) => (
              <CheckKeyword
                key={keyword}
                string={keyword}
                onClick={() => handleItemClick('keyword', keyword)}
                isActive={content.keyword === `${index + 1}`}
              />
            ))}
          </div>

          <div className="text-black text-base font-normal mt-[35px]">
            체크리스트 일치율
          </div>
          <div className="flex flex-wrap gap-[8px] mt-[18px]">
            {initialMatch.map((match, index) => (
              <CheckKeyword
                key={match}
                string={match}
                onClick={() => handleItemClick('match', match)}
                isActive={content.match === `${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordPage;
