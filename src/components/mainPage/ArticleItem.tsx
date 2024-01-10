import React from 'react';
import { articleType } from '../../data/type';
import { ReactComponent as Bookmark } from '../../assets/icon/icon_bookmark_fill.svg';
import Divider from './Divider';
import { useNavigate } from 'react-router-dom';

const ArticleItem = ({ article }: { article: articleType }) => {
  const navigate = useNavigate();

  const articleClickHandler = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <div
      onClick={() => articleClickHandler(article.id)}
      className="w-full flex flex-col bg-cardBg rounded-[20px] pt-[13px] pb-4 cursor-pointer"
    >
      <div className="w-full flex flex-col items-start pl-[27px] pr-[13px]">
        <div className="w-full flex items-center justify-between text-[10px]">
          <div className="text-primary">{article.state}</div>
          <div className="flex items-center gap-x-1 text-white">
            <div className="flex items-center justify-center px-2 py-1 bg-primaryLight rounded-full">{`D-${article.dday}`}</div>
            <div className="flex items-center justify-center px-2 py-1 bg-primary rounded-full">{`${article.percent}% 일치`}</div>
          </div>
        </div>
        <div className="text-[18px] font-semibold mt-[10px]">
          {article.title}
        </div>
        <div className="w-full flex items-center justify-between mt-[8px]">
          <div className="text-[14px] font-medium text-[#888888] mb-[6px]">
            #{article.keywords.join(' #')}
          </div>
          <div className="flex items-center gap-x-[6px]">
            <Bookmark />
            <div className="text-[11px] text-[#777]">{article.bookmark}</div>
          </div>
        </div>
      </div>
      <div className="w-full px-[14px] mt-[19px] mb-[14px]">
        <Divider color={true} />
      </div>
      <div className="w-full px-[27px] text-[12px] text-[#888888]">
        {article.content}
      </div>
    </div>
  );
};

export default ArticleItem;
