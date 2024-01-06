import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/logo/logo_text_primary.svg';
import { ReactComponent as Bookmark } from '../../assets/icon/icon_bookmark.svg';
import { ReactComponent as Notice } from '../../assets/icon/icon_notice.svg';
import { ReactComponent as Search } from '../../assets/icon/icon_search_gray.svg';
import { ReactComponent as NextGray } from '../../assets/icon/icon_next_gray.svg';
import Divider from '../../components/mainPage/Divider';
import TitleBar from '../../components/mainPage/TitleBar';
import KeywordCard from '../../components/mainPage/KeywordCard';
import {
  articleDummy,
  keywordCardDummy,
  keywordCardMorning,
  keywordCardNight,
  keywordCardSmoke,
} from '../../data/dummy';
import ArticleItem from '../../components/mainPage/ArticleItem';
import BottomNav from '../../components/myPage/BottomNav';
import { useNavigate } from 'react-router-dom';
import WriteBtn from '../../components/mainPage/WriteBtn';
import { Client } from '@stomp/stompjs';
import { sendMessagePublish } from '../../socket/socketClient';

const MainPage = ({ client }: { client: Client | null }) => {
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState<string>('');
  const articleList = [articleDummy, articleDummy, articleDummy];
  const keywordCardList = [
    keywordCardDummy,
    keywordCardSmoke,
    keywordCardMorning,
    keywordCardNight,
  ];

  const sendMessage = (message: string) => {
    if (client !== null) {
      sendMessagePublish(
        client,
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA0MTMwNDAyLCJleHAiOjE3MDQ3MzUyMDJ9.kl1wCtFSDmAELz5u7k6QWBuntWMa5pGpJVxd6p1ef9s',
        message,
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full grow flex-col items-center overflow-y-auto scrollbar-hide">
        <div className="w-full h-[90px] flex justify-between items-end pb-[12px] px-4">
          <Logo />
          <div className="flex gap-x-[19px] items-center">
            <Bookmark />
            <Notice />
          </div>
        </div>
        <div className="w-full px-4 flex flex-col gap-y-[12px] pt-[7px]">
          <div className="flex gap-x-[10px] rounded-[25.5px] bg-cardBg px-[17px] py-[14px]">
            <Search onClick={() => sendMessage(searchContent)} />
            <input
              className="text-[14px] text-cardText "
              placeholder="어떤 룸메이트를 찾고 있으신가요?"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-primary10 py-[15px] pl-4 pr-[21px] mb-[17px]">
            <div className="flex flex-col gap-y-[6px] items-start">
              <div className="text-primary font-bold">
                룸메이트 체크리스트 작성하러 가기
              </div>
              <div className="text-[12px] text-[#838383]">
                내가 찾는 룸메이트를 추천받을 수 있어요.
              </div>
            </div>
            <NextGray />
          </div>
        </div>
        <Divider />
        <div className="w-full flex flex-col gap-y-[26px] mt-[21px]">
          <TitleBar
            text="중요하게 생각하는 키워드"
            deco={'🧩'}
            onClick={() => {
              navigate('/main/keyword');
            }}
          />
          <div className="w-full flex overflow-x-auto items-center scrollbar-hide">
            <div className="flex items-center gap-x-[12px]">
              <div />
              {keywordCardList.map((keywordCard, idx) => (
                <KeywordCard
                  tag={keywordCard.tag}
                  title={keywordCard.title}
                  text={keywordCard.text}
                  keyword={keywordCard.keyword}
                  key={idx}
                />
              ))}
              <div />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-[26px] mt-[30px]">
          <TitleBar
            text="나와 딱 맞는 룸메이트"
            deco={'👭🏻'}
            onClick={() => {
              navigate('/main/mate');
            }}
          />
          <div className="w-full flex flex-col gap-y-[12px] mb-[104px] px-4">
            {articleList.map((article, idx) => (
              <ArticleItem article={article} key={idx} />
            ))}
          </div>
        </div>
      </div>
      <BottomNav state="home" />
      <WriteBtn />
    </div>
  );
};

export default MainPage;
