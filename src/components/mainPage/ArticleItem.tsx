import React from 'react';
import { articleListType } from '../../data/type';
import { ReactComponent as Bookmark } from '../../assets/icon/icon_bookmark_fill.svg';
import { ReactComponent as Check } from '../../assets/icon/icon_check_white.svg';
import { useState } from 'react';

import Divider from './Divider';
import { useNavigate } from 'react-router-dom';

const ArticleItem = ({
  article,
  choiceMode,
  choice,
}: {
  article: articleListType;
  choiceMode?: boolean;
  choice?: (id: number) => void;
}) => {
  const navigate = useNavigate();

  const articleClickHandler = (id: number) => {
    if (choiceMode) {
      choice && choice(id);
      setIsCheck(!isCheck);
    } else {
      setIsCheck(false);
      navigate(`/article/${id}`, { state: { article: article } });
    }
  };

  const [isCheck, setIsCheck] = useState(false);

  return (
    <div
      onClick={() => articleClickHandler(article.postId)}
      className="w-full flex flex-col h-[175px] bg-cardBg rounded-[20px] pt-[13px] pb-4 cursor-pointer"
    >
      <div className="w-full flex flex-col items-start pl-[27px] pr-[13px]">
        <div className="w-full flex items-top justify-between text-[10px]">
          <div
            className={`mt-[7px] mb-[1px] ${
              article.postState === '모집완료'
                ? 'text-black'
                : article.remainDate < 0
                ? 'text-black'
                : 'text-primary'
            }`}
          >
            {article.postState === '모집완료'
              ? article.postState
              : article.remainDate < 0
              ? '기간만료'
              : article.postState}
          </div>
          {choiceMode == true ? (
            <div
              className={`h-[19px] w-[19px] mr-[4px] mt-[4px] rounded-full flex items-center justify-center  ${
                isCheck == true ? 'bg-primary' : 'bg-grayScale3'
              }`}
            >
              <Check />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-x-1 text-white mb-[5px]">
                {!(
                  article.postState === '모집완료' || article.remainDate < 0
                ) && (
                  <div className="flex items-center justify-center px-2 py-1 bg-primaryLight rounded-full">{`D-${article.remainDate}`}</div>
                )}
                <div
                  className={`flex items-center justify-center px-2 py-1 rounded-full ${
                    article.postState === '모집완료'
                      ? 'text-white bg-grayScale4'
                      : article.remainDate < 0
                      ? 'text-white bg-grayScale4'
                      : 'text-white bg-primary'
                  } `}
                >{`${article.accuracy}% 일치`}</div>
              </div>
            </>
          )}
        </div>
        <div className="text-[18px] font-semibold mt-[7px]">
          {article.title}
        </div>
        <div className="w-full flex items-center justify-between mt-[8px]">
          <div className="text-[14px] font-medium text-[#888888] mb-[6px]">
            {`#${article.importantKey} #${article.similarityKey}`}
          </div>
          <div className="flex items-center gap-x-[6px] mt-[11px]">
            <Bookmark />
            <div className="text-[11px] text-[#777]">{article.scrapCount}</div>
          </div>
        </div>
      </div>
      <div className="w-full px-[14px] mt-[13px] mb-[14px]">
        <Divider color={true} />
      </div>
      <div className="w-full px-[27px] text-[12px] text-[#888888]">
        {article.content}
      </div>
    </div>
  );
};

export default ArticleItem;
