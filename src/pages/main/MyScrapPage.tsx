import React, { useState } from 'react';
import HeaderBar from '../../components/loginPage/HeaderBar';
import { useInfiniteQuery } from 'react-query';
import { getMyScrapListApi } from '../../api/articleApi';
import { useIntersectionObserver } from '../../data/infiniteScroll';
import ArticleItem from '../../components/mainPage/ArticleItem';

const MyScrapPage = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['myScrap'],
      ({ pageParam = 0 }) => {
        setIsError(false);
        return getMyScrapListApi({
          page: pageParam,
          size: 10,
        })
          .then((res) => {
            if (res.data.data.results.length === 0 && pageParam === 0) {
              setIsError(true);
              setErrorMessage('관심 있는 글이 없습니다.');
            }
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
      <HeaderBar text="관심목록" />
      {isError ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="text-[14px] text-grahScale3">{errorMessage}</div>
        </div>
      ) : isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="text-[14px] text-grahScale3">로딩 중...</div>
        </div>
      ) : data ? (
        <>
          <div className="list-wrapper w-full flex flex-col items-start justify-start gap-y-3 mt-[12px]">
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
  );
};

export default MyScrapPage;
