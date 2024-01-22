import React, { useEffect, useRef, useState } from 'react';
import HeaderBar from '../../components/loginPage/HeaderBar';
import { keywordList, orderList } from '../../data/value';
import KeywordTag from '../../components/mainPage/KeywordTag';
import {
  convertDormitoryToNum,
  convertGenderToNum,
  convertKeywordToNum,
  convertOrderToNum,
  dormitoryType,
  genderType,
  keywordType,
  orderType,
} from '../../data/type';
import OrderDropDown from '../../components/mainPage/OrderDropDown';
import { useLocation } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { getPostListApi } from '../../api/articleApi';
import { useIntersectionObserver } from '../../data/infiniteScroll';
import ArticleItem from '../../components/mainPage/ArticleItem';

const KeywordMatchingPage = () => {
  const location = useLocation();
  const defaultKeyword = location.state as keywordType;
  const [keyword, setKeyword] = useState<keywordType>(
    defaultKeyword || keywordList[0],
  );
  const [keywordIdx, setKeywordIdx] = useState<number>(0);
  const [currentOrder, setCurrentOrder] = useState<orderType>(orderList[0]);
  const [currentGender, setCurrentGender] = useState<genderType | null>(null);
  const [currentDormitory, setCurrentDormitory] =
    useState<dormitoryType | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedIndex = keywordList.findIndex((item) => item === keyword);
      if (selectedIndex !== -1 && selectedIndex !== keywordIdx) {
        if (keywordIdx < selectedIndex) {
          setKeywordIdx(selectedIndex);
          scrollContainerRef.current.scrollTo({
            left: selectedIndex * 100,
            behavior: 'smooth',
          });
        } else {
          setKeywordIdx(selectedIndex);
          scrollContainerRef.current.scrollTo({
            left: selectedIndex * 100 - 200,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [keyword]);

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      [
        'keywordMatchingArticles',
        keyword,
        currentOrder,
        currentGender,
        currentDormitory,
      ],
      ({ pageParam = 0 }) => {
        setIsError(false);
        return getPostListApi({
          page: pageParam,
          size: 10,
          type: convertOrderToNum[currentOrder],
          key: convertKeywordToNum[keyword],
          gender:
            currentGender !== null
              ? convertGenderToNum[currentGender]
              : undefined,
          dormitory:
            currentDormitory !== null
              ? convertDormitoryToNum[currentDormitory]
              : undefined,
        })
          .then((res) => {
            return {
              pages: [res.data.data.results],
              pageParams: [pageParam + 1],
            };
          })
          .catch((err) => {
            console.log(err);
            setIsError(true);
            if (err.response.data.status === 400) {
              if (
                err.response.data.message === '잘못된 Paging 크기입니다.' &&
                pageParam === 0
              ) {
                setErrorMessage('등록된 모집글이 없습니다.');
              } else {
                setErrorMessage(`오류가 발생하였습니다.\n다시 시도해주세요.`);
              }
            } else if (err.response.data.status === 404) {
              setErrorMessage(
                `아직 체크리스트를 등록하지 않으셨어요.\n나만의 체크리스트를 등록하고 적절한 모집글을 추천받을 수 있어요.`,
              );
            } else if (err.response.data.status === 409) {
              setErrorMessage('필터에 해당하는 게시글을 찾을 수 없습니다.');
            } else {
              setErrorMessage(`오류가 발생하였습니다.\n다시 시도해주세요.`);
            }
          });
      },
      {
        getNextPageParam: (lastPage, pages) => {
          const nextPage = lastPage
            ? lastPage.pages[0].length === 10
              ? pages.length
              : undefined
            : undefined;
          return nextPage;
        },
      },
    );

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <HeaderBar text="중요하게 생각하는 키워드" />
      <div className="w-full grow flex flex-col items-center justify-start overflow-y-auto mt-6 scrollbar-hide">
        <div
          className="shrink-0 w-full flex items-center gap-x-1.5 mb-2.5 overflow-x-auto scrollbar-hide"
          ref={scrollContainerRef}
        >
          <div className="mr-2.5" />
          {keywordList.map((nowKeyword, index) => {
            return (
              <KeywordTag
                key={index}
                keyword={nowKeyword}
                state={nowKeyword === keyword}
                onClick={() => setKeyword(nowKeyword)}
              />
            );
          })}
          <div className="mr-2.5" />
        </div>
        <OrderDropDown
          currentOrder={currentOrder}
          handleOrderChange={setCurrentOrder}
          currentGender={currentGender}
          handleGenderChange={setCurrentGender}
          currentDormitory={currentDormitory}
          handleCurrentDormitoryChange={setCurrentDormitory}
        />
        {isError || isLoading ? (
          <div className="w-full flex justify-center items-center text-grayScale3 py-6">
            {isError ? errorMessage : '로딩 중...'}
          </div>
        ) : data ? (
          <>
            <div className="list-wrapper w-full flex flex-col items-start justify-start gap-y-3">
              {data &&
                data.pages.map((page, index) => {
                  return (
                    <div
                      key={index}
                      className={`page-${index} w-full flex flex-col items-start justify-start px-4 gap-y-3`}
                    >
                      {page?.pages[0].map((article, index) => {
                        return <ArticleItem key={index} article={article} />;
                      })}
                    </div>
                  );
                })}
            </div>
            <div ref={setTarget} className="pb-24" />
            {isFetching && (
              <div className="w-full flex justify-center items-center text-grayScale3 py-6">
                로딩 중...
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex justify-center items-center text-grayScale3 whitespace-preline">
            {`에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.`}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeywordMatchingPage;
