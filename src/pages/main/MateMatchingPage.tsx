import React, { useState } from 'react';
import HeaderBar from '../../components/loginPage/HeaderBar';
import OrderDropDown from '../../components/mainPage/OrderDropDown';
// import { articleListDummy2 } from '../../data/dummy';
// import ArticleItem from '../../components/mainPage/ArticleItem';
import {
  convertDormitoryToNum,
  convertGenderToNum,
  convertOrderToNum,
  dormitoryType,
  genderType,
  orderType,
} from '../../data/type';
// import { articleListType, convertOrderToNum, orderType } from '../../data/type';
import { useInfiniteQuery } from 'react-query';
import { getPostListApi } from '../../api/articleApi';
import { useIntersectionObserver } from '../../data/infiniteScroll';
import ArticleItem from '../../components/mainPage/ArticleItem';

const MateMatchingPage = () => {
  const [currentOrder, setCurrentOrder] = useState<orderType>('일치율 높은 순');
  const [currentGender, setCurrentGender] = useState<genderType | null>(null);
  const [currentDormitory, setCurrentDormitory] =
    useState<dormitoryType | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChangeOrder = (order: orderType) => {
    setCurrentOrder(order);
  };

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['mateMatchingArticles', currentOrder, currentGender, currentDormitory],
      ({ pageParam = 0 }) => {
        return getPostListApi({
          page: pageParam,
          size: 10,
          type: convertOrderToNum[currentOrder],
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
            console.log(res.data.data);
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
          console.log('lastPage: ', lastPage);
          console.log('pages: ', pages);
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
      <HeaderBar text="나와 딱 맞는 룸메이트" />
      <div className="w-full grow flex flex-col items-center justify-start overflow-y-auto mt-2 scrollbar-hide">
        <OrderDropDown
          currentOrder={currentOrder}
          handleOrderChange={handleChangeOrder}
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
                      {page?.pages[0].map((article, idx) => {
                        return <ArticleItem key={idx} article={article} />;
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

export default MateMatchingPage;
