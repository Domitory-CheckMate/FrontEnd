import React from 'react';

const FilterItem = ({
  text,
  isClicked,
  onClick,
}: {
  text: string;
  isClicked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex justify-center items-center cursor-pointer px-[18px] py-[7px] rounded-full text-xs border border-solid ${
        isClicked
          ? 'border-primary bg-primaryBg text-primary'
          : 'border-grayScale4 bg-white text-grayScale4'
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default FilterItem;
