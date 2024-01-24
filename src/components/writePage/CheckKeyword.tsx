import React from 'react';
import { ReactComponent as Check } from '../../assets/icon/icon_check_primary.svg';
import { ReactComponent as Plus } from '../../assets/icon/icon_plus_gray.svg';

const Keyword = ({
  string,
  onClick,
  isActive,
}: {
  string: string;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <div
      className={`cursor-pointer items-center justify-center text-primary rounded-[10px] text-base border-[1px] gap-[0px] flex ${
        isActive
          ? 'bg-[#FFE2D8] text-primary border-primary'
          : 'bg-white text-[#999999] border-[#E5E5E5]'
      } px-[16px] py-[10px]`}
      onClick={onClick}
    >
      {isActive ? (
        <div className="w-[18px] justify-center items-center">
          {' '}
          <Check />{' '}
        </div>
      ) : (
        <div className="w-[18px] justify-center items-center">
          {' '}
          <Plus />{' '}
        </div>
      )}{' '}
      {string}
    </div>
  );
};

export default Keyword;
