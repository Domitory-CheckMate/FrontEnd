import React, { useEffect } from 'react';
import { ReactComponent as Pin } from '../../assets/icon/icon_pin.svg';
import { ReactComponent as Calendar } from '../../assets/icon/icon_calendar.svg';
import { ReactComponent as Bookmark } from '../../assets/icon/icon_bookmark_black.svg';
import { ReactComponent as BookmarkFill } from '../../assets/icon/icon_bookmark_fill.svg';

import ArticleHeaderBar from '../../components/articlePage/ArticleHeaderBar';
import ChecklistTag from '../../components/articlePage/ChecklistTag';
import Divider from '../../components/mainPage/Divider';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import {
  checklistApiType,
  getArticleDetailType,
  articlePostType,
} from '../../data/type';
import {
  getPostApi,
  patchArticleStateApi,
  postScrap,
  deleteScrap,
} from '../../api/articleApi';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberIdState } from '../../data/atoms';
import { useMutation } from 'react-query';
// import { CustomError } from '../../data/type';

const ArticlePage = () => {
  const { id } = useParams();
  console.log('게시글 아이디 : ', id);

  const location = useLocation();
  const topArticle = location.state?.article;
  const [article, setArticle] = useState<getArticleDetailType>();
  const myMemberId = useRecoilValue(memberIdState);
  const [state, setState] = useState<string>();

  const [originalArticle, setOriginalArticle] = useState<articlePostType>();

  const { data, error, refetch } = useQuery('postData', () =>
    getPostApi({ id }),
  );

  var sleepType: string[] = [];

  const { mutate: tryChangeArticleState } = useMutation(
    async () => {
      // 비동기 작업을 수행하는 함수 내에서 API 호출
      const data = await patchArticleStateApi({ id, postState: state });
      return data; // 반환된 데이터를 반환
    },
    {
      onSuccess: (data) => {
        console.log(data);
        // 성공 시 실행할 코드
      },
      onError: (error) => {
        console.error(error);
        // 에러 시 실행할 코드
      },
    },
  );

  const { mutate: tryScarp } = useMutation(
    async () => {
      // 비동기 작업을 수행하는 함수 내에서 API 호출
      const data = await postScrap(parseFloat(id as string));
      return data; // 반환된 데이터를 반환
    },
    {
      onSuccess: (data) => {
        console.log(data);
        // 성공 시 실행할 코드
        refetch();
      },
      onError: (error) => {
        console.error(error);
        // 에러 시 실행할 코드
      },
    },
  );
  const { mutate: tryDeleteScarp } = useMutation(
    async () => {
      // 비동기 작업을 수행하는 함수 내에서 API 호출
      const data = await deleteScrap(parseFloat(id as string));
      return data; // 반환된 데이터를 반환
    },
    {
      onSuccess: (data) => {
        console.log(data);
        // 성공 시 실행할 코드
        refetch();
      },
      onError: (error) => {
        console.error(error);
        // 에러 시 실행할 코드
      },
    },
  );

  useEffect(() => {
    if (topArticle.postState === '모집완료') {
      setState('COMPLETE');
    } else {
      setState('RECRUITING');
    }
  }, [topArticle]);

  const handleChangeArticleState = () => {
    tryChangeArticleState();
    if (state === 'RECRUITING') {
      setState('COMPLETE');
      alert('모집완료 상태로 변경되었습니다.');
    } else {
      setState('RECRUITING');
      alert('모집중 상태로 변경되었습니다.');
    }
  };
  useEffect(() => {
    if (data) {
      console.log('data : ', data.data.data);
      setArticle(data.data.data);
      setOriginalArticle({
        title: topArticle.title,
        content: topArticle.content,
        importantKey: topArticle.importantKey,
        similarityKey: topArticle.similarityKey,
        roomType: data.data.data.roomType,
        dormitoryType: data.data.data.dormitoryType,
        endDate: calculateRemainingDaysForArticle(topArticle.remainDate),
        checkList: data.data.data.checkList,
      });
      if (data.data.data.checkList.sleepGrindingType == '이갈이') {
        sleepType.push(data.data.data.checkList.sleepGrindingType);
      }

      if (data.data.data.checkList.sleepSnoreType == '코골이') {
        sleepType.push(data.data.data.checkList.sleepSnoreType);
      }

      if (data.data.data.checkList.sleepTalkingType == '잠꼬대') {
        sleepType.push(data.data.data.checkList.sleepTalkingType);
      }

      if (data.data.data.checkList.sleepTurningType == '뒤척임') {
        sleepType.push(data.data.data.checkList.sleepTurningType);
      }
    } else {
      console.log('error : ', error);
    }
  }, [data, error]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {article && (
        <>
          <div className="w-full flex flex-col bg-keywordBg">
            <ArticleHeaderBar id={id} article={originalArticle} />
            <div className="w-full flex flex-col items-center px-4 pt-2.5 pb-6">
              <div className="flex items-center justify-center bg-primary rounded-full text-white text-[10px] px-4 py-1">
                {topArticle.postState === '모집완료'
                  ? topArticle.postState
                  : topArticle.remainDate < 0
                  ? '기간만료'
                  : topArticle.postState}
              </div>
              <div className="text-lg font-semibold mt-2.5">
                {topArticle.title}
              </div>
              <div className="w-full flex flex-col items-start p-4 gap-y-2.5 mt-[27px] rounded-xl bg-white">
                <div className="flex items-center gap-x-2.5 text-xs">
                  <Calendar />
                  <div>{calculateRemainingDays(topArticle.remainDate)}</div>
                </div>
                <div className="flex items-center gap-x-2.5 text-xs">
                  <Pin />
                  <div>나의 체크리스트와 {topArticle.accuracy}% 일치</div>
                </div>
              </div>
              <div className="w-full flex items-center px-[18px] py-2.5 mt-2.5 rounded-xl bg-white">
                <img
                  className="w-[26px] h-[26px] rounded-full"
                  src={article.profile}
                />
                <div className="text-xs font-semibold ml-[7px] mr-2.5">
                  {article.name}
                </div>
                <div className="border border-solid border-primary text-primary text-[9px] py-1 px-3.5 rounded-full">
                  {`${article.major}・${
                    article.gender
                  }・${article.mbti.toUpperCase()}`}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center overflow-y-auto scrollbar-hide">
            <div className="w-full px-4 pt-[30px] pb-[22px] flex flex-col items-start gap-y-[9px]">
              <div className="text-sm font-semibold">한줄소개</div>
              <div className="w-full whitespace-pre-line text-[12px] leading-[21px] text-textGray4">
                {topArticle.content}
              </div>
            </div>
            <Divider />
            <div className="w-full px-4 pt-[17px] pb-[22px] flex flex-col items-start gap-y-[14px]">
              <div className="text-sm font-semibold">키워드</div>
              <div className="w-full flex flex-wrap justify-start items-center gap-[7px] ">
                <div className="px-4 py-1.5 flex items-center justify-center rounded-full bg-primaryBg text-primary text-xs">
                  {topArticle.importantKey}
                </div>

                <div className="px-4 py-1.5 flex items-center justify-center rounded-full bg-primaryBg text-primary text-xs">
                  {topArticle.similarityKey}
                </div>
              </div>
            </div>
            <Divider />
            <div className="w-full px-4 pt-4 pb-[26px] flex flex-col items-start gap-y-[14px]">
              <div className="text-sm font-semibold">체크리스트</div>
              <div className="w-full flex flex-wrap justify-start items-center gap-x-2 gap-y-2.5 ">
                {article.checkList.smokeType === '비흡연자 선호' && (
                  <ChecklistTag emoji="🚭" text={article.checkList.smokeType} />
                )}
                {article.checkList.smokeType === '흡연자 선호' && (
                  <ChecklistTag emoji="🚬" text={article.checkList.smokeType} />
                )}

                <ChecklistTag
                  emoji="☀️"
                  text={article.checkList.lifePatternType}
                />
                <ChecklistTag emoji="🧽" text={article.checkList.cleanType} />
                <ChecklistTag emoji="😴" text={sleepType.join(', ')} />
                <ChecklistTag emoji="🍺️" text={article.checkList.drinkType} />
                <ChecklistTag emoji="🏠" text={article.checkList.homeType} />
                <ChecklistTag
                  emoji="🗣️"
                  text={
                    article.checkList.callType +
                    ', ' +
                    article.checkList.earPhoneType
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full h-[89px] shrink-0 flex items-center px-4 justify-center border-t border-solid border-buttonContainerBorder">
            <div className="w-full flex items-center justify-center gap-x-[22px]">
              {article.memberId != myMemberId && (
                <div
                  className="grow flex items-center justify-center py-[13px] bg-primary rounded-full text-white text-sm font-semibold cursor-pointer"
                  onClick={handleChangeArticleState}
                >
                  {state === 'RECRUITING' ? '모집완료' : '모집중'}
                </div>
              )}
              {article.memberId == myMemberId && (
                <>
                  {article.isScrap == 'false' ? (
                    <Bookmark
                      className={' cursor-pointer'}
                      onClick={() => tryScarp()}
                    />
                  ) : (
                    <BookmarkFill
                      className={' cursor-pointer'}
                      onClick={() => tryDeleteScarp()}
                    />
                  )}
                  <div className="grow flex items-center justify-center py-[13px] bg-primary rounded-full text-white text-sm font-semibold cursor-pointer">
                    채팅하기
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function calculateRemainingDays(remainDate: number) {
  // 현재 날짜를 가져옴
  const currentDate = new Date();

  // remainDate일 후의 날짜를 계산
  const futureDate = new Date(
    currentDate.getTime() + remainDate * 24 * 60 * 60 * 1000,
  );

  // 월, 일, 요일을 추출
  const month = futureDate.getMonth() + 1; // getMonth()의 반환값은 0부터 시작하므로 +1
  const day = futureDate.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][
    futureDate.getDay()
  ];

  // 남은 날짜 문자열을 반환
  return `~${month}월 ${day}일(${dayOfWeek}) 까지`;
}

function calculateRemainingDaysForArticle(remainDate: number) {
  // 현재 날짜를 가져옴
  const currentDate = new Date();

  // remainDate일 후의 날짜를 계산
  const futureDate = new Date(
    currentDate.getTime() + remainDate * 24 * 60 * 60 * 1000,
  );

  // 월, 일, 요일을 추출
  const year = futureDate.getFullYear();
  const month = futureDate.getMonth() + 1; // getMonth()의 반환값은 0부터 시작하므로 +1
  const day = futureDate.getDate();

  const returnData = `${year}-${(month + 1).toString().padStart(2, '0')}-${(
    month + 1
  )
    .toString()
    .padStart(2, '0')}`;

  // 남은 날짜 문자열을 반환
  return returnData;
}

export default ArticlePage;
