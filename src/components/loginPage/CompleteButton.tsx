import React from 'react';

const CompleteButton = ({
  text,
  onClick,
  isAble,
}: {
  text: string;
  onClick: () => void;
  isAble: boolean;
}) => {
  return (
    <button
      className="w-full mx-4 mb-[50px] py-4 bg-primary text-[18px] text-white rounded-full disabled:bg-[#F7F7F7] disabled:text-[#B9B9B9]"
      onClick={onClick}
      disabled={!isAble}
    >
      {text}
    </button>
  );
};

export default CompleteButton;
