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
      } text-[18px] absolute rounded-full bottom-[51px] left-4 right-4`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default NextButton;
