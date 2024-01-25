import React from 'react';

const NextButton = ({
  text,
  isCanBeNext,
  onClick,
}: {
  text: string;
  isCanBeNext: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`py-4 ${
        isCanBeNext
          ? 'bg-primary text-white'
          : 'bg-invalidGray text-invalidTextGray'
      } text-[18px] rounded-full mb-[51px] w-full py-[16px]`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NextButton;
