import React from 'react';

const CompleteButton = ({
  text,
  isOkToClick,
  onClick,
}: {
  text: string;
  isOkToClick: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className="shrink-0 w-full mb-[51px] flex justify-center items-start pt-[13px] cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`w-full py-4 flex items-center justify-center rounded-full text-[18px] ${
          isOkToClick
            ? 'text-white bg-primary'
            : 'text-grayScale4 bg-grayScale1'
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default CompleteButton;
