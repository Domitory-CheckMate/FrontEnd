import React, { useEffect, useState } from 'react';
import { ReactComponent as Prev } from '../../assets/icon/icon_prev.svg';
// import { articleListDummy2 } from '../../data/dummy';
// import ArticleItem from '../../components/mainPage/ArticleItem';
import { orderType } from '../../data/type';
// import { articleListType, convertOrderToNum, orderType } from '../../data/type';
import { useInfiniteQuery } from 'react-query';
import { getMyPostListApi } from '../../api/articleApi';
import { useIntersectionObserver } from '../../data/infiniteScroll';
import ArticleItem from '../../components/mainPage/ArticleItem';
import { useNavigate } from 'react-router-dom';
import DeleteArticlesModal from '../../components/myPage/DeleteModal';

const MyPostPage = () => {
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState<orderType>('등록일 순');

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [selectedIds, setSelectedIds] = useState<number[]>([]); // 선택된 articleItem의 id를 저장할 배열

  const handleArticleItemClick = (id: number) => {
    // 선택된 articleItem의 id를 배열에 추가 또는 제거
    setSelectedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((itemId) => itemId !== id)
        : [...prevIds, id],
    );
  };

  useEffect(() => {
    setCurrentOrder('등록일 순');
  }, []);

  useEffect(() => {
    console.log(selectedIds);
  }, [selectedIds]);

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
    setSelectedIds([]); // 선택된 articleItem의 id를 저장한 배열을 초기화
    setIsChoiceMode(false); // 선택모드를 해제
    refetch(); // 삭제 후 새로고침
  };
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage, refetch } =
    useInfiniteQuery(
      ['MyArticles', currentOrder],
      ({ pageParam = 0 }) => {
        return getMyPostListApi({
          page: 0,
          size: 10,
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

  const [isChoiceMode, setIsChoiceMode] = useState<boolean>(false); // 선택모드인지 아닌지를 나타내는 state
  const [isChoice, setIsChoice] = useState<number>(0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start px-4">
      <div className="flex justify-between items-center w-full mt-[65px] relative mb-[23px]">
        <div className="w-1/3 flex justify-start">
          <Prev className="cursor-pointer" onClick={() => navigate(-1)} />
        </div>
        <div className="text-[18px] font-bold">내 모집글</div>
        <div className="w-1/3 text-primary text-[18px] flex justify-end ">
          {isChoiceMode == true ? (
            <div
              className=" cursor-pointer"
              onClick={() => setShowDeleteModal(true)}
            >
              삭제
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => setIsChoiceMode(true)}
            >
              선택
            </div>
          )}
        </div>
      </div>{' '}
      <div className="w-full grow flex flex-col items-center justify-start overflow-y-auto scrollbar-hide">
        {isError || isLoading ? (
          <div className="w-full flex justify-center items-center text-grayScale3 py-6">
            {isError ? errorMessage : '로딩 중...'}
          </div>
        ) : data ? (
          <>
            <div className="list-wrapper w-full flex flex-col items-start justify-start">
              <div className="flex gap-[8px] mb-[17px]">
                <div
                  className={`text-[14px] rounded-full border-[1px] px-[16px] py-[9px] cursor-pointer ${
                    isChoice == 0
                      ? 'text-white bg-primary border-primary'
                      : 'text-grayScale5 bg-white border-grayScale2'
                  } `}
                  onClick={() => setIsChoice(0)}
                >
                  전체
                </div>
                <div
                  className={`text-[14px] rounded-full border-[1px] px-[16px] py-[9px] cursor-pointer ${
                    isChoice == 1
                      ? 'text-white bg-primary border-primary'
                      : 'text-grayScale5 bg-white border-grayScale2'
                  } `}
                  onClick={() => setIsChoice(1)}
                >
                  모집중
                </div>
                <div
                  className={`text-[14px] rounded-full border-[1px] px-[16px] py-[9px] cursor-pointer ${
                    isChoice == 2
                      ? 'text-white bg-primary border-primary'
                      : 'text-grayScale5 bg-white border-grayScale2'
                  } `}
                  onClick={() => setIsChoice(2)}
                >
                  모집완료
                </div>
              </div>

              {data &&
                data.pages.map((page, index) => {
                  return (
                    <div
                      key={index}
                      className={`page-${index} w-full flex flex-col items-start justify-start gap-y-3`}
                    >
                      {isChoice == 0 &&
                        page?.pages[0].map((article, idx) => {
                          return (
                            <ArticleItem
                              key={idx}
                              article={article}
                              choiceMode={isChoiceMode}
                              choice={handleArticleItemClick}
                            />
                          );
                        })}

                      {isChoice == 1 &&
                        page?.pages[0]
                          .filter((article) => article.postState === '모집중')
                          .map((article, idx) => {
                            return (
                              <ArticleItem
                                key={idx}
                                article={article}
                                choiceMode={isChoiceMode}
                                choice={handleArticleItemClick}
                              />
                            );
                          })}

                      {isChoice == 2 &&
                        page?.pages[0]
                          .filter((article) => article.postState === '모집완료')
                          .map((article, idx) => {
                            return (
                              <ArticleItem
                                key={idx}
                                article={article}
                                choiceMode={isChoiceMode}
                                choice={handleArticleItemClick}
                              />
                            );
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
      {showDeleteModal && (
        <DeleteArticlesModal
          onClose={handleDeleteModal}
          postIds={selectedIds}
        />
      )}
    </div>
  );
};

export default MyPostPage;
