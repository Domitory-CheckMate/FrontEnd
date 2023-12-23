import React, { useState } from 'react';
import { ReactComponent as Down } from '../../assets/icon/icon_down_gray.svg';
import { ReactComponent as Check } from '../../assets/icon/icon_check_black.svg';
import { orderList } from '../../data/value';

const OrderDropDown = ({
  currentOrder,
  setCurrentOrder,
}: {
  currentOrder: string;
  setCurrentOrder: (order: string) => void;
}) => {
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);

  const clickOrderHandler = (order: string) => {
    setCurrentOrder(order);
    setIsOrderOpen(false);
  };

  return (
    <div className="w-full px-4 flex flex-col justify-start items-end mb-2.5 relative">
      <div
        className="flex items-center justify-center gap-x-[5px] text-[10px] text-[#666666] cursor-pointer"
        onClick={() => setIsOrderOpen(!isOrderOpen)}
      >
        <div>{currentOrder}</div>
        <Down />
      </div>
      <div
        className={
          'absolute w-[204px] top-3 mt-[5px] gap-y-1.5 text-[10px] border border-solid border-invalidGray bg-white rounded-[10px] ' +
          (isOrderOpen
            ? 'flex flex-col shadow-[5px_5px_20px_0_rgba(0,0,0,0.25)]'
            : 'hidden')
        }
      >
        {orderList.map((order, index) => {
          return (
            <div
              key={index}
              className="w-full px-[15px] py-[13px] flex gap-x-2 items-center justify-start text-[14px] cursor-pointer border-b-[0.5px] border-solid border-keywordTagBorder last:border-0"
              onClick={() => clickOrderHandler(order)}
            >
              <Check
                className={currentOrder === order ? 'opacity-100' : 'opacity-0'}
              />
              <div
                className={
                  currentOrder === order ? 'text-black' : 'text-textGray3'
                }
              >
                {order}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDropDown;
