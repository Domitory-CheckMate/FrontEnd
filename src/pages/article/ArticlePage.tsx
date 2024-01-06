import React from 'react';
import { ReactComponent as Pin } from '../../assets/icon/icon_pin.svg';
import { ReactComponent as Calendar } from '../../assets/icon/icon_calendar.svg';
import { ReactComponent as Bookmark } from '../../assets/icon/icon_bookmark_black.svg';
import ArticleHeaderBar from '../../components/articlePage/ArticleHeaderBar';
import { articleDetailDummy } from '../../data/dummy';
import ChecklistTag from '../../components/articlePage/ChecklistTag';
import Divider from '../../components/mainPage/Divider';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { id } = useParams();
  console.log('게시글 아이디 : ', id);

  const article = articleDetailDummy;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full flex flex-col bg-keywordBg">
        <ArticleHeaderBar />
        <div className="w-full flex flex-col items-center px-4 pt-2.5 pb-6">
          <div className="flex items-center justify-center bg-primary rounded-full text-white text-[10px] px-4 py-1">
            {article.state}
          </div>
          <div className="text-lg font-semibold mt-2.5">{article.title}</div>
          <div className="w-full flex flex-col items-start p-4 gap-y-2.5 mt-[27px] rounded-xl bg-white">
            <div className="flex items-center gap-x-2.5 text-xs">
              <Calendar />
              <div>{article.deadline}</div>
            </div>
            <div className="flex items-center gap-x-2.5 text-xs">
              <Pin />
              <div>나의 체크리스트와 {article.percent}% 일치</div>
            </div>
          </div>
          <div className="w-full flex items-center px-[18px] py-2.5 mt-2.5 rounded-xl bg-white">
            <img
              className="w-[26px] h-[26px] rounded-full"
              src={article.user.img}
            />
            <div className="text-xs font-semibold ml-[7px] mr-2.5">
              {article.user.name}
            </div>
            <div className="border border-solid border-primary text-primary text-[9px] py-1 px-3.5 rounded-full">
              {`${article.user.major}・${article.user.gender}・${article.user.mbti}`}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center overflow-y-auto scrollbar-hide">
        <div className="w-full px-4 pt-[30px] pb-[22px] flex flex-col items-start gap-y-[9px]">
          <div className="text-sm font-semibold">한줄소개</div>
          <div className="w-full whitespace-pre-line text-[12px] leading-[21px] text-textGray4">
            {article.introduce}
          </div>
        </div>
        <Divider />
        <div className="w-full px-4 pt-[17px] pb-[22px] flex flex-col items-start gap-y-[14px]">
          <div className="text-sm font-semibold">키워드</div>
          <div className="w-full flex flex-wrap justify-start items-center gap-[7px] ">
            {article.keywords.map((keyword, index) => {
              return (
                <div
                  className="px-4 py-1.5 flex items-center justify-center rounded-full bg-primaryBg text-primary text-xs"
                  key={index}
                >
                  {keyword}
                </div>
              );
            })}
          </div>
        </div>
        <Divider />
        <div className="w-full px-4 pt-4 pb-[26px] flex flex-col items-start gap-y-[14px]">
          <div className="text-sm font-semibold">체크리스트</div>
          <div className="w-full flex flex-wrap justify-start items-center gap-x-2 gap-y-2.5 ">
            <ChecklistTag emoji="🚭" text={article.checklist.smoke} />
            <ChecklistTag emoji="☀️" text={article.checklist.pattern} />
            <ChecklistTag emoji="🧽" text={article.checklist.clean} />
            <ChecklistTag
              emoji="😴"
              text={article.checklist.sleep.join(', ')}
            />
            <ChecklistTag emoji="🍺️" text={article.checklist.drink} />
            <ChecklistTag emoji="🏠" text={article.checklist.home} />
            <ChecklistTag
              emoji="🗣️"
              text={article.checklist.noise.join(', ')}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[89px] shrink-0 flex items-center px-4 justify-center border-t border-solid border-buttonContainerBorder">
        <div className="w-full flex items-center justify-center gap-x-[22px]">
          <Bookmark className={article.isMine ? 'hidden' : ' cursor-pointer'} />
          <div className="grow flex items-center justify-center py-[13px] bg-primary rounded-full text-white text-sm font-semibold cursor-pointer">
            {article.isMine ? '모집 완료' : '채팅하기'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
