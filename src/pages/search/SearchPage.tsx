import React, { useState } from 'react';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
import { useInfiniteQuery } from 'react-query';
import { getTextSearchApi } from '../../api/searchApi';
import ArticleItem from '../../components/mainPage/ArticleItem';
import { useIntersectionObserver } from '../../data/infiniteScroll';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log(searchKeyword);
      e.currentTarget.blur();
    }
  };

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['search', searchKeyword],
      ({ pageParam = 0 }) => {
        if (!searchKeyword) {
          setIsError(true);
          setErrorMessage('검색어를 입력해주세요.');
          return;
        }

        setIsError(false);
        return getTextSearchApi({
          page: pageParam,
          size: 10,
          text: searchKeyword,
        })
          .then((res) => {
            console.log(res.data.data.results);
            console.log(pageParam);
            if (res.data.data.results.length === 0 && pageParam === 0) {
              setIsError(true);
              setErrorMessage('검색결과가 없습니다.');
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
      <div className="w-full h-[90px] shrink-0 flex justify-center items-end px-4 pb-2.5 mb-5">
        <div className="w-full flex justify-center items-center gap-x-4">
          <Prev className="cursor-pointer" onClick={() => navigate(-1)} />
          <input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="grow rounded-full px-4 py-2 bg-grayScale1 placeholder:text-grayScale4 text-sm outline-none"
            placeholder="어떤 룸메이트를 찾고 있으신가요?"
          />
        </div>
      </div>
      {isError ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="text-[14px] text-grahScale3">{errorMessage}</div>
        </div>
      ) : isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
          로딩 중 ...
        </div>
      ) : data ? (
        <div className="w-full grow flex flex-col items-center justify-center">
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
          <div ref={setTarget} className="shrink-0 pb-24">
            {' '}
          </div>
          {isFetching && (
            <div className="w-full flex justify-center items-center text-grayScale3 py-6">
              로딩 중...
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          {`에러가 발생하였습니다.\n잠시 후 다시 시도해주세요.`}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
