import React, { useState } from 'react';
import { ReactComponent as Down } from '../../assets/icon/icon_down_gray.svg';
import { ReactComponent as Check } from '../../assets/icon/icon_check_black.svg';
import { ReactComponent as Filter } from '../../assets/icon/icon_filter.svg';
import { ReactComponent as FilterPrimary } from '../../assets/icon/icon_filter_primary.svg';
import { ReactComponent as Close } from '../../assets/icon/icon_close.svg';
import { ReactComponent as Refresh } from '../../assets/icon/icon_refresh.svg';
import { orderList } from '../../data/value';
import { dormitoryType, genderType, orderType } from '../../data/type';
import FilterItem from './FilterItem';

const OrderDropDown = ({
  currentOrder,
  handleOrderChange,
  currentGender,
  handleGenderChange,
  currentDormitory,
  handleCurrentDormitoryChange,
}: {
  currentOrder: orderType;
  handleOrderChange: (order: orderType) => void;
  currentGender: genderType | null;
  handleGenderChange: (gender: genderType | null) => void;
  currentDormitory: dormitoryType | null;
  handleCurrentDormitoryChange: (dormitory: dormitoryType | null) => void;
}) => {
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [gender, setGender] = useState<genderType | null>(currentGender);
  const [dormitory, setDormitory] = useState<dormitoryType | null>(
    currentDormitory,
  );

  const clickOrderHandler = (order: orderType) => {
    handleOrderChange(order);
    setIsOrderOpen(false);
  };

  const isFilterApplied = currentGender || currentDormitory;

  return (
    <div className="w-full px-4 flex flex-col justify-start items-end mb-2.5 relative">
      <div className="flex items-center justify-end gap-x-2.5">
        <div
          className="flex items-center justify-center gap-x-[5px] text-[10px] text-grayScale5 cursor-pointer"
          onClick={() => setIsFilterOpen(true)}
        >
          <div className={`text-${isFilterApplied ? 'primary' : 'black'}`}>
            필터
          </div>
          {isFilterApplied ? <FilterPrimary /> : <Filter />}
        </div>
        <div className="w-px h-2.5 bg-grayScale2" />
        <div
          className="flex items-center justify-center gap-x-[5px] text-[10px] text-grayScale5 cursor-pointer"
          onClick={() => setIsOrderOpen(!isOrderOpen)}
        >
          <div>{currentOrder}</div>
          <Down />
        </div>
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
      <div
        className={`w-full max-w-[450px] h-full bg-black opacity-50 fixed left-0 right-0 bottom-0 mx-auto z-5 ${
          isFilterOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsFilterOpen(false)}
      />
      <div
        className={`z-10 w-full max-w-[450px] pb-[37px] rounded-t-3xl fixed bottom-0 left-0 right-0 mx-auto box-border bg-white transition-transform transform ${
          isFilterOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="w-full flex justify-center items-center py-4 relative border-b border-solid border-grayScale1">
          <div className="flex items-center justify-center text-xl">
            상세필터
          </div>
          <div className="absolute right-5 flex justify-center items-center">
            <Close
              className="flex items-center justify-center cursor-pointer"
              onClick={() => setIsFilterOpen(false)}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-5 pt-4 pb-6 px-4 border-b border-solid border-grayScale1">
          <div className="w-full flex flex-col gap-y-3 justify-start items-start">
            <div className="font-medium">성별</div>
            <div className="w-full flex flex-wrap gap-x-1">
              <FilterItem
                text="남자"
                isClicked={gender === '남자'}
                onClick={() => {
                  gender === '남자' ? setGender(null) : setGender('남자');
                }}
              />
              <FilterItem
                text="여자"
                isClicked={gender === '여자'}
                onClick={() => {
                  gender === '여자' ? setGender(null) : setGender('여자');
                }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-3 justify-start items-start">
            <div className="font-medium">기숙사</div>
            <div className="w-full flex flex-wrap gap-x-1">
              <FilterItem
                text="1기숙사"
                isClicked={dormitory === '1기숙사'}
                onClick={() => {
                  dormitory === '1기숙사'
                    ? setDormitory(null)
                    : setDormitory('1기숙사');
                }}
              />
              <FilterItem
                text="2기숙사"
                isClicked={dormitory === '2기숙사'}
                onClick={() => {
                  dormitory === '2기숙사'
                    ? setDormitory(null)
                    : setDormitory('2기숙사');
                }}
              />
              <FilterItem
                text="3기숙사"
                isClicked={dormitory === '3기숙사'}
                onClick={() => {
                  dormitory === '3기숙사'
                    ? setDormitory(null)
                    : setDormitory('3기숙사');
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between gap-x-[27px] px-4 mt-[6px]">
          <div
            className="whrink-0 flex gap-x-[5px] items-center justify-center text-xs text-medium cursor-pointer"
            onClick={() => {
              setGender(null);
              setDormitory(null);
            }}
          >
            <Refresh />
            <div>초기화</div>
          </div>
          <div
            className="grow flex items-center justify-center rounded-full py-4 bg-primary text-white text-lg cursor-pointer"
            onClick={() => {
              handleGenderChange(gender);
              handleCurrentDormitoryChange(dormitory);
              setIsFilterOpen(false);
            }}
          >
            적용하기
          </div>
        </div>
        {isFilterOpen}
      </div>
    </div>
  );
};

export default OrderDropDown;
