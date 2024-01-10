import React, { useState } from 'react';
import HeaderBar from '../../components/loginPage/HeaderBar';
import { keywordList, orderList } from '../../data/value';
import KeywordTag from '../../components/mainPage/KeywordTag';
import { articleType } from '../../data/type';
import { articleListDummy, articleListDummy2 } from '../../data/dummy';
import ArticleItem from '../../components/mainPage/ArticleItem';
import OrderDropDown from '../../components/mainPage/OrderDropDown';

const KeywordMatchingPage = () => {
  const [clicked, setClicked] = useState<string>(keywordList[0]);
  const [currentList, setCurrentList] =
    useState<articleType[]>(articleListDummy);
  const [currentOrder, setCurrentOrder] = useState<string>(orderList[0]);

  const clickTagHandler = (tag: string) => {
    setClicked(tag);
    setCurrentList(articleListDummy2);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <HeaderBar text="중요하게 생각하는 키워드" />
      <div className="w-full grow flex flex-col items-center justify-start overflow-y-auto mt-6 scrollbar-hide">
        <div className="shrink-0 w-full flex items-center gap-x-1.5 mb-2.5 overflow-x-auto scrollbar-hide">
          <div className="mr-2.5" />
          {keywordList.map((keyword, index) => {
            return (
              <KeywordTag
                key={index}
                keyword={keyword}
                state={keyword === clicked}
                onClick={() => clickTagHandler(keyword)}
              />
            );
          })}
          <div className="mr-2.5" />
        </div>
        <OrderDropDown
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
        />
        <div className="w-full px-4 flex flex-col gap-y-3 pb-24">
          {currentList.map((article, index) => {
            return <ArticleItem key={index} article={article} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default KeywordMatchingPage;
