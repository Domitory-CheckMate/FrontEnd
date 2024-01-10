import React, { useState } from 'react';
import HeaderBar from '../../components/loginPage/HeaderBar';
import OrderDropDown from '../../components/mainPage/OrderDropDown';
import { orderList } from '../../data/value';
import { articleListDummy2 } from '../../data/dummy';
import ArticleItem from '../../components/mainPage/ArticleItem';

const MateMatchingPage = () => {
  const [currentOrder, setCurrentOrder] = useState<string>(orderList[0]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      <HeaderBar text="나와 딱 맞는 룸메이트" />
      <div className="w-full grow flex flex-col items-center justify-start overflow-y-auto mt-2 scrollbar-hide">
        <OrderDropDown
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
        />
        <div className="w-full px-4 flex flex-col gap-y-3 pb-24">
          {articleListDummy2.map((article, index) => {
            return <ArticleItem key={index} article={article} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MateMatchingPage;
