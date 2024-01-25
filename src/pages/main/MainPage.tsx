import React from 'react';
import { ReactComponent as Logo } from '../../assets/logo/logo_text_primary.svg';
import { ReactComponent as Bookmark } from '../../assets/icon/icon_bookmark.svg';
import { ReactComponent as Search } from '../../assets/icon/icon_search_gray.svg';
import Divider from '../../components/mainPage/Divider';
import TitleBar from '../../components/mainPage/TitleBar';
import KeywordCard from '../../components/mainPage/KeywordCard';
import { keywordCardList } from '../../data/dummy';
import ArticleItem from '../../components/mainPage/ArticleItem';
import BottomNav from '../../components/myPage/BottomNav';
import { useNavigate } from 'react-router-dom';
import WriteBtn from '../../components/mainPage/WriteBtn';
import { getIsDoneChecklist } from '../../api/manageLocalStorage';
import { useQuery } from 'react-query';
import { getPostListApi } from '../../api/articleApi';
import { convertOrderToNum } from '../../data/type';
import NoticeCheckListBox from '../../components/mainPage/NoticeCheckListBox';

const MainPage = ({ notReadCnt }: { notReadCnt: number }) => {
  const navigate = useNavigate();
  const {
    isLoading: perfectMatchingIsLoding,
    error: perfectMatchingIsError,
    data: perfectMatchingData,
  } = useQuery(
    'perfectMatching',
    () =>
      getPostListApi({
        type: convertOrderToNum['일치율 높은 순'],
        size: 3,
      }),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  // const sendMessage = (message: string) => {
  //   if (client !== null) {
  //     sendMessagePublish(
  //       client,
  //       'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzA0MTMwNDAyLCJleHAiOjE3MDQ3MzUyMDJ9.kl1wCtFSDmAELz5u7k6QWBuntWMa5pGpJVxd6p1ef9s',
  //       message,
  //     );
  //   }
  // };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <div className="w-full grow flex-col items-center overflow-y-auto scrollbar-hide">
        <div className="w-full h-[90px] flex justify-between items-end pb-[12px] px-4">
          <Logo />
          <div className="flex gap-x-[19px] items-center">
            <Bookmark
              className="cursor-pointer"
              onClick={() => navigate('/my/scrap')}
            />
          </div>
        </div>
        <div className="w-full px-4 flex flex-col gap-y-[12px] pt-[7px]">
          <div
            className="flex gap-x-[10px] rounded-[25.5px] bg-cardBg px-[17px] py-[14px] cursor-text"
            onClick={() => navigate('/search')}
          >
            <Search />
            <div className="text-[14px] text-cardText ">
              어떤 룸메이트를 찾고 있으신가요?
            </div>
          </div>
          {!getIsDoneChecklist() && <NoticeCheckListBox />}
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
              navigate(`/main/mate`);
            }}
          />
          {perfectMatchingIsLoding ? (
            <div className="w-full py-5 mb-4 flex justify-center items-center text-sm text-center text-grayScale3 whitespace-pre">{`Loading...`}</div>
          ) : perfectMatchingIsError ? (
            <div className="w-full py-5 mb-4 flex justify-center items-center text-sm text-center text-grayScale3 whitespace-pre">{`오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.`}</div>
          ) : (
            <div className="w-full flex flex-col gap-y-[12px] mb-[104px] px-4">
              {perfectMatchingData?.data.data.results.map((article, idx) => (
                <ArticleItem article={article} key={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav state="home" notReadCnt={notReadCnt} />
      <WriteBtn />
    </div>
  );
};

export default MainPage;
